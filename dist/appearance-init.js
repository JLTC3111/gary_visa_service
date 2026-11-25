/* Runs before styles. Shared website/portal appearance preference; hosts own their styling. */
(() => {
  const root = document.documentElement;
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const dark = matchMedia('(prefers-color-scheme: dark)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const validTheme = value => ['light', 'dark', 'system'].includes(value) ? value : 'system';
  let theme = validTheme(read('gary-visa-theme'));
  let motion = read('gary-visa-effects');
  if (!['on', 'off'].includes(motion)) motion = null;
  function apply() {
    const resolvedTheme = theme === 'system' ? dark.matches ? 'dark' : 'light' : theme;
    const effects = motion ? motion === 'on' : !reduce.matches && !navigator.connection?.saveData;
    root.dataset.visaTheme = resolvedTheme;
    root.dataset.visaThemePreference = theme;
    root.dataset.visaEffects = effects ? 'on' : 'off';
    root.style.colorScheme = resolvedTheme;
    window.garyVisaPreferences = { ready: true, theme, resolvedTheme, effects, effectsPreference: motion };
    document.dispatchEvent(new CustomEvent('gary:visual-preferences', { detail: window.garyVisaPreferences, bubbles: true }));
  }
  window.setGaryVisaTheme = value => {
    theme = validTheme(value); try { localStorage.setItem('gary-visa-theme', theme); } catch {} apply();
  };
  window.setGaryVisaEffects = enabled => {
    motion = enabled ? 'on' : 'off'; try { localStorage.setItem('gary-visa-effects', motion); } catch {} apply();
  };
  dark.addEventListener('change', apply);
  reduce.addEventListener('change', apply);
  navigator.connection?.addEventListener('change', apply);
  addEventListener('storage', event => {
    if (event.key === 'gary-visa-theme') theme = validTheme(read('gary-visa-theme'));
    if (event.key === 'gary-visa-effects') { const value = read('gary-visa-effects'); motion = ['on', 'off'].includes(value) ? value : null; }
    apply();
  });
  apply();
})();
