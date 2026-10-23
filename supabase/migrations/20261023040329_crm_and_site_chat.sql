-- Apply after 20261022180819_gary_customer_staff_portal.sql.
begin;

create table public.gary_crm_contacts (
 id uuid primary key default gen_random_uuid(),
 profile_id uuid unique references public.gary_profiles(id) on delete set null,
 full_name text not null check(char_length(trim(full_name)) between 2 and 100),
 email text not null default '' check(char_length(email)<=254),
 phone text not null default '' check(char_length(phone)<=40),
 company text not null default '' check(char_length(company)<=120),
 stage text not null default 'lead' check(stage in('lead','contacted','qualified','customer','archived')),
 source text not null default 'manual' check(source in('manual','customer_portal','website_chat')),
 interested_service text check(interested_service in('visa','work','residence','documents')),
 tags text[] not null default '{}' check(cardinality(tags)<=12 and char_length(array_to_string(tags,','))<=384),
 assigned_staff_id uuid references gary_private.staff_members(user_id) on delete set null,
 follow_up_at timestamptz,
 last_contacted_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index gary_crm_stage_idx on public.gary_crm_contacts(stage,updated_at desc);
create index gary_crm_email_idx on public.gary_crm_contacts(lower(email));
create index gary_crm_followup_idx on public.gary_crm_contacts(follow_up_at) where follow_up_at is not null;
create index gary_crm_assignee_idx on public.gary_crm_contacts(assigned_staff_id);

create table public.gary_crm_notes (
 id uuid primary key default gen_random_uuid(),
 contact_id uuid not null references public.gary_crm_contacts(id) on delete cascade,
 author_id uuid not null default auth.uid() references auth.users(id),
 body text not null check(char_length(trim(body)) between 1 and 5000),
 created_at timestamptz not null default now()
);
create index gary_crm_notes_contact_idx on public.gary_crm_notes(contact_id,created_at desc);
create index gary_crm_notes_author_idx on public.gary_crm_notes(author_id);
create table public.gary_crm_events (
 id uuid primary key default gen_random_uuid(),
 contact_id uuid not null references public.gary_crm_contacts(id) on delete cascade,
 actor_id uuid references auth.users(id) on delete set null,
 kind text not null check(kind in('created','updated','stage_changed','follow_up_changed')),
 changes jsonb not null default '{}',
 created_at timestamptz not null default now()
);
create index gary_crm_events_contact_idx on public.gary_crm_events(contact_id,created_at desc);
create index gary_crm_events_actor_idx on public.gary_crm_events(actor_id);

create table public.gary_chat_conversations (
 id uuid primary key default gen_random_uuid(),
 contact_id uuid not null references public.gary_crm_contacts(id),
 customer_id uuid references public.gary_profiles(id) on delete set null,
 visitor_name text not null check(char_length(visitor_name) between 2 and 100),
 visitor_email text not null check(char_length(visitor_email)<=254),
 subject text not null default 'Website enquiry' check(char_length(subject)<=160),
 status text not null default 'open' check(status in('open','resolved')),
 assigned_staff_id uuid references gary_private.staff_members(user_id) on delete set null,
 last_message_at timestamptz not null default now(),
 last_message_preview text not null default '',
 last_customer_message_at timestamptz,
 last_staff_message_at timestamptz,
 staff_last_read_at timestamptz,
 customer_last_read_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index gary_chat_contact_idx on public.gary_chat_conversations(contact_id);
create index gary_chat_customer_idx on public.gary_chat_conversations(customer_id);
create index gary_chat_assignee_idx on public.gary_chat_conversations(assigned_staff_id);
create index gary_chat_queue_idx on public.gary_chat_conversations(status,last_message_at desc);
create index gary_chat_email_idx on public.gary_chat_conversations(lower(visitor_email),created_at desc);
create table public.gary_chat_messages (
 id uuid primary key default gen_random_uuid(),
 conversation_id uuid not null references public.gary_chat_conversations(id) on delete cascade,
 client_message_id uuid not null,
 sender_type text not null check(sender_type in('visitor','customer','staff')),
 sender_user_id uuid references auth.users(id) on delete set null,
 body text not null check(char_length(trim(body)) between 1 and 4000),
 created_at timestamptz not null default now(),
 unique(conversation_id,client_message_id)
);
create index gary_chat_messages_order_idx on public.gary_chat_messages(conversation_id,created_at desc,id desc);
create index gary_chat_messages_sender_idx on public.gary_chat_messages(sender_user_id);
create table gary_private.chat_sessions (
 conversation_id uuid primary key references public.gary_chat_conversations(id) on delete cascade,
 token_hash bytea not null unique check(octet_length(token_hash)=32),
 guest_allowed boolean not null default false
);
alter table gary_private.chat_sessions enable row level security;
revoke all on gary_private.chat_sessions from public,anon,authenticated;

alter table public.gary_crm_contacts enable row level security;
alter table public.gary_crm_notes enable row level security;
alter table public.gary_crm_events enable row level security;
alter table public.gary_chat_conversations enable row level security;
alter table public.gary_chat_messages enable row level security;
revoke all on public.gary_crm_contacts,public.gary_crm_notes,public.gary_crm_events,
 public.gary_chat_conversations,public.gary_chat_messages from public,anon,authenticated;
grant select on public.gary_crm_contacts,public.gary_crm_notes,public.gary_crm_events,
 public.gary_chat_conversations,public.gary_chat_messages to authenticated;
grant insert(full_name,email,phone,company,stage,interested_service,tags,assigned_staff_id,follow_up_at) on public.gary_crm_contacts to authenticated;
grant update(full_name,email,phone,company,stage,interested_service,tags,assigned_staff_id,follow_up_at,last_contacted_at) on public.gary_crm_contacts to authenticated;
grant insert(contact_id,body) on public.gary_crm_notes to authenticated;
grant update(status,assigned_staff_id) on public.gary_chat_conversations to authenticated;
create policy gary_crm_contacts_select on public.gary_crm_contacts for select to authenticated using((select gary_private.is_staff()));
create policy gary_crm_contacts_insert on public.gary_crm_contacts for insert to authenticated with check((select gary_private.is_staff()));
create policy gary_crm_contacts_update on public.gary_crm_contacts for update to authenticated using((select gary_private.is_staff())) with check((select gary_private.is_staff()));
create policy gary_crm_notes_select on public.gary_crm_notes for select to authenticated using((select gary_private.is_staff()));
create policy gary_crm_notes_insert on public.gary_crm_notes for insert to authenticated with check((select gary_private.is_staff()) and author_id=(select auth.uid()));
create policy gary_crm_events_select on public.gary_crm_events for select to authenticated using((select gary_private.is_staff()));
create policy gary_chats_select on public.gary_chat_conversations for select to authenticated using(customer_id=(select auth.uid()) or (select gary_private.is_staff()));
create policy gary_chats_update on public.gary_chat_conversations for update to authenticated using((select gary_private.is_staff())) with check((select gary_private.is_staff()));
create policy gary_chat_messages_select on public.gary_chat_messages for select to authenticated using(exists(
 select 1 from public.gary_chat_conversations c where c.id=conversation_id and (c.customer_id=(select auth.uid()) or (select gary_private.is_staff()))
));
create trigger gary_crm_updated before update on public.gary_crm_contacts for each row execute function gary_private.touch_updated_at();
create trigger gary_chat_updated before update on public.gary_chat_conversations for each row execute function gary_private.touch_updated_at();

create function gary_private.log_crm_event() returns trigger language plpgsql security definer set search_path='' as $$
declare v_kind text; v_changes jsonb:='{}';
begin
 if auth.uid() is null and new.source='manual' and session_user not in('postgres','supabase_admin') then
  raise exception 'Staff authentication required.' using errcode='42501';
 end if;
 if tg_op='INSERT' then v_kind:='created';
 elsif new.stage is distinct from old.stage then v_kind:='stage_changed';v_changes:=jsonb_build_object('from',old.stage,'to',new.stage);
 elsif new.follow_up_at is distinct from old.follow_up_at then v_kind:='follow_up_changed';v_changes:=jsonb_build_object('follow_up_at',new.follow_up_at);
 else v_kind:='updated'; end if;
 insert into public.gary_crm_events(contact_id,actor_id,kind,changes) values(new.id,auth.uid(),v_kind,v_changes);
 return new;
end;$$;
revoke all on function gary_private.log_crm_event() from public,anon,authenticated;
create trigger gary_crm_audit after insert or update on public.gary_crm_contacts for each row execute function gary_private.log_crm_event();

create function gary_private.sync_crm_profile() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is not null and auth.uid()<>new.id and not gary_private.is_staff() then raise exception 'Not authorized.' using errcode='42501'; end if;
 if auth.uid() is null and session_user not in('postgres','supabase_admin') then raise exception 'Authentication required.' using errcode='42501'; end if;
 if exists(select 1 from gary_private.staff_members where user_id=new.id) then return new; end if;
 insert into public.gary_crm_contacts(profile_id,full_name,email,phone,stage,source)
 values(new.id,case when char_length(trim(new.full_name))>=2 then trim(new.full_name) else 'Customer' end,new.contact_email,new.phone,'customer','customer_portal')
 on conflict(profile_id) do update set full_name=excluded.full_name,email=excluded.email,phone=excluded.phone;
 return new;
end;$$;
revoke all on function gary_private.sync_crm_profile() from public,anon,authenticated;
create trigger gary_profile_crm_sync after insert or update of full_name,contact_email,phone on public.gary_profiles for each row execute function gary_private.sync_crm_profile();
insert into public.gary_crm_contacts(profile_id,full_name,email,phone,stage,source)
select p.id,case when char_length(trim(p.full_name))>=2 then trim(p.full_name) else 'Customer' end,p.contact_email,p.phone,'customer','customer_portal'
from public.gary_profiles p where not exists(select 1 from gary_private.staff_members s where s.user_id=p.id);

create function gary_private.staff_directory() returns table(user_id uuid,display_name text)
language plpgsql stable security definer set search_path='' as $$
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'Staff authentication required.' using errcode='42501'; end if;
 return query select s.user_id,coalesce(nullif(p.full_name,''),'Gary team') from gary_private.staff_members s left join public.gary_profiles p on p.id=s.user_id order by p.full_name;
end;$$;
revoke all on function gary_private.staff_directory() from public,anon,authenticated;
grant execute on function gary_private.staff_directory() to authenticated;
create function public.gary_staff_directory() returns table(user_id uuid,display_name text)
language sql stable security invoker set search_path='' as $$ select * from gary_private.staff_directory(); $$;
revoke all on function public.gary_staff_directory() from public,anon,authenticated;
grant execute on function public.gary_staff_directory() to authenticated;

-- Guest access is a per-conversation capability. Only its SHA-256 hash is stored;
-- clients never receive database access or an elevated Auth role.
create function gary_private.chat_actor(p_id uuid,p_token text) returns text
language plpgsql stable security definer set search_path='' as $$
declare v_customer uuid;
begin
 if auth.uid() is not null and gary_private.is_staff() then
  if exists(select 1 from public.gary_chat_conversations where id=p_id) then return 'staff'; end if;return null;
 end if;
 select customer_id into v_customer from public.gary_chat_conversations where id=p_id;
 if not found then return null; end if;
 if auth.uid() is not null and v_customer=auth.uid() then return 'customer'; end if;
 if v_customer is null and p_token ~ '^[0-9a-f]{64}$' and exists(
  select 1 from gary_private.chat_sessions where conversation_id=p_id and guest_allowed and token_hash=pg_catalog.sha256(pg_catalog.convert_to(p_token,'UTF8'))
 ) then return 'visitor'; end if;
 return null;
end;$$;
revoke all on function gary_private.chat_actor(uuid,text) from public,anon,authenticated;

create function gary_private.read_chat(p_id uuid,p_token text,p_before_at timestamptz,p_before_id uuid,p_mark_read boolean) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_actor text; v_chat public.gary_chat_conversations; v_messages jsonb; v_more boolean;
begin
 v_actor:=gary_private.chat_actor(p_id,p_token);
 if v_actor is null then raise exception 'Conversation unavailable.' using errcode='42501'; end if;
 select * into v_chat from public.gary_chat_conversations where id=p_id;
 if p_mark_read and p_before_at is null then
  if v_actor='staff' and v_chat.last_customer_message_at is not null and (v_chat.staff_last_read_at is null or v_chat.last_customer_message_at>v_chat.staff_last_read_at) then
   update public.gary_chat_conversations set staff_last_read_at=clock_timestamp() where id=p_id;
  elsif v_actor<>'staff' and v_chat.last_staff_message_at is not null and (v_chat.customer_last_read_at is null or v_chat.last_staff_message_at>v_chat.customer_last_read_at) then
   update public.gary_chat_conversations set customer_last_read_at=clock_timestamp() where id=p_id;
  end if;
 end if;
 select count(*)>50 into v_more from (select 1 from public.gary_chat_messages where conversation_id=p_id and (p_before_at is null or (created_at,id)<(p_before_at,coalesce(p_before_id,'00000000-0000-0000-0000-000000000000'::uuid))) order by created_at desc,id desc limit 51) x;
 select coalesce(jsonb_agg(to_jsonb(m) order by m.created_at,m.id),'[]'::jsonb) into v_messages from (
  select id,client_message_id,sender_type,body,created_at from public.gary_chat_messages where conversation_id=p_id
  and (p_before_at is null or (created_at,id)<(p_before_at,coalesce(p_before_id,'00000000-0000-0000-0000-000000000000'::uuid))) order by created_at desc,id desc limit 50
 ) m;
 return jsonb_build_object('conversation',jsonb_build_object('id',v_chat.id,'status',v_chat.status,'name',v_chat.visitor_name,'identity',case when v_chat.customer_id is null then 'visitor' else 'customer' end),'messages',v_messages,'has_more',v_more);
end;$$;
revoke all on function gary_private.read_chat(uuid,text,timestamptz,uuid,boolean) from public,anon,authenticated;

create function gary_private.send_chat(p_id uuid,p_body text,p_client_id uuid,p_token text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_actor text; v_id uuid; v_contact uuid; v_now timestamptz:=clock_timestamp();
begin
 v_actor:=gary_private.chat_actor(p_id,p_token);
 if v_actor is null then raise exception 'Conversation unavailable.' using errcode='42501'; end if;
 if p_client_id is null or p_body is null or char_length(trim(p_body)) not between 1 and 4000 then raise exception 'Invalid message.' using errcode='22023'; end if;
 select contact_id into v_contact from public.gary_chat_conversations where id=p_id for update;
 select id into v_id from public.gary_chat_messages where conversation_id=p_id and client_message_id=p_client_id;
 if v_id is not null then return jsonb_build_object('id',v_id); end if;
 if v_actor<>'staff' and (select count(*) from public.gary_chat_messages where conversation_id=p_id and sender_type<>'staff' and created_at>v_now-interval '60 seconds')>=10 then
  raise exception 'Please wait a moment before sending another message.' using errcode='P0001';
 end if;
 insert into public.gary_chat_messages(conversation_id,client_message_id,sender_type,sender_user_id,body,created_at)
 values(p_id,p_client_id,v_actor,case when v_actor='visitor' then null else auth.uid() end,trim(p_body),v_now) returning id into v_id;
 update public.gary_chat_conversations set last_message_at=v_now,last_message_preview=left(trim(p_body),140),
  last_customer_message_at=case when v_actor<>'staff' then v_now else last_customer_message_at end,
  last_staff_message_at=case when v_actor='staff' then v_now else last_staff_message_at end,
  status=case when v_actor<>'staff' then 'open' else status end where id=p_id;
 if v_actor='staff' then update public.gary_crm_contacts set last_contacted_at=v_now where id=v_contact; end if;
 return jsonb_build_object('id',v_id);
end;$$;
revoke all on function gary_private.send_chat(uuid,text,uuid,text) from public,anon,authenticated;

create function gary_private.open_chat(p_token text,p_name text,p_email text,p_message text,p_client_id uuid,p_service text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_hash bytea; v_id uuid; v_contact uuid; v_profile uuid; v_name text; v_email text;
begin
 if p_token is null or p_name is null or p_email is null or p_message is null
  or p_token !~ '^[0-9a-f]{64}$' or char_length(trim(p_name)) not between 2 and 100 or char_length(p_email)>254
  or p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or char_length(trim(p_message)) not between 1 and 4000 or p_client_id is null
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
 if (select count(*) from public.gary_chat_conversations where (lower(visitor_email)=v_email or (v_profile is not null and customer_id=v_profile)) and created_at>clock_timestamp()-interval '1 hour')>=3 then
  raise exception 'Please continue your existing conversation or try again later.' using errcode='P0001';
 end if;
 if v_profile is not null then select id into v_contact from public.gary_crm_contacts where profile_id=v_profile; end if;
 if v_contact is null then
  insert into public.gary_crm_contacts(profile_id,full_name,email,stage,source,interested_service)
  values(v_profile,v_name,v_email,case when v_profile is null then 'lead' else 'customer' end,'website_chat',p_service) returning id into v_contact;
 end if;
 insert into public.gary_chat_conversations(contact_id,customer_id,visitor_name,visitor_email,subject)
 values(v_contact,v_profile,v_name,v_email,coalesce(p_service,'Website')||' enquiry') returning id into v_id;
 insert into gary_private.chat_sessions(conversation_id,token_hash,guest_allowed) values(v_id,v_hash,v_profile is null);
 perform gary_private.send_chat(v_id,p_message,p_client_id,p_token);
 return gary_private.read_chat(v_id,p_token,null,null,true);
end;$$;
revoke all on function gary_private.open_chat(text,text,text,text,uuid,text) from public,anon,authenticated;

-- Public RPCs are invokers. The narrowly scoped private implementations perform
-- all identity/capability checks; no secrets or elevated keys enter the browser.
grant usage on schema gary_private to anon;
grant execute on function gary_private.open_chat(text,text,text,text,uuid,text),gary_private.read_chat(uuid,text,timestamptz,uuid,boolean),gary_private.send_chat(uuid,text,uuid,text) to anon,authenticated;
create function public.gary_open_chat(p_token text,p_name text,p_email text,p_message text,p_client_message_id uuid,p_service text default null) returns jsonb
language sql security invoker set search_path='' as $$ select gary_private.open_chat(p_token,p_name,p_email,p_message,p_client_message_id,p_service); $$;
create function public.gary_read_chat(p_conversation_id uuid,p_token text default null,p_before_at timestamptz default null,p_before_id uuid default null,p_mark_read boolean default true) returns jsonb
language sql security invoker set search_path='' as $$ select gary_private.read_chat(p_conversation_id,p_token,p_before_at,p_before_id,p_mark_read); $$;
create function public.gary_send_chat_message(p_conversation_id uuid,p_body text,p_client_message_id uuid,p_token text default null) returns jsonb
language sql security invoker set search_path='' as $$ select gary_private.send_chat(p_conversation_id,p_body,p_client_message_id,p_token); $$;
revoke all on function public.gary_open_chat(text,text,text,text,uuid,text),public.gary_read_chat(uuid,text,timestamptz,uuid,boolean),public.gary_send_chat_message(uuid,text,uuid,text) from public,anon,authenticated;
grant execute on function public.gary_open_chat(text,text,text,text,uuid,text),public.gary_read_chat(uuid,text,timestamptz,uuid,boolean),public.gary_send_chat_message(uuid,text,uuid,text) to anon,authenticated;

do $$ begin
 if exists(select 1 from pg_publication where pubname='supabase_realtime') then
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='gary_chat_messages') then alter publication supabase_realtime add table public.gary_chat_messages; end if;
  if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='gary_chat_conversations') then alter publication supabase_realtime add table public.gary_chat_conversations; end if;
 end if;
end $$;
commit;
