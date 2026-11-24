import {renderAvatar} from './profile-avatar.js';

const copy = {
  en: {
    signin: 'Sign in', account: 'My account', staff: 'Staff account', destinations: 'Account destinations',
    customerLogin: 'Customer Login', staffLogin: 'Staff Login', customerDashboard: 'Customer Dashboard',
    staffDashboard: 'Staff Dashboard', profile: 'My Profile', staffProfile: 'My Staff Profile',
    restoring: 'Checking session…', checking: 'Checking portal access…', unavailable: 'Portal access couldn’t be verified.', retry: 'Try again',
    signout: 'Sign Out', signingOut: 'Signing out…', signoutFailed: 'Couldn’t sign out. Try again.'
  },
  vi: {
    signin: 'Đăng nhập', account: 'Tài khoản của tôi', staff: 'Tài khoản nhân viên', destinations: 'Điều hướng tài khoản',
    customerLogin: 'Đăng nhập khách hàng', staffLogin: 'Đăng nhập nhân viên', customerDashboard: 'Bảng điều khiển khách hàng',
    staffDashboard: 'Bảng điều khiển nhân viên', profile: 'Hồ sơ của tôi', staffProfile: 'Hồ sơ nhân viên của tôi',
    restoring: 'Đang kiểm tra phiên…', checking: 'Đang kiểm tra quyền truy cập cổng…', unavailable: 'Chưa thể xác minh quyền truy cập cổng.', retry: 'Thử lại',
    signout: 'Đăng xuất', signingOut: 'Đang đăng xuất…', signoutFailed: 'Chưa thể đăng xuất. Vui lòng thử lại.'
  }
};

const person = '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2"/>';
const dashboard = '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>';
const icons = {
  customerLogin: person, profile: person, staffProfile: person, customerDashboard: dashboard, staffDashboard: dashboard,
  staffLogin: '<path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6Z"/><path d="m8 12 3 3 5-6"/>'
};
const icon = shape => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${shape}</svg>`;

export function accountRoleLabel(t, scope, role) {
  const label = t(role ? `role_${scope}_${role}` : 'noAccess');
  if (role === 'admin') return label;
  return `${t(scope === 'operations' ? 'operationsAccess' : 'cmsAccess')} · ${label}`;
}

export function mountAccountMenu(root, {staff = false, destinations, onOpen, onRetry, onSignOut}) {
  const doc = root.ownerDocument;
  root.insertAdjacentHTML('beforeend', `
    <button class="visa-account-trigger" type="button" aria-expanded="false" aria-controls="${root.id}-panel">
      <span class="visa-account-avatar" aria-hidden="true"></span><span class="visa-account-label"></span>
      ${icon(staff ? '<path d="m9 6 6 6-6 6"/>' : '<path d="m6 9 6 6 6-6"/>')}
    </button>
    <div class="visa-account-panel" id="${root.id}-panel" hidden inert>
      <div class="visa-account-identity" hidden>
        <span class="visa-account-avatar" aria-hidden="true"></span>
        <div><strong></strong><small></small><div class="visa-account-badges"></div></div>
      </div>
      <nav class="visa-account-destinations"></nav>
      <p class="visa-account-status" role="status" hidden></p>
      <button class="visa-account-retry" type="button" hidden></button>
      <div class="visa-account-footer" hidden>
        <button class="visa-account-signout" type="button">
          ${icon('<path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5m5-13 5 5-5 5m-7-5h12"/>')}<span></span>
        </button>
        <p class="visa-account-status" role="alert" hidden></p>
      </div>
    </div>`);
  const find = selector => root.querySelector(selector);
  const trigger = find('.visa-account-trigger'), panel = find('.visa-account-panel');
  const identity = find('.visa-account-identity'), nav = find('nav'), status = find('[role=status]');
  const retry = find('.visa-account-retry'), footer = find('.visa-account-footer');
  const signout = find('.visa-account-signout'), signoutError = find('[role=alert]');
  root.querySelector('.portal-link')?.setAttribute('hidden', '');
  const entries = Object.entries(destinations).map(([key, action]) => {
    const node = doc.createElement(typeof action === 'function' ? 'button' : 'a');
    node.innerHTML = `${icon(icons[key])}<span></span>`;
    node.dataset.accountDestination = key;
    if (typeof action === 'function') node.type = 'button';
    else node.href = action;
    node.addEventListener('click', () => {
      close(typeof action === 'function');
      if (typeof action === 'function') action();
    });
    nav.append(node);
    return [key, node];
  });
  const avatars = root.querySelectorAll('.visa-account-avatar');
  let account = {}, avatarName, avatarUrl, signingOut = false, signoutFailed = false;

  function close(restoreFocus = false) {
    if (panel.hidden) return;
    panel.hidden = true;
    panel.inert = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus && !root.hidden) trigger.focus({preventScroll: true});
  }

  function render() {
    const t = copy[doc.documentElement.lang] ?? copy.en;
    const {name = '', email = '', photo = '', roles = [], visible = [], current, signedIn, restoring, checking, failed} = account;
    const label = t[staff ? 'staff' : restoring ? 'restoring' : signedIn ? 'account' : 'signin'];
    trigger.setAttribute('aria-label', staff ? [label, name, email !== name && email, ...roles].filter(Boolean).join(' · ') : label);
    find('.visa-account-label').textContent = staff && name ? name : label;
    if (name !== avatarName || photo !== avatarUrl) {
      for (const avatar of avatars) {
        if (name) renderAvatar(avatar, name, photo);
        else avatar.innerHTML = icon(person);
      }
      avatarName = name;
      avatarUrl = photo;
    }

    identity.hidden = !name;
    identity.querySelector('strong').textContent = name;
    identity.querySelector('small').textContent = email === name ? '' : email;
    identity.querySelector('.visa-account-badges').replaceChildren(...roles.map(role => {
      const badge = doc.createElement('span');
      badge.textContent = role;
      return badge;
    }));
    nav.hidden = !visible.length;
    nav.setAttribute('aria-label', t.destinations);
    for (const [key, node] of entries) {
      node.hidden = !visible.includes(key);
      if (key === current) node.setAttribute('aria-current', 'page');
      else node.removeAttribute('aria-current');
      node.querySelector('span').textContent = t[key];
    }
    status.hidden = !restoring && !checking && !failed;
    status.textContent = restoring ? t.restoring : checking ? t.checking : failed ? t.unavailable : '';
    retry.hidden = !failed;
    retry.textContent = t.retry;
    footer.hidden = !signedIn;
    signout.disabled = signingOut;
    signout.setAttribute('aria-busy', String(signingOut));
    signout.querySelector('span').textContent = signingOut ? t.signingOut : t.signout;
    signoutError.hidden = !signoutFailed;
    signoutError.textContent = signoutFailed ? t.signoutFailed : '';
  }

  trigger.addEventListener('click', () => {
    if (!panel.hidden) return close();
    signoutFailed = false;
    render();
    panel.hidden = false;
    panel.inert = false;
    trigger.setAttribute('aria-expanded', 'true');
    onOpen?.();
  });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || panel.hidden) return;
    event.preventDefault();
    event.stopPropagation();
    close(true);
  });
  root.addEventListener('focusout', event => {
    if (event.relatedTarget && !root.contains(event.relatedTarget)) close();
  });
  doc.addEventListener('pointerdown', event => {
    if (!root.contains(event.target)) close();
  });
  retry.addEventListener('click', () => { trigger.focus(); onRetry?.(); });
  signout.addEventListener('click', async () => {
    if (signingOut) return;
    signingOut = true;
    signoutFailed = false;
    render();
    try {
      await onSignOut();
      close(true);
    } catch {
      signoutFailed = true;
    } finally {
      signingOut = false;
      render();
      if (signoutFailed && !panel.hidden && doc.activeElement === doc.body) signout.focus();
    }
  });
  render();
  return {close, update(next) { account = next; render(); }};
}
