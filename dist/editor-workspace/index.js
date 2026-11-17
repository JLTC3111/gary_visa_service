import {viewportBounds, clampWorkspace, resizeWorkspace, readPreference, writePreference} from './geometry.js';

const attached = new WeakMap();
const edges = ['w','e','n','s','nw','ne','sw','se'];
const copy = {
 en:{expand:'Maximize editor',restore:'Restore editor',mobile:'Full-screen editor on mobile',resize:'Resize editor',hint:'Use arrow keys to resize. Hold Shift for larger steps.',directions:{w:'left edge',e:'right edge',n:'top edge',s:'bottom edge',nw:'top left corner',ne:'top right corner',sw:'bottom left corner',se:'bottom right corner'}},
 vi:{expand:'Phóng to trình biên tập',restore:'Khôi phục kích thước trình biên tập',mobile:'Trình biên tập toàn màn hình trên điện thoại',resize:'Đổi kích thước trình biên tập',hint:'Dùng phím mũi tên để đổi kích thước. Giữ Shift để thay đổi nhiều hơn.',directions:{w:'cạnh trái',e:'cạnh phải',n:'cạnh trên',s:'cạnh dưới',nw:'góc trên trái',ne:'góc trên phải',sw:'góc dưới trái',se:'góc dưới phải'}}
};
const icon = maximized => `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${maximized ? '<path d="M9 3v6H3m18 6h-6v6M3 9l6-6m6 18 6-6"/>' : '<path d="M8 3H3v5m13 13h5v-5M3 3l7 7m11 11-7-7"/>'}</svg>`;

/** Adds workspace geometry only. Never clones, serializes, submits or resets forms. */
export function attachEditorWorkspace(element, options = {}) {
 if (!element?.ownerDocument) throw new Error('An editor element is required');
 if (attached.has(element)) return attached.get(element);
 const doc=element.ownerDocument, win=doc.defaultView, drawer=options.presentation==='drawer';
 const resizeEdges=(options.resizeEdges || (drawer?['w']:edges)).filter(edge=>edges.includes(edge));
 let storage;try{storage=options.storage || win.localStorage;}catch{}
 const key='gary-editor-workspace:v1:'+(options.key || element.id || 'content');
 const defaults={width:Number(options.defaultWidth)||1120,height:820,maximized:false};
 let preference=readPreference(storage,key)||defaults, normalBox, box, mobile=false, drag=null, disposed=false;
 const oldVars=['--gw-width','--gw-height','--gw-left','--gw-top'].map(name=>[name,element.style.getPropertyValue(name)]);
 const marked=new Set();
 const mark=(node,name)=>{if(node&&!node.classList.contains(name)){node.classList.add(name);marked.add([node,name]);}};
 mark(element,'gw-editor');if(drawer)mark(element,'gw-drawer');
 const viewport=()=>({width:win.innerWidth||doc.documentElement.clientWidth||1200,height:Math.min(win.innerHeight||900,win.visualViewport?.height||Infinity)});
 // Home's drawer is full height and anchored to the right. Modal consumers
 // retain their existing inset geometry and all-edge resizing by default.
 const sizingBounds=view=>{
  const bounds=viewportBounds(view);
  if(!drawer)return bounds;
  const left=bounds.mobile?0:Math.min(24,view.width);
  return {...bounds,left,top:0,right:view.width,bottom:view.height,maxWidth:Math.max(0,view.width-left),maxHeight:view.height,minWidth:Math.min(640,Math.max(0,view.width-left)),minHeight:Math.min(400,view.height)};
 };
 const save=()=>writePreference(storage,key,preference);
 const language=()=>typeof options.language==='function'?options.language():options.language;
 const text=()=>copy[language()==='vi'?'vi':'en'];
 function stopDrag() {
  if(!drag)return;
  doc.body.style.cursor=drag.cursor;doc.body.style.userSelect=drag.select;
  try{if(drag.target.hasPointerCapture?.(drag.pointerId))drag.target.releasePointerCapture(drag.pointerId);}catch{}
  drag=null;
 }
 function structure() {
  const header=options.header&&element.contains(options.header)?options.header:element.querySelector(':scope > header, .editor-drawer > header, header');
  const body=options.body&&element.contains(options.body)?options.body:element.querySelector('[data-gw-body], .gw-editor-body');
  const actions=options.actions&&element.contains(options.actions)?options.actions:element.querySelector('[data-gw-actions], .gw-editor-actions');
  mark(header,'gw-editor-header');mark(body,'gw-editor-body');mark(actions,'gw-editor-actions');
  if(header&&!header.querySelector('[data-gw-toggle]')){
   let controls=header.querySelector('.gw-editor-controls');
   const existing=!!controls;
   if(!controls){controls=doc.createElement('div');controls.className='gw-editor-controls';controls.dataset.gwControls='';}
   const button=doc.createElement('button');button.type='button';button.className='gw-editor-toggle';button.dataset.gwToggle='';
   if(existing)controls.insertBefore(button,controls.lastElementChild);else{
    controls.append(button);
    const toolbar=header.querySelector('.editor-toolbar');
    if(toolbar)toolbar.insertBefore(controls,toolbar.lastElementChild);else header.insertBefore(controls,header.lastElementChild?.tagName==='BUTTON'?header.lastElementChild:null);
   }
  }
  for(const edge of resizeEdges)if(!element.querySelector(`[data-gw-edge="${edge}"]`)){
   const handle=doc.createElement('button');handle.type='button';handle.className='gw-editor-resize';handle.dataset.gwEdge=edge;
   if(edge.length===1){handle.setAttribute('role','separator');handle.setAttribute('aria-orientation',/[we]/.test(edge)?'vertical':'horizontal');}
   element.append(handle);
  }
 }
 function refresh() {
  if(disposed)return;
  const view=viewport(),bounds=sizingBounds(view);mobile=bounds.mobile;
  const maximized=preference.maximized||mobile;
  if(drawer){
   const width=maximized?view.width:Math.min(bounds.maxWidth,Math.max(bounds.minWidth,preference.width));
   box={left:view.width-width,top:0,width,height:view.height};
  }else{
   if(!normalBox){normalBox=clampWorkspace(preference,view);if(options.anchor==='right')normalBox.left=bounds.right-normalBox.width;}
   box=maximized?{left:bounds.left,top:bounds.top,width:bounds.maxWidth,height:bounds.maxHeight}:clampWorkspace({...normalBox,width:preference.width,height:preference.height},view);
   if(!maximized)normalBox={...box};
  }
  element.classList.toggle('gw-maximized',maximized);element.classList.toggle('gw-mobile',mobile);
  for(const [name,value]of Object.entries(box))element.style.setProperty('--gw-'+name,value+'px');
  structure();
  const strings=text(),button=element.querySelector('[data-gw-toggle]');
  if(button){
   const label=mobile?strings.mobile:maximized?strings.restore:strings.expand;
   button.setAttribute('aria-label',label);button.title=label;button.setAttribute('aria-pressed',String(maximized));button.disabled=mobile;
   if(button.dataset.gwMode!==String(maximized)){button.innerHTML=icon(maximized);button.dataset.gwMode=String(maximized);}
  }
  for(const handle of element.querySelectorAll('[data-gw-edge]')){
   const edge=handle.dataset.gwEdge,vertical=/[we]/.test(edge);
   const label=`${strings.resize}: ${strings.directions[edge]}. ${strings.hint}`;
   handle.setAttribute('aria-label',label);handle.title=label;handle.hidden=maximized;handle.tabIndex=maximized?-1:0;
   if(edge.length===1){handle.setAttribute('aria-valuemin',String(vertical?bounds.minWidth:bounds.minHeight));handle.setAttribute('aria-valuemax',String(vertical?bounds.maxWidth:bounds.maxHeight));handle.setAttribute('aria-valuenow',String(vertical?box.width:box.height));handle.setAttribute('aria-valuetext',`${Math.round(box.width)} × ${Math.round(box.height)}`);}
  }
 }
 function resize(delta,edge,start=box) {
  if(drawer){
   const view=viewport(),bounds=sizingBounds(view),width=Math.min(bounds.maxWidth,Math.max(bounds.minWidth,start.width-delta.x));
   preference={width,height:preference.height,maximized:false};refresh();return;
  }
  const next=resizeWorkspace(start,delta,edge,viewport());
  normalBox=next;preference={width:next.width,height:next.height,maximized:false};refresh();
 }
 function click(event){
  if(!event.target.closest?.('[data-gw-toggle]')||mobile)return;
  event.preventDefault();event.stopPropagation();stopDrag();preference={...preference,maximized:!preference.maximized};save();refresh();element.querySelector('[data-gw-toggle]')?.focus({preventScroll:true});
 }
 function pointerDown(event){
  const target=event.target.closest?.('[data-gw-edge]');
  if(!target||target.hidden||event.button!==0||mobile||preference.maximized)return;
  event.preventDefault();event.stopPropagation();stopDrag();target.focus({preventScroll:true});
  drag={x:event.clientX,y:event.clientY,start:{...box},edge:target.dataset.gwEdge,target,pointerId:event.pointerId,cursor:doc.body.style.cursor,select:doc.body.style.userSelect};
  doc.body.style.cursor=win.getComputedStyle(target).cursor;doc.body.style.userSelect='none';
  try{target.setPointerCapture?.(event.pointerId);}catch{}
 }
 function pointerMove(event){if(drag&&(event.pointerId===undefined||drag.pointerId===event.pointerId)){event.preventDefault();resize({x:event.clientX-drag.x,y:event.clientY-drag.y},drag.edge,drag.start);}}
 function pointerUp(event){if(drag&&(event.pointerId===undefined||drag.pointerId===event.pointerId)){save();stopDrag();}}
 function keyDown(event){
  const target=event.target.closest?.('[data-gw-edge]');if(!target||target.hidden||mobile||preference.maximized)return;
  if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
  event.preventDefault();event.stopPropagation();const edge=target.dataset.gwEdge,step=event.shiftKey?64:16;
  let x=event.key==='ArrowLeft'?-step:event.key==='ArrowRight'?step:0,y=event.key==='ArrowUp'?-step:event.key==='ArrowDown'?step:0;
  if(event.key==='Home'||event.key==='End'){
   const bounds=sizingBounds(viewport()),large=event.key==='End';
   if(edge.includes('w'))x=large?bounds.left-box.left:box.width-bounds.minWidth;
   if(edge.includes('e'))x=large?bounds.right-box.left-box.width:bounds.minWidth-box.width;
   if(edge.includes('n'))y=large?bounds.top-box.top:box.height-bounds.minHeight;
   if(edge.includes('s'))y=large?bounds.bottom-box.top-box.height:bounds.minHeight-box.height;
  }
  resize({x,y},edge);save();
 }
 function viewportChanged(){stopDrag();refresh();}
 const observer=typeof win.MutationObserver==='function'?new win.MutationObserver(()=>refresh()):null;
 element.addEventListener('click',click);element.addEventListener('pointerdown',pointerDown);element.addEventListener('keydown',keyDown);
 win.addEventListener('pointermove',pointerMove,{passive:false});win.addEventListener('pointerup',pointerUp);win.addEventListener('pointercancel',pointerUp);win.addEventListener('blur',stopDrag);win.addEventListener('resize',viewportChanged);win.visualViewport?.addEventListener('resize',viewportChanged);
 observer?.observe(element,{subtree:true,childList:true,attributes:true,attributeFilter:['open']});
 const controller={refresh,getState:()=>({...preference,mobile,box:{...box}}),destroy(){
  if(disposed)return;disposed=true;observer?.disconnect();stopDrag();
  element.removeEventListener('click',click);element.removeEventListener('pointerdown',pointerDown);element.removeEventListener('keydown',keyDown);
  win.removeEventListener('pointermove',pointerMove);win.removeEventListener('pointerup',pointerUp);win.removeEventListener('pointercancel',pointerUp);win.removeEventListener('blur',stopDrag);win.removeEventListener('resize',viewportChanged);win.visualViewport?.removeEventListener('resize',viewportChanged);
  for(const node of element.querySelectorAll('[data-gw-toggle],[data-gw-controls],[data-gw-edge]'))node.remove();
  for(const [node,name]of marked)node.classList.remove(name);element.classList.remove('gw-maximized','gw-mobile');for(const [name,value]of oldVars)if(value)element.style.setProperty(name,value);else element.style.removeProperty(name);
  attached.delete(element);
 }};
 attached.set(element,controller);refresh();return controller;
}
