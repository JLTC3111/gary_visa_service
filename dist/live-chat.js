// Realtime channels carry invalidations only. Every message and presence value
// is fetched through an authenticated/capability-checked RPC before display.
const subscriptions=new WeakMap();
function listen(client,topic,onEvent,onStatus){
 if(typeof client.channel!=='function'){onStatus('CHANNEL_ERROR',new Error('Live connections are unavailable in this browser.'));return {close(){},retry(){}}}
 let topics=subscriptions.get(client);if(!topics){topics=new Map();subscriptions.set(client,topics)}
 let entry=topics.get(topic);
 if(!entry||entry.closing){
  const previous=entry?.closing;entry={listeners:new Set(),channel:null,status:null,error:null,closing:null,restarting:null,timer:null};topics.set(topic,entry);
  const current=entry;
  function status(value,error=null){current.status=value;current.error=error;for(const listener of [...current.listeners])listener.onStatus(value,error)}
  function start(){
   if(!current.listeners.size||current.closing)return;
   status('CONNECTING');
   try{
    const channel=client.channel(topic,{config:{broadcast:{self:false}}});current.channel=channel;
    current.timer=setTimeout(()=>{if(current.channel===channel&&current.status==='CONNECTING')status('TIMED_OUT',new Error('The live connection did not respond in time.'))},12000);
    for(const event of ['changed','presence','availability','queue'])channel.on('broadcast',{event},()=>{if(current.channel===channel)for(const listener of [...current.listeners])listener.onEvent(event)});
    channel.subscribe((value,error)=>{if(current.channel!==channel||current.closing)return;clearTimeout(current.timer);status(value,error)});
   }catch(error){clearTimeout(current.timer);status('CHANNEL_ERROR',error)}
  }
  current.start=start;
  current.ready=Promise.resolve(previous).then(start);
 }
 const current=entry,listener={onEvent,onStatus};current.listeners.add(listener);
 if(current.status)queueMicrotask(()=>{if(current.listeners.has(listener))onStatus(current.status,current.error)});
 return {retry(){
  if(current.closing||current.restarting||current.status==='CONNECTING'||current.status==='SUBSCRIBED')return current.restarting;
  current.restarting=Promise.resolve(current.ready).then(async()=>{
   const channel=current.channel;current.channel=null;clearTimeout(current.timer);
   current.status='CONNECTING';current.error=null;for(const item of [...current.listeners])item.onStatus(current.status,null);
   if(channel)await client.removeChannel(channel);
   current.start();
  }).catch(error=>{current.status='CHANNEL_ERROR';current.error=error;for(const item of [...current.listeners])item.onStatus(current.status,error)}).finally(()=>{current.restarting=null});
  return current.restarting;
 },close(){
  current.listeners.delete(listener);if(current.listeners.size||current.closing)return;
  clearTimeout(current.timer);current.closing=Promise.resolve(current.restarting||current.ready).then(()=>current.channel?client.removeChannel(current.channel):undefined).catch(()=>{}).finally(()=>{if(topics.get(topic)===current)topics.delete(topic)});
 }};
}

export function createLiveRoom({client,doc,id,token=null,staff=false,onChange,onConnection=()=>{}}){
 const win=doc.defaultView;let closed=false,connected=false,running=false,again=false,changeTimer,idleTimer,typingAt=0,lastActivity=0;
 async function refresh(){if(closed)return;if(running){again=true;return}running=true;try{await onChange()}finally{running=false;if(again&&!closed){again=false;await refresh()}}}
 function changed(){if(closed)return;win.clearTimeout(changeTimer);changeTimer=win.setTimeout(()=>refresh().catch(()=>{}),25)}
 async function activity(typing=null){
  if(closed||doc.hidden)return;const result=await client.rpc('gary_chat_activity',{p_conversation_id:id,p_token:token,p_typing:typing});if(result.error)throw result.error;lastActivity=Date.now();
 }
 const subscription=listen(client,`gary-chat:${id}`,event=>{if(event==='changed'||event==='presence')changed()},(status,error)=>{
   if(closed)return;connected=status==='SUBSCRIBED';onConnection(connected,{status,error});if(connected){changed();activity().catch(()=>{})}
 });
 const heartbeat=win.setInterval(()=>{if(!doc.hidden&&!staff&&Date.now()-lastActivity>18000)activity().catch(()=>{})},20000);
 // HTTP catch-up runs only while the socket is reconnecting, not on the normal
 // delivery path. A reconnect also reads the durable history to fill any gap.
 const recovery=win.setInterval(()=>{if(!connected&&!doc.hidden)changed()},15000);
 const visibility=()=>{if(!doc.hidden){changed();activity().catch(()=>{})}else stopTyping()};doc.addEventListener('visibilitychange',visibility);
 function typing(value){if(closed)return;if(!value){stopTyping();return}win.clearTimeout(idleTimer);if(Date.now()-typingAt>2000){typingAt=Date.now();activity(true).catch(()=>{})}idleTimer=win.setTimeout(stopTyping,1800)}
 function stopTyping(){win.clearTimeout(idleTimer);if(!closed&&typingAt){typingAt=0;activity(false).catch(()=>{})}}
 function close(){if(closed)return;stopTyping();closed=true;win.clearTimeout(changeTimer);win.clearInterval(heartbeat);win.clearInterval(recovery);doc.removeEventListener('visibilitychange',visibility);subscription.close()}
 return {typing,stopTyping,close,refresh};
}

export function createSupportWatch({client,doc,onHealth,onQueue=()=>{},onConnection=()=>{}}){
 const win=doc.defaultView;let closed=false,timer,expiryTimer,reading=false,again=false;
 async function refresh(){
  if(closed)return;if(reading){again=true;return}reading=true;
  try{const result=await client.rpc('gary_live_chat_health');if(closed)return;if(result.error)throw result.error;onHealth(result.data);win.clearTimeout(expiryTimer);if(result.data?.available_until){const delay=new Date(result.data.available_until)-new Date(result.data.server_time);expiryTimer=win.setTimeout(()=>refresh().catch(()=>{}),Math.max(1000,Math.min(46000,delay+200)))}}
  finally{reading=false;if(again&&!closed){again=false;refresh().catch(()=>{})}}
 }
 function schedule(){win.clearTimeout(timer);timer=win.setTimeout(()=>refresh().catch(()=>{}),60)}
 const subscription=listen(client,'gary-support:v2',event=>{if(closed)return;if(event==='availability')schedule();else if(event==='queue')onQueue()},(status,error)=>{if(!closed){onConnection(status==='SUBSCRIBED',{status,error});if(status==='SUBSCRIBED')schedule()}});
 const visible=()=>{if(!doc.hidden)schedule()};doc.addEventListener('visibilitychange',visible);
 return {refresh,retry(){return subscription.retry()},close(){closed=true;win.clearTimeout(timer);win.clearTimeout(expiryTimer);doc.removeEventListener('visibilitychange',visible);subscription.close()}};
}

export function liveTimeLeft(until,serverTime){return until?Math.max(0,new Date(until)-new Date(serverTime||Date.now())):0}
export function isChatSetupError(error){return ['PGRST202','PGRST205','42P01','42883'].includes(error?.code)}
