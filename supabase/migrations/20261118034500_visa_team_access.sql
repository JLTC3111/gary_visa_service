-- PENDING APPROVAL: local follow-up only; do not apply without owner approval.
-- Gary Visa Team Access. Operations Admins and CMS Admins add existing, verified accounts
-- to the Visa staff directory with a role below Admin in their own area only. Accounts,
-- passwords, Gary Home and Teaching Jobs are never changed. Existing members, roles and
-- history are unchanged. Requires 20261117202944_staff_auth_eligibility.sql.
begin;
alter table gary_private.access_events drop constraint access_events_scope_check,
 add constraint access_events_scope_check check(scope in('operations','cms','membership'));

-- The directory also reports whether each member's identity can still sign in.
create or replace function gary_private.staff_access_list() returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare v_operations text;v_cms text;v_members jsonb;
begin
 v_operations:=gary_private.operations_role();v_cms:=gary_private.cms_role();
 if auth.uid() is null or not gary_private.is_staff() or (v_operations is distinct from 'admin' and v_cms is distinct from 'admin') then
  raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';
 end if;
 select coalesce(jsonb_agg(jsonb_build_object(
  'user_id',x.user_id,'display_name',x.display_name,'email',x.email,'operations_role',x.operations_role,'cms_role',x.cms_role,'self',x.user_id=auth.uid(),
  'account',case when gary_private.staff_identity_eligible(x.user_id) then 'active' else 'unavailable' end,
  'manage_operations',v_operations is not distinct from 'admin' and x.user_id<>auth.uid() and x.operations_role is distinct from 'admin',
  'manage_cms',v_cms is not distinct from 'admin' and x.user_id<>auth.uid() and x.cms_role is distinct from 'admin'
 ) order by lower(x.display_name),lower(x.email),x.user_id),'[]'::jsonb) into v_members
 from (
  select s.user_id,coalesce(nullif(trim(p.full_name),''),'') display_name,coalesce(u.email,'') email,s.operations_role,case when m.active then m.role end cms_role
  from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id left join auth.users u on u.id=s.user_id left join gary_private.cms_members m on m.user_id=s.user_id
 ) x;
 return jsonb_build_object('members',v_members,'operations_role',v_operations,'cms_role',v_cms);
end;$$;

-- Each role must come from the caller's own Admin area. A CMS row kept from an earlier
-- membership is switched off unless a CMS Admin assigns a CMS role here, so the new
-- member holds exactly the roles chosen.
create function gary_private.add_staff_member(p_email text,p_operations_role text,p_cms_role text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_operations text;v_cms text;v_email text:=lower(trim(p_email));v_ids uuid[];v_user uuid;
begin
 v_operations:=gary_private.operations_role();v_cms:=gary_private.cms_role();
 if auth.uid() is null or not gary_private.is_staff() or (v_operations is distinct from 'admin' and v_cms is distinct from 'admin') then
  raise exception 'AGENCY_STAFF_ADMIN_REQUIRED' using errcode='42501';
 end if;
 if p_operations_role='admin' or p_cms_role='admin' then raise exception 'AGENCY_PROTECTED_ROLE' using errcode='42501';end if;
 if (p_operations_role is not null and p_operations_role not in('staff','manager')) or (p_cms_role is not null and p_cms_role not in('editor','publisher')) then
  raise exception 'AGENCY_ROLE_INVALID' using errcode='22023';
 end if;
 if p_operations_role is null and p_cms_role is null then raise exception 'AGENCY_ROLE_REQUIRED' using errcode='22023';end if;
 if p_operations_role is not null and v_operations is distinct from 'admin' then raise exception 'AGENCY_OPERATIONS_ADMIN_REQUIRED' using errcode='42501';end if;
 if p_cms_role is not null and v_cms is distinct from 'admin' then raise exception 'AGENCY_CMS_ADMIN_REQUIRED' using errcode='42501';end if;
 if v_email is null or length(v_email)>320 or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+$' then
  raise exception 'AGENCY_EMAIL_INVALID' using errcode='22023';
 end if;
 -- Missing, ambiguous, unconfirmed, suspended, removed and anonymous accounts look the same.
 select array_agg(u.id) into v_ids from (select id from auth.users where lower(email)=v_email limit 2) u;
 if coalesce(array_length(v_ids,1),0)<>1 or not gary_private.staff_identity_eligible(v_ids[1]) then
  raise exception 'AGENCY_ACCOUNT_UNAVAILABLE' using errcode='P0002';
 end if;
 v_user:=v_ids[1];
 if v_user=auth.uid() then raise exception 'AGENCY_SELF_ROLE_DENIED' using errcode='42501';end if;
 insert into gary_private.staff_members(user_id,operations_role) values(v_user,p_operations_role) on conflict(user_id) do nothing;
 if not found then raise exception 'AGENCY_STAFF_EXISTS' using errcode='23505';end if;
 if p_cms_role is null then update gary_private.cms_members set active=false where user_id=v_user and active;
 else insert into gary_private.cms_members(user_id,role,active) values(v_user,p_cms_role,true) on conflict(user_id) do update set role=excluded.role,active=true;end if;
 insert into gary_private.access_events(member_id,scope,from_role,to_role,actor_id,source)
 select v_user,e.scope,null,e.role,auth.uid(),'portal' from (values('membership','member'),('operations',p_operations_role),('cms',p_cms_role)) e(scope,role) where e.role is not null;
 return jsonb_build_object('user_id',v_user,'operations_role',p_operations_role,'cms_role',p_cms_role);
end;$$;

create function public.gary_add_staff_member(p_email text,p_operations_role text,p_cms_role text) returns jsonb language sql security invoker set search_path='' as $$ select gary_private.add_staff_member(p_email,p_operations_role,p_cms_role); $$;
revoke all on function gary_private.staff_access_list(),gary_private.add_staff_member(text,text,text),public.gary_add_staff_member(text,text,text) from public,anon,authenticated;
grant execute on function gary_private.staff_access_list(),gary_private.add_staff_member(text,text,text),public.gary_add_staff_member(text,text,text) to authenticated;

notify pgrst,'reload schema';
commit;
