import {readFile} from 'node:fs/promises';
import {ui,vi} from '../dist/content.js';
import {homeSeo,visaOrigin} from '../dist/home-seo.js';

const shell = readFile(new URL('../dist/index.html',import.meta.url),'utf8');
const escape = text => String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const translate = key => vi[key] ?? ui.vi[key] ?? ui.en[key];

// The template owns the translation markers. Keep the original English values
// so the browser can switch languages in place without rebuilding the form.
export function renderVietnameseHome(html) {
  const {title,description,url,locale}=homeSeo('vi');
  return html.replace('<html lang="en">','<html lang="vi">')
    .replace(/<title>[^<]*<\/title>/,()=>`<title>${escape(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/,(_,start,end)=>start+url+end)
    .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*(")/g,(_,start,end)=>start+escape(description)+end)
    .replace(/(<meta property="og:(title|url|locale)" content=")[^"]*(")/g,(_,start,key,end)=>start+escape({title,url,locale}[key])+end)
    .replace(/<([\w-]+)([^<>]*\sdata-i18n="([\w.-]+)"[^<>]*)>([\s\S]*?)<\/\1>/g,(whole,tag,attrs,key,text)=>{
      const value=translate(key);
      if(typeof value!=='string')return whole;
      const original=text.replace(/<br\s*\/?\s*>/gi,'\n').replace(/<[^>]+>/g,'').trim().replaceAll('"','&quot;');
      return `<${tag}${attrs} data-i18n-en="${original}">${escape(value)}</${tag}>`;
    })
    .replace(/<[\w-]+(?:\s[^<>]*)?>/g,tag=>{
      for(const [kind,attr] of [['placeholder','placeholder'],['aria','aria-label'],['alt','alt']]){
        const key=tag.match(new RegExp(`\\sdata-i18n-${kind}="([\\w.-]+)"`))?.[1],value=key&&translate(key);
        if(typeof value!=='string')continue;
        tag=tag.replace(new RegExp(`(\\s${attr}=")([^"]*)"`),(_,start,original)=>`${start}${escape(value)}" data-i18n-${kind}-en="${original}"`);
      }
      return tag;
    })
    .replace(/(<button\b[^>]*data-lang="(en|vi)"[^>]*aria-pressed=")(?:true|false)(")/g,(_,start,lang,end)=>start+(lang==='vi')+end);
}

export default async function home(req,res) {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{Allow:'GET, HEAD'}).end(); return; }
  const url=new URL(req.url,visaOrigin);
  if (url.pathname==='/vi/') { res.writeHead(308,{Location:'/vi'+url.search}).end(); return; }
  const html=renderVietnameseHome(await shell);
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'public, max-age=0, must-revalidate','X-Content-Type-Options':'nosniff'})
    .end(req.method==='HEAD'?undefined:html);
}
