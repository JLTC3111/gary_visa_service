// BranchedMenu geometry and timing adapted from React Bits by David Haz and Gary Home's sidebar.
// https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Micro/BranchedMenu
const SVG = 'http://www.w3.org/2000/svg';
export const branchedIconHref = name => './assets/staff-nav-icons.svg#'+name;

function attribute(node, name, value) {
  if (node.getAttribute(name) !== value) node.setAttribute(name, value);
}

export function mountBranchedMenu(nav) {
  const doc = nav.ownerDocument, win = doc.defaultView;
  const svgNode = name => doc.createElementNS(SVG, name);
  const groups = new Map();
  const marker = doc.createElement('span');
  marker.className = 'branched-menu__marker';
  marker.setAttribute('aria-hidden', 'true');
  let selection, currentGroup, compact = false;
  const observer = win.ResizeObserver ? new win.ResizeObserver(measure) : null;
  observer?.observe(nav);

  function renderIcon(button) {
    const name = button.dataset.branchedIcon;
    const previous = button.firstElementChild;
    if (!name || previous?.getAttribute('data-lucide') === name) return;
    const icon = svgNode('svg'), use = svgNode('use');
    icon.setAttribute('class', 'branched-menu__icon lucide lucide-'+name);
    icon.setAttribute('data-lucide', name);
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    use.setAttribute('href', branchedIconHref(name));
    icon.append(use);
    if (previous?.matches('svg.branched-menu__icon')) previous.replaceWith(icon);
    else button.prepend(icon);
  }

  function add(section) {
    const head = section.querySelector('.branched-menu__head');
    const body = section.querySelector('.branched-menu__body');
    const tree = section.querySelector('.branched-menu__tree');
    const svg = svgNode('svg'), trunk = svgNode('path'), base = svgNode('g'), reaches = svgNode('g');
    svg.setAttribute('class', 'branched-menu__lines');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    trunk.setAttribute('class', 'branched-menu__base');
    base.append(trunk);
    svg.append(base, reaches);
    tree.prepend(svg);
    observer?.observe(section);
    observer?.observe(tree);
    const group = {section, head, body, tree, svg, trunk, base, reaches, paths: new Map(), rows: []};
    groups.set(section, group);
    return group;
  }

  function remove(group) {
    observer?.unobserve(group.section);
    observer?.unobserve(group.tree);
    group.svg.remove();
    groups.delete(group.section);
  }

  function syncPaths(group) {
    const rows = group.rows;
    for (const [button, paths] of group.paths) {
      if (rows.includes(button)) continue;
      paths.base.remove();
      paths.reach.remove();
      group.paths.delete(button);
    }
    for (const button of rows) {
      if (!group.paths.has(button)) {
        const base = svgNode('path'), reach = svgNode('path');
        base.setAttribute('class', 'branched-menu__base');
        reach.setAttribute('class', 'branched-menu__reach');
        reach.setAttribute('pathLength', '1');
        reach.setAttribute('stroke-dasharray', '1');
        group.base.append(base);
        group.reaches.append(reach);
        group.paths.set(button, {base, reach});
      }
      attribute(group.paths.get(button).reach, 'stroke-dashoffset', button === selection ? '0' : '1');
    }
  }

  function measure() {
    const bounds = nav.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    if (!compact) {
      const style = win.getComputedStyle(nav);
      const indent = Math.max(0, parseFloat(style.getPropertyValue('--branched-indent')) || 28);
      const trunk = Math.max(0, Math.min(indent, parseFloat(style.getPropertyValue('--branched-trunk')) || 10));
      const radius = Math.max(0, Math.min(indent - trunk, parseFloat(style.getPropertyValue('--branched-elbow')) || 8));
      for (const group of groups.values()) {
        if (!group.rows.length) continue;
        const box = group.tree.getBoundingClientRect();
        if (!box.height) continue;
        attribute(group.svg, 'width', String(indent));
        attribute(group.svg, 'height', String(box.height));
        let trunkEnd = 0;
        for (const button of group.rows) {
          const row = button.getBoundingClientRect();
          const y = row.top - box.top + row.height / 2;
          const bend = Math.min(radius, Math.max(0, y));
          trunkEnd = y - bend;
          const elbow = bend ? ' A '+bend+' '+bend+' 0 0 0 '+(trunk+bend)+' '+y : '';
          const branch = elbow+' H '+indent;
          const {base, reach} = group.paths.get(button);
          attribute(base, 'd', 'M '+trunk+' '+trunkEnd+branch);
          attribute(reach, 'd', 'M '+trunk+' 0 V '+trunkEnd+branch);
        }
        attribute(group.trunk, 'd', 'M '+trunk+' 0 V '+trunkEnd);
      }
    }
    const target = compact ? selection : currentGroup?.head;
    const box = target?.getBoundingClientRect();
    marker.toggleAttribute('data-visible', Boolean(box?.height));
    if (!box?.height) return;
    const y = box.top - bounds.top - nav.clientTop + nav.scrollTop + box.height / 2;
    marker.style.setProperty('--branched-marker-y', y+'px');
  }

  function refresh({rail=false, revealActive=false, expanded=()=>true, reveal=()=>{}} = {}) {
    const sections = [...nav.children].filter(section => section.classList.contains('branched-menu__section'));
    nav.classList.toggle('branched-menu', Boolean(sections.length));
    if (!sections.length) marker.remove();
    else if (marker.parentElement !== nav) nav.prepend(marker);
    for (const [section, group] of groups) if (!sections.includes(section)) remove(group);
    let next, parent;
    for (const section of sections) {
      const group = groups.get(section) || add(section);
      group.rows = [...group.tree.children].filter(button => button.matches('button:not([hidden])'));
      const current = group.rows.find(button => button.getAttribute('aria-current') === 'page');
      if (current) { next = current; parent = group; }
    }
    if (next && (next !== selection || revealActive)) reveal(parent.section);
    selection = next;
    currentGroup = parent;
    compact = rail;
    nav.toggleAttribute('data-branched-rail', rail);
    for (const group of groups.values()) {
      const open = rail || expanded(group.section);
      group.section.hidden = !group.rows.length;
      if (!open && group.tree.contains(doc.activeElement)) group.head.focus({preventScroll: true});
      attribute(group.section, 'data-open', String(open));
      attribute(group.section, 'data-active', String(group === currentGroup));
      attribute(group.head, 'aria-expanded', String(open));
      attribute(group.body, 'aria-hidden', String(!open));
      group.body.inert = !open;
      group.body.toggleAttribute('inert', !open);
      renderIcon(group.head);
      for (const button of group.rows) {
        renderIcon(button);
        if (open) button.removeAttribute('tabindex');
        else attribute(button, 'tabindex', '-1');
      }
      syncPaths(group);
    }
    if (!selection) marker.removeAttribute('data-visible');
    measure();
  }

  function keyboard(event) {
    if (event.defaultPrevented || nav.inert || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target.closest('button');
    if (target?.matches('.branched-menu__head') &&
        ((event.key === 'ArrowRight' && target.getAttribute('aria-expanded') === 'false') ||
         (event.key === 'ArrowLeft' && target.getAttribute('aria-expanded') === 'true'))) {
      event.preventDefault();
      target.click();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const buttons = [...nav.querySelectorAll('button:not([disabled]):not([hidden])')].filter(button =>
      !button.closest('[hidden], [inert]') && (!compact || !button.matches('.branched-menu__head'))
    );
    const index = buttons.indexOf(target);
    if (!buttons.length || (index < 0 && event.target !== nav)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length-1 :
      index < 0 ? (event.key === 'ArrowDown' ? 0 : buttons.length-1) :
      (index+(event.key === 'ArrowDown' ? 1 : -1)+buttons.length)%buttons.length;
    buttons[next].focus();
  }

  nav.addEventListener('keydown', keyboard);
  nav.addEventListener('transitionend', measure);
  return {refresh, destroy() {
    observer?.disconnect();
    for (const group of groups.values()) remove(group);
    marker.remove();
    nav.classList.remove('branched-menu');
    nav.removeAttribute('data-branched-rail');
    nav.removeEventListener('keydown', keyboard);
    nav.removeEventListener('transitionend', measure);
  }};
}
