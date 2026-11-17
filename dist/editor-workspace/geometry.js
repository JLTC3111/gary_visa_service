/** Shared editor geometry and preference protocol. No DOM, Auth or form state. */
export function viewportBounds(viewport) {
  const width = Math.max(0, Number(viewport?.width) || 0), height = Math.max(0, Number(viewport?.height) || 0);
  const mobile = width <= 720, margin = mobile ? 0 : Math.min(12,width/2,height/2);
  const maxWidth = Math.max(0, width - margin * 2), maxHeight = Math.max(0, height - margin * 2);
  return {left:margin, top:margin, right:width - margin, bottom:height - margin, maxWidth, maxHeight, minWidth:Math.min(640,maxWidth), minHeight:Math.min(400,maxHeight), mobile, margin};
}
const finite = (value, fallback) => typeof value === 'number' && Number.isFinite(value) ? value : fallback;
const clamp = (value, low, high) => Math.min(Math.max(low, high), Math.max(low, value));
export function clampWorkspace(workspace, viewport) {
  const bounds = viewportBounds(viewport);
  const width = clamp(finite(workspace?.width,1120),bounds.minWidth,bounds.maxWidth), height = clamp(finite(workspace?.height,820),bounds.minHeight,bounds.maxHeight);
  const left = clamp(finite(workspace?.left,(bounds.left+bounds.right-width)/2),bounds.left,bounds.right-width), top = clamp(finite(workspace?.top,(bounds.top+bounds.bottom-height)/2),bounds.top,bounds.bottom-height);
  return {width,height,left,top};
}
export function resizeWorkspace(start, delta, edge, viewport) {
  const bounds = viewportBounds(viewport), current = clampWorkspace(start,viewport);
  let {left,top,width,height} = current;
  const right=left+width,bottom=top+height,dx=finite(delta?.x,0),dy=finite(delta?.y,0);
  if (String(edge).includes('w')) {left=clamp(left+dx,bounds.left,right-bounds.minWidth);width=right-left;}
  else if (String(edge).includes('e')) width=clamp(width+dx,bounds.minWidth,bounds.right-left);
  if (String(edge).includes('n')) {top=clamp(top+dy,bounds.top,bottom-bounds.minHeight);height=bottom-top;}
  else if (String(edge).includes('s')) height=clamp(height+dy,bounds.minHeight,bounds.bottom-top);
  return {width,height,left,top};
}
export function readPreference(storage,key) {
  try {
    const value=JSON.parse(storage?.getItem(key) || 'null');
    if(value?.schema!==1 || typeof value.maximized!=='boolean' || ![value.width,value.height].every(size=>typeof size==='number' && Number.isFinite(size) && size>0 && size<100000)) return null;
    return {width:value.width,height:value.height,maximized:value.maximized};
  } catch {return null;}
}
export function writePreference(storage,key,state) {
  if(![state?.width,state?.height].every(size=>typeof size==='number' && Number.isFinite(size) && size>0))return false;
  try {storage?.setItem(key,JSON.stringify({schema:1,width:state.width,height:state.height,maximized:state.maximized===true}));return !!storage;} catch {return false;}
}
