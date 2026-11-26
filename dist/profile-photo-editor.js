const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxOutputBytes = 100 * 1024;
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

export const managedAvatarBucket = app => `gary-${app}-profile-photos`;

export async function readAvatarReferences(db, app, ids) {
  const {data, error} = await db.from(`${app}_avatar_profiles`).select('user_id,version,path').in('user_id', ids);
  if (error) throw error;
  return new Map((data || []).map(row => [row.user_id, row]));
}

export async function saveProfilePhoto(db, app, owner, version, body, options = {}) {
  const headers = {[options.ownerHeader || 'x-avatar-owner']: owner, 'x-avatar-version': version || 'none'};
  if (body) headers['Content-Type'] = 'image/webp';
  const {data, error} = await db.functions.invoke(`${app}-profile-avatar`, {
    method: body ? 'POST' : 'DELETE', headers, ...(body ? {body} : {}), signal: options.signal,
  });
  if (error) throw error;
  if (data?.ok !== true || !uuid.test(data.version) || data.path !== (body ? `${owner}/${data.version}.webp` : null)) {
    throw new Error('Avatar change could not be confirmed');
  }
  return data;
}

// Re-encode pixels from the crop. No original bytes or source metadata are passed
// to the encoder. Keep quality high and reduce resolution modestly if needed.
export async function encodeProfilePhoto(canvas, win = globalThis) {
  const encode = (surface, quality) => new Promise(resolve => surface.toBlob(resolve, 'image/webp', quality));
  let surface = canvas;
  for (const edge of [512, 448, 384, 320, 256]) {
    if (edge === 512 && (surface.width > edge || surface.height > edge) ||
        edge < 512 && Math.max(surface.width, surface.height) > edge) {
      const scale = edge / Math.max(canvas.width, canvas.height);
      surface = win.document.createElement('canvas');
      surface.width = Math.max(1, Math.floor(canvas.width * scale));
      surface.height = Math.max(1, Math.floor(canvas.height * scale));
      const context = surface.getContext('2d');
      context.imageSmoothingQuality = 'high';
      context.drawImage(canvas, 0, 0, surface.width, surface.height);
    } else if (edge < 512) {
      continue;
    }
    for (const quality of [0.88, 0.82]) {
      const blob = await encode(surface, quality);
      if (!blob?.size || blob.type !== 'image/webp') throw new Error('Avatar WebP encoding unavailable');
      if (blob.size <= maxOutputBytes) return blob;
    }
  }
  throw new Error('Avatar could not be compressed');
}

function mutationError(error) {
  const status = error?.context?.status;
  if (status === 401 || status === 403) return 'avatarSignIn';
  if (status === 404) return 'avatarSetupNeeded';
  if (status === 409) return 'avatarConflict';
  if (status === 413) return 'avatarOutputError';
  if (status === 415) return 'avatarOutputError';
  return 'avatarSaveError';
}

export function mountProfilePhoto({
  root, t, read, savePhoto, notify, onPhotoChange, onCommit, onBusy,
  maxInputBytes = 5 * 1024 * 1024, allowAvif = false,
}) {
  const doc = root.ownerDocument, win = doc.defaultView;
  const get = id => root.querySelector('#' + id);
  const fileInput = get('profile-avatar-file'), preview = get('profile-avatar-preview');
  const canvas = get('profile-avatar-canvas'), zoom = get('profile-avatar-zoom');
  const save = get('profile-avatar-save'), cancel = get('profile-avatar-cancel'), remove = get('profile-avatar-remove');
  const retry = get('profile-avatar-retry'), feedback = get('profile-avatar-feedback');
  const listeners = new win.AbortController(), {signal} = listeners;
  let owner, current, picture = '', localUrl = '', image, problem = '';
  let working = false, loading = false, paused = false, accountEpoch = 0, selectionEpoch = 0;
  const renderZoom = mountCropZoom(root, zoom, t, draw, signal);

  function render() {
    const disabled = paused || working || loading || !owner || !current;
    fileInput.disabled = disabled;
    save.disabled = disabled || !image;
    cancel.disabled = disabled;
    remove.disabled = disabled;
    remove.hidden = !current?.path;
    if (retry) {
      retry.hidden = !owner || loading || working || !!current;
      retry.disabled = paused;
    }
    zoom.disabled = disabled || !image;
    renderZoom();
    preview.hidden = !image;
    canvas.setAttribute('aria-label', t('avatarSquarePreview'));
    feedback.textContent = problem ? t(problem) : '';
    root.setAttribute('aria-busy', String(loading || working));
  }

  function showPhoto(url = '', objectUrl = '') {
    if (localUrl) win.URL.revokeObjectURL(localUrl);
    picture = url;
    localUrl = objectUrl;
    onPhotoChange?.(picture, current);
  }

  function reset() {
    accountEpoch++; selectionEpoch++;
    if (working) onBusy?.(false);
    owner = current = image = null;
    problem = ''; loading = working = false; fileInput.value = '';
    showPhoto();
    render();
  }

  async function refresh(epoch, showError) {
    const id = owner;
    try {
      const next = await read(id);
      if (epoch !== accountEpoch) return;
      const samePhoto = current?.path === next.path && current?.version === next.version;
      current = next;
      if (samePhoto && picture) return;
      const url = next.blob ? win.URL.createObjectURL(next.blob) : '';
      showPhoto(url || next.url, url);
    } catch {
      if (epoch === accountEpoch && showError) problem = 'avatarLoadError';
    }
  }

  async function load(id) {
    reset();
    if (!id) return;
    owner = id;
    loading = true;
    render();
    const epoch = accountEpoch;
    await refresh(epoch, true);
    if (epoch === accountEpoch) {
      loading = false;
      render();
    }
  }

  function draw() {
    if (!image) return;
    const {naturalWidth: width, naturalHeight: height} = image;
    const side = Math.min(width, height) / Number(zoom.value);
    const size = Math.max(1, Math.min(512, Math.floor(side)));
    canvas.width = canvas.height = size;
    const context = canvas.getContext('2d');
    context.imageSmoothingQuality = 'high';
    context.clearRect(0, 0, size, size);
    context.drawImage(image, (width - side) / 2, (height - side) / 2, side, side, 0, 0, size, size);
  }

  async function choose() {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!file || paused || working || loading || !owner || !current) return;
    const selection = ++selectionEpoch;
    image = null;
    const validType = acceptedTypes.includes(file.type) || (allowAvif && file.type === 'image/avif') ||
      ((!file.type || file.type === 'application/octet-stream') &&
        (/\.(?:jpe?g|png|webp)$/i.test(file.name) || (allowAvif && /\.avif$/i.test(file.name))));
    problem = !validType ? 'avatarType' : !file.size || file.size > maxInputBytes ? 'avatarSize' : '';
    render();
    if (problem) return;
    const source = win.URL.createObjectURL(file);
    try {
      const selected = new win.Image();
      selected.src = source;
      await selected.decode();
      if (selection !== selectionEpoch) return;
      if (!selected.naturalWidth || !selected.naturalHeight) throw new Error('Invalid image dimensions');
      image = selected;
      zoom.value = '1';
      draw();
    } catch {
      if (selection === selectionEpoch) {
        image = null;
        problem = 'avatarPreviewError';
      }
    } finally {
      win.URL.revokeObjectURL(source);
      if (selection === selectionEpoch) render();
    }
  }

  async function mutate(removing) {
    if (paused || working || loading || !owner || !current || (removing ? !current.path : !image)) return;
    const epoch = accountEpoch;
    ++selectionEpoch;
    working = true; problem = '';
    onBusy?.(true);
    render();
    try {
      let body = null;
      if (!removing) {
        try { body = await encodeProfilePhoto(canvas, win); }
        catch {
          if (epoch === accountEpoch) problem = 'avatarOutputError';
          return;
        }
      }
      if (epoch !== accountEpoch) return;
      const saved = await savePhoto(owner, current.version, body);
      if (epoch !== accountEpoch) return;
      current = saved;
      const url = body ? win.URL.createObjectURL(body) : '';
      showPhoto(url, url);
      image = null;
      onCommit?.(saved);
      notify?.(removing ? 'avatarRemoved' : 'avatarSaved');
      fileInput.disabled = false;
      fileInput.focus({preventScroll: true});
    } catch (error) {
      if (epoch !== accountEpoch) return;
      problem = mutationError(error);
      // An interrupted response can follow a committed write. Read back the
      // canonical reference without clearing the user's draft or reporting success.
      await refresh(epoch, false);
    } finally {
      if (epoch === accountEpoch) {
        working = false;
        onBusy?.(false);
        render();
      }
    }
  }

  fileInput.addEventListener('change', () => void choose(), {signal});
  save.addEventListener('click', () => void mutate(false), {signal});
  cancel.addEventListener('click', () => {
    ++selectionEpoch; image = null; problem = ''; render(); fileInput.focus({preventScroll: true});
  }, {signal});
  remove.addEventListener('click', () => void mutate(true), {signal});
  retry?.addEventListener('click', () => void load(owner), {signal});
  render();
  return {load, reset, render, setPaused(value) { paused = value; render(); }, isWorking: () => working, destroy() {
    listeners.abort();
    reset();
  }};
}
export function renderAvatar(node, name, url, lazy = false) {
 const doc = node.ownerDocument;
 const words = (name.trim().split('@')[0] || 'G').split(/[\s._-]+/).filter(Boolean);
 const initials = words.length > 1 ? [words[0], words.at(-1)] : words;
 node.textContent = initials.map(word => [...word][0]).join('').toUpperCase() || 'G';
 if (!url) return;
 const photo = doc.createElement('img');
 photo.alt = '';
 photo.decoding = 'async';
 if (lazy) photo.loading = 'lazy';
 photo.addEventListener('error', () => photo.remove(), {once: true});
 photo.src = url;
 node.append(photo);
}

function mountCropZoom(root, input, t, draw, signal) {
 const doc = input.ownerDocument, win = doc.defaultView, slider = input.parentElement;
 const display = root.querySelector('#' + 'profile-zoom-value');
 const out = root.querySelector('#' + 'profile-zoom-out'), inside = root.querySelector('#' + 'profile-zoom-in');
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
 input.addEventListener('input', () => { update(); draw(); }, {signal});
 for (const [button, direction] of [[out, -1], [inside, 1]]) {
  button.addEventListener('click', () => {
   if (button.getAttribute('aria-disabled') === 'true') return;
   if (direction < 0) input.stepDown();
   else input.stepUp();
   input.dispatchEvent(new win.Event('input', {bubbles: true}));
  }, {signal});
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
 }, {signal});
 win.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.id) return;
  const value = input.valueAsNumber;
  const excess = value === min && event.clientX < drag.left ? event.clientX - drag.left :
   value === max && event.clientX > drag.right ? event.clientX - drag.right : 0;
  if (excess) slider.style.setProperty('--visa-zoom-anchor', excess < 0 ? 'right' : 'left');
  const extension = 5 * (1 - Math.exp(-Math.abs(excess) / 24));
  slider.style.setProperty('--visa-zoom-stretch', String(1 + extension / drag.trackWidth));
 }, {signal});
 const finish = event => { if (event.pointerId === drag?.id) release(); };
 win.addEventListener('pointerup', finish, {signal});
 win.addEventListener('pointercancel', finish, {signal});
 win.addEventListener('blur', release, {signal});
 input.addEventListener('lostpointercapture', finish, {signal});
 return () => {
  out.disabled = input.disabled;
  inside.disabled = input.disabled;
  out.setAttribute('aria-label', t('avatarZoomOut'));
  inside.setAttribute('aria-label', t('avatarZoomIn'));
  if (input.disabled) release();
  update();
 };
}

