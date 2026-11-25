import {createClient} from '@supabase/supabase-js';
import {config} from '../dist/config.js';
import {articlePath,validArticleSlug} from '../dist/cms-articles.js';
import {homePath,visaOrigin} from '../dist/home-seo.js';

const db=createClient(config.supabaseUrl,config.supabasePublishableKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});

export async function readPublishedArticleSlugs(client) {
  const slugs=[],signal=AbortSignal.timeout(8000);
  let total=null;
  for(let offset=0;offset<50000;){
    const {data,error,count}=await client.from('gary_cms_public').select('slug',offset===0?{count:'exact'}:{})
      .eq('kind','article').order('slug').range(offset,offset+199).abortSignal(signal);
    if(error)throw error;
    if(!Array.isArray(data)||data.some(row=>!validArticleSlug(row?.slug)))throw new Error('Invalid article sitemap data');
    slugs.push(...data.map(row=>row.slug));
    offset+=data.length;
    if(typeof count==='number')total=count;
    if(!data.length||total!==null&&offset>=total)return slugs;
  }
  throw new Error('Article sitemap exceeds its URL limit');
}

export function visaSitemap(slugs) {
  const localizedPairs=[homePath,...[null,...new Set(slugs)].map(slug=>lang=>articlePath(lang,slug))];
  const body=localizedPairs.map(path=>{
    const en=visaOrigin+path('en'),vi=visaOrigin+path('vi');
    const links=[['en',en],['vi',vi],['x-default',en]].map(([lang,href])=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`).join('');
    return [en,vi].map(url=>`<url><loc>${url}</loc>${links}</url>`).join('');
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}</urlset>\n`;
}

export function createSitemapHandler(load=()=>readPublishedArticleSlugs(db)) {
  return async function sitemap(req,res) {
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
    try {
      const xml=visaSitemap(await load());
      res.writeHead(200,{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-store'}).end(req.method==='HEAD'?undefined:xml);
    } catch {
      res.writeHead(503,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store','Retry-After':'60'}).end(req.method==='HEAD'?undefined:'Sitemap temporarily unavailable');
    }
  };
}
export default createSitemapHandler();
