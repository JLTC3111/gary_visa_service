import { CMS_VERSION, LOCALES, emptyEntry, fieldsFor, getValue, setValue, safeMediaUrl, validateEntry, contentSeoFindings } from './content.js';
import { cmsText, validationText } from './copy.js';
import { localizeFinding } from './seo-findings.js';
export { CMS_VERSION, validateEntry, contentSeoFindings, safeMediaUrl } from './content.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
let serial = 0;

/** Framework-neutral editor. The adapter, never this UI, enforces authorization. */
export function mountCms(root, options) {
  if (!root || !options?.adapter || !options.collections?.length) throw new Error('CMS root, collections and adapter required');
  const adapter = options.adapter, id = `cms-${++serial}`;
  const mediaPolicy = options.mediaPolicy || adapter.mediaPolicy || { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'], maxBytes: 10 * 1024 * 1024 };
  let language = options.language === 'vi' ? 'vi' : 'en', disposed = false, epoch = 0, busy = false;
  let capabilities = { read: false, edit: false, publish: false, media: false };
  let kind = options.collections[0].kind, query = '', status = '', page = 1, total = 0, records = [], media = [], view = 'content';
  let draft = null, baseline = '', revisions = [], notice = '', noticeKind = 'status';
  const t = key => cmsText(key, language);
  const label = value => typeof value === 'object' ? value?.[language] || value?.en || '' : value || '';
  const collection = () => options.collections.find(item => item.kind === kind);
  const dirty = () => !!draft && JSON.stringify(draft) !== baseline;
  const date = value => { try { return value ? new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'; } catch { return '—'; } };
  const disabled = value => value ? ' disabled' : '';
  const button = (action, text, extra = '', off = false) => `<button type="button" data-action="${action}" ${extra}${disabled(off || busy)}>${escape(text)}</button>`;
  function errorText(error) {
    if (['CMS_REVIEW_REQUIRED', 'jobs.review_required'].includes(error?.message)) return t('reviewFirst');
    if (['40001', '409', 'CMS_VERSION_CONFLICT'].includes(String(error?.code))) return t('conflict');
    if (['42501', '401', '403'].includes(String(error?.code))) return t('denied');
    if (['42P01', '42883', 'PGRST202', 'PGRST205', 'CMS_NOT_CONFIGURED'].includes(String(error?.code))) return t('setup');
    if (typeof adapter.errorText === 'function') { const message = adapter.errorText(error, language); if (typeof message === 'string' && message) return message; }
    if (error?.code === '23514') return t('invalid');
    return t('unavailable');
  }
  function announce(text, failed = false) {
    notice = text; noticeKind = failed ? 'alert' : 'status';
    const target = root.querySelector('[data-cms-notice]');
    if (target) { target.textContent = text; target.setAttribute('role', noticeKind); }
    options.onNotice?.(text);
  }
  function canLeave() { return !dirty() || root.ownerDocument.defaultView.confirm(t('discard')); }
  function shell() {
    root.classList.add('gary-cms'); root.dataset.cmsApp = options.appId || 'content';
    const tabs = options.collections.map(item => button('collection', label(item.label), `data-kind="${escape(item.kind)}" aria-pressed="${item.kind === kind && view === 'content'}"`)).join('');
    root.innerHTML = `<header class="cms-header"><div><p class="cms-eyebrow">${escape(options.appName || options.appId || 'Gary Group')}</p><h2>${t('cms')}</h2><p>${t('intro')}</p></div><div class="cms-role">${t('role')}: ${escape(capabilities.role ? t(capabilities.role) : t('readOnly'))}</div></header><p class="cms-notice" data-cms-notice role="${noticeKind}" aria-live="polite">${escape(notice)}</p><nav class="cms-collections" aria-label="${t('content')}">${tabs}${button('media', t('media'), `aria-pressed="${view === 'media'}"`)}</nav><div class="cms-workspace" data-cms-workspace></div><dialog class="cms-dialog" id="${id}-editor" aria-labelledby="${id}-editor-heading"></dialog>`;
    renderWorkspace();
  }
  function renderWorkspace() {
    const target = root.querySelector('[data-cms-workspace]');
    if (!target) return;
    if (!capabilities.read) { target.innerHTML = `<div class="cms-empty" role="status">${escape(busy ? t('loading') : t('noAccess'))}${button('refresh', t('refresh'))}</div>`; return; }
    if (view === 'media') { renderMedia(target); return; }
    target.innerHTML = `<div class="cms-toolbar"><label class="cms-search"><span>${t('search')}</span><input type="search" data-cms-search value="${escape(query)}" maxlength="180"></label><label><span>${t('status')}</span><select data-cms-status><option value="">${t('all')}</option>${['draft', 'review', 'published', 'archived'].map(value => `<option value="${value}"${status === value ? ' selected' : ''}>${t(value)}</option>`).join('')}</select></label>${button('search', t('search'))}${button('refresh', t('refresh'))}${capabilities.edit ? button('new', t('add'), 'class="cms-primary"') : ''}</div><div class="cms-table-scroll" aria-busy="${busy}"><table><caption class="cms-sr">${escape(label(collection().label))}</caption><thead><tr><th scope="col">${t('title')}</th><th scope="col">${t('status')}</th><th scope="col">${t('updated')}</th><th scope="col">${t('actions')}</th></tr></thead><tbody>${records.length ? records.map((record, index) => `<tr><th scope="row"><strong>${escape(record[`title_${language}`] || record.title_en || record.title_vi || record.slug)}</strong><small>${escape(record.slug)}</small></th><td><span class="cms-badge cms-badge-${escape(record.status)}">${escape(t(record.status))}</span></td><td>${escape(date(record.updated_at))}</td><td>${button('edit', t('edit'), `data-index="${index}"`)}</td></tr>`).join('') : `<tr><td colspan="4" class="cms-empty">${escape(busy ? t('loading') : t('empty'))}</td></tr>`}</tbody></table></div><footer class="cms-pagination"><span>${t('results')}: ${total} · ${t('page')} ${page} ${t('of')} ${Math.max(1, Math.ceil(total / 20))}</span><div>${button('previous', t('previous'), '', page <= 1)}${button('next', t('next'), '', page * 20 >= total)}</div></footer>`;
  }
  async function refresh(recheck = false) {
    if (disposed) return;
    const requestEpoch = ++epoch; busy = true; renderWorkspace();
    try {
      if (recheck || !capabilities.read) {
        capabilities = { read: false, edit: false, publish: false, media: false, ...await adapter.capabilities() };
        if (disposed || requestEpoch !== epoch) return;
        if (!capabilities.read) { shell(); return; }
      }
      if (view === 'media') {
        const result = adapter.listMedia ? await adapter.listMedia() : [];
        if (disposed || requestEpoch !== epoch) return;
        media = Array.isArray(result) ? result : result.records || [];
      } else {
        const result = await adapter.list({ kind, query, status, page, pageSize: 20 });
        if (disposed || requestEpoch !== epoch) return;
        records = result.records || []; total = Number(result.total) || 0;
      }
    } catch (error) { if (!disposed && requestEpoch === epoch) announce(errorText(error), true); }
    finally { if (!disposed && requestEpoch === epoch) { busy = false; shell(); } }
  }
  function field(key, text, type = 'text', extra = {}) {
    const value = getValue(draft, key) ?? '', controlId = `${id}-${key.replace(/[^a-z0-9]/gi, '-')}`;
    const attributes = `id="${controlId}" name="${escape(key)}" data-field="${escape(key)}"${extra.locale ? ` lang="${extra.locale}"` : ''}${disabled(!capabilities.edit || busy)}`;
    let control;
    if (type === 'textarea' || type === 'list') control = `<textarea ${attributes} rows="${type === 'list' ? 4 : key.startsWith('body_') ? 10 : 3}" maxlength="50000"${type === 'list' ? ' data-list="true"' : ''}>${escape(Array.isArray(value) ? value.join('\n') : value)}</textarea>`;
    else if (type === 'select') control = `<select ${attributes}><option value="">—</option>${(extra.options || []).map(option => { const v = typeof option === 'object' ? option.value : option; return `<option value="${escape(v)}"${String(v) === String(value) ? ' selected' : ''}>${escape(typeof option === 'object' ? label(option.label || option.value) : option)}</option>`; }).join('')}</select>`;
    else control = `<input ${attributes} type="${['number', 'date', 'url'].includes(type) ? type : 'text'}" value="${escape(value)}"${extra.min !== undefined ? ` min="${Number(extra.min)}"` : ''}${extra.max !== undefined ? ` max="${Number(extra.max)}"` : ''}${type !== 'number' && type !== 'date' ? ' maxlength="2000"' : ''}>`;
    return `<label class="cms-field" for="${controlId}"><span>${escape(text)}${extra.required ? ` <small>(${t('required')})</small>` : ''}</span>${control}<small class="cms-field-error" data-error-for="${escape(key)}" aria-live="polite"></small></label>`;
  }
  function editor() {
    const dialog = root.querySelector('.cms-dialog');
    if (!dialog || !draft) return;
    const extraFields = fieldsFor(collection());
    dialog.innerHTML = `<header><div><p class="cms-eyebrow">${escape(label(collection().label))}</p><h2 id="${id}-editor-heading">${escape(draft.id ? t('edit') : t('add'))}</h2></div>${button('close', t('close'))}</header><form data-cms-editor novalidate><div class="cms-editor-meta">${field('slug', t('slug'))}<p><span class="cms-badge cms-badge-${escape(draft.status)}">${t(draft.status)}</span> · <span data-cms-dirty>${t('clean')}</span></p></div><p class="cms-hint">${t('snapshot')}</p><div class="cms-language-columns">${LOCALES.map(locale => `<section lang="${locale}" aria-label="${locale === 'en' ? 'English' : 'Tiếng Việt'}"><h3>${locale === 'en' ? 'English' : 'Tiếng Việt'}</h3>${field(`title_${locale}`, t('title'), 'text', { locale })}${field(`summary_${locale}`, t('summary'), 'textarea', { locale })}${field(`body_${locale}`, t('body'), 'textarea', { locale })}${extraFields.filter(item => item.locale === locale).map(item => field(item.key, label(item.label), item.type, item)).join('')}<details><summary>${t('seo')}</summary>${field(`seo_title_${locale}`, t('seoTitle'), 'text', { locale })}${field(`seo_description_${locale}`, t('seoDescription'), 'textarea', { locale })}</details></section>`).join('')}</div>${extraFields.filter(item => !item.locale).map(item => field(item.key, label(item.label), item.type, item)).join('')}<details class="cms-seo"><summary>${t('seo')}</summary><p class="cms-hint">${t('advisory')}</p><div data-cms-checks></div></details><details class="cms-preview"><summary>${t('preview')}</summary><div class="cms-language-columns" data-cms-preview></div></details><details data-cms-revisions><summary>${t('revision')}</summary><div data-cms-history><p>${t('loadingRevisions')}</p></div></details><p class="cms-dialog-notice" data-editor-notice role="status" aria-live="polite"></p><footer class="cms-editor-actions">${capabilities.edit ? `<button type="submit" class="cms-primary"${disabled(busy)}>${t('save')}</button>${button('review', t('submit'), '', !draft.id)}` : ''}${capabilities.publish ? `${button('publish', t('publish'), '', !draft.id || draft.status !== 'review')}${button('archive', t('archive'), '', !draft.id || draft.status === 'archived')}` : ''}${button('close', t('cancel'))}</footer></form>`;
    updateEditorChecks(); renderHistory();
    if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); } else dialog.setAttribute('open', '');
    dialog.querySelector('input')?.focus();
  }
  function updateEditorChecks() {
    if (!draft) return;
    const target = root.querySelector('[data-cms-checks]');
    if (target) target.innerHTML = contentSeoFindings(draft, collection()).map(finding => { const translated = localizeFinding(finding, language); return `<article class="cms-finding cms-${finding.severity}"><strong>${escape(t(finding.severity))}: ${escape(translated.title)}</strong><p>${escape(translated.recommendation || translated.explanation)}</p></article>`; }).join('');
    const preview = root.querySelector('[data-cms-preview]');
    if (preview) preview.innerHTML = LOCALES.map(locale => `<article lang="${locale}"><h3>${escape(draft[`title_${locale}`] || t('noPreview'))}</h3><p>${escape(draft[`summary_${locale}`])}</p><div class="cms-plain-content">${escape(draft[`body_${locale}`])}</div></article>`).join('');
    const dirtyState = root.querySelector('[data-cms-dirty]'); if (dirtyState) dirtyState.textContent = t(dirty() ? 'changed' : 'clean');
  }
  async function openEditor(record) {
    if (!canLeave()) return;
    draft = structuredClone(record || emptyEntry(kind)); draft.data ||= {};
    baseline = JSON.stringify(draft); revisions = []; editor();
    if (draft.id && adapter.revisions) {
      const selected = draft.id;
      try { const result = await adapter.revisions(selected); if (!disposed && draft?.id === selected) { revisions = Array.isArray(result) ? result : result.records || []; renderHistory(); } }
      catch (error) { if (draft?.id === selected) editorNotice(errorText(error)); }
    }
  }
  function editorNotice(text) { const target = root.querySelector('[data-editor-notice]'); if (target) { target.textContent = text; target.setAttribute('role', 'alert'); } }
  function renderHistory() {
    const target = root.querySelector('[data-cms-history]'); if (!target) return;
    target.innerHTML = revisions.length ? revisions.map((revision, index) => `<div class="cms-revision"><span>${escape(date(revision.created_at))} · v${escape(revision.version || index + 1)} · ${escape(t(revision.status || 'draft'))}</span>${capabilities.edit ? button('restore', t('restore'), `data-index="${index}"`) : ''}</div>`).join('') : `<p>${t('revisionsEmpty')}</p>`;
  }
  function showIssues(issues) {
    for (const target of root.querySelectorAll('[data-error-for]')) target.textContent = '';
    for (const control of root.querySelectorAll('[data-field]')) control.removeAttribute('aria-invalid');
    for (const issue of issues) {
      const target = [...root.querySelectorAll('[data-error-for]')].find(item => item.dataset.errorFor === issue.field);
      if (target) target.textContent = validationText(issue, language);
      const control = [...root.querySelectorAll('[data-field]')].find(item => item.dataset.field === issue.field);
      control?.setAttribute('aria-invalid', 'true');
    }
    if (issues.length) { editorNotice(t('invalid')); root.querySelector('[aria-invalid="true"]')?.focus(); }
    return issues.length > 0;
  }
  async function mutate(operation, success) {
    if (busy || !draft) return;
    busy = true;
    const controls = [...root.querySelectorAll('.cms-dialog button, .cms-dialog input, .cms-dialog textarea, .cms-dialog select')].map(control => [control, control.disabled]);
    for (const [control] of controls) control.disabled = true;
    try {
      const next = await operation();
      if (disposed) return;
      if (!next?.id || !Number.isFinite(Number(next.version))) throw new Error('Invalid content response');
      draft = structuredClone(next); draft.data ||= {}; baseline = JSON.stringify(draft);
      announce(success); busy = false; editor(); editorNotice(success);
      if (adapter.revisions) { const selected = draft.id; const result = await adapter.revisions(selected); if (draft?.id === selected) { revisions = Array.isArray(result) ? result : result.records || []; renderHistory(); } }
    } catch (error) { if (!disposed) { editorNotice(errorText(error)); options.onNotice?.(errorText(error)); } }
    finally { if (!disposed) { busy = false; for (const [control, wasDisabled] of controls) if (control.isConnected) control.disabled = wasDisabled; } }
  }
  function renderMedia(target) {
    const policyText = `${mediaPolicy.mimeTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} · ${Math.round(mediaPolicy.maxBytes / 1024 / 1024)} MB`;
    target.innerHTML = `<div class="cms-toolbar"><h3>${t('media')}</h3>${button('refresh', t('refresh'))}</div>${capabilities.media && adapter.uploadMedia ? `<form data-cms-upload><p>${escape(policyText)}</p><label class="cms-field"><span>${t('file')}</span><input type="file" name="file" accept="${escape(mediaPolicy.mimeTypes.join(','))}" required></label>${['en', 'vi'].map(locale => `<label class="cms-field"><span>${t(locale === 'en' ? 'altEn' : 'altVi')}</span><input name="alt_${locale}" lang="${locale}" maxlength="500"></label>`).join('')}<p class="cms-hint">${t('altHint')}</p><button type="submit"${disabled(busy)}>${t('upload')}</button></form>` : ''}<div class="cms-media-grid">${media.length ? media.map((item, index) => { const url = safeMediaUrl(item.url || item.public_url || item.signed_url || ''); return `<article>${url && /^image\//.test(item.mime_type || item.type || '') ? `<img src="${escape(url)}" alt="${escape(item[`alt_${language}`] || item.alt || item.filename || item.file_name || '')}" loading="lazy">` : ''}<strong>${escape(item.filename || item.file_name || item.name || item.path || item.object_path || '')}</strong><p>${escape(item[`alt_${language}`] || '')}</p>${url ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${t('open')}</a>${button('copy-media', t('useMedia'), `data-index="${index}"`)}` : ''}</article>`; }).join('') : `<p>${t('mediaEmpty')}</p>`}</div>`;
  }
  async function onClick(event) {
    const target = event.target.closest('[data-action]'); if (!target || !root.contains(target) || target.disabled) return;
    event.stopPropagation?.();
    const action = target.dataset.action;
    if (action === 'close') { if (!canLeave()) return; draft = null; baseline = ''; root.querySelector('.cms-dialog')?.close?.(); await refresh(); return; }
    if (action === 'edit') return openEditor(records[Number(target.dataset.index)]);
    if (action === 'new') { if (capabilities.edit) return openEditor(); return; }
    if (action === 'collection' || action === 'media') {
      if (!canLeave()) return; draft = null; baseline = ''; query = ''; page = 1;
      if (action === 'collection') { kind = target.dataset.kind; view = 'content'; } else view = 'media';
      shell(); return refresh();
    }
    if (action === 'search') { query = root.querySelector('[data-cms-search]')?.value || ''; page = 1; return refresh(); }
    if (action === 'refresh') return refresh(true);
    if (action === 'previous' || action === 'next') { page += action === 'previous' ? -1 : 1; return refresh(); }
    if (['publish', 'archive', 'review'].includes(action)) {
      if (!draft?.id || !(action === 'review' ? capabilities.edit : capabilities.publish)) return;
      if (dirty()) { editorNotice(t('saveFirst')); return; }
      if (action === 'publish' && draft.status !== 'review') { editorNotice(t('reviewFirst')); return; }
      if (['publish', 'review'].includes(action) && showIssues(validateEntry(draft, collection(), true))) return;
      if (action !== 'review' && !root.ownerDocument.defaultView.confirm(t(action === 'publish' ? 'publishConfirm' : 'archiveConfirm'))) return;
      return mutate(() => adapter.transition(draft.id, action === 'publish' ? 'published' : action === 'archive' ? 'archived' : 'review', { expectedVersion: draft.version }), t('transitioned'));
    }
    if (action === 'restore') {
      if (!capabilities.edit || !canLeave() || !root.ownerDocument.defaultView.confirm(t('restoreConfirm'))) return;
      const revision = revisions[Number(target.dataset.index)];
      if (revision) return mutate(() => adapter.restore(draft.id, revision.id, { expectedVersion: draft.version }), t('restored'));
    }
    if (action === 'copy-media') {
      const item = media[Number(target.dataset.index)], url = safeMediaUrl(item?.url || item?.public_url || item?.signed_url || ''); if (!url) return;
      try { await root.ownerDocument.defaultView.navigator.clipboard.writeText(url); announce(t('copied')); } catch { announce(t('copyFailed') + ' ' + url); }
    }
  }
  async function onSubmit(event) {
    if (event.target.matches('[data-cms-editor]')) {
      event.preventDefault(); event.stopPropagation();
      if (!draft || !capabilities.edit || showIssues(validateEntry(draft, collection()))) return;
      const payload = structuredClone(draft); return mutate(() => adapter.save(payload, { expectedVersion: draft.version }), t('saved'));
    }
    if (event.target.matches('[data-cms-upload]')) {
      event.preventDefault(); event.stopPropagation(); if (!capabilities.media || busy) return;
      const form = event.target, file = form.elements.file.files?.[0];
      if (!file || file.size <= 0 || file.size > mediaPolicy.maxBytes || !mediaPolicy.mimeTypes.includes(file.type)) { announce(t('invalid') + ' ' + `${Math.round(mediaPolicy.maxBytes / 1024 / 1024)} MB`, true); return; }
      if (file.type.startsWith('image/') && (!form.elements.alt_en.value.trim() || !form.elements.alt_vi.value.trim())) { announce(t('altHint'), true); return; }
      busy = true; form.querySelector('button').disabled = true;
      try { await adapter.uploadMedia(file, { alt_en: form.elements.alt_en.value.trim(), alt_vi: form.elements.alt_vi.value.trim() }); announce(t('mediaSaved')); }
      catch (error) { announce(errorText(error), true); }
      finally { busy = false; await refresh(); }
    }
  }
  function onInput(event) {
    if (draft && event.target.dataset.field) {
      let value = event.target.value;
      if (event.target.dataset.list) value = value.split('\n').map(item => item.trim()).filter(Boolean);
      else if (event.target.type === 'number' && value !== '') value = Number(value);
      setValue(draft, event.target.dataset.field, value); updateEditorChecks();
    }
  }
  function onChange(event) {
    if (event.target.matches('[data-cms-status]')) { status = event.target.value; page = 1; void refresh(); }
    else if (event.target.dataset.field) onInput(event);
  }
  function onKey(event) { if (event.key === 'Enter' && event.target.matches('[data-cms-search]')) { event.preventDefault(); query = event.target.value; page = 1; void refresh(); } }
  function onCancel(event) { if (event.target.matches('.cms-dialog')) { event.preventDefault(); void onClick({ target: { closest: () => root.querySelector('[data-action="close"]') } }); } }
  function beforeUnload(event) { if (dirty()) { event.preventDefault(); event.returnValue = ''; } }
  root.addEventListener('click', onClick); root.addEventListener('submit', onSubmit); root.addEventListener('input', onInput); root.addEventListener('change', onChange); root.addEventListener('keydown', onKey); root.addEventListener('cancel', onCancel, true);
  root.ownerDocument.defaultView.addEventListener('beforeunload', beforeUnload);
  shell();
  const ready = refresh(true);
  return {
    ready, isDirty: dirty, canLeave,
    async refresh() { if (!canLeave()) return false; draft = null; baseline = ''; await refresh(true); return true; },
    setLanguage(value) { language = value === 'vi' ? 'vi' : 'en'; if (draft) { const previous = draft; shell(); draft = previous; editor(); } else shell(); },
    destroy({ force = false } = {}) {
      if (!force && !canLeave()) return false;
      disposed = true; ++epoch; draft = null; records = []; media = [];
      root.removeEventListener('click', onClick); root.removeEventListener('submit', onSubmit); root.removeEventListener('input', onInput); root.removeEventListener('change', onChange); root.removeEventListener('keydown', onKey); root.removeEventListener('cancel', onCancel, true); root.ownerDocument.defaultView.removeEventListener('beforeunload', beforeUnload);
      root.replaceChildren(); root.classList.remove('gary-cms'); delete root.dataset.cmsApp; return true;
    }
  };
}
