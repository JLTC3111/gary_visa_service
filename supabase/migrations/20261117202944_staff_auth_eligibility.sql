-- PENDING APPROVAL: local follow-up only; do not apply without owner approval.
-- Existing identities, memberships, roles and historical records are unchanged.
begin;
create function gary_private.staff_identity_eligible(p_user uuid) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users u where u.id=p_user and u.email_confirmed_at is not null
  and u.deleted_at is null and not coalesce(u.is_anonymous,false)
  and (u.banned_until is null or u.banned_until<=now()));
$$;
revoke all on function gary_private.staff_identity_eligible(uuid) from public,anon,authenticated;

create or replace function gary_private.is_staff() returns boolean
language sql stable security definer set search_path='' as $$
 select gary_private.staff_identity_eligible(auth.uid()) and exists(select 1 from gary_private.staff_members where user_id=auth.uid());
$$;
create or replace function gary_private.operations_role() returns text
language sql stable security definer set search_path='' as $$
 select operations_role from gary_private.staff_members where user_id=auth.uid() and gary_private.staff_identity_eligible(auth.uid());
$$;
create or replace function gary_private.is_assignable(p_user uuid) returns boolean
language sql stable security definer set search_path='' as $$
 select gary_private.staff_identity_eligible(p_user) and exists(select 1 from gary_private.staff_members where user_id=p_user and operations_role is not null);
$$;
-- cms_role already checks is_staff; it remains independent of operations_role.
revoke all on function gary_private.is_staff(),gary_private.operations_role(),gary_private.is_assignable(uuid) from public,anon;
grant execute on function gary_private.is_staff(),gary_private.operations_role(),gary_private.is_assignable(uuid) to authenticated;
create or replace function gary_private.staff_directory() returns table(user_id uuid,display_name text,assignable boolean)
language plpgsql stable security definer set search_path='' as $$
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'Staff authentication required.' using errcode='42501';end if;
 return query select s.user_id,coalesce(nullif(p.full_name,''),'Gary team'),gary_private.is_assignable(s.user_id)
  from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id order by p.full_name;
end;$$;
revoke all on function gary_private.staff_directory() from public,anon;
grant execute on function gary_private.staff_directory() to authenticated;
commit;
