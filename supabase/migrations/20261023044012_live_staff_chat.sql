-- Durable messages stay behind the existing capability/Auth checks.
-- Realtime broadcasts contain {} only: they are invalidations, never chat data.
begin;

create table gary_private.chat_staff_presence (
 staff_id uuid primary key references gary_private.staff_members(user_id) on delete cascade,
 available boolean not null default false,
 seen_at timestamptz not null default clock_timestamp()
);
create table gary_private.chat_live_state (
 conversation_id uuid primary key references public.gary_chat_conversations(id) on delete cascade,
 visitor_seen_at timestamptz,
 visitor_typing_until timestamptz,
 staff_typing_id uuid references gary_private.staff_members(user_id) on delete set null,
 staff_typing_until timestamptz
);
alter table gary_private.chat_staff_presence enable row level security;
alter table gary_private.chat_live_state enable row level security;
revoke all on gary_private.chat_staff_presence,gary_private.chat_live_state from public,anon,authenticated;
create index gary_live_typing_staff_idx on gary_private.chat_live_state(staff_typing_id);

create function gary_private.live_chat_health() returns jsonb
language sql stable security definer set search_path='' as $$
 select jsonb_build_object('version',2,'ready',
  to_regclass('public.gary_chat_conversations') is not null and to_regclass('public.gary_chat_messages') is not null
  and to_regclass('gary_private.chat_live_state') is not null
  and to_regprocedure('public.gary_open_chat(text,text,text,text,uuid,text)') is not null
  and to_regprocedure('public.gary_read_chat(uuid,text,timestamptz,uuid,boolean)') is not null
  and to_regprocedure('public.gary_send_chat_message(uuid,text,uuid,text)') is not null
  and to_regprocedure('public.gary_chat_activity(uuid,text,boolean)') is not null
  and to_regprocedure('public.gary_set_chat_availability(boolean)') is not null
  and to_regprocedure('realtime.send(jsonb,text,text,boolean)') is not null,
 'server_time',clock_timestamp(),'available_until',
 (select max(seen_at)+interval '45 seconds' from gary_private.chat_staff_presence where available and seen_at>clock_timestamp()-interval '45 seconds'));
$$;
revoke all on function gary_private.live_chat_health() from public,anon,authenticated;
grant execute on function gary_private.live_chat_health() to anon,authenticated;
create function public.gary_live_chat_health() returns jsonb language sql stable security invoker set search_path='' as $$ select gary_private.live_chat_health(); $$;
revoke all on function public.gary_live_chat_health() from public,anon,authenticated;
grant execute on function public.gary_live_chat_health() to anon,authenticated;

create function gary_private.set_chat_availability(p_available boolean) returns jsonb
language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not gary_private.is_staff() then raise exception 'Staff authentication required.' using errcode='42501'; end if;
 if p_available is null then raise exception 'Availability is required.' using errcode='22023'; end if;
 insert into gary_private.chat_staff_presence(staff_id,available,seen_at) values(auth.uid(),p_available,clock_timestamp())
 on conflict(staff_id) do update set available=excluded.available,seen_at=excluded.seen_at;
 perform realtime.send('{}'::jsonb,'availability','gary-support:v2',false);
 return gary_private.live_chat_health();
end;$$;
revoke all on function gary_private.set_chat_availability(boolean) from public,anon,authenticated;
grant execute on function gary_private.set_chat_availability(boolean) to authenticated;
create function public.gary_set_chat_availability(p_available boolean) returns jsonb language sql security invoker set search_path='' as $$ select gary_private.set_chat_availability(p_available); $$;
revoke all on function public.gary_set_chat_availability(boolean) from public,anon,authenticated;
grant execute on function public.gary_set_chat_availability(boolean) to authenticated;

create function gary_private.chat_activity(p_id uuid,p_token text,p_typing boolean) returns void
language plpgsql security definer set search_path='' as $$
declare v_actor text;v_now timestamptz:=clock_timestamp();
begin
 v_actor:=gary_private.chat_actor(p_id,p_token);
 if v_actor is null then raise exception 'Conversation unavailable.' using errcode='42501'; end if;
 if v_actor='staff' then
  if p_typing is not null then
   insert into gary_private.chat_live_state(conversation_id,staff_typing_id,staff_typing_until)
   values(p_id,auth.uid(),case when p_typing then v_now+interval '6 seconds' else null end)
   on conflict(conversation_id) do update set staff_typing_id=excluded.staff_typing_id,staff_typing_until=excluded.staff_typing_until
   where (p_typing and gary_private.chat_live_state.staff_typing_until is null)
    or (p_typing and gary_private.chat_live_state.staff_typing_until<v_now+interval '4 seconds')
    or (not p_typing and gary_private.chat_live_state.staff_typing_id=auth.uid() and gary_private.chat_live_state.staff_typing_until is not null);
  end if;
 else
  insert into gary_private.chat_live_state(conversation_id,visitor_seen_at,visitor_typing_until)
  values(p_id,v_now,case when p_typing then v_now+interval '6 seconds' else null end)
  on conflict(conversation_id) do update set visitor_seen_at=v_now,
   visitor_typing_until=case when p_typing is null then gary_private.chat_live_state.visitor_typing_until when p_typing then v_now+interval '6 seconds' else null end
  where gary_private.chat_live_state.visitor_seen_at is null or gary_private.chat_live_state.visitor_seen_at<v_now-interval '15 seconds'
   or (p_typing and (gary_private.chat_live_state.visitor_typing_until is null or gary_private.chat_live_state.visitor_typing_until<v_now+interval '4 seconds'))
   or (not p_typing and gary_private.chat_live_state.visitor_typing_until is not null);
 end if;
end;$$;
revoke all on function gary_private.chat_activity(uuid,text,boolean) from public,anon,authenticated;
grant execute on function gary_private.chat_activity(uuid,text,boolean) to anon,authenticated;
create function public.gary_chat_activity(p_conversation_id uuid,p_token text default null,p_typing boolean default null) returns void language sql security invoker set search_path='' as $$ select gary_private.chat_activity(p_conversation_id,p_token,p_typing); $$;
revoke all on function public.gary_chat_activity(uuid,text,boolean) from public,anon,authenticated;
grant execute on function public.gary_chat_activity(uuid,text,boolean) to anon,authenticated;

create function gary_private.chat_live_snapshot(p_id uuid,p_token text) returns jsonb
language plpgsql stable security definer set search_path='' as $$
declare v_state gary_private.chat_live_state;v_chat public.gary_chat_conversations;
begin
 if gary_private.chat_actor(p_id,p_token) is null then raise exception 'Conversation unavailable.' using errcode='42501'; end if;
 select * into v_state from gary_private.chat_live_state where conversation_id=p_id;
 select * into v_chat from public.gary_chat_conversations where id=p_id;
 return gary_private.live_chat_health()||jsonb_build_object(
  'visitor_seen_at',v_state.visitor_seen_at,
  'visitor_typing_until',v_state.visitor_typing_until,
  'staff_typing_until',case when v_state.staff_typing_id is not null then v_state.staff_typing_until else null end,
  'staff_read_at',v_chat.staff_last_read_at,'visitor_read_at',v_chat.customer_last_read_at);
end;$$;
revoke all on function gary_private.chat_live_snapshot(uuid,text) from public,anon,authenticated;
grant execute on function gary_private.chat_live_snapshot(uuid,text) to anon,authenticated;
create or replace function public.gary_read_chat(p_conversation_id uuid,p_token text default null,p_before_at timestamptz default null,p_before_id uuid default null,p_mark_read boolean default true) returns jsonb
language sql security invoker set search_path='' as $$
 select gary_private.read_chat(p_conversation_id,p_token,p_before_at,p_before_id,p_mark_read)
 ||jsonb_build_object('live',gary_private.chat_live_snapshot(p_conversation_id,p_token));
$$;
revoke all on function public.gary_read_chat(uuid,text,timestamptz,uuid,boolean) from public,anon,authenticated;
grant execute on function public.gary_read_chat(uuid,text,timestamptz,uuid,boolean) to anon,authenticated;

create function gary_private.notify_live_chat() returns trigger language plpgsql security definer set search_path='' as $$
declare v_id uuid;
begin
 if tg_table_name='gary_chat_conversations' then v_id:=new.id;
 elsif tg_table_name='chat_live_state' then
  -- Presence heartbeats update the peer badge without touching the staff queue.
  if tg_op='UPDATE' and new.visitor_typing_until is not distinct from old.visitor_typing_until and new.staff_typing_until is not distinct from old.staff_typing_until then
   perform realtime.send('{}'::jsonb,'presence','gary-chat:'||new.conversation_id::text,false);return new;
  end if;
  v_id:=new.conversation_id;
 else v_id:=new.conversation_id; end if;
 perform realtime.send('{}'::jsonb,'changed','gary-chat:'||v_id::text,false);
 if tg_table_name in('gary_chat_messages','gary_chat_conversations') then
  perform realtime.send('{}'::jsonb,'queue','gary-support:v2',false);
 end if;
 return new;
end;$$;
revoke all on function gary_private.notify_live_chat() from public,anon,authenticated;
create trigger gary_live_messages after insert on public.gary_chat_messages for each row execute function gary_private.notify_live_chat();
create trigger gary_live_conversations after insert or update on public.gary_chat_conversations for each row execute function gary_private.notify_live_chat();
create trigger gary_live_activity after insert or update on gary_private.chat_live_state for each row execute function gary_private.notify_live_chat();

-- Contact details are optional for the first live message. An empty email
-- stays empty in CRM; guest emails are never fabricated or treated as verified.
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

commit;
