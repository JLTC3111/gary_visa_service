import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';

const id=n=>`80000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
const uid={customer:id(1),customer2:id(2),staff:id(3),staff2:id(4),manager:id(5),admin:id(6),admin2:id(7),editor:id(8),publisher:id(9),cmsAdmin:id(10),noAccess:id(11),outsider:id(12),newcomer:id(13)};
const legacyMembers=['staff','staff2','manager','admin','admin2','editor','publisher','cmsAdmin','noAccess'];
const operationsRoles={staff:'staff',staff2:'staff',manager:'manager',admin:'admin',admin2:'admin',editor:null,publisher:null,cmsAdmin:null,noAccess:null};
const migrations=['20261022180819_gary_customer_staff_portal.sql','20261023040329_crm_and_site_chat.sql','20261023044012_live_staff_chat.sql','20261116043114_agency_cms_foundation.sql','20261116095518_agency_recoverable_deletion.sql'];
const teamAccessMigrations=['20261117202944_staff_auth_eligibility.sql','20261118034500_visa_team_access.sql'];
const sql=name=>readFile(new URL(`../supabase/${name}`,import.meta.url),'utf8');
const denied=(fn,code='42501')=>assert.rejects(fn,error=>error.code===code);

async function setup({assignRoles=true,teamAccess=false,cmsLifecycle=false}={}){
 const db=new PGlite();
 const q=(text,params=[])=>db.query(text,params),one=async(text,params)=>(await q(text,params)).rows[0];
 const count=async(text,params)=>Number((await one(`select count(*) n from (${text}) counted`,params)).n);
 const as=async who=>{await db.exec('reset role');await q("select set_config('request.jwt.claim.sub',$1,false)",[who?uid[who]??who:'']);await db.exec(`set role ${who?'authenticated':'anon'}`)};
 const owner=async()=>{await db.exec('reset role');await q("select set_config('request.jwt.claim.sub','',false)")};
 const rpc=async(name,params=[])=>(await one(`select public.${name}(${params.map((_,i)=>`$${i+1}`).join(',')}) result`,params)).result;
 await db.exec(`create role anon;create role authenticated;create schema auth;create schema storage;create schema realtime;
  create table realtime.test_outbox(payload jsonb,event text,topic text,is_private boolean);
  create function realtime.send(payload jsonb,event text,topic text,private boolean default true) returns void language sql as $$ insert into realtime.test_outbox values(payload,event,topic,private) $$;
  create table auth.users(id uuid primary key,email text,raw_user_meta_data jsonb default '{}');
  create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
  grant usage on schema auth,storage to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text,metadata jsonb not null default '{}',unique(bucket_id,name));
  alter table storage.objects enable row level security;grant select,insert,update,delete on storage.objects to authenticated,anon;
  create policy unrelated_permissive_policy on storage.objects for all to authenticated,anon using(true) with check(true);`);
 for(const [name,value] of Object.entries(uid))await q('insert into auth.users(id,email) values($1,$2)',[value,`${name.toLowerCase()}@example.test`]);
 for(const name of migrations)await db.exec(await sql(`migrations/${name}`));
 for(const name of legacyMembers)await q('insert into gary_private.staff_members(user_id) values($1)',[uid[name]]);
 await q("insert into gary_private.cms_members(user_id,role) values($1,'editor'),($2,'publisher'),($3,'admin'),($4,'admin')",[uid.editor,uid.publisher,uid.cmsAdmin,uid.outsider]);
 // Customer records and legacy assignments exist before the upgrade.
 await as('staff');await q("insert into public.gary_profiles(full_name) values('Sam Staff')");
 await as('customer');await q("insert into public.gary_profiles(full_name,contact_email) values('Casey Customer','customer@example.test')");
 const assigned=await one("insert into public.gary_applications(service,subject,details) values('visa','Assigned visa case','Private details') returning id");
 const queued=await one("insert into public.gary_applications(service,subject,details) values('work','Queued work permit','Queue details') returning id");
 await q("insert into public.gary_messages(application_id,body) values($1,'Customer message')",[assigned.id]);
 const path=`${assigned.id}/${uid.customer}/passport.pdf`;
 await q("insert into storage.objects(bucket_id,name) values('gary-documents',$1)",[path]);
 await q("insert into public.gary_documents(application_id,object_path,file_name,mime_type,size_bytes) values($1,$2,'passport.pdf','application/pdf',1000)",[assigned.id,path]);
 await as('customer2');await q("insert into public.gary_profiles(full_name,contact_email) values('Dana Customer','customer2@example.test')");
 const other=await one("insert into public.gary_applications(service,subject,details) values('visa','Other staff case','Other details') returning id");
 const customerChat=(await rpc('gary_open_chat',['e'.repeat(64),'Dana Customer','customer2@example.test','Question about my case',randomUUID(),null])).conversation.id;
 await as(null);const guest=(await rpc('gary_open_chat',['d'.repeat(64),'Visitor','visitor@example.test','Hello team',randomUUID(),'visa'])).conversation.id;
 await as('admin');
 await q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.staff,assigned.id]);
 await q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.staff2,other.id]);
 const contact=(await one('select id from public.gary_crm_contacts where profile_id=$1',[uid.customer])).id;
 const otherContact=(await one('select id from public.gary_crm_contacts where profile_id=$1',[uid.customer2])).id;
 await q('update public.gary_crm_contacts set assigned_staff_id=$1 where id=$2',[uid.staff,contact]);
 await q('update public.gary_chat_conversations set assigned_staff_id=$1 where id=$2',[uid.staff,guest]);
 await q("insert into public.gary_staff_notes(application_id,body) values($1,'Assigned note'),($2,'Other note')",[assigned.id,other.id]);
 await owner();await db.exec(await sql('migrations/20261117190000_visa_operations_cms_roles.sql'));
 if(assignRoles)for(const [name,role] of Object.entries(operationsRoles))await q('update gary_private.staff_members set operations_role=$1 where user_id=$2',[role,uid[name]]);
 if(teamAccess){
  // Supabase Auth columns read by staff identity eligibility; every fixture starts confirmed.
  await db.exec('alter table auth.users add column email_confirmed_at timestamptz default now(),add column deleted_at timestamptz,add column is_anonymous boolean not null default false,add column banned_until timestamptz');
  for(const name of teamAccessMigrations)await db.exec(await sql(`migrations/${name}`));
 }
 if(cmsLifecycle)for(const name of ['20261124052852_agency_public_articles.sql','20261124053400_agency_cms_media_lifecycle.sql'])await db.exec(await sql(`migrations/${name}`));
 return {db,q,one,count,as,owner,rpc,ids:{assigned:assigned.id,queued:queued.id,other:other.id,contact,otherContact,guest,customerChat}};
}

test('Public news and editorial images use the real CMS lifecycle with separated roles',async()=>{
 const h=await setup({teamAccess:true,cmsLifecycle:true});
 const bucket='gary-cms-media';
 const save=(record,version=null)=>h.one('select * from public.gary_cms_save($1::jsonb,$2)',[JSON.stringify(record),version]);
 const transition=(record,status)=>h.one('select * from public.gary_cms_transition($1,$2,$3)',[record.id,status,record.version]);
 const reserve=(path,approval=true)=>h.one('select * from public.gary_cms_reserve_media($1,$2,$3,$4,$5,$6,$7,$8,$9)',
   [path,'documents.png','image/png',120,'Sample forms','Mẫu giấy tờ','First cover','Ảnh đầu tiên',approval]);
 const register=path=>h.one('select * from public.gary_cms_register_media($1,$2,$3,$4)',[path,'documents.png','image/png',120]);
 const update=(item,alt='Updated alt')=>h.one('select * from public.gary_cms_update_media($1,$2,$3,$4,$5,$6)',
   [item.id,item.version,alt,'Văn bản thay thế','Updated caption','Chú thích']);
 const upload=(path,mime='image/png')=>h.q('insert into storage.objects(bucket_id,name,metadata) values($1,$2,$3::jsonb)',
   [bucket,path,JSON.stringify({mimetype:mime,size:120})]);
 const prepare=item=>h.one('select * from public.gary_cms_prepare_media_removal($1)',[item.id]);
 // The catalogue insert/delete stands in for the supported Storage API in
 // this isolated fixture and exercises its RLS policies.
 const remove=path=>h.q('delete from storage.objects where bucket_id=$1 and name=$2 returning id',[bucket,path]);
 const confirm=item=>h.rpc('gary_cms_confirm_media_removal',[item.id]);
 const directory=(query='',category='',page=1)=>h.rpc('gary_cms_article_directory',[query,category,page]);
 const key=()=>`${uid.editor}/${randomUUID()}.png`;
 const asset=path=>`https://duyiihsmaqfgwezmsnjs.supabase.co/storage/v1/object/public/${bucket}/${path}`;
 const snapshot=record=>h.one('select content from public.gary_cms_public where entry_id=$1',[record.id]);
 try{
  await h.as(null);
  assert.equal(await h.count('select 1 from public.gary_cms_public'),19,'existing homepage publication snapshots survive the upgrade');
  await h.as('editor');
  const oldPath=key();
  await denied(()=>upload(oldPath));
  await assert.rejects(()=>reserve(oldPath,false),/CMS_MEDIA_PUBLIC_CONFIRMATION/);
  let old=await reserve(oldPath);
  await assert.rejects(()=>register(oldPath),/CMS_MEDIA_MISSING/);
  await upload(oldPath);
  old=await register(oldPath);
  assert.equal(old.state,'ready');
  assert.equal((await register(oldPath)).version,old.version);
  const changed=await update(old);
  assert.deepEqual([changed.alt_en,changed.alt_vi,changed.caption_en,changed.caption_vi],
   ['Updated alt','Văn bản thay thế','Updated caption','Chú thích']);
  await denied(()=>update(old),'40001');
  assert.equal((await remove(oldPath)).rows.length,0,'new uploads require an explicit, guarded removal');
  assert.equal(await h.count("select 1 from storage.objects where bucket_id='gary-documents'"),0);

  const article={kind:'article',slug:'permit-guide',title_en:'Work permit guide',title_vi:'Hướng dẫn giấy phép',
   summary_en:'Prepare your documents',summary_vi:'Chuẩn bị hồ sơ',body_en:'English guide',body_vi:'Hướng dẫn tiếng Việt',
   data:{category:'work',image_url:asset(oldPath),internal_note:'Hidden note'}};
  await assert.rejects(()=>save({...article,data:{image_url:'/portal/private.png'}}),/CMS_MEDIA_NOT_PUBLIC/);
  let entry=await save(article);
  await denied(()=>transition(entry,'published'));
  await h.as(null);
  assert.equal((await directory()).total,0);
  await denied(()=>h.q('select * from public.gary_cms_entries'));
  await denied(()=>h.q('select * from public.gary_cms_media'));
  await h.as('publisher');
  assert.deepEqual(await h.rpc('gary_cms_capabilities'),{role:'publisher',read:true,edit:false,publish:true,media:false,trash:false});
  await denied(()=>save({...entry,title_en:'Unauthorized edit'},entry.version));
  await denied(()=>transition(entry,'review'));
  await denied(()=>update(changed));
  await denied(()=>prepare(old));
  await denied(()=>reserve(`${uid.publisher}/${randomUUID()}.png`));
  await h.as('editor');entry=await transition(entry,'review');
  await h.as('publisher');entry=await transition(entry,'published');
  await denied(()=>transition(entry,'draft'));
  await h.as(null);
  const news=await directory('GIẤY PHÉP','work');
  assert.equal(news.total,1);
  assert.equal(news.entries[0].title_vi,article.title_vi);
  assert.equal(news.entries[0].data.image_caption_vi,'Chú thích');
  assert.equal(news.entries[0].data.image_alt_en,'Updated alt');
  assert.equal(news.entries[0].data.internal_note,undefined);
  assert.equal(news.entries[0].body_en,undefined);
  assert.equal((await snapshot(entry)).content.body_en,article.body_en);
  assert.equal((await directory('','visa')).total,0);

  await h.as('editor');
  await assert.rejects(()=>save({...entry,slug:'changed'},entry.version),/CMS_PUBLISHED_SLUG/);
  const replacementPath=key();
  let replacement=await reserve(replacementPath);
  await upload(replacementPath);
  replacement=await register(replacementPath);
  entry=await save({...entry,data:{category:'work',image_url:asset(replacementPath)}},entry.version);
  await assert.rejects(()=>prepare(old),/CMS_MEDIA_IN_USE/);
  await h.as(null);assert.equal((await snapshot(entry)).content.data.image_url,asset(oldPath),'a working draft cannot change the published cover');
  await h.as('editor');entry=await transition(entry,'review');
  await h.as('publisher');entry=await transition(entry,'published');
  await h.as(null);assert.equal((await snapshot(entry)).content.data.image_url,asset(replacementPath));
  await h.as('publisher');entry=await transition(entry,'archived');
  await h.as(null);assert.equal(await snapshot(entry),undefined);assert.equal((await directory()).total,0);
  await h.as('editor');
  entry=await save({...entry,data:{category:'work',image_url:''}},entry.version);
  entry=await transition(entry,'review');
  await h.as('publisher');entry=await transition(entry,'published');
  await h.as(null);assert.equal((await snapshot(entry)).content.data.image_url,undefined);
  await h.as('cmsAdmin');
  await assert.rejects(()=>prepare(replacement),/CMS_MEDIA_IN_USE/,'revision history protects previously used files');
  assert.equal(await h.count("select 1 from storage.objects where bucket_id='gary-documents'"),0);

  await h.as('editor');
  const unusedPath=key();
  const unused=await reserve(unusedPath);
  await upload(unusedPath,'image/jpeg');
  await assert.rejects(()=>register(unusedPath),/CMS_MEDIA_INVALID/);
  assert.equal((await prepare(unused)).state,'deleting');
  assert.equal(await confirm(unused),false,'a failed Storage cleanup remains pending');
  await denied(()=>upload(unusedPath));
  await assert.rejects(()=>save({...entry,data:{image_url:asset(unusedPath)}},entry.version),/CMS_MEDIA_NOT_PUBLIC/);
  assert.equal((await remove(unusedPath)).rows.length,1);
  assert.equal(await confirm(unused),true);
  assert.equal(await confirm(unused),true);
  assert.equal((await prepare(unused)).state,'removed');
  const abandoned=await reserve(key());
  assert.equal((await prepare(abandoned)).state,'removed');
  await denied(()=>upload(abandoned.object_path));

  await h.owner();
  await h.q("update public.gary_cms_public set published_at='2100-01-01' where entry_id=$1",[entry.id]);
  await h.as(null);
  assert.equal(await snapshot(entry),undefined,'future snapshots are invisible even via the direct REST table');
  await h.owner();
  await h.q(`with entries as (
   insert into public.gary_cms_entries(kind,slug,title_en,title_vi,status,published_at,data)
   select 'article','page-guide-'||n,'A new planning guide','Hướng dẫn mới','published',now(),jsonb_build_object('category','visa')
   from generate_series(1,11) n returning *
  ) insert into public.gary_cms_public(entry_id,kind,slug,content,published_at)
   select id,kind,slug,gary_private.cms_public_payload(entries),published_at from entries`);
  await h.as(null);
  const pages=await directory('','visa',2);
  assert.deepEqual([pages.total,pages.page,pages.entries.length],[11,2,2]);
 }finally{await h.db.close();}
});

test('upgrade keeps records, makes legacy members Operations Admins, and guards owner SQL and the old installer',async()=>{
 const h=await setup({assignRoles:false});
 try{
  await h.owner();
  assert.deepEqual((await h.q('select operations_role,count(*)::int n from gary_private.staff_members group by 1')).rows,[{operations_role:'admin',n:9}],'every existing member keeps unrestricted operations as Operations Admin');
  assert.equal(await h.count("select 1 from gary_private.access_events where source='migration' and scope='operations' and from_role='legacy_staff' and to_role='admin'"),9);
  assert.deepEqual((await h.q('select user_id,role,active from gary_private.cms_members order by user_id')).rows,[{user_id:uid.editor,role:'editor',active:true},{user_id:uid.publisher,role:'publisher',active:true},{user_id:uid.cmsAdmin,role:'admin',active:true},{user_id:uid.outsider,role:'admin',active:true}],'CMS roles are unchanged');
  assert.equal(await h.count('select 1 from gary_private.staff_members where user_id=$1',[uid.outsider]),0,'a CMS row never creates membership');
  assert.deepEqual([await h.count('select 1 from public.gary_applications'),await h.count('select 1 from public.gary_messages'),await h.count('select 1 from public.gary_documents'),await h.count('select 1 from public.gary_staff_notes'),await h.count('select 1 from auth.users')],[3,1,1,2,13],'cases, messages, documents, notes and accounts are preserved');
  assert.equal((await h.one('select assigned_staff_id from public.gary_applications where id=$1',[h.ids.assigned])).assigned_staff_id,uid.staff);
  await h.as('editor');assert.equal(await h.count('select 1 from public.gary_applications'),3,'legacy members keep their previous case access until the owner narrows it');
  assert.deepEqual(await h.rpc('gary_my_access'),{member:true,operations:'admin',cms:'editor'});
  await h.owner();await h.q('insert into gary_private.staff_members(user_id) values($1)',[uid.newcomer]);
  await h.as('newcomer');assert.deepEqual(await h.rpc('gary_my_access'),{member:true,operations:null,cms:null},'members added after the upgrade start with No Access');
  assert.equal(await h.count('select 1 from public.gary_applications'),0);

  await h.owner();const script=(await sql('set-visa-roles.sql')).replaceAll('skycastle3@protonmail.com','REPLACE_WITH_STAFF_EMAIL');
  await assert.rejects(()=>h.db.exec(script),/Nothing changed: replace REPLACE_WITH_STAFF_EMAIL/,'the unedited owner script changes nobody');await h.db.exec('rollback');
  await assert.rejects(()=>h.db.exec(script.replace("'REPLACE_WITH_STAFF_EMAIL'","'nobody@example.test'")),/nobody@example\.test is not a Gary Visa staff member/);await h.db.exec('rollback');
  await h.db.exec('begin;alter table gary_private.access_events rename to access_events_hidden');
  await assert.rejects(()=>h.db.exec(script.replace("'REPLACE_WITH_STAFF_EMAIL'","'staff@example.test'")),/apply migration 20261117190000/,'the script refuses to run before the roles migration');await h.db.exec('rollback');
  await h.db.exec(script.replace("'REPLACE_WITH_STAFF_EMAIL'","'STAFF@example.test'").replace("v_operations constant text:='keep'","v_operations constant text:='staff'").replace("v_cms constant text:='keep'","v_cms constant text:='editor'"));
  assert.deepEqual(await h.one('select s.operations_role,m.role cms_role from gary_private.staff_members s join gary_private.cms_members m on m.user_id=s.user_id where s.user_id=$1',[uid.staff]),{operations_role:'staff',cms_role:'editor'});
  assert.deepEqual((await h.q("select scope,from_role,to_role,actor_id from gary_private.access_events where source='owner' order by scope")).rows,[{scope:'cms',from_role:null,to_role:'editor',actor_id:null},{scope:'operations',from_role:'admin',to_role:'staff',actor_id:null}]);

  const installer=await sql('install-live-chat.sql');
  await assert.rejects(()=>h.db.exec(installer),/Operations roles are already installed/);await h.db.exec('rollback');
  await h.as('staff');assert.equal(await h.count('select 1 from public.gary_applications'),1,'the refused installer leaves role scoping intact');
 }finally{await h.db.close()}
});

test('Operations Staff, Manager and Admin scope cases, documents, Storage, CRM and chat; customers stay isolated',async()=>{
 const h=await setup(),{ids}=h;
 try{
  await h.as('staff');
  assert.deepEqual(await h.rpc('gary_my_access'),{member:true,operations:'staff',cms:null});
  assert.deepEqual((await h.q('select id from public.gary_applications')).rows.map(row=>row.id),[ids.assigned],'Staff see assigned cases only');
  assert.deepEqual([await h.count('select 1 from public.gary_messages'),await h.count('select 1 from public.gary_documents'),await h.count('select 1 from public.gary_staff_notes'),await h.count('select 1 from public.gary_application_events where application_id<>$1',[ids.assigned])],[1,1,1,0]);
  assert.deepEqual((await h.q('select full_name from public.gary_profiles order by full_name')).rows.map(row=>row.full_name),['Casey Customer','Sam Staff'],'Staff see only customers of assigned cases');
  assert.equal(await h.count("select 1 from storage.objects where bucket_id='gary-documents'"),1);
  await h.q("update public.gary_applications set status='in_review' where id=$1",[ids.assigned]);
  assert.equal((await h.q("update public.gary_applications set status='processing' where id=$1 returning id",[ids.other])).rows.length,0,'unassigned cases cannot be changed');
  await denied(()=>h.q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.staff2,ids.assigned]));
  await denied(()=>h.q('update public.gary_applications set assigned_staff_id=null where id=$1',[ids.assigned]));
  await h.q("insert into public.gary_staff_notes(application_id,body) values($1,'Staff note')",[ids.assigned]);
  await denied(()=>h.q("insert into public.gary_staff_notes(application_id,body) values($1,'Intrusion')",[ids.other]));
  await h.q("insert into public.gary_messages(application_id,body) values($1,'Staff reply')",[ids.assigned]);
  await denied(()=>h.q("insert into public.gary_messages(application_id,body) values($1,'Intrusion')",[ids.other]));
  await h.q("insert into storage.objects(bucket_id,name) values('gary-documents',$1)",[`${ids.assigned}/${uid.staff}/checklist.pdf`]);
  await denied(()=>h.q("insert into storage.objects(bucket_id,name) values('gary-documents',$1)",[`${ids.other}/${uid.staff}/intrusion.pdf`]));
  await denied(()=>h.q("insert into public.gary_documents(application_id,object_path,file_name,mime_type,size_bytes) values($1,$2,'x.pdf','application/pdf',10)",[ids.other,`${ids.other}/${uid.staff}/x.pdf`]));
  assert.deepEqual((await h.q('select id from public.gary_crm_contacts')).rows.map(row=>row.id),[ids.contact],'Staff see assigned contacts only');
  await h.q("insert into public.gary_crm_notes(contact_id,body) values($1,'Follow-up call')",[ids.contact]);
  await denied(()=>h.q("insert into public.gary_crm_notes(contact_id,body) values($1,'Intrusion')",[ids.otherContact]));
  await h.q("insert into public.gary_crm_contacts(full_name,assigned_staff_id) values('Own lead',$1)",[uid.staff]);
  await denied(()=>h.q("insert into public.gary_crm_contacts(full_name) values('Unassigned lead')"));
  await denied(()=>h.q("insert into public.gary_crm_contacts(full_name,assigned_staff_id) values('Colleague lead',$1)",[uid.staff2]));
  await denied(()=>h.q('update public.gary_crm_contacts set assigned_staff_id=$1 where id=$2',[uid.staff2,ids.contact]));
  assert.deepEqual((await h.q('select id from public.gary_chat_conversations')).rows.map(row=>row.id),[ids.guest],'Staff see assigned chats only');
  assert.ok((await h.rpc('gary_read_chat',[ids.guest])).messages.length>=1);
  await h.rpc('gary_send_chat_message',[ids.guest,'Hello from your assigned staff member',randomUUID()]);
  await denied(()=>h.rpc('gary_read_chat',[ids.customerChat]));
  await denied(()=>h.rpc('gary_send_chat_message',[ids.customerChat,'Intrusion',randomUUID()]));
  await denied(()=>h.q('update public.gary_chat_conversations set assigned_staff_id=null where id=$1',[ids.guest]));
  await denied(()=>h.rpc('gary_set_chat_availability',[true]),'42501');await h.rpc('gary_set_chat_availability',[false]);
  for(const [kind,record] of [['case',ids.assigned],['contact',ids.contact]])await denied(()=>h.rpc('gary_trash_record',[kind,record,null]));
  await denied(()=>h.rpc('gary_list_trash',[null,0,20]));await denied(()=>h.rpc('gary_staff_access_list'));
  assert.equal((await h.rpc('gary_cms_capabilities')).read,false,'Operations roles never imply CMS access');

  await h.as('manager');
  assert.deepEqual([await h.count('select 1 from public.gary_applications'),await h.count('select 1 from public.gary_staff_notes'),await h.count('select 1 from public.gary_chat_conversations')],[3,3,2],'Managers oversee every case, note and chat');
  await h.q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.staff2,ids.queued]);
  await denied(()=>h.q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.editor,ids.queued]),'23514');
  await denied(()=>h.q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.noAccess,ids.queued]),'23514');
  await h.q('update public.gary_applications set assigned_staff_id=null where id=$1',[ids.queued]);
  await h.q("insert into public.gary_crm_contacts(full_name) values('Team lead')");
  await h.q('update public.gary_crm_contacts set assigned_staff_id=$1 where id=$2',[uid.staff2,ids.otherContact]);
  await h.q('update public.gary_chat_conversations set assigned_staff_id=$1 where id=$2',[uid.manager,ids.customerChat]);
  assert.ok((await h.rpc('gary_read_chat',[ids.customerChat])).messages.length>=1);
  assert.ok((await h.rpc('gary_set_chat_availability',[true])).available_until,'oversight roles can take the live queue');
  for(const [kind,record] of [['case',ids.queued],['contact',ids.otherContact]])await denied(()=>h.rpc('gary_trash_record',[kind,record,null]));
  await denied(()=>h.rpc('gary_restore_record',['case',ids.queued,null]));await denied(()=>h.rpc('gary_list_trash',[null,0,20]));await denied(()=>h.rpc('gary_staff_access_list'));
  assert.equal(await h.count("select 1 from storage.objects where bucket_id='gary-documents'"),2);

  await h.as('admin');
  assert.equal(await h.count('select 1 from public.gary_applications'),3);
  await h.q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.manager,ids.queued]);

  await h.as('customer');
  assert.deepEqual([await h.count('select 1 from public.gary_applications'),await h.count('select 1 from public.gary_staff_notes'),await h.count('select 1 from public.gary_crm_contacts')],[2,0,0]);
  await denied(()=>h.q('update public.gary_applications set assigned_staff_id=$1 where id=$2',[uid.staff,ids.queued]));
  assert.deepEqual(await h.rpc('gary_my_access'),{member:false,operations:null,cms:null});
  await denied(()=>h.rpc('gary_trash_record',['case',ids.queued,null]));
 }finally{await h.db.close()}
});

test('Trash and CMS: Editors edit, Publishers publish and archive, only matching Admins trash or restore',async()=>{
 const h=await setup(),{ids}=h;
 const save=async record=>h.one('select * from public.gary_cms_save($1::jsonb,null)',[JSON.stringify(record)]);
 const transition=async(entry,status)=>h.one('select * from public.gary_cms_transition($1,$2,$3)',[entry.id,status,entry.version]);
 const draft=slug=>({kind:'faq',slug,title_en:'Roles test',title_vi:'Kiểm tra vai trò',summary_en:'English summary',summary_vi:'Tóm tắt tiếng Việt',body_en:'Answer',body_vi:'Câu trả lời'});
 try{
  await h.as('editor');
  assert.deepEqual(await h.rpc('gary_my_access'),{member:true,operations:null,cms:'editor'});
  assert.deepEqual([await h.count('select 1 from public.gary_applications'),await h.count('select 1 from public.gary_crm_contacts'),await h.count('select 1 from public.gary_chat_conversations'),await h.count("select 1 from storage.objects where bucket_id='gary-documents'")],[0,0,0,0],'CMS roles never imply Operations access');
  assert.deepEqual(await h.rpc('gary_cms_capabilities'),{role:'editor',read:true,edit:true,publish:false,media:true,trash:false});
  let first=await transition(await save(draft('roles-first')),'review'),second=await transition(await save(draft('roles-second')),'review');
  await denied(()=>transition(first,'published'));await denied(()=>transition(first,'archived'));
  await denied(()=>h.rpc('gary_trash_record',['cms',first.id,first.version]));await denied(()=>h.rpc('gary_list_trash',[null,0,20]));

  await h.as('publisher');
  assert.deepEqual(await h.rpc('gary_cms_capabilities'),{role:'publisher',read:true,edit:true,publish:true,media:true,trash:false});
  first=await transition(first,'published');second=await transition(await transition(second,'published'),'archived');assert.equal(second.status,'archived');
  await denied(()=>h.rpc('gary_trash_record',['cms',first.id,first.version]));await denied(()=>h.rpc('gary_list_trash',['cms',0,20]));await denied(()=>h.rpc('gary_list_trash',[null,0,20]));

  await h.as('cmsAdmin');
  assert.equal((await h.rpc('gary_cms_capabilities')).trash,true);
  const removed=await h.rpc('gary_trash_record',['cms',first.id,first.version]);
  const contentTrash=await h.rpc('gary_list_trash',[null,0,20]);assert.deepEqual(contentTrash.records.map(record=>record.kind),['cms'],'CMS Admins see content trash only');
  await denied(()=>h.rpc('gary_list_trash',['case',0,20]));await denied(()=>h.rpc('gary_trash_record',['case',ids.queued,null]));await denied(()=>h.rpc('gary_trash_record',['contact',ids.contact,null]));
  await h.as('publisher');await denied(()=>h.rpc('gary_restore_record',['cms',first.id,removed.version]));
  await h.as('cmsAdmin');assert.equal((await h.rpc('gary_restore_record',['cms',first.id,removed.version])).deleted_at,null);

  await h.as('admin');
  assert.equal((await h.rpc('gary_cms_capabilities')).read,false,'Operations Admin has no CMS role');
  await denied(()=>h.rpc('gary_trash_record',['cms',second.id,second.version]));await denied(()=>h.rpc('gary_list_trash',['cms',0,20]));
  await h.rpc('gary_trash_record',['case',ids.queued,null]);await h.rpc('gary_trash_record',['contact',ids.otherContact,null]);
  assert.deepEqual((await h.rpc('gary_list_trash',[null,0,20])).records.map(record=>record.kind).sort(),['case','contact'],'Operations Admins see case and contact trash only');
  for(const who of ['staff','manager','cmsAdmin']){await h.as(who);await denied(()=>h.rpc('gary_restore_record',['case',ids.queued,null]))}
  await h.as('admin');await h.rpc('gary_restore_record',['case',ids.queued,null]);await h.rpc('gary_restore_record',['contact',ids.otherContact,null]);
  assert.equal(await h.count('select 1 from public.gary_applications'),3);
  await h.owner();assert.deepEqual((await h.q("select kind,action from gary_private.deletion_events order by created_at")).rows.map(row=>`${row.kind}:${row.action}`),['cms:deleted','cms:restored','case:deleted','contact:deleted','case:restored','contact:restored']);

  await h.as('outsider');assert.equal((await h.rpc('gary_cms_capabilities')).read,false,'a CMS row without Visa membership grants nothing');await denied(()=>h.rpc('gary_list_trash',[null,0,20]));
 }finally{await h.db.close()}
});

test('Staff Management is Visa-only and protects self, peer Admins and the Admin level',async()=>{
 const h=await setup();
 try{
  await h.as('noAccess');
  assert.deepEqual(await h.rpc('gary_my_access'),{member:true,operations:null,cms:null});
  assert.deepEqual([await h.count('select 1 from public.gary_applications'),await h.count('select 1 from public.gary_crm_contacts'),await h.count('select 1 from public.gary_chat_conversations')],[0,0,0]);
  assert.equal((await h.rpc('gary_cms_capabilities')).read,false);
  await denied(()=>h.rpc('gary_staff_access_list'));await denied(()=>h.rpc('gary_list_trash',[null,0,20]));await denied(()=>h.rpc('gary_set_chat_availability',[true]));
  const directory=(await h.q('select * from public.gary_staff_directory()')).rows;
  assert.equal(directory.find(row=>row.user_id===uid.noAccess).assignable,false);assert.equal(directory.find(row=>row.user_id===uid.staff).assignable,true);

  await h.as('admin');
  const list=await h.rpc('gary_staff_access_list'),row=name=>list.members.find(member=>member.user_id===uid[name]);
  assert.equal(list.members.length,9,'only Visa staff members are listed');assert.equal(list.members.some(member=>[uid.customer,uid.outsider].includes(member.user_id)),false);
  assert.deepEqual(Object.keys(row('staff')).sort(),['cms_role','display_name','email','manage_cms','manage_operations','operations_role','self','user_id']);
  assert.deepEqual([row('staff').display_name,row('staff').email],['Sam Staff','staff@example.test']);
  assert.deepEqual([row('admin').self,row('admin').manage_operations,row('admin2').manage_operations,row('staff').manage_operations,row('noAccess').manage_operations],[true,false,false,true,true]);
  assert.equal(list.members.every(member=>member.manage_cms===false),true,'Operations Admins cannot manage CMS roles');
  await h.rpc('gary_set_operations_role',[uid.staff,'manager','staff']);
  await denied(()=>h.rpc('gary_set_operations_role',[uid.staff,'staff','staff']),'40001');
  await h.rpc('gary_set_operations_role',[uid.noAccess,'staff',null]);
  await denied(()=>h.rpc('gary_set_operations_role',[uid.admin,'manager','admin']));
  await denied(()=>h.rpc('gary_set_operations_role',[uid.admin2,'manager','admin']));
  await denied(()=>h.rpc('gary_set_operations_role',[uid.staff2,'admin','staff']));
  await denied(()=>h.rpc('gary_set_operations_role',[uid.customer,'staff',null]),'P0002');
  await denied(()=>h.rpc('gary_set_operations_role',[uid.staff2,'owner','staff']),'22023');
  await denied(()=>h.rpc('gary_set_cms_role',[uid.editor,'publisher','editor']));
  await h.as('staff');assert.equal(await h.count('select 1 from public.gary_applications'),3,'a promoted Manager gains oversight');
  await denied(()=>h.rpc('gary_staff_access_list'));await denied(()=>h.rpc('gary_set_operations_role',[uid.staff2,'manager','staff']));
  await h.as('admin');await h.rpc('gary_set_operations_role',[uid.staff,null,'manager']);
  await h.as('staff');assert.equal(await h.count('select 1 from public.gary_applications'),0,'No Access removes case access immediately');
  await h.owner();assert.equal((await h.one('select assigned_staff_id from public.gary_applications where id=$1',[h.ids.assigned])).assigned_staff_id,uid.staff,'assignments and history are preserved');
  assert.deepEqual((await h.q("select from_role,to_role,actor_id from gary_private.access_events where member_id=$1 and source='portal' order by created_at",[uid.staff])).rows,[{from_role:'staff',to_role:'manager',actor_id:uid.admin},{from_role:'manager',to_role:null,actor_id:uid.admin}]);

  await h.q("insert into gary_private.cms_members(user_id,role) values($1,'admin')",[uid.admin2]);
  await h.as('cmsAdmin');
  const cmsList=await h.rpc('gary_staff_access_list'),cmsRow=name=>cmsList.members.find(member=>member.user_id===uid[name]);
  assert.deepEqual([cmsRow('editor').manage_cms,cmsRow('staff2').manage_cms,cmsRow('cmsAdmin').manage_cms,cmsRow('admin2').manage_cms],[true,true,false,false]);
  assert.equal(cmsList.members.every(member=>member.manage_operations===false),true,'CMS Admins cannot manage Operations roles');
  await h.rpc('gary_set_cms_role',[uid.editor,'publisher','editor']);await h.rpc('gary_set_cms_role',[uid.staff2,'editor',null]);await h.rpc('gary_set_cms_role',[uid.publisher,null,'publisher']);
  await denied(()=>h.rpc('gary_set_cms_role',[uid.cmsAdmin,'editor','admin']));
  await denied(()=>h.rpc('gary_set_cms_role',[uid.admin2,'editor','admin']));
  await denied(()=>h.rpc('gary_set_cms_role',[uid.staff2,'admin','editor']));
  await denied(()=>h.rpc('gary_set_cms_role',[uid.outsider,'editor','admin']),'P0002');
  await denied(()=>h.rpc('gary_set_operations_role',[uid.staff2,'manager','staff']));
  await h.as('publisher');assert.equal((await h.rpc('gary_cms_capabilities')).read,false,'CMS No Access removes content access');
  await h.as('editor');assert.equal((await h.rpc('gary_cms_capabilities')).publish,true);
  await h.as('staff2');assert.deepEqual(await h.rpc('gary_my_access'),{member:true,operations:'staff',cms:'editor'},'Operations and CMS roles stay independent');

  await h.as('customer');
  await denied(()=>h.rpc('gary_staff_access_list'));await denied(()=>h.rpc('gary_set_operations_role',[uid.customer,'admin',null]));await denied(()=>h.rpc('gary_set_cms_role',[uid.customer,'admin',null]));
  await denied(()=>h.q('select * from gary_private.access_events'));await denied(()=>h.q("update gary_private.staff_members set operations_role='admin'"));
  await h.as(null);await denied(()=>h.rpc('gary_my_access'));await denied(()=>h.rpc('gary_staff_access_list'));
 }finally{await h.db.close()}
});

test('Team Access adds verified existing accounts with a lower role from each Admin’s own area only',async()=>{
 const h=await setup({teamAccess:true});
 const extra={candidate:id(20),cmsCandidate:id(21),dualCandidate:id(22),unverified:id(23),suspended:id(24),anonymous:id(25),removed:id(26)};
 const add=(...args)=>h.rpc('gary_add_staff_member',args),access=async who=>{await h.as(who);return h.rpc('gary_my_access')};
 try{
  await h.owner();
  for(const [name,value] of Object.entries(extra))await h.q('insert into auth.users(id,email) values($1,$2)',[value,`${name.toLowerCase()}@example.test`]);
  await h.q('update auth.users set email_confirmed_at=null where id=$1',[extra.unverified]);
  for(const user of [extra.suspended,uid.noAccess,uid.admin2])await h.q("update auth.users set banned_until=now()+interval '1 day' where id=$1",[user]);
  await h.q('update auth.users set is_anonymous=true where id=$1',[extra.anonymous]);
  await h.q('update auth.users set deleted_at=now() where id=$1',[extra.removed]);
  const accounts=(await h.q('select * from auth.users order by id')).rows;

  await h.as('admin');
  const list=await h.rpc('gary_staff_access_list'),row=user=>list.members.find(member=>member.user_id===user);
  assert.deepEqual(Object.keys(row(uid.staff)).sort(),['account','cms_role','display_name','email','manage_cms','manage_operations','operations_role','self','user_id']);
  assert.deepEqual([row(uid.staff).account,row(uid.noAccess).account,row(uid.admin2).account],['active','unavailable','unavailable'],'suspended members are listed as unable to sign in');
  assert.equal(list.members.some(member=>Object.values(extra).includes(member.user_id)),false,'accounts are listed only once added');

  assert.deepEqual(await add(' Candidate@Example.TEST ','manager',null),{user_id:extra.candidate,operations_role:'manager',cms_role:null});
  for(const [operations,cms] of [[null,'editor'],['staff','editor']])await denied(()=>add('cmscandidate@example.test',operations,cms));
  await denied(()=>add('cmscandidate@example.test','admin',null));
  for(const [email,operations,cms] of [['cmscandidate@example.test',null,null],['cmscandidate@example.test','owner',null],['not-an-email','staff',null]])await denied(()=>add(email,operations,cms),'22023');
  for(const email of ['nobody@example.test','unverified@example.test','suspended@example.test','anonymous@example.test','removed@example.test'])await denied(()=>add(email,'staff',null),'P0002');
  await denied(()=>add('staff@example.test','manager',null),'23505');
  await denied(()=>add('admin@example.test','staff',null));
  await assert.rejects(()=>add('outsider@example.test','staff',null),
   error=>error.code==='42501'&&error.message==='AGENCY_CMS_REVIEW_REQUIRED');
  await assert.rejects(()=>h.rpc('gary_set_operations_role',[uid.noAccess,'manager',null]),
   error=>error.code==='P0002'&&error.message==='AGENCY_TARGET_INELIGIBLE');
  await h.owner();
  assert.equal(await h.count(`select 1 from gary_private.staff_members where user_id='${uid.outsider}'`),0,
   'a failed add rolls the new membership back');
  assert.deepEqual(await h.one('select role,active from gary_private.cms_members where user_id=$1',[uid.outsider]),
   {role:'admin',active:true},'the Operations request does not modify the historical CMS row');
  await h.q('update gary_private.cms_members set active=false where user_id=$1',[uid.outsider]);
  await h.as('admin');
  assert.deepEqual(await add('outsider@example.test','staff',null),{user_id:uid.outsider,operations_role:'staff',cms_role:null});

  await h.as('cmsAdmin');
  assert.deepEqual(await add('cmscandidate@example.test',null,'publisher'),{user_id:extra.cmsCandidate,operations_role:null,cms_role:'publisher'});
  await assert.rejects(()=>h.rpc('gary_set_cms_role',[uid.outsider,'publisher',null]),
   error=>error.code==='42501'&&error.message==='AGENCY_PROTECTED_ROLE');
  await assert.rejects(()=>h.rpc('gary_set_cms_role',[uid.noAccess,'editor',null]),
   error=>error.code==='P0002'&&error.message==='AGENCY_TARGET_INELIGIBLE');
  await denied(()=>h.rpc('gary_set_cms_role',[uid.cmsAdmin,'publisher','admin']));
  await denied(()=>h.rpc('gary_set_operations_role',[uid.admin,'manager','admin']));

  for(const [operations,cms] of [['staff',null],['staff','editor']])await denied(()=>add('dualcandidate@example.test',operations,cms));
  await denied(()=>add('dualcandidate@example.test',null,'admin'));
  await denied(()=>add('candidate@example.test',null,'editor'),'23505');

  for(const who of ['admin2','manager','staff','publisher','editor','noAccess','customer',extra.candidate]){await h.as(who);await denied(()=>add('dualcandidate@example.test','staff',null))}
  await h.as('admin2');await denied(()=>h.rpc('gary_staff_access_list'),'42501');
  await h.as(null);await denied(()=>add('dualcandidate@example.test','staff',null));
  await h.owner();await h.q("insert into gary_private.cms_members(user_id,role) values($1,'admin')",[uid.admin]);
  await h.as('admin');assert.deepEqual(await add('dualcandidate@example.test','staff','editor'),{user_id:extra.dualCandidate,operations_role:'staff',cms_role:'editor'},'an Admin of both areas assigns both');

  assert.deepEqual(await access(extra.candidate),{member:true,operations:'manager',cms:null});
  assert.equal(await h.count('select 1 from public.gary_applications'),3,'a new Manager oversees every case');
  assert.deepEqual(await access(extra.cmsCandidate),{member:true,operations:null,cms:'publisher'});
  assert.equal(await h.count('select 1 from public.gary_applications'),0,'a CMS role never implies Operations access');
  assert.deepEqual(await access('outsider'),{member:true,operations:'staff',cms:null},'membership never revives a CMS role the adding Admin did not choose');
  assert.equal((await h.rpc('gary_cms_capabilities')).read,false);
  assert.deepEqual(await access(extra.dualCandidate),{member:true,operations:'staff',cms:'editor'});

  await h.owner();
  const event=(member,scope,to,actor)=>({member_id:member,scope,from_role:null,to_role:to,actor_id:uid[actor]});
  assert.deepEqual((await h.q("select member_id,scope,from_role,to_role,actor_id from gary_private.access_events where source='portal' order by member_id,scope")).rows,[
   event(uid.outsider,'membership','member','admin'),event(uid.outsider,'operations','staff','admin'),
   event(extra.candidate,'membership','member','admin'),event(extra.candidate,'operations','manager','admin'),
   event(extra.cmsCandidate,'cms','publisher','cmsAdmin'),event(extra.cmsCandidate,'membership','member','cmsAdmin'),
   event(extra.dualCandidate,'cms','editor','admin'),event(extra.dualCandidate,'membership','member','admin'),event(extra.dualCandidate,'operations','staff','admin')
  ],'every addition records who added the member and which roles were granted');
  assert.deepEqual(await h.one('select role,active from gary_private.cms_members where user_id=$1',[uid.outsider]),{role:'admin',active:false});
  assert.deepEqual((await h.q('select * from auth.users order by id')).rows,accounts,'accounts, confirmations and suspensions are never changed');
 }finally{await h.db.close()}
});

test('Visa profile pictures are readable by their owner and authorized Team Access admins and writable only by the avatar service',async()=>{
 const h=await setup({teamAccess:true});
 const bucket='gary-visa-avatars',path=who=>`${uid[who]}/avatar`;
 const visible=async()=>(await h.q('select name from storage.objects where bucket_id=$1 order by name',[bucket])).rows.map(row=>row.name);
 try{
  await h.owner();await h.db.exec(await sql('migrations/20261118154222_visa_profile_avatars.sql'));
  assert.deepEqual(await h.one('select public,file_size_limit::int,allowed_mime_types from storage.buckets where id=$1',[bucket]),{
   public:false,file_size_limit:5*1024*1024,allowed_mime_types:['image/jpeg','image/png','image/webp']
  });
  for(const who of ['customer','staff','staff2'])await h.q('insert into storage.objects(bucket_id,name) values($1,$2)',[bucket,path(who)]);
  await h.q("update auth.users set deleted_at=now() where id=$1",[uid.staff2]);
  for(const [who,expected] of [[null,[]],['customer',[path('customer')]],['staff',[path('staff')]],['admin',[path('staff')]],['cmsAdmin',[path('staff')]],['editor',[]]]){
   await h.as(who);
   assert.deepEqual(await visible(),expected,String(who));
  }
  for(const who of ['customer','staff','admin',null]){
   await h.as(who);
   await denied(()=>h.q('insert into storage.objects(bucket_id,name) values($1,$2)',[bucket,path('customer2')]));
   const args=[bucket,path('customer'),path('staff')];
   assert.deepEqual((await h.q('update storage.objects set name=$2 where bucket_id=$1 and name=$3 returning name',args)).rows,[]);
   assert.deepEqual((await h.q('delete from storage.objects where bucket_id=$1 and name in($2,$3) returning name',args)).rows,[]);
  }
  await h.owner();assert.deepEqual(await visible(),[path('customer'),path('staff'),path('staff2')]);
  await h.as('customer');assert.equal(await h.count("select 1 from storage.objects where bucket_id='gary-documents'"),1);
 }finally{await h.db.close()}
});
