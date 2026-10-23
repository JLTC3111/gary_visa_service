import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {initFormControls} from '../dist/form-controls.js';
async function page(name='index.html'){
 const dom=new JSDOM(await readFile(new URL(`../dist/${name}`,import.meta.url),'utf8'),{url:'http://localhost:4173/',pretendToBeVisual:true});dom.window.HTMLElement.prototype.scrollIntoView=function(){};return dom;
}
const key=(win,node,key,extra={})=>node.dispatchEvent(new win.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...extra}));
const flush=()=>new Promise(resolve=>setImmediate(resolve));
test('Styled selects support keyboard navigation, cancellation, type-ahead and native form submission',async()=>{
 const dom=await page(),win=dom.window,doc=win.document,controls=initFormControls(doc),select=doc.querySelector('#enquiry-service'),menu=doc.querySelector('#site-select-menu');let changes=0;select.addEventListener('change',()=>changes++);
 try{
  assert.equal(initFormControls(doc),controls,'initializing twice must not duplicate handlers');const original=select.value;select.click();assert.equal(select.getAttribute('aria-expanded'),'true');assert.equal(doc.activeElement,select);assert.equal(menu.hidden,false);assert.equal(menu.querySelectorAll('[role=option]').length,select.options.length);
  key(win,select,'ArrowDown');key(win,select,'Escape');assert.equal(select.value,original);assert.equal(changes,0);assert.equal(menu.hidden,true);
  key(win,select,'w');assert.equal(menu.hidden,false);assert.match(doc.getElementById(select.getAttribute('aria-activedescendant')).textContent,/Work permits/);key(win,select,'Enter');assert.equal(select.value,'work');assert.equal(changes,1);assert.equal(new win.FormData(doc.querySelector('#enquiry-form')).get('service'),'work');
  select.click();const disabled=menu.querySelector('[aria-disabled=true]');disabled?.click();if(disabled)assert.equal(menu.hidden,false);menu.querySelector('[data-index="1"]').click();assert.equal(select.selectedIndex,1);assert.equal(menu.hidden,true);assert.equal(changes,2);
  select.value='documents';select.click();assert.equal(menu.querySelector('[aria-selected=true]').dataset.index,String(select.selectedIndex));key(win,select,'Tab');assert.equal(menu.hidden,true);
  select.click();doc.querySelector('#enquiry-name').focus();assert.equal(menu.hidden,true);doc.querySelector('#enquiry-form').reset();await flush();assert.equal(select.value,original);
 }finally{controls.close();win.close()}
});
test('Styled menus stay synchronized with translated and changing staff options, and close with dialogs',async()=>{
 const dom=await page('portal.html'),win=dom.window,doc=win.document,controls=initFormControls(doc),select=doc.querySelector('#contact-assignee'),dialog=doc.querySelector('#contact-edit-dialog'),menu=doc.querySelector('#site-select-menu');
 try{
  select.replaceChildren(new win.Option('Unassigned',''),new win.Option('Staff A','staff-a'));select.value='staff-a';dialog.setAttribute('open','');select.click();assert.equal(menu.parentElement,dialog);assert.equal(menu.querySelector('[aria-selected=true]').textContent,'Staff A');
  select.options[1].textContent='Nhân viên A';await flush();assert.equal(menu.querySelector('[aria-selected=true]').textContent,'Nhân viên A');
  select.replaceChildren(new win.Option('Chưa phân công',''),new win.Option('<img src=x>','staff-b'));await flush();assert.equal(menu.querySelector('img'),null);key(win,select,'End');key(win,select,'Enter');assert.equal(select.value,'staff-b');
  select.click();select.disabled=true;await flush();assert.equal(menu.hidden,true);select.disabled=false;select.click();assert.equal(menu.hidden,false);dialog.removeAttribute('open');dialog.dispatchEvent(new win.Event('close'));assert.equal(menu.hidden,true);
  select.disabled=true;select.click();assert.equal(menu.hidden,true);select.disabled=false;
 }finally{controls.close();win.close()}
});
