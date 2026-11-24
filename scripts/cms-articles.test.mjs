import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
import {articleFilters, articlePath, bindArticleFallbacks, newsOrigin, renderArticleDocument, renderArticlePage, renderLatestArticles, validArticleSlug} from '../dist/cms-articles.js';
import {loadArticleData,loadHomepageCms,loadPublishedCms,renderPublicCms,renderServiceCms} from '../dist/cms-public.js';
import {createNewsHandler} from '../api/news.js';

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
    assert.equal(section.querySelector('.cms-news-header a').getAttribute('href'),'/vi/news');
    assert.equal(section.querySelector('article a').getAttribute('href'),'/vi/news/newest');
    assert.equal(section.querySelector('time').dateTime,'2026-01-05T00:00:00.000Z');
    assert.equal(section.querySelector('img').alt,'An approved cover');
    assert.match(section.querySelector('#article-second img').src,/\/assets\/vietnam-city.jpg$/);
    assert.match(section.querySelector('#article-second p').textContent,/short excerpt/);
    renderLatestArticles(doc,[],'en');
    assert.equal(section.hidden,false);
    assert.equal(section.querySelectorAll('article').length,0);
    assert.match(section.textContent,/New articles will appear/);
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
    assert.equal(doc.querySelector('link[rel=canonical]').href,'https://visa.example/vi/news/guide');
    assert.equal(doc.querySelector('link[hreflang=en]').href,'https://visa.example/en/news/guide');
    const structured=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
    assert.equal(structured.headline,'Hướng dẫn');
    assert.equal(structured.inLanguage,'vi');
    renderArticlePage(doc,{entries:[guide],language:'en'});
    assert.equal(doc.querySelector('h1').textContent,'News & Guides');
    assert.equal(doc.querySelector('article h2').textContent,'Title: guide');
    assert.equal(doc.querySelector('script[type="application/ld+json"]'),null);
    renderArticlePage(doc,{entries:[],slug:'guide'});
    assert.equal(doc.querySelector('meta[name=robots]').content,'noindex, follow');
    assert.match(doc.getElementById('article-content').textContent,/no longer available/);
  }finally{dom.window.close();}
});

test('direct article pages trust server-rendered HTML on load and recheck publication on refocus',async()=>{
  const guide = record('guide','2026-01-05T00:00Z');
  const dom=new JSDOM(renderArticleDocument(await html('articles.html'),{entries:[guide],slug:'guide'}),{
    url:`${newsOrigin}/en/news/guide`,runScripts:'outside-only',pretendToBeVisual:true
  });
  const w=dom.window;
  const calls=[];
  let rows=[];
  w.db={from(table){
    calls.push(['table',table]);
    return {
      select(){return this;},order(){return this;},
      lte(field,time){calls.push(['lte',field,time]);return this;},
      eq(field,value){calls.push(['eq',field,value]);return this;},
      async range(){return {data:rows};}
    };
  }};
  Object.assign(w,{loadArticleData:(db,options)=>loadPublishedCms(db,{kind:'article',slug:options.slug}).then(entries=>({entries})),
    articleFilters,articlePath,bindArticleFallbacks,newsOrigin,renderArticlePage,validArticleSlug});
  try{
    vm.runInContext(stripImports(await html('article-public-bootstrap.js')),dom.getInternalVMContext());
    await settle();
    assert.equal(w.document.querySelector('h1').textContent,'Title: guide');
    assert.equal(calls.length,0);
    w.document.dispatchEvent(new w.Event('visibilitychange'));
    await settle();
    assert.deepEqual(calls.filter(([key])=>key==='eq'),[['eq','kind','article'],['eq','slug','guide']]);
    assert.ok(Number.isFinite(Date.parse(calls.find(([key])=>key==='lte')[2])));
    assert.equal(calls.filter(([key,table])=>key==='table'&&table==='gary_cms_public').length,1);
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
  assert.equal(forwarded,'/vi/news/permit-guide');
});

test('a missing directory RPC reads existing public snapshots, while permission and transport failures still fail',async()=>{
  const guide=record('work-permit-guide','2026-01-01T00:00:00Z',{
    title_vi:'Hướng dẫn giấy phép lao động',body_vi:'Nội dung công khai.',data:{category:'work'}
  });
  const snapshot=entry=>({entry_id:entry.id,kind:entry.kind,slug:entry.slug,published_at:entry.published_at,content:entry});
  let rows=[],error={code:'PGRST202'},feedError=null;
  const reads=[];
  const db={
    async rpc(name,args){assert.equal(name,'gary_cms_article_directory');reads.push(['rpc',args]);return {error};},
    from(table){
      assert.equal(table,'gary_cms_public');
      const conditions={};
      return {
        select(){return this;},order(){return this;},
        lte(field,date){assert.equal(field,'published_at');assert.ok(Number.isFinite(Date.parse(date)));return this;},
        eq(field,value){conditions[field]=value;return this;},
        async range(){reads.push(['snapshots',conditions]);return {data:rows,error:feedError};}
      };
    }
  };
  const handler=createNewsHandler(options=>loadArticleData(db,options));
  async function request(url){
    let response={};
    await handler({url,method:'GET'},{writeHead(status,headers){response={status,headers};return this;},end(body){response.body=body;}});
    return response;
  }
  const empty=await request('/en/news');
  assert.equal(empty.status,200);
  assert.match(empty.body,/No articles have been published yet/);
  assert.doesNotMatch(empty.body,/Try again/);
  rows=[
    snapshot(guide),snapshot(record('draft-guide',guide.published_at,{status:'draft'})),
    snapshot(record('archived-guide',guide.published_at,{status:'archived'})),
    snapshot(record('future-guide','2100-01-01T00:00:00Z')),
    snapshot(record('ordinary-service',guide.published_at,{kind:'service'}))
  ];
  const route='/vi/news?q=gi%E1%BA%A5y+ph%C3%A9p&category=work';
  const listed=await request(route);
  assert.equal(listed.status,200);
  assert.match(listed.body,/href="\/vi\/news\/work-permit-guide"/);
  assert.match(listed.body,/Hướng dẫn giấy phép lao động/);
  assert.doesNotMatch(listed.body,/draft-guide|archived-guide|future-guide|ordinary-service/);
  assert.deepEqual(reads.at(-1),['snapshots',{kind:'article'}]);
  assert.deepEqual(reads.at(-2)[1],{p_search:'giấy phép',p_category:'work',p_page:1});
  const detail=await request('/vi/news/work-permit-guide');
  assert.equal(detail.status,200);
  assert.match(detail.body,/Nội dung công khai/);
  assert.deepEqual(reads.at(-1),['snapshots',{kind:'article',slug:'work-permit-guide'}]);
  assert.equal((await request('/vi/news/draft-guide')).status,404);
  const readCount=reads.length;
  error={code:'42501'};
  const denied=await request(route);
  assert.equal(denied.status,503);
  assert.equal(reads.length,readCount+1,'permission failure never falls back');
  assert.match(denied.body,/href="\/vi\/news\?q=gi%E1%BA%A5y\+ph%C3%A9p&amp;category=work">Thử lại/);
  error={code:'PGRST202'};
  feedError={code:'NETWORK'};
  assert.equal((await request('/en/news')).status,503);
  feedError=null;
  rows=null;
  assert.equal((await request('/en/news')).status,503,'malformed data is a request failure');
});

test('homepage retry restores the article feed independently of the other CMS content',async()=>{
  const guide=record('retry-guide','2026-01-02T00:00:00Z',{title_vi:'Bài hướng dẫn đã đăng'});
  const dom=new JSDOM(await html('index.html'),{url:'https://visa.example/',runScripts:'outside-only'});
  const w=dom.window;
  let newsAttempts=0;
  const db={from(){
    let articles=false;
    return {
      select(){return this;},lte(){return this;},order(){return this;},neq(){return this;},
      eq(field,value){articles=field==='kind'&&value==='article';return this;},
      async range(){
        if(!articles)return {error:{code:'NETWORK'}};
        if(++newsAttempts===1)return {error:{code:'NETWORK'}};
        return {data:[{entry_id:guide.id,kind:guide.kind,slug:guide.slug,published_at:guide.published_at,content:guide}]};
      }
    };
  }};
  w.document.documentElement.lang='vi';
  Object.assign(w,{db,loadHomepageCms,renderPublicCms,renderServiceCms,articlePath,renderLatestArticles});
  try{
    vm.runInContext(stripImports(await html('cms-public-bootstrap.js')),dom.getInternalVMContext());
    await settle();
    const section=w.document.getElementById('cms-articles'),retry=section.querySelector('[data-retry-articles]');
    assert.match(section.textContent,/tạm thời không tải được/);
    assert.doesNotMatch(section.textContent,/sau khi được xuất bản/);
    assert.equal(retry.textContent,'Thử lại');
    retry.focus();retry.click();
    await settle();
    assert.equal(newsAttempts,2);
    assert.equal(section.querySelector('article a').getAttribute('href'),'/vi/news/retry-guide');
    assert.match(section.textContent,/Bài hướng dẫn đã đăng/);
    assert.equal(section.querySelector('[data-retry-articles]'),null);
    assert.equal(w.document.activeElement.id,'cms-news-title');
    assert.equal(w.document.querySelector('#services').hidden,false,'failure in separate CMS content preserves the existing homepage');
  }finally{w.close();}
});

test('Vercel news handler sends localized SEO and article text without JavaScript, and reports missing or unavailable pages',async()=>{
  const cover='https://duyiihsmaqfgwezmsnjs.supabase.co/storage/v1/object/public/gary-cms-media/80000000-0000-4000-8000-000000000008/11111111-1111-4111-8111-111111111111.png';
  const guide=record('permit-guide','2026-01-01T00:00:00Z',{
    title_vi:'Hướng dẫn hồ sơ',seo_title_vi:'Hồ sơ cần chuẩn bị',seo_description_vi:'Các bước chuẩn bị hồ sơ.',
    body_vi:'Nội dung hướng dẫn.\n\nChi tiết tiếp theo.',data:{image_url:cover,image_alt_vi:'Giấy tờ mẫu',image_caption_vi:'Hồ sơ tham khảo'}
  });
  const load=async({slug,filters})=>{
    if(slug==='failed')throw new Error('read failed');
    if(slug==='future')return {entries:[record('future','2100-01-01T00:00:00Z')]};
    if(slug==='private-image')return {entries:[record(slug,guide.published_at,{data:{
      image_url:'https://example.test/storage/v1/object/sign/gary-documents/passport.png',
      source_url:'https://example.test/storage/v1/object/sign/gary-documents/passport.png'
    }})]};
    assert.deepEqual(filters,slug===null?{q:'hồ sơ',category:'work',page:2}:{q:'',category:'',page:1});
    return slug===null?{entries:[guide],total:20}:{entries:slug==='permit-guide'?[guide]:[]};
  };
  const handler=createNewsHandler(load);
  async function request(url,method='GET',query){
    let result={};
    await handler({url,method,query},{writeHead(status,headers){result={status,headers};return this;},end(body){result.body=body;}});
    return result;
  }
  const detail=await request('/vi/news/permit-guide');
  assert.equal(detail.status,200);
  assert.equal(detail.headers['Cache-Control'],'no-store');
  const dom=new JSDOM(detail.body);
  try{
    const doc=dom.window.document;
    assert.equal(doc.documentElement.lang,'vi');
    assert.equal(doc.title,'Hồ sơ cần chuẩn bị');
    assert.equal(doc.querySelector('meta[name=description]').content,'Các bước chuẩn bị hồ sơ.');
    assert.equal(doc.querySelector('h1').textContent,'Hướng dẫn hồ sơ');
    assert.match(doc.querySelector('.cms-article-body').textContent,/Chi tiết tiếp theo/);
    assert.equal(doc.querySelector('link[rel=canonical]').href,`${newsOrigin}/vi/news/permit-guide`);
    assert.equal(doc.querySelector('[hreflang="en"]').href,`${newsOrigin}/en/news/permit-guide`);
    assert.equal(doc.querySelector('img[data-article-cover]').alt,'Giấy tờ mẫu');
    assert.equal(doc.querySelector('figcaption').textContent,'Hồ sơ tham khảo');
  }finally{dom.window.close();}
  const english=await request('/api/news','GET',{locale:'en',slug:'permit-guide'});
  assert.equal(english.status,200);
  assert.match(english.body,/hreflang="vi" href="https:\/\/visa.garyhome.vn\/vi\/news\/permit-guide"/);
  const archive=await request('/vi/news?q=h%E1%BB%93+s%C6%A1&category=work&page=2');
  assert.match(archive.body,/\/vi\/news\?q=h%E1%BB%93\+s%C6%A1&amp;category=work&amp;page=3/);
  assert.match(archive.body,/noindex, follow/);
  const privateImage=await request('/en/news/private-image');
  assert.match(privateImage.body,/vietnam-city\.jpg/);
  assert.doesNotMatch(privateImage.body,/passport\.png/);
  for(const slug of ['future','archived','a%2Fb'])assert.equal((await request('/en/news/'+slug)).status,404);
  assert.equal((await request('/en/news/failed')).status,503);
  assert.equal((await request('/vi/news/permit-guide','HEAD')).body,undefined);
});
