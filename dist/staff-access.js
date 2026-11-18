import {workspaceUI} from './workspace-ui.js';
import {initFormControls} from './form-controls.js';
import {avatarBucket,avatarPath,renderAvatar} from './profile-avatar.js';

// Admin is never offered here: granting or removing it is owner-reviewed SQL.
const choices={operations:['staff','manager'],cms:['editor','publisher']},scopes=Object.keys(choices);
const staffErrors=new Map([
 ['AGENCY_STAFF_ADMIN_REQUIRED','staffAdminRequired'],
 ['AGENCY_OPERATIONS_ADMIN_REQUIRED','staffAddOperationsLocked'],
 ['AGENCY_CMS_ADMIN_REQUIRED','staffAddCmsLocked'],
 ['AGENCY_SELF_ROLE_DENIED','staffSelfDenied'],
 ['AGENCY_PROTECTED_ROLE','staffAdminProtected'],
 ['AGENCY_ROLE_CONFLICT','staffRoleConflict'],
 ['AGENCY_ROLE_INVALID','staffRoleInvalid'],
 ['AGENCY_ROLE_REQUIRED','staffAddRoleRequired'],
 ['AGENCY_EMAIL_INVALID','staffAddInvalidEmail'],
 ['AGENCY_ACCOUNT_UNAVAILABLE','staffAddUnavailable'],
 ['AGENCY_TARGET_INELIGIBLE','staffTargetIneligible'],
 ['AGENCY_STAFF_MISSING','staffMemberMissing'],
 ['AGENCY_STAFF_EXISTS','staffAddExists'],
 ['AGENCY_CMS_REVIEW_REQUIRED','staffCmsReviewRequired']
]);
const errorsByCode=new Map([
 ['PGRST202','staffAccessMigrationRequired'],
 ['42883','staffAccessMigrationRequired'],
 ['40001','staffRoleConflict'],
 ['23505','staffAddExists'],
 ['22023','staffAddInvalid'],
 ['42501','staffAdminRequired']
]);
const errorKey=(error,fallback)=>staffErrors.get(error?.message)||errorsByCode.get(error?.code)||fallback;
const emailErrors=['staffAddInvalidEmail','staffAddUnavailable','staffAddExists'];

export function createStaffAccess({db,doc,t,canManage,notify=()=>{},onSaved=()=>{}}){
 const {$,el,take}=workspaceUI(doc,t);
 // authority stays null until the server confirms which Admin areas the caller holds.
 const state={members:[],photos:new Map(),authority:null,busy:'',adding:false,loading:false,failed:false,notice:null,addNotice:null,generation:0,request:0};
 const form=$('#staff-access-add'),email=form.elements.namedItem('email');
 const roleName=(scope,role)=>t(role?`role_${scope}_${role}`:'noAccess');
 const memberName=member=>member.display_name||member.email||t('staffMember');
 function paint(selector,value){const node=$(selector);node.textContent=value?t(value.key):'';node.classList.toggle('error',Boolean(value?.error))}
 function notice(key,error=false){state.notice=key?{key,error}:null;paint('#staff-access-notice',state.notice)}
 function addNotice(key,invalid=false){state.addNotice=key?{key,error:true}:null;paint('#staff-access-add-feedback',state.addNotice);if(invalid)email.setAttribute('aria-invalid','true');else email.removeAttribute('aria-invalid')}
 function status(member){
  const key=member.account==='unavailable'?'unavailable':member.operations_role||member.cms_role?'active':'none';
  return el('span',{class:`staff-access-status is-${key}`},t(`staffStatus_${key}`));
 }
 function field(member,scope){
  const role=member[`${scope}_role`]||'',label=t(scope==='operations'?'operationsAccess':'cmsAccess');
  if(!member[`manage_${scope}`])return el('div',{class:'staff-access-field'},[el('span',{class:'staff-access-label'},label),el('strong',{class:'staff-access-value'},roleName(scope,role)),el('small',{class:'staff-access-protected'},t(member.self?'yourAccount':'viewOnly'))]);
  const id=`staff-${scope}-${member.user_id}`,select=el('select',{id,'data-staff-scope':scope,'data-staff-user':member.user_id},[el('option',{value:''},t('noAccess')),...choices[scope].map(value=>el('option',{value},roleName(scope,value)))]);
  select.value=role;select.disabled=Boolean(state.busy)||state.adding;
  return el('div',{class:'staff-access-field'},[el('label',{for:id},label),select]);
 }
 function renderAdd(){
  const blocked=state.adding||state.loading||Boolean(state.busy);
  for(const scope of scopes){
   const select=form.elements.namedItem(scope),hint=$(`#staff-access-add-${scope}-hint`),allowed=Boolean(state.authority?.[scope]);
   if(!allowed)select.value='';select.disabled=blocked||!allowed;hint.hidden=!state.authority||allowed;
   if(hint.hidden)select.removeAttribute('aria-describedby');else select.setAttribute('aria-describedby',hint.id);
  }
  email.readOnly=state.adding;
  const submit=form.querySelector('button[type=submit]');submit.disabled=blocked||!scopes.some(scope=>state.authority?.[scope]);
  if(state.adding)submit.setAttribute('aria-busy','true');else submit.removeAttribute('aria-busy');
 }
 function render(){
  if(!canManage())return;
  renderAdd();paint('#staff-access-notice',state.notice);paint('#staff-access-add-feedback',state.addNotice);
  const list=$('#staff-access-list'),busy=state.loading||state.adding||Boolean(state.busy);list.setAttribute('aria-busy',String(busy));$('#refresh-staff-access').disabled=busy;
  if(!state.members.length){list.replaceChildren(el('div',{class:'empty-state'},[el('h3',{},t(state.loading?'staffAccessLoading':state.failed?'staffAccessUnavailable':'staffAccessEmpty')),el('p',{},t(state.failed?'staffAccessLoadError':'staffDirectoryIntro'))]));return}
  list.replaceChildren(...state.members.map(member=>{
   const name=memberName(member);
   const avatar=el('span',{class:'user-avatar staff-access-avatar account-avatar','aria-hidden':'true','data-staff-avatar':member.user_id});
   renderAvatar(avatar,name,state.photos.get(member.user_id));
   return el('article',{class:'staff-access-member'},[
    avatar,
    el('div',{class:'staff-access-details'},[el('strong',{},name),member.email&&member.email!==name?el('small',{},member.email):null,el('div',{class:'staff-access-tags'},[status(member),member.self?el('span',{class:'relationship-badge'},t('you')):null])]),
    el('div',{class:'staff-access-controls'},[field(member,'operations'),field(member,'cms')])
   ]);
  }));
  initFormControls(doc).refresh();
 }
 async function loadPhotos(generation,request){
  const byPath=new Map(state.members.filter(member=>member.account!=='unavailable').map(member=>[avatarPath(member.user_id),member]));
  if(!db.storage||!byPath.size)return;
  try{
   const {data,error}=await db.storage.from(avatarBucket).createSignedUrls([...byPath.keys()],600);
   if(error||generation!==state.generation||request!==state.request||!canManage())return;
   for(const {path,signedUrl} of data||[]){
    const member=byPath.get(path);
    if(member&&signedUrl)state.photos.set(member.user_id,signedUrl);
   }
   // The existing role selectors and their focus survive photo resolution.
   const members=new Map(state.members.map(member=>[member.user_id,member]));
   for(const avatar of $('#staff-access-list').querySelectorAll('[data-staff-avatar]')){
    const member=members.get(avatar.dataset.staffAvatar);
    if(member)renderAvatar(avatar,memberName(member),state.photos.get(member.user_id));
   }
  }catch{ /* Keep initials when pictures are unavailable. */ }
 }
 async function load(){
  if(!canManage())return;const generation=state.generation,request=++state.request;state.loading=true;state.failed=false;render();
  try{
   const result=take(await db.rpc('gary_staff_access_list'));
   if(generation!==state.generation||request!==state.request||!canManage())return;
   if(!Array.isArray(result?.members))throw new Error('Invalid staff list');
   state.members=result.members;state.photos.clear();state.authority={operations:result.operations_role==='admin',cms:result.cms_role==='admin'};
   void loadPhotos(generation,request);
  }catch(error){if(generation===state.generation&&request===state.request){state.failed=true;state.members=[];state.authority=null;notice(errorKey(error,'staffAccessLoadError'),true)}}
  finally{if(generation===state.generation&&request===state.request){state.loading=false;render()}}
 }
 async function change(select){
  const scope=select.dataset.staffScope,member=state.members.find(item=>item.user_id===select.dataset.staffUser);
  if(!canManage()||state.busy||state.adding||state.loading||!member||!choices[scope]||!member[`manage_${scope}`])return;
  const previous=member[`${scope}_role`]||null,next=select.value||null,focus=select.id;if(previous===next)return;
  if(next&&!choices[scope].includes(next)){select.value=previous||'';return}
  if(!next&&!doc.defaultView.confirm(t('staffNoAccessConfirm'))){select.value=previous||'';return}
  const generation=state.generation;state.busy=member.user_id;notice('');render();
  try{
   take(await db.rpc(scope==='operations'?'gary_set_operations_role':'gary_set_cms_role',{p_user_id:member.user_id,p_role:next,p_expected_role:previous}));
   if(generation===state.generation){notify('staffRoleSaved');onSaved()}
  }catch(error){if(generation===state.generation)notice(errorKey(error,'staffRoleError'),true)}
  finally{if(generation===state.generation){state.busy='';await load();if(generation===state.generation)doc.getElementById(focus)?.focus({preventScroll:true})}}
 }
 async function add(event){
  event.preventDefault();
  if(!canManage()||!state.authority||state.adding||state.loading||state.busy)return;
  // Out-of-area roles are never sent, even if a disabled control was altered.
  const address=email.value.trim(),roles=Object.fromEntries(scopes.map(scope=>{const value=form.elements.namedItem(scope).value;return [scope,state.authority[scope]&&choices[scope].includes(value)?value:null]}));
  if(!address||address.length>email.maxLength||!email.checkValidity()){addNotice('staffAddInvalidEmail',true);email.focus();return}
  if(!roles.operations&&!roles.cms){addNotice('staffAddRoleRequired');form.elements.namedItem(scopes.find(scope=>state.authority[scope]))?.focus();return}
  const generation=state.generation;state.adding=true;addNotice('');render();
  try{
   take(await db.rpc('gary_add_staff_member',{p_email:address,p_operations_role:roles.operations,p_cms_role:roles.cms}));
   if(generation===state.generation){form.reset();notify('staffAdded');onSaved()}
  }catch(error){if(generation===state.generation){const key=errorKey(error,error?.code==='P0002'?'staffAddUnavailable':'staffAddError');addNotice(key,emailErrors.includes(key))}}
  finally{if(generation===state.generation){state.adding=false;await load();if(generation===state.generation)email.focus({preventScroll:true})}}
 }
 $('#staff-access-list').addEventListener('change',event=>{const select=event.target.closest?.('select[data-staff-scope]');if(select)void change(select)});
 $('#refresh-staff-access').addEventListener('click',()=>{notice('');void load()});
 form.addEventListener('submit',event=>void add(event));
 form.addEventListener('input',()=>{if(state.addNotice)addNotice('')});
 function reset(){state.generation++;state.request++;state.photos.clear();Object.assign(state,{members:[],authority:null,busy:'',adding:false,loading:false,failed:false});form.reset();notice('');addNotice('');renderAdd();$('#staff-access-list').replaceChildren();$('#staff-access-list').removeAttribute('aria-busy');$('#refresh-staff-access').disabled=false}
 return {enter(){notice('');addNotice('');return load()},render,reset};
}
