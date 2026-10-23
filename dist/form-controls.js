// Keep the real select for labels, validation and form values; render its menu
// with the site's own styles instead of the operating system's picker.
const instances=new WeakMap();
export function initFormControls(doc=document){
 if(instances.has(doc))return instances.get(doc);
 const win=doc.defaultView,menu=doc.createElement('div');
 menu.id='site-select-menu';menu.className='select-menu';menu.hidden=true;menu.setAttribute('role','listbox');menu.setAttribute('popover','manual');doc.body.append(menu);
 let current=null,active=-1,items=[],suppressClick=null,query='',typedAt=0,sequence=0,observer;
 const enabled=(option)=>option&&!option.disabled&&!option.hidden&&!option.parentElement?.disabled;
 function enhance(){for(const select of doc.querySelectorAll('select:not([multiple])')){if(select.size>1)continue;select.dataset.siteSelect='';select.setAttribute('aria-haspopup','listbox');if(select!==current)select.setAttribute('aria-expanded','false');select.setAttribute('aria-controls',menu.id)}}
 function control(target){const select=target?.closest?.('select[data-site-select]');return select&&!select.matches(':disabled')?select:null}
 function place(){
  if(!current)return;const box=current.getBoundingClientRect(),viewport=win.visualViewport,width=viewport?.width||win.innerWidth,height=viewport?.height||win.innerHeight,offsetX=viewport?.offsetLeft||0,offsetY=viewport?.offsetTop||0;
  const below=height+offsetY-box.bottom-16,above=box.top-offsetY-16,up=below<Math.min(menu.scrollHeight||240,240)&&above>below,space=Math.max(56,Math.min(280,up?above:below));
  menu.style.width=`${Math.min(Math.max(box.width,180),width-24)}px`;menu.style.maxHeight=`${space}px`;menu.style.left=`${Math.max(offsetX+12,Math.min(box.left,width+offsetX-menu.getBoundingClientRect().width-12))}px`;
  menu.style.top=`${up?Math.max(offsetY+12,box.top-menu.getBoundingClientRect().height-7):box.bottom+7}px`;menu.dataset.side=up?'above':'below';
 }
 function highlight(index,scroll=true){
  if(!current)return;active=index;for(const node of menu.querySelectorAll('[role=option]'))node.classList.toggle('is-active',Number(node.dataset.index)===active);
  const node=menu.querySelector(`[data-index="${active}"]`);if(node){current.setAttribute('aria-activedescendant',node.id);if(scroll)node.scrollIntoView?.({block:'nearest'})}else current.removeAttribute('aria-activedescendant');
 }
 function paint(){
  if(!current)return;items=[...current.options];const nodes=[];
  for(const [index,option]of items.entries()){
   if(option.hidden)continue;
   const node=doc.createElement('div');node.id=`${menu.id}-option-${index}`;node.className='select-menu-option';node.dataset.index=String(index);node.setAttribute('role','option');node.setAttribute('aria-selected',String(index===current.selectedIndex));node.setAttribute('aria-disabled',String(!enabled(option)));node.textContent=option.label;nodes.push(node);
  }
  menu.replaceChildren(...nodes);if(!enabled(items[active]))active=items.findIndex(enabled);highlight(active,false);place();
 }
 function close({commit=false,focus=false}={}){
  if(!current)return;const select=current,index=active,changed=commit&&enabled(items[index])&&select.selectedIndex!==index;current=null;observer?.disconnect();observer=null;
  if(changed){select.selectedIndex=index;select.dispatchEvent(new win.Event('input',{bubbles:true}));select.dispatchEvent(new win.Event('change',{bubbles:true}))}
  select.setAttribute('aria-expanded','false');select.removeAttribute('aria-activedescendant');try{menu.hidePopover?.()}catch{}menu.hidden=true;menu.replaceChildren();query='';if(focus&&select.isConnected)select.focus({preventScroll:true});
 }
 function open(select){
  if(select===current){close({focus:true});return}close({commit:true});if(!select.options.length)return;
  current=select;active=select.selectedIndex;query='';typedAt=0;select.focus({preventScroll:true});select.setAttribute('aria-expanded','true');
  const label=select.labels?.[0];if(label){if(!label.id)label.id=`site-select-label-${++sequence}`;menu.setAttribute('aria-labelledby',label.id);menu.removeAttribute('aria-label')}else{menu.removeAttribute('aria-labelledby');menu.setAttribute('aria-label',select.getAttribute('aria-label')||select.name||'Options')}
  (select.closest('dialog[open]')||doc.body).append(menu);menu.hidden=false;paint();
  if(typeof menu.showPopover==='function'){try{menu.showPopover()}catch{menu.removeAttribute('popover')}}else menu.removeAttribute('popover');place();highlight(active);
  observer=new win.MutationObserver(()=>{if(!current)return;if(current.matches(':disabled'))close();else paint()});observer.observe(select,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled','hidden','label','selected']});
 }
 function move(delta){let index=active;for(let i=0;i<items.length;i++){index=Math.max(0,Math.min(items.length-1,index+delta));if(enabled(items[index])){highlight(index);return}if(index===0||index===items.length-1)return}}
 function edge(last){const indices=items.map((_,i)=>i);if(last)indices.reverse();highlight(indices.find(i=>enabled(items[i]))??-1)}
 function type(text){const now=Date.now();query=now-typedAt<700?query+text:text;typedAt=now;const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();const repeated=[...query].every(char=>char===query[0]),search=normalize(repeated?text:query),start=repeated?active+1:0;for(let step=0;step<items.length;step++){const index=(start+step)%items.length;if(enabled(items[index])&&normalize(items[index].label.trim()).startsWith(search)){highlight(index);return}}}
 const pointer=event=>{if(event.button!==0)return;const select=control(event.target);if(select){event.preventDefault();suppressClick=select;open(select)}else if(current&&!menu.contains(event.target)){close({commit:true})}};
 const mouse=event=>{if(event.button===0&&control(event.target))event.preventDefault()};
 const click=event=>{const select=control(event.target);if(select){event.preventDefault();if(suppressClick===select)suppressClick=null;else open(select);return}const option=event.target.closest?.('.select-menu-option');if(current&&option&&menu.contains(option)&&enabled(items[Number(option.dataset.index)])){highlight(Number(option.dataset.index));close({commit:true,focus:true})}};
 const key=event=>{
  const select=control(event.target);if(!select||event.isComposing||event.ctrlKey||event.metaKey||(event.altKey&&!['ArrowDown','ArrowUp'].includes(event.key)))return;const key=event.key,wasOpen=current===select;
  if(key==='Escape'&&wasOpen){event.preventDefault();event.stopPropagation();close();return}
  if(key==='Tab'){if(wasOpen)close({commit:true});return}
  if(['ArrowDown','ArrowUp','Home','End','Enter',' ','F4'].includes(key)){
   event.preventDefault();if(event.altKey&&key==='ArrowUp'){close({commit:true});return}
   if(!wasOpen){open(select);if(key==='Home'||key==='ArrowUp')edge(false);else if(key==='End')edge(true)}
   else if(key==='Enter'||key===' '||key==='F4')close({commit:true});else if(key==='Home'||key==='End')edge(key==='End');else move(key==='ArrowDown'?1:-1);return;
  }
  if(key.length===1&&!event.altKey){event.preventDefault();if(!wasOpen)open(select);type(key)}
 };
 const focus=event=>{if(current&&event.target!==current&&!menu.contains(event.target))close({commit:true})};
 const reset=()=>win.queueMicrotask(()=>{close();enhance()});
 const scroll=event=>{if(current&&!menu.contains(event.target))close({commit:true})};
 const language=()=>{enhance();if(current)paint()};
 const dialogClose=event=>{if(event.target.localName==='dialog'&&current&&event.target.contains(current))close()};
 menu.addEventListener('pointerdown',event=>event.preventDefault());
 doc.addEventListener('pointerdown',pointer,{capture:true,passive:false});doc.addEventListener('mousedown',mouse,true);doc.addEventListener('click',click,true);doc.addEventListener('keydown',key,true);doc.addEventListener('focusin',focus);doc.addEventListener('reset',reset,true);doc.addEventListener('scroll',scroll,true);doc.addEventListener('gary:language',language);doc.addEventListener('close',dialogClose,true);win.addEventListener('resize',()=>close());
 enhance();const api={refresh:language,close};instances.set(doc,api);return api;
}
if(typeof document!=='undefined')initFormControls();
