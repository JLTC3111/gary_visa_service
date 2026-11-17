begin;
-- Recoverable Agency deletion only. Auth identities and physical documents remain intact.
alter table public.gary_applications add column deleted_at timestamptz, add column deleted_by uuid references auth.users(id) on delete set null;
alter table public.gary_crm_contacts add column deleted_at timestamptz, add column deleted_by uuid references auth.users(id) on delete set null;
alter table public.gary_cms_entries add column deleted_at timestamptz, add column deleted_by uuid references auth.users(id) on delete set null;
create index gary_cases_trash_date on public.gary_applications(deleted_at desc,id) where deleted_at is not null;
create index gary_contacts_trash_date on public.gary_crm_contacts(deleted_at desc,id) where deleted_at is not null;
create index gary_content_trash_date on public.gary_cms_entries(deleted_at desc,id) where deleted_at is not null;

create table gary_private.deletion_events(
 id uuid primary key default gen_random_uuid(),kind text not null check(kind in('case','contact','cms')),
 record_id uuid not null,action text not null check(action in('deleted','restored')),
 actor_id uuid references auth.users(id) on delete set null,created_at timestamptz not null default clock_timestamp()
);
alter table gary_private.deletion_events enable row level security;
revoke all on gary_private.deletion_events from public,anon,authenticated;

-- Restrictive policies compose with existing ownership/staff policies and keep
-- trashed rows hidden even when another permissive policy exists.
create policy gary_cases_not_deleted on public.gary_applications as restrictive for all to anon,authenticated using(deleted_at is null) with check(deleted_at is null);
create policy gary_contacts_not_deleted on public.gary_crm_contacts as restrictive for all to anon,authenticated using(deleted_at is null) with check(deleted_at is null);
create policy gary_content_not_deleted on public.gary_cms_entries as restrictive for all to anon,authenticated using(deleted_at is null) with check(deleted_at is null);
create policy gary_case_events_not_deleted on public.gary_application_events as restrictive for all to authenticated using(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null)) with check(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null));
create policy gary_case_messages_not_deleted on public.gary_messages as restrictive for all to authenticated using(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null)) with check(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null));
create policy gary_case_notes_not_deleted on public.gary_staff_notes as restrictive for all to authenticated using(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null)) with check(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null));
create policy gary_case_documents_not_deleted on public.gary_documents as restrictive for all to authenticated using(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null)) with check(exists(select 1 from public.gary_applications a where a.id=application_id and a.deleted_at is null));
create policy gary_contact_notes_not_deleted on public.gary_crm_notes as restrictive for all to authenticated using(exists(select 1 from public.gary_crm_contacts c where c.id=contact_id and c.deleted_at is null)) with check(exists(select 1 from public.gary_crm_contacts c where c.id=contact_id and c.deleted_at is null));
create policy gary_contact_events_not_deleted on public.gary_crm_events as restrictive for all to authenticated using(exists(select 1 from public.gary_crm_contacts c where c.id=contact_id and c.deleted_at is null)) with check(exists(select 1 from public.gary_crm_contacts c where c.id=contact_id and c.deleted_at is null));

-- Existing CMS save/transition RPCs are definer functions. Prevent a known
-- trashed ID from being edited or republished through those older endpoints.
create function gary_private.guard_deleted_content() returns trigger language plpgsql set search_path='' as $$
begin
 if old.deleted_at is not null and new.deleted_at is not null and
    (to_jsonb(new)-array['created_by','updated_by','deleted_by']) is distinct from (to_jsonb(old)-array['created_by','updated_by','deleted_by'])
 then raise exception 'AGENCY_RECORD_DELETED' using errcode='23514';end if;
 return new;
end;$$;
revoke all on function gary_private.guard_deleted_content() from public,anon,authenticated;
create trigger gary_deleted_content_guard before update on public.gary_cms_entries for each row execute function gary_private.guard_deleted_content();

create function gary_private.trash_record(p_kind text,p_id uuid,p_expected_version integer default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_entries;marked timestamptz;ver integer;
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
 if p_kind='cms' then
  if coalesce(gary_private.cms_role(),'') not in('publisher','admin') then raise exception 'AGENCY_PUBLISHER_REQUIRED' using errcode='42501';end if;
  select * into v from public.gary_cms_entries where id=p_id for update;
  if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  if p_expected_version is distinct from v.version then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001';end if;
  if v.deleted_at is not null then return jsonb_build_object('id',p_id,'kind',p_kind,'version',v.version,'deleted_at',v.deleted_at);end if;
  v:=gary_private.cms_transition(p_id,'archived',v.version);
  update public.gary_cms_entries set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at,version into marked,ver;
 elsif p_kind='case' then
  select deleted_at into marked from public.gary_applications where id=p_id for update;
  if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  if marked is null then update public.gary_applications set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at into marked;end if;
 elsif p_kind='contact' then
  select deleted_at into marked from public.gary_crm_contacts where id=p_id for update;
  if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  if marked is null then update public.gary_crm_contacts set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at into marked;end if;
 else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
 insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(p_kind,p_id,'deleted',auth.uid());
 return jsonb_build_object('id',p_id,'kind',p_kind,'version',ver,'deleted_at',marked);
end;$$;
revoke all on function gary_private.trash_record(text,uuid,integer) from public,anon;
grant execute on function gary_private.trash_record(text,uuid,integer) to authenticated;

create function gary_private.restore_record(p_kind text,p_id uuid,p_expected_version integer default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_entries;marked timestamptz;ver integer;
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
 if p_kind='cms' then
  if coalesce(gary_private.cms_role(),'') not in('publisher','admin') then raise exception 'AGENCY_PUBLISHER_REQUIRED' using errcode='42501';end if;
  select * into v from public.gary_cms_entries where id=p_id for update;
  if not found or v.deleted_at is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  if p_expected_version is distinct from v.version then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001';end if;
  update public.gary_cms_entries set deleted_at=null,deleted_by=null where id=p_id returning * into v;
  v:=gary_private.cms_save(to_jsonb(v),v.version,'restored_from_trash');ver:=v.version;
 elsif p_kind='case' then
  select deleted_at into marked from public.gary_applications where id=p_id for update;
  if not found or marked is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  update public.gary_applications set deleted_at=null,deleted_by=null where id=p_id;
 elsif p_kind='contact' then
  select deleted_at into marked from public.gary_crm_contacts where id=p_id for update;
  if not found or marked is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  update public.gary_crm_contacts set deleted_at=null,deleted_by=null where id=p_id;
 else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
 insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(p_kind,p_id,'restored',auth.uid());
 return jsonb_build_object('id',p_id,'kind',p_kind,'version',ver,'deleted_at',null);
end;$$;
revoke all on function gary_private.restore_record(text,uuid,integer) from public,anon;
grant execute on function gary_private.restore_record(text,uuid,integer) to authenticated;

create function gary_private.list_trash(p_kind text default null,p_offset integer default 0,p_limit integer default 20) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare result jsonb;may_content boolean;
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
 if p_kind is not null and p_kind not in('case','contact','cms') then raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
 may_content:=coalesce(gary_private.cms_role(),'') in('publisher','admin');
 if p_kind='cms' and not may_content then raise exception 'AGENCY_PUBLISHER_REQUIRED' using errcode='42501';end if;
 with records as (
  select id,'case'::text kind,subject title,null::integer version,deleted_at,deleted_by from public.gary_applications where deleted_at is not null and (p_kind is null or p_kind='case')
  union all select id,'contact',full_name,null::integer,deleted_at,deleted_by from public.gary_crm_contacts where deleted_at is not null and (p_kind is null or p_kind='contact')
  union all select id,'cms',coalesce(nullif(title_en,''),title_vi),version,deleted_at,deleted_by from public.gary_cms_entries where deleted_at is not null and may_content and (p_kind is null or p_kind='cms')
 ),paged as (select * from records order by deleted_at desc,id offset greatest(0,coalesce(p_offset,0)) limit least(100,greatest(1,coalesce(p_limit,20))))
 select jsonb_build_object('records',coalesce((select jsonb_agg(to_jsonb(paged) order by deleted_at desc,id) from paged),'[]'::jsonb),'total',(select count(*) from records)) into result;
 return result;
end;$$;
revoke all on function gary_private.list_trash(text,integer,integer) from public,anon;
grant execute on function gary_private.list_trash(text,integer,integer) to authenticated;
create function public.gary_trash_record(p_kind text,p_id uuid,p_expected_version integer default null) returns jsonb language sql security invoker set search_path='' as $$select gary_private.trash_record(p_kind,p_id,p_expected_version)$$;
create function public.gary_restore_record(p_kind text,p_id uuid,p_expected_version integer default null) returns jsonb language sql security invoker set search_path='' as $$select gary_private.restore_record(p_kind,p_id,p_expected_version)$$;
create function public.gary_list_trash(p_kind text default null,p_offset integer default 0,p_limit integer default 20) returns jsonb language sql security invoker set search_path='' as $$select gary_private.list_trash(p_kind,p_offset,p_limit)$$;
revoke all on function public.gary_trash_record(text,uuid,integer),public.gary_restore_record(text,uuid,integer),public.gary_list_trash(text,integer,integer) from public,anon;
grant execute on function public.gary_trash_record(text,uuid,integer),public.gary_restore_record(text,uuid,integer),public.gary_list_trash(text,integer,integer) to authenticated;
commit;
