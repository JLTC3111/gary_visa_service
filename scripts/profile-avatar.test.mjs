import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {createProfileAvatar} from '../dist/profile-avatar.js';
import {portalCopy} from '../dist/portal-copy.js';

const html = await readFile(new URL('../dist/portal.html', import.meta.url), 'utf8');
const owner = '80000000-0000-4000-8000-000000000001';
const revision = '80000000-0000-4000-8000-000000000002';
const removed = '80000000-0000-4000-8000-000000000003';
const tick = () => new Promise(resolve => setImmediate(resolve));

function fixture(existing, {reducedMotion = false} = {}) {
 const {window} = new JSDOM(html, {url: 'https://visa.example.test/portal.html'});
 const doc = window.document, get = id => doc.getElementById(id);
 const calls = [], notices = [], draws = [], revoked = [];
 const fileInput = get('profile-avatar-file'), canvas = get('profile-avatar-canvas');
 let url = 0, uploadError = null, record = null;
 window.matchMedia = () => ({matches: reducedMotion});
 window.URL.createObjectURL = () => `blob:https://visa.example.test/${++url}`;
 window.URL.revokeObjectURL = value => revoked.push(value);
 window.Image = class { naturalWidth = 800; naturalHeight = 400; async decode() {} };
 canvas.getContext = () => ({clearRect() {}, drawImage(image, ...crop) { draws.push(crop); }});
 canvas.toBlob = callback => callback(new window.Blob(['cropped image'], {type: 'image/webp'}));
 const db = {
  from(table) {
   assert.equal(table,'visa_avatar_profiles');
   return {select:()=>({in:async (column,ids)=>{
    assert.equal(column,'user_id');assert.deepEqual(ids,[owner]);
    return {data:record?[record]:[]};
   }})};
  },
  storage: {from(bucket) {
   assert.equal(bucket, record ? 'gary-visa-profile-photos' : 'gary-visa-avatars');
   return {async download(path) {
    assert.equal(path, record?.path || `${owner}/avatar`);
    return {data: existing ? new window.Blob(['current photo'], {type: 'image/png'}) : null};
   }};
  }},
  functions: {async invoke(name, options) {
   assert.equal(name, 'visa-profile-avatar');
   calls.push(options);
   if(uploadError)return {error:uploadError};
   const removing=options.method==='DELETE';
   record={user_id:owner,version:removing?removed:revision,path:removing?null:`${owner}/${revision}.webp`};
   return {data:{ok:true,...record}};
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

function pointer(h, target, type, x, pointerType) {
 const event = new h.window.MouseEvent(type,{button:0,clientX:x,bubbles:true,cancelable:true});
 Object.defineProperties(event,{pointerId:{value:1},pointerType:{value:pointerType},isPrimary:{value:true}});
 target.dispatchEvent(event);
 return event;
}

test('native crop zoom redraws continuously and translated controls stay within the original bounds', async () => {
 const h = fixture(false);
 try {
  await h.controller.load(owner);
  await h.choose('image/png');
  const zoom = h.get('profile-avatar-zoom'), slider = zoom.parentElement;
  assert.deepEqual([zoom.type,zoom.min,zoom.max,zoom.step],['range','1','3','0.05']);
  assert.equal(zoom.labels[0].textContent,'Crop zoom');
  assert.equal(h.get('profile-zoom-out').getAttribute('aria-disabled'),'true');
  const key = new h.window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true});
  zoom.dispatchEvent(key);
  assert.equal(key.defaultPrevented,false);
  for(const value of ['1.25','1.75','2.5']){
   zoom.value=value;
   zoom.dispatchEvent(new h.window.Event('input'));
   const side=400/Number(value);
   assert.deepEqual(h.draws.at(-1),[(800-side)/2,(400-side)/2,side,side,0,0,Math.floor(side),Math.floor(side)]);
  }
  assert.equal(slider.style.getPropertyValue('--visa-zoom-fill'),'75%');
  assert.equal(zoom.getAttribute('aria-valuetext'),'250%');
  assert.equal(h.get('profile-zoom-value').textContent,'250%');
  h.doc.documentElement.lang='vi';h.controller.render();
  assert.equal(h.get('profile-zoom-out').getAttribute('aria-label'),portalCopy.vi.avatarZoomOut);
  assert.equal(h.get('profile-zoom-in').getAttribute('aria-label'),portalCopy.vi.avatarZoomIn);
  await h.click('profile-zoom-out');assert.equal(zoom.value,'2.45');
  zoom.value='2.95';zoom.dispatchEvent(new h.window.Event('input'));
  await h.click('profile-zoom-in');await h.click('profile-zoom-in');
  assert.equal(zoom.value,'3');assert.equal(h.get('profile-zoom-in').getAttribute('aria-disabled'),'true');
  zoom.value='1.05';zoom.dispatchEvent(new h.window.Event('input'));
  await h.click('profile-zoom-out');await h.click('profile-zoom-out');
  assert.equal(zoom.value,'1');assert.deepEqual(h.draws.at(-1),[200,0,400,400,0,0,400,400]);
 } finally { h.window.close(); }
});

test('mouse and touch overshoot stretches only the visible track and returns on release', async () => {
 const h = fixture(false);
 try {
  await h.controller.load(owner);await h.choose('image/webp');
  const zoom=h.get('profile-avatar-zoom'),slider=zoom.parentElement;
  zoom.getBoundingClientRect=()=>({left:50,right:170,width:120});
  for(const [value,inside,outside,anchor,type,event] of [
   ['1',55,5,'right','mouse','pointerup'],
   ['3',165,250,'left','touch','pointercancel']
  ]){
   zoom.value=value;zoom.dispatchEvent(new h.window.Event('input'));
   const count=h.draws.length;
   assert.equal(pointer(h,zoom,'pointerdown',inside,type).defaultPrevented,false);
   assert.equal(pointer(h,h.window,'pointermove',outside,type).defaultPrevented,false);
   const stretch=Number(slider.style.getPropertyValue('--visa-zoom-stretch'));
   assert.ok(stretch>1&&stretch<1+5/104);
   assert.equal(slider.style.getPropertyValue('--visa-zoom-anchor'),anchor);
   assert.equal(zoom.value,value);assert.equal(h.draws.length,count);
   pointer(h,h.window,event,outside,type);
   assert.equal(slider.hasAttribute('data-zoom-dragging'),false);
   assert.equal(slider.style.getPropertyValue('--visa-zoom-stretch'),'');
  }
 } finally { h.window.close(); }
});

test('reduced motion skips elastic stretch and the compact slider preserves a 44px touch area', async () => {
 const h = fixture(false,{reducedMotion:true});
 try {
  await h.controller.load(owner);await h.choose('image/png');
  const zoom=h.get('profile-avatar-zoom'),slider=zoom.parentElement;
  zoom.getBoundingClientRect=()=>({left:50,right:170,width:120});
  pointer(h,zoom,'pointerdown',54,'touch');pointer(h,h.window,'pointermove',1,'touch');
  assert.equal(slider.style.getPropertyValue('--visa-zoom-stretch'),'');
  assert.equal(slider.hasAttribute('data-zoom-dragging'),false);
  const css=await readFile(new URL('../dist/portal.css',import.meta.url),'utf8');
  assert.match(css,/\.profile-zoom\{[^}]*minmax\(0,1fr\)[^}]*width:min\(100%,264px\)/);
  assert.match(css,/\.profile-zoom-slider\{[^}]*height:44px/);
  assert.match(css,/\.profile-zoom-slider input\[type=range\]\{[^}]*appearance:none[^}]*touch-action:pan-y/);
  assert.match(css,/prefers-reduced-motion:reduce\).*\.profile-zoom-track\{transform:none;transition:none/);
 } finally { h.window.close(); }
});

test('account pictures preview a square crop and update both profile and sidebar only after a confirmed write', async () => {
 const h = fixture(false);
 try {
  await h.controller.load(owner);
  assert.equal(h.get('profile-avatar').textContent,'NL');
  await h.choose('image/png');
  assert.equal(h.get('profile-avatar-preview').hidden, false);
  assert.deepEqual(h.draws.at(-1), [200,0,400,400,0,0,400,400]);
  const zoom = h.get('profile-avatar-zoom');
  zoom.value = '2';
  zoom.dispatchEvent(new h.window.Event('input'));
  assert.deepEqual(h.draws.at(-1), [300,100,200,200,0,0,200,200]);
  assert.equal(h.calls.length, 0);
  await h.click('profile-avatar-save');
  assert.deepEqual(h.calls[0].headers, {'x-visa-avatar-owner':owner,'x-avatar-version':'none','Content-Type':'image/webp'});
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
  assert.deepEqual(h.calls.at(-1), {method:'DELETE',headers:{'x-visa-avatar-owner':owner,'x-avatar-version':revision},signal:undefined});
  assert.ok(h.revoked.includes(replacement));
  assert.equal(h.picture('user-avatar'),undefined);
  assert.equal(h.get('user-avatar').textContent,'NL');
  assert.equal(h.get('profile-avatar-remove').hidden,true);
  assert.deepEqual(h.notices,['avatarSaved','avatarRemoved']);
  await h.controller.load(owner);
  assert.equal(h.picture('user-avatar'),undefined,'a removal never falls back to legacy');
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
  assert.equal(notice.textContent, portalCopy.vi.avatarOutputError);
  assert.equal(h.get('profile-avatar-preview').hidden,false);
  assert.deepEqual(h.notices,[]);
  h.controller.reset();
  assert.equal(h.get('profile-avatar-preview').hidden,true);
  assert.equal(h.get('profile-avatar-file').disabled,true);
 } finally { h.window.close(); }
});

test('encoding uses the quality floor and a smaller crop when the byte limit is exceeded', async () => {
 const {encodeProfilePhoto} = await import('../dist/profile-photo-editor.js');
 const attempts = [];
 const surface = width => ({
  width, height: width,
  getContext: () => ({drawImage() {}}),
  toBlob(callback, mime, quality) {
   attempts.push([this.width, mime, quality]);
   callback(new Blob([new Uint8Array(this.width > 448 ? 150000 : 88000)], {type: mime}));
  },
 });
 const blob = await encodeProfilePhoto(surface(512), {document: {createElement: () => surface(1)}});
 assert.equal(blob.size, 88000);
 assert.deepEqual(attempts, [[512,'image/webp',0.88],[512,'image/webp',0.82],[448,'image/webp',0.88]]);
 await assert.rejects(encodeProfilePhoto({...surface(512), toBlob: cb => cb(new Blob(['png'], {type:'image/png'}))}), /WebP/);
});
