// Published Agency snapshots only. Render text, never authored HTML.
import {articleFilters,publicCmsImage,renderLatestArticles,validArticleSlug} from './cms-articles.js';

const copy=(entry,key,language)=>String(entry?.[`${key}_${language}`]??'');
const lines=value=>Array.isArray(value)?value:String(value??'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
const el=(doc,tag,text,attrs={})=>{const node=doc.createElement(tag);if(text)node.textContent=text;for(const [key,value]of Object.entries(attrs))node.setAttribute(key,value);return node};
const items=(entries,kind)=>entries.filter(e=>e.kind===kind).sort((a,b)=>(Number(a.data?.position)||0)-(Number(b.data?.position)||0)||a.slug.localeCompare(b.slug));
export async function loadPublishedCms(db,{kind,slug,excludeKind,newest,legacyDateFilter=false}={}){
 const result=[];const batch=newest??(slug?1:200);for(let page=0;page<100;page++){
  let query=db.from('gary_cms_public').select('entry_id,kind,slug,content,published_at');
  if(legacyDateFilter)query=query.lte('published_at',new Date().toISOString());
  query=newest?query.order('published_at',{ascending:false}).order('slug'):query.order('entry_id');
  if(kind)query=query.eq('kind',kind);
  if(excludeKind)query=query.neq('kind',excludeKind);
  if(slug)query=query.eq('slug',slug);
  query=query.range(page*batch,(page+1)*batch-1);
  const response=await (query.abortSignal?query.abortSignal(AbortSignal.timeout(8000)):query);
  if(response.error)throw response.error;
  const records=response.data;
  if(!Array.isArray(records)||records.some(row=>!row||typeof row.entry_id!=='string'||typeof row.slug!=='string'||
    typeof row.kind!=='string'||!row.content||typeof row.content!=='object'||Array.isArray(row.content)))throw new Error('Invalid publication snapshot response');
  result.push(...records.map(row=>({...row.content,id:row.entry_id,kind:row.kind,slug:row.slug,published_at:row.published_at})));
  if(newest||slug||records.length<batch)return result;
 }
 throw new Error('CMS_PUBLIC_FEED_TOO_LARGE');
}
export async function loadHomepageCms(db){
 const [content,articles]=await Promise.allSettled([
  loadPublishedCms(db,{excludeKind:'article'}),
  loadPublishedCms(db,{kind:'article',newest:3})
 ]);
 return {
  content:content.status==='fulfilled'?content.value:null,
  news:articles.status==='fulfilled'?{entries:articles.value,state:'ready'}:{entries:[],state:'error'}
 };
}
export async function loadArticleData(db,{slug=null,filters={}}={}){
 if(slug!==null)return {entries:validArticleSlug(slug)?await loadPublishedCms(db,{kind:'article',slug}):[],databaseClock:true};
 filters=articleFilters(filters);
 const query=db.rpc('gary_cms_article_directory',{p_search:filters.q,p_category:filters.category,p_page:filters.page});
 const {data,error}=await (query.abortSignal?query.abortSignal(AbortSignal.timeout(8000)):query);
 // Older installations can read the same snapshots before the directory RPC
 // is installed or its schema cache is refreshed. Preserve all other errors.
 if(error?.code==='PGRST202')return {entries:await loadPublishedCms(db,{kind:'article',legacyDateFilter:true}),filters};
 if(error)throw error;
 if(!Array.isArray(data?.entries)||data.entries.some(entry=>!entry||entry.kind!=='article'||!validArticleSlug(entry.slug)||!Number.isFinite(Date.parse(entry.published_at)))||
  !Number.isSafeInteger(data.total)||data.total<0||!Number.isSafeInteger(data.page)||data.page<1)throw new Error('Invalid article directory response');
 return {entries:data.entries,total:data.total,filters:{...filters,page:data.page},databaseClock:true};
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
export function renderPublicCms({doc,entries,language='en',news}){
 const t=(en,vi)=>language==='vi'?vi:en;
 const services=items(entries,'service'),cards=doc.querySelector('.services-grid');
 const activeSlot=slot=>entries.some(e=>e.kind==='landing'&&e.data?.slot===slot);
 for(const [slot,selector]of [['hero','#visa-service-discovery'],['services','#services'],['process','#process'],['about','#about'],['faq','#faq'],['contact','#contact']]){const node=doc.querySelector(selector);if(node)node.hidden=!activeSlot(slot);}
 const allFilter=doc.querySelector('[data-filter=all]');if(allFilter)allFilter.textContent=t(`All services · ${services.length}`,`Tất cả dịch vụ · ${services.length}`);
 if(cards){cards.replaceChildren(...services.map(entry=>{
  const card=el(doc,'article','',{class:'service-card','data-category':entry.data?.category||'documents','data-service':entry.slug});
  card.append(el(doc,'h3',copy(entry,'title',language)),el(doc,'p',copy(entry,'summary',language)));
  const url=publicCmsImage(entry.data?.image_url,doc.location.origin);if(url){const image=el(doc,'img','',{src:url,alt:entry.data?.[`image_alt_${language}`]||copy(entry,'title',language),loading:'lazy'});card.prepend(image)}
  const ul=el(doc,'ul','',{class:'service-list'});for(const value of lines(entry.data?.[`includes_${language}`]))ul.append(el(doc,'li',value));card.append(ul,el(doc,'button',t('Explore service','Xem dịch vụ'),{class:'service-link',type:'button','data-open-cms-service':entry.slug}));return card;
 }));const active=doc.querySelector('[data-filter][aria-pressed=true]')?.dataset.filter||'all';for(const card of cards.children)card.hidden=active!=='all'&&card.dataset.category!==active;const filterStatus=doc.querySelector('#filter-status');if(filterStatus)filterStatus.textContent=t(`${[...cards.children].filter(c=>!c.hidden).length} services shown`,`${[...cards.children].filter(c=>!c.hidden).length} dịch vụ đang hiển thị`);}
 const faq=doc.querySelector('.faq-list');if(faq){const rows=items(entries,'faq');faq.replaceChildren(...rows.map((entry,index)=>{const node=el(doc,'details');if(index===0)node.open=true;node.append(el(doc,'summary',copy(entry,'title',language)),el(doc,'p',copy(entry,'body',language)));return node}));doc.querySelector('#faq').hidden=!rows.length||!activeSlot('faq')}
 const process=doc.querySelector('.process-grid');if(process){const rows=items(entries,'process');process.replaceChildren(...rows.map((entry,index)=>{const node=el(doc,'li');node.append(el(doc,'div',String(index+1).padStart(2,'0'),{class:'step-top'}),el(doc,'h3',copy(entry,'title',language)),el(doc,'p',copy(entry,'body',language)),el(doc,'span',entry.data?.[`label_${language}`]||'',{class:'step-label'}));return node}));doc.querySelector('#process').hidden=!rows.length||!activeSlot('process')}
 const overrides=cmsCopyOverrides(entries)[language];for(const node of doc.querySelectorAll('[data-i18n]')){const key=node.dataset.i18n;if(Object.hasOwn(overrides,key))node.textContent=overrides[key]}
 renderLatestArticles(doc,news?.entries??entries,language,{state:news?.state,databaseClock:Boolean(news)});
 const hero=entries.find(e=>e.kind==='landing'&&e.data?.slot==='hero');
 if(hero){
  const title=copy(hero,'seo_title',language).trim(),description=copy(hero,'seo_description',language).trim();
  if(title){doc.title=title;for(const meta of doc.querySelectorAll('meta[property="og:title"],meta[name="twitter:title"],meta[property="twitter:title"]'))meta.content=title;}
  if(description)for(const meta of doc.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"],meta[property="twitter:description"]'))meta.content=description;
 }
 return services;
}
export function renderServiceCms({doc,entries,slug,language='en'}){
 const service=entries.find(e=>e.kind==='service'&&e.slug===slug);if(!service)return null;
 doc.querySelector('#service-dialog-title').textContent=copy(service,'title',language);doc.querySelector('#service-dialog-intro').textContent=copy(service,'summary',language);
 const included=lines(service.data?.[`includes_${language}`]);
 const includes=doc.querySelector('#service-dialog-includes');includes.replaceChildren(...included.map(text=>el(doc,'li',text)));
 let detail=doc.querySelector('#cms-service-details');if(!detail){detail=el(doc,'div','',{id:'cms-service-details',class:'cms-service-details'});includes.after(detail)}detail.replaceChildren();
 const t=(en,vi)=>language==='vi'?vi:en;
 const body=copy(service,'body',language);
 const normalized=value=>String(value).normalize('NFC').replace(/\s+/gu,' ').trim();
 // Imported service descriptions may repeat their complete includes list.
 // Suppress only that exact repetition; distinct editorial text stays visible.
 if(body.trim()&&(!included.length||normalized(body)!==normalized(included.join(' '))))detail.append(el(doc,'p',body));
 for(const [kind,heading]of [['eligibility',t('Eligibility information','Thông tin điều kiện')],['document',t('Document requirements','Giấy tờ cần chuẩn bị')]]){
  const related=items(entries,kind).filter(row=>row.data?.service_slug===slug);if(!related.length)continue;detail.append(el(doc,'h3',heading));for(const entry of related){const section=el(doc,'section');section.append(el(doc,'h4',copy(entry,'title',language)),el(doc,'p',copy(entry,'body',language)));if(entry.data?.source_url&&/^https:\/\//.test(entry.data.source_url))section.append(el(doc,'a',t('Official source','Nguồn chính thức'),{href:entry.data.source_url,target:'_blank',rel:'noopener noreferrer'}));detail.append(section)}
 }
 return service;
}
