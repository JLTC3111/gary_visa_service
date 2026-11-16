-- Owner-controlled setup after applying agency_cms_foundation.
-- CMS membership never creates Agency staff or Home/Jobs access.
-- Replace staff@example.com with an existing Agency staff email. Never commit passwords.
begin;
do $$
declare v uuid;
begin
 select u.id into strict v from auth.users u join gary_private.staff_members s on s.user_id=u.id where lower(u.email)='staff@example.com';
 insert into gary_private.cms_members(user_id,role,active) values(v,'admin',true)
 on conflict(user_id) do update set role=excluded.role,active=true;
end;$$;
commit;
-- Grant other existing Agency staff editor/publisher roles through this same
-- owner-reviewed table, never via browser user metadata. Deactivate/revoke by
-- setting active=false. Removing Agency staff also immediately removes access.
