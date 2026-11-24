-- Deterministic application conflicts must reach the caller as HTTP 409.
-- PostgreSQL's own serialization failures and deadlocks retain their SQLSTATEs.
begin;
set local search_path = pg_catalog, public;

CREATE OR REPLACE FUNCTION gary_private.cms_save(p_record jsonb, p_expected_version integer, p_action text DEFAULT 'saved'::text)
 RETURNS gary_cms_entries
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.gary_cms_entries; v_id uuid; v_kind text; v_slug text;
begin
  if auth.uid() is null or not coalesce(gary_private.cms_role() in ('editor','admin'),false) then
    raise exception 'CMS_ACCESS_DENIED' using errcode='42501'; end if;
  if p_record is null or jsonb_typeof(p_record)<>'object' then raise exception 'CMS_INVALID_RECORD' using errcode='22023'; end if;
  v_id:=nullif(p_record->>'id','')::uuid; v_kind:=p_record->>'kind'; v_slug:=p_record->>'slug';
  if v_id is not null then
    select * into v from public.gary_cms_entries where id=v_id for update;
    if not found then raise exception 'CMS_RECORD_MISSING' using errcode='P0002'; end if;
    if p_expected_version is null or v.version<>p_expected_version then raise exception 'CMS_VERSION_CONFLICT' using errcode='PT409'; end if;
    if v.kind<>v_kind then raise exception 'CMS_KIND_IMMUTABLE' using errcode='22023'; end if;
    if v.kind='article' and v.published_at is not null and v_slug is distinct from v.slug then
      if p_action='restored' then v_slug:=v.slug;
      else raise exception 'CMS_PUBLISHED_SLUG' using errcode='23514'; end if;
    end if;
  else
    if p_expected_version is not null then raise exception 'CMS_VERSION_CONFLICT' using errcode='PT409'; end if;
    v_id:=gen_random_uuid();
  end if;
  insert into public.gary_cms_entries(id,kind,slug,title_en,title_vi,summary_en,summary_vi,body_en,body_vi,
    seo_title_en,seo_title_vi,seo_description_en,seo_description_vi,data,status,version,created_by,updated_by)
  values(v_id,v_kind,v_slug,coalesce(p_record->>'title_en',''),coalesce(p_record->>'title_vi',''),
    coalesce(p_record->>'summary_en',''),coalesce(p_record->>'summary_vi',''),coalesce(p_record->>'body_en',''),coalesce(p_record->>'body_vi',''),
    coalesce(p_record->>'seo_title_en',''),coalesce(p_record->>'seo_title_vi',''),coalesce(p_record->>'seo_description_en',''),
    coalesce(p_record->>'seo_description_vi',''),coalesce(p_record->'data','{}'),'draft',1,auth.uid(),auth.uid())
  on conflict(id) do update set slug=excluded.slug,title_en=excluded.title_en,title_vi=excluded.title_vi,summary_en=excluded.summary_en,
    summary_vi=excluded.summary_vi,body_en=excluded.body_en,body_vi=excluded.body_vi,seo_title_en=excluded.seo_title_en,
    seo_title_vi=excluded.seo_title_vi,seo_description_en=excluded.seo_description_en,seo_description_vi=excluded.seo_description_vi,
    data=excluded.data,status='draft',version=gary_cms_entries.version+1,updated_by=auth.uid(),updated_at=clock_timestamp()
  returning * into v;
  insert into public.gary_cms_revisions(entry_id,version,status,action,actor_id,snapshot) values(v.id,v.version,v.status,p_action,auth.uid(),to_jsonb(v));
  return v;
end;
$function$;

CREATE OR REPLACE FUNCTION gary_private.cms_transition(p_id uuid, p_status text, p_expected_version integer)
 RETURNS gary_cms_entries
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.gary_cms_entries; v_role text;
begin
 v_role:=gary_private.cms_role();
 if auth.uid() is null or v_role is null then raise exception 'CMS_ACCESS_DENIED' using errcode='42501';end if;
 if p_status is null or p_status not in ('draft','review','published','archived') then raise exception 'CMS_INVALID_STATUS' using errcode='22023';end if;
 if p_status in ('published','archived') and v_role not in ('publisher','admin') then raise exception 'CMS_PUBLISH_DENIED' using errcode='42501';end if;
 select * into v from public.gary_cms_entries where id=p_id for update;
 if not found then raise exception 'CMS_RECORD_MISSING' using errcode='P0002';end if;
 if p_expected_version is null or v.version<>p_expected_version then raise exception 'CMS_VERSION_CONFLICT' using errcode='PT409';end if;
 if p_status='published' and v.status<>'review' then raise exception 'CMS_REVIEW_REQUIRED' using errcode='23514';end if;
 if p_status in ('review','published') and (trim(v.title_en)='' or trim(v.title_vi)='' or trim(v.summary_en)='' or trim(v.summary_vi)='' or (v.kind<>'landing' and (trim(v.body_en)='' or trim(v.body_vi)=''))) then raise exception 'CMS_TRANSLATION_REQUIRED' using errcode='23514';end if;
 if p_status in ('review','published') and v.kind='landing' and (coalesce(v.data->>'slot','') not in ('hero','services','process','about','faq','contact')) then raise exception 'CMS_LANDING_SLOT_REQUIRED' using errcode='23514';end if;
 if p_status in ('review','published') and v.kind='service' and (coalesce(v.data->>'category','') not in ('travel','settle','documents') or coalesce(v.data->>'service_type','') not in ('visa','work','residence','documents')) then raise exception 'CMS_SERVICE_GROUP_REQUIRED' using errcode='23514';end if;
 if p_status='published' and coalesce(v.data->>'image_url','')<>'' and not (v.data->>'image_url' ~ '^https://duyiihsmaqfgwezmsnjs[.]supabase[.]co/storage/v1/object/public/gary-cms-media/[^[:space:]]+$' or v.data->>'image_url' ~ '^/[^/[:space:]][^[:space:]]*$') then raise exception 'CMS_INVALID_MEDIA_URL' using errcode='23514';end if;
 update public.gary_cms_entries set status=p_status,version=version+1,updated_by=auth.uid(),updated_at=clock_timestamp(),published_at=case when p_status='published' then clock_timestamp() else published_at end where id=p_id returning * into v;
 if p_status='published' then
  insert into public.gary_cms_public(entry_id,kind,slug,content,published_at) values(v.id,v.kind,v.slug,gary_private.cms_public_payload(v),v.published_at)
  on conflict(entry_id) do update set kind=excluded.kind,slug=excluded.slug,content=excluded.content,published_at=excluded.published_at;
 elsif p_status='archived' then delete from public.gary_cms_public where entry_id=v.id;
 end if;
 insert into public.gary_cms_revisions(entry_id,version,status,action,actor_id,snapshot) values(v.id,v.version,v.status,p_status,auth.uid(),to_jsonb(v));
 return v;
end;$function$;

CREATE OR REPLACE FUNCTION gary_private.edit_staff_member(p_user_id uuid, p_full_name text, p_expected_name text, p_operations_role text, p_expected_operations_role text, p_cms_role text, p_expected_cms_role text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_member gary_private.staff_members%rowtype;v_cms text;v_cms_active boolean;v_current_cms text;
 v_name text:=nullif(btrim(p_full_name),'');v_identity_name text;
 v_admin_operations boolean:=gary_private.operations_role() is not distinct from 'admin';
 v_admin_cms boolean:=gary_private.cms_role() is not distinct from 'admin';
begin
 if not (v_admin_operations or v_admin_cms) then raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';end if;
 if p_user_id=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 select * into v_member from gary_private.staff_members where user_id=p_user_id and revoked_at is null for update;
 if not found then raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';end if;
 select role,active into v_cms,v_cms_active from gary_private.cms_members where user_id=p_user_id for update;
 v_current_cms:=case when v_cms_active then v_cms end;
 if v_member.operations_role is distinct from p_expected_operations_role or v_current_cms is distinct from p_expected_cms_role
  or v_member.display_name_override is distinct from p_expected_name then
  raise exception 'AGENCY_ROLE_CONFLICT' using errcode='PT409';
 end if;
 if v_name is distinct from v_member.display_name_override then
  if not gary_private.can_manage_membership(v_member.operations_role,v_cms,v_cms_active,v_admin_operations,v_admin_cms) then
   raise exception 'AGENCY_STAFF_NAME_DENIED' using errcode='42501';
  end if;
  if char_length(v_name)>100 or v_name ~ '[[:cntrl:]]' then raise exception 'AGENCY_STAFF_NAME_INVALID' using errcode='22023';end if;
  select gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data) into v_identity_name
  from auth.users u left join public.gary_profiles p on p.id=u.id where u.id=p_user_id;
  update gary_private.staff_members set display_name_override=nullif(v_name,v_identity_name) where user_id=p_user_id;
 end if;
 if p_operations_role is distinct from p_expected_operations_role then
  perform gary_private.set_operations_role(p_user_id,p_operations_role,p_expected_operations_role);
 end if;
 if p_cms_role is distinct from p_expected_cms_role then
  perform gary_private.set_cms_role(p_user_id,p_cms_role,p_expected_cms_role);
 end if;
 return jsonb_build_object('user_id',p_user_id);
end;$function$;

CREATE OR REPLACE FUNCTION gary_private.permanently_delete_trash(p_kind text, p_id uuid, p_deleted_at timestamp with time zone, p_confirmed boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
  if marked is null or marked is distinct from p_deleted_at then raise exception 'AGENCY_TRASH_CHANGED' using errcode='PT409';end if;
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
  if not found then raise exception 'AGENCY_TRASH_CHANGED' using errcode='PT409';end if;
  insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(audit_kind,p_id,'permanently_deleted',auth.uid());
  return jsonb_build_object('id',p_id,'deleted',true);
end;
$function$;

CREATE OR REPLACE FUNCTION gary_private.remove_staff_member(p_user_id uuid, p_expected_operations_role text, p_expected_cms_role text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_operations text;v_cms text;v_cms_active boolean;v_current_cms text;
 v_admin_operations boolean:=gary_private.operations_role() is not distinct from 'admin';
 v_admin_cms boolean:=gary_private.cms_role() is not distinct from 'admin';
begin
 if not (v_admin_operations or v_admin_cms) then raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';end if;
 if p_user_id=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 select operations_role into v_operations from gary_private.staff_members where user_id=p_user_id and revoked_at is null for update;
 if not found then raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';end if;
 select role,active into v_cms,v_cms_active from gary_private.cms_members where user_id=p_user_id for update;
 v_current_cms:=case when v_cms_active then v_cms end;
 if v_operations='admin' or v_cms='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if v_operations is distinct from p_expected_operations_role or v_current_cms is distinct from p_expected_cms_role then
  raise exception 'AGENCY_ROLE_CONFLICT' using errcode='PT409';
 end if;
 if not gary_private.can_manage_membership(v_operations,v_cms,v_cms_active,v_admin_operations,v_admin_cms) then
  raise exception 'AGENCY_STAFF_REMOVE_DENIED' using errcode='42501';
 end if;
 if v_operations is not null then
  perform gary_private.set_operations_role(p_user_id,null,v_operations);
 else
  perform gary_private.require_case_reassignment(p_user_id);
 end if;
 if v_current_cms is not null then perform gary_private.set_cms_role(p_user_id,null,v_current_cms);end if;
 update gary_private.staff_members set revoked_at=clock_timestamp() where user_id=p_user_id;
 insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source)
 values(p_user_id,'membership','member',null,auth.uid(),'portal');
 return jsonb_build_object('user_id',p_user_id);
end;$function$;

CREATE OR REPLACE FUNCTION gary_private.restore_record(p_kind text, p_id uuid, p_expected_version integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.gary_cms_entries;marked timestamptz;ver integer;
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
 if p_kind='cms' then
  if gary_private.cms_role() is distinct from 'admin' then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
  select * into v from public.gary_cms_entries where id=p_id for update;
  if not found or v.deleted_at is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  if p_expected_version is distinct from v.version then raise exception 'CMS_VERSION_CONFLICT' using errcode='PT409';end if;
  update public.gary_cms_entries set deleted_at=null,deleted_by=null where id=p_id returning * into v;
  v:=gary_private.cms_save(to_jsonb(v),v.version,'restored_from_trash');ver:=v.version;
 elsif p_kind in('case','contact') then
  if gary_private.operations_role() is distinct from 'admin' then raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';end if;
  if p_kind='case' then
   select deleted_at into marked from public.gary_applications where id=p_id for update;
   if not found or marked is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
   update public.gary_applications set deleted_at=null,deleted_by=null where id=p_id;
  else
   select deleted_at into marked from public.gary_crm_contacts where id=p_id for update;
   if not found or marked is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
   update public.gary_crm_contacts set deleted_at=null,deleted_by=null where id=p_id;
  end if;
 else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
 insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(p_kind,p_id,'restored',auth.uid());
 return jsonb_build_object('id',p_id,'kind',p_kind,'version',ver,'deleted_at',null);
end;$function$;

CREATE OR REPLACE FUNCTION gary_private.set_cms_role(p_user_id uuid, p_role text, p_expected_role text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_current text;v_stored_role text;
begin
 if auth.uid() is null or not gary_private.is_staff() or gary_private.cms_role() is distinct from 'admin' then
  raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';
 end if;
 if p_user_id is null or (p_role is not null and p_role not in('editor','publisher','admin')) or (p_expected_role is not null and p_expected_role not in('editor','publisher','admin')) then
  raise exception 'AGENCY_ROLE_INVALID' using errcode='22023';
 end if;
 if p_user_id=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 perform 1 from gary_private.staff_members where user_id=p_user_id and revoked_at is null for update;
 if not found then raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';end if;
 select role,case when active then role end into v_stored_role,v_current from gary_private.cms_members where user_id=p_user_id for update;
 if v_stored_role='admin' or p_role='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if v_current is distinct from p_expected_role then raise exception 'AGENCY_ROLE_CONFLICT' using errcode='PT409';end if;
 if p_role is not null and not gary_private.staff_identity_eligible(p_user_id) then
  raise exception 'AGENCY_TARGET_INELIGIBLE' using errcode='P0002';
 end if;
 if v_current is distinct from p_role then
  if p_role is null then update gary_private.cms_members set active=false where user_id=p_user_id;
  else insert into gary_private.cms_members(user_id,role,active) values(p_user_id,p_role,true) on conflict(user_id) do update set role=excluded.role,active=true;end if;
  insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source) values(p_user_id,'cms',v_current,p_role,auth.uid(),'portal');
 end if;
 return jsonb_build_object('user_id',p_user_id,'cms_role',p_role);
end;$function$;

CREATE OR REPLACE FUNCTION gary_private.set_operations_role(p_user_id uuid, p_role text, p_expected_role text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_current text;
begin
 if auth.uid() is null or not gary_private.is_staff() or gary_private.operations_role() is distinct from 'admin' then
  raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';
 end if;
 if p_user_id is null or (p_role is not null and p_role not in('staff','manager','admin')) or (p_expected_role is not null and p_expected_role not in('staff','manager','admin')) then
  raise exception 'AGENCY_ROLE_INVALID' using errcode='22023';
 end if;
 if p_user_id=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 select operations_role into v_current from gary_private.staff_members where user_id=p_user_id and revoked_at is null for update;
 if not found then raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';end if;
 if v_current='admin' or p_role='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if v_current is distinct from p_expected_role then raise exception 'AGENCY_ROLE_CONFLICT' using errcode='PT409';end if;
 if p_role is not null and not gary_private.staff_identity_eligible(p_user_id) then
  raise exception 'AGENCY_TARGET_INELIGIBLE' using errcode='P0002';
 end if;
 if v_current is distinct from p_role then
  if p_role is null then perform gary_private.require_case_reassignment(p_user_id);end if;
  update gary_private.staff_members set operations_role=p_role where user_id=p_user_id;
  insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source) values(p_user_id,'operations',v_current,p_role,auth.uid(),'portal');
  if p_role is distinct from 'manager' then update gary_private.chat_staff_presence set available=false where staff_id=p_user_id and available;end if;
 end if;
 return jsonb_build_object('user_id',p_user_id,'operations_role',p_role);
end;$function$;

CREATE OR REPLACE FUNCTION gary_private.trash_record(p_kind text, p_id uuid, p_expected_version integer DEFAULT NULL::integer)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.gary_cms_entries;marked timestamptz;ver integer;
begin
  if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
  if p_kind='cms' then
    if gary_private.cms_role() is distinct from 'admin' then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
    select * into v from public.gary_cms_entries where id=p_id for update;
    if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
    if p_expected_version is distinct from v.version then raise exception 'CMS_VERSION_CONFLICT' using errcode='PT409';end if;
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
$function$;

CREATE OR REPLACE FUNCTION public.gary_cms_update_media(p_id uuid, p_version integer, p_alt_en text, p_alt_vi text, p_caption_en text, p_caption_vi text)
 RETURNS gary_cms_media
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare media public.gary_cms_media;
begin
  if auth.uid() is null or not coalesce(gary_private.cms_role() in('editor','admin'),false) then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if trim(coalesce(p_alt_en,''))='' or trim(coalesce(p_alt_vi,''))='' then raise exception 'CMS_MEDIA_INVALID' using errcode='23514'; end if;
  update public.gary_cms_media set alt_en=trim(p_alt_en),alt_vi=trim(p_alt_vi),caption_en=trim(coalesce(p_caption_en,'')),
    caption_vi=trim(coalesce(p_caption_vi,'')),version=version+1 where id=p_id and version=p_version and state='ready' returning * into media;
  if not found then raise exception 'CMS_VERSION_CONFLICT' using errcode='PT409'; end if;
  return media;
end;
$function$;

commit;
