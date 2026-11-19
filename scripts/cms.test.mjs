import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {loadPublishedCms,renderPublicCms,renderServiceCms,cmsCopyOverrides} from '../dist/cms-public.js';
import {createAgencyCmsAdapter} from '../dist/cms.js';
import {createAgencyCms} from '../dist/cms-workspace.js';
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
