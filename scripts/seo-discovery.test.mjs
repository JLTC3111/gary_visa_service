import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import home,{renderVietnameseHome} from '../api/home.js';
import {createSitemapHandler,readPublishedArticleSlugs} from '../api/sitemap.js';

const template=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
async function request(handler,url,method='GET'){
  const res={writeHead(status,headers){Object.assign(this,{status,headers});return this;},end(body){this.body=body;}};
  await handler({url,method},res);
  return res;
}

test('Home locale metadata and Vietnamese content are in the raw response',async()=>{
  const response=await request(home,'/vi');
  assert.equal(response.status,200);
  const en=new JSDOM(template),vi=new JSDOM(response.body);
  try{
    const original=en.window.document,translated=vi.window.document;
    assert.equal(response.body,renderVietnameseHome(template));
    assert.equal(translated.documentElement.lang,'vi');
    assert.equal(original.querySelector('link[rel=canonical]').href,'https://visa.garyhome.vn/');
    assert.equal(translated.querySelector('link[rel=canonical]').href,'https://visa.garyhome.vn/vi');
    for(const doc of [original,translated]){
      assert.equal(doc.querySelector('link[hreflang=vi]').href,'https://visa.garyhome.vn/vi');
      assert.equal(doc.querySelector('link[hreflang=en]').href,'https://visa.garyhome.vn/');
    }
    assert.match(translated.querySelector('h1').textContent,/Hành trình mới/);
    assert.equal(translated.forms.length,original.forms.length);
    for(const node of translated.querySelectorAll('[data-i18n]')){
      assert.ok(node.dataset.i18nEn, node.dataset.i18n);
    }
  }finally{en.window.close();vi.window.close();}
  assert.equal((await request(home,'/vi/?campaign=1')).headers.Location,'/vi?campaign=1');
});

test('the sitemap serves both locales from the published slugs and distinguishes failure',async()=>{
  const result=await request(createSitemapHandler(async()=>['visa-guide']),'/sitemap.xml');
  assert.match(result.headers['Content-Type'],/application\/xml/);
  const {window}=new JSDOM(result.body,{contentType:'application/xml'});
  try{
    const locations=[...window.document.querySelectorAll('loc')].map(node=>node.textContent);
    assert.deepEqual(locations,[
      'https://visa.garyhome.vn/','https://visa.garyhome.vn/vi','https://visa.garyhome.vn/en/news',
      'https://visa.garyhome.vn/vi/news','https://visa.garyhome.vn/en/news/visa-guide','https://visa.garyhome.vn/vi/news/visa-guide',
    ]);
    assert.equal(window.document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml','link').length,18);
  }finally{window.close();}
  assert.equal((await request(createSitemapHandler(async()=>{throw Error('offline');}),'/sitemap.xml')).status,503);
});

test('article sitemap paging respects a server cap below the requested range',async()=>{
  const offsets=[],slugs=['first','second','third'];
  let offset;
  const query={select(){return query;},eq(column,value){assert.equal(column,'kind');assert.equal(value,'article');return query;},
    order(){return query;},range(from){offset=from;offsets.push(from);return query;},
    async abortSignal(){return {data:slugs.slice(offset,offset+2).map(slug=>({slug})),error:null,count:offset?null:slugs.length};}};
  const rows=await readPublishedArticleSlugs({from(table){assert.equal(table,'gary_cms_public');return query;}});
  assert.deepEqual(rows,slugs);
  assert.deepEqual(offsets,[0,2]);
});
