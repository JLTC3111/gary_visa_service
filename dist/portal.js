import {db,unwrap,ensureProfile,EDITABLE_STATUSES,validateDocument,documentPath,authRedirect} from './backend.js';
import {config} from './config.js';
import {portalCopy} from './portal-copy.js';
import {createCRM} from './crm.js';
import {createInbox} from './inbox.js';
import {createAgencyCms} from './cms-workspace.js';
import {createTrash} from './trash.js';
import {createStaffAccess} from './staff-access.js';
import {workspaceUI} from './workspace-ui.js';
import {mountPortalEditors} from './portal-editors.js';
import {showActionToast,setCounterValues,clearCounterValues} from './action-toast.js';
import {createProfileAvatar} from './profile-avatar.js';
import {accountRoleLabel, mountAccountMenu} from './account-menu.js';
import {mountLanguageSwitch} from './squish-switch.js';

const $=selector=>document.querySelector(selector),$$=selector=>[...document.querySelectorAll(selector)];
const english={};
$$('[data-p]').forEach(node=>{english[node.dataset.p]??=node.textContent.trim()});
$$('[data-p-placeholder]').forEach(node=>{english[node.dataset.pPlaceholder]??=node.placeholder});
const params=new URL(location.href).searchParams;
let currentStaffViewUrl=location.href;
let language='en';try{language=localStorage.getItem('gary-language')==='vi'?'vi':'en'}catch{}
if(params.get('lang'))language=params.get('lang')==='vi'?'vi':'en';
const state={user:null,role:null,access:null,profile:null,mode:'signin',area:params.get('area')==='staff'?'staff':'customer',view:'applications',page:0,total:0,cases:[],customerPage:0,customerTotal:0,customers:[],caseId:null,currentCase:null,caseData:null,tab:'overview',editingId:null,generation:0,loading:false,recovery:params.get('flow')==='recovery'};
const PAGE_SIZE=20;
const requestIntakeKinds=['application','unreviewed'];
const t=key=>portalCopy[language]?.[key]??portalCopy.en[key]??english[key]??key;
const editorWorkspaces=mountPortalEditors(document,{language:()=>language});
const element=(tag,attrs={},children=[])=>{const node=document.createElement(tag);for(const [key,value]of Object.entries(attrs)){if(value!==null&&value!==undefined)node.setAttribute(key,String(value))}for(const child of (Array.isArray(children)?children:[children]))if(child!==null&&child!==undefined)node.append(typeof child==='string'?document.createTextNode(child):child);return node};
const icon=(name)=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','icon');svg.setAttribute('aria-hidden','true');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href',`#p-${name}`);svg.append(use);return svg};
const date=value=>new Intl.DateTimeFormat(language==='vi'?'vi-VN':'en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(value));
const dateTime=value=>new Intl.DateTimeFormat(language==='vi'?'vi-VN':'en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
const reference=id=>`GA-${id.slice(0,8).toUpperCase()}`;
const staff=()=>state.role==='staff';
const operationsRole=()=>staff()?state.access?.operations??null:null,cmsRole=()=>staff()?state.access?.cms??null:null;
const operations=()=>operationsRole()!==null,oversees=()=>['manager','admin'].includes(operationsRole());
const canEditStaffCase=application=>Boolean(application&&operations()&&(operationsRole()!=='manager'||application.assigned_staff_id===state.user?.id));
const trashKinds=()=>[...(operationsRole()==='admin'?['case','contact']:[]),...(cmsRole()==='admin'?['article','cms']:[])];
const ownsSite=()=>staff()&&state.access?.site_owner===true;
const canOpenCms=()=>cmsRole()!==null||ownsSite();
const contentViews=['cms','news-guides'];
const VIEWS=['applications','profile','customers','inbox',...contentViews,'trash','staff-access'];
const viewAllowed=view=>view==='profile'||(view==='applications'?!staff()||operations():view==='customers'||view==='inbox'?operations():contentViews.includes(view)?canOpenCms():view==='trash'?trashKinds().length>0:view==='staff-access'&&staff());
const homeView=()=>cmsRole()?'news-guides':!staff()||operations()?'applications':ownsSite()?'news-guides':'profile';
const badge=status=>element('span',{class:`status-badge status-${status}`},t(`status_${status}`));
let searchTimer,customerSearchTimer;
const caseStatIds=['total','active','attention','completed'].map(key=>'stat-'+key);
let caseStats={};
function toast(key,tone='success'){showActionToast(document,t(key),{key,tone,language})}
function feedback(target,key,error=false){const node=$(target);node.textContent=key?t(key):'';node.classList.toggle('error',error)}
function errorKey(error){if(error?.message==='AGENCY_CASE_EDIT_ASSIGNED_ONLY')return'caseEditAssignedOnly';if(error?.message==='APPLICATION_SUBJECT_INVALID')return'applicationSubjectInvalid';if(['documentType','documentSize','roleError','weakPassword'].includes(error?.message))return error.message;if(error?.message==='AGENCY_ASSIGNEE_INVALID')return'assigneeUnavailable';if(error?.code==='invalid_credentials')return'invalidSignin';if(error?.code==='email_not_confirmed')return'confirmEmail';if(error?.code==='weak_password')return'weakPassword';if(error?.code?.includes('rate_limit'))return'rateLimited';if(error?.code==='42501'){schedulePermissionRefresh(true);return'permissionChanged'};return'genericError'}
async function busy(form,callback){const buttons=[...form.querySelectorAll('button[type=submit]')];if(buttons.some(button=>button.getAttribute('aria-busy')==='true'))return;buttons.forEach(button=>{button.disabled=true;button.setAttribute('aria-busy','true')});try{return await callback()}finally{buttons.forEach(button=>{button.disabled=false;button.removeAttribute('aria-busy')})}}
function showDialog(node){if(!node.open){node.showModal();document.body.classList.add('dialog-open')}}
function closeDialog(node){node.close();if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open')}
$$('dialog').forEach(node=>{node.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open')});node.addEventListener('click',event=>{if(event.target===node){const rect=node.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog(node)}})});
document.addEventListener('click',event=>{const button=event.target.closest('[data-close]');if(button)closeDialog(document.getElementById(button.dataset.close))});

let rosterCache=null;
async function getRoster(){
 if(!operations())return [];if(rosterCache&&rosterCache.expires>Date.now())return rosterCache.data;
 const generation=state.generation,data=unwrap(await db.rpc('gary_staff_directory'))||[];
 if(generation!==state.generation||!operations())return [];rosterCache={data,expires:Date.now()+60000};return data;
}
const {staffOptions}=workspaceUI(document,t);
const crm=createCRM({db,doc:document,t,isStaff:operations,canAssign:oversees,canTrash:()=>operationsRole()==='admin',getUser:()=>state.user,getRoster,showDialog,closeDialog,notify:toast,openApplication:openCase,openChat:id=>{if(navigateView('inbox',false))inbox.enter(id)}});
const cms=createAgencyCms({doc:document,db,isStaff:canOpenCms,getUser:()=>state.user,getLanguage:()=>language,getView:()=>state.view});
const trash=createTrash({db,doc:document,t,isStaff:()=>trashKinds().length>0,kinds:trashKinds,notify:toast});
const inbox=createInbox({db,doc:document,t,isStaff:operations,canAssign:oversees,canGoOnline:oversees,getUser:()=>state.user,getRoster,openContact:id=>crm.openContact(id),notify:toast});
const staffAccess=createStaffAccess({db,doc:document,t,canView:staff,showDialog,closeDialog,notify:toast,onSaved:()=>{rosterCache=null;schedulePermissionRefresh()}});
let staffAccountPhoto='';
const staffAccountMenu=mountAccountMenu($('#staff-account-menu'),{
 staff:true,
 destinations:{staffDashboard:()=>openAccountView(homeView()),staffProfile:()=>openAccountView('profile')},
 onOpen:()=>schedulePermissionRefresh(),
 onSignOut:signOut
});
const profileAvatar=createProfileAvatar({db,doc:document,t,name:()=>state.profile?.full_name?.trim()||state.user?.email||'G',notify:toast,
 onPhotoChange:photo=>{staffAccountPhoto=photo;renderStaffAccountMenu()}});

function translate(){
 document.documentElement.lang=language;editorWorkspaces.refresh();
 $$('[data-p]').forEach(node=>{node.textContent=t(node.dataset.p)});$$('[data-p-placeholder]').forEach(node=>{node.placeholder=t(node.dataset.pPlaceholder)});
 $('.portal-home')?.setAttribute('aria-label',t('backWebsite'));
 updateLanguageSwitch(language);
 try{localStorage.setItem('gary-language',language)}catch{}
 document.dispatchEvent(new CustomEvent('gary:language',{detail:{language}}));renderAuth();if(state.user&&state.profile){renderIdentity();renderApplications();setCounterValues(document,caseStats,language);crm.render();inbox.render();cms.translate();trash.render();staffAccess.render();if(state.currentCase&&state.caseData)renderCase();}
 $('#request-dialog-title').textContent=t(state.editingId?'editTitle':'newApplication');$('#request-submit>span').textContent=t(state.editingId?'saveChanges':'submitApplication');$('#request-submit').dataset.buttonVariant=state.editingId?'save':'confirm';
 $('#toggle-password').textContent=t($('#auth-password').type==='password'?'show':'hide');
}
const updateLanguageSwitch=mountLanguageSwitch($('#portal-language'),language,next=>{
 language=next;
 translate();
});

function renderAuth(){
 updateDocumentTitle();
 const mode=state.mode,isSignup=mode==='signup',isReset=mode==='reset',isRecovery=mode==='recovery';
 $$('[data-area]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.area===state.area)));
 const keys=isRecovery?['recoveryEyebrow','recoveryTitle','recoveryIntro','recoveryButton']:isReset?['resetEyebrow','resetTitle','resetIntro','resetButton']:isSignup?['signupEyebrow','signupTitle','signupIntro','signupButton']:state.area==='staff'?['staffWelcome','staffSigninTitle','staffSigninIntro','signin']:['welcomeBack','signinTitle','signinIntro','signin'];
 ['#auth-eyebrow','#auth-title','#auth-description','#auth-submit-label'].forEach((selector,index)=>{$(selector).textContent=t(keys[index])});
 if(isRecovery)$('#auth-submit').dataset.buttonVariant='save';else delete $('#auth-submit').dataset.buttonVariant;
 $('#signup-name-field').hidden=!isSignup;$('#auth-name').required=isSignup;
 $('#auth-email').closest('.form-field').hidden=isRecovery;$('#auth-email').required=!isRecovery;
 $('#password-field').hidden=isReset;$('#auth-password').required=!isReset;$('#auth-password').minLength=isSignup||isRecovery?12:1;$('#auth-password').autocomplete=isSignup||isRecovery?'new-password':'current-password';
 $('label[for=auth-password]').textContent=t(isRecovery?'newPassword':'password');
 $('#password-hint').hidden=!(isSignup||isRecovery);$('#forgot-password').hidden=mode!=='signin';
 $('#auth-mode-switch').hidden=state.area==='staff'||isReset||isRecovery;
 $('#auth-mode-switch>span').textContent=t(isSignup?'alreadyAccount':'newHere');$('#signup-toggle').textContent=t(isSignup?'signin':'createAccount');
 $('#back-signin').hidden=!(isReset||isRecovery);$('#staff-access-note').hidden=state.area!=='staff';
}
function setAuthMode(mode){state.mode=mode;feedback('#auth-notice','');$('#auth-password').value='';$('#auth-password').type='password';$('#toggle-password').setAttribute('aria-pressed','false');renderAuth();$('#toggle-password').textContent=t('show')}
$$('[data-area]').forEach(button=>button.addEventListener('click',()=>{state.area=button.dataset.area;setAuthMode('signin');if(state.user)loadWorkspace()}));
$('#signup-toggle').addEventListener('click',()=>setAuthMode(state.mode==='signup'?'signin':'signup'));
$('#forgot-password').addEventListener('click',()=>setAuthMode('reset'));
$('#back-signin').addEventListener('click',()=>{state.recovery=false;setAuthMode('signin')});
$('#toggle-password').addEventListener('click',()=>{const show=$('#auth-password').type==='password';$('#auth-password').type=show?'text':'password';$('#toggle-password').setAttribute('aria-pressed',String(show));$('#toggle-password').setAttribute('aria-label',t(show?'hide':'show'));$('#toggle-password').textContent=t(show?'hide':'show')});

$('#auth-form').addEventListener('submit',async event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;feedback('#auth-notice','');
 await busy(form,async()=>{const stopConnection=startConnectionLattice(form);try{
  const email=$('#auth-email').value.trim(),password=$('#auth-password').value;
  if(['signup','recovery'].includes(state.mode)&&(!/[A-Za-z]/.test(password)||!/[0-9]/.test(password)||password.length<12))throw new Error('weakPassword');
  if(state.mode==='signup'){
   const result=await db.auth.signUp({email,password,options:{data:{full_name:$('#auth-name').value.trim()},emailRedirectTo:authRedirect()}});if(result.error)throw result.error;$('#auth-password').value='';
   if(result.data.session){await loadWorkspace()}else{setAuthMode('signin');feedback('#auth-notice','signupSent')}
  }else if(state.mode==='reset'){
   const redirect=new URL(authRedirect());redirect.searchParams.set('flow','recovery');const {error}=await db.auth.resetPasswordForEmail(email,{redirectTo:redirect.href});if(error)throw error;feedback('#auth-notice','resetSent');
  }else if(state.mode==='recovery'){
   const {error}=await db.auth.updateUser({password});if(error)throw error;state.recovery=false;const signedOut=await db.auth.signOut({scope:'local'});if(signedOut.error)throw signedOut.error;resetWorkspace();setAuthMode('signin');feedback('#auth-notice','passwordChanged');
  }else{
   const {error}=await db.auth.signInWithPassword({email,password});if(error)throw error;$('#auth-password').value='';await loadWorkspace();
  }
 }catch(error){feedback('#auth-notice',errorKey(error),true)}finally{stopConnection()}});
});

function updateDocumentTitle(){
 const copy=language==='vi'?{customer:'Cổng khách hàng',staff:'Cổng nhân viên',signin:'Đăng nhập khách hàng',staffSignin:'Đăng nhập nhân viên',signup:'Tạo tài khoản khách hàng',reset:'Đặt lại mật khẩu',recovery:'Đặt mật khẩu mới',applications:'Hồ sơ',profile:'Hồ sơ cá nhân',customers:'Quan hệ khách hàng',inbox:'Hộp thư chat trực tiếp',cms:'Quản lý nội dung',trash:'Thùng rác','staff-access':'Quyền truy cập đội ngũ',error:'Không thể tải không gian làm việc'}:{customer:'Customer Portal',staff:'Staff Portal',signin:'Customer Sign In',staffSignin:'Staff Sign In',signup:'Create Customer Account',reset:'Reset Password',recovery:'Set New Password',applications:'Applications',profile:'My Profile',customers:'Customer Relationships',inbox:'Live Chat Inbox',cms:'Content Management',trash:'Trash','staff-access':'Team Access',error:'Workspace Unavailable'};
 let title;
 if(!$('#workspace').hidden)title=`${state.view==='news-guides'?t('newsGuidesNav'):copy[state.view]} | ${copy[staff()?'staff':'customer']}`;
 else if(!$('#auth-screen').hidden)title=copy[state.mode==='signin'&&state.area==='staff'?'staffSignin':state.mode];
 else if(!$('#workspace-error').hidden)title=copy.error;
 else title=copy[staff()||state.area==='staff'?'staff':'customer'];
 document.title=`${title} | Gary Agency`;
}
let stopWorkspaceLattice=()=>{},stopConnectionLattice=()=>{};
function startConnectionLattice(form){
 stopConnectionLattice();
 const api=globalThis.garyLattice;if(!api)return ()=>{};
 const slot=document.createElement('div');slot.className='lattice-slot';form.append(slot);
 const cancel=api.showDelayedLattice(slot,{pattern:'dots',grid:3,label:language==='vi'?'Đang kết nối an toàn…':'Connecting securely…',cellSize:5,gap:2,fontSize:12,status:true});
 stopConnectionLattice=()=>{cancel();if(slot.isConnected)slot.remove();stopConnectionLattice=()=>{}};
 return stopConnectionLattice;
}
function setScreen(name){stopWorkspaceLattice();stopWorkspaceLattice=()=>{};if(name!=='auth-screen')stopConnectionLattice();for(const id of ['auth-screen','workspace-loading','workspace-error','workspace'])$(`#${id}`).hidden=id!==name;if(name==='workspace-loading'){const slot=$('#workspace-lattice'),api=globalThis.garyLattice;if(slot&&api)stopWorkspaceLattice=api.showDelayedLattice(slot,{pattern:'ripple',grid:4,label:'',cellSize:8,gap:3,fontSize:14})}if(name!=='workspace')staffAccountMenu.close();$('#signout').hidden=!state.user||staff();updateDocumentTitle()}
function resetWorkspace(){
 delete document.body.dataset.visaView;
 $('#application-kind-filter').value='';
 caseStats={};clearCounterValues(document,caseStatIds);
 profileAvatar.reset();
 delete document.body.dataset.role;crm.reset();inbox.reset();cms.reset();trash.reset();staffAccess.reset();rosterCache=null;state.generation++;state.user=null;state.role=null;state.access=null;state.profile=null;state.cases=[];state.customers=[];state.currentCase=null;state.caseData=null;state.caseId=null;state.loading=false;state.page=0;state.customerPage=0;state.total=0;state.customerTotal=0;
 $$('dialog[open]').forEach(closeDialog);$('#applications-list').replaceChildren();$('#customers-list').replaceChildren();$('#case-message-list').replaceChildren();$('#case-note-list').replaceChildren();$('#case-document-list').replaceChildren();$('#case-events').replaceChildren();$('#case-title').textContent='';$('#trash-case').hidden=true;$('#case-trash-hint').hidden=true;$('#case-assignee-field').hidden=true;$('#staff-no-access').hidden=true;$('#case-details').textContent='';$('#case-customer').replaceChildren();$('#profile-form').reset();renderAccountIdentity();$('#auth-password').value='';$('#profile-notice').textContent='';$('#message-form').reset();$('#note-form').reset();$('#request-form').reset();$('#document-form').reset();setScreen('auth-screen');renderAuth();
}
let signOutFlight;
function signOut(){
 if(!signOutFlight)signOutFlight=(async()=>{
  await inbox.goAway();
  const {error}=await db.auth.signOut({scope:'local'});if(error)throw error;
  resetWorkspace();$('#auth-email').focus();
 })().finally(()=>{signOutFlight=null});
 return signOutFlight;
}
for(const button of [$('#signout'),$('#error-signout')])button.addEventListener('click',()=>signOut().catch(()=>toast('genericError','error')));
async function loadWorkspace(requested){
 if(state.loading)return;state.loading=true;const generation=++state.generation;setScreen('workspace-loading');
 try{
  const {data,error}=await db.auth.getUser();if(generation!==state.generation)return;if(error)throw error;if(!data.user){resetWorkspace();return}state.user=data.user;
  const access=unwrap(await db.rpc('gary_my_access'));if(generation!==state.generation)return;
  if(typeof access?.member!=='boolean')throw new Error('genericError');
  state.role=access.member?'staff':'customer';
  state.access=access.member?{
   operations:['staff','manager','admin'].includes(access.operations)?access.operations:null,
   cms:['editor','publisher','admin'].includes(access.cms)?access.cms:null,
   site_owner:access.site_owner===true
  }:null;
  if(state.area==='staff'&&!access.member){setScreen('auth-screen');feedback('#auth-notice','roleError',true);return}
  const profile=await ensureProfile(data.user);if(generation!==state.generation)return;
  state.profile=profile;renderIdentity();void profileAvatar.load(data.user.id);renderProfile();const home=homeView();setView(home,false);
  if(home==='applications')await Promise.all([loadApplications(),loadStats()]);if(generation!==state.generation)return;setScreen('workspace');
  requested??=new URL(location.href).searchParams.get('view');
  if(requested!==home&&VIEWS.includes(requested)&&viewAllowed(requested))setView(requested);else if(home!=='applications')setView(home);
  syncStaffViewUrl();
 }catch(error){if(generation===state.generation){setScreen('workspace-error');$('#signout').hidden=!state.user}}
 finally{if(generation===state.generation)state.loading=false}
}
$('#retry-workspace').addEventListener('click',()=>loadWorkspace());
// Refresh permissions without remounting an unchanged editor. Never run SDK calls
// synchronously inside an Auth callback; coalesce focus/token/denial events.
function permissionDeadline(promise){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('permission_timeout')),10000)})]).finally(()=>clearTimeout(timer))}
let permissionRefreshTimer,permissionRefreshing=false,permissionDenied=false;
function schedulePermissionRefresh(denied=false){
 if(!state.user||state.recovery)return;permissionDenied ||= denied;if(permissionRefreshing)return;
 clearTimeout(permissionRefreshTimer);
 permissionRefreshTimer=setTimeout(()=>{const force=permissionDenied;permissionDenied=false;void refreshPermissions(force)},0);
}
async function refreshPermissions(denied=false){
 if(permissionRefreshing||state.loading||!state.user||state.recovery)return;
 permissionRefreshing=true;const generation=state.generation,id=state.user.id;
 try{
  const identity=await permissionDeadline(db.auth.getUser());if(generation!==state.generation)return;
  if(identity.error){if([401,403].includes(identity.error.status)||['AuthSessionMissingError','AuthInvalidJwtError'].includes(identity.error.name)||['session_not_found','user_banned','user_not_found','bad_jwt'].includes(identity.error.code))resetWorkspace();else if(denied||permissionDenied){resetWorkspace();feedback('#auth-notice','permissionChanged',true)}return}
  if(identity.data?.user?.id!==id){resetWorkspace();await loadWorkspace();return}
  const next=unwrap(await permissionDeadline(db.rpc('gary_my_access')));if(generation!==state.generation)return;
  const changed=!!next?.member!==staff()||(next?.operations??null)!==(state.access?.operations??null)||(next?.cms??null)!==(state.access?.cms??null)||(next?.site_owner===true)!==ownsSite();
  if(changed||denied||permissionDenied){
   const view=state.view;resetWorkspace();await loadWorkspace(view);toast('permissionChanged','warning');
  }else if(state.profile){
   state.user=identity.data.user;renderAccountIdentity();
  }
 }catch(error){if(generation===state.generation&&(denied||permissionDenied||error?.code==='42501'||[401,403].includes(error?.status))){resetWorkspace();feedback('#auth-notice','permissionChanged',true)}}
 finally{permissionRefreshing=false;permissionDenied=false}
}
window.addEventListener('focus',()=>schedulePermissionRefresh());
window.addEventListener('pageshow',()=>schedulePermissionRefresh());
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')schedulePermissionRefresh()});
window.addEventListener('gary:access-denied',event=>schedulePermissionRefresh(!event.detail?.recheckOnly));

function renderAccountIdentity(){
 const name=state.user?(state.profile?.full_name?.trim()||t('account')):'';
 const email=state.user?.email||'';
 const accessRoles=state.user?[
  accountRoleLabel(t,'operations',operationsRole()),
  accountRoleLabel(t,'cms',cmsRole())
 ]:[];
 const roles=staff()?accessRoles:state.user?[t('customer')]:[];
 $('#user-display-name').textContent=name;
 $('#profile-account-name').textContent=name;
 $('#user-signin-email').textContent=email;
 $('#account-email').textContent=email;
 profileAvatar.render();
 for(const [id,labels] of [['#user-role-label',roles],['#profile-account-roles',accessRoles]]){
  const container=$(id);
  if(container.children.length===labels.length&&labels.every((role,i)=>container.children[i].textContent===role))continue;
  container.replaceChildren(...labels.map(role=>element('span',{class:'account-role'},role)));
 }
 const profileButton=$('#sidebar-profile-button');
 const label=[t('myProfile'),name,email,...roles].filter(Boolean).join(' · ');
 profileButton.setAttribute('aria-label',label);
 profileButton.title=label;
 renderStaffAccountMenu();
}
function renderStaffAccountMenu(){
 const signedIn=Boolean(staff()&&state.profile);
 $('#customer-sidebar-user').hidden=staff();
 $('#staff-account-menu').hidden=!signedIn;
 if(!signedIn){staffAccountMenu.close();staffAccountMenu.update({});return;}
 const roles=[];
 if(operationsRole())roles.push(accountRoleLabel(t,'operations',operationsRole()));
 if(cmsRole())roles.push(accountRoleLabel(t,'cms',cmsRole()));
 const visible=roles.length?['staffDashboard','staffProfile']:['staffProfile'];
 const current=state.view==='profile'?'staffProfile':state.view===homeView()?'staffDashboard':undefined;
 staffAccountMenu.update({signedIn,visible,current,roles:roles.length?roles:[t('staff')],
  name:state.profile.full_name?.trim()||state.user.email||t('account'),email:state.user.email,photo:staffAccountPhoto});
}
function openAccountView(view){
 if(!staff()||!viewAllowed(view))return;
 $(`#workspace .workspace-sidebar [data-view="${view}"]`)?.click();
 if(view==='profile'&&state.view===view&&!$('.visa-mobile-nav-drawer[open]'))$('#profile-title').focus();
}
$('#sidebar-profile-button').addEventListener('click',()=>{
 navigateView('profile');
 if(state.view==='profile')$('#profile-title').focus();
});

function renderIdentity(){
 $('#application-kind-filter').hidden=$('#application-kind-label').hidden=!operations();
 document.body.dataset.role=state.role;renderAccountIdentity();$('#workspace-role').textContent=t(staff()?'staffWorkspace':'customerWorkspace');$('[data-view=applications]').hidden=!viewAllowed('applications');$('#customers-nav').hidden=!operations();$('#inbox-nav').hidden=!operations();for(const content of contentViews)$('#'+content+'-nav').hidden=!viewAllowed(content);$('#trash-nav').hidden=!viewAllowed('trash');$('#staff-access-nav').hidden=!staff();$('#staff-no-access').hidden=!staff()||operations()||canOpenCms();$('#new-application').hidden=staff();$('#dashboard-title').textContent=t(staff()?oversees()?'allApplications':'assignedApplications':'yourApplications');$('#dashboard-eyebrow').textContent=t(staff()?'teamWorkspace':'yourJourney');$('#dashboard-intro').textContent=t(staff()?oversees()?'staffDashboardIntro':'assignedDashboardIntro':'dashboardIntro');
}
function setView(view,load=true){
 if(!viewAllowed(view))return;
 if(contentViews.includes(state.view)&&view!==state.view){if(!cms.canLeave())return;cms.reset();}
 if(state.view==='inbox'&&view!=='inbox')inbox.leave();
 if(state.view==='staff-access'&&view!=='staff-access')staffAccess.leave();
 state.view=view;
 document.body.dataset.visaView=view;
 updateDocumentTitle();
 for(const name of VIEWS)$(`#${name}-view`).hidden=name!==view;
 $$('[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
 if(staff())renderStaffAccountMenu();
 if(view==='applications'&&load)void Promise.all([loadApplications(),loadStats()]).catch(()=>toast('refreshFailed','error'));if(view==='staff-access'&&load)void staffAccess.enter();if(view==='trash'&&load)void trash.enter();if(contentViews.includes(view)&&load)void cms.enter();if(view==='profile'){renderProfile();if(load)schedulePermissionRefresh()}if(view==='customers'&&load)crm.enter();if(view==='inbox'&&load)inbox.enter();
 return true;
}
function syncStaffViewUrl(){
 if(!staff())return;
 const url=new URL(location.href);
 if(url.searchParams.has('view')&&url.searchParams.get('view')!==state.view){
  url.searchParams.set('view',state.view);
  history.replaceState(history.state,'',url);
 }
 currentStaffViewUrl=location.href;
}
function navigateView(view,load=true){
 const previous=state.view;
 if(!setView(view,load))return false;
 if(staff()&&previous!==view){
  const url=new URL(location.href);
  url.searchParams.set('view',view);
  if(url.href!==location.href)history.pushState(history.state,'',url);
 }
 syncStaffViewUrl();
 return true;
}
$$('[data-view]').forEach(button=>button.addEventListener('click',()=>navigateView(button.dataset.view)));
window.addEventListener('popstate',()=>{
 if(!staff()||$('#workspace').hidden)return;
 const requested=new URL(location.href).searchParams.get('view');
 const view=VIEWS.includes(requested)&&viewAllowed(requested)?requested:homeView();
 if(view!==state.view&&!setView(view)){
  history.pushState(history.state,'',currentStaffViewUrl);
  return;
 }
 syncStaffViewUrl();
});
function renderProfile(){if(!state.profile)return;for(const key of ['full_name','contact_email','phone','nationality','preferred_language'])$('#profile-form').elements.namedItem(key).value=state.profile[key]??''}
$('#profile-form').addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;feedback('#profile-notice','');await busy(form,async()=>{try{const values=Object.fromEntries(new FormData(form));for(const key of Object.keys(values))values[key]=String(values[key]).trim();const data=unwrap(await db.from('gary_profiles').update(values).eq('id',state.user.id).select().single());state.profile=data;renderIdentity();toast('profileSaved')}catch(error){feedback('#profile-notice',errorKey(error),true)}})});

async function loadStats(){const generation=state.generation;const base=()=>{const query=db.from('gary_applications').select('id',{count:'exact',head:true});return operations()?query.in('intake_kind',requestIntakeKinds):query;};const results=await Promise.all([base(),base().in('status',['submitted','in_review','processing']),base().eq('status','documents_needed'),base().eq('status','completed')]);if(generation!==state.generation)return;results.forEach(unwrap);caseStats=Object.fromEntries(results.map((result,index)=>[caseStatIds[index],result.count]));setCounterValues(document,caseStats,language)}
let applicationRequest=0;
async function loadApplications(){
 const request=++applicationRequest,generation=state.generation;let query=db.from('gary_applications').select('id,customer_id,service,subject,details,status,assigned_staff_id,created_at,updated_at,intake_kind',{count:'exact'}).order('created_at',{ascending:false});
 const search=$('#application-search').value.trim(),status=$('#status-filter').value;if(search)query=query.ilike('subject',`%${search.replace(/[\\%_]/g,'\\$&')}%`);if(status)query=query.eq('status',status);
 if(operations()){const kind=$('#application-kind-filter').value;if(!kind)query=query.in('intake_kind',requestIntakeKinds);else if(kind!=='all')query=query.eq('intake_kind',kind);}
 const result=await query.range(state.page*PAGE_SIZE,state.page*PAGE_SIZE+PAGE_SIZE-1);if(result.error)throw result.error;if(request!==applicationRequest||generation!==state.generation)return;state.cases=result.data;state.total=result.count??0;renderApplications();
}
function renderApplications(){
 const list=$('#applications-list');if(!state.cases.length){const filtered=$('#application-search').value||$('#status-filter').value||(operations()&&$('#application-kind-filter').value);const empty=element('div',{class:'empty-state'},[icon('file'),element('h3',{},t(filtered?'noResultsTitle':staff()?oversees()?'staffEmptyTitle':'assignedEmptyTitle':'emptyTitle')),element('p',{},t(filtered?'noResultsBody':staff()?oversees()?'staffEmptyBody':'assignedEmptyBody':'emptyBody'))]);if(!staff()&&!filtered){const button=element('button',{type:'button',class:'button','data-new-application':''},t('newApplication'));empty.append(button)}list.replaceChildren(empty)}else{
  const heading=element('div',{class:'application-table-heading','aria-hidden':'true'},[element('span',{},t('listApplication')),element('span',{},t('listService')),element('span',{},t('listStatus')),element('span',{class:'heading-date'},t('listCreated')),element('span')]);
  list.replaceChildren(heading,...state.cases.map(application=>element('button',{type:'button',class:'application-row','data-case':application.id},[element('span',{},[element('strong',{},application.subject),element('small',{},operations()?reference(application.id)+' · '+t('intake_'+application.intake_kind):reference(application.id))]),element('span',{class:'row-service'},t(`service_${application.service}`)),badge(application.status),element('span',{class:'row-date'},date(application.created_at)),icon('up')])));
 }
 const start=state.total?state.page*PAGE_SIZE+1:0,end=Math.min((state.page+1)*PAGE_SIZE,state.total);$('#page-summary').textContent=`${start}–${end} ${t('of')} ${state.total} ${t('applicationsCount')}`;$('#previous-page').disabled=state.page===0;$('#next-page').disabled=end>=state.total;
}
async function refreshApplications(){try{await Promise.all([loadApplications(),loadStats()])}catch{toast('refreshFailed','error')}}
$('#refresh-applications').addEventListener('click',refreshApplications);
$('#application-search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{state.page=0;loadApplications().catch(()=>toast('refreshFailed','error'))},250)});
for(const id of ['status-filter','application-kind-filter'])$('#'+id).addEventListener('change',()=>{state.page=0;loadApplications().catch(()=>toast('refreshFailed','error'))});
$('#previous-page').addEventListener('click',()=>{if(state.page>0){state.page--;loadApplications().catch(()=>toast('refreshFailed','error'))}});$('#next-page').addEventListener('click',()=>{if((state.page+1)*PAGE_SIZE<state.total){state.page++;loadApplications().catch(()=>toast('refreshFailed','error'))}});

function openRequest(application=null){state.editingId=application?.id??null;$('#request-form').reset();$('#request-intent-hint').hidden=$('#request-intent-field').hidden=$('#request-intent').disabled=Boolean(application);$('#request-dialog-title').textContent=t(application?'editTitle':'newApplication');$('#request-submit>span').textContent=t(application?'saveChanges':'submitApplication');feedback('#request-notice','');if(application)for(const key of ['service','subject','details'])$('#request-form').elements.namedItem(key).value=application[key]??'';if($('#case-dialog').open)closeDialog($('#case-dialog'));showDialog($('#request-dialog'))}
$('#new-application').addEventListener('click',()=>openRequest());
document.addEventListener('click',event=>{if(event.target.closest('[data-new-application]'))openRequest();const caseButton=event.target.closest('[data-case]');if(caseButton)openCase(caseButton.dataset.case)});
$('#request-form').addEventListener('submit',async event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;feedback('#request-notice','');const editing=state.editingId;
 if(editing&&staff()&&!canEditStaffCase(state.currentCase)){feedback('#request-notice','caseEditAssignedOnly',true);return;}
 await busy(form,async()=>{try{const fields=Object.fromEntries(new FormData(form));for(const key of Object.keys(fields))fields[key]=String(fields[key]).trim();if([...fields.subject].length<3||!/[\p{L}\p{N}]/u.test(fields.subject)||/[\u0000-\u001f\u007f]/u.test(fields.subject)){feedback('#request-notice','applicationSubjectInvalid',true);form.elements.subject.focus();return}if(!editing)fields.request_confirmed=$('#request-intent').checked;const query=editing?db.from('gary_applications').update(fields).eq('id',editing):db.from('gary_applications').insert(fields);const application=unwrap(await query.select().single());closeDialog($('#request-dialog'));form.reset();if(!editing)state.page=0;toast(editing?'applicationUpdated':'applicationCreated');await refreshApplications();await openCase(application.id)}catch(error){feedback('#request-notice',errorKey(error),true)}});
});

async function openCase(id){
 state.caseId=id;state.currentCase=null;state.caseData=null;$('#case-title').textContent=t('detailLoading');$('#case-reference').textContent=reference(id);$('#case-details').textContent='';$('#case-service').textContent='';$('#case-status').replaceChildren();$('#case-customer').replaceChildren();$('#case-events').replaceChildren();$('#case-message-list').replaceChildren();$('#case-document-list').replaceChildren();$('#case-note-list').replaceChildren();$('#case-intake-form').hidden=true;$('#staff-status-form').hidden=true;$('#edit-application').hidden=true;$('#cancel-application').hidden=true;$('#trash-case').hidden=true;$('#case-trash-hint').hidden=true;$('#case-assignee-field').hidden=true;$('#tab-notes').hidden=!operations();feedback('#case-feedback','');showTab('overview');showDialog($('#case-dialog'));
 try{await refreshCase(id)}catch(error){feedback('#case-feedback',errorKey(error),true)}
}
async function refreshCase(id=state.caseId){
 const generation=state.generation;const requests=[db.from('gary_applications').select('*').eq('id',id).single(),db.from('gary_application_events').select('id,status,intake_kind,created_at').eq('application_id',id).order('created_at').order('id'),db.from('gary_messages').select('id,sender_id,body,created_at').eq('application_id',id).order('created_at',{ascending:false}).limit(100),db.from('gary_documents').select('id,file_name,size_bytes,object_path,created_at').eq('application_id',id).order('created_at',{ascending:false}).limit(100)];
 if(operations())requests.push(db.from('gary_staff_notes').select('id,staff_id,body,created_at').eq('application_id',id).order('created_at',{ascending:false}).limit(100));
 const results=await Promise.all(requests);results.forEach(unwrap);if(generation!==state.generation||state.caseId!==id)return;state.currentCase=results[0].data;state.caseData={events:results[1].data,messages:[...results[2].data].reverse(),documents:results[3].data,notes:results[4]?.data??[],customer:null};
 if(operations()){const customer=await db.from('gary_profiles').select('full_name,contact_email,phone,nationality').eq('id',state.currentCase.customer_id).maybeSingle();if(generation!==state.generation||state.caseId!==id)return;state.caseData.customer=unwrap(customer)}renderCase();
}
function renderCase(){
 const application=state.currentCase,data=state.caseData;if(!application||!data)return;$('#case-title').textContent=application.subject;$('#case-reference').textContent=`${reference(application.id)} · ${date(application.created_at)}`;$('#case-service').textContent=t(`service_${application.service}`);$('#case-status').replaceChildren(badge(application.status));$('#case-details').textContent=application.details||t('noDetails');
 $('#case-intake-form').hidden=!oversees()||!canEditStaffCase(application);$('#case-intake').value=application.intake_kind;
 const editable=staff()?canEditStaffCase(application):EDITABLE_STATUSES.includes(application.status);$('#edit-application').hidden=!editable;$('#cancel-application').hidden=staff()||!EDITABLE_STATUSES.includes(application.status);$('#trash-case').hidden=operationsRole()!=='admin';$('#case-trash-hint').hidden=operationsRole()!=='admin';$('#staff-status-form').hidden=!canEditStaffCase(application);$('#tab-notes').hidden=!operations();$('#case-customer').hidden=!operations();$('#case-assignee-field').hidden=!oversees();
 if(operations()){$('#staff-status').value=application.status;$('#assignment-label').textContent=t(application.assigned_staff_id===state.user.id?'assignedToYou':application.assigned_staff_id?'assignedToTeam':'unassigned');$('#assign-to-me').hidden=!oversees()||application.assigned_staff_id===state.user.id;if(oversees())void renderCaseAssignee(application);const profile=data.customer;$('#case-customer').replaceChildren(element('p',{class:'case-section-label'},t('customerLabel')),element('strong',{},profile?.full_name||t('customer')),...[profile?.contact_email,profile?.phone,profile?.nationality].filter(Boolean).map(value=>element('div',{},value)))}
 $('#case-events').replaceChildren(...data.events.filter(event=>operations()||!event.intake_kind).map(event=>element('li',{},[element('strong',{},t(event.intake_kind?`intake_${event.intake_kind}`:`status_${event.status}`)),element('span',{},dateTime(event.created_at))])));
 const messages=$('#case-message-list');messages.replaceChildren(...(data.messages.length?data.messages.map(message=>element('article',{class:`message${message.sender_id===state.user.id?' own':''}`},[element('p',{},message.body),element('small',{},`${message.sender_id===state.user.id?t('you'):message.sender_id===application.customer_id?t('customer'):t('team')} · ${dateTime(message.created_at)}`)])):[element('p',{class:'panel-empty'},t('noMessages'))]));messages.scrollTop=messages.scrollHeight;
 $('#case-document-list').replaceChildren(...(data.documents.length?data.documents.map(file=>element('div',{class:'document-row'},[icon('file'),element('div',{},[element('strong',{},file.file_name),element('small',{},`${(file.size_bytes/1024).toFixed(0)} KB · ${date(file.created_at)}`)]),element('button',{class:'inline-button',type:'button','data-document':file.id},t('openFile'))])):[element('p',{class:'panel-empty'},t('noDocuments'))]));
 $('#case-note-list').replaceChildren(...(operations()&&data.notes.length?data.notes.map(note=>element('article',{class:'message'},[element('p',{},note.body),element('small',{},`${note.staff_id===state.user.id?t('you'):t('staff')} · ${dateTime(note.created_at)}`)])):[element('p',{class:'panel-empty'},t('noNotes'))]));
}
async function renderCaseAssignee(application){const roster=await getRoster().catch(()=>[]);if(state.currentCase!==application||!oversees())return;staffOptions($('#case-assignee'),roster,application.assigned_staff_id??'')}
function showTab(tab){if(tab==='notes'&&!operations())return;state.tab=tab;$$('[data-tab]').forEach(button=>{const selected=button.dataset.tab===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;$(`#case-${button.dataset.tab}`).hidden=!selected})}
$$('[data-tab]').forEach(button=>{button.addEventListener('click',()=>showTab(button.dataset.tab));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=$$('[data-tab]').filter(tab=>!tab.hidden),index=tabs.indexOf(button);const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;showTab(tabs[next].dataset.tab);tabs[next].focus()})});
$('#edit-application').addEventListener('click',()=>{const application=state.currentCase;if(application&&(staff()?canEditStaffCase(application):EDITABLE_STATUSES.includes(application.status)))openRequest(application)});
$('#trash-case').addEventListener('click',async event=>{const application=state.currentCase,generation=state.generation,button=event.currentTarget;if(operationsRole()!=='admin'||!application||button.disabled||!window.confirm(t('trashCaseConfirm')))return;button.disabled=true;try{const result=unwrap(await db.rpc('gary_trash_record',{p_kind:'case',p_id:application.id,p_expected_version:null}));if(result?.id!==application.id||!result.deleted_at)throw new Error('Incomplete Trash confirmation');if(generation!==state.generation||operationsRole()!=='admin')return;if(state.caseId===application.id){closeDialog($('#case-dialog'));state.caseId=null;state.currentCase=null;state.caseData=null;}state.page=0;toast('recordTrashed');await refreshApplications()}catch(error){if(generation===state.generation)feedback('#case-feedback',errorKey(error),true)}finally{button.disabled=false}});
$('#cancel-application').addEventListener('click',async event=>{const application=state.currentCase,button=event.currentTarget;if(button.disabled||!application||!EDITABLE_STATUSES.includes(application.status)||!window.confirm(t('cancelConfirm')))return;button.disabled=true;try{unwrap(await db.from('gary_applications').update({status:'cancelled'}).eq('id',application.id).select().single());feedback('#case-feedback','');toast('applicationCancelled');await refreshCase(application.id);await refreshApplications()}catch(error){feedback('#case-feedback',errorKey(error),true)}finally{button.disabled=false}});
$('#case-intake-form').addEventListener('submit',async event=>{
 event.preventDefault();
 const application=state.currentCase,kind=$('#case-intake').value,generation=state.generation;
 if(!oversees()||!canEditStaffCase(application)||kind===application.intake_kind)return;
 await busy(event.currentTarget,async()=>{try{
  unwrap(await db.from('gary_applications').update({intake_kind:kind}).eq('id',application.id).eq('intake_kind',application.intake_kind).select('id').single());
  if(generation!==state.generation)return;
  toast('intakeSaved');await Promise.all([refreshCase(application.id),refreshApplications()]);
 }catch(error){if(generation===state.generation)feedback('#case-feedback',errorKey(error),true)}});
});
$('#staff-status-form').addEventListener('submit',async event=>{event.preventDefault();if(!canEditStaffCase(state.currentCase))return;const id=state.currentCase.id;await busy(event.currentTarget,async()=>{try{unwrap(await db.from('gary_applications').update({status:$('#staff-status').value}).eq('id',id).select().single());feedback('#case-feedback','');toast('statusSaved');await refreshCase(id);await refreshApplications()}catch(error){feedback('#case-feedback',errorKey(error),true)}})});
$('#assign-to-me').addEventListener('click',async event=>{const button=event.currentTarget;if(!oversees()||!state.currentCase||button.disabled)return;button.disabled=true;try{const id=state.currentCase.id;unwrap(await db.from('gary_applications').update({assigned_staff_id:state.user.id}).eq('id',id).select().single());feedback('#case-feedback','');toast('assignmentSaved');await refreshCase(id)}catch(error){feedback('#case-feedback',errorKey(error),true)}finally{button.disabled=false}});
$('#case-assignee').addEventListener('change',async event=>{const select=event.currentTarget,application=state.currentCase,value=select.value||null;if(!oversees()||!application||select.disabled||value===(application.assigned_staff_id??null))return;select.disabled=true;try{unwrap(await db.from('gary_applications').update({assigned_staff_id:value}).eq('id',application.id).select().single());feedback('#case-feedback','');toast('caseAssignmentSaved');await refreshCase(application.id);await refreshApplications()}catch(error){select.value=application.assigned_staff_id??'';feedback('#case-feedback',errorKey(error),true)}finally{select.disabled=false}});

for(const [selector,table,success,field]of [['#message-form','gary_messages','messageSent','#message-body'],['#note-form','gary_staff_notes','noteAdded','#note-body']])$(selector).addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity()||!state.currentCase||table==='gary_staff_notes'&&!operations())return;const id=state.currentCase.id,body=$(field).value.trim();if(!body)return;feedback('#case-feedback','');await busy(form,async()=>{try{unwrap(await db.from(table).insert({application_id:id,body}).select('id').single());form.reset();toast(success);await refreshCase(id)}catch(error){feedback('#case-feedback',errorKey(error),true)}})});
$('#refresh-messages').addEventListener('click',async()=>{try{await refreshCase()}catch(error){feedback('#case-feedback',errorKey(error),true)}});
$('#document-form').addEventListener('submit',async event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity()||!state.currentCase)return;const file=$('#document-file').files[0],id=state.currentCase.id;feedback('#case-feedback','');
 await busy(form,async()=>{try{validateDocument(file);const path=documentPath(id,state.user.id,file);unwrap(await db.storage.from(config.documentBucket).upload(path,file,{upsert:false,contentType:file.type,cacheControl:'0'}));const result=await db.from('gary_documents').insert({application_id:id,object_path:path,file_name:file.name.slice(0,200),mime_type:file.type,size_bytes:file.size}).select('id').single();if(result.error){await db.storage.from(config.documentBucket).remove([path]);throw result.error}form.reset();feedback('#case-feedback','');toast('documentUploaded');await refreshCase(id)}catch(error){feedback('#case-feedback',errorKey(error),true)}});
});
$('#case-document-list').addEventListener('click',async event=>{const button=event.target.closest('[data-document]');if(!button)return;const file=state.caseData?.documents.find(item=>item.id===button.dataset.document);if(!file)return;const popup=window.open('about:blank','_blank');if(popup)popup.opener=null;try{const data=unwrap(await db.storage.from(config.documentBucket).createSignedUrl(file.object_path,60));const url=new URL(data.signedUrl);if(url.origin!==new URL(config.supabaseUrl).origin)throw new Error('documentUnavailable');if(popup)popup.location.replace(url.href);else{$('#case-feedback').replaceChildren(element('a',{href:url.href,target:'_blank',rel:'noopener noreferrer'},t('openFile')))}}catch{popup?.close();feedback('#case-feedback','documentUnavailable',true)}});

translate();
db.auth.onAuthStateChange((event,session)=>{
 if(event==='SIGNED_OUT'){resetWorkspace();return}
 if(event==='PASSWORD_RECOVERY'){state.recovery=true;state.user=session?.user??null;state.mode='recovery';setScreen('auth-screen');renderAuth();return}
 if(['SIGNED_IN','TOKEN_REFRESHED','USER_UPDATED'].includes(event)&&session&&!state.recovery){if(!state.profile)queueMicrotask(()=>loadWorkspace());else schedulePermissionRefresh()}
});
try{const {data,error}=await db.auth.getSession();if(error)throw error;if(data.session){state.user=data.session.user;if(state.recovery){state.mode='recovery';setScreen('auth-screen');renderAuth()}else await loadWorkspace()}else{setScreen('auth-screen');if(new URLSearchParams(location.hash.slice(1)).has('error'))feedback('#auth-notice','linkExpired',true)}}catch{setScreen('auth-screen');feedback('#auth-notice','genericError',true)}
