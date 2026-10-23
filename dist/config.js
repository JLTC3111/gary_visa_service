// Publishable client configuration. These values are intentionally public.
// Authorization is enforced by Supabase Auth, database RLS and private storage policies.
export const config = Object.freeze({
  supabaseUrl: 'https://duyiihsmaqfgwezmsnjs.supabase.co',
  supabasePublishableKey: 'sb_publishable_gvmM9ng8dqbW0MESrN7zlA_8VrahsP8',
  documentBucket: 'gary-documents',
  maxDocumentBytes: 10 * 1024 * 1024
});
