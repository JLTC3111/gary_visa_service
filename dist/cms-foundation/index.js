import { attachEditorWorkspace } from '../editor-workspace/index.js';
import { showActionToast } from '../action-toast.js';
import { isConflictResponse } from '../conflict-response.js';
import { narrowWorkspaceCopy } from '../workspace-copy.js';
import { CMS_VERSION, LOCALES, emptyEntry, titleSlug, fieldsFor, getValue, setValue, safeMediaUrl, validateEntry, contentSeoFindings } from './content.js';
import { cmsText, validationText } from './copy.js';
import { localizeFinding } from './seo-findings.js';
export { CMS_VERSION, validateEntry, contentSeoFindings, safeMediaUrl } from './content.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const icon = (path, fill = 'none') => `<svg viewBox="0 0 24 24" fill="${fill}" aria-hidden="true" focusable="false">${path}</svg>`;
const editIcon = icon('<path d="m13 6 5 5M4 20l5-1 11-11a2 2 0 0 0-4-4L5 15z"/>');
const viewIcon = icon('<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.5"/>');
const moreIcon = icon('<circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>', 'currentColor');
let serial = 0;

/** Framework-neutral editor. The adapter, never this UI, enforces authorization. */
export function mountCms(root, options) {
  if (!root || !options?.adapter || !options.collections?.length) throw new Error('CMS root, collections and adapter required');
  const adapter = options.adapter, id = `cms-${++serial}`, doc = root.ownerDocument;
  const mediaPolicy = options.mediaPolicy || adapter.mediaPolicy || { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'], maxBytes: 10 * 1024 * 1024 };
  let language = options.language === 'vi' ? 'vi' : 'en', disposed = false, epoch = 0, busy = false, loadFailed = false;
  let capabilities = { read: false, edit: false, publish: false, media: false };
  let kind = options.collections[0].kind, query = '', status = '', page = 1, total = 0, records = [], media = [], view = 'content';
  let draft = null, baseline = '', revisions = [], coverImages = [], notice = '', noticeKind = 'status', editorWorkspace = null;
  let editorReturnId = null, finishConfirmation = null;
  const t = key => cmsText(key, language);
  const label = value => typeof value === 'object' ? value?.[language] || value?.en || '' : value || '';
  const collection = () => options.collections.find(item => item.kind === kind);
  const isArticle = () => kind === 'article';
  const syncAutomaticSlug = () => { if (draft && collection().automaticSlug && !draft.id) draft.slug = titleSlug(draft); };
  const publicPath = () => { const path = collection().publicPath; return typeof path === 'function' ? path(language) : path || ''; };
  const dirty = () => !!draft && JSON.stringify(draft) !== baseline;
  const date = value => { try { return value ? new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'; } catch { return '—'; } };
  const disabled = value => value ? ' disabled' : '';
  const buttonVariants = { edit: 'edit', publish: 'publish', archive: 'archive', restore: 'restore', delete: 'danger' };
  const button = (action, text, extra = '', off = false, markup = escape(text)) => {
    const variant = buttonVariants[action];
    return `<button type="button" data-action="${action}"${variant ? ` data-button-variant="${variant}"` : ''} ${extra}${disabled(off || busy)}>${markup}</button>`;
  };
  const toolbarLabel = (full, short) => `<span class="cms-toolbar-label">${escape(full)}</span><span class="cms-toolbar-compact">${escape(short)}</span>`;
  function toolbarIcon(action, icon, text, title = text) {
    const name = escape(title);
    const svg = `<svg class="cms-toolbar-compact" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="./assets/staff-nav-icons.svg#${icon}"/></svg>`;
    return button(action, text, `class="cms-toolbar-icon-button" aria-label="${name}" title="${name}"`, false,
      `<span class="cms-toolbar-label">${escape(text)}</span>${svg}`);
  }
  function errorText(error, operation) {
    if (['CMS_REVIEW_REQUIRED', 'jobs.review_required'].includes(error?.message)) return t('reviewFirst');
    if (isConflictResponse(error)) return t('conflict');
    if (['42P01', '42883', 'PGRST202', 'PGRST205', 'CMS_NOT_CONFIGURED'].includes(String(error?.code))) return t('setup');
    if (typeof adapter.errorText === 'function') { const message = adapter.errorText(error, language); if (typeof message === 'string' && message) return message; }
    if (error?.code === '42501' || [401, 403].includes(Number(error?.status ?? error?.code))) return t('denied');
    if (error?.message === 'CMS_CONFIRMATION_MISSING') return t('unconfirmed');
    return t(operation || (error?.code === '23514' ? 'invalid' : 'unavailable'));
  }
  function announce(text, failed = false) {
    notice = text; noticeKind = failed ? 'alert' : 'status';
    const target = root.querySelector('[data-cms-notice]');
    if (target) { target.textContent = text; target.setAttribute('role', noticeKind); }
    options.onNotice?.(text);
  }
  function showSuccess(message) {
    if (!disposed) showActionToast(doc, message, {language});
  }
  const canManageMedia = () => capabilities.manage_media === true;
  function ask(title, message, { variant = 'confirm', opener = doc.activeElement } = {}) {
    if (disposed || finishConfirmation) return Promise.resolve(false);
    const dialog = doc.createElement('dialog');
    dialog.className = 'cms-confirm-dialog';
    dialog.setAttribute('aria-labelledby', `${id}-confirm-title`);
    dialog.setAttribute('aria-describedby', `${id}-confirm-message`);
    dialog.innerHTML = `<h2 id="${id}-confirm-title">${escape(title)}</h2>
      <p id="${id}-confirm-message">${escape(message)}</p><footer>
      <button type="button" data-cms-answer="cancel" autofocus data-button-variant="cancel">${t('cancel')}</button>
      <button type="button" data-cms-answer="confirm" data-button-variant="${variant}">${escape(title)}</button></footer>`;
    return new Promise(resolve => {
      finishConfirmation = confirmed => {
        finishConfirmation = null;
        dialog.close?.();
        dialog.remove();
        if (opener?.isConnected) opener.focus({preventScroll: true});
        resolve(confirmed);
      };
      dialog.addEventListener('click', event => {
        const answer = event.target.closest('[data-cms-answer]');
        if (answer) finishConfirmation?.(answer.dataset.cmsAnswer === 'confirm');
      });
      dialog.addEventListener('cancel', event => { event.preventDefault(); finishConfirmation?.(false); });
      root.append(dialog);
      if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
      dialog.querySelector('[autofocus]').focus({preventScroll: true});
    });
  }
  function canLeave() { return !finishConfirmation && (!draft || (!busy && !dirty())); }
  async function confirmLeave(opener) {
    return canLeave() || (!busy && !finishConfirmation && dirty() &&
      await ask(t('discardChanges'), t('discard'), {variant: 'danger-primary', opener}));
  }
  function shell() {
    finishConfirmation?.(false);
    editorWorkspace?.destroy(); editorWorkspace = null;
    root.classList.add('gary-cms'); root.dataset.cmsApp = options.appId || 'content';
    root.toggleAttribute('data-cms-articles', isArticle());
    const tabs = capabilities.role === null ? '' : options.collections.map(item => button('collection', label(item.label), `data-kind="${escape(item.kind)}" aria-pressed="${item.kind === kind && view === 'content'}"`)).join('');
    root.innerHTML = `<header class="cms-header"><div><p class="cms-eyebrow">${escape(options.appName || options.appId || 'Gary Group')}</p><h2>${escape(label(options.heading) || t('cms'))}</h2><p>${t('intro')}</p></div><div class="cms-role">${t('role')}: ${escape(capabilities.role ? t(capabilities.role) : t('readOnly'))}</div></header><p class="cms-notice" data-cms-notice role="${noticeKind}" aria-live="polite">${escape(notice)}</p><nav class="cms-collections" aria-label="${t('content')}">${tabs}${canManageMedia() ? button('media', t('media'), `aria-pressed="${view === 'media'}"`) : ''}</nav><div class="cms-workspace" data-cms-workspace></div><dialog class="cms-dialog" id="${id}-editor" aria-labelledby="${id}-editor-heading"></dialog>`;
    renderWorkspace();
  }
  function renderWorkspace() {
    const target = root.querySelector('[data-cms-workspace]');
    if (!target) return;
    if (!capabilities.read) { target.innerHTML = `<div class="cms-empty" role="status">${escape(busy ? t('loading') : t('noAccess'))}${button('refresh', t('refresh'))}</div>`; return; }
    if (view === 'media') { renderMedia(target); return; }
    const narrow = narrowWorkspaceCopy[language];
    const create = capabilities.edit ? button('new', t('add'), `class="cms-primary" title="${escape(narrow.cmsCreateTitle)}"`, false,
      toolbarLabel(t('add'), narrow.cmsCreate)) : '';
    const search = `<label class="cms-search">${toolbarLabel(t('search'), narrow.cmsSearch)}<input type="search" data-cms-search value="${escape(query)}" maxlength="180" aria-label="${escape(t('search'))}"></label>`;
    const filter = `<label class="cms-content-status"><span>${t('status')}</span><select data-cms-status${disabled(busy)}><option value="">${t('all')}</option>${['draft', 'review', 'published', 'archived'].map(value => `<option value="${value}"${status === value ? ' selected' : ''}>${t(value)}</option>`).join('')}</select></label>`;
    const searchButton = toolbarIcon('search', 'search', t('search'));
    const refreshButton = toolbarIcon('refresh', 'refresh-cw', t('refresh'), narrow.cmsRefreshTitle);
    const toolbar = isArticle()
      ? `<div class="cms-toolbar cms-article-toolbar"><div class="cms-article-search" role="search">${search}${searchButton}</div>${filter}${refreshButton}${capabilities.edit ? button('new', t('newArticle'), 'class="cms-primary"') : ''}</div>`
      : `<div class="cms-toolbar cms-content-toolbar">${search}${filter}${searchButton}${refreshButton}${create}</div>`;
    target.innerHTML = `${toolbar}<div class="cms-table-scroll cms-entry-list" aria-busy="${busy}"><table class="cms-entry-table" role="table">
      <caption class="cms-sr">${escape(label(collection().label))}</caption>
      <thead role="rowgroup"><tr role="row">${['title', 'status', 'updated', 'actions'].map(key => `<th role="columnheader" scope="col">${t(key)}</th>`).join('')}</tr></thead>
      <tbody role="rowgroup">${records.length ? records.map(contentRow).join('') : `<tr role="row"><td role="cell" colspan="4" class="cms-empty">${escape(busy ? t('loading') : loadFailed ? t('unavailable') : t('empty'))}</td></tr>`}</tbody>
    </table></div><footer class="cms-pagination"><span>${t('results')}: ${total} · ${t('page')} ${page} ${t('of')} ${Math.max(1, Math.ceil(total / 20))}</span><div>${button('previous', t('previous'), '', page <= 1)}${button('next', t('next'), '', page * 20 >= total)}</div></footer>`;
  }
  function contentRow(record, index) {
    const title = escape(record[`title_${language}`] || record.title_en || record.title_vi || record.slug);
    const slug = escape(record.slug), attrs = `data-index="${index}"`;
    const edit = button('edit', t(capabilities.edit ? 'edit' : 'viewEntry'), attrs);
    const remove = capabilities.delete && adapter.remove ? button('delete', t('delete'), `${attrs} class="cms-danger"`) : '';
    const article = isArticle();
    return `<tr class="cms-entry-row" role="row">
      <th class="cms-entry-title" scope="row" role="rowheader">${article ? articleTitle(record, title, slug) : `<strong title="${title}">${title}</strong><small class="cms-entry-slug" title="${slug}">${slug}</small>${publicationNote(record)}`}</th>
      <td class="cms-entry-status" role="cell"><span class="cms-badge cms-badge-${escape(record.status)}">${escape(t(record.status))}</span></td>
      <td class="cms-entry-date" role="cell">${article ? articleDate(record.updated_at) : escape(date(record.updated_at))}</td>
      <td class="cms-entry-actions" role="cell">${article ? articleRowActions(record, index) : edit + remove}</td>
    </tr>`;
  }
  function coverUrl(value) {
    const reference = collection().coverValue ? collection().coverValue(value) : value;
    return adapter.coverUrl?.(reference, doc.location.origin) || '';
  }
  function articleTitle(record, title, slug) {
    const cover = coverUrl(record.data?.image_url);
    const published = Date.parse(record.publication?.published_at);
    const path = publicPath();
    const link = path && published <= Date.now() && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)
      ? `<a class="cms-article-public" href="${escape(path + record.slug)}" target="_blank" rel="noopener noreferrer">${t('publicArticle')} <span aria-hidden="true">↗</span></a>` : '';
    return `<div class="cms-article-title"><span class="cms-article-thumb" aria-hidden="true">${cover ? `<img src="${escape(cover)}" alt="" loading="lazy" decoding="async" width="44" height="44">` : ''}</span>
      <div><strong title="${title}">${title}</strong><small class="cms-entry-slug" title="${slug}">${slug}</small>${link}${publicationNote(record)}</div></div>`;
  }
  function articleDate(value) {
    const updated = Date.parse(value);
    if (!Number.isFinite(updated)) return '—';
    const locale = language === 'vi' ? 'vi-VN' : 'en-GB';
    const format = {dateStyle: 'medium', timeZone: 'Asia/Ho_Chi_Minh'};
    const formatted = new Intl.DateTimeFormat(locale, format).format(updated);
    const timestamp = new Intl.DateTimeFormat(locale, {...format, timeStyle: 'short'}).format(updated);
    return `<time datetime="${escape(value)}" title="${escape(timestamp)}">${escape(formatted)}</time>`;
  }
  function moreMenu(key, actions, row = false) {
    const menuId = `${id}-more-${key}`;
    const name = t('moreActions');
    const markup = row ? moreIcon : toolbarLabel(name, t('shortMore'));
    return `<div class="cms-more">
      ${button('more', name, `class="${row ? 'cms-icon-button' : ''}" aria-label="${name}" title="${name}" aria-expanded="false" aria-controls="${menuId}"`, false, markup)}
      <div class="cms-more-panel" id="${menuId}" hidden>${actions}</div></div>`;
  }
  function articleRowActions(record, index) {
    const name = t(capabilities.edit ? 'editArticle' : 'viewArticle');
    const edit = button('edit', name, `data-index="${index}" class="cms-icon-button" data-button-size="icon" aria-label="${name}" title="${name}"`, false, capabilities.edit ? editIcon : viewIcon);
    const remove = capabilities.delete && adapter.remove && record.id ? moreMenu(index, button('delete', t('delete'), `data-index="${index}"`), true) : '';
    return `<div class="cms-article-row-actions">${edit}${remove}</div>`;
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
      if (capabilities.role === null && canManageMedia()) view = 'media';
      if (view === 'media' && !canManageMedia()) { view = 'content'; media = []; }
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
  function editorActions() {
    const save = capabilities.edit ? `<button type="submit" class="cms-primary" data-button-variant="save-draft" aria-label="${t('save')}"${disabled(busy)}>${isArticle() ? toolbarLabel(t('save'), t('shortSave')) : t('save')}</button>` : '';
    const trash = capabilities.delete && adapter.remove && draft.id;
    if (!isArticle()) return save
      + (capabilities.edit ? button('review', t('submit'), '', !draft.id) : '')
      + (capabilities.publish ? button('publish', t('publish'), '', !draft.id || draft.status !== 'review') + button('archive', t('archive'), '', !draft.id || draft.status === 'archived') : '')
      + (trash ? button('delete', t('delete'), 'class="cms-danger"') : '')
      + button('close', t('cancel'), 'data-button-variant="cancel"');
    const ready = !!draft.id && draft.status === 'review';
    const publish = capabilities.publish && (ready || !capabilities.edit);
    const workflow = publish ? button('publish', t('publish'), `data-cms-workflow aria-label="${t('publish')}"`, !ready, toolbarLabel(t('publish'), t('shortPublish')))
      : capabilities.edit ? button('review', t('submit'), `data-cms-workflow aria-label="${t('submit')}"`, !draft.id, toolbarLabel(t('submit'), t('shortReview'))) : '';
    const archive = capabilities.publish && draft.id && draft.status !== 'archived' ? button('archive', t('archive')) : '';
    const remove = trash ? button('delete', t('delete')) : '';
    const more = archive || remove ? moreMenu('editor', archive + remove) : '';
    const cancel = button('close', t('cancel'), `data-button-variant="cancel" aria-label="${t('cancel')}"`);
    return save + workflow + more + cancel;
  }
  function editor() {
    const dialog = root.querySelector('.cms-dialog');
    if (!dialog || !draft) return;
    const scrollTop = dialog.querySelector('[data-gw-body]')?.scrollTop || 0;
    const expanded = [...dialog.querySelectorAll('[data-gw-body] details')].map(details => details.open);
    const extraFields = fieldsFor(collection());
    const feedback = '<p class="cms-dialog-notice" data-editor-notice role="status" aria-live="polite"></p>';
    dialog.innerHTML = `<header><div><p class="cms-eyebrow">${escape(label(collection().label))}</p><h2 id="${id}-editor-heading">${escape(draft.id ? t(capabilities.edit ? 'edit' : 'viewEntry') : t(isArticle() ? 'newArticle' : 'add'))}</h2></div>${button('close', t('close'))}</header><form data-cms-editor novalidate><div class="cms-editor-body gw-editor-body" data-gw-body><div class="cms-editor-meta">${collection().automaticSlug ? '<p class="cms-hint" data-cms-auto-url></p>' : field('slug', t('slug'))}<p><span class="cms-badge cms-badge-${escape(draft.status)}">${t(draft.status)}</span> · <span data-cms-dirty>${t('clean')}</span></p></div><p class="cms-hint">${t('snapshot')}</p>${collection().lockPublishedSlug && draft.published_at ? `<p class="cms-hint">${t('publishedAddress')}</p>` : ''}<div class="cms-language-columns">${LOCALES.map(locale => `<section lang="${locale}" aria-label="${locale === 'en' ? 'English' : 'Tiếng Việt'}"><h3>${locale === 'en' ? 'English' : 'Tiếng Việt'}</h3>${field(`title_${locale}`, t('title'), 'text', { locale })}${field(`summary_${locale}`, t('summary'), 'textarea', { locale })}${field(`body_${locale}`, t('body'), 'textarea', { locale })}${extraFields.filter(item => item.locale === locale).map(item => field(item.key, label(item.label), item.type, item)).join('')}<details><summary>${t('seo')}</summary>${field(`seo_title_${locale}`, t('seoTitle'), 'text', { locale })}${field(`seo_description_${locale}`, t('seoDescription'), 'textarea', { locale })}</details></section>`).join('')}</div>${extraFields.filter(item => !item.locale).map(item => field(item.key, label(item.label), item.type, item)).join('')}${collection().cover ? '<section class="cms-cover" data-cms-cover></section>' : ''}<details class="cms-seo"><summary>${t('seo')}</summary><p class="cms-hint">${t('advisory')}</p><div data-cms-checks></div></details><details class="cms-preview"><summary>${t('preview')}</summary><div class="cms-language-columns" data-cms-preview></div></details><details data-cms-revisions><summary>${t('revision')}</summary><div data-cms-history><p>${t('loadingRevisions')}</p></div></details>${isArticle() ? '' : feedback}</div>
      ${isArticle() ? feedback : ''}<footer class="cms-editor-actions gw-editor-actions" data-gw-actions>${editorActions()}</footer></form>`;
    if (!editorWorkspace) editorWorkspace = attachEditorWorkspace(dialog, {key: `${options.appId || 'content'}:cms:${kind}`, language: () => language});
    editorWorkspace.refresh();
    renderCover();
    dialog.querySelectorAll('[data-gw-body] details').forEach((details, index) => { if (expanded[index]) details.open = true; });
    dialog.querySelector('[data-gw-body]').scrollTop = scrollTop;
    updateEditorChecks(); renderHistory();
    const opening = !dialog.open;
    if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); } else dialog.setAttribute('open', '');
    if (opening) dialog.querySelector('input')?.focus({preventScroll: true});
  }
  function updateEditorChecks() {
    if (!draft) return;
    syncAutomaticSlug();
    const automaticUrl = root.querySelector('[data-cms-auto-url]');
    if (automaticUrl) automaticUrl.textContent = draft.slug && publicPath() ? `${t('automaticUrl')}: ${publicPath()}${draft.slug}` : t('automaticUrlPending');
    const target = root.querySelector('[data-cms-checks]');
    if (target) target.innerHTML = contentSeoFindings(draft, collection()).map(finding => { const translated = localizeFinding(finding, language); return `<article class="cms-finding cms-${finding.severity}"><strong>${escape(t(finding.severity))}: ${escape(translated.title)}</strong><p>${escape(translated.recommendation || translated.explanation)}</p></article>`; }).join('');
    const preview = root.querySelector('[data-cms-preview]');
    if (preview) preview.innerHTML = LOCALES.map(locale => `<article lang="${locale}"><h3>${escape(draft[`title_${locale}`] || t('noPreview'))}</h3><p>${escape(draft[`summary_${locale}`])}</p><div class="cms-plain-content">${escape(draft[`body_${locale}`])}</div></article>`).join('');
    const dirtyState = root.querySelector('[data-cms-dirty]'); if (dirtyState) dirtyState.textContent = t(dirty() ? 'changed' : 'clean');
  }
  function updateCoverPreview() {
    const region = root.querySelector('[data-cms-cover]');
    if (!region) return;
    const url = coverUrl(draft.data.image_url);
    const item = coverImages.find(image => image.url === url);
    const caption = item?.[`caption_${language}`] || draft.data[`image_caption_${language}`] || '';
    const alt = item?.[`alt_${language}`] || draft.data[`image_alt_${language}`] || draft[`title_${language}`] || '';
    region.querySelector('[data-cover-preview]').innerHTML = url ? `<figure><img src="${escape(url)}" alt="${escape(alt)}">${caption ? `<figcaption>${escape(caption)}</figcaption>` : ''}</figure>` : '';
    const select = region.querySelector('[data-cover-select]');
    if (select) {
      select.value = item?.url || (isArticle() && draft.data.image_url ? 'current' : '');
      select.disabled = busy || (!coverImages.length && !(isArticle() && draft.data.image_url));
    }
    const remove = region.querySelector('[data-action="remove-cover"]');
    if (remove) remove.disabled = !draft.data.image_url || busy;
  }
  function renderCover() {
    const region = root.querySelector('[data-cms-cover]');
    if (!region || !draft) return;
    if (!region.querySelector('[data-cover-preview]')) {
      const upload = capabilities.edit && capabilities.media && mediaPolicy.publicImages && adapter.uploadMedia ?
        `<details><summary>${t('uploadCover')}</summary><fieldset data-cms-cover-upload><p class="cms-hint">${t('onlyPublicImages')}</p><label class="cms-field"><span>${t('file')}</span><input type="file" name="file" accept="${escape(mediaPolicy.mimeTypes.join(','))}"></label>${mediaFields()}${button('upload-cover', t('upload'))}</fieldset></details>` : '';
      const controls = capabilities.edit ? `<label class="cms-field"><span>${t('chooseCover')}</span><select data-cover-select></select></label>${button('remove-cover', t('removeCover'))}<p class="cms-hint">${t('coverHint')}</p>` : '';
      region.innerHTML = `<h3>${t('cover')}</h3><div data-cover-preview></div>${controls}${upload}`;
    }
    const select = region.querySelector('[data-cover-select]');
    if (select) {
      select.innerHTML = (isArticle() ? `<option value="">${t('noCover')}</option><option value="current" disabled hidden>${t('currentCover')}</option>` : '<option value="">—</option>')
        + coverImages.map(image => `<option value="${escape(image.url)}">${escape(image.file_name)}</option>`).join('');
    }
    updateCoverPreview();
  }
  function setCover(value, removal = false) {
    if (!draft || !capabilities.edit || busy) return;
    const input = root.querySelector('[data-field="data.image_url"]');
    if (input) input.value = value;
    if (draft.data.image_url !== value) {
      draft.data.image_url = value;
      if (isArticle()) {
        // Detach the draft reference. The media library owns physical removal.
        for (const key of ['image_alt_en', 'image_alt_vi', 'image_caption_en', 'image_caption_vi']) delete draft.data[key];
      }
    }
    updateEditorChecks(); updateCoverPreview();
    if (removal && isArticle()) {
      editorNotice(t('coverRemoved'), false);
      if (doc.activeElement?.disabled) root.querySelector('[data-cms-editor] button[type=submit]')?.focus({preventScroll: true});
    }
  }
  async function openEditor(record) {
    if (draft && !await confirmLeave()) return;
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
    await loadHistory(draft, true);
  }
  function editorNotice(text, failed = true) { const target = root.querySelector('[data-editor-notice]'); if (target) { target.textContent = text; target.setAttribute('role', failed ? 'alert' : 'status'); } }
  function renderHistory() {
    const target = root.querySelector('[data-cms-history]'); if (!target) return;
    target.innerHTML = revisions.length ? revisions.map((revision, index) => `<div class="cms-revision"><span>${escape(date(revision.created_at))} · v${escape(revision.version || index + 1)} · ${escape(t(revision.action === 'trashed' ? 'trashed' : revision.status || 'draft'))}</span>${capabilities.edit ? button('restore', t('restore'), `data-index="${index}"`) : ''}</div>`).join('') : `<p>${t('revisionsEmpty')}</p>`;
  }
  async function loadHistory(entry, reportFailure = false) {
    if (!entry.id || !adapter.revisions) return;
    try {
      const result = await adapter.revisions(entry.id);
      if (!disposed && draft === entry) { revisions = Array.isArray(result) ? result : result.records || []; renderHistory(); }
    } catch (error) {
      if (reportFailure && !disposed && draft === entry) editorNotice(errorText(error));
    }
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
  function lockEditorControls() {
    busy = true;
    const dialog = root.querySelector('.cms-dialog');
    const controls = [...dialog.querySelectorAll('button, input, textarea, select')].map(control => [control, control.disabled]);
    for (const [control] of controls) control.disabled = true;
    return () => {
      busy = false;
      if (disposed) return;
      for (const [control, wasDisabled] of controls) if (control.isConnected) control.disabled = wasDisabled;
      if (!dialog.isConnected && draft) editor();
      else if (draft) updateCoverPreview();
    };
  }
  function confirmedChange(next, previous, nextStatus, cover) {
    if (!next?.id || !Number.isSafeInteger(Number(next.version))) return false;
    if (!isArticle()) return true;
    return (!previous.id || next.id === previous.id) && next.kind === 'article'
      && next.version === previous.version + 1 && next.status === nextStatus
      && (nextStatus !== 'published' || Number.isFinite(Date.parse(next.published_at)))
      && (cover === undefined || (next.data && collection().coverValue(next.data.image_url) === cover));
  }
  async function mutate(operation, {success, failure, status: nextStatus, cover}) {
    if (busy || !draft) return;
    const previous = draft, active = doc.activeElement;
    const unlock = lockEditorControls();
    editorNotice(t('savingChanges'), false);
    let next, error;
    try {
      next = await operation();
      if (!confirmedChange(next, previous, nextStatus, cover)) throw new Error('CMS_CONFIRMATION_MISSING');
    } catch (cause) { error = cause; }
    finally { unlock(); }
    if (disposed || draft !== previous) return;
    if (error) {
      const message = errorText(error, isArticle() ? failure : undefined);
      editorNotice(message); options.onNotice?.(message);
      return;
    }
    draft = structuredClone(next); draft.data ||= {}; baseline = JSON.stringify(draft);
    announce(''); editor();
    const focus = active?.hasAttribute('data-cms-workflow') ? '[data-cms-workflow]' :
      active?.dataset.action ? `[data-gw-actions] [data-action="${active.dataset.action}"]` : 'button[type=submit]';
    (root.querySelector(`.cms-dialog ${focus}:not(:disabled)`) || root.querySelector('.cms-dialog [data-action="close"]'))?.focus({preventScroll: true});
    showSuccess(t(success));
    void loadHistory(draft);
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
    const canManageItem = canManageMedia();
    const remove = canManageItem && adapter.removeMedia ? button('remove-media', t(item.state === 'deleting' ? 'retryRemoval' : 'removeMedia'), action) : '';
    let pending = '';
    if (item.state === 'reserved') {
      pending = `<p>${t('mediaAwaiting')}</p>${canManageItem && adapter.finishMedia ? button('finish-media', t('finishMedia'), action) : ''}${capabilities.media && item.owned && adapter.resumeMedia ? `<form data-cms-retry-upload ${action}><label class="cms-field"><span>${t('retryUpload')}</span><input type="file" name="file" accept="${escape(item.mime_type)}" required></label>${mediaSubmit('upload')}</form>` : ''}`;
    } else if (item.state === 'deleting') pending = `<p>${t('mediaDeletionPending')}</p>`;
    return `<article>${preview}<strong>${escape(file)}</strong>${url ? `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${t('open')}</a> ${button('copy-media', t('useMedia'), action)}` : ''}${metadata}${pending}${remove}</article>`;
  }
  function renderMedia(target) {
    const policyText = `${mediaPolicy.mimeTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} · ${Math.round(mediaPolicy.maxBytes / 1024 / 1024)} MB`;
    const heading = mediaPolicy.publicImages ? 'publicImages' : 'media';
    const upload = capabilities.media && adapter.uploadMedia ? `<form data-cms-upload><p>${escape(policyText)}</p><label class="cms-field"><span>${t('file')}</span><input type="file" name="file" accept="${escape(mediaPolicy.mimeTypes.join(','))}" required></label>${mediaFields()}<p class="cms-hint">${t('altHint')}</p>${mediaSubmit('upload')}</form>` : '';
    target.innerHTML = `<div class="cms-toolbar"><h3>${t(heading)}</h3>${button('refresh', t('refresh'))}</div>${mediaPolicy.publicImages ? `<p class="cms-hint">${t('onlyPublicImages')}</p>` : ''}${upload}<div class="cms-media-grid">${media.length ? media.map(mediaCard).join('') : `<p>${t(busy ? 'loading' : loadFailed ? 'unavailable' : 'mediaEmpty')}</p>`}</div>`;
  }
  function readMediaFields(form) {
    return Object.fromEntries(['alt_en','alt_vi','caption_en','caption_vi'].map(key => [key, form.elements[key]?.value.trim() || '']));
  }
  function readMediaUpload(form) {
    const file = form.elements.file.files?.[0];
    const metadata = {...readMediaFields(form), publicConfirmed: Boolean(mediaPolicy.publicImages)};
    if (!file || file.size <= 0 || file.size > mediaPolicy.maxBytes || !mediaPolicy.mimeTypes.includes(file.type)) {
      return {error: `${t('invalid')} ${Math.round(mediaPolicy.maxBytes / 1024 / 1024)} MB`};
    }
    if (file.type.startsWith('image/') && (!metadata.alt_en || !metadata.alt_vi)) return {error: t('altHint')};
    return {file, metadata};
  }
  async function uploadCover() {
    const form = root.querySelector('[data-cms-cover-upload]');
    if (!draft || !form || !capabilities.edit || !capabilities.media || busy || !adapter.uploadMedia) return;
    const {file, metadata, error} = readMediaUpload(form);
    if (error) { editorNotice(error); return; }
    const editing = draft;
    const unlock = lockEditorControls();
    editorNotice(t('savingMedia'), false);
    let item, failure;
    try {
      item = await adapter.uploadMedia(file, metadata);
      if (!item?.url || !coverUrl(item.url)) throw new Error('CMS_MEDIA_MISSING');
    } catch (cause) { failure = cause; }
    finally { unlock(); }
    if (disposed || draft !== editing) return;
    if (failure) { editorNotice(errorText(failure, 'uploadFailed')); return; }
    coverImages = [item, ...coverImages.filter(image => image.url !== item.url)];
    setCover(item.url);
    if (form.isConnected) {
      form.elements.file.value = '';
      const details = form.closest('details');
      details.open = false;
      details.querySelector('summary').focus({preventScroll: true});
    }
    renderCover();
    editorNotice(t('coverSelected'), false);
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
      showSuccess(message);
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
    if (dialog?.close) dialog.close(); else dialog?.removeAttribute('open');
    const fade = dialog?.getAnimations?.().find(animation => animation.transitionProperty === 'opacity');
    if (fade) await fade.finished.catch(() => {});
  }
  const openMore = () => root.querySelector('.cms-more > [aria-expanded="true"]');
  function setMore(trigger, expanded, restoreFocus = false) {
    if (!trigger) return;
    trigger.setAttribute('aria-expanded', String(expanded));
    trigger.nextElementSibling.hidden = !expanded;
    if (restoreFocus) trigger.focus({preventScroll: true});
  }
  function dismissOutsideMenu(event) {
    const trigger = openMore();
    if (trigger && !trigger.parentElement.contains(event.target)) setMore(trigger, false);
  }
  async function onClick(event) {
    const target = event.target.closest('[data-action]'); if (!target || !root.contains(target) || target.disabled || busy || finishConfirmation) return;
    event.stopPropagation?.();
    const action = target.dataset.action;
    if (action === 'more') {
      const current = openMore();
      setMore(current, false);
      if (current !== target) setMore(target, true);
      return;
    }
    const trigger = target.closest('.cms-more-panel')?.previousElementSibling;
    if (trigger) setMore(trigger, false, true);
    const opener = trigger || target;
    if (action === 'close') {
      if (!await confirmLeave(opener) || disposed) return;
      draft = null; baseline = ''; await closeEditorDialog();
      if (draft || disposed) return;
      await refresh(); restoreEditorFocus(); return;
    }
    if (action === 'delete') {
      if (!capabilities.delete || !adapter.remove) return;
      const selected = target.dataset.index !== undefined ? records[Number(target.dataset.index)] : draft;
      const editing = selected === draft;
      if (!selected?.id || !await ask(t('delete'), t('deleteConfirm') + (editing && dirty() ? ' ' + t('discardWarning') : ''), {variant: 'danger-primary', opener}) || disposed) return;
      const unlock = editing ? lockEditorControls() : () => { busy = false; opener.disabled = false; };
      busy = true; opener.disabled = true;
      let error;
      try {
        const moved = await adapter.remove(selected.id, {expectedVersion: selected.version});
        if (moved?.id !== selected.id) throw new Error('CMS_CONFIRMATION_MISSING');
      } catch (cause) { error = cause; }
      finally { unlock(); }
      if (disposed) return;
      if (error) {
        const message = errorText(error, 'trashFailed');
        announce(message, true); if (editing) editorNotice(message);
        return;
      }
      let closing;
      if (editing) { draft = null; baseline = ''; closing = closeEditorDialog(); }
      announce(''); showSuccess(t('deleted'));
      await closing;
      if (!disposed) { await refresh(); restoreEditorFocus(); }
      return;
    }
    if (action === 'edit') return openEditor(records[Number(target.dataset.index)]);
    if (action === 'new') { if (capabilities.edit) return openEditor(); return; }
    if (action === 'remove-cover') return setCover('', true);
    if (action === 'upload-cover') return uploadCover();
    if (action === 'collection' || (action === 'media' && canManageMedia())) {
      if (!await confirmLeave(opener) || disposed) return; draft = null; baseline = ''; query = ''; page = 1;
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
      syncAutomaticSlug();
      if (['publish', 'review'].includes(action) && showIssues(validateEntry(draft, collection(), true))) return;
      const editing = draft;
      if (action !== 'review' && (!await ask(t(action), t(`${action}Confirm`), {variant: action === 'archive' ? 'archive' : 'confirm', opener}) || disposed || draft !== editing)) return;
      const nextStatus = action === 'publish' ? 'published' : action === 'archive' ? 'archived' : 'review';
      return mutate(() => adapter.transition(editing.id, nextStatus, {expectedVersion: editing.version}), {
        status: nextStatus, cover: collection().coverValue?.(editing.data.image_url),
        success: isArticle() ? `${action}Succeeded` : 'transitioned', failure: `${action}Failed`
      });
    }
    if (action === 'restore') {
      const revision = revisions[Number(target.dataset.index)], editing = draft;
      if (!capabilities.edit || !editing?.id || !revision) return;
      if (!await ask(t('restore'), t('restoreConfirm') + (dirty() ? ' ' + t('discardWarning') : ''), {opener}) || disposed || draft !== editing) return;
      return mutate(() => adapter.restore(editing.id, revision.id, {expectedVersion: editing.version}), {status: 'draft', success: 'restored', failure: 'restoreFailed'});
    }
    if (action === 'copy-media') {
      const item = media[Number(target.dataset.index)], url = safeMediaUrl(item?.url || item?.public_url || item?.signed_url || ''); if (!url) return;
      try { await root.ownerDocument.defaultView.navigator.clipboard.writeText(url); announce(t('copied')); } catch { announce(t('copyFailed') + ' ' + url); }
    }
    if (action === 'finish-media' || action === 'remove-media') {
      const item = media[Number(target.dataset.index)];
      if (!item || busy || !canManageMedia()) return;
      if (action === 'finish-media' && adapter.finishMedia) return changeMedia(() => adapter.finishMedia(item), t('mediaSaved'), target);
      if (action === 'remove-media' && adapter.removeMedia && await ask(t('removeMedia'), t('mediaRemoveConfirm'), {variant: 'danger-primary', opener}) && !disposed) {
        return changeMedia(() => adapter.removeMedia(item.id), t('mediaRemoved'), target, true);
      }
    }
  }
  async function onSubmit(event) {
    if (event.target.matches('[data-cms-editor]')) {
      event.preventDefault(); event.stopPropagation();
      if (busy || finishConfirmation || !draft || !capabilities.edit) return;
      syncAutomaticSlug();
      if (showIssues(validateEntry(draft, collection()))) return;
      const payload = structuredClone(draft);
      return mutate(() => adapter.save(payload, {expectedVersion: payload.version}), {
        status: 'draft', cover: collection().coverValue?.(payload.data.image_url), success: 'saved', failure: 'saveFailed'
      });
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
    if (draft && capabilities.edit && !busy && !event.target.disabled && event.target.dataset.field) {
      let value = event.target.value;
      if (event.target.dataset.field === 'data.image_url') { setCover(value); return; }
      if (event.target.dataset.list) value = value.split('\n').map(item => item.trim()).filter(Boolean);
      else if (event.target.type === 'number' && value !== '') value = Number(value);
      setValue(draft, event.target.dataset.field, value); updateEditorChecks();
    }
  }
  function onChange(event) {
    if (event.target.matches('[data-cms-status]')) { status = event.target.value; page = 1; void refresh(); }
    else if (event.target.matches('[data-cover-select]')) {
      const value = event.target.value;
      if (isArticle() && !value) setCover('', true);
      else if (coverImages.some(image => image.url === value)) setCover(value);
    }
    else if (event.target.dataset.field) onInput(event);
  }
  function onKey(event) {
    if (event.key === 'Escape' && !finishConfirmation && openMore()) {
      event.preventDefault(); event.stopPropagation(); setMore(openMore(), false, true);
    }
    if (event.key === 'Enter' && !busy && event.target.matches('[data-cms-search]')) { event.preventDefault(); query = event.target.value; page = 1; void refresh(); }
  }
  function onCancel(event) { if (event.target.matches('.cms-dialog')) { event.preventDefault(); void onClick({ target: { closest: () => root.querySelector('[data-action="close"]') } }); } }
  function beforeUnload(event) { if (dirty()) { event.preventDefault(); event.returnValue = ''; } }
  root.addEventListener('click', onClick); root.addEventListener('submit', onSubmit); root.addEventListener('input', onInput); root.addEventListener('change', onChange); root.addEventListener('keydown', onKey); root.addEventListener('cancel', onCancel, true);
  doc.addEventListener('click', dismissOutsideMenu, true); doc.addEventListener('focusin', dismissOutsideMenu);
  doc.defaultView.addEventListener('beforeunload', beforeUnload);
  shell();
  const ready = refresh(true);
  return {
    ready, isDirty: dirty, canLeave, confirmLeave,
    async refresh() { if (!canLeave()) return false; draft = null; baseline = ''; await refresh(true); return true; },
    setLanguage(value) { language = value === 'vi' ? 'vi' : 'en'; if (draft) { const previous = draft; shell(); draft = previous; editor(); } else shell(); },
    destroy({ force = false } = {}) {
      if (!force && !canLeave()) return false;
      finishConfirmation?.(false);
      editorWorkspace?.destroy(); editorWorkspace = null;
      disposed = true; ++epoch; draft = null; records = []; media = [];
      root.removeEventListener('click', onClick); root.removeEventListener('submit', onSubmit); root.removeEventListener('input', onInput); root.removeEventListener('change', onChange); root.removeEventListener('keydown', onKey); root.removeEventListener('cancel', onCancel, true);
      doc.removeEventListener('click', dismissOutsideMenu, true); doc.removeEventListener('focusin', dismissOutsideMenu);
      doc.defaultView.removeEventListener('beforeunload', beforeUnload);
      root.replaceChildren(); root.classList.remove('gary-cms'); root.removeAttribute('data-cms-articles'); delete root.dataset.cmsApp; return true;
    }
  };
}
