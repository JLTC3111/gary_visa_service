const active = new WeakMap();

export function showActionToast(doc, message, options = {}) {
  const {tone = 'success', key = message, publication = false, returnFocus} = options;
  const previous = active.get(doc);
  if (previous?.key === key && previous.tone === tone && previous.node.isConnected) return previous;
  previous?.dismiss();

  const win = doc.defaultView;
  const node = doc.createElement('div');
  node.className = 'action-toast';
  node.dataset.tone = tone;
  if (publication) node.dataset.cmsSuccess = '';
  node.innerHTML = `
    <div>
      <div aria-atomic="true">
        <strong data-success-heading></strong>
        <span data-success-message></span>
        <span data-success-title></span>
      </div>
      <a data-success-link target="_blank" rel="noopener noreferrer" hidden></a>
    </div>
    <button type="button" data-success-close></button>`;
  const live = node.querySelector('[aria-atomic]');
  live.setAttribute('role', tone === 'error' ? 'alert' : 'status');
  const link = node.querySelector('[data-success-link]');
  const close = node.querySelector('[data-success-close]');
  let timer, focusBefore = doc.activeElement, hovered = false;

  function stopTimer() { win.clearTimeout(timer); }
  function resume() {
    stopTimer();
    if (tone !== 'error' && !hovered && !node.contains(doc.activeElement)) timer = win.setTimeout(dismiss, 4500);
  }
  function dismiss() {
    stopTimer();
    const focused = node.contains(doc.activeElement);
    node.remove();
    if (active.get(doc) === toast) active.delete(doc);
    if (focused) {
      if (focusBefore?.isConnected && focusBefore !== doc.body && !focusBefore.closest('dialog:not([open])')) focusBefore.focus({preventScroll: true});
      else returnFocus?.();
    }
  }
  function update({language = 'en', heading = '', detail = '', href = '', linkLabel = ''} = {}, text = message) {
    node.lang = language;
    node.querySelector('[data-success-heading]').textContent = heading;
    node.querySelector('[data-success-message]').textContent = text;
    node.querySelector('[data-success-title]').textContent = detail;
    close.textContent = language === 'vi' ? 'Đóng' : 'Dismiss';
    link.hidden = !href;
    if (href) { link.href = href; link.textContent = linkLabel; }
  }

  const toast = {key, tone, node, dismiss, update};
  active.set(doc, toast);
  close.addEventListener('click', dismiss);
  node.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; stopTimer(); } });
  node.addEventListener('pointerleave', () => { hovered = false; resume(); });
  node.addEventListener('focusin', event => {
    if (event.relatedTarget && !node.contains(event.relatedTarget)) focusBefore = event.relatedTarget;
    stopTimer();
  });
  node.addEventListener('focusout', event => {
    if (!node.contains(event.relatedTarget)) win.queueMicrotask(() => { if (node.isConnected) resume(); });
  });
  node.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); dismiss(); }
  });
  const dialog = [...doc.querySelectorAll('dialog[open]')].at(-1);
  (dialog || doc.body).append(node);
  if (dialog && typeof node.showPopover === 'function') {
    node.setAttribute('popover', 'manual');
    try { node.showPopover(); } catch { node.removeAttribute('popover'); }
  }
  update(options);
  resume();
  return toast;
}
