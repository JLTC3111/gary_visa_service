/** Local visual adapter for both the offline snapshot and connected menu releases.
 * The shared runtime continues to own navigation, links and keyboard behavior.
 */
const svgNamespace = 'http://www.w3.org/2000/svg';
const brands = {
  home: {sector: {en: 'Homes & rentals', vi: 'Nhà ở & cho thuê'}, paths: '<path d="M5 18 20 6l15 12M9 16v19h22V16M17 35V24h6v11"/><path d="M13 18h3v3h-3zm11 0h3v3h-3z"/>'},
  jobs: {sector: {en: 'Teaching & recruitment', vi: 'Giảng dạy & tuyển dụng'}, paths: '<path d="M20 13c-5-4-11-4-16-2v22c6-2 11-1 16 2 5-3 10-4 16-2V11c-5-2-11-2-16 2Zm0 0v22M8 17l7 2m-7 4 7 2M25 7l5-5 5 5M30 3v18"/>'},
  visa: {sector: {en: 'Visas & documents', vi: 'Visa & hồ sơ'}, paths: '<rect x="8" y="3" width="25" height="34" rx="3"/><path d="M12 3v34M18 31h10M18 8h10"/><circle cx="23" cy="19" r="7"/><path d="M16 19h14M23 12c-4 4-4 10 0 14 4-4 4-10 0-14Z"/>'},
};

export function enhanceGaryApps(root, getLanguage = () => root.ownerDocument.documentElement.lang) {
  const document = root.ownerDocument;
  let stopped = false;
  function refresh() {
    if (stopped) return;
    if (!document.defaultView?.document?.documentElement) { stopped = true; observer.disconnect(); localeObserver.disconnect(); return; }
    const language = getLanguage() === 'vi' ? 'vi' : 'en';
    for (const [app, brand] of Object.entries(brands)) {
      for (const link of root.querySelectorAll(`.gary-app-menu-item.gary-app-${app}`)) {
        if (link.dataset.garyBrand !== app) link.dataset.garyBrand = app;
        const mark = link.querySelector('.gary-app-mark');
        if (mark && !mark.querySelector('[data-gary-brand-mark]')) {
          const decoration = document.createElement('span');
          decoration.dataset.garyBrandMark = app;
          decoration.setAttribute('aria-hidden', 'true');
          const svg = document.createElementNS(svgNamespace, 'svg');
          svg.setAttribute('viewBox', '0 0 40 40');
          svg.setAttribute('width', '36');svg.setAttribute('height', '36');
          svg.setAttribute('fill', 'none');svg.setAttribute('stroke', 'currentColor');
          svg.setAttribute('stroke-width', '1.7');svg.setAttribute('stroke-linecap', 'round');svg.setAttribute('stroke-linejoin', 'round');
          svg.innerHTML = brand.paths;
          decoration.append(svg);mark.append(decoration);
        }
        const body = link.querySelector('strong')?.parentElement;
        if (!body) continue;
        let sector = body.querySelector('[data-gary-brand-sector]');
        if (!sector) {
          sector = document.createElement('span');sector.className = 'gary-app-sector';sector.dataset.garyBrandSector = app;
          body.insertBefore(sector, body.firstChild);
        }
        if (sector.textContent !== brand.sector[language]) sector.textContent = brand.sector[language];
      }
    }
  }
  const observer = new document.defaultView.MutationObserver(refresh);
  observer.observe(root, {childList: true, subtree: true});
  const localeObserver = new document.defaultView.MutationObserver(refresh);
  localeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  refresh();
  return {refresh, disconnect() {stopped = true;observer.disconnect();localeObserver.disconnect();}};
}
