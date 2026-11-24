import {db} from './backend.js';
import {loadArticleData} from './cms-public.js';
import {articleFilters,articlePath,bindArticleFallbacks,newsOrigin,renderArticlePage,validArticleSlug} from './cms-articles.js';

const current=new URL(location.href);
const route=/^\/(en|vi)\/news(?:\/([^/]+))?\/?$/.exec(current.pathname);
const filters=articleFilters(Object.fromEntries(current.searchParams));
if(!route){
  let language=current.searchParams.get('lang');
  if(!['en','vi'].includes(language))try{language=localStorage.getItem('gary-language');}catch{/* Optional preference. */}
  const legacy=current.searchParams.get('article');
  location.replace(articlePath(language,validArticleSlug(legacy)?legacy:null,filters));
}else{
  const language=route[1],slug=route[2]??null;
  const main=document.getElementById('article-content'),theme=document.getElementById('article-theme');
  let flight;
  function refresh(){
    if(flight)return flight;
    flight=loadArticleData(db,{slug,filters}).then(data=>renderArticlePage(document,{language,slug,filters,origin:newsOrigin,...data}))
      .catch(()=>renderArticlePage(document,{language,slug,filters,origin:newsOrigin,state:'error'})).finally(()=>{flight=null;});
    return flight;
  }
  for(const link of document.querySelectorAll('[data-article-lang]'))link.addEventListener('click',()=>{
    try{localStorage.setItem('gary-language',link.dataset.articleLang);}catch{/* Optional preference. */}
  });
  const updateTheme=()=>{theme.value=window.garyVisaPreferences?.theme||'system';};
  theme.addEventListener('change',()=>window.setGaryVisaTheme?.(theme.value));
  document.addEventListener('gary:visual-preferences',updateTheme);
  updateTheme();bindArticleFallbacks(main);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')void refresh();});
  window.addEventListener('pageshow',event=>{if(event.persisted)void refresh();});
}
