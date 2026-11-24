begin;

-- The operator supplies the approved minimum days in Trash for each kind.
-- With no configured row, permanent deletion is unavailable for that kind.
create table gary_private.trash_retention (
  kind text primary key check(kind in ('case','article')),
  minimum_days integer not null check(minimum_days>=0)
);
create table gary_private.trash_holds (
  kind text not null check(kind in ('case','article')),
  record_id uuid not null,
  primary key(kind,record_id)
);
create table gary_private.application_purges (
  application_id uuid primary key references public.gary_applications(id) on delete cascade,
  deleted_at timestamptz not null
);
create table gary_private.application_purge_objects (
  application_id uuid not null references gary_private.application_purges(application_id) on delete cascade,
  object_id uuid not null unique,
  object_path text not null,
  primary key(application_id,object_id)
);
alter table gary_private.trash_retention enable row level security;
alter table gary_private.trash_holds enable row level security;
alter table gary_private.application_purges enable row level security;
alter table gary_private.application_purge_objects enable row level security;
revoke all on gary_private.trash_retention,gary_private.trash_holds,gary_private.application_purges,
  gary_private.application_purge_objects from public,anon,authenticated;

alter table gary_private.deletion_events drop constraint deletion_events_action_check,
  add constraint deletion_events_action_check check(action in ('deleted','restored','permanently_deleted'));
create unique index deletion_events_purged on gary_private.deletion_events(kind,record_id) where action='permanently_deleted';

create function gary_private.trash_purge_blocker(p_kind text,p_id uuid,p_deleted_at timestamptz)
returns text language sql stable set search_path='' as $$
  select case
    when exists(select 1 from gary_private.trash_holds h where h.kind=p_kind and h.record_id=p_id) then 'AGENCY_PURGE_HOLD'
    when r.minimum_days is null then 'AGENCY_PURGE_POLICY_MISSING'
    when p_deleted_at is null or now()<p_deleted_at+make_interval(days=>r.minimum_days) then 'AGENCY_PURGE_RETENTION_ACTIVE'
    else null end
  from (select 1) s left join gary_private.trash_retention r on r.kind=p_kind;
$$;

-- An article keeps its editorial state in Trash. Its live snapshot is removed
-- in the same transaction and the revision records the distinct Trash action.
create or replace function gary_private.trash_record(p_kind text,p_id uuid,p_expected_version integer default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_entries;marked timestamptz;ver integer;
begin
  if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
  if p_kind='cms' then
    if gary_private.cms_role() is distinct from 'admin' then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
    select * into v from public.gary_cms_entries where id=p_id for update;
    if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
    if p_expected_version is distinct from v.version then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001';end if;
    if v.deleted_at is not null then return jsonb_build_object('id',p_id,'kind',p_kind,'version',v.version,'deleted_at',v.deleted_at);end if;
    if v.kind='article' then
      update public.gary_cms_entries set deleted_at=clock_timestamp(),deleted_by=auth.uid(),updated_at=clock_timestamp(),updated_by=auth.uid(),version=version+1
        where id=p_id returning * into v;
      delete from public.gary_cms_public where entry_id=p_id;
      insert into public.gary_cms_revisions(entry_id,version,status,action,actor_id,snapshot)
        values(v.id,v.version,v.status,'trashed',auth.uid(),to_jsonb(v));
      marked:=v.deleted_at;ver:=v.version;
    else
      v:=gary_private.cms_transition(p_id,'archived',v.version);
      update public.gary_cms_entries set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at,version into marked,ver;
    end if;
  elsif p_kind in ('case','contact') then
    if gary_private.operations_role() is distinct from 'admin' then raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';end if;
    if p_kind='case' then
      select deleted_at into marked from public.gary_applications where id=p_id for update;
      if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
      if marked is not null then return jsonb_build_object('id',p_id,'kind',p_kind,'version',null,'deleted_at',marked);end if;
      update public.gary_applications set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at into marked;
    else
      select deleted_at into marked from public.gary_crm_contacts where id=p_id for update;
      if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
      if marked is null then update public.gary_crm_contacts set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at into marked;end if;
    end if;
  else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
  insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(p_kind,p_id,'deleted',auth.uid());
  return jsonb_build_object('id',p_id,'kind',p_kind,'version',ver,'deleted_at',marked);
end;
$$;

create function gary_private.trash_directory(p_category text,p_search text,p_status text,p_offset integer,p_limit integer)
returns jsonb language plpgsql stable security definer set search_path='' as $$
declare ops boolean:=gary_private.operations_role() is not distinct from 'admin';
  cms boolean:=gary_private.cms_role() is not distinct from 'admin';
  search_key text:=lower(left(btrim(coalesce(p_search,'')),120));
  result jsonb;
begin
  if auth.uid() is null or not (ops or cms) then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
  if p_category is not null and p_category not in ('case','contact','article','cms') then raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
  if (p_category in ('case','contact') and not ops) or (p_category in ('article','cms') and not cms) then
    raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';
  end if;

  with entries as (
    select a.id,'case'::text kind,'case'::text category,a.subject title_en,a.subject title_vi,null::integer version,a.deleted_at,a.deleted_by,a.status previous_status
    from public.gary_applications a where ops and a.deleted_at is not null and (p_category is null or p_category='case')
    union all
    select c.id,'contact','contact',c.full_name,c.full_name,null,c.deleted_at,c.deleted_by,c.stage
    from public.gary_crm_contacts c where ops and c.deleted_at is not null and (p_category is null or p_category='contact')
    union all
    select e.id,'cms',case when e.kind='article' then 'article' else 'cms' end,e.title_en,e.title_vi,e.version,e.deleted_at,e.deleted_by,
      case when e.status='archived' and latest.action='archived' then coalesce(previous.status,e.status) else e.status end
    from public.gary_cms_entries e
    left join public.gary_cms_revisions latest on latest.entry_id=e.id and latest.version=e.version
    left join public.gary_cms_revisions previous on previous.entry_id=e.id and previous.version=e.version-1
    where cms and e.deleted_at is not null and (p_category is null or p_category=case when e.kind='article' then 'article' else 'cms' end)
  ), matches as (
    select * from entries e where (coalesce(p_status,'')='' or e.previous_status=p_status)
      and strpos(lower(concat_ws(' ',e.title_en,e.title_vi)),search_key)>0
  ), page as (
    select * from matches order by deleted_at desc,id limit least(100,greatest(1,coalesce(p_limit,20))) offset greatest(0,coalesce(p_offset,0))
  ), details as (
    select p.*,nullif(btrim(u.full_name),'') deleted_by_name,
      case when p.category in ('case','article') then gary_private.trash_purge_blocker(p.category,p.id,p.deleted_at) end purge_blocker,
      exists(select 1 from gary_private.application_purges j where p.category='case' and j.application_id=p.id) purge_started
    from page p left join public.gary_profiles u on u.id=p.deleted_by
  )
  select jsonb_build_object('records',coalesce((select jsonb_agg(to_jsonb(d) order by d.deleted_at desc,d.id) from details d),'[]'::jsonb),
    'total',(select count(*) from matches)) into result;
  return result;
end;
$$;

create function gary_private.guard_case_purge_restore() returns trigger
language plpgsql set search_path='' as $$
begin
  if exists(select 1 from gary_private.application_purges p where p.application_id=old.id) then
    raise exception 'AGENCY_PURGE_IN_PROGRESS' using errcode='23514';
  end if;
  return new;
end;
$$;
create trigger gary_case_purge_restore_guard before update of deleted_at on public.gary_applications
  for each row when (old.deleted_at is not null and new.deleted_at is null) execute function gary_private.guard_case_purge_restore();

-- Hold a row share-lock for the duration of a normal upload/registration so
-- a concurrent Trash action sees any committed file before preparing its purge.
create function gary_private.lock_document_case(p_id text) returns boolean
language sql volatile security definer set search_path='' as $$
  select auth.uid() is not null and exists(select 1 from public.gary_applications a
    where a.id=case when p_id ~ '^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$' then p_id::uuid end
      and a.deleted_at is null and (a.customer_id=auth.uid() or gary_private.oversees_operations()
        or (a.assigned_staff_id=auth.uid() and gary_private.has_operations())) for share);
$$;
create policy gary_storage_lock_live_case on storage.objects as restrictive for insert to authenticated
  with check(bucket_id<>'gary-documents' or gary_private.lock_document_case(split_part(name,'/',1)));
create policy gary_document_lock_live_case on public.gary_documents as restrictive for insert to authenticated
  with check(gary_private.lock_document_case(application_id::text));

create function gary_private.case_purge_bucket_ready() returns boolean
language sql stable set search_path='' as $$
  select exists(select 1 from storage.buckets b where b.id='gary-documents' and not b.public
    and coalesce(to_jsonb(b)->>'versioning_status','DISABLED')='DISABLED');
$$;

create function gary_private.case_purge_object_allowed(p_object uuid,p_path text) returns boolean
language sql stable security definer set search_path='' as $$
  select auth.uid() is not null and (select gary_private.operations_role()) is not distinct from 'admin'
    and gary_private.case_purge_bucket_ready() and exists(
      select 1 from gary_private.application_purge_objects m
      join gary_private.application_purges j using(application_id)
      join public.gary_applications a on a.id=m.application_id and a.deleted_at=j.deleted_at
      where m.object_id=p_object and m.object_path=p_path
        and gary_private.trash_purge_blocker('case',a.id,a.deleted_at) is null
        and not exists(select 1 from public.gary_documents d where d.object_path=p_path and d.application_id<>a.id));
$$;

-- Storage remove uses SELECT and DELETE under object.delete_many. The added
-- SELECT authority is confined to that operation and the prepared objects.
create policy gary_storage_purge_read on storage.objects for select to authenticated
  using(bucket_id='gary-documents' and storage.allow_only_operation('object.delete_many') and gary_private.case_purge_object_allowed(id,name));
alter policy gary_storage_read_guard on storage.objects using(bucket_id<>'gary-documents' or
  (storage.allow_only_operation('object.delete_many') and gary_private.case_purge_object_allowed(id,name)) or exists(
    select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
    and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
create policy gary_storage_purge_delete on storage.objects for delete to authenticated
  using(bucket_id='gary-documents' and storage.allow_only_operation('object.delete_many') and gary_private.case_purge_object_allowed(id,name));
alter policy gary_storage_delete_guard on storage.objects using(bucket_id<>'gary-documents' or
  (storage.allow_only_operation('object.delete_many') and gary_private.case_purge_object_allowed(id,name)) or (
    split_part(name,'/',2)=(select auth.uid())::text and not exists(select 1 from public.gary_documents d where d.object_path=name)
    and exists(select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
      and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations()))))));

create function gary_private.assert_purge_dependencies(p_kind text) returns void
language plpgsql stable set search_path='' as $$
begin
  -- Stop before external cleanup if new foreign keys change the deletion scope.
  if p_kind='case' and exists(select 1 from pg_constraint f where f.contype='f' and (
    (f.confrelid='public.gary_applications'::regclass and (f.confdeltype<>'c' or f.conrelid not in (
      'public.gary_documents'::regclass,'public.gary_application_events'::regclass,'public.gary_messages'::regclass,
      'public.gary_staff_notes'::regclass,'gary_private.application_purges'::regclass))) or
    f.confrelid in ('public.gary_documents'::regclass,'public.gary_application_events'::regclass,'public.gary_messages'::regclass,'public.gary_staff_notes'::regclass)))
  or p_kind='article' and exists(select 1 from pg_constraint f where f.contype='f' and (
    (f.confrelid='public.gary_cms_entries'::regclass and f.conrelid not in ('public.gary_cms_public'::regclass,'public.gary_cms_revisions'::regclass))
    or f.confrelid in ('public.gary_cms_public'::regclass,'public.gary_cms_revisions'::regclass))) then
    raise exception 'AGENCY_PURGE_DEPENDENCY' using errcode='23514';
  end if;
end;
$$;

create function gary_private.permanently_delete_trash(p_kind text,p_id uuid,p_deleted_at timestamptz,p_confirmed boolean)
returns jsonb language plpgsql security definer set search_path='' as $$
declare marked timestamptz; problem text; paths jsonb; audit_kind text;
begin
  if p_kind='case' then
    if auth.uid() is null or gary_private.operations_role() is distinct from 'admin' then raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';end if;
    audit_kind:='case';
  elsif p_kind='article' then
    if auth.uid() is null or gary_private.cms_role() is distinct from 'admin' then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
    audit_kind:='cms';
  else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
  if p_confirmed is distinct from true then raise exception 'AGENCY_PURGE_CONFIRMATION' using errcode='23514';end if;

  if p_kind='case' then
    select deleted_at into marked from public.gary_applications where id=p_id for update;
  else
    select deleted_at into marked from public.gary_cms_entries where id=p_id and kind='article' for update;
  end if;
  if not found and exists(select 1 from gary_private.deletion_events e where e.kind=audit_kind and e.record_id=p_id and e.action='permanently_deleted') then
    return jsonb_build_object('id',p_id,'deleted',true);
  end if;
  if marked is null or marked is distinct from p_deleted_at then raise exception 'AGENCY_TRASH_CHANGED' using errcode='40001';end if;
  problem:=gary_private.trash_purge_blocker(p_kind,p_id,marked);
  if problem is not null then raise exception '%',problem using errcode='23514';end if;
  perform gary_private.assert_purge_dependencies(p_kind);

  if p_kind='case' then
    if not gary_private.case_purge_bucket_ready() then raise exception 'AGENCY_PURGE_STORAGE_SETUP' using errcode='23514';end if;
    if exists(select 1 from public.gary_documents d where d.application_id=p_id and split_part(d.object_path,'/',1)<>p_id::text)
      or exists(select 1 from public.gary_documents d where d.object_path like p_id::text||'/%' and d.application_id<>p_id) then
      raise exception 'AGENCY_PURGE_DEPENDENCY' using errcode='23514';
    end if;
    if exists(select 1 from storage.objects o where o.bucket_id='gary-documents' and o.name like p_id::text||'/%' and (
      o.name !~ ('^'||p_id::text||'/[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}/[^/]+$')
      or coalesce((to_jsonb(o)->>'is_versioned')::boolean,false) or coalesce(to_jsonb(o)->>'archived_at','')<>''
      or coalesce((to_jsonb(o)->>'is_delete_marker')::boolean,false))) then
      raise exception 'AGENCY_PURGE_DEPENDENCY' using errcode='23514';
    end if;

    if exists(select 1 from storage.objects o where o.bucket_id='gary-documents' and o.name like p_id::text||'/%') then
      insert into gary_private.application_purges(application_id,deleted_at) values(p_id,marked) on conflict do nothing;
      if found then
        insert into gary_private.application_purge_objects(application_id,object_id,object_path)
          select p_id,o.id,o.name from storage.objects o where o.bucket_id='gary-documents' and o.name like p_id::text||'/%';
      end if;
      if exists(select 1 from storage.objects o where o.bucket_id='gary-documents' and o.name like p_id::text||'/%'
        and not exists(select 1 from gary_private.application_purge_objects m where m.application_id=p_id and m.object_id=o.id and m.object_path=o.name)) then
        raise exception 'AGENCY_PURGE_DEPENDENCY' using errcode='23514';
      end if;
      select jsonb_agg(batch.name order by batch.name) into paths from (
        select o.name from storage.objects o where o.bucket_id='gary-documents' and o.name like p_id::text||'/%' order by o.name limit 100
      ) batch;
      return jsonb_build_object('id',p_id,'deleted',false,'paths',paths);
    end if;

    -- The Storage API has removed all case-owned object keys. FKs remove only
    -- case documents, messages, notes and events, plus the temporary manifest.
    delete from public.gary_applications where id=p_id;
  else
    if exists(select 1 from public.gary_cms_public where entry_id=p_id) then raise exception 'AGENCY_PURGE_DEPENDENCY' using errcode='23514';end if;
    -- CMS library assets have their own lifecycle and may be reused anywhere.
    delete from public.gary_cms_revisions where entry_id=p_id;
    delete from public.gary_cms_entries where id=p_id;
  end if;
  if not found then raise exception 'AGENCY_TRASH_CHANGED' using errcode='40001';end if;
  insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(audit_kind,p_id,'permanently_deleted',auth.uid());
  return jsonb_build_object('id',p_id,'deleted',true);
end;
$$;

create function public.gary_trash_directory(p_category text default null,p_search text default '',p_status text default '',p_offset integer default 0,p_limit integer default 20)
returns jsonb language sql stable security invoker set search_path='' as $$
  select gary_private.trash_directory(p_category,p_search,p_status,p_offset,p_limit);
$$;
create function public.gary_permanently_delete_trash(p_kind text,p_id uuid,p_deleted_at timestamptz,p_confirmed boolean)
returns jsonb language sql security invoker set search_path='' as $$
  select gary_private.permanently_delete_trash(p_kind,p_id,p_deleted_at,p_confirmed);
$$;
revoke all on function gary_private.trash_purge_blocker(text,uuid,timestamptz),gary_private.guard_case_purge_restore(),
  gary_private.lock_document_case(text),gary_private.case_purge_bucket_ready(),gary_private.case_purge_object_allowed(uuid,text),
  gary_private.assert_purge_dependencies(text),gary_private.trash_directory(text,text,text,integer,integer),
  gary_private.permanently_delete_trash(text,uuid,timestamptz,boolean),public.gary_trash_directory(text,text,text,integer,integer),
  public.gary_permanently_delete_trash(text,uuid,timestamptz,boolean) from public,anon,authenticated;
grant execute on function gary_private.lock_document_case(text),gary_private.case_purge_object_allowed(uuid,text),
  gary_private.trash_directory(text,text,text,integer,integer),gary_private.permanently_delete_trash(text,uuid,timestamptz,boolean),
  public.gary_trash_directory(text,text,text,integer,integer),public.gary_permanently_delete_trash(text,uuid,timestamptz,boolean) to authenticated;

notify pgrst,'reload schema';
commit;
