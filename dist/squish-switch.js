// Adapted from the React Bits Squish Switch. See licenses/react-bits-LICENSE.md.
// Theme uses the same spring, velocity squish, hover scale, press and release.
const mounted = new WeakMap();
const THEME_VALUES = ['light', 'dark', 'system'];
let choiceSequence = 0;

function makeSwitch(doc, change, button, options = {}) {
  const choice = options.choice === true;
  const count = choice ? 3 : 2;
  const win = doc.defaultView;
  if (!button) button = doc.createElement(choice ? 'div' : 'button');
  if (choice) {
    button.className = 'squish-switch squish-choice';
    button.setAttribute('role', 'radiogroup');
    button.setAttribute('aria-orientation', 'horizontal');
    button.tabIndex = 0;
    button.style.setProperty('--ss-stops', '3');
    if (!button.dataset.squishId) button.dataset.squishId = `squish-theme-${++choiceSequence}`;
  } else {
    button.type = 'button';
    button.className = 'squish-switch';
    button.setAttribute('role', 'switch');
  }
  if (!button.querySelector('.squish-switch__track')) {
    const marks = Array.from({length: count}, () => '<span></span>').join('');
    const hidden = choice ? '' : ' aria-hidden="true"';
    button.innerHTML = `<span class="squish-switch__track"${hidden}><span class="squish-switch__options">${marks}</span><span class="squish-switch__thumb" aria-hidden="true"><span></span></span></span>${choice ? '<span class="squish-switch__status" aria-live="polite"></span>' : ''}`;
  }
  const track = button.querySelector('.squish-switch__track');
  const states = [...button.querySelectorAll('.squish-switch__options span')];
  const thumbLabel = button.querySelector('.squish-switch__thumb span');
  const media = win.matchMedia?.('(prefers-reduced-motion: reduce)');
  let checked, index, marks = [], position = 0, velocity = 0, frame = 0, previous = 0, drag = null, skipClick = false;
  let travel = choice ? 130 : 38, timer = 0;

  function goal() {
    if (!choice) return checked ? 1 : 0;
    return index / (count - 1);
  }

  function updateThumbLabel() {
    const slot = choice ? Math.max(0, Math.min(count - 1, Math.round(position * (count - 1)))) : (position > .5 ? 1 : 0);
    const text = marks[slot] || states[slot]?.textContent || '';
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
    const next = goal();
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
    const next = goal();
    if (!animate || media?.matches || position === next || typeof win.requestAnimationFrame !== 'function') {
      position = next;
      paint();
    } else frame = win.requestAnimationFrame(spring);
  }

  function present(next, info) {
    const initial = choice ? index === undefined : checked === undefined;
    const current = choice ? index : checked;
    const moved = next !== current;
    if (choice) index = next;
    else checked = next;
    const previousResolved = button.dataset.resolved || '';
    const previousChoice = button.dataset.choice || '';
    if (!choice) button.setAttribute('aria-checked', String(checked));
    button.setAttribute('aria-label', info.label);
    button.title = info.title || '';
    marks = info.marks || [];
    states.forEach((node, slot) => {
      node.textContent = info.labels[slot] || '';
      if (!choice) return;
      node.setAttribute('role', 'radio');
      node.tabIndex = -1;
      node.setAttribute('aria-checked', String(slot === index));
      if (!node.id) node.id = `${button.dataset.squishId}-option-${slot}`;
    });
    if (choice) {
      button.setAttribute('aria-activedescendant', states[index].id);
      button.dataset.choice = info.value;
      button.dataset.resolved = info.resolved;
      const status = button.querySelector('.squish-switch__status');
      if (status && previousResolved && previousChoice === info.value && previousResolved !== info.resolved) status.textContent = info.label;
    }
    updateThumbLabel();
    if (moved) settle(!initial);
  }

  function commit(next) {
    if (button.disabled) return;
    const current = choice ? index : checked;
    if (next !== current) change(next);
    settle();
  }

  function stopAt(clientX) {
    const rect = track.getBoundingClientRect();
    const width = rect.width || Number.parseFloat(win.getComputedStyle(button).getPropertyValue('--ss-width')) || (choice ? 248 : 76);
    if (choice) {
      const inset = Number.parseFloat(win.getComputedStyle(button).getPropertyValue('--ss-inset')) || 4;
      const inner = Math.max(1, width - inset * 2);
      const local = Math.max(0, Math.min(inner - 0.001, clientX - rect.left - inset));
      return Math.min(count - 1, Math.floor(local / (inner / count)));
    }
    const height = rect.height || 38;
    const span = Math.max(1, width - height);
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left - height / 2) / span));
    return Math.round(ratio * (count - 1));
  }

  button.addEventListener('click', event => {
    if (skipClick && event.detail !== 0) {
      skipClick = false;
      return;
    }
    if (!choice) commit(!checked);
    else if (event.detail !== 0) commit(stopAt(event.clientX));
  });
  button.addEventListener('pointerdown', event => {
    if (button.disabled || drag || event.button !== 0) return;
    const rect = track.getBoundingClientRect();
    if (choice && rect.width) {
      const inset = Number.parseFloat(win.getComputedStyle(button).getPropertyValue('--ss-inset')) || 4;
      travel = Math.max(1, (rect.width - inset * 2) * (count - 1) / count);
    } else travel = Math.max(1, rect.width - rect.height || travel);
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
    if (!cancelled && moved) commit(choice ? Math.round(position * (count - 1)) : position > .5);
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
      return;
    }
    if (choice) {
      const last = count - 1;
      let next = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = Math.min(last, index + 1);
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = Math.max(0, index - 1);
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;
      else if (event.key === ' ' || event.key === 'Enter') event.preventDefault();
      if (next === null) return;
      event.preventDefault();
      event.stopPropagation();
      commit(next);
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
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

function languagePresentation(vi) {
  return {
    labels: ['EN', 'VI'],
    label: vi ? 'Dùng tiếng Việt' : 'Use Vietnamese',
    title: vi ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese'
  };
}

function themePresentation(doc) {
  const root = doc.documentElement;
  const win = doc.defaultView;
  const preference = THEME_VALUES.includes(win.garyVisaPreferences?.theme) ? win.garyVisaPreferences.theme
    : THEME_VALUES.includes(win.garyJobsTheme?.preference) ? win.garyJobsTheme.preference : 'system';
  const resolved = root.dataset.visaTheme || root.dataset.jobsTheme || (preference === 'system' ? 'light' : preference);
  const vi = root.lang === 'vi';
  const words = vi
    ? {light: 'Sáng', dark: 'Tối', system: 'Hệ thống', name: 'Giao diện', now: 'đang'}
    : {light: 'Light', dark: 'Dark', system: 'System', name: 'Appearance', now: 'currently'};
  const mark = vi ? {light: 'S', dark: 'T', system: 'H'} : {light: 'L', dark: 'D', system: 'S'};
  const selected = words[preference];
  const active = String(words[resolved] || resolved).toLocaleLowerCase(vi ? 'vi' : 'en');
  const label = preference === 'system' ? `${words.name}, ${selected}, ${words.now} ${active}` : `${words.name}, ${selected}`;
  return {
    index: THEME_VALUES.indexOf(preference),
    value: preference,
    resolved: resolved === 'dark' ? 'dark' : 'light',
    labels: THEME_VALUES.map(value => words[value]),
    marks: THEME_VALUES.map(value => mark[value]),
    label,
    title: label
  };
}

export function mountLanguageSwitch(button, language, onChange) {
  const control = makeSwitch(button.ownerDocument, on => onChange(on ? 'vi' : 'en'), button);
  function update(locale) {
    const vi = locale === 'vi';
    control.present(vi, languagePresentation(vi));
  }
  update(language);
  button.disabled = false;
  return update;
}

const events = ['gary:language', 'gary:visual-preferences', 'gary-jobs:theme', 'jobs:public-render', 'jobs:switch-render'];

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
      const theme = mode === 'theme';
      const on = holder.querySelector('[data-squish-target="on"]');
      const off = holder.querySelector('[data-squish-target="off"]');
      const toggle = holder.querySelector('[data-squish-target="toggle"]');
      if (!theme && (!on || !off) && !toggle) continue;
      let entry = entries.get(key);
      if (!entry) {
        entry = {theme};
        entry.control = makeSwitch(doc, next => {
          if (entry.theme) {
            const value = THEME_VALUES[next];
            if (entry.select) {
              if (entry.select.value !== value) {
                entry.select.value = value;
                entry.select.dispatchEvent(new doc.defaultView.Event('change', {bubbles: true}));
              }
            } else entry.buttons?.find(button => (button.dataset.themeChoice || button.dataset.jobsThemeChoice) === value)?.click();
          } else (entry.toggle || (next ? entry.on : entry.off))?.click();
          refresh();
        }, theme ? holder.querySelector(':scope > .squish-choice') : undefined, {choice: theme});
        entries.set(key, entry);
      }
      const {button, present} = entry.control;
      if (theme) {
        entry.select = holder.querySelector('select');
        entry.buttons = [...holder.querySelectorAll('[data-theme-choice],[data-jobs-theme-choice]')];
      } else Object.assign(entry, {on, off, toggle});
      for (const child of holder.children) if (child !== button) child.hidden = true;
      if (button.parentElement !== holder) {
        if (key === 'jobs-public-language') button.dataset.preferenceFocus = 'language-switch';
        holder.append(button);
      }
      holder.dataset.squishReady = '';
      if (theme) {
        const presentation = themePresentation(doc);
        present(presentation.index, presentation);
        continue;
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
      } : languagePresentation(vi));
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
