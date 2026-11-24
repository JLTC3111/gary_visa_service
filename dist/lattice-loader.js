// Same Lattice timing and markup as Gary Home's React Bits loader.
const PATTERNS = {
  dots: { 3: { cells: [0, 1, 2, 0, 1, 2, 0, 1, 2], loop: 3, scale: 2.4 } },
  ripple: {
    3: { cells: [2, 1, 2, 1, 0, 1, 2, 1, 2], loop: 4.8, scale: 1.5 },
    4: { cells: [2, 1, 1, 2, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 1, 2], loop: 4.8, scale: 1.5 }
  },
  orbit: {
    3: { cells: [0, 1, 2, 7, null, 3, 6, 5, 4], loop: 8, scale: 1.2 },
    4: { cells: [0, 1, 2, 3, 11, null, null, 4, 10, null, null, 5, 9, 8, 7, 6], loop: 6, scale: 1.2, lit: 0.45 }
  },
  sweep: { 4: { cells: [0, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6], loop: 5, scale: 1, lit: 0.45 } }
};
const DEFAULT_PATTERN = { 3: 'orbit', 4: 'sweep' };
const MARKS = {
  3: { done: [2, 3, 5, 7], error: [0, 2, 4, 6, 8] },
  4: { done: [7, 8, 10, 13], error: [0, 3, 5, 6, 9, 10, 12, 15] }
};
export const LATTICE_REVEAL_MS = 200;
const active = new WeakMap();

function resolvePattern(pattern, grid) {
  const named = PATTERNS[pattern];
  return (named && named[grid]) || PATTERNS[DEFAULT_PATTERN[grid]][grid];
}

function createLattice(doc, { pattern, grid, label, cellSize, gap, fontSize }) {
  const n = grid === 4 ? 4 : 3;
  const pat = resolvePattern(pattern, n);
  const delay = 90 * pat.scale;
  const host = doc.createElement('span');
  host.className = 'lattice-loader';
  host.dataset.status = 'working';
  host.dataset.shape = 'round';
  host.dataset.pattern = pattern;
  host.dataset.grid = String(n);
  host.style.setProperty('--ll-n', String(n));
  host.style.setProperty('--ll-cell', `${cellSize}px`);
  host.style.setProperty('--ll-gap', `${gap}px`);
  host.style.setProperty('--ll-font', `${fontSize}px`);
  host.style.setProperty('--ll-idle', '0.15');
  host.style.setProperty('--ll-cycle', `${Math.round(pat.loop * delay)}ms`);
  const gridNode = doc.createElement('span');
  gridNode.className = 'lattice-loader__grid';
  gridNode.setAttribute('aria-hidden', 'true');
  for (const layer of ['run', 'mark']) {
    const row = doc.createElement('span');
    row.className = `lattice-loader__layer lattice-loader__${layer}`;
    pat.cells.forEach((unit, index) => {
      const cell = doc.createElement('span');
      cell.className = 'lattice-loader__cell';
      if (layer === 'run') {
        if (unit == null) cell.dataset.hole = '';
        else cell.style.animationDelay = `${Math.round(unit * delay)}ms`;
        if (pat.lit && pat.lit !== 0.62) cell.dataset.lit = String(Math.round(pat.lit * 100));
      } else if (MARKS[n].done.includes(index)) cell.dataset.on = '';
      row.append(cell);
    });
    gridNode.append(row);
  }
  host.append(gridNode);
  if (label) {
    const text = doc.createElement('span');
    text.className = 'lattice-loader__label';
    text.textContent = label;
    host.append(text);
  }
  return host;
}

export function showDelayedLattice(slot, {
  pattern = 'orbit', grid = 3, label = '', cellSize = 5, gap = 2, fontSize = 12, status = false
} = {}) {
  if (!slot?.isConnected) return () => {};
  active.get(slot)?.();
  const doc = slot.ownerDocument;
  slot.replaceChildren();
  if (status) {
    slot.setAttribute('role', 'status');
    slot.setAttribute('aria-busy', 'true');
  }
  if (label) {
    const note = doc.createElement('span');
    note.className = 'lattice-loader__sr';
    note.textContent = label;
    slot.append(note);
  }
  let timer = setTimeout(() => {
    timer = 0;
    if (!slot.isConnected) return;
    slot.replaceChildren(createLattice(doc, { pattern, grid, label, cellSize, gap, fontSize }));
  }, LATTICE_REVEAL_MS);
  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = 0;
    if (slot.isConnected) slot.replaceChildren();
    if (status && slot.isConnected) slot.removeAttribute('aria-busy');
    if (active.get(slot) === cancel) active.delete(slot);
  };
  active.set(slot, cancel);
  return cancel;
}

let navigationCancel = () => {};
export function bindDocumentNavigation(doc) {
  if (!doc?.body || doc.documentElement.dataset.latticeNav === 'on') return;
  doc.documentElement.dataset.latticeNav = 'on';
  const view = doc.defaultView;
  const navigates = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    const link = event.target?.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || link.target === '_blank') return false;
    let url;
    try { url = new URL(link.href, view.location.href); } catch { return false; }
    if (url.origin !== view.location.origin) return false;
    return url.pathname !== view.location.pathname || url.search !== view.location.search;
  };
  doc.addEventListener('click', event => {
    const link = event.target?.closest?.('a[href]');
    if (!link) return;
    setTimeout(() => {
      if (!navigates(event)) return;
      navigationCancel();
      let host = doc.getElementById('lattice-navigation');
      if (!host) {
        host = doc.createElement('div');
        host.id = 'lattice-navigation';
        host.className = 'lattice-navigation';
        host.setAttribute('role', 'status');
        doc.body.append(host);
      }
      const slot = doc.createElement('div');
      slot.className = 'lattice-slot';
      host.replaceChildren(slot);
      host.hidden = false;
      const label = doc.documentElement.lang === 'vi' ? 'Đang mở trang…' : 'Opening page…';
      const cancel = showDelayedLattice(slot, { pattern: 'orbit', grid: 3, label, cellSize: 8, gap: 3, fontSize: 14 });
      navigationCancel = () => { cancel(); host.hidden = true; host.replaceChildren(); navigationCancel = () => {}; };
    }, 0);
  });
  view.addEventListener('pagehide', () => navigationCancel());
}

const api = { showDelayedLattice, bindDocumentNavigation, LATTICE_REVEAL_MS };
globalThis.garyLattice = api;
if (typeof document !== 'undefined') {
  const start = () => bindDocumentNavigation(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}
