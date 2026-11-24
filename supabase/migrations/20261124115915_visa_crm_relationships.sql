begin;

alter table public.gary_crm_contacts add column internal_test boolean not null default false;
grant insert (internal_test), update (internal_test) on public.gary_crm_contacts to authenticated;

-- A CRM link follows the profile UUID. A claimed email never attaches a guest
-- conversation or transfers an existing contact to a registered account.
create function gary_private.refresh_crm_profile(p public.gary_profiles) returns void
language plpgsql security definer set search_path='' as $$
declare
  have_request boolean;
  email_key text:=lower(btrim(p.contact_email));
begin
  if not exists(select 1 from public.gary_crm_contacts where profile_id=p.id) then
    select exists(select 1 from public.gary_applications a
      where a.customer_id=p.id and a.deleted_at is null and a.intake_kind='application') into have_request;
    if not have_request then
      if exists(select 1 from gary_private.staff_members where user_id=p.id) then return; end if;
      if email_key<>'' then
        perform pg_advisory_xact_lock(hashtextextended(email_key,1));
        if exists(select 1 from public.gary_crm_contacts c where c.deleted_at is null and not c.internal_test
          and lower(btrim(c.email))=email_key and c.profile_id is distinct from p.id) then return; end if;
      end if;
    end if;
  end if;
  insert into public.gary_crm_contacts as c(profile_id,full_name,email,phone,stage,source)
    values(p.id,case when char_length(trim(p.full_name))>=2 then trim(p.full_name) else 'Customer' end,
      p.contact_email,p.phone,'lead','customer_portal')
  on conflict(profile_id) do update set full_name=excluded.full_name,email=excluded.email,phone=excluded.phone
    where c.deleted_at is null and (c.full_name,c.email,c.phone) is distinct from (excluded.full_name,excluded.email,excluded.phone);
end;
$$;

create or replace function gary_private.sync_crm_profile() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  if auth.uid() is not null and auth.uid()<>new.id and not gary_private.is_staff() then raise exception 'Not authorized.' using errcode='42501'; end if;
  if auth.uid() is null and session_user not in('postgres','supabase_admin') then raise exception 'Authentication required.' using errcode='42501'; end if;
  perform gary_private.refresh_crm_profile(new);
  return new;
end;
$$;

create function gary_private.sync_crm_application() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  perform gary_private.refresh_crm_profile(p) from public.gary_profiles p where p.id=new.customer_id;
  return new;
end;
$$;
create trigger gary_crm_application_sync after insert or update of intake_kind on public.gary_applications
  for each row when (new.intake_kind='application' and new.deleted_at is null) execute function gary_private.sync_crm_application();

create function gary_private.guard_crm_duplicate_email() returns trigger
language plpgsql security definer set search_path='' as $$
declare email_key text:=lower(btrim(new.email));
begin
  if new.source<>'manual' or new.profile_id is not null or new.internal_test or new.deleted_at is not null or email_key='' then return new; end if;
  if tg_op='UPDATE' and not old.internal_test and email_key=lower(btrim(old.email)) then return new; end if;
  perform pg_advisory_xact_lock(hashtextextended(email_key,1));
  if exists(select 1 from public.gary_crm_contacts c where c.id<>new.id and c.deleted_at is null and not c.internal_test
    and lower(btrim(c.email))=email_key) then
    raise exception 'CRM_EMAIL_ALREADY_USED' using errcode='23505';
  end if;
  return new;
end;
$$;
create trigger gary_crm_manual_email_guard before insert or update of email,internal_test on public.gary_crm_contacts
  for each row execute function gary_private.guard_crm_duplicate_email();

-- Use the same queue visibility as the existing CRM RLS for this small
-- projection. Case details and roster permissions are never returned.
create function gary_private.crm_contact_relationship(p_contact uuid)
returns table(relationship text,staff_linked boolean) language sql stable security definer set search_path='' as $$
  select case when c.internal_test then 'internal_test'
      when exists(select 1 from public.gary_applications a where a.customer_id=c.profile_id
        and a.deleted_at is null and a.intake_kind='application')
        or c.stage='customer' and (c.source='manual' or exists(
          select 1 from public.gary_crm_events e where e.contact_id=c.id and e.kind='stage_changed' and e.changes->>'to'='customer')) then 'customer'
      when s.user_id is not null then 'staff_linked'
      else 'lead' end,
    s.user_id is not null
  from public.gary_crm_contacts c left join gary_private.staff_members s on s.user_id=c.profile_id
  where c.id=p_contact and c.deleted_at is null and auth.uid() is not null and
    (gary_private.oversees_operations() or (c.assigned_staff_id=auth.uid() and gary_private.has_operations()));
$$;
revoke all on function gary_private.refresh_crm_profile(public.gary_profiles),gary_private.sync_crm_application(),
  gary_private.guard_crm_duplicate_email(),gary_private.crm_contact_relationship(uuid) from public,anon,authenticated;
grant execute on function gary_private.crm_contact_relationship(uuid) to authenticated;

create view public.gary_crm_contact_directory with (security_invoker=true) as
  select c.*,r.relationship,r.staff_linked,
    case when c.stage='customer' and r.relationship<>'customer' then 'lead'
         when c.stage='lead' and r.relationship='customer' then 'customer' else c.stage end as display_stage
  from public.gary_crm_contacts c cross join lateral gary_private.crm_contact_relationship(c.id) r;
revoke all on public.gary_crm_contact_directory from public,anon,authenticated;
grant select on public.gary_crm_contact_directory to authenticated;

-- Reuse a returning guest's unlinked lead under the existing email lock.
-- Each conversation still has its own token, identity and audit history.
create or replace function gary_private.open_chat(p_token text,p_name text,p_email text,p_message text,p_client_id uuid,p_service text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_hash bytea; v_id uuid; v_contact uuid; v_profile uuid; v_name text; v_email text;
begin
 if p_token is null or p_name is null or p_email is null or p_message is null
  or p_token !~ '^[0-9a-f]{64}$' or char_length(trim(p_name)) not between 2 and 100 or char_length(p_email)>254
  or (p_email<>'' and p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') or char_length(trim(p_message)) not between 1 and 4000 or p_client_id is null
  or (p_service is not null and p_service not in('visa','work','residence','documents')) then raise exception 'Please check your chat details.' using errcode='22023'; end if;
 v_hash:=pg_catalog.sha256(pg_catalog.convert_to(p_token,'UTF8'));
 perform pg_advisory_xact_lock(hashtextextended(encode(v_hash,'hex'),0));
 select conversation_id into v_id from gary_private.chat_sessions where token_hash=v_hash;
 if v_id is not null then return gary_private.read_chat(v_id,p_token,null,null,true); end if;
 v_profile:=auth.uid();v_name:=trim(p_name);v_email:=lower(trim(p_email));
 if v_profile is not null and gary_private.is_staff() then raise exception 'Use the staff inbox to reply to conversations.' using errcode='42501'; end if;
 if v_profile is not null and not exists(select 1 from public.gary_profiles where id=v_profile) then raise exception 'Please complete your profile first.' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended(v_email,1));
 if v_profile is not null then perform pg_advisory_xact_lock(hashtextextended(v_profile::text,2)); end if;
 if (select count(*) from public.gary_chat_conversations where ((v_email<>'' and lower(visitor_email)=v_email) or (v_profile is not null and customer_id=v_profile)) and created_at>clock_timestamp()-interval '1 hour')>=3 then
  raise exception 'Please continue your existing conversation or try again later.' using errcode='P0001';
 end if;
 if v_profile is not null then
  select id into v_contact from public.gary_crm_contacts where profile_id=v_profile;
 elsif v_email<>'' then
  select id into v_contact from public.gary_crm_contacts where profile_id is null and source='website_chat'
    and deleted_at is null and not internal_test and stage<>'archived'
    and lower(btrim(email))=v_email and lower(btrim(full_name))=lower(v_name) order by created_at,id limit 1;
 end if;
 if v_contact is null then
  insert into public.gary_crm_contacts(profile_id,full_name,email,stage,source,interested_service)
  values(v_profile,v_name,v_email,'lead','website_chat',p_service) on conflict(profile_id) do nothing returning id into v_contact;
  if v_contact is null then select id into v_contact from public.gary_crm_contacts where profile_id=v_profile; end if;
 end if;
 insert into public.gary_chat_conversations(contact_id,customer_id,visitor_name,visitor_email,subject)
 values(v_contact,v_profile,v_name,v_email,coalesce(p_service,'Website')||' enquiry') returning id into v_id;
 insert into gary_private.chat_sessions(conversation_id,token_hash,guest_allowed) values(v_id,v_hash,v_profile is null);
 perform gary_private.send_chat(v_id,p_message,p_client_id,p_token);
 return gary_private.read_chat(v_id,p_token,null,null,true);
end;$$;

notify pgrst,'reload schema';
commit;
