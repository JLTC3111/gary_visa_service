// Adapted from the React Bits Squish Switch. See licenses/react-bits-LICENSE.md.
const mounted = new WeakMap();

function makeSwitch(doc, change) {
  const win = doc.defaultView;
  const button = doc.createElement('button');
  button.type = 'button';
  button.className = 'squish-switch';
  button.setAttribute('role', 'switch');
  button.innerHTML = '<span class="squish-switch__track" aria-hidden="true"><span class="squish-switch__options"><span></span><span></span></span><span class="squish-switch__thumb"><span></span></span></span>';
  const track = button.querySelector('.squish-switch__track');
  const states = [...button.querySelectorAll('.squish-switch__options span')];
  const thumbLabel = button.querySelector('.squish-switch__thumb span');
  const media = win.matchMedia?.('(prefers-reduced-motion: reduce)');
  let checked, position = 0, velocity = 0, frame = 0, previous = 0, drag = null, skipClick = false;
  let travel = 38, timer = 0;

  function updateThumbLabel() {
    const text = states[position > .5 ? 1 : 0].textContent;
    if (thumbLabel.textContent !== text) thumbLabel.textContent = text;
  }

  function paint(stretch = 0) {
    button.style.setProperty('--ss-position', String(position));
    button.style.setProperty('--ss-squish', String(1 + (media?.matches ? 0 : Math.min(.4, Math.abs(stretch) * travel / 600) * .36)));
    updateThumbLabel();
  }

  function stop() {
    if (frame) win.cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    velocity = 0;
  }

  function spring(now) {
    const next = checked ? 1 : 0;
    const dt = previous ? Math.min((now - previous) / 1000, .032) : 1 / 60;
    previous = now;
    velocity += (170 * (next - position) - 21.5 * velocity) / .9 * dt;
    position += velocity * dt;
    if (Math.abs(next - position) < .001 && Math.abs(velocity) < .01) {
      position = next;
      stop();
      paint();
      return;
    }
    paint(velocity);
    frame = win.requestAnimationFrame(spring);
  }

  function settle(animate = true) {
    stop();
    if (drag) return;
    const next = checked ? 1 : 0;
    if (!animate || media?.matches || position === next) {
      position = next;
      paint();
    } else frame = win.requestAnimationFrame(spring);
  }

  function present(next, {labels, label, title}) {
    const initial = checked === undefined;
    const moved = next !== checked;
    checked = next;
    button.setAttribute('aria-checked', String(checked));
    button.setAttribute('aria-label', label);
    button.title = title;
    states.forEach((node, index) => { node.textContent = labels[index]; });
    updateThumbLabel();
    if (moved) settle(!initial);
  }

  function commit(next) {
    if (button.disabled) return;
    if (next !== checked) change(next);
    settle();
  }

  button.addEventListener('click', event => {
    if (skipClick && event.detail !== 0) {
      skipClick = false;
      return;
    }
    commit(!checked);
  });
  button.addEventListener('pointerdown', event => {
    if (button.disabled || drag || event.button !== 0) return;
    const rect = track.getBoundingClientRect();
    travel = Math.max(1, rect.width - rect.height || travel);
    stop();
    drag = {
      id: event.pointerId, x: event.clientX, position, lastTime: event.timeStamp,
      moved: false, slop: event.pointerType === 'touch' ? 8 : 4
    };
    button.dataset.held = '';
    try { button.setPointerCapture(event.pointerId); } catch { /* Capture can be unavailable. */ }
  });
  button.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) <= drag.slop) return;
    drag.moved = true;
    const next = Math.max(0, Math.min(1, drag.position + distance / travel));
    const speed = (next - position) * 1000 / Math.max(8, event.timeStamp - drag.lastTime);
    position = next;
    drag.lastTime = event.timeStamp;
    paint(speed);
  });

  function release(id, cancelled) {
    if (!drag || drag.id !== id) return;
    const {moved} = drag;
    drag = null;
    delete button.dataset.held;
    try { button.releasePointerCapture(id); } catch { /* The browser may have released it already. */ }
    if (moved || cancelled) {
      skipClick = true;
      win.clearTimeout(timer);
      timer = win.setTimeout(() => { skipClick = false; }, 0);
    }
    if (!cancelled && moved) commit(position > .5);
    else settle();
  }

  button.addEventListener('pointerup', event => release(event.pointerId, false));
  button.addEventListener('pointercancel', event => release(event.pointerId, true));
  button.addEventListener('lostpointercapture', event => release(event.pointerId, true));
  button.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drag) {
      event.preventDefault();
      event.stopPropagation();
      release(drag.id, true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      commit(event.key === 'ArrowRight');
    }
  });

  function motionChanged() {
    if (drag) paint();
    else settle(false);
  }
  media?.addEventListener?.('change', motionChanged);
  return {button, present, destroy() {
    stop();
    win.clearTimeout(timer);
    media?.removeEventListener?.('change', motionChanged);
    button.remove();
  }};
}

const events = ['gary:language', 'gary:visual-preferences', 'jobs:public-render', 'jobs:switch-render'];

export function mountSquishSwitches(doc = document) {
  if (mounted.has(doc)) return mounted.get(doc);
  const entries = new Map();

  function refresh() {
    const holders = [...doc.querySelectorAll('[data-squish-key]')];
    const keys = new Set(holders.map(holder => holder.dataset.squishKey));
    for (const [key, entry] of entries) {
      if (!keys.has(key)) { entry.control.destroy(); entries.delete(key); }
    }
    for (const holder of holders) {
      const {squishKey: key, squishMode: mode} = holder.dataset;
      const on = holder.querySelector('[data-squish-target="on"]');
      const off = holder.querySelector('[data-squish-target="off"]');
      const toggle = holder.querySelector('[data-squish-target="toggle"]');
      if ((!on || !off) && !toggle) continue;
      let entry = entries.get(key);
      if (!entry) {
        entry = {};
        entry.control = makeSwitch(doc, next => {
          (entry.toggle || (next ? entry.on : entry.off))?.click();
          refresh();
        });
        entries.set(key, entry);
      }
      Object.assign(entry, {on, off, toggle});
      const {button, present} = entry.control;
      if (button.parentElement !== holder) {
        for (const child of holder.children) child.hidden = true;
        if (key === 'jobs-public-language') button.dataset.preferenceFocus = 'language-switch';
        holder.append(button);
        holder.dataset.squishReady = '';
      }
      const vi = doc.documentElement.lang === 'vi';
      const effects = mode === 'effects';
      const effectsEnabled = doc.defaultView.garyVisaPreferences?.effects ?? (on?.getAttribute('aria-pressed') === 'true');
      const checked = effects ? effectsEnabled : vi;
      button.disabled = toggle?.disabled ?? Boolean(checked ? off?.disabled : on?.disabled);
      present(checked, effects ? {
        labels: vi ? ['Tắt', 'Bật'] : ['Off', 'On'],
        label: vi ? 'Hiệu ứng' : 'Visual effects',
        title: vi ? (checked ? 'Tắt hiệu ứng' : 'Bật hiệu ứng') : (checked ? 'Turn effects off' : 'Turn effects on')
      } : {
        labels: ['EN', 'VI'],
        label: vi ? 'Dùng tiếng Việt' : 'Use Vietnamese',
        title: vi ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'
      });
    }
  }

  const observer = new doc.defaultView.MutationObserver(refresh);
  observer.observe(doc.documentElement, {attributes: true, attributeFilter: ['lang']});
  for (const event of events) doc.addEventListener(event, refresh);
  const controller = {refresh, destroy() {
    observer.disconnect();
    for (const event of events) doc.removeEventListener(event, refresh);
    for (const {control} of entries.values()) {
      const holder = control.button.parentElement;
      control.destroy();
      if (holder) {
        delete holder.dataset.squishReady;
        for (const child of holder.children) child.hidden = false;
      }
    }
    entries.clear();
    mounted.delete(doc);
  }};
  mounted.set(doc, controller);
  refresh();
  return controller;
}

if (typeof document !== 'undefined') mountSquishSwitches(document);
