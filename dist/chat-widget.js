import {db,ensureProfile,unwrap} from './backend.js';
import {chatCopy} from './chat-copy.js';
import {mergeMessages} from './chat-data.js';
import {createLiveRoom,createSupportWatch,liveTimeLeft,isChatSetupError} from './live-chat.js';

export function createChatWidget({client=db,doc=document,profileFor=ensureProfile}={}){
 const win=doc.defaultView,$=selector=>doc.querySelector(selector),storageKey='gary-site-chat-v1';
 if(!$('#site-chat'))return null;
 const s={owner:'guest',user:null,role:null,conversation:null,messages:[],more:false,record:null,pending:null,generation:0,reading:false,readAgain:false,sending:false,initialized:false,notice:null,rendered:'',storageBlocked:false,ready:false,setup:false,online:false,connected:false,live:null};
 let room,watch,availabilityTimer,typingTimer,initializing;
 const language=()=>doc.documentElement.lang==='vi'?'vi':'en',t=key=>chatCopy[language()][key]||chatCopy.en[key]||key;
 const el=(tag,attrs={},children=[])=>{const node=doc.createElement(tag);for(const [key,value]of Object.entries(attrs))node.setAttribute(key,String(value));for(const child of(Array.isArray(children)?children:[children]))node.append(typeof child==='string'?doc.createTextNode(child):child);return node};
 const opened=()=>!$('#site-chat').hidden;
 function notice(key,error=false){s.notice=key?{key,error}:null;$('#chat-notice').textContent=key?t(key):'';$('#chat-notice').classList.toggle('error',error)}
 function persist(){try{if(s.record)win.sessionStorage.setItem(storageKey,JSON.stringify(s.record));else win.sessionStorage.removeItem(storageKey)}catch{s.storageBlocked=true}}
 function token(){const bytes=new Uint8Array(32);win.crypto.getRandomValues(bytes);return [...bytes].map(n=>n.toString(16).padStart(2,'0')).join('')}
 function renderAvailability(){
  const key=s.setup?'setupStatus':!s.ready?'connecting':!s.connected?'reconnecting':s.online?'online':'away';
  $('#chat-live-status').textContent=t(key);$('#chat-live-availability').dataset.state=s.ready&&s.connected&&s.online?'online':s.ready&&s.connected?'away':'connecting';
  $('#chat-start').disabled=s.sending||!s.ready;$('#chat-start').textContent=t(s.sending?'sending':'send');
 }
 function applyHealth(health){
  if(health?.version!==2||health?.ready!==true)throw Object.assign(new Error('Chat setup is incomplete'),{code:'PGRST202'});
  s.ready=true;s.setup=false;s.online=liveTimeLeft(health.available_until,health.server_time)>0;win.clearTimeout(availabilityTimer);
  if(s.online)availabilityTimer=win.setTimeout(()=>{s.online=false;renderAvailability()},liveTimeLeft(health.available_until,health.server_time)+50);
  renderAvailability();
 }
 function applyLive(live){
  if(!live)return;s.live=live;applyHealth(live);win.clearTimeout(typingTimer);
  const left=liveTimeLeft(live.staff_typing_until,live.server_time);$('#chat-typing').hidden=left<=0;$('#chat-typing').textContent=t('staffTyping');
  if(left>0)typingTimer=win.setTimeout(()=>{$('#chat-typing').hidden=true},Math.min(left+50,6500));
 }
 function reset(){
  s.generation++;initializing=null;room?.close();room=null;s.record=null;s.conversation=null;s.messages=[];s.more=false;s.pending=null;s.live=null;s.rendered='';s.reading=false;s.readAgain=false;s.sending=false;persist();
  $('#chat-start-form').reset();$('#chat-reply-form').reset();$('#chat-messages').replaceChildren();$('#chat-typing').hidden=true;win.clearTimeout(typingTimer);
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
  const staff=s.role==='staff',active=!!s.conversation,restoring=!!s.record?.id&&!active;$('#chat-staff-view').hidden=!staff;$('#chat-loading').hidden=!restoring||staff;$('#chat-start-view').hidden=active||restoring||staff;$('#chat-thread-view').hidden=!active||staff;$('#chat-clear').hidden=!s.record||staff;
  $('#chat-thread-status').textContent=t(s.conversation?.status==='resolved'?'resolved':!s.connected?'reconnecting':s.online?'liveIntro':'awayIntro');$('#chat-session-hint').textContent=t(s.storageBlocked?'storageError':'sessionHint');$('#chat-older').hidden=!s.more;
  $('#chat-identity').textContent=t(s.owner==='guest'?'guest':'customer');renderAvailability();if(active)renderMessages(messageOptions);
 }
 function translate(){
  doc.querySelectorAll('[data-c]').forEach(node=>{node.textContent=t(node.dataset.c)});doc.querySelectorAll('[data-c-placeholder]').forEach(node=>{node.placeholder=t(node.dataset.cPlaceholder)});$('#chat-launcher').setAttribute('aria-label',t('open'));$('#chat-close').setAttribute('aria-label',t('close'));
  if(s.notice)notice(s.notice.key,s.notice.error);$('#chat-typing').textContent=t('staffTyping');render();
 }
 async function read({older=false,scroll=false}={}){
  if(!s.record?.id)return;if(s.reading){if(!older)s.readAgain=true;return}const generation=s.generation,id=s.record.id;s.reading=true;
  const oldest=older?s.messages[0]:null,args={p_conversation_id:id,p_token:s.record.token,p_mark_read:opened()&&!doc.hidden};
  if(oldest){args.p_before_at=oldest.created_at;args.p_before_id=oldest.id;args.p_mark_read=false}
  try{
   const data=unwrap(await client.rpc('gary_read_chat',args));if(generation!==s.generation)return;
   const incoming=data.messages||[],previous=s.messages.length,lastStaff=s.messages.filter(message=>message.sender_type==='staff').at(-1)?.id;
   if(s.pending&&incoming.some(message=>message.client_message_id===s.pending.id)){if($('#chat-reply').value.trim()===s.pending.body)$('#chat-reply-form').reset();s.pending=null}
   const gap=!older&&previous&&incoming.length===50&&!incoming.some(message=>s.messages.some(old=>old.id===message.id));if(gap)s.messages=[];
   s.messages=mergeMessages(s.messages,incoming);if(older||!previous||gap)s.more=!!data.has_more;s.conversation=data.conversation;applyLive(data.live);
   if(!s.notice||['refreshError','olderError','loading'].includes(s.notice.key))notice('');render({scroll,prepend:older});
   const newestStaff=s.messages.filter(message=>message.sender_type==='staff').at(-1)?.id;if(!opened()&&newestStaff&&newestStaff!==lastStaff){$('#chat-unread').hidden=false;$('#chat-unread').textContent=t('unread')}
  }catch(error){if(generation===s.generation){if(isChatSetupError(error)){s.setup=true;s.ready=false;notice('setupRequired',true);renderAvailability()}else{notice(error?.code==='42501'?'unavailable':older?'olderError':'refreshError',true);if(error?.code==='42501'){$('#chat-reply').disabled=true;$('#chat-send').disabled=true}}}}
  finally{if(generation===s.generation){s.reading=false;if(s.readAgain){s.readAgain=false;read().catch(()=>{})}}}
 }
 function connectRoom(){
  room?.close();const generation=s.generation;
  room=createLiveRoom({client,doc,id:s.record.id,token:s.record.token,onChange:()=>read(),onConnection:connected=>{if(generation!==s.generation)return;s.connected=connected;renderAvailability()}});
 }
 async function identity(){
  const session=await client.auth.getSession();if(session.error)throw session.error;if(!session.data.session)return null;const user=await client.auth.getUser();if(user.error)throw user.error;return user.data.user;
 }
 function initialize(){if(initializing)return initializing;const pending=initializeNow();initializing=pending;pending.finally(()=>{if(initializing===pending)initializing=null});return pending}
 async function initializeNow(){
  const generation=s.generation;
  try{
   const user=await identity();if(generation!==s.generation)return;const role=user?unwrap(await client.rpc('gary_my_role')):null;if(generation!==s.generation)return;s.user=user;s.owner=user?.id||'guest';s.role=role;
   try{const record=JSON.parse(win.sessionStorage.getItem(storageKey)||'null');if(record&&record.owner===s.owner&&/^[0-9a-f]{64}$/.test(record.token)&&(!record.id||/^[0-9a-f-]{36}$/.test(record.id)))s.record=record;else win.sessionStorage.removeItem(storageKey)}catch{}
   if(user){$('#chat-name').value=user.user_metadata?.full_name||'';$('#chat-email').value=user.email||''}s.initialized=true;
   watch?.close();watch=null;
   if(role!=='staff'){
    const health=unwrap(await client.rpc('gary_live_chat_health'));if(generation!==s.generation)return;applyHealth(health);
    watch=createSupportWatch({client,doc,onHealth:applyHealth,onConnection:connected=>{if(!s.conversation){s.connected=connected;renderAvailability()}}});
    if(s.record?.id){await read();if(generation!==s.generation)return;connectRoom()}
   }
   render();
  }catch(error){if(generation===s.generation){s.ready=false;s.setup=isChatSetupError(error);notice(s.setup?'setupRequired':'refreshError',true);render()}}
 }
 const ready=initialize();
 function setOpen(value){$('#site-chat').hidden=!value;$('#chat-launcher').setAttribute('aria-expanded',String(value));if(value){$('#chat-unread').hidden=true;if(s.record?.id)read({scroll:true});else if(!s.ready)initialize();(s.conversation?$('#chat-reply'):$('#chat-first-message')).focus()}else{room?.stopTyping();$('#chat-launcher').focus()}}
 $('#chat-launcher').addEventListener('click',()=>setOpen(!opened()));$('#chat-close').addEventListener('click',()=>setOpen(false));
 $('#site-chat').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setOpen(false)}});
 $('#chat-start-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget;if(s.sending||s.role==='staff'||!form.reportValidity())return;
  const name=$('#chat-name').value.trim()||t('visitor'),email=$('#chat-email').value.trim(),message=$('#chat-first-message').value.trim();if(name.length<2||!message){notice('detailsError',true);return}
  const generation=s.generation;s.sending=true;renderAvailability();$('#chat-start').setAttribute('aria-busy','true');notice('');
  try{
   await ready;if(generation!==s.generation)return;if(!s.ready){await initialize();if(generation!==s.generation||!s.ready)return}
   if(s.user)await profileFor(s.user);if(generation!==s.generation)return;
   if(!s.record){s.record={owner:s.owner,token:token(),id:null,firstMessageId:win.crypto.randomUUID()};persist()}
   const result=unwrap(await client.rpc('gary_open_chat',{p_token:s.record.token,p_name:name,p_email:email,p_message:message,p_client_message_id:s.record.firstMessageId,p_service:$('#chat-service').value||null}));
   if(generation!==s.generation)return;s.conversation=result.conversation;s.record.id=result.conversation.id;s.messages=result.messages||[];s.more=!!result.has_more;persist();notice('');form.reset();render({scroll:true});connectRoom();await read({scroll:true});$('#chat-reply').focus();
  }catch(error){if(generation===s.generation){if(isChatSetupError(error)){s.ready=false;s.setup=true;notice('setupRequired',true)}else notice(error?.code==='P0001'?'rateLimited':error?.code==='22023'?'detailsError':'startError',true)}}
  finally{if(generation===s.generation){s.sending=false;$('#chat-start').removeAttribute('aria-busy');renderAvailability()}}
 });
 $('#chat-reply-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget,body=$('#chat-reply').value.trim();if(s.sending||!s.record?.id||!body||!form.reportValidity())return;const generation=s.generation,id=s.record.id;
  if(!s.pending||s.pending.body!==body)s.pending={id:win.crypto.randomUUID(),body};s.pending.status='sending';const pending=s.pending;s.sending=true;$('#chat-send').disabled=true;$('#chat-send').setAttribute('aria-busy','true');notice('');room?.stopTyping();renderMessages({scroll:true});
  try{
   const sent=unwrap(await client.rpc('gary_send_chat_message',{p_conversation_id:id,p_body:body,p_client_message_id:pending.id,p_token:s.record.token}));if(generation!==s.generation)return;
   s.messages=mergeMessages(s.messages,[{id:sent.id,client_message_id:pending.id,sender_type:s.user?'customer':'visitor',body,created_at:new Date().toISOString()}]);s.pending=null;if($('#chat-reply').value.trim()===body)form.reset();renderMessages({scroll:true});await read({scroll:true});
  }catch(error){if(generation===s.generation){if(s.messages.some(message=>message.client_message_id===pending.id)){s.pending=null;if($('#chat-reply').value.trim()===body)form.reset()}else{s.pending={...pending,status:'failed'};notice(error?.code==='P0001'?'rateLimited':error?.code==='42501'?'unavailable':'sendError',true)}renderMessages()}}
  finally{if(generation===s.generation){s.sending=false;$('#chat-send').disabled=$('#chat-reply').disabled;$('#chat-send').removeAttribute('aria-busy')}}
 });
 $('#chat-reply').addEventListener('input',()=>room?.typing(!!$('#chat-reply').value.trim()));$('#chat-reply').addEventListener('blur',()=>room?.stopTyping());
 for(const [field,form]of [['#chat-first-message','#chat-start-form'],['#chat-reply','#chat-reply-form']])$(field).addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();if(!s.sending&&s.ready)$(form).requestSubmit()}});
 $('#chat-older').addEventListener('click',()=>read({older:true}));$('#chat-refresh').addEventListener('click',()=>s.record?.id?read():initialize());
 $('#chat-clear').addEventListener('click',()=>{if(win.confirm(t('clearConfirm'))){reset();$('#chat-first-message').focus()}});
 doc.addEventListener('visibilitychange',()=>{if(!doc.hidden&&s.record?.id)read()});doc.addEventListener('gary:language',translate);
 const subscription=client.auth.onAuthStateChange((event,session)=>{if(!['SIGNED_OUT','SIGNED_IN','USER_UPDATED'].includes(event))return;const owner=session?.user?.id||'guest';if(s.initialized&&owner!==s.owner)queueMicrotask(async()=>{reset();s.initialized=false;await initialize();if(!s.setup)notice('signInChanged')})});
 win.addEventListener('pagehide',event=>{if(!event.persisted){room?.close();watch?.close();win.clearTimeout(availabilityTimer);win.clearTimeout(typingTimer);subscription?.data?.subscription?.unsubscribe()}});
 translate();return {ready,reset,read,translate};
}

if(typeof document!=='undefined')createChatWidget();
