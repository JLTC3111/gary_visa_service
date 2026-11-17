import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {createTrash} from '../dist/trash.js';
import {portalCopy} from '../dist/portal-copy.js';

const flush=async()=>{for(let i=0;i<10;i++)await new Promise(resolve=>setImmediate(resolve));};
const record=(index,kind='case')=>({id:'record-'+index,kind,title:index===0?'<img src=x onerror=bad()>':'Record '+index,version:kind==='cms'?8:null,deleted_at:'2026-11-16T06:00:00Z'});
async function setup({rows=[record(0),record(1,'contact'),record(2,'cms')],rpc,staff=true}={}){
 const dom=new JSDOM(await readFile(new URL('../dist/portal.html',import.meta.url),'utf8'),{url:'https://visa.garyhome.vn/portal.html'}),doc=dom.window.document,calls=[],notices=[];let allowed=staff;
 const db={rpc:async(name,args)=>{calls.push({name,args});if(rpc)return rpc(name,args);if(name==='gary_list_trash'){const selected=rows.filter(row=>!args.p_kind||row.kind===args.p_kind);return {data:{records:selected.slice(args.p_offset,args.p_offset+args.p_limit),total:selected.length}};}if(name==='gary_restore_record'){const index=rows.findIndex(row=>row.id===args.p_id);rows.splice(index,1);return {data:{id:args.p_id,kind:args.p_kind}};}throw new Error(name)}};
 const controller=createTrash({db,doc,t:key=>portalCopy[doc.documentElement.lang]?.[key]||portalCopy.en[key]||key,isStaff:()=>allowed,notify:key=>notices.push(key)});
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
  const filter=h.doc.querySelector('#trash-kind-filter');filter.value='contact';filter.dispatchEvent(new h.dom.window.Event('change'));await flush();
  assert.deepEqual(h.calls.at(-1).args,{p_kind:'contact',p_offset:0,p_limit:20});
  h.doc.querySelector('.trash-restore').click();await flush();assert.equal(h.calls.find(call=>call.name==='gary_restore_record').args.p_expected_version,null);
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
