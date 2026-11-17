begin;
-- Gary Visa Operations roles, CMS trash authority and Visa-only staff access management.
-- gary_private.staff_members stays the Visa staff directory (membership only). Operations
-- (staff, manager, admin) and CMS (editor, publisher, admin) roles are independent; neither
-- is inferred from Gary Home, Teaching Jobs, an email address or Auth metadata.
--
-- Rollout: every existing member previously had unrestricted operational access, so each
-- becomes Operations Admin here and the change is recorded in gary_private.access_events.
-- Accounts, CMS roles, passwords and historical records are untouched. Publishers lose only
-- CMS trash/restore. Narrowing an existing member is an explicit owner decision made with
-- supabase/set-visa-roles.sql. Members added later start with No Access.
alter table gary_private.staff_members add column operations_role text check(operations_role in('staff','manager','admin'));

create table gary_private.access_events(
 id uuid primary key default gen_random_uuid(),
 member_id uuid not null,
 scope text not null check(scope in('operations','cms')),
 from_role text,to_role text,
 actor_id uuid references auth.users(id) on delete set null,
 source text not null check(source in('migration','portal','owner')),
 created_at timestamptz not null default clock_timestamp()
);
create index gary_access_events_member on gary_private.access_events(member_id,created_at desc);
create index gary_access_events_actor on gary_private.access_events(actor_id);
alter table gary_private.access_events enable row level security;
revoke all on gary_private.access_events from public,anon,authenticated;

update gary_private.staff_members set operations_role='admin' where operations_role is null;
insert into gary_private.access_events(member_id,scope,from_role,to_role,source)
select user_id,'operations','legacy_staff','admin','migration' from gary_private.staff_members where operations_role='admin';

-- Membership alone (gary_private.is_staff) never grants case, contact or chat data.
create function gary_private.operations_role() returns text
language sql stable security definer set search_path='' as $$
 select s.operations_role from gary_private.staff_members s where s.user_id=(select auth.uid());
$$;
create function gary_private.has_operations() returns boolean
language sql stable security definer set search_path='' as $$ select gary_private.operations_role() is not null; $$;
create function gary_private.oversees_operations() returns boolean
language sql stable security definer set search_path='' as $$ select coalesce(gary_private.operations_role() in('manager','admin'),false); $$;
create function gary_private.is_assignable(p_user uuid) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from gary_private.staff_members s where s.user_id=p_user and s.operations_role is not null);
$$;
revoke all on function gary_private.operations_role(),gary_private.has_operations(),gary_private.oversees_operations(),gary_private.is_assignable(uuid) from public,anon,authenticated;
grant execute on function gary_private.operations_role(),gary_private.has_operations(),gary_private.oversees_operations(),gary_private.is_assignable(uuid) to authenticated;

-- Cases: Staff see assigned cases; Managers and Operations Admins oversee every case.
drop policy gary_profiles_select on public.gary_profiles;
create policy gary_profiles_select on public.gary_profiles for select to authenticated
 using(id=(select auth.uid()) or (select gary_private.oversees_operations()) or ((select gary_private.has_operations()) and exists(
  select 1 from public.gary_applications a where a.customer_id=gary_profiles.id and a.assigned_staff_id=(select auth.uid()))));
drop policy gary_applications_select on public.gary_applications;
create policy gary_applications_select on public.gary_applications for select to authenticated
 using(customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())));
drop policy gary_applications_update on public.gary_applications;
create policy gary_applications_update on public.gary_applications for update to authenticated
 using((customer_id=(select auth.uid()) and status in('submitted','documents_needed')) or (select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
 with check((customer_id=(select auth.uid()) and status in('submitted','documents_needed','cancelled')) or (select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())));
drop policy gary_events_select on public.gary_application_events;
create policy gary_events_select on public.gary_application_events for select to authenticated
 using(exists(select 1 from public.gary_applications a where a.id=application_id and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
drop policy gary_messages_select on public.gary_messages;
create policy gary_messages_select on public.gary_messages for select to authenticated
 using(exists(select 1 from public.gary_applications a where a.id=application_id and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
drop policy gary_messages_insert on public.gary_messages;
create policy gary_messages_insert on public.gary_messages for insert to authenticated
 with check(sender_id=(select auth.uid()) and exists(select 1 from public.gary_applications a where a.id=application_id and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
drop policy gary_notes_select on public.gary_staff_notes;
create policy gary_notes_select on public.gary_staff_notes for select to authenticated
 using((select gary_private.has_operations()) and exists(select 1 from public.gary_applications a where a.id=application_id and ((select gary_private.oversees_operations()) or a.assigned_staff_id=(select auth.uid()))));
drop policy gary_notes_insert on public.gary_staff_notes;
create policy gary_notes_insert on public.gary_staff_notes for insert to authenticated
 with check(staff_id=(select auth.uid()) and (select gary_private.has_operations()) and exists(select 1 from public.gary_applications a where a.id=application_id and ((select gary_private.oversees_operations()) or a.assigned_staff_id=(select auth.uid()))));
drop policy gary_documents_select on public.gary_documents;
create policy gary_documents_select on public.gary_documents for select to authenticated
 using(exists(select 1 from public.gary_applications a where a.id=application_id and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
drop policy gary_documents_insert on public.gary_documents;
create policy gary_documents_insert on public.gary_documents for insert to authenticated
 with check(uploaded_by=(select auth.uid()) and exists(select 1 from public.gary_applications a where a.id=application_id and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));

-- Private case documents follow the same case scope.
drop policy gary_storage_select on storage.objects;
create policy gary_storage_select on storage.objects for select to authenticated
using(bucket_id='gary-documents' and exists(
 select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
 and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
));
drop policy gary_storage_insert on storage.objects;
create policy gary_storage_insert on storage.objects for insert to authenticated
with check(bucket_id='gary-documents' and split_part(name,'/',2)=(select auth.uid())::text
 and split_part(name,'/',3)<>'' and split_part(name,'/',4)='' and exists(
 select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
 and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
));
drop policy gary_storage_delete on storage.objects;
create policy gary_storage_delete on storage.objects for delete to authenticated
using(bucket_id='gary-documents' and split_part(name,'/',2)=(select auth.uid())::text
 and not exists(select 1 from public.gary_documents d where d.object_path=name)
 and exists(select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
 and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations()))))
);
drop policy gary_storage_read_guard on storage.objects;
create policy gary_storage_read_guard on storage.objects as restrictive for select to authenticated
using(bucket_id<>'gary-documents' or exists(
 select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
 and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
));
drop policy gary_storage_write_guard on storage.objects;
create policy gary_storage_write_guard on storage.objects as restrictive for insert to authenticated
with check(bucket_id<>'gary-documents' or (
 split_part(name,'/',2)=(select auth.uid())::text and split_part(name,'/',3)<>'' and split_part(name,'/',4)='' and exists(
  select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
  and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
 )
));
drop policy gary_storage_delete_guard on storage.objects;
create policy gary_storage_delete_guard on storage.objects as restrictive for delete to authenticated
using(bucket_id<>'gary-documents' or (
 split_part(name,'/',2)=(select auth.uid())::text
 and not exists(select 1 from public.gary_documents d where d.object_path=name)
 and exists(select 1 from public.gary_applications a where a.id::text=split_part(name,'/',1)
  and (a.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (a.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations()))))
));

-- CRM contacts and live chats: assigned records for Staff, everything for oversight roles.
drop policy gary_crm_contacts_select on public.gary_crm_contacts;
create policy gary_crm_contacts_select on public.gary_crm_contacts for select to authenticated
 using((select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())));
drop policy gary_crm_contacts_insert on public.gary_crm_contacts;
create policy gary_crm_contacts_insert on public.gary_crm_contacts for insert to authenticated
 with check((select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())));
drop policy gary_crm_contacts_update on public.gary_crm_contacts;
create policy gary_crm_contacts_update on public.gary_crm_contacts for update to authenticated
 using((select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
 with check((select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())));
drop policy gary_crm_notes_select on public.gary_crm_notes;
create policy gary_crm_notes_select on public.gary_crm_notes for select to authenticated
 using(exists(select 1 from public.gary_crm_contacts c where c.id=contact_id and ((select gary_private.oversees_operations()) or (c.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
drop policy gary_crm_notes_insert on public.gary_crm_notes;
create policy gary_crm_notes_insert on public.gary_crm_notes for insert to authenticated
 with check(author_id=(select auth.uid()) and exists(select 1 from public.gary_crm_contacts c where c.id=contact_id and ((select gary_private.oversees_operations()) or (c.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
drop policy gary_crm_events_select on public.gary_crm_events;
create policy gary_crm_events_select on public.gary_crm_events for select to authenticated
 using(exists(select 1 from public.gary_crm_contacts c where c.id=contact_id and ((select gary_private.oversees_operations()) or (c.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))));
drop policy gary_chats_select on public.gary_chat_conversations;
create policy gary_chats_select on public.gary_chat_conversations for select to authenticated
 using(customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())));
drop policy gary_chats_update on public.gary_chat_conversations;
create policy gary_chats_update on public.gary_chat_conversations for update to authenticated
 using((select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
 with check((select gary_private.oversees_operations()) or (assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())));
drop policy gary_chat_messages_select on public.gary_chat_messages;
create policy gary_chat_messages_select on public.gary_chat_messages for select to authenticated using(exists(
 select 1 from public.gary_chat_conversations c where c.id=conversation_id and (c.customer_id=(select auth.uid()) or (select gary_private.oversees_operations()) or (c.assigned_staff_id=(select auth.uid()) and (select gary_private.has_operations())))
));

-- Assignment changes need oversight. Staff may only log a new contact for themselves,
-- and every assignee must hold an Operations role.
create function gary_private.guard_assignment() returns trigger
language plpgsql security invoker set search_path='' as $$
begin
 if current_user in('postgres','supabase_admin','service_role') then return new;end if;
 if tg_op='UPDATE' and new.assigned_staff_id is not distinct from old.assigned_staff_id then return new;end if;
 if tg_op='INSERT' and new.assigned_staff_id is null then return new;end if;
 if new.assigned_staff_id is not null and not gary_private.is_assignable(new.assigned_staff_id) then
  raise exception 'AGENCY_ASSIGNEE_INVALID' using errcode='23514';
 end if;
 if gary_private.oversees_operations() then return new;end if;
 if tg_op='INSERT' and new.assigned_staff_id=(select auth.uid()) and gary_private.has_operations() then return new;end if;
 raise exception 'AGENCY_ASSIGNMENT_DENIED' using errcode='42501';
end;$$;
revoke all on function gary_private.guard_assignment() from public,anon,authenticated;
create trigger gary_applications_assignment_guard before insert or update of assigned_staff_id on public.gary_applications for each row execute function gary_private.guard_assignment();
create trigger gary_crm_assignment_guard before insert or update of assigned_staff_id on public.gary_crm_contacts for each row execute function gary_private.guard_assignment();
create trigger gary_chat_assignment_guard before insert or update of assigned_staff_id on public.gary_chat_conversations for each row execute function gary_private.guard_assignment();

create or replace function gary_private.guard_application_update() returns trigger
language plpgsql security invoker set search_path='' as $$
begin
 if new.id is distinct from old.id or new.customer_id is distinct from old.customer_id or new.created_at is distinct from old.created_at then
  raise exception 'Application ownership and identity cannot be changed.' using errcode='42501';
 end if;
 if current_user in('postgres','supabase_admin','service_role') then new.updated_at=now();return new;end if;
 if not gary_private.has_operations() then
  if new.assigned_staff_id is distinct from old.assigned_staff_id then
   raise exception 'Only staff can assign applications.' using errcode='42501';
  end if;
  if new.status is distinct from old.status and new.status<>'cancelled' then
   raise exception 'Only staff can change application progress.' using errcode='42501';
  end if;
  if old.status not in('submitted','documents_needed') then
   raise exception 'This application is being processed. Please message the team for changes.' using errcode='42501';
  end if;
 end if;
 new.updated_at=now();return new;
end;$$;

create or replace function gary_private.chat_actor(p_id uuid,p_token text) returns text
language plpgsql stable security definer set search_path='' as $$
declare v_customer uuid;v_assigned uuid;
begin
 if auth.uid() is not null and gary_private.is_staff() then
  select assigned_staff_id into v_assigned from public.gary_chat_conversations where id=p_id;
  if found and (gary_private.oversees_operations() or (v_assigned=auth.uid() and gary_private.has_operations())) then return 'staff';end if;
  return null;
 end if;
 select customer_id into v_customer from public.gary_chat_conversations where id=p_id;
 if not found then return null;end if;
 if auth.uid() is not null and v_customer=auth.uid() then return 'customer';end if;
 if v_customer is null and p_token ~ '^[0-9a-f]{64}$' and exists(
  select 1 from gary_private.chat_sessions where conversation_id=p_id and guest_allowed and token_hash=pg_catalog.sha256(pg_catalog.convert_to(p_token,'UTF8'))
 ) then return 'visitor';end if;
 return null;
end;$$;

-- Only roles that see the unassigned queue may advertise live availability.
create or replace function gary_private.set_chat_availability(p_available boolean) returns jsonb
language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'Staff authentication required.' using errcode='42501';end if;
 if p_available is null then raise exception 'Availability is required.' using errcode='22023';end if;
 if p_available and not gary_private.oversees_operations() then raise exception 'AGENCY_QUEUE_ACCESS_REQUIRED' using errcode='42501';end if;
 insert into gary_private.chat_staff_presence(staff_id,available,seen_at) values(auth.uid(),p_available,clock_timestamp())
 on conflict(staff_id) do update set available=excluded.available,seen_at=excluded.seen_at;
 perform realtime.send('{}'::jsonb,'availability','gary-support:v2',false);
 return gary_private.live_chat_health();
end;$$;

drop function public.gary_staff_directory();
drop function gary_private.staff_directory();
create function gary_private.staff_directory() returns table(user_id uuid,display_name text,assignable boolean)
language plpgsql stable security definer set search_path='' as $$
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'Staff authentication required.' using errcode='42501';end if;
 return query select s.user_id,coalesce(nullif(p.full_name,''),'Gary team'),s.operations_role is not null
  from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id order by p.full_name;
end;$$;
revoke all on function gary_private.staff_directory() from public,anon,authenticated;
grant execute on function gary_private.staff_directory() to authenticated;
create function public.gary_staff_directory() returns table(user_id uuid,display_name text,assignable boolean)
language sql stable security invoker set search_path='' as $$ select * from gary_private.staff_directory(); $$;
revoke all on function public.gary_staff_directory() from public,anon,authenticated;
grant execute on function public.gary_staff_directory() to authenticated;

-- Trash: Operations Admin for cases/contacts, CMS Admin for content. Publisher keeps
-- publishing and archiving but no longer deletes or restores.
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
  v:=gary_private.cms_transition(p_id,'archived',v.version);
  update public.gary_cms_entries set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at,version into marked,ver;
 elsif p_kind in('case','contact') then
  if gary_private.operations_role() is distinct from 'admin' then raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';end if;
  if p_kind='case' then
   select deleted_at into marked from public.gary_applications where id=p_id for update;
   if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
   if marked is null then update public.gary_applications set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at into marked;end if;
  else
   select deleted_at into marked from public.gary_crm_contacts where id=p_id for update;
   if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
   if marked is null then update public.gary_crm_contacts set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at into marked;end if;
  end if;
 else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
 insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(p_kind,p_id,'deleted',auth.uid());
 return jsonb_build_object('id',p_id,'kind',p_kind,'version',ver,'deleted_at',marked);
end;$$;

create or replace function gary_private.restore_record(p_kind text,p_id uuid,p_expected_version integer default null) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_entries;marked timestamptz;ver integer;
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
 if p_kind='cms' then
  if gary_private.cms_role() is distinct from 'admin' then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
  select * into v from public.gary_cms_entries where id=p_id for update;
  if not found or v.deleted_at is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
  if p_expected_version is distinct from v.version then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001';end if;
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
end;$$;

create or replace function gary_private.list_trash(p_kind text default null,p_offset integer default 0,p_limit integer default 20) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare result jsonb;may_operations boolean;may_content boolean;
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
 if p_kind is not null and p_kind not in('case','contact','cms') then raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
 may_operations:=gary_private.operations_role() is not distinct from 'admin';
 may_content:=gary_private.cms_role() is not distinct from 'admin';
 if not may_operations and not may_content then raise exception 'AGENCY_ACCESS_DENIED' using errcode='42501';end if;
 if p_kind in('case','contact') and not may_operations then raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';end if;
 if p_kind='cms' and not may_content then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
 with records as (
  select id,'case'::text kind,subject title,null::integer version,deleted_at,deleted_by from public.gary_applications where deleted_at is not null and may_operations and (p_kind is null or p_kind='case')
  union all select id,'contact',full_name,null::integer,deleted_at,deleted_by from public.gary_crm_contacts where deleted_at is not null and may_operations and (p_kind is null or p_kind='contact')
  union all select id,'cms',coalesce(nullif(title_en,''),title_vi),version,deleted_at,deleted_by from public.gary_cms_entries where deleted_at is not null and may_content and (p_kind is null or p_kind='cms')
 ),paged as (select * from records order by deleted_at desc,id offset greatest(0,coalesce(p_offset,0)) limit least(100,greatest(1,coalesce(p_limit,20))))
 select jsonb_build_object('records',coalesce((select jsonb_agg(to_jsonb(paged) order by deleted_at desc,id) from paged),'[]'::jsonb),'total',(select count(*) from records)) into result;
 return result;
end;$$;

create or replace function public.gary_cms_capabilities() returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('role',r,'read',r is not null,'edit',r is not null,'publish',coalesce(r in('publisher','admin'),false),'media',r is not null,'trash',coalesce(r='admin',false))
 from (select gary_private.cms_role() r) role_row;
$$;

create function gary_private.my_access() returns jsonb
language sql stable security definer set search_path='' as $$
 select case when (select auth.uid()) is null then null else jsonb_build_object(
  'member',gary_private.is_staff(),'operations',gary_private.operations_role(),'cms',gary_private.cms_role()) end;
$$;

-- Visa-only role management. Operations Admins manage Operations roles and CMS Admins
-- manage CMS roles. Admin is a protected peer level: nobody changes their own roles,
-- another Admin's role, or grants Admin here (owner-reviewed SQL only). Membership,
-- passwords and other Gary platforms are out of scope.
create function gary_private.staff_access_list() returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare v_operations text;v_cms text;v_members jsonb;
begin
 v_operations:=gary_private.operations_role();v_cms:=gary_private.cms_role();
 if auth.uid() is null or not gary_private.is_staff() or (v_operations is distinct from 'admin' and v_cms is distinct from 'admin') then
  raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';
 end if;
 select coalesce(jsonb_agg(jsonb_build_object(
  'user_id',x.user_id,'display_name',x.display_name,'email',x.email,'operations_role',x.operations_role,'cms_role',x.cms_role,'self',x.user_id=auth.uid(),
  'manage_operations',v_operations is not distinct from 'admin' and x.user_id<>auth.uid() and x.operations_role is distinct from 'admin',
  'manage_cms',v_cms is not distinct from 'admin' and x.user_id<>auth.uid() and x.cms_role is distinct from 'admin'
 ) order by lower(x.display_name),lower(x.email),x.user_id),'[]'::jsonb) into v_members
 from (
  select s.user_id,coalesce(nullif(trim(p.full_name),''),'') display_name,coalesce(u.email,'') email,s.operations_role,case when m.active then m.role end cms_role
  from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id left join auth.users u on u.id=s.user_id left join gary_private.cms_members m on m.user_id=s.user_id
 ) x;
 return jsonb_build_object('members',v_members,'operations_role',v_operations,'cms_role',v_cms);
end;$$;

create function gary_private.set_operations_role(p_user_id uuid,p_role text,p_expected_role text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_current text;
begin
 if auth.uid() is null or not gary_private.is_staff() or gary_private.operations_role() is distinct from 'admin' then
  raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';
 end if;
 if p_user_id is null or (p_role is not null and p_role not in('staff','manager','admin')) or (p_expected_role is not null and p_expected_role not in('staff','manager','admin')) then
  raise exception 'AGENCY_ROLE_INVALID' using errcode='22023';
 end if;
 if p_user_id=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 select operations_role into v_current from gary_private.staff_members where user_id=p_user_id for update;
 if not found then raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';end if;
 if v_current='admin' or p_role='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if v_current is distinct from p_expected_role then raise exception 'AGENCY_ROLE_CONFLICT' using errcode='40001';end if;
 if v_current is distinct from p_role then
  update gary_private.staff_members set operations_role=p_role where user_id=p_user_id;
  insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source) values(p_user_id,'operations',v_current,p_role,auth.uid(),'portal');
  if p_role is distinct from 'manager' then update gary_private.chat_staff_presence set available=false where staff_id=p_user_id and available;end if;
 end if;
 return jsonb_build_object('user_id',p_user_id,'operations_role',p_role);
end;$$;

create function gary_private.set_cms_role(p_user_id uuid,p_role text,p_expected_role text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_current text;
begin
 if auth.uid() is null or not gary_private.is_staff() or gary_private.cms_role() is distinct from 'admin' then
  raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';
 end if;
 if p_user_id is null or (p_role is not null and p_role not in('editor','publisher','admin')) or (p_expected_role is not null and p_expected_role not in('editor','publisher','admin')) then
  raise exception 'AGENCY_ROLE_INVALID' using errcode='22023';
 end if;
 if p_user_id=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 perform 1 from gary_private.staff_members where user_id=p_user_id for update;
 if not found then raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';end if;
 select case when active then role end into v_current from gary_private.cms_members where user_id=p_user_id for update;
 if v_current='admin' or p_role='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if v_current is distinct from p_expected_role then raise exception 'AGENCY_ROLE_CONFLICT' using errcode='40001';end if;
 if v_current is distinct from p_role then
  if p_role is null then update gary_private.cms_members set active=false where user_id=p_user_id;
  else insert into gary_private.cms_members(user_id,role,active) values(p_user_id,p_role,true) on conflict(user_id) do update set role=excluded.role,active=true;end if;
  insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source) values(p_user_id,'cms',v_current,p_role,auth.uid(),'portal');
 end if;
 return jsonb_build_object('user_id',p_user_id,'cms_role',p_role);
end;$$;

create function public.gary_my_access() returns jsonb language sql stable security invoker set search_path='' as $$ select gary_private.my_access(); $$;
create function public.gary_staff_access_list() returns jsonb language sql stable security invoker set search_path='' as $$ select gary_private.staff_access_list(); $$;
create function public.gary_set_operations_role(p_user_id uuid,p_role text,p_expected_role text) returns jsonb language sql security invoker set search_path='' as $$ select gary_private.set_operations_role(p_user_id,p_role,p_expected_role); $$;
create function public.gary_set_cms_role(p_user_id uuid,p_role text,p_expected_role text) returns jsonb language sql security invoker set search_path='' as $$ select gary_private.set_cms_role(p_user_id,p_role,p_expected_role); $$;
revoke all on function gary_private.my_access(),gary_private.staff_access_list(),gary_private.set_operations_role(uuid,text,text),gary_private.set_cms_role(uuid,text,text),
 public.gary_my_access(),public.gary_staff_access_list(),public.gary_set_operations_role(uuid,text,text),public.gary_set_cms_role(uuid,text,text) from public,anon,authenticated;
grant execute on function gary_private.my_access(),gary_private.staff_access_list(),gary_private.set_operations_role(uuid,text,text),gary_private.set_cms_role(uuid,text,text),
 public.gary_my_access(),public.gary_staff_access_list(),public.gary_set_operations_role(uuid,text,text),public.gary_set_cms_role(uuid,text,text) to authenticated;

notify pgrst,'reload schema';
commit;
