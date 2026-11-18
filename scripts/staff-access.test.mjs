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
 {user_id:self,display_name:'Ana Admin',email:'ana@example.test',operations_role:operationsAdmin?'admin':null,cms_role:cmsAdmin?'admin':null,self:true,account:'active',manage_operations:false,manage_cms:false},
 {user_id:peer,display_name:'Bao Admin',email:'bao@example.test',operations_role:'admin',cms_role:'admin',self:false,account:'active',manage_operations:false,manage_cms:false},
 {user_id:staff,display_name:'Chi Staff',email:'chi@example.test',operations_role:'staff',cms_role:null,self:false,account:'active',manage_operations:operationsAdmin,manage_cms:cmsAdmin},
 {user_id:editor,display_name:'',email:'dung@example.test',operations_role:null,cms_role:'editor',self:false,account:'unavailable',manage_operations:operationsAdmin,manage_cms:cmsAdmin}
];
function harness({operationsAdmin=true,cmsAdmin=false,respond=()=>null}={}){
 const dom=new JSDOM(html,{url:'http://localhost:4173/portal.html?area=staff',pretendToBeVisual:true}),doc=dom.window.document,calls=[],notices=[],members=directory(operationsAdmin,cmsAdmin);let allowed=true;
 const db={rpc:async(name,args)=>{
  calls.push({name,args});if(name==='gary_staff_access_list')return {data:{members:structuredClone(members),operations_role:operationsAdmin?'admin':null,cms_role:cmsAdmin?'admin':null},error:null};
  const custom=respond(name,args);if(custom)return custom;
  if(name==='gary_add_staff_member'){const user_id=`10000000-0000-4000-8000-00000000001${members.length}`;members.push({user_id,display_name:'',email:args.p_email,operations_role:args.p_operations_role,cms_role:args.p_cms_role,self:false,account:'active',manage_operations:operationsAdmin,manage_cms:cmsAdmin});return {data:{user_id},error:null}}
  members.find(member=>member.user_id===args.p_user_id)[name==='gary_set_operations_role'?'operations_role':'cms_role']=args.p_role;return {data:{user_id:args.p_user_id},error:null};
 }};
 const t=key=>portalCopy[doc.documentElement.lang]?.[key]??portalCopy.en[key]??key;
 const controller=createStaffAccess({db,doc,t,canManage:()=>allowed,notify:key=>notices.push(key)});
 const row=text=>[...doc.querySelectorAll('.staff-access-member')].find(node=>node.querySelector('strong').textContent===text);
 const choose=async(select,value)=>{select.value=value;select.dispatchEvent(new dom.window.Event('change',{bubbles:true}));await flush()};
 const form=doc.querySelector('#staff-access-add'),control=name=>form.elements.namedItem(name);
 const add=async(address,roles={})=>{control('email').value=address;for(const [scope,value] of Object.entries(roles))control(scope).value=value;form.requestSubmit();await flush()};
 return {dom,doc,calls,notices,controller,row,choose,form,control,add,revoke(){allowed=false},rpcs:name=>calls.filter(call=>call.name===name)};
}
const statusOf=(h,name)=>h.row(name).querySelector('.staff-access-status').textContent;

test('Team Access shows staff management beside role permissions and protections with separate role selectors and No Access',async()=>{
 const h=harness();
 try{
  await h.controller.enter();await flush();
  assert.deepEqual([...h.doc.querySelector('#staff-access-view .staff-access-grid').children].map(node=>node.className),['staff-access-main','applications-panel staff-access-guide']);
  assert.deepEqual([...h.doc.querySelector('.staff-access-main').children].map(node=>node.className),['applications-panel staff-access-add-panel','applications-panel staff-access-directory'],'adding accounts and the directory share the staff management column');
  assert.equal(h.doc.querySelectorAll('.staff-access-guide .staff-access-roles').length,2);assert.equal(h.doc.querySelectorAll('.staff-access-guide .staff-access-protections li').length,6);
  assert.equal(h.doc.querySelectorAll('.staff-access-member').length,4);
  assert.deepEqual(['Ana Admin','Chi Staff','dung@example.test'].map(name=>statusOf(h,name)),['Active','Active','Sign-in unavailable'],'each member shows an access status');
  const chi=h.row('Chi Staff'),operations=chi.querySelector('select[data-staff-scope=operations]');
  assert.deepEqual([...operations.options].map(option=>[option.value,option.textContent]),[['','No Access'],['staff','Staff'],['manager','Manager']]);
  assert.equal(operations.value,'staff');assert.equal(h.doc.querySelector(`label[for="${operations.id}"]`).textContent,'Operations');
  assert.equal(chi.querySelector('select[data-staff-scope=cms]'),null,'Operations Admins cannot change CMS roles');assert.match(chi.querySelector('.staff-access-field:last-child').textContent,/^CMSNo AccessView only$/);
  const ana=h.row('Ana Admin');assert.equal(ana.querySelectorAll('select').length,0);assert.match(ana.textContent,/Operations AdminYour account/);assert.equal(ana.querySelector('.relationship-badge').textContent,'You');
  const bao=h.row('Bao Admin');assert.equal(bao.querySelectorAll('select').length,0,'peer Admins are protected');assert.match(bao.textContent,/CMS AdminView only/);
  assert.ok(h.row('dung@example.test'),'the email stands in for a missing name');
  assert.equal([...h.doc.querySelectorAll('#staff-access-view option')].some(option=>option.value==='admin'),false,'Admin is never offered in the portal');
  assert.deepEqual([...h.doc.querySelectorAll('#staff-access-view input')].map(input=>input.type),['email'],'the only input looks up an existing account: no password fields');
  assert.equal(h.doc.querySelector('#staff-access-view a[href]'),null,'no invitation or cross-platform links');
  for(const key of ['staffAccessTitle','staffGuideTitle','noAccess','viewOnly','role_operations_manager','role_cms_publisher','staffNoAccessConfirm','staffRoleConflict','staffAddTitle','staffAddEmail','staffAddUnavailable','staffStatus_active','staffStatus_unavailable','staffProtectionsTitle','staffProtectAdmins'])assert.ok(portalCopy.vi[key]&&portalCopy.vi[key]!==portalCopy.en[key],`${key} is translated`);
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
  select=h.row('Chi Staff').querySelector('select[data-staff-scope=operations]');assert.equal(select.value,'');assert.equal(statusOf(h,'Chi Staff'),'No access','a member without roles is shown as No access');
  const reloads=h.rpcs('gary_staff_access_list').length;await h.choose(h.row('dung@example.test').querySelector('select[data-staff-scope=operations]'),'staff');
  assert.match(h.doc.querySelector('#staff-access-notice').textContent,/changed this role/);assert.equal(h.rpcs('gary_staff_access_list').length,reloads+1,'a conflict reloads the directory');
 }finally{h.dom.window.close()}
});

test('Team Access adds verified existing accounts by email with roles from the Admin’s own area only',async()=>{
 let release;const pending=new Promise(resolve=>{release=resolve});
 const failures={'known@example.test':'23505','ghost@example.test':'P0002','broken@example.test':'XX000'};
 const h=harness({respond:(name,args)=>name!=='gary_add_staff_member'?null:args.p_email==='slow@example.test'?pending:failures[args.p_email]?{data:null,error:{code:failures[args.p_email],message:'AGENCY'}}:null});
 try{
  await h.controller.enter();await flush();
  const email=h.control('email'),operations=h.control('operations'),cms=h.control('cms'),submit=h.form.querySelector('button[type=submit]'),feedback=()=>h.doc.querySelector('#staff-access-add-feedback').textContent;
  assert.deepEqual([email.type,email.required,email.autocomplete,h.doc.querySelector(`label[for="${email.id}"]`).textContent],['email',true,'off','Existing account email']);
  assert.deepEqual([...operations.options].map(option=>[option.value,option.textContent]),[['','No Access'],['staff','Staff'],['manager','Manager']]);
  assert.deepEqual([operations.disabled,cms.disabled,submit.disabled],[false,true,false]);
  assert.deepEqual([h.doc.querySelector('#staff-access-add-operations-hint').hidden,h.doc.querySelector('#staff-access-add-cms-hint').hidden,cms.getAttribute('aria-describedby')],[true,false,'staff-access-add-cms-hint'],'the locked CMS selector explains who assigns CMS roles');

  await h.add('');assert.match(feedback(),/signs in with/);assert.equal(email.getAttribute('aria-invalid'),'true');
  await h.add('new@example.test');assert.match(feedback(),/at least one role/);assert.equal(h.rpcs('gary_add_staff_member').length,0,'incomplete requests are not sent');
  await h.add(' new@example.test ',{operations:'manager',cms:'editor'});
  assert.deepEqual(h.rpcs('gary_add_staff_member').map(call=>call.args),[{p_email:'new@example.test',p_operations_role:'manager',p_cms_role:null}],'a disabled CMS selection is never sent');
  assert.deepEqual(h.notices,['staffAdded']);assert.deepEqual([email.value,operations.value,feedback()],['','','']);assert.equal(h.doc.activeElement,email);
  assert.equal(statusOf(h,'new@example.test'),'Active','the directory reloads with the new member');

  for(const [address,message] of [['known@example.test',/already on the Gary Visa team/],['ghost@example.test',/No verified account/],['broken@example.test',/could not be added/]]){await h.add(address,{operations:'staff'});assert.match(feedback(),message)}
  assert.equal(email.hasAttribute('aria-invalid'),false,'an unexpected failure is not blamed on the email');
  await h.add('ghost@example.test',{operations:'staff'});assert.equal(email.getAttribute('aria-invalid'),'true');
  email.dispatchEvent(new h.dom.window.Event('input',{bubbles:true}));assert.deepEqual([feedback(),email.hasAttribute('aria-invalid')],['',false],'editing clears the error');

  await h.add('slow@example.test',{operations:'staff'});
  assert.deepEqual([submit.disabled,submit.getAttribute('aria-busy'),email.readOnly,operations.disabled,h.row('Chi Staff').querySelector('select').disabled],[true,'true',true,true,true],'the form and directory pause while an addition is pending');
  release({data:{user_id:'pending'},error:null});await flush();
  assert.deepEqual([submit.disabled,submit.hasAttribute('aria-busy'),email.readOnly,operations.disabled],[false,false,false,false]);
  assert.deepEqual(h.notices,['staffAdded','staffAdded'],'only successful additions are announced');
 }finally{h.dom.window.close()}
});

test('CMS Admins manage CMS roles only, labels follow Vietnamese, and revoked managers cannot submit',async()=>{
 const h=harness({operationsAdmin:false,cmsAdmin:true,respond:(name,args)=>args.p_role==='publisher'?{data:null,error:{code:'42501',message:'AGENCY_CMS_ADMIN_REQUIRED'}}:null});
 try{
  await h.controller.enter();await flush();
  const chi=h.row('Chi Staff');assert.equal(chi.querySelector('select[data-staff-scope=operations]'),null);
  const cms=chi.querySelector('select[data-staff-scope=cms]');assert.deepEqual([...cms.options].map(option=>option.value),['','editor','publisher']);
  assert.deepEqual([h.control('operations').disabled,h.doc.querySelector('#staff-access-add-operations-hint').hidden,h.control('cms').disabled,[...h.control('cms').options].map(option=>option.value)],[true,false,false,['','editor','publisher']],'CMS Admins add members with CMS roles only');
  await h.choose(cms,'editor');assert.deepEqual(h.rpcs('gary_set_cms_role').map(call=>call.args),[{p_user_id:staff,p_role:'editor',p_expected_role:null}]);
  await h.choose(h.row('Chi Staff').querySelector('select[data-staff-scope=cms]'),'publisher');assert.match(h.doc.querySelector('#staff-access-notice').textContent,/cannot make that change/);
  await h.add('writer@example.test',{operations:'staff',cms:'publisher'});assert.deepEqual(h.rpcs('gary_add_staff_member').map(call=>call.args),[{p_email:'writer@example.test',p_operations_role:null,p_cms_role:'publisher'}]);
  await h.add('');assert.match(h.doc.querySelector('#staff-access-add-feedback').textContent,/signs in with/);
  h.doc.documentElement.lang='vi';h.controller.render();
  assert.equal(h.row('Chi Staff').querySelector('select[data-staff-scope=cms]').options[0].textContent,'Không có quyền');assert.match(h.row('Bao Admin').textContent,/Chỉ xem/);
  assert.equal(statusOf(h,'Chi Staff'),'Đang hoạt động');assert.equal(statusOf(h,'dung@example.test'),'Không thể đăng nhập');
  assert.equal(h.doc.querySelector('#staff-access-add-feedback').textContent,portalCopy.vi.staffAddInvalidEmail,'messages follow the language switch');
  h.revoke();const sent=h.calls.length;await h.choose(h.row('Chi Staff').querySelector('select[data-staff-scope=cms]'),'');await h.add('late@example.test',{cms:'editor'});assert.equal(h.calls.length,sent,'UI changes stop as soon as management access is gone');
  h.controller.reset();assert.equal(h.doc.querySelector('#staff-access-list').children.length,0);assert.equal(h.doc.querySelector('#staff-access-notice').textContent,'');
  assert.deepEqual([h.control('email').value,h.doc.querySelector('#staff-access-add-feedback').textContent,h.control('cms').disabled,h.form.querySelector('button[type=submit]').disabled],['','',true,true],'signing out clears and locks the add form');
 }finally{h.dom.window.close()}
});
