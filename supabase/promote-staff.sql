-- GARY VISA: STAFF ROLE MANAGEMENT
-- Run after migration 20261117190000_visa_operations_cms_roles.sql
-- Operations and CMS permissions are independent.
-- Does not modify Auth accounts, passwords, Gary Home or Teaching Jobs.

begin;

do $gary_roles$
declare
  -- EDIT THESE THREE VALUES
  v_email constant text := 'skycastle3@protonmail.com';

  -- Operations: staff | manager | admin | none | keep
  v_operations constant text := 'keep';

  -- CMS: editor | publisher | admin | none | keep
  v_cms constant text := 'keep';

  v_user uuid;
  v_from text;

begin
  -- Validate role choices
  if v_operations not in
    ('staff','manager','admin','none','keep')
    or v_cms not in
    ('editor','publisher','admin','none','keep')
  then
    raise exception 'Invalid Operations or CMS role.';
  end if;

  -- Verify migration
  if to_regclass('gary_private.access_events') is null then
    raise exception 'Required migration is missing.';
  end if;

  -- Resolve the target Gary Visa staff member
  begin
    select s.user_id
    into strict v_user
    from gary_private.staff_members s
    join auth.users u on u.id = s.user_id
    where lower(u.email) = lower(trim(v_email));

  exception
    when no_data_found then
      raise exception
        'Staff member % not found in Gary Visa.',
        trim(v_email);

    when too_many_rows then
      raise exception
        'Multiple staff accounts match %.',
        trim(v_email);
  end;

  -- OPERATIONS ROLE
  if v_operations <> 'keep' then

    select operations_role
    into v_from
    from gary_private.staff_members
    where user_id = v_user
    for update;

    if v_from is distinct from nullif(v_operations,'none') then

      update gary_private.staff_members
      set operations_role = nullif(v_operations,'none')
      where user_id = v_user;

      insert into gary_private.access_events
        (member_id, scope, from_role, to_role, source)
      values
        (v_user, 'operations', v_from,
         nullif(v_operations,'none'), 'owner');

      if v_operations not in ('manager','admin') then
        update gary_private.chat_staff_presence
        set available = false
        where staff_id = v_user and available;
      end if;

    end if;
  end if;

  -- CMS ROLE
  if v_cms <> 'keep' then

    select case when active then role end
    into v_from
    from gary_private.cms_members
    where user_id = v_user
    for update;

    if v_from is distinct from nullif(v_cms,'none') then

      if v_cms = 'none' then

        update gary_private.cms_members
        set active = false
        where user_id = v_user;

      else

        insert into gary_private.cms_members
          (user_id, role, active)
        values
          (v_user, v_cms, true)
        on conflict (user_id)
        do update set
          role = excluded.role,
          active = true;

      end if;

      insert into gary_private.access_events
        (member_id, scope, from_role, to_role, source)
      values
        (v_user, 'cms', v_from,
         nullif(v_cms,'none'), 'owner');

    end if;
  end if;

end;
$gary_roles$;

commit;

-- VERIFY FINAL ROLES
select
  u.email,
  s.operations_role,
  case when m.active then m.role end as cms_role
from gary_private.staff_members s
join auth.users u on u.id = s.user_id
left join gary_private.cms_members m on m.user_id = s.user_id
where lower(u.email) = lower('skycastle3@protonmail.com');