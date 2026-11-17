import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { createVisualEffectsController } from '../src/visuals/bootstrap.js';
const init = await readFile(new URL('../dist/appearance-init.js', import.meta.url), 'utf8');
const controls = await readFile(new URL('../dist/appearance.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../dist/public-design.css', import.meta.url), 'utf8');
const app = await build({ entryPoints: ['dist/app.js'], bundle: true, write: false, format: 'iife', platform: 'browser' });
function environment({ dark = false, reduce = false, saveData = false, stored = {}, language = false } = {}) {
  const dom = new JSDOM(html, { url: 'https://visa.garyhome.vn/', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, queries = new Map();
  w.matchMedia = query => { if (!queries.has(query)) queries.set(query, { matches: query.includes('color-scheme') ? dark : reduce, listeners: [], addEventListener(_, fn) { this.listeners.push(fn); } }); return queries.get(query); };
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new w.Event('close')); };
  Object.defineProperty(w.navigator, 'connection', { value: { saveData, addEventListener() {} } });
  for (const [key, value] of Object.entries(stored)) w.localStorage.setItem(key, value);
  w.eval(init);
  if (language) w.eval(app.outputFiles[0].text);
  w.eval(controls);
  const d = w.document;
  return { dom, w, d, queries, trigger: d.getElementById('visa-preferences-trigger'), panel: d.getElementById('visa-preferences-panel') };
}
function status(h, value) { h.w.dispatchEvent(new h.w.CustomEvent('gary:visual-status', { detail: { status: value } })); }
function key(h, node, value, options = {}) { return node.dispatchEvent(new h.w.KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...options })); }
function storedValues(h) { return Object.fromEntries(['gary-language', 'gary-visa-theme', 'gary-visa-effects'].map(name => [name, h.w.localStorage.getItem(name)])); }

test('preferences resolve before public CSS; one header trigger owns the three settings', () => {
  assert.ok(html.indexOf('appearance-init.js') < html.indexOf('href="./styles.css"'));
  const h = environment({ reduce: true });
  try {
    assert.equal(h.w.garyVisaPreferences.effects, false);
    assert.equal(h.d.querySelector('#hero-title').textContent, 'Your next journey starts here.');
    assert.equal(h.d.querySelector('#visa-cinematic-hero select'), null);
    assert.equal(h.d.querySelector('#visa-cinematic-hero .hero-journey'), null);
    assert.ok(h.d.querySelector('#visa-service-discovery #hero-service'));
    assert.equal(h.d.querySelectorAll('.header [data-open-preferences]').length, 1);
    assert.equal(h.d.querySelector('.header .appearance-controls,.header .language-control,.header [data-effects-toggle]'), null);
    assert.ok(h.d.querySelector('.header [data-gary-apps="header"]'));
    assert.equal(h.panel.getAttribute('role'), 'dialog');
    assert.equal(h.panel.getAttribute('aria-modal'), 'false');
    assert.equal(h.trigger.getAttribute('aria-controls'), h.panel.id);
    assert.equal(h.panel.querySelectorAll('fieldset').length, 3);
    assert.equal(h.panel.hidden, true);
  } finally { h.dom.window.close(); }
});

test('reduced motion and data saving default to no WebGL; explicit preference is respected', () => {
  for (const settings of [{ reduce: true }, { saveData: true }]) {
    const h = environment(settings);
    try {
      assert.equal(h.w.garyVisaPreferences.effects, false);
      assert.equal(h.d.querySelector('[data-effects-hint]').hidden, true);
      h.w.setGaryVisaEffects(true);
      assert.equal(h.w.garyVisaPreferences.effects, true);
      assert.equal(h.w.localStorage.getItem('gary-visa-effects'), 'on');
    } finally { h.dom.window.close(); }
  }
});

test('theme System follows OS changes and appearance does not change effects', () => {
  const h = environment({ dark: true, stored: { 'gary-visa-effects': 'off' } });
  try {
    assert.equal(h.d.documentElement.dataset.visaTheme, 'dark');
    const mq = h.queries.get('(prefers-color-scheme: dark)'); mq.matches = false; mq.listeners.forEach(fn => fn());
    assert.equal(h.d.documentElement.dataset.visaTheme, 'light');
    h.d.querySelector('[data-theme-choice="dark"]').click();
    assert.equal(h.w.localStorage.getItem('gary-visa-theme'), 'dark');
    assert.equal(h.w.garyVisaPreferences.effects, false);
    assert.equal(h.d.querySelector('[data-theme-choice="dark"]').getAttribute('aria-pressed'), 'true');
    mq.matches = true; mq.listeners.forEach(fn => fn());
    mq.matches = false; mq.listeners.forEach(fn => fn());
    assert.equal(h.d.documentElement.dataset.visaTheme, 'dark', 'explicit appearance ignores system changes');
  } finally { h.dom.window.close(); }
});

test('preferences open at the selected language; Escape and Close restore the opening control', () => {
  const h = environment();
  try {
    h.trigger.focus(); h.trigger.click();
    assert.equal(h.panel.hidden, false);
    assert.equal(h.trigger.getAttribute('aria-expanded'), 'true');
    assert.equal(h.d.activeElement, h.panel.querySelector('[data-lang="en"]'));
    assert.equal(key(h, h.d.activeElement, 'Escape'), false);
    assert.equal(h.panel.hidden, true);
    assert.equal(h.trigger.getAttribute('aria-expanded'), 'false');
    assert.equal(h.d.activeElement, h.trigger);
    h.trigger.click(); h.panel.querySelector('[data-close-preferences]').click();
    assert.equal(h.panel.hidden, true);
    assert.equal(h.d.activeElement, h.trigger);
  } finally { h.dom.window.close(); }
});

test('inside interactions keep preferences open; outside pointer and keyboard focus dismiss without stealing focus', () => {
  const h = environment();
  try {
    h.trigger.click();
    h.panel.querySelector('[data-theme-choice="dark"]').dispatchEvent(new h.w.Event('pointerdown', { bubbles: true }));
    assert.equal(h.panel.hidden, false);
    h.panel.querySelector('[data-effects-choice="off"]').focus();
    assert.equal(h.panel.hidden, false);
    h.panel.dispatchEvent(new h.w.FocusEvent('focusout', { bubbles: true, relatedTarget: null }));
    assert.equal(h.panel.hidden, false, 'touch focus loss with no destination must not discard a pending tap');
    h.d.body.dispatchEvent(new h.w.Event('pointerdown', { bubbles: true }));
    assert.equal(h.panel.hidden, true);
    h.trigger.click();
    const outside = h.d.querySelector('.portal-link');
    key(h, h.d.activeElement, 'Tab'); outside.focus();
    assert.equal(h.panel.hidden, true);
    assert.equal(h.d.activeElement, outside, 'Tab dismissal must not send focus back to trigger');
  } finally { h.dom.window.close(); }
});

test('hero shortcut opens the effects group without toggling effects or duplicating a toggle', () => {
  const h = environment({ stored: { 'gary-visa-effects': 'off' } });
  try {
    let changes = 0;
    h.w.addEventListener('gary:visual-preferences', () => changes++);
    const shortcut = h.d.querySelector('[data-open-preferences="effects"]');
    assert.equal(h.d.querySelector('#visa-cinematic-hero [data-effects-toggle],#visa-cinematic-hero [data-effects-choice]'), null);
    shortcut.click();
    assert.equal(h.panel.hidden, false);
    assert.equal(h.d.activeElement, h.panel.querySelector('[data-effects-choice="off"]'));
    assert.equal(h.w.garyVisaPreferences.effects, false);
    assert.equal(changes, 0, 'opening preferences must not request a WebGL preference change');
    key(h, h.d.activeElement, 'Escape');
    assert.equal(h.d.activeElement, shortcut);
    assert.equal(changes, 0);
  } finally { h.dom.window.close(); }
});

test('opening preferences closes competing header navigation without changing selected settings', () => {
  const h = environment({ language: true });
  try {
    const shared = h.d.createElement('details'); shared.className = 'gary-apps-menu'; shared.open = true;
    h.d.querySelector('[data-gary-apps="header"]').append(shared);
    const menu = h.d.getElementById('menu-toggle'); menu.click();
    assert.equal(menu.getAttribute('aria-expanded'), 'true');
    h.trigger.click();
    assert.equal(shared.open, false);
    assert.equal(menu.getAttribute('aria-expanded'), 'false');
    assert.equal(h.d.getElementById('mobile-nav').hidden, true);
    assert.equal(h.panel.hidden, false);
  } finally { h.dom.window.close(); }
});

test('all languages, appearance modes and effects combinations persist independently after reopening and reload', () => {
  for (const locale of ['en', 'vi']) for (const theme of ['light', 'dark', 'system']) for (const effects of ['on', 'off']) {
    const h = environment({ dark: true, language: true });
    let saved;
    try {
      h.trigger.click();
      h.panel.querySelector(`[data-lang="${locale}"]`).click();
      h.panel.querySelector(`[data-theme-choice="${theme}"]`).click();
      h.panel.querySelector(`[data-effects-choice="${effects}"]`).click();
      assert.equal(h.panel.hidden, false, 'choosing settings keeps the popover open');
      assert.equal(h.d.documentElement.lang, locale);
      assert.equal(h.d.documentElement.dataset.visaTheme, theme === 'system' ? 'dark' : theme);
      assert.equal(h.w.garyVisaPreferences.effects, effects === 'on');
      assert.equal(h.panel.querySelector('[data-theme-choice][aria-pressed="true"]').dataset.themeChoice, theme);
      assert.equal(h.panel.querySelector('[data-effects-choice][aria-pressed="true"]').dataset.effectsChoice, effects);
      assert.equal(h.panel.querySelector('[data-preferences-appearance]').textContent, locale === 'vi' ? 'Giao diện' : 'Appearance');
      assert.equal(h.trigger.getAttribute('aria-label'), locale === 'vi' ? 'Tùy chọn website' : 'Website preferences');
      saved = storedValues(h);
      assert.deepEqual(saved, { 'gary-language': locale, 'gary-visa-theme': theme, 'gary-visa-effects': effects });
      h.panel.querySelector('[data-close-preferences]').click(); h.trigger.click();
      assert.equal(h.panel.querySelector('[data-lang][aria-pressed="true"]').dataset.lang, locale);
      assert.equal(h.panel.querySelector('[data-theme-choice][aria-pressed="true"]').dataset.themeChoice, theme);
      assert.equal(h.panel.querySelector('[data-effects-choice][aria-pressed="true"]').dataset.effectsChoice, effects);
    } finally { h.dom.window.close(); }
    const reloaded = environment({ dark: true, language: true, stored: saved });
    try {
      assert.equal(reloaded.d.documentElement.lang, locale);
      assert.equal(reloaded.w.garyVisaPreferences.theme, theme);
      assert.equal(reloaded.w.garyVisaPreferences.effects, effects === 'on');
      assert.equal(reloaded.panel.hidden, true);
      assert.deepEqual(storedValues(reloaded), saved);
    } finally { reloaded.dom.window.close(); }
  }
});

test('acceleration guidance starts hidden and only appears for an enabled, rendered highway', () => {
  assert.match(html, /<p data-effects-hint hidden>/);
  assert.match(css, /html:not\(\[data-visa-effects=on\]\)\s+\.visa-public\s+\[data-effects-hint\]\s*\{\s*display:none/);
  const h = environment({ stored: { 'gary-visa-effects': 'off' } });
  try {
    const hint = h.d.querySelector('[data-effects-hint]');
    for (const value of ['idle', 'loading', 'active', 'paused', 'unavailable']) { status(h, value); assert.equal(hint.hidden, true); }
    h.d.querySelector('[data-effects-choice="on"]').click();
    assert.equal(hint.hidden, true, 'unavailable animation never displays acceleration guidance');
    for (const value of ['idle', 'loading']) { status(h, value); assert.equal(hint.hidden, true); }
    for (const value of ['active', 'paused']) { status(h, value); assert.equal(hint.hidden, false); }
    h.d.querySelector('[data-effects-choice="off"]').click();
    assert.equal(hint.hidden, true, 'Off immediately hides a previously active instruction');
    status(h, 'active'); assert.equal(hint.hidden, true, 'late readiness cannot show instructions after Off');
  } finally { h.dom.window.close(); }
});

test('unavailable WebGL exposes translated static status only while effects remain enabled', () => {
  const h = environment({ language: true });
  try {
    const fallback = h.d.querySelector('[data-effects-fallback]');
    status(h, 'unavailable');
    assert.equal(fallback.hidden, false);
    assert.equal(fallback.getAttribute('role'), 'status');
    h.d.querySelector('[data-lang="vi"]').click();
    assert.match(fallback.textContent, /Thiết bị này không hỗ trợ hoạt ảnh/);
    h.d.querySelector('[data-effects-choice="off"]').click();
    assert.equal(fallback.hidden, true);
    status(h, 'unavailable'); assert.equal(fallback.hidden, true);
  } finally { h.dom.window.close(); }
});


test('unified controls preserve the real lazy lifecycle: no disabled import, no theme remount, genuine Off teardown', async () => {
  const h = environment({ reduce: true, language: true });
  const calls = { loads: 0, mounts: 0, unmounts: 0 };
  let ready;
  const settle = async () => { for (let i = 0; i < 5; i++) await Promise.resolve(); };
  const controller = createVisualEffectsController({
    window: h.w, document: h.d,
    loadMount: async () => {
      calls.loads++;
      return { mountHyperspeed(_host, _hero, options) {
        calls.mounts++; ready = options.onReady;
        return { setPaused() {}, unmount() { calls.unmounts++; } };
      } };
    }
  });
  try {
    h.trigger.click();
    h.d.querySelector('[data-theme-choice="dark"]').click();
    h.d.querySelector('[data-lang="vi"]').click();
    await settle();
    assert.deepEqual(calls, { loads: 0, mounts: 0, unmounts: 0 });
    h.d.querySelector('[data-effects-choice="on"]').click();
    await settle(); ready();
    assert.deepEqual(calls, { loads: 1, mounts: 1, unmounts: 0 });
    assert.equal(h.d.querySelector('[data-effects-hint]').hidden, false);
    h.d.querySelector('[data-theme-choice="light"]').click();
    h.d.querySelector('[data-lang="en"]').click();
    await settle();
    assert.deepEqual(calls, { loads: 1, mounts: 1, unmounts: 0 }, 'appearance and language reuse the active renderer');
    h.d.querySelector('[data-effects-choice="off"]').click();
    assert.deepEqual(calls, { loads: 1, mounts: 1, unmounts: 1 });
    assert.equal(h.d.querySelector('[data-effects-hint]').hidden, true);
    h.d.querySelector('[data-effects-choice="off"]').click();
    assert.equal(calls.unmounts, 1, 'reselecting Off is idempotent');
    h.d.querySelector('[data-effects-choice="on"]').click(); await settle();
    assert.deepEqual(calls, { loads: 1, mounts: 2, unmounts: 1 }, 'explicit re-enable reuses the loaded module');
  } finally { controller.destroy(); h.dom.window.close(); }
  assert.equal(calls.unmounts, 2);
});
