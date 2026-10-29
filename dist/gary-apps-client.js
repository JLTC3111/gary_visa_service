/** Stable browser protocol adapter. The component and catalogue live in Gary Home. */
const DEFAULT_MANIFEST = 'https://garyhome.vn/shared/gary-apps/v1/manifest.json';
const channels = new Map();
const POLL_MS = 60_000;
const TIMEOUT_MS = 10_000;

function report(subscriber, name, value) {
  try { subscriber.options[name]?.(value); } catch { /* Host callbacks cannot stop other sites' widgets. */ }
}

function runtimeProps(props) {
  const portable = { ...props };
  delete portable.renderLink;
  return portable;
}

function validateManifest(value, manifestUrl) {
  if (!value || value.schemaVersion !== 1 || !/^[a-f0-9]{8,64}$/.test(value.release || '')) throw new Error('Invalid Gary Apps manifest');
  const base = new URL('.', manifestUrl);
  const urls = {};
  for (const [key, prefix, extension] of [['module', 'runtime', 'js'], ['stylesheet', 'styles', 'css']]) {
    const expected = `./${prefix}.${value.release}.${extension}`;
    if (value[key] !== expected) throw new Error(`Invalid Gary Apps ${key}`);
    const url = new URL(value[key], base);
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname) || url.search || url.hash) throw new Error('Gary Apps asset leaves its release directory');
    urls[key] = url.href;
  }
  return { release: value.release, ...urls };
}

function timeout(promise, message, resource) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), TIMEOUT_MS);
    resource.cancel = () => reject(new Error('Gary Apps load cancelled'));
  })]).finally(() => clearTimeout(timer));
}

function getResource(channel, manifest) {
  let resource = channel.resources.get(manifest.release);
  if (resource) {
    if (resource.manifest.module !== manifest.module || resource.manifest.stylesheet !== manifest.stylesheet) throw new Error('Gary Apps release changed its assets');
    return resource;
  }
  const link = channel.document.createElement('link');
  link.rel = 'stylesheet';
  link.href = manifest.stylesheet;
  link.crossOrigin = 'anonymous';
  link.dataset.garyAppsRelease = manifest.release;
  resource = { manifest, link, users: new Set(), loaded: false };
  const stylesheet = new Promise((resolve, reject) => {
    link.onload = resolve;
    link.onerror = () => reject(new Error('Gary Apps stylesheet could not load'));
  });
  channel.document.head.append(link);
  resource.promise = timeout(Promise.all([stylesheet, import(/* webpackIgnore: true */ /* @vite-ignore */ manifest.module)]), 'Gary Apps assets timed out', resource).then(([, module]) => {
    if (typeof module.mount !== 'function') throw new Error('Gary Apps runtime has no mount function');
    resource.module = module;
    resource.loaded = true;
    return resource;
  }).catch(error => {
    link.remove();
    if (channel.resources.get(manifest.release) === resource) channel.resources.delete(manifest.release);
    throw error;
  });
  channel.resources.set(manifest.release, resource);
  return resource;
}

function collectResources(channel) {
  for (const [release, resource] of channel.resources) {
    const pending = [...channel.subscribers].some(sub => sub.pending === resource);
    if (resource.loaded && !resource.users.size && !pending && channel.latest !== resource) {
      resource.link.remove();
      channel.resources.delete(release);
    }
  }
}

function busy(subscriber) {
  if (subscriber.props.kind !== 'menu') return false;
  return Boolean(subscriber.options.isBusy?.() || subscriber.target.querySelector('details[open]') || subscriber.target.contains(subscriber.target.ownerDocument.activeElement));
}

function applyPending(subscriber) {
  const resource = subscriber.pending;
  if (!subscriber.active || !resource?.loaded || subscriber.resource === resource || busy(subscriber)) return;
  const stage = subscriber.target.ownerDocument.createElement('div');
  stage.style.display = 'contents';
  stage.dataset.garyAppsRuntime = resource.manifest.release;
  subscriber.target.append(stage);
  let handle;
  try {
    handle = resource.module.mount(stage, runtimeProps(subscriber.props));
    if (!handle || typeof handle.update !== 'function' || typeof handle.unmount !== 'function') throw new Error('Gary Apps mount returned an invalid handle');
  } catch (error) {
    try { handle?.unmount?.(); } catch { /* Clean up the staging root even if an invalid runtime also fails teardown. */ }
    stage.remove();
    subscriber.pending = null; // A failed render retries on the next manifest check, not every interaction tick.
    report(subscriber, 'onError', error);
    return;
  }
  const previous = subscriber.resource;
  try { subscriber.handle?.unmount(); } catch { /* A previous release must not block its replacement. */ }
  subscriber.stage?.remove();
  previous?.users.delete(subscriber);
  subscriber.handle = handle;
  subscriber.stage = stage;
  subscriber.resource = resource;
  subscriber.pending = null;
  resource.users.add(subscriber);
  subscriber.target.dataset.garyAppsRelease = resource.manifest.release;
  subscriber.target.dataset.garyRelease = resource.manifest.release;
  report(subscriber, 'onReady');
  collectResources(subscriber.channel);
}

function retryPending(channel) {
  if (channel.disposed) return;
  clearTimeout(channel.retryTimer);
  channel.retryTimer = null;
  for (const subscriber of channel.subscribers) applyPending(subscriber);
  if ([...channel.subscribers].some(sub => sub.pending?.loaded)) channel.retryTimer = setTimeout(() => retryPending(channel), 500);
}

async function refresh(channel) {
  if (channel.disposed || channel.refreshing) return;
  channel.refreshing = true;
  const controller = new AbortController();
  channel.controller = controller;
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(channel.url, { cache: 'no-store', credentials: 'omit', mode: 'cors', signal: controller.signal });
    if (!response.ok) throw new Error(`Gary Apps manifest returned ${response.status}`);
    const manifest = validateManifest(await response.json(), channel.url);
    if (channel.disposed) return;
    const resource = getResource(channel, manifest);
    await resource.promise;
    if (channel.disposed) return;
    channel.latest = resource;
    for (const subscriber of channel.subscribers) {
      subscriber.pending = subscriber.resource === resource ? null : resource;
    }
    retryPending(channel);
    collectResources(channel);
  } catch (error) {
    if (!channel.disposed) for (const subscriber of channel.subscribers) report(subscriber, 'onError', error);
  } finally {
    clearTimeout(timer);
    channel.refreshing = false;
    channel.controller = null;
  }
}

function createChannel(url, document) {
  const channel = { url, document, subscribers: new Set(), resources: new Map(), disposed: false };
  channel.visibility = () => { if (document.visibilityState !== 'hidden') refresh(channel); };
  document.addEventListener('visibilitychange', channel.visibility);
  channel.pollTimer = setInterval(() => { if (document.visibilityState !== 'hidden') refresh(channel); }, POLL_MS);
  return channel;
}

/** Mount into an empty target; a sibling local fallback stays owned by the host. */
export function connectGaryApps(target, props, options = {}) {
  const document = target.ownerDocument;
  const url = new URL(options.manifestUrl || DEFAULT_MANIFEST, document.baseURI).href;
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname))) throw new Error('Gary Apps requires HTTPS');
  let channel = channels.get(url);
  if (!channel) {
    channel = createChannel(url, document);
    channels.set(url, channel);
  }
  const subscriber = { target, props: { ...props }, options, active: true, channel };
  subscriber.retry = () => {
    clearTimeout(subscriber.eventTimer);
    subscriber.eventTimer = setTimeout(() => { if (subscriber.active) retryPending(channel); }, 0);
  };
  target.addEventListener('toggle', subscriber.retry, true);
  target.addEventListener('focusout', subscriber.retry);
  channel.subscribers.add(subscriber);
  if (channel.latest) {
    subscriber.pending = channel.latest;
    applyPending(subscriber);
  }
  refresh(channel);
  return {
    update(nextProps) {
      if (!subscriber.active) return;
      subscriber.props = { ...subscriber.props, ...nextProps };
      try { subscriber.handle?.update(runtimeProps(subscriber.props)); } catch (error) { report(subscriber, 'onError', error); }
      retryPending(channel);
    },
    unmount() {
      if (!subscriber.active) return;
      subscriber.active = false;
      clearTimeout(subscriber.eventTimer);
      target.removeEventListener('toggle', subscriber.retry, true);
      target.removeEventListener('focusout', subscriber.retry);
      try { subscriber.handle?.unmount(); } catch { /* Always release timers and stylesheet references. */ }
      subscriber.stage?.remove();
      subscriber.resource?.users.delete(subscriber);
      subscriber.pending = null;
      channel.subscribers.delete(subscriber);
      delete target.dataset.garyAppsRelease;
      delete target.dataset.garyRelease;
      if (!channel.subscribers.size) {
        channel.disposed = true;
        channel.controller?.abort();
        clearInterval(channel.pollTimer);
        clearTimeout(channel.retryTimer);
        document.removeEventListener('visibilitychange', channel.visibility);
        for (const resource of channel.resources.values()) { resource.cancel?.(); resource.link.remove(); }
        channel.resources.clear();
        channels.delete(url);
      } else collectResources(channel);
    },
  };
}
