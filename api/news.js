import {readFile} from 'node:fs/promises';
import {createClient} from '@supabase/supabase-js';
import {config} from '../dist/config.js';
import {articleFilters,eligibleArticles,newsOrigin,renderArticleDocument,validArticleSlug} from '../dist/cms-articles.js';
import {loadArticleData} from '../dist/cms-public.js';

const db=createClient(config.supabaseUrl,config.supabasePublishableKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
const shell=readFile(new URL('../dist/articles.html',import.meta.url),'utf8');
export const newsRoute=/^\/(en|vi)\/news(?:\/([^/]+))?\/?$/;

export function createNewsHandler(load=options=>loadArticleData(db,options)){
  return async function news(req,res){
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
    const url=new URL(req.url,newsOrigin),route=newsRoute.exec(url.pathname);
    // Vercel supplies the internal route parameters on a rewrite. Direct
    // preview-server requests use the locale and slug from the clean path.
    const query=req.query||Object.fromEntries(url.searchParams);
    const language=(route?.[1]??query.locale)==='vi'?'vi':'en';
    const slug=route?route[2]??null:typeof query.slug==='string'?query.slug:null;
    const filters=articleFilters(query),options={language,slug,filters};
    let status=200,data={};
    try{
      data=slug!==null&&!validArticleSlug(slug)?{entries:[]}:await load(options);
      if(slug!==null&&!eligibleArticles(data.entries).some(entry=>entry.slug===slug))status=404;
    }catch{
      status=503;data={state:'error'};
    }
    const html=renderArticleDocument(await shell,{...options,...data});
    const headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
    if(status===503)headers['Retry-After']='60';
    res.writeHead(status,headers).end(req.method==='HEAD'?undefined:html);
  };
}

export default createNewsHandler();
