import {createClient} from './vendor/supabase.js';
import {config} from './config.js';
export const db=createClient(config.supabaseUrl,config.supabasePublishableKey,{
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
export function unwrap(result){if(result.error)throw result.error;return result.data}
export const authRedirect=()=>new URL('./portal.html',location.href).href;
export async function ensureProfile(user){
  let profile=unwrap(await db.from('gary_profiles').select('*').eq('id',user.id).maybeSingle());
  if(profile)return profile;
  const result=await db.from('gary_profiles').insert({id:user.id,full_name:String(user.user_metadata?.full_name??'').slice(0,100),contact_email:user.email??''}).select().single();
  if(result.error?.code==='23505')return unwrap(await db.from('gary_profiles').select('*').eq('id',user.id).single());
  return unwrap(result);
}
