-- Gary Visa only. Keep the roster row so case, contact and chat foreign keys survive revocation.
begin;

alter table gary_private.staff_members
 add column display_name_override text check (char_length(display_name_override) between 1 and 100),
 add column revoked_at timestamptz;

create or replace function gary_private.is_staff() returns boolean
language sql stable security definer set search_path='' as $$
 select gary_private.staff_identity_eligible(auth.uid()) and exists(
  select 1 from gary_private.staff_members where user_id=auth.uid() and revoked_at is null);
$$;
create or replace function gary_private.operations_role() returns text
language sql stable security definer set search_path='' as $$
 select operations_role from gary_private.staff_members
 where user_id=auth.uid() and revoked_at is null and gary_private.staff_identity_eligible(auth.uid());
$$;
create or replace function gary_private.is_assignable(p_user uuid) returns boolean
language sql stable security definer set search_path='' as $$
 select gary_private.staff_identity_eligible(p_user) and exists(
  select 1 from gary_private.staff_members where user_id=p_user and revoked_at is null and operations_role is not null);
$$;

-- Names are presentation data. Account eligibility and roles always use server-side records.
create function gary_private.staff_identity_name(p_name text,p_metadata jsonb) returns text
language sql immutable set search_path='' as $$
 select coalesce(nullif(btrim(p_name),''),
  case when jsonb_typeof(p_metadata->'full_name')='string' then nullif(btrim(p_metadata->>'full_name'),'') end,
  case when jsonb_typeof(p_metadata->'name')='string' then nullif(btrim(p_metadata->>'name'),'') end);
$$;

create function gary_private.can_manage_membership(p_operations text,p_cms text,p_cms_active boolean,p_admin_operations boolean,p_admin_cms boolean) returns boolean
language sql immutable set search_path='' as $$
 select p_operations is distinct from 'admin' and p_cms is distinct from 'admin'
  and (p_operations is null or p_admin_operations) and (p_cms_active is not true or p_admin_cms);
$$;

create or replace function gary_private.staff_directory() returns table(user_id uuid,display_name text,assignable boolean)
language plpgsql stable security definer set search_path='' as $$
begin
 if not gary_private.is_staff() then raise exception 'Staff authentication required.' using errcode='42501';end if;
 return query select s.user_id,coalesce(s.display_name_override,gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data),'Gary team'),gary_private.is_assignable(s.user_id)
 from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id left join auth.users u on u.id=s.user_id
 order by 2,s.user_id;
end;$$;

create or replace function gary_private.staff_access_list() returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare v_operations text:=gary_private.operations_role();v_cms text:=gary_private.cms_role();v_members jsonb;
begin
 if v_operations is distinct from 'admin' and v_cms is distinct from 'admin' then
  raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';
 end if;
 select coalesce(jsonb_agg(jsonb_build_object(
  'user_id',s.user_id,'display_name',coalesce(s.display_name_override,gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data),''),
  'display_name_override',s.display_name_override,'email',coalesce(u.email,''),'operations_role',s.operations_role,
  'cms_role',case when m.active then m.role end,'self',s.user_id=auth.uid(),
  'account',case when gary_private.staff_identity_eligible(s.user_id) then 'active' else 'unavailable' end,
  'manage_operations',v_operations is not distinct from 'admin' and s.user_id<>auth.uid() and s.operations_role is distinct from 'admin',
  'manage_cms',v_cms is not distinct from 'admin' and s.user_id<>auth.uid() and m.role is distinct from 'admin',
  'manage_membership',s.user_id<>auth.uid() and gary_private.can_manage_membership(
   s.operations_role,m.role,m.active,v_operations is not distinct from 'admin',v_cms is not distinct from 'admin')
 ) order by lower(coalesce(s.display_name_override,gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data),u.email,'')),s.user_id),'[]'::jsonb)
 into v_members
 from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id
 left join auth.users u on u.id=s.user_id left join gary_private.cms_members m on m.user_id=s.user_id
 where s.revoked_at is null;
 return jsonb_build_object('members',v_members,'operations_role',v_operations,'cms_role',v_cms);
end;$$;

create function gary_private.staff_candidate(p_email text) returns uuid
language plpgsql stable set search_path='' as $$
declare v_email text:=lower(btrim(p_email));v_ids uuid[];
begin
 if v_email is null or char_length(v_email)>254 or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+$' then
  raise exception 'AGENCY_EMAIL_INVALID' using errcode='22023';
 end if;
 select array_agg(u.id) into v_ids from (select id from auth.users where lower(email)=v_email limit 2) u;
 if coalesce(array_length(v_ids,1),0)<>1 or not gary_private.staff_identity_eligible(v_ids[1]) then
  raise exception 'AGENCY_ACCOUNT_UNAVAILABLE' using errcode='P0002';
 end if;
 return v_ids[1];
end;$$;

create function gary_private.lookup_staff_account(p_email text) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare v_user uuid;
begin
 if gary_private.operations_role() is distinct from 'admin' and gary_private.cms_role() is distinct from 'admin' then
  raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';
 end if;
 v_user:=gary_private.staff_candidate(p_email);
 return (select jsonb_build_object('email',u.email,'full_name',gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data))
  from auth.users u left join public.gary_profiles p on p.id=u.id where u.id=v_user);
end;$$;

create function gary_private.add_staff_member(p_email text,p_operations_role text,p_cms_role text,p_full_name text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_operations text:=gary_private.operations_role();v_cms text:=gary_private.cms_role();v_user uuid;
 v_name text:=nullif(btrim(p_full_name),'');v_identity_name text;v_stored_cms text;v_cms_active boolean;
begin
 if v_operations is distinct from 'admin' and v_cms is distinct from 'admin' then
  raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';
 end if;
 if p_operations_role='admin' or p_cms_role='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if (p_operations_role is not null and p_operations_role not in('staff','manager')) or (p_cms_role is not null and p_cms_role not in('editor','publisher')) then
  raise exception 'AGENCY_ROLE_INVALID' using errcode='22023';
 end if;
 if p_operations_role is null and p_cms_role is null then raise exception 'AGENCY_ROLE_REQUIRED' using errcode='22023';end if;
 if p_operations_role is not null and v_operations is distinct from 'admin' then raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';end if;
 if p_cms_role is not null and v_cms is distinct from 'admin' then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
 if char_length(v_name)>100 or v_name ~ '[[:cntrl:]]' then raise exception 'AGENCY_STAFF_NAME_INVALID' using errcode='22023';end if;
 v_user:=gary_private.staff_candidate(p_email);
 if v_user=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 select gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data) into v_identity_name
 from auth.users u left join public.gary_profiles p on p.id=u.id where u.id=v_user;
 v_name:=nullif(v_name,v_identity_name);
 insert into gary_private.staff_members as s(user_id,operations_role,display_name_override)
 values(v_user,p_operations_role,v_name) on conflict(user_id) do update
 set operations_role=excluded.operations_role,display_name_override=excluded.display_name_override,revoked_at=null
 where s.revoked_at is not null and s.operations_role is distinct from 'admin';
 if not found then raise exception 'AGENCY_STAFF_EXISTS' using errcode='23505';end if;
 select role,active into v_stored_cms,v_cms_active from gary_private.cms_members where user_id=v_user for update;
 if v_cms_active or (v_stored_cms='admin' and (p_cms_role is not null or v_name is not null)) then
  raise exception 'AGENCY_CMS_REVIEW_REQUIRED' using errcode='42501';
 end if;
 if p_cms_role is not null then
  insert into gary_private.cms_members(user_id,role,active) values(v_user,p_cms_role,true)
  on conflict(user_id) do update set role=excluded.role,active=true;
 end if;
 insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source)
 select v_user,e.scope,null,e.role,auth.uid(),'portal' from (values('membership','member'),('operations',p_operations_role),('cms',p_cms_role)) e(scope,role) where e.role is not null;
 return jsonb_build_object('user_id',v_user,'operations_role',p_operations_role,'cms_role',p_cms_role);
end;$$;

create or replace function gary_private.add_staff_member(p_email text,p_operations_role text,p_cms_role text) returns jsonb
language sql security definer set search_path='' as $$
 select gary_private.add_staff_member(p_email,p_operations_role,p_cms_role,null);
$$;

create function gary_private.require_case_reassignment(p_user uuid) returns void
language plpgsql set search_path='' as $$
begin
 if exists(select 1 from public.gary_applications where assigned_staff_id=p_user and deleted_at is null
  and status not in('completed','cancelled')) then
  raise exception 'AGENCY_STAFF_CASES_ASSIGNED' using errcode='23514';
 end if;
end;$$;

-- A case entering the active queue and a revocation use the same roster lock.
create function gary_private.lock_active_case_assignee() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if new.assigned_staff_id is null or new.deleted_at is not null or new.status in('completed','cancelled') then return new;end if;
 if tg_op='UPDATE' and new.assigned_staff_id is not distinct from old.assigned_staff_id then
  -- A reopened or restored case may keep its historical assignee. Serialize it
  -- with revocation so the active-case check sees any earlier restoration.
  if old.deleted_at is not null or old.status in('completed','cancelled') then
   perform 1 from gary_private.staff_members where user_id=new.assigned_staff_id for share;
  end if;
  return new;
 end if;
 perform 1 from gary_private.staff_members where user_id=new.assigned_staff_id and revoked_at is null and operations_role is not null for share;
 if not found then raise exception 'AGENCY_ASSIGNEE_INVALID' using errcode='23514';end if;
 return new;
end;$$;
create trigger gary_active_case_assignee before insert or update of assigned_staff_id,status,deleted_at on public.gary_applications
 for each row execute function gary_private.lock_active_case_assignee();

-- Existing role API keeps its per-area checks and also requires active membership.
create or replace function gary_private.set_operations_role(p_user_id uuid,p_role text,p_expected_role text) returns jsonb
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
 select operations_role into v_current from gary_private.staff_members where user_id=p_user_id and revoked_at is null for update;
 if not found then raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';end if;
 if v_current='admin' or p_role='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if v_current is distinct from p_expected_role then raise exception 'AGENCY_ROLE_CONFLICT' using errcode='40001';end if;
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
end;$$;

create or replace function gary_private.set_cms_role(p_user_id uuid,p_role text,p_expected_role text) returns jsonb
language plpgsql security definer set search_path='' as $$
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
 if v_current is distinct from p_expected_role then raise exception 'AGENCY_ROLE_CONFLICT' using errcode='40001';end if;
 if p_role is not null and not gary_private.staff_identity_eligible(p_user_id) then
  raise exception 'AGENCY_TARGET_INELIGIBLE' using errcode='P0002';
 end if;
 if v_current is distinct from p_role then
  if p_role is null then update gary_private.cms_members set active=false where user_id=p_user_id;
  else insert into gary_private.cms_members(user_id,role,active) values(p_user_id,p_role,true) on conflict(user_id) do update set role=excluded.role,active=true;end if;
  insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source) values(p_user_id,'cms',v_current,p_role,auth.uid(),'portal');
 end if;
 return jsonb_build_object('user_id',p_user_id,'cms_role',p_role);
end;$$;

create function gary_private.edit_staff_member(p_user_id uuid,p_full_name text,p_expected_name text,
 p_operations_role text,p_expected_operations_role text,p_cms_role text,p_expected_cms_role text) returns jsonb
language plpgsql security definer set search_path='' as $$
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
  raise exception 'AGENCY_ROLE_CONFLICT' using errcode='40001';
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
end;$$;

create function gary_private.remove_staff_member(p_user_id uuid,p_expected_operations_role text,p_expected_cms_role text) returns jsonb
language plpgsql security definer set search_path='' as $$
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
  raise exception 'AGENCY_ROLE_CONFLICT' using errcode='40001';
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
end;$$;

-- Managers continue to route cases. Routing and changing case content are separate writes.
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
 elsif gary_private.operations_role()='manager' and old.assigned_staff_id is distinct from auth.uid()
  and row(new.subject,new.details,new.service,new.status,new.intake_kind) is distinct from row(old.subject,old.details,old.service,old.status,old.intake_kind) then
  raise exception 'AGENCY_CASE_EDIT_ASSIGNED_ONLY' using errcode='42501';
 end if;
 new.updated_at=now();return new;
end;$$;

create function public.gary_lookup_staff_account(p_email text) returns jsonb language sql stable security invoker set search_path='' as $$
 select gary_private.lookup_staff_account(p_email);
$$;
create function public.gary_add_staff_member(p_email text,p_operations_role text,p_cms_role text,p_full_name text) returns jsonb language sql security invoker set search_path='' as $$
 select gary_private.add_staff_member(p_email,p_operations_role,p_cms_role,p_full_name);
$$;
create function public.gary_edit_staff_member(p_user_id uuid,p_full_name text,p_expected_name text,p_operations_role text,p_expected_operations_role text,p_cms_role text,p_expected_cms_role text) returns jsonb language sql security invoker set search_path='' as $$
 select gary_private.edit_staff_member(p_user_id,p_full_name,p_expected_name,p_operations_role,p_expected_operations_role,p_cms_role,p_expected_cms_role);
$$;
create function public.gary_remove_staff_member(p_user_id uuid,p_expected_operations_role text,p_expected_cms_role text) returns jsonb language sql security invoker set search_path='' as $$
 select gary_private.remove_staff_member(p_user_id,p_expected_operations_role,p_expected_cms_role);
$$;

revoke all on function gary_private.staff_identity_name(text,jsonb),gary_private.can_manage_membership(text,text,boolean,boolean,boolean),
 gary_private.staff_candidate(text),gary_private.require_case_reassignment(uuid),gary_private.lock_active_case_assignee()
 from public,anon,authenticated;
revoke all on function gary_private.lookup_staff_account(text),gary_private.add_staff_member(text,text,text,text),
 gary_private.edit_staff_member(uuid,text,text,text,text,text,text),gary_private.remove_staff_member(uuid,text,text),
 public.gary_lookup_staff_account(text),public.gary_add_staff_member(text,text,text,text),
 public.gary_edit_staff_member(uuid,text,text,text,text,text,text),public.gary_remove_staff_member(uuid,text,text) from public,anon,authenticated;
grant execute on function gary_private.lookup_staff_account(text),gary_private.add_staff_member(text,text,text,text),
 gary_private.edit_staff_member(uuid,text,text,text,text,text,text),gary_private.remove_staff_member(uuid,text,text),
 public.gary_lookup_staff_account(text),public.gary_add_staff_member(text,text,text,text),
 public.gary_edit_staff_member(uuid,text,text,text,text,text,text),public.gary_remove_staff_member(uuid,text,text) to authenticated;

notify pgrst,'reload schema';
commit;

