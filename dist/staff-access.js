import {workspaceUI} from './workspace-ui.js';
import {initFormControls} from './form-controls.js';
import {avatarBucket,avatarPath,renderAvatar} from './profile-avatar.js';

const choices = {operations:['staff','manager'],cms:['editor','publisher']};
const scopes = Object.keys(choices);
const staffErrors = new Map([
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
 ['AGENCY_CMS_REVIEW_REQUIRED','staffCmsReviewRequired'],
 ['AGENCY_STAFF_NAME_INVALID','staffNameInvalid'],
 ['AGENCY_STAFF_NAME_DENIED','staffNameDenied'],
 ['AGENCY_STAFF_REMOVE_DENIED','staffRemoveDenied'],
 ['AGENCY_STAFF_CASES_ASSIGNED','staffCasesAssigned']
]);
const errorsByCode = new Map([
 ['PGRST202','staffAccessMigrationRequired'],['42883','staffAccessMigrationRequired'],
 ['40001','staffRoleConflict'],['23505','staffAddExists'],['22023','staffAddInvalid'],['42501','staffAdminRequired']
]);
const errorKey = (error,fallback) => staffErrors.get(error?.message)||errorsByCode.get(error?.code)||fallback;
const emailErrors = ['staffAddInvalidEmail','staffAddUnavailable','staffAddExists'];

export function createStaffAccess({db,doc,t,canManage,notify=()=>{},onSaved=()=>{}}){
 const {$,el,take}=workspaceUI(doc,t);
 const form=$('#staff-access-add'),editForm=$('#staff-access-edit'),list=$('#staff-access-list');
 const email=form.elements.namedItem('email'),fullName=form.elements.namedItem('full_name');
 const editName=editForm.elements.namedItem('full_name'),findButton=$('#staff-access-find');
 const refreshButton=$('#refresh-staff-access'),cancelEdit=$('#staff-access-edit-cancel');
 const state={members:[],photos:new Map(),authority:null,busy:null,loading:false,failed:false,
  notice:null,addNotice:null,editNotice:null,match:null,edit:null,generation:0,request:0};
 const memberName = member => member.display_name || member.email || t('staffMember');
 const roleName = (scope,role) => t(role ? `role_${scope}_${role}` : 'noAccess');
 const canEdit = member => member.manage_membership || scopes.some(scope=>member[`manage_${scope}`]);
 const blocked = () => state.loading || Boolean(state.busy);
 const canAct = () => canManage() && state.authority && !blocked();

 function paint(selector,value){
  const node=$(selector);
  node.textContent=value?t(value.key):'';
  node.classList.toggle('error',Boolean(value?.error));
 }
 function directoryNotice(key){state.notice=key?{key,error:true}:null;paint('#staff-access-notice',state.notice);}
 function addNotice(key,error=false){
  state.addNotice=key?{key,error}:null;
  paint('#staff-access-add-feedback',state.addNotice);
  if(emailErrors.includes(key))email.setAttribute('aria-invalid','true');
  else email.removeAttribute('aria-invalid');
 }
 function editNotice(key){state.editNotice=key?{key,error:true}:null;paint('#staff-access-edit-feedback',state.editNotice);}
 function status(member){
  const key=member.account==='unavailable'?'unavailable':member.operations_role||member.cms_role?'active':'none';
  return el('span',{class:`staff-access-status is-${key}`},t(`staffStatus_${key}`));
 }
 function roleSummary(member,scope){
  const label=t(scope==='operations'?'operationsAccess':'cmsAccess');
  return el('div',{class:'staff-access-field'},[
   el('span',{class:'staff-access-label'},label),el('strong',{class:'staff-access-value'},roleName(scope,member[`${scope}_role`])),
   member[`manage_${scope}`]?null:el('small',{class:'staff-access-protected'},t(member.self?'yourAccount':'viewOnly'))
  ]);
 }
 function renderAdd(){
  const enabled=Boolean(state.authority?.operations||state.authority?.cms);
  for(const scope of scopes){
   const select=form.elements.namedItem(scope),hint=$(`#staff-access-add-${scope}-hint`),allowed=Boolean(state.authority?.[scope]);
   if(!allowed)select.value='';
   select.disabled=blocked()||!allowed;
   hint.hidden=!state.authority||allowed;
   if(hint.hidden)select.removeAttribute('aria-describedby');
   else select.setAttribute('aria-describedby',hint.id);
  }
  email.readOnly=fullName.readOnly=['lookup','add'].includes(state.busy);
  findButton.disabled=blocked()||!enabled;
  const submit=form.querySelector('[type=submit]');
  submit.disabled=blocked()||!enabled;
  if(state.busy==='add')submit.setAttribute('aria-busy','true');
  else submit.removeAttribute('aria-busy');
 }
 function renderEdit(){
  const member=state.edit;
  editForm.hidden=!member;
  if(!member)return;
  $('#staff-access-edit-email').textContent=member.email||'';
  editName.readOnly=!member.manage_membership||blocked();
  $('#staff-access-edit-name-hint').hidden=!member.manage_membership;
  for(const scope of scopes){
   const select=editForm.elements.namedItem(scope),allowed=member[`manage_${scope}`];
   select.disabled=blocked()||!allowed;
   select.closest('.form-field').hidden=!allowed;
   for(const option of select.options)option.textContent=roleName(scope,option.value);
  }
  cancelEdit.disabled=blocked();
  editForm.querySelector('[type=submit]').disabled=blocked();
  paint('#staff-access-edit-feedback',state.editNotice);
 }
 function action(label,actionName){
  return el('button',{type:'button',class:'button button-outline button-small','data-staff-action':actionName,
   'data-button-variant':actionName==='remove'?'danger':'edit',disabled:blocked()?'':null},t(label));
 }
 function render(){
  if(!canManage())return;
  renderAdd();renderEdit();
  paint('#staff-access-notice',state.notice);
  paint('#staff-access-add-feedback',state.addNotice);
  list.setAttribute('aria-busy',String(blocked()));refreshButton.disabled=blocked();
  if(!state.members.length){
   list.replaceChildren(el('div',{class:'empty-state'},[
    el('h3',{},t(state.loading?'staffAccessLoading':state.failed?'staffAccessUnavailable':'staffAccessEmpty')),
    el('p',{},t(state.failed?'staffAccessLoadError':'staffDirectoryIntro'))
   ]));
  }else list.replaceChildren(...state.members.map(member=>{
   const name=memberName(member);
   const avatar=el('span',{class:'user-avatar staff-access-avatar account-avatar','aria-hidden':'true','data-staff-avatar':member.user_id});
   renderAvatar(avatar,name,state.photos.get(member.user_id));
   return el('article',{class:'staff-access-member','data-staff-member':member.user_id},[
    avatar,el('div',{class:'staff-access-details'},[
     el('strong',{},name),member.email&&member.email!==name?el('small',{},member.email):null,
     el('div',{class:'staff-access-tags'},[status(member),member.self?el('span',{class:'relationship-badge'},t('you')):null])
    ]),
    el('div',{class:'staff-access-controls'},[
     ...scopes.map(scope=>roleSummary(member,scope)),
     canEdit(member)?el('div',{class:'staff-access-row-actions'},[action('staffEdit','edit'),member.manage_membership?action('staffRemove','remove'):null]):null
    ])
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
   const members=new Map(state.members.map(member=>[member.user_id,member]));
   for(const avatar of list.querySelectorAll('[data-staff-avatar]')){
    const member=members.get(avatar.dataset.staffAvatar);
    if(member)renderAvatar(avatar,memberName(member),state.photos.get(member.user_id));
   }
  }catch{ /* Keep initials when pictures are unavailable. */ }
 }
 async function load(){
  if(!canManage())return;
  const generation=state.generation,request=++state.request;
  state.loading=true;state.failed=false;render();
  try{
   const result=take(await db.rpc('gary_staff_access_list'));
   if(generation!==state.generation||request!==state.request||!canManage())return;
   if(!Array.isArray(result?.members))throw new Error('Invalid staff list');
   state.members=result.members;state.photos.clear();
   state.authority={operations:result.operations_role==='admin',cms:result.cms_role==='admin'};
   if(state.edit&&!state.members.some(member=>member.user_id===state.edit.user_id&&canEdit(member)))closeEdit();
   void loadPhotos(generation,request);
  }catch(error){
   if(generation===state.generation&&request===state.request){
    state.failed=true;state.members=[];state.authority=null;closeEdit();
    directoryNotice(errorKey(error,'staffAccessLoadError'));
   }
  }finally{
   if(generation===state.generation&&request===state.request){state.loading=false;render();}
  }
 }

 function readEmail(){
  const address=email.value.trim();
  if(address&&address.length<=email.maxLength&&email.checkValidity())return address;
  addNotice('staffAddInvalidEmail',true);email.focus();
  return '';
 }
 const invalidName = (control,name) => [...name].length>control.maxLength||/[\u0000-\u001f\u007f]/.test(name);
 async function lookup(){
  if(!canAct())return;
  const address=readEmail();if(!address)return;
  const generation=state.generation;
  let found=false;
  state.busy='lookup';addNotice('');render();
  try{
   const result=take(await db.rpc('gary_lookup_staff_account',{p_email:address}));
   if(generation!==state.generation||!canManage()||email.value.trim()!==address)return;
   if(!result?.email)throw new Error('AGENCY_ACCOUNT_UNAVAILABLE');
   email.value=result.email;
   const name=(result.full_name||'').slice(0,fullName.maxLength);
   if(!fullName.value.trim()||fullName.value===state.match?.name)fullName.value=name;
   state.match={email:result.email.toLowerCase(),name};found=true;
   addNotice('staffAccountFound');
  }catch(error){
   if(generation===state.generation&&canManage())addNotice(errorKey(error,'staffLookupError'),true);
  }finally{
   if(generation===state.generation){state.busy=null;render();if(canManage())(found?fullName:email).focus();}
  }
 }
 async function add(event){
  event.preventDefault();
  if(!canAct())return;
  const address=readEmail();if(!address)return;
  const name=fullName.value.trim();
  if(invalidName(fullName,name)){addNotice('staffNameInvalid',true);fullName.focus();return;}
  const roles=Object.fromEntries(scopes.map(scope=>{
   const value=form.elements.namedItem(scope).value;
   return [scope,state.authority[scope]&&choices[scope].includes(value)?value:null];
  }));
  if(!roles.operations&&!roles.cms){
   addNotice('staffAddRoleRequired',true);form.elements.namedItem(scopes.find(scope=>state.authority[scope]))?.focus();return;
  }
  const generation=state.generation;state.busy='add';addNotice('');render();
  try{
   const override=state.match?.email===address.toLowerCase()&&state.match.name===name?null:name||null;
   take(await db.rpc('gary_add_staff_member',{p_email:address,p_full_name:override,p_operations_role:roles.operations,p_cms_role:roles.cms}));
   if(generation===state.generation){form.reset();state.match=null;notify('staffAdded');onSaved();}
  }catch(error){
   if(generation===state.generation)addNotice(errorKey(error,error?.code==='P0002'?'staffAddUnavailable':'staffAddError'),true);
  }finally{
   if(generation===state.generation){state.busy=null;await load();if(generation===state.generation&&canManage())email.focus({preventScroll:true});}
  }
 }

 function editButton(id){return list.querySelector(`[data-staff-member="${id}"] [data-staff-action="edit"]`);}
 function closeEdit(restoreFocus=false){
  const id=state.edit?.user_id;
  state.edit=null;editForm.reset();editForm.hidden=true;editNotice('');
  if(id&&restoreFocus)editButton(id)?.focus({preventScroll:true});
 }
 function openEdit(member){
  state.edit=member;editNotice('');
  editName.value=member.display_name_override??member.display_name??'';
  for(const scope of scopes)editForm.elements.namedItem(scope).value=member[`${scope}_role`]??'';
  renderEdit();initFormControls(doc).refresh();
  $('#staff-access-edit-title').focus({preventScroll:true});
 }
 const expected = member => ({p_user_id:member.user_id,p_expected_operations_role:member.operations_role??null,p_expected_cms_role:member.cms_role??null});
 async function mutateMember(member,rpc,args,success){
  const editing=rpc==='gary_edit_staff_member',generation=state.generation;
  state.busy=editing?'edit':'remove';directoryNotice(null);editNotice(null);render();
  try{
   take(await db.rpc(rpc,args));
   if(generation!==state.generation)return;
   if(editing||state.edit?.user_id===member.user_id)closeEdit();
   notify(success);onSaved();
  }catch(error){
   if(generation!==state.generation)return;
   const key=errorKey(error,editing?'staffRoleError':'staffRemoveError');
   if(editing&&key!=='staffRoleConflict'&&key!=='staffMemberMissing')editNotice(key);
   else {if(editing)closeEdit();directoryNotice(key);}
  }finally{
   if(generation===state.generation){
    state.busy=null;await load();
    if(generation===state.generation&&canManage()){
     const focus=state.notice?$('#staff-access-notice'):state.edit?editForm.querySelector('[type=submit]'):editButton(member.user_id)||refreshButton;
     focus?.focus({preventScroll:true});
    }
   }
  }
 }
 async function saveEdit(event){
  event.preventDefault();
  const member=state.edit;if(!canAct()||!member||!canEdit(member))return;
  const oldName=member.display_name_override??null,inputName=editName.value.trim();
  const name=member.manage_membership&&inputName!==(member.display_name||'')?inputName||null:oldName;
  if(name&&invalidName(editName,name)){editNotice('staffNameInvalid');editName.focus();return;}
  const roles=Object.fromEntries(scopes.map(scope=>[
   scope,member[`manage_${scope}`]?(editForm.elements.namedItem(scope).value||null):member[`${scope}_role`]??null
  ]));
  const roleChanged=scopes.some(scope=>roles[scope]!== (member[`${scope}_role`]??null));
  if(!roleChanged&&name===oldName){closeEdit(true);return;}
  if(scopes.some(scope=>member[`${scope}_role`]&&!roles[scope])&&!doc.defaultView.confirm(t('staffNoAccessConfirm')))return;
  await mutateMember(member,'gary_edit_staff_member',{...expected(member),p_full_name:name,p_expected_name:oldName,
   p_operations_role:roles.operations,p_cms_role:roles.cms},roleChanged?'staffRoleSaved':'staffNameSaved');
 }

 for(const scope of scopes){
  editForm.elements.namedItem(scope).append(...['',...choices[scope]].map(value=>el('option',{value},roleName(scope,value))));
 }
 list.addEventListener('click',event=>{
  const button=event.target.closest('[data-staff-action]');
  if(!button||!canAct())return;
  const member=state.members.find(item=>item.user_id===button.closest('[data-staff-member]')?.dataset.staffMember);
  if(!member)return;
  if(button.dataset.staffAction==='edit'&&canEdit(member))openEdit(member);
  if(button.dataset.staffAction==='remove'&&member.manage_membership&&doc.defaultView.confirm(t('staffRemoveConfirm')+'\n\n'+memberName(member))){
   void mutateMember(member,'gary_remove_staff_member',expected(member),'staffRemoved');
  }
 });
 refreshButton.addEventListener('click',()=>{directoryNotice(null);void load();});
 findButton.addEventListener('click',()=>void lookup());
 form.addEventListener('submit',event=>void add(event));
 form.addEventListener('input',event=>{
  if(event.target===email&&state.match&&email.value.trim().toLowerCase()!==state.match.email){
   fullName.value='';state.match=null;
  }
  if(state.addNotice)addNotice('');
 });
 editForm.addEventListener('submit',event=>void saveEdit(event));
 editForm.addEventListener('input',()=>{if(state.editNotice)editNotice('');});
 cancelEdit.addEventListener('click',()=>{if(!blocked())closeEdit(true);});
 function reset(){
  state.generation++;state.request++;state.photos.clear();
  Object.assign(state,{members:[],authority:null,busy:null,loading:false,failed:false,match:null});
  form.reset();closeEdit();directoryNotice(null);addNotice('');renderAdd();
  list.replaceChildren();list.removeAttribute('aria-busy');refreshButton.disabled=false;
 }
 return {enter(){directoryNotice(null);return load();},render,reset};
}
