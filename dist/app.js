import {vi,ui,services} from './content.js';
import {cmsCopyOverrides,renderServiceCms} from './cms-public.js';
let cmsCopy={en:{},vi:{}};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const english = {};
for (const node of $$('[data-i18n]')) {
  const clone=node.cloneNode(true);
  clone.querySelectorAll('br').forEach(br=>br.replaceWith('\n'));
  english[node.dataset.i18n] ??= clone.textContent.trim();
}
for(const kind of ['placeholder','aria','alt']) for(const node of $$(`[data-i18n-${kind}]`)) english[node.dataset[`i18n${kind[0].toUpperCase()+kind.slice(1)}`]] ??= node.getAttribute(kind==='aria'?'aria-label':kind);
let language='en';
let selectedService=null;
let selectedGoal=null;
let heroServiceEntries=null,selectedHeroEntry=null;
let currentFilter='all';
let messageText='';
const t=(key)=>cmsCopy[language]?.[key]??(language==='vi'?(vi[key]??ui.vi[key]??ui.en[key]??english[key]??key):(ui.en[key]??english[key]??key));

export function setLanguage(next){
  language=next==='vi'?'vi':'en';
  document.documentElement.lang=language;
  document.title=language==='vi'?'Dịch vụ visa và giấy phép lao động tại Việt Nam | Gary Agency':'Visa & Work Permit Services in Vietnam | Gary Agency';
  document.querySelector('meta[property="og:title"]').content=document.title;
  document.querySelector('meta[name="description"]').content=t('metaDescription');
  document.querySelector('meta[property="og:description"]').content=t('metaDescription');
  $$('[data-i18n]').forEach(node=>{node.textContent=t(node.dataset.i18n)});
  for(const kind of ['placeholder','aria','alt']) for(const node of $$(`[data-i18n-${kind}]`)) node.setAttribute(kind==='aria'?'aria-label':kind,t(node.dataset[`i18n${kind[0].toUpperCase()+kind.slice(1)}`]));
$$('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
  try{localStorage.setItem('gary-language',language)}catch{}
  const menu=$('#menu-toggle');
  if(menu.getAttribute('aria-expanded')==='true') menu.setAttribute('aria-label',t('closeMenu'));
  renderHeroChoices();
  if(selectedHeroEntry) renderServiceCms({doc:document,entries:heroServiceEntries,slug:selectedHeroEntry.slug,language});
  else if(selectedService&&services[selectedService]) renderService(selectedService);
  if(selectedGoal) renderRecommendation(selectedGoal);
  if($('#enquiry-dialog').open) renderEnquiry();
  if(currentFilter!=='all') updateFilterStatus();
  document.dispatchEvent(new CustomEvent('gary:language',{detail:{language}}));
}
function heroChoices(){return heroServiceEntries??Object.entries(services).map(([slug,service])=>({slug,title_en:t(service.title),title_vi:t(service.title),summary_en:t(service.intro),summary_vi:t(service.intro),data:{service_type:slug}}));}
function renderHeroChoices(){
  const select=$('#hero-service');if(!select)return;
  const selected=select.value,choices=heroChoices();
  select.replaceChildren(...choices.map(entry=>{const option=document.createElement('option');option.value=entry.slug;option.textContent=entry[`title_${language}`]||entry.title_en||entry.title_vi||entry.slug;return option}));
  if(choices.some(entry=>entry.slug===selected))select.value=selected;
  const entry=choices.find(item=>item.slug===select.value),kind=entry?.data?.service_type||entry?.slug;
  select.disabled=!entry;$('#hero-review-service').disabled=!entry;
  if(heroServiceEntries&&entry)$('#hero-review-service').dataset.openCmsService=entry.slug;else delete $('#hero-review-service').dataset.openCmsService;
  $('#hero-service-title').textContent=entry?.[`title_${language}`]||entry?.title_en||entry?.title_vi||'';
  $('#hero-service-summary').textContent=entry?.[`summary_${language}`]||entry?.summary_en||entry?.summary_vi||(language==='vi'?vi.heroUnavailable:'No services are published yet. Contact the team for help.');
  $('.hero-panel-icon use').setAttribute('href',`#i-${services[kind]?.icon||'documents'}`);
}
document.addEventListener('gary:cms-ready',event=>{const entries=event.detail?.entries||[];cmsCopy=cmsCopyOverrides(entries);heroServiceEntries=entries.filter(entry=>entry.kind==='service');setLanguage(language)});
$('#hero-service').addEventListener('change',renderHeroChoices);
function openHeroService(){
  if(!$('#hero-service-form').reportValidity())return;
  const key=$('#hero-service').value,entry=heroChoices().find(item=>item.slug===key);if(!entry)return;
  selectedService=key;selectedHeroEntry=heroServiceEntries?entry:null;
  if(selectedHeroEntry)renderServiceCms({doc:document,entries:heroServiceEntries,slug:key,language});else renderService(key);
  showDialog($('#service-dialog'));
}
$('#hero-review-service').addEventListener('click',openHeroService);
$('#hero-service-form').addEventListener('submit',event=>{event.preventDefault();$('#hero-review-service').click()});
$$('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
let initialLanguage=new URL(location.href).searchParams.get('lang');
if(!initialLanguage) try{initialLanguage=localStorage.getItem('gary-language')}catch{}
setLanguage(initialLanguage);

const menu=$('#menu-toggle'),mobileNav=$('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;mobileNav.inert=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('openMenu'))}
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!expanded;mobileNav.inert=!expanded;menu.setAttribute('aria-expanded',String(expanded));menu.setAttribute('aria-label',t(expanded?'closeMenu':'openMenu'))});
mobileNav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden){closeMenu();menu.focus()}});
document.addEventListener('click',event=>{if(!mobileNav.hidden&&!event.target.closest('.header'))closeMenu()});
globalThis.matchMedia?.('(min-width: 760px)').addEventListener('change',event=>{if(event.matches)closeMenu()});

function updateFilterStatus(){const count=$$('.service-card:not([hidden])').length;$('#filter-status').textContent=`${count} ${t('results')}`}
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{currentFilter=button.dataset.filter;$$('[data-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});$$('.service-card').forEach(card=>{card.hidden=currentFilter!=='all'&&card.dataset.category!==currentFilter});updateFilterStatus()}));

function showDialog(dialog){if(!dialog.open){dialog.showModal();document.body.classList.add('dialog-open')}}
function closeDialog(dialog){dialog.close();if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open')}
$$('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>{if(dialog.id==='service-dialog'){selectedHeroEntry=null;selectedService=null}if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open')});dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeDialog(dialog)}})});
document.addEventListener('click',event=>{const close=event.target.closest('[data-close-dialog]');if(close)closeDialog(document.getElementById(close.dataset.closeDialog));const open=event.target.closest('[data-open-service]');if(open&&services[open.dataset.openService]){selectedHeroEntry=null;selectedService=open.dataset.openService;renderService(selectedService);showDialog($('#service-dialog'))}});
function renderService(key){$('#cms-service-details')?.remove();const service=services[key];if(!service)return;$('#service-dialog-title').textContent=t(service.title);$('#service-dialog-intro').textContent=t(service.intro);$('#dialog-service-symbol').setAttribute('href',`#i-${service.icon}`);$('#service-dialog-includes').replaceChildren(...service.includes[language].map(item=>{const li=document.createElement('li');li.textContent=item;return li}))}
$('#service-enquire').addEventListener('click',()=>{const service=selectedHeroEntry?.data?.service_type||selectedService;closeDialog($('#service-dialog'));$('#enquiry-service').value=['visa','work','residence','documents'].includes(service)?service:'unsure';selectedHeroEntry=null;selectedService=null;$('#contact').scrollIntoView({behavior:globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#enquiry-name').focus({preventScroll:true})});

function renderRecommendation(key){const result=$('#finder-result');const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=`${t('recommended')} ${t(services[key].title)}. `;p.append(strong,document.createTextNode(t('finderDisclaimer')));const button=document.createElement('button');button.className='text-link button-tertiary';button.type='button';button.dataset.openService=key;button.textContent=`${t('viewDetails')} ↗`;result.replaceChildren(p,button);result.hidden=false}
$('#finder-form').addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.reportValidity())return;selectedGoal=$('#finder-goal').value;if(services[selectedGoal])renderRecommendation(selectedGoal)});

function renderEnquiry(){const form=new FormData($('#enquiry-form'));const service=form.get('service');const timing=$('#enquiry-timing').selectedOptions[0].textContent;const title=services[service]?t(services[service].title):t('unsure');const details=String(form.get('message')??'').trim();messageText=[t('enquiryGreeting'),'',`${t('enquiryName')} ${String(form.get('name')??'').trim()}.`,`${t('enquiryService')}: ${title}.`,`${t('enquiryTiming')}: ${timing}.`,...(details?['',details]:[]),'',t('enquiryThanks')].join('\n');$('#enquiry-preview').textContent=messageText;$('#copy-status').textContent=''}
$('#enquiry-form').addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.reportValidity())return;renderEnquiry();showDialog($('#enquiry-dialog'))});
$('#copy-enquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(messageText);$('#copy-status').textContent=t('copied')}catch{$('#copy-status').textContent=t('copyFailed');const selection=globalThis.getSelection();const range=document.createRange();range.selectNodeContents($('#enquiry-preview'));selection?.removeAllRanges();selection?.addRange(range);$('#enquiry-preview').focus()}});
$('#copyright-year').textContent=String(new Date().getFullYear());
if('IntersectionObserver'in globalThis){const navLinks=$$('.desktop-nav a');const observer=new IntersectionObserver(entries=>{const active=entries.filter(item=>item.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(active)navLinks.forEach(link=>link.classList.toggle('nav-active',link.hash===`#${active.target.id}`))},{rootMargin:'-15% 0px -45% 0px',threshold:[0,.1,.3]});$$('#services,#process,#about,#faq').forEach(section=>observer.observe(section))}
