import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { createVisualEffectsController } from '../src/visuals/bootstrap.js';
import { mountSquishSwitches } from '../dist/squish-switch.js';
import { renderArticleDocument } from '../dist/cms-articles.js';
const init = await readFile(new URL('../dist/appearance-init.js', import.meta.url), 'utf8');
const controls = await readFile(new URL('../dist/appearance.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../dist/public-design.css', import.meta.url), 'utf8');
const app = await build({ entryPoints: ['dist/app.js'], bundle: true, write: false, format: 'iife', platform: 'browser' });
function environment({ dark = false, reduce = false, saveData = false, stored = {}, language = false, squish = false } = {}) {
  const dom = new JSDOM(html, { url: 'https://visa.garyhome.vn/', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, queries = new Map();
  w.matchMedia = query => { if (!queries.has(query)) queries.set(query, { matches: query.includes('color-scheme') ? dark : reduce, listeners: [], addEventListener(_, fn) { this.listeners.push(fn); } }); return queries.get(query); };
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new w.Event('close')); };
  Object.defineProperty(w.navigator, 'connection', { value: { saveData, addEventListener() {} } });
  for (const [key, value] of Object.entries(stored)) w.localStorage.setItem(key, value);
  w.eval(init);
  const switches = squish ? mountSquishSwitches(w.document) : null;
  if (language) w.eval(app.outputFiles[0].text);
  w.eval(controls);
  const d = w.document;
  return { dom, w, d, queries, switches, trigger: d.getElementById('visa-preferences-trigger'), panel: d.getElementById('visa-preferences-panel') };
}
function status(h, value) { h.w.dispatchEvent(new h.w.CustomEvent('gary:visual-status', { detail: { status: value } })); }
function key(h, node, value, options = {}) { return node.dispatchEvent(new h.w.KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...options })); }
function storedValues(h) { return Object.fromEntries(['gary-language', 'gary-visa-theme', 'gary-visa-effects'].map(name => [name, h.w.localStorage.getItem(name)])); }

test('Squish Switch uses Visa’s existing preferences, localized accessible state and reduced motion', () => {
  const h = environment({ language: true, reduce: true, squish: true });
  try {
    const language = h.panel.querySelector('.preferences-language [role=switch]');
    const effects = h.panel.querySelector('[data-squish-mode=effects] [role=switch]');
    const group = language.closest('fieldset');
    assert.deepEqual([...group.querySelectorAll('[role=switch]')], [language, effects]);
    assert.equal(group.querySelector('legend').textContent, 'Language and visual effects');
    h.trigger.click();
    assert.equal(h.d.activeElement, language);
    assert.equal(language.getAttribute('aria-label'), 'Use Vietnamese');
    assert.equal(language.getAttribute('aria-checked'), 'false');
    assert.equal(h.panel.querySelector('[data-lang=en]').hidden, true);
    key(h, language, 'ArrowRight');
    assert.equal(h.d.documentElement.lang, 'vi');
    assert.equal(h.w.localStorage.getItem('gary-language'), 'vi');
    assert.equal(language.getAttribute('aria-label'), 'Dùng tiếng Việt');
    assert.equal(group.querySelector('legend').textContent, 'Ngôn ngữ và hiệu ứng');
    assert.equal(language.getAttribute('aria-checked'), 'true');
    assert.equal(language.style.getPropertyValue('--ss-position'), '1');
    assert.equal(language.style.getPropertyValue('--ss-squish'), '1');
    assert.equal(h.panel.hidden, false);

    h.d.querySelector('[data-open-preferences=effects]').click();
    assert.equal(h.d.activeElement, effects);
    assert.equal(effects.getAttribute('aria-label'), 'Hiệu ứng');
    assert.equal(effects.getAttribute('aria-checked'), 'false');
    effects.click();
    assert.equal(h.w.localStorage.getItem('gary-visa-effects'), 'on');
    assert.equal(effects.getAttribute('aria-checked'), 'true');
    h.w.setGaryVisaEffects(false);
    assert.equal(effects.getAttribute('aria-checked'), 'false');
    assert.equal(h.w.garyVisaPreferences.theme, 'system');
  } finally { h.switches.destroy(); h.dom.window.close(); }
});

test('Squish Switch stretches on drag, cancels on Escape and commits once on release', () => {
  const h = environment({ language: true, squish: true });
  try {
    h.trigger.click();
    const button = h.panel.querySelector('.preferences-language [role=switch]');
    const pointer = (type, clientX) => {
      const event = new h.w.MouseEvent(type, { bubbles: true, button: 0, clientX, detail: 1 });
      Object.defineProperty(event, 'pointerId', { value: 1 });
      button.dispatchEvent(event);
    };
    let frame;
    h.w.requestAnimationFrame = callback => { frame = callback; return 1; };
    h.w.cancelAnimationFrame = () => { frame = null; };
    pointer('pointerdown', 0);
    pointer('pointermove', 3);
    assert.equal(button.style.getPropertyValue('--ss-position'), '0');
    pointer('pointermove', 30);
    assert.ok(Number(button.style.getPropertyValue('--ss-squish')) > 1);
    assert.equal(button.getAttribute('aria-checked'), 'false');
    key(h, button, 'Escape');
    assert.equal(h.panel.hidden, false);
    assert.equal(h.d.documentElement.lang, 'en');
    assert.equal(button.hasAttribute('data-held'), false);
    assert.ok(frame, 'an interrupted drag springs back');

    const motion = h.queries.get('(prefers-reduced-motion: reduce)');
    motion.matches = true;
    motion.listeners.forEach(listener => listener());
    assert.equal(button.style.getPropertyValue('--ss-position'), '0');
    let changes = 0;
    h.d.addEventListener('gary:language', () => changes++);
    pointer('pointerdown', 0);
    pointer('pointermove', 30);
    assert.equal(button.style.getPropertyValue('--ss-squish'), '1');
    pointer('pointerup', 30);
    pointer('click', 30);
    assert.equal(changes, 1);
    assert.equal(button.getAttribute('aria-checked'), 'true');
    assert.equal(button.style.getPropertyValue('--ss-position'), '1');
    assert.equal(frame, null);
  } finally { h.switches.destroy(); h.dom.window.close(); }
});

test('Squish Switch follows the Visa news page’s localized server-rendered article links', async () => {
  const shell = await readFile(new URL('../dist/articles.html', import.meta.url), 'utf8');
  const slug = 'work-permit-guide';
  const dom = new JSDOM(renderArticleDocument(shell, { language: 'vi', slug }), { url: `https://visa.garyhome.vn/vi/news/${slug}` });
  const d = dom.window.document, switches = mountSquishSwitches(d);
  try {
    const button = d.querySelector('#article-languages [role=switch]');
    const english = d.querySelector('[data-article-lang=en]');
    const routes = [];
    english.addEventListener('click', event => { event.preventDefault(); routes.push(event.currentTarget.pathname); });
    assert.equal(button.getAttribute('aria-checked'), 'true');
    button.click();
    assert.deepEqual(routes, [`/en/news/${slug}`]);
    assert.equal(d.documentElement.lang, 'vi', 'the destination determines the article locale');
  } finally { switches.destroy(); dom.window.close(); }
});

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
    const sections = h.panel.querySelectorAll('fieldset');
    assert.equal(sections.length, 2);
    assert.ok(sections[0].querySelector('[data-preferences-language]'));
    assert.ok(sections[0].querySelector('[data-preferences-effects]'));
    assert.ok(sections[1].querySelector('[data-preferences-appearance]'));
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

test('theme Squish Switch keeps Light, Dark and System, including persistence and system changes', () => {
  const h = environment({ dark: true, reduce: true, squish: true });
  try {
    const theme = h.panel.querySelector('[data-squish-mode="theme"] [role="radiogroup"]');
    const radios = [...theme.querySelectorAll('[role="radio"]')];
    assert.deepEqual(radios.map(radio => radio.textContent), ['Light', 'Dark', 'System']);
    assert.equal(radios.filter(radio => radio.getAttribute('aria-checked') === 'true').length, 1);
    assert.equal(theme.dataset.choice, 'system');
    assert.equal(theme.dataset.resolved, 'dark');
    assert.equal(theme.getAttribute('aria-label'), 'Appearance, System, currently dark');
    assert.equal(theme.style.getPropertyValue('--ss-position'), '1');
    assert.equal(theme.style.getPropertyValue('--ss-squish'), '1');
    assert.equal(h.panel.querySelector('[data-theme-choice="system"]').hidden, true);
    assert.equal(h.panel.querySelectorAll('[data-squish-mode="theme"] [role="radiogroup"]').length, 1);
    key(h, theme, 'ArrowLeft');
    assert.equal(h.w.localStorage.getItem('gary-visa-theme'), 'dark');
    assert.equal(theme.dataset.choice, 'dark');
    assert.equal(theme.style.getPropertyValue('--ss-position'), '0.5');
    assert.equal(h.panel.querySelector('[data-theme-choice="dark"]').getAttribute('aria-pressed'), 'true');
    const color = h.queries.get('(prefers-color-scheme: dark)');
    color.matches = false;
    color.listeners.forEach(fn => fn());
    assert.equal(h.d.documentElement.dataset.visaTheme, 'dark');
    assert.equal(theme.dataset.resolved, 'dark');
    key(h, theme, 'ArrowRight');
    assert.equal(h.w.garyVisaPreferences.theme, 'system');
    color.listeners.forEach(fn => fn());
    assert.equal(h.d.documentElement.dataset.visaTheme, 'light');
    assert.equal(theme.dataset.resolved, 'light');
    assert.equal(theme.dataset.choice, 'system');
    assert.equal(theme.getAttribute('aria-label'), 'Appearance, System, currently light');
    assert.equal(theme.style.getPropertyValue('--ss-position'), '1');
    h.d.documentElement.lang = 'vi';
    h.d.dispatchEvent(new h.w.Event('gary:language'));
    assert.equal(theme.getAttribute('aria-label'), 'Giao diện, Hệ thống, đang sáng');
    assert.equal(theme.querySelector('[role="radio"][aria-checked="true"]').textContent, 'Hệ thống');
    key(h, theme, 'Home');
    assert.equal(h.w.garyVisaPreferences.theme, 'light');
    assert.equal(h.d.documentElement.dataset.visaTheme, 'light');
    color.matches = true;
    color.listeners.forEach(fn => fn());
    assert.equal(theme.dataset.choice, 'light', 'an explicit theme stays put when the system changes');
  } finally { h.switches.destroy(); h.dom.window.close(); }
});

test('theme Squish Switch squashes while dragged, cancels on Escape and snaps when motion is reduced', () => {
  const h = environment({ squish: true });
  try {
    h.trigger.click();
    const theme = h.panel.querySelector('[data-squish-mode="theme"] [role="radiogroup"]');
    assert.equal(h.panel.hidden, false);
    assert.equal(theme.style.getPropertyValue('--ss-position'), '1');
    const pointer = (type, clientX) => {
      const event = new h.w.MouseEvent(type, { bubbles: true, button: 0, clientX, detail: 1 });
      Object.defineProperty(event, 'pointerId', { value: 7 });
      theme.dispatchEvent(event);
    };
    let frame;
    h.w.requestAnimationFrame = callback => { frame = callback; return 1; };
    h.w.cancelAnimationFrame = () => { frame = null; };
    pointer('pointerdown', 200);
    pointer('pointermove', 197);
    assert.equal(theme.style.getPropertyValue('--ss-position'), '1');
    pointer('pointermove', 80);
    assert.ok(Number(theme.style.getPropertyValue('--ss-squish')) > 1);
    assert.equal(theme.dataset.choice, 'system');
    key(h, theme, 'Escape');
    assert.equal(h.panel.hidden, false);
    assert.equal(theme.dataset.choice, 'system');
    assert.equal(theme.hasAttribute('data-held'), false);
    assert.ok(frame, 'an interrupted drag springs back');
    const motion = h.queries.get('(prefers-reduced-motion: reduce)');
    motion.matches = true;
    motion.listeners.forEach(listener => listener());
    assert.equal(theme.style.getPropertyValue('--ss-position'), '1');
    assert.equal(theme.style.getPropertyValue('--ss-squish'), '1');
    pointer('pointerdown', 200);
    pointer('pointermove', 40);
    assert.equal(theme.style.getPropertyValue('--ss-squish'), '1');
    pointer('pointerup', 40);
    pointer('click', 40);
    assert.equal(h.w.localStorage.getItem('gary-visa-theme'), 'light');
    assert.equal(theme.dataset.choice, 'light');
    assert.equal(theme.style.getPropertyValue('--ss-position'), '0');
    assert.equal(frame, null);
  } finally { h.switches.destroy(); h.dom.window.close(); }
});
