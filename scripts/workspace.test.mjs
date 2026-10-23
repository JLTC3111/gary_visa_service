import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {JSDOM} from 'jsdom';
import {createCRM} from '../dist/crm.js';
import {createInbox} from '../dist/inbox.js';
import {createChatWidget} from '../dist/chat-widget.js';
import {portalCopy} from '../dist/portal-copy.js';
import {createSupportWatch} from '../dist/live-chat.js';
const flush=async()=>{for(let i=0;i<12;i++)await new Promise(resolve=>setImmediate(resolve))};
async function until(predicate,message){const deadline=Date.now()+1800;while(!predicate()){if(Date.now()>deadline)assert.fail(message);await new Promise(resolve=>setTimeout(resolve,10))}}
const submit=(win,id)=>win.document.querySelector(id).dispatchEvent(new win.Event('submit',{cancelable:true}));
async function page(file='portal.html'){
 const dom=new JSDOM(await readFile(new URL(`../dist/${file}`,import.meta.url),'utf8'),{url:`http://localhost:4173/${file}`,pretendToBeVisual:true});
 dom.window.HTMLDialogElement.prototype.showModal=function(){this.open=true};dom.window.HTMLDialogElement.prototype.close=function(){this.open=false};return dom;
}
function mockDatabase(tables){
 const calls=[];
 class Query{
  constructor(table){this.table=table;this.op='select';this.predicates=[];this.orders=[];this.from=0;this.to=Infinity;this.singleRow=false;this.options={}}
  select(columns,options){this.options=options||{};return this}order(key,{ascending=true}={}){this.orders.push([key,ascending]);return this}range(from,to){this.from=from;this.to=to;return this}limit(limit){this.to=limit-1;return this}single(){this.singleRow=true;return this}
  eq(key,value){this.predicates.push(row=>row[key]===value);return this}neq(key,value){this.predicates.push(row=>row[key]!==value);return this}is(key,value){return this.eq(key,value)}lte(key,value){this.predicates.push(row=>row[key]!=null&&row[key]<=value);return this}
  ilike(key,value){const search=value.slice(1,-1).replace(/\\(.)/g,'$1').toLowerCase();this.predicates.push(row=>String(row[key]||'').toLowerCase().includes(search));return this}
  insert(values){this.op='insert';this.values=values;return this}update(values){this.op='update';this.values=values;return this}
  then(resolve,reject){
   calls.push({table:this.table,operation:this.op,values:this.values});
   let rows=(tables[this.table]||[]).filter(row=>this.predicates.every(test=>test(row)));
   if(this.op==='insert'){const record={id:randomUUID(),created_at:new Date().toISOString(),updated_at:new Date().toISOString(),source:'manual',tags:[],...this.values};(tables[this.table]??=[]).push(record);rows=[record]}
   if(this.op==='update')rows.forEach(row=>Object.assign(row,this.values));
   const count=rows.length;rows=[...rows].sort((a,b)=>{for(const [key,ascending]of this.orders){const n=String(a[key]||'').localeCompare(String(b[key]||''));if(n)return ascending?n:-n}return 0}).slice(this.from,this.to+1);
   return Promise.resolve({data:this.options.head?null:this.singleRow?structuredClone(rows[0]):structuredClone(rows),count,error:null}).then(resolve,reject);
  }
 }
 return {from:table=>new Query(table),calls};
}
test('CRM creates and edits contacts, filters follow-ups and keeps notes in the staff record',async()=>{
 const dom=await page(),w=dom.window,doc=w.document,$=id=>doc.querySelector(id),user={id:randomUUID()},roster=[{user_id:user.id,display_name:'Gary staff'}],notices=[];
 const tables={gary_crm_contacts:[],gary_crm_notes:[],gary_crm_events:[],gary_chat_conversations:[],gary_applications:[]},db=mockDatabase(tables);
 let allowed=true;const t=key=>portalCopy[doc.documentElement.lang]?.[key]||portalCopy.en[key]||key;
 const crm=createCRM({db,doc,t,isStaff:()=>allowed,getUser:()=>user,getRoster:async()=>roster,showDialog:node=>node.showModal(),closeDialog:node=>node.close(),notify:key=>notices.push(key),openApplication:()=>{},openChat:()=>{}});
 try{
  await crm.enter();assert.match($('#customers-list').textContent,/No contacts match/);$('#new-contact').click();await flush();
  $('#contact-name').value='Alex <img src=x>';$('#contact-email').value='alex@example.test';$('#contact-company').value='Language school';$('#contact-stage').value='qualified';$('#contact-assignee').value=user.id;$('#contact-tags').value='teacher, urgent, teacher';$('#contact-followup').value='2026-01-01T10:00';submit(w,'#contact-form');await flush();
  const inserted=db.calls.find(call=>call.table==='gary_crm_contacts'&&call.operation==='insert');assert.ok(inserted);assert.deepEqual(inserted.values.tags,['teacher','urgent']);assert.equal(inserted.values.assigned_staff_id,user.id);assert.equal('profile_id' in inserted.values,false);assert.equal('source' in inserted.values,false);assert.equal(tables.gary_crm_contacts.length,1);assert.equal($('#contact-dialog').open,true);assert.equal($('#contact-title').textContent,'Alex <img src=x>');assert.equal($('#contact-title img'),null);
  $('#contact-note').value='Private notes <script>alert(1)</script>';submit(w,'#contact-note-form');await flush();assert.equal(tables.gary_crm_notes[0].body,'Private notes <script>alert(1)</script>');assert.equal($('#contact-notes script'),null);assert.equal($('#contact-note').value,'');
  $('#edit-contact').click();await flush();$('#contact-stage').value='customer';submit(w,'#contact-form');await flush();assert.equal(tables.gary_crm_contacts[0].stage,'customer');
  $('#contact-due-filter').value='due';$('#contact-due-filter').dispatchEvent(new w.Event('change'));await flush();assert.equal($('#customers-list .crm-contact-row')!==null,true);assert.match($('#customers-list').textContent,/Due/);
  doc.documentElement.lang='vi';crm.render();assert.match($('#customers-list').textContent,/Khách hàng/);
  allowed=false;const before=db.calls.length;await crm.enter();assert.equal(db.calls.length,before,'no CRM requests without a verified staff role');crm.reset();assert.equal($('#contact-notes').children.length,0);assert.equal($('#contact-name').value,'');assert.equal($('#customers-list').children.length,0);
 }finally{dom.window.close()}
});

test('Staff inbox replies preserve failed drafts and retry IDs; leaving closes subscriptions',async()=>{
 const dom=await page(),w=dom.window,doc=w.document,$=id=>doc.querySelector(id),staff=randomUUID(),contact=randomUUID(),id=randomUUID();
 const chat={id,contact_id:contact,visitor_name:'Alex Visitor',visitor_email:'alex@example.test',customer_id:null,status:'open',assigned_staff_id:null,last_message_at:new Date().toISOString(),last_message_preview:'Hello team',last_customer_message_at:new Date().toISOString(),staff_last_read_at:null};
 const tables={gary_chat_conversations:[chat]},db=mockDatabase(tables),messages=[{id:randomUUID(),sender_type:'visitor',body:'Hello team <img src=x>',created_at:new Date().toISOString()}],rpcCalls=[];let fail=true,removed=0,openedContact;
 const channel={on(){return this},subscribe(){return this}};db.channel=()=>channel;db.removeChannel=async()=>{removed++};
 db.rpc=async(name,args)=>{rpcCalls.push({name,args});if(name==='gary_read_chat')return {data:{conversation:{id,status:chat.status},messages:[...messages],has_more:false},error:null};if(name==='gary_send_chat_message'){if(fail){fail=false;return {error:{message:'Network interruption'}}}messages.push({id:randomUUID(),sender_type:'staff',body:args.p_body,created_at:new Date().toISOString()});return {data:{id:messages.at(-1).id},error:null}}};
 const inbox=createInbox({db,doc,t:key=>portalCopy.en[key]||key,isStaff:()=>true,getUser:()=>({id:staff}),getRoster:async()=>[{user_id:staff,display_name:'Gary staff'}],openContact:id=>{openedContact=id}});
 try{
  await inbox.enter();assert.equal($('#inbox-list .unread')!==null,true);$('#inbox-list button').click();await flush();assert.equal($('#inbox-name').textContent,'Alex Visitor');assert.match($('#inbox-identity').textContent,/unverified/);assert.equal($('#inbox-messages img'),null);
  $('#inbox-reply').value='A helpful reply';submit(w,'#inbox-reply-form');await flush();assert.equal($('#inbox-reply').value,'A helpful reply');assert.match($('#inbox-feedback').textContent,/draft is kept/);
  submit(w,'#inbox-reply-form');await flush();assert.equal($('#inbox-reply').value,'');const sends=rpcCalls.filter(call=>call.name==='gary_send_chat_message');assert.equal(sends.length,2);assert.equal(sends[0].args.p_client_message_id,sends[1].args.p_client_message_id);assert.equal($('#inbox-messages .own p').textContent,'A helpful reply');
  $('#inbox-resolve').click();await flush();assert.equal(chat.status,'resolved');assert.equal($('#inbox-resolve').textContent,'Reopen conversation');$('#inbox-contact').click();assert.equal(openedContact,contact);
  $('#inbox-reply').value='Unsent draft';$('#inbox-reply').dispatchEvent(new w.Event('input'));inbox.leave();await flush();assert.equal(removed,2);await inbox.enter(id);assert.equal($('#inbox-reply').value,'Unsent draft');inbox.reset();assert.equal($('#inbox-messages').children.length,0);assert.equal($('#inbox-reply').value,'');
 }finally{inbox.leave();dom.window.close()}
});

test('On-site guest chat stays on the page, restores its tab session and preserves failed messages',async()=>{
 const dom=await page('index.html'),w=dom.window,doc=w.document,$=id=>doc.querySelector(id),id=randomUUID(),calls=[];let failSend=true;
 const messages=[],conversation={id,status:'open',name:'Alex',identity:'visitor'};let authChanged;
 const client={auth:{getSession:async()=>({data:{session:null},error:null}),onAuthStateChange:callback=>{authChanged=callback;return {data:{subscription:{unsubscribe(){}}}}}},rpc:async(name,args)=>{calls.push({name,args});if(name==='gary_live_chat_health')return {data:{version:2,ready:true,server_time:new Date().toISOString(),available_until:null},error:null};if(name==='gary_chat_activity')return {data:null,error:null};if(name==='gary_open_chat'){if(!messages.length)messages.push({id:randomUUID(),sender_type:'visitor',body:args.p_message,created_at:new Date().toISOString()});return {data:{conversation,messages:[...messages],has_more:false},error:null}}if(name==='gary_send_chat_message'){if(failSend){failSend=false;return {error:{message:'Offline'}}}messages.push({id:randomUUID(),sender_type:'visitor',body:args.p_body,created_at:new Date().toISOString()});return {data:{id:messages.at(-1).id},error:null}}return {data:{conversation,messages:[...messages],has_more:false},error:null}}};
 const widget=createChatWidget({client,doc,profileFor:async()=>{}});
 try{
  await widget.ready;$('#chat-launcher').click();assert.equal($('#site-chat').hidden,false);$('#chat-name').value='Alex';$('#chat-email').value='alex@example.test';$('#chat-first-message').value='A visa question <img src=x onerror=alert(1)>';submit(w,'#chat-start-form');await flush();
  const opening=calls.find(call=>call.name==='gary_open_chat');assert.match(opening.args.p_token,/^[a-f0-9]{64}$/);assert.equal($('#chat-thread-view').hidden,false);assert.equal($('#chat-messages img'),null);assert.match($('#chat-messages').textContent,/visa question/);assert.equal(w.location.search,'');const saved=w.sessionStorage.getItem('gary-site-chat-v1');assert.equal(saved.includes('alex@example.test'),false);assert.equal(saved.includes('visa question'),false);
  $('#chat-reply').value='Here is more detail';submit(w,'#chat-reply-form');await flush();assert.equal($('#chat-reply').value,'Here is more detail');assert.match($('#chat-notice').textContent,/draft is kept/);submit(w,'#chat-reply-form');await flush();const sends=calls.filter(call=>call.name==='gary_send_chat_message');assert.equal(sends[0].args.p_client_message_id,sends[1].args.p_client_message_id);assert.equal($('#chat-reply').value,'');
  $('#chat-close').click();messages.push({id:randomUUID(),sender_type:'staff',body:'Hello Alex, we can help.',created_at:new Date().toISOString()});await widget.read();assert.equal($('#chat-unread').hidden,false);$('#chat-launcher').click();assert.equal($('#chat-unread').hidden,true);assert.match($('#chat-messages').textContent,/we can help/);
  doc.documentElement.lang='vi';doc.dispatchEvent(new w.CustomEvent('gary:language'));assert.equal($('#chat-send').textContent,'Gửi tin nhắn');
  const restored=await page('index.html');restored.window.sessionStorage.setItem('gary-site-chat-v1',saved);const second=createChatWidget({client,doc:restored.window.document,profileFor:async()=>{}});await second.ready;assert.equal(restored.window.document.querySelector('#chat-thread-view').hidden,false);assert.match(restored.window.document.querySelector('#chat-messages').textContent,/we can help/);restored.window.close();
  w.confirm=()=>true;$('#chat-clear').click();assert.equal(w.sessionStorage.getItem('gary-site-chat-v1'),null);assert.equal($('#chat-messages').children.length,0);assert.equal($('#chat-start-view').hidden,false);
 }finally{dom.window.close()}
});

test('Signing out clears an authenticated chat and its local capability',async()=>{
 const dom=await page('portal.html'),doc=dom.window.document,id=randomUUID(),owner=randomUUID();let user={id:owner,email:'customer@example.test',user_metadata:{full_name:'Customer'}},authChanged;
 dom.window.sessionStorage.setItem('gary-site-chat-v1',JSON.stringify({owner,id,token:'e'.repeat(64)}));
 const client={auth:{getSession:async()=>({data:{session:user?{user}:null},error:null}),getUser:async()=>({data:{user},error:null}),onAuthStateChange:callback=>{authChanged=callback;return {data:{subscription:{unsubscribe(){}}}}}},rpc:async name=>({data:name==='gary_my_role'?'customer':name==='gary_live_chat_health'?{version:2,ready:true,server_time:new Date().toISOString(),available_until:null}:{conversation:{id,status:'open'},messages:[{id:randomUUID(),body:'Private customer conversation',sender_type:'customer',created_at:new Date().toISOString()}],has_more:false},error:null})};
 try{
  const widget=createChatWidget({client,doc,profileFor:async()=>{}});await widget.ready;assert.match(doc.querySelector('#chat-messages').textContent,/Private customer/);
  user=null;authChanged('SIGNED_OUT',null);await flush();assert.equal(doc.querySelector('#chat-messages').textContent,'');assert.equal(dom.window.sessionStorage.getItem('gary-site-chat-v1'),null);assert.equal(doc.querySelector('#chat-name').value,'');assert.equal(doc.querySelector('#chat-start-view').hidden,false);
 }finally{dom.window.close()}
});

function realtimeBus(){
 const channels=new Set();
 const api={channel(topic){const channel={topic,handlers:[],connected:false,on(type,filter,callback){this.handlers.push({type,filter,callback});return this},subscribe(callback){this.status=callback;channels.add(this);queueMicrotask(()=>{this.connected=true;callback?.('SUBSCRIBED')});return this}};return channel},async removeChannel(channel){channel.connected=false;channels.delete(channel)},emit(topic,event,payload={}){for(const channel of channels)if(channel.connected&&channel.topic===topic)for(const handler of channel.handlers)if(handler.type==='broadcast'&&handler.filter.event===event)handler.callback({payload})},disconnect(topic){for(const channel of channels)if(channel.topic===topic){channel.connected=false;channel.status?.('CHANNEL_ERROR')}},reconnect(topic){for(const channel of channels)if(channel.topic===topic){channel.connected=true;channel.status?.('SUBSCRIBED')}}};return api;
}

test('Live staff chat delivers both directions, typing, seen receipts and reconnect catch-up without refresh',async()=>{
 const visitor=await page('index.html'),staffPage=await page(),v=visitor.window.document,p=staffPage.window.document,bus=realtimeBus(),staffId=randomUUID(),conversationId=randomUUID(),contactId=randomUUID();
 const tables={gary_chat_conversations:[]},database=mockDatabase(tables),messages=[],state={available:false,staffRead:null,visitorRead:null,staffTyping:null,visitorTyping:null,visitorSeen:null},health=()=>({version:2,ready:true,server_time:new Date().toISOString(),available_until:state.available?new Date(Date.now()+45000).toISOString():null});
 let chat;
 function updated(){bus.emit(`gary-chat:${conversationId}`,'changed');bus.emit('gary-support:v2','queue')}
 function client(staff){return {...database,...bus,auth:{getSession:async()=>({data:{session:null},error:null}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},rpc:async(name,args={})=>{
  if(name==='gary_live_chat_health')return {data:health(),error:null};
  if(name==='gary_set_chat_availability'){assert.equal(staff,true);state.available=args.p_available;bus.emit('gary-support:v2','availability');return {data:health(),error:null}}
  if(name==='gary_open_chat'){
   assert.equal(args.p_name,'Visitor');assert.equal(args.p_email,'','no invented email or required contact form');
   chat={id:conversationId,contact_id:contactId,visitor_name:args.p_name,visitor_email:'',customer_id:null,status:'open',last_message_at:new Date().toISOString(),last_message_preview:args.p_message};tables.gary_chat_conversations.push(chat);
   messages.push({id:randomUUID(),client_message_id:args.p_client_message_id,sender_type:'visitor',body:args.p_message,created_at:new Date().toISOString()});updated();return {data:{conversation:{id:conversationId,status:'open'},messages:[...messages],has_more:false},error:null};
  }
  if(name==='gary_read_chat'){
   if(args.p_mark_read){const key=staff?'staffRead':'visitorRead',peer=messages.filter(message=>staff?message.sender_type!=='staff':message.sender_type==='staff').at(-1);if(peer&&(!state[key]||new Date(peer.created_at)>new Date(state[key]))){state[key]=new Date().toISOString();updated()}}
   return {data:{conversation:{id:conversationId,status:chat.status},messages:[...messages],has_more:false,live:{...health(),staff_read_at:state.staffRead,visitor_read_at:state.visitorRead,staff_typing_until:state.staffTyping,visitor_typing_until:state.visitorTyping,visitor_seen_at:state.visitorSeen}},error:null};
  }
  if(name==='gary_chat_activity'){
   if(staff&&args.p_typing!==null)state.staffTyping=args.p_typing?new Date(Date.now()+6000).toISOString():null;
   if(!staff){state.visitorSeen=new Date().toISOString();if(args.p_typing!==null)state.visitorTyping=args.p_typing?new Date(Date.now()+6000).toISOString():null}
   bus.emit(`gary-chat:${conversationId}`,'presence');return {data:null,error:null};
  }
  if(name==='gary_send_chat_message'){
   const message={id:randomUUID(),client_message_id:args.p_client_message_id,sender_type:staff?'staff':'visitor',body:args.p_body,created_at:new Date().toISOString()};messages.push(message);chat.last_message_at=message.created_at;chat.last_message_preview=message.body;updated();return {data:{id:message.id},error:null};
  }
  throw new Error(`Unexpected RPC: ${name}`);
 }}}
 const widget=createChatWidget({client:client(false),doc:v,profileFor:async()=>{}}),inbox=createInbox({db:client(true),doc:p,t:key=>portalCopy.en[key]||key,isStaff:()=>true,getUser:()=>({id:staffId}),getRoster:async()=>[],openContact:()=>{}});
 try{
  await widget.ready;await inbox.enter();await until(()=>!p.querySelector('#staff-live-toggle').disabled,'staff should be connected');p.querySelector('#staff-live-toggle').click();await until(()=>v.querySelector('#chat-live-status').textContent.includes('Team online'),'availability should reach the visitor live');
  Object.defineProperty(p,'hidden',{configurable:true,value:true});p.dispatchEvent(new staffPage.window.Event('visibilitychange'));await flush();assert.equal(state.available,true,'switching to the visitor window does not mark staff away');Object.defineProperty(p,'hidden',{configurable:true,value:false});
  v.querySelector('#chat-launcher').click();v.querySelector('#chat-first-message').value='Hello, is someone available?';submit(visitor.window,'#chat-start-form');await until(()=>p.querySelector('#inbox-list button'),'new visitor should appear in the staff queue without refresh');p.querySelector('#inbox-list button').click();await until(()=>p.querySelector('#inbox-messages').textContent.includes('is someone available'),'visitor message should reach staff');
  await until(()=>v.querySelector('#chat-messages').textContent.includes('Seen'),'staff read should become a seen receipt');
  p.querySelector('#inbox-reply').value='We are here';p.querySelector('#inbox-reply').dispatchEvent(new staffPage.window.Event('input'));await until(()=>!v.querySelector('#chat-typing').hidden,'visitor should see live staff typing');submit(staffPage.window,'#inbox-reply-form');await until(()=>v.querySelector('#chat-messages').textContent.includes('We are here'),'staff reply should arrive without polling or refresh');
  v.querySelector('#chat-reply').value='Thank you';v.querySelector('#chat-reply').dispatchEvent(new visitor.window.Event('input'));await until(()=>!p.querySelector('#inbox-typing').hidden,'staff should see live visitor typing');submit(visitor.window,'#chat-reply-form');await until(()=>p.querySelector('#inbox-messages').textContent.includes('Thank you'),'visitor reply should arrive live');
  bus.emit(`gary-chat:${conversationId}`,'changed',{body:'Forged staff reply',staff_typing_until:'2099-01-01'});await new Promise(resolve=>setTimeout(resolve,80));assert.equal(v.querySelector('#chat-messages').textContent.includes('Forged staff reply'),false,'notification payloads cannot inject chat content');
  bus.disconnect(`gary-chat:${conversationId}`);assert.match(v.querySelector('#chat-live-status').textContent,/Reconnecting/);messages.push({id:randomUUID(),sender_type:'staff',body:'A reply during reconnection',created_at:new Date().toISOString()});bus.reconnect(`gary-chat:${conversationId}`);await until(()=>v.querySelector('#chat-messages').textContent.includes('during reconnection'),'reconnect should recover missed history immediately');
  p.querySelector('#staff-live-toggle').click();await until(()=>v.querySelector('#chat-live-status').textContent==='Team away','going away should update the visitor status');
 }finally{inbox.reset();visitor.window.dispatchEvent(new visitor.window.Event('pagehide'));visitor.window.close();staffPage.window.close()}
});

test('Missing live-chat setup is detected before the visitor can send',async()=>{
 const dom=await page('index.html'),doc=dom.window.document;let writes=0;
 const client={auth:{getSession:async()=>({data:{session:null},error:null}),onAuthStateChange:()=>({})},rpc:async name=>{if(name==='gary_live_chat_health')return {error:{code:'PGRST202'}};writes++;return {error:{code:'PGRST202'}}}};
 try{const widget=createChatWidget({client,doc});await widget.ready;assert.equal(doc.querySelector('#chat-start').disabled,true);assert.equal(doc.querySelector('#chat-live-status').textContent,'Chat unavailable');assert.match(doc.querySelector('#chat-notice').textContent,/not available on this website yet/);assert.equal(writes,0)}finally{dom.window.close()}
});

test('Portal and widget share a socket channel and wait for teardown before rejoining',async()=>{
 const dom=await page(),channels=new Map();let joined=0,removed=0;
 const client={rpc:async()=>({data:{version:2,ready:true,server_time:new Date().toISOString(),available_until:null},error:null}),channel(topic){if(channels.has(topic))return channels.get(topic);const channel={on(){return this},subscribe(callback){if(this.joinedOnce)throw new Error('Already subscribed');this.joinedOnce=true;joined++;queueMicrotask(()=>callback('SUBSCRIBED'));return this}};channels.set(topic,channel);return channel},async removeChannel(channel){await new Promise(resolve=>setTimeout(resolve,20));for(const [topic,current]of channels)if(current===channel)channels.delete(topic);removed++}};
 const options={client,doc:dom.window.document,onHealth:()=>{}};let one,two,three;
 try{one=createSupportWatch(options);two=createSupportWatch(options);await flush();assert.equal(joined,1,'shared client/topic subscribes once');one.close();await flush();assert.equal(removed,0,'closing one consumer keeps the other connected');two.close();three=createSupportWatch(options);await until(()=>joined===2,'rapid navigation should rejoin after the old channel is removed');assert.equal(removed,1);three.close();await until(()=>removed===2,'final consumer should clean up the channel')}finally{one?.close();two?.close();three?.close();dom.window.close()}
});

test('Staff can request online while connecting, inspect failures, and retry without losing their draft',async()=>{
 const dom=await page(),doc=dom.window.document,$=id=>doc.querySelector(id),db=mockDatabase({gary_chat_conversations:[]}),availability=[],channels=new Map();let joins=0,removed=0,firstStatus;
 db.rpc=async(name,args)=>{if(name==='gary_set_chat_availability')availability.push(args.p_available);return {data:{ready:true,version:2,server_time:new Date().toISOString(),available_until:null},error:null}};
 db.channel=topic=>{if(channels.has(topic))return channels.get(topic);const channel={on(){return this},subscribe(callback){this.status=callback;joins++;if(joins===1)firstStatus=callback;else queueMicrotask(()=>callback('SUBSCRIBED'));return this}};channels.set(topic,channel);return channel};
 db.removeChannel=async channel=>{await new Promise(resolve=>setTimeout(resolve,15));for(const [topic,current]of channels)if(current===channel)channels.delete(topic);channel.status('CLOSED');removed++};
 const inbox=createInbox({db,doc,t:key=>portalCopy[doc.documentElement.lang]?.[key]||portalCopy.en[key]||key,isStaff:()=>true,getUser:()=>({id:randomUUID()}),getRoster:async()=>[],openContact:()=>{}});
 try{
  await inbox.enter();await flush();
  assert.equal($('#staff-live-toggle').disabled,false,'staff can request online while the first connection is pending');$('#staff-live-toggle').click();await flush();assert.equal(availability.includes(true),false,'waiting for a channel must not advertise online');assert.match($('#staff-live-connection-message').textContent,/as soon as/);
  firstStatus('CHANNEL_ERROR',new Error('InvalidJWT: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.c2lnbmF0dXJl sb_publishable_testkey <script>'));await flush();
  assert.equal($('#staff-live-toggle').disabled,false,'a failed connection must not strand staff behind a disabled button');assert.equal($('#staff-live-connection').hidden,false);assert.equal($('#staff-live-retry').hidden,false);assert.match($('#staff-live-connection-message').textContent,/session couldn’t be verified/);assert.match($('#staff-live-error').textContent,/CHANNEL_ERROR/);assert.equal($('#staff-live-error').textContent.includes('eyJ'),false);assert.equal($('#staff-live-error').textContent.includes('sb_publishable_testkey'),false);assert.equal($('#staff-live-error script'),null);
  $('#inbox-reply').value='Keep this reply';$('#staff-live-retry').click();
  await until(()=>availability.includes(true),'retry should go online after the replacement channel connects');assert.equal(removed,1);assert.equal(joins,2);assert.equal($('#staff-live-connection').hidden,true);assert.equal($('#staff-live-label').textContent,'You’re online for live chat');assert.equal($('#inbox-reply').value,'Keep this reply');
  channels.get('gary-support:v2').status('TIMED_OUT');await flush();assert.equal(availability.at(-1),false,'a disconnected inbox must stop advertising online');assert.equal($('#staff-live-retry').hidden,false);assert.equal($('#staff-live-toggle').disabled,false);assert.match($('#staff-live-error').textContent,/TIMED_OUT/);
  doc.documentElement.lang='vi';inbox.render();assert.match($('#staff-live-connection-message').textContent,/Chưa thể kết nối/);
  $('#staff-live-toggle').click();await flush();$('#staff-live-retry').click();await until(()=>$('#staff-live-connection').hidden,'manual retry should restore the connection');assert.equal(availability.at(-1),false,'retry must respect a staff member choosing away');assert.equal($('#inbox-reply').value,'Keep this reply');
 }finally{inbox.leave();await flush();dom.window.close()}
});
