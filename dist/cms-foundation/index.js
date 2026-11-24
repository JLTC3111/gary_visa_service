import { attachEditorWorkspace } from '../editor-workspace/index.js';
import { showActionToast } from '../action-toast.js';
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
  let language = options.language === 'vi' ? 'vi' : 'en', disposed = false, epoch = 0, busy = false, loadFailed = false;
  let capabilities = { read: false, edit: false, publish: false, media: false };
  let kind = options.collections[0].kind, query = '', status = '', page = 1, total = 0, records = [], media = [], view = 'content';
  let draft = null, baseline = '', revisions = [], coverImages = [], notice = '', noticeKind = 'status', editorWorkspace = null;
  let editorReturnId = null;
  const t = key => cmsText(key, language);
  const label = value => typeof value === 'object' ? value?.[language] || value?.en || '' : value || '';
  const collection = () => options.collections.find(item => item.kind === kind);
  const dirty = () => !!draft && JSON.stringify(draft) !== baseline;
  const date = value => { try { return value ? new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'; } catch { return '—'; } };
  const disabled = value => value ? ' disabled' : '';
  const buttonVariants = { edit: 'edit', publish: 'publish', archive: 'archive', restore: 'restore', delete: 'danger' };
  const button = (action, text, extra = '', off = false) => {
    const variant = buttonVariants[action];
    return `<button type="button" data-action="${action}"${variant ? ` data-button-variant="${variant}"` : ''} ${extra}${disabled(off || busy)}>${escape(text)}</button>`;
  };
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
  function confirmAction(message) {
    if (!disposed) showActionToast(root.ownerDocument, message, {language});
  }
  function canLeave() { return !dirty() || root.ownerDocument.defaultView.confirm(t('discard')); }
  function shell() {
    editorWorkspace?.destroy(); editorWorkspace = null;
    root.classList.add('gary-cms'); root.dataset.cmsApp = options.appId || 'content';
    const tabs = options.collections.map(item => button('collection', label(item.label), `data-kind="${escape(item.kind)}" aria-pressed="${item.kind === kind && view === 'content'}"`)).join('');
    root.innerHTML = `<header class="cms-header"><div><p class="cms-eyebrow">${escape(options.appName || options.appId || 'Gary Group')}</p><h2>${escape(label(options.heading) || t('cms'))}</h2><p>${t('intro')}</p></div><div class="cms-role">${t('role')}: ${escape(capabilities.role ? t(capabilities.role) : t('readOnly'))}</div></header><p class="cms-notice" data-cms-notice role="${noticeKind}" aria-live="polite">${escape(notice)}</p><nav class="cms-collections" aria-label="${t('content')}">${tabs}${button('media', t('media'), `aria-pressed="${view === 'media'}"`)}</nav><div class="cms-workspace" data-cms-workspace></div><dialog class="cms-dialog" id="${id}-editor" aria-labelledby="${id}-editor-heading"></dialog>`;
    renderWorkspace();
  }
  function renderWorkspace() {
    const target = root.querySelector('[data-cms-workspace]');
    if (!target) return;
    if (!capabilities.read) { target.innerHTML = `<div class="cms-empty" role="status">${escape(busy ? t('loading') : t('noAccess'))}${button('refresh', t('refresh'))}</div>`; return; }
    if (view === 'media') { renderMedia(target); return; }
    target.innerHTML = `<div class="cms-toolbar"><label class="cms-search"><span>${t('search')}</span><input type="search" data-cms-search value="${escape(query)}" maxlength="180"></label><label><span>${t('status')}</span><select data-cms-status><option value="">${t('all')}</option>${['draft', 'review', 'published', 'archived'].map(value => `<option value="${value}"${status === value ? ' selected' : ''}>${t(value)}</option>`).join('')}</select></label>${button('search', t('search'))}${button('refresh', t('refresh'))}${capabilities.edit ? button('new', t('add'), 'class="cms-primary"') : ''}</div><div class="cms-table-scroll" aria-busy="${busy}"><table><caption class="cms-sr">${escape(label(collection().label))}</caption><thead><tr><th scope="col">${t('title')}</th><th scope="col">${t('status')}</th><th scope="col">${t('updated')}</th><th scope="col">${t('actions')}</th></tr></thead><tbody>${records.length ? records.map((record, index) => `<tr><th scope="row"><strong>${escape(record[`title_${language}`] || record.title_en || record.title_vi || record.slug)}</strong><small>${escape(record.slug)}</small>${publicationNote(record)}</th><td><span class="cms-badge cms-badge-${escape(record.status)}">${escape(t(record.status))}</span></td><td>${escape(date(record.updated_at))}</td><td>${button('edit', t(capabilities.edit ? 'edit' : 'viewEntry'), `data-index="${index}"`)}${capabilities.delete && adapter.remove ? button('delete', t('delete'), `data-index="${index}" class="cms-danger"`) : ''}</td></tr>`).join('') : `<tr><td colspan="4" class="cms-empty">${escape(busy ? t('loading') : loadFailed ? t('unavailable') : t('empty'))}</td></tr>`}</tbody></table></div><footer class="cms-pagination"><span>${t('results')}: ${total} · ${t('page')} ${page} ${t('of')} ${Math.max(1, Math.ceil(total / 20))}</span><div>${button('previous', t('previous'), '', page <= 1)}${button('next', t('next'), '', page * 20 >= total)}</div></footer>`;
  }
  function publicationNote(record) {
    const live = Boolean(record.publication?.published_at);
    if (live && record.status !== 'published') return `<small>${t('priorPublicationLive')}</small>`;
    if (!live && record.status === 'published' && Object.hasOwn(record, 'publication')) return `<small>${t('publicationMissing')}</small>`;
    return '';
  }
  async function refresh(recheck = false) {
    if (disposed) return;
    const requestEpoch = ++epoch;
    if (loadFailed) announce('');
    loadFailed = false; busy = true; renderWorkspace();
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
    } catch (error) {
      if (!disposed && requestEpoch === epoch) {
        loadFailed = true;
        if (view === 'media') media = [];
        else { records = []; total = 0; }
        announce(errorText(error), true);
      }
    }
    finally { if (!disposed && requestEpoch === epoch) { busy = false; shell(); } }
  }
  function field(key, text, type = 'text', extra = {}) {
    const value = getValue(draft, key) ?? '', controlId = `${id}-${key.replace(/[^a-z0-9]/gi, '-')}`;
    const lockedSlug = key === 'slug' && collection().lockPublishedSlug && draft.published_at;
    const attributes = `id="${controlId}" name="${escape(key)}" data-field="${escape(key)}"${extra.locale ? ` lang="${extra.locale}"` : ''}${disabled(!capabilities.edit || busy || lockedSlug)}`;
    let control;
    if (type === 'textarea' || type === 'list') control = `<textarea ${attributes} rows="${type === 'list' ? 4 : key.startsWith('body_') ? 10 : 3}" maxlength="50000"${type === 'list' ? ' data-list="true"' : ''}>${escape(Array.isArray(value) ? value.join('\n') : value)}</textarea>`;
    else if (type === 'select') control = `<select ${attributes}><option value="">—</option>${(extra.options || []).map(option => { const v = typeof option === 'object' ? option.value : option; return `<option value="${escape(v)}"${String(v) === String(value) ? ' selected' : ''}>${escape(typeof option === 'object' ? label(option.label || option.value) : option)}</option>`; }).join('')}</select>`;
    else control = `<input ${attributes} type="${['number', 'date', 'url'].includes(type) ? type : 'text'}" value="${escape(value)}"${extra.min !== undefined ? ` min="${Number(extra.min)}"` : ''}${extra.max !== undefined ? ` max="${Number(extra.max)}"` : ''}${type !== 'number' && type !== 'date' ? ' maxlength="2000"' : ''}>`;
    return `<label class="cms-field" for="${controlId}"><span>${escape(text)}${extra.required ? ` <small>(${t('required')})</small>` : ''}</span>${control}<small class="cms-field-error" data-error-for="${escape(key)}" aria-live="polite"></small></label>`;
  }
  function editor() {
    const dialog = root.querySelector('.cms-dialog');
    if (!dialog || !draft) return;
    const scrollTop = dialog.querySelector('[data-gw-body]')?.scrollTop || 0;
    const expanded = [...dialog.querySelectorAll('details')].map(details => details.open);
    const extraFields = fieldsFor(collection());
    dialog.innerHTML = `<header><div><p class="cms-eyebrow">${escape(label(collection().label))}</p><h2 id="${id}-editor-heading">${escape(draft.id ? t(capabilities.edit ? 'edit' : 'viewEntry') : t('add'))}</h2></div>${button('close', t('close'))}</header><form data-cms-editor novalidate><div class="cms-editor-body gw-editor-body" data-gw-body><div class="cms-editor-meta">${field('slug', t('slug'))}<p><span class="cms-badge cms-badge-${escape(draft.status)}">${t(draft.status)}</span> · <span data-cms-dirty>${t('clean')}</span></p></div><p class="cms-hint">${t('snapshot')}</p>${collection().lockPublishedSlug && draft.published_at ? `<p class="cms-hint">${t('publishedAddress')}</p>` : ''}<div class="cms-language-columns">${LOCALES.map(locale => `<section lang="${locale}" aria-label="${locale === 'en' ? 'English' : 'Tiếng Việt'}"><h3>${locale === 'en' ? 'English' : 'Tiếng Việt'}</h3>${field(`title_${locale}`, t('title'), 'text', { locale })}${field(`summary_${locale}`, t('summary'), 'textarea', { locale })}${field(`body_${locale}`, t('body'), 'textarea', { locale })}${extraFields.filter(item => item.locale === locale).map(item => field(item.key, label(item.label), item.type, item)).join('')}<details><summary>${t('seo')}</summary>${field(`seo_title_${locale}`, t('seoTitle'), 'text', { locale })}${field(`seo_description_${locale}`, t('seoDescription'), 'textarea', { locale })}</details></section>`).join('')}</div>${extraFields.filter(item => !item.locale).map(item => field(item.key, label(item.label), item.type, item)).join('')}${collection().cover ? '<section class="cms-cover" data-cms-cover></section>' : ''}<details class="cms-seo"><summary>${t('seo')}</summary><p class="cms-hint">${t('advisory')}</p><div data-cms-checks></div></details><details class="cms-preview"><summary>${t('preview')}</summary><div class="cms-language-columns" data-cms-preview></div></details><details data-cms-revisions><summary>${t('revision')}</summary><div data-cms-history><p>${t('loadingRevisions')}</p></div></details><p class="cms-dialog-notice" data-editor-notice role="status" aria-live="polite"></p></div><footer class="cms-editor-actions gw-editor-actions" data-gw-actions>${capabilities.edit ? `<button type="submit" class="cms-primary" data-button-variant="save-draft"${disabled(busy)}>${t('save')}</button>${button('review', t('submit'), '', !draft.id)}` : ''}${capabilities.publish ? `${button('publish', t('publish'), '', !draft.id || draft.status !== 'review')}${button('archive', t('archive'), '', !draft.id || draft.status === 'archived')}` : ''}${capabilities.delete && adapter.remove ? button('delete', t('delete'), 'class="cms-danger"') : ''}${button('close', t('cancel'), 'data-button-variant="cancel" ')}</footer></form>`;
    if (!editorWorkspace) editorWorkspace = attachEditorWorkspace(dialog, {key: `${options.appId || 'content'}:cms:${kind}`, language: () => language});
    editorWorkspace.refresh();
    renderCover();
    dialog.querySelectorAll('details').forEach((details, index) => { if (expanded[index]) details.open = true; });
    dialog.querySelector('[data-gw-body]').scrollTop = scrollTop;
    updateEditorChecks(); renderHistory();
    const opening = !dialog.open;
    if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); } else dialog.setAttribute('open', '');
    if (opening) dialog.querySelector('input')?.focus({preventScroll: true});
  }
  function updateEditorChecks() {
    if (!draft) return;
    const target = root.querySelector('[data-cms-checks]');
    if (target) target.innerHTML = contentSeoFindings(draft, collection()).map(finding => { const translated = localizeFinding(finding, language); return `<article class="cms-finding cms-${finding.severity}"><strong>${escape(t(finding.severity))}: ${escape(translated.title)}</strong><p>${escape(translated.recommendation || translated.explanation)}</p></article>`; }).join('');
    const preview = root.querySelector('[data-cms-preview]');
    if (preview) preview.innerHTML = LOCALES.map(locale => `<article lang="${locale}"><h3>${escape(draft[`title_${locale}`] || t('noPreview'))}</h3><p>${escape(draft[`summary_${locale}`])}</p><div class="cms-plain-content">${escape(draft[`body_${locale}`])}</div></article>`).join('');
    const dirtyState = root.querySelector('[data-cms-dirty]'); if (dirtyState) dirtyState.textContent = t(dirty() ? 'changed' : 'clean');
  }
  function updateCoverPreview() {
    const region = root.querySelector('[data-cms-cover]');
    if (!region) return;
    const url = adapter.coverUrl?.(draft.data.image_url, root.ownerDocument.location.origin) || '';
    const item = coverImages.find(image => image.url === url);
    const caption = item?.[`caption_${language}`] || '';
    const alt = item?.[`alt_${language}`] || draft[`title_${language}`] || '';
    region.querySelector('[data-cover-preview]').innerHTML = url ? `<figure><img src="${escape(url)}" alt="${escape(alt)}">${caption ? `<figcaption>${escape(caption)}</figcaption>` : ''}</figure>` : '';
    const select = region.querySelector('[data-cover-select]');
    if (select) select.value = item?.url || '';
    const remove = region.querySelector('[data-action="remove-cover"]');
    if (remove) remove.disabled = !draft.data.image_url || busy;
  }
  function renderCover() {
    const region = root.querySelector('[data-cms-cover]');
    if (!region || !draft) return;
    if (!region.querySelector('[data-cover-preview]')) {
      const upload = capabilities.edit && capabilities.media && mediaPolicy.publicImages && adapter.uploadMedia ?
        `<details><summary>${t('uploadCover')}</summary><fieldset data-cms-cover-upload><p class="cms-hint">${t('onlyPublicImages')}</p><label class="cms-field"><span>${t('file')}</span><input type="file" name="file" accept="${escape(mediaPolicy.mimeTypes.join(','))}"></label>${mediaFields()}${publicAgreement()}${button('upload-cover', t('upload'))}</fieldset></details>` : '';
      const controls = capabilities.edit ? `<label class="cms-field"><span>${t('chooseCover')}</span><select data-cover-select></select></label>${button('remove-cover', t('removeCover'))}<p class="cms-hint">${t('coverHint')}</p>` : '';
      region.innerHTML = `<h3>${t('cover')}</h3><div data-cover-preview></div>${controls}${upload}`;
    }
    const select = region.querySelector('[data-cover-select]');
    if (select) {
      select.innerHTML = `<option value="">—</option>${coverImages.map(image => `<option value="${escape(image.url)}">${escape(image.file_name)}</option>`).join('')}`;
      select.disabled = busy || !coverImages.length;
    }
    updateCoverPreview();
  }
  function setCover(value) {
    if (!draft || !capabilities.edit || busy) return;
    const input = root.querySelector('[data-field="data.image_url"]');
    if (input) input.value = value;
    setValue(draft, 'data.image_url', value);
    updateEditorChecks(); updateCoverPreview();
  }
  async function openEditor(record) {
    if (!canLeave()) return;
    editorReturnId = record?.id || null;
    draft = structuredClone(record || emptyEntry(kind)); draft.data ||= {};
    baseline = JSON.stringify(draft); revisions = []; coverImages = []; editor();
    if (collection().cover && adapter.listMedia) {
      const opened = draft;
      void adapter.listMedia({readyOnly: true}).then(items => {
        if (disposed || draft !== opened) return;
        coverImages = [...new Map([...coverImages, ...items.filter(item => item.url)].map(item => [item.url, item])).values()];
        renderCover();
      }).catch(error => { if (draft === opened) editorNotice(errorText(error)); });
    }
    if (draft.id && adapter.revisions) {
      const selected = draft.id;
      try { const result = await adapter.revisions(selected); if (!disposed && draft?.id === selected) { revisions = Array.isArray(result) ? result : result.records || []; renderHistory(); } }
      catch (error) { if (draft?.id === selected) editorNotice(errorText(error)); }
    }
  }
  function editorNotice(text, failed = true) { const target = root.querySelector('[data-editor-notice]'); if (target) { target.textContent = text; target.setAttribute('role', failed ? 'alert' : 'status'); } }
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
    if (issues.length) { editorNotice(t('invalid')); root.querySelector('[aria-invalid="true"]')?.focus({preventScroll: true}); }
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
      announce(''); busy = false; editor(); confirmAction(success);
      if (adapter.revisions) { const selected = draft.id; try { const result = await adapter.revisions(selected); if (!disposed && draft?.id === selected) { revisions = Array.isArray(result) ? result : result.records || []; renderHistory(); } } catch { /* A history read cannot undo a committed save. */ } }
    } catch (error) { if (!disposed) { editorNotice(errorText(error)); options.onNotice?.(errorText(error)); } }
    finally { if (!disposed) { busy = false; for (const [control, wasDisabled] of controls) if (control.isConnected) control.disabled = wasDisabled; } }
  }
  function mediaFields(item = {}) {
    return `<div class="cms-language-columns">${LOCALES.map(locale => {
      const suffix = locale === 'en' ? 'En' : 'Vi';
      return `<div><label class="cms-field"><span>${t(`alt${suffix}`)}</span><input name="alt_${locale}" lang="${locale}" maxlength="${mediaPolicy.publicImages ? 300 : 500}" value="${escape(item[`alt_${locale}`] || '')}"></label>${mediaPolicy.publicImages ? `<label class="cms-field"><span>${t(`caption${suffix}`)}</span><input name="caption_${locale}" lang="${locale}" maxlength="500" value="${escape(item[`caption_${locale}`] || '')}"></label>` : ''}</div>`;
    }).join('')}</div>`;
  }
  function mediaSubmit(label) {
    return `<button type="submit" data-button-variant="confirm"${disabled(busy)}>${t(label)}</button>`;
  }
  function mediaCard(item, index) {
    const url = safeMediaUrl(item.url || item.public_url || item.signed_url || '');
    const file = item.file_name || item.filename || item.name || '';
    const alt = item[`alt_${language}`] || item.alt || file;
    const caption = item[`caption_${language}`];
    const action = `data-index="${index}"`;
    const preview = url && (item.mime_type || item.type || '').startsWith('image/') ? `<figure><img src="${escape(url)}" alt="${escape(alt)}" loading="lazy">${caption ? `<figcaption>${escape(caption)}</figcaption>` : ''}</figure>` : '';
    const metadata = url && capabilities.media && adapter.updateMedia ? `<details><summary>${t('mediaDetails')}</summary><form data-cms-media-metadata ${action}>${mediaFields(item)}${mediaSubmit('save')}</form></details>` : '';
    const canManageItem = capabilities.media && (item.owned || capabilities.delete);
    const remove = canManageItem && adapter.removeMedia ? button('remove-media', t(item.state === 'deleting' ? 'retryRemoval' : 'removeMedia'), action) : '';
    let pending = '';
    if (item.state === 'reserved') {
      pending = `<p>${t('mediaAwaiting')}</p>${canManageItem && adapter.finishMedia ? button('finish-media', t('finishMedia'), action) : ''}${capabilities.media && item.owned && adapter.resumeMedia ? `<form data-cms-retry-upload ${action}><label class="cms-field"><span>${t('retryUpload')}</span><input type="file" name="file" accept="${escape(item.mime_type)}" required></label>${mediaSubmit('upload')}</form>` : ''}`;
    } else if (item.state === 'deleting') pending = `<p>${t('mediaDeletionPending')}</p>`;
    return `<article>${preview}<strong>${escape(file)}</strong>${url ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${t('open')}</a> ${button('copy-media', t('useMedia'), action)}` : ''}${metadata}${pending}${remove}</article>`;
  }
  function renderMedia(target) {
    const policyText = `${mediaPolicy.mimeTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} · ${Math.round(mediaPolicy.maxBytes / 1024 / 1024)} MB`;
    const confirmation = mediaPolicy.publicImages ? publicAgreement() : '';
    const heading = mediaPolicy.publicImages ? 'publicImages' : 'media';
    const upload = capabilities.media && adapter.uploadMedia ? `<form data-cms-upload><p>${escape(policyText)}</p><label class="cms-field"><span>${t('file')}</span><input type="file" name="file" accept="${escape(mediaPolicy.mimeTypes.join(','))}" required></label>${mediaFields()}<p class="cms-hint">${t('altHint')}</p>${confirmation}${mediaSubmit('upload')}</form>` : '';
    target.innerHTML = `<div class="cms-toolbar"><h3>${t(heading)}</h3>${button('refresh', t('refresh'))}</div>${mediaPolicy.publicImages ? `<p class="cms-hint">${t('onlyPublicImages')}</p>` : ''}${upload}<div class="cms-media-grid">${media.length ? media.map(mediaCard).join('') : `<p>${t(busy ? 'loading' : loadFailed ? 'unavailable' : 'mediaEmpty')}</p>`}</div>`;
  }
  function publicAgreement() {
    return `<label class="cms-media-consent"><input type="checkbox" name="public_approval" required> <span>${t('publicConfirmation')}</span></label>`;
  }
  function readMediaFields(form) {
    return Object.fromEntries(['alt_en','alt_vi','caption_en','caption_vi'].map(key => [key, form.elements[key]?.value.trim() || '']));
  }
  function readMediaUpload(form) {
    const file = form.elements.file.files?.[0];
    const metadata = {...readMediaFields(form), publicConfirmed: form.elements.public_approval?.checked};
    if (!file || file.size <= 0 || file.size > mediaPolicy.maxBytes || !mediaPolicy.mimeTypes.includes(file.type)) {
      return {error: `${t('invalid')} ${Math.round(mediaPolicy.maxBytes / 1024 / 1024)} MB`};
    }
    if (file.type.startsWith('image/') && (!metadata.alt_en || !metadata.alt_vi)) return {error: t('altHint')};
    if (mediaPolicy.publicImages && !metadata.publicConfirmed) return {error: t('publicConfirmation')};
    return {file, metadata};
  }
  async function uploadCover() {
    const form = root.querySelector('[data-cms-cover-upload]');
    if (!draft || !form || !capabilities.edit || !capabilities.media || busy || !adapter.uploadMedia) return;
    const {file, metadata, error} = readMediaUpload(form);
    if (error) { editorNotice(error); return; }
    const editing = draft;
    form.disabled = busy = true;
    editorNotice(t('savingMedia'), false);
    try {
      const item = await adapter.uploadMedia(file, metadata);
      if (disposed || draft !== editing) return;
      if (!item?.url) throw new Error('CMS_MEDIA_MISSING');
      coverImages.unshift(item);
      busy = false;
      setCover(item.url);
      if (form.isConnected) {
        form.elements.file.value = '';
        form.elements.public_approval.checked = false;
        const details = form.closest('details');
        details.open = false;
        details.querySelector('summary').focus();
      }
      editorNotice(t('coverSelected'), false);
    } catch (error) {
      if (!disposed) editorNotice(errorText(error));
    } finally {
      busy = false; form.disabled = false;
      if (!disposed && draft === editing) renderCover();
    }
  }
  async function changeMedia(operation, message, control, refreshOnError = false) {
    if (!capabilities.media || busy) return;
    busy = true;
    control.disabled = true;
    announce(t('savingMedia'));
    try {
      await operation();
      if (disposed) return;
      announce('');
      confirmAction(message);
      await refresh();
    } catch (error) {
      if (disposed) return;
      announce(errorText(error), true);
      if (refreshOnError) await refresh();
    } finally {
      if (!disposed) { busy = false; control.disabled = false; }
    }
  }
  function restoreEditorFocus() {
    const index = records.findIndex(record => record.id === editorReturnId);
    const target = index >= 0 ? root.querySelector(`[data-action="edit"][data-index="${index}"]`) : root.querySelector('[data-action="new"]');
    (target || root.querySelector('[data-action="refresh"]'))?.focus({preventScroll: true});
  }
  async function closeEditorDialog() {
    const dialog = root.querySelector('.cms-dialog');
    dialog?.close?.();
    const fade = dialog?.getAnimations?.().find(animation => animation.transitionProperty === 'opacity');
    if (fade) await fade.finished.catch(() => {});
  }
  async function onClick(event) {
    const target = event.target.closest('[data-action]'); if (!target || !root.contains(target) || target.disabled || busy) return;
    event.stopPropagation?.();
    const action = target.dataset.action;
    if (action === 'close') { if (!canLeave()) return; draft = null; baseline = ''; await closeEditorDialog(); if (draft || disposed) return; await refresh(); restoreEditorFocus(); return; }
    if (action === 'delete') {
      if (!capabilities.delete || !adapter.remove || busy || !canLeave()) return;
      const selected = target.dataset.index !== undefined ? records[Number(target.dataset.index)] : draft;
      if (!selected?.id || !root.ownerDocument.defaultView.confirm(t('deleteConfirm'))) return;
      busy = true;
      try {
        await adapter.remove(selected.id, {expectedVersion: selected.version});
        if (disposed) return;
        let closing;
        if (draft?.id === selected.id) { draft = null; baseline = ''; closing = closeEditorDialog(); }
        announce('');
        confirmAction(t('deleted'));
        await closing;
        await refresh();
      } catch (error) { if (!disposed) { announce(errorText(error), true); if (draft) editorNotice(errorText(error)); } }
      finally { if (!disposed) { busy = false; if (draft) editor(); else renderWorkspace(); } }
      return;
    }
    if (action === 'edit') return openEditor(records[Number(target.dataset.index)]);
    if (action === 'new') { if (capabilities.edit) return openEditor(); return; }
    if (action === 'remove-cover') return setCover('');
    if (action === 'upload-cover') return uploadCover();
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
    if (action === 'finish-media' || action === 'remove-media') {
      const item = media[Number(target.dataset.index)];
      if (!item || busy || !capabilities.media || (!item.owned && !capabilities.delete)) return;
      if (action === 'finish-media' && adapter.finishMedia) return changeMedia(() => adapter.finishMedia(item), t('mediaSaved'), target);
      if (action === 'remove-media' && adapter.removeMedia && root.ownerDocument.defaultView.confirm(t('mediaRemoveConfirm'))) {
        return changeMedia(() => adapter.removeMedia(item.id), t('mediaRemoved'), target, true);
      }
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
      const form = event.target, {file, metadata, error} = readMediaUpload(form);
      if (error) { announce(error, true); return; }
      return changeMedia(() => adapter.uploadMedia(file, metadata), t('mediaSaved'), form.querySelector('button'), true);
    }
    if (event.target.matches('[data-cms-media-metadata], [data-cms-retry-upload]')) {
      event.preventDefault(); event.stopPropagation();
      const form = event.target;
      const item = media[Number(form.dataset.index)];
      if (!item || !capabilities.media || busy) return;
      if (form.matches('[data-cms-retry-upload]')) {
        const file = form.elements.file.files?.[0];
        if (item.owned && file) return changeMedia(() => adapter.resumeMedia(item, file), t('mediaSaved'), form.querySelector('button'));
      } else {
        const metadata = readMediaFields(form);
        if (!metadata.alt_en || !metadata.alt_vi) { announce(t('altHint'), true); return; }
        return changeMedia(() => adapter.updateMedia(item.id, {...metadata, version: item.version}), t('mediaSaved'), form.querySelector('button'));
      }
    }
  }
  function onInput(event) {
    if (draft && capabilities.edit && !event.target.disabled && event.target.dataset.field) {
      let value = event.target.value;
      if (event.target.dataset.list) value = value.split('\n').map(item => item.trim()).filter(Boolean);
      else if (event.target.type === 'number' && value !== '') value = Number(value);
      setValue(draft, event.target.dataset.field, value); updateEditorChecks();
      if (event.target.dataset.field === 'data.image_url') updateCoverPreview();
    }
  }
  function onChange(event) {
    if (event.target.matches('[data-cms-status]')) { status = event.target.value; page = 1; void refresh(); }
    else if (event.target.matches('[data-cover-select]') && coverImages.some(image => image.url === event.target.value)) setCover(event.target.value);
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
      editorWorkspace?.destroy(); editorWorkspace = null;
      disposed = true; ++epoch; draft = null; records = []; media = [];
      root.removeEventListener('click', onClick); root.removeEventListener('submit', onSubmit); root.removeEventListener('input', onInput); root.removeEventListener('change', onChange); root.removeEventListener('keydown', onKey); root.removeEventListener('cancel', onCancel, true); root.ownerDocument.defaultView.removeEventListener('beforeunload', beforeUnload);
      root.replaceChildren(); root.classList.remove('gary-cms'); delete root.dataset.cmsApp; return true;
    }
  };
}
