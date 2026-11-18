import test from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {showActionToast, setCounterValues, clearCounterValues} from '../dist/action-toast.js';
import {bindFeedbackDom} from './feedback-test-dom.mjs';

test('one host keeps a bounded, duplicate-free stack across dialog closure', async () => {
  const dom = new JSDOM('<dialog open><form></form></dialog>', {pretendToBeVisual:true});
  const {window} = dom, doc = window.document;
  bindFeedbackDom(window);
  try {
    const first = showActionToast(doc, 'Saved', {key:'save'});
    assert.equal(showActionToast(doc, 'Saved', {key:'save'}).node, first.node);
    assert.equal(doc.querySelectorAll('.action-toast').length, 1);
    assert.ok(doc.querySelector('dialog').contains(first.node));
    doc.querySelector('dialog').removeAttribute('open');
    await Promise.resolve();
    assert.ok(first.node.isConnected);
    assert.ok(!first.node.closest('dialog'));

    showActionToast(doc, 'Check the document', {tone:'warning'});
    showActionToast(doc, 'Could not sync', {tone:'error'});
    const info = showActionToast(doc, 'Đã cập nhật danh sách', {tone:'info', language:'vi'});
    assert.equal(doc.querySelectorAll('[data-action-toast-host]').length, 1);
    assert.deepEqual([...doc.querySelectorAll('.action-toast')].map(node=>node.dataset.tone), ['warning','error','info']);
    assert.equal(doc.querySelector('[data-tone="error"] [role="alert"]').textContent, 'Could not sync');
    assert.equal(info.node.querySelector('[data-success-close]').textContent, 'Đóng');
    info.node.querySelector('[data-success-close]').click();
    assert.equal(info.node, null);
  } finally { window.close(); }
});

test('Counter animates actual changes and exposes only the settled value to assistive technology', async () => {
  const dom = new JSDOM('<strong id="case-count">—</strong>', {pretendToBeVisual:true});
  const {window} = dom, doc = window.document;
  const frames = new Map(), witnesses = new Set();
  let sequence = 0, now = performance.now();
  const media = new window.EventTarget();
  media.matches = false;
  window.matchMedia = () => media;
  window.requestAnimationFrame = callback => {frames.set(++sequence, callback);return sequence;};
  window.cancelAnimationFrame = id => frames.delete(id);
  window.IntersectionObserver = class {
    constructor(callback){this.callback=callback;}
    observe(){witnesses.add(this.callback);}
    disconnect(){witnesses.delete(this.callback);}
  };
  bindFeedbackDom(window);
  const set = value => setCounterValues(doc, {'case-count':value},'en');
  const runFrames = () => {
    for(let step=0;step<100&&frames.size;step++){
      const callbacks=[...frames.values()];
      frames.clear();now+=20;callbacks.forEach(callback=>callback(now));
    }
    assert.equal(frames.size,0);
  };
  try {
    set(null);
    assert.equal(doc.querySelector('#case-count').textContent,'—');
    set(8);
    const counter=doc.querySelector('.rb-counter');
    assert.equal(frames.size,0);
    assert.equal(counter.querySelector('[aria-live]').textContent,'8');
    assert.equal(counter.querySelector('.rb-counter__row').getAttribute('aria-hidden'),'true');
    for(const observer of [...witnesses])observer([{isIntersecting:true}]);
    assert.equal(witnesses.size,0);
    assert.equal(frames.size,1);
    runFrames();
    set(8);
    assert.equal(doc.querySelector('.rb-counter'),counter);
    assert.equal(frames.size,0);
    set(19);
    assert.equal(counter.querySelector('[aria-live]').textContent,'19');
    assert.equal(frames.size,1);
    runFrames();
    set(7);
    assert.equal(counter.querySelector('[aria-live]').textContent,'7');
    assert.equal(frames.size,1);
    runFrames();
    media.matches=true;
    media.dispatchEvent(new window.Event('change'));
    await Promise.resolve();
    assert.equal(doc.querySelector('#case-count').textContent,'7');
    media.matches=false;
    media.dispatchEvent(new window.Event('change'));
    await Promise.resolve();
    assert.ok(doc.querySelector('.rb-counter__row'));
    assert.equal(witnesses.size,0,'resuming motion does not replay a count that already appeared');
    assert.equal(frames.size,0);
    clearCounterValues(doc,['case-count']);
    media.matches=true;
    set(22);
    assert.equal(doc.querySelector('#case-count').textContent,'22');
    assert.equal(frames.size,0);
  } finally { window.close(); }
});
