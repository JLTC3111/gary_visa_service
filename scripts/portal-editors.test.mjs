import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {mountPortalEditors} from '../dist/portal-editors.js';
const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');
const settle=async()=>{for(let i=0;i<8;i++)await new Promise(resolve=>setImmediate(resolve));};
function environment({width=1280,height=900}={}){
 const dom=new JSDOM(html,{url:'https://visa.garyhome.vn/portal.html',pretendToBeVisual:true});
 Object.defineProperty(dom.window,'innerWidth',{value:width,writable:true});Object.defineProperty(dom.window,'innerHeight',{value:height,writable:true});
 dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};dom.window.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new dom.window.Event('close'));};
 return {dom,w:dom.window,d:dom.window.document};
}
test('all substantial Visa modal editors reuse their mounted forms and submit handlers',async()=>{
 const h=environment(),{d,w}=h;let mounted;
 try{
  const originals=Object.fromEntries(['request-form','contact-form','message-form','note-form','document-form','contact-note-form'].map(id=>[id,d.getElementById(id)]));
  const subject=d.getElementById('request-subject'),file=d.getElementById('document-file'),feedback=d.getElementById('request-notice');
  subject.value='A retained application draft';feedback.textContent='Please check this field';subject.setCustomValidity('A retained validation error');
  const upload=new w.File(['private document'],'visa.pdf',{type:'application/pdf'});Object.defineProperty(file,'files',{value:[upload],configurable:true});
  let submissions=0;originals['request-form'].addEventListener('submit',event=>{event.preventDefault();submissions++;});
  mounted=mountPortalEditors(d);assert.equal(mounted.controllers.length,4);
  for(const [id,form]of Object.entries(originals))assert.equal(d.getElementById(id),form,id);
  for(const id of ['request-dialog','contact-edit-dialog','case-dialog','contact-dialog']){
   const dialog=d.getElementById(id);assert.ok(dialog.classList.contains('gw-editor'),id);assert.ok(dialog.querySelector(':scope > .gw-editor-header'),id);assert.ok(dialog.querySelector('.gw-editor-body'),id);
  }
  assert.equal(originals['request-form'].elements.subject,subject);assert.equal(originals['request-form'].querySelector('button[type="submit"]'),d.getElementById('request-submit'));
  assert.equal(subject.value,'A retained application draft');assert.equal(subject.validationMessage,'A retained validation error');assert.equal(file.files[0],upload);assert.equal(feedback.textContent,'Please check this field');
  originals['request-form'].dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert.equal(submissions,1);
  mounted.refresh();assert.equal(subject.value,'A retained application draft');assert.equal(file.files[0],upload);
 }finally{mounted?.destroy();h.dom.window.close();}
});
test('Visa header labels follow EN/VI without rerendering input, error, upload or tab state',async()=>{
 const h=environment(),{d}=h;let language='en',mounted;
 try{
  mounted=mountPortalEditors(d,{language:()=>language});
  const field=d.getElementById('contact-name'),file=d.getElementById('document-file'),tab=d.getElementById('case-notes');field.value='Draft contact';tab.hidden=false;
  const error=d.getElementById('contact-edit-feedback');error.textContent='Keep this error';
  assert.equal(d.querySelector('#contact-edit-dialog .dialog-close').getAttribute('aria-label'),'Close editor');
  language='vi';mounted.refresh();
  assert.equal(d.querySelector('#contact-edit-dialog .dialog-close').getAttribute('aria-label'),'Đóng trình chỉnh sửa');
  assert.equal(d.getElementById('contact-name'),field);assert.equal(field.value,'Draft contact');assert.equal(d.getElementById('document-file'),file);assert.equal(tab.hidden,false);assert.equal(error.textContent,'Keep this error');
 }finally{mounted?.destroy();h.dom.window.close();}
});
test('Visa form actions stay inside native forms and independent scrolling wrappers',()=>{
 const h=environment(),{d}=h;let mounted;
 try{
  mounted=mountPortalEditors(d);
  for(const [dialogId,formId]of [['request-dialog','request-form'],['contact-edit-dialog','contact-form']]){
   const dialog=d.getElementById(dialogId),form=d.getElementById(formId),body=form.querySelector(':scope > .gw-editor-body'),actions=form.querySelector(':scope > .gw-editor-actions');
   assert.ok(body);assert.ok(actions);assert.equal(form.parentElement,dialog);assert.equal(actions.querySelector('button[type="submit"]').form,form);
   assert.equal(body.querySelector('button[type="submit"]'),null);assert.equal(dialog.querySelector('input'),form.querySelector('input'));
  }
  assert.ok(d.querySelector('#case-dialog>.gw-editor-body>.case-tabs'));assert.ok(d.querySelector('#case-dialog .gw-editor-body #document-form input[type="file"]'));
  assert.equal(d.querySelectorAll('#request-form').length,1);assert.equal(d.querySelectorAll('#contact-form').length,1);
 }finally{mounted?.destroy();h.dom.window.close();}
});

test('Visa editor resize/maximize/restore persists the workspace while form controls and uploads stay mounted',async()=>{
 const h=environment(),{d,w}=h;let mounted;
 try{
  mounted=mountPortalEditors(d);const dialog=d.getElementById('request-dialog'),form=d.getElementById('request-form'),field=form.elements.subject;
  const documentInput=d.getElementById('document-file'),upload=new w.File(['private'],'document.pdf',{type:'application/pdf'});Object.defineProperty(documentInput,'files',{value:[upload],configurable:true});
  field.value='My unsaved request';field.setCustomValidity('Keep this validation error');dialog.showModal();await settle();
  const width=dialog.style.getPropertyValue('--gw-width');dialog.querySelector('[data-gw-edge="w"]').dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true}));const resizedWidth=dialog.style.getPropertyValue('--gw-width');assert.notEqual(resizedWidth,width);
  dialog.querySelector('[data-gw-toggle]').click();assert.ok(dialog.classList.contains('gw-maximized'));assert.equal(JSON.parse(w.localStorage.getItem('gary-editor-workspace:v1:visa.application')).maximized,true);
  assert.equal(field.value,'My unsaved request');assert.equal(field.validationMessage,'Keep this validation error');assert.equal(documentInput.files[0],upload);assert.equal(d.getElementById('request-form'),form);
  dialog.querySelector('[data-gw-toggle]').click();assert.equal(dialog.style.getPropertyValue('--gw-width'),resizedWidth);assert.equal(dialog.classList.contains('gw-maximized'),false);
  dialog.querySelector('[data-gw-toggle]').click();dialog.close();dialog.showModal();await settle();assert.ok(dialog.classList.contains('gw-maximized'));
  d.getElementById('contact-edit-dialog').showModal();await settle();assert.equal(d.getElementById('contact-edit-dialog').classList.contains('gw-maximized'),false,'separate editor type preference');
 }finally{mounted?.destroy();h.dom.window.close();}
});
test('Visa mobile editors fill the viewport and preserve typed data when the screen size changes',async()=>{
 const h=environment({width:390,height:844}),{d,w}=h;let mounted;
 try{
  mounted=mountPortalEditors(d);const dialog=d.getElementById('contact-edit-dialog'),field=d.getElementById('contact-name');field.value='An unsaved mobile contact';dialog.showModal();await settle();
  assert.equal(dialog.style.getPropertyValue('--gw-width'),'390px');assert.equal(dialog.style.getPropertyValue('--gw-height'),'844px');assert.equal(dialog.querySelector('[data-gw-toggle]').disabled,true);assert.equal(dialog.querySelectorAll('[data-gw-edge]:not([hidden])').length,0);
  w.innerWidth=1280;w.innerHeight=900;w.dispatchEvent(new w.Event('resize'));assert.equal(field.value,'An unsaved mobile contact');assert.equal(d.getElementById('contact-name'),field);assert.equal(dialog.querySelector('[data-gw-toggle]').disabled,false);
 }finally{mounted?.destroy();h.dom.window.close();}
});
