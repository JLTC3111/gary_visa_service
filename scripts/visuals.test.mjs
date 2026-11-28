import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { createVisualEffectsController } from '../src/visuals/bootstrap.js';

class Surface extends EventEmitter {
  addEventListener(type, listener) { this.on(type, listener); }
  removeEventListener(type, listener) { this.off(type, listener); }
  dispatchEvent(event) { this.emit(event.type, event); }
}
const settled = async () => { for (let i = 0; i < 5; i++) await Promise.resolve(); };
function fakeClock() {
  let time = 0, next = 0;
  const tasks = new Map();
  return {
    now: () => time,
    setTimeout(fn, delay) { const id = ++next; tasks.set(id, { fn, at: time + delay }); return id; },
    clearTimeout(id) { tasks.delete(id); },
    pending: () => tasks.size,
    advance(ms) {
      const until = time + ms;
      for (;;) {
        const entry = [...tasks].filter(([, job]) => job.at <= until).sort((a, b) => a[1].at - b[1].at)[0];
        if (!entry) break;
        const [id, job] = entry; time = job.at; tasks.delete(id); job.fn();
      }
      time = until;
    }
  };
}
function harness({ ready = true, effects = false, loader, theme = 'dark' } = {}) {
  const clock = fakeClock();
  const browser = new Surface();
  const document = new Surface();
  const host = { dataset: {} };
  const hero = {};
  const calls = { loads: 0, mounts: 0, unmounts: 0, pauses: [], themes: [] };
  let observer;
  browser.CustomEvent = class { constructor(type, options) { this.type = type; this.detail = options.detail; } };
  browser.garyVisaPreferences = { ready, effects, resolvedTheme: theme };
  browser.IntersectionObserver = class {
    constructor(callback) { observer = callback; }
    observe() {}
    disconnect() { observer = undefined; }
  };
  document.visibilityState = 'visible';
  const mountHyperspeed = (_host, _hero, options) => {
    calls.mounts++;
    calls.fail = options.onUnavailable;
    calls.ready = options.onReady;
    calls.mountTheme = options.theme;
    return {
      setPaused(value) { calls.pauses.push(value); },
      setTheme(value) { calls.themes.push(value); },
      unmount() { calls.unmounts++; }
    };
  };
  const controller = createVisualEffectsController({
    window: browser, document, host, hero, clock,
    loadMount: () => { calls.loads++; return loader ? loader() : Promise.resolve({ mountHyperspeed }); }
  });
  return {
    calls, host, controller, mountHyperspeed, clock,
    visible(value) { observer?.([{ isIntersecting: value }]); },
    preference(value, resolvedTheme) {
      browser.dispatchEvent(new browser.CustomEvent('gary:visual-preferences', { detail: { effects: value, resolvedTheme } }));
    },
    hidden(value) { document.visibilityState = value ? 'hidden' : 'visible'; document.dispatchEvent({ type: 'visibilitychange' }); }
  };
}

test('no React/WebGL import before effective preference is enabled and visible', async () => {
  const scene = harness({ ready: false, effects: true });
  scene.visible(true);
  await settled();
  assert.equal(scene.calls.loads, 0);
  scene.preference(false);
  assert.equal(scene.calls.loads, 0);
  scene.visible(false);
  scene.preference(true);
  await settled();
  assert.equal(scene.calls.loads, 0);
  scene.visible(true);
  await settled();
  assert.equal(scene.calls.loads, 1);
  assert.equal(scene.calls.mounts, 1);
  scene.controller.destroy();
});

test('static poster remains until the actual first frame is ready', async () => {
  const scene = harness({ effects: true }); scene.visible(true); await settled();
  assert.equal(scene.host.dataset.effectsState, 'loading');
  scene.calls.ready(); assert.equal(scene.host.dataset.effectsState, 'active');
  scene.preference(false); scene.calls.ready(); assert.equal(scene.host.dataset.effectsState, 'off');
  scene.controller.destroy();
});

test('offscreen/hidden rendering pauses without allocating another WebGL context', async () => {
  const scene = harness({ effects: true });
  scene.visible(true);
  await settled();
  scene.visible(false);
  scene.visible(true);
  scene.hidden(true);
  scene.hidden(false);
  assert.deepEqual(scene.calls.pauses, [true, false, true, false]);
  assert.equal(scene.calls.mounts, 1);
  assert.equal(scene.calls.unmounts, 0);
  scene.controller.destroy();
  assert.equal(scene.calls.unmounts, 1);
});

test('Off unmounts, repeated toggles are idempotent and stale imports never mount', async () => {
  let resolve;
  const scene = harness({ effects: true, loader: () => new Promise(done => { resolve = done; }) });
  scene.visible(true);
  scene.preference(false);
  resolve({ mountHyperspeed: scene.mountHyperspeed });
  await settled();
  assert.equal(scene.calls.mounts, 0);
  scene.preference(true);
  await settled();
  scene.preference(false);
  scene.preference(false);
  assert.equal(scene.calls.unmounts, 1);
  scene.preference(true);
  await settled();
  assert.equal(scene.calls.mounts, 2);
  assert.equal(scene.calls.loads, 1);
  scene.controller.destroy();
  scene.controller.destroy();
  assert.equal(scene.calls.unmounts, 2);
});

test('WebGL/context failure keeps a static fallback and does not retry context creation', async () => {
  const scene = harness({ effects: true });
  scene.visible(true);
  await settled();
  scene.calls.fail();
  await settled();
  assert.equal(scene.host.dataset.effectsState, 'unavailable');
  assert.equal(scene.calls.unmounts, 1);
  scene.preference(false);
  scene.preference(true);
  scene.hidden(true);
  scene.hidden(false);
  assert.equal(scene.host.dataset.effectsState, 'unavailable');
  assert.equal(scene.calls.mounts, 1);
  scene.controller.destroy();
});

test('teardown during an in-flight import prevents initialization', async () => {
  let resolve;
  const scene = harness({ effects: true, loader: () => new Promise(done => { resolve = done; }) });
  scene.visible(true);
  scene.controller.destroy();
  resolve({ mountHyperspeed: scene.mountHyperspeed });
  await settled();
  assert.equal(scene.calls.mounts, 0);
  assert.equal(scene.host.dataset.effectsState, 'disposed');
});


test('introduction pauses after exactly 2.5 seconds of active first-frame playback, never import/loading time', async () => {
  const scene = harness({ effects: true }); scene.visible(true); await settled();
  scene.clock.advance(30_000);
  assert.equal(scene.clock.pending(), 0);
  assert.equal(scene.host.dataset.effectsState, 'loading');
  scene.calls.ready();
  scene.clock.advance(2_499);
  assert.equal(scene.host.dataset.effectsState, 'active');
  scene.clock.advance(1);
  assert.equal(scene.host.dataset.effectsState, 'paused');
  assert.equal(scene.calls.pauses.at(-1), true);
  assert.equal(scene.clock.pending(), 0);
  assert.equal(scene.calls.mounts, 1);
  scene.controller.destroy();
});

test('offscreen, hidden and effects-off periods do not consume the remaining introduction budget', async () => {
  const scene = harness({ effects: true }); scene.visible(true); await settled(); scene.calls.ready();
  scene.clock.advance(800); scene.visible(false);
  assert.equal(scene.clock.pending(), 0); scene.clock.advance(60_000);
  scene.visible(true); scene.clock.advance(400); scene.hidden(true);
  assert.equal(scene.clock.pending(), 0); scene.clock.advance(60_000);
  scene.hidden(false); scene.clock.advance(300); scene.preference(false);
  assert.equal(scene.calls.unmounts, 1); assert.equal(scene.clock.pending(), 0); scene.clock.advance(60_000);
  scene.preference(true); await settled(); scene.calls.ready();
  scene.clock.advance(999); assert.equal(scene.host.dataset.effectsState, 'active');
  scene.clock.advance(1); assert.equal(scene.host.dataset.effectsState, 'paused');
  assert.equal(scene.calls.mounts, 2); assert.equal(scene.calls.loads, 1);
  scene.controller.destroy();
});

test('resolved theme changes update the existing renderer and preserve the introduction and paused state', async () => {
  const scene = harness({ effects: true, theme: 'light' });
  scene.visible(true); await settled(); scene.calls.ready();
  assert.equal(scene.calls.mountTheme, 'light');
  scene.clock.advance(1_000); scene.preference(true, 'dark'); scene.preference(true, 'dark');
  assert.deepEqual(scene.calls.themes, ['dark']);
  assert.equal(scene.clock.pending(), 1);
  scene.clock.advance(1_500); assert.equal(scene.host.dataset.effectsState, 'paused');
  scene.preference(true, 'light'); scene.visible(false); scene.visible(true);
  scene.clock.advance(60_000); assert.equal(scene.host.dataset.effectsState, 'paused');
  assert.deepEqual(scene.calls.themes, ['dark', 'light']);
  assert.equal(scene.calls.mounts, 1); assert.equal(scene.clock.pending(), 0);
  scene.controller.destroy();
});

test('manual resume plays indefinitely; viewport suspension preserves manual play or pause intent', async () => {
  const scene = harness({ effects: true }); scene.visible(true); await settled(); scene.calls.ready();
  scene.clock.advance(2_500); scene.controller.togglePlayback();
  assert.equal(scene.host.dataset.effectsState, 'active'); assert.equal(scene.clock.pending(), 0);
  scene.clock.advance(600_000); assert.equal(scene.host.dataset.effectsState, 'active');
  scene.visible(false); assert.equal(scene.calls.pauses.at(-1), true);
  scene.visible(true); assert.equal(scene.host.dataset.effectsState, 'active');
  scene.controller.togglePlayback(); scene.visible(false); scene.visible(true);
  assert.equal(scene.host.dataset.effectsState, 'paused');
  scene.controller.destroy(); assert.equal(scene.calls.unmounts, 1);
});

test('manual pause before the deadline cancels the introduction; renderer gesture callback resumes without a new timer', async () => {
  let onToggle;
  const scene = harness({ effects: true, loader: () => Promise.resolve({ mountHyperspeed(host, hero, options) {
    onToggle = options.onToggle; return scene.mountHyperspeed(host, hero, options);
  } }) });
  scene.visible(true); await settled(); scene.calls.ready(); scene.clock.advance(2_000);
  onToggle(); assert.equal(scene.host.dataset.effectsState, 'paused'); assert.equal(scene.clock.pending(), 0);
  scene.clock.advance(60_000); onToggle(); scene.clock.advance(60_000);
  assert.equal(scene.host.dataset.effectsState, 'active'); assert.equal(scene.calls.mounts, 1);
  scene.controller.destroy();
});

test('cleanup cancels the only introduction timer and manual input cannot resurrect a disposed or disabled scene', async () => {
  const scene = harness({ effects: true }); scene.visible(true); await settled(); scene.calls.ready();
  assert.equal(scene.clock.pending(), 1); scene.controller.destroy();
  assert.equal(scene.clock.pending(), 0); scene.controller.togglePlayback(); scene.clock.advance(60_000);
  assert.equal(scene.host.dataset.effectsState, 'disposed'); assert.equal(scene.calls.unmounts, 1);
  const disabled = harness(); disabled.visible(true); disabled.controller.togglePlayback(); await settled();
  assert.equal(disabled.calls.loads, 0); assert.equal(disabled.clock.pending(), 0); disabled.controller.destroy();
});
