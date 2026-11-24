begin;

-- Keep existing requests available for review in place with their history.
alter table public.gary_applications add column intake_kind text not null default 'unreviewed'
  check (intake_kind in ('unreviewed','application','editorial','internal_test'));
alter table public.gary_applications add column request_confirmed boolean not null default false;
alter table public.gary_application_events add column intake_kind text
  check (intake_kind in ('unreviewed','application','editorial','internal_test'));
grant update (intake_kind) on public.gary_applications to authenticated;
grant insert (request_confirmed) on public.gary_applications to authenticated;

create function gary_private.guard_application_intake() returns trigger
language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='INSERT' and new.request_confirmed then new.intake_kind:='application'; end if;
  if tg_op='UPDATE' and new.intake_kind is distinct from old.intake_kind
    and not gary_private.oversees_operations() then
    raise exception 'APPLICATION_REVIEW_DENIED' using errcode='42501';
  end if;
  if tg_op='INSERT' or new.subject is distinct from old.subject then
    new.subject:=btrim(new.subject);
    if char_length(new.subject) not between 3 and 160 or new.subject !~ '[[:alnum:]]'
      or new.subject ~ '[[:cntrl:]]' then
      raise exception 'APPLICATION_SUBJECT_INVALID' using errcode='23514';
    end if;
  end if;
  return new;
end;
$$;

create function gary_private.record_application_intake() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  insert into public.gary_application_events(application_id,status,intake_kind,actor_id)
    values(new.id,new.status,new.intake_kind,auth.uid());
  return new;
end;
$$;

revoke all on function gary_private.guard_application_intake(),gary_private.record_application_intake() from public,anon,authenticated;
create trigger gary_application_intake_guard before insert or update of subject,intake_kind on public.gary_applications
  for each row execute function gary_private.guard_application_intake();
create trigger gary_application_intake_audit after update of intake_kind on public.gary_applications
  for each row when (new.intake_kind is distinct from old.intake_kind) execute function gary_private.record_application_intake();

notify pgrst,'reload schema';
commit;
