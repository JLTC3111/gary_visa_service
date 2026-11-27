import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {JSDOM} from 'jsdom';
import {initFormControls} from '../dist/form-controls.js';

async function publicPage(){
 const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
 const dom=new JSDOM(html,{url:'https://visa.garyhome.vn/',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window;
 w.matchMedia=()=>({matches:false,addEventListener(){}});
 w.HTMLElement.prototype.scrollIntoView=function(){};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};
 w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'))};
 const errors=[];w.addEventListener('error',event=>errors.push(event.error||event.message));
 const bundle=await build({entryPoints:['dist/app.js'],bundle:true,write:false,format:'iife',platform:'browser'});
 w.eval(bundle.outputFiles[0].text);return {dom,w,d:w.document,errors};
}

test('Visa service discovery sits below the cinematic hero and keeps details and enquiry journey',async()=>{
 const h=await publicPage();try{
  const {d,w}=h,hero=d.querySelector('.visa-service-discovery'),select=d.querySelector('#hero-service');
  assert.equal(hero.querySelector('img'),null,'Decorative hero photography no longer displaces service discovery');
  assert.equal(hero.querySelector('.hero-ticket'),null);
  assert.equal(hero.querySelectorAll('.hero-journey li').length,3);
  assert.equal(select.options.length,4);assert.ok(d.querySelector('label[for="hero-service"]'));
  const workOption=select.options[1];
  select.value='work';select.dispatchEvent(new w.Event('change',{bubbles:true}));
  assert.equal(select.selectedOptions[0],workOption,'choosing a service keeps the existing select options');
  assert.equal(d.querySelector('#hero-service-title').textContent,'Work permits');
  d.querySelector('#hero-service-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  assert.equal(d.querySelector('#service-dialog').open,true);
  assert.equal(d.querySelector('#service-dialog-title').textContent,'Work permits');
  d.querySelector('#service-enquire').click();assert.equal(d.querySelector('#enquiry-service').value,'work');
  assert.equal(d.activeElement.id,'enquiry-name');
  assert.equal(d.querySelector('#hero-customer-portal').href,'https://visa.garyhome.vn/portal.html');
  assert.equal(d.querySelector('.hero-home-link').href,'https://garyhome.vn/');
 }finally{h.dom.window.close();assert.deepEqual(h.errors,[])}
});

test('Visa service selector preserves the chosen service through English/Vietnamese changes',async()=>{
 const h=await publicPage();try{
  const {d,w}=h,select=d.querySelector('#hero-service');select.value='residence';select.dispatchEvent(new w.Event('change',{bubbles:true}));
  d.querySelector('[data-lang="vi"]').click();
  assert.equal(d.documentElement.lang,'vi');assert.equal(select.value,'residence');
  assert.match(d.querySelector('meta[name="description"]').content,/Hỗ trợ visa/);assert.equal(d.querySelector('meta[property="og:description"]').content,d.querySelector('meta[name="description"]').content);
  assert.equal(d.querySelector('#hero-service-title').textContent,'Thẻ tạm trú');
  assert.match(d.querySelector('#hero-selector-title').textContent,/Bạn cần hỗ trợ/);
  assert.match(d.querySelector('.hero-journey').textContent,/Bắt đầu hồ sơ của bạn/);
  d.querySelector('#hero-service-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  assert.equal(d.querySelector('#service-dialog-title').textContent,'Thẻ tạm trú');
  d.querySelector('[data-lang="en"]').click();assert.equal(select.value,'residence');
  assert.equal(d.querySelector('#service-dialog-title').textContent,'Residence cards');
 }finally{h.dom.window.close();assert.deepEqual(h.errors,[])}
});

test('Visa hero follows published CMS services, handles new types safely and never invents unavailable services',async()=>{
 const h=await publicPage();try{
  const {d,w}=h,service={id:'cms-service',kind:'service',slug:'employer-support',title_en:'Employer support <script>',title_vi:'Hỗ trợ doanh nghiệp',summary_en:'Published employer document support.',summary_vi:'Hỗ trợ hồ sơ doanh nghiệp đã được đăng.',body_en:'Current service details.',body_vi:'Chi tiết dịch vụ hiện tại.',data:{service_type:'work',includes_en:['Company document review'],includes_vi:['Xem xét hồ sơ doanh nghiệp']}};
  d.dispatchEvent(new w.CustomEvent('gary:cms-ready',{detail:{entries:[service]}}));
  const select=d.querySelector('#hero-service');assert.equal(select.options.length,1);assert.equal(select.value,service.slug);
  assert.equal(d.querySelector('#hero-service-title').textContent,service.title_en);
  assert.equal(d.querySelector('#hero-service-title script'),null);
  d.querySelector('#hero-service-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  assert.equal(d.querySelector('#service-dialog-title').textContent,service.title_en);
  d.querySelector('#service-enquire').click();assert.equal(d.querySelector('#enquiry-service').value,'work');
  d.dispatchEvent(new w.CustomEvent('gary:cms-ready',{detail:{entries:[]}}));
  assert.equal(select.options.length,0);assert.equal(select.disabled,true);assert.equal(d.querySelector('#hero-review-service').disabled,true);
  assert.match(d.querySelector('#hero-service-summary').textContent,/No services are published/);
  d.querySelector('[data-lang="vi"]').click();assert.match(d.querySelector('#hero-service-summary').textContent,/Chưa có dịch vụ/);
 }finally{h.dom.window.close();assert.deepEqual(h.errors,[])}
});

test('hero selection stays synchronized with the existing CMS detail and enquiry controller',async()=>{
 const h=await publicPage();try{
  const {d,w}=h,{renderPublicCms,renderServiceCms}=await import('../dist/cms-public.js');
  const {renderLatestArticles}=await import('../dist/cms-articles.js');
  const service=(slug,en,vi,type)=>({id:slug,kind:'service',slug,title_en:en,title_vi:vi,summary_en:'Current published service support.',summary_vi:'Hỗ trợ dịch vụ đã được đăng.',body_en:'Service information.',body_vi:'Thông tin dịch vụ.',data:{service_type:type,includes_en:['Document review'],includes_vi:['Xem xét hồ sơ']}});
  const entries=[service('visa','Visa services','Dịch vụ visa','visa'),service('employer-support','Employer support','Hỗ trợ doanh nghiệp','work'),{id:'hero',kind:'landing',slug:'hero',title_en:'Visa and residence.',title_vi:'Visa và lưu trú.',summary_en:'Review your service options.',summary_vi:'Tìm hiểu các dịch vụ phù hợp.',data:{slot:'hero'}}];
  w.__cms={
   db:{},loadHomepageCms:async()=>({content:entries,news:{entries:[],state:'ready'}}),
   renderPublicCms,renderServiceCms,renderLatestArticles
  };
  const source=(await readFile(new URL('../dist/cms-public-bootstrap.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'');
  await w.eval(`(async()=>{const {db,loadHomepageCms,renderPublicCms,renderServiceCms,renderLatestArticles}=window.__cms;${source}})()`);
  d.querySelector('[data-open-cms-service="visa"]').click();d.querySelector('[data-close-dialog="service-dialog"]').click();
  d.querySelector('#hero-service').value='employer-support';d.querySelector('#hero-service').dispatchEvent(new w.Event('change',{bubbles:true}));
  d.querySelector('#hero-review-service').click();assert.equal(d.querySelector('#service-dialog-title').textContent,'Employer support');
  d.querySelector('[data-lang="vi"]').click();assert.equal(d.querySelector('#service-dialog-title').textContent,'Hỗ trợ doanh nghiệp');
  d.querySelector('#service-enquire').click();assert.equal(d.querySelector('#enquiry-service').value,'work');
 }finally{h.dom.window.close();assert.deepEqual(h.errors,[])}
});
test('hero service selection supports keyboard type-ahead and opens the selected service',async()=>{
 const h=await publicPage(),controls=initFormControls(h.d);
 try{
  const {d,w}=h,select=d.querySelector('#hero-service');select.focus();select.click();
  select.dispatchEvent(new w.KeyboardEvent('keydown',{key:'w',bubbles:true,cancelable:true}));
  select.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));
  assert.equal(select.value,'work');assert.equal(d.querySelector('#hero-service-title').textContent,'Work permits');
  assert.equal(d.querySelector('#site-select-menu').hidden,true);
  d.querySelector('#hero-review-service').click();
  assert.equal(d.querySelector('#service-dialog-title').textContent,'Work permits');
  assert.equal(d.querySelector('#service-dialog').open,true);
 }finally{controls.close();h.dom.window.close();assert.deepEqual(h.errors,[])}
});
