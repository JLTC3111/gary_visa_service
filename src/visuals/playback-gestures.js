// Pointer classification is separate from rendering. It never captures pointers
// or prevents browser scrolling, text selection, or native control activation.
const excluded = 'a,button,input,select,textarea,summary,label,h1,h2,h3,h4,h5,h6,p,dialog,[role="button"],[role="link"],[contenteditable],[data-no-boost]';

export function attachPlaybackGestures({
  hero,
  browser = hero.ownerDocument.defaultView,
  document = hero.ownerDocument,
  onToggle,
  onBoost,
  isPaused,
  holdMs = 300,
  moveTolerance = 10,
  now = () => browser.performance.now(),
  setTimer = (callback, delay) => browser.setTimeout(callback, delay),
  clearTimer = timer => browser.clearTimeout(timer)
}) {
  const pointers = new Set();
  let gesture;
  let disposed = false;
  let boosted = false;
  const boost = value => {
    if (boosted === value) return;
    boosted = value;
    onBoost(value);
  };
  const cancel = () => {
    if (gesture?.timer !== undefined) clearTimer(gesture.timer);
    gesture = undefined;
    boost(false);
  };
  const reset = () => { pointers.clear(); cancel(); };
  const id = event => event.pointerId ?? 0;
  const moved = event => gesture && Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > moveTolerance;
  const onGlobalDown = event => {
    pointers.add(id(event));
    if (pointers.size > 1 || event.isPrimary === false) cancel();
  };
  const onDown = event => {
    if (disposed || event.isPrimary === false || pointers.size > 1) return;
    if (event.button > 0 || event.target?.closest?.(excluded)) return;
    if (gesture) { cancel(); return; }
    gesture = { id: id(event), x: event.clientX, y: event.clientY, started: now(), held: false };
    gesture.timer = setTimer(() => {
      if (!gesture || disposed) return;
      gesture.timer = undefined;
      gesture.held = true;
      if (!isPaused()) boost(true);
    }, holdMs);
  };
  const onMove = event => {
    if (gesture?.id !== id(event) || !moved(event)) return;
    // A deliberate mouse hold may continue steering. Touch/pen movement still
    // relinquishes the gesture to native scrolling, even after the hold starts.
    if (!gesture.held || event.pointerType !== 'mouse') cancel();
  };
  const onUp = event => {
    pointers.delete(id(event));
    if (!gesture || gesture.id !== id(event)) return;
    const tap = !gesture.held && now() - gesture.started < holdMs && !moved(event)
      && event.target?.nodeType && hero.contains(event.target) && !event.target?.closest?.(excluded);
    cancel();
    if (tap && !disposed) onToggle();
  };
  const onCancel = event => { pointers.delete(id(event)); cancel(); };
  const onVisibility = () => { if (document.hidden || document.visibilityState === 'hidden') reset(); };

  browser.addEventListener('pointerdown', onGlobalDown, { capture: true, passive: true });
  hero.addEventListener('pointerdown', onDown, { passive: true });
  hero.addEventListener('pointermove', onMove, { passive: true });
  hero.addEventListener('pointerleave', cancel);
  browser.addEventListener('pointerup', onUp, { passive: true });
  browser.addEventListener('pointercancel', onCancel, { passive: true });
  browser.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', onVisibility);
  document.addEventListener('scroll', cancel, { capture: true, passive: true });

  return {
    cancel,
    destroy() {
      if (disposed) return;
      disposed = true;
      reset();
      browser.removeEventListener('pointerdown', onGlobalDown, true);
      hero.removeEventListener('pointerdown', onDown);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', cancel);
      browser.removeEventListener('pointerup', onUp);
      browser.removeEventListener('pointercancel', onCancel);
      browser.removeEventListener('blur', reset);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('scroll', cancel, true);
    }
  };
}
