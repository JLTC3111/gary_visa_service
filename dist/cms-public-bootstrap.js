import {db} from './backend.js';
import {loadHomepageCms,renderPublicCms,renderServiceCms} from './cms-public.js';
import {articlePath,renderLatestArticles} from './cms-articles.js';
const language=()=>document.documentElement.lang==='vi'?'vi':'en';
const legacy=new URL(location.href).searchParams;
if(legacy.has('article')){
 location.replace(articlePath(legacy.get('lang')||language(),legacy.get('article')));
}else{
 let entries=null,selected=null,stamp=null,flight=null,failed=false;
 function render(){if(entries)renderPublicCms({doc:document,entries,language:language()});if(!entries||failed)renderLatestArticles(document,[],language(),{unavailable:failed});if(selected)renderServiceCms({doc:document,entries,slug:selected,language:language()})}
 document.addEventListener('gary:language',render);
 document.addEventListener('click',event=>{const button=event.target.closest('[data-open-cms-service]');if(!button||!entries)return;selected=button.dataset.openCmsService;if(!renderServiceCms({doc:document,entries,slug:selected,language:language()}))return;const dialog=document.querySelector('#service-dialog');if(!dialog.open)dialog.showModal();document.body.classList.add('dialog-open')});
 document.querySelector('#service-enquire').addEventListener('click',event=>{if(!selected||!entries)return;event.stopImmediatePropagation();const service=entries.find(e=>e.kind==='service'&&e.slug===selected),type=service?.data?.service_type||selected;document.querySelector('#enquiry-service').value=['visa','work','residence','documents'].includes(type)?type:'unsure';document.querySelector('#service-dialog').close();document.body.classList.remove('dialog-open');document.querySelector('#contact').scrollIntoView({behavior:'smooth'});document.querySelector('#enquiry-name').focus({preventScroll:true});selected=null},true);
 function refresh(){
  if(flight)return flight;
  flight=loadHomepageCms(db).then(next=>{
   const signature=JSON.stringify(next.map(row=>[row.id,row.version,row.published_at]));
   if(signature===stamp)return;
   entries=next;stamp=signature;failed=false;
   // The landing app handles this event and emits gary:language after updating its copy.
   document.dispatchEvent(new CustomEvent('gary:cms-ready',{detail:{entries}}));
  }).catch(()=>{
   if(entries)entries=entries.filter(entry=>entry.kind!=='article');
   stamp=null;failed=true;
   renderLatestArticles(document,[],language(),{unavailable:true});
  }).finally(()=>{flight=null;});
  return flight;
 }
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')void refresh()});
 window.addEventListener('pageshow',event=>{if(event.persisted)void refresh()});
 void refresh();
}
