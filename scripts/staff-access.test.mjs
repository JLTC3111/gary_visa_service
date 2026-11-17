import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {portalCopy} from '../dist/portal-copy.js';
import {createStaffAccess} from '../dist/staff-access.js';

const tick=()=>new Promise(resolve=>setImmediate(resolve));
async function flush(){for(let i=0;i<8;i++)await tick()}
const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');
const self='10000000-0000-4000-8000-000000000001',peer='10000000-0000-4000-8000-000000000002',staff='10000000-0000-4000-8000-000000000003',editor='10000000-0000-4000-8000-000000000004';
const directory=(operationsAdmin,cmsAdmin)=>[
 {user_id:self,display_name:'Ana Admin',email:'ana@example.test',operations_role:operationsAdmin?'admin':null,cms_role:cmsAdmin?'admin':null,self:true,manage_operations:false,manage_cms:false},
 {user_id:peer,display_name:'Bao Admin',email:'bao@example.test',operations_role:'admin',cms_role:'admin',self:false,manage_operations:false,manage_cms:false},
 {user_id:staff,display_name:'Chi Staff',email:'chi@example.test',operations_role:'staff',cms_role:null,self:false,manage_operations:operationsAdmin,manage_cms:cmsAdmin},
 {user_id:editor,display_name:'',email:'dung@example.test',operations_role:null,cms_role:'editor',self:false,manage_operations:operationsAdmin,manage_cms:cmsAdmin}
];
function harness({operationsAdmin=true,cmsAdmin=false,respond=()=>null}={}){
 const dom=new JSDOM(html,{url:'http://localhost:4173/portal.html?area=staff',pretendToBeVisual:true}),doc=dom.window.document,calls=[],notices=[],members=directory(operationsAdmin,cmsAdmin);let allowed=true;
 const db={rpc:async(name,args)=>{
  calls.push({name,args});if(name==='gary_staff_access_list')return {data:{members:structuredClone(members)},error:null};
  const custom=respond(name,args);if(custom)return custom;
  members.find(member=>member.user_id===args.p_user_id)[name==='gary_set_operations_role'?'operations_role':'cms_role']=args.p_role;return {data:{user_id:args.p_user_id},error:null};
 }};
 const t=key=>portalCopy[doc.documentElement.lang]?.[key]??portalCopy.en[key]??key;
 const controller=createStaffAccess({db,doc,t,canManage:()=>allowed,notify:key=>notices.push(key)});
 const row=text=>[...doc.querySelectorAll('.staff-access-member')].find(node=>node.querySelector('strong').textContent===text);
 const choose=async(select,value)=>{select.value=value;select.dispatchEvent(new dom.window.Event('change',{bubbles:true}));await flush()};
 return {dom,doc,calls,notices,controller,row,choose,revoke(){allowed=false},rpcs:name=>calls.filter(call=>call.name===name)};
}

test('Staff Management shows the Visa directory beside the permissions guide with separate role selectors and No Access',async()=>{
 const h=harness();
 try{
  await h.controller.enter();await flush();
  assert.deepEqual([...h.doc.querySelector('#staff-access-view .staff-access-grid').children].map(node=>node.className),['applications-panel staff-access-directory','applications-panel staff-access-guide']);
  assert.equal(h.doc.querySelectorAll('.staff-access-member').length,4);
  const chi=h.row('Chi Staff'),operations=chi.querySelector('select[data-staff-scope=operations]');
  assert.deepEqual([...operations.options].map(option=>[option.value,option.textContent]),[['','No Access'],['staff','Staff'],['manager','Manager']]);
  assert.equal(operations.value,'staff');assert.equal(h.doc.querySelector(`label[for="${operations.id}"]`).textContent,'Operations');
  assert.equal(chi.querySelector('select[data-staff-scope=cms]'),null,'Operations Admins cannot change CMS roles');assert.match(chi.querySelector('.staff-access-field:last-child').textContent,/^CMSNo AccessView only$/);
  const ana=h.row('Ana Admin');assert.equal(ana.querySelectorAll('select').length,0);assert.match(ana.textContent,/Operations AdminYour account/);assert.equal(ana.querySelector('.relationship-badge').textContent,'You');
  const bao=h.row('Bao Admin');assert.equal(bao.querySelectorAll('select').length,0,'peer Admins are protected');assert.match(bao.textContent,/CMS AdminView only/);
  assert.ok(h.row('dung@example.test'),'the email stands in for a missing name');
  assert.equal([...h.doc.querySelectorAll('#staff-access-view option')].some(option=>option.value==='admin'),false,'Admin is never offered in the portal');
  assert.equal(h.doc.querySelector('#staff-access-view input, #staff-access-view a[href]'),null,'no password, invitation or cross-platform controls');
  for(const key of ['staffAccessTitle','staffGuideTitle','noAccess','viewOnly','role_operations_manager','role_cms_publisher','staffNoAccessConfirm','staffRoleConflict'])assert.ok(portalCopy.vi[key]&&portalCopy.vi[key]!==portalCopy.en[key],`${key} is translated`);
 }finally{h.dom.window.close()}
});

test('role changes send the previous role, confirm No Access, restore focus and reload after conflicts',async()=>{
 const h=harness({respond:(name,args)=>args.p_user_id===editor?{data:null,error:{code:'40001',message:'AGENCY_ROLE_CONFLICT'}}:null});
 try{
  await h.controller.enter();await flush();
  await h.choose(h.row('Chi Staff').querySelector('select[data-staff-scope=operations]'),'manager');
  assert.deepEqual(h.rpcs('gary_set_operations_role').map(call=>call.args),[{p_user_id:staff,p_role:'manager',p_expected_role:'staff'}]);assert.deepEqual(h.notices,['staffRoleSaved']);
  let select=h.row('Chi Staff').querySelector('select[data-staff-scope=operations]');assert.equal(select.value,'manager','the reloaded directory shows the saved role');assert.equal(h.doc.activeElement,select,'focus returns to the changed control');
  h.dom.window.confirm=()=>false;await h.choose(select,'');assert.equal(h.rpcs('gary_set_operations_role').length,1,'a cancelled No Access sends nothing');assert.equal(select.value,'manager');
  h.dom.window.confirm=()=>true;await h.choose(select,'');assert.deepEqual(h.rpcs('gary_set_operations_role').at(-1).args,{p_user_id:staff,p_role:null,p_expected_role:'manager'});
  select=h.row('Chi Staff').querySelector('select[data-staff-scope=operations]');assert.equal(select.value,'');
  const reloads=h.rpcs('gary_staff_access_list').length;await h.choose(h.row('dung@example.test').querySelector('select[data-staff-scope=operations]'),'staff');
  assert.match(h.doc.querySelector('#staff-access-notice').textContent,/changed this role/);assert.equal(h.rpcs('gary_staff_access_list').length,reloads+1,'a conflict reloads the directory');
 }finally{h.dom.window.close()}
});

test('CMS Admins manage CMS roles only, labels follow Vietnamese, and revoked managers cannot submit',async()=>{
 const h=harness({operationsAdmin:false,cmsAdmin:true,respond:(name,args)=>args.p_role==='publisher'?{data:null,error:{code:'42501',message:'AGENCY_CMS_ADMIN_REQUIRED'}}:null});
 try{
  await h.controller.enter();await flush();
  const chi=h.row('Chi Staff');assert.equal(chi.querySelector('select[data-staff-scope=operations]'),null);
  const cms=chi.querySelector('select[data-staff-scope=cms]');assert.deepEqual([...cms.options].map(option=>option.value),['','editor','publisher']);
  await h.choose(cms,'editor');assert.deepEqual(h.rpcs('gary_set_cms_role').map(call=>call.args),[{p_user_id:staff,p_role:'editor',p_expected_role:null}]);
  await h.choose(h.row('Chi Staff').querySelector('select[data-staff-scope=cms]'),'publisher');assert.match(h.doc.querySelector('#staff-access-notice').textContent,/cannot make that change/);
  h.doc.documentElement.lang='vi';h.controller.render();
  assert.equal(h.row('Chi Staff').querySelector('select[data-staff-scope=cms]').options[0].textContent,'Không có quyền');assert.match(h.row('Bao Admin').textContent,/Chỉ xem/);
  h.revoke();const sent=h.calls.length;await h.choose(h.row('Chi Staff').querySelector('select[data-staff-scope=cms]'),'');assert.equal(h.calls.length,sent,'UI changes stop as soon as management access is gone');
  h.controller.reset();assert.equal(h.doc.querySelector('#staff-access-list').children.length,0);assert.equal(h.doc.querySelector('#staff-access-notice').textContent,'');
 }finally{h.dom.window.close()}
});
