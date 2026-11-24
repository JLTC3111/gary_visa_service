begin;

alter table public.gary_cms_media
  add column caption_en text not null default '' check(char_length(caption_en)<=500),
  add column caption_vi text not null default '' check(char_length(caption_vi)<=500),
  add column version integer not null default 1,
  add column state text not null default 'ready' check(state in ('reserved','ready','deleting','removed')),
  add column removal_object_id uuid,
  add column removed_at timestamptz;

create function gary_private.cms_asset_key(p_url text) returns text
language sql immutable set search_path='' as $$
  select substring(p_url from '^https://duyiihsmaqfgwezmsnjs[.]supabase[.]co/storage/v1/object/public/gary-cms-media/([a-f0-9-]{36}/[a-f0-9-]{36}[.](?:jpg|png|webp|avif))$');
$$;
create function gary_private.cms_site_image(p_url text) returns boolean
language sql immutable set search_path='' as $$
  select coalesce(p_url ~* '^/assets/[a-z0-9_/-]+[.](avif|jpe?g|png|webp|svg)$',false);
$$;

-- The browser receives upload permission only after an editor records the
-- intended public CMS object. A failed response leaves a recoverable row.
create function public.gary_cms_reserve_media(p_path text,p_name text,p_mime text,p_size integer,p_alt_en text,p_alt_vi text,
  p_caption_en text,p_caption_vi text,p_public_confirmed boolean) returns public.gary_cms_media
language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media;
begin
  if auth.uid() is null or not coalesce(gary_private.cms_role() in('editor','admin'),false) then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if p_public_confirmed is distinct from true then raise exception 'CMS_MEDIA_PUBLIC_CONFIRMATION' using errcode='23514'; end if;
  if p_path is null or p_path !~ ('^'||auth.uid()::text||'/[a-f0-9-]{36}[.](jpg|png|webp|avif)$') then
    raise exception 'CMS_INVALID_MEDIA_URL' using errcode='23514'; end if;
  if not coalesce((case p_mime when 'image/jpeg' then right(p_path,4)='.jpg' when 'image/png' then right(p_path,4)='.png'
    when 'image/webp' then right(p_path,5)='.webp' when 'image/avif' then right(p_path,5)='.avif' end),false)
    or trim(coalesce(p_alt_en,''))='' or trim(coalesce(p_alt_vi,''))='' then raise exception 'CMS_MEDIA_INVALID' using errcode='23514'; end if;
  insert into public.gary_cms_media(object_path,file_name,mime_type,size_bytes,alt_en,alt_vi,caption_en,caption_vi,state)
    values(p_path,p_name,p_mime,p_size,trim(p_alt_en),trim(p_alt_vi),trim(coalesce(p_caption_en,'')),trim(coalesce(p_caption_vi,'')),'reserved')
    returning * into media;
  return media;
end;
$$;

create or replace function gary_private.cms_media_path(p_name text) returns boolean
language sql volatile security definer set search_path='' as $$
  select auth.uid() is not null and coalesce(gary_private.cms_role() in('editor','admin'),false) and exists(
    select 1 from public.gary_cms_media m where m.object_path=p_name and m.uploaded_by=auth.uid() and m.state='reserved' for share);
$$;

create or replace function gary_private.cms_register_media(p_path text,p_name text,p_mime text,p_size integer,p_alt_en text default '',p_alt_vi text default '') returns public.gary_cms_media
language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media; object_metadata jsonb;
begin
  if auth.uid() is null or not coalesce(gary_private.cms_role() in('editor','admin'),false) then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  select * into media from public.gary_cms_media m where m.object_path=p_path for update;
  if not found or (media.uploaded_by<>auth.uid() and gary_private.cms_role()<>'admin') then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if media.state='ready' then return media; end if;
  if media.state<>'reserved' then raise exception 'CMS_MEDIA_NOT_PUBLIC' using errcode='23514'; end if;
  select o.metadata into object_metadata from storage.objects o where o.bucket_id='gary-cms-media' and o.name=p_path;
  if not found then raise exception 'CMS_MEDIA_MISSING' using errcode='23514'; end if;
  if object_metadata->>'mimetype' is distinct from media.mime_type or object_metadata->>'size' is distinct from media.size_bytes::text then
    raise exception 'CMS_MEDIA_INVALID' using errcode='23514'; end if;
  update public.gary_cms_media set state='ready',version=version+1 where id=media.id returning * into media;
  return media;
end;
$$;

create function public.gary_cms_update_media(p_id uuid,p_version integer,p_alt_en text,p_alt_vi text,p_caption_en text,p_caption_vi text)
returns public.gary_cms_media language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media;
begin
  if auth.uid() is null or not coalesce(gary_private.cms_role() in('editor','admin'),false) then
    raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if trim(coalesce(p_alt_en,''))='' or trim(coalesce(p_alt_vi,''))='' then raise exception 'CMS_MEDIA_INVALID' using errcode='23514'; end if;
  update public.gary_cms_media set alt_en=trim(p_alt_en),alt_vi=trim(p_alt_vi),caption_en=trim(coalesce(p_caption_en,'')),
    caption_vi=trim(coalesce(p_caption_vi,'')),version=version+1 where id=p_id and version=p_version and state='ready' returning * into media;
  if not found then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001'; end if;
  return media;
end;
$$;

-- Share-lock approvals while saving or publishing. Removal takes an exclusive
-- row lock before examining references, so either the save or removal wins.
create function gary_private.guard_cms_cover() returns trigger
language plpgsql security definer set search_path='' as $$
declare url text; path text;
begin
  if tg_op='UPDATE' and new.data=old.data and new.status not in ('review','published') then return new; end if;
  url:=coalesce(new.data->>'image_url','');
  if url='' or gary_private.cms_site_image(url) then return new; end if;
  path:=gary_private.cms_asset_key(url);
  perform 1 from public.gary_cms_media m where m.object_path=path and m.state='ready' for share;
  if not found then raise exception 'CMS_MEDIA_NOT_PUBLIC' using errcode='23514'; end if;
  return new;
end;
$$;
create trigger agency_cms_cover_guard before insert or update of data,status on public.gary_cms_entries
  for each row execute function gary_private.guard_cms_cover();

create function gary_private.cms_media_in_use(p_path text) returns boolean language sql stable set search_path='' as $$
  select exists(select 1 from public.gary_cms_entries e where strpos(e.data::text,p_path)>0)
      or exists(select 1 from public.gary_cms_public p where strpos(p.content::text,p_path)>0)
      or exists(select 1 from public.gary_cms_revisions r where strpos(r.snapshot::text,p_path)>0);
$$;

create function gary_private.cms_may_remove_media(p_owner uuid) returns boolean language sql stable set search_path='' as $$
  select auth.uid() is not null and coalesce(gary_private.cms_role()='admin' or
    (gary_private.cms_role()='editor' and p_owner=auth.uid()),false);
$$;
create function public.gary_cms_prepare_media_removal(p_id uuid) returns public.gary_cms_media
language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media; object_id uuid;
begin
  select * into media from public.gary_cms_media where id=p_id for update;
  if not found or not gary_private.cms_may_remove_media(media.uploaded_by) then raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if media.state in ('removed','deleting') then return media; end if;
  if gary_private.cms_media_in_use(media.object_path) then raise exception 'CMS_MEDIA_IN_USE' using errcode='23514'; end if;
  if not exists(select 1 from storage.buckets b where b.id='gary-cms-media'
    and coalesce(to_jsonb(b)->>'versioning_status','DISABLED')='DISABLED') then raise exception 'CMS_MEDIA_PENDING' using errcode='23514'; end if;
  select o.id into object_id from storage.objects o where o.bucket_id='gary-cms-media' and o.name=media.object_path
    and not coalesce((to_jsonb(o)->>'is_versioned')::boolean,false) and coalesce(to_jsonb(o)->>'archived_at','')=''
    and not coalesce((to_jsonb(o)->>'is_delete_marker')::boolean,false);
  if object_id is null then
    if media.state='reserved' and not exists(select 1 from storage.objects o where o.bucket_id='gary-cms-media' and o.name=media.object_path) then
      update public.gary_cms_media set state='removed',removed_at=clock_timestamp(),version=version+1 where id=p_id returning * into media;
      return media;
    end if;
    raise exception 'CMS_MEDIA_MISSING' using errcode='23514';
  end if;
  update public.gary_cms_media set state='deleting',removal_object_id=object_id,version=version+1 where id=p_id returning * into media;
  return media;
end;
$$;

create function gary_private.cms_storage_remove_allowed(p_path text,p_object uuid) returns boolean
language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.gary_cms_media m where m.object_path=p_path and m.state='deleting'
    and m.removal_object_id=p_object and gary_private.cms_may_remove_media(m.uploaded_by) and not gary_private.cms_media_in_use(p_path))
    and exists(select 1 from storage.buckets b where b.id='gary-cms-media'
      and coalesce(to_jsonb(b)->>'versioning_status','DISABLED')='DISABLED');
$$;
alter policy agency_cms_object_delete_guard on storage.objects using(bucket_id<>'gary-cms-media' or gary_private.cms_storage_remove_allowed(name,id));
create policy agency_cms_object_delete_prepared on storage.objects for delete to authenticated
  using(bucket_id='gary-cms-media' and gary_private.cms_storage_remove_allowed(name,id));

create function public.gary_cms_confirm_media_removal(p_id uuid) returns boolean
language plpgsql security definer set search_path='' as $$
declare media public.gary_cms_media;
begin
  select * into media from public.gary_cms_media where id=p_id for update;
  if not found or not gary_private.cms_may_remove_media(media.uploaded_by) then raise exception 'CMS_MEDIA_DENIED' using errcode='42501'; end if;
  if media.state='removed' then return true; end if;
  if media.state<>'deleting' or exists(select 1 from storage.objects o where o.bucket_id='gary-cms-media' and o.name=media.object_path) then return false; end if;
  update public.gary_cms_media set state='removed',removed_at=clock_timestamp(),version=version+1 where id=p_id;
  return true;
end;
$$;

-- Publish an allowlisted projection of the saved draft. Capture image details
-- in that snapshot and leave an existing publication alone on later edits.
create function gary_private.cms_public_data(p_kind text,d jsonb,p_title_en text,p_title_vi text) returns jsonb
language sql stable set search_path='' as $$
  select coalesce((select jsonb_object_agg(j.key,j.value) from jsonb_each(d) j where j.key=any(case p_kind
    when 'landing' then array['slot','accent_en','accent_vi','third_line_en','third_line_vi']
    when 'service' then array['category','service_type','position','includes_en','includes_vi']
    when 'process' then array['position','label_en','label_vi']
    when 'faq' then array['position','service_slug']
    when 'article' then array['category','reviewed_on']
    else array['service_slug','reviewed_on','required'] end)),'{}'::jsonb)
  ||case when p_kind in('article','eligibility','document') and d->>'source_url' ~ '^https://[^[:space:]]+$'
    and d->>'source_url' !~* '/storage/v1/|\.supabase\.co(?:/|:)' then jsonb_build_object('source_url',d->>'source_url') else '{}'::jsonb end
  ||case when m.id is not null or gary_private.cms_site_image(d->>'image_url') then jsonb_build_object('image_url',d->>'image_url',
    'image_alt_en',coalesce(nullif(m.alt_en,''),p_title_en),'image_alt_vi',coalesce(nullif(m.alt_vi,''),p_title_vi),
    'image_caption_en',coalesce(m.caption_en,''),'image_caption_vi',coalesce(m.caption_vi,'')) else '{}'::jsonb end
  from (select 1) singleton left join public.gary_cms_media m on m.object_path=gary_private.cms_asset_key(d->>'image_url') and m.state='ready';
$$;
create or replace function gary_private.cms_public_payload(e public.gary_cms_entries) returns jsonb
language sql stable set search_path='' as $$
  select jsonb_set(to_jsonb(e)-array['created_by','updated_by','created_at','updated_at','status','deleted_by','deleted_at'],
    '{data}',gary_private.cms_public_data(e.kind,e.data,e.title_en,e.title_vi));
$$;

-- Sanitize already public rows from their own snapshots, never from drafts.
update public.gary_cms_public p set content=jsonb_set(p.content-array['deleted_by','deleted_at'],
  '{data}',gary_private.cms_public_data(p.kind,p.content->'data',p.content->>'title_en',p.content->>'title_vi'));

revoke all on function gary_private.cms_asset_key(text),gary_private.cms_site_image(text),gary_private.guard_cms_cover(),
  gary_private.cms_media_in_use(text),gary_private.cms_may_remove_media(uuid),gary_private.cms_public_data(text,jsonb,text,text),
  gary_private.cms_storage_remove_allowed(text,uuid) from public,anon,authenticated;
grant execute on function gary_private.cms_storage_remove_allowed(text,uuid) to authenticated;
revoke all on function public.gary_cms_reserve_media(text,text,text,integer,text,text,text,text,boolean),
  public.gary_cms_update_media(uuid,integer,text,text,text,text),public.gary_cms_prepare_media_removal(uuid),
  public.gary_cms_confirm_media_removal(uuid) from public,anon,authenticated;
grant execute on function public.gary_cms_reserve_media(text,text,text,integer,text,text,text,text,boolean),
  public.gary_cms_update_media(uuid,integer,text,text,text,text),public.gary_cms_prepare_media_removal(uuid),
  public.gary_cms_confirm_media_removal(uuid) to authenticated;

notify pgrst,'reload schema';
commit;
