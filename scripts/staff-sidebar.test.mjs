import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {JSDOM} from 'jsdom';
import {mountStaffSidebar} from '../dist/staff-sidebar.js';
import {mountPortalEditors} from '../dist/portal-editors.js';
const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');
const portal=await readFile(new URL('../dist/portal.js',import.meta.url),'utf8');
const routing=portal.slice(portal.indexOf('const staff=()=>'),portal.indexOf('const badge='));
const routesFor=access=>Array.from(runInNewContext(routing+'\nVIEWS.filter(viewAllowed)',{state:{role:'staff',access}}));
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function harness({role='staff',width=1440,storage,access}={}){
 const dom=new JSDOM(html,{url:'https://visa.garyhome.vn/portal.html',pretendToBeVisual:true}),w=dom.window,doc=w.document;
 Object.defineProperty(w,'innerWidth',{value:width,writable:true});Object.defineProperty(w,'innerHeight',{value:960,writable:true});
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 if(storage)Object.defineProperty(w,'localStorage',{get:()=>storage});doc.body.dataset.role=role;doc.getElementById('workspace').hidden=false;
 for(const view of ['customers','inbox','cms','news-guides','trash'])doc.querySelector(`[data-view=${view}]`).hidden=role!=='staff';
 const buttons=[...doc.querySelectorAll('.workspace-nav [data-view]')];
 if(access){const routes=routesFor(access);for(const button of buttons)button.hidden=!routes.includes(button.dataset.view);}
 const controller=mountStaffSidebar(doc);
 const route=view=>{
  doc.body.dataset.visaView=view;
  for(const panel of doc.querySelectorAll('.workspace-content > section'))panel.hidden=panel.id!==view+'-view';
  for(const button of buttons)button.classList.toggle('active',button.dataset.view===view);
 };
 const pointer=(node,type,x)=>{const event=new w.MouseEvent(type,{button:0,clientX:x,bubbles:true,cancelable:true});Object.defineProperty(event,'pointerId',{value:2});node.dispatchEvent(event);};
 const key=(value,shiftKey=false)=>doc.querySelector('[data-visa-sidebar-resize]').dispatchEvent(new w.KeyboardEvent('keydown',{key:value,shiftKey,bubbles:true,cancelable:true}));
 return{dom,w,doc,buttons,controller,pointer,key,route,trigger:doc.getElementById('visa-mobile-nav-trigger'),close(){controller.destroy();dom.window.close();}};
}
test('Visa staff groups retain original destination nodes, listeners, permissions and active state',async()=>{
 const h=harness();try{
  assert.deepEqual([...h.doc.querySelectorAll('[data-visa-nav-group]')].map(node=>node.dataset.visaNavGroup),['operations','content','administration']);
  const administration=h.doc.querySelector('[data-visa-nav-group=administration]');
  assert.equal(administration.hidden,false,'My Profile keeps Administration visible');
  assert.deepEqual([...administration.querySelectorAll('[data-view]')].map(button=>button.dataset.view),['staff-access','profile']);
  assert.deepEqual([...administration.querySelectorAll('[data-view]:not([hidden])')].map(button=>button.dataset.view),['profile']);
  assert.equal(h.doc.querySelectorAll('.workspace-nav [data-view]').length,8);for(const button of h.buttons)assert.equal(h.doc.querySelector(`[data-view=${button.dataset.view}]`),button);
  let clicks=0;const cms=h.doc.querySelector('[data-view=cms]');assert.equal(h.doc.querySelector('#news-guides-nav').closest('[data-visa-nav-group]').dataset.visaNavGroup,'content');cms.addEventListener('click',()=>{clicks++;h.buttons.forEach(button=>button.classList.toggle('active',button===cms));});cms.click();await settle();assert.equal(clicks,1);assert.equal(cms.getAttribute('aria-current'),'page');assert.equal(cms.closest('[data-visa-nav-group]').dataset.active,'true');
  for(const view of ['customers','inbox'])h.doc.querySelector(`[data-view=${view}]`).hidden=true;await settle();assert.equal(h.doc.querySelector('[data-visa-nav-group=operations]').hidden,false);assert.equal(h.doc.querySelector('[data-view=customers]').hidden,true,'navigation never grants visibility');
  h.doc.querySelector('[data-view=applications]').hidden=true;await settle();assert.equal(h.doc.querySelector('[data-visa-nav-group=operations]').hidden,true);
  h.doc.body.dataset.role='customer';await settle();assert.equal(h.doc.querySelector('.visa-staff-workspace'),null);assert.equal(h.doc.querySelectorAll('.workspace-nav > [data-view]').length,8);assert.equal(h.doc.querySelector('[data-view=cms]'),cms);
 }finally{h.close();}
});
test('customer navigation retains its original ungrouped layout and no staff controls',()=>{
 const h=harness({role:'customer',width:320});try{assert.equal(h.controller.getState().enabled,false);assert.equal(h.trigger.hidden,true);assert.equal(h.doc.querySelector('[data-visa-sidebar-toggle]'),null);assert.equal(h.doc.querySelectorAll('.workspace-nav > [data-view]').length,8);assert.equal(h.doc.querySelector('#cms-nav').hidden,true);}finally{h.close();}
});
test('Visa headings and destinations have distinct icons in the staff sidebar',async()=>{
 const sprite=new JSDOM(await readFile(new URL('../dist/assets/staff-nav-icons.svg',import.meta.url),'utf8'),{contentType:'image/svg+xml'});
 const h=harness({width:375,access:{operations:'admin',cms:'admin'}});
 try{
  h.trigger.click();
  const nav=h.doc.querySelector('.workspace-nav');
  const administration=nav.querySelector('[data-visa-nav-group=administration]');
  assert.deepEqual([...administration.querySelectorAll('[data-view]:not([hidden])')].map(button=>button.dataset.view),['staff-access','profile']);
  const controls=[...nav.querySelectorAll('.branched-menu__head, [data-view]')];
  assert.equal(controls.length,11);
  const refs=controls.map(button=>{
   const icons=button.querySelectorAll(':scope > svg.branched-menu__icon');
   assert.equal(icons.length,1);
   assert.equal(icons[0],button.firstElementChild);
   assert.equal(icons[0].getAttribute('aria-hidden'),'true');
   assert.equal(icons[0].getAttribute('focusable'),'false');
   const href=icons[0].querySelector('use').getAttribute('href');
   const symbol=href.startsWith('#')?h.doc.getElementById(href.slice(1)):sprite.window.document.getElementById(href.split('#')[1]);
   assert.ok(symbol?.children.length);
   return href;
  });
  assert.equal(new Set(refs).size,controls.length);
  assert.equal(nav.querySelector('[data-view=cms] use').getAttribute('href'),'#p-file-pen-line');
  const profile=administration.querySelector('[data-view=profile] use');
  assert.equal(profile.getAttribute('href'),'./assets/staff-nav-icons.svg#user-round');
  h.doc.body.dataset.role='customer';await settle();
  assert.equal(profile.getAttribute('href'),'#p-person');
  assert.equal(h.doc.querySelector('#sidebar-profile-button #user-avatar')?.id,'user-avatar');
 }finally{h.close();sprite.window.close();}
});
test('groups collapse independently and localized labels follow the existing page language',()=>{
 const h=harness();try{
  const operations=h.doc.querySelector('[data-visa-group-toggle=operations]');operations.click();assert.equal(operations.getAttribute('aria-expanded'),'false');assert.equal(h.doc.querySelector('#visa-nav-operations').inert,true);assert.equal(h.doc.querySelector('#visa-nav-content').inert,false);
  h.doc.documentElement.lang='vi';h.doc.querySelector('[data-view=cms] span').textContent='Quản lý nội dung';h.controller.refresh();assert.equal(h.doc.querySelector('[data-visa-group-toggle=content] span').textContent,'Nội dung & tư liệu');assert.equal(h.doc.querySelector('[data-view=cms]').getAttribute('aria-label'),'Quản lý nội dung');assert.equal(h.doc.querySelector('[data-visa-sidebar-toggle]').getAttribute('aria-label'),'Thu gọn thanh điều hướng');
  const saved=JSON.parse(h.w.localStorage.getItem('gary-visa:staff-sidebar:v1'));assert.equal(h.doc.querySelector('[data-visa-group-toggle=operations] [data-visa-group-label]').textContent,'Nghiệp vụ khách hàng');
  assert.equal(saved.groups.operations,false);assert.equal('form' in saved,false);
 }finally{h.close();}
});
test('Visa SVG elbows track wrapped rows and animate selection without rebuilding paths',async()=>{
 const h=harness();try{
  const nav=h.doc.querySelector('.workspace-nav'),operations=h.doc.querySelector('[data-visa-nav-group=operations]');
  const header=operations.querySelector('button'),tree=operations.querySelector('.branched-menu__tree');
  const applications=tree.querySelector('[data-view=applications]'),customers=tree.querySelector('[data-view=customers]'),inbox=tree.querySelector('[data-view=inbox]');
  const box=(node,top,height)=>{node.getBoundingClientRect=()=>({top,height,width:210});};
  box(nav,100,350);box(header,160,38);box(tree,198,172);box(applications,204,42);box(customers,248,66);box(inbox,316,44);
  nav.style.setProperty('--branched-indent','32px');nav.style.setProperty('--branched-trunk','17px');nav.scrollTop=15;
  const marker=nav.querySelector('.branched-menu__marker'),paths=operations.querySelectorAll('.branched-menu__reach');
  h.route('customers');await settle();
  assert.equal(paths[1].getAttribute('d'),'M 17 0 V 75 A 8 8 0 0 0 25 83 H 32');
  assert.equal(paths[2].getAttribute('d'),'M 17 0 V 132 A 8 8 0 0 0 25 140 H 32');
  assert.deepEqual([...paths].map(path=>path.getAttribute('stroke-dashoffset')),['1','0','1']);
  assert.equal(marker.style.getPropertyValue('--branched-marker-y'),'94px');
  box(h.doc.querySelector('[data-visa-group-toggle=content]'),326,38);
  h.route('cms');await settle();
  assert.equal(nav.querySelector('.branched-menu__marker'),marker);
  assert.equal(marker.style.getPropertyValue('--branched-marker-y'),'260px');
  h.route('inbox');await settle();
  assert.equal(operations.querySelectorAll('.branched-menu__reach')[2],paths[2]);
  assert.deepEqual([...paths].map(path=>path.getAttribute('stroke-dashoffset')),['1','1','0']);
  inbox.hidden=true;await settle();
  assert.equal(operations.querySelectorAll('.branched-menu__reach').length,2);
  assert.equal(inbox.hasAttribute('aria-current'),false);
  assert.equal(marker.hasAttribute('data-visible'),false);
  const css=await readFile(new URL('../dist/branched-menu.css',import.meta.url),'utf8');
  assert.match(css,/transition: grid-template-rows var\(--branched-fold-time, 220ms/);
  assert.match(css,/transition: stroke-dashoffset var\(--branched-trace-time, 260ms/);
  assert.match(css,/transition: transform var\(--branched-marker-time, 240ms/);
  assert.match(css,/stroke-width: var\(--branched-weight, 1\.5\)/);
  assert.match(css,/prefers-reduced-motion: reduce[\s\S]*transition: none/);
 }finally{h.close();}
});
test('Visa branches use disclosure and keyboard navigation across visible links',async()=>{
 const h=harness();try{
  const operations=h.doc.querySelector('[data-visa-group-toggle=operations]'),customers=h.doc.querySelector('[data-view=customers]');
  const content=h.doc.querySelector('[data-visa-group-toggle=content]');
  const key=(node,key)=>node.dispatchEvent(new h.w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
  operations.focus();key(operations,'ArrowLeft');
  assert.equal(customers.tabIndex,-1);
  key(operations,'ArrowDown');assert.equal(h.doc.activeElement,content);
  operations.focus();key(operations,'ArrowRight');key(operations,'ArrowDown');assert.equal(h.doc.activeElement.dataset.view,'applications');
  key(h.doc.activeElement,'ArrowDown');assert.equal(h.doc.activeElement,customers);
  key(customers,'End');assert.equal(h.doc.activeElement.dataset.view,'profile');
  key(h.doc.activeElement,'Home');assert.equal(h.doc.activeElement.dataset.visaGroupToggle,'operations');
  operations.click();h.route('inbox');await settle();
  assert.equal(operations.getAttribute('aria-expanded'),'true');
 }finally{h.close();}
});
test('sidebar pointer/keyboard sizing is bounded and does not touch modal geometry or unsaved form/upload state',()=>{
 const h=harness();try{
  const editors=mountPortalEditors(h.doc),form=h.doc.getElementById('request-form'),input=h.doc.getElementById('request-subject');input.value='Unsaved application details';form.querySelector('textarea').value='Long unsaved message';
  const documentInput=h.doc.querySelector('#document-form input[type=file]'),file=new h.w.File(['test'],'document.pdf',{type:'application/pdf'});Object.defineProperty(documentInput,'files',{value:[file]});
  h.doc.getElementById('request-dialog').showModal();const modal=h.doc.getElementById('request-dialog');modal.querySelector('[data-gw-toggle]').click();const modalStyle=modal.getAttribute('style'),editorState=JSON.stringify(editors.controllers[0].getState());
  const resize=h.doc.querySelector('[data-visa-sidebar-resize]');h.pointer(resize,'pointerdown',256);h.pointer(h.w,'pointermove',2000);h.pointer(h.w,'pointerup',2000);assert.equal(h.controller.getState().width,380);assert.equal(h.doc.body.style.userSelect,'');
  h.key('Home');assert.equal(h.controller.getState().width,220);h.key('ArrowRight',true);assert.equal(h.controller.getState().width,268);h.key('End');assert.equal(h.controller.getState().width,380);
  assert.equal(modal.getAttribute('style'),modalStyle);assert.equal(JSON.stringify(editors.controllers[0].getState()),editorState);assert.equal(input.value,'Unsaved application details');assert.equal(form.querySelector('textarea').value,'Long unsaved message');assert.equal(documentInput.files[0],file);assert.equal(h.doc.getElementById('request-form'),form);
  h.doc.querySelector('[data-visa-sidebar-toggle]').click();assert.ok(h.doc.getElementById('workspace').classList.contains('visa-sidebar-collapsed'));assert.equal(modal.getAttribute('style'),modalStyle);assert.equal(resize.hidden,true);assert.ok([...h.doc.querySelectorAll('.visa-nav-destinations')].every(node=>!node.hidden),'rail keeps every permitted destination reachable');
  editors.destroy();
 }finally{h.close();}
});
test('sidebar width/collapse/group preferences reopen, while mobile navigation does not overwrite desktop state',async()=>{
 const h=harness();try{
  h.key('Home');h.doc.querySelector('[data-visa-group-toggle=content]').click();h.doc.querySelector('[data-visa-sidebar-toggle]').click();const preference=h.w.localStorage.getItem('gary-visa:staff-sidebar:v1');h.controller.destroy();const reopened=mountStaffSidebar(h.doc);assert.equal(reopened.getState().width,220);assert.equal(reopened.getState().collapsed,true);assert.equal(reopened.getState().groups.content,false);
  h.w.innerWidth=375;h.w.dispatchEvent(new h.w.Event('resize'));assert.equal(reopened.getState().mobile,true);assert.equal(h.doc.querySelector('[data-visa-sidebar-resize]').hidden,true);assert.equal(h.trigger.getAttribute('aria-label'),'Open staff navigation');h.trigger.click();assert.ok(h.doc.getElementById('workspace').classList.contains('visa-sidebar-mobile-open'));assert.equal(h.w.localStorage.getItem('gary-visa:staff-sidebar:v1'),preference);h.doc.querySelector('[data-view=applications]').click();await settle();assert.equal(reopened.getState().mobileExpanded,false);assert.equal(h.doc.activeElement,h.doc.querySelector('#applications-view h1'),'mobile navigation returns focus to the selected content');
  h.trigger.click();h.w.innerWidth=1000;h.w.dispatchEvent(new h.w.Event('resize'));assert.equal(reopened.getState().mobileExpanded,false);assert.equal(h.trigger.hidden,true);assert.equal(reopened.getState().collapsed,true);assert.ok(h.doc.getElementById('workspace').classList.contains('visa-sidebar-collapsed'));assert.equal(h.doc.querySelector('.visa-staff-sidebar').parentElement.id,'workspace');assert.equal(h.doc.body.classList.contains('visa-sidebar-scroll-locked'),false);reopened.destroy();
 }finally{h.dom.window.close();}
});

const staffRoutes=[
 [320,{operations:'admin',cms:null},['applications','customers','inbox','trash','staff-access','profile']],
 [375,{operations:null,cms:'admin'},['cms','news-guides','trash','staff-access','profile']],
 [430,{operations:null,cms:'editor'},['cms','news-guides','profile']],
 [768,{operations:'admin',cms:'admin'},['applications','customers','inbox','cms','news-guides','trash','staff-access','profile']],
 [375,{operations:'staff',cms:null},['applications','customers','inbox','profile']],
 [430,{operations:'manager',cms:'publisher'},['applications','customers','inbox','cms','news-guides','profile']],
 [320,{operations:null,cms:null},['profile']]
];
for(const [width,access,expected] of staffRoutes)test(`Visa staff drawer at ${width}px with Operations ${access.operations} and CMS ${access.cms}`,async()=>{
 const h=harness({width,access});try{
  const drawer=h.doc.getElementById('visa-mobile-nav'),nav=h.doc.querySelector('.workspace-nav');
  const close=drawer.querySelector('[data-visa-sidebar-toggle]');
  assert.equal(h.trigger.hidden,false);
  assert.equal(drawer.open,false);
  assert.equal(nav.inert,true);
  assert.equal(h.trigger.getAttribute('aria-controls'),drawer.id);
  assert.equal(drawer.getAttribute('aria-modal'),'true');
  for(const button of h.buttons)button.addEventListener('click',()=>{if(!button.hidden)h.route(button.dataset.view);});
  const choices=[...drawer.querySelectorAll('[data-view]')].filter(button=>!button.hidden);
  assert.deepEqual(choices.map(button=>button.dataset.view),expected);
  for(const button of choices){
   h.trigger.click();assert.equal(drawer.open,true);assert.equal(h.trigger.getAttribute('aria-expanded'),'true');
   assert.equal(nav.inert,false);assert.equal(h.doc.activeElement,close);
   assert.equal(h.doc.body.classList.contains('visa-sidebar-scroll-locked'),true);
   button.click();await settle();
   const panel=h.doc.getElementById(button.dataset.view+'-view');
   assert.equal(drawer.open,false);assert.equal(h.trigger.getAttribute('aria-expanded'),'false');
   assert.equal(button.getAttribute('aria-current'),'page');assert.equal(panel.hidden,false);
   assert.equal(h.doc.activeElement,panel.querySelector('h1,h2')||panel);
   assert.equal(h.doc.body.classList.contains('visa-sidebar-scroll-locked'),false);
  }
 }finally{h.close();}
});

test('the mobile drawer dismisses from Escape, backdrop, close control, programmatic routing and workspace exit',async()=>{
 const h=harness({width:320});try{
  const drawer=h.doc.getElementById('visa-mobile-nav');
  const close=drawer.querySelector('[data-visa-sidebar-toggle]');
  drawer.getBoundingClientRect=()=>({left:0,right:276,top:0,bottom:600});
  h.doc.documentElement.lang='vi';await settle();
  assert.equal(h.trigger.getAttribute('aria-label'),'Mở điều hướng nhân viên');assert.equal(close.getAttribute('aria-label'),'Đóng điều hướng nhân viên');
  const assertDismissed=()=>{assert.equal(drawer.open,false);assert.equal(h.doc.activeElement,h.trigger);assert.equal(h.doc.body.classList.contains('visa-sidebar-scroll-locked'),false);};
  h.trigger.click();close.dispatchEvent(new h.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));assertDismissed();
  h.trigger.click();drawer.dispatchEvent(new h.w.MouseEvent('click',{clientX:298,clientY:20,bubbles:true}));assertDismissed();
  h.trigger.click();close.click();assertDismissed();
  h.trigger.click();h.route('profile');await settle();
  assert.equal(drawer.open,false);assert.equal(h.doc.activeElement,h.doc.getElementById('profile-title'));
  h.trigger.click();h.doc.getElementById('workspace').hidden=true;await settle();
  assert.equal(drawer.open,false);assert.equal(h.trigger.hidden,true);assert.equal(h.doc.body.classList.contains('visa-sidebar-scroll-locked'),false);
 }finally{h.close();}
});

test('mobile drawer CSS fits the requested widths and gives its navigation an independent scroll area',async()=>{
 const css=await readFile(new URL('../dist/staff-sidebar.css',import.meta.url),'utf8');
 const widthRule=/width:min\((\d+)px,calc\(100% - (\d+)px\)\)/.exec(css);
 assert.ok(widthRule);
 const [,limit,space]=widthRule.map(Number);
 for(const width of [320,375,430,768])assert.ok(Math.min(limit,width-space)<=width-44);
 assert.match(css,/\.visa-mobile-nav-drawer>\.visa-staff-sidebar\{[^}]*height:100%;min-width:0;min-height:0/);
 assert.match(css,/grid-template-columns:minmax\(0,1fr\)/);
 assert.match(css,/\.visa-mobile-nav-trigger[^\{]*\{[^}]*width:44px;height:44px/);
 assert.match(css,/max-width:900px\)[\s\S]*\.portal-header\{[^}]*flex-wrap:wrap/);
 assert.match(css,/prefers-reduced-motion:reduce\).*\.visa-mobile-nav-drawer::backdrop\{transition:none/);
});
test('storage denial, narrow desktop bounds and CSS theme/reduced-motion support remain safe',async()=>{
 const h=harness({width:930,storage:{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}}});try{h.key('End');assert.equal(h.controller.getState().width,380);h.doc.querySelector('[data-visa-sidebar-toggle]').click();assert.equal(h.controller.getState().collapsed,true);h.doc.querySelector('[data-visa-sidebar-toggle]').click();h.w.innerWidth=901;h.w.dispatchEvent(new h.w.Event('resize'));assert.ok(h.controller.getState().width<=381);assert.ok(h.w.innerWidth-h.controller.getState().width>=520);const css=await readFile(new URL('../dist/staff-sidebar.css',import.meta.url),'utf8');assert.match(css,/--visa-nav-bg:var\(--vp-surface/);assert.doesNotMatch(css,/prefers-color-scheme/);assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/\.workspace-nav\{[^}]*min-height:0[^}]*overflow-y:auto;overscroll-behavior-y:contain/);assert.match(css,/max-width:900px/);}finally{h.close();}
});
