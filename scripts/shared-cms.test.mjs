import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import {bindFeedbackDom} from './feedback-test-dom.mjs';

import { mountCms } from '../dist/cms-foundation/index.js';

const record = {id: 'one', kind: 'article', slug: 'guide', title_en: 'English guide', title_vi: 'Cẩm nang tiếng Việt', summary_en: 'A useful guide to a clear next step.', summary_vi: 'Cẩm nang hữu ích cho bước tiếp theo.', body_en: 'The English body', body_vi: 'Nội dung tiếng Việt', data: {}, status: 'draft', version: 1};
const settle = async () => { for (let i = 0; i < 6; i++) await new Promise(resolve => setImmediate(resolve)); };
function harness(overrides = {}, language = 'en') {
  const dom = new JSDOM('<main id="root"></main>', {url: 'https://example.test/portal.html'}), root = dom.window.document.querySelector('main');
  bindFeedbackDom(dom.window);
  dom.window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  dom.window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  dom.window.confirm = () => true;
  const calls = [];
  const adapter = {capabilities: async () => ({read: true, edit: true, publish: false, media: false, role: 'editor'}), list: async input => {calls.push(['list', input]); return {records: [structuredClone(record)], total: 1};}, save: async (entry, options) => {calls.push(['save', entry, options]); return {...entry, id: 'one', version: entry.version + 1};}, transition: async (...args) => {calls.push(['transition', ...args]); return {...record, status: args[1], version: 2};}, revisions: async () => [], restore: async () => ({...record, version: 2}), ...overrides};
  const controller = mountCms(root, {appId: 'visa', language, collections: [{kind: 'article', label: {en: 'Articles', vi: 'Bài viết'}}], adapter});
  const input = (selector, value) => { const target = root.querySelector(selector); assert.ok(target, selector); target.value = value; target.dispatchEvent(new dom.window.Event('input', {bubbles: true})); };
  return {dom, root, calls, adapter, controller, input, close() {controller.destroy({force: true});dom.window.close();}};
}
test('Visa CMS card controls preserve localized searches, filters and the existing editor and Trash actions', async () => {
  const h=harness({capabilities:async()=>({read:true, edit:true, delete:true, role:'admin'}),remove:async()=>{}},'vi');
  try{
    await h.controller.ready;
    const find=selector=>h.root.querySelector(selector);
    assert.equal(find('[data-action=search] use').getAttribute('href'),'./assets/staff-nav-icons.svg#search');
    assert.equal(find('[data-action=refresh] use').getAttribute('href'),'./assets/staff-nav-icons.svg#refresh-cw');
    assert.equal(find('[data-action=refresh]').getAttribute('aria-label'),'Tải lại danh sách');
    assert.equal(find('[data-action=new]').textContent,'Tạo bài');
    assert.equal(find('table.cms-entry-table').getAttribute('role'),'table');
    assert.equal(find('.cms-entry-actions [data-action=edit]').getAttribute('aria-label'),'Sửa bài viết');
    const more = find('.cms-entry-actions [data-action=more]');
    const menu = h.root.querySelector('#' + more.getAttribute('aria-controls'));
    assert.equal(menu.hidden,true);
    more.click();
    assert.equal(menu.hidden,false);
    assert.equal(menu.querySelector('[data-action=delete]').dataset.index,'0');
    more.dispatchEvent(new h.dom.window.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));
    assert.equal(menu.hidden,true);
    assert.equal(h.dom.window.document.activeElement,more);
    h.input('[data-cms-search]','cẩm nang');
    find('[data-action=search]').click();await settle();
    assert.equal(h.calls.at(-1)[1].query,'cẩm nang');
    find('[data-cms-status]').value='draft';
    find('[data-cms-status]').dispatchEvent(new h.dom.window.Event('change',{bubbles:true}));await settle();
    assert.equal(h.calls.at(-1)[1].status,'draft');
    find('[data-action=refresh]').click();await settle();
    assert.equal(h.calls.at(-1)[1].status,'draft');
    find('[data-action=new]').click();await settle();
    assert.ok(find('.cms-dialog[open] [data-cms-editor]'));
  }finally{h.close();}
  const css=await readFile(new URL('../dist/cms-foundation/styles.css',import.meta.url),'utf8');
  assert.match(css,/\.cms-article-toolbar \.cms-toolbar-icon-button \{[^}]*width: 44px; height: 44px;/);
  assert.match(css,/\.gary-cms \.cms-entry-table \{ display: block; min-width: 0; \}/);
});
test('editor keeps the same bilingual draft through locale changes and honors dirty leave guard', async () => {
  const h = harness(); await h.controller.ready; h.root.querySelector('[data-action=edit]').click(); await settle();
  assert.equal(h.root.querySelector('[data-action=publish]'), null, 'Editor cannot publish from UI');
  h.input('[name=title_en]', '<script>alert(1)</script> A new title');
  assert.equal(h.controller.isDirty(), true); h.controller.setLanguage('vi');
  assert.equal(h.root.querySelector('[name=title_en]').value, '<script>alert(1)</script> A new title');
  assert.equal(h.root.querySelector('[data-cms-preview] script'), null, 'Preview never executes authored HTML');
  assert.match(h.root.textContent, /Quản lý nội dung/);
  h.dom.window.confirm = () => false;
  assert.equal(h.controller.destroy(), false); assert.ok(h.root.querySelector('form'));
  assert.equal(await h.controller.refresh(), false); h.close();
});
test('version conflicts preserve the entire draft and show localized recovery guidance', async () => {
  const h = harness({save: async () => {throw {code: 'PT409', message: 'DO NOT DISPLAY SERVER SQL'};}}, 'vi'); await h.controller.ready;
  h.root.querySelector('[data-action=edit]').click(); await settle(); h.input('[name=body_vi]', 'Thay đổi chưa lưu');
  h.root.querySelector('[data-cms-editor]').dispatchEvent(new h.dom.window.Event('submit', {bubbles: true, cancelable: true})); await settle();
  assert.equal(h.root.querySelector('[name=body_vi]').value, 'Thay đổi chưa lưu'); assert.equal(h.controller.isDirty(), true);
  assert.match(h.root.querySelector('[data-editor-notice]').textContent, /Người khác đã thay đổi/);
  assert.ok(!h.root.textContent.includes('DO NOT DISPLAY SERVER SQL')); h.close();
});
test('publish blocks incomplete Vietnamese fields before requesting a transition', async () => {
  const h = harness({capabilities: async () => ({read: true, edit: true, publish: true, role: 'publisher'}), list: async () => ({records: [{...record, title_vi: '', status: 'review'}], total: 1})}); await h.controller.ready;
  h.root.querySelector('[data-action=edit]').click(); await settle(); h.root.querySelector('[data-action=publish]').click(); await settle();
  assert.equal(h.calls.filter(call => call[0] === 'transition').length, 0);
  assert.equal(h.root.querySelector('[name=title_vi]').getAttribute('aria-invalid'), 'true'); h.close();
});
test('successful saves send the expected version and reset only after persisted response', async () => {
  const h = harness(); await h.controller.ready; h.root.querySelector('[data-action=edit]').click(); await settle();
  assert.equal(h.root.querySelector('[data-cms-editor] button[type=submit]').dataset.buttonVariant, 'save-draft');
  assert.equal(h.root.querySelector('[data-cms-editor] [data-action=close]').dataset.buttonVariant, 'cancel');
  h.input('[name=title_en]', 'An updated English guide'); h.root.querySelector('form').dispatchEvent(new h.dom.window.Event('submit', {bubbles: true, cancelable: true})); await settle();
  const save = h.calls.find(call => call[0] === 'save'); assert.equal(save[2].expectedVersion, 1); assert.equal(save[1].title_en, 'An updated English guide');
  assert.equal(h.controller.isDirty(), false); assert.equal(h.root.querySelector('[name=title_en]').value, 'An updated English guide'); h.close();
});
test('denied or revoked access never fetches content and teardown cancels pending UI work', async () => {
  const denied = harness({capabilities: async () => ({read: false, edit: false, publish: false})}); await denied.controller.ready;
  assert.equal(denied.calls.length, 0); assert.equal(denied.root.querySelector('form'), null); denied.close();
  let release; const pending = harness({capabilities: () => new Promise(resolve => {release = resolve;})});
  pending.controller.destroy({force: true}); release({read: true, edit: true}); await pending.controller.ready;
  assert.equal(pending.calls.length, 0); assert.equal(pending.root.childElementCount, 0); pending.dom.window.close();
});
test('CMS paging is owned by the module and cannot activate a host recruitment pager', async () => {
  const h = harness({list: async input => {h.calls.push(['list', input]);return {records: [structuredClone(record)], total: 40};}});
  let hostClicks = 0; h.dom.window.document.addEventListener('click', event => {if (event.target.closest('[data-action=next]')) hostClicks++;});
  await h.controller.ready; h.root.querySelector('[data-action=next]').click(); await settle();
  assert.equal(hostClicks, 0); assert.equal(h.calls.at(-1)[1].page, 2); h.close();
});
test('publish is unavailable until review, and incomplete translations cannot be submitted for review', async () => {
  const h = harness({capabilities: async () => ({read:true,edit:true,publish:true}),list:async()=>({records:[{...record,title_vi:''}],total:1})});
  await h.controller.ready; h.root.querySelector('[data-action=edit]').click(); await settle();
  assert.equal(h.root.querySelector('[data-action=publish]'),null);
  h.root.querySelector('[data-action=review]').click(); await settle();
  assert.equal(h.calls.filter(call=>call[0]==='transition').length,0);
  assert.equal(h.root.querySelector('[name=title_vi]').getAttribute('aria-invalid'),'true');h.close();
});
