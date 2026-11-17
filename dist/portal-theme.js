/* A staff host for the website's existing appearance preference. No auth state is written. */
const words = {
  en: { appearance: 'Appearance', light: 'Light', dark: 'Dark', system: 'System' },
  vi: { appearance: 'Giao diện', light: 'Sáng', dark: 'Tối', system: 'Hệ thống' }
};
const instances = new WeakMap();
export function mountPortalTheme(doc = document) {
  if (instances.has(doc)) return instances.get(doc);
  const win = doc.defaultView, root = doc.documentElement;
  const control = doc.getElementById('portal-theme');
  const group = doc.querySelector('.portal-appearance');
  let selectedArea = root.dataset.visaPortal || (new URLSearchParams(win.location.search).get('area') === 'staff' ? 'staff' : 'customer');
  function render() {
    const role = doc.body.dataset.role;
    const staff = role ? role === 'staff' : selectedArea === 'staff';
    root.dataset.visaPortal = staff ? 'staff' : 'customer';
    // One resolved preference drives the host and all current/future overlays.
    // Retain the former sidebar attribute as a compatibility alias, never a second preference.
    root.dataset.visaStaffTheme = win.garyVisaPreferences?.resolvedTheme || root.dataset.visaTheme || 'light';
    root.style.colorScheme = staff ? root.dataset.visaStaffTheme : 'light';
    if (group) group.hidden = !staff;
    if (control) {
      const t = words[root.lang === 'vi' ? 'vi' : 'en'];
      doc.querySelector('[data-portal-appearance-label]').textContent = t.appearance;
      control.setAttribute('aria-label', t.appearance);
      for (const option of control.options) option.textContent = t[option.value];
      control.value = win.garyVisaPreferences?.theme || 'system';
    }
    const meta = doc.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = staff && root.dataset.visaStaffTheme === 'dark' ? '#0D1924' : '#173954';
  }
  const change = () => { win.setGaryVisaTheme?.(control.value); };
  control?.addEventListener('change', change);
  doc.addEventListener('gary:visual-preferences', render);
  doc.addEventListener('gary:language', render);
  const observer = new win.MutationObserver(render);
  observer.observe(doc.body, { attributes: true, attributeFilter: ['data-role'] });
  observer.observe(root, { attributes: true, attributeFilter: ['lang'] });
  const chooseArea = event => { const button = event.target.closest('[data-area]');if (button) { selectedArea = button.dataset.area;render(); } };
  doc.addEventListener('click', chooseArea);
  render();
  const controller = { refresh: render, destroy() {
    observer.disconnect();control?.removeEventListener('change', change);
    doc.removeEventListener('gary:visual-preferences', render);doc.removeEventListener('gary:language', render);doc.removeEventListener('click', chooseArea);
    instances.delete(doc);
  } };
  instances.set(doc, controller);return controller;
}
if (typeof document !== 'undefined') mountPortalTheme(document);
