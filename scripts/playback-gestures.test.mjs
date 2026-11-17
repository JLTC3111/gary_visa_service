import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { attachPlaybackGestures } from '../src/visuals/playback-gestures.js';

function harness({ paused = false } = {}) {
  const dom = new JSDOM('<section id="hero"><canvas id="road"></canvas><div id="blank"></div><button id="button">Action</button><a id="link" href="#next"><span>Link</span></a><input id="input"><select id="select"><option>Value</option></select><summary id="summary">Menu</summary><label id="label">Label</label><div id="role" role="button">Control</div><div id="editable" contenteditable>Editable</div><h1 id="heading">Headline</h1><p id="paragraph">Copy</p></section><div id="outside"></div>', { pretendToBeVisual: true });
  const w = dom.window, d = w.document;
  let time = 0, serial = 0, toggles = 0;
  const timers = new Map(), boosts = [];
  const gestures = attachPlaybackGestures({
    hero: d.getElementById('hero'), browser: w, document: d,
    onToggle: () => toggles++, onBoost: value => boosts.push(value),
    isPaused: () => paused, now: () => time,
    setTimer: (callback, delay) => { const id = ++serial; timers.set(id, { callback, at: time + delay }); return id; },
    clearTimer: id => timers.delete(id)
  });
  function pointer(target, type, extra = {}) {
    const node = typeof target === 'string' ? d.getElementById(target) : target;
    const event = new w.MouseEvent(type, { bubbles: true, cancelable: true, clientX: 50, clientY: 50, button: 0, ...extra });
    for (const [key,value] of Object.entries({ pointerId: 1, pointerType: 'mouse', isPrimary: true, ...extra })) {
      if (!['clientX','clientY','button'].includes(key)) Object.defineProperty(event,key,{value});
    }
    node.dispatchEvent(event);
    return event;
  }
  return {
    dom, w, d, gestures, timers, boosts, pointer,
    get toggles() { return toggles; },
    setPaused(value) { paused = value; if (value) gestures.cancel(); },
    advance(ms) {
      const end = time + ms;
      while (timers.size) {
        const [id, timer] = [...timers].sort((a,b) => a[1].at - b[1].at)[0];
        if (timer.at > end) break;
        time = timer.at; timers.delete(id); timer.callback();
      }
      time = end;
    },
    close() { gestures.destroy(); dom.window.close(); }
  };
}

test('short canvas/background taps toggle once without accelerating or preventing native behavior', () => {
  const h = harness();
  try {
    const down = h.pointer('road','pointerdown'); h.advance(150);
    const up = h.pointer('road','pointerup');
    assert.equal(h.toggles,1); assert.deepEqual(h.boosts,[]);
    assert.equal(down.defaultPrevented,false); assert.equal(up.defaultPrevented,false);
    h.pointer('blank','pointerdown'); h.advance(299); h.pointer('blank','pointerup');
    assert.equal(h.toggles,2); assert.equal(h.timers.size,0);
  } finally { h.close(); }
});

test('a 300ms hold accelerates while playing and never toggles playback when released', () => {
  const h = harness();
  try {
    h.pointer('road','pointerdown'); h.advance(299); assert.deepEqual(h.boosts,[]);
    h.advance(1); assert.deepEqual(h.boosts,[true]);
    h.advance(700); h.pointer('road','pointerup');
    assert.deepEqual(h.boosts,[true,false]); assert.equal(h.toggles,0); assert.equal(h.timers.size,0);
  } finally { h.close(); }
});

test('paused long presses neither resume nor accelerate; a short tap still requests resume', () => {
  const h = harness({paused:true});
  try {
    h.pointer('road','pointerdown'); h.advance(500); h.pointer('road','pointerup');
    assert.equal(h.toggles,0); assert.deepEqual(h.boosts,[]);
    h.pointer('road','pointerdown'); h.advance(100); h.pointer('road','pointerup');
    assert.equal(h.toggles,1); assert.deepEqual(h.boosts,[]);
  } finally { h.close(); }
});

test('an established mouse hold keeps acceleration while steering; touch and pen drags relinquish it', () => {
  const mouse=harness();
  try {
    mouse.pointer('road','pointerdown');mouse.advance(300);
    mouse.pointer('road','pointermove',{clientX:250});
    assert.deepEqual(mouse.boosts,[true]);
    mouse.pointer('road','pointerup',{clientX:250});
    assert.deepEqual(mouse.boosts,[true,false]);assert.equal(mouse.toggles,0);
  } finally {mouse.close();}
  for(const pointerType of ['touch','pen']){
    const h=harness();
    try {
      h.pointer('road','pointerdown',{pointerType});h.advance(300);
      h.pointer('road','pointermove',{clientX:250,pointerType});
      assert.deepEqual(h.boosts,[true,false],pointerType);
      h.pointer('road','pointerup',{clientX:250,pointerType});assert.equal(h.toggles,0,pointerType);
    } finally {h.close();}
  }
});

test('dragging, scroll, leave, cancellation, blur, visibility loss and playback pause clear pending holds', () => {
  for (const reason of ['drag','scroll','leave','cancel','blur','hidden','pause']) {
    const h = harness();
    try {
      h.pointer('road','pointerdown'); h.advance(120);
      if (reason==='drag') h.pointer('road','pointermove',{clientY:61});
      if (reason==='scroll') h.d.dispatchEvent(new h.w.Event('scroll'));
      if (reason==='leave') h.pointer('hero','pointerleave');
      if (reason==='cancel') h.pointer('road','pointercancel');
      if (reason==='blur') h.w.dispatchEvent(new h.w.Event('blur'));
      if (reason==='hidden') { Object.defineProperty(h.d,'visibilityState',{value:'hidden'}); h.d.dispatchEvent(new h.w.Event('visibilitychange')); }
      if (reason==='pause') h.setPaused(true);
      assert.equal(h.timers.size,0,reason);
      h.advance(500); h.pointer('road','pointerup');
      assert.equal(h.toggles,0,reason); assert.deepEqual(h.boosts,[],reason);
    } finally { h.close(); }
  }
});

test('controls, links, editable content and editorial text do not start a canvas gesture', () => {
  const h = harness();
  try {
    for (const target of ['button','link','input','select','summary','label','role','editable','heading','paragraph']) {
      const down = h.pointer(target,'pointerdown'); h.advance(350); h.pointer(target,'pointerup');
      assert.equal(down.defaultPrevented,false,target);
      assert.equal(h.timers.size,0,target);
    }
    let clicks=0; h.d.getElementById('button').addEventListener('click',()=>clicks++); h.d.getElementById('button').click();
    assert.equal(clicks,1); assert.equal(h.toggles,0); assert.deepEqual(h.boosts,[]);
    const space = new h.w.KeyboardEvent('keydown',{key:' ',bubbles:true,cancelable:true});
    h.d.getElementById('input').dispatchEvent(space); assert.equal(space.defaultPrevented,false);
  } finally { h.close(); }
});

test('multiple pointers, secondary buttons and releases outside the hero cannot toggle accidentally', () => {
  const h = harness();
  try {
    h.pointer('road','pointerdown',{pointerType:'touch'}); h.advance(100);
    h.pointer('road','pointerdown',{pointerId:2,pointerType:'touch',isPrimary:false});
    h.pointer('road','pointerup',{pointerType:'touch'}); h.pointer('road','pointerup',{pointerId:2,pointerType:'touch',isPrimary:false});
    h.advance(500); assert.equal(h.toggles,0); assert.deepEqual(h.boosts,[]);
    h.pointer('road','pointerdown',{button:2}); h.advance(100); h.pointer('road','pointerup',{button:2});
    h.pointer('road','pointerdown'); h.advance(100); h.pointer('outside','pointerup');
    assert.equal(h.toggles,0); assert.equal(h.timers.size,0);
  } finally { h.close(); }
});

test('pause and teardown release an active boost, remove timers/listeners and are idempotent', () => {
  const h = harness();
  try {
    h.pointer('road','pointerdown'); h.advance(300); h.setPaused(true);
    assert.deepEqual(h.boosts,[true,false]); h.pointer('road','pointerup'); assert.equal(h.toggles,0);
    h.setPaused(false); h.pointer('road','pointerdown'); h.advance(100);
    h.gestures.destroy(); h.gestures.destroy(); assert.equal(h.timers.size,0);
    h.advance(1000); h.pointer('road','pointerup'); h.pointer('road','pointerdown'); h.advance(350); h.pointer('road','pointerup');
    assert.equal(h.toggles,0); assert.deepEqual(h.boosts,[true,false]); assert.equal(h.timers.size,0);
  } finally { h.close(); }
});
