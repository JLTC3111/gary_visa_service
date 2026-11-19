import {safeMediaUrl} from './cms-foundation/content.js';
import {config} from './config.js';

const fallbackCover = '/assets/vietnam-city.jpg';
const storageOrigin = new URL(config.supabaseUrl).origin;
const titleFor = (entry, language) => localized(entry, 'title', language);

function element(doc, tag, text='', attributes={}) {
  const node = doc.createElement(tag);
  node.textContent = text;
  for (const [name,value] of Object.entries(attributes)) node.setAttribute(name,value);
  return node;
}

function localized(entry, field, language) {
  const other = language === 'vi' ? 'en' : 'vi';
  return String(entry?.[`${field}_${language}`] ?? '').trim()
    || String(entry?.[`${field}_${other}`] ?? '').trim();
}

export function validArticleSlug(slug) {
  return typeof slug === 'string' && slug.length <= 180 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function articlePath(language, slug = null) {
  const query = new URLSearchParams();
  if (slug !== null) query.set('article', slug);
  query.set('lang', language === 'vi' ? 'vi' : 'en');
  return `/articles.html?${query}`;
}

export function eligibleArticles(entries, now=Date.now()) {
  return entries.filter(entry => {
    const published = Date.parse(entry.published_at);
    return entry.kind === 'article' && validArticleSlug(entry.slug) && titleFor(entry,'en')
      && !entry.deleted_at && (!entry.status || entry.status === 'published')
      && Number.isFinite(published) && published <= now;
  }).sort((a,b) => Date.parse(b.published_at) - Date.parse(a.published_at) || a.slug.localeCompare(b.slug));
}

function coverFor(doc, entry, language) {
  const src = safeMediaUrl(entry.data?.image_url);
  const origin = new URL(doc.location.href).origin;
  if (src) {
    const url = new URL(src, origin);
    if (url.origin === origin || (url.origin === storageOrigin && url.pathname.startsWith('/storage/v1/object/public/gary-cms-media/'))) {
      return {src:url.href, alt:localized(entry.data,'image_alt',language)};
    }
  }
  return {src:new URL(fallbackCover, origin).href, alt:''};
}

function excerpt(entry, language) {
  const value = (localized(entry,'summary',language) || localized(entry,'body',language)).replace(/\s+/gu,' ');
  if ([...value].length <= 180) return value;
  const cut = [...value].slice(0,179).join('');
  const space = cut.lastIndexOf(' ');
  return (space > 120 ? cut.slice(0,space) : cut).trimEnd() + '…';
}

function dateLabel(doc, entry, language) {
  const date = new Date(entry.published_at);
  const formatter = new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-GB', {
    dateStyle:'medium', timeZone:'Asia/Ho_Chi_Minh'
  });
  return element(doc,'time',formatter.format(date),{datetime:date.toISOString()});
}

function articleImage(doc, entry, language, lazy = true) {
  const image = element(doc,'img','',{...coverFor(doc,entry,language), decoding:'async', ...(lazy?{loading:'lazy'}:{})});
  image.addEventListener('error', () => { image.src=fallbackCover; image.alt=''; }, {once:true});
  return image;
}

function card(doc, entry, language, heading) {
  const section = element(doc,'article','',{class:'cms-news-card',id:`article-${entry.slug}`});
  const link = element(doc,'a','',{href:articlePath(language,entry.slug),class:'cms-news-link'});
  const body = element(doc,'div','',{class:'cms-news-card-body'});
  const excerptText = excerpt(entry,language);
  body.append(dateLabel(doc,entry,language),element(doc,heading,titleFor(entry,language)));
  if (excerptText) body.append(element(doc,'p',excerptText));
  link.append(articleImage(doc,entry,language),body);
  section.append(link);
  return section;
}

export function renderLatestArticles(doc, entries, language) {
  let section = doc.getElementById('cms-articles');
  if (!section) {
    section = element(doc,'section','',{id:'cms-articles',class:'section cms-public-articles','aria-labelledby':'cms-news-title'});
    doc.getElementById('faq')?.before(section);
  }
  const rows = eligibleArticles(entries).slice(0,3);
  section.hidden = !rows.length;
  section.replaceChildren();
  if (!rows.length) return;
  const inner = element(doc,'div','',{class:'container'});
  const header = element(doc,'div','',{class:'cms-news-header'});
  header.append(element(doc,'h2',language==='vi'?'Tin tức & Góc nhìn mới nhất':'Latest News & Insights',{id:'cms-news-title'}),
    element(doc,'a',language==='vi'?'Xem tất cả':'View all',{href:articlePath(language),class:'service-link'}));
  const grid = element(doc,'div','',{class:'cms-news-grid'});
  grid.append(...rows.map(entry=>card(doc,entry,language,'h3')));
  inner.append(header,grid);
  section.append(inner);
}

export function renderArticlePage(doc, {entries=[], language='en', slug=null, state='ready'} = {}) {
  const root = doc.getElementById('article-content');
  const t = (en,vi) => language === 'vi' ? vi : en;
  const name = t('News & Insights','Tin tức & Góc nhìn');
  const rows = eligibleArticles(entries);
  const entry = state === 'ready' && slug !== null ? rows.find(item=>item.slug===slug) : null;
  const missing = state === 'ready' && slug !== null && !entry;
  const title = entry ? titleFor(entry,language) : missing ? t('Article unavailable','Bài viết không khả dụng') : name;
  root.replaceChildren();
  root.setAttribute('aria-busy',String(state==='loading'));
  if (slug !== null) root.append(element(doc,'a',t('All news & insights','Tất cả tin tức & góc nhìn'),{href:articlePath(language),class:'service-link cms-article-back'}));
  root.append(element(doc,'h1',title));
  if (state === 'loading' || state === 'error' || missing || !rows.length) {
    const message = state==='loading' ? t('Loading articles…','Đang tải bài viết…')
      : state==='error' ? t('Articles are temporarily unavailable.','Bài viết hiện tạm thời không tải được.')
      : missing ? t('This article is no longer available.','Bài viết này hiện không còn khả dụng.')
      : t('No articles have been published yet.','Chưa có bài viết nào được xuất bản.');
    root.append(element(doc,'p',message,{role:'status'}));
  } else if (entry) {
    const article = element(doc,'article','',{class:'cms-article-body'});
    const authorSummary = localized(entry,'summary',language);
    const body = localized(entry,'body',language);
    const paragraphs = body.split(/\n\s*\n/u).map(text=>text.trim()).filter(Boolean);
    article.append(dateLabel(doc,entry,language),articleImage(doc,entry,language,false));
    if (authorSummary && authorSummary!==paragraphs[0]) article.append(element(doc,'p',authorSummary,{class:'cms-article-summary'}));
    for (const paragraph of paragraphs) article.append(element(doc,'p',paragraph));
    const reference = safeMediaUrl(entry.data?.source_url);
    if (reference.startsWith('https://')) article.append(element(doc,'a',t('Reference source','Nguồn tham khảo'),{href:reference,target:'_blank',rel:'noopener noreferrer'}));
    root.append(article);
  } else {
    const grid = element(doc,'div','',{class:'cms-news-grid'});
    grid.append(...rows.map(item=>card(doc,item,language,'h2')));
    root.append(grid);
  }
  articleSeo(doc,{entry,title,language,slug,missing});
}

function articleSeo(doc,{entry,title,language,slug,missing}) {
  const origin = doc.location.origin;
  const canonical = new URL(articlePath(language,slug),origin).href;
  const description = (entry && (localized(entry,'seo_description',language) || excerpt(entry,language))) ||
    (language==='vi'?'Tin tức và hướng dẫn về visa, giấy phép lao động và cư trú tại Việt Nam.':'News and guides on visas, work permits and residence in Vietnam.');
  const image = entry ? coverFor(doc,entry,language).src : new URL(fallbackCover,origin).href;
  doc.title = localized(entry,'seo_title',language) || `${title} | Gary Agency`;
  const meta = (attribute,key,content) => {
    let node = doc.head.querySelector(`meta[${attribute}="${key}"]`);
    if (!node) {node=element(doc,'meta','',{[attribute]:key});doc.head.append(node);}
    node.content=content;
  };
  meta('name','description',description);
  meta('name','robots',missing?'noindex, follow':'index, follow');
  for (const [key,value] of Object.entries({title:doc.title,description,image,url:canonical,type:entry?'article':'website',locale:language==='vi'?'vi_VN':'en_GB'}))
    meta('property',`og:${key}`,value);
  for (const [key,value] of Object.entries({title:doc.title,description,image,card:'summary_large_image'}))
    meta('name',`twitter:${key}`,value);
  for (const node of doc.head.querySelectorAll('[data-article-url]')) node.remove();
  doc.head.append(element(doc,'link','',{rel:'canonical',href:canonical,'data-article-url':''}));
  for (const alternate of ['en','vi','x-default']) doc.head.append(element(doc,'link','',{
    rel:'alternate',hreflang:alternate,href:new URL(articlePath(alternate,slug),origin).href,'data-article-url':''
  }));
  if (entry) doc.head.append(element(doc,'script',JSON.stringify({
    '@context':'https://schema.org','@type':'Article',headline:titleFor(entry,language),description,
    inLanguage:language,datePublished:new Date(entry.published_at).toISOString(),image,
    mainEntityOfPage:canonical,publisher:{'@type':'Organization',name:'Gary Agency'}
  }),{type:'application/ld+json','data-article-url':''}));
}
