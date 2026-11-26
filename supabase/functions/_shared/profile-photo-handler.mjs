const maxBytes = 100 * 1024;
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const photoPath = /^[0-9a-f-]{36}\/[0-9a-f-]{36}\.webp$/;
const timeout = 12_000;

// Inspect the RIFF container independently of the request's declared MIME.
// Only static WebP image data, optional alpha, and the extended header are allowed.
export function isAvatarWebp(bytes) {
  if (bytes.length < 20 || bytes.length > maxBytes) return false;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tag = offset => String.fromCharCode(...bytes.subarray(offset, offset + 4));
  const u24 = offset => view.getUint8(offset) + 256 * view.getUint16(offset + 1, true);
  if (tag(0) !== 'RIFF' || tag(8) !== 'WEBP' || view.getUint32(4, true) !== bytes.length - 8) return false;
  let width, height, canvasWidth, canvasHeight, alpha = false;
  for (let offset = 12; offset < bytes.length;) {
    if (offset + 8 > bytes.length) return false;
    const type = tag(offset), size = view.getUint32(offset + 4, true), start = offset + 8;
    offset = start + size + (size % 2);
    if (offset > bytes.length || width) return false;
    if (type === 'VP8X' && start === 20 && size === 10 && (view.getUint32(start) & 0xefffffff) === 0) {
      canvasWidth = u24(start + 4) + 1;
      canvasHeight = u24(start + 7) + 1;
    } else if (type === 'ALPH' && canvasWidth && !alpha && size >= 1 && (bytes[20] & 0x10)) {
      alpha = true;
    } else if (type === 'VP8 ' && size >= 10 && (bytes[start] & 1) === 0 &&
      bytes[start + 3] === 0x9d && bytes[start + 4] === 1 && bytes[start + 5] === 0x2a) {
      if ((u24(start) >>> 5) > size - 10) return false;
      width = view.getUint16(start + 6, true) & 0x3fff;
      height = view.getUint16(start + 8, true) & 0x3fff;
    } else if (type === 'VP8L' && !alpha && size >= 5 && bytes[start] === 0x2f) {
      const dimensions = view.getUint32(start + 1, true);
      if (dimensions >>> 29) return false;
      width = (dimensions & 0x3fff) + 1;
      height = ((dimensions >>> 14) & 0x3fff) + 1;
    } else {
      return false;
    }
  }
  return width > 0 && height > 0 && width <= 512 && height <= 512 &&
    (!canvasWidth || (canvasWidth === width && canvasHeight === height));
}

async function readBounded(request) {
  if (Number(request.headers.get('content-length')) > maxBytes || !request.body) return null;
  const reader = request.body.getReader();
  const bytes = new Uint8Array(maxBytes);
  let offset = 0;
  for (;;) {
    const {value, done} = await reader.read();
    if (done) return offset ? bytes.subarray(0, offset) : null;
    if (offset + value.length > maxBytes) {
      await reader.cancel();
      return null;
    }
    bytes.set(value, offset);
    offset += value.length;
  }
}

export function createProfilePhotoHandler({
  app, url, publishableKey, serviceKey, cleanupKey, ownerHeader = 'x-avatar-owner',
  fetcher = fetch, defer = task => globalThis.EdgeRuntime?.waitUntil(task),
}) {
  const bucket = `${url}/storage/v1/object/gary-${app}-profile-photos`;
  const system = {apikey: serviceKey};
  if (!serviceKey.startsWith('sb_secret_')) system.Authorization = `Bearer ${serviceKey}`;
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': `authorization, apikey, x-client-info, content-type, x-avatar-version, x-avatar-cleanup-key, ${ownerHeader}`,
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
    'Cache-Control': 'no-store',
  };
  const json = (body, status = 200) => Response.json(body, {status, headers: cors});
  const error = (code, status) => json({error: code}, status);
  const request = (address, init) => fetcher(address, {...init, signal: AbortSignal.timeout(timeout)});
  const rpc = (suffix, body, headers = system) => request(`${url}/rest/v1/rpc/${app}_avatar_${suffix}`, {
    method: 'POST', headers: {...headers, 'Content-Type': 'application/json'}, body: JSON.stringify(body),
  });
  const maintenance = (p_action, fields) => rpc('maintenance', {p_action, ...fields});

  async function reclaim(owner = null) {
    const claimed = await maintenance('claim', {p_owner: owner});
    if (!claimed.ok) throw new Error('Avatar cleanup claim failed');
    const objects = await claimed.json();
    if (!Array.isArray(objects) || objects.length > 8 || objects.some(item =>
      !item || !uuid.test(item.id) || !uuid.test(item.cleanup_token) || !photoPath.test(item.path) ||
      typeof item.remove_object !== 'boolean' ||
      !item.path.endsWith(`/${item.id}.webp`) || (owner && !item.path.startsWith(`${owner}/`)))) {
      throw new Error('Invalid avatar cleanup claim');
    }
    if (objects.length === 0) return {processed: 0};
    const paths = objects.filter(item => item.remove_object).map(item => item.path);
    if (paths.length) {
      const deleted = await request(bucket, {
        method: 'DELETE', headers: {...system, 'Content-Type': 'application/json'},
        body: JSON.stringify({prefixes: paths}),
      });
      if (!deleted.ok && deleted.status !== 404) throw new Error('Avatar removal failed');
    }
    const finished = await Promise.all(objects.map(item =>
      maintenance('finish', {p_id: item.id, p_token: item.cleanup_token})));
    const confirmed = await Promise.all(finished.map(async result => result.ok && await result.json() === true));
    if (confirmed.includes(false)) throw new Error('Avatar deletion could not be confirmed');
    return {processed: objects.length};
  }

  async function confirmed(owner, id, path, headers) {
    const result = await request(`${url}/rest/v1/${app}_avatar_profiles?select=version,path&user_id=eq.${owner}`, {headers});
    if (!result.ok) return false;
    const [current] = await result.json();
    return current?.version === id && current.path === path;
  }

  return async requestIn => {
    if (requestIn.method === 'OPTIONS') return new Response(null, {status: 204, headers: cors});
    if (new URL(requestIn.url).searchParams.has('cleanup')) {
      if (requestIn.method !== 'POST' || !cleanupKey || requestIn.headers.get('x-avatar-cleanup-key') !== cleanupKey) {
        return error('avatarSignIn', 403);
      }
      try { return json(await reclaim()); }
      catch { return error('avatarCleanupError', 502); }
    }
    const removing = requestIn.method === 'DELETE';
    if (!removing && requestIn.method !== 'POST') return error('avatarSaveError', 405);
    const token = requestIn.headers.get('authorization')?.match(/^Bearer ([^\s]+)$/i)?.[1];
    if (!token) return error('avatarSignIn', 401);
    const headers = {apikey: publishableKey, Authorization: `Bearer ${token}`};
    const expected = requestIn.headers.get('x-avatar-version');
    let owner, id;
    try {
      const auth = await request(`${url}/auth/v1/user`, {headers});
      if ([401, 403, 404].includes(auth.status)) return error('avatarSignIn', 401);
      if (!auth.ok) return error('avatarSaveError', 502);
      const user = await auth.json();
      if (!uuid.test(user?.id) || user?.is_anonymous) return error('avatarSignIn', 401);
      if (user.id !== requestIn.headers.get(ownerHeader)) return error('avatarSignIn', 403);
      if (expected !== 'none' && !uuid.test(expected)) return error('avatarConflict', 409);
      owner = user.id;
      if (app === 'home') {
        const profile = await request(`${url}/rest/v1/rpc/get_staff_profile`, {headers});
        if (!profile.ok || (await profile.json())?.user_id !== owner) return error('avatarSignIn', 403);
      }
      let bytes;
      if (!removing) {
        if (requestIn.headers.get('content-type')?.toLowerCase() !== 'image/webp') return error('avatarType', 415);
        bytes = await readBounded(requestIn);
        if (!bytes) return error('avatarSize', 413);
        if (!isAvatarWebp(bytes)) return error('avatarType', 415);
      }

      id = crypto.randomUUID();
      const path = `${owner}/${id}.webp`;
      const reserve = await maintenance('reserve', {p_owner: owner, p_id: id, p_remove: removing});
      if (!reserve.ok || (await reserve.json())?.path !== path) throw new Error('Avatar reservation failed');
      if (!removing) {
        const metadata = btoa(JSON.stringify({profileAvatar: {app, owner, id}}));
        const uploaded = await request(`${bucket}/${path}`, {
          method: 'POST', headers: {...system, 'Content-Type': 'image/webp',
            'Cache-Control': 'max-age=0', 'x-upsert': 'false', 'x-metadata': metadata},
          body: bytes,
        });
        if (!uploaded.ok) throw new Error('Avatar upload failed');
      }
      const next = removing ? null : path;
      const save = await rpc('save', {p_id: id, p_expected: expected === 'none' ? null : expected}, headers)
        .catch(() => null);
      if (save?.status === 409) {
        await maintenance('abandon', {p_owner: owner, p_id: id}).catch(() => {});
        return error('avatarConflict', 409);
      }
      const result = save?.ok ? await save.json().catch(() => null) : null;
      if (!(result?.ok && result.version === id && result.path === next) && !await confirmed(owner, id, next, headers)) {
        throw new Error('Avatar update could not be confirmed');
      }
      // Cleanup has its own durable retry state. It does not govern the save result.
      defer(reclaim(owner).catch(() => {}));
      return json({ok: true, version: id, path: next});
    } catch {
      if (id) await maintenance('abandon', {p_owner: owner, p_id: id}).catch(() => {});
      return error('avatarSaveError', 502);
    }
  };
}
