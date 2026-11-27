import test from 'node:test';import assert from 'node:assert/strict';import {JSDOM} from 'jsdom';
import {bindFeedbackDom} from './feedback-test-dom.mjs';
import {mountCms} from '../dist/cms-foundation/index.js';
const settle=async()=>{for(let i=0;i<12;i++)await new Promise(r=>setImmediate(r));};
const entry={id:'record-1',kind:'article',slug:'test',title_en:'Test article',title_vi:'Bài thử',summary_en:'Summary',summary_vi:'Tóm tắt',body_en:'Content',body_vi:'Nội dung',data:{},status:'published',version:3};
function setup({canDelete=true,failure=false,onRefresh}={}){const dom=new JSDOM('<main id="cms"></main>',{url:'https://visa.garyhome.vn/portal.html?area=staff'}),root=dom.window.document.querySelector('main');bindFeedbackDom(dom.window);dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};dom.window.HTMLDialogElement.prototype.close=function(){this.open=false;};dom.window.confirm=()=>assert.fail('Trash must use the CMS dialog');let deleted=false;const calls=[];const adapter={capabilities:async()=>({read:true,edit:true,publish:canDelete,delete:canDelete}),list:async()=>{if(deleted)await onRefresh?.();return {records:deleted?[]:[entry],total:deleted?0:1};},revisions:async()=>[],remove:async(id,options)=>{calls.push({id,...options});if(failure)throw {code:'PT409'};deleted=true;return {id};}};const cms=mountCms(root,{appId:'visa',collections:[{kind:'article',label:{en:'Articles',vi:'Bài viết'}}],adapter});return {dom,root,cms,calls,close(){cms.destroy({force:true});dom.window.close();}};}
function trash(h,{editor=false,answer='confirm'}={}){
 const more=h.root.querySelector((editor?'.cms-dialog':'.cms-entry-actions')+' [data-action="more"]');
 more.click();
 more.nextElementSibling.querySelector('[data-action="delete"]').click();
 assert.equal(h.calls.length,0);
 h.root.querySelector(`.cms-confirm-dialog[open] [data-cms-answer="${answer}"]`).click();
}
test('CMS Delete moves the selected version to Trash after explicit confirmation and removes the row',async()=>{const h=setup();try{await h.cms.ready;trash(h);await settle();assert.deepEqual(h.calls,[{id:entry.id,expectedVersion:3}]);assert.match(h.dom.window.document.querySelector('[data-success-message]').textContent,/Moved to Trash/);assert.equal(h.root.querySelector('[data-action="edit"]'),null);}finally{h.close();}});
test('CMS Delete is unavailable to an editor and cancellation makes no request',async()=>{for(const canDelete of [false,true]){const h=setup({canDelete});try{await h.cms.ready;if(!canDelete)assert.equal(h.root.querySelector('[data-action="delete"]'),null);else trash(h,{answer:'cancel'});await settle();assert.equal(h.calls.length,0);}finally{h.close();}}});
test('failed CMS Delete preserves the editable record and translated recovery guidance',async()=>{const h=setup({failure:true});try{await h.cms.ready;h.root.querySelector('[data-action="edit"]').click();await settle();h.cms.setLanguage('vi');trash(h,{editor:true});await settle();assert.equal(h.calls.length,1);assert.equal(h.root.querySelector('[name="title_en"]').value,entry.title_en);assert.ok(h.root.querySelector('.cms-dialog').open);assert.match(h.root.textContent,/Người khác đã thay đổi/);}finally{h.close();}});

test('CMS deletion confirms while refreshing the list is still pending',async()=>{
 let finishRefresh;
 const followUp=new Promise(resolve=>{finishRefresh=resolve;});
 const h=setup({onRefresh:()=>followUp});
 try{
  await h.cms.ready;
  h.root.querySelector('[data-action="edit"]').click();
  await settle();
  trash(h,{editor:true});
  await settle();
  assert.equal(h.root.querySelector('.cms-dialog').open,false);
  assert.match(h.dom.window.document.querySelector('[data-success-message]').textContent,/Moved to Trash/);
  finishRefresh();
  await settle();
  assert.equal(h.root.querySelector('[data-action="edit"]'),null);
 }finally{finishRefresh();h.close();}
});
