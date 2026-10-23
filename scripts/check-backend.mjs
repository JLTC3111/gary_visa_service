import {config} from '../dist/config.js';
const headers={apikey:config.supabasePublishableKey};
const results=[];
async function request(path,options={}){try{const response=await fetch(config.supabaseUrl+path,{...options,headers:{...headers,...options.headers},signal:AbortSignal.timeout(15000)});const body=await response.json().catch(()=>({}));return {status:response.status,body}}catch(error){return {status:0,body:{code:error.name}}}}
const names=['gary_profiles','gary_applications','gary_application_events','gary_messages','gary_staff_notes','gary_documents','gary_crm_contacts','gary_crm_notes','gary_crm_events','gary_chat_conversations','gary_chat_messages'];
const [settings,...responses]=await Promise.all([request('/auth/v1/settings'),...names.map(name=>request(`/rest/v1/${name}?select=id&limit=0`))]);
console.log(`Auth API: ${settings.status||'unreachable'}`);
if(settings.status===200)console.log(`Email login: ${settings.body.external?.email?'enabled':'disabled'}; email confirmation: ${settings.body.mailer_autoconfirm?'disabled':'enabled'}`);
for(let index=0;index<names.length;index++){const name=names[index],{status,body}=responses[index];const missing=body.code==='PGRST205'||body.code==='42P01';const protectedTable=body.code==='42501';results.push({name,status,missing,verified:missing||protectedTable||status===200});console.log(`${name}: ${missing?'not installed':protectedTable?'installed; signed-out access denied':status===200?'reachable; returned no rows':`unverified (${status||body.code})`}`)}
// A nonexistent conversation cannot authorize a read or change a read marker.
const chat=await request('/rest/v1/rpc/gary_read_chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({p_conversation_id:'00000000-0000-0000-0000-000000000000',p_mark_read:false})});
const chatMissing=chat.body.code==='PGRST202',chatVerified=chat.body.code==='42501';console.log(`Chat API: ${chatMissing?'not installed':chatVerified?'installed; unknown conversation denied':`unverified (${chat.status||chat.body.code})`}`);
const live=await request('/rest/v1/rpc/gary_live_chat_health',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
const liveReady=live.status===200&&live.body.version===2&&live.body.ready===true,liveMissing=live.body.code==='PGRST202'||live.body.ready===false;console.log(`Live chat: ${liveReady?'ready; staff '+(live.body.available_until?'online':'away'):liveMissing?'not installed or incomplete':`unverified (${live.status||live.body.code})`}`);
const missing=results.filter(item=>item.missing);if(missing.length||chatMissing||liveMissing){console.log('Live chat setup is pending. On the existing portal database, run supabase/install-live-chat.sql in the project SQL editor.');process.exitCode=2}else if(settings.status!==200||results.some(item=>!item.verified)||!chatVerified||!liveReady){process.exitCode=1}
