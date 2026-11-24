import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {JSDOM} from 'jsdom';
import {vi} from '../dist/content.js';
import {portalCopy} from '../dist/portal-copy.js';
import {chatCopy} from '../dist/chat-copy.js';
import {articlePath} from '../dist/cms-articles.js';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const pages=['index.html','portal.html','articles.html'];
const newsDirectories=new Set(['en','vi'].map(locale=>articlePath(locale)));
const {rewrites}=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
for(const [source,destination] of [
 ['/:locale(en|vi)/news','/api/news?locale=:locale'],
 ['/:locale(en|vi)/news/:slug','/api/news?locale=:locale&slug=:slug']
]){
 assert.ok(rewrites?.some(rule=>rule.source===source&&rule.destination===destination),`missing news rewrite: ${source}`);
}
assert.ok((await stat(new URL('../api/news.js',import.meta.url))).isFile(),'missing news route handler');
let checked=0,routeLinks=0;
for(const page of pages){
 const html=await readFile(resolve(root,page),'utf8');const doc=new JSDOM(html).window.document;
 assert.equal(doc.querySelectorAll('h1').length>=1,true,`${page}: primary heading`);
 assert.ok(doc.querySelector('meta[name=viewport]'));assert.ok(doc.querySelector('title').textContent.includes('Gary Agency'));
 assert.ok(doc.querySelector('meta[http-equiv=Content-Security-Policy]'));
 const ids=new Set();for(const node of doc.querySelectorAll('[id]')){assert.ok(!ids.has(node.id),`${page}: duplicate ID ${node.id}`);ids.add(node.id)}
 for(const node of doc.querySelectorAll('[src],[href]'))for(const name of ['src','href']){
  const value=node.getAttribute(name);if(!value)continue;
  if(value.startsWith('#')){if(value.length>1)assert.ok(ids.has(value.slice(1)),`${page}: missing anchor ${value}`);continue}
  if(/^(https?:|mailto:|tel:|data:)/.test(value))continue;
  const pathname=value.split(/[?#]/)[0];
  if(name==='href'&&node.matches('a')&&newsDirectories.has(pathname)){routeLinks++;continue;}
  const path=resolve(root,pathname==='/'?'index.html':pathname.replace(/^\//,''));assert.ok(path.startsWith(root),`asset outside dist: ${value}`);assert.ok((await stat(path)).isFile(),`${page}: missing ${value}`);checked++;
 }
 for(const link of doc.querySelectorAll('[target=_blank]'))assert.ok(link.rel.includes('noopener'),`${page}: new tab link missing noopener`);
 for(const node of doc.querySelectorAll('[data-c]'))for(const language of ['en','vi'])assert.ok(node.dataset.c in chatCopy[language],`missing ${language} chat copy: ${node.dataset.c}`);
 for(const node of doc.querySelectorAll('[data-c-placeholder]'))for(const language of ['en','vi'])assert.ok(node.dataset.cPlaceholder in chatCopy[language],`missing ${language} chat placeholder`);
 for(const node of doc.querySelectorAll('input:not([type=hidden]),select,textarea'))assert.ok(node.id&&node.labels.length,`${page}: missing input label ${node.id}`);
 if(page==='index.html'){
  for(const node of doc.querySelectorAll('[data-i18n]'))assert.ok(node.dataset.i18n in vi,`missing Vietnamese copy: ${node.dataset.i18n}`);
  for(const kind of ['aria','alt','placeholder'])for(const node of doc.querySelectorAll(`[data-i18n-${kind}]`)){const key=node.getAttribute(`data-i18n-${kind}`);assert.ok(key in vi,`missing Vietnamese attribute: ${key}`)}
 }else if(page==='portal.html'){
  for(const node of doc.querySelectorAll('[data-p]'))assert.ok(node.dataset.p in portalCopy.vi,`missing portal Vietnamese: ${node.dataset.p}`);
  for(const node of doc.querySelectorAll('[data-p-placeholder]'))assert.ok(node.dataset.pPlaceholder in portalCopy.vi,`missing portal placeholder: ${node.dataset.pPlaceholder}`);
 }
}
for(const key of Object.keys(portalCopy.en))assert.ok(key in portalCopy.vi,`missing dynamic portal Vietnamese: ${key}`);
for(const name of ['vietnam-city.jpg','vietnam-landscape.jpg'])assert.ok((await stat(resolve(root,'assets',name))).size>2000,`invalid image ${name}`);
const font=await readFile(resolve(root,'assets/dm-sans.ttf'));assert.ok(font.length>10000&&font.readUInt32BE(0)===0x00010000,'valid local TrueType font');
for(const name of ['be-vietnam-pro-400.woff2','be-vietnam-pro-500.woff2','be-vietnam-pro-600.woff2','be-vietnam-pro-700.woff2']){
 const file=await readFile(resolve(root,'assets',name));
 assert.ok(file.length>5000&&file.subarray(0,4).toString()==='wOF2',`valid Vietnamese woff2 ${name}`);
}
for(const name of await readdir(root)){if(name.endsWith('.js')){const text=await readFile(resolve(root,name),'utf8');assert.ok(!/sb_secret_[A-Za-z0-9_-]{10,}/.test(text),`secret key in ${name}`)}}
console.log(`Checked ${pages.length} pages, ${checked} asset references, ${routeLinks} news route links, labels, translations and public-client configuration.`);
