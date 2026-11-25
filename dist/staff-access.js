import {workspaceUI} from './workspace-ui.js';
import {isConflictResponse} from './conflict-response.js';
import {initFormControls} from './form-controls.js';
import {avatarBucket,avatarPath,renderAvatar} from './profile-avatar.js';
import {narrowWorkspaceCopy} from './workspace-copy.js';

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
 ['23505','staffAddExists'],['22023','staffAddInvalid'],['42501','staffAdminRequired']
]);
const errorKey = (error,fallback) => staffErrors.get(error?.message)||errorsByCode.get(error?.code)
 || (isConflictResponse(error)?'staffRoleConflict':fallback);
const emailErrors = ['staffAddInvalidEmail','staffAddUnavailable','staffAddExists'];


const statusKey = member => member.account==='unavailable'?'unavailable':member.operations_role||member.cms_role?'active':'none';
const searchable = value => value.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/đ/g,'d').trim().replace(/\s+/g,' ');
const memberValues = member => ({
 email:member?.email||'',full_name:member?.display_name_override??member?.display_name??'',
 operations:member?.operations_role??'',cms:member?.cms_role??''
});
const newDraft = (member=null) => ({member,values:memberValues(member),notice:null,match:null});
const expected = member => ({
 p_user_id:member.user_id,p_expected_operations_role:member.operations_role??null,p_expected_cms_role:member.cms_role??null
});

export function createStaffAccess({
 db,doc,t,canView,notify=()=>{},onSaved=()=>{},showDialog=node=>node.showModal(),closeDialog=node=>node.close()
}){
 const {$,el,take}=workspaceUI(doc,t);
 const win=doc.defaultView;
 const view=$('#staff-access-view'),list=$('#staff-access-list'),drawer=$('#staff-access-drawer');
 const directory=view.querySelector('.staff-access-directory');
 const columns=view.querySelector('.staff-access-columns');
 const guide=view.querySelector('.staff-access-guide');
 let guideInitialized=false,cards=false;
 const form=$('#staff-access-form'),filters=$('#staff-access-filters'),search=$('#staff-access-search');
 const control=name=>form.elements.namedItem(name);
 const email=control('email'),fullName=control('full_name'),findButton=$('#staff-access-find');
 const submit=form.querySelector('[type=submit]'),drawerTitle=$('#staff-access-drawer-title');
 const addButton=$('#staff-access-open-add'),refreshButton=$('#refresh-staff-access'),clearButton=$('#staff-access-clear');
 const feedback=$('#staff-access-feedback'),notice=$('#staff-access-notice'),count=$('#staff-access-result-count');
 const formControls=initFormControls(doc);
 const state={members:[],photos:new Map(),authority:null,busy:null,loading:false,failed:false,
  notice:null,addDraft:newDraft(),edits:new Map(),editor:null,menu:null,generation:0,request:0};

 const memberName = member => member.display_name || member.email || t('staffMember');
 const compactCopy = () => narrowWorkspaceCopy[doc.documentElement.lang==='vi'?'vi':'en'];
 const cardLayout = () => win.getComputedStyle(list).getPropertyValue('--staff-access-card-layout').trim()==='1';
 const roleName = (scope,role) => t(role?'role_'+scope+'_'+role:'noAccess');
 const canEdit = member => member.manage_membership || scopes.some(scope=>member['manage_'+scope]);
 const blocked = () => state.loading || Boolean(state.busy);
 const canAdd = () => scopes.some(scope=>state.authority?.[scope]);
 const canAct = () => canView() && state.authority && !blocked();

 function paint(node,value){
  const message=value?t(value.key):'';
  if(node.textContent!==message)node.textContent=message;
  node.classList.toggle('error',Boolean(value?.error));
 }

 function editorNotice(draft,key,error=false){
  draft.notice=key?{key,error}:null;
  if(state.editor!==draft)return;
  paint(feedback,draft.notice);
  if(emailErrors.includes(key))email.setAttribute('aria-invalid','true');
  else email.removeAttribute('aria-invalid');
 }

 function renderDrawer(){
  const draft=state.editor;
  submit.disabled=!draft||blocked()||!state.authority;
  if(state.busy==='add'||state.busy==='edit')submit.setAttribute('aria-busy','true');
  else submit.removeAttribute('aria-busy');
  if(!draft)return;

  const member=draft.member;
  drawerTitle.textContent=t(member?'staffEditTitle':'staffAddTitle');
  $('#staff-access-email-label').textContent=t(member?'staffAccountEmail':'staffAddEmail');
  $('#staff-access-close').setAttribute('aria-label',t('staffDrawerClose'));
  $('#staff-access-add-intro').hidden=Boolean(member);
  submit.textContent=t(member?'saveChanges':'staffAddSubmit');
  submit.dataset.buttonVariant=member?'save':'confirm';
  email.readOnly=Boolean(member)||blocked();
  fullName.readOnly=(member&&!member.manage_membership)||blocked();
  findButton.hidden=Boolean(member);
  findButton.disabled=blocked()||!canAdd();
  if(state.busy==='lookup')findButton.setAttribute('aria-busy','true');
  else findButton.removeAttribute('aria-busy');

  for(const scope of scopes){
   const select=control(scope),hint=$('#staff-access-'+scope+'-hint');
   const allowed=Boolean(member?member['manage_'+scope]:state.authority?.[scope]);
   const values=allowed?['',...choices[scope]]:[member?.[scope+'_role']??''];
   const options=values.map(value=>[value,roleName(scope,value)]);
   const signature=JSON.stringify(options);
   if(select.dataset.options!==signature){
    select.replaceChildren(...options.map(([value,label])=>el('option',{value},label)));
    select.dataset.options=signature;
   }
   select.disabled=blocked()||!allowed;
   hint.hidden=allowed;
   hint.textContent=allowed?'':t(member?'viewOnly':scope==='operations'?'staffAddOperationsLocked':'staffAddCmsLocked');
   if(allowed)select.removeAttribute('aria-describedby');
   else select.setAttribute('aria-describedby',hint.id);
   select.value=allowed?draft.values[scope]:values[0];
  }
  if(email.value!==draft.values.email)email.value=draft.values.email;
  if(fullName.value!==draft.values.full_name)fullName.value=draft.values.full_name;
  editorNotice(draft,draft.notice?.key,draft.notice?.error);
 }

 function rowLauncher(id,action){
  const row=list.querySelector('[data-staff-member="'+id+'"]');
  if(action==='identity'||action==='copy-email')return row?.querySelector('.staff-access-person, .staff-access-email');
  const edit=row?.querySelector('.staff-access-edit-desktop'),more=row?.querySelector('[data-staff-action=more]');
  const visible=node=>doc.defaultView.getComputedStyle(node).display!=='none';
  const candidates=action==='more'?[more,edit]:[edit,more];
  return candidates.find(button=>button&&!button.disabled&&visible(button)&&visible(button.parentElement));
 }

 function restoreDrawerFocus(draft){
  if(view.hidden||!canView())return;
  const button=draft.member?rowLauncher(draft.member.user_id,draft.launcher):addButton;
  (button&&!button.disabled?button:search).focus({preventScroll:true});
 }

 function closeMenu(restore=false){
  const menu=state.menu;
  if(!menu)return;
  state.menu=null;
  if(restore)menu.button.focus({preventScroll:true});
  menu.button.setAttribute('aria-expanded','false');
  menu.panel.removeAttribute('data-open');
  menu.panel.setAttribute('inert','');
  menu.panel.setAttribute('aria-hidden','true');
 }

 function focusMenuAction(panel){
  const button=[...panel.querySelectorAll('button:not(:disabled)')].find(item=>doc.defaultView.getComputedStyle(item).display!=='none');
  button?.focus({preventScroll:true});
 }

 function openMenu(button){
  if(state.menu?.button===button){closeMenu(true);return;}
  closeMenu();
  const group=button.parentElement,panel=doc.getElementById(button.getAttribute('aria-controls'));
  state.menu={button,group,panel};
  button.setAttribute('aria-expanded','true');
  panel.removeAttribute('inert');
  panel.removeAttribute('aria-hidden');
  const bounds=button.getBoundingClientRect(),height=panel.offsetHeight+6;
  panel.toggleAttribute('data-above',bounds.bottom+height>doc.defaultView.innerHeight&&bounds.top>=height);
  panel.setAttribute('data-open','');
  focusMenuAction(panel);
 }

 function responsiveValue(tag,attributes,key){
  const full=t(key),short=cards?compactCopy()[key]:null;
  if(!short||short===full)return el(tag,attributes,full);
  return el(tag,{...attributes,title:full},[el('span',{class:'sr-only'},full),el('span',{'aria-hidden':'true'},short)]);
 }

 function status(member){
  const key=statusKey(member);
  return el('div',{class:cards?'staff-access-tags staff-access-field':'staff-access-tags'},[
   cards?el('span',{class:'staff-access-label'},t('staffStatusLabel')):null,
   responsiveValue('span',{class:'staff-access-status is-'+key},'staffStatus_'+key),
   member.self&&!cards?el('span',{class:'relationship-badge'},t('you')):null
  ]);
 }

 function roleSummary(member,scope){
  const role=member[scope+'_role'];
  return el('div',{class:'staff-access-field','data-scope':scope},[
   el('span',{class:'staff-access-label'},t(scope==='operations'?'operationsAccess':'cmsAccess')),
   responsiveValue('strong',{class:'staff-access-value'},role?'role_'+scope+'_'+role:'noAccess')
  ]);
 }

 function memberIdentity(member,name,avatar){
  if(cards){
   const address=member.email;
   const displayName=name===address?t('staffMember'):name;
   return el('div',{class:'staff-access-identity staff-access-card-identity'},[avatar,el('div',{class:'staff-access-details'},[
    el('div',{class:'staff-access-card-name'},[el('strong',{title:displayName},displayName),
     member.self?el('span',{class:'relationship-badge'},t('you')):null]),
    address?el('button',{type:'button',class:'staff-access-email','data-staff-action':'copy-email',
     'aria-label':`${t('staffCopyEmail')}: ${address}`,title:address,disabled:blocked()?'':null},el('span',{},address)):null
   ])]);
  }
  const email=member.email&&member.email!==name?member.email:null;
  return el('details',{class:'staff-access-identity'},[
   el('summary',{class:'staff-access-person'},[avatar,el('span',{class:'staff-access-details'},[
    el('strong',{},name),email?el('small',{},email):null
   ])]),
   el('div',{class:'staff-access-identity-panel'},[el('strong',{},name),email?el('small',{},email):null])
  ]);
 }

 function memberRow(member){
  const name=memberName(member),id=member.user_id,menuId='staff-access-menu-'+id;
  const avatar=el('span',{class:'user-avatar staff-access-avatar account-avatar','aria-hidden':'true','data-staff-avatar':id});
  renderAvatar(avatar,name,state.photos.get(id),true);
  const editable=canEdit(member),removable=Boolean(member.manage_membership);
  const editLabel=t('staffEditAccess').replace('{name}',()=>name);
  const moreLabel=t('staffMoreActions').replace('{name}',()=>name);
  const editAttrs={type:'button','data-staff-action':'edit','aria-label':editLabel,title:editLabel,'aria-haspopup':'dialog','aria-controls':drawer.id,disabled:blocked()?'':null};
  const actions=editable||removable?el('div',{class:'staff-access-row-actions'},[
   editable?el('button',{...editAttrs,class:'button button-small staff-access-edit-desktop','data-button-variant':'edit'},t('staffEdit')):null,
   el('div',{class:'staff-access-menu'},[
    el('button',{type:'button',class:'icon-button','data-staff-action':'more',
     'aria-expanded':'false','aria-controls':menuId,'aria-label':moreLabel,title:moreLabel,
     disabled:blocked()?'':null},el('span',{'aria-hidden':'true'},'⋮')),
    el('div',{id:menuId,class:'staff-access-menu-panel',inert:'','aria-hidden':'true'},[
     editable?el('button',{...editAttrs,class:'staff-access-edit-menu'},compactCopy().staffEditAccess):null,
     removable?el('button',{type:'button','data-staff-action':'remove'},t('staffRemove')):null
    ].filter(Boolean))
   ])
  ]):null;
  return el('article',{class:'staff-access-member','data-staff-member':id},[
   memberIdentity(member,name,avatar),el('div',{class:'staff-access-member-meta'},[status(member),...scopes.map(scope=>roleSummary(member,scope))]),actions
  ]);
 }

 function renderDirectory(){
  const active=doc.activeElement?.closest('[data-staff-action], .staff-access-person');
  const focusedRow=active?.closest('[data-staff-member]')?.dataset.staffMember;
  const focusedAction=active?.closest('.staff-access-menu')?'more':active?.dataset.staffAction||'identity';
  const identityOpen=focusedAction==='identity'&&active?.parentElement.open;
  closeMenu();
  cards=cardLayout();
  const fullSearch=t('staffSearch'),searchLabel=cards?compactCopy().staffSearch:fullSearch;
  if(search.labels[0].textContent!==searchLabel)search.labels[0].textContent=searchLabel;
  if(cards)search.title=fullSearch;else search.removeAttribute('title');
  refreshButton.title=t('staffRefreshList');
  refreshButton.setAttribute('aria-label',refreshButton.title);
  const query=searchable(search.value),filterValues=Object.fromEntries(new doc.defaultView.FormData(filters));
  const filtering=Boolean(query||filterValues.operations||filterValues.cms||filterValues.status);
  const members=state.members.filter(member=>
   (!query||[memberName(member),member.email||''].some(value=>searchable(value).includes(query)))&&
   scopes.every(scope=>!filterValues[scope]||filterValues[scope]===(member[scope+'_role']||'none'))&&
   (!filterValues.status||filterValues.status===statusKey(member))
  );
  list.setAttribute('aria-busy',String(blocked()));
  clearButton.hidden=!filtering;
  const message=state.loading||state.failed?'':t('staffResultCount').replace('{count}',members.length);
  if(count.textContent!==message)count.textContent=message;
  columns.hidden=!members.length;
  if(members.length)list.replaceChildren(...members.map(memberRow));
  else{
   const empty=state.loading?'staffAccessLoading':state.failed?'staffAccessUnavailable':filtering?'staffNoMatches':'staffAccessEmpty';
   list.replaceChildren(el('div',{class:'empty-state'},el('h3',{},t(empty))));
  }
  if(focusedRow){
   const button=rowLauncher(focusedRow,focusedAction);
   if(identityOpen&&!cards&&button)button.parentElement.open=true;
   button?.focus({preventScroll:true});
  }
 }

 function render(){
  if(!canView())return;
  renderDrawer();renderDirectory();paint(notice,state.notice);
  refreshButton.disabled=blocked();
  addButton.hidden=!canAdd();
  addButton.disabled=blocked()||!canAdd();
  formControls.refresh();
 }

 function captureDraft(draft){
  draft.values=Object.fromEntries(['email','full_name',...scopes].map(name=>[name,control(name).value]));
 }

 function dismissDrawer(restore=true){
  const draft=state.editor;
  if(!draft)return;
  captureDraft(draft);
  state.editor=null;
  if(drawer.open)closeDialog(drawer);
  renderDrawer();
  if(restore)restoreDrawerFocus(draft);
 }

 function openDrawer(draft,launcher){
  closeMenu();
  draft.launcher=launcher;
  state.editor=draft;
  renderDrawer();
  formControls.refresh();
  showDialog(drawer);
  drawerTitle.focus({preventScroll:true});
 }

 function syncEdits(){
  for(const [id,draft] of state.edits){
   const member=state.members.find(entry=>entry.user_id===id);
   if(!member||!canEdit(member)){
    if(state.editor===draft)dismissDrawer(false);
    state.edits.delete(id);
    continue;
   }
   const previous=memberValues(draft.member),latest=memberValues(member);
   const editable={email:false,full_name:member.manage_membership,operations:member.manage_operations,cms:member.manage_cms};
   if(['full_name',...scopes].some(key=>previous[key]!==latest[key])){
    draft.notice={key:'staffRoleConflict',error:true};
   }
   for(const key of Object.keys(latest)){
    if(!editable[key]||draft.values[key]===previous[key])draft.values[key]=latest[key];
   }
   draft.member=member;
  }
 }

 async function loadPhotos(generation,request){
  const byPath=new Map(state.members.filter(member=>member.account!=='unavailable').map(member=>[avatarPath(member.user_id),member]));
  if(!db.storage||!byPath.size)return;
  try{
   const {data,error}=await db.storage.from(avatarBucket).createSignedUrls([...byPath.keys()],600);
   if(error||generation!==state.generation||request!==state.request||!canView())return;
   for(const {path,signedUrl} of data||[]){
    const member=byPath.get(path);
    if(member&&signedUrl)state.photos.set(member.user_id,signedUrl);
   }
   const members=new Map(state.members.map(member=>[member.user_id,member]));
   for(const avatar of list.querySelectorAll('[data-staff-avatar]')){
    const member=members.get(avatar.dataset.staffAvatar);
    if(member)renderAvatar(avatar,memberName(member),state.photos.get(member.user_id),true);
   }
  }catch{ /* Keep initials when pictures are unavailable. */ }
 }

 async function load(){
  if(!canView())return;
  const generation=state.generation,request=++state.request;
  state.loading=true;state.failed=false;render();
  try{
   const result=take(await db.rpc('gary_staff_access_list'));
   if(generation!==state.generation||request!==state.request||!canView())return;
   if(!Array.isArray(result?.members))throw new Error('Invalid staff list');
   state.members=result.members;state.photos.clear();
   state.authority={operations:result.operations_role==='admin',cms:result.cms_role==='admin'};
   syncEdits();
   void loadPhotos(generation,request);
  }catch(error){
   if(generation===state.generation&&request===state.request){
    state.failed=true;state.members=[];state.authority=null;
    state.notice={key:errorKey(error,'staffAccessLoadError'),error:true};
   }
  }finally{
   if(generation===state.generation&&request===state.request){state.loading=false;render();}
  }
 }

 function readEmail(draft){
  const address=draft.values.email.trim();
  if(address&&address.length<=email.maxLength&&email.checkValidity())return address;
  editorNotice(draft,'staffAddInvalidEmail',true);email.focus();
  return '';
 }

 const invalidName = name => [...name].length>fullName.maxLength||/[\u0000-\u001f\u007f]/.test(name);

 async function lookup(){
  const draft=state.editor;
  if(!draft||draft.member||!canAct()||!canAdd())return;
  captureDraft(draft);
  const address=readEmail(draft);if(!address)return;
  const generation=state.generation;
  let found=false;
  state.busy='lookup';editorNotice(draft,null);render();
  try{
   const result=take(await db.rpc('gary_lookup_staff_account',{p_email:address}));
   if(generation!==state.generation||!canView())return;
   if(!result?.email)throw new Error('AGENCY_ACCOUNT_UNAVAILABLE');
   const name=(result.full_name||'').slice(0,fullName.maxLength);
   draft.values.email=result.email;
   if(!draft.values.full_name.trim()||draft.values.full_name===draft.match?.name)draft.values.full_name=name;
   draft.match={email:result.email.toLowerCase(),name};found=true;
   editorNotice(draft,'staffAccountFound');
  }catch(error){
   if(generation===state.generation&&canView())editorNotice(draft,errorKey(error,'staffLookupError'),true);
  }finally{
   if(generation===state.generation){
    state.busy=null;render();
    if(canView()&&state.editor===draft)(found?fullName:email).focus();
   }
  }
 }

 async function mutate(kind,rpc,args,success,draft=null){
  const generation=state.generation;
  const fallback=kind==='add'?'staffAddError':kind==='edit'?'staffRoleError':'staffRemoveError';
  state.busy=kind;state.notice=null;
  if(draft)editorNotice(draft,null);
  render();
  let saved=false,restore=false,refresh=false;
  try{
   take(await db.rpc(rpc,args));
   if(generation!==state.generation)return;
   saved=true;
   if(draft&&state.editor===draft){restore=true;dismissDrawer(false);}
   if(kind==='add')state.addDraft=newDraft();
   else state.edits.delete(args.p_user_id);
   notify(success);onSaved();
  }catch(error){
   if(generation!==state.generation)return;
   const key=errorKey(error,kind==='add'&&error?.code==='P0002'?'staffAddUnavailable':fallback);
   refresh=['staffRoleConflict','staffMemberMissing','staffAddExists'].includes(key);
   if(draft)editorNotice(draft,key,true);
   if(!draft||key==='staffMemberMissing')state.notice={key,error:true};
  }
  if(generation!==state.generation)return;
  state.busy=null;
  if(saved||refresh)await load();
  else render();
  if(generation!==state.generation||!canView()||view.hidden)return;
  if(restore)restoreDrawerFocus(draft);
  else if(draft&&state.editor===draft)feedback.focus({preventScroll:true});
  else if(!draft)(state.notice?notice:refreshButton).focus({preventScroll:true});
 }

 async function add(draft){
  if(!canAdd())return;
  const address=readEmail(draft);if(!address)return;
  const name=draft.values.full_name.trim();
  if(invalidName(name)){editorNotice(draft,'staffNameInvalid',true);fullName.focus();return;}
  const roles=Object.fromEntries(scopes.map(scope=>{
   const value=draft.values[scope];
   return [scope,state.authority[scope]&&choices[scope].includes(value)?value:null];
  }));
  if(!roles.operations&&!roles.cms){
   editorNotice(draft,'staffAddRoleRequired',true);
   control(scopes.find(scope=>state.authority[scope])).focus();
   return;
  }
  const override=draft.match?.email===address.toLowerCase()&&draft.match.name===name?null:name||null;
  await mutate('add','gary_add_staff_member',{
   p_email:address,p_full_name:override,p_operations_role:roles.operations,p_cms_role:roles.cms
  },'staffAdded',draft);
 }

 async function saveEdit(draft){
  const member=draft.member;
  if(!canEdit(member))return;
  const oldName=member.display_name_override??null,inputName=draft.values.full_name.trim();
  const name=member.manage_membership&&inputName!==(member.display_name||'')?inputName||null:oldName;
  if(name&&invalidName(name)){editorNotice(draft,'staffNameInvalid',true);fullName.focus();return;}
  const roles=Object.fromEntries(scopes.map(scope=>[
   scope,member['manage_'+scope]?(draft.values[scope]||null):member[scope+'_role']??null
  ]));
  const roleChanged=scopes.some(scope=>roles[scope]!== (member[scope+'_role']??null));
  if(!roleChanged&&name===oldName){dismissDrawer();state.edits.delete(member.user_id);return;}
  if(scopes.some(scope=>member[scope+'_role']&&!roles[scope])&&!doc.defaultView.confirm(t('staffNoAccessConfirm')))return;
  await mutate('edit','gary_edit_staff_member',{...expected(member),p_full_name:name,p_expected_name:oldName,
   p_operations_role:roles.operations,p_cms_role:roles.cms},roleChanged?'staffRoleSaved':'staffNameSaved',draft);
 }

 async function copyEmail(button,address){
  try{await win.navigator.clipboard.writeText(address);}
  catch{
   const selection=win.getSelection();
   if(!button.isConnected||!selection)return;
   selection.selectAllChildren(button);
   notify('staffEmailSelected','info');
   return;
  }
  if(button.isConnected)notify('staffEmailCopied');
 }

 function listAction(event){
  const button=event.target.closest('[data-staff-action]');
  if(!button||!canAct())return;
  const member=state.members.find(item=>item.user_id===button.closest('[data-staff-member]')?.dataset.staffMember);
  if(!member)return;
  const action=button.dataset.staffAction;
  if(action==='copy-email'&&member.email){void copyEmail(button,member.email);return;}
  if(action==='edit'&&canEdit(member)){
   if(!state.edits.has(member.user_id))state.edits.set(member.user_id,newDraft(member));
   openDrawer(state.edits.get(member.user_id),button.matches('.staff-access-edit-menu')?'more':'edit');
  }else if(action==='more'&&(canEdit(member)||member.manage_membership))openMenu(button);
  else if(action==='remove'&&member.manage_membership&&state.menu?.panel.contains(button)){
   closeMenu(true);
   if(doc.defaultView.confirm(t('staffRemoveConfirm')+'\n\n'+memberName(member))){
    void mutate('remove','gary_remove_staff_member',expected(member),'staffRemoved');
   }
  }
 }

 function closeIdentityOutside(target=null){
  const identity=list.querySelector('.staff-access-identity[open]');
  if(identity&&!identity.contains(target))identity.open=false;
 }

 function closeOutsideDisclosures(event){
  if(state.menu&&!state.menu.group.contains(event.target))closeMenu();
  closeIdentityOutside(event.target);
 }

 function updateFilters(){if(canView())renderDirectory();}
 list.addEventListener('click',listAction);
 list.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
   if(state.menu){event.preventDefault();closeMenu(true);}
   const identity=event.target.closest('.staff-access-identity[open]');
   if(identity){event.preventDefault();identity.open=false;}
  }
  if(event.key==='ArrowDown'&&event.target.dataset.staffAction==='more'&&canAct()){
   event.preventDefault();
   if(state.menu?.button===event.target)focusMenuAction(state.menu.panel);
   else event.target.click();
  }
 });
 doc.addEventListener('pointerdown',closeOutsideDisclosures);
 doc.addEventListener('focusin',closeOutsideDisclosures);
 filters.addEventListener('submit',event=>event.preventDefault());
 search.addEventListener('input',updateFilters);
 filters.addEventListener('change',updateFilters);
 clearButton.addEventListener('click',()=>{filters.reset();updateFilters();search.focus();});
 refreshButton.addEventListener('click',()=>{state.notice=null;void load();});
 addButton.addEventListener('click',()=>{if(canAct()&&canAdd())openDrawer(state.addDraft);});
 findButton.addEventListener('click',()=>void lookup());
 $('#staff-access-close').addEventListener('click',()=>dismissDrawer());
 $('#staff-access-cancel').addEventListener('click',()=>dismissDrawer());
 drawer.addEventListener('cancel',event=>{event.preventDefault();dismissDrawer();});
 drawer.addEventListener('close',()=>{if(!drawer.open)dismissDrawer();});
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const draft=state.editor;
  if(!draft||!canAct())return;
  captureDraft(draft);
  void (draft.member?saveEdit(draft):add(draft));
 });
 form.addEventListener('input',event=>{
  const draft=state.editor;
  if(!draft)return;
  if(event.target===email&&draft.match&&email.value.trim().toLowerCase()!==draft.match.email){
   fullName.value='';draft.match=null;
  }
  captureDraft(draft);
  editorNotice(draft,null);
 });
 form.addEventListener('change',()=>{if(state.editor)captureDraft(state.editor);});

 function leave(){closeMenu();closeIdentityOutside();dismissDrawer(false);}

 function reset(){
  state.generation++;state.request++;state.photos.clear();
  leave();
  Object.assign(state,{members:[],authority:null,busy:null,loading:false,failed:false,notice:null,addDraft:newDraft()});
  state.edits.clear();
  form.reset();filters.reset();
  for(const scope of scopes){control(scope).replaceChildren();delete control(scope).dataset.options;}
  email.removeAttribute('aria-invalid');
  paint(notice,null);paint(feedback,null);
  columns.hidden=true;list.replaceChildren();list.removeAttribute('aria-busy');count.textContent='';
  clearButton.hidden=true;addButton.disabled=true;refreshButton.disabled=false;
  renderDrawer();
 }
 function enter(){
  if(!guideInitialized){
   guide.open=doc.defaultView.innerWidth>900;
   guideInitialized=true;
  }
  state.notice=null;
  return load();
 }
 const resize=win.ResizeObserver?new win.ResizeObserver(()=>{
  if(!view.hidden&&canView()&&cardLayout()!==cards)renderDirectory();
 }):null;
 resize?.observe(directory);
 return {enter,render,leave,reset};
}
