import assert from 'node:assert/strict';
import {createProfilePhotoHandler, isAvatarWebp} from '../supabase/functions/_shared/profile-photo-handler.mjs';

const origin = 'https://profile-photo.test';
const owner = '90000000-0000-4000-8000-000000000001';
const other = '90000000-0000-4000-8000-000000000002';
const legacy = `${owner}/avatar`;
const webp = Uint8Array.from(atob('UklGRjwAAABXRUJQVlA4IDAAAADQAQCdASoQABAAAMAWJaACdLoB+AADsAD+8ut//cHHsHHsHH71v/z8zu3F/OYAAAA='), c => c.charCodeAt(0));
const oversized = Uint8Array.from(atob('UklGRlgAAABXRUJQVlA4IEwAAADQBACdASoBAhAAPj0ejkUiIaEQhAAgA8S0gDsAfgAACLUSrzW19OnTp06dOnTo4AD+8LA3//6gz5BnyDP1Uv//kF6t82xoAAAAAAAA'), c => c.charCodeAt(0));

type Reference = {version: string; path: string | null};
type Upload = {owner: string; path: string; state: string; remove: boolean; due: boolean; token?: string};

function fixture(app = 'visa') {
  const reference = new Map<string, Reference>();
  const uploads = new Map<string, Upload>();
  const stored = new Map<string, string>([[legacy, 'legacy'], ['unrelated', 'unknown']]);
  const held = new Set<string>(), deleted: string[] = [], effects: string[] = [];
  const tasks: Promise<unknown>[] = [];
  const end = {
    uploadFails: false,
    saveFails: false,
    responseLost: false,
    deleteFails: false,
    finishFails: false,
    staff: true,
    beforeSave: null as null | (() => Promise<void>),
  };
  const validMarker = (id: string, userId: string) => JSON.stringify({app, owner: userId, id});
  const fetcher: typeof fetch = async (input, init = {}) => {
    const url = input instanceof Request ? input.url : String(input);
    const path = new URL(url).pathname, headers = new Headers(init.headers);
    const body = () => JSON.parse(String(init.body));
    assert.equal(new URL(url).origin, origin);
    if (path === '/auth/v1/user') {
      if (headers.get('authorization') === 'Bearer bad') return new Response(null, {status: 401});
      if (headers.get('authorization') === 'Bearer anonymous') return Response.json({id: owner, is_anonymous: true});
      return Response.json({id: headers.get('authorization') === 'Bearer other' ? other : owner});
    }
    if (path === '/rest/v1/rpc/get_staff_profile') return Response.json(end.staff ? {user_id: owner} : null);
    if (path === `/rest/v1/${app}_avatar_profiles`) return Response.json([...reference.values()]);
    if (path === `/rest/v1/rpc/${app}_avatar_maintenance`) {
      assert.equal(headers.get('apikey'), 'sb_secret_test');
      const {p_action, p_owner, p_id, p_remove, p_token} = body();
      if (p_action === 'reserve') {
        const path = `${p_owner}/${p_id}.webp`;
        effects.push('reserve');
        uploads.set(p_id, {owner: p_owner, path, state: 'pending', remove: p_remove, due: false});
        return Response.json({id: p_id, path});
      }
      if (p_action === 'abandon') {
        const upload = uploads.get(p_id);
        if (upload?.state === 'pending') upload.state = 'retired';
        return Response.json(null);
      }
      if (p_action === 'claim') {
        const claims = [];
        for (const [id, upload] of uploads) {
          if (!upload.due || upload.remove || upload.state === 'active' || (p_owner && p_owner !== upload.owner)) continue;
          if (held.has(upload.path) || reference.get(upload.owner)?.path === upload.path) continue;
          if (stored.get(upload.path) !== validMarker(id, upload.owner) && !(upload.state === 'deleting' && !stored.has(upload.path))) continue;
          upload.token = crypto.randomUUID();
          upload.state = 'deleting';
          upload.due = false;
          claims.push({id, path: upload.path, cleanup_token: upload.token, remove_object: stored.has(upload.path)});
        }
        return Response.json(claims);
      }
      if (p_action === 'finish') {
        if (end.finishFails) return new Response(null, {status: 503});
        const upload = uploads.get(p_id);
        assert.equal(upload?.token, p_token);
        assert.equal(stored.has(upload!.path), false);
        uploads.delete(p_id);
        return Response.json(true);
      }
    }
    if (path === `/rest/v1/rpc/${app}_avatar_save`) {
      assert.equal(headers.get('apikey'), 'publishable');
      const {p_id, p_expected} = body();
      const upload = uploads.get(p_id)!;
      const gate = end.beforeSave;
      end.beforeSave = null;
      if (gate) await gate();
      const previous = reference.get(upload.owner);
      if ((previous?.version ?? null) !== p_expected) return new Response(null, {status: 409});
      if (end.saveFails) return new Response(null, {status: 503});
      if (!upload.remove) assert.equal(stored.get(upload.path), validMarker(p_id, upload.owner));
      const next = {version: p_id, path: upload.remove ? null : upload.path};
      reference.set(upload.owner, next);
      upload.state = 'active';
      const old = uploads.get(previous?.version || '');
      if (old) {old.state = 'retired'; old.due = true;}
      effects.push('active');
      if (end.responseLost) throw new Error('Response interrupted');
      return Response.json({ok: true, ...next});
    }
    const bucket = `/storage/v1/object/gary-${app}-profile-photos`;
    assert.equal(headers.get('apikey'), 'sb_secret_test');
    if (path.startsWith(bucket + '/') && init.method === 'POST') {
      assert.deepEqual(init.body, webp);
      assert.equal(headers.get('x-upsert'), 'false');
      const id = path.slice(-41, -5), upload = uploads.get(id)!;
      const metadata = JSON.parse(atob(headers.get('x-metadata')!));
      assert.equal(JSON.stringify(metadata.profileAvatar), validMarker(id, upload.owner));
      stored.set(upload.path, JSON.stringify(metadata.profileAvatar));
      effects.push('upload');
      if (end.uploadFails) throw new Error('Upload response interrupted');
      return Response.json({ok: true});
    }
    if (path === bucket && init.method === 'DELETE') {
      if (end.deleteFails) return new Response(null, {status: 503});
      for (const path of body().prefixes) {
        assert.equal([...reference.values()].some(item => item.path === path), false);
        deleted.push(path);
        stored.delete(path);
        effects.push('delete');
      }
      return Response.json([]);
    }
    throw new Error('Unexpected fixture request');
  };
  const handler = createProfilePhotoHandler({
    app, url: origin, publishableKey: 'publishable', serviceKey: 'sb_secret_test',
    cleanupKey: 'cleanup-test', ownerHeader: 'x-avatar-owner', fetcher,
    defer: task => { tasks.push(task); },
  });
  const request = ({
    method = 'POST', version = reference.get(owner)?.version ?? 'none', actor = 'verified',
    target = owner, bytes = webp, mime = 'image/webp',
  } = {}) => handler(new Request(origin, {
    method, headers: {
      authorization: `Bearer ${actor}`, 'x-avatar-owner': target,
      'x-avatar-version': version, 'content-type': mime,
    }, body: method === 'POST' ? bytes : undefined,
  }));
  return {
    end, request, uploads, stored, held, deleted, effects, reference,
    cleanup: (key = 'cleanup-test') => handler(new Request(origin + '?cleanup', {method: 'POST', headers: {'x-avatar-cleanup-key': key}})),
    settle: async () => { await Promise.all(tasks.splice(0)); },
    retry: () => {for (const upload of uploads.values()) upload.due = true;},
  };
}

Deno.test('optimized WebP validation checks dimensions, size and container metadata', async () => {
  assert.equal(isAvatarWebp(webp), true);
  assert.equal(isAvatarWebp(oversized), false);
  const withExif = new Uint8Array(webp.length + 10);
  withExif.set(webp);
  withExif.set([69,88,73,70,2,0,0,0,1,2], webp.length);
  new DataView(withExif.buffer).setUint32(4, withExif.length - 8, true);
  assert.equal(isAvatarWebp(withExif), false);
  const h = fixture();
  assert.equal((await h.request({bytes: oversized})).status, 415);
  assert.equal((await h.request({bytes: withExif})).status, 415);
  assert.equal((await h.request({mime: 'image/png'})).status, 415);
  assert.equal((await h.request({bytes: new Uint8Array(102401)})).status, 413);
  assert.deepEqual(h.effects, []);
});

Deno.test('all apps verify the actual actor and Home still requires staff eligibility', async () => {
  for (const app of ['home', 'visa', 'jobs']) {
    const h = fixture(app);
    assert.equal((await h.request({actor: 'bad'})).status, 401);
    assert.equal((await h.request({actor: 'anonymous'})).status, 401);
    assert.equal((await h.request({actor: 'other'})).status, 403);
    assert.equal((await h.request({target: other, method: 'DELETE'})).status, 403);
    assert.equal((await h.cleanup('invalid')).status, 403);
    assert.deepEqual(h.effects, []);
  }
  const h = fixture('home');
  h.end.staff = false;
  assert.equal((await h.request()).status, 403);
  assert.deepEqual(h.effects, []);
});

Deno.test('replacement and removal publish first and retain uncertain legacy objects', async () => {
  for (const app of ['home', 'visa', 'jobs']) {
    const h = fixture(app);
    const first = await (await h.request()).json();
    await h.settle();
    const next = await (await h.request()).json();
    await h.settle();
    assert.notEqual(first.path, next.path);
    assert.deepEqual(h.effects, ['reserve', 'upload', 'active', 'reserve', 'upload', 'active', 'delete']);
    const removal = await (await h.request({method: 'DELETE'})).json();
    await h.settle();
    assert.equal(removal.path, null);
    assert.deepEqual(h.deleted, [first.path, next.path]);
    assert.equal(h.stored.get(legacy), 'legacy');
    assert.equal(h.stored.get('unrelated'), 'unknown');
  }
});

Deno.test('failed or interrupted uploads and failed commits retain the active file and can be reclaimed', async () => {
  const h = fixture();
  const first = await (await h.request()).json();
  await h.settle();
  h.end.uploadFails = true;
  assert.equal((await h.request()).status, 502);
  h.end.uploadFails = false;
  h.end.saveFails = true;
  assert.equal((await h.request()).status, 502);
  assert.deepEqual(h.reference.get(owner), {version: first.version, path: first.path});
  assert.deepEqual(h.deleted, []);
  h.retry();
  assert.equal((await h.cleanup()).status, 200);
  assert.equal(h.deleted.length, 2);
  assert.equal(h.stored.has(first.path), true);
});

Deno.test('a competing stale replacement cannot overwrite the winner and a lost response is reconciled', async () => {
  const h = fixture('jobs');
  const started = Promise.withResolvers<void>(), release = Promise.withResolvers<void>();
  h.end.beforeSave = async () => {started.resolve(); await release.promise;};
  const stale = h.request();
  await started.promise;
  h.end.responseLost = true;
  const winner = await (await h.request()).json();
  assert.equal(winner.ok, true);
  release.resolve();
  assert.equal((await stale).status, 409);
  await h.settle();
  h.retry();
  assert.equal((await h.cleanup()).status, 200);
  assert.equal(h.deleted.length, 1);
  assert.equal(h.stored.has(winner.path), true);
});

Deno.test('cleanup respects reference and ownership holds and retries both Storage and acknowledgement failures', async () => {
  const h = fixture('home');
  const first = await (await h.request()).json();
  await h.settle();
  h.held.add(first.path);
  const next = await (await h.request()).json();
  await h.settle();
  assert.equal(h.stored.has(first.path), true);
  h.held.delete(first.path);
  const marker = h.stored.get(first.path)!;
  h.stored.set(first.path, 'unknown');
  assert.equal((await h.cleanup()).status, 200);
  assert.equal(h.stored.has(first.path), true);
  h.stored.set(first.path, marker);
  h.end.deleteFails = true;
  assert.equal((await h.cleanup()).status, 502);
  assert.equal(h.stored.has(first.path), true);
  h.end.deleteFails = false;
  h.end.finishFails = true;
  h.retry();
  assert.equal((await h.cleanup()).status, 502);
  assert.equal(h.stored.has(first.path), false);
  h.end.finishFails = false;
  h.retry();
  assert.equal((await h.cleanup()).status, 200);
  assert.deepEqual(h.deleted, [first.path]);
  assert.equal(h.uploads.has(first.version), false);
  assert.equal(h.stored.has(next.path), true);
});
