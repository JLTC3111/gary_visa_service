import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {mountStaffSidebar} from '../dist/staff-sidebar.js';
import {mountPortalEditors} from '../dist/portal-editors.js';
const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function harness({role='staff',width=1440,storage}={}){
 const dom=new JSDOM(html,{url:'https://visa.garyhome.vn/portal.html',pretendToBeVisual:true}),w=dom.window,doc=w.document;
 Object.defineProperty(w,'innerWidth',{value:width,writable:true});Object.defineProperty(w,'innerHeight',{value:960,writable:true});
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 if(storage)Object.defineProperty(w,'localStorage',{get:()=>storage});doc.body.dataset.role=role;doc.getElementById('workspace').hidden=false;
 for(const view of ['customers','inbox','cms','trash'])doc.querySelector(`[data-view=${view}]`).hidden=role!=='staff';
 const buttons=[...doc.querySelectorAll('.workspace-nav [data-view]')],controller=mountStaffSidebar(doc);
 const pointer=(node,type,x)=>{const event=new w.MouseEvent(type,{button:0,clientX:x,bubbles:true,cancelable:true});Object.defineProperty(event,'pointerId',{value:2});node.dispatchEvent(event);};
 const key=(value,shiftKey=false)=>doc.querySelector('[data-visa-sidebar-resize]').dispatchEvent(new w.KeyboardEvent('keydown',{key:value,shiftKey,bubbles:true,cancelable:true}));
 return{dom,w,doc,buttons,controller,pointer,key,close(){controller.destroy();dom.window.close();}};
}
test('Visa staff groups retain original destination nodes, listeners, permissions and active state',async()=>{
 const h=harness();try{
  assert.deepEqual([...h.doc.querySelectorAll('[data-visa-nav-group]')].map(node=>node.dataset.visaNavGroup),['operations','crm','content','account']);
  assert.equal(h.doc.querySelectorAll('.workspace-nav [data-view]').length,6);for(const button of h.buttons)assert.equal(h.doc.querySelector(`[data-view=${button.dataset.view}]`),button);
  let clicks=0;const cms=h.doc.querySelector('[data-view=cms]');cms.addEventListener('click',()=>{clicks++;h.buttons.forEach(button=>button.classList.toggle('active',button===cms));});cms.click();await settle();assert.equal(clicks,1);assert.equal(cms.getAttribute('aria-current'),'page');assert.ok(cms.closest('[data-visa-nav-group]').classList.contains('visa-nav-group-active'));
  for(const view of ['customers','inbox'])h.doc.querySelector(`[data-view=${view}]`).hidden=true;await settle();assert.equal(h.doc.querySelector('[data-visa-nav-group=crm]').hidden,true);assert.equal(h.doc.querySelector('[data-view=customers]').hidden,true,'navigation never grants visibility');
  h.doc.body.dataset.role='customer';await settle();assert.equal(h.doc.querySelector('.visa-staff-workspace'),null);assert.equal(h.doc.querySelectorAll('.workspace-nav > [data-view]').length,6);assert.equal(h.doc.querySelector('[data-view=cms]'),cms);
 }finally{h.close();}
});
test('customer navigation retains its original ungrouped layout and no staff controls',()=>{
 const h=harness({role:'customer'});try{assert.equal(h.controller.getState().enabled,false);assert.equal(h.doc.querySelector('[data-visa-sidebar-toggle]'),null);assert.equal(h.doc.querySelectorAll('.workspace-nav > [data-view]').length,6);assert.equal(h.doc.querySelector('#cms-nav').hidden,true);}finally{h.close();}
});
test('groups collapse independently and localized labels follow the existing page language',()=>{
 const h=harness();try{
  const crm=h.doc.querySelector('[data-visa-group-toggle=crm]');crm.click();assert.equal(crm.getAttribute('aria-expanded'),'false');assert.equal(h.doc.querySelector('#visa-nav-crm').hidden,true);assert.equal(h.doc.querySelector('#visa-nav-operations').hidden,false);
  h.doc.documentElement.lang='vi';h.doc.querySelector('[data-view=cms] span').textContent='Quản lý nội dung';h.controller.refresh();assert.equal(h.doc.querySelector('[data-visa-group-toggle=content] span').textContent,'Nội dung & tư liệu');assert.equal(h.doc.querySelector('[data-view=cms]').getAttribute('aria-label'),'Quản lý nội dung');assert.equal(h.doc.querySelector('[data-visa-sidebar-toggle]').getAttribute('aria-label'),'Thu gọn thanh điều hướng');
  const saved=JSON.parse(h.w.localStorage.getItem('gary-visa:staff-sidebar:v1'));assert.equal(saved.groups.crm,false);assert.equal('form' in saved,false);
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
  h.key('Home');h.doc.querySelector('[data-visa-group-toggle=crm]').click();h.doc.querySelector('[data-visa-sidebar-toggle]').click();const preference=h.w.localStorage.getItem('gary-visa:staff-sidebar:v1');h.controller.destroy();const reopened=mountStaffSidebar(h.doc);assert.equal(reopened.getState().width,220);assert.equal(reopened.getState().collapsed,true);assert.equal(reopened.getState().groups.crm,false);
  h.w.innerWidth=390;h.w.dispatchEvent(new h.w.Event('resize'));assert.equal(reopened.getState().mobile,true);assert.equal(h.doc.querySelector('[data-visa-sidebar-resize]').hidden,true);assert.equal(h.doc.querySelector('[data-visa-sidebar-toggle]').getAttribute('aria-label'),'Open staff navigation');h.doc.querySelector('[data-visa-sidebar-toggle]').click();assert.ok(h.doc.getElementById('workspace').classList.contains('visa-sidebar-mobile-open'));assert.equal(h.w.localStorage.getItem('gary-visa:staff-sidebar:v1'),preference);h.doc.querySelector('[data-view=applications]').click();await settle();assert.equal(reopened.getState().mobileExpanded,false);assert.equal(h.doc.activeElement,h.doc.querySelector('#applications-view h1'),'mobile navigation returns focus to the selected content');
  h.w.innerWidth=1000;h.w.dispatchEvent(new h.w.Event('resize'));assert.equal(reopened.getState().collapsed,true);assert.ok(h.doc.getElementById('workspace').classList.contains('visa-sidebar-collapsed'));reopened.destroy();
 }finally{h.dom.window.close();}
});
test('storage denial, narrow desktop bounds and CSS theme/reduced-motion support remain safe',async()=>{
 const h=harness({width:930,storage:{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}}});try{h.key('End');assert.equal(h.controller.getState().width,380);h.doc.querySelector('[data-visa-sidebar-toggle]').click();assert.equal(h.controller.getState().collapsed,true);h.doc.querySelector('[data-visa-sidebar-toggle]').click();h.w.innerWidth=901;h.w.dispatchEvent(new h.w.Event('resize'));assert.ok(h.controller.getState().width<=381);assert.ok(h.w.innerWidth-h.controller.getState().width>=520);const css=await readFile(new URL('../dist/staff-sidebar.css',import.meta.url),'utf8');assert.match(css,/data-visa-staff-theme=dark/);assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/\.workspace-nav\{[^}]*overflow:auto/);assert.match(css,/max-width:900px/);}finally{h.close();}
});
