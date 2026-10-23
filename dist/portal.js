import {db,unwrap,ensureProfile,EDITABLE_STATUSES,validateDocument,documentPath,authRedirect} from './backend.js';
import {config} from './config.js';
import {portalCopy} from './portal-copy.js';
import {createCRM} from './crm.js';
import {createInbox} from './inbox.js';

const $=selector=>document.querySelector(selector),$$=selector=>[...document.querySelectorAll(selector)];
const english={};
$$('[data-p]').forEach(node=>{english[node.dataset.p]??=node.textContent.trim()});
$$('[data-p-placeholder]').forEach(node=>{english[node.dataset.pPlaceholder]??=node.placeholder});
const params=new URL(location.href).searchParams;
let language='en';try{language=localStorage.getItem('gary-language')==='vi'?'vi':'en'}catch{}
if(params.get('lang'))language=params.get('lang')==='vi'?'vi':'en';
const state={user:null,role:null,profile:null,mode:'signin',area:params.get('area')==='staff'?'staff':'customer',view:'applications',page:0,total:0,cases:[],customerPage:0,customerTotal:0,customers:[],caseId:null,currentCase:null,caseData:null,tab:'overview',editingId:null,generation:0,loading:false,recovery:params.get('flow')==='recovery'};
const PAGE_SIZE=20;
const t=key=>portalCopy[language]?.[key]??portalCopy.en[key]??english[key]??key;
const element=(tag,attrs={},children=[])=>{const node=document.createElement(tag);for(const [key,value]of Object.entries(attrs)){if(value!==null&&value!==undefined)node.setAttribute(key,String(value))}for(const child of (Array.isArray(children)?children:[children]))if(child!==null&&child!==undefined)node.append(typeof child==='string'?document.createTextNode(child):child);return node};
const icon=(name)=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','icon');svg.setAttribute('aria-hidden','true');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href',`#p-${name}`);svg.append(use);return svg};
const date=value=>new Intl.DateTimeFormat(language==='vi'?'vi-VN':'en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(value));
const dateTime=value=>new Intl.DateTimeFormat(language==='vi'?'vi-VN':'en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
const reference=id=>`GA-${id.slice(0,8).toUpperCase()}`;
const staff=()=>state.role==='staff';
const badge=status=>element('span',{class:`status-badge status-${status}`},t(`status_${status}`));
let toastTimer,searchTimer,customerSearchTimer;
function toast(key){$('#toast').textContent=t(key);$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{$('#toast').hidden=true},5500)}
function feedback(target,key,error=false){const node=$(target);node.textContent=key?t(key):'';node.classList.toggle('error',error)}
function errorKey(error){if(['documentType','documentSize','roleError','weakPassword'].includes(error?.message))return error.message;if(error?.code==='invalid_credentials')return'invalidSignin';if(error?.code==='email_not_confirmed')return'confirmEmail';if(error?.code==='weak_password')return'weakPassword';if(error?.code?.includes('rate_limit'))return'rateLimited';if(error?.code==='42501')return'permissionChanged';return'genericError'}
async function busy(form,callback){const buttons=[...form.querySelectorAll('button[type=submit]')];buttons.forEach(button=>{button.disabled=true;button.setAttribute('aria-busy','true')});try{return await callback()}finally{buttons.forEach(button=>{button.disabled=false;button.removeAttribute('aria-busy')})}}
function showDialog(node){if(!node.open){node.showModal();document.body.classList.add('dialog-open')}}
function closeDialog(node){node.close();if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open')}
$$('dialog').forEach(node=>{node.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open')});node.addEventListener('click',event=>{if(event.target===node){const rect=node.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog(node)}})});
document.addEventListener('click',event=>{const button=event.target.closest('[data-close]');if(button)closeDialog(document.getElementById(button.dataset.close))});

let rosterCache=null;
async function getRoster(){
 if(!staff())return [];if(rosterCache&&rosterCache.expires>Date.now())return rosterCache.data;
 const generation=state.generation,data=unwrap(await db.rpc('gary_staff_directory'))||[];
 if(generation!==state.generation||!staff())return [];rosterCache={data,expires:Date.now()+60000};return data;
}
const crm=createCRM({db,doc:document,t,isStaff:staff,getUser:()=>state.user,getRoster,showDialog,closeDialog,notify:toast,openApplication:openCase,openChat:id=>{setView('inbox',false);inbox.enter(id)}});
const inbox=createInbox({db,doc:document,t,isStaff:staff,getUser:()=>state.user,getRoster,openContact:id=>crm.openContact(id)});

function translate(){
 document.documentElement.lang=language;
 $$('[data-p]').forEach(node=>{node.textContent=t(node.dataset.p)});$$('[data-p-placeholder]').forEach(node=>{node.placeholder=t(node.dataset.pPlaceholder)});
 $$('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
 try{localStorage.setItem('gary-language',language)}catch{}
 document.dispatchEvent(new CustomEvent('gary:language',{detail:{language}}));renderAuth();if(state.user&&state.profile){renderIdentity();renderApplications();crm.render();inbox.render();if(state.currentCase&&state.caseData)renderCase();}
 $('#request-dialog-title').textContent=t(state.editingId?'editTitle':'newApplication');$('#request-submit>span').textContent=t(state.editingId?'saveChanges':'submitApplication');
 $('#toggle-password').textContent=t($('#auth-password').type==='password'?'show':'hide');
}
$$('[data-language]').forEach(button=>button.addEventListener('click',()=>{language=button.dataset.language;translate()}));

function renderAuth(){
 updateDocumentTitle();
 const mode=state.mode,isSignup=mode==='signup',isReset=mode==='reset',isRecovery=mode==='recovery';
 $$('[data-area]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.area===state.area)));
 const keys=isRecovery?['recoveryEyebrow','recoveryTitle','recoveryIntro','recoveryButton']:isReset?['resetEyebrow','resetTitle','resetIntro','resetButton']:isSignup?['signupEyebrow','signupTitle','signupIntro','signupButton']:state.area==='staff'?['staffWelcome','staffSigninTitle','staffSigninIntro','signin']:['welcomeBack','signinTitle','signinIntro','signin'];
 ['#auth-eyebrow','#auth-title','#auth-description','#auth-submit-label'].forEach((selector,index)=>{$(selector).textContent=t(keys[index])});
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
 await busy(form,async()=>{try{
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
 }catch(error){feedback('#auth-notice',errorKey(error),true)}});
});

function updateDocumentTitle(){
 const copy=language==='vi'?{customer:'Cổng khách hàng',staff:'Cổng nhân viên',signin:'Đăng nhập khách hàng',staffSignin:'Đăng nhập nhân viên',signup:'Tạo tài khoản khách hàng',reset:'Đặt lại mật khẩu',recovery:'Đặt mật khẩu mới',applications:'Hồ sơ',profile:'Hồ sơ cá nhân',customers:'Quan hệ khách hàng',inbox:'Hộp thư chat trực tiếp',error:'Không thể tải không gian làm việc'}:{customer:'Customer Portal',staff:'Staff Portal',signin:'Customer Sign In',staffSignin:'Staff Sign In',signup:'Create Customer Account',reset:'Reset Password',recovery:'Set New Password',applications:'Applications',profile:'My Profile',customers:'Customer Relationships',inbox:'Live Chat Inbox',error:'Workspace Unavailable'};
 let title;
 if(!$('#workspace').hidden)title=`${copy[state.view]} | ${copy[staff()?'staff':'customer']}`;
 else if(!$('#auth-screen').hidden)title=copy[state.mode==='signin'&&state.area==='staff'?'staffSignin':state.mode];
 else if(!$('#workspace-error').hidden)title=copy.error;
 else title=copy[staff()||state.area==='staff'?'staff':'customer'];
 document.title=`${title} | Gary Agency`;
}
function setScreen(name){for(const id of ['auth-screen','workspace-loading','workspace-error','workspace'])$(`#${id}`).hidden=id!==name;$('#signout').hidden=!state.user;updateDocumentTitle()}
function resetWorkspace(){
 delete document.body.dataset.role;crm.reset();inbox.reset();rosterCache=null;state.generation++;state.user=null;state.role=null;state.profile=null;state.cases=[];state.customers=[];state.currentCase=null;state.caseData=null;state.caseId=null;state.loading=false;state.page=0;state.customerPage=0;state.total=0;state.customerTotal=0;
 $$('dialog[open]').forEach(closeDialog);$('#applications-list').replaceChildren();$('#customers-list').replaceChildren();$('#case-message-list').replaceChildren();$('#case-note-list').replaceChildren();$('#case-document-list').replaceChildren();$('#case-events').replaceChildren();$('#case-title').textContent='';$('#case-details').textContent='';$('#case-customer').replaceChildren();$('#profile-form').reset();$('#account-email').textContent='';$('#auth-password').value='';$('#user-display-name').textContent='';$('#profile-notice').textContent='';$('#message-form').reset();$('#note-form').reset();$('#request-form').reset();$('#document-form').reset();setScreen('auth-screen');renderAuth();
}
async function signOut(){try{await inbox.goAway();const {error}=await db.auth.signOut({scope:'local'});if(error)throw error;resetWorkspace()}catch{toast('genericError')}}
$('#signout').addEventListener('click',signOut);$('#error-signout').addEventListener('click',signOut);
async function loadWorkspace(){
 if(state.loading)return;state.loading=true;const generation=++state.generation;setScreen('workspace-loading');
 try{
  const {data,error}=await db.auth.getUser();if(generation!==state.generation)return;if(error)throw error;if(!data.user){resetWorkspace();return}state.user=data.user;
  const role=unwrap(await db.rpc('gary_my_role'));if(generation!==state.generation)return;if(!['customer','staff'].includes(role))throw new Error('genericError');state.role=role;
  if(state.area==='staff'&&role!=='staff'){setScreen('auth-screen');feedback('#auth-notice','roleError',true);return}
  const profile=await ensureProfile(data.user);if(generation!==state.generation)return;state.profile=profile;renderIdentity();renderProfile();setView('applications',false);
  await Promise.all([loadApplications(),loadStats()]);if(generation!==state.generation)return;setScreen('workspace');if(staff()&&params.get('view')==='inbox')setView('inbox');
 }catch(error){if(generation===state.generation){setScreen('workspace-error');$('#signout').hidden=!state.user}}
 finally{if(generation===state.generation)state.loading=false}
}
$('#retry-workspace').addEventListener('click',()=>loadWorkspace());
function renderIdentity(){
 document.body.dataset.role=state.role;$('#user-display-name').textContent=state.profile.full_name||state.user.email||t('account');$('#user-avatar').textContent=(state.profile.full_name||state.user.email||'G').slice(0,1).toUpperCase();$('#user-role-label').textContent=t(staff()?'staff':'customer');$('#workspace-role').textContent=t(staff()?'staffWorkspace':'customerWorkspace');$('#customers-nav').hidden=!staff();$('#inbox-nav').hidden=!staff();$('#new-application').hidden=staff();$('#dashboard-title').textContent=t(staff()?'allApplications':'yourApplications');$('#dashboard-eyebrow').textContent=t(staff()?'teamWorkspace':'yourJourney');$('#dashboard-intro').textContent=t(staff()?'staffDashboardIntro':'dashboardIntro');
}
function setView(view,load=true){
 if(!['applications','profile','customers','inbox'].includes(view)||(['customers','inbox'].includes(view)&&!staff()))return;
 if(state.view==='inbox'&&view!=='inbox')inbox.leave();state.view=view;
 updateDocumentTitle();
 for(const name of ['applications','profile','customers','inbox'])$(`#${name}-view`).hidden=name!==view;
 $$('[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
 if(view==='profile')renderProfile();if(view==='customers'&&load)crm.enter();if(view==='inbox'&&load)inbox.enter();
}
$$('[data-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
function renderProfile(){if(!state.profile)return;for(const key of ['full_name','contact_email','phone','nationality','preferred_language'])$('#profile-form').elements.namedItem(key).value=state.profile[key]??'';$('#account-email').textContent=state.user.email??''}
$('#profile-form').addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;feedback('#profile-notice','');await busy(form,async()=>{try{const values=Object.fromEntries(new FormData(form));for(const key of Object.keys(values))values[key]=String(values[key]).trim();const data=unwrap(await db.from('gary_profiles').update(values).eq('id',state.user.id).select().single());state.profile=data;renderIdentity();feedback('#profile-notice','profileSaved')}catch(error){feedback('#profile-notice',errorKey(error),true)}})});

async function loadStats(){const generation=state.generation;const base=()=>db.from('gary_applications').select('id',{count:'exact',head:true});const results=await Promise.all([base(),base().in('status',['submitted','in_review','processing']),base().eq('status','documents_needed'),base().eq('status','completed')]);if(generation!==state.generation)return;for(let index=0;index<results.length;index++){if(results[index].error)throw results[index].error;$('#stat-'+['total','active','attention','completed'][index]).textContent=String(results[index].count??0)}}
let applicationRequest=0;
async function loadApplications(){
 const request=++applicationRequest,generation=state.generation;let query=db.from('gary_applications').select('id,customer_id,service,subject,details,status,assigned_staff_id,created_at,updated_at',{count:'exact'}).order('created_at',{ascending:false});
 const search=$('#application-search').value.trim(),status=$('#status-filter').value;if(search)query=query.ilike('subject',`%${search.replace(/[\\%_]/g,'\\$&')}%`);if(status)query=query.eq('status',status);
 const result=await query.range(state.page*PAGE_SIZE,state.page*PAGE_SIZE+PAGE_SIZE-1);if(result.error)throw result.error;if(request!==applicationRequest||generation!==state.generation)return;state.cases=result.data;state.total=result.count??0;renderApplications();
}
function renderApplications(){
 const list=$('#applications-list');if(!state.cases.length){const filtered=$('#application-search').value||$('#status-filter').value;const empty=element('div',{class:'empty-state'},[icon('file'),element('h3',{},t(filtered?'noResultsTitle':staff()?'staffEmptyTitle':'emptyTitle')),element('p',{},t(filtered?'noResultsBody':staff()?'staffEmptyBody':'emptyBody'))]);if(!staff()&&!filtered){const button=element('button',{type:'button',class:'button','data-new-application':''},t('newApplication'));empty.append(button)}list.replaceChildren(empty)}else{
  const heading=element('div',{class:'application-table-heading','aria-hidden':'true'},[element('span',{},t('listApplication')),element('span',{},t('listService')),element('span',{},t('listStatus')),element('span',{class:'heading-date'},t('listCreated')),element('span')]);
  list.replaceChildren(heading,...state.cases.map(application=>element('button',{type:'button',class:'application-row','data-case':application.id},[element('span',{},[element('strong',{},application.subject),element('small',{},reference(application.id))]),element('span',{class:'row-service'},t(`service_${application.service}`)),badge(application.status),element('span',{class:'row-date'},date(application.created_at)),icon('up')])));
 }
 const start=state.total?state.page*PAGE_SIZE+1:0,end=Math.min((state.page+1)*PAGE_SIZE,state.total);$('#page-summary').textContent=`${start}–${end} ${t('of')} ${state.total} ${t('applicationsCount')}`;$('#previous-page').disabled=state.page===0;$('#next-page').disabled=end>=state.total;
}
async function refreshApplications(){try{await Promise.all([loadApplications(),loadStats()])}catch{toast('refreshFailed')}}
$('#refresh-applications').addEventListener('click',refreshApplications);
$('#application-search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>{state.page=0;loadApplications().catch(()=>toast('refreshFailed'))},250)});
$('#status-filter').addEventListener('change',()=>{state.page=0;loadApplications().catch(()=>toast('refreshFailed'))});
$('#previous-page').addEventListener('click',()=>{if(state.page>0){state.page--;loadApplications().catch(()=>toast('refreshFailed'))}});$('#next-page').addEventListener('click',()=>{if((state.page+1)*PAGE_SIZE<state.total){state.page++;loadApplications().catch(()=>toast('refreshFailed'))}});

function openRequest(application=null){state.editingId=application?.id??null;$('#request-form').reset();$('#request-dialog-title').textContent=t(application?'editTitle':'newApplication');$('#request-submit>span').textContent=t(application?'saveChanges':'submitApplication');feedback('#request-notice','');if(application)for(const key of ['service','subject','details'])$('#request-form').elements.namedItem(key).value=application[key]??'';if($('#case-dialog').open)closeDialog($('#case-dialog'));showDialog($('#request-dialog'))}
$('#new-application').addEventListener('click',()=>openRequest());
document.addEventListener('click',event=>{if(event.target.closest('[data-new-application]'))openRequest();const caseButton=event.target.closest('[data-case]');if(caseButton)openCase(caseButton.dataset.case)});
$('#request-form').addEventListener('submit',async event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;feedback('#request-notice','');const editing=state.editingId;
 await busy(form,async()=>{try{const fields=Object.fromEntries(new FormData(form));for(const key of Object.keys(fields))fields[key]=String(fields[key]).trim();if(fields.subject.length<3){form.elements.subject.focus();return}const query=editing?db.from('gary_applications').update(fields).eq('id',editing):db.from('gary_applications').insert(fields);const application=unwrap(await query.select().single());closeDialog($('#request-dialog'));form.reset();state.page=0;await refreshApplications();toast(editing?'applicationUpdated':'applicationCreated');await openCase(application.id)}catch(error){feedback('#request-notice',errorKey(error),true)}});
});

async function openCase(id){
 state.caseId=id;state.currentCase=null;state.caseData=null;$('#case-title').textContent=t('detailLoading');$('#case-reference').textContent=reference(id);$('#case-details').textContent='';$('#case-service').textContent='';$('#case-status').replaceChildren();$('#case-customer').replaceChildren();$('#case-events').replaceChildren();$('#case-message-list').replaceChildren();$('#case-document-list').replaceChildren();$('#case-note-list').replaceChildren();$('#staff-status-form').hidden=true;$('#edit-application').hidden=true;$('#cancel-application').hidden=true;$('#tab-notes').hidden=!staff();feedback('#case-feedback','');showTab('overview');showDialog($('#case-dialog'));
 try{await refreshCase(id)}catch(error){feedback('#case-feedback',errorKey(error),true)}
}
async function refreshCase(id=state.caseId){
 const generation=state.generation;const requests=[db.from('gary_applications').select('*').eq('id',id).single(),db.from('gary_application_events').select('id,status,created_at').eq('application_id',id).order('created_at'),db.from('gary_messages').select('id,sender_id,body,created_at').eq('application_id',id).order('created_at',{ascending:false}).limit(100),db.from('gary_documents').select('id,file_name,size_bytes,object_path,created_at').eq('application_id',id).order('created_at',{ascending:false}).limit(100)];
 if(staff())requests.push(db.from('gary_staff_notes').select('id,staff_id,body,created_at').eq('application_id',id).order('created_at',{ascending:false}).limit(100));
 const results=await Promise.all(requests);results.forEach(unwrap);if(generation!==state.generation||state.caseId!==id)return;state.currentCase=results[0].data;state.caseData={events:results[1].data,messages:[...results[2].data].reverse(),documents:results[3].data,notes:results[4]?.data??[],customer:null};
 if(staff()){const customer=await db.from('gary_profiles').select('full_name,contact_email,phone,nationality').eq('id',state.currentCase.customer_id).maybeSingle();if(generation!==state.generation||state.caseId!==id)return;state.caseData.customer=unwrap(customer)}renderCase();
}
function renderCase(){
 const application=state.currentCase,data=state.caseData;if(!application||!data)return;$('#case-title').textContent=application.subject;$('#case-reference').textContent=`${reference(application.id)} · ${date(application.created_at)}`;$('#case-service').textContent=t(`service_${application.service}`);$('#case-status').replaceChildren(badge(application.status));$('#case-details').textContent=application.details||t('noDetails');
 const editable=staff()||EDITABLE_STATUSES.includes(application.status);$('#edit-application').hidden=!editable;$('#cancel-application').hidden=staff()||!EDITABLE_STATUSES.includes(application.status);$('#staff-status-form').hidden=!staff();$('#tab-notes').hidden=!staff();$('#case-customer').hidden=!staff();
 if(staff()){$('#staff-status').value=application.status;$('#assignment-label').textContent=t(application.assigned_staff_id===state.user.id?'assignedToYou':application.assigned_staff_id?'assignedToTeam':'unassigned');$('#assign-to-me').hidden=application.assigned_staff_id===state.user.id;const profile=data.customer;$('#case-customer').replaceChildren(element('p',{class:'case-section-label'},t('customerLabel')),element('strong',{},profile?.full_name||t('customer')),...[profile?.contact_email,profile?.phone,profile?.nationality].filter(Boolean).map(value=>element('div',{},value)))}
 $('#case-events').replaceChildren(...data.events.map(event=>element('li',{},[element('strong',{},t(`status_${event.status}`)),element('span',{},dateTime(event.created_at))])));
 const messages=$('#case-message-list');messages.replaceChildren(...(data.messages.length?data.messages.map(message=>element('article',{class:`message${message.sender_id===state.user.id?' own':''}`},[element('p',{},message.body),element('small',{},`${message.sender_id===state.user.id?t('you'):message.sender_id===application.customer_id?t('customer'):t('team')} · ${dateTime(message.created_at)}`)])):[element('p',{class:'panel-empty'},t('noMessages'))]));messages.scrollTop=messages.scrollHeight;
 $('#case-document-list').replaceChildren(...(data.documents.length?data.documents.map(file=>element('div',{class:'document-row'},[icon('file'),element('div',{},[element('strong',{},file.file_name),element('small',{},`${(file.size_bytes/1024).toFixed(0)} KB · ${date(file.created_at)}`)]),element('button',{class:'inline-button',type:'button','data-document':file.id},t('openFile'))])):[element('p',{class:'panel-empty'},t('noDocuments'))]));
 $('#case-note-list').replaceChildren(...(staff()&&data.notes.length?data.notes.map(note=>element('article',{class:'message'},[element('p',{},note.body),element('small',{},`${note.staff_id===state.user.id?t('you'):t('staff')} · ${dateTime(note.created_at)}`)])):[element('p',{class:'panel-empty'},t('noNotes'))]));
}
function showTab(tab){if(tab==='notes'&&!staff())return;state.tab=tab;$$('[data-tab]').forEach(button=>{const selected=button.dataset.tab===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;$(`#case-${button.dataset.tab}`).hidden=!selected})}
$$('[data-tab]').forEach(button=>{button.addEventListener('click',()=>showTab(button.dataset.tab));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tabs=$$('[data-tab]').filter(tab=>!tab.hidden),index=tabs.indexOf(button);const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;showTab(tabs[next].dataset.tab);tabs[next].focus()})});
$('#edit-application').addEventListener('click',()=>{if(state.currentCase)openRequest(state.currentCase)});
$('#cancel-application').addEventListener('click',async()=>{const application=state.currentCase;if(!application||!EDITABLE_STATUSES.includes(application.status)||!window.confirm(t('cancelConfirm')))return;try{unwrap(await db.from('gary_applications').update({status:'cancelled'}).eq('id',application.id).select().single());await refreshCase(application.id);await refreshApplications();toast('applicationCancelled')}catch(error){feedback('#case-feedback',errorKey(error),true)}});
$('#staff-status-form').addEventListener('submit',async event=>{event.preventDefault();if(!staff()||!state.currentCase)return;const id=state.currentCase.id;await busy(event.currentTarget,async()=>{try{unwrap(await db.from('gary_applications').update({status:$('#staff-status').value}).eq('id',id).select().single());await refreshCase(id);await refreshApplications();feedback('#case-feedback','statusSaved')}catch(error){feedback('#case-feedback',errorKey(error),true)}})});
$('#assign-to-me').addEventListener('click',async()=>{if(!staff()||!state.currentCase)return;try{const id=state.currentCase.id;unwrap(await db.from('gary_applications').update({assigned_staff_id:state.user.id}).eq('id',id).select().single());await refreshCase(id);feedback('#case-feedback','assignmentSaved')}catch(error){feedback('#case-feedback',errorKey(error),true)}});

for(const [selector,table,success,field]of [['#message-form','gary_messages','messageSent','#message-body'],['#note-form','gary_staff_notes','noteAdded','#note-body']])$(selector).addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity()||!state.currentCase||table==='gary_staff_notes'&&!staff())return;const id=state.currentCase.id,body=$(field).value.trim();if(!body)return;feedback('#case-feedback','');await busy(form,async()=>{try{unwrap(await db.from(table).insert({application_id:id,body}).select('id').single());form.reset();await refreshCase(id);feedback('#case-feedback',success)}catch(error){feedback('#case-feedback',errorKey(error),true)}})});
$('#refresh-messages').addEventListener('click',async()=>{try{await refreshCase()}catch(error){feedback('#case-feedback',errorKey(error),true)}});
$('#document-form').addEventListener('submit',async event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity()||!state.currentCase)return;const file=$('#document-file').files[0],id=state.currentCase.id;feedback('#case-feedback','');
 await busy(form,async()=>{try{validateDocument(file);const path=documentPath(id,state.user.id,file);unwrap(await db.storage.from(config.documentBucket).upload(path,file,{upsert:false,contentType:file.type,cacheControl:'0'}));const result=await db.from('gary_documents').insert({application_id:id,object_path:path,file_name:file.name.slice(0,200),mime_type:file.type,size_bytes:file.size}).select('id').single();if(result.error){await db.storage.from(config.documentBucket).remove([path]);throw result.error}form.reset();await refreshCase(id);feedback('#case-feedback','documentUploaded')}catch(error){feedback('#case-feedback',errorKey(error),true)}});
});
$('#case-document-list').addEventListener('click',async event=>{const button=event.target.closest('[data-document]');if(!button)return;const file=state.caseData?.documents.find(item=>item.id===button.dataset.document);if(!file)return;const popup=window.open('about:blank','_blank');if(popup)popup.opener=null;try{const data=unwrap(await db.storage.from(config.documentBucket).createSignedUrl(file.object_path,60));const url=new URL(data.signedUrl);if(url.origin!==new URL(config.supabaseUrl).origin)throw new Error('documentUnavailable');if(popup)popup.location.replace(url.href);else{$('#case-feedback').replaceChildren(element('a',{href:url.href,target:'_blank',rel:'noopener noreferrer'},t('openFile')))}}catch{popup?.close();feedback('#case-feedback','documentUnavailable',true)}});

translate();
db.auth.onAuthStateChange((event,session)=>{
 if(event==='SIGNED_OUT'){resetWorkspace();return}
 if(event==='PASSWORD_RECOVERY'){state.recovery=true;state.user=session?.user??null;state.mode='recovery';setScreen('auth-screen');renderAuth();return}
 if(event==='SIGNED_IN'&&session&&!state.recovery&&!state.profile)queueMicrotask(()=>loadWorkspace());
});
try{const {data,error}=await db.auth.getSession();if(error)throw error;if(data.session){state.user=data.session.user;if(state.recovery){state.mode='recovery';setScreen('auth-screen');renderAuth()}else await loadWorkspace()}else{setScreen('auth-screen');if(new URLSearchParams(location.hash.slice(1)).has('error'))feedback('#auth-notice','linkExpired',true)}}catch{setScreen('auth-screen');feedback('#auth-notice','genericError',true)}
