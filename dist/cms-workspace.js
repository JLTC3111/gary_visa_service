import {agencyCollections,createAgencyCmsAdapter} from './cms.js';
export function createAgencyCms({doc,db,isStaff,getUser,getLanguage,getView=()=> 'cms'}){
 let controller=null,root=null,epoch=0;
 const copy=(en,vi)=>getLanguage()==='vi'?vi:en;
 function message(en,vi,retry=false){root.replaceChildren();const p=doc.createElement('p');p.className='workspace-hint';p.setAttribute('role','status');p.textContent=copy(en,vi);root.append(p);if(retry){const button=doc.createElement('button');button.type='button';button.className='pagination-button';button.textContent=copy('Try again','Thử lại');button.addEventListener('click',()=>enter());root.append(button)}}
 const adapter=createAgencyCmsAdapter({db,isStaff,getUser});
 async function enter(){
  if(!isStaff()||!getUser()?.id){reset();return}
  const view=getView(),nextRoot=doc.getElementById(`${view}-root`);
  if(!nextRoot)return;
  if(root!==nextRoot){reset();root=nextRoot;}
  if(controller){await controller.refresh?.();return}
  const news=view==='news-guides';
  const current=++epoch;
  if(news)message('Loading News & Guides…','Đang tải Tin tức & Hướng dẫn…');
  else message('Loading content management…','Đang tải quản lý nội dung…');
  try{
   const access=await adapter.capabilities();if(current!==epoch||!isStaff())return;
   if(!access?.read){message('Your Agency account has no content management role. Ask an Agency CMS administrator for access.','Tài khoản Agency của bạn chưa có vai trò quản lý nội dung. Hãy liên hệ quản trị viên CMS của Agency.');return}
   const {mountCms}=await import('./cms-foundation/index.js');if(current!==epoch||!isStaff())return;
   const collections=agencyCollections.filter(item=>(item.kind==='article')===news);
   const heading=news?{en:'News & Guides',vi:'Tin tức & Hướng dẫn'}:undefined;
   root.replaceChildren();controller=mountCms(root,{appId:'visa',appName:'Gary Agency · Visa',language:getLanguage(),collections,heading,adapter});
  }catch(error){if(current!==epoch)return;const setup=['42P01','42883','PGRST202','PGRST205'].includes(error?.code);
   message(setup?'Content management is awaiting setup by the Agency owner. Existing cases and chat remain available.':'Content management could not be loaded. Your content has not been changed.',setup?'Chủ sở hữu Agency cần hoàn tất thiết lập quản lý nội dung. Hồ sơ và chat hiện có vẫn hoạt động.':'Chưa thể tải quản lý nội dung. Nội dung của bạn chưa bị thay đổi.',true);
  }
 }
 function reset(){epoch++;controller?.destroy?.({force:true});controller=null;root?.replaceChildren();root=null;}
 function translate(){controller?.setLanguage?.(getLanguage());if(!controller&&root&&isStaff())void enter()}
 return {enter,reset,translate,canLeave:()=>controller?.canLeave()??true,confirmLeave:()=>controller?.confirmLeave()??true};
}
