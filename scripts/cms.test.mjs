import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {bindFeedbackDom} from './feedback-test-dom.mjs';
import {loadHomepageCms,loadPublishedCms,renderPublicCms,renderServiceCms,cmsCopyOverrides} from '../dist/cms-public.js';
import {agencyCollections,createAgencyCmsAdapter} from '../dist/cms.js';
import {createAgencyCms} from '../dist/cms-workspace.js';
import {mountCms} from '../dist/cms-foundation/index.js';
import {publicCmsImage} from '../dist/cms-articles.js';
const fixture=async()=>new JSDOM(await readFile(new URL('../dist/index.html',import.meta.url),'utf8'),{url:'https://visa.example/'});
const entry=(kind,slug,extra={})=>({id:slug,kind,slug,title_en:'English '+slug,title_vi:'Tiếng Việt '+slug,summary_en:'English summary',summary_vi:'Tóm tắt tiếng Việt',body_en:'English body',body_vi:'Nội dung tiếng Việt',published_at:'2026-01-08T09:00:00Z',data:{},...extra});
const landing=['hero','services','process','about','faq','contact'].map(slot=>entry('landing',slot,{data:{slot,accent_en:'Second line',accent_vi:'Dòng thứ hai',third_line_en:'Third line',third_line_vi:'Dòng thứ ba'}}));
test('published content replaces public services, eligibility/documents, process, FAQ, articles and landing copy in both languages safely',async()=>{
 const dom=await fixture(),doc=dom.window.document;
 try{
  const rows=[...landing,entry('service','work',{title_en:'<img src=x onerror=alert(1)>',data:{category:'settle',service_type:'work',includes_en:'First\nSecond',includes_vi:'Một\nHai'}}),entry('eligibility','teacher-eligibility',{data:{service_slug:'work'}}),entry('document','degree',{data:{service_slug:'work'}}),entry('document','unrelated',{data:{service_slug:'visa'}}),entry('process','first',{data:{position:1}}),entry('faq','a-question'),entry('article','a-guide')];
  renderPublicCms({doc,entries:rows,language:'en'});
  assert.equal(doc.querySelectorAll('.service-card').length,1);assert.equal(doc.querySelector('.service-card h3').textContent,'<img src=x onerror=alert(1)>');assert.equal(doc.querySelector('.service-card h3 img'),null);
  assert.equal(doc.querySelector('.faq-list summary').textContent,'English a-question');assert.equal(doc.querySelector('.process-grid h3').textContent,'English first');assert.match(doc.querySelector('#cms-articles').textContent,/English a-guide/);assert.equal(doc.querySelector('[data-i18n=heroDescription]').textContent,'English summary');
  renderServiceCms({doc,entries:rows,slug:'work',language:'vi'});assert.match(doc.querySelector('#cms-service-details').textContent,/Tiếng Việt teacher-eligibility/);assert.match(doc.querySelector('#cms-service-details').textContent,/Tiếng Việt degree/);assert.doesNotMatch(doc.querySelector('#cms-service-details').textContent,/unrelated/);
  renderPublicCms({doc,entries:rows,language:'vi'});assert.equal(doc.querySelector('.faq-list summary').textContent,'Tiếng Việt a-question');assert.equal(doc.querySelector('[data-i18n=heroDescription]').textContent,'Tóm tắt tiếng Việt');
  assert.equal(cmsCopyOverrides(rows).vi.workTitle,'Tiếng Việt work');
  renderPublicCms({doc,entries:[],language:'en'});assert.equal(doc.querySelectorAll('.service-card').length,0,'archived content does not fall back to obsolete source cards');assert.equal(doc.querySelector('#visa-service-discovery').hidden,true);assert.equal(doc.querySelector('#visa-cinematic-hero').hidden,false,'the protected cinematic introduction stays available without CMS landing content');assert.equal(doc.querySelector('#faq').hidden,true);
 }finally{dom.window.close()}
});
test('public loader reads snapshots only and surfaces missing/unavailable backend without attempting writes',async()=>{
 const calls=[];let page=0;
 const db={from(table){calls.push(table);assert.equal(table,'gary_cms_public');return {select(){return this},lte(){return this},order(){return this},async range(from,to){page++;assert.equal(from,(page-1)*200);return {data:page===1?Array.from({length:200},(_,i)=>({entry_id:'id-'+i,kind:'faq',slug:'question-'+i,content:{title_en:'Question'}})):[{entry_id:'final',kind:'faq',slug:'last',content:{title_en:'Last'}}],error:null}}}}};
 const entries=await loadPublishedCms(db);assert.equal(entries.length,201);assert.equal(entries[200].id,'final');assert.equal(calls.length,2);
 const failure={from(){return {select(){return this},lte(){return this},order(){return this},async range(){return {error:{code:'42P01'}}}}}};await assert.rejects(()=>loadPublishedCms(failure),e=>e.code==='42P01');
});
test('homepage reads three newest article snapshots alongside the rest of its content',async()=>{
 const queries=[];
 const db={from(table){
  assert.equal(table,'gary_cms_public');
  const trace=[];queries.push(trace);
  return {select(){return this;},lte(){return this;},order(field){trace.push(field);return this;},
   neq(field,value){trace.push('neq',field,value);return this;},eq(field,value){trace.push('eq',field,value);return this;},
   async range(from,to){trace.push(from,to);return {data:[]};}};
 }};
 assert.deepEqual(await loadHomepageCms(db),{content:[],news:{entries:[],state:'ready'}});
 assert.deepEqual(queries,[['entry_id','neq','kind','article',0,199],['published_at','slug','eq','kind','article',0,2]]);
});
test('published landing SEO synchronizes declared page, Open Graph and Twitter metadata in both languages',async()=>{
 const dom=await fixture(),doc=dom.window.document;
 try{
  for(const [attribute,key]of [['name','twitter:title'],['property','twitter:title'],['name','twitter:description'],['property','twitter:description']]){const meta=doc.createElement('meta');meta.setAttribute(attribute,key);meta.content='Fallback social copy';doc.head.append(meta);}
  const hero=entry('landing','hero',{data:{slot:'hero'},seo_title_en:'Published Visa & Work Support',seo_title_vi:'Dịch vụ visa và lao động đã đăng',seo_description_en:'Published English service description.',seo_description_vi:'Mô tả dịch vụ tiếng Việt đã được đăng.'});
  const image=doc.querySelector('meta[property="og:image"]').content;
  for(const language of ['en','vi']){
   renderPublicCms({doc,entries:[hero],language});
   assert.equal(doc.title,hero['seo_title_'+language]);
   for(const meta of doc.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"],meta[property="twitter:title"]'))assert.equal(meta.content,hero['seo_title_'+language]);
   for(const meta of doc.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"],meta[property="twitter:description"]'))assert.equal(meta.content,hero['seo_description_'+language]);
  }
  assert.equal(doc.querySelector('meta[property="og:image"]').content,image,'Unrelated metadata remains unchanged');
 }finally{dom.window.close()}
});
test('empty landing SEO preserves the current locale fallback and does not create undeclared social tags',async()=>{
 const dom=await fixture(),doc=dom.window.document;
 try{
  doc.title='Current localized fallback';
  const selectors=['meta[name="description"]','meta[property="og:title"]','meta[property="og:description"]'];
  const original=selectors.map(selector=>doc.querySelector(selector).content);
  const hero=entry('landing','hero',{data:{slot:'hero'},seo_title_vi:'  ',seo_description_vi:'\n'});
  renderPublicCms({doc,entries:[hero],language:'vi'});
  assert.equal(doc.title,'Current localized fallback');
  selectors.forEach((selector,index)=>assert.equal(doc.querySelector(selector).content,original[index]));
  assert.equal(doc.querySelector('meta[name^="twitter:"]'),null);
  hero.seo_description_vi='Mô tả tiếng Việt mới.';renderPublicCms({doc,entries:[hero],language:'vi'});
  assert.equal(doc.title,'Current localized fallback');
  assert.equal(doc.querySelector('meta[property="og:title"]').content,original[1]);
  assert.equal(doc.querySelector('meta[name="description"]').content,hero.seo_description_vi);
  assert.equal(doc.querySelector('meta[property="og:description"]').content,hero.seo_description_vi);
 }finally{dom.window.close()}
});
test('service details omit an exact repeated includes list while keeping distinct long-form and related content',async()=>{
 const dom=await fixture(),doc=dom.window.document;
 try{
  const service=entry('service','work',{body_en:'Application review.\n\nDocument preparation.',body_vi:'Xem xét hồ sơ. Chuẩn bị giấy tờ.',data:{includes_en:['Application review.','Document preparation.'],includes_vi:['Xem xét hồ sơ.','Chuẩn bị giấy tờ.']}});
  const related=entry('document','degree',{data:{service_slug:'work'}});
  for(const language of ['en','vi']){
   renderServiceCms({doc,entries:[service,related],slug:'work',language});
   assert.equal(doc.querySelectorAll('#service-dialog-includes>li').length,2);
   assert.equal(doc.querySelectorAll('#cms-service-details>p').length,0,'The same text is already shown as bullets');
   assert.match(doc.querySelector('#cms-service-details').textContent,language==='vi'?/Tiếng Việt degree/:/English degree/,'Related document guidance remains visible');
  }
  service.body_en='Application review. Document preparation. A genuinely different explanation follows.';
  renderServiceCms({doc,entries:[service,related],slug:'work',language:'en'});
  assert.equal(doc.querySelector('#cms-service-details>p').textContent,service.body_en);
  service.data.includes_en=[];service.body_en='Application review.';
  renderServiceCms({doc,entries:[service],slug:'work',language:'en'});
  assert.equal(doc.querySelector('#cms-service-details>p').textContent,service.body_en,'Body is retained when no bullets are shown');
 }finally{dom.window.close()}
});
test('adapter keeps queries and publication authority in Agency, carries expected versions, paginates from page one and rejects files before upload',async()=>{
 const calls=[],db={rpc:async(name,args)=>{calls.push({name,args});return {data:{id:'record',version:2},error:null}},from(table){const query={select(){return this},eq(){return this},order(){return this},or(value){calls.push({search:value});return this},async range(from,to){calls.push({table,from,to});return {data:[],count:0,error:null}}};return query}};
 let staff=false;const adapter=createAgencyCmsAdapter({db,isStaff:()=>staff,getUser:()=>({id:'user'})});await assert.rejects(()=>adapter.list({kind:'faq'}),e=>e.code==='42501');assert.equal(calls.length,0);
 staff=true;await adapter.list({kind:'faq',query:'title,(status.eq.published)',page:1,pageSize:20});assert.deepEqual(calls.find(c=>c.table),{table:'gary_cms_entries',from:0,to:19});assert.ok(!calls.find(c=>c.search).search.includes('('));
 await adapter.save({id:'record',kind:'faq',version:1},{expectedVersion:1});assert.equal(calls.at(-1).name,'gary_cms_save');assert.equal(calls.at(-1).args.p_expected_version,1);
 await adapter.transition('record','published',{expectedVersion:2});assert.deepEqual(calls.at(-1).args,{p_id:'record',p_status:'published',p_expected_version:2});
 await assert.rejects(()=>adapter.uploadMedia({type:'image/svg+xml',size:128,name:'active.svg'}),e=>e.code==='23514');assert.equal(adapter.mediaPolicy.maxBytes,5242880);
});
test('workspace refuses unverified staff and explains missing setup in Vietnamese without fabricating persistence',async()=>{
 const dom=new JSDOM('<section id="cms-view"><div id="cms-root"></div></section>');let allowed=false,calls=0;
 const db={async rpc(){calls++;return {error:{code:'PGRST202'}}}};
 const workspace=createAgencyCms({doc:dom.window.document,db,isStaff:()=>allowed,getUser:()=>({id:'staff'}),getLanguage:()=> 'vi'});
 try{await workspace.enter();assert.equal(calls,0);allowed=true;await workspace.enter();assert.match(dom.window.document.querySelector('#cms-root').textContent,/hoàn tất thiết lập/);assert.equal(calls,1);workspace.reset();assert.equal(dom.window.document.querySelector('#cms-root').children.length,0)}finally{dom.window.close()}
});

test('agency media adapter reserves before upload and reconciles a retried removal',async()=>{
 const calls=[];
 let removalError=true;
 const stored={id:'media-id',file_name:'cover.png',mime_type:'image/png',size_bytes:3,alt_en:'Cover',alt_vi:'Ảnh bìa'};
 const db={
  async rpc(name,args){
   calls.push(name);
   if(name==='gary_cms_reserve_media') {
    assert.equal(args.p_public_confirmed,true);
    assert.equal(args.p_caption_vi,'Chú thích');
    stored.object_path=args.p_path;
   }
   if(name==='gary_cms_confirm_media_removal')return {data:true};
   return {data:stored};
  },
  storage:{from(bucket){
   assert.equal(bucket,'gary-cms-media');
   return {
    async upload(path,file,options){assert.equal(path,stored.object_path);assert.equal(options.upsert,false);calls.push('Storage upload');return {data:{path}};},
    async remove(paths){assert.deepEqual(paths,[stored.object_path]);calls.push('Storage remove');return removalError?{error:new Error('timeout')}:{data:[]};}
   };
  }}
 };
 const adapter=createAgencyCmsAdapter({db,isStaff:()=>true,getUser:()=>({id:'20000000-0000-4000-8000-000000000001'})});
 await adapter.uploadMedia({name:'cover.png',size:3,type:'image/png'},{alt_en:'Cover',alt_vi:'Ảnh bìa',caption_vi:'Chú thích',publicConfirmed:true});
 assert.deepEqual(calls,['gary_cms_reserve_media','Storage upload','gary_cms_register_media']);
 await assert.rejects(()=>adapter.removeMedia(stored.id),/CMS_MEDIA_PENDING/);
 assert.equal(calls.includes('gary_cms_confirm_media_removal'),false);
 removalError=false;
 await adapter.removeMedia(stored.id);
 assert.deepEqual(calls.slice(-3),['gary_cms_prepare_media_removal','Storage remove','gary_cms_confirm_media_removal']);
});

test('article editor previews and replaces covers; media metadata is bilingual and Publisher controls stay read-only',async()=>{
 const {window}=new JSDOM('<div id="cms"></div>',{url:'https://visa.garyhome.vn/'});
 bindFeedbackDom(window);
 const root=window.document.getElementById('cms');
 window.confirm=()=>true;
 const base='https://duyiihsmaqfgwezmsnjs.supabase.co/storage/v1/object/public/gary-cms-media/80000000-0000-4000-8000-000000000008/';
 const makeItem=(number)=>({id:String(number),file_name:`cover-${number}.png`,mime_type:'image/png',owned:true,state:'ready',version:2,alt_en:'Cover',alt_vi:'Ảnh bìa',
  caption_en:'English caption',caption_vi:'Chú thích ảnh',url:base+`11111111-1111-4111-8111-11111111111${number}.png`});
 let media=[makeItem(1),makeItem(2)],role='editor';
 let article=entry('article','work-guide',{version:4,status:'published',data:{image_url:media[0].url}});
 const writes=[];
 const adapter={
  mediaPolicy:{publicImages:true,mimeTypes:['image/png'],maxBytes:5242880},
  capabilities:async()=>({role,read:true,edit:role==='editor',media:role==='editor',publish:role==='publisher'}),
  list:async()=>({records:[article],total:1}),listMedia:async()=>media,coverUrl:publicCmsImage,
  save:async record=>{article={...record,version:record.version+1,status:'draft'};writes.push(article);return article;},
  uploadMedia:async(file,metadata)=>writes.push({file,metadata}),
  updateMedia:async(id,metadata)=>writes.push({id,metadata}),
  removeMedia:async id=>{media=media.filter(item=>item.id!==id);}
 };
 const cms=mountCms(root,{adapter,collections:agencyCollections.filter(item=>item.kind==='article'),language:'vi'});
 const settle=()=>new Promise(resolve=>setImmediate(resolve));
 const select=selector=>root.querySelector(selector);
 const submit=selector=>select(selector).dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));
 try{
  await cms.ready;
  select('[data-action=edit]').click();await settle();
  assert.equal(select('[data-field=slug]').disabled,true);
  assert.equal(select('[data-cover-preview] img').alt,'Ảnh bìa');
  const chooser=select('[data-cover-select]');
  chooser.value=media[1].url;
  chooser.dispatchEvent(new window.Event('change',{bubbles:true}));
  assert.equal(select('[data-cover-preview] img').src,media[1].url);
  submit('[data-cms-editor]');await settle();
  assert.equal(writes[0].data.image_url,media[1].url);
  select('[data-action=remove-cover]').click();
  assert.equal(select('[data-cover-preview] img'),null);
  submit('[data-cms-editor]');await settle();
  assert.equal(writes[1].data.image_url,'');
  select('[data-action=close]').click();await settle();
  select('[data-action=media]').click();await settle();
  const editing=select('[data-cms-media-metadata]');
  editing.elements.caption_en.value='Updated English';
  editing.elements.caption_vi.value='Đã cập nhật';
  submit('[data-cms-media-metadata]');await settle();
  assert.deepEqual(writes[2],{id:'1',metadata:{alt_en:'Cover',alt_vi:'Ảnh bìa',caption_en:'Updated English',caption_vi:'Đã cập nhật',version:2}});
  const upload=select('[data-cms-upload]');
  Object.defineProperty(upload.elements.file,'files',{value:[new window.File(['png'],'new.png',{type:'image/png'})]});
  upload.elements.alt_en.value='New image';upload.elements.alt_vi.value='Ảnh mới';
  submit('[data-cms-upload]');await settle();
  assert.equal(writes.length,3);
  upload.elements.public_approval.checked=true;
  submit('[data-cms-upload]');await settle();
  assert.equal(writes[3].metadata.publicConfirmed,true);
  select('[data-action=remove-media]').click();await settle();
  assert.equal(select('.cms-media-grid').children.length,1);
  role='publisher';await cms.refresh();
  assert.equal(select('[data-cms-upload]'),null);
  assert.equal(select('[data-action=remove-media]'),null);
  assert.equal(select('[data-cms-media-metadata]'),null);
  select('[data-action=collection]').click();await settle();
  select('[data-action=edit]').click();
  assert.equal(select('[data-field=title_en]').disabled,true);
  assert.equal(select('[data-cover-select]'),null);
  assert.ok(select('[data-action=publish]'));
 }finally{cms.destroy({force:true});window.close();}
});
