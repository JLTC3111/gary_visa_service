import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import {portalCopy} from '../dist/portal-copy.js';
import {mountStaffSidebar} from '../dist/staff-sidebar.js';
import {createProfileAvatar} from '../dist/profile-avatar.js';
const source=await readFile(new URL('../dist/portal.js',import.meta.url),'utf8');
const monitor=source.slice(source.indexOf('// Refresh permissions'),source.indexOf('function renderIdentity'));
const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');
const pause=()=>new Promise(r=>setTimeout(r,15));
async function harness(){
 const dom=new JSDOM(html,{url:'https://visa.garyhome.vn/portal.html',runScripts:'outside-only'}),w=dom.window,doc=w.document;
 const privatePane=doc.createElement('div');
 privatePane.id='private';privatePane.textContent='unsaved content';doc.body.append(privatePane);
 const user={id:'staff',email:'signin@example.test'},profile={full_name:'Thảo Nguyễn',contact_email:'contact@example.test'};
 let next={member:true,operations:null,cms:'editor'},identity={data:{user}};
 const calls={reset:0,load:0,rpc:0};
 w.state={user,profile,role:'staff',access:{operations:null,cms:'editor'},generation:1,recovery:false,loading:false};
 w.$=selector=>doc.querySelector(selector);
 w.t=key=>portalCopy[doc.documentElement.lang]?.[key]??portalCopy.en[key]??(key==='myProfile'?'My profile':key);
 w.profileAvatar=createProfileAvatar({
  db:{storage:{from:()=>({})}},doc,t:w.t,name:()=>w.state.profile?.full_name||'G',notify:()=>{}
 });
 w.element=(tag,attrs,text)=>{const el=doc.createElement(tag);for(const [name,value] of Object.entries(attrs))el.setAttribute(name,value);el.textContent=text;return el};
 w.staff=()=>w.state.role==='staff';w.operationsRole=()=>w.state.access?.operations;w.cmsRole=()=>w.state.access?.cms;
 w.feedback=()=>{};w.toast=()=>{};w.setView=view=>{w.state.view=view;w.$('#workspace').hidden=false;w.$('#profile-view').hidden=view!=='profile'};
 w.db={auth:{getUser:async()=>identity},rpc:async()=>{calls.rpc++;return {data:next}}};w.unwrap=r=>{if(r.error)throw r.error;return r.data};
 w.resetWorkspace=()=>{calls.reset++;w.state.generation++;w.state.user=null;w.state.role=null;w.state.access=null;w.state.profile=null;privatePane.replaceChildren();w.renderAccountIdentity()};
 w.loadWorkspace=async(view)=>{calls.load++;w.state.generation++;w.state.user=identity.data?.user;w.state.role=next.member?'staff':'customer';w.state.access=next;w.state.profile=profile;w.renderAccountIdentity();if(view)w.setView(view)};
 vm.runInContext(monitor,dom.getInternalVMContext());
 return {w,calls,close:()=>w.close(),next:value=>{next=value},identity:value=>{identity=value},fire:name=>w.dispatchEvent(new w.Event(name))};
}
test('Visa focus checks permissions without remounting an unchanged CMS editor',async()=>{
 const h=await harness();try{h.fire('focus');h.fire('pageshow');await pause();assert.equal(h.calls.rpc,1);assert.equal(h.calls.reset,0);assert.equal(h.w.document.querySelector('#private').textContent,'unsaved content')}finally{h.close()}
});
test('Visa revocation clears private state and resolves the remaining customer session',async()=>{
 const h=await harness();try{h.next({member:false,operations:null,cms:null});h.fire('focus');await pause();assert.equal(h.calls.reset,1);assert.equal(h.calls.load,1);assert.equal(h.w.state.role,'customer');assert.equal(h.w.document.querySelector('#private').textContent,'')}finally{h.close()}
});
test('Visa access denial is not lost when focus arrives in the same turn',async()=>{
 const h=await harness();try{h.fire('gary:access-denied');h.fire('focus');await pause();assert.equal(h.calls.reset,1)}finally{h.close()}
});
test('Visa preserves an offline draft but clears it when session validation reports missing Auth session',async()=>{
 const h=await harness();try{h.identity({error:{name:'AuthRetryableFetchError',status:0}});h.fire('focus');await pause();assert.equal(h.calls.reset,0);h.identity({error:{name:'AuthSessionMissingError',status:400}});h.fire('focus');await pause();assert.equal(h.calls.reset,1)}finally{h.close()}
});
test('Visa menu executes only locally shipped code',async()=>{
 const menu=await readFile(new URL('../dist/gary-apps.js',import.meta.url),'utf8');assert.doesNotMatch(menu,/connectGaryApps|import\([^)]*https:|gary-apps-client/);assert.match(menu,/slot\.append\(menu\)/);assert.match(menu,/enhanceGaryApps/);for(const name of ['index.html','portal.html']){const html=await readFile(new URL('../dist/'+name,import.meta.url),'utf8');assert.doesNotMatch(html.match(/script-src[^;]+/)[0],/garyhome\.vn/);}
});

test('Visa hung permission validation times out and releases the refresh guard',async()=>{
 const h=await harness();try{const schedule=h.w.setTimeout.bind(h.w);h.w.setTimeout=(fn,ms,...args)=>schedule(fn,ms===10000?10:ms,...args);h.w.db.auth.getUser=()=>new Promise(()=>{});h.fire('focus');await new Promise(r=>setTimeout(r,30));h.w.db.auth.getUser=async()=>({error:{name:'AuthSessionMissingError',status:400}});h.fire('focus');await pause();assert.equal(h.calls.reset,1)}finally{h.close()}
});


test('Visa identity uses the verified sign-in email and keeps both roles accessible when collapsed',async()=>{
 const h=await harness();
 try{
  const {w}=h,doc=w.document;
  w.state.access={operations:'admin',cms:'admin'};
  w.renderAccountIdentity();
  assert.equal(w.$('#user-display-name').textContent,'Thảo Nguyễn');
  assert.equal(w.$('#user-signin-email').textContent,'signin@example.test');
  assert.deepEqual([...w.$('#user-role-label').children].map(el=>el.textContent),['Operations Admin','CMS Admin']);

  doc.body.dataset.role='staff';
  w.localStorage.setItem('gary-visa:staff-sidebar:v1',JSON.stringify({version:1,collapsed:true}));
  const sidebar=mountStaffSidebar(doc);
  assert.equal(w.$('#workspace').classList.contains('visa-sidebar-collapsed'),true);
  const button=w.$('#sidebar-profile-button');
  assert.match(button.getAttribute('aria-label'),/Thảo Nguyễn · signin@example.test · Operations Admin · CMS Admin/);
  button.click();
  assert.equal(doc.activeElement,w.$('#profile-title'));
  assert.equal(w.$('#profile-view').hidden,false);
  assert.equal(w.$('#account-email').textContent,'signin@example.test');
  doc.documentElement.lang='vi';
  w.renderAccountIdentity();
  assert.deepEqual([...w.$('#profile-account-roles').children].map(el=>el.textContent),['Quản trị Nghiệp vụ','Quản trị CMS']);
  sidebar.destroy();
 }finally{h.close()}
});

test('Visa refresh replaces revoked role badges and keeps the account view open',async()=>{
 const h=await harness();
 try{
  h.w.setView('profile');
  h.w.state.access={operations:'admin',cms:'admin'};
  h.w.renderAccountIdentity();
  h.next({member:true,operations:'manager',cms:null});
  h.fire('focus');
  await pause();
  assert.deepEqual([...h.w.$('#profile-account-roles').children].map(el=>el.textContent),['Operations · Manager','CMS · No Access']);
  assert.equal(h.w.$('#profile-view').hidden,false);
 }finally{h.close()}
});

test('A Team Access rejection rechecks the caller and preserves the form when roles are unchanged',async()=>{
 const h=await harness();
 try{
  h.w.dispatchEvent(new h.w.CustomEvent('gary:access-denied',{detail:{recheckOnly:true}}));
  await pause();
  assert.equal(h.calls.rpc,1);
  assert.equal(h.calls.reset,0);
  assert.equal(h.w.$('#private').textContent,'unsaved content');
 }finally{h.close()}
});
