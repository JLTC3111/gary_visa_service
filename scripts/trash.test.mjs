import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {createTrash} from '../dist/trash.js';
import {portalCopy} from '../dist/portal-copy.js';

const flush=async()=>{for(let i=0;i<10;i++)await new Promise(resolve=>setImmediate(resolve));};
const record=(index,category='case')=>({id:'record-'+index,category,kind:category==='article'?'cms':category,
 title_en:index===0?'<img src=x>':'Record '+index,title_vi:'Hồ sơ '+index,version:category==='cms'||category==='article'?8:null,
 deleted_at:'2026-11-16T06:00:00Z',deleted_by_name:'Fixture administrator',previous_status:category==='case'?'processing':category==='contact'?'lead':'published'});
async function setup({rows=[record(0),record(1,'contact'),record(2,'cms')],rpc,storage,staff=true,kinds}={}){
 const dom=new JSDOM(await readFile(new URL('../dist/portal.html',import.meta.url),'utf8'),{url:'https://visa.garyhome.vn/portal.html'}),doc=dom.window.document,calls=[],notices=[];let allowed=staff;
 const db={storage,rpc:async(name,args)=>{
  calls.push({name,args});const result=await rpc?.(name,args);if(result)return result;
  if(name==='gary_trash_directory'){
   const selected=rows.filter(row=>(!args.p_category||row.category===args.p_category)&&(!args.p_status||row.previous_status===args.p_status)
    &&(row.title_en+' '+row.title_vi).toLowerCase().includes(args.p_search.toLowerCase()));
   return {data:{records:structuredClone(selected.slice(args.p_offset,args.p_offset+args.p_limit)),total:selected.length}};
  }
  if(name==='gary_restore_record'){
   const index=rows.findIndex(row=>row.id===args.p_id);rows.splice(index,1);
   return {data:{id:args.p_id,kind:args.p_kind,deleted_at:null}};
  }
  throw new Error(name);
 }};
 const controller=createTrash({db,doc,t:key=>portalCopy[doc.documentElement.lang]?.[key]||portalCopy.en[key]||key,isStaff:()=>allowed,kinds,notify:key=>notices.push(key)});
 return {dom,doc,calls,notices,controller,setStaff(value){allowed=value},close(){controller.reset();dom.window.close()}};
}

test('Trash renders safe record names, restores CMS with expected version and translates labels',async()=>{
 const h=await setup();try{
  await h.controller.enter();assert.equal(h.doc.querySelectorAll('.trash-record').length,3);assert.equal(h.doc.querySelector('#trash-list img'),null);
  assert.match(h.doc.querySelector('#trash-list').textContent,/<img src=x/);
  h.doc.querySelectorAll('.trash-restore')[2].click();await flush();
  assert.deepEqual(h.calls.find(call=>call.name==='gary_restore_record').args,{p_kind:'cms',p_id:'record-2',p_expected_version:8});
  assert.equal(h.doc.querySelectorAll('.trash-record').length,2);assert.deepEqual(h.notices,['recordRestored']);
  h.doc.documentElement.lang='vi';h.controller.render();assert.match(h.doc.querySelector('#trash-list').textContent,/Hồ sơ visa/);assert.equal(h.doc.querySelector('.trash-restore').textContent,'Khôi phục');
 }finally{h.close()}
});

test('Trash filters and pages server results, using null expected version for contact restore',async()=>{
 const h=await setup({rows:Array.from({length:25},(_,i)=>record(i,i<22?'contact':'case'))});try{
  await h.controller.enter();assert.equal(h.doc.querySelectorAll('.trash-record').length,20);
  h.doc.querySelector('#trash-next').click();await flush();assert.equal(h.calls.at(-1).args.p_offset,20);assert.equal(h.doc.querySelectorAll('.trash-record').length,5);
  h.doc.querySelector('#trash-tab-contact').click();await flush();
  assert.deepEqual(h.calls.at(-1).args,{p_category:'contact',p_search:'',p_status:'',p_offset:0,p_limit:20});
  h.doc.querySelector('.trash-restore').click();await flush();assert.equal(h.calls.find(call=>call.name==='gary_restore_record').args.p_expected_version,null);
 }finally{h.close()}
});

test('Trash tabs follow role scope and filter News by status and localized title',async()=>{
 const h=await setup({rows:[record(0),record(1,'cms'),record(2,'article'),record(3,'article')],kinds:()=>['article','cms']});
 try{
  h.doc.documentElement.lang='vi';await h.controller.enter();
  assert.equal(h.doc.querySelector('#trash-tab-case').hidden,true);
  const tab=h.doc.querySelector('#trash-tab-article');
  h.doc.querySelector('#trash-tab-all').dispatchEvent(new h.dom.window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));await flush();
  assert.equal(tab.getAttribute('aria-selected'),'true');
  assert.equal(h.doc.querySelector('#trash-results').getAttribute('aria-labelledby'),tab.id);
  h.doc.querySelector('#trash-search').value=' Hồ sơ 2 ';
  h.doc.querySelector('#trash-status-filter').value='published';
  h.doc.querySelector('#trash-search-form').dispatchEvent(new h.dom.window.Event('submit',{cancelable:true}));await flush();
  assert.deepEqual(h.calls.at(-1).args,{p_category:'article',p_search:'Hồ sơ 2',p_status:'published',p_offset:0,p_limit:20});
  assert.equal(h.doc.querySelectorAll('.trash-record').length,1);
  assert.match(h.doc.querySelector('#trash-list').textContent,/Hồ sơ 2.*Fixture administrator.*Đã xuất bản/s);
 }finally{h.close()}
});

test('permanent deletion keeps a failed case in Trash until Storage and the backend confirm removal',async()=>{
 const item=record(1),rows=[item,record(2,'article')],path=item.id+'/fixture/passport.pdf';
 let fail=true,stored=true,storageCalls=0,confirmations=0;
 const h=await setup({rows,storage:{from(bucket){
  assert.equal(bucket,'gary-documents');return {async remove(paths){
   assert.deepEqual(paths,[path]);storageCalls++;
   if(fail)return {error:{message:'Storage unavailable'}};
   stored=false;return {data:paths};
  }};
 }},rpc:async(name,args)=>{
  if(name!=='gary_permanently_delete_trash')return;
  assert.deepEqual(args,{p_kind:'case',p_id:item.id,p_deleted_at:item.deleted_at,p_confirmed:true});confirmations++;
  if(stored)return {data:{id:item.id,deleted:false,paths:[path]}};
  rows.splice(0,1);return {data:{id:item.id,deleted:true}};
 }});
 try{
  await h.controller.enter();h.dom.window.confirm=()=>false;
  h.doc.querySelector('.trash-permanent').click();await flush();assert.equal(confirmations,0);
  h.dom.window.confirm=()=>true;h.doc.querySelector('.trash-permanent').click();await flush();
  assert.equal(confirmations,1);assert.equal(storageCalls,1);assert.deepEqual(h.notices,[]);
  assert.equal(h.doc.querySelectorAll('.trash-record').length,2);
  assert.equal(h.doc.querySelector('.trash-restore').disabled,true);
  assert.match(h.doc.querySelector('#trash-notice').textContent,/could not be confirmed/);
  fail=false;h.doc.querySelector('.trash-permanent').click();await flush();
  assert.equal(confirmations,3);assert.equal(storageCalls,2);
  assert.deepEqual(h.notices,['recordPermanentlyDeleted']);
  assert.equal(h.doc.querySelectorAll('.trash-record').length,1);
  assert.match(h.doc.querySelector('#trash-list').textContent,/Record 2/);
 }finally{h.close()}
});

test('a Storage success response alone cannot remove a case from Trash',async()=>{
 const item=record(1);let storageCalls=0,checks=0;
 const h=await setup({rows:[item],storage:{from:()=>({remove:async()=>{storageCalls++;return {data:[]};}})},
  rpc:async name=>{
   if(name!=='gary_permanently_delete_trash')return;
   checks++;return {data:{id:item.id,deleted:false,paths:[item.id+'/fixture/still-present.pdf']}};
  }
 });
 try{
  await h.controller.enter();h.dom.window.confirm=()=>true;h.doc.querySelector('.trash-permanent').click();await flush();
  assert.equal(storageCalls,1);assert.equal(checks,2);assert.deepEqual(h.notices,[]);
  assert.equal(h.doc.querySelectorAll('.trash-record').length,1);
  assert.match(h.doc.querySelector('#trash-notice').textContent,/could not be confirmed/);
 }finally{h.close()}
});

test('CMS Admin can purge an eligible article while a held article stays available for restore',async()=>{
 const article=record(2,'article'),held={...record(3,'article'),purge_blocker:'AGENCY_PURGE_HOLD'},rows=[article,held];
 const h=await setup({rows,kinds:()=>['article','cms'],rpc:async(name,args)=>{
  if(name!=='gary_permanently_delete_trash')return;
  assert.deepEqual(args,{p_kind:'article',p_id:article.id,p_deleted_at:article.deleted_at,p_confirmed:true});
  rows.shift();return {data:{id:article.id,deleted:true}};
 }});
 try{
  await h.controller.enter();h.dom.window.confirm=()=>true;
  const actions=h.doc.querySelectorAll('.trash-permanent');
  assert.equal(actions[1].disabled,true);
  assert.equal(h.doc.querySelectorAll('.trash-restore')[1].disabled,false);
  actions[0].click();await flush();
  assert.deepEqual(h.notices,['recordPermanentlyDeleted']);
  assert.equal(h.doc.querySelectorAll('.trash-record').length,1);
  assert.match(h.doc.querySelector('#trash-list').textContent,/Record 3.*retention hold/s);
 }finally{h.close()}
});

test('Trash makes no calls for customer sessions or hidden restore actions',async()=>{
 const h=await setup({staff:false});try{await h.controller.enter();h.doc.querySelector('#refresh-trash').click();await flush();assert.equal(h.calls.length,0);assert.equal(h.doc.querySelectorAll('.trash-record').length,0);}finally{h.close()}
});

test('Trash initialization failure offers an honest unavailable state and refresh recovery',async()=>{
 let fail=true;const h=await setup({rpc:async()=>fail?{error:{message:'Offline'}}:{data:{records:[],total:0}}});try{
  await h.controller.enter();assert.match(h.doc.querySelector('#trash-list').textContent,/could not be loaded/);assert.match(h.doc.querySelector('#trash-notice').textContent,/Refresh/);assert.equal(h.doc.querySelector('#refresh-trash').disabled,false);
  fail=false;h.doc.querySelector('#refresh-trash').click();await flush();assert.match(h.doc.querySelector('#trash-list').textContent,/Trash is empty/);assert.equal(h.doc.querySelector('#trash-notice').textContent,'');
 }finally{h.close()}
});

test('failed restoration preserves the record and re-enables its action',async()=>{
 const h=await setup({rpc:async name=>name==='gary_restore_record'?{error:{code:'42501'}}:{data:{records:[record(1,'contact')],total:1}}});try{
  await h.controller.enter();h.doc.querySelector('.trash-restore').click();await flush();assert.equal(h.doc.querySelectorAll('.trash-record').length,1);assert.equal(h.doc.querySelector('.trash-restore').disabled,false);assert.match(h.doc.querySelector('#trash-notice').textContent,/cannot make that change/);
 }finally{h.close()}
});

test('sign-out reset ignores delayed Trash results and clears private rows',async()=>{
 let finish;const h=await setup({rpc:()=>new Promise(resolve=>{finish=resolve})});try{
  const pending=h.controller.enter();h.setStaff(false);h.controller.reset();finish({data:{records:[record(1)],total:1}});await pending;
  assert.equal(h.doc.querySelector('#trash-list').textContent,'');assert.equal(h.doc.querySelector('#trash-page-summary').textContent,'');assert.equal(h.doc.querySelector('#trash-notice').textContent,'');
 }finally{h.close()}
});
