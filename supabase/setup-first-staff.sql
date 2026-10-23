-- Run in project duyiihsmaqfgwezmsnjs's SQL Editor after creating this user
-- in Authentication > Users. Choose the password there, not in this file.
-- Replace every staff@example.com below with the registered staff email.
-- This grants website staff access, not Supabase project ownership.
begin;
do $first_staff$
declare v_ids uuid[];v_id uuid;
begin
 select array_agg(id) into v_ids from auth.users where lower(email)='staff@example.com';
 if coalesce(cardinality(v_ids),0)=0 then
  raise exception 'Create staff@example.com in Authentication > Users first, then run this query again.';
 end if;
 if cardinality(v_ids)<>1 then raise exception 'Multiple matching users were found. Review the account before granting staff access.'; end if;
 v_id:=v_ids[1];
 insert into gary_private.staff_members(user_id) values(v_id) on conflict(user_id) do nothing;
 -- Create the profile after granting staff membership, so this staff account
 -- is not automatically added to the customer CRM. Keep existing details.
 insert into public.gary_profiles(id,contact_email) values(v_id,'staff@example.com') on conflict(id) do nothing;
end;
$first_staff$;
commit;
select u.email,'staff' as website_role from auth.users u
join gary_private.staff_members s on s.user_id=u.id
where lower(u.email)='staff@example.com';
