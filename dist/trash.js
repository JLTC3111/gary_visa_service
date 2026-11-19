import {workspaceUI} from './workspace-ui.js';

export function createTrash({db,doc,t,isStaff,kinds=()=>['case','contact','cms'],notify=()=>{}}){
 const {$,el,button,date,take}=workspaceUI(doc,t);
 const state={rows:[],total:0,page:0,busy:false,failed:false,generation:0,request:0};
 const kindLabel=kind=>t(kind==='case'?'trashCases':kind==='contact'?'trashContacts':'trashContent');
 function notice(key,error=false){const node=$('#trash-notice');node.textContent=key?t(key):'';node.classList.toggle('error',error)}
 function filterKinds(){const filter=$('#trash-kind-filter'),allowed=kinds();for(const option of filter.options){const hidden=Boolean(option.value)&&!allowed.includes(option.value);option.hidden=hidden;option.disabled=hidden}if(filter.value&&!allowed.includes(filter.value))filter.value='';return filter.value||null}
 function render(){
  if(!isStaff())return;filterKinds();
  const list=$('#trash-list');list.setAttribute('aria-busy',String(state.busy));
  $('#trash-kind-filter').disabled=state.busy;$('#refresh-trash').disabled=state.busy;
  const end=Math.min(state.total,(state.page+1)*20);
  $('#trash-page-summary').textContent=`${state.total?state.page*20+1:0}–${end} ${t('of')} ${state.total}`;
  $('#trash-previous').disabled=state.busy||state.page===0;$('#trash-next').disabled=state.busy||end>=state.total;
  if(!state.rows.length){list.replaceChildren(el('div',{class:'empty-state'},[el('h3',{},t(state.busy?'trashLoading':state.failed?'trashUnavailable':'trashEmpty')),el('p',{},t(state.failed?'trashLoadError':'trashIntro'))]));return}
  list.replaceChildren(...state.rows.map(record=>{
   const restore=button(t('restoreRecord'),()=>void restoreRecord(record),'pagination-button trash-restore');restore.dataset.buttonVariant='restore';restore.disabled=state.busy;
   return el('article',{class:'trash-record'},[
    el('div',{class:'trash-record-identity'},[el('span',{class:'relationship-badge'},kindLabel(record.kind)),el('h2',{},record.title||t('unnamedCustomer')),el('p',{},`${t('deletedAt')}: ${date(record.deleted_at)}`)]),restore
   ]);
  }));
 }
 async function load(){
  if(!isStaff())return;const generation=state.generation,request=++state.request;
  state.busy=true;state.failed=false;notice('');render();
  try{
   const result=take(await db.rpc('gary_list_trash',{p_kind:filterKinds(),p_offset:state.page*20,p_limit:20}));
   if(generation!==state.generation||request!==state.request||!isStaff())return;
   if(!result||!Array.isArray(result.records))throw new Error('Invalid Trash response');
   state.rows=result.records;state.total=Number(result.total)||0;
   if(state.page&&!state.rows.length){state.page=0;return load()}
  }catch(error){if(generation===state.generation&&request===state.request){state.failed=true;notice(error?.code==='42501'?'permissionChanged':'trashLoadError',true)}}
  finally{if(generation===state.generation&&request===state.request){state.busy=false;render()}}
 }
 async function restoreRecord(record){
  if(!isStaff()||state.busy)return;const generation=state.generation;state.busy=true;notice('');render();
  try{
   take(await db.rpc('gary_restore_record',{p_kind:record.kind,p_id:record.id,p_expected_version:record.kind==='cms'?record.version:null}));
   if(generation!==state.generation||!isStaff())return;
   state.busy=false;notify('recordRestored');await load();
  }catch(error){if(generation===state.generation){notice(error?.code==='42501'?'permissionChanged':'trashRestoreError',true)}}
  finally{if(generation===state.generation){state.busy=false;render()}}
 }
 $('#trash-kind-filter').addEventListener('change',()=>{state.page=0;state.rows=[];void load()});
 $('#refresh-trash').addEventListener('click',()=>void load());
 $('#trash-previous').addEventListener('click',()=>{if(!state.busy&&state.page){state.page--;void load()}});
 $('#trash-next').addEventListener('click',()=>{if(!state.busy&&(state.page+1)*20<state.total){state.page++;void load()}});
 function reset(){state.generation++;state.request++;Object.assign(state,{rows:[],total:0,page:0,busy:false,failed:false});$('#trash-list').replaceChildren();$('#trash-list').removeAttribute('aria-busy');$('#trash-kind-filter').value='';$('#trash-kind-filter').disabled=false;$('#refresh-trash').disabled=false;$('#trash-page-summary').textContent='';$('#trash-previous').disabled=true;$('#trash-next').disabled=true;notice('')}
 return {enter:load,render,reset};
}
