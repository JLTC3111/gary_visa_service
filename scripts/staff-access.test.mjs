import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {portalCopy} from '../dist/portal-copy.js';
import {createStaffAccess} from '../dist/staff-access.js';

const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');
const settle=()=>new Promise(resolve=>setImmediate(resolve));
const ids=Object.fromEntries(['self','peer','staff','editor'].map((name,i)=>[name,`10000000-0000-4000-8000-00000000000${i+1}`]));
const result=data=>({data,error:null});
const failure=(code,message)=>({data:null,error:{code,message}});

function harness({operationsAdmin=true,cmsAdmin=false,respond=()=>null,storage}={}){
 const dom=new JSDOM(html,{url:'http://localhost:4173/portal.html?area=staff',pretendToBeVisual:true});
 const doc=dom.window.document,$=selector=>doc.querySelector(selector),calls=[],notices=[];
 $('#staff-access-view').hidden=false;$('#workspace').hidden=false;
 let allowed=true;
 let members=[
  {user_id:ids.self,display_name:'Ana Admin',email:'ana@example.test',operations_role:operationsAdmin?'admin':null,cms_role:cmsAdmin?'admin':null,self:true},
  {user_id:ids.peer,display_name:'Bao Admin',email:'bao@example.test',operations_role:'admin',cms_role:'admin'},
  {user_id:ids.staff,display_name:'Chi Staff',email:'chi@example.test',operations_role:'staff',cms_role:null},
  {user_id:ids.editor,display_name:'',email:'dung@example.test',operations_role:null,cms_role:'editor',account:'unavailable'}
 ].map(member=>({account:'active',display_name_override:null,...member}));
 const capabilities=member=>({
  ...member,manage_operations:operationsAdmin&&!member.self&&member.operations_role!=='admin',
  manage_cms:cmsAdmin&&!member.self&&member.cms_role!=='admin',
  manage_membership:!member.self&&member.operations_role!=='admin'&&member.cms_role!=='admin'&&
   (!member.operations_role||operationsAdmin)&&(!member.cms_role||cmsAdmin)
 });
 const db={storage,rpc:async(name,args)=>{
  calls.push({name,args});
  const custom=respond(name,args);if(custom)return custom;
  if(name==='gary_staff_access_list')return result({members:members.map(capabilities),operations_role:operationsAdmin?'admin':null,cms_role:cmsAdmin?'admin':null});
  if(name==='gary_lookup_staff_account')return result({email:args.p_email.toLowerCase(),full_name:'Verified Name'});
  if(name==='gary_add_staff_member'){
   const user_id=`10000000-0000-4000-8000-00000000001${members.length}`;
   members.push({user_id,display_name:args.p_full_name||'',display_name_override:args.p_full_name,email:args.p_email,
    operations_role:args.p_operations_role,cms_role:args.p_cms_role,account:'active'});
   return result({user_id});
  }
  const member=members.find(item=>item.user_id===args.p_user_id);
  if(name==='gary_edit_staff_member'){
   Object.assign(member,{display_name:args.p_full_name||member.display_name,display_name_override:args.p_full_name,
    operations_role:args.p_operations_role,cms_role:args.p_cms_role});
  }else if(name==='gary_remove_staff_member')members=members.filter(item=>item!==member);
  else throw new Error('Unexpected RPC '+name);
  return result({user_id:args.p_user_id});
 }};
 const t=key=>portalCopy[doc.documentElement.lang]?.[key]??portalCopy.en[key]??key;
 const controller=createStaffAccess({db,doc,t,canManage:()=>allowed,notify:key=>notices.push(key)});
 const form=$('#staff-access-add'),editForm=$('#staff-access-edit');
 const control=(name,target=form)=>target.elements.namedItem(name);
 const row=id=>$(`[data-staff-member="${id}"]`);
 const action=(id,key)=>row(id)?.querySelector(`[data-staff-action="${key}"]`);
 const input=(node,value)=>{node.value=value;node.dispatchEvent(new dom.window.Event('input',{bubbles:true}));};
 const submit=async(target,values={})=>{
  for(const [name,value] of Object.entries(values))input(control(name,target),value);
  target.requestSubmit();
  await settle();
 };
 return {dom,doc,$,calls,notices,controller,row,action,form,editForm,control,input,submit,close:()=>dom.window.close(),
  rpcs:name=>calls.filter(call=>call.name===name).map(call=>call.args),revoke(){allowed=false}};
}

test('Team Access preserves eligible portraits, initials and action focus',async()=>{
 let resolve,paths;
 const photos=new Promise(completed=>{resolve=completed;});
 const h=harness({storage:{from(bucket){
  assert.equal(bucket,'gary-visa-avatars');
  return {createSignedUrls(names,ttl){paths=names;assert.equal(ttl,600);return photos;}};
 }}});
 try{
  await h.controller.enter();
  const button=h.action(ids.staff,'edit'),avatar=h.row(ids.staff).querySelector('[data-staff-avatar]');
  assert.equal(avatar.textContent,'CS');
  assert.ok(paths.includes(`${ids.staff}/avatar`));assert.ok(!paths.includes(`${ids.editor}/avatar`));
  button.focus();
  resolve({data:[{path:`${ids.staff}/avatar`,signedUrl:'https://storage.example.test/staff-photo'}]});
  await settle();
  assert.equal(avatar.querySelector('img').src,'https://storage.example.test/staff-photo');
  assert.equal(h.doc.activeElement,button);
  assert.equal(h.row(ids.editor).querySelector('img'),null);
  avatar.querySelector('img').dispatchEvent(new h.dom.window.Event('error'));
  assert.equal(avatar.textContent,'CS');
 }finally{h.close();}
});

test('Team Access displays staff names, independent role controls and updated permissions',async()=>{
 const h=harness();
 try{
  await h.controller.enter();
  assert.deepEqual([...h.$('.staff-access-grid').children].map(node=>node.className),['staff-access-main','applications-panel staff-access-guide']);
  assert.deepEqual([...h.$('.staff-access-main').children].map(node=>node.className),['applications-panel staff-access-add-panel','applications-panel staff-access-directory']);
  assert.equal(h.doc.querySelectorAll('.staff-access-protections li').length,6);
  assert.equal(h.doc.querySelectorAll('.staff-access-member').length,4);
  assert.match(h.$('[data-p=role_operations_manager_help]').textContent,/only on assigned cases/);
  assert.match(h.$('[data-p=role_cms_publisher_help]').textContent,/Review, publish, unpublish and archive.*Cannot create or edit/);
  const chi=h.row(ids.staff);
  assert.equal(chi.querySelector('.staff-access-details strong').textContent,'Chi Staff');
  assert.equal(chi.querySelector('.staff-access-details small').textContent,'chi@example.test');
  assert.equal(h.row(ids.editor).querySelector('.staff-access-status').textContent,'Sign-in unavailable');
  assert.equal(h.row(ids.editor).querySelector('strong').textContent,'dung@example.test');
  for(const protectedId of [ids.self,ids.peer]){
   assert.equal(h.action(protectedId,'edit'),null);assert.equal(h.action(protectedId,'remove'),null);
  }
  assert.equal(h.action(ids.editor,'remove'),null,'Operations Admin cannot revoke an active CMS role');
  h.action(ids.staff,'edit').click();
  const operations=h.control('operations',h.editForm),cms=h.control('cms',h.editForm);
  assert.deepEqual([...operations.options].map(option=>option.value),['','staff','manager']);
  assert.equal(operations.value,'staff');assert.equal(cms.disabled,true);assert.equal(cms.closest('.form-field').hidden,true);
  assert.equal(h.doc.activeElement,h.$('#staff-access-edit-title'));
  assert.equal([...h.doc.querySelectorAll('#staff-access-view option')].some(option=>option.value==='admin'),false);
  assert.equal(h.$('#staff-access-view input[type=password],#staff-access-view a[href]'),null);
 }finally{h.close();}
});

test('Team Access looks up verified names and sends a Visa override with allowed roles',async()=>{
 let release;
 const pending=new Promise(resolve=>{release=resolve;});
 const h=harness({respond:(name,args)=>{
  if(name==='gary_lookup_staff_account'&&args.p_email==='unknown@example.test')return failure('P0002','AGENCY_ACCOUNT_UNAVAILABLE');
  if(name!=='gary_add_staff_member')return null;
  return {
   'known@example.test':failure('23505','AGENCY_STAFF_EXISTS'),'broken@example.test':failure('XX000','Unexpected failure'),
   'slow@example.test':pending
  }[args.p_email];
 }});
 try{
  await h.controller.enter();
  const email=h.control('email'),name=h.control('full_name'),submit=h.form.querySelector('[type=submit]');
  const find=h.$('#staff-access-find'),feedback=()=>h.$('#staff-access-add-feedback').textContent;
  assert.equal(h.$(`label[for="${name.id}"]`).textContent,'Full name');
  assert.ok(h.control('cms').disabled);
  assert.equal(h.$('#staff-access-add-cms-hint').hidden,false);
  await h.submit(h.form);assert.equal(email.getAttribute('aria-invalid'),'true');
  await h.submit(h.form,{email:'new@example.test'});assert.match(feedback(),/at least one role/);
  assert.equal(h.rpcs('gary_add_staff_member').length,0);
  h.input(email,'unknown@example.test');find.click();await settle();
  assert.match(feedback(),/No eligible, verified account/);assert.equal(h.doc.activeElement,email);
  h.input(email,'NEW@EXAMPLE.TEST');find.click();await settle();
  assert.equal(email.value,'new@example.test');assert.equal(name.value,'Verified Name');assert.equal(h.doc.activeElement,name);
  assert.match(feedback(),/Verified account found/);
  assert.deepEqual(h.rpcs('gary_lookup_staff_account').at(-1),{p_email:'NEW@EXAMPLE.TEST'});
  h.input(email,'another@example.test');assert.equal(name.value,'','another address clears the prior identity');
  find.click();await settle();
  await h.submit(h.form,{full_name:'Visa Display',operations:'manager',cms:'editor'});
  assert.deepEqual(h.rpcs('gary_add_staff_member'),[{p_email:'another@example.test',p_full_name:'Visa Display',p_operations_role:'manager',p_cms_role:null}]);
  assert.deepEqual([email.value,name.value,feedback()],['','','']);assert.equal(h.doc.activeElement,email);
  assert.equal(h.$('[data-staff-member="10000000-0000-4000-8000-000000000014"] strong').textContent,'Visa Display');
  for(const [address,message] of [['known@example.test',/already on the Gary Visa team/],['broken@example.test',/could not be added/]]){
   await h.submit(h.form,{email:address,operations:'staff'});assert.match(feedback(),message);
  }
  assert.equal(email.hasAttribute('aria-invalid'),false);
  await h.submit(h.form,{email:'slow@example.test',operations:'staff'});
  assert.deepEqual([submit.disabled,submit.getAttribute('aria-busy'),email.readOnly,h.action(ids.staff,'edit').disabled],[true,'true',true,true]);
  release(result({user_id:'added'}));await settle();
  assert.deepEqual([submit.disabled,submit.hasAttribute('aria-busy'),email.readOnly],[false,false,false]);
  assert.deepEqual(h.notices,['staffAdded','staffAdded']);
 }finally{h.close();}
});

test('Team Access edits atomically, confirms No Access and refreshes conflicts',async()=>{
 const h=harness({respond:(name,args)=>args?.p_user_id===ids.editor?failure('40001','AGENCY_ROLE_CONFLICT'):null});
 try{
  await h.controller.enter();
  h.action(ids.staff,'edit').click();
  await h.submit(h.editForm,{full_name:'Chi Visa',operations:'manager',cms:'editor'});
  assert.deepEqual(h.rpcs('gary_edit_staff_member'),[{p_user_id:ids.staff,p_full_name:'Chi Visa',p_expected_name:null,
   p_operations_role:'manager',p_expected_operations_role:'staff',p_cms_role:null,p_expected_cms_role:null}]);
  assert.deepEqual(h.notices,['staffRoleSaved']);assert.equal(h.editForm.hidden,true);
  assert.equal(h.row(ids.staff).querySelector('strong').textContent,'Chi Visa');
  assert.equal(h.doc.activeElement,h.action(ids.staff,'edit'));
  h.action(ids.staff,'edit').click();
  h.dom.window.confirm=()=>false;await h.submit(h.editForm,{operations:''});
  assert.equal(h.rpcs('gary_edit_staff_member').length,1);assert.equal(h.editForm.hidden,false);
  h.dom.window.confirm=()=>true;await h.submit(h.editForm);
  assert.equal(h.rpcs('gary_edit_staff_member').at(-1).p_expected_operations_role,'manager');
  assert.equal(h.rpcs('gary_edit_staff_member').at(-1).p_operations_role,null);
  assert.match(h.row(ids.staff).querySelector('.staff-access-status').textContent,/No access/);
  const reloads=h.rpcs('gary_staff_access_list').length;
  h.action(ids.editor,'edit').click();await h.submit(h.editForm,{operations:'staff'});
  assert.match(h.$('#staff-access-notice').textContent,/changed this staff record/);
  assert.equal(h.rpcs('gary_staff_access_list').length,reloads+1);assert.equal(h.editForm.hidden,true);
 }finally{h.close();}
});

test('Team Access confirms removal and tells staff to reassign active cases first',async()=>{
 let assigned=true;
 const h=harness({respond:name=>name==='gary_remove_staff_member'&&assigned?failure('23514','AGENCY_STAFF_CASES_ASSIGNED'):null});
 try{
  await h.controller.enter();
  h.dom.window.confirm=prompt=>{assert.match(prompt,/Gary Visa.*records will be kept/);assert.match(prompt,/Chi Staff/);return false;};
  h.action(ids.staff,'remove').click();assert.equal(h.rpcs('gary_remove_staff_member').length,0);
  h.dom.window.confirm=()=>true;h.action(ids.staff,'remove').click();await settle();
  assert.deepEqual(h.rpcs('gary_remove_staff_member'),[{p_user_id:ids.staff,p_expected_operations_role:'staff',p_expected_cms_role:null}]);
  assert.match(h.$('#staff-access-notice').textContent,/Reassign this person’s active cases/);
  assert.equal(h.doc.activeElement,h.$('#staff-access-notice'));assert.ok(h.row(ids.staff));
  assigned=false;h.action(ids.staff,'remove').click();await settle();
  assert.equal(h.row(ids.staff),null);assert.deepEqual(h.notices,['staffRemoved']);
  assert.equal(h.doc.activeElement,h.$('#refresh-staff-access'));
 }finally{h.close();}
});

test('Team Access keeps CMS authority separate, translates feedback and locks after access loss',async()=>{
 const h=harness({operationsAdmin:false,cmsAdmin:true,respond:(name,args)=>name==='gary_edit_staff_member'&&args.p_cms_role==='publisher'?
  failure('42501','AGENCY_CMS_ADMIN_REQUIRED'):null});
 try{
  await h.controller.enter();h.action(ids.staff,'edit').click();
  assert.equal(h.control('operations',h.editForm).disabled,true);
  assert.equal(h.control('full_name',h.editForm).readOnly,true);
  assert.deepEqual([...h.control('cms',h.editForm).options].map(option=>option.value),['','editor','publisher']);
  assert.equal(h.action(ids.staff,'remove'),null);
  await h.submit(h.editForm,{operations:'manager',full_name:'Tampered',cms:'editor'});
  const edit=h.rpcs('gary_edit_staff_member').at(-1);
  assert.deepEqual([edit.p_operations_role,edit.p_full_name,edit.p_cms_role],['staff',null,'editor']);
  h.action(ids.staff,'edit').click();await h.submit(h.editForm,{cms:'publisher'});
  assert.match(h.$('#staff-access-edit-feedback').textContent,/Only a CMS Admin/);
  await h.submit(h.form,{email:'',cms:'editor'});
  h.doc.documentElement.lang='vi';h.controller.render();
  assert.equal(h.control('cms',h.editForm).options[0].textContent,'Không có quyền');
  assert.equal(h.$('#staff-access-add-feedback').textContent,portalCopy.vi.staffAddInvalidEmail);
  assert.equal(h.row(ids.editor).querySelector('.staff-access-status').textContent,'Không thể đăng nhập');
  h.revoke();const before=h.calls.length;
  await h.submit(h.editForm,{cms:''});await h.submit(h.form,{email:'late@example.test',cms:'editor'});
  assert.equal(h.calls.length,before);
  h.controller.reset();assert.equal(h.editForm.hidden,true);assert.equal(h.$('#staff-access-list').children.length,0);
  assert.equal(h.control('email').value,'');assert.equal(h.form.querySelector('[type=submit]').disabled,true);
 }finally{h.close();}
});

test('Team Access explains an unavailable migration and protected edits in both languages',async()=>{
 const h=harness({respond:(name,args)=>name==='gary_add_staff_member'?failure('PGRST202','Unknown RPC'):
  args?.p_operations_role==='manager'?failure('42501','AGENCY_PROTECTED_ROLE'):null});
 try{
  await h.controller.enter();await h.submit(h.form,{email:'new@example.test',operations:'staff'});
  assert.equal(h.$('#staff-access-add-feedback').textContent,portalCopy.en.staffAccessMigrationRequired);
  assert.equal(h.control('email').value,'new@example.test');assert.equal(h.control('email').hasAttribute('aria-invalid'),false);
  h.doc.documentElement.lang='vi';h.controller.render();
  assert.equal(h.$('#staff-access-add-feedback').textContent,portalCopy.vi.staffAccessMigrationRequired);
  h.action(ids.staff,'edit').click();await h.submit(h.editForm,{operations:'manager'});
  assert.equal(h.$('#staff-access-edit-feedback').textContent,portalCopy.vi.staffAdminProtected);
 }finally{h.close();}
});
