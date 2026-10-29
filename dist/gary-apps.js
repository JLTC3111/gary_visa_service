const currentApp = 'visa';
const apps = [
  { id: 'home', name: 'Gary Home', url: 'https://garyhome.vn/', host: 'garyhome.vn', icon: 'house', short: 'homeShort' },
  { id: 'jobs', name: 'Gary Jobs', url: 'https://jobs.garyhome.vn/', host: 'jobs.garyhome.vn', icon: 'briefcase', short: 'jobsShort' },
  { id: 'visa', name: 'Gary Visa Service', url: 'https://visa.garyhome.vn/', host: 'visa.garyhome.vn', icon: 'plane', short: 'visaShort' }
];
const copy = {
  explore: ['Explore Gary apps and services', 'Khám phá các trang và dịch vụ Gary'],
  label: ['Our Platforms', 'Các dịch vụ khác'],
  nav: ['Gary websites and services', 'Các trang và dịch vụ Gary'],
  heading: ['Three sites. Here for your next step.', 'Ba trang. Đồng hành cùng bước tiếp theo.'],
  intro: ['Find the right place to start.', 'Tìm nơi bắt đầu phù hợp với bạn.'],
  thisSite: ['This site', 'Trang hiện tại'],
  homeShort: ['Apartments, rentals & viewings in Hanoi', 'Căn hộ, nhà cho thuê & lịch xem tại Hà Nội'],
  jobsShort: ['Teaching jobs, recruitment & life in Vietnam', 'Việc làm giảng dạy, tuyển dụng & cuộc sống Việt Nam'],
  visaShort: ['Visas, work permits & document support', 'Visa, giấy phép lao động & hỗ trợ hồ sơ'],
  travel: ['Travel & life in Vietnam', 'Du lịch & cuộc sống tại Việt Nam'],
  all: ['See all services', 'Xem tất cả dịch vụ'],
  newTab: [' (opens in a new tab)', ' (mở trong thẻ mới)']
};
const glyphs = {
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  briefcase: '<path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  plane: '<path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>',
  upRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'
};
const svgNamespace = 'http://www.w3.org/2000/svg';
let serial = 0;

function icon(name, size, className) {
  const svg = document.createElementNS(svgNamespace, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('aria-hidden', 'true');
  if (className) svg.setAttribute('class', className);
  svg.innerHTML = glyphs[name];
  return svg;
}

function text(key, tag = 'span') {
  const node = document.createElement(tag);
  node.dataset.gary = key;
  node.textContent = copy[key][0];
  return node;
}

function appHref(appId, path = '/') {
  const app = apps.find(item => item.id === appId);
  const target = new URL(path, app.url);
  if (target.origin !== new URL(app.url).origin) return app.url;
  if (appId !== currentApp) return target.href;
  return `./index.html${target.search}${target.hash}`;
}

function appLink(appId, path = '/') {
  const anchor = document.createElement('a');
  anchor.href = appHref(appId, path);
  if (appId !== currentApp) {
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    const note = text('newTab');
    note.className = 'gary-apps-sr';
    anchor.append(note);
  }
  return anchor;
}

function render(variant) {
  const menu = document.createElement('details');
  menu.className = variant === 'header' ? 'gary-apps-menu gary-apps-menu--header' : 'gary-apps-menu';
  const summary = document.createElement('summary');
  summary.dataset.garyAria = 'explore';
  summary.setAttribute('aria-label', copy.explore[0]);
  summary.append(icon('grid', 17), text('label'), icon('chevron', 12, 'gary-apps-chevron'));
  const panel = document.createElement('nav');
  panel.className = 'gary-apps-menu-panel';
  panel.id = `gary-apps-panel-${++serial}`;
  summary.setAttribute('aria-controls', panel.id);
  panel.dataset.garyAria = 'nav';
  panel.setAttribute('aria-label', copy.nav[0]);
  const heading = document.createElement('div');
  heading.className = 'gary-apps-menu-heading';
  heading.append(text('heading', 'strong'), text('intro', 'p'));
  const list = document.createElement('ul');
  for (const app of apps) {
    const item = document.createElement('li');
    const anchor = appLink(app.id);
    anchor.classList.add('gary-app-menu-item', `gary-app-${app.id}`);
    const mark = document.createElement('span');
    mark.className = 'gary-app-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.append(icon(app.icon, 22));
    const body = document.createElement('span');
    const name = document.createElement('strong');
    name.append(document.createTextNode(app.name));
    if (app.id === currentApp) name.append(text('thisSite', 'small'));
    const host = document.createElement('small');
    host.className = 'gary-app-menu-host';
    host.textContent = app.host;
    body.append(name, text(app.short), host);
    const arrow = icon('upRight', 17);
    const note = anchor.querySelector('.gary-apps-sr');
    anchor.append(mark, body, arrow);
    if (note) anchor.append(note);
    item.append(anchor);
    list.append(item);
  }
  const travel = document.createElement('div');
  travel.className = 'gary-apps-menu-travel';
  travel.append(icon('compass', 17));
  const travelLink = appLink('jobs', '/#life');
  const travelNote = travelLink.querySelector('.gary-apps-sr');
  travelLink.append(text('travel'), icon('upRight', 14));
  if (travelNote) travelLink.append(travelNote);
  travel.append(travelLink);
  const all = appLink('home', '/services#gary-services');
  all.className = 'gary-apps-menu-all';
  const allNote = all.querySelector('.gary-apps-sr');
  all.append(text('all'), icon('right', 16));
  if (allNote) all.append(allNote);
  panel.append(heading, list, travel, all);
  menu.append(summary, panel);
  return menu;
}

function bind(menu) {
  const summary = menu.querySelector('summary');
  const setOpen = next => {
    if (next) {
      for (const other of document.querySelectorAll('.gary-apps-menu[open]')) {
        if (other !== menu) {
          other.open = false;
          other.querySelector('summary').setAttribute('aria-expanded', 'false');
        }
      }
    }
    menu.open = next;
    summary.setAttribute('aria-expanded', String(menu.open));
  };
  setOpen(false);
  summary.addEventListener('click', event => {
    event.preventDefault();
    const next = !menu.open;
    queueMicrotask(() => setOpen(next));
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!menu.open) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      summary.focus();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const links = [...menu.querySelectorAll('a[href]')];
    const index = links.indexOf(event.target);
    if (event.target === summary && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      if (!menu.open) setOpen(true);
      queueMicrotask(() => links[event.key === 'ArrowDown' ? 0 : links.length - 1]?.focus());
      return;
    }
    if (!menu.open || index < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
    links[next]?.focus();
  });
  menu.addEventListener('focusout', event => {
    if (!menu.contains(event.relatedTarget)) setOpen(false);
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('pointerdown', event => {
    if (menu.open && !menu.contains(event.target)) setOpen(false);
  });
}

function applyCopy() {
  const index = document.documentElement.lang === 'vi' ? 1 : 0;
  for (const node of document.querySelectorAll('[data-gary]')) {
    const value = copy[node.dataset.gary];
    if (value) node.textContent = value[index];
  }
  for (const node of document.querySelectorAll('[data-gary-aria]')) {
    const value = copy[node.dataset.garyAria];
    if (value) node.setAttribute('aria-label', value[index]);
  }
}

for (const slot of [...document.querySelectorAll('[data-gary-apps]')]) {
  const menu = render(slot.getAttribute('data-gary-apps'));
  if (slot.classList.contains('mobile-app-services')) slot.append(menu);
  else slot.replaceWith(menu);
  bind(menu);
}
applyCopy();
document.addEventListener('gary:language', applyCopy);
