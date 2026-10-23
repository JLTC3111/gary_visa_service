import {workspaceUI} from './workspace-ui.js';

export function createCRM({db,doc,t,isStaff,getUser,getRoster,showDialog,closeDialog,notify,openApplication,openChat}){
 const {$,el,button,notice,date,run,staffOptions,take}=workspaceUI(doc,t);
 const s={rows:[],total:0,page:0,stats:null,contact:null,notes:[],events:[],applications:[],chats:[],noteLimit:20,eventLimit:20,moreNotes:false,moreEvents:false,editing:null,roster:[],generation:0,request:0,detailRequest:0,editRequest:0};
 let searchTimer;
 const badge=stage=>el('span',{class:`relationship-badge stage-${stage}`},t(`stage_${stage}`));
 const staffName=id=>s.roster.find(person=>person.user_id===id)?.display_name||t('unassigned');
 const fail=()=>notice('#crm-notice','crmLoadError',true);
 async function load(){
  if(!isStaff())return;const generation=s.generation,request=++s.request;
  notice('#crm-notice','');$('#customers-list').setAttribute('aria-busy','true');
  try{
   let query=db.from('gary_crm_contacts').select('*',{count:'exact'}).order('updated_at',{ascending:false}).order('id',{ascending:false});
   const search=$('#customer-search').value.trim(),field=$('#contact-search-by').value,stage=$('#contact-stage-filter').value,owner=$('#contact-owner-filter').value;
   if(search&&['full_name','email','phone','company'].includes(field))query=query.ilike(field,`%${search.replace(/[\\%_]/g,'\\$&')}%`);
   if(stage)query=query.eq('stage',stage);
   if(owner==='mine')query=query.eq('assigned_staff_id',getUser().id);else if(owner==='unassigned')query=query.is('assigned_staff_id',null);
   if($('#contact-due-filter').value==='due')query=query.lte('follow_up_at',new Date().toISOString()).neq('stage','archived');
   const result=await query.range(s.page*20,s.page*20+19);take(result);
   if(generation!==s.generation||request!==s.request||!isStaff())return;
   s.rows=result.data||[];s.total=result.count??0;
   if(s.page>0&&!s.rows.length){s.page=0;return load()}
   render();
  }catch{if(generation===s.generation&&request===s.request)fail()}
  finally{if(request===s.request)$('#customers-list').removeAttribute('aria-busy')}
 }
 async function stats(){
  if(!isStaff())return;const generation=s.generation;
  const base=()=>db.from('gary_crm_contacts').select('id',{count:'exact',head:true}).neq('stage','archived');
  const results=await Promise.all([base(),base().eq('stage','lead'),base().lte('follow_up_at',new Date().toISOString()),base().eq('assigned_staff_id',getUser().id)]);
  results.forEach(take);if(generation!==s.generation||!isStaff())return;s.stats=results.map(result=>result.count??0);renderStats();
 }
 function renderStats(){if(s.stats)['all','leads','due','mine'].forEach((key,i)=>{$(`#crm-stat-${key}`).textContent=String(s.stats[i])})}
 function render(){
  if(!isStaff())return;renderStats();
  $('#customers-list').replaceChildren(...(s.rows.length?s.rows.map(contact=>button('',()=>openContact(contact.id),'crm-contact-row')).map((row,i)=>{const c=s.rows[i],due=c.stage!=='archived'&&c.follow_up_at&&new Date(c.follow_up_at)<=new Date();row.append(el('span',{class:'crm-row-person'},[el('strong',{},c.full_name),el('small',{},c.email||c.phone||c.company||t(`source_${c.source}`))]),badge(c.stage),el('span',{class:'crm-row-owner'},[el('small',{},t('contactOwner')),el('span',{},c.assigned_staff_id?staffName(c.assigned_staff_id):t('unassigned'))]),el('span',{class:`crm-row-followup${due?' due':''}`},[el('small',{},due?t('overdue'):t('followUp')),el('span',{},c.follow_up_at?date(c.follow_up_at):t('none'))]));return row}):[el('div',{class:'empty-state'},[el('h3',{},t('crmEmpty')),el('p',{},t('crmEmptyIntro'))]) ]));
  const end=Math.min(s.total,(s.page+1)*20);$('#customer-page-summary').textContent=`${s.total?s.page*20+1:0}–${end} ${t('of')} ${s.total} ${t('contactsCount')}`;$('#customer-previous').disabled=!s.page;$('#customer-next').disabled=end>=s.total;
  if(s.contact&&$('#contact-dialog').open)renderDetail();
  $('#contact-edit-title').textContent=t(s.editing?'editContact':'newContact');
  const assigned=$('#contact-assignee').value;staffOptions($('#contact-assignee'),s.roster,assigned);
 }
 async function enter(){if(!isStaff())return;const generation=s.generation;await Promise.all([load(),stats().catch(fail),getRoster().then(roster=>{if(generation===s.generation){s.roster=roster;render()}}).catch(fail)])}
 async function refreshDetail(id=s.contact?.id){
  if(!id||!isStaff())return;const generation=s.generation,request=++s.detailRequest;
  const contact=take(await db.from('gary_crm_contacts').select('*').eq('id',id).single());
  const results=await Promise.all([
   db.from('gary_crm_notes').select('id,author_id,body,created_at').eq('contact_id',id).order('created_at',{ascending:false}).order('id',{ascending:false}).limit(s.noteLimit+1),
   db.from('gary_crm_events').select('id,actor_id,kind,changes,created_at').eq('contact_id',id).order('created_at',{ascending:false}).order('id',{ascending:false}).limit(s.eventLimit+1),
   contact.profile_id?db.from('gary_applications').select('id,subject,status,created_at').eq('customer_id',contact.profile_id).order('created_at',{ascending:false}).limit(20):Promise.resolve({data:[]}),
   db.from('gary_chat_conversations').select('id,subject,status,last_message_at').eq('contact_id',id).order('last_message_at',{ascending:false}).limit(20)
  ]);results.forEach(take);
  if(generation!==s.generation||request!==s.detailRequest||!isStaff())return;
  s.contact=contact;s.moreNotes=results[0].data.length>s.noteLimit;s.moreEvents=results[1].data.length>s.eventLimit;
  [s.notes,s.events,s.applications,s.chats]=results.map((result,i)=>(result.data||[]).slice(0,i===0?s.noteLimit:i===1?s.eventLimit:20));
  renderDetail();
 }
 async function openContact(id){
  if(!isStaff())return;s.contact=null;s.noteLimit=20;s.eventLimit=20;$('#contact-note-form').reset();notice('#contact-feedback','');$('#contact-title').textContent=t('contactLoading');$('#contact-identity').textContent='';$('#contact-detail-body').hidden=true;$('#edit-contact').hidden=true;showDialog($('#contact-dialog'));
  try{await refreshDetail(id)}catch{notice('#contact-feedback','detailLoadError',true)}
 }
 function renderDetail(){
  const c=s.contact;if(!c)return;$('#contact-title').textContent=c.full_name;$('#contact-identity').textContent=t(c.profile_id?'registeredCustomer':'visitorContact');$('#contact-detail-body').hidden=false;$('#edit-contact').hidden=false;
  const pair=(label,value)=>el('div',{},[el('dt',{},t(label)),el('dd',{},value)]);
  $('#contact-summary').replaceChildren(el('div',{class:'contact-summary-top'},[badge(c.stage),...c.tags.map(tag=>el('span',{class:'contact-tag'},tag))]),el('dl',{},[
   pair('email',c.email||t('none')),pair('phone',c.phone||t('none')),pair('company',c.company||t('none')),pair('contactOwner',staffName(c.assigned_staff_id)),pair('followUp',c.follow_up_at?date(c.follow_up_at):t('noFollowUp')),pair('lastContacted',c.last_contacted_at?date(c.last_contacted_at):t('noContactYet')),pair('contactService',c.interested_service?t(`service_${c.interested_service}`):t('noService')),pair('contactSource',t(`source_${c.source}`))
  ]));
  $('#contact-notes').replaceChildren(...(s.notes.length?s.notes.map(note=>el('article',{class:'message'},[el('p',{},note.body),el('small',{},`${note.author_id===getUser().id?t('you'):staffName(note.author_id)} · ${date(note.created_at)}`)])):[el('p',{class:'panel-empty'},t('noNotes'))]));
  $('#contact-events').replaceChildren(...(s.events.length?s.events.map(event=>{const change=event.kind==='stage_changed'?` · ${t(`stage_${event.changes.from}`)} → ${t(`stage_${event.changes.to}`)}`:event.kind==='follow_up_changed'?` · ${event.changes.follow_up_at?date(event.changes.follow_up_at):t('noFollowUp')}`:'';return el('li',{},[el('strong',{},t(`record_${event.kind}`)+change),el('small',{},date(event.created_at))])}):[el('li',{},t('noActivity'))]));
  $('#contact-more-notes').hidden=!s.moreNotes;$('#contact-more-events').hidden=!s.moreEvents;
  $('#contact-applications').replaceChildren(...(s.applications.length?s.applications.map(a=>button(`${a.subject} · ${t(`status_${a.status}`)}`,()=>{closeDialog($('#contact-dialog'));openApplication(a.id)},'related-record')):[el('p',{class:'workspace-hint'},t('noRelatedApplications'))]));
  $('#contact-chats').replaceChildren(...(s.chats.length?s.chats.map(chat=>button(`${t(`chat_${chat.status}`)} · ${date(chat.last_message_at)}`,()=>{closeDialog($('#contact-dialog'));openChat(chat.id)},'related-record')):[el('p',{class:'workspace-hint'},t('noRelatedChats'))]));
 }
 async function edit(contact=null){
  if(!isStaff())return;const generation=s.generation,request=++s.editRequest;s.editing=contact?.id||null;const form=$('#contact-form');form.reset();notice('#contact-edit-feedback','');const roster=await getRoster();if(generation!==s.generation||request!==s.editRequest||!isStaff())return;s.roster=roster;
  staffOptions($('#contact-assignee'),s.roster,contact?.assigned_staff_id);
  if(contact)for(const key of ['full_name','email','phone','company','stage','interested_service'])form.elements.namedItem(key).value=contact[key]||'';
  if(contact?.follow_up_at){const date=new Date(contact.follow_up_at);form.elements.follow_up_at.value=new Date(date.getTime()-date.getTimezoneOffset()*60000).toISOString().slice(0,16)}
  form.elements.tags.value=contact?.tags?.join(', ')||'';$('#contact-sync-hint').hidden=!contact?.profile_id;$('#contact-edit-title').textContent=t(contact?'editContact':'newContact');showDialog($('#contact-edit-dialog'));$('#contact-name').focus();
 }
 $('#new-contact').addEventListener('click',()=>edit().catch(fail));$('#edit-contact').addEventListener('click',()=>edit(s.contact).catch(()=>notice('#contact-feedback','detailLoadError',true)));
 $('#contact-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget;if(!isStaff()||!form.reportValidity())return;const generation=s.generation,editing=s.editing;
  const tags=[...new Set(form.elements.tags.value.split(',').map(tag=>tag.trim()).filter(Boolean))];if(tags.length>12||tags.some(tag=>tag.length>30)){notice('#contact-edit-feedback','invalidTags',true);return}
  const values={};for(const key of ['full_name','email','phone','company','stage','interested_service','assigned_staff_id'])values[key]=form.elements.namedItem(key).value.trim();if(values.full_name.length<2){$('#contact-name').focus();return}
  for(const key of ['interested_service','assigned_staff_id'])values[key]||=null;
  values.tags=tags;values.follow_up_at=form.elements.follow_up_at.value?new Date(form.elements.follow_up_at.value).toISOString():null;notice('#contact-edit-feedback','');
  await run(form,async()=>{let contact;try{contact=take(await(editing?db.from('gary_crm_contacts').update(values).eq('id',editing):db.from('gary_crm_contacts').insert(values)).select().single())}catch{if(generation===s.generation)notice('#contact-edit-feedback','genericError',true);return}
   if(generation!==s.generation||!isStaff())return;closeDialog($('#contact-edit-dialog'));notify('contactSaved');s.page=0;await enter();if(editing&&$('#contact-dialog').open){try{await refreshDetail(contact.id)}catch{notice('#contact-feedback','noteLoadError',true)}}else await openContact(contact.id);
  });
 });
 $('#contact-note-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget,id=s.contact?.id,body=$('#contact-note').value.trim(),generation=s.generation;if(!isStaff()||!id||!body||!form.reportValidity())return;
  await run(form,async()=>{try{take(await db.from('gary_crm_notes').insert({contact_id:id,body}).select('id').single())}catch{if(generation===s.generation)notice('#contact-feedback','genericError',true);return}if(generation!==s.generation||s.contact?.id!==id)return;form.reset();notice('#contact-feedback','noteAdded');try{await refreshDetail(id)}catch{notice('#contact-feedback','noteLoadError',true)}});
 });
 $('#mark-contacted').addEventListener('click',async()=>{const id=s.contact?.id,generation=s.generation;if(!isStaff()||!id)return;try{take(await db.from('gary_crm_contacts').update({last_contacted_at:new Date().toISOString()}).eq('id',id).select('id').single());if(generation!==s.generation)return;notice('#contact-feedback','contactRecorded');await refreshDetail(id);await load()}catch{if(generation===s.generation)notice('#contact-feedback','genericError',true)}});
 $('#contact-more-notes').addEventListener('click',()=>{s.noteLimit+=20;refreshDetail().catch(()=>notice('#contact-feedback','noteLoadError',true))});$('#contact-more-events').addEventListener('click',()=>{s.eventLimit+=20;refreshDetail().catch(()=>notice('#contact-feedback','noteLoadError',true))});
 const filter=()=>{s.page=0;load()};
 $('#customer-search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(filter,250)});
 for(const id of ['contact-search-by','contact-stage-filter','contact-owner-filter','contact-due-filter'])$(`#${id}`).addEventListener('change',filter);
 $('#refresh-contacts').addEventListener('click',enter);$('#customer-previous').addEventListener('click',()=>{if(s.page){s.page--;load()}});$('#customer-next').addEventListener('click',()=>{if((s.page+1)*20<s.total){s.page++;load()}});
 function reset(){s.generation++;s.request++;s.detailRequest++;s.editRequest++;clearTimeout(searchTimer);Object.assign(s,{rows:[],total:0,page:0,stats:null,contact:null,notes:[],events:[],applications:[],chats:[],roster:[],editing:null});for(const id of ['customers-list','contact-summary','contact-notes','contact-events','contact-applications','contact-chats'])$(`#${id}`).replaceChildren();$('#contact-form').reset();$('#contact-note-form').reset();$('#customer-search').value='';for(const id of ['contact-stage-filter','contact-owner-filter','contact-due-filter'])$(`#${id}`).value='';$('#contact-title').textContent='';$('#contact-identity').textContent='';['all','leads','due','mine'].forEach(key=>{$(`#crm-stat-${key}`).textContent='—'});for(const id of ['crm-notice','contact-feedback','contact-edit-feedback'])notice(`#${id}`,'')}
 return {enter,render,reset,openContact};
}
