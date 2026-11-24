const mountedSidebars=new WeakMap();

/** Visa staff navigation only. Existing destination nodes own routes/permissions. */
export function mountStaffSidebar(doc = document, {isStaff = () => doc.body.dataset.role === 'staff',language = () => doc.documentElement.lang === 'vi' ? 'vi' : 'en'} = {}) {
 if(mountedSidebars.has(doc))return mountedSidebars.get(doc);
 const win=doc.defaultView,workspace=doc.getElementById('workspace'),sidebar=workspace?.querySelector('.workspace-sidebar'),nav=sidebar?.querySelector('.workspace-nav');
 const trigger=doc.getElementById('visa-mobile-nav-trigger');
 if(!workspace||!sidebar||!nav||!trigger)return {refresh(){},destroy(){},getState(){return null;}};
 const buttons=[...nav.querySelectorAll(':scope > [data-view]')],label=sidebar.querySelector('.workspace-label');
 const groups=[{id:'operations',en:'Operations',vi:'Nghiệp vụ',views:['applications']},{id:'crm',en:'CRM',vi:'Quan hệ khách hàng',views:['customers','inbox']},{id:'content',en:'Content & Media',vi:'Nội dung & tư liệu',views:['cms','news-guides','trash']},{id:'administration',en:'Administration',vi:'Quản trị',views:['staff-access']},{id:'account',en:'Account',vi:'Tài khoản',views:['profile']}];
 const preferenceKey='gary-visa:staff-sidebar:v1';
 const defaults={width:256,collapsed:false,groups:Object.fromEntries(groups.map(group=>[group.id,true]))};
 let preference={...defaults,groups:{...defaults.groups}};
 try{const stored=JSON.parse(win.localStorage.getItem(preferenceKey)||'null');if(stored?.version===1){if(Number.isFinite(stored.width)&&stored.width>=180&&stored.width<=1000)preference.width=stored.width;if(typeof stored.collapsed==='boolean')preference.collapsed=stored.collapsed;for(const group of groups)if(typeof stored.groups?.[group.id]==='boolean')preference.groups[group.id]=stored.groups[group.id];}}catch{}
 const oldAttributes=new Map(buttons.map(button=>[button,new Map(['aria-label','title','aria-current'].map(name=>[name,button.getAttribute(name)]))]));
 let enabled=false,heading,toggle,handle,drawer,drag=null,disposed=false;
 const save=()=>{try{win.localStorage.setItem(preferenceKey,JSON.stringify({version:1,...preference}));}catch{}};
 const mobile=()=>win.innerWidth<=900;
 const maximum=()=>Math.min(380,Math.max(220,(win.innerWidth||1200)-520));
 const effectiveWidth=()=>Math.max(220,Math.min(maximum(),preference.width));
 const text=()=>language()==='vi'?{collapse:'Thu gọn thanh điều hướng',expand:'Mở rộng thanh điều hướng',show:'Mở điều hướng nhân viên',hide:'Đóng điều hướng nhân viên',resize:'Đổi chiều rộng thanh điều hướng. Dùng phím mũi tên trái/phải; giữ Shift để thay đổi nhiều hơn.',navigation:'Điều hướng không gian nhân viên'}:{collapse:'Collapse staff sidebar',expand:'Expand staff sidebar',show:'Open staff navigation',hide:'Close staff navigation',resize:'Resize staff sidebar. Use left/right arrow keys; hold Shift for larger steps.',navigation:'Staff workspace navigation'};
 const setText=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
 function syncDrawer(){
  const open=enabled&&Boolean(drawer?.open);
  trigger.setAttribute('aria-expanded',String(open));
  workspace.classList.toggle('visa-sidebar-mobile-open',open);
  doc.body.classList.toggle('visa-sidebar-scroll-locked',open);
  nav.inert=enabled&&mobile()&&!open;
 }
 function closeDrawer(view,restoreFocus=true){
  if(!drawer?.open)return;
  drawer.close();
  syncDrawer();
  if(!restoreFocus)return;
  const panel=view&&doc.getElementById(view+'-view');
  if(panel&&!panel.hidden){
   const focus=panel.querySelector('h1,h2')||panel;
   if(!focus.hasAttribute('tabindex'))focus.tabIndex=-1;
   focus.focus({preventScroll:true});
  }else if(!trigger.hidden)trigger.focus({preventScroll:true});
 }
 function openDrawer(){
  if(!enabled||!isStaff()||workspace.hidden||!mobile()||drawer.open)return;
  refresh({revealActive:true});
  drawer.showModal();
  syncDrawer();
  toggle.focus({preventScroll:true});
 }
 function stopDrag(){if(!drag)return;doc.body.style.cursor=drag.cursor;doc.body.style.userSelect=drag.select;try{if(handle.hasPointerCapture?.(drag.pointerId))handle.releasePointerCapture(drag.pointerId);}catch{}drag=null;workspace.removeAttribute('data-gary-resizing');}
 function enable(){
  if(enabled)return;enabled=true;workspace.classList.add('visa-staff-workspace');sidebar.classList.add('visa-staff-sidebar');
  heading=doc.createElement('div');heading.className='visa-sidebar-heading';if(label)heading.append(label);
  toggle=doc.createElement('button');toggle.type='button';toggle.className='visa-sidebar-toggle';toggle.dataset.visaSidebarToggle='';toggle.setAttribute('aria-controls','visa-staff-navigation');heading.append(toggle);sidebar.prepend(heading);
  nav.id='visa-staff-navigation';nav.tabIndex=0;
  for(const group of groups){
   const section=doc.createElement('section');section.className='visa-nav-group';section.dataset.visaNavGroup=group.id;
   const control=doc.createElement('button');control.type='button';control.className='visa-nav-group-toggle';control.dataset.visaGroupToggle=group.id;control.setAttribute('aria-controls',`visa-nav-${group.id}`);
   const title=doc.createElement('span');title.dataset.visaGroupLabel='';const chevron=doc.createElement('span');chevron.className='visa-nav-chevron';chevron.setAttribute('aria-hidden','true');chevron.textContent='⌄';control.append(title,chevron);
   const destinations=doc.createElement('div');destinations.className='visa-nav-destinations';destinations.id=`visa-nav-${group.id}`;
   for(const view of group.views){const button=buttons.find(item=>item.dataset.view===view);if(button)destinations.append(button);}
   section.append(control,destinations);nav.append(section);
  }
  handle=doc.createElement('button');handle.type='button';handle.className='visa-sidebar-resize';handle.dataset.visaSidebarResize='';handle.setAttribute('role','separator');handle.setAttribute('aria-orientation','vertical');sidebar.append(handle);
  drawer=doc.createElement('dialog');drawer.id='visa-mobile-nav';drawer.className='visa-mobile-nav-drawer';
  drawer.setAttribute('aria-modal','true');
  workspace.append(drawer);
  drawer.addEventListener('close',syncDrawer);
  drawer.addEventListener('cancel',event=>{event.preventDefault();closeDrawer();});
  drawer.addEventListener('keydown',event=>{
   if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeDrawer();}
  });
  drawer.addEventListener('click',event=>{
   if(event.target!==drawer)return;
   const rect=drawer.getBoundingClientRect();
   if(event.clientX<rect.left||event.clientX>=rect.right||event.clientY<rect.top||event.clientY>=rect.bottom)closeDrawer();
  });
 }
 function disable(){
  if(!enabled)return;stopDrag();enabled=false;
  trigger.hidden=true;closeDrawer(null,false);
  if(sidebar.parentElement===drawer)workspace.prepend(sidebar);
  drawer.remove();drawer=null;syncDrawer();
  for(const button of buttons){nav.append(button);for(const [name,value]of oldAttributes.get(button))if(value===null)button.removeAttribute(name);else button.setAttribute(name,value);}
  for(const group of nav.querySelectorAll('.visa-nav-group'))group.remove();if(label)sidebar.insertBefore(label,nav);heading?.remove();handle?.remove();
  nav.inert=false;nav.removeAttribute('id');nav.removeAttribute('tabindex');nav.setAttribute('aria-label','Workspace navigation');workspace.classList.remove('visa-staff-workspace','visa-sidebar-collapsed');sidebar.classList.remove('visa-staff-sidebar');workspace.style.removeProperty('--visa-sidebar-width');
 }
 function refresh({revealActive=false}={}){
  if(disposed)return;if(!isStaff()){disable();return;}enable();
  const strings=text(),phone=mobile();
  trigger.hidden=!phone||workspace.hidden;
  trigger.setAttribute('aria-label',strings.show);trigger.title=strings.show;
  drawer.setAttribute('aria-label',strings.navigation);
  if(trigger.hidden)closeDrawer(null,false);
  if(phone&&sidebar.parentElement!==drawer)drawer.append(sidebar);
  if(!phone&&sidebar.parentElement!==workspace)workspace.prepend(sidebar);
  syncDrawer();
  workspace.classList.toggle('visa-sidebar-collapsed',!phone&&preference.collapsed);
  workspace.style.setProperty('--visa-sidebar-width',(preference.collapsed?76:effectiveWidth())+'px');
  nav.setAttribute('aria-label',strings.navigation);
  const action=phone?strings.hide:preference.collapsed?strings.expand:strings.collapse;
  toggle.setAttribute('aria-label',action);toggle.title=action;
  if(phone){toggle.removeAttribute('aria-expanded');toggle.removeAttribute('aria-controls');}
  else{toggle.setAttribute('aria-expanded',String(!preference.collapsed));toggle.setAttribute('aria-controls',nav.id);}
  setText(toggle,phone?'×':preference.collapsed?'›':'‹');
  handle.hidden=phone||preference.collapsed;handle.setAttribute('aria-label',strings.resize);handle.title=strings.resize;handle.setAttribute('aria-valuemin','220');handle.setAttribute('aria-valuemax',String(maximum()));handle.setAttribute('aria-valuenow',String(effectiveWidth()));handle.setAttribute('aria-valuetext',`${Math.round(effectiveWidth())} px`);
  for(const group of groups){const section=nav.querySelector(`[data-visa-nav-group="${group.id}"]`),control=section.querySelector('[data-visa-group-toggle]'),active=[...section.querySelectorAll('[data-view]')].some(button=>button.classList.contains('active')&&!button.hidden);section.hidden=![...section.querySelectorAll('[data-view]')].some(button=>!button.hidden);if(revealActive&&active)preference.groups[group.id]=true;section.classList.toggle('visa-nav-group-active',active);setText(control.querySelector('[data-visa-group-label]'),language()==='vi'?group.vi:group.en);control.setAttribute('aria-expanded',String(preference.groups[group.id]));const destinations=section.querySelector('.visa-nav-destinations');destinations.hidden=!preference.groups[group.id]&&!(!phone&&preference.collapsed);destinations.inert=destinations.hidden;}
  for(const button of buttons){const title=button.querySelector('span')?.textContent.trim()||button.textContent.trim();button.setAttribute('aria-label',title);button.title=title;if(button.classList.contains('active'))button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');}
 }
 function click(event){
  const target=event.target.closest?.('button');if(!target||!sidebar.contains(target)||!enabled)return;
  if(target===toggle){
   stopDrag();
   if(mobile())closeDrawer();
   else{preference.collapsed=!preference.collapsed;save();refresh();}
   return;
  }
  if(target.dataset.visaGroupToggle){preference.groups[target.dataset.visaGroupToggle]=!preference.groups[target.dataset.visaGroupToggle];save();refresh();return;}
  const view=target.dataset.view||(target.id==='sidebar-profile-button'?'profile':null);
  if(view)queueMicrotask(()=>{
   if(disposed||!enabled)return;
   refresh({revealActive:true});
   if(drawer.open&&buttons.some(button=>button.dataset.view===view&&!button.hidden&&button.classList.contains('active')))closeDrawer(view);
  });
 }
 function pointerDown(event){if(event.target!==handle||event.button!==0||handle.hidden||!enabled)return;event.preventDefault();handle.focus();drag={start:event.clientX,width:effectiveWidth(),pointerId:event.pointerId,cursor:doc.body.style.cursor,select:doc.body.style.userSelect};workspace.setAttribute('data-gary-resizing','');doc.body.style.cursor='ew-resize';doc.body.style.userSelect='none';try{handle.setPointerCapture?.(event.pointerId);}catch{}}
 function pointerMove(event){if(!drag||event.pointerId!==drag.pointerId)return;event.preventDefault();preference.width=Math.max(220,Math.min(maximum(),drag.width+event.clientX-drag.start));refresh();}
 function pointerUp(){if(drag){save();stopDrag();}}
 function keyDown(event){if(event.target!==handle||handle.hidden)return;if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const step=event.shiftKey?48:16;preference.width=event.key==='Home'?220:event.key==='End'?maximum():Math.max(220,Math.min(maximum(),effectiveWidth()+(event.key==='ArrowLeft'?-step:step)));save();refresh();}
 function viewportChanged(){
  stopDrag();
  const focusWasInNavigation=sidebar.contains(doc.activeElement)||doc.activeElement===trigger;
  refresh();
  if(!enabled||workspace.hidden||!focusWasInNavigation)return;
  if(mobile()&&!drawer.open)trigger.focus({preventScroll:true});
  if(!mobile()&&!sidebar.contains(doc.activeElement))toggle.focus({preventScroll:true});
 }
 const workspaceObserver=new win.MutationObserver(entries=>{
  const view=doc.body.dataset.visaView;
  const moved=entries.some(entry=>entry.attributeName==='data-visa-view'&&entry.oldValue!==view);
  if(moved&&isStaff()&&!workspace.hidden)closeDrawer(view);
  refresh({revealActive:moved});
 });
 workspaceObserver.observe(doc.body,{attributes:true,attributeOldValue:true,attributeFilter:['data-role','data-visa-view']});
 workspaceObserver.observe(workspace,{attributes:true,attributeFilter:['hidden']});
 const languageObserver=new win.MutationObserver(()=>refresh());languageObserver.observe(doc.documentElement,{attributes:true,attributeFilter:['lang']});
 const navigationObserver=new win.MutationObserver(entries=>{if(entries.some(entry=>entry.target.matches?.('[data-view]')))refresh();});navigationObserver.observe(nav,{subtree:true,attributes:true,attributeFilter:['hidden','class']});
 trigger.addEventListener('click',openDrawer);
 sidebar.addEventListener('click',click);sidebar.addEventListener('pointerdown',pointerDown);sidebar.addEventListener('keydown',keyDown);win.addEventListener('pointermove',pointerMove,{passive:false});win.addEventListener('pointerup',pointerUp);win.addEventListener('pointercancel',pointerUp);win.addEventListener('blur',pointerUp);win.addEventListener('resize',viewportChanged);
 const controller={refresh,getState:()=>({...preference,groups:{...preference.groups},mobile:mobile(),mobileExpanded:Boolean(drawer?.open),enabled,width:effectiveWidth()}),destroy(){if(disposed)return;disposed=true;workspaceObserver.disconnect();languageObserver.disconnect();navigationObserver.disconnect();trigger.removeEventListener('click',openDrawer);sidebar.removeEventListener('click',click);sidebar.removeEventListener('pointerdown',pointerDown);sidebar.removeEventListener('keydown',keyDown);win.removeEventListener('pointermove',pointerMove);win.removeEventListener('pointerup',pointerUp);win.removeEventListener('pointercancel',pointerUp);win.removeEventListener('blur',pointerUp);win.removeEventListener('resize',viewportChanged);disable();mountedSidebars.delete(doc);}};
 mountedSidebars.set(doc,controller);refresh();return controller;
}
if(typeof document!=='undefined')mountStaffSidebar(document);
