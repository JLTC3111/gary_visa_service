import {createAvatarHandler} from '../supabase/functions/visa-profile-avatar/handler.ts';

const me = '80000000-0000-4000-8000-000000000001';
const coworker = '80000000-0000-4000-8000-000000000002';
const png = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/8ZkAAAAASUVORK5CYII='), c => c.charCodeAt(0));
const jpeg = await Deno.readFile(new URL('../dist/assets/vietnam-city.jpg', import.meta.url));
const webp = Uint8Array.from(atob('UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQ/Y/+BwAAAA=='), c => c.charCodeAt(0));
const path = (id: string) => `${id}/avatar`;
function equal(actual: unknown, expected: unknown, label = 'value') {
  if (actual !== expected) throw new Error(`${label}: expected ${expected}, received ${actual}`);
}
const sameBytes = (first: Uint8Array | undefined, second: Uint8Array) =>
  first?.length === second.length && first.every((byte, index) => byte === second[index]);

function fixture() {
  const stored = new Map([[path(coworker), {bytes: png, mime: 'image/png'}]]);
  let writes = 0;
  const handler = createAvatarHandler({
    authenticate: async token => token === 'owner' ? {id: me} : token === 'anonymous' ? {id: me, is_anonymous: true} : null,
    upload: async (name, bytes, mime) => { writes++; stored.set(name, {bytes: Uint8Array.from(bytes), mime}); },
    remove: async name => { writes++; stored.delete(name); },
  });
  const send = (body?: Uint8Array<ArrayBuffer>, {mime='image/png', token='owner', owner=me, method='POST', length=''} = {}) => {
    const headers = {'Content-Type': mime, 'x-visa-avatar-owner': owner, ...(token ? {Authorization: `Bearer ${token}`} : {}), ...(length ? {'Content-Length': length} : {})};
    return handler(new Request(`https://visa.example.test/profile?user_id=${coworker}`, {method, headers, body}));
  };
  return {stored, send, writes: () => writes};
}

Deno.test('verified users can upload JPG, PNG, and WebP, replace one object, and remove their own photo', async () => {
  const {stored, send} = fixture();
  for (const [mime, bytes] of [['image/jpeg', jpeg], ['image/png', png], ['image/webp', webp]] as const) {
    const result = await send(bytes, {mime});
    equal(result.status, 200, mime);
    equal((await result.json()).ok, true);
    equal(stored.get(path(me))?.mime, mime);
    equal(sameBytes(stored.get(path(me))?.bytes, bytes), true);
    equal(stored.size, 2);
  }
  equal((await send(undefined, {method: 'DELETE'})).status, 200);
  equal(stored.has(path(me)), false);
  equal(sameBytes(stored.get(path(coworker))?.bytes, png), true);
});

Deno.test('the server rejects unsupported and spoofed types and enforces 5 MiB on streamed bodies', async () => {
  const {send, writes} = fixture();
  equal((await send(png, {mime: 'image/gif'})).status, 415);
  equal((await send(new TextEncoder().encode('<form>not an image</form>'))).status, 415);
  equal((await send(jpeg, {mime: 'image/png'})).status, 415);
  const overLimit = 5 * 1024 * 1024 + 1;
  equal((await send(png, {length: String(overLimit)})).status, 413);
  equal((await send(new Uint8Array(overLimit))).status, 413);
  equal((await send(new Uint8Array())).status, 413);
  equal(writes(), 0);
});

Deno.test('unauthenticated, anonymous, and other-account upload or removal requests never reach Storage', async () => {
  const {send, writes, stored} = fixture();
  for (const token of ['', 'invalid', 'anonymous']) equal((await send(png, {token})).status, 401);
  equal((await send(png, {owner: coworker})).status, 403);
  equal((await send(undefined, {owner: coworker, method: 'DELETE'})).status, 403);
  equal(writes(), 0);
  equal(stored.size, 1);
});
