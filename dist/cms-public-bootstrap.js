import {db} from './backend.js';
import {loadHomepageCms,renderPublicCms,renderServiceCms} from './cms-public.js';
import {articlePath,renderLatestArticles} from './cms-articles.js';
const language=()=>document.documentElement.lang==='vi'?'vi':'en';
const legacy=new URL(location.href).searchParams;
if(legacy.has('article')){
 location.replace(articlePath(legacy.get('lang')||language(),legacy.get('article')));
}else{
 let entries=null,selected=null,stamp=null,flight=null;
 let news={entries:[],state:'loading'};
 function render(){
  if(entries)renderPublicCms({doc:document,entries,language:language(),news});
  else renderLatestArticles(document,news.entries,language(),{state:news.state,databaseClock:true});
  if(selected&&entries)renderServiceCms({doc:document,entries,slug:selected,language:language()});
 }
 document.addEventListener('gary:language',render);
 document.addEventListener('click',event=>{
  const retry=event.target.closest('#cms-articles [data-retry-articles]');
  if(!retry||flight)return;
  const wasFocused=document.activeElement===retry;
  retry.disabled=true;
  retry.closest('#cms-articles').setAttribute('aria-busy','true');
  void refresh().finally(()=>{
   if(wasFocused&&document.activeElement===document.body){
    (document.querySelector('#cms-articles [data-retry-articles]')||document.getElementById('cms-news-title'))?.focus();
   }
  });
 });
 document.addEventListener('click',event=>{const button=event.target.closest('[data-open-cms-service]');if(!button||!entries)return;selected=button.dataset.openCmsService;if(!renderServiceCms({doc:document,entries,slug:selected,language:language()}))return;const dialog=document.querySelector('#service-dialog');if(!dialog.open)dialog.showModal();document.body.classList.add('dialog-open')});
 document.querySelector('#service-enquire').addEventListener('click',event=>{if(!selected||!entries)return;event.stopImmediatePropagation();const service=entries.find(e=>e.kind==='service'&&e.slug===selected),type=service?.data?.service_type||selected;document.querySelector('#enquiry-service').value=['visa','work','residence','documents'].includes(type)?type:'unsure';document.querySelector('#service-dialog').close();document.body.classList.remove('dialog-open');document.querySelector('#contact').scrollIntoView({behavior:'smooth'});document.querySelector('#enquiry-name').focus({preventScroll:true});selected=null},true);
 function refresh(){
  if(flight)return flight;
  flight=loadHomepageCms(db).then(next=>{
   news=next.news;
   if(next.content){
    const signature=JSON.stringify(next.content.map(row=>[row.id,row.version,row.published_at]));
    if(signature!==stamp){
     entries=next.content;stamp=signature;
     // Let the landing app update its translated content and service choices.
     document.dispatchEvent(new CustomEvent('gary:cms-ready',{detail:{entries}}));
    }
   }
   render();
  }).finally(()=>{flight=null;});
  return flight;
 }
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')void refresh()});
 window.addEventListener('pageshow',event=>{if(event.persisted)void refresh()});
 render();
 void refresh();
}
