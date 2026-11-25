-- Apply in Gary Visa after the current Team Access, avatar, CMS media and Trash migrations.
begin;

alter table gary_private.staff_members add column site_owner boolean not null default false;
comment on column gary_private.staff_members.site_owner is
  'Operator-maintained Visa ownership marker. Existing Operations and CMS roles remain independent.';

-- During manual rollout, enroll each reviewed Visa Owner by verified Auth UUID:
-- update gary_private.staff_members set site_owner=true
-- where user_id='<reviewed Visa Owner UUID>'::uuid and revoked_at is null
--   and gary_private.staff_identity_eligible(user_id);
-- Check that one row changed for each UUID. No account is auto-promoted.

create function gary_private.is_site_owner() returns boolean
language sql stable security definer set search_path='' as $$
  select gary_private.is_staff() and exists(
    select 1 from gary_private.staff_members where user_id=(select auth.uid()) and site_owner);
$$;

create function gary_private.operations_rank(p_role text) returns integer
language sql immutable set search_path='' as $$
  select case p_role when 'staff' then 1 when 'manager' then 2 when 'admin' then 3 else 0 end;
$$;
create function gary_private.cms_rank(p_role text) returns integer
language sql immutable set search_path='' as $$
  select case p_role when 'editor' then 1 when 'publisher' then 2 when 'admin' then 3 else 0 end;
$$;

create function gary_private.can_view_staff_account(p_user uuid) returns boolean
language sql stable security definer set search_path='' as $$
  select gary_private.is_staff() and exists(
    select 1 from gary_private.staff_members s
    left join gary_private.cms_members m on m.user_id=s.user_id
    cross join lateral (select
      gary_private.operations_rank(s.operations_role) as operations,
      -- An inactive CMS Admin assignment still protects the target.
      gary_private.cms_rank(case when m.active or m.role='admin' then m.role end) as cms
    ) target
    cross join (select gary_private.operations_rank(gary_private.operations_role()) as operations,
                       gary_private.cms_rank(gary_private.cms_role()) as cms) viewer
    where s.user_id=p_user and s.revoked_at is null and (
      s.user_id=(select auth.uid()) or gary_private.is_site_owner() or (
        not s.site_owner and target.operations<=viewer.operations and target.cms<=viewer.cms
        and (target.operations<viewer.operations or target.cms<viewer.cms)
      )
    )
  );
$$;

-- An ID used as a customer/contact still obeys the staff account boundary.
create function gary_private.staff_profile_visible(p_user uuid) returns boolean
language sql stable security definer set search_path='' as $$
  select not exists(select 1 from gary_private.staff_members where user_id=p_user
      and (revoked_at is null or site_owner or operations_role='admin'))
    and not exists(select 1 from gary_private.cms_members where user_id=p_user and role='admin')
    or gary_private.can_view_staff_account(p_user);
$$;

create policy gary_profiles_staff_visibility on public.gary_profiles
  as restrictive for select to authenticated
  using(id=(select auth.uid()) or gary_private.staff_profile_visible(id));
create policy gary_crm_contacts_staff_visibility on public.gary_crm_contacts
  as restrictive for select to authenticated
  using(profile_id=(select auth.uid()) or gary_private.staff_profile_visible(profile_id));

create or replace function gary_private.visa_avatar_readable(p_name text) returns boolean
language sql stable security definer set search_path='' as $$
  select case
    when p_name=(select auth.uid())::text||'/avatar' then true
    when p_name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/avatar$' then
      gary_private.can_view_staff_account(split_part(p_name,'/',1)::uuid)
    else false end;
$$;

create or replace function gary_private.my_access() returns jsonb
language sql stable security definer set search_path='' as $$
  select case when (select auth.uid()) is null then null else jsonb_build_object(
    'member',gary_private.is_staff(),'operations',gary_private.operations_role(),
    'cms',gary_private.cms_role(),'site_owner',gary_private.is_site_owner()) end;
$$;

-- A case, contact or chat exposes only the names needed for assignment and attribution.
create or replace function gary_private.staff_directory() returns table(user_id uuid,display_name text,assignable boolean)
language plpgsql stable security definer set search_path='' as $$
declare v_viewer uuid:=auth.uid(); v_oversees boolean:=gary_private.oversees_operations();
begin
  if not gary_private.has_operations() then raise exception 'Staff authentication required.' using errcode='42501'; end if;
  return query
    with contacts as (
      select c.id,c.assigned_staff_id from public.gary_crm_contacts c
      where c.deleted_at is null and (v_oversees or c.assigned_staff_id=v_viewer)
        and (c.profile_id=v_viewer or gary_private.staff_profile_visible(c.profile_id))
    ), referenced as (
      select a.assigned_staff_id as id from public.gary_applications a
      where v_oversees and a.deleted_at is null
      union select assigned_staff_id from contacts
      union select n.author_id from public.gary_crm_notes n join contacts c on c.id=n.contact_id
      union select c.assigned_staff_id from public.gary_chat_conversations c
        where v_oversees or c.assigned_staff_id=v_viewer
    )
    select s.user_id,coalesce(s.display_name_override,gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data),'Gary team'),
      gary_private.is_assignable(s.user_id)
    from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id
    left join auth.users u on u.id=s.user_id
    where s.user_id=v_viewer or s.user_id in(select id from referenced)
      or (v_oversees and gary_private.is_assignable(s.user_id))
    order by 2,s.user_id;
end;
$$;

create or replace function gary_private.staff_access_list() returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare v_operations text:=gary_private.operations_role(); v_cms text:=gary_private.cms_role(); v_members jsonb;
begin
  if not gary_private.is_staff() then raise exception 'AGENCY_STAFF_REQUIRED' using errcode='42501'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
    'user_id',s.user_id,'display_name',coalesce(s.display_name_override,gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data),''),
    'display_name_override',s.display_name_override,'email',coalesce(u.email,''),'operations_role',s.operations_role,
    'cms_role',case when m.active then m.role end,'self',s.user_id=auth.uid(),
    'account',case when gary_private.staff_identity_eligible(s.user_id) then 'active' else 'unavailable' end,
    'manage_operations',not s.site_owner and v_operations is not distinct from 'admin' and s.user_id<>auth.uid() and s.operations_role is distinct from 'admin',
    'manage_cms',not s.site_owner and v_cms is not distinct from 'admin' and s.user_id<>auth.uid() and m.role is distinct from 'admin',
    'manage_membership',not s.site_owner and s.user_id<>auth.uid()
      and (v_operations is not distinct from 'admin' or v_cms is not distinct from 'admin')
      and gary_private.can_manage_membership(s.operations_role,m.role,m.active,
        v_operations is not distinct from 'admin',v_cms is not distinct from 'admin')
  ) order by lower(coalesce(s.display_name_override,gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data),u.email,'')),s.user_id),'[]'::jsonb)
  into v_members
  from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id
  left join auth.users u on u.id=s.user_id left join gary_private.cms_members m on m.user_id=s.user_id
  where gary_private.can_view_staff_account(s.user_id);
  return jsonb_build_object('members',v_members,'operations_role',v_operations,'cms_role',v_cms);
end;
$$;

-- Exact-email onboarding may find eligible external identities. Existing hidden
-- memberships, including protected CMS rows without a roster entry, are unavailable.
create function gary_private.staff_candidate_visible(p_user uuid) returns boolean
language sql stable set search_path='' as $$
  select case
    when exists(select 1 from gary_private.staff_members where user_id=p_user and revoked_at is null)
      then gary_private.can_view_staff_account(p_user)
    else not exists(select 1 from gary_private.staff_members where user_id=p_user and (site_owner or operations_role='admin'))
      and not exists(select 1 from gary_private.cms_members where user_id=p_user and (active or role='admin'))
  end;
$$;

-- Called after the roster row lock and before using any target-specific values in a write.
create function gary_private.require_visible_staff_target(p_user uuid) returns void
language plpgsql set search_path='' as $$
begin
  if not gary_private.can_view_staff_account(p_user) then
    raise exception 'AGENCY_STAFF_MISSING' using errcode='P0002';
  end if;
  if exists(select 1 from gary_private.staff_members where user_id=p_user and site_owner) then
    raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';
  end if;
end;
$$;

revoke all on function gary_private.is_site_owner(),gary_private.operations_rank(text),gary_private.cms_rank(text),
  gary_private.can_view_staff_account(uuid),gary_private.staff_profile_visible(uuid),
  gary_private.staff_candidate_visible(uuid),gary_private.require_visible_staff_target(uuid) from public,anon,authenticated;
grant execute on function gary_private.is_site_owner(),gary_private.staff_profile_visible(uuid) to authenticated;

create or replace function gary_private.staff_candidate(p_email text) returns uuid
language plpgsql stable set search_path='' as $$
declare v_email text:=lower(btrim(p_email));v_ids uuid[];
begin
 if v_email is null or char_length(v_email)>254 or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+$' then
  raise exception 'AGENCY_EMAIL_INVALID' using errcode='22023';
 end if;
 select array_agg(u.id) into v_ids from (select id from auth.users where lower(email)=v_email limit 2) u;
 if coalesce(array_length(v_ids,1),0)<>1 or not gary_private.staff_identity_eligible(v_ids[1])
  or not gary_private.staff_candidate_visible(v_ids[1]) then
  raise exception 'AGENCY_ACCOUNT_UNAVAILABLE' using errcode='P0002';
 end if;
 return v_ids[1];
end;$$;

create or replace function gary_private.add_staff_member(p_email text,p_operations_role text,p_cms_role text,p_full_name text) returns jsonb
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
 perform 1 from gary_private.staff_members where user_id=v_user for update;
 if not gary_private.staff_candidate_visible(v_user) then
  raise exception 'AGENCY_ACCOUNT_UNAVAILABLE' using errcode='P0002';
 end if;
 select gary_private.staff_identity_name(p.full_name,u.raw_user_meta_data) into v_identity_name
 from auth.users u left join public.gary_profiles p on p.id=u.id where u.id=v_user;
 v_name:=nullif(v_name,v_identity_name);
 insert into gary_private.staff_members as s(user_id,operations_role,display_name_override)
 values(v_user,p_operations_role,v_name) on conflict(user_id) do update
 set operations_role=excluded.operations_role,display_name_override=excluded.display_name_override,revoked_at=null
 where s.revoked_at is not null and not s.site_owner and s.operations_role is distinct from 'admin';
 if not found then
  if not gary_private.staff_candidate_visible(v_user) then
   raise exception 'AGENCY_ACCOUNT_UNAVAILABLE' using errcode='P0002';
  end if;
  raise exception 'AGENCY_STAFF_EXISTS' using errcode='23505';
 end if;
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

create or replace function gary_private.set_operations_role(p_user_id uuid, p_role text, p_expected_role text)
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
 perform gary_private.require_visible_staff_target(p_user_id);
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

create or replace function gary_private.set_cms_role(p_user_id uuid, p_role text, p_expected_role text)
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
 perform gary_private.require_visible_staff_target(p_user_id);
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

create or replace function gary_private.edit_staff_member(p_user_id uuid, p_full_name text, p_expected_name text, p_operations_role text, p_expected_operations_role text, p_cms_role text, p_expected_cms_role text)
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
 perform gary_private.require_visible_staff_target(p_user_id);
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

create or replace function gary_private.remove_staff_member(p_user_id uuid, p_expected_operations_role text, p_expected_cms_role text)
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
 perform gary_private.require_visible_staff_target(p_user_id);
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

create or replace function gary_private.crm_contact_relationship(p_contact uuid)
returns table(relationship text,staff_linked boolean) language sql stable security definer set search_path='' as $$
  select case when c.internal_test then 'internal_test'
      when exists(select 1 from public.gary_applications a where a.customer_id=c.profile_id
        and a.deleted_at is null and a.intake_kind='application')
        or c.stage='customer' and (c.source='manual' or exists(
          select 1 from public.gary_crm_events e where e.contact_id=c.id and e.kind='stage_changed' and e.changes->>'to'='customer')) then 'customer'
      when s.user_id is not null then 'staff_linked'
      else 'lead' end,
    s.user_id is not null
  from public.gary_crm_contacts c left join gary_private.staff_members s on s.user_id=c.profile_id
  where c.id=p_contact and c.deleted_at is null and auth.uid() is not null
    and (c.profile_id=(select auth.uid()) or gary_private.staff_profile_visible(c.profile_id)) and
    (gary_private.oversees_operations() or (c.assigned_staff_id=auth.uid() and gary_private.has_operations()));
$$;

-- Trash and restore run with definer rights, so apply the CRM visibility rule explicitly.
create or replace function gary_private.trash_directory(p_category text,p_search text,p_status text,p_offset integer,p_limit integer)
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
      and gary_private.staff_profile_visible(c.profile_id)
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
  union all select id,'contact',full_name,null::integer,deleted_at,deleted_by from public.gary_crm_contacts where deleted_at is not null and may_operations and (p_kind is null or p_kind='contact') and gary_private.staff_profile_visible(profile_id)
  union all select id,'cms',coalesce(nullif(title_en,''),title_vi),version,deleted_at,deleted_by from public.gary_cms_entries where deleted_at is not null and may_content and (p_kind is null or p_kind='cms')
 ),paged as (select * from records order by deleted_at desc,id offset greatest(0,coalesce(p_offset,0)) limit least(100,greatest(1,coalesce(p_limit,20))))
 select jsonb_build_object('records',coalesce((select jsonb_agg(to_jsonb(paged) order by deleted_at desc,id) from paged),'[]'::jsonb),'total',(select count(*) from records)) into result;
 return result;
end;$$;

create or replace function gary_private.trash_record(p_kind text, p_id uuid, p_expected_version integer DEFAULT NULL::integer)
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
      select deleted_at into marked from public.gary_crm_contacts where id=p_id and gary_private.staff_profile_visible(profile_id) for update;
      if not found then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
      if marked is null then update public.gary_crm_contacts set deleted_at=clock_timestamp(),deleted_by=auth.uid() where id=p_id returning deleted_at into marked;end if;
    end if;
  else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
  insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(p_kind,p_id,'deleted',auth.uid());
  return jsonb_build_object('id',p_id,'kind',p_kind,'version',ver,'deleted_at',marked);
end;
$function$;

create or replace function gary_private.restore_record(p_kind text, p_id uuid, p_expected_version integer DEFAULT NULL::integer)
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
   select deleted_at into marked from public.gary_crm_contacts where id=p_id and gary_private.staff_profile_visible(profile_id) for update;
   if not found or marked is null then raise exception 'AGENCY_RECORD_MISSING' using errcode='P0002';end if;
   update public.gary_crm_contacts set deleted_at=null,deleted_by=null where id=p_id;
  end if;
 else raise exception 'AGENCY_KIND_INVALID' using errcode='22023';end if;
 insert into gary_private.deletion_events(kind,record_id,action,actor_id) values(p_kind,p_id,'restored',auth.uid());
 return jsonb_build_object('id',p_id,'kind',p_kind,'version',ver,'deleted_at',null);
end;$function$;

create or replace function gary_private.cms_register_media(p_path text,p_name text,p_mime text,p_size integer,p_alt_en text default '',p_alt_vi text default '') returns public.gary_cms_media
language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media; object_metadata jsonb;
begin
  if not (gary_private.is_site_owner() or coalesce(gary_private.cms_role() in('editor','admin'),false)) then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  select * into media from public.gary_cms_media m where m.object_path=p_path for update;
  if not found or (media.uploaded_by<>auth.uid() and not gary_private.is_site_owner()) then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if media.state='ready' then return media; end if;
  if media.state<>'reserved' then raise exception 'CMS_MEDIA_NOT_PUBLIC' using errcode='23514'; end if;
  select o.metadata into object_metadata from storage.objects o where o.bucket_id='gary-cms-media' and o.name=p_path;
  if not found then raise exception 'CMS_MEDIA_MISSING' using errcode='23514'; end if;
  if object_metadata->>'mimetype' is distinct from media.mime_type or object_metadata->>'size' is distinct from media.size_bytes::text then
    raise exception 'CMS_MEDIA_INVALID' using errcode='23514'; end if;
  update public.gary_cms_media set state='ready',version=version+1 where id=media.id returning * into media;
  return media;
end;
$$;

create or replace function public.gary_cms_update_media(p_id uuid,p_version integer,p_alt_en text,p_alt_vi text,p_caption_en text,p_caption_vi text)
returns public.gary_cms_media language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media;
begin
  if not gary_private.is_site_owner() then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if trim(coalesce(p_alt_en,''))='' or trim(coalesce(p_alt_vi,''))='' then raise exception 'CMS_MEDIA_INVALID' using errcode='23514'; end if;
  update public.gary_cms_media set alt_en=trim(p_alt_en),alt_vi=trim(p_alt_vi),caption_en=trim(coalesce(p_caption_en,'')),
    caption_vi=trim(coalesce(p_caption_vi,'')),version=version+1 where id=p_id and version=p_version and state='ready' returning * into media;
  if not found then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001'; end if;
  return media;
end;
$$;

create or replace function public.gary_cms_reserve_media(p_path text,p_name text,p_mime text,p_size integer,p_alt_en text,p_alt_vi text,
  p_caption_en text,p_caption_vi text,p_public_confirmed boolean) returns public.gary_cms_media
language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media;
begin
  if not (gary_private.is_site_owner() or coalesce(gary_private.cms_role() in('editor','admin'),false)) then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if p_public_confirmed is distinct from true then raise exception 'CMS_MEDIA_PUBLIC_CONFIRMATION' using errcode='23514'; end if;
  if p_path is null or p_path !~ ('^'||auth.uid()::text||'/[a-f0-9-]{36}[.](jpg|png|webp|avif)$') then
    raise exception 'CMS_INVALID_MEDIA_URL' using errcode='23514'; end if;
  if not coalesce((case p_mime when 'image/jpeg' then right(p_path,4)='.jpg' when 'image/png' then right(p_path,4)='.png'
    when 'image/webp' then right(p_path,5)='.webp' when 'image/avif' then right(p_path,5)='.avif' end),false)
    or trim(coalesce(p_alt_en,''))='' or trim(coalesce(p_alt_vi,''))='' then raise exception 'CMS_MEDIA_INVALID' using errcode='23514'; end if;
  insert into public.gary_cms_media(object_path,file_name,mime_type,size_bytes,alt_en,alt_vi,caption_en,caption_vi,state)
    values(p_path,p_name,p_mime,p_size,trim(p_alt_en),trim(p_alt_vi),trim(coalesce(p_caption_en,'')),trim(coalesce(p_caption_vi,'')),'reserved')
    returning * into media;
  return media;
end;
$$;

create or replace function gary_private.cms_media_path(p_name text) returns boolean
language sql volatile security definer set search_path='' as $$
  select (gary_private.is_site_owner() or coalesce(gary_private.cms_role() in('editor','admin'),false)) and exists(
    select 1 from public.gary_cms_media m where m.object_path=p_name and m.uploaded_by=auth.uid() and m.state='reserved' for share);
$$;

create or replace function gary_private.cms_may_remove_media(p_owner uuid) returns boolean
language sql stable set search_path='' as $$
  select gary_private.is_site_owner();
$$;

alter policy agency_cms_media_read on public.gary_cms_media using((select gary_private.is_site_owner()));

-- Storage can read the inserted row while returning an upload receipt. The
-- exception is scoped to the upload operation and the caller's own reservation.
create function gary_private.cms_media_object_readable(p_name text) returns boolean
language sql volatile set search_path='' as $$
  select case when gary_private.is_site_owner() then true
    when storage.allow_only_operation('object.upload') then gary_private.cms_media_path(p_name)
    else false end;
$$;
revoke all on function gary_private.cms_media_object_readable(text) from public,anon,authenticated;
grant execute on function gary_private.cms_media_object_readable(text) to authenticated;
alter policy agency_cms_object_read on storage.objects
  using(bucket_id='gary-cms-media' and gary_private.cms_media_object_readable(name));
create policy agency_cms_object_read_guard on storage.objects as restrictive for select to authenticated
  using(bucket_id<>'gary-cms-media' or gary_private.cms_media_object_readable(name));

-- Cover selection needs approved image URLs, even for editors without inventory access.
create function gary_private.cms_ready_images() returns table(file_name text,object_path text)
language sql stable security definer set search_path='' as $$
  select m.file_name,m.object_path from public.gary_cms_media m
  where m.state='ready' and (gary_private.cms_role() is not null or gary_private.is_site_owner())
  order by m.created_at desc,m.id limit 200;
$$;
create function public.gary_cms_ready_images() returns table(file_name text,object_path text)
language sql stable security invoker set search_path='' as $$
  select * from gary_private.cms_ready_images();
$$;

create or replace function public.gary_cms_capabilities() returns jsonb
language sql stable security invoker set search_path='' as $$
  select jsonb_build_object('role',r,'read',r is not null or owner,'edit',coalesce(r in('editor','admin'),false),
    'publish',coalesce(r in('publisher','admin'),false),'media',owner or coalesce(r in('editor','admin'),false),
    'trash',coalesce(r='admin',false),'manage_media',owner)
  from (select gary_private.cms_role() r,gary_private.is_site_owner() owner) role_row;
$$;

-- Retention applies only to the already-supported Visa Trash categories.
create function gary_private.set_trash_retention(p_kind text,p_minimum_days integer) returns void
language plpgsql security definer set search_path='' as $$
begin
  if not gary_private.is_site_owner() then raise exception 'AGENCY_SITE_OWNER_REQUIRED' using errcode='42501'; end if;
  if p_kind is null or p_kind not in ('case','article') or p_minimum_days is null or p_minimum_days<0 then
    raise exception 'AGENCY_RETENTION_INVALID' using errcode='22023';
  end if;
  insert into gary_private.trash_retention(kind,minimum_days) values(p_kind,p_minimum_days)
  on conflict(kind) do update set minimum_days=excluded.minimum_days;
end;
$$;
create function public.gary_set_trash_retention(p_kind text,p_minimum_days integer) returns void
language sql security invoker set search_path='' as $$
  select gary_private.set_trash_retention(p_kind,p_minimum_days);
$$;
revoke all on function gary_private.cms_ready_images(),public.gary_cms_ready_images(),
  gary_private.set_trash_retention(text,integer),public.gary_set_trash_retention(text,integer)
  from public,anon,authenticated;
grant execute on function gary_private.cms_ready_images(),public.gary_cms_ready_images(),
  gary_private.set_trash_retention(text,integer),public.gary_set_trash_retention(text,integer) to authenticated;

notify pgrst,'reload schema';
commit;
