import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {createProfileAvatar} from '../dist/profile-avatar.js';
import {portalCopy} from '../dist/portal-copy.js';

const html = await readFile(new URL('../dist/portal.html', import.meta.url), 'utf8');
const owner = '80000000-0000-4000-8000-000000000001';
const tick = () => new Promise(resolve => setImmediate(resolve));

function fixture(existing) {
 const {window} = new JSDOM(html, {url: 'https://visa.example.test/portal.html'});
 const doc = window.document, get = id => doc.getElementById(id);
 const calls = [], notices = [], draws = [], revoked = [];
 const fileInput = get('profile-avatar-file'), canvas = get('profile-avatar-canvas');
 let url = 0, uploadError = null;
 window.URL.createObjectURL = () => `blob:https://visa.example.test/${++url}`;
 window.URL.revokeObjectURL = value => revoked.push(value);
 window.Image = class { naturalWidth = 800; naturalHeight = 400; async decode() {} };
 canvas.getContext = () => ({clearRect() {}, drawImage(image, ...crop) { draws.push(crop); }});
 canvas.toBlob = callback => callback(new window.Blob(['cropped image'], {type: 'image/webp'}));
 const db = {
  storage: {from(bucket) {
   assert.equal(bucket, 'gary-visa-avatars');
   return {async download(path) {
    assert.equal(path, `${owner}/avatar`);
    return {data: existing ? new window.Blob(['current photo'], {type: 'image/png'}) : null};
   }};
  }},
  functions: {async invoke(name, options) {
   assert.equal(name, 'visa-profile-avatar');
   calls.push(options);
   return uploadError ? {error: uploadError} : {data: {ok: true}};
  }},
 };
 const controller = createProfileAvatar({db, doc, name: () => 'Nguyễn Mai Ly', t: key => portalCopy[doc.documentElement.lang][key], notify: key => notices.push(key)});
 const choose = async (type, size=200, name='photo.png') => {
  Object.defineProperty(fileInput,'files',{configurable:true,value:[{type,size,name}]});
  fileInput.dispatchEvent(new window.Event('change'));
  await tick();
 };
 const picture = id => get(id).querySelector('img')?.src;
 const click = async id => { get(id).click(); await tick(); };
 return {window, doc, get, controller, calls, notices, draws, revoked, choose, picture, click, fail: status => { uploadError = {context: {status}}; }};
}

test('account pictures preview a square crop and update both profile and sidebar only after a confirmed write', async () => {
 const h = fixture(false);
 try {
  await h.controller.load(owner);
  assert.equal(h.get('profile-avatar').textContent,'NL');
  await h.choose('image/png');
  assert.equal(h.get('profile-avatar-preview').hidden, false);
  assert.deepEqual(h.draws.at(-1), [200,0,400,400,0,0,384,384]);
  const zoom = h.get('profile-avatar-zoom');
  zoom.value = '2';
  zoom.dispatchEvent(new h.window.Event('input'));
  assert.deepEqual(h.draws.at(-1), [300,100,200,200,0,0,384,384]);
  assert.equal(h.calls.length, 0);
  await h.click('profile-avatar-save');
  assert.deepEqual(h.calls[0].headers, {'x-visa-avatar-owner':owner,'Content-Type':'image/webp'});
  assert.equal(h.picture('profile-avatar'), h.picture('user-avatar'));
  assert.ok(h.picture('profile-avatar')?.startsWith('blob:'));
  assert.equal(h.get('profile-avatar-preview').hidden,true);
  assert.deepEqual(h.notices,['avatarSaved']);
 } finally { h.window.close(); }
});

test('existing pictures can be replaced and removed, releasing old object URLs and restoring initials', async () => {
 const h = fixture(true);
 try {
  await h.controller.load(owner);
  const original = h.picture('profile-avatar');
  assert.ok(original);
  await h.choose('image/jpeg');
  await h.click('profile-avatar-save');
  const replacement = h.picture('profile-avatar');
  assert.notEqual(replacement,original);
  assert.ok(h.revoked.includes(original));
  await h.click('profile-avatar-remove');
  assert.deepEqual(h.calls.at(-1), {method:'DELETE',headers:{'x-visa-avatar-owner':owner}});
  assert.ok(h.revoked.includes(replacement));
  assert.equal(h.picture('user-avatar'),undefined);
  assert.equal(h.get('user-avatar').textContent,'NL');
  assert.equal(h.get('profile-avatar-remove').hidden,true);
  assert.deepEqual(h.notices,['avatarSaved','avatarRemoved']);
 } finally { h.window.close(); }
});

test('invalid formats and oversized files stay local and a server rejection preserves the preview in either language', async () => {
 const h = fixture(false);
 try {
  await h.controller.load(owner);
  const notice = h.get('profile-avatar-feedback');
  await h.choose('image/gif');
  assert.equal(notice.textContent, portalCopy.en.avatarType);
  await h.choose('image/webp',5*1024*1024+1);
  assert.equal(notice.textContent, portalCopy.en.avatarSize);
  assert.equal(h.calls.length,0);
  h.doc.documentElement.lang = 'vi';
  h.fail(415);
  await h.choose('image/webp');
  await h.click('profile-avatar-save');
  assert.equal(notice.textContent, portalCopy.vi.avatarType);
  assert.equal(h.get('profile-avatar-preview').hidden,false);
  assert.deepEqual(h.notices,[]);
  h.controller.reset();
  assert.equal(h.get('profile-avatar-preview').hidden,true);
  assert.equal(h.get('profile-avatar-file').disabled,true);
 } finally { h.window.close(); }
});
