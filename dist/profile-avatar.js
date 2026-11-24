export const avatarBucket = 'gary-visa-avatars';
export const avatarPath = id => `${id}/avatar`;
const maxBytes = 5 * 1024 * 1024;
const mimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

export function renderAvatar(node, name, url) {
 const doc = node.ownerDocument;
 const words = (name.trim().split('@')[0] || 'G').split(/[\s._-]+/).filter(Boolean);
 const initials = words.length > 1 ? [words[0], words.at(-1)] : words;
 node.textContent = initials.map(word => [...word][0]).join('').toUpperCase() || 'G';
 if (!url) return;
 const photo = doc.createElement('img');
 photo.alt = '';
 photo.addEventListener('error', () => photo.remove(), {once: true});
 photo.src = url;
 node.append(photo);
}

export function createProfileAvatar({db, doc, t, name, notify, onPhotoChange}) {
 const win = doc.defaultView;
 const get = id => doc.getElementById(id);
 const fileInput = get('profile-avatar-file'), preview = get('profile-avatar-preview');
 const canvas = get('profile-avatar-canvas'), zoom = get('profile-avatar-zoom'), remove = get('profile-avatar-remove');
 const save = get('profile-avatar-save'), cancel = get('profile-avatar-cancel'), feedback = get('profile-avatar-feedback');
 const storage = db.storage.from(avatarBucket);
 let owner = null, picture = '', localPicture = '', image = null, working = false, problem = '';
 let accountEpoch = 0, photoEpoch = 0, selectionEpoch = 0;
 const renderZoom = mountCropZoom(zoom, t, draw);

 function render() {
  for (const id of ['user-avatar', 'profile-avatar']) renderAvatar(get(id), name(), picture);
  remove.hidden = !picture;
  for (const control of [fileInput, save, cancel, remove]) control.disabled = working || !owner;
  zoom.disabled = working || !owner || !image;
  renderZoom();
  preview.hidden = !image;
  canvas.setAttribute('aria-label', t('avatarSquarePreview'));
  feedback.textContent = problem ? t(problem) : '';
  get('profile-avatar-controls').setAttribute('aria-busy', String(working));
 }
 function usePhoto(url, objectUrl = '') {
  if (localPicture) win.URL.revokeObjectURL(localPicture);
  picture = url;
  localPicture = objectUrl;
  onPhotoChange?.(picture);
 }
 function reset() {
  accountEpoch++; photoEpoch++; selectionEpoch++;
  owner = null; image = null; problem = ''; working = false; fileInput.value = '';
  usePhoto('');
  render();
 }
 async function load(id) {
  reset();
  owner = id;
  render();
  const version = photoEpoch;
  try {
   const {data, error} = await storage.download(avatarPath(id));
   if (!error && data && version === photoEpoch) {
    const url = win.URL.createObjectURL(data);
    usePhoto(url, url);
    render();
   }
  } catch { /* Initials remain visible if the picture is absent or unavailable. */ }
 }
 function draw() {
  if (!image) return;
  const {naturalWidth: width, naturalHeight: height} = image;
  const side = Math.min(width, height) / Number(zoom.value);
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, (width - side) / 2, (height - side) / 2, side, side, 0, 0, canvas.width, canvas.height);
 }
 async function choose() {
  const file = fileInput.files?.[0];
  fileInput.value = '';
  if (!file || working || !owner) return;
  const selection = ++selectionEpoch;
  image = null;
  const validType = mimeTypes.includes(file.type) ||
   ((!file.type || file.type === 'application/octet-stream') && /\.(?:jpe?g|png|webp)$/i.test(file.name));
  problem = !validType ? 'avatarType' : !file.size || file.size > maxBytes ? 'avatarSize' : '';
  render();
  if (problem) return;
  const source = win.URL.createObjectURL(file);
  try {
   const selected = new win.Image();
   selected.src = source;
   await selected.decode();
   if (selection !== selectionEpoch) return;
   image = selected;
   zoom.value = '1';
   draw();
  } catch {
   if (selection !== selectionEpoch) return;
   image = null; problem = 'avatarPreviewError';
  } finally {
   win.URL.revokeObjectURL(source);
   if (selection === selectionEpoch) render();
  }
 }
 async function mutate(removing) {
  if (working || !owner || (removing ? !picture : !image)) return;
  const epoch = accountEpoch, selection = ++selectionEpoch;
  working = true; problem = '';
  render();
  try {
   const body = removing ? null : await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 0.9));
   if (epoch !== accountEpoch || selection !== selectionEpoch) return;
   if (!removing && (!body || !mimeTypes.includes(body.type))) throw new Error('Invalid preview');
   const headers = {'x-visa-avatar-owner': owner};
   const options = removing ? {method: 'DELETE', headers} : {body, headers: {...headers, 'Content-Type': body.type}};
   const {data, error} = await db.functions.invoke('visa-profile-avatar', options);
   if (epoch !== accountEpoch) return;
   if (error || data?.ok !== true) {
    problem = avatarError(error);
    return;
   }
   photoEpoch++;
   const url = body ? win.URL.createObjectURL(body) : '';
   usePhoto(url, url);
   image = null;
   notify(removing ? 'avatarRemoved' : 'avatarSaved');
   fileInput.disabled = false;
   fileInput.focus({preventScroll: true});
  } catch {
   if (epoch === accountEpoch) problem = 'avatarSaveError';
  } finally {
   if (epoch === accountEpoch) { working = false; render(); }
  }
 }

 fileInput.addEventListener('change', () => void choose());
 save.addEventListener('click', () => void mutate(false));
 cancel.addEventListener('click', () => {
  selectionEpoch++; image = null; problem = ''; render(); fileInput.focus({preventScroll: true});
 });
 remove.addEventListener('click', () => void mutate(true));
 return {load, reset, render};
}

function mountCropZoom(input, t, draw) {
 const doc = input.ownerDocument, win = doc.defaultView, slider = input.parentElement;
 const display = doc.getElementById('profile-zoom-value');
 const out = doc.getElementById('profile-zoom-out'), inside = doc.getElementById('profile-zoom-in');
 const min = Number(input.min), max = Number(input.max);
 const motion = win.matchMedia?.('(prefers-reduced-motion: reduce)');
 let drag = null;

 function update() {
  const value = input.valueAsNumber, percent = Math.round(value * 100) + '%';
  slider.style.setProperty('--visa-zoom-fill', ((value - min) / (max - min) * 100) + '%');
  display.textContent = percent;
  input.setAttribute('aria-valuetext', percent);
  out.setAttribute('aria-disabled', String(input.disabled || value <= min));
  inside.setAttribute('aria-disabled', String(input.disabled || value >= max));
 }
 input.addEventListener('input', () => { update(); draw(); });
 for (const [button, direction] of [[out, -1], [inside, 1]]) {
  button.addEventListener('click', () => {
   if (button.getAttribute('aria-disabled') === 'true') return;
   if (direction < 0) input.stepDown();
   else input.stepUp();
   input.dispatchEvent(new win.Event('input', {bubbles: true}));
  });
 }

 function release() {
  if (!drag) return;
  drag = null;
  slider.removeAttribute('data-zoom-dragging');
  slider.style.removeProperty('--visa-zoom-stretch');
 }
 input.addEventListener('pointerdown', event => {
  if (event.button !== 0 || event.isPrimary === false || input.disabled || motion?.matches) return;
  const {left, right, width} = input.getBoundingClientRect();
  if (width <= 16) return;
  drag = {id: event.pointerId, left, right, trackWidth: width - 16};
  slider.setAttribute('data-zoom-dragging', '');
 });
 win.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.id) return;
  const value = input.valueAsNumber;
  const excess = value === min && event.clientX < drag.left ? event.clientX - drag.left :
   value === max && event.clientX > drag.right ? event.clientX - drag.right : 0;
  if (excess) slider.style.setProperty('--visa-zoom-anchor', excess < 0 ? 'right' : 'left');
  const extension = 5 * (1 - Math.exp(-Math.abs(excess) / 24));
  slider.style.setProperty('--visa-zoom-stretch', String(1 + extension / drag.trackWidth));
 });
 const finish = event => { if (event.pointerId === drag?.id) release(); };
 win.addEventListener('pointerup', finish);
 win.addEventListener('pointercancel', finish);
 win.addEventListener('blur', release);
 input.addEventListener('lostpointercapture', finish);
 return () => {
  out.disabled = input.disabled;
  inside.disabled = input.disabled;
  out.setAttribute('aria-label', t('avatarZoomOut'));
  inside.setAttribute('aria-label', t('avatarZoomIn'));
  if (input.disabled) release();
  update();
 };
}

function avatarError(error) {
 const response = error?.context;
 if (response?.status === 404) return 'avatarSetupNeeded';
 if (response?.status === 401 || response?.status === 403) return 'avatarSignIn';
 if (response?.status === 413) return 'avatarSize';
 if (response?.status === 415) return 'avatarType';
 return 'avatarSaveError';
}
