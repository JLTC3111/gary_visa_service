import {accountRoleLabel, mountAccountMenu} from './account-menu.js';
import {avatarBucket, avatarPath} from './profile-avatar.js';
import {portalCopy} from './portal-copy.js';
import {db} from './backend.js';

export function mountPublicAccountMenu(doc, client = db) {
  const root = doc.getElementById('public-account-menu');
  if (!root) return;
  const win = doc.defaultView;
  const t = key => portalCopy[doc.documentElement.lang]?.[key] ?? portalCopy.en[key];
  let sessionId, account, access, request, photo = '', name = '', failed = false, checking = false;

  const menu = mountAccountMenu(root, {
    destinations: {
      customerLogin: './portal.html', staffLogin: './portal.html?area=staff',
      staffDashboard: './portal.html?area=staff', customerDashboard: './portal.html',
      staffProfile: './portal.html?area=staff&view=profile', profile: './portal.html?view=profile'
    },
    onOpen() {
      if (doc.getElementById('mobile-nav')?.hidden === false) doc.getElementById('menu-toggle').click();
      void checkAccess();
    },
    onRetry: checkAccess,
    async onSignOut() {
      const id = sessionId;
      const {error} = await client.auth.signOut({scope: 'local'});
      if (error) throw error;
      if (id === sessionId) setSession(null);
    }
  });

  function render() {
    const roles = [], visible = [];
    if (sessionId === null) visible.push('customerLogin', 'staffLogin');
    if (access?.member === true) {
      if (['staff', 'manager', 'admin'].includes(access.operations)) roles.push(accountRoleLabel(t, 'operations', access.operations));
      if (['editor', 'publisher', 'admin'].includes(access.cms)) roles.push(accountRoleLabel(t, 'cms', access.cms));
      if (roles.length) visible.push('staffDashboard');
      visible.push('staffProfile');
      if (!roles.length) roles.push(t('staff'));
    } else if (access?.member === false) {
      visible.push('customerDashboard', 'profile');
      roles.push(t('customer'));
    }
    menu.update({name: account ? name || account.email || t('account') : '', email: account?.email,
      photo, roles, visible, signedIn: Boolean(sessionId),
      restoring: sessionId === undefined, checking, failed});
  }

  function setSession(id) {
    if (id === sessionId) return;
    if (sessionId !== undefined) menu.close(true);
    request?.abort();
    request = undefined;
    sessionId = id;
    account = access = undefined;
    photo = name = '';
    failed = checking = false;
    render();
  }

  async function checkAccess() {
    if (!sessionId || checking) return;
    request?.abort();
    const id = sessionId, check = new AbortController();
    request = check;
    checking = true;
    access = undefined;
    failed = false;
    render();
    const timer = win.setTimeout(() => {
      if (check.signal.aborted) return;
      check.abort();
      checking = false;
      failed = true;
      render();
    }, 10000);
    try {
      const identity = await client.auth.getUser();
      if (check.signal.aborted) return;
      const user = identity.data?.user;
      if (identity.error || user?.id !== id) throw new Error('Account could not be verified');
      const result = await client.rpc('gary_my_access').abortSignal(check.signal);
      if (check.signal.aborted) return;
      if (result.error || typeof result.data?.member !== 'boolean') throw new Error('Visa access could not be verified');
      account = user;
      access = result.data;
      const fullName = user.user_metadata?.full_name;
      if (!name && typeof fullName === 'string') name = fullName.trim();
      // These optional details can arrive after the verified destinations are shown.
      void loadProfile(id, check.signal);
    } catch {
      if (!check.signal.aborted) failed = true;
    } finally {
      win.clearTimeout(timer);
      if (!check.signal.aborted) {
        checking = false;
        render();
      }
    }
  }

  async function loadProfile(id, signal) {
    try {
      const {data} = await client.from('gary_profiles').select('full_name').eq('id', id).abortSignal(signal).maybeSingle();
      if (signal.aborted) return;
      if (data?.full_name?.trim()) name = data.full_name.trim();
      render();
      const avatar = await client.storage.from(avatarBucket).createSignedUrl(avatarPath(id), 300);
      if (signal.aborted) return;
      photo = avatar.data?.signedUrl ?? '';
      render();
    } catch { /* A photo or profile lookup failure leaves the verified account usable. */ }
  }

  render();
  client.auth.onAuthStateChange((_event, session) => setSession(session?.user?.id ?? null));
  doc.addEventListener('gary:language', render);
}

if (typeof document !== 'undefined') mountPublicAccountMenu(document);
