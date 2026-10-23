import {workspaceUI} from './workspace-ui.js';
import {mergeMessages,chatErrorKey} from './chat-data.js';
import {createLiveRoom,createSupportWatch,liveTimeLeft,isChatSetupError} from './live-chat.js';

export function createInbox({db,doc,t,isStaff,getUser,getRoster,openContact}){
 const {$,el,button,notice,date,run,staffOptions,take}=workspaceUI(doc,t),win=doc.defaultView;
 const s={rows:[],total:0,page:0,current:null,messages:[],more:false,roster:[],active:false,generation:0,request:0,openRequest:0,threadRequest:0,channel:null,drafts:new Map(),pending:new Map(),sending:false,rendered:'',available:false,wantsOnline:false,availabilityBusy:false,globalConnected:false,connectionStatus:'CONNECTING',connectionError:null,live:null,visitorUntil:0,typingUntil:0};
 let pollTimer,searchTimer,refreshTimer,typingTimer,visitorTimer,room,watch,feedbackKey='',availabilityQueue=Promise.resolve();
 const feedback=(key,error=false)=>{feedbackKey=key;notice('#inbox-feedback',key,error)};
 function rememberDraft(){if(s.current)s.drafts.set(s.current.id,$('#inbox-reply').value)}
 function renderQueue(){
  if(!isStaff())return;
  $('#inbox-list').replaceChildren(...(s.rows.length?s.rows.map(chat=>{const unread=chat.last_customer_message_at&&(!chat.staff_last_read_at||new Date(chat.last_customer_message_at)>new Date(chat.staff_last_read_at));const row=button('',()=>open(chat.id),`inbox-row${s.current?.id===chat.id?' selected':''}${unread?' unread':''}`);row.setAttribute('aria-pressed',String(s.current?.id===chat.id));row.append(el('span',{class:'inbox-row-heading'},[el('strong',{},chat.visitor_name),el('time',{datetime:chat.last_message_at},date(chat.last_message_at,false))]),el('span',{class:'inbox-preview'},chat.last_message_preview),el('span',{class:'inbox-row-meta'},[el('span',{},t(chat.customer_id?'chatCustomer':'chatGuest')),...(unread?[el('span',{class:'unread-marker'},t('chatUnread'))]:[])]));return row}):[el('div',{class:'empty-state inbox-empty'},[el('h3',{},t('chatEmpty')),el('p',{},t('chatEmptyIntro'))])]));
  const end=Math.min(s.total,(s.page+1)*20);$('#inbox-page-summary').textContent=`${s.total?s.page*20+1:0}–${end} ${t('of')} ${s.total}`;$('#inbox-previous').disabled=!s.page;$('#inbox-next').disabled=end>=s.total;
 }
 async function loadQueue(){
  if(!isStaff()||!s.active)return;const generation=s.generation,request=++s.request;
  let query=db.from('gary_chat_conversations').select('*',{count:'exact'}).order('last_message_at',{ascending:false}).order('id',{ascending:false});const status=$('#inbox-status').value,search=$('#inbox-search').value.trim();if(status)query=query.eq('status',status);if(search)query=query.ilike('visitor_name',`%${search.replace(/[\\%_]/g,'\\$&')}%`);
  const result=await query.range(s.page*20,s.page*20+19);take(result);if(generation!==s.generation||request!==s.request||!isStaff()||!s.active)return;
  s.rows=result.data||[];s.total=result.count??0;const current=s.rows.find(row=>row.id===s.current?.id);if(current)s.current=current;if(s.page&&!s.rows.length){s.page=0;return loadQueue()}notice('#inbox-notice','');renderQueue();
 }
 function renderThread({scroll=false,prepend=false}={}){
  if(!isStaff()||!s.current)return;const chat=s.current,list=$('#inbox-messages'),height=list.scrollHeight,top=list.scrollTop,nearBottom=height-top-list.clientHeight<100;
  $('#inbox-placeholder').hidden=true;$('#inbox-conversation').hidden=false;$('#inbox-name').textContent=chat.visitor_name;$('#inbox-identity').textContent=t(chat.customer_id?'chatCustomer':'chatGuest');$('#inbox-email').textContent=chat.visitor_email||t('emailNotProvided');$('#inbox-resolve').textContent=t(chat.status==='resolved'?'chatReopen':'chatResolve');staffOptions($('#inbox-assignee'),s.roster,chat.assigned_staff_id);
  const fingerprint=doc.documentElement.lang+s.messages.map(message=>message.id).join(',')+(s.live?.visitor_read_at||'');
  if(s.rendered!==fingerprint){list.replaceChildren(...s.messages.map(message=>el('article',{class:`message${message.sender_type==='staff'?' own':''}`,'data-message-id':message.id},[el('p',{},message.body),el('small',{},`${t(message.sender_type==='staff'?'chatTeam':message.sender_type==='customer'?'customer':'chatVisitor')} · ${date(message.created_at)}${message.sender_type==='staff'?' · '+t(s.live?.visitor_read_at&&new Date(s.live.visitor_read_at)>=new Date(message.created_at)?'chatSeen':'chatSent'):''}`)])));s.rendered=fingerprint}
  renderPeer();$('#inbox-older').hidden=!s.more;if(prepend)list.scrollTop=top+(list.scrollHeight-height);else if(scroll||nearBottom)list.scrollTop=list.scrollHeight;else list.scrollTop=top;
 }
 async function read({older=false,scroll=false}={}){
  const id=s.current?.id,generation=s.generation;if(!id||!isStaff()||!s.active)return;const request=++s.threadRequest;
  const oldest=older?s.messages[0]:null;const args={p_conversation_id:id,p_mark_read:!doc.hidden};if(oldest){args.p_before_at=oldest.created_at;args.p_before_id=oldest.id;args.p_mark_read=false}
  const data=take(await db.rpc('gary_read_chat',args));
  if(generation!==s.generation||request!==s.threadRequest||s.current?.id!==id||!isStaff()||!s.active)return;
  const incoming=data.messages||[],previous=s.messages.length;
  if(!older&&s.messages.length&&incoming.length===50&&!incoming.some(message=>s.messages.some(old=>old.id===message.id))){s.messages=[];s.more=data.has_more}
  s.messages=mergeMessages(s.messages,incoming);if(older||!previous)s.more=!!data.has_more;
  s.current.status=data.conversation.status;applyLive(data.live);if(!feedbackKey||['chatRefreshError','chatOlderError'].includes(feedbackKey))feedback('');renderThread({scroll,prepend:older});
 }
 async function open(id){
  if(!isStaff())return;rememberDraft();const generation=s.generation,request=++s.openRequest;s.threadRequest++;feedback('');
  try{const chat=take(await db.from('gary_chat_conversations').select('*').eq('id',id).single());if(generation!==s.generation||request!==s.openRequest||!isStaff()||!s.active)return;
   room?.close();s.current=chat;s.messages=[];s.more=false;s.live=null;s.visitorUntil=0;s.typingUntil=0;room=createLiveRoom({client:db,doc,id,staff:true,onChange:()=>read()});$('#inbox-reply').value=s.drafts.get(id)||'';renderQueue();renderThread({scroll:true});await read({scroll:true});await loadQueue();
  }catch(error){if(generation===s.generation)feedback(isChatSetupError(error)?'liveSetupRequired':'chatUnavailable',true)}
 }
 async function refresh(){if(!isStaff()||!s.active||doc.hidden)return;await Promise.all([loadQueue().catch(()=>notice('#inbox-notice','chatLoadError',true)),s.current?read().catch(()=>feedback('chatRefreshError',true)):Promise.resolve()])}
 function renderAvailability(){
  const connecting=!s.globalConnected&&s.connectionStatus==='CONNECTING',failed=!s.globalConnected&&!connecting;
  $('#staff-live-label').textContent=t(!s.globalConnected?s.wantsOnline?'liveReconnecting':connecting?'liveConnecting':'liveDisconnected':s.available?'staffOnline':'staffAway');$('#staff-live-dot').classList.toggle('online',s.available&&s.globalConnected);$('#staff-live-toggle').textContent=t(s.wantsOnline?'goAway':'goOnline');$('#staff-live-toggle').setAttribute('aria-pressed',String(s.wantsOnline));$('#staff-live-toggle').disabled=s.availabilityBusy;
  const reason=String(s.connectionError?.message||'');let key='liveConnectionError';if(/PrivateOnly|public.*(?:disabled|not allowed)/i.test(reason))key='livePublicAccessRequired';else if(/RealtimeDisabledForTenant|Realtime was disabled/i.test(reason))key='liveServiceDisabled';else if(/jwt|token.*(?:expired|invalid)/i.test(reason))key='liveSessionError';
  $('#staff-live-connection').hidden=s.globalConnected||!s.active;$('#staff-live-connection-message').textContent=t(connecting?s.wantsOnline?'liveWaiting':'liveConnecting':key);$('#staff-live-retry').hidden=!failed;
  const detail=[s.connectionStatus,reason].filter(Boolean).join(': ').replace(/sb_(?:publishable|secret)_[A-Za-z0-9_-]+/g,'[redacted]').replace(/\beyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,'[redacted]').slice(0,600);
  $('#staff-live-error').textContent=failed?detail:'';$('#staff-live-details').hidden=!failed;
 }
 function renderPeer(){
  $('#inbox-visitor-status').textContent=t(s.visitorUntil>Date.now()?'visitorOnline':'visitorAway');$('#inbox-typing').hidden=s.typingUntil<=Date.now();$('#inbox-typing').textContent=t('visitorTyping');
 }
 function applyLive(live){if(!live)return;s.live=live;s.visitorUntil=Date.now()+liveTimeLeft(live.visitor_seen_at?new Date(new Date(live.visitor_seen_at).getTime()+45000).toISOString():null,live.server_time);s.typingUntil=Date.now()+liveTimeLeft(live.visitor_typing_until,live.server_time);win.clearTimeout(typingTimer);win.clearTimeout(visitorTimer);typingTimer=win.setTimeout(renderPeer,Math.max(0,s.typingUntil-Date.now())+40);visitorTimer=win.setTimeout(renderPeer,Math.max(0,s.visitorUntil-Date.now())+40);renderPeer()}
 function pulse(available){
  const generation=s.generation;
  const pending=availabilityQueue.then(async()=>{
   if(generation!==s.generation||!isStaff())return;if(available&&(!s.wantsOnline||!s.active||!s.globalConnected))return;
   try{take(await db.rpc('gary_set_chat_availability',{p_available:available}));if(generation!==s.generation)return;s.available=available&&s.wantsOnline&&s.active;renderAvailability()}
   catch(error){if(generation!==s.generation)return;s.available=false;s.wantsOnline=false;renderAvailability();notice('#inbox-notice',isChatSetupError(error)?'liveSetupRequired':'liveAvailabilityError',true)}
  });
  availabilityQueue=pending.catch(()=>{});return pending;
 }
 function subscribe(){
  const schedule=()=>{win.clearTimeout(refreshTimer);refreshTimer=win.setTimeout(()=>loadQueue().catch(()=>notice('#inbox-notice','chatLoadError',true)),60)};
  s.connectionStatus='CONNECTING';s.connectionError=null;renderAvailability();
  watch=createSupportWatch({client:db,doc,onHealth:()=>{},onQueue:schedule,onConnection:(connected,{status,error}={})=>{s.globalConnected=connected;s.connectionStatus=status||'CHANNEL_ERROR';s.connectionError=error||null;renderAvailability();if(s.wantsOnline){if(connected)pulse(true);else if(s.available)pulse(false)}}});
  watch.refresh().catch(error=>notice('#inbox-notice',isChatSetupError(error)?'liveSetupRequired':'chatLoadError',true));
 }
 async function enter(id=null){
  if(!isStaff())return;if(!s.active){s.active=true;subscribe();pollTimer=win.setInterval(()=>{if(!s.globalConnected)refresh();if(s.wantsOnline)pulse(true)},20000)}const generation=s.generation;
  try{s.roster=await getRoster();if(generation!==s.generation||!s.active)return;await loadQueue();if(id)await open(id);else if(s.current)await read();render()}catch{if(generation===s.generation)notice('#inbox-notice','chatLoadError',true)}
 }
 function leave(){rememberDraft();if(s.available)pulse(false);s.wantsOnline=false;s.available=false;s.globalConnected=false;s.active=false;s.request++;s.threadRequest++;s.openRequest++;win.clearInterval(pollTimer);win.clearTimeout(refreshTimer);win.clearTimeout(typingTimer);win.clearTimeout(visitorTimer);room?.close();room=null;watch?.close();watch=null;renderAvailability()}
 function render(){renderAvailability();renderQueue();if(s.current)renderThread()}
 $('#inbox-reply-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget,id=s.current?.id,body=$('#inbox-reply').value.trim(),generation=s.generation;if(!isStaff()||!id||!body||!form.reportValidity()||s.sending)return;
  let pending=s.pending.get(id);if(!pending||pending.body!==body){pending={body,id:win.crypto.randomUUID()};s.pending.set(id,pending)}s.sending=true;room?.stopTyping();feedback('');
  await run(form,async()=>{try{take(await db.rpc('gary_send_chat_message',{p_conversation_id:id,p_body:body,p_client_message_id:pending.id}));if(generation!==s.generation||!isStaff())return;s.pending.delete(id);if((s.drafts.get(id)||'').trim()===body)s.drafts.delete(id);if(s.current?.id===id){if($('#inbox-reply').value.trim()===body)$('#inbox-reply').value='';await read({scroll:true}).catch(()=>feedback('chatRefreshError',true))}await loadQueue().catch(()=>notice('#inbox-notice','chatLoadError',true))}catch(error){if(generation===s.generation&&s.current?.id===id)feedback(chatErrorKey(error),true)}finally{s.sending=false}});
 });
 $('#inbox-reply').addEventListener('input',()=>{rememberDraft();room?.typing(!!$('#inbox-reply').value.trim())});$('#inbox-reply').addEventListener('blur',()=>room?.stopTyping());
 $('#inbox-reply').addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();if(!s.sending)$('#inbox-reply-form').requestSubmit()}});
 $('#staff-live-toggle').addEventListener('click',async()=>{if(!isStaff()||!s.active||s.availabilityBusy)return;s.wantsOnline=!s.wantsOnline;s.availabilityBusy=true;renderAvailability();try{if(s.wantsOnline&&!s.globalConnected)watch?.retry();await pulse(s.wantsOnline)}finally{s.availabilityBusy=false;renderAvailability()}});
 $('#staff-live-retry').addEventListener('click',()=>watch?.retry());
 async function update(values){const id=s.current?.id,generation=s.generation;if(!isStaff()||!id)return;try{const chat=take(await db.from('gary_chat_conversations').update(values).eq('id',id).select().single());if(generation!==s.generation||s.current?.id!==id||!isStaff())return;s.current=chat;renderThread();feedback('chatStatusSaved');await loadQueue()}catch{if(generation===s.generation)feedback('genericError',true)}}
 $('#inbox-resolve').addEventListener('click',()=>{if(s.current)update({status:s.current.status==='open'?'resolved':'open'})});
 $('#inbox-assignee').addEventListener('change',async()=>{const select=$('#inbox-assignee');select.disabled=true;try{await update({assigned_staff_id:select.value||null})}finally{select.disabled=false}});
 $('#inbox-contact').addEventListener('click',()=>{if(s.current)openContact(s.current.contact_id)});
 $('#inbox-older').addEventListener('click',async()=>{const button=$('#inbox-older');button.disabled=true;try{await read({older:true})}catch{feedback('chatOlderError',true)}finally{button.disabled=false}});
 $('#refresh-inbox').addEventListener('click',refresh);$('#inbox-status').addEventListener('change',()=>{s.page=0;loadQueue().catch(()=>notice('#inbox-notice','chatLoadError',true))});
 $('#inbox-search').addEventListener('input',()=>{win.clearTimeout(searchTimer);searchTimer=win.setTimeout(()=>{s.page=0;loadQueue().catch(()=>notice('#inbox-notice','chatLoadError',true))},250)});
 $('#inbox-previous').addEventListener('click',()=>{if(s.page){s.page--;loadQueue().catch(()=>notice('#inbox-notice','chatLoadError',true))}});$('#inbox-next').addEventListener('click',()=>{if((s.page+1)*20<s.total){s.page++;loadQueue().catch(()=>notice('#inbox-notice','chatLoadError',true))}});
 doc.addEventListener('visibilitychange',()=>{if(s.active&&!doc.hidden){refresh();if(s.wantsOnline)pulse(true)}});
 win.addEventListener('pagehide',leave);
 win.addEventListener('pageshow',event=>{if(event.persisted&&!$('#inbox-view').hidden&&isStaff())enter()});
 function reset(){leave();s.generation++;s.current=null;s.rows=[];s.messages=[];s.rendered='';s.roster=[];s.page=0;s.total=0;s.more=false;s.sending=false;s.live=null;s.visitorUntil=0;s.typingUntil=0;s.drafts.clear();s.pending.clear();win.clearTimeout(searchTimer);for(const id of ['inbox-list','inbox-messages'])$(`#${id}`).replaceChildren();for(const id of ['inbox-name','inbox-identity','inbox-email','inbox-page-summary'])$(`#${id}`).textContent='';$('#inbox-reply-form').reset();$('#inbox-search').value='';$('#inbox-status').value='open';$('#inbox-assignee').replaceChildren();$('#inbox-conversation').hidden=true;$('#inbox-placeholder').hidden=false;$('#inbox-typing').hidden=true;$('#inbox-visitor-status').textContent='';feedback('');notice('#inbox-notice','')}
 return {enter,leave,render,reset,open,async goAway(){s.wantsOnline=false;await pulse(false)}};
}
