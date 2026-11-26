import {workspaceUI} from './workspace-ui.js';
import {isConflictResponse} from './conflict-response.js';

const pageSize=20;
const categories={case:'trashCases',article:'trashArticles',contact:'trashContacts',cms:'trashContent'};
const cmsStatuses=['draft','review','published','archived'];
const statuses={
 case:['submitted','in_review','documents_needed','processing','completed','cancelled'],
 contact:['lead','contacted','qualified','customer','archived'],
 article:cmsStatuses,cms:cmsStatuses
};
const purgeMessages={
 AGENCY_PURGE_POLICY_MISSING:'trashPolicyMissing',
 AGENCY_PURGE_RETENTION_ACTIVE:'trashRetentionActive',
 AGENCY_PURGE_HOLD:'trashRetentionHold',
 AGENCY_PURGE_DEPENDENCY:'trashDependency',
 AGENCY_PURGE_STORAGE_SETUP:'trashStorageSetup',
 AGENCY_PURGE_STORAGE_PENDING:'trashStoragePending',
 AGENCY_PURGE_IN_PROGRESS:'trashPurgeStarted',
 AGENCY_TRASH_CHANGED:'trashChanged'
};

export function createTrash({db,doc,t,isStaff,isOwner=()=>false,kinds=()=>['case','article','contact','cms'],notify=()=>{}}){
 const {$,el,button,date,take}=workspaceUI(doc,t);
 const tabs=[...$('#trash-tabs').querySelectorAll('[role=tab]')];
 const state={category:'',search:'',status:'',rows:[],total:0,page:0,busy:false,failed:false,generation:0,request:0};

 function notice(key,error=false){
  const node=$('#trash-notice');
  node.textContent=key?t(key):'';
  node.setAttribute('role',error?'alert':'status');
  node.classList.toggle('error',error);
 }
 const errorKey=(error,fallback)=>error?.code==='42501'?'permissionChanged':
  purgeMessages[error?.message]||(isConflictResponse(error)?'trashChanged':fallback);
 const statusLabel=(category,status)=>t(!status?'none':(category==='case'?'status_':category==='contact'?'stage_':'trashStatus_')+status);

 function renderFilters(){
  const allowed=kinds();
  if(state.category&&!allowed.includes(state.category)){state.category='';state.status='';}
  $('#trash-tabs').setAttribute('aria-label',t('trashKind'));
  for(const tab of tabs){
   const category=tab.dataset.trashCategory,selected=category===state.category;
   tab.hidden=Boolean(category)&&!allowed.includes(category);
   tab.setAttribute('aria-disabled',String(state.busy));
   tab.tabIndex=selected?0:-1;
   tab.setAttribute('aria-selected',String(selected));
   if(selected)$('#trash-results').setAttribute('aria-labelledby',tab.id);
  }
  const filter=$('#trash-status-filter'),options=statuses[state.category];
  $('#trash-status-field').hidden=!options;
  filter.replaceChildren(el('option',{value:''},t('trashAllStatuses')),...(options||[]).map(key=>el('option',{value:key},statusLabel(state.category,key))));
  filter.value=state.status;
  for(const control of $('#trash-search-form').elements)control.disabled=state.busy;
  $('#refresh-trash').disabled=state.busy;
 }

 function renderRecord(record){
  const category=record.category,canPurge=category==='case'||category==='article';
  const blocker=record.purge_blocker?(purgeMessages[record.purge_blocker]||'trashPermanentUnavailable'):'';
  const hint=blocker||(record.purge_started?'trashPurgeStarted':'');
  const hintId='trash-purge-reason-'+category+'-'+record.id;
  const restore=button(t('restoreRecord'),()=>void restoreRecord(record),'pagination-button trash-restore');
  restore.dataset.buttonVariant='restore';
  restore.disabled=state.busy||record.purge_started;
  const actions=el('div',{class:'trash-record-actions'},restore);
  if(canPurge){
   const remove=button(t(record.purge_started?'trashRetryPermanent':'trashPermanentAction'),()=>void purgeRecord(record),'pagination-button trash-permanent');
   remove.dataset.buttonVariant='danger';
   remove.disabled=state.busy||Boolean(record.purge_blocker);
   if(blocker){
    remove.setAttribute('aria-describedby',hintId);
    actions.append(el('span',{tabindex:'0',title:t(blocker),'aria-describedby':hintId},remove));
   }else actions.append(remove);
  }
  const title=doc.documentElement.lang==='vi'?(record.title_vi||record.title_en):(record.title_en||record.title_vi);
  const actor=record.deleted_by_name||(record.deleted_by?record.deleted_by.slice(0,8).toUpperCase():t('trashUnknownActor'));
  const details=[
   ['deletedAt',date(record.deleted_at)],['trashDeletedBy',actor],['trashPreviousStatus',statusLabel(category,record.previous_status)]
  ];
  return el('article',{class:'trash-record'},[
   el('div',{class:'trash-record-identity'},[
    el('span',{class:'relationship-badge'},t(categories[category])),
    el('h2',{},title||t('unnamedCustomer')),
    el('dl',{class:'trash-record-details'},details.map(([key,value])=>el('div',{},[el('dt',{},t(key)),el('dd',{},value)]))),
    hint?el('p',{id:hintId,class:'trash-record-hint'},t(hint)):null
   ]),actions
  ]);
 }

 function policyForm(category){
  const field=el('input',{type:'number',min:'0',step:'1',required:'',name:'retentionDays'});
  const submit=el('button',{type:'submit',class:'pagination-button'},t('trashPolicySave'));
  field.disabled=submit.disabled=state.busy;
  const form=el('form',{class:'trash-record trash-policy-form'},[
   el('label',{},[t('trashPolicyDays')+' · '+t(categories[category]),field]),submit
  ]);
  form.addEventListener('submit',async event=>{
   event.preventDefault();
   const days=field.valueAsNumber;
   if(state.busy||!isStaff()||!isOwner()||!kinds().includes(category)||!Number.isInteger(days)||days<0||days>2147483647)return;
   if(!doc.defaultView.confirm(t('trashPolicyConfirm')))return;
   const generation=state.generation,current=()=>generation===state.generation&&isStaff()&&isOwner();
   state.busy=true;field.disabled=submit.disabled=true;notice('');
   try{
    take(await db.rpc('gary_set_trash_retention',{p_kind:category,p_minimum_days:days}));
    if(current()){notify('trashPolicySaved');await load();}
   }catch(error){if(current())notice(errorKey(error,'trashPolicyError'),true);}
   finally {if(current()){state.busy=false;field.disabled=submit.disabled=false;}}
  });
  return form;
 }

 function render(){
  if(!isStaff())return;
  renderFilters();
  const list=$('#trash-list');
  list.setAttribute('aria-busy',String(state.busy));
  const end=Math.min(state.total,(state.page+1)*pageSize);
  $('#trash-page-summary').textContent=(state.total?state.page*pageSize+1:0)+'–'+end+' '+t('of')+' '+state.total;
  $('#trash-previous').disabled=state.busy||state.page===0;
  $('#trash-next').disabled=state.busy||end>=state.total;
  if(state.rows.length){
   const missing=isOwner()?new Set(state.rows.filter(row=>row.purge_blocker==='AGENCY_PURGE_POLICY_MISSING'
    &&['case','article'].includes(row.category)&&kinds().includes(row.category)).map(row=>row.category)):new Set();
   list.replaceChildren(...[...missing].map(policyForm),...state.rows.map(renderRecord));return;
  }
  const heading=state.busy?'trashLoading':state.failed?'trashUnavailable':state.search||state.status?'trashNoMatches':'trashEmpty';
  list.replaceChildren(el('div',{class:'empty-state'},[el('h3',{},t(heading)),el('p',{},t(state.failed?'trashLoadError':'trashIntro'))]));
 }

 async function load(){
  if(!isStaff())return;
  const generation=state.generation,request=++state.request;
  const current=()=>generation===state.generation&&request===state.request&&isStaff();
  state.busy=true;state.failed=false;notice('');render();
  try{
   const result=take(await db.rpc('gary_trash_directory',{
    p_category:state.category||null,p_search:state.search,p_status:state.status,p_offset:state.page*pageSize,p_limit:pageSize
   }));
   if(!current())return;
   if(!Array.isArray(result?.records))throw new Error('Invalid Trash response');
   state.rows=result.records;state.total=Number(result.total)||0;
   if(state.page&&!state.rows.length){state.page=0;return load();}
  }catch(error){
   if(current()){state.failed=true;notice(errorKey(error,'trashLoadError'),true);}
  }finally{
   if(current()){state.busy=false;render();}
  }
 }

 async function mutateRecord(record,action,key,failure){
  if(!isStaff()||state.busy)return;
  const generation=state.generation,current=()=>generation===state.generation&&isStaff();
  state.busy=true;notice('');render();
  try{
   if(!await action(current)||!current())return;
   state.rows=state.rows.filter(row=>row.id!==record.id||row.kind!==record.kind);
   state.total=Math.max(0,state.total-1);
   notify(key);
   await load();
   if(current()&&doc.activeElement===doc.body)$('#trash-results').focus();
  }catch(error){
   if(current())notice(errorKey(error,failure),true);
  }finally{
   if(current()){state.busy=false;render();}
  }
 }

 function restoreRecord(record){
  if(record.purge_started||!kinds().includes(record.category))return;
  return mutateRecord(record,async()=>{
   const restored=take(await db.rpc('gary_restore_record',{
    p_kind:record.kind,p_id:record.id,p_expected_version:record.kind==='cms'?record.version:null
   }));
   if(restored?.id!==record.id||restored.deleted_at!==null)throw new Error('Unconfirmed restore');
   return true;
  },'recordRestored','trashRestoreError');
 }

 function purgeRecord(record){
  if(state.busy||!isStaff()||record.purge_blocker||!kinds().includes(record.category))return;
  const isCase=record.category==='case';
  if(!isCase&&record.category!=='article')return;
  if(!doc.defaultView.confirm(t(isCase?'trashConfirmCase':'trashConfirmArticle')))return;
  return mutateRecord(record,async current=>{
   const attempted=new Set();
   while(current()){
    const result=take(await db.rpc('gary_permanently_delete_trash',{
     p_kind:record.category,p_id:record.id,p_deleted_at:record.deleted_at,p_confirmed:true
    }));
    if(!current())return false;
    if(result?.id!==record.id)throw new Error('Unconfirmed permanent deletion');
    if(result.deleted===true)return true;
    if(!isCase||result.deleted!==false||!Array.isArray(result.paths)||!result.paths.length)throw new Error('Invalid Storage purge response');
    record.purge_started=true;
    if(result.paths.some(path=>typeof path!=='string'||!path.startsWith(record.id+'/')||attempted.has(path)))throw new Error('AGENCY_PURGE_STORAGE_PENDING');
    result.paths.forEach(path=>attempted.add(path));
    try{take(await db.storage.from('gary-documents').remove(result.paths));}
    catch{throw new Error('AGENCY_PURGE_STORAGE_PENDING');}
   }
   return false;
  },'recordPermanentlyDeleted','trashPermanentError');
 }

 function restartSearch(){
  state.page=0;state.rows=[];state.total=0;void load();
 }
 function selectTab(tab){
  if(!isStaff()||state.busy||tab.hidden||tab.dataset.trashCategory===state.category)return;
  state.category=tab.dataset.trashCategory;state.status='';restartSearch();
 }
 for(const tab of tabs)tab.addEventListener('click',()=>selectTab(tab));
 $('#trash-tabs').addEventListener('keydown',event=>{
  if(state.busy||!tabs.includes(event.target)||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  const visible=tabs.filter(tab=>!tab.hidden),index=visible.indexOf(event.target);
  const next=event.key==='Home'?0:event.key==='End'?visible.length-1:(index+(event.key==='ArrowRight'?1:-1)+visible.length)%visible.length;
  event.preventDefault();visible[next].focus();selectTab(visible[next]);
 });
 $('#trash-search-form').addEventListener('submit',event=>{
  event.preventDefault();
  if(!isStaff()||state.busy)return;
  state.search=$('#trash-search').value.trim();state.status=$('#trash-status-filter').value;
  restartSearch();
 });
 $('#trash-status-filter').addEventListener('change',()=>{
  if(!isStaff()||state.busy)return;
  state.status=$('#trash-status-filter').value;restartSearch();
 });
 $('#refresh-trash').addEventListener('click',()=>void load());
 $('#trash-previous').addEventListener('click',()=>{if(!state.busy&&state.page){state.page--;void load();}});
 $('#trash-next').addEventListener('click',()=>{if(!state.busy&&(state.page+1)*pageSize<state.total){state.page++;void load();}});
 function reset(){
  state.generation++;state.request++;
  Object.assign(state,{category:'',search:'',status:'',rows:[],total:0,page:0,busy:false,failed:false});
  $('#trash-list').replaceChildren();$('#trash-list').removeAttribute('aria-busy');
  $('#trash-search-form').reset();renderFilters();
  $('#trash-page-summary').textContent='';$('#trash-previous').disabled=true;$('#trash-next').disabled=true;
  notice('');
 }
 return {enter:()=>state.busy?undefined:load(),render,reset};
}
