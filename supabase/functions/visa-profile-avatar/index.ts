import {createAvatarHandler} from './handler.ts';

function apiKey(dictionary: string, legacy: string) {
  const keys = JSON.parse(Deno.env.get(dictionary) ?? '{}');
  return keys.default || Deno.env.get(legacy);
}

const url = Deno.env.get('SUPABASE_URL');
const anonKey = apiKey('SUPABASE_PUBLISHABLE_KEYS', 'SUPABASE_ANON_KEY');
const serviceKey = apiKey('SUPABASE_SECRET_KEYS', 'SUPABASE_SERVICE_ROLE_KEY');
if (!url || !anonKey || !serviceKey) throw new Error('Visa avatar service is not configured');

const bucketUrl = `${url}/storage/v1/object/gary-visa-avatars`;
const writerHeaders: Record<string, string> = {apikey: serviceKey};
if (!serviceKey.startsWith('sb_secret_')) writerHeaders.Authorization = `Bearer ${serviceKey}`;

Deno.serve(createAvatarHandler({
  async authenticate(token) {
    const response = await fetch(`${url}/auth/v1/user`, {
      headers: {apikey: anonKey, Authorization: `Bearer ${token}`},
    });
    if (response.status === 401 || response.status === 403 || response.status === 404) return null;
    if (!response.ok) throw new Error('Auth request failed');
    return response.json();
  },
  async upload(path, bytes, mime) {
    const response = await fetch(`${bucketUrl}/${path}`, {
      method: 'POST',
      headers: {...writerHeaders, 'Content-Type': mime, 'Cache-Control': 'max-age=0', 'x-upsert': 'true'},
      body: bytes,
    });
    if (!response.ok) throw new Error('Avatar upload failed');
  },
  async remove(path) {
    const response = await fetch(bucketUrl, {
      method: 'DELETE',
      headers: {...writerHeaders, 'Content-Type': 'application/json'},
      body: JSON.stringify({prefixes: [path]}),
    });
    if (!response.ok) throw new Error('Avatar removal failed');
  },
}));
