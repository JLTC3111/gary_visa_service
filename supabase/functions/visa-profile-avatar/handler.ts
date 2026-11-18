const maxBytes = 5 * 1024 * 1024;
const mimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type, x-visa-avatar-owner',
  'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
};

type Services = {
  authenticate(token: string): Promise<{id: string; is_anonymous?: boolean} | null>;
  upload(path: string, bytes: Uint8Array, mime: string): Promise<void>;
  remove(path: string): Promise<void>;
};

function detectedType(bytes: Uint8Array) {
  const tag = (offset: number, text: string) => [...text].every((char, i) => bytes[offset + i] === char.charCodeAt(0));
  if (bytes.length >= 24 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte) && tag(12, 'IHDR')) return 'image/png';
  if (bytes.length > 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 &&
      bytes.at(-2) === 255 && bytes.at(-1) === 217) return 'image/jpeg';
  if (bytes.length >= 20 && tag(0, 'RIFF') && tag(8, 'WEBP') &&
      ['VP8 ', 'VP8L', 'VP8X'].some(chunk => tag(12, chunk)) &&
      new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(4, true) === bytes.length - 8) return 'image/webp';
  return '';
}

async function readImage(request: Request) {
  if (Number(request.headers.get('content-length')) > maxBytes || !request.body) return null;
  const reader = request.body.getReader(), chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const {value, done} = await reader.read();
    if (done) break;
    size += value.length;
    if (size > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  if (!size) return null;
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return bytes;
}

export function createAvatarHandler({authenticate, upload, remove}: Services) {
  const reply = (status: number, error?: string) => Response.json(error ? {error} : {ok: true}, {status, headers: cors});
  return async (request: Request) => {
    if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers: cors});
    if (request.method !== 'POST' && request.method !== 'DELETE') return reply(405, 'avatarSaveError');
    const token = request.headers.get('authorization')?.match(/^Bearer ([^\s]+)$/i)?.[1];
    if (!token) return reply(401, 'avatarSignIn');
    try {
      const user = await authenticate(token);
      if (!user || user.is_anonymous || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(user.id)) return reply(401, 'avatarSignIn');
      // Bind pending form submissions to the account that opened the profile.
      if (request.headers.get('x-visa-avatar-owner') !== user.id) return reply(403, 'avatarSignIn');
      // Storage paths are derived from the authenticated identity.
      const path = `${user.id}/avatar`;
      if (request.method === 'DELETE') await remove(path);
      else {
        const mime = request.headers.get('content-type')?.toLowerCase();
        if (!mime || !mimeTypes.includes(mime)) return reply(415, 'avatarType');
        const bytes = await readImage(request);
        if (!bytes) return reply(413, 'avatarSize');
        if (detectedType(bytes) !== mime) return reply(415, 'avatarType');
        await upload(path, bytes, mime);
      }
      return reply(200);
    } catch {
      return reply(502, 'avatarSaveError');
    }
  };
}
