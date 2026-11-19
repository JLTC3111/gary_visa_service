import {attachEditorWorkspace} from './editor-workspace/index.js';

// Enlarge existing editors by moving their original nodes, never recreating a
// form. Native validation, selected uploads and application listeners stay put.
export function mountPortalEditors(doc, {language = () => doc.documentElement.lang === 'vi' ? 'vi' : 'en'} = {}) {
 const controllers = [];
 const headers = [];
 const cancellations = [];
 function headerFor(dialog, titleNodes) {
  const header = doc.createElement('header');
  header.className = 'gw-editor-header';
  const title = doc.createElement('div'); title.className = 'gw-editor-title';
  titleNodes.filter(Boolean).forEach(node => title.append(node));
  const controls = doc.createElement('div'); controls.className = 'gw-editor-controls';
  const close = dialog.querySelector(':scope > .dialog-close');
  if (close) controls.append(close);
  header.append(title, controls); dialog.prepend(header); headers.push(header);
  return header;
 }
 function formEditor(id, key) {
  const dialog = doc.getElementById(id); if (!dialog || dialog.dataset.portalEditor) return;
  const form = dialog.querySelector(':scope > form'); if (!form) return;
  const header = headerFor(dialog, [dialog.querySelector(':scope > .eyebrow'),dialog.querySelector(':scope > h2')]);
  const body = doc.createElement('div'); body.className = 'gw-editor-body';
  const actions = doc.createElement('footer'); actions.className = 'gw-editor-actions';
  // Keep the introduction in the scrolling body, above the original fields.
  for (const node of [...dialog.children]) if (node !== header && node !== form) body.append(node);
  for (const node of [...form.childNodes]) {
   if (node.nodeType === 1 && (node.matches('button[type="submit"]') || node.classList.contains('form-feedback'))) actions.append(node);
   else body.append(node);
  }
  const cancel=doc.createElement('button');cancel.type='button';cancel.className='button button-secondary';cancel.dataset.buttonVariant='cancel';cancel.addEventListener('click',()=>header.querySelector('.dialog-close')?.click());actions.append(cancel);cancellations.push(cancel);
  form.classList.add('gw-editor-form'); form.append(body, actions);
  dialog.dataset.portalEditor = 'form';
  controllers.push(attachEditorWorkspace(dialog, {key,language,header,body,actions}));
 }
 function detailEditor(id, key, headingSelector) {
  const dialog = doc.getElementById(id); if (!dialog || dialog.dataset.portalEditor) return;
  const header = headerFor(dialog, [dialog.querySelector(headingSelector)]);
  const body = doc.createElement('div'); body.className = 'gw-editor-body';
  for (const node of [...dialog.childNodes]) if (node !== header) body.append(node);
  dialog.append(body); dialog.dataset.portalEditor = 'detail';
  controllers.push(attachEditorWorkspace(dialog, {key,language,header,body}));
 }
 formEditor('request-dialog','visa.application');
 formEditor('contact-edit-dialog','visa.contact');
 detailEditor('case-dialog','visa.case','.case-header');
 detailEditor('contact-dialog','visa.relationship','.crm-detail-heading');
 function refresh() {
  const label = language() === 'vi' ? 'Đóng trình chỉnh sửa' : 'Close editor';
  cancellations.forEach(button=>{button.textContent=language()==='vi'?'Hủy':'Cancel';});
  headers.forEach(header => header.querySelector('.dialog-close')?.setAttribute('aria-label',label));
  controllers.forEach(controller => controller.refresh());
 }
 refresh();
 return {refresh,destroy(){controllers.forEach(controller => controller.destroy());},controllers};
}
