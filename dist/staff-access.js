import {workspaceUI} from './workspace-ui.js';
import {initFormControls} from './form-controls.js';

// Admin is never offered here: granting or removing it is owner-reviewed SQL.
const choices={operations:['staff','manager'],cms:['editor','publisher']};

export function createStaffAccess({db,doc,t,canManage,notify=()=>{}}){
 const {$,el,take}=workspaceUI(doc,t);
 const state={members:[],busy:'',loading:false,failed:false,generation:0,request:0};
 const roleName=(scope,role)=>t(role?`role_${scope}_${role}`:'noAccess');
 function notice(key,error=false){const node=$('#staff-access-notice');node.textContent=key?t(key):'';node.classList.toggle('error',error)}
 function field(member,scope){
  const role=member[`${scope}_role`]||'',label=t(scope==='operations'?'operationsAccess':'cmsAccess');
  if(!member[`manage_${scope}`])return el('div',{class:'staff-access-field'},[el('span',{class:'staff-access-label'},label),el('strong',{class:'staff-access-value'},roleName(scope,role)),el('small',{class:'staff-access-protected'},t(member.self?'yourAccount':'viewOnly'))]);
  const id=`staff-${scope}-${member.user_id}`,select=el('select',{id,'data-staff-scope':scope,'data-staff-user':member.user_id},[el('option',{value:''},t('noAccess')),...choices[scope].map(value=>el('option',{value},roleName(scope,value)))]);
  select.value=role;select.disabled=Boolean(state.busy);
  return el('div',{class:'staff-access-field'},[el('label',{for:id},label),select]);
 }
 function render(){
  if(!canManage())return;
  const list=$('#staff-access-list'),busy=state.loading||Boolean(state.busy);list.setAttribute('aria-busy',String(busy));$('#refresh-staff-access').disabled=busy;
  if(!state.members.length){list.replaceChildren(el('div',{class:'empty-state'},[el('h3',{},t(state.loading?'staffAccessLoading':state.failed?'staffAccessUnavailable':'staffAccessEmpty')),el('p',{},t(state.failed?'staffAccessLoadError':'staffDirectoryIntro'))]));return}
  list.replaceChildren(...state.members.map(member=>{
   const name=member.display_name||member.email||t('staffMember');
   return el('article',{class:'staff-access-member'},[
    el('span',{class:'user-avatar staff-access-avatar','aria-hidden':'true'},name.slice(0,1).toUpperCase()),
    el('div',{class:'staff-access-details'},[el('strong',{},name),member.email&&member.email!==name?el('small',{},member.email):null,member.self?el('span',{class:'relationship-badge'},t('you')):null]),
    el('div',{class:'staff-access-controls'},[field(member,'operations'),field(member,'cms')])
   ]);
  }));
  initFormControls(doc).refresh();
 }
 async function load(){
  if(!canManage())return;const generation=state.generation,request=++state.request;state.loading=true;state.failed=false;render();
  try{
   const result=take(await db.rpc('gary_staff_access_list'));
   if(generation!==state.generation||request!==state.request||!canManage())return;
   if(!Array.isArray(result?.members))throw new Error('Invalid staff list');state.members=result.members;
  }catch(error){if(generation===state.generation&&request===state.request){state.failed=true;state.members=[];notice(error?.code==='42501'?'permissionChanged':'staffAccessLoadError',true)}}
  finally{if(generation===state.generation&&request===state.request){state.loading=false;render()}}
 }
 async function change(select){
  const scope=select.dataset.staffScope,member=state.members.find(item=>item.user_id===select.dataset.staffUser);
  if(!canManage()||state.busy||state.loading||!member||!choices[scope]||!member[`manage_${scope}`])return;
  const previous=member[`${scope}_role`]||null,next=select.value||null,focus=select.id;if(previous===next)return;
  if(next&&!choices[scope].includes(next)){select.value=previous||'';return}
  if(!next&&!doc.defaultView.confirm(t('staffNoAccessConfirm'))){select.value=previous||'';return}
  const generation=state.generation;state.busy=member.user_id;notice('');render();
  try{
   take(await db.rpc(scope==='operations'?'gary_set_operations_role':'gary_set_cms_role',{p_user_id:member.user_id,p_role:next,p_expected_role:previous}));
   if(generation===state.generation)notify('staffRoleSaved');
  }catch(error){if(generation===state.generation)notice(error?.code==='40001'?'staffRoleConflict':error?.code==='42501'?'permissionChanged':'staffRoleError',true)}
  finally{if(generation===state.generation){state.busy='';await load();doc.getElementById(focus)?.focus()}}
 }
 $('#staff-access-list').addEventListener('change',event=>{const select=event.target.closest?.('select[data-staff-scope]');if(select)void change(select)});
 $('#refresh-staff-access').addEventListener('click',()=>{notice('');void load()});
 function reset(){state.generation++;state.request++;Object.assign(state,{members:[],busy:'',loading:false,failed:false});$('#staff-access-list').replaceChildren();$('#staff-access-list').removeAttribute('aria-busy');$('#refresh-staff-access').disabled=false;notice('')}
 return {enter(){notice('');return load()},render,reset};
}
