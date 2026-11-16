-- Agency-owned CMS. No Home/Jobs membership is consulted.
-- Review and apply separately; this file is not executed by the site build.
begin;
create table gary_private.cms_members (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check(role in ('editor','publisher','admin')),
 active boolean not null default true,
 created_at timestamptz not null default now()
);
alter table gary_private.cms_members enable row level security;
revoke all on gary_private.cms_members from public,anon,authenticated;
create function gary_private.cms_role() returns text language sql stable security definer set search_path='' as $$
 select m.role from gary_private.cms_members m where m.user_id=auth.uid() and m.active and gary_private.is_staff();
$$;
revoke all on function gary_private.cms_role() from public,anon,authenticated;
grant execute on function gary_private.cms_role() to authenticated;
create function public.gary_cms_capabilities() returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('role',gary_private.cms_role(),'read',gary_private.cms_role() is not null,'edit',gary_private.cms_role() is not null,'publish',coalesce(gary_private.cms_role() in ('publisher','admin'),false),'media',gary_private.cms_role() is not null);
$$;
revoke all on function public.gary_cms_capabilities() from public,anon;
grant execute on function public.gary_cms_capabilities() to authenticated;

create table public.gary_cms_entries (
 id uuid primary key default gen_random_uuid(),
 kind text not null check(kind in ('service','eligibility','document','process','faq','article','landing')),
 slug text not null check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug)<=180),
 title_en text not null default '' check(char_length(title_en)<=180), title_vi text not null default '' check(char_length(title_vi)<=180),
 summary_en text not null default '' check(char_length(summary_en)<=600), summary_vi text not null default '' check(char_length(summary_vi)<=600),
 body_en text not null default '' check(char_length(body_en)<=30000), body_vi text not null default '' check(char_length(body_vi)<=30000),
 seo_title_en text not null default '' check(char_length(seo_title_en)<=180), seo_title_vi text not null default '' check(char_length(seo_title_vi)<=180),
 seo_description_en text not null default '' check(char_length(seo_description_en)<=600), seo_description_vi text not null default '' check(char_length(seo_description_vi)<=600),
 data jsonb not null default '{}' check(jsonb_typeof(data)='object' and octet_length(data::text)<=65536),
 status text not null default 'draft' check(status in ('draft','review','published','archived')),
 version integer not null default 1 check(version>0),
 created_by uuid references auth.users(id) on delete set null, updated_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), published_at timestamptz,
 unique(kind,slug)
);
create unique index gary_cms_landing_slot on public.gary_cms_entries((data->>'slot')) where kind='landing';
create index gary_cms_entries_kind_updated on public.gary_cms_entries(kind,updated_at desc,id);
create index gary_cms_entries_status_updated on public.gary_cms_entries(status,updated_at desc,id);
alter table public.gary_cms_entries enable row level security;
revoke all on public.gary_cms_entries from public,anon,authenticated;
grant select on public.gary_cms_entries to authenticated;
create policy agency_cms_read on public.gary_cms_entries for select to authenticated using((select gary_private.cms_role()) is not null);
create table public.gary_cms_revisions (
 id uuid primary key default gen_random_uuid(),entry_id uuid not null references public.gary_cms_entries(id) on delete restrict,
 version integer not null,status text not null,action text not null,actor_id uuid references auth.users(id) on delete set null,
 snapshot jsonb not null,created_at timestamptz not null default now(),unique(entry_id,version)
);
create index gary_cms_revisions_entry on public.gary_cms_revisions(entry_id,version desc);
alter table public.gary_cms_revisions enable row level security;
revoke all on public.gary_cms_revisions from public,anon,authenticated;
grant select on public.gary_cms_revisions to authenticated;
create policy agency_cms_revisions_read on public.gary_cms_revisions for select to authenticated using((select gary_private.cms_role()) is not null);
-- Public snapshots never contain a working draft, revisions, actor IDs or membership.
create table public.gary_cms_public (
 entry_id uuid primary key references public.gary_cms_entries(id) on delete restrict,
 kind text not null,slug text not null,content jsonb not null,published_at timestamptz not null, unique(kind,slug)
);
alter table public.gary_cms_public enable row level security;
revoke all on public.gary_cms_public from public,anon,authenticated;
grant select on public.gary_cms_public to anon,authenticated;
create policy agency_cms_public_read on public.gary_cms_public for select to anon,authenticated using(true);

create function gary_private.cms_public_payload(e public.gary_cms_entries) returns jsonb language sql immutable set search_path='' as $$
 select to_jsonb(e)-array['created_by','updated_by','created_at','updated_at','status'];
$$;
revoke all on function gary_private.cms_public_payload(public.gary_cms_entries) from public,anon,authenticated;
create function gary_private.cms_save(p_record jsonb,p_expected_version integer,p_action text default 'saved') returns public.gary_cms_entries
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_entries; v_id uuid; v_kind text; v_slug text;
begin
 if auth.uid() is null or gary_private.cms_role() is null then raise exception 'CMS_ACCESS_DENIED' using errcode='42501';end if;
 if p_record is null or jsonb_typeof(p_record)<>'object' then raise exception 'CMS_INVALID_RECORD' using errcode='22023';end if;
 v_id:=nullif(p_record->>'id','')::uuid;v_kind:=p_record->>'kind';v_slug:=p_record->>'slug';
 if v_id is not null then
  select * into v from public.gary_cms_entries where id=v_id for update;
  if not found then raise exception 'CMS_RECORD_MISSING' using errcode='P0002';end if;
  if p_expected_version is null or v.version<>p_expected_version then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001';end if;
  if v.kind<>v_kind then raise exception 'CMS_KIND_IMMUTABLE' using errcode='22023';end if;
 else
  if p_expected_version is not null then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001';end if;
  v_id:=gen_random_uuid();
 end if;
 insert into public.gary_cms_entries(id,kind,slug,title_en,title_vi,summary_en,summary_vi,body_en,body_vi,seo_title_en,seo_title_vi,seo_description_en,seo_description_vi,data,status,version,created_by,updated_by)
 values(v_id,v_kind,v_slug,coalesce(p_record->>'title_en',''),coalesce(p_record->>'title_vi',''),coalesce(p_record->>'summary_en',''),coalesce(p_record->>'summary_vi',''),coalesce(p_record->>'body_en',''),coalesce(p_record->>'body_vi',''),coalesce(p_record->>'seo_title_en',''),coalesce(p_record->>'seo_title_vi',''),coalesce(p_record->>'seo_description_en',''),coalesce(p_record->>'seo_description_vi',''),coalesce(p_record->'data','{}'),'draft',1,auth.uid(),auth.uid())
 on conflict(id) do update set slug=excluded.slug,title_en=excluded.title_en,title_vi=excluded.title_vi,summary_en=excluded.summary_en,summary_vi=excluded.summary_vi,body_en=excluded.body_en,body_vi=excluded.body_vi,seo_title_en=excluded.seo_title_en,seo_title_vi=excluded.seo_title_vi,seo_description_en=excluded.seo_description_en,seo_description_vi=excluded.seo_description_vi,data=excluded.data,status='draft',version=gary_cms_entries.version+1,updated_by=auth.uid(),updated_at=clock_timestamp()
 returning * into v;
 insert into public.gary_cms_revisions(entry_id,version,status,action,actor_id,snapshot) values(v.id,v.version,v.status,p_action,auth.uid(),to_jsonb(v));
 return v;
end;$$;
revoke all on function gary_private.cms_save(jsonb,integer,text) from public,anon,authenticated;
create function public.gary_cms_save(p_record jsonb,p_expected_version integer default null) returns public.gary_cms_entries language sql security invoker set search_path='' as $$ select gary_private.cms_save(p_record,p_expected_version);$$;
revoke all on function public.gary_cms_save(jsonb,integer) from public,anon;
grant execute on function public.gary_cms_save(jsonb,integer),gary_private.cms_save(jsonb,integer,text) to authenticated;

create function gary_private.cms_transition(p_id uuid,p_status text,p_expected_version integer) returns public.gary_cms_entries
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_entries; v_role text;
begin
 v_role:=gary_private.cms_role();
 if auth.uid() is null or v_role is null then raise exception 'CMS_ACCESS_DENIED' using errcode='42501';end if;
 if p_status is null or p_status not in ('draft','review','published','archived') then raise exception 'CMS_INVALID_STATUS' using errcode='22023';end if;
 if p_status in ('published','archived') and v_role not in ('publisher','admin') then raise exception 'CMS_PUBLISH_DENIED' using errcode='42501';end if;
 select * into v from public.gary_cms_entries where id=p_id for update;
 if not found then raise exception 'CMS_RECORD_MISSING' using errcode='P0002';end if;
 if p_expected_version is null or v.version<>p_expected_version then raise exception 'CMS_VERSION_CONFLICT' using errcode='40001';end if;
 if p_status='published' and v.status<>'review' then raise exception 'CMS_REVIEW_REQUIRED' using errcode='23514';end if;
 if p_status in ('review','published') and (trim(v.title_en)='' or trim(v.title_vi)='' or trim(v.summary_en)='' or trim(v.summary_vi)='' or (v.kind<>'landing' and (trim(v.body_en)='' or trim(v.body_vi)=''))) then raise exception 'CMS_TRANSLATION_REQUIRED' using errcode='23514';end if;
 if p_status in ('review','published') and v.kind='landing' and (coalesce(v.data->>'slot','') not in ('hero','services','process','about','faq','contact')) then raise exception 'CMS_LANDING_SLOT_REQUIRED' using errcode='23514';end if;
 if p_status in ('review','published') and v.kind='service' and (coalesce(v.data->>'category','') not in ('travel','settle','documents') or coalesce(v.data->>'service_type','') not in ('visa','work','residence','documents')) then raise exception 'CMS_SERVICE_GROUP_REQUIRED' using errcode='23514';end if;
 if p_status='published' and coalesce(v.data->>'image_url','')<>'' and not (v.data->>'image_url' ~ '^https://duyiihsmaqfgwezmsnjs[.]supabase[.]co/storage/v1/object/public/gary-cms-media/[^[:space:]]+$' or v.data->>'image_url' ~ '^/[^/[:space:]][^[:space:]]*$') then raise exception 'CMS_INVALID_MEDIA_URL' using errcode='23514';end if;
 update public.gary_cms_entries set status=p_status,version=version+1,updated_by=auth.uid(),updated_at=clock_timestamp(),published_at=case when p_status='published' then clock_timestamp() else published_at end where id=p_id returning * into v;
 if p_status='published' then
  insert into public.gary_cms_public(entry_id,kind,slug,content,published_at) values(v.id,v.kind,v.slug,gary_private.cms_public_payload(v),v.published_at)
  on conflict(entry_id) do update set kind=excluded.kind,slug=excluded.slug,content=excluded.content,published_at=excluded.published_at;
 elsif p_status='archived' then delete from public.gary_cms_public where entry_id=v.id;
 end if;
 insert into public.gary_cms_revisions(entry_id,version,status,action,actor_id,snapshot) values(v.id,v.version,v.status,p_status,auth.uid(),to_jsonb(v));
 return v;
end;$$;
revoke all on function gary_private.cms_transition(uuid,text,integer) from public,anon;
grant execute on function gary_private.cms_transition(uuid,text,integer) to authenticated;
create function public.gary_cms_transition(p_id uuid,p_status text,p_expected_version integer) returns public.gary_cms_entries language sql security invoker set search_path='' as $$select gary_private.cms_transition(p_id,p_status,p_expected_version);$$;
revoke all on function public.gary_cms_transition(uuid,text,integer) from public,anon;
grant execute on function public.gary_cms_transition(uuid,text,integer) to authenticated;

create function gary_private.cms_restore(p_id uuid,p_revision_id uuid,p_expected_version integer) returns public.gary_cms_entries
language plpgsql security definer set search_path='' as $$
declare snapshot jsonb;
begin
 if auth.uid() is null or gary_private.cms_role() is null then raise exception 'CMS_ACCESS_DENIED' using errcode='42501';end if;
 select r.snapshot into snapshot from public.gary_cms_revisions r where r.id=p_revision_id and r.entry_id=p_id;
 if snapshot is null then raise exception 'CMS_REVISION_MISSING' using errcode='P0002';end if;
 return gary_private.cms_save(snapshot,p_expected_version,'restored');
end;$$;
revoke all on function gary_private.cms_restore(uuid,uuid,integer) from public,anon;
grant execute on function gary_private.cms_restore(uuid,uuid,integer) to authenticated;
create function public.gary_cms_restore(p_id uuid,p_revision_id uuid,p_expected_version integer) returns public.gary_cms_entries language sql security invoker set search_path='' as $$select gary_private.cms_restore(p_id,p_revision_id,p_expected_version);$$;
revoke all on function public.gary_cms_restore(uuid,uuid,integer) from public,anon;
grant execute on function public.gary_cms_restore(uuid,uuid,integer) to authenticated;

-- Editorial images only. Customer case documents remain in gary-documents.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('gary-cms-media','gary-cms-media',true,5242880,array['image/jpeg','image/png','image/webp','image/avif']) on conflict(id) do nothing;
create table public.gary_cms_media (
 id uuid primary key default gen_random_uuid(),object_path text not null unique,
 file_name text not null check(char_length(file_name) between 1 and 200),mime_type text not null check(mime_type in ('image/jpeg','image/png','image/webp','image/avif')),
 size_bytes integer not null check(size_bytes between 1 and 5242880),alt_en text not null default '' check(char_length(alt_en)<=300),alt_vi text not null default '' check(char_length(alt_vi)<=300),
 uploaded_by uuid not null default auth.uid() references auth.users(id),created_at timestamptz not null default now()
);
create index gary_cms_media_created on public.gary_cms_media(created_at desc,id);
alter table public.gary_cms_media enable row level security;
revoke all on public.gary_cms_media from public,anon,authenticated;
grant select on public.gary_cms_media to authenticated;
create policy agency_cms_media_read on public.gary_cms_media for select to authenticated using((select gary_private.cms_role()) is not null);
create function gary_private.cms_media_path(p_name text) returns boolean language sql stable security invoker set search_path='' as $$
 select auth.uid() is not null and gary_private.cms_role() is not null and p_name ~ ('^'||auth.uid()::text||'/[0-9a-f-]{36}[.](jpg|png|webp|avif)$');
$$;
revoke all on function gary_private.cms_media_path(text) from public,anon;
grant execute on function gary_private.cms_media_path(text) to authenticated;
create policy agency_cms_object_insert on storage.objects for insert to authenticated with check(bucket_id='gary-cms-media' and gary_private.cms_media_path(name));
create policy agency_cms_object_read on storage.objects for select to authenticated using(bucket_id='gary-cms-media' and (select gary_private.cms_role()) is not null);
create policy agency_cms_object_insert_guard on storage.objects as restrictive for insert to authenticated with check(bucket_id<>'gary-cms-media' or gary_private.cms_media_path(name));
create policy agency_cms_object_update_guard on storage.objects as restrictive for update to authenticated using(bucket_id<>'gary-cms-media') with check(bucket_id<>'gary-cms-media');
create policy agency_cms_object_delete_guard on storage.objects as restrictive for delete to authenticated using(bucket_id<>'gary-cms-media');
create policy agency_cms_object_anon_guard on storage.objects as restrictive for all to anon using(bucket_id<>'gary-cms-media') with check(bucket_id<>'gary-cms-media');
create function gary_private.cms_register_media(p_path text,p_name text,p_mime text,p_size integer,p_alt_en text default '',p_alt_vi text default '') returns public.gary_cms_media
language plpgsql security definer set search_path='' as $$
declare v public.gary_cms_media;
begin
 if not gary_private.cms_media_path(p_path) then raise exception 'CMS_MEDIA_DENIED' using errcode='42501';end if;
 if not exists(select 1 from storage.objects where bucket_id='gary-cms-media' and name=p_path) then raise exception 'CMS_MEDIA_MISSING' using errcode='23514';end if;
 insert into public.gary_cms_media(object_path,file_name,mime_type,size_bytes,alt_en,alt_vi) values(p_path,p_name,p_mime,p_size,p_alt_en,p_alt_vi) returning * into v;return v;
end;$$;
revoke all on function gary_private.cms_register_media(text,text,text,integer,text,text) from public,anon;
grant execute on function gary_private.cms_register_media(text,text,text,integer,text,text) to authenticated;
create function public.gary_cms_register_media(p_path text,p_name text,p_mime text,p_size integer,p_alt_en text default '',p_alt_vi text default '') returns public.gary_cms_media language sql security invoker set search_path='' as $$select gary_private.cms_register_media(p_path,p_name,p_mime,p_size,p_alt_en,p_alt_vi);$$;
revoke all on function public.gary_cms_register_media(text,text,text,integer,text,text) from public,anon;
grant execute on function public.gary_cms_register_media(text,text,text,integer,text,text) to authenticated;
-- Capture approved media alternative text into the public content snapshot.
create or replace function gary_private.cms_public_payload(e public.gary_cms_entries) returns jsonb language sql stable set search_path='' as $$
 select jsonb_set(to_jsonb(e)-array['created_by','updated_by','created_at','updated_at','status'],'{data}',e.data||jsonb_build_object('image_alt_en',coalesce(nullif(m.alt_en,''),e.title_en),'image_alt_vi',coalesce(nullif(m.alt_vi,''),e.title_vi)))
 from (select 1) singleton left join public.gary_cms_media m on e.data->>'image_url'='https://duyiihsmaqfgwezmsnjs.supabase.co/storage/v1/object/public/gary-cms-media/'||m.object_path;
$$;
-- Source snapshot of the existing public Agency site. No new legal claims.
insert into public.gary_cms_entries(kind,slug,title_en,title_vi,summary_en,summary_vi,body_en,body_vi,data,status,published_at)
select kind,slug,title_en,title_vi,summary_en,summary_vi,body_en,body_vi,data,'published',now() from jsonb_to_recordset($agency_seed$[{"kind":"service","slug":"visa","title_en":"Visa services","title_vi":"Dịch vụ visa","summary_en":"Your way into Vietnam, with clear guidance from the very beginning.","summary_vi":"Hướng dẫn rõ ràng cho hành trình đến Việt Nam, ngay từ bước đầu tiên.","body_en":"Short-term and long-term business visa support\nTourist visa extensions and renewals\nFamily visit visa applications\nE-visa application assistance","body_vi":"Hỗ trợ visa thương mại ngắn hạn và dài hạn\nGia hạn và cấp lại visa du lịch\nHồ sơ visa thăm thân\nHỗ trợ đăng ký thị thực điện tử","data":{"service_type":"visa","category":"travel","includes_en":"Short-term and long-term business visa support\nTourist visa extensions and renewals\nFamily visit visa applications\nE-visa application assistance","includes_vi":"Hỗ trợ visa thương mại ngắn hạn và dài hạn\nGia hạn và cấp lại visa du lịch\nHồ sơ visa thăm thân\nHỗ trợ đăng ký thị thực điện tử","position":1}},{"kind":"service","slug":"work","title_en":"Work permits","title_vi":"Giấy phép lao động","summary_en":"Practical support for foreign professionals and the teams hiring them.","summary_vi":"Hỗ trợ thiết thực cho chuyên gia nước ngoài và doanh nghiệp tuyển dụng.","body_en":"New work permit applications for foreign employees\nWork permit renewals and extensions\nSupporting degree, police check and teaching certificate paperwork\nCoordination of document legalization and translation","body_vi":"Hồ sơ cấp mới giấy phép lao động cho người nước ngoài\nGia hạn giấy phép lao động\nHỗ trợ giấy tờ bằng cấp, lý lịch tư pháp và chứng chỉ giảng dạy\nPhối hợp hợp pháp hóa và dịch thuật hồ sơ","data":{"service_type":"work","category":"settle","includes_en":"New work permit applications for foreign employees\nWork permit renewals and extensions\nSupporting degree, police check and teaching certificate paperwork\nCoordination of document legalization and translation","includes_vi":"Hồ sơ cấp mới giấy phép lao động cho người nước ngoài\nGia hạn giấy phép lao động\nHỗ trợ giấy tờ bằng cấp, lý lịch tư pháp và chứng chỉ giảng dạy\nPhối hợp hợp pháp hóa và dịch thuật hồ sơ","position":2}},{"kind":"service","slug":"residence","title_en":"Residence cards","title_vi":"Thẻ tạm trú","summary_en":"Make a longer stay feel a little more straightforward.","summary_vi":"Giúp kế hoạch lưu trú dài hạn của bạn trở nên thuận tiện hơn.","body_en":"Temporary residence card application support\nReview of the documents for your circumstances\nResidence card renewals\nReplacement card assistance","body_vi":"Hỗ trợ hồ sơ thẻ tạm trú\nXem xét giấy tờ theo trường hợp cụ thể\nGia hạn thẻ tạm trú\nHỗ trợ cấp lại thẻ","data":{"service_type":"residence","category":"settle","includes_en":"Temporary residence card application support\nReview of the documents for your circumstances\nResidence card renewals\nReplacement card assistance","includes_vi":"Hỗ trợ hồ sơ thẻ tạm trú\nXem xét giấy tờ theo trường hợp cụ thể\nGia hạn thẻ tạm trú\nHỗ trợ cấp lại thẻ","position":3}},{"kind":"service","slug":"documents","title_en":"Document support","title_vi":"Hỗ trợ hồ sơ","summary_en":"Get your paperwork in order, with help along the way.","summary_vi":"Hoàn thiện giấy tờ với sự đồng hành trong từng bước.","body_en":"Consular legalization coordination\nTranslation and notarization support\nDegree, police check and teaching certificate document support\nGuidance on preparing paperwork for your application","body_vi":"Phối hợp hợp pháp hóa lãnh sự\nHỗ trợ dịch thuật và công chứng\nHỗ trợ giấy tờ bằng cấp, lý lịch tư pháp và chứng chỉ giảng dạy\nHướng dẫn chuẩn bị hồ sơ cho yêu cầu của bạn","data":{"service_type":"documents","category":"documents","includes_en":"Consular legalization coordination\nTranslation and notarization support\nDegree, police check and teaching certificate document support\nGuidance on preparing paperwork for your application","includes_vi":"Phối hợp hợp pháp hóa lãnh sự\nHỗ trợ dịch thuật và công chứng\nHỗ trợ giấy tờ bằng cấp, lý lịch tư pháp và chứng chỉ giảng dạy\nHướng dẫn chuẩn bị hồ sơ cho yêu cầu của bạn","position":4}},{"kind":"process","slug":"step-1","title_en":"Let’s understand your plans","title_vi":"Tìm hiểu dự định của bạn","summary_en":"We review your situation, explain the options and provide a clear quotation.","summary_vi":"Chúng tôi đánh giá trường hợp, giải thích các lựa chọn và cung cấp báo giá chi tiết.","body_en":"We review your situation, explain the options and provide a clear quotation.","body_vi":"Chúng tôi đánh giá trường hợp, giải thích các lựa chọn và cung cấp báo giá chi tiết.","data":{"position":1,"label_en":"CONSULTATION","label_vi":"TƯ VẤN"}},{"kind":"process","slug":"step-2","title_en":"Get everything ready","title_vi":"Chuẩn bị mọi thứ sẵn sàng","summary_en":"We guide document collection, translation, notarization and legalization as needed.","summary_vi":"Hướng dẫn thu thập, dịch thuật, công chứng và hợp pháp hóa giấy tờ khi cần.","body_en":"We guide document collection, translation, notarization and legalization as needed.","body_vi":"Hướng dẫn thu thập, dịch thuật, công chứng và hợp pháp hóa giấy tờ khi cần.","data":{"position":2,"label_en":"PREPARATION","label_vi":"CHUẨN BỊ HỒ SƠ"}},{"kind":"process","slug":"step-3","title_en":"Leave the filing to us","title_vi":"Hỗ trợ nộp hồ sơ","summary_en":"We help submit your application to the relevant authorities and guide any follow-up.","summary_vi":"Hỗ trợ nộp hồ sơ tới cơ quan có thẩm quyền và hướng dẫn bổ sung khi cần.","body_en":"We help submit your application to the relevant authorities and guide any follow-up.","body_vi":"Hỗ trợ nộp hồ sơ tới cơ quan có thẩm quyền và hướng dẫn bổ sung khi cần.","data":{"position":3,"label_en":"SUBMISSION","label_vi":"NỘP HỒ SƠ"}},{"kind":"process","slug":"step-4","title_en":"Take your next step","title_vi":"Sẵn sàng cho bước tiếp theo","summary_en":"When a decision is issued, we help you understand the outcome and arrange delivery.","summary_vi":"Khi có quyết định, chúng tôi giải thích kết quả và hỗ trợ bàn giao giấy tờ.","body_en":"When a decision is issued, we help you understand the outcome and arrange delivery.","body_vi":"Khi có quyết định, chúng tôi giải thích kết quả và hỗ trợ bàn giao giấy tờ.","data":{"position":4,"label_en":"DECISION & DELIVERY","label_vi":"KẾT QUẢ & BÀN GIAO"}},{"kind":"faq","slug":"question-1","title_en":"Which service is right for me?","title_vi":"Dịch vụ nào phù hợp với tôi?","summary_en":"It depends on your reason for coming to Vietnam and your current situation. Use the service finder above for a starting point, or speak with our team to review your options.","summary_vi":"Điều này phụ thuộc vào mục đích đến Việt Nam và tình trạng hiện tại của bạn. Hãy dùng công cụ tìm dịch vụ phía trên để tham khảo, hoặc trao đổi với chúng tôi để xem xét các lựa chọn.","body_en":"It depends on your reason for coming to Vietnam and your current situation. Use the service finder above for a starting point, or speak with our team to review your options.","body_vi":"Điều này phụ thuộc vào mục đích đến Việt Nam và tình trạng hiện tại của bạn. Hãy dùng công cụ tìm dịch vụ phía trên để tham khảo, hoặc trao đổi với chúng tôi để xem xét các lựa chọn.","data":{"position":1}},{"kind":"faq","slug":"question-2","title_en":"Can you help if I’m already in Vietnam?","title_vi":"Tôi đang ở Việt Nam, có được hỗ trợ không?","summary_en":"Our services include visa extensions, work permit renewals and residence card support. Tell us about your current status and expiry date so the team can check the available options for your case.","summary_vi":"Chúng tôi hỗ trợ gia hạn visa, giấy phép lao động và thẻ tạm trú. Hãy chia sẻ tình trạng và ngày hết hạn hiện tại để đội ngũ kiểm tra các lựa chọn phù hợp với trường hợp của bạn.","body_en":"Our services include visa extensions, work permit renewals and residence card support. Tell us about your current status and expiry date so the team can check the available options for your case.","body_vi":"Chúng tôi hỗ trợ gia hạn visa, giấy phép lao động và thẻ tạm trú. Hãy chia sẻ tình trạng và ngày hết hạn hiện tại để đội ngũ kiểm tra các lựa chọn phù hợp với trường hợp của bạn.","data":{"position":2}},{"kind":"faq","slug":"question-3","title_en":"What documents will I need?","title_vi":"Tôi cần chuẩn bị những giấy tờ gì?","summary_en":"The document list varies by service and individual circumstances. After reviewing your case, the team will explain what is needed, including any translation, notarization or legalization. Start with a description of your plans; you don’t ne","summary_vi":"Danh sách giấy tờ phụ thuộc vào dịch vụ và hoàn cảnh cụ thể. Sau khi xem xét hồ sơ, chúng tôi sẽ giải thích những gì cần thiết, bao gồm dịch thuật, công chứng hoặc hợp pháp hóa. Bạn chỉ cần mô tả dự định; không cần tải giấy tờ lên trang này","body_en":"The document list varies by service and individual circumstances. After reviewing your case, the team will explain what is needed, including any translation, notarization or legalization. Start with a description of your plans; you don’t need to upload documents here.","body_vi":"Danh sách giấy tờ phụ thuộc vào dịch vụ và hoàn cảnh cụ thể. Sau khi xem xét hồ sơ, chúng tôi sẽ giải thích những gì cần thiết, bao gồm dịch thuật, công chứng hoặc hợp pháp hóa. Bạn chỉ cần mô tả dự định; không cần tải giấy tờ lên trang này.","data":{"position":3}},{"kind":"faq","slug":"question-4","title_en":"How much will it cost, and how long will it take?","title_vi":"Chi phí và thời gian xử lý là bao lâu?","summary_en":"Fees and timelines depend on the service, your circumstances and the documents available. We provide a detailed quotation before starting and discuss the expected process with you. Processing and final decisions remain with the relevant aut","summary_vi":"Chi phí và thời gian phụ thuộc vào dịch vụ, trường hợp cụ thể và giấy tờ sẵn có. Chúng tôi cung cấp báo giá chi tiết trước khi bắt đầu và trao đổi về quy trình dự kiến. Thời gian xử lý và quyết định cuối cùng thuộc cơ quan có thẩm quyền.","body_en":"Fees and timelines depend on the service, your circumstances and the documents available. We provide a detailed quotation before starting and discuss the expected process with you. Processing and final decisions remain with the relevant authorities.","body_vi":"Chi phí và thời gian phụ thuộc vào dịch vụ, trường hợp cụ thể và giấy tờ sẵn có. Chúng tôi cung cấp báo giá chi tiết trước khi bắt đầu và trao đổi về quy trình dự kiến. Thời gian xử lý và quyết định cuối cùng thuộc cơ quan có thẩm quyền.","data":{"position":4}},{"kind":"faq","slug":"question-5","title_en":"Do you work with schools and employers?","title_vi":"Có hỗ trợ trường học và doanh nghiệp không?","summary_en":"Yes. Gary Agency and Visa Star World work with schools, language centers and businesses, supporting foreign teachers and other professionals with their applications and supporting documents.","summary_vi":"Có. Gary Agency và Visa Star World làm việc với trường học, trung tâm ngoại ngữ và doanh nghiệp, hỗ trợ giáo viên và chuyên gia nước ngoài hoàn thiện hồ sơ cùng các giấy tờ liên quan.","body_en":"Yes. Gary Agency and Visa Star World work with schools, language centers and businesses, supporting foreign teachers and other professionals with their applications and supporting documents.","body_vi":"Có. Gary Agency và Visa Star World làm việc với trường học, trung tâm ngoại ngữ và doanh nghiệp, hỗ trợ giáo viên và chuyên gia nước ngoài hoàn thiện hồ sơ cùng các giấy tờ liên quan.","data":{"position":5}},{"kind":"landing","slug":"hero","title_en":"Less paperwork.","title_vi":"Bớt lo thủ tục.","summary_en":"A new opportunity. A fresh start. A place to call home. We make the visa, work permit and residence process easier, so you can focus on what comes next.","summary_vi":"Một cơ hội mới. Một khởi đầu khác. Một nơi để gọi là nhà. Chúng tôi hỗ trợ visa, giấy phép lao động và thẻ tạm trú để bạn tập trung vào những dự định phía trước.","body_en":"","body_vi":"","data":{"slot":"hero","accent_en":"More possibility.","accent_vi":"Thêm cơ hội mới.","third_line_en":"Hello, Vietnam.","third_line_vi":"Xin chào, Việt Nam."}},{"kind":"landing","slug":"services","title_en":"Different plans.","title_vi":"Mỗi dự định khác nhau.","summary_en":"From your first arrival to a longer stay, find the help that fits your life in Vietnam.","summary_vi":"Từ lần đầu đến Việt Nam đến kế hoạch gắn bó lâu dài, tìm dịch vụ phù hợp với hành trình của bạn.","body_en":"","body_vi":"","data":{"slot":"services","accent_en":"The right support.","accent_vi":"Luôn có hỗ trợ phù hợp."}},{"kind":"landing","slug":"process","title_en":"A clear path.","title_vi":"Lộ trình rõ ràng.","summary_en":"Paperwork can be complicated. Knowing what comes next shouldn’t be.","summary_vi":"Thủ tục có thể phức tạp. Nhưng bạn luôn biết bước tiếp theo là gì.","body_en":"","body_vi":"","data":{"slot":"process","accent_en":"A team at every step.","accent_vi":"Đồng hành từng bước."}},{"kind":"landing","slug":"about","title_en":"Big life moves.","title_vi":"Dự định lớn.","summary_en":"Behind every application is a person with plans. Gary Agency, together with Visa Star World, supports teachers, professionals and families as they build their lives in Vietnam.","summary_vi":"Sau mỗi bộ hồ sơ là một người với những dự định riêng. Gary Agency cùng Visa Star World hỗ trợ giáo viên, chuyên gia và gia đình xây dựng cuộc sống tại Việt Nam.","body_en":"","body_vi":"","data":{"slot":"about","accent_en":"A human approach.","accent_vi":"Sự đồng hành gần gũi."}},{"kind":"landing","slug":"faq","title_en":"A little clarity","title_vi":"Giải đáp rõ ràng.","summary_en":"A few answers before you take the next step.","summary_vi":"Một vài câu trả lời trước khi bạn bắt đầu.","body_en":"","body_vi":"","data":{"slot":"faq","accent_en":"goes a long way.","accent_vi":"An tâm bước tiếp."}},{"kind":"landing","slug":"contact","title_en":"Your next chapter","title_vi":"Chương mới của bạn","summary_en":"Tell us where you’d like to go from here. We’ll help you work out the next step.","summary_vi":"Chia sẻ dự định của bạn. Chúng tôi sẽ giúp bạn xác định bước tiếp theo.","body_en":"","body_vi":"","data":{"slot":"contact","accent_en":"starts with a hello.","accent_vi":"bắt đầu từ lời chào."}}]$agency_seed$::jsonb) as seed(kind text,slug text,title_en text,title_vi text,summary_en text,summary_vi text,body_en text,body_vi text,data jsonb)
on conflict(kind,slug) do nothing;
insert into public.gary_cms_public(entry_id,kind,slug,content,published_at)
select e.id,e.kind,e.slug,gary_private.cms_public_payload(e),e.published_at from public.gary_cms_entries e where e.status='published'
on conflict(entry_id) do nothing;
insert into public.gary_cms_revisions(entry_id,version,status,action,snapshot)
select e.id,e.version,e.status,'imported',to_jsonb(e) from public.gary_cms_entries e where e.status='published'
on conflict(entry_id,version) do nothing;

notify pgrst,'reload schema';
commit;
