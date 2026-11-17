/* Staff scope is known before the first stylesheet. Authenticated role later wins. */
(() => {
  const root = document.documentElement;
  root.dataset.visaPortal = new URLSearchParams(location.search).get('area') === 'staff' ? 'staff' : 'customer';
  if (root.dataset.visaPortal === 'customer') root.style.colorScheme = 'light';
})();
