import {createProfilePhotoHandler} from '../_shared/profile-photo-handler.mjs';

function apiKey(dictionary: string, legacy: string) {
  const keys = JSON.parse(Deno.env.get(dictionary) ?? '{}');
  return keys.default || Deno.env.get(legacy);
}

const url = Deno.env.get('SUPABASE_URL');
const publishableKey = apiKey('SUPABASE_PUBLISHABLE_KEYS', 'SUPABASE_ANON_KEY');
const serviceKey = apiKey('SUPABASE_SECRET_KEYS', 'SUPABASE_SERVICE_ROLE_KEY');
if (!url || !publishableKey || !serviceKey) throw new Error('Profile avatar service is not configured');

Deno.serve(createProfilePhotoHandler({
  app: 'visa', url, publishableKey, serviceKey, ownerHeader: 'x-visa-avatar-owner',
  cleanupKey: Deno.env.get('PROFILE_AVATAR_CLEANUP_KEY'),
}));
