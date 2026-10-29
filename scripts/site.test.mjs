import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import {portalCopy} from '../dist/portal-copy.js';
import {createCRM} from '../dist/crm.js';
import {createInbox} from '../dist/inbox.js';
const tick=()=>new Promise(resolve=>setImmediate(resolve));
async function flush(){for(let i=0;i<8;i++)await tick()}
function environment(html,url='http://localhost:4173/'){
 const dom=new JSDOM(html,{url,runScripts:'outside-only',pretendToBeVisual:true});const {window}=dom;
 window.matchMedia=()=>({matches:false,addEventListener(){}});window.HTMLElement.prototype.scrollIntoView=function(){};
 window.HTMLDialogElement.prototype.showModal=function(){this.open=true};window.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new window.Event('close'))};return dom;
}
test('Public site filters, translates, recommends services and safely prepares enquiries',async()=>{
 const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');const dom=environment(html);const w=dom.window,doc=w.document;
 const bundle=await build({entryPoints:['dist/app.js'],bundle:true,write:false,format:'iife',platform:'browser'});w.eval(bundle.outputFiles[0].text);
 doc.querySelector('[data-filter=settle]').click();assert.equal(doc.querySelectorAll('.service-card:not([hidden])').length,2);assert.ok(doc.querySelector('.service-card[data-service=visa]').hidden);
 doc.querySelector('[data-lang=vi]').click();assert.equal(doc.documentElement.lang,'vi');assert.equal(doc.querySelector('#hero-title span').textContent,'Bớt lo thủ tục.');assert.equal(doc.querySelector('#enquiry-name').placeholder,'Chúng tôi nên gọi bạn là gì?');
 doc.querySelector('#finder-goal').value='work';doc.querySelector('#finder-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert.ok(!doc.querySelector('#finder-result').hidden);doc.querySelector('#finder-result button').click();assert.equal(doc.querySelector('#service-dialog-title').textContent,'Giấy phép lao động');assert.ok(doc.querySelector('#service-dialog').open);
 doc.querySelector('#service-enquire').click();assert.equal(doc.querySelector('#enquiry-service').value,'work');assert.equal(doc.querySelector('#service-dialog').open,false);
 doc.querySelector('[data-lang=en]').click();doc.querySelector('#enquiry-name').value='Alex';doc.querySelector('#enquiry-message').value='<img src=x onerror=alert(1)> & a question';doc.querySelector('#enquiry-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert.ok(doc.querySelector('#enquiry-dialog').open);assert.match(doc.querySelector('#enquiry-preview').textContent,/My name is Alex/);assert.equal(doc.querySelector('#enquiry-preview img'),null,'enquiry content never becomes HTML');
 let copied='';Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async text=>{copied=text}}});doc.querySelector('#copy-enquiry').click();await flush();assert.match(copied,/Work permits/);assert.match(doc.querySelector('#copy-status').textContent,/copied/);
 doc.querySelector('[data-close-dialog=enquiry-dialog]').click();assert.equal(doc.body.classList.contains('dialog-open'),false);
 doc.querySelector('#menu-toggle').click();assert.equal(doc.querySelector('#menu-toggle').getAttribute('aria-expanded'),'true');doc.querySelector('#mobile-nav a').click();assert.equal(doc.querySelector('#menu-toggle').getAttribute('aria-expanded'),'false');
 dom.window.close();
});

async function portalEnvironment(role='customer',url='http://localhost:4173/portal.html'){
 const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');const dom=environment(html,url);const w=dom.window;const calls=[];const profile={id:'customer-id',full_name:'Alex Customer',contact_email:'alex@example.test',phone:'',nationality:'',preferred_language:'en'};
 const application={id:'12345678-0000-4000-8000-000000000001',customer_id:'customer-id',service:'visa',subject:'A real service request',details:'Customer plans',status:'submitted',created_at:'2026-10-20T10:00:00Z',updated_at:'2026-10-20T10:00:00Z',assigned_staff_id:null};
 class Query{
  constructor(table){this.table=table;this.operation='select';this.singleRow=false;this.options={}}
  select(columns,options){this.options=options??{};return this}eq(){return this}in(){return this}ilike(){return this}order(){return this}range(){return this}limit(){return this}single(){this.singleRow=true;return this}maybeSingle(){this.singleRow=true;return this}
  insert(values){this.operation='insert';this.values=values;calls.push({table:this.table,operation:'insert',values});return this}update(values){this.operation='update';this.values=values;calls.push({table:this.table,operation:'update',values});return this}
  then(resolve,reject){let data=[];if(this.table==='gary_applications')data=this.singleRow?{...application,...this.values}:[application];if(this.table==='gary_profiles')data=this.singleRow?profile:[profile];if(this.table==='gary_application_events')data=[{id:'event-1',status:'submitted',created_at:application.created_at}];return Promise.resolve({data:this.options.head?null:data,error:null,count:this.table==='gary_applications'?1:0}).then(resolve,reject)}
 }
 const auth={getSession:async()=>({data:{session:null},error:null}),onAuthStateChange:()=>{},getUser:async()=>({data:{user:{id:'customer-id',email:'alex@example.test',user_metadata:{full_name:'Alex Customer'}}},error:null}),signInWithPassword:async values=>{calls.push({operation:'signin',values});return {data:{session:{}},error:null}},signUp:async values=>{calls.push({operation:'signup',values});return {data:{session:null},error:null}},signOut:async()=>({error:null})};
 w.__backend={db:{auth,rpc:async name=>({data:name==='gary_staff_directory'?[]:role,error:null}),from:table=>new Query(table)},unwrap:result=>{if(result.error)throw result.error;return result.data},ensureProfile:async()=>profile,EDITABLE_STATUSES:['submitted','documents_needed'],validateDocument:()=>{},documentPath:()=>'',authRedirect:()=>url,config:{supabaseUrl:'https://example.supabase.co'},portalCopy,createCRM,createInbox};
 let source=await readFile(new URL('../dist/portal.js',import.meta.url),'utf8');source=source.replace(/^import .*;\n/gm,'');await w.eval(`(async()=>{const {db,unwrap,ensureProfile,EDITABLE_STATUSES,validateDocument,documentPath,authRedirect,config,portalCopy,createCRM,createInbox}=globalThis.__backend;${source}\n})()`);
 return {dom,w,doc:w.document,calls,application};
}
test('Customer signup never accepts a staff role and explains email confirmation',async()=>{
 const {dom,w,doc,calls}=await portalEnvironment();doc.querySelector('#signup-toggle').click();doc.querySelector('#auth-name').value='Alex Customer';doc.querySelector('#auth-email').value='alex@example.test';doc.querySelector('#auth-password').value='Asecurepassword123';doc.querySelector('#auth-form').dispatchEvent(new w.Event('submit',{cancelable:true}));await flush();const call=calls.find(call=>call.operation==='signup');assert.ok(call);assert.deepEqual(Object.keys(call.values.options.data),['full_name']);assert.match(doc.querySelector('#auth-notice').textContent,/confirm your account/);assert.equal(doc.querySelector('#auth-password').value,'');dom.window.close();
});
test('Customer portal shows only customer controls and submits a minimal application payload',async()=>{
 const {dom,w,doc,calls}=await portalEnvironment();doc.querySelector('#auth-email').value='alex@example.test';doc.querySelector('#auth-password').value='Asecurepassword123';doc.querySelector('#auth-form').dispatchEvent(new w.Event('submit',{cancelable:true}));await flush();assert.equal(doc.querySelector('#workspace').hidden,false);assert.equal(doc.querySelector('#customers-nav').hidden,true);assert.equal(doc.querySelector('#new-application').hidden,false);assert.equal(doc.querySelector('#user-display-name').textContent,'Alex Customer');doc.querySelector('#new-application').click();doc.querySelector('#request-service').value='work';doc.querySelector('#request-subject').value='My work permit';doc.querySelector('#request-details').value='A new teaching position';doc.querySelector('#request-form').dispatchEvent(new w.Event('submit',{cancelable:true}));await flush();const call=calls.find(call=>call.table==='gary_applications'&&call.operation==='insert');assert.ok(call);assert.deepEqual(Object.keys(call.values).sort(),['details','service','subject']);assert.equal(doc.querySelector('#tab-notes').hidden,true);assert.equal(doc.querySelector('#staff-status-form').hidden,true);doc.querySelector('[data-language=vi]').click();assert.equal(doc.documentElement.lang,'vi');assert.equal(doc.querySelector('#dashboard-title').textContent,'Hồ sơ của bạn');doc.querySelector('#signout').click();await flush();assert.equal(doc.querySelector('#workspace').hidden,true);assert.equal(doc.querySelector('#applications-list').children.length,0);assert.equal(doc.querySelector('#case-title').textContent,'');dom.window.close();
});
test('Gary Apps header menu links the three sites in both languages',async()=>{
 const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');const dom=environment(html);const w=dom.window,doc=w.document;
 const app=await build({entryPoints:['dist/app.js'],bundle:true,write:false,format:'iife',platform:'browser'});
 const apps=await build({entryPoints:['dist/gary-apps.js'],bundle:true,write:false,format:'iife',platform:'browser'});
 w.eval(app.outputFiles[0].text);w.eval(apps.outputFiles[0].text);
 const menu=doc.querySelector('.header .gary-apps-menu--header');const summary=menu.querySelector('summary');
 assert.equal(summary.querySelector('[data-gary=label]').textContent,'Other Services');
 assert.equal(menu.querySelector('.gary-app-home').getAttribute('href'),'https://garyhome.vn/');
 assert.equal(menu.querySelector('.gary-app-jobs').getAttribute('href'),'https://jobs.garyhome.vn/');
 assert.equal(menu.querySelector('.gary-app-visa').getAttribute('href'),'./index.html');
 assert.equal(menu.querySelector('.gary-app-visa').hasAttribute('target'),false);
 assert.equal(menu.querySelector('.gary-app-home').target,'_blank');assert.match(menu.querySelector('.gary-app-home').rel,/noopener/);
 assert.equal(menu.querySelector('.gary-apps-menu-travel a').getAttribute('href'),'https://jobs.garyhome.vn/#life');
 assert.equal(menu.querySelector('.gary-apps-menu-all').getAttribute('href'),'https://garyhome.vn/services#gary-services');
 assert.equal(menu.querySelector('.gary-app-visa small').textContent,'This site');
 assert.ok(summary.querySelector('svg').childElementCount>0);assert.notEqual(menu.querySelector('nav').id,doc.querySelector('.mobile-app-services nav').id);
 summary.click();await flush();assert.equal(menu.open,true);assert.equal(summary.getAttribute('aria-expanded'),'true');
 doc.querySelector('[data-lang=vi]').click();
 assert.equal(menu.open,true,'language changes keep the menu open');
 assert.equal(summary.querySelector('[data-gary=label]').textContent,'Dịch Vụ Khác');
 assert.equal(summary.getAttribute('aria-label'),'Khám phá các trang và dịch vụ Gary');
 assert.equal(menu.querySelector('.gary-app-visa small').textContent,'Trang hiện tại');
 assert.equal(doc.querySelector('.mobile-app-services [data-gary=label]').textContent,'Dịch Vụ Khác');
 summary.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));await flush();
 assert.equal(doc.activeElement,menu.querySelector('.gary-app-home'));
 menu.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 assert.equal(menu.open,false);assert.equal(doc.activeElement,summary);
 summary.click();await flush();doc.body.dispatchEvent(new w.Event('pointerdown',{bubbles:true}));
 assert.equal(menu.open,false);
 const portalHtml=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');const portalDom=environment(portalHtml);const portalWindow=portalDom.window,portalDoc=portalWindow.document;const portalApps=await build({entryPoints:['dist/gary-apps.js'],bundle:true,write:false,format:'iife',platform:'browser'});
 portalWindow.eval(portalApps.outputFiles[0].text);portalDoc.documentElement.lang='vi';portalDoc.dispatchEvent(new portalWindow.CustomEvent('gary:language'));
 assert.equal(portalDoc.querySelector('.portal-header [data-gary=label]').textContent,'Dịch Vụ Khác');
 assert.equal(portalDoc.querySelector('.gary-app-visa').getAttribute('href'),'./index.html');
 dom.window.close();portalWindow.close();
});
test('Staff portal requires a server-confirmed staff role',async()=>{
 const customer=await portalEnvironment('customer','http://localhost:4173/portal.html?area=staff');customer.doc.querySelector('#auth-email').value='alex@example.test';customer.doc.querySelector('#auth-password').value='Asecurepassword123';customer.doc.querySelector('#auth-form').dispatchEvent(new customer.w.Event('submit',{cancelable:true}));await flush();assert.equal(customer.doc.querySelector('#workspace').hidden,true);assert.match(customer.doc.querySelector('#auth-notice').textContent,/does not have staff access/);customer.dom.window.close();
 const staff=await portalEnvironment('staff','http://localhost:4173/portal.html?area=staff');staff.doc.querySelector('#auth-email').value='staff@example.test';staff.doc.querySelector('#auth-password').value='Asecurepassword123';staff.doc.querySelector('#auth-form').dispatchEvent(new staff.w.Event('submit',{cancelable:true}));await flush();assert.equal(staff.doc.querySelector('#workspace').hidden,false);assert.equal(staff.doc.querySelector('#customers-nav').hidden,false);assert.equal(staff.doc.querySelector('#new-application').hidden,true);staff.doc.querySelector('[data-case]').click();await flush();assert.equal(staff.doc.querySelector('#tab-notes').hidden,false);assert.equal(staff.doc.querySelector('#staff-status-form').hidden,false);staff.dom.window.close();
});
