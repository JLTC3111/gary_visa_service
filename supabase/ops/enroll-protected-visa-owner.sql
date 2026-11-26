-- Manual operator procedure for an independently verified existing Visa staff Auth UUID.
-- psql -X -v ON_ERROR_STOP=1 -v approved_visa_owner_uuid='<approved Auth UUID>' -f this-file.sql
\if :{?approved_visa_owner_uuid}
\else
\echo The approved Visa Owner Auth UUID is required.
\quit 1
\endif
begin;
select set_config('gary.approved_visa_owner_uuid', :'approved_visa_owner_uuid', true) is not null as supplied \gset

do $$
declare target uuid:=current_setting('gary.approved_visa_owner_uuid')::uuid;
begin
  perform 1 from gary_private.staff_members s
  where s.user_id=target and s.revoked_at is null and gary_private.staff_identity_eligible(s.user_id)
  for update;
  if not found then
    raise exception 'The approved Auth UUID does not have an eligible active Gary Visa staff membership';
  end if;

  update gary_private.staff_members set site_owner=true
  where user_id=target and site_owner is false;
end;
$$;

select s.user_id,s.site_owner,s.operations_role,
  case when m.active then m.role end as active_cms_role
from gary_private.staff_members s left join gary_private.cms_members m on m.user_id=s.user_id
where s.user_id=current_setting('gary.approved_visa_owner_uuid')::uuid;
commit;
