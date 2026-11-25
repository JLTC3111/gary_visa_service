const copy = {
  en: { preferences: 'Website preferences', close: 'Close preferences', switches: 'Language and visual effects', language: 'Language', theme: 'Appearance', light: 'Light', dark: 'Dark', system: 'System', effects: 'Visual effects', on: 'On', off: 'Off', help: 'Turn off the animated highway to save graphics power.', shortcut: 'Visual settings', hint: 'Click the road to pause. Press and hold to accelerate.', pausedHint: 'Click the road or press Play to resume.', play: 'Play animation', pause: 'Pause animation', unavailable: 'Static view. Animation is unavailable on this device.' },
  vi: { preferences: 'Tùy chọn website', close: 'Đóng tùy chọn', switches: 'Ngôn ngữ và hiệu ứng', language: 'Ngôn ngữ', theme: 'Giao diện', light: 'Sáng', dark: 'Tối', system: 'Hệ thống', effects: 'Hiệu ứng', on: 'Bật', off: 'Tắt', help: 'Tắt đường cao tốc chuyển động để tiết kiệm tài nguyên đồ họa.', shortcut: 'Tùy chọn hiệu ứng', hint: 'Nhấp vào đường để tạm dừng. Nhấn giữ để tăng tốc.', pausedHint: 'Nhấp vào đường hoặc nhấn Phát để tiếp tục.', play: 'Phát hoạt ảnh', pause: 'Tạm dừng hoạt ảnh', unavailable: 'Hình nền tĩnh. Thiết bị này không hỗ trợ hoạt ảnh.' }
};
const preferencesRoot = document.querySelector('.visa-preferences');
const panel = document.getElementById('visa-preferences-panel');
const trigger = document.getElementById('visa-preferences-trigger');
const hero = document.querySelector('#visa-cinematic-hero');
let feedbackTimer = null;
let returnFocus = trigger;
let visualStatus = document.getElementById('visa-hyperspeed-host')?.dataset.effectsState;
function clearPlaybackFeedback() {
  if (feedbackTimer !== null) clearTimeout(feedbackTimer);
  feedbackTimer = null;
  if (hero) delete hero.dataset.playbackFeedback;
}
function flashPlaybackFeedback() {
  const button = document.querySelector('[data-playback-control]');
  if (!hero || !button || button.hidden) { clearPlaybackFeedback(); return; }
  hero.dataset.playbackFeedback = 'true';
  if (feedbackTimer !== null) clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => { feedbackTimer = null; delete hero.dataset.playbackFeedback; }, 1800);
}
function renderEffectsGuidance() {
  const t = copy[document.documentElement.lang === 'vi' ? 'vi' : 'en'];
  const enabled = window.garyVisaPreferences.effects;
  const available = enabled && ['active', 'paused'].includes(visualStatus);
  const playing = visualStatus === 'active';
  document.querySelectorAll('[data-effects-hint]').forEach(node => {
    node.hidden = !available;
    node.textContent = playing ? t.hint : t.pausedHint;
  });
  document.querySelectorAll('[data-effects-fallback]').forEach(node => node.hidden = !enabled || visualStatus !== 'unavailable');
  document.querySelectorAll('[data-playback-control]').forEach(button => {
    button.hidden = !available;
    button.setAttribute('aria-label', playing ? t.pause : t.play);
    button.setAttribute('title', playing ? t.pause : t.play);
    button.querySelector('[data-playback-symbol]')?.setAttribute('href', playing ? '#i-pause' : '#i-play');
  });
  if (!available) clearPlaybackFeedback();
}
function renderPreferences() {
  const t = copy[document.documentElement.lang === 'vi' ? 'vi' : 'en'];
  const preferences = window.garyVisaPreferences;
  trigger?.setAttribute('aria-label', t.preferences);
  document.querySelectorAll('[data-preferences-title]').forEach(node => node.textContent = t.preferences);
  document.querySelectorAll('[data-close-preferences]').forEach(node => node.setAttribute('aria-label', t.close));
  for (const [key, value] of [['switches', t.switches], ['language', t.language], ['appearance', t.theme], ['effects', t.effects], ['help', t.help]]) {
    document.querySelectorAll(`[data-preferences-${key}]`).forEach(node => node.textContent = value);
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === (document.documentElement.lang === 'vi' ? 'vi' : 'en'))));
  document.querySelectorAll('[data-theme-choice]').forEach(button => {
    button.textContent = t[button.dataset.themeChoice];
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preferences.theme));
  });
  document.querySelectorAll('[data-effects-choice]').forEach(button => {
    button.textContent = t[button.dataset.effectsChoice];
    button.setAttribute('aria-pressed', String((button.dataset.effectsChoice === 'on') === preferences.effects));
  });
  document.querySelectorAll('[data-open-preferences="effects"]').forEach(button => button.textContent = t.shortcut);
  document.querySelectorAll('[data-effects-hint]').forEach(node => node.textContent = t.hint);
  document.querySelectorAll('[data-effects-fallback]').forEach(node => node.textContent = t.unavailable);
  renderEffectsGuidance();
}
function closePreferences(restoreFocus = false) {
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  panel.inert = true;
  document.querySelectorAll('[data-open-preferences]').forEach(button => button.setAttribute('aria-expanded', 'false'));
  if (restoreFocus) returnFocus?.focus({ preventScroll: true });
}
function openPreferences(source) {
  if (!panel) return;
  if (!panel.hidden && source === trigger) { closePreferences(true); return; }
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle?.getAttribute('aria-expanded') === 'true') menuToggle.click();
  document.querySelectorAll('.header .gary-apps-menu[open]').forEach(menu => menu.open = false);
  returnFocus = source;
  panel.hidden = false;
  panel.inert = false;
  document.querySelectorAll('[data-open-preferences]').forEach(button => button.setAttribute('aria-expanded', 'true'));
  const first = source.dataset.openPreferences === 'effects'
    ? panel.querySelector('[data-squish-mode="effects"] .squish-switch') || panel.querySelector('[data-effects-choice][aria-pressed="true"]')
    : panel.querySelector('.preferences-language .squish-switch') || panel.querySelector('[data-lang][aria-pressed="true"]');
  first?.focus({ preventScroll: true });
}
document.querySelectorAll('[data-open-preferences]').forEach(button => button.addEventListener('click', () => openPreferences(button)));
document.querySelectorAll('[data-close-preferences]').forEach(button => button.addEventListener('click', () => closePreferences(true)));
document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => window.setGaryVisaTheme(button.dataset.themeChoice)));
document.querySelectorAll('[data-effects-choice]').forEach(button => button.addEventListener('click', () => window.setGaryVisaEffects(button.dataset.effectsChoice === 'on')));
document.addEventListener('pointerdown', event => {
  if (!panel?.hidden && !preferencesRoot.contains(event.target) && !event.target.closest('[data-open-preferences]')) closePreferences();
});
document.addEventListener('focusin', event => {
  if (!panel?.hidden && !preferencesRoot.contains(event.target)) closePreferences();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !panel?.hidden) { event.preventDefault(); closePreferences(true); }
});
document.addEventListener('gary:visual-preferences', renderPreferences);
document.addEventListener('gary:language', renderPreferences);
window.addEventListener('gary:visual-status', event => { visualStatus = event.detail?.status; renderEffectsGuidance(); flashPlaybackFeedback(); });
renderPreferences();
hero?.addEventListener('pointermove', flashPlaybackFeedback);
window.addEventListener('pagehide', clearPlaybackFeedback);
if (hero && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => document.querySelector('.header').classList.toggle('over-hero', entries[0].isIntersecting), { rootMargin: '-80px 0px 0px 0px' });
  observer.observe(hero);
}
