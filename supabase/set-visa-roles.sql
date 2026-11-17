-- Owner-only: set one existing Gary Visa staff member's Operations and CMS roles.
-- Run in the Supabase SQL editor after 20261117190000_visa_operations_cms_roles.sql.
-- Use it for protected Admin changes (granting or removing Operations Admin or CMS Admin)
-- and for deliberately narrowing an existing member. The portal cannot make these changes.
-- Gary Visa only: never touches passwords, Auth identities, Gary Home or Teaching Jobs.
-- Replace the email, choose each role, review, then run the whole script.
begin;
do $gary_roles$
declare
 v_email constant text:='skycastle3@protonmail.com';
 v_operations constant text:='keep'; -- staff | manager | admin | none (No Access) | keep
 v_cms constant text:='keep';        -- editor | publisher | admin | none (No Access) | keep
 v_user uuid;v_from text;
begin
 if v_operations not in('staff','manager','admin','none','keep') or v_cms not in('editor','publisher','admin','none','keep') then
  raise exception 'Operations: staff/manager/admin/none/keep. CMS: editor/publisher/admin/none/keep.';
 end if;
 if to_regclass('gary_private.access_events') is null then
  raise exception 'Nothing changed: apply migration 20261117190000_visa_operations_cms_roles.sql first.';
 end if;
 if trim(v_email)='skycastle3@protonmail.com' then
  raise exception 'Nothing changed: replace skycastle3@protonmail.com with the staff member''s sign-in email.';
 end if;
 begin
  select s.user_id into strict v_user from gary_private.staff_members s join auth.users u on u.id=s.user_id where lower(u.email)=lower(trim(v_email));
 exception
  when no_data_found then raise exception 'Nothing changed: % is not a Gary Visa staff member. Check the email, or add them with promote-staff.sql first.',trim(v_email);
  when too_many_rows then raise exception 'Nothing changed: more than one staff account uses %. Change these accounts in a reviewed query instead.',trim(v_email);
 end;
 if v_operations<>'keep' then
  select operations_role into v_from from gary_private.staff_members where user_id=v_user for update;
  if v_from is distinct from nullif(v_operations,'none') then
   update gary_private.staff_members set operations_role=nullif(v_operations,'none') where user_id=v_user;
   insert into gary_private.access_events(member_id,scope,from_role,to_role,source) values(v_user,'operations',v_from,nullif(v_operations,'none'),'owner');
   if v_operations not in('manager','admin') then update gary_private.chat_staff_presence set available=false where staff_id=v_user and available;end if;
  end if;
 end if;
 if v_cms<>'keep' then
  select case when active then role end into v_from from gary_private.cms_members where user_id=v_user for update;
  if v_from is distinct from nullif(v_cms,'none') then
   if v_cms='none' then update gary_private.cms_members set active=false where user_id=v_user;
   else insert into gary_private.cms_members(user_id,role,active) values(v_user,v_cms,true) on conflict(user_id) do update set role=excluded.role,active=true;end if;
   insert into gary_private.access_events(member_id,scope,from_role,to_role,source) values(v_user,'cms',v_from,nullif(v_cms,'none'),'owner');
  end if;
 end if;
end;
$gary_roles$;
commit;

-- Review current Visa roles (staff directory only, no customer data).
select u.email,s.operations_role,case when m.active then m.role end as cms_role
from gary_private.staff_members s join auth.users u on u.id=s.user_id
left join gary_private.cms_members m on m.user_id=s.user_id order by u.email;
