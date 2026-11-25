/* Staff workspaces and the signed-in profile share the website appearance preference. */
const words = {
  en: {
    preferences: 'Site preferences',
    close: 'Close preferences',
    appearance: 'Appearance',
    help: 'System follows your device settings.',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    staff: 'Staff Workspace',
    viewWebsite: 'View website',
    backWebsite: 'Back to website',
    agencyHome: 'Gary Agency home'
  },
  vi: {
    preferences: 'Tùy chọn website',
    close: 'Đóng tùy chọn',
    appearance: 'Giao diện',
    help: 'Hệ thống theo cài đặt thiết bị của bạn.',
    light: 'Sáng',
    dark: 'Tối',
    system: 'Hệ thống',
    staff: 'Không gian nhân viên',
    viewWebsite: 'Xem trang web',
    backWebsite: 'Về trang web',
    agencyHome: 'Trang chủ Gary Agency'
  }
};
const instances = new WeakMap();
export function mountPortalTheme(doc = document) {
  if (instances.has(doc)) return instances.get(doc);
  const win = doc.defaultView, root = doc.documentElement;
  const control = doc.getElementById('portal-theme');
  const group = doc.querySelector('.portal-appearance');
  const trigger = doc.querySelector('[data-portal-preferences]');
  const panel = doc.getElementById('portal-preferences-panel');
  const closeButton = doc.querySelector('[data-portal-preferences-close]');
  const context = doc.getElementById('portal-context');
  const header = doc.querySelector('.portal-header');
  const website = header?.querySelector('.portal-home');
  const wordmark = header?.querySelector('.wordmark');
  let selectedArea = root.dataset.visaPortal || (new URLSearchParams(win.location.search).get('area') === 'staff' ? 'staff' : 'customer');
  let open = false;
  const copy = () => words[root.lang === 'vi' ? 'vi' : 'en'];
  const layout = () => {
    const height = header?.getBoundingClientRect().height;
    if (height) root.style.setProperty('--visa-portal-header-height', `${Math.round(height)}px`);
  };
  const resize = win.ResizeObserver ? new win.ResizeObserver(layout) : null;
  if (header) resize?.observe(header);
  win.addEventListener('resize', layout);
  const setOpen = (next, restore = false) => {
    if (!panel || !trigger) return;
    open = next;
    panel.hidden = !open;
    panel.inert = !open;
    trigger.setAttribute('aria-expanded', String(open));
    if (open) {
      (panel.querySelector('[role=radiogroup], #portal-theme') || closeButton)?.focus?.({ preventScroll: true });
    } else if (restore) trigger.focus({ preventScroll: true });
  };
  const onTrigger = () => setOpen(!open, true);
  const onClose = () => setOpen(false, true);
  const onPointer = event => { if (open && !event.target.closest('.portal-preferences')) setOpen(false); };
  const onFocus = event => { if (open && !event.target.closest?.('.portal-preferences')) setOpen(false); };
  const onKey = event => { if (open && event.key === 'Escape') { event.preventDefault(); setOpen(false, true); } };
  function render() {
    const role = doc.body.dataset.role;
    const staff = role ? role === 'staff' : selectedArea === 'staff';
    root.dataset.visaPortal = staff ? 'staff' : 'customer';
    const profile = role === 'customer' && doc.body.dataset.visaView === 'profile';
    const themed = staff || profile;
    root.toggleAttribute('data-visa-profile', profile);
    // One resolved preference drives the host and all current/future overlays.
    // Retain the former sidebar attribute as a compatibility alias, never a second preference.
    root.dataset.visaStaffTheme = win.garyVisaPreferences?.resolvedTheme || root.dataset.visaTheme || 'light';
    root.style.colorScheme = themed ? root.dataset.visaStaffTheme : 'light';
    if (group) group.hidden = !themed;
    if (!themed) setOpen(false);
    const t = copy();
    if (context) {
      context.hidden = role !== 'staff';
      context.textContent = t.staff;
    }
    if (website) {
      const label = staff ? t.viewWebsite : t.backWebsite;
      website.setAttribute('aria-label', label);
      website.title = label;
      website.querySelector('.portal-home-label').textContent = label;
    }
    wordmark?.setAttribute('aria-label', t.agencyHome);
    if (trigger) {
      trigger.setAttribute('aria-label', t.preferences);
      trigger.title = t.preferences;
    }
    if (closeButton) closeButton.setAttribute('aria-label', t.close);
    const title = doc.getElementById('portal-preferences-title');
    if (title) title.textContent = t.preferences;
    const help = doc.querySelector('[data-portal-appearance-help]');
    if (help) help.textContent = t.help;
    if (control) {
      doc.querySelector('[data-portal-appearance-label]').textContent = t.appearance;
      control.setAttribute('aria-label', t.appearance);
      for (const option of control.options) option.textContent = t[option.value];
      control.value = win.garyVisaPreferences?.theme || 'system';
    }
    const meta = doc.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = themed && root.dataset.visaStaffTheme === 'dark' ? '#0D1924' : '#173954';
    layout();
  }
  const change = () => { win.setGaryVisaTheme?.(control.value); };
  control?.addEventListener('change', change);
  doc.addEventListener('gary:visual-preferences', render);
  doc.addEventListener('gary:language', render);
  trigger?.addEventListener('click', onTrigger);
  closeButton?.addEventListener('click', onClose);
  doc.addEventListener('pointerdown', onPointer);
  doc.addEventListener('focusin', onFocus);
  doc.addEventListener('keydown', onKey);
  const observer = new win.MutationObserver(render);
  observer.observe(doc.body, { attributes: true, attributeFilter: ['data-role', 'data-visa-view'] });
  observer.observe(root, { attributes: true, attributeFilter: ['lang'] });
  const chooseArea = event => { const button = event.target.closest('[data-area]'); if (button) { selectedArea = button.dataset.area; render(); } };
  doc.addEventListener('click', chooseArea);
  if (panel) { panel.hidden = true; panel.inert = true; }
  render();
  const controller = {
    refresh: render,
    destroy() {
      observer.disconnect(); resize?.disconnect();
      win.removeEventListener('resize', layout);
      control?.removeEventListener('change', change);
      doc.removeEventListener('gary:visual-preferences', render);
      doc.removeEventListener('gary:language', render);
      doc.removeEventListener('click', chooseArea);
      trigger?.removeEventListener('click', onTrigger);
      closeButton?.removeEventListener('click', onClose);
      doc.removeEventListener('pointerdown', onPointer);
      doc.removeEventListener('focusin', onFocus);
      doc.removeEventListener('keydown', onKey);
      instances.delete(doc);
    }
  };
  instances.set(doc, controller); return controller;
}
if (typeof document !== 'undefined') mountPortalTheme(document);
