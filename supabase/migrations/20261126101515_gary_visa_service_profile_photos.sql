begin;

-- Every app owns a separate private bucket. This migration does not move,
-- register or delete legacy objects.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('gary-visa-profile-photos','gary-visa-profile-photos',false,102400,array['image/webp']);

create table gary_private.visa_avatar_uploads (
  id uuid primary key,
  user_id uuid not null,
  path text generated always as (user_id::text || '/' || id::text || '.webp') stored unique,
  removing boolean not null default false,
  state text not null default 'pending' check (state in ('pending','active','retired','deleting')),
  retry_at timestamptz not null default now() + interval '15 minutes',
  cleanup_token uuid,
  unique(user_id,path)
);
alter table gary_private.visa_avatar_uploads enable row level security;
revoke all on gary_private.visa_avatar_uploads from public,anon,authenticated;
create index visa_avatar_cleanup_due on gary_private.visa_avatar_uploads(retry_at,id)
where state in ('pending','retired','deleting') and not removing;

create table public.visa_avatar_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  version uuid not null,
  path text,
  foreign key (user_id,path) references gary_private.visa_avatar_uploads(user_id,path)
);
alter table public.visa_avatar_profiles enable row level security;
revoke all on public.visa_avatar_profiles from public,anon,authenticated;
grant select on public.visa_avatar_profiles to authenticated;
create policy visa_avatar_profile_read on public.visa_avatar_profiles for select to authenticated
using (auth.uid() is not null and coalesce(auth.jwt()->>'is_anonymous','false')<>'true' and gary_private.visa_avatar_readable(user_id::text || '/avatar'));

-- The Storage read policy sees only the current pointer and inherits its RLS.
-- Restrictive policies keep other applications' permissive policies out of this bucket.
create policy visa_avatar_managed_read on storage.objects for select to authenticated
using (bucket_id='gary-visa-profile-photos' and exists (
  select 1 from public.visa_avatar_profiles p
  where p.user_id::text=split_part(name,'/',1) and p.path=name
));
create policy visa_avatar_managed_read_guard on storage.objects as restrictive for select to authenticated
using (bucket_id<>'gary-visa-profile-photos' or exists (
  select 1 from public.visa_avatar_profiles p
  where p.user_id::text=split_part(name,'/',1) and p.path=name
));
create policy visa_avatar_managed_anon_guard on storage.objects as restrictive for all to anon
using (bucket_id<>'gary-visa-profile-photos') with check (bucket_id<>'gary-visa-profile-photos');
create policy visa_avatar_managed_insert_guard on storage.objects as restrictive for insert to authenticated
with check (bucket_id<>'gary-visa-profile-photos');
create policy visa_avatar_managed_update_guard on storage.objects as restrictive for update to authenticated
using (bucket_id<>'gary-visa-profile-photos') with check (bucket_id<>'gary-visa-profile-photos');
create policy visa_avatar_managed_delete_guard on storage.objects as restrictive for delete to authenticated
using (bucket_id<>'gary-visa-profile-photos');

-- The upload reservation and Storage's service-written user metadata must agree.
-- A basename or the presence of a Storage object alone is insufficient.
create function gary_private.visa_avatar_object_owned(p_path text,p_owner uuid,p_id uuid)
returns boolean language sql stable set search_path='' as $$
  select exists (
    select 1 from storage.objects o
    where o.bucket_id='gary-visa-profile-photos' and o.name=p_path
      and o.user_metadata->'profileAvatar'=jsonb_build_object('app','visa','owner',p_owner,'id',p_id)
  );
$$;
revoke all on function gary_private.visa_avatar_object_owned(text,uuid,uuid) from public,anon,authenticated;

create function gary_private.visa_avatar_save(p_id uuid,p_expected uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
  actor uuid := auth.uid();
  previous public.visa_avatar_profiles;
  replacement gary_private.visa_avatar_uploads;
  next_path text;
begin
  if actor is null or coalesce(auth.jwt()->>'is_anonymous','false')='true' then
    raise exception 'Own profile required' using errcode='42501';
  end if;
  -- Serialize the first write as well as replacements/removals for the same identity.
  perform pg_advisory_xact_lock(hashtextextended('visa:profile-avatar:' || actor::text,0));
  select * into previous from public.visa_avatar_profiles p where p.user_id=actor;
  if previous.version=p_id then
    return jsonb_build_object('ok',true,'version',previous.version,'path',previous.path);
  end if;
  if previous.version is distinct from p_expected then
    raise exception 'Avatar version changed' using errcode='PT409';
  end if;

  select * into replacement from gary_private.visa_avatar_uploads u
  where u.id=p_id and u.user_id=actor and u.state='pending' and u.retry_at>now() for update;
  if not found then raise exception 'Avatar reservation unavailable' using errcode='42501'; end if;
  if not replacement.removing then
    if not gary_private.visa_avatar_object_owned(replacement.path,actor,p_id) then
      raise exception 'Avatar upload unavailable' using errcode='PT422';
    end if;
    next_path:=replacement.path;
  end if;

  insert into public.visa_avatar_profiles(user_id,version,path)
  values(actor,p_id,next_path)
  on conflict(user_id) do update set version=excluded.version,path=excluded.path;

  if replacement.removing then
    delete from gary_private.visa_avatar_uploads where id=p_id;
  else
    update gary_private.visa_avatar_uploads set state='active',retry_at='infinity' where id=p_id;
  end if;
  update gary_private.visa_avatar_uploads set state='retired',retry_at=now()
  where id=previous.version and state='active' and user_id=actor;
  return jsonb_build_object('ok',true,'version',p_id,'path',next_path);
end;
$$;

create function public.visa_avatar_save(p_id uuid,p_expected uuid) returns jsonb
language sql security invoker set search_path='' as $$
  select gary_private.visa_avatar_save(p_id,p_expected);
$$;
revoke all on function gary_private.visa_avatar_save(uuid,uuid),public.visa_avatar_save(uuid,uuid) from public,anon,authenticated;
grant execute on function gary_private.visa_avatar_save(uuid,uuid),public.visa_avatar_save(uuid,uuid) to authenticated;

-- Only the Edge Function may reserve paths or claim cleanup. Claims fence out
-- publication and keep a retry deadline even if the Storage call is interrupted.
create function public.visa_avatar_maintenance(
  p_action text,p_owner uuid default null,p_id uuid default null,p_remove boolean default false,p_token uuid default null
) returns jsonb language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
  case p_action
    when 'reserve' then
      insert into gary_private.visa_avatar_uploads(id,user_id,removing)
      values(p_id,p_owner,p_remove) returning jsonb_build_object('id',id,'path',path) into result;
      return result;
    when 'abandon' then
      -- The commit might have succeeded even if its response was lost.
      update gary_private.visa_avatar_uploads set state='retired'
      where id=p_id and user_id=p_owner and state='pending';
      return 'null'::jsonb;
    when 'claim' then
      with due as (
        select u.id from gary_private.visa_avatar_uploads u
        where (p_owner is null or u.user_id=p_owner)
          and not u.removing and u.retry_at<=now()
          and u.state in ('pending','retired','deleting')
          and not exists (select 1 from public.visa_avatar_profiles p where p.user_id=u.user_id and p.path=u.path)

          and (gary_private.visa_avatar_object_owned(u.path,u.user_id,u.id)
            or (u.state='deleting' and not exists (select 1 from storage.objects o where o.bucket_id='gary-visa-profile-photos' and o.name=u.path)))
        order by u.retry_at,u.id limit 8 for update of u skip locked
      ), claimed as (
        update gary_private.visa_avatar_uploads u
        set state='deleting',cleanup_token=gen_random_uuid(),retry_at=now()+interval '15 minutes'
        from due where u.id=due.id
        returning u.id,u.path,u.cleanup_token,exists (select 1 from storage.objects o where o.bucket_id='gary-visa-profile-photos' and o.name=u.path) as remove_object
      )
      select coalesce(jsonb_agg(to_jsonb(claimed)),'[]'::jsonb) into result from claimed;
      return result;
    when 'finish' then
      delete from gary_private.visa_avatar_uploads u
      where u.id=p_id and u.state='deleting' and u.cleanup_token=p_token
        and not exists (select 1 from storage.objects o where o.bucket_id='gary-visa-profile-photos' and o.name=u.path);
      return to_jsonb(found);
    else
      raise exception 'Unknown avatar maintenance action' using errcode='22023';
  end case;
end;
$$;
revoke all on function public.visa_avatar_maintenance(text,uuid,uuid,boolean,uuid) from public,anon,authenticated;
grant execute on function public.visa_avatar_maintenance(text,uuid,uuid,boolean,uuid) to service_role;

notify pgrst,'reload schema';
commit;
