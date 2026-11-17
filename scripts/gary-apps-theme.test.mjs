import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const component = await readFile(new URL('../dist/gary-apps.css', import.meta.url), 'utf8');
const host = await readFile(new URL('../dist/public-design.css', import.meta.url), 'utf8');
const stylesheet = css => new JSDOM(`<style>${css}</style>`).window.document.styleSheets[0];
const declarations = style => Object.fromEntries([...Array(style.length)].map((_, i) => style[i]).filter(key => key.startsWith('--')).map(key => [key, style.getPropertyValue(key).trim()]));
const rule = (sheet, selector) => [...sheet.cssRules].find(value => value.selectorText === selector);
const componentSheet = stylesheet(component), hostSheet = stylesheet(host);
function resolve(value, variables) {
  // The adapter deliberately exposes simple aliases to the owning site's palette.
  return value.replace(/var\((--[\w-]+)(?:,\s*([^()]+|var\([^()]+\)))?\)/g, (_, key, fallback) => {
    assert.ok(variables[key] || fallback, `Unresolved theme token ${key}`);
    return resolve(variables[key] || fallback, variables);
  });
}
function luminance(hex) {
  const expanded = hex.length === 4 ? '#' + [...hex.slice(1)].map(c => c + c).join('') : hex;
  assert.match(expanded, /^#[0-9a-f]{6}$/i);
  const rgb = [1, 3, 5].map(i => parseInt(expanded.slice(i, i + 2), 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);

test('shared switcher consumes host semantic tokens for every colored element, including connected releases', () => {
  const adapter = rule(componentSheet, 'body.visa-public .gary-apps-menu');
  assert.ok(adapter, 'public adapter has higher specificity than shared release defaults');
  const tokens = declarations(adapter.style);
  for (const value of Object.values(tokens)) assert.match(value, /^var\(--visa-/, 'active site owns every component color role');
  assert.match(tokens['--gary-app-muted'], /--visa-muted/);
  assert.match(tokens['--gary-app-surface'], /--visa-surface/);
  assert.match(tokens['--gary-platform-home'], /--visa-platform-home/);
  assert.doesNotMatch(component, /data-visa-theme|prefers-color-scheme/, 'shared styling must not independently decide the active theme');
  for (const current of componentSheet.cssRules) {
    if (!current.style || current.selectorText === 'body .gary-apps-menu') continue;
    for (let i = 0; i < current.style.length; i++) {
      const property = current.style[i];
      if (property.startsWith('--')) continue;
      assert.doesNotMatch(current.style.getPropertyValue(property), /#[\da-f]{3,8}\b/i, `${current.selectorText} ${property} must use semantic tokens`);
    }
  }
  for (const selector of ['body .gary-apps-menu-heading>strong', 'body .gary-app-menu-host', 'body .gary-app-menu-item>svg', 'body .gary-app-menu-item strong>small', 'body .gary-apps-menu-panel .gary-apps-menu-all']) {
    assert.match(rule(componentSheet, selector)?.style.color || '', /var\(--gary-app-/);
  }
  assert.match(component, /\.gary-app-menu-item:is\(:hover,:focus-visible\)/);
  assert.match(component, /\.gary-apps-menu a:focus-visible/);
});

test('actual light and dark host palettes keep menu text, active badges, brand glyphs and focus visible', () => {
  const light = declarations(rule(hostSheet, 'html').style);
  const dark = declarations(rule(hostSheet, 'html[data-visa-theme=dark]').style);
  const adapter = declarations(rule(componentSheet, 'body.visa-public .gary-apps-menu').style);
  for (const [theme, palette] of [['light', light], ['dark', { ...light, ...dark }]]) {
    const all = { ...palette, ...adapter };
    const color = name => resolve(all[name], all);
    const pairs = [
      ['--gary-app-ink', '--gary-app-surface'], ['--gary-app-muted', '--gary-app-surface'],
      ['--gary-app-muted', '--gary-app-hover'], ['--gary-app-ink', '--gary-app-raised'],
      ['--gary-app-action', '--gary-app-raised'], ['--gary-app-action', '--gary-app-hover'],
      ['--gary-platform-home', '--gary-app-surface'], ['--gary-platform-jobs', '--gary-app-surface'],
      ['--gary-platform-visa', '--gary-app-surface'],
    ];
    for (const [foreground, background] of pairs) {
      const ratio = contrast(color(foreground), color(background));
      assert.ok(ratio >= 4.5, `${theme}: ${foreground} on ${background} = ${ratio.toFixed(2)}:1`);
    }
    for (const foreground of ['--gary-app-focus', '--gary-app-control-border']) {
      const ratio = contrast(color(foreground), color('--gary-app-surface'));
      assert.ok(ratio >= 3, `${theme}: control ${foreground} = ${ratio.toFixed(2)}:1`);
    }
  }
});
