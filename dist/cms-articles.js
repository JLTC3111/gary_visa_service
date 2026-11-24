import {config} from './config.js';

export const newsOrigin='https://visa.garyhome.vn';
export const articlePageSize=9;
export const articleCategories={
  general:{en:'General',vi:'Tổng hợp'},visa:{en:'Visas',vi:'Thị thực'},work:{en:'Work permits',vi:'Giấy phép lao động'},
  residence:{en:'Residence',vi:'Cư trú'},documents:{en:'Documents',vi:'Giấy tờ'},updates:{en:'Agency updates',vi:'Tin Gary Agency'}
};
const fallbackCover='/assets/vietnam-city.jpg';
const storageOrigin=new URL(config.supabaseUrl).origin;
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const local=(language,en,vi)=>language==='vi'?vi:en;

function localized(entry,field,language){
  return String(entry?.[`${field}_${language}`]??'').trim()||String(entry?.[`${field}_${language==='vi'?'en':'vi'}`]??'').trim();
}

export function validArticleSlug(slug){return typeof slug==='string'&&slug.length<=180&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);}
export function articleFilters({q='',category='',page=1}={}){
  const number=Number(page);
  return {q:[...String(q).trim()].slice(0,120).join(''),category:Object.hasOwn(articleCategories,category)?category:'',
    page:Number.isSafeInteger(number)?Math.min(10000,Math.max(1,number)):1};
}
export function articlePath(language,slug=null,filters={}){
  const path=`/${language==='vi'?'vi':'en'}/news`;
  if(validArticleSlug(slug))return `${path}/${slug}`;
  const {q,category,page}=articleFilters(filters),params=new URLSearchParams();
  if(q)params.set('q',q);if(category)params.set('category',category);if(page>1)params.set('page',String(page));
  return params.size?`${path}?${params}`:path;
}

export function eligibleArticles(entries,now=Date.now()){
  return entries.filter(entry=>{
    const published=Date.parse(entry.published_at);
    return entry.kind==='article'&&validArticleSlug(entry.slug)&&localized(entry,'title','en')&&!entry.deleted_at
      &&(!entry.status||entry.status==='published')&&Number.isFinite(published)&&published<=now;
  }).sort((a,b)=>Date.parse(b.published_at)-Date.parse(a.published_at)||a.slug.localeCompare(b.slug));
}

// Public CMS images are same-site assets or a verified editorial bucket key.
// Queries, fragments, private buckets and arbitrary external URLs are excluded.
export function publicCmsImage(value,origin=newsOrigin){
  if(typeof value!=='string'||/[\\%\s]/.test(value))return '';
  if(/^\/assets\/[a-z0-9_/-]+\.(?:avif|jpe?g|png|webp|svg)$/i.test(value))return new URL(value,origin).href;
  if(!value.startsWith(`${storageOrigin}/storage/v1/object/public/gary-cms-media/`))return '';
  const path=value.slice(`${storageOrigin}/storage/v1/object/public/gary-cms-media/`.length);
  return /^[a-f0-9-]{36}\/[a-f0-9-]{36}\.(?:jpg|png|webp|avif)$/.test(path)?value:'';
}

function coverFor(entry,language,origin){
  const src=publicCmsImage(entry?.data?.image_url,origin);
  return src?{src,alt:localized(entry.data,'image_alt',language),caption:localized(entry.data,'image_caption',language)}
    :{src:new URL(fallbackCover,origin).href,alt:'',caption:''};
}
function excerpt(entry,language){
  const value=(localized(entry,'summary',language)||localized(entry,'body',language)).replace(/\s+/gu,' ');
  if([...value].length<=180)return value;
  const cut=[...value].slice(0,179).join(''),space=cut.lastIndexOf(' ');
  return (space>120?cut.slice(0,space):cut).trimEnd()+'…';
}
function dateLabel(entry,language){
  const date=new Date(entry.published_at);
  const text=new Intl.DateTimeFormat(language==='vi'?'vi-VN':'en-GB',{dateStyle:'medium',timeZone:'Asia/Ho_Chi_Minh'}).format(date);
  return `<time datetime="${date.toISOString()}">${escape(text)}</time>`;
}
function image(cover,lazy=true){return `<img src="${escape(cover.src)}" alt="${escape(cover.alt)}" decoding="async"${lazy?' loading="lazy"':''} data-article-cover>`;}
function categoryFor(entry){return Object.hasOwn(articleCategories,entry.data?.category)?entry.data.category:'general';}
function cards(entries,language,origin,heading){
  return `<div class="cms-news-grid">${entries.map(entry=>`<article class="cms-news-card" id="article-${entry.slug}"><a href="${articlePath(language,entry.slug)}" class="cms-news-link">${image(coverFor(entry,language,origin))}<div class="cms-news-card-body"><div class="cms-news-meta">${escape(articleCategories[categoryFor(entry)][language])} · ${dateLabel(entry,language)}</div><${heading}>${escape(localized(entry,'title',language))}</${heading}><p>${escape(excerpt(entry,language))}</p></div></a></article>`).join('')}</div>`;
}

export function bindArticleFallbacks(root){
  for(const img of root.querySelectorAll('img[data-article-cover]')){
    const fallback=()=>{if(img.getAttribute('src')!==fallbackCover){img.src=fallbackCover;img.alt='';img.closest('figure')?.querySelector('figcaption')?.remove();}};
    img.addEventListener('error',fallback,{once:true});
    if(img.complete&&img.naturalWidth===0)fallback();
  }
}

export function renderLatestArticles(doc,entries,language,{unavailable=false}={}){
  let section=doc.getElementById('cms-articles');
  if(!section){
    section=doc.createElement('section');section.id='cms-articles';section.className='section cms-public-articles';
    section.setAttribute('aria-labelledby','cms-news-title');doc.getElementById('faq')?.before(section);
  }
  const rows=eligibleArticles(entries).slice(0,3),t=(en,vi)=>local(language,en,vi);
  section.hidden=false;
  const empty=unavailable?t('Articles are temporarily unavailable.','Bài viết hiện tạm thời không tải được.'):
    t('New articles will appear here as they are published.','Bài viết mới sẽ xuất hiện tại đây sau khi được xuất bản.');
  section.innerHTML=`<div class="container"><div class="cms-news-header"><h2 id="cms-news-title">${t('News &amp; Guides','Tin tức &amp; Hướng dẫn')}</h2><a href="${articlePath(language)}" class="service-link">${t('View all','Xem tất cả')}</a></div>${rows.length?cards(rows,language,doc.location.origin,'h3'):`<p class="cms-news-empty">${empty}</p>`}</div>`;
  bindArticleFallbacks(section);
}

function filterForm(language,{q,category}){
  const t=(en,vi)=>local(language,en,vi);
  return `<form class="cms-news-filters" action="${articlePath(language)}" method="get" role="search"><label>${t('Search articles','Tìm bài viết')}<input type="search" name="q" maxlength="120" value="${escape(q)}"></label><label>${t('Category','Danh mục')}<select name="category"><option value="">${t('All categories','Tất cả danh mục')}</option>${Object.entries(articleCategories).map(([value,copy])=>`<option value="${value}"${category===value?' selected':''}>${escape(copy[language])}</option>`).join('')}</select></label><button type="submit" class="button">${t('Apply filters','Áp dụng bộ lọc')}</button>${q||category?`<a class="service-link" href="${articlePath(language)}">${t('Clear filters','Xóa bộ lọc')}</a>`:''}</form>`;
}

function pagination(language,filters,pages){
  if(pages<2)return '';
  const t=(en,vi)=>local(language,en,vi),{page}=filters;
  const link=(number,label,rel)=>`<a class="service-link" rel="${rel}" href="${escape(articlePath(language,null,{...filters,page:number}))}">${label}</a>`;
  return `<nav class="cms-news-pages" aria-label="${t('Article pages','Các trang bài viết')}">${page>1?link(page-1,t('Previous','Trang trước'),'prev'):''}<span>${t(`Page ${page} of ${pages}`,`Trang ${page} / ${pages}`)}</span>${page<pages?link(page+1,t('Next','Trang sau'),'next'):''}</nav>`;
}

function articleReference(value){
  try{
    const url=new URL(value);
    if(url.protocol!=='https:'||url.username||url.password||url.hostname.endsWith('.supabase.co')||url.pathname.includes('/storage/v1/'))return '';
    return url.href;
  }catch{return '';}
}

export function articleView({entries=[],total=null,language='en',slug=null,state='ready',filters={},origin=newsOrigin}={}){
  language=language==='vi'?'vi':'en';filters=articleFilters(filters);
  const t=(en,vi)=>local(language,en,vi),name=t('News & Guides','Tin tức & Hướng dẫn');
  let rows=eligibleArticles(entries);
  const entry=state==='ready'&&slug!==null?rows.find(item=>item.slug===slug):null;
  const missing=state==='ready'&&slug!==null&&!entry;
  const title=entry?localized(entry,'title',language):missing?t('Article unavailable','Bài viết không khả dụng'):name;
  let content=`${slug===null?'':`<a class="service-link cms-article-back" href="${articlePath(language)}">${t('All news &amp; guides','Tất cả tin tức &amp; hướng dẫn')}</a>`}<h1>${escape(title)}</h1>`;
  if(slug===null)content+=filterForm(language,filters);
  if(state==='loading'||state==='error'||missing){
    const status=missing?t('This article is no longer available.','Bài viết này hiện không còn khả dụng.'):state==='error'
      ?t('Articles are temporarily unavailable. Please try again shortly.','Bài viết tạm thời không tải được. Vui lòng thử lại sau.')
      :t('Loading articles…','Đang tải bài viết…');
    content+=`<p class="cms-news-empty" role="status">${status}</p>`;
  }else if(entry){
    const cover=coverFor(entry,language,origin),summary=localized(entry,'summary',language),source=articleReference(entry.data?.source_url);
    const paragraphs=localized(entry,'body',language).split(/\n\s*\n/u).map(text=>text.trim()).filter(Boolean);
    content+=`<article class="cms-article-body"><div class="cms-news-meta">${escape(articleCategories[categoryFor(entry)][language])} · ${dateLabel(entry,language)}</div><figure>${image(cover,false)}${cover.caption?`<figcaption>${escape(cover.caption)}</figcaption>`:''}</figure>${summary&&summary!==paragraphs[0]?`<p class="cms-article-summary">${escape(summary)}</p>`:''}${paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}${source?`<a href="${escape(source)}" target="_blank" rel="noopener noreferrer">${t('Reference source','Nguồn tham khảo')}</a>`:''}</article>`;
  }else{
    // The production query provides a page and a count. Raw snapshots remain
    // useful to tests and legacy clients that render the same view locally.
    if(total===null){
      const q=filters.q.toLocaleLowerCase(language);
      rows=rows.filter(row=>(!filters.category||categoryFor(row)===filters.category)&&
        (!q||['title_en','title_vi','summary_en','summary_vi'].some(key=>String(row[key]||'').toLocaleLowerCase(language).includes(q))));
      total=rows.length;filters.page=Math.min(filters.page,Math.max(1,Math.ceil(total/articlePageSize)));
      rows=rows.slice((filters.page-1)*articlePageSize,filters.page*articlePageSize);
    }
    if(rows.length)content+=`<p class="cms-news-meta" role="status">${t(`${total} articles`,`${total} bài viết`)}</p>${cards(rows,language,origin,'h2')}${pagination(language,filters,Math.ceil(total/articlePageSize))}`;
    else content+=`<p class="cms-news-empty" role="status">${filters.q||filters.category?t('No articles match these filters.','Không có bài viết phù hợp với bộ lọc.'):
      t('No articles have been published yet.','Chưa có bài viết nào được xuất bản.')}</p>`;
  }
  return {content,title:localized(entry,'seo_title',language)||`${title} | Gary Agency`,entry,missing,language,slug,state,filters,origin};
}

function seoMarkup(view){
  const {language,entry,title,slug,state,missing,origin,filters}=view;
  const page=filters.q||filters.category?1:filters.page;
  const canonical=new URL(articlePath(language,slug,slug===null?{page}:{}),origin).href;
  const description=(entry&&(localized(entry,'seo_description',language)||excerpt(entry,language)))||local(language,
    'News and guides on visas, work permits and residence in Vietnam.','Tin tức và hướng dẫn về thị thực, giấy phép lao động và cư trú tại Việt Nam.');
  const image=coverFor(entry,language,origin).src;
  const meta=(attribute,key,value)=>`<meta ${attribute}="${key}" content="${escape(value)}">`;
  const noIndex=missing||state!=='ready'||(slug===null&&!!(filters.q||filters.category));
  const alternate=['en','vi','x-default'].map(lang=>`<link rel="alternate" hreflang="${lang}" href="${escape(new URL(articlePath(lang,slug,slug===null?{page}:{}),origin).href)}">`).join('');
  const structured=entry?`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:localized(entry,'title',language),description,inLanguage:language,datePublished:new Date(entry.published_at).toISOString(),image,mainEntityOfPage:canonical,publisher:{'@type':'Organization',name:'Gary Agency'}}).replace(/</g,'\\u003c')}</script>`:'';
  return `<title>${escape(title)}</title>${meta('name','description',description)}${meta('name','robots',noIndex?'noindex, follow':'index, follow')}<link rel="canonical" href="${escape(canonical)}">${alternate}${Object.entries({title,description,image,url:canonical,type:entry?'article':'website',locale:language==='vi'?'vi_VN':'en_GB'}).map(([key,value])=>meta('property',`og:${key}`,value)).join('')}${Object.entries({title,description,image,card:'summary_large_image'}).map(([key,value])=>meta('name',`twitter:${key}`,value)).join('')}${structured}`;
}

export function renderArticleDocument(shell,options){
  const view=articleView(options),{language,slug,filters}=view;
  return shell.replace('<html lang="en">',`<html lang="${language}">`)
    .replace(/<!-- news head -->[\s\S]*?<!-- end news head -->/,()=>`<!-- news head -->${seoMarkup(view)}<!-- end news head -->`)
    .replace(/<!-- news content -->[\s\S]*?<!-- end news content -->/,()=>`<!-- news content -->${view.content}<!-- end news content -->`)
    .replace('data-news-initial="static"','data-news-initial="server"')
    .replace('id="article-home" href="/"',`id="article-home" href="/?lang=${language}"`)
    .replace('/en/news" data-article-lang="en"',`${escape(articlePath('en',slug,filters))}" data-article-lang="en"${language==='en'?' aria-current="true"':''}`)
    .replace('/vi/news" data-article-lang="vi"',`${escape(articlePath('vi',slug,filters))}" data-article-lang="vi"${language==='vi'?' aria-current="true"':''}`)
    .replace('>Skip to content<',`>${local(language,'Skip to content','Chuyển đến nội dung')}<`)
    .replace('id="article-theme-label">Appearance',`id="article-theme-label">${local(language,'Appearance','Giao diện')}`)
    .replace('aria-label="Gary Agency home"',`aria-label="${local(language,'Gary Agency home','Trang chủ Gary Agency')}"`)
    .replace('aria-label="Language" id="article-languages"',`aria-label="${local(language,'Language','Ngôn ngữ')}" id="article-languages"`)
    .replace(/(value="(?:system|light|dark)">)(System|Light|Dark)</g,(_,attribute,label)=>`${attribute}${language==='vi'?{System:'Hệ thống',Light:'Sáng',Dark:'Tối'}[label]:label}<`);
}

export function renderArticlePage(doc,options){
  const view=articleView({...options,origin:options?.origin??doc.location.origin});
  const main=doc.getElementById('article-content');
  main.innerHTML=view.content;main.setAttribute('aria-busy',String(view.state==='loading'));
  for(const node of doc.head.querySelectorAll('title,meta[name=description],meta[name=robots],meta[property^="og:"],meta[name^="twitter:"],link[rel=canonical],link[hreflang],script[type="application/ld+json"]'))node.remove();
  doc.head.insertAdjacentHTML('beforeend',seoMarkup(view));
  bindArticleFallbacks(main);
}
