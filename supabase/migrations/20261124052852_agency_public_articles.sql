begin;

-- The public snapshot remains the only publication source, including while an
-- editor works on a new draft. Scheduled snapshots become readable when due.
alter policy agency_cms_public_read on public.gary_cms_public using (published_at <= now());
create index agency_cms_public_article_date on public.gary_cms_public(published_at desc,slug) where kind='article';

create function public.gary_cms_article_directory(p_search text default '',p_category text default '',p_page integer default 1)
returns jsonb language sql stable set search_path='' as $$
  with matches as materialized (
    select p.* from public.gary_cms_public p
    where p.kind='article' and p.published_at <= now()
      and (coalesce(p_category,'')='' or p_category=case when p.content->'data'->>'category' in
        ('visa','work','residence','documents','updates') then p.content->'data'->>'category' else 'general' end)
      and strpos(lower(concat_ws(' ',p.content->>'title_en',p.content->>'title_vi',p.content->>'summary_en',p.content->>'summary_vi')),
        lower(left(trim(coalesce(p_search,'')),120)))>0
  ), counts as (select count(*)::integer as total from matches),
  pagination as (select total,least(greatest(1,coalesce(p_page,1)),greatest(1,ceil(total/9.0)::integer)) as page from counts),
  results as (
    select entry_id,slug,published_at,content from matches order by published_at desc,slug
    limit 9 offset (select (page-1)*9 from pagination)
  )
  select jsonb_build_object('total',total,'page',page,'entries',coalesce((
    select jsonb_agg((r.content-array['body_en','body_vi'])||jsonb_build_object(
      'id',r.entry_id,'kind','article','slug',r.slug,'published_at',r.published_at) order by r.published_at desc,r.slug) from results r
  ),'[]'::jsonb)) from pagination;
$$;
revoke all on function public.gary_cms_article_directory(text,text,integer) from public,anon,authenticated;
grant execute on function public.gary_cms_article_directory(text,text,integer) to anon,authenticated;

create or replace function public.gary_cms_capabilities() returns jsonb language sql stable security invoker set search_path='' as $$
  select jsonb_build_object('role',r,'read',r is not null,'edit',coalesce(r in('editor','admin'),false),
    'publish',coalesce(r in('publisher','admin'),false),'media',coalesce(r in('editor','admin'),false),'trash',coalesce(r='admin',false))
  from (select gary_private.cms_role() r) role_row;
$$;

create or replace function gary_private.cms_save(p_record jsonb,p_expected_version integer,p_action text default 'saved') returns public.gary_cms_entries
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_entries; v_id uuid; v_kind text; v_slug text;
begin
  if auth.uid() is null or not coalesce(gary_private.cms_role() in ('editor','admin'),false) then
    raise exception 'CMS_ACCESS_DENIED' using errcode='42501'; end if;
  if p_record is null or jsonb_typeof(p_record)<>'object' then raise exception 'CMS_INVALID_RECORD' using errcode='22023'; end if;
  v_id:=nullif(p_record->>'id','')::uuid; v_kind:=p_record->>'kind'; v_slug:=p_record->>'slug';
  if v_id is not null then
    select * into v from public.gary_cms_entries where id=v_id for update;
    if not found then raise exception 'CMS_RECORD_MISSING' using errcode='P0002'; end if;
    if p_expected_version is null or v.version<>p_expected_version then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001'; end if;
    if v.kind<>v_kind then raise exception 'CMS_KIND_IMMUTABLE' using errcode='22023'; end if;
    if v.kind='article' and v.published_at is not null and v_slug is distinct from v.slug then
      if p_action='restored' then v_slug:=v.slug;
      else raise exception 'CMS_PUBLISHED_SLUG' using errcode='23514'; end if;
    end if;
  else
    if p_expected_version is not null then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001'; end if;
    v_id:=gen_random_uuid();
  end if;
  insert into public.gary_cms_entries(id,kind,slug,title_en,title_vi,summary_en,summary_vi,body_en,body_vi,
    seo_title_en,seo_title_vi,seo_description_en,seo_description_vi,data,status,version,created_by,updated_by)
  values(v_id,v_kind,v_slug,coalesce(p_record->>'title_en',''),coalesce(p_record->>'title_vi',''),
    coalesce(p_record->>'summary_en',''),coalesce(p_record->>'summary_vi',''),coalesce(p_record->>'body_en',''),coalesce(p_record->>'body_vi',''),
    coalesce(p_record->>'seo_title_en',''),coalesce(p_record->>'seo_title_vi',''),coalesce(p_record->>'seo_description_en',''),
    coalesce(p_record->>'seo_description_vi',''),coalesce(p_record->'data','{}'),'draft',1,auth.uid(),auth.uid())
  on conflict(id) do update set slug=excluded.slug,title_en=excluded.title_en,title_vi=excluded.title_vi,summary_en=excluded.summary_en,
    summary_vi=excluded.summary_vi,body_en=excluded.body_en,body_vi=excluded.body_vi,seo_title_en=excluded.seo_title_en,
    seo_title_vi=excluded.seo_title_vi,seo_description_en=excluded.seo_description_en,seo_description_vi=excluded.seo_description_vi,
    data=excluded.data,status='draft',version=gary_cms_entries.version+1,updated_by=auth.uid(),updated_at=clock_timestamp()
  returning * into v;
  insert into public.gary_cms_revisions(entry_id,version,status,action,actor_id,snapshot) values(v.id,v.version,v.status,p_action,auth.uid(),to_jsonb(v));
  return v;
end;
$$;

-- The existing transition RPC gates publish/archive; also enforce that a
-- Publisher cannot reopen a draft or submit it for review.
create function gary_private.cms_guard_editor_transition() returns trigger
language plpgsql security definer set search_path='' as $$
begin
  if new.status in('draft','review') and gary_private.cms_role()='publisher' then
    raise exception 'CMS_ACCESS_DENIED' using errcode='42501';
  end if;
  return new;
end;
$$;
revoke all on function gary_private.cms_guard_editor_transition() from public,anon,authenticated;
create trigger agency_cms_editor_transition before update of status on public.gary_cms_entries
  for each row execute function gary_private.cms_guard_editor_transition();

notify pgrst,'reload schema';
commit;
