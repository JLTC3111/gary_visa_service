// No React/WebGL imports until preferences are resolved and the hero is visible.
export function createVisualEffectsController({
  window: browser,
  document,
  host = document.getElementById('visa-hyperspeed-host'),
  hero = document.getElementById('visa-cinematic-hero'),
  loadMount = () => import('./mount-hyperspeed.tsx'),
  clock = {
    now: () => browser.performance?.now() ?? performance.now(),
    setTimeout: (callback, delay) => globalThis.setTimeout(callback, delay),
    clearTimeout: timer => globalThis.clearTimeout(timer)
  }
}) {
  if (!host || !hero) return { destroy() {}, togglePlayback() {} };
  const initial = browser.garyVisaPreferences;
  let enabled = initial?.ready === true && initial.effects === true;
  let theme = initial?.resolvedTheme === 'light' ? 'light' : 'dark';
  let visible = !browser.IntersectionObserver;
  let disposed = false, failed = false, pending = false, frameReady = false;
  let generation = 0, modulePromise, renderer, lastStatus;
  // One introduction per page session. Time only accrues after a real first frame
  // while visible, enabled and playing; theme/locale events never reset it.
  let introduction = true, remaining = 2_500, wantsPlayback = true;
  let runningSince = null, deadline = null, deadlineGeneration = 0;
  const visiblePage = () => visible && document.visibilityState !== 'hidden';
  const status = value => {
    host.dataset.effectsState = value;
    if (value === lastStatus) return;
    lastStatus = value;
    browser.dispatchEvent(new browser.CustomEvent('gary:visual-status', {
      detail: { status: value, introduction, autoRemainingMs: remaining }
    }));
  };
  const stopIntroductionClock = () => {
    if (runningSince !== null) remaining = Math.max(0, remaining - Math.max(0, clock.now() - runningSince));
    runningSince = null;
    if (deadline !== null) clock.clearTimeout(deadline);
    deadline = null;
    deadlineGeneration++;
  };
  const syncIntroductionClock = active => {
    if (!active || !introduction) { stopIntroductionClock(); return; }
    if (runningSince !== null) return;
    runningSince = clock.now();
    const token = ++deadlineGeneration;
    deadline = clock.setTimeout(() => {
      if (disposed || token !== deadlineGeneration) return;
      stopIntroductionClock();
      remaining = 0;
      introduction = false;
      wantsPlayback = false;
      void reconcile();
    }, remaining);
  };
  const destroyRenderer = () => {
    stopIntroductionClock();
    const previous = renderer;
    renderer = undefined;
    frameReady = false;
    previous?.unmount();
  };
  const unavailable = token => {
    Promise.resolve().then(() => {
      if (disposed || token !== generation) return;
      failed = true;
      destroyRenderer();
      status('unavailable');
    });
  };
  const togglePlayback = () => {
    if (disposed || !enabled || !renderer || !frameReady || !visiblePage()) return;
    stopIntroductionClock();
    introduction = false;
    wantsPlayback = !wantsPlayback;
    void reconcile();
  };
  const reconcile = async () => {
    if (disposed) return;
    const active = enabled && visiblePage() && wantsPlayback;
    if (!enabled) {
      generation++;
      pending = false;
      destroyRenderer();
      status('off');
      return;
    }
    if (renderer) {
      renderer.setPaused(!active);
      syncIntroductionClock(active && frameReady);
      status(active ? frameReady ? 'active' : 'loading' : 'paused');
      return;
    }
    syncIntroductionClock(false);
    if (failed) { status('unavailable'); return; }
    if (!visiblePage()) { status('idle'); return; }
    if (pending) return;
    pending = true;
    const token = ++generation;
    status('loading');
    try {
      modulePromise ??= loadMount();
      const { mountHyperspeed } = await modulePromise;
      if (disposed || token !== generation) return;
      pending = false;
      if (!enabled || !visiblePage()) { void reconcile(); return; }
      // A fresh context needs its first frame even if a previous scene was
      // manually paused. After it is ready, preserve the page's playback intent.
      renderer = mountHyperspeed(host, hero, {
        theme,
        onUnavailable: () => unavailable(token),
        onToggle: togglePlayback,
        onReady: () => {
          if (disposed || token !== generation) return;
          frameReady = true;
          void reconcile();
        }
      });
    } catch {
      if (disposed || token !== generation) return;
      pending = false;
      failed = true;
      destroyRenderer();
      status('unavailable');
    }
  };
  const onPreference = event => {
    const { effects, resolvedTheme } = event.detail ?? {};
    if (typeof effects !== 'boolean') return;
    enabled = effects;
    if (theme !== resolvedTheme && (resolvedTheme === 'light' || resolvedTheme === 'dark')) {
      theme = resolvedTheme;
      if (enabled) renderer?.setTheme?.(theme);
    }
    void reconcile();
  };
  const onVisibility = () => { void reconcile(); };
  const observer = browser.IntersectionObserver ? new browser.IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    void reconcile();
  }, { threshold: 0 }) : null;
  const buttons = [...(document.querySelectorAll?.('[data-playback-control]') ?? [])];
  buttons.forEach(button => button.addEventListener('click', togglePlayback));
  observer?.observe(hero);
  browser.addEventListener('gary:visual-preferences', onPreference);
  document.addEventListener('visibilitychange', onVisibility);
  void reconcile();
  return {
    togglePlayback,
    destroy() {
      if (disposed) return;
      disposed = true;
      generation++;
      observer?.disconnect();
      browser.removeEventListener('gary:visual-preferences', onPreference);
      document.removeEventListener('visibilitychange', onVisibility);
      buttons.forEach(button => button.removeEventListener('click', togglePlayback));
      destroyRenderer();
      status('disposed');
    }
  };
}

if (typeof window !== 'undefined') {
  let visualEffects = createVisualEffectsController({ window, document });
  window.addEventListener('pagehide', () => visualEffects.destroy());
  window.addEventListener('pageshow', event => {
    if (event.persisted) visualEffects = createVisualEffectsController({ window, document });
  });
}
