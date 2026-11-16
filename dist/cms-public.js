// Published Agency snapshots only. Render text, never authored HTML.
const copy=(entry,key,language)=>String(entry?.[`${key}_${language}`]??'');
const lines=value=>Array.isArray(value)?value:String(value??'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
const el=(doc,tag,text,attrs={})=>{const node=doc.createElement(tag);if(text)node.textContent=text;for(const [key,value]of Object.entries(attrs))node.setAttribute(key,value);return node};
const items=(entries,kind)=>entries.filter(e=>e.kind===kind).sort((a,b)=>(Number(a.data?.position)||0)-(Number(b.data?.position)||0)||a.slug.localeCompare(b.slug));
export async function loadPublishedCms(db){
 const result=[];const batch=200;for(let page=0;page<100;page++){
  const response=await db.from('gary_cms_public').select('entry_id,kind,slug,content,published_at').order('entry_id').range(page*batch,(page+1)*batch-1);
  if(response.error)throw response.error;const records=response.data??[];result.push(...records.map(row=>({...row.content,id:row.entry_id,kind:row.kind,slug:row.slug,published_at:row.published_at})));if(records.length<batch)return result;
 }
 throw new Error('CMS_PUBLIC_FEED_TOO_LARGE');
}
export function cmsCopyOverrides(entries){
 const result={en:{},vi:{}};
 for(const language of ['en','vi'])for(const entry of entries){
  if(entry.kind==='service'&&['visa','work','residence','documents'].includes(entry.slug)){result[language][`${entry.slug}Title`]=copy(entry,'title',language);result[language][`${entry.slug}Intro`]=copy(entry,'summary',language)}
  if(entry.kind==='landing'){
   const slot=entry.data?.slot;if(!['hero','services','process','about','faq','contact'].includes(slot))continue;
   result[language][`${slot}Line1`]=copy(entry,'title',language);result[language][slot==='hero'?'heroDescription':`${slot}Intro`]=copy(entry,'summary',language);
   result[language][`${slot}Line2`]=entry.data?.[`accent_${language}`]??'';
   if(slot==='hero')result[language].heroLine3=entry.data?.[`third_line_${language}`]??'';
  }
 }
 return result;
}
export function renderPublicCms({doc,entries,language='en'}){
 const t=(en,vi)=>language==='vi'?vi:en;
 const services=items(entries,'service'),cards=doc.querySelector('.services-grid');
 const activeSlot=slot=>entries.some(e=>e.kind==='landing'&&e.data?.slot===slot);
 for(const [slot,selector]of [['hero','.hero'],['services','#services'],['process','#process'],['about','#about'],['faq','#faq'],['contact','#contact']]){const node=doc.querySelector(selector);if(node)node.hidden=!activeSlot(slot);}
 const allFilter=doc.querySelector('[data-filter=all]');if(allFilter)allFilter.textContent=t(`All services · ${services.length}`,`Tất cả dịch vụ · ${services.length}`);
 if(cards){cards.replaceChildren(...services.map((entry,index)=>{
  const card=el(doc,'article','',{class:'service-card','data-category':entry.data?.category||'documents','data-service':entry.slug});
  card.append(el(doc,'div',String(index+1).padStart(2,'0'),{class:'service-number'}),el(doc,'h3',copy(entry,'title',language)),el(doc,'p',copy(entry,'summary',language)));
  if(entry.data?.image_url){const image=el(doc,'img','',{src:entry.data.image_url,alt:entry.data?.[`image_alt_${language}`]||copy(entry,'title',language),loading:'lazy'});card.prepend(image)}
  const ul=el(doc,'ul','',{class:'service-list'});for(const value of lines(entry.data?.[`includes_${language}`]))ul.append(el(doc,'li',value));card.append(ul,el(doc,'button',t('Explore service','Xem dịch vụ'),{class:'service-link',type:'button','data-open-cms-service':entry.slug}));return card;
 }));const active=doc.querySelector('[data-filter][aria-pressed=true]')?.dataset.filter||'all';for(const card of cards.children)card.hidden=active!=='all'&&card.dataset.category!==active;const filterStatus=doc.querySelector('#filter-status');if(filterStatus)filterStatus.textContent=t(`${[...cards.children].filter(c=>!c.hidden).length} services shown`,`${[...cards.children].filter(c=>!c.hidden).length} dịch vụ đang hiển thị`);}
 const faq=doc.querySelector('.faq-list');if(faq){const rows=items(entries,'faq');faq.replaceChildren(...rows.map((entry,index)=>{const node=el(doc,'details');if(index===0)node.open=true;node.append(el(doc,'summary',copy(entry,'title',language)),el(doc,'p',copy(entry,'body',language)));return node}));doc.querySelector('#faq').hidden=!rows.length||!activeSlot('faq')}
 const process=doc.querySelector('.process-grid');if(process){const rows=items(entries,'process');process.replaceChildren(...rows.map((entry,index)=>{const node=el(doc,'li');node.append(el(doc,'div',String(index+1).padStart(2,'0'),{class:'step-top'}),el(doc,'h3',copy(entry,'title',language)),el(doc,'p',copy(entry,'body',language)),el(doc,'span',entry.data?.[`label_${language}`]||'',{class:'step-label'}));return node}));doc.querySelector('#process').hidden=!rows.length||!activeSlot('process')}
 const overrides=cmsCopyOverrides(entries)[language];for(const node of doc.querySelectorAll('[data-i18n]')){const key=node.dataset.i18n;if(Object.hasOwn(overrides,key))node.textContent=overrides[key]}
 let articles=doc.querySelector('#cms-articles');if(!articles){articles=el(doc,'section','',{id:'cms-articles',class:'section cms-public-articles'});doc.querySelector('#faq')?.before(articles)}
 const rows=items(entries,'article');articles.hidden=!rows.length;articles.replaceChildren();
 if(rows.length){const inner=el(doc,'div','',{class:'container'});inner.append(el(doc,'h2',t('Guides & updates','Hướng dẫn & cập nhật')));for(const entry of rows){const detail=el(doc,'details','',{id:`article-${entry.slug}`,class:'cms-public-article'});detail.append(el(doc,'summary',copy(entry,'title',language)),el(doc,'p',copy(entry,'summary',language)));for(const text of copy(entry,'body',language).split(/\n\s*\n/))if(text.trim())detail.append(el(doc,'p',text));if(entry.data?.source_url&&/^https:\/\//.test(entry.data.source_url))detail.append(el(doc,'a',t('Reference source','Nguồn tham khảo'),{href:entry.data.source_url,target:'_blank',rel:'noopener noreferrer'}));inner.append(detail)}articles.append(inner)}
 const hero=entries.find(e=>e.kind==='landing'&&e.data?.slot==='hero');if(hero){for(const [key,selector]of [['seo_title','title'],['seo_description','meta[name="description"]']]){const value=copy(hero,key,language);if(value){if(selector==='title')doc.title=value;else{const meta=doc.querySelector(selector);if(meta)meta.content=value}}}}
 return services;
}
export function renderServiceCms({doc,entries,slug,language='en'}){
 const service=entries.find(e=>e.kind==='service'&&e.slug===slug);if(!service)return null;
 doc.querySelector('#service-dialog-title').textContent=copy(service,'title',language);doc.querySelector('#service-dialog-intro').textContent=copy(service,'summary',language);
 const includes=doc.querySelector('#service-dialog-includes');includes.replaceChildren(...lines(service.data?.[`includes_${language}`]).map(text=>el(doc,'li',text)));
 let detail=doc.querySelector('#cms-service-details');if(!detail){detail=el(doc,'div','',{id:'cms-service-details',class:'cms-service-details'});includes.after(detail)}detail.replaceChildren();
 const t=(en,vi)=>language==='vi'?vi:en;
 const body=copy(service,'body',language);if(body)detail.append(el(doc,'p',body));
 for(const [kind,heading]of [['eligibility',t('Eligibility information','Thông tin điều kiện')],['document',t('Document requirements','Giấy tờ cần chuẩn bị')]]){
  const related=items(entries,kind).filter(row=>row.data?.service_slug===slug);if(!related.length)continue;detail.append(el(doc,'h3',heading));for(const entry of related){const section=el(doc,'section');section.append(el(doc,'h4',copy(entry,'title',language)),el(doc,'p',copy(entry,'body',language)));if(entry.data?.source_url&&/^https:\/\//.test(entry.data.source_url))section.append(el(doc,'a',t('Official source','Nguồn chính thức'),{href:entry.data.source_url,target:'_blank',rel:'noopener noreferrer'}));detail.append(section)}
 }
 return service;
}
