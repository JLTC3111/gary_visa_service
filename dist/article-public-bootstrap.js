import {db} from './backend.js';
import {loadPublishedCms} from './cms-public.js';
import {articlePath, renderArticlePage, validArticleSlug} from './cms-articles.js';

const current = new URL(location.href);
const slug = current.searchParams.get('article');
let locale = current.searchParams.get('lang');
if (locale !== 'en' && locale !== 'vi') {
  try {locale=localStorage.getItem('gary-language');} catch {/* Optional browser preference. */}
}
let language = locale === 'vi' ? 'vi' : 'en';
let entries = [], state = 'loading', flight = null;
const languages = document.getElementById('article-languages');
const theme = document.getElementById('article-theme');
const t = (en,vi) => language==='vi'?vi:en;

function render() {
  document.documentElement.lang=language;
  document.querySelector('.skip-link').textContent=t('Skip to content','Chuyển đến nội dung');
  const home=document.getElementById('article-home');
  home.href=`/?lang=${language}`;
  home.setAttribute('aria-label',t('Gary Agency home','Trang chủ Gary Agency'));
  languages.setAttribute('aria-label',t('Language','Ngôn ngữ'));
  for (const link of languages.querySelectorAll('a')) {
    link.href=articlePath(link.dataset.articleLang,slug);
    link.setAttribute('aria-current',link.dataset.articleLang===language?'true':'false');
  }
  document.getElementById('article-theme-label').textContent=t('Appearance','Giao diện');
  for (const [key,en,vi] of [['system','System','Hệ thống'],['light','Light','Sáng'],['dark','Dark','Tối']])
    theme.querySelector(`option[value="${key}"]`).textContent=t(en,vi);
  renderArticlePage(document,{entries,language,slug,state});
}

function refresh() {
  if (flight) return flight;
  const request = slug!==null && !validArticleSlug(slug) ? Promise.resolve([]) : loadPublishedCms(db,{kind:'article',slug});
  flight=request.then(next=>{entries=next;state='ready';}).catch(()=>{entries=[];state='error';})
    .finally(()=>{flight=null;render();});
  return flight;
}

languages.addEventListener('click',event=>{
  const link=event.target.closest('[data-article-lang]');
  if (!link || event.button!==0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  language=link.dataset.articleLang;
  history.replaceState(history.state,'',link.href);
  try {localStorage.setItem('gary-language',language);} catch {/* Optional browser preference. */}
  render();
});
const updateTheme=()=>{theme.value=window.garyVisaPreferences?.theme||'system';};
theme.addEventListener('change',()=>window.setGaryVisaTheme?.(theme.value));
document.addEventListener('gary:visual-preferences',updateTheme);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')void refresh();});
window.addEventListener('pageshow',event=>{if(event.persisted)void refresh();});
updateTheme();
render();
void refresh();
