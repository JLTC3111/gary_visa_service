-- After the Operations/CMS roles migration, new members start with No Access. Assign
-- Staff/Manager or Editor/Publisher in Staff Management, or Admin with set-visa-roles.sql.
insert into gary_private.staff_members(user_id)
select id from auth.users where lower(email) = lower('giangcr9@gmail.com')
on conflict(user_id) do nothing;

-- Verify the assigned account without exposing customer data.
select u.email, s.created_at from gary_private.staff_members s
join auth.users u on u.id = s.user_id;
