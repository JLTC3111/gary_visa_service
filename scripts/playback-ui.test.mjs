import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { createVisualEffectsController } from '../src/visuals/bootstrap.js';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const init = await readFile(new URL('../dist/appearance-init.js', import.meta.url), 'utf8');
const appearance = await readFile(new URL('../dist/appearance.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../dist/public-design.css', import.meta.url), 'utf8');
const settled = async () => { for (let i = 0; i < 5; i++) await Promise.resolve(); };

function environment({ effects = 'on', language = 'en' } = {}) {
  const dom = new JSDOM(html, { url: 'https://visa.garyhome.vn/', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, d = w.document;
  let time = 0, serial = 0;
  const timers = new Map();
  w.matchMedia = () => ({ matches: false, addEventListener() {} });
  w.localStorage.setItem('gary-visa-effects', effects);
  w.setTimeout = (callback, delay) => { const id = ++serial; timers.set(id, {callback, at:time + delay}); return id; };
  w.clearTimeout = id => timers.delete(id);
  d.documentElement.lang = language;
  w.eval(init); w.eval(appearance);
  const hero = d.getElementById('visa-cinematic-hero'), button = d.querySelector('[data-playback-control]');
  return {
    dom, w, d, hero, button, timers,
    status(value) { w.dispatchEvent(new w.CustomEvent('gary:visual-status', {detail:{status:value}})); },
    advance(ms) {
      const end = time + ms;
      while (timers.size) {
        const [id,timer] = [...timers].sort((a,b) => a[1].at-b[1].at)[0];
        if (timer.at > end) break;
        time=timer.at;timers.delete(id);timer.callback();
      }
      time=end;
    },
    close() { w.dispatchEvent(new w.Event('pagehide')); dom.window.close(); }
  };
}

test('playback action labels, icons and guidance follow the actual active/paused renderer status', () => {
  const h=environment();
  try {
    assert.equal(h.button.hidden,true);
    assert.equal(h.button.tagName,'BUTTON'); assert.equal(h.button.type,'button');
    assert.equal(h.button.getAttribute('aria-controls'),'visa-hyperspeed-host');
    h.status('active');
    assert.equal(h.button.hidden,false);
    assert.equal(h.button.getAttribute('aria-label'),'Pause animation');
    assert.equal(h.button.getAttribute('title'),'Pause animation');
    assert.equal(h.button.querySelector('[data-playback-symbol]').getAttribute('href'),'#i-pause');
    assert.match(h.d.querySelector('[data-effects-hint]').textContent,/Click the road to pause.*hold to accelerate/);
    h.status('paused');
    assert.equal(h.button.getAttribute('aria-label'),'Play animation');
    assert.equal(h.button.getAttribute('title'),'Play animation');
    assert.equal(h.button.querySelector('[data-playback-symbol]').getAttribute('href'),'#i-play');
    assert.equal(h.d.querySelector('[data-effects-hint]').textContent,'Click the road or press Play to resume.');
    assert.doesNotMatch(h.d.querySelector('[data-effects-hint]').textContent,/accelerate/);
  } finally {h.close();}
});

test('Vietnamese playback labels and paused guidance translate without changing hero links or preference shortcut', () => {
  const h=environment();
  try {
    const links=[...h.hero.querySelectorAll('a')].map(a=>a.getAttribute('href'));
    h.status('active'); h.d.documentElement.lang='vi'; h.d.dispatchEvent(new h.w.CustomEvent('gary:language'));
    assert.equal(h.button.getAttribute('aria-label'),'Tạm dừng hoạt ảnh');
    assert.match(h.d.querySelector('[data-effects-hint]').textContent,/tạm dừng.*Nhấn giữ/);
    h.status('paused'); assert.equal(h.button.getAttribute('aria-label'),'Phát hoạt ảnh');
    assert.equal(h.d.querySelector('[data-effects-hint]').textContent,'Nhấp vào đường hoặc nhấn Phát để tiếp tục.');
    const shortcut=h.hero.querySelector('[data-open-preferences="effects"]');
    assert.equal(shortcut.textContent,'Tùy chọn hiệu ứng');
    shortcut.click();
    assert.equal(h.d.getElementById('visa-preferences-panel').hidden,false);
    assert.equal(h.d.activeElement.dataset.effectsChoice,'on');
    assert.deepEqual([...h.hero.querySelectorAll('a')].map(a=>a.getAttribute('href')),links);
  } finally {h.close();}
});

test('disabled, unready or unavailable effects hide playback controls and acceleration guidance', () => {
  const h=environment();
  try {
    for (const status of ['loading','idle','off','unavailable','disposed']) {
      h.status(status);
      assert.equal(h.button.hidden,true,status);
      assert.equal(h.d.querySelector('[data-effects-hint]').hidden,true,status);
      assert.equal(h.hero.dataset.playbackFeedback,undefined,status);
    }
    h.status('active');assert.equal(h.button.hidden,false);
    h.w.setGaryVisaEffects(false);
    assert.equal(h.button.hidden,true);assert.equal(h.d.querySelector('[data-effects-hint]').hidden,true);
    assert.equal(h.d.querySelector('[data-effects-fallback]').hidden,true);
    h.status('active');assert.equal(h.button.hidden,true,'late active status cannot override Effects Off');
  } finally {h.close();}
});

test('feedback fades after 1800ms, movement replaces its one timer, and Off/pagehide clear it', () => {
  const h=environment();
  try {
    h.status('active');assert.equal(h.hero.dataset.playbackFeedback,'true');assert.equal(h.timers.size,1);
    h.advance(1799);assert.equal(h.hero.dataset.playbackFeedback,'true');
    h.advance(1);assert.equal(h.hero.dataset.playbackFeedback,undefined);assert.equal(h.timers.size,0);
    h.hero.dispatchEvent(new h.w.Event('pointermove'));h.advance(1000);
    h.hero.dispatchEvent(new h.w.Event('pointermove'));assert.equal(h.timers.size,1);
    h.advance(1000);assert.equal(h.hero.dataset.playbackFeedback,'true');
    h.advance(800);assert.equal(h.hero.dataset.playbackFeedback,undefined);
    h.status('paused');assert.equal(h.timers.size,1);
    h.w.setGaryVisaEffects(false);assert.equal(h.timers.size,0);assert.equal(h.hero.dataset.playbackFeedback,undefined);
    h.w.setGaryVisaEffects(true);h.status('active');assert.equal(h.timers.size,1);
    h.w.dispatchEvent(new h.w.Event('pagehide'));
    assert.equal(h.timers.size,0);assert.equal(h.hero.dataset.playbackFeedback,undefined);
  } finally {h.close();}
});

test('the native playback button drives the real controller without stealing keyboard events from other controls', async () => {
  const h=environment();
  const calls={mounts:0,pauses:[],unmounts:0};let ready;
  const controller=createVisualEffectsController({
    window:h.w,document:h.d,
    clock:{now:()=>0,setTimeout:()=>1,clearTimeout(){}},
    loadMount:async()=>({mountHyperspeed(_host,_hero,options){calls.mounts++;ready=options.onReady;return{setPaused(value){calls.pauses.push(value);},unmount(){calls.unmounts++;}};}})
  });
  try {
    await settled();ready();
    assert.equal(h.button.hidden,false);assert.equal(h.button.getAttribute('aria-label'),'Pause animation');
    h.button.focus();assert.equal(h.d.activeElement,h.button);assert.notEqual(h.button.getAttribute('tabindex'),'-1');
    // JSDOM does not synthesize a native button click from keyboard events.
    // Verify native semantics remain intact and exercise the activation path.
    for (const key of [' ','Enter']) {
      const event=new h.w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true});
      h.button.dispatchEvent(event);assert.equal(event.defaultPrevented,false);
    }
    h.button.click();assert.equal(h.button.getAttribute('aria-label'),'Play animation');assert.equal(calls.pauses.at(-1),true);
    h.button.click();assert.equal(h.button.getAttribute('aria-label'),'Pause animation');assert.equal(calls.pauses.at(-1),false);
    const input=h.d.getElementById('enquiry-name');
    for(const key of [' ','Enter']){const event=new h.w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true});input.dispatchEvent(event);assert.equal(event.defaultPrevented,false);}
    assert.equal(calls.mounts,1);assert.equal(calls.unmounts,0);
    controller.destroy();h.button.click();assert.equal(calls.unmounts,1);
  } finally {controller.destroy();h.close();}
});

const sheet = new JSDOM(`<style>${css}</style>`).window.document.styleSheets[0];
const rule = selector => [...sheet.cssRules].find(value=>value.selectorText===selector);
const vars = style => Object.fromEntries([...Array(style.length)].map((_,i)=>style[i]).filter(key=>key.startsWith('--')).map(key=>[key,style.getPropertyValue(key).trim()]));
const resolve = (value,palette) => value.replace(/var\((--[\w-]+)\)/g,(_,name)=>{assert.ok(palette[name],name);return palette[name];});
function luminance(hex){assert.match(hex,/^#[0-9a-f]{6}$/i);const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
const contrast=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);

test('hamburger hover, keyboard focus and expanded states pair readable icon ink with their actual surfaces', () => {
  const states=':is(:hover,:focus-visible,[aria-expanded=true])';
  const normal=rule(`.visa-public .header .menu-toggle${states}`),hero=rule(`.visa-public .header.over-hero .menu-toggle${states}`);
  assert.ok(normal);assert.ok(hero);
  const light=vars(rule('html').style),dark={...light,...vars(rule('html[data-visa-theme=dark]').style)};
  for(const [theme,palette]of[['light',light],['dark',dark]]){
    const ratio=contrast(resolve(normal.style.color,palette),resolve(normal.style.background,palette));
    assert.ok(ratio>=4.5,`${theme} hamburger icon contrast ${ratio}`);
  }
  assert.ok(contrast(hero.style.color,hero.style.background)>=4.5,'cinematic hover must not retain white icon strokes on a pale button');
  const icon=rule('.visa-public .header .menu-toggle .icon');
  assert.equal(icon.style.color,'inherit');assert.equal(icon.style.stroke,'currentColor');
  const markup=new JSDOM(html).window.document;
  for(const node of markup.querySelectorAll('#i-menu,#i-menu *')){
    assert.doesNotMatch(node.getAttribute('stroke')||'',/^#/);
    assert.doesNotMatch(node.getAttribute('style')||'',/color:|stroke:/);
  }
  assert.match(css,/\.playback-control:is\(:hover,:focus-visible\)\s*\{\s*opacity:1/);
});
