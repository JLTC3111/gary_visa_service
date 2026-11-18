import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {mountPortalTheme} from '../dist/portal-theme.js';
import {mountPortalEditors} from '../dist/portal-editors.js';
import {mountStaffSidebar} from '../dist/staff-sidebar.js';
const html=await readFile(new URL('../dist/portal.html',import.meta.url),'utf8');
const init=await readFile(new URL('../dist/appearance-init.js',import.meta.url),'utf8');
const scope=await readFile(new URL('../dist/portal-theme-init.js',import.meta.url),'utf8');
const css=await readFile(new URL('../dist/portal-theme.css',import.meta.url),'utf8');
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function harness({theme='system',dark=false,lang='en',role='staff',width=1440,stored=true}={}){
 const dom=new JSDOM(html,{url:'https://visa.garyhome.vn/portal.html?area=staff',pretendToBeVisual:true,runScripts:'outside-only'}),w=dom.window,d=w.document;
 Object.defineProperty(w,'innerWidth',{value:width,writable:true});Object.defineProperty(w,'innerHeight',{value:960,writable:true});
 const queries=new Map();w.matchMedia=query=>{if(!queries.has(query)){const m=new w.EventTarget();m.matches=query.includes('color-scheme')&&dark;queries.set(query,m);}return queries.get(query);};
 if(stored)w.localStorage.setItem('gary-visa-theme',theme);
 w.eval(init);w.eval(scope);d.documentElement.lang=lang;d.body.dataset.role=role;
 d.getElementById('workspace').hidden=false;for(const view of ['customers','inbox','cms','trash'])d.querySelector(`[data-view=${view}]`).hidden=false;
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 const controller=mountPortalTheme(d);return {dom,w,d,queries,controller,close(){controller.destroy();dom.window.close();}};
}
function change(h,value){const c=h.d.getElementById('portal-theme');c.value=value;c.dispatchEvent(new h.w.Event('change',{bubbles:true}));}

test('staff bootstrap resolves the website preference before styles and portal host has an accessible localized control',()=>{
 assert.ok(html.indexOf('appearance-init.js')<html.indexOf('rel="stylesheet"'));assert.ok(html.indexOf('portal-theme-init.js')<html.indexOf('rel="stylesheet"'));
 for(const lang of ['en','vi'])for(const theme of ['light','dark','system'])for(const dark of [false,true]){
  const h=harness({theme,dark,lang});try{
   const expected=theme==='system'?(dark?'dark':'light'):theme;
   assert.equal(h.d.documentElement.dataset.visaTheme,expected);assert.equal(h.d.documentElement.dataset.visaStaffTheme,expected);assert.equal(h.d.documentElement.dataset.visaPortal,'staff');assert.equal(h.d.documentElement.style.colorScheme,expected);
   assert.equal(h.d.getElementById('portal-theme').value,theme);assert.equal(h.d.querySelector('.portal-appearance').hidden,false);
   assert.equal(h.d.querySelector('label[for=portal-theme]').textContent,lang==='vi'?'Giao diện':'Appearance');
  }finally{h.close();}
 }
});

test('Light/Dark/System switching, OS updates, cross-tab changes and reload share one persisted public preference',()=>{
 const h=harness({dark:true,stored:false});let saved;try{
  assert.equal(h.w.garyVisaPreferences.theme,'system');const media=h.queries.get('(prefers-color-scheme: dark)');media.matches=false;media.dispatchEvent(new h.w.Event('change'));assert.equal(h.d.documentElement.dataset.visaTheme,'light');
  change(h,'dark');assert.equal(h.w.localStorage.getItem('gary-visa-theme'),'dark');assert.equal(h.d.documentElement.dataset.visaTheme,'dark');
  media.dispatchEvent(new h.w.Event('change'));assert.equal(h.d.documentElement.dataset.visaTheme,'dark','explicit preference wins over system');
  h.w.localStorage.setItem('gary-visa-theme','light');h.w.dispatchEvent(new h.w.StorageEvent('storage',{key:'gary-visa-theme'}));assert.equal(h.d.documentElement.dataset.visaStaffTheme,'light');assert.equal(h.d.getElementById('portal-theme').value,'light');
  change(h,'system');media.matches=true;media.dispatchEvent(new h.w.Event('change'));assert.equal(h.d.documentElement.dataset.visaStaffTheme,'dark');saved=h.w.localStorage.getItem('gary-visa-theme');
 }finally{h.close();}
 const reload=harness({theme:saved,dark:true});try{assert.equal(reload.d.getElementById('portal-theme').value,'system');assert.equal(reload.d.documentElement.dataset.visaTheme,'dark');}finally{reload.close();}
});

test('every staff route and expanded/collapsed/mobile navigation share theme without replacing content, editors, errors or selected files',async()=>{
 for(const width of [1440,390]){
  const h=harness({width});try{
   const sidebar=mountStaffSidebar(h.d),editors=mountPortalEditors(h.d),dialog=h.d.getElementById('request-dialog'),form=h.d.getElementById('request-form'),title=h.d.getElementById('request-subject'),file=h.d.getElementById('document-file');
   const selected=new h.w.File(['demo'],'document.pdf',{type:'application/pdf'});Object.defineProperty(file,'files',{value:[selected]});title.value='Unsaved case title';h.d.getElementById('request-notice').textContent='Existing validation message';dialog.showModal();dialog.querySelector('[data-gw-toggle]').click();const style=dialog.getAttribute('style');
   for(const route of ['applications','customers','inbox','cms','trash','profile'])for(const theme of ['light','dark','system']){
    h.d.querySelectorAll('.workspace-content>section').forEach(section=>section.hidden=section.id!==route+'-view');const node=h.d.getElementById(route+'-view');change(h,theme);
    assert.equal(h.d.getElementById(route+'-view'),node);assert.equal(h.d.getElementById('request-form'),form);assert.equal(title.value,'Unsaved case title');assert.equal(file.files[0],selected);assert.equal(h.d.getElementById('request-notice').textContent,'Existing validation message');assert.equal(dialog.getAttribute('style'),style);assert.equal(dialog.open,true);
   }
   if(width<=900){dialog.close();h.d.getElementById('visa-mobile-nav-trigger').click();assert.equal(h.d.getElementById('visa-mobile-nav').open,true);}
   else h.d.querySelector('[data-visa-sidebar-toggle]').click();
   change(h,'dark');assert.equal(h.d.getElementById('request-form'),form);assert.equal(title.value,'Unsaved case title');
   h.d.documentElement.lang='vi';await settle();assert.equal(h.d.getElementById('portal-theme').selectedOptions[0].textContent,'Tối');
   editors.destroy();sidebar.destroy();
  }finally{h.close();}
 }
});

test('customer appearance and access remain separate from the staff presentation; blocked storage is safe',async()=>{
 const h=harness({theme:'dark',role:'customer'});try{
  assert.equal(h.d.documentElement.dataset.visaPortal,'customer');assert.equal(h.d.querySelector('.portal-appearance').hidden,true);assert.equal(h.d.documentElement.style.colorScheme,'light');
  h.d.body.dataset.role='staff';await settle();assert.equal(h.d.documentElement.dataset.visaPortal,'staff');assert.equal(h.d.documentElement.style.colorScheme,'dark');assert.equal(h.d.body.dataset.role,'staff','theme never assigns a role');
  const denied={getItem(){throw Error('denied');},setItem(){throw Error('denied');}};Object.defineProperty(h.w,'localStorage',{value:denied});change(h,'light');assert.equal(h.d.documentElement.dataset.visaTheme,'light');
 }finally{h.close();}
});

test('a signed-in customer profile can use Light, Dark and System while keeping its photo controls',async()=>{
 const h=harness({theme:'dark',role:'customer'});try{
  const input=h.d.getElementById('profile-avatar-file');
  h.d.body.dataset.visaView='profile';await settle();
  assert.equal(h.d.documentElement.dataset.visaPortal,'customer');
  assert.equal(h.d.documentElement.hasAttribute('data-visa-profile'),true);
  assert.equal(h.d.querySelector('.portal-appearance').hidden,false);
  assert.equal(h.d.documentElement.style.colorScheme,'dark');
  change(h,'light');assert.equal(h.d.documentElement.style.colorScheme,'light');
  change(h,'system');assert.equal(h.d.getElementById('portal-theme').value,'system');
  assert.equal(h.d.getElementById('profile-avatar-file'),input);
  h.d.body.dataset.visaView='applications';await settle();
  assert.equal(h.d.documentElement.hasAttribute('data-visa-profile'),false);
  assert.equal(h.d.querySelector('.portal-appearance').hidden,true);
 }finally{h.close()}
});

function luminance(c){const rgb=[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
function contrast(a,b){return(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);}
test('semantic palette gives AA text/status contrast and visible form borders across staff surfaces',async()=>{
 const palette=Object.fromEntries([...css.matchAll(/--vp-([\w-]+):(#[a-f\d]{6});/gi)].map(m=>[m[1],m[2]]));
 assert.equal(palette.page,'#0D1924');assert.equal(palette.surface,'#142838');assert.equal(palette.raised,'#1E3545');assert.equal(palette.text,'#F4F2ED');assert.equal(palette.accent,'#83CCD1');
 for(const background of ['page','surface','raised','soft','hover','control'])for(const foreground of ['text','muted','accent'])assert.ok(contrast(palette[foreground],palette[background])>=4.5,`${foreground}/${background}`);
 for(const state of ['success','warning','danger','info'])assert.ok(contrast(palette[state],palette[state+'-soft'])>=4.5,state);
 assert.ok(contrast(palette['on-brand'],palette.button)>=4.5);assert.ok(contrast(palette.line,palette.control)>=3);assert.ok(contrast(palette.focus,palette.surface)>=3);
 for(const name of ['portal.css','portal-editors.css','workspace-tools.css','chat.css','controls.css','cms-foundation/styles.css']){
  const source=await readFile(new URL('../dist/'+name,import.meta.url),'utf8');assert.match(source,/var\(--vp-/);assert.doesNotMatch(source,/data-visa-theme=dark/,'components consume tokens instead of deciding themes');
 }
 const sidebar=await readFile(new URL('../dist/staff-sidebar.css',import.meta.url),'utf8');assert.match(sidebar,/--visa-nav-bg:var\(--vp-surface/);assert.doesNotMatch(sidebar,/prefers-color-scheme/);assert.match(css,/scrollbar-color:var\(--vp-scrollbar/);assert.match(css,/\.gary-apps-menu/);assert.match(css,/dialog::backdrop/);
});
