-- Gary Agency customer and staff portal.
-- Apply once in the SQL editor for project duyiihsmaqfgwezmsnjs.
-- All objects are prefixed or isolated; existing application objects are untouched.
begin;

create schema if not exists gary_private;
revoke all on schema gary_private from public, anon, authenticated;
grant usage on schema gary_private to authenticated;

create table gary_private.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table gary_private.staff_members enable row level security;
revoke all on gary_private.staff_members from public, anon, authenticated;

create function gary_private.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists (
    select 1 from gary_private.staff_members where user_id = (select auth.uid())
  );
$$;
revoke all on function gary_private.is_staff() from public, anon, authenticated;
grant execute on function gary_private.is_staff() to authenticated;

create function public.gary_my_role() returns text
language sql stable security invoker set search_path = '' as $$
  select case when (select auth.uid()) is null then null
    when (select gary_private.is_staff()) then 'staff' else 'customer' end;
$$;
revoke all on function public.gary_my_role() from public, anon, authenticated;
grant execute on function public.gary_my_role() to authenticated;

create table public.gary_profiles (
  id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  full_name text not null default '' check (char_length(full_name) <= 100),
  contact_email text not null default '' check (char_length(contact_email) <= 254),
  phone text not null default '' check (char_length(phone) <= 40),
  nationality text not null default '' check (char_length(nationality) <= 80),
  preferred_language text not null default 'en' check (preferred_language in ('en','vi')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gary_applications (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null default auth.uid() references public.gary_profiles(id) on delete cascade,
  service text not null check (service in ('visa','work','residence','documents')),
  subject text not null check (char_length(trim(subject)) between 3 and 160),
  details text not null default '' check (char_length(details) <= 10000),
  status text not null default 'submitted' check (status in ('submitted','in_review','documents_needed','processing','completed','cancelled')),
  assigned_staff_id uuid references gary_private.staff_members(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index gary_applications_customer_idx on public.gary_applications(customer_id, created_at desc);
create index gary_applications_status_idx on public.gary_applications(status, updated_at desc);
create index gary_applications_assignee_idx on public.gary_applications(assigned_staff_id);

create table public.gary_application_events (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.gary_applications(id) on delete cascade,
  status text not null,
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index gary_events_application_idx on public.gary_application_events(application_id, created_at);
create index gary_events_actor_idx on public.gary_application_events(actor_id);

create table public.gary_messages (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.gary_applications(id) on delete cascade,
  sender_id uuid not null default auth.uid() references auth.users(id),
  body text not null check (char_length(trim(body)) between 1 and 5000),
  created_at timestamptz not null default now()
);
create index gary_messages_application_idx on public.gary_messages(application_id, created_at);
create index gary_messages_sender_idx on public.gary_messages(sender_id);

create table public.gary_staff_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.gary_applications(id) on delete cascade,
  staff_id uuid not null default auth.uid() references auth.users(id),
  body text not null check (char_length(trim(body)) between 1 and 5000),
  created_at timestamptz not null default now()
);
create index gary_notes_application_idx on public.gary_staff_notes(application_id, created_at);
create index gary_notes_staff_idx on public.gary_staff_notes(staff_id);

create table public.gary_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.gary_applications(id) on delete cascade,
  uploaded_by uuid not null default auth.uid() references auth.users(id),
  object_path text not null unique,
  file_name text not null check (char_length(file_name) between 1 and 200),
  mime_type text not null check (mime_type in ('application/pdf','image/jpeg','image/png','image/webp')),
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 10485760),
  created_at timestamptz not null default now(),
  check (split_part(object_path,'/',1) = application_id::text),
  check (split_part(object_path,'/',2) = uploaded_by::text),
  check (split_part(object_path,'/',3) <> '' and split_part(object_path,'/',4) = '')
);
create index gary_documents_application_idx on public.gary_documents(application_id, created_at);
create index gary_documents_uploader_idx on public.gary_documents(uploaded_by);

alter table public.gary_profiles enable row level security;
alter table public.gary_applications enable row level security;
alter table public.gary_application_events enable row level security;
alter table public.gary_messages enable row level security;
alter table public.gary_staff_notes enable row level security;
alter table public.gary_documents enable row level security;

revoke all on public.gary_profiles, public.gary_applications, public.gary_application_events,
  public.gary_messages, public.gary_staff_notes, public.gary_documents from public, anon, authenticated;
grant select on public.gary_profiles, public.gary_applications, public.gary_application_events,
  public.gary_messages, public.gary_staff_notes, public.gary_documents to authenticated;
grant insert(id,full_name,contact_email,phone,nationality,preferred_language) on public.gary_profiles to authenticated;
grant update(full_name,contact_email,phone,nationality,preferred_language) on public.gary_profiles to authenticated;
grant insert(service,subject,details) on public.gary_applications to authenticated;
grant update(service,subject,details,status,assigned_staff_id) on public.gary_applications to authenticated;
grant insert(application_id,body) on public.gary_messages, public.gary_staff_notes to authenticated;
grant insert(application_id,object_path,file_name,mime_type,size_bytes) on public.gary_documents to authenticated;

create policy gary_profiles_select on public.gary_profiles for select to authenticated
  using (id = (select auth.uid()) or (select gary_private.is_staff()));
create policy gary_profiles_insert on public.gary_profiles for insert to authenticated
  with check (id = (select auth.uid()));
create policy gary_profiles_update on public.gary_profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy gary_applications_select on public.gary_applications for select to authenticated
  using (customer_id = (select auth.uid()) or (select gary_private.is_staff()));
create policy gary_applications_insert on public.gary_applications for insert to authenticated
  with check (customer_id = (select auth.uid()) and status = 'submitted' and assigned_staff_id is null);
create policy gary_applications_update on public.gary_applications for update to authenticated
  using ((customer_id = (select auth.uid()) and status in ('submitted','documents_needed')) or (select gary_private.is_staff()))
  with check ((customer_id = (select auth.uid()) and status in ('submitted','documents_needed','cancelled')) or (select gary_private.is_staff()));

create policy gary_events_select on public.gary_application_events for select to authenticated
  using (exists(select 1 from public.gary_applications a where a.id = application_id and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))));
create policy gary_messages_select on public.gary_messages for select to authenticated
  using (exists(select 1 from public.gary_applications a where a.id = application_id and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))));
create policy gary_messages_insert on public.gary_messages for insert to authenticated
  with check (sender_id = (select auth.uid()) and exists(select 1 from public.gary_applications a where a.id = application_id and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))));
create policy gary_notes_select on public.gary_staff_notes for select to authenticated
  using ((select gary_private.is_staff()));
create policy gary_notes_insert on public.gary_staff_notes for insert to authenticated
  with check ((select gary_private.is_staff()) and staff_id = (select auth.uid()));
create policy gary_documents_select on public.gary_documents for select to authenticated
  using (exists(select 1 from public.gary_applications a where a.id = application_id and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))));
create policy gary_documents_insert on public.gary_documents for insert to authenticated
  with check (uploaded_by = (select auth.uid()) and exists(select 1 from public.gary_applications a where a.id = application_id and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))));

create function gary_private.touch_updated_at() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
revoke all on function gary_private.touch_updated_at() from public, anon, authenticated;
create trigger gary_profiles_updated before update on public.gary_profiles
  for each row execute function gary_private.touch_updated_at();

create function gary_private.guard_application_update() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if new.id is distinct from old.id or new.customer_id is distinct from old.customer_id or new.created_at is distinct from old.created_at then
    raise exception 'Application ownership and identity cannot be changed.' using errcode = '42501';
  end if;
  if current_user in ('postgres','supabase_admin','service_role') then
    new.updated_at = now(); return new;
  end if;
  if not gary_private.is_staff() then
    if new.assigned_staff_id is distinct from old.assigned_staff_id then
      raise exception 'Only staff can assign applications.' using errcode = '42501';
    end if;
    if new.status is distinct from old.status and new.status <> 'cancelled' then
      raise exception 'Only staff can change application progress.' using errcode = '42501';
    end if;
    if old.status not in ('submitted','documents_needed') then
      raise exception 'This application is being processed. Please message the team for changes.' using errcode = '42501';
    end if;
  end if;
  new.updated_at = now(); return new;
end;
$$;
revoke all on function gary_private.guard_application_update() from public, anon, authenticated;
create trigger gary_applications_guard before update on public.gary_applications
  for each row execute function gary_private.guard_application_update();

create function gary_private.record_application_event() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    if auth.uid() is null and session_user not in ('postgres','supabase_admin') then
      raise exception 'An authenticated actor is required.' using errcode = '42501';
    end if;
    insert into public.gary_application_events(application_id,status,actor_id) values(new.id,new.status,auth.uid());
  end if;
  return new;
end;
$$;
revoke all on function gary_private.record_application_event() from public, anon, authenticated;
create trigger gary_applications_audit after insert or update on public.gary_applications
  for each row execute function gary_private.record_application_event();

-- Private document storage: never use a public bucket for customer paperwork.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('gary-documents','gary-documents',false,10485760,array['application/pdf','image/jpeg','image/png','image/webp']);

create policy gary_storage_select on storage.objects for select to authenticated
using (bucket_id = 'gary-documents' and exists(
  select 1 from public.gary_applications a where a.id::text = split_part(name,'/',1)
  and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))
));
create policy gary_storage_insert on storage.objects for insert to authenticated
with check (bucket_id = 'gary-documents' and split_part(name,'/',2) = (select auth.uid())::text
  and split_part(name,'/',3) <> '' and split_part(name,'/',4) = '' and exists(
  select 1 from public.gary_applications a where a.id::text = split_part(name,'/',1)
  and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))
));
-- Allows cleanup of a failed upload without exposing another customer's objects.
create policy gary_storage_delete on storage.objects for delete to authenticated
using (bucket_id = 'gary-documents' and split_part(name,'/',2) = (select auth.uid())::text
  and not exists(select 1 from public.gary_documents d where d.object_path = name)
  and exists(select 1 from public.gary_applications a where a.id::text = split_part(name,'/',1)
  and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))
));

-- Restrictive guards keep unrelated, permissive Storage policies from exposing
-- this bucket. They leave access to every other bucket unchanged.
create policy gary_storage_anon_guard on storage.objects as restrictive for all to anon
using (bucket_id <> 'gary-documents') with check (bucket_id <> 'gary-documents');
create policy gary_storage_read_guard on storage.objects as restrictive for select to authenticated
using (bucket_id <> 'gary-documents' or exists(
  select 1 from public.gary_applications a where a.id::text = split_part(name,'/',1)
  and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))
));
create policy gary_storage_write_guard on storage.objects as restrictive for insert to authenticated
with check (bucket_id <> 'gary-documents' or (
  split_part(name,'/',2) = (select auth.uid())::text and split_part(name,'/',3) <> ''
  and split_part(name,'/',4) = '' and exists(
    select 1 from public.gary_applications a where a.id::text = split_part(name,'/',1)
    and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff()))
  )
));
create policy gary_storage_update_guard on storage.objects as restrictive for update to authenticated
using (bucket_id <> 'gary-documents') with check (bucket_id <> 'gary-documents');
create policy gary_storage_delete_guard on storage.objects as restrictive for delete to authenticated
using (bucket_id <> 'gary-documents' or (
  split_part(name,'/',2) = (select auth.uid())::text
  and not exists(select 1 from public.gary_documents d where d.object_path = name)
  and exists(select 1 from public.gary_applications a where a.id::text = split_part(name,'/',1)
    and (a.customer_id = (select auth.uid()) or (select gary_private.is_staff())))
));

commit;
