import {createClient} from './vendor/supabase.js';
import {config} from './config.js';
// Observe only this app's data/Storage denials; Auth login failures are unrelated.
async function permissionFetch(input,options){
 const response=await globalThis.fetch(input,options);
 const url=new URL(typeof input==='string'?input:input.url,config.supabaseUrl);
 if([401,403].includes(response.status)&&url.origin===new URL(config.supabaseUrl).origin&&/^\/(rest|storage)\/v1\//.test(url.pathname))globalThis.dispatchEvent?.(new Event('gary:access-denied'));
 return response;
}
export const db=createClient(config.supabaseUrl,config.supabasePublishableKey,{
  global:{fetch:permissionFetch},
  auth:{storageKey:'gary-agency-auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}
});
export const APPLICATION_STATUSES=['submitted','in_review','documents_needed','processing','completed','cancelled'];
export const SERVICE_TYPES=['visa','work','residence','documents'];
export const EDITABLE_STATUSES=['submitted','documents_needed'];
export const ALLOWED_DOCUMENT_TYPES={'application/pdf':'pdf','image/jpeg':'jpg','image/png':'png','image/webp':'webp'};
export function validateDocument(file){
  if(!file||!ALLOWED_DOCUMENT_TYPES[file.type])throw new Error('documentType');
  if(file.size<=0||file.size>config.maxDocumentBytes)throw new Error('documentSize');
}
export function documentPath(applicationId,userId,file){validateDocument(file);return `${applicationId}/${userId}/${crypto.randomUUID()}.${ALLOWED_DOCUMENT_TYPES[file.type]}`}
export function unwrap(result){if(result.error){if(result.error.code==='42501'||[401,403].includes(result.error.status))globalThis.dispatchEvent?.(new Event('gary:access-denied'));throw result.error}return result.data}
export const authRedirect=()=>new URL('./portal.html',location.href).href;
export async function ensureProfile(user){
  let profile=unwrap(await db.from('gary_profiles').select('*').eq('id',user.id).maybeSingle());
  if(profile)return profile;
  const result=await db.from('gary_profiles').insert({id:user.id,full_name:String(user.user_metadata?.full_name??'').slice(0,100),contact_email:user.email??''}).select().single();
  if(result.error?.code==='23505')return unwrap(await db.from('gary_profiles').select('*').eq('id',user.id).single());
  return unwrap(result);
}
