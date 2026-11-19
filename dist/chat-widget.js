import {db,ensureProfile,unwrap} from './backend.js';
import {chatCopy} from './chat-copy.js';
import {mergeMessages} from './chat-data.js';
import {createLiveRoom,createSupportWatch,liveTimeLeft,isChatSetupError} from './live-chat.js';

export function createChatWidget({client=db,doc=document,profileFor=ensureProfile,requestTimeout=10000}={}){
 const win=doc.defaultView,$=selector=>doc.querySelector(selector),storageKey='gary-site-chat-v1';
 if(!$('#site-chat'))return null;
 const s={owner:'guest',user:null,role:null,canInbox:false,conversation:null,messages:[],more:false,record:null,pending:null,generation:0,reading:false,readAgain:false,sending:false,initialized:false,identityError:false,refreshFailed:false,restoreFailed:false,readDenied:false,notice:null,rendered:'',storageBlocked:false,setup:false,healthKnown:false,healthAt:0,online:false,supportConnected:false,roomConnected:false,live:null};
 let room,watch,availabilityTimer,typingTimer,initializing;
 const language=()=>doc.documentElement.lang==='vi'?'vi':'en',t=key=>chatCopy[language()][key]||chatCopy.en[key]||key;
 const el=(tag,attrs={},children=[])=>{const node=doc.createElement(tag);for(const [key,value]of Object.entries(attrs))node.setAttribute(key,String(value));for(const child of(Array.isArray(children)?children:[children]))node.append(typeof child==='string'?doc.createTextNode(child):child);return node};
 const opened=()=>!$('#site-chat').hidden;
 function notice(key,error=false){s.notice=key?{key,error}:null;$('#chat-notice').textContent=key?t(key):'';$('#chat-notice').classList.toggle('error',error)}
 function persist(){try{if(s.record)win.sessionStorage.setItem(storageKey,JSON.stringify(s.record));else win.sessionStorage.removeItem(storageKey)}catch{s.storageBlocked=true}}
 function token(){const bytes=new Uint8Array(32);win.crypto.getRandomValues(bytes);return [...bytes].map(n=>n.toString(16).padStart(2,'0')).join('')}
 function deadline(work){
  const controller=new win.AbortController();let timer;
  return Promise.race([Promise.resolve().then(()=>work(controller.signal)),new Promise((_,reject)=>{
   timer=win.setTimeout(()=>{reject(new Error('Chat request timed out'));controller.abort()},requestTimeout);
  })]).finally(()=>win.clearTimeout(timer));
 }
 function rpc(name,args,signal){const query=client.rpc(name,args);return typeof query.abortSignal==='function'?query.abortSignal(signal):query}
 const request=(name,args)=>deadline(signal=>rpc(name,args,signal));
 function renderAvailability(){
  const live=s.online&&!s.refreshFailed&&(s.record?.id?s.roomConnected:s.supportConnected),away=s.healthKnown&&!s.online;
  const state=s.setup?'setupStatus':s.identityError?'sessionStatus':live?'online':away?'away':'messageStatus';
  $('#chat-live-availability').hidden=s.role==='staff';$('#chat-live-availability').dataset.state=state;
  $('#chat-live-status').textContent=s.role==='staff'?'':t(state);
  $('#chat-thread-status').textContent=t(s.conversation?.status==='resolved'?'resolved':s.refreshFailed?'delayedReplies':live?'liveIntro':away?'awayIntro':'waiting');
  $('#chat-start').disabled=s.sending||s.setup||s.role==='staff';$('#chat-start').textContent=t(s.sending?'sending':'send');
 }
 function clearHealth(){s.healthKnown=false;s.online=false;win.clearTimeout(availabilityTimer);renderAvailability()}
 function applyHealth(health){
  const serverTime=Date.parse(health?.server_time);
  if(health?.version!==2||health.ready!==true||!Number.isFinite(serverTime))return clearHealth();
  if(serverTime<s.healthAt)return;
  const left=liveTimeLeft(health.available_until,health.server_time);
  if(!Number.isFinite(left))return clearHealth();
  s.healthAt=serverTime;s.healthKnown=true;
  s.online=left>0;win.clearTimeout(availabilityTimer);
  if(s.online)availabilityTimer=win.setTimeout(clearHealth,left);
  renderAvailability();
 }
 function applyLive(live){
  if(!live)return;s.live=live;applyHealth(live);win.clearTimeout(typingTimer);
  const left=liveTimeLeft(live.staff_typing_until,live.server_time);$('#chat-typing').hidden=left<=0;$('#chat-typing').textContent=t('staffTyping');
  if(left>0)typingTimer=win.setTimeout(()=>{$('#chat-typing').hidden=true},Math.min(left+50,6500));
 }
 function reset(accountChanged=false){
  s.generation++;initializing=null;room?.close();room=null;s.roomConnected=false;s.record=null;s.conversation=null;s.messages=[];s.more=false;s.pending=null;s.live=null;s.rendered='';s.reading=false;s.readAgain=false;s.sending=false;s.refreshFailed=false;s.restoreFailed=false;s.readDenied=false;
  if(accountChanged){watch?.close();watch=null;s.supportConnected=false;s.owner='guest';s.user=null;s.role=null;s.canInbox=false;s.initialized=false;s.identityError=false;s.setup=false;s.healthAt=0;clearHealth()}
  persist();
  $('#chat-start-form').reset();$('#chat-reply-form').reset();$('#chat-messages').replaceChildren();$('#chat-typing').hidden=true;$('#chat-unread').hidden=true;win.clearTimeout(typingTimer);
  for(const id of ['chat-start','chat-send','chat-reply']){$(`#${id}`).disabled=false;$(`#${id}`).removeAttribute('aria-busy')}notice('');render();
 }
 function renderMessages({scroll=false,prepend=false}={}){
  const list=$('#chat-messages'),pending=s.pending&&['sending','failed'].includes(s.pending.status)?s.pending:null;
  const fingerprint=language()+s.messages.map(message=>message.id).join(',')+(s.live?.staff_read_at||'')+JSON.stringify(pending);
  if(s.rendered===fingerprint){if(scroll)list.scrollTop=list.scrollHeight;return}
  const height=list.scrollHeight,top=list.scrollTop,nearBottom=height-top-list.clientHeight<80;
  list.replaceChildren(...s.messages.map(message=>{
   const mine=message.sender_type!=='staff',seen=mine&&s.live?.staff_read_at&&new Date(s.live.staff_read_at)>=new Date(message.created_at);
   return el('article',{class:`site-chat-message${mine?' own':' team'}`,'data-message-id':message.id},[el('p',{},message.body),el('small',{},`${t(mine?'you':'team')} · ${new Intl.DateTimeFormat(language()==='vi'?'vi-VN':'en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(message.created_at))}${mine?' · '+t(seen?'seen':'sent'):''}`)]);
  }));
  if(pending)list.append(el('article',{class:`site-chat-message own pending-${pending.status}`},[el('p',{},pending.body),el('small',{},t(pending.status==='failed'?'notSent':'sending'))]));
  s.rendered=fingerprint;if(prepend)list.scrollTop=top+list.scrollHeight-height;else if(scroll||nearBottom)list.scrollTop=list.scrollHeight;else list.scrollTop=top;
 }
 function render(messageOptions={}){
  const staff=s.role==='staff',active=!!s.conversation,restoring=!!s.record?.id&&!active;
  $('#chat-staff-view').hidden=!staff;$('#chat-footer').hidden=staff;
  $('#chat-loading').hidden=!restoring||staff||s.restoreFailed;$('#chat-start-view').hidden=active||restoring||staff;$('#chat-thread-view').hidden=!active||staff;$('#chat-clear').hidden=!s.record||staff;
  $('#chat-staff-hint').textContent=t(s.canInbox?'staff':'staffNoInbox');$('#chat-staff-link').textContent=t(s.canInbox?'inbox':'staffPortal');
  $('#chat-staff-link').href=s.canInbox?'./portal.html?area=staff&view=inbox':'./portal.html?area=staff';
  const launcher=s.canInbox?'inboxLauncher':staff?'staffLauncher':'launcher';$('#chat-launcher [data-c=launcher]').textContent=t(launcher);$('#chat-launcher').setAttribute('aria-label',t(launcher));
  $('#chat-session-hint').textContent=t(s.storageBlocked?'storageError':'sessionHint');$('#chat-older').hidden=!s.more;
  $('#chat-reply').disabled=s.readDenied;$('#chat-send').disabled=s.sending||s.readDenied||s.setup;
  $('#chat-identity').textContent=t(s.owner==='guest'?'guest':'customer');renderAvailability();if(active&&!staff)renderMessages(messageOptions);
 }
 function translate(){
  doc.querySelectorAll('[data-c]').forEach(node=>{node.textContent=t(node.dataset.c)});doc.querySelectorAll('[data-c-placeholder]').forEach(node=>{node.placeholder=t(node.dataset.cPlaceholder)});$('#chat-close').setAttribute('aria-label',t('close'));
  if(s.notice)notice(s.notice.key,s.notice.error);$('#chat-typing').textContent=t('staffTyping');render();
 }
 async function read({older=false,scroll=false}={}){
  if(s.role==='staff'||!s.record?.id)return;if(s.reading){if(!older)s.readAgain=true;return}const generation=s.generation,id=s.record.id;s.reading=true;s.restoreFailed=false;
  if(!s.conversation)render();
  const oldest=older?s.messages[0]:null,args={p_conversation_id:id,p_token:s.record.token,p_mark_read:opened()&&!doc.hidden};
  if(oldest){args.p_before_at=oldest.created_at;args.p_before_id=oldest.id;args.p_mark_read=false}
  try{
   const data=unwrap(await request('gary_read_chat',args));if(generation!==s.generation)return;s.setup=false;s.readDenied=false;s.refreshFailed=false;
   const incoming=data.messages||[],previous=s.messages.length,lastStaff=s.messages.filter(message=>message.sender_type==='staff').at(-1)?.id;
   if(s.pending&&incoming.some(message=>message.client_message_id===s.pending.id)){if($('#chat-reply').value.trim()===s.pending.body)$('#chat-reply-form').reset();s.pending=null;notice('replySent')}
   const gap=!older&&previous&&incoming.length===50&&!incoming.some(message=>s.messages.some(old=>old.id===message.id));if(gap)s.messages=[];
   s.messages=mergeMessages(s.messages,incoming);if(older||!previous||gap)s.more=!!data.has_more;s.conversation=data.conversation;applyLive(data.live);
   if(!s.notice||['refreshError','olderError','loading'].includes(s.notice.key))notice('');render({scroll,prepend:older});
   const newestStaff=s.messages.filter(message=>message.sender_type==='staff').at(-1)?.id;if(!opened()&&newestStaff&&newestStaff!==lastStaff){$('#chat-unread').hidden=false;$('#chat-unread').textContent=t('unread')}
  }catch(error){if(generation===s.generation){
   s.restoreFailed=!s.conversation;s.readDenied ||= error?.code==='42501';s.setup=isChatSetupError(error);if(!older)s.refreshFailed=true;
   if(older||!['messageSent','previousMessage','replySent'].includes(s.notice?.key)||s.readDenied||s.setup)
    notice(s.setup?'setupRequired':s.readDenied?'unavailable':older?'olderError':'refreshError',true);
   render();
  }}
  finally{if(generation===s.generation){s.reading=false;if(s.readAgain){s.readAgain=false;read().catch(()=>{})}}}
 }
 function connectRoom(){
  room?.close();s.roomConnected=false;const generation=s.generation;
  room=createLiveRoom({client,doc,id:s.record.id,token:s.record.token,onChange:()=>read(),onConnection:connected=>{if(generation!==s.generation)return;s.roomConnected=connected;renderAvailability()}});
 }
 async function identity(signal){
  const session=unwrap(await client.auth.getSession());if(!session.session)return {user:null,role:null,canInbox:false};
  signal.throwIfAborted();const {user}=unwrap(await client.auth.getUser());signal.throwIfAborted();
  if(!user)throw new Error('Chat identity could not be verified');
  const access=unwrap(await rpc('gary_my_access',{},signal));
  if(typeof access?.member!=='boolean')throw new Error('Chat identity could not be verified');
  return {user,role:access.member?'staff':'customer',canInbox:access.member&&['staff','manager','admin'].includes(access.operations)};
 }
 function initialize(){if(initializing)return initializing;if(s.initialized)return Promise.resolve();const pending=initializeNow();initializing=pending;pending.finally(()=>{if(initializing===pending)initializing=null});return pending}
 async function initializeNow(){
  const generation=s.generation;
  try{
   const {user,role,canInbox}=await deadline(identity);if(generation!==s.generation)return;s.user=user;s.owner=user?.id||'guest';s.role=role;s.canInbox=canInbox;
   try{const record=JSON.parse(win.sessionStorage.getItem(storageKey)||'null');if(record&&record.owner===s.owner&&/^[0-9a-f]{64}$/.test(record.token)&&(!record.id||/^[0-9a-f-]{36}$/.test(record.id)))s.record=record;else win.sessionStorage.removeItem(storageKey)}catch{}
   if(user){$('#chat-name').value||=user.user_metadata?.full_name||'';$('#chat-email').value||=user.email||''}s.initialized=true;s.identityError=false;
   if(s.notice?.key==='sessionError')notice('');render();
   if(role==='staff'&&opened()&&$('#chat-start-view').contains(doc.activeElement))$('#chat-staff-link').focus();
   if(role!=='staff'){
    watch=createSupportWatch({client,doc,readHealth:()=>request('gary_live_chat_health'),onHealth:applyHealth,onHealthError:clearHealth,onConnection:connected=>{s.supportConnected=connected;renderAvailability()}});
    watch.refresh().catch(()=>{});
    if(s.record?.id){await read();if(generation!==s.generation)return;connectRoom()}
   }
   render();
  }catch{if(generation===s.generation){s.identityError=true;notice('sessionError',true);render()}}
 }
 const ready=initialize();
 function setOpen(value){
  $('#site-chat').hidden=!value;$('#chat-launcher').setAttribute('aria-expanded',String(value));
  if(value){
   $('#chat-unread').hidden=true;
   if(s.record?.id&&s.role!=='staff')read({scroll:true});else if(!s.initialized)initialize();
   const target=s.role==='staff'?'#chat-staff-link':s.conversation&&!s.readDenied?'#chat-reply':s.record?.id?'#chat-refresh':'#chat-first-message';$(target).focus();
  }else{room?.stopTyping();$('#chat-launcher').focus()}
 }
 $('#chat-launcher').addEventListener('click',()=>setOpen(!opened()));$('#chat-close').addEventListener('click',()=>setOpen(false));
 $('#site-chat').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setOpen(false)}});
 $('#chat-start-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget;if(s.sending||s.setup||s.role==='staff'||!form.reportValidity())return;
  const message=$('#chat-first-message').value.trim();if(!message){notice('detailsError',true);return}
  const generation=s.generation;s.sending=true;renderAvailability();$('#chat-start').setAttribute('aria-busy','true');notice('');
  try{
   await initialize();if(generation!==s.generation||!s.initialized||s.role==='staff'||s.record?.id)return;
   if(s.user)await deadline(()=>profileFor(s.user));if(generation!==s.generation)return;
   const name=$('#chat-name').value.trim()||t('visitor'),email=$('#chat-email').value.trim();
   if(name.length<2){notice('detailsError',true);return}
   if(!s.record){s.record={owner:s.owner,token:token(),id:null,firstMessageId:win.crypto.randomUUID()};persist()}
   const result=unwrap(await request('gary_open_chat',{p_token:s.record.token,p_name:name,p_email:email,p_message:message,p_client_message_id:s.record.firstMessageId,p_service:$('#chat-service').value||null}));
   if(generation!==s.generation)return;
   if(!result?.conversation?.id||!Array.isArray(result.messages))throw new Error('Missing message receipt');
   const first=result.messages.find(item=>item.client_message_id===s.record.firstMessageId);
   const delivered=first?first.body===message:result.messages.some(item=>item.sender_type!=='staff'&&item.body===message);
   const draft=$('#chat-first-message').value;
   s.conversation=result.conversation;s.record.id=result.conversation.id;s.messages=result.messages;s.more=!!result.has_more;persist();
   form.reset();if(!delivered||draft.trim()!==message)$('#chat-reply').value=draft;
   notice(delivered?'messageSent':'previousMessage');render({scroll:true});connectRoom();void read({scroll:true});if(opened())$('#chat-reply').focus();
  }catch(error){if(generation===s.generation){if(isChatSetupError(error)){s.setup=true;notice('setupRequired',true)}else notice(error?.code==='P0001'?'rateLimited':error?.code==='22023'?'detailsError':'startError',true)}}
  finally{if(generation===s.generation){s.sending=false;$('#chat-start').removeAttribute('aria-busy');render()}}
 });
 $('#chat-reply-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget,body=$('#chat-reply').value.trim();if(s.sending||s.setup||s.readDenied||s.role==='staff'||!s.record?.id||!body||!form.reportValidity())return;const generation=s.generation,id=s.record.id;
  if(!s.pending||s.pending.body!==body)s.pending={id:win.crypto.randomUUID(),body};s.pending.status='sending';const pending=s.pending;s.sending=true;$('#chat-send').disabled=true;$('#chat-send').setAttribute('aria-busy','true');notice('');room?.stopTyping();renderMessages({scroll:true});
  try{
   const sent=unwrap(await request('gary_send_chat_message',{p_conversation_id:id,p_body:body,p_client_message_id:pending.id,p_token:s.record.token}));if(generation!==s.generation)return;
   if(!sent?.id)throw new Error('Missing message receipt');
   s.messages=mergeMessages(s.messages,[{id:sent.id,client_message_id:pending.id,sender_type:s.user?'customer':'visitor',body,created_at:new Date().toISOString()}]);s.pending=null;if($('#chat-reply').value.trim()===body)form.reset();notice('replySent');renderMessages({scroll:true});void read({scroll:true});
  }catch(error){if(generation===s.generation){if(s.messages.some(message=>message.client_message_id===pending.id)){s.pending=null;if($('#chat-reply').value.trim()===body)form.reset()}else{s.pending={...pending,status:'failed'};notice(error?.code==='P0001'?'rateLimited':error?.code==='42501'?'unavailable':'sendError',true)}renderMessages()}}
  finally{if(generation===s.generation){s.sending=false;$('#chat-send').disabled=s.setup||s.readDenied;$('#chat-send').removeAttribute('aria-busy')}}
 });
 $('#chat-reply').addEventListener('input',()=>room?.typing(!!$('#chat-reply').value.trim()));$('#chat-reply').addEventListener('blur',()=>room?.stopTyping());
 for(const [field,form]of [['#chat-first-message','#chat-start-form'],['#chat-reply','#chat-reply-form']])$(field).addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();if(!s.sending&&!s.setup)$(form).requestSubmit()}});
 $('#chat-older').addEventListener('click',()=>read({older:true}));$('#chat-refresh').addEventListener('click',()=>{
  if(s.record?.id)void read();else if(!s.initialized)void initialize();else if(s.setup){s.setup=false;notice('');renderAvailability()}
  watch?.refresh().catch(()=>{});
 });
 $('#chat-clear').addEventListener('click',()=>{if(win.confirm(t('clearConfirm'))){reset();$('#chat-first-message').focus()}});
 doc.addEventListener('visibilitychange',()=>{if(!doc.hidden&&s.record?.id)read()});doc.addEventListener('gary:language',translate);
 const subscription=client.auth.onAuthStateChange((event,session)=>{
  if(!['SIGNED_OUT','SIGNED_IN','USER_UPDATED'].includes(event))return;const owner=session?.user?.id||'guest';
  if(s.initialized?owner!==s.owner:event==='SIGNED_OUT')queueMicrotask(async()=>{reset(true);await initialize();if(s.initialized&&s.role!=='staff')notice('signInChanged')});
 });
 win.addEventListener('pageshow',event=>{if(event.persisted){clearHealth();watch?.refresh().catch(()=>{});if(s.record?.id)void read()}});
 win.addEventListener('pagehide',event=>{if(!event.persisted){room?.close();watch?.close();win.clearTimeout(availabilityTimer);win.clearTimeout(typingTimer);subscription?.data?.subscription?.unsubscribe()}});
 translate();return {ready,reset,read,translate};
}

if(typeof document!=='undefined')createChatWidget();
