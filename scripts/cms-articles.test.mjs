import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import {articlePath, renderArticlePage, renderLatestArticles, validArticleSlug} from '../dist/cms-articles.js';
import {loadPublishedCms} from '../dist/cms-public.js';

const record=(slug,published_at,extra={})=>({
  id:slug,kind:'article',slug,published_at,title_en:`Title: ${slug}`,body_en:'The first paragraph.\n\nThe second paragraph.',
  summary_en:'A short excerpt.',data:{},...extra
});
const source = '../dist/';
const html = name => readFile(new URL(source+name,import.meta.url),'utf8');
const stripImports=source=>source.replace(/^import .*;\n/gm,'');
const settle=()=>new Promise(resolve=>setImmediate(resolve));

test('the homepage shows three newest eligible articles with covers, dates and archive links',async()=>{
  const dom=new JSDOM(await html('index.html'),{url:'https://visa.example/'});
  const {document:doc}=dom.window;
  try{
    const rows=[
      record('old','2026-01-01T00:00Z'),record('third','2026-01-02T00:00Z'),
      record('newest','2026-01-05T00:00Z',{title_vi:'Bài mới nhất',data:{image_url:'/assets/approved.webp',image_alt_en:'An approved cover'}}),
      record('second','2026-01-03T00:00Z',{data:{position:999,image_url:'javascript:alert(1)'}}),
      record('future','2100-01-01T00:00Z'),record('gone','2026-01-12T00:00Z',{deleted_at:'2026-01-13T00:00Z'}),
      record('draft','2026-01-12T00:00Z',{status:'draft'}),record('archived','2026-01-12T00:00Z',{status:'archived'}),
      record('case','2026-01-12T00:00Z',{kind:'application'}),record('unscheduled',null)
    ];
    renderLatestArticles(doc,rows,'vi');
    const section=doc.getElementById('cms-articles');
    assert.deepEqual([...section.querySelectorAll('article')].map(node=>node.id),['article-newest','article-second','article-third']);
    assert.match(section.querySelector('h2').textContent,/Tin tức/);
    assert.match(section.querySelector('h3').textContent,/Bài mới nhất/);
    assert.equal(section.querySelector('.cms-news-header a').getAttribute('href'),'/articles.html?lang=vi');
    assert.equal(section.querySelector('article a').getAttribute('href'),'/articles.html?article=newest&lang=vi');
    assert.equal(section.querySelector('time').dateTime,'2026-01-05T00:00:00.000Z');
    assert.equal(section.querySelector('img').alt,'An approved cover');
    assert.match(section.querySelector('#article-second img').src,/\/assets\/vietnam-city.jpg$/);
    assert.match(section.querySelector('#article-second p').textContent,/short excerpt/);
    renderLatestArticles(doc,[],'en');
    assert.equal(section.hidden,true);
    assert.equal(section.querySelectorAll('article').length,0);
  }finally{dom.window.close();}
});

test('archive and detail render localized fallback copy, safe paragraphs and per-route SEO',async()=>{
  const dom=new JSDOM(await html('articles.html'),{url:'https://visa.example/articles.html?article=guide&lang=vi'});
  const {document:doc}=dom.window;
  const guide=record('guide','2026-01-05T00:00Z',{title_vi:'Hướng dẫn',seo_description_en:'An approved description.',
    body_vi:'Đoạn đầu.\n\n<img src=x onerror=alert(1)>',data:{source_url:'https://example.test/reference'}});
  try{
    renderArticlePage(doc,{entries:[guide],language:'vi',slug:'guide'});
    assert.equal(doc.querySelector('h1').textContent,'Hướng dẫn');
    assert.equal(doc.querySelector('.cms-article-body img[src="x"]'),null);
    assert.match(doc.querySelector('.cms-article-body p:last-of-type').textContent,/<img src=x/);
    assert.equal(doc.querySelector('meta[name=description]').content,'An approved description.');
    assert.equal(doc.querySelector('meta[property="og:type"]').content,'article');
    assert.equal(doc.querySelector('link[rel=canonical]').href,'https://visa.example/articles.html?article=guide&lang=vi');
    assert.equal(doc.querySelector('link[hreflang=en]').href,'https://visa.example/articles.html?article=guide&lang=en');
    const structured=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
    assert.equal(structured.headline,'Hướng dẫn');
    assert.equal(structured.inLanguage,'vi');
    renderArticlePage(doc,{entries:[guide],language:'en'});
    assert.equal(doc.querySelector('h1').textContent,'News & Insights');
    assert.equal(doc.querySelector('article h2').textContent,'Title: guide');
    assert.equal(doc.querySelector('script[type="application/ld+json"]'),null);
    renderArticlePage(doc,{entries:[],slug:'guide'});
    assert.equal(doc.querySelector('meta[name=robots]').content,'noindex, follow');
    assert.match(doc.getElementById('article-content').textContent,/no longer available/);
  }finally{dom.window.close();}
});

test('direct article routes reread the published snapshot on return and remove unpublished content',async()=>{
  const dom=new JSDOM(await html('articles.html'),{
    url:'https://visa.example/articles.html?article=guide&lang=en',runScripts:'outside-only',pretendToBeVisual:true
  });
  const w=dom.window;
  const calls=[];
  const guide = record('guide','2026-01-05T00:00Z');
  let rows=[{entry_id:'public-guide',kind:'article',slug:'guide',published_at:guide.published_at,content:guide}];
  w.db={from(table){
    calls.push(['table',table]);
    return {
      select(){return this;},order(){return this;},
      lte(field,time){calls.push(['lte',field,time]);return this;},
      eq(field,value){calls.push(['eq',field,value]);return this;},
      async range(){return {data:rows};}
    };
  }};
  Object.assign(w,{loadPublishedCms,articlePath,renderArticlePage,validArticleSlug});
  try{
    vm.runInContext(stripImports(await html('article-public-bootstrap.js')),dom.getInternalVMContext());
    await settle();
    assert.equal(w.document.querySelector('h1').textContent,'Title: guide');
    assert.deepEqual(calls.filter(([key])=>key==='eq'),[['eq','kind','article'],['eq','slug','guide']]);
    assert.ok(Number.isFinite(Date.parse(calls.find(([key])=>key==='lte')[2])));
    rows=[];
    w.document.dispatchEvent(new w.Event('visibilitychange'));
    await settle();
    assert.equal(calls.filter(([key,table])=>key==='table'&&table==='gary_cms_public').length,2);
    assert.equal(w.document.querySelector('.cms-article-body'),null);
    assert.equal(w.document.querySelector('meta[name=robots]').content,'noindex, follow');
  }finally{w.close();}
});

test('the legacy homepage article URL forwards to the same article and language',async()=>{
  let forwarded;
  vm.runInNewContext(stripImports(await html('cms-public-bootstrap.js')),{
    document:{documentElement:{lang:'vi'}},
    location:{href:'https://visa.example/?article=permit-guide&lang=vi',replace:value=>{forwarded=value;}},
    URL,articlePath
  });
  assert.equal(forwarded,'/articles.html?article=permit-guide&lang=vi');
});
