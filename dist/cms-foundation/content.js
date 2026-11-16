export const CMS_VERSION = '1.0.0';
export const CONTENT_STATUSES = Object.freeze(['draft', 'review', 'published', 'archived']);
export const LOCALES = Object.freeze(['en', 'vi']);
export function getValue(record, key) { return key.split('.').reduce((value, part) => value?.[part], record); }
export function setValue(record, key, value) {
  const parts = key.split('.');
  if (parts.some(part => ['__proto__', 'prototype', 'constructor'].includes(part))) throw new Error('Invalid field');
  let target = record;
  for (const part of parts.slice(0, -1)) target = target[part] ??= {};
  target[parts.at(-1)] = value;
}
export function emptyEntry(kind) {
  return { kind, slug: '', title_en: '', title_vi: '', summary_en: '', summary_vi: '', body_en: '', body_vi: '', seo_title_en: '', seo_title_vi: '', seo_description_en: '', seo_description_vi: '', data: {}, status: 'draft', version: 0 };
}
export function fieldsFor(collection) {
  return (collection.fields || []).flatMap(field => field.bilingual
    ? LOCALES.map(locale => ({ ...field, key: `data.${field.key}_${locale}`, locale, bilingual: false }))
    : [{ ...field, key: field.key.includes('.') ? field.key : `data.${field.key}` }]);
}
export function safeMediaUrl(value) {
  if (typeof value !== 'string' || /[\u0000-\u0020\\]/.test(value)) return '';
  if (/^\/(?!\/)/.test(value)) return value;
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : ''; } catch { return ''; }
}
export function validateEntry(record, collection, publish = false) {
  const issues = [];
  const issue = (code, field, params = {}) => issues.push({ code, field, params, severity: 'critical' });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug || '') || record.slug.length > 180) issue('cms-slug', 'slug', { slug: record.slug || '' });
  if (!String(record.title_en || '').trim() && !String(record.title_vi || '').trim()) issue('cms-title-missing', 'title_en', { language: 'en / vi' });
  for (const locale of LOCALES) {
    if (publish) {
      for (const field of ['title', 'summary', ...(collection.requireBody === false ? [] : ['body'])]) {
        if (!String(record[`${field}_${locale}`] || '').trim()) issue(`cms-${field}-missing`, `${field}_${locale}`, { language: locale });
      }
    }
  }
  for (const field of fieldsFor(collection)) {
    const value = getValue(record, field.key);
    if (publish && field.required && (value === '' || value === null || value === undefined || Array.isArray(value) && !value.length)) issue('cms-field-required', field.key, { field: field.label?.en || field.key, language: field.locale || '' });
    if (value !== '' && value !== undefined && value !== null) {
      if (field.type === 'url' && !safeMediaUrl(String(value))) issue('cms-url-invalid', field.key);
      if (field.type === 'number' && (!Number.isFinite(Number(value)) || field.min !== undefined && Number(value) < field.min || field.max !== undefined && Number(value) > field.max)) issue('cms-number-invalid', field.key);
      if (field.type === 'select' && !field.options?.some(option => String(typeof option === 'object' ? option.value : option) === String(value))) issue('cms-option-invalid', field.key);
      if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) issue('cms-date-invalid', field.key);
    }
  }
  return issues;
}
export function contentSeoFindings(record, collection) {
  const issues = validateEntry(record, collection, true).map(issue => ({ ...issue, id: issue.code + ':' + issue.field, category: 'content' }));
  for (const locale of LOCALES) {
    const title = String(record[`seo_title_${locale}`] || record[`title_${locale}`] || '').trim();
    const description = String(record[`seo_description_${locale}`] || record[`summary_${locale}`] || '').trim();
    if (title && (title.length < 20 || title.length > 65)) issues.push({ id: `cms-title-length:${locale}`, code: 'cms-seo-title-length', params: { language: locale, count: title.length }, severity: 'warning', category: 'content' });
    if (description && (description.length < 70 || description.length > 170)) issues.push({ id: `cms-description-length:${locale}`, code: 'cms-seo-description-length', params: { language: locale, count: description.length }, severity: 'warning', category: 'content' });
  }
  if (!issues.some(issue => issue.severity === 'critical')) issues.push({ id: 'cms-translation-complete', code: 'cms-translation-complete', params: {}, severity: 'passed', category: 'content' });
  return issues;
}
