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

function harness({operationsAdmin=true,cmsAdmin=false,respond=()=>null,storage,width=1440}={}){
 const dom=new JSDOM(html,{url:'http://localhost:4173/portal.html?area=staff',pretendToBeVisual:true});
 dom.window.innerWidth=width;
 const doc=dom.window.document,$=selector=>doc.querySelector(selector),calls=[],notices=[];
 const {HTMLDialogElement,Event}=dom.window;
 HTMLDialogElement.prototype.showModal=function(){this.open=true;};
 HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new Event('close'));};
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
 const controller=createStaffAccess({db,doc,t,canView:()=>allowed,notify:key=>notices.push(key)});
 const form=$('#staff-access-form'),drawer=$('#staff-access-drawer'),feedback=$('#staff-access-feedback');
 const openAdd=()=>$('#staff-access-open-add').click();
 const control=name=>form.elements.namedItem(name);
 const row=id=>$(`[data-staff-member="${id}"]`);
 const action=(id,key)=>row(id)?.querySelector(`[data-staff-action="${key}"]`);
 const input=(node,value)=>{node.value=value;node.dispatchEvent(new dom.window.Event('input',{bubbles:true}));};
 const submit=async(values={})=>{
  for(const [name,value] of Object.entries(values))input(control(name),value);
  form.requestSubmit();
  await settle();
 };
 const translate=lang=>{
  doc.documentElement.lang=lang;
  for(const node of doc.querySelectorAll('#staff-access-view [data-p]'))node.textContent=t(node.dataset.p);
  controller.render();
 };
 return {dom,doc,$,calls,notices,controller,row,action,form,drawer,feedback,openAdd,control,input,submit,translate,close:()=>dom.window.close(),
  rpcs:name=>calls.filter(call=>call.name===name).map(call=>call.args),revoke(){allowed=false},
  updateMember:(id,changes)=>Object.assign(members.find(member=>member.user_id===id),changes)};
}

test('Team Access displays visible accounts to read-only staff without offering management actions',async()=>{
 const member={user_id:ids.self,display_name:'Casey Staff',email:'casey@example.test',operations_role:'staff',self:true};
 const h=harness({operationsAdmin:false,respond:name=>name==='gary_staff_access_list'?result({
  members:[member],operations_role:'staff',cms_role:null
 }):null});
 try{
  await h.controller.enter();
  assert.match(h.row(ids.self).textContent,/Casey Staff/);
  assert.equal(h.$('#staff-access-open-add').hidden,true);
  assert.equal(h.action(ids.self,'edit'),null);
  assert.equal(h.action(ids.self,'more'),null);
 }finally{h.close();}
});

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

test('Team Access prioritizes the directory and collapses permissions without exposing protected actions',async()=>{
 const h=harness();
 try{
  await h.controller.enter();
  assert.equal(h.$('#staff-access-view > .staff-access-directory h2').textContent,'Staff directory');
  const permissions=h.$('details.staff-access-guide');
  assert.equal(permissions.open,true);
  assert.equal(permissions.querySelector('summary').textContent,'View permissions');
  permissions.querySelector('summary').click();
  assert.equal(permissions.open,false);
  permissions.querySelector('summary').click();
  assert.equal(permissions.open,true);
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
   assert.equal(h.action(protectedId,'edit'),null);assert.equal(h.action(protectedId,'more'),null);
  }
  assert.equal(h.action(ids.editor,'remove'),null,'Operations Admin cannot revoke an active CMS role');
  h.action(ids.staff,'edit').click();
  const operations=h.control('operations'),cms=h.control('cms');
  assert.deepEqual([...operations.options].map(option=>option.value),['','staff','manager']);
  assert.equal(operations.value,'staff');assert.equal(cms.disabled,true);assert.equal(cms.value,'');
  assert.equal(h.control('email').value,'chi@example.test');
  assert.equal(h.control('email').readOnly,true);
  assert.equal(h.doc.activeElement,h.$('#staff-access-drawer-title'));
  assert.equal(h.drawer.getAttribute('aria-labelledby'),h.doc.activeElement.id);
  assert.equal(h.action(ids.staff,'edit').getAttribute('aria-label'),'Edit access for Chi Staff');
  assert.equal([...h.form.querySelectorAll('option')].some(option=>option.value==='admin'),false);
  assert.equal(h.$('#staff-access-view input[type=password],#staff-access-view a[href]'),null);
 }finally{h.close();}
});

test('View Permissions starts collapsed on mobile and preserves the user’s choice',async()=>{
 const h=harness({width:390});try{
  await h.controller.enter();
  const guide=h.$('.staff-access-guide');
  assert.equal(guide.open,false);
  guide.querySelector('summary').click();
  assert.equal(guide.open,true);
  h.translate('vi');
  h.controller.leave();
  await h.controller.enter();
  assert.equal(guide.open,true);
  guide.querySelector('summary').click();
  h.controller.reset();
  await h.controller.enter();
  assert.equal(guide.open,false);
 }finally{h.close();}
});

test('directory headings and rows use five shared tracks with actions at the right edge',async()=>{
 const css=await readFile(new URL('../dist/workspace-tools.css',import.meta.url),'utf8');
 assert.match(css,/\.staff-access-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0, 2fr\) minmax\(max-content, 1\.2fr\) repeat\(2, minmax\(max-content, 1fr\)\) max-content;/);
 assert.match(css,/\.staff-access-columns, \.staff-access-list, \.staff-access-member\s*\{[^}]*grid-column: 1 \/ -1;[^}]*grid-template-columns: subgrid;/);
 assert.match(css,/\.staff-access-row-actions, \.staff-access-columns \[data-col=actions\]\s*\{ grid-column: 5; justify-self: end;/);
});

test('Team Access searches names and emails and combines independently labelled filters',async()=>{
 const h=harness();
 try{
  await h.controller.enter();
  const search=h.$('#staff-access-search'),count=h.$('#staff-access-result-count');
  const shown=()=>[...h.doc.querySelectorAll('[data-staff-member]')].map(row=>row.dataset.staffMember);
  const pick=(id,value)=>{
   const select=h.$('#staff-filter-'+id);
   select.value=value;
   select.dispatchEvent(new h.dom.window.Event('change',{bubbles:true}));
  };
  for(const node of h.$('#staff-access-filters').elements)assert.equal(node.labels.length,1);
  search.focus();
  h.input(search,' CHÍ   staff ');
  assert.deepEqual(shown(),[ids.staff]);
  assert.equal(h.doc.activeElement,search);
  assert.equal(count.textContent,'Showing 1 staff');
  assert.equal(count.getAttribute('role'),'status');
  h.input(search,'EXAMPLE.TEST');
  pick('operations','none');pick('cms','editor');pick('status','unavailable');
  assert.deepEqual(shown(),[ids.editor]);
  pick('status','active');
  assert.deepEqual(shown(),[]);
  assert.equal(h.$('.staff-access-columns').hidden,true);
  assert.match(h.$('#staff-access-list').textContent,/No staff match/);
  h.translate('vi');
  assert.match(h.$('#staff-access-list').textContent,/Không tìm thấy nhân viên/);
  assert.equal(h.$('#staff-filter-status').value,'active');
  h.$('#staff-access-clear').click();
  assert.equal(shown().length,4);
  assert.equal(h.$('.staff-access-columns').hidden,false);
  assert.equal(search.value,'');
  assert.equal(h.doc.activeElement,search);
  assert.equal(h.rpcs('gary_staff_access_list').length,1);
 }finally{h.close();}
});

test('Team Access keeps separate drawer drafts and gives keyboard focus back to the launcher',async()=>{
 const h=harness({cmsAdmin:true});
 try{
  await h.controller.enter();h.openAdd();
  h.input(h.control('email'),'new@example.test');
  h.input(h.control('full_name'),'New Visa Name');
  h.input(h.control('operations'),'manager');
  h.input(h.control('cms'),'publisher');
  const cancel=new h.dom.window.Event('cancel',{cancelable:true});
  h.drawer.dispatchEvent(cancel);
  assert.equal(cancel.defaultPrevented,true);
  assert.equal(h.drawer.open,false);
  assert.equal(h.doc.activeElement,h.$('#staff-access-open-add'));
  h.action(ids.staff,'edit').click();
  assert.equal(h.$('#staff-access-find').hidden,true);
  assert.equal(h.control('email').value,'chi@example.test');
  h.input(h.control('full_name'),'Chi Draft');
  h.drawer.close();
  assert.equal(h.doc.activeElement,h.action(ids.staff,'edit'));
  h.openAdd();h.translate('vi');
  assert.equal(h.drawer.open,true);
  assert.deepEqual(['email','full_name','operations','cms'].map(name=>h.control(name).value),
   ['new@example.test','New Visa Name','manager','publisher']);
  assert.equal(h.$('#staff-access-close').getAttribute('aria-label'),'Đóng');
  await h.submit();
  assert.deepEqual(h.rpcs('gary_add_staff_member'),[{p_email:'new@example.test',p_full_name:'New Visa Name',
   p_operations_role:'manager',p_cms_role:'publisher'}]);
  h.action(ids.staff,'edit').click();
  assert.equal(h.control('full_name').value,'Chi Draft');
  h.controller.leave();
  assert.equal(h.drawer.open,false);
  await h.controller.enter();
  h.action(ids.staff,'edit').click();
  assert.equal(h.control('full_name').value,'Chi Draft');
  assert.equal(h.rpcs('gary_edit_staff_member').length,0);
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
  await h.controller.enter();h.openAdd();
  const email=h.control('email'),name=h.control('full_name'),submit=h.form.querySelector('[type=submit]');
  const find=h.$('#staff-access-find'),feedback=()=>h.feedback.textContent;
  assert.equal(h.$(`label[for="${name.id}"]`).textContent,'Visa display name');
  assert.ok(h.control('cms').disabled);
  assert.equal(h.$('#staff-access-cms-hint').hidden,false);
  await h.submit();assert.equal(email.getAttribute('aria-invalid'),'true');
  await h.submit({email:'new@example.test'});assert.match(feedback(),/at least one role/);
  assert.equal(h.rpcs('gary_add_staff_member').length,0);
  h.input(email,'unknown@example.test');find.click();await settle();
  assert.match(feedback(),/No eligible, verified account/);assert.equal(h.doc.activeElement,email);
  h.input(email,'NEW@EXAMPLE.TEST');find.click();await settle();
  assert.equal(email.value,'new@example.test');assert.equal(name.value,'Verified Name');assert.equal(h.doc.activeElement,name);
  assert.match(feedback(),/Verified account found/);
  assert.deepEqual(h.rpcs('gary_lookup_staff_account').at(-1),{p_email:'NEW@EXAMPLE.TEST'});
  h.input(email,'another@example.test');assert.equal(name.value,'','another address clears the prior identity');
  find.click();await settle();
  await h.submit({full_name:'Visa Display',operations:'manager',cms:'editor'});
  assert.deepEqual(h.rpcs('gary_add_staff_member'),[{p_email:'another@example.test',p_full_name:'Visa Display',p_operations_role:'manager',p_cms_role:null}]);
  assert.equal(h.drawer.open,false);
  assert.equal(h.doc.activeElement,h.$('#staff-access-open-add'));
  assert.equal(h.$('[data-staff-member="10000000-0000-4000-8000-000000000014"] strong').textContent,'Visa Display');
  h.openAdd();assert.deepEqual([email.value,name.value,feedback()],['','','']);
  for(const [address,message] of [['known@example.test',/already on the Gary Visa team/],['broken@example.test',/could not be added/]]){
   await h.submit({email:address,operations:'staff'});assert.match(feedback(),message);
  }
  assert.equal(email.hasAttribute('aria-invalid'),false);
  await h.submit({email:'slow@example.test',operations:'staff'});
  assert.deepEqual([submit.disabled,submit.getAttribute('aria-busy'),email.readOnly,h.action(ids.staff,'edit').disabled],[true,'true',true,true]);
  assert.deepEqual(h.notices,['staffAdded']);
  release(result({user_id:'added'}));await settle();
  assert.deepEqual([h.drawer.open,submit.hasAttribute('aria-busy')],[false,false]);
  assert.deepEqual(h.notices,['staffAdded','staffAdded']);
 }finally{h.close();}
});

test('Team Access edits atomically, confirms No Access and refreshes conflicts',async()=>{
 let concurrentEdit=false;
 const h=harness({respond:name=>{
  if(name!=='gary_edit_staff_member'||!concurrentEdit)return null;
  concurrentEdit=false;
  h.updateMember(ids.staff,{operations_role:'staff'});
  return failure('PT409','AGENCY_ROLE_CONFLICT');
 }});
 try{
  await h.controller.enter();
  h.action(ids.staff,'edit').click();
  await h.submit({full_name:'Chi Visa',operations:'manager',cms:'editor'});
  assert.deepEqual(h.rpcs('gary_edit_staff_member'),[{p_user_id:ids.staff,p_full_name:'Chi Visa',p_expected_name:null,
   p_operations_role:'manager',p_expected_operations_role:'staff',p_cms_role:null,p_expected_cms_role:null}]);
  assert.deepEqual(h.notices,['staffRoleSaved']);assert.equal(h.drawer.open,false);
  assert.equal(h.row(ids.staff).querySelector('strong').textContent,'Chi Visa');
  assert.equal(h.doc.activeElement,h.action(ids.staff,'edit'));
  h.action(ids.staff,'edit').click();
  h.dom.window.confirm=()=>false;await h.submit({operations:''});
  assert.equal(h.rpcs('gary_edit_staff_member').length,1);assert.equal(h.drawer.open,true);
  h.dom.window.confirm=()=>true;await h.submit();
  assert.equal(h.rpcs('gary_edit_staff_member').at(-1).p_expected_operations_role,'manager');
  assert.equal(h.rpcs('gary_edit_staff_member').at(-1).p_operations_role,null);
  assert.match(h.row(ids.staff).querySelector('.staff-access-status').textContent,/No access/);
  const reloads=h.rpcs('gary_staff_access_list').length;
  concurrentEdit=true;
  h.action(ids.staff,'edit').click();await h.submit({operations:'manager',full_name:'Chi draft'});
  assert.match(h.feedback.textContent,/changed this staff record/);
  assert.equal(h.rpcs('gary_staff_access_list').length,reloads+1);
  assert.equal(h.drawer.open,true);assert.equal(h.control('operations').value,'manager');
  assert.equal(h.control('full_name').value,'Chi draft');
  assert.equal(h.notices.length,2);
  await h.submit();
  assert.deepEqual(h.rpcs('gary_edit_staff_member').at(-1),{
   p_user_id:ids.staff,p_full_name:'Chi draft',p_expected_name:'Chi Visa',p_operations_role:'manager',
   p_expected_operations_role:'staff',p_cms_role:null,p_expected_cms_role:null
  });
  assert.equal(h.drawer.open,false);
 }finally{h.close();}
});

test('Team Access confirms removal and tells staff to reassign active cases first',async()=>{
 let assigned=true;
 const h=harness({respond:name=>name==='gary_remove_staff_member'&&assigned?failure('23514','AGENCY_STAFF_CASES_ASSIGNED'):null});
 try{
  await h.controller.enter();
  const more=h.action(ids.staff,'more'),remove=h.action(ids.staff,'remove');
  const menu=h.doc.getElementById(more.getAttribute('aria-controls'));
  menu.querySelector('.staff-access-edit-menu').style.display='none';
  const press=(element,key)=>element.dispatchEvent(new h.dom.window.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
  assert.equal(more.getAttribute('aria-label'),'More actions for Chi Staff');
  assert.equal(menu.hasAttribute('inert'),true);
  remove.click();assert.equal(h.rpcs('gary_remove_staff_member').length,0);
  more.focus();press(more,'ArrowDown');
  assert.equal(more.getAttribute('aria-expanded'),'true');
  assert.equal(menu.hasAttribute('inert'),false);
  assert.equal(h.doc.activeElement,remove);
  press(remove,'Escape');
  assert.equal(more.getAttribute('aria-expanded'),'false');
  assert.equal(menu.hasAttribute('inert'),true);
  assert.equal(h.doc.activeElement,more);
  more.click();h.$('#staff-access-search').focus();
  assert.equal(menu.hasAttribute('inert'),true);
  const revoke=()=>{h.action(ids.staff,'more').click();h.action(ids.staff,'remove').click();};
  h.dom.window.confirm=prompt=>{assert.match(prompt,/Gary Visa.*records will be kept/);assert.match(prompt,/Chi Staff/);return false;};
  revoke();assert.equal(h.rpcs('gary_remove_staff_member').length,0);
  h.dom.window.confirm=()=>true;revoke();await settle();
  assert.deepEqual(h.rpcs('gary_remove_staff_member'),[{p_user_id:ids.staff,p_expected_operations_role:'staff',p_expected_cms_role:null}]);
  assert.match(h.$('#staff-access-notice').textContent,/Reassign this person’s active cases/);
  assert.equal(h.doc.activeElement,h.$('#staff-access-notice'));assert.ok(h.row(ids.staff));
  assigned=false;revoke();await settle();
  assert.equal(h.row(ids.staff),null);assert.deepEqual(h.notices,['staffRemoved']);
  assert.equal(h.doc.activeElement,h.$('#refresh-staff-access'));
 }finally{h.close();}
});

test('375px staff cards group compact labels and copy the one full email without changing management actions',async()=>{
 const h=harness({width:375});
 try{
  const fullName='Nguyễn Thị '+ 'Minh '.repeat(15)+'Anh';
  const email='long.staff.address.'.repeat(8)+'@example.test';
  h.updateMember(ids.editor,{email,display_name:fullName,cms_role:'publisher'});
  h.$('#staff-access-list').style.setProperty('--staff-access-card-layout','1');
  await h.controller.enter();
  h.translate('vi');
  const row=h.row(ids.editor),copy=h.action(ids.editor,'copy-email'),meta=row.querySelector('.staff-access-member-meta');
  const more=h.action(ids.editor,'more'),menu=h.doc.getElementById(more.getAttribute('aria-controls'));
  const edit=menu.querySelector('[data-staff-action=edit]');
  row.querySelector('.staff-access-edit-desktop').style.display='none';
  assert.equal(row.querySelector('details, summary, .staff-access-identity-panel'),null);
  assert.equal(row.textContent.split(email).length,2);
  assert.equal(row.querySelector('.staff-access-card-name strong').textContent,fullName);
  assert.deepEqual([...meta.children].map(field=>field.querySelector('.staff-access-label').textContent),['Trạng thái','Nghiệp vụ','CMS']);
  assert.equal(meta.querySelector('[data-scope=cms] [aria-hidden=true]').textContent,'Xuất bản');
  assert.equal(meta.querySelector('[data-scope=cms] .staff-access-value').title,'Người xuất bản');
  assert.equal(h.row(ids.staff).querySelector('.staff-access-status [aria-hidden=true]').textContent,'Hoạt động');
  assert.equal(h.$('label[for=staff-access-search]').textContent,'Tìm kiếm');
  assert.equal(h.$('#refresh-staff-access').getAttribute('aria-label'),'Tải lại danh sách');
  const copied=[];
  Object.defineProperty(h.dom.window.navigator,'clipboard',{configurable:true,value:{writeText:async value=>copied.push(value)}});
  copy.focus();copy.click();await settle();
  assert.deepEqual(copied,[email]);
  assert.equal(copy.getAttribute('aria-label'),`Sao chép email: ${email}`);
  Object.defineProperty(h.dom.window.navigator,'clipboard',{value:undefined});
  copy.click();await settle();
  assert.equal(h.dom.window.getSelection().toString(),email);
  assert.equal(h.action(ids.editor,'remove'),null);
  more.click();
  assert.equal(more.getAttribute('aria-expanded'),'true');
  assert.equal(edit.textContent,'Chỉnh sửa');
  assert.equal(h.doc.activeElement,edit);
  edit.click();
  assert.equal(h.drawer.open,true);
  assert.equal(h.control('operations').disabled,false);
  assert.equal(h.control('cms').disabled,true);
  assert.equal(h.control('full_name').readOnly,true);
  h.$('#staff-access-cancel').click();
  assert.equal(h.doc.activeElement,more);
  assert.equal(h.rpcs('gary_remove_staff_member').length,0);
  h.$('#staff-access-list').style.removeProperty('--staff-access-card-layout');
  h.controller.render();
  assert.equal(h.$('label[for=staff-access-search]').textContent,'Tìm theo tên hoặc email');
  assert.equal(h.row(ids.editor).querySelector('.staff-access-identity-panel small').textContent,email);
 }finally{h.close();}
 const css=await readFile(new URL('../dist/workspace-tools.css',import.meta.url),'utf8');
 assert.match(css,/\.staff-access-member-meta \{\s*grid-area: meta;\s*display: grid;\s*grid-template-columns: minmax\(0, 1\.2fr\) repeat\(2, minmax\(0, 1fr\)\)/);
});

test('Team Access keeps CMS authority separate, translates feedback and locks after access loss',async()=>{
 const h=harness({operationsAdmin:false,cmsAdmin:true,respond:(name,args)=>name==='gary_edit_staff_member'&&args.p_cms_role==='publisher'?
  failure('42501','AGENCY_CMS_ADMIN_REQUIRED'):null});
 try{
  await h.controller.enter();h.action(ids.staff,'edit').click();
  assert.equal(h.control('operations').disabled,true);
  assert.equal(h.control('operations').value,'staff');
  assert.equal(h.control('full_name').readOnly,true);
  assert.deepEqual([...h.control('cms').options].map(option=>option.value),['','editor','publisher']);
  assert.equal(h.action(ids.staff,'remove'),null);
  await h.submit({operations:'manager',full_name:'Tampered',cms:'editor'});
  const edit=h.rpcs('gary_edit_staff_member').at(-1);
  assert.deepEqual([edit.p_operations_role,edit.p_full_name,edit.p_cms_role],['staff',null,'editor']);
  h.action(ids.staff,'edit').click();await h.submit({cms:'publisher'});
  assert.match(h.feedback.textContent,/Only a CMS Admin/);
  h.translate('vi');
  assert.equal(h.control('cms').options[0].textContent,'Không có quyền');
  assert.equal(h.feedback.textContent,portalCopy.vi.staffAddCmsLocked);
  assert.equal(h.row(ids.editor).querySelector('.staff-access-status').textContent,'Không thể đăng nhập');
  h.revoke();const before=h.calls.length;
  await h.submit({cms:''});h.$('#staff-access-close').click();h.openAdd();
  assert.equal(h.drawer.open,false);
  assert.equal(h.calls.length,before);
  h.controller.reset();assert.equal(h.drawer.open,false);assert.equal(h.$('#staff-access-list').children.length,0);
  assert.equal(h.control('email').value,'');assert.equal(h.form.querySelector('[type=submit]').disabled,true);
 }finally{h.close();}
});

test('Team Access explains an unavailable migration and protected edits in both languages',async()=>{
 const h=harness({respond:(name,args)=>name==='gary_add_staff_member'?failure('PGRST202','Unknown RPC'):
  args?.p_operations_role==='manager'?failure('42501','AGENCY_PROTECTED_ROLE'):null});
 try{
  await h.controller.enter();h.openAdd();await h.submit({email:'new@example.test',operations:'staff'});
  assert.equal(h.feedback.textContent,portalCopy.en.staffAccessMigrationRequired);
  assert.equal(h.control('email').value,'new@example.test');assert.equal(h.control('email').hasAttribute('aria-invalid'),false);
  h.translate('vi');
  assert.equal(h.feedback.textContent,portalCopy.vi.staffAccessMigrationRequired);
  h.$('#staff-access-close').click();
  h.action(ids.staff,'edit').click();await h.submit({operations:'manager'});
  assert.equal(h.feedback.textContent,portalCopy.vi.staffAdminProtected);
 }finally{h.close();}
});
