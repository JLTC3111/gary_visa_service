-- Run in the Supabase SQL editor after the staff member has registered.
-- Replace the email below with the exact staff account email.
-- No customer-facing API can grant this role.
insert into gary_private.staff_members(user_id)
select id from auth.users where lower(email) = lower('REPLACE_WITH_STAFF_EMAIL')
on conflict(user_id) do nothing;

-- Verify the assigned account without exposing customer data.
select u.email, s.created_at from gary_private.staff_members s
join auth.users u on u.id = s.user_id;
