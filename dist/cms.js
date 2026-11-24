// Agency adapter: shared presentation never owns this application's credentials,
// membership decisions, queries, or publication snapshots.
import {articleCategories,publicCmsImage} from './cms-articles.js';
import {titleSlug} from './cms-foundation/content.js';

export const agencyCollections=[
 {kind:'service',cover:true,label:{en:'Visa services',vi:'Dịch vụ visa'},fields:[{key:'data.category',label:{en:'Service group',vi:'Nhóm dịch vụ'},type:'select',options:[{value:'travel',label:{en:'Entry & travel',vi:'Nhập cảnh & du lịch'}},{value:'settle',label:{en:'Work & residence',vi:'Làm việc & cư trú'}},{value:'documents',label:{en:'Documents',vi:'Giấy tờ'}}]},{key:'data.service_type',label:{en:'Enquiry service',vi:'Dịch vụ khi liên hệ'},type:'select',options:[{value:'visa',label:{en:'Visa',vi:'Visa'}},{value:'work',label:{en:'Work permits',vi:'Giấy phép lao động'}},{value:'residence',label:{en:'Residence cards',vi:'Thẻ tạm trú'}},{value:'documents',label:{en:'Document support',vi:'Hỗ trợ giấy tờ'}}]},{key:'includes',bilingual:true,type:'textarea',label:{en:'Included support (one item per line)',vi:'Hỗ trợ bao gồm (mỗi dòng một mục)'}},{key:'data.image_url',type:'url',label:{en:'Image URL',vi:'Đường dẫn ảnh'}}]},
 {kind:'eligibility',label:{en:'Eligibility information',vi:'Thông tin điều kiện'},fields:[{key:'data.service_slug',type:'text',label:{en:'Related service slug',vi:'Đường dẫn dịch vụ liên quan'}},{key:'data.reviewed_on',type:'date',label:{en:'Last reviewed',vi:'Ngày rà soát'}},{key:'data.source_url',type:'url',label:{en:'Official source',vi:'Nguồn chính thức'}}]},
 {kind:'document',label:{en:'Document requirements',vi:'Giấy tờ cần chuẩn bị'},fields:[{key:'data.service_slug',type:'text',label:{en:'Related service slug',vi:'Đường dẫn dịch vụ liên quan'}},{key:'data.required',type:'select',options:[{value:'required',label:{en:'Required',vi:'Bắt buộc'}},{value:'conditional',label:{en:'Depending on the case',vi:'Tùy trường hợp'}},{value:'optional',label:{en:'Optional',vi:'Không bắt buộc'}}],label:{en:'Requirement',vi:'Yêu cầu'}},{key:'data.source_url',type:'url',label:{en:'Official source',vi:'Nguồn chính thức'}}]},
 {kind:'process',label:{en:'Process steps',vi:'Các bước thực hiện'},fields:[{key:'data.position',type:'number',label:{en:'Display order',vi:'Thứ tự hiển thị'}},{key:'label',bilingual:true,type:'text',label:{en:'Step label',vi:'Nhãn bước'}}]},
 {kind:'faq',label:{en:'FAQs',vi:'Câu hỏi thường gặp'},fields:[{key:'data.position',type:'number',label:{en:'Display order',vi:'Thứ tự hiển thị'}},{key:'data.service_slug',type:'text',label:{en:'Related service (optional)',vi:'Dịch vụ liên quan (không bắt buộc)'}}]},
 {kind:'article',label:{en:'Articles & guides',vi:'Bài viết & hướng dẫn'},cover:true,lockPublishedSlug:true,automaticSlug:true,publicPath:language=>`/${language==='vi'?'vi':'en'}/news/`,fields:[
  {key:'data.category',type:'select',label:{en:'Category',vi:'Chủ đề'},options:Object.entries(articleCategories).map(([value,label])=>({value,label}))},
  {key:'data.image_url',type:'url',label:{en:'Cover image URL',vi:'Đường dẫn ảnh bìa'}},
  {key:'data.source_url',type:'url',label:{en:'Reference source',vi:'Nguồn tham khảo'}},
  {key:'data.reviewed_on',type:'date',label:{en:'Last reviewed',vi:'Ngày rà soát'}}
 ]},
 {kind:'landing',label:{en:'Landing-page content',vi:'Nội dung trang chủ'},requireBody:false,fields:[{key:'data.slot',type:'select',options:[{value:'hero',label:{en:'Opening section',vi:'Phần mở đầu'}},{value:'services',label:{en:'Services introduction',vi:'Giới thiệu dịch vụ'}},{value:'process',label:{en:'Process introduction',vi:'Giới thiệu quy trình'}},{value:'about',label:{en:'About the team',vi:'Về đội ngũ'}},{value:'faq',label:{en:'FAQ introduction',vi:'Giới thiệu câu hỏi thường gặp'}},{value:'contact',label:{en:'Contact introduction',vi:'Giới thiệu liên hệ'}}],label:{en:'Page section',vi:'Phần trên trang'}},{key:'accent',bilingual:true,type:'text',label:{en:'Second heading line',vi:'Dòng tiêu đề thứ hai'}},{key:'third_line',bilingual:true,type:'text',label:{en:'Third heading line (hero)',vi:'Dòng tiêu đề thứ ba (đầu trang)'}}]}
];
const take=result=>{if(result.error)throw result.error;const value=result.data;return Array.isArray(value)&&value.length===1?value[0]:value};
const imageExtensions={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'};
const describeMedia=({alt_en='',alt_vi='',caption_en='',caption_vi=''}={})=>({
 p_alt_en:alt_en.trim(),p_alt_vi:alt_vi.trim(),p_caption_en:caption_en.trim(),p_caption_vi:caption_vi.trim()
});
const mediaText={
 CMS_MEDIA_INVALID:['Use a JPEG, PNG, WebP or AVIF under 5 MB and provide alt text in both languages.','Dùng ảnh JPEG, PNG, WebP hoặc AVIF dưới 5 MB và nhập văn bản thay thế bằng cả hai ngôn ngữ.'],
 CMS_MEDIA_PUBLIC_CONFIRMATION:['Confirm that the image is approved for public use.','Xác nhận ảnh được phép sử dụng công khai.'],
 CMS_MEDIA_NOT_PUBLIC:['Choose a ready image from the public media library or an existing site asset.','Chọn ảnh sẵn sàng từ thư viện công khai hoặc ảnh có sẵn trên trang.'],
 CMS_MEDIA_IN_USE:['This image is still referenced by content or revision history and cannot be deleted.','Ảnh vẫn được nội dung hoặc lịch sử chỉnh sửa tham chiếu và chưa thể xóa.'],
 CMS_MEDIA_MISSING:['The stored file could not be verified. Check the upload or retry with the original file.','Chưa xác minh được tệp đã lưu. Kiểm tra lượt tải lên hoặc thử lại với tệp gốc.'],
 CMS_MEDIA_PENDING:['Removal is pending. Retry from the media library.','Đang chờ xóa. Hãy thử lại từ thư viện tư liệu.'],
 CMS_PUBLISHED_SLUG:['The address of a published article is fixed.','Không thể đổi đường dẫn của bài viết đã đăng.']
};
export function createAgencyCmsAdapter({db,isStaff=()=>false,getUser=()=>null}){
 const allowed=()=>{if(!isStaff()||!getUser()?.id)throw Object.assign(new Error('CMS_ACCESS_DENIED'),{code:'42501'})};
 const rpc=async(name,args)=>{allowed();return take(await db.rpc(name,args))};
 const imageBucket=()=>db.storage.from('gary-cms-media');
 const presentMedia=row=>({
  ...row,owned:row.uploaded_by===getUser()?.id,
  url:row.state==='ready'?publicCmsImage(imageBucket().getPublicUrl(row.object_path).data.publicUrl):''
 });
 const finishMedia=async item=>presentMedia(await rpc('gary_cms_register_media',{
  p_path:item.object_path,p_name:item.file_name,p_mime:item.mime_type,p_size:item.size_bytes,
  p_alt_en:item.alt_en,p_alt_vi:item.alt_vi
 }));
 const resumeMedia=async(item,file)=>{
  allowed();
  if(!file||file.type!==item.mime_type||file.size!==item.size_bytes||file.name.slice(0,200)!==item.file_name)throw new Error('CMS_MEDIA_MISSING');
  try{
   const upload=await imageBucket().upload(item.object_path,file,{upsert:false,contentType:file.type,cacheControl:'300'});
   if(upload.error)throw upload.error;
  }catch(error){
   // Storage may have accepted the upload before its response was lost.
   try{return await finishMedia(item);}catch{throw error;}
  }
  return finishMedia(item);
 };
 const mediaPending=()=>new Error('CMS_MEDIA_PENDING');
 const uniqueArticleSlug=async(record,rejected)=>{
  const base=titleSlug(record);
  if(!base)return '';
  allowed();
  const result=await db.from('gary_cms_entries').select('slug').eq('kind','article').or(`slug.eq.${base},slug.like.${base}-%`);
  if(result.error)throw result.error;
  const taken=new Set([...(result.data??[]).map(row=>row.slug),...rejected]);
  if(!taken.has(base))return base;
  for(let suffix=2;suffix<1000;suffix++){
   const candidate=`${base}-${suffix}`;
   if(candidate.length>180)break;
   if(!taken.has(candidate))return candidate;
  }
  return '';
 };
 return {
  errorText(error,language='en'){
   const values={AGENCY_RECORD_DELETED:['This content is in Trash. Restore it before editing.','Nội dung này đang ở Thùng rác. Khôi phục trước khi chỉnh sửa.'],AGENCY_PUBLISHER_REQUIRED:['A publisher or CMS administrator is required.','Cần quyền duyệt đăng hoặc quản trị CMS.'],CMS_REVIEW_REQUIRED:['Submit the saved draft for review before publishing.','Gửi bản nháp đã lưu để duyệt trước khi đăng.'],CMS_SERVICE_GROUP_REQUIRED:['Choose a service group and enquiry service before submitting for review.','Chọn nhóm dịch vụ và dịch vụ liên hệ trước khi gửi duyệt.'],CMS_LANDING_SLOT_REQUIRED:['Choose the landing-page section before submitting for review.','Chọn phần trên trang chủ trước khi gửi duyệt.'],CMS_TRANSLATION_REQUIRED:['Complete both language versions before submitting for review.','Hoàn thiện cả hai ngôn ngữ trước khi gửi duyệt.'],CMS_INVALID_MEDIA_URL:['Choose an image from this application’s media library or existing site assets.','Chọn ảnh từ thư viện tư liệu của ứng dụng hoặc ảnh hiện có trên trang.']};
   return (values[error?.message]||mediaText[error?.message])?.[language==='vi'?1:0];
  },
  mediaPolicy:{mimeTypes:Object.keys(imageExtensions),maxBytes:5242880,publicImages:true},
  coverUrl:publicCmsImage,
  async capabilities(){
   const caps=await rpc('gary_cms_capabilities');
   const canEdit=caps.role==='editor'||caps.role==='admin';
   return {...caps,edit:canEdit&&caps.edit===true,media:canEdit&&caps.media===true,delete:caps.trash===true};
  },
  async list({kind,query='',status='',page=1,pageSize=20}={}){
   allowed();page=Math.max(1,Math.trunc(page));pageSize=Math.min(100,Math.max(1,Math.trunc(pageSize)));
   const selection=kind==='article'?'*,publication:gary_cms_public(published_at)':'*';
   let request=db.from('gary_cms_entries').select(selection,{count:'exact'}).eq('kind',kind).order('updated_at',{ascending:false}).order('id');
   if(status)request=request.eq('status',status);
   const search=String(query).slice(0,100).replace(/[,%()\\]/g,' ').trim();if(search)request=request.or(`title_en.ilike.%${search}%,title_vi.ilike.%${search}%,slug.ilike.%${search}%`);
   const result=await request.range((page-1)*pageSize,page*pageSize-1);if(result.error)throw result.error;
   return {records:result.data??[],total:result.count??0};
  },
  remove:async(id,{expectedVersion}={})=>rpc('gary_trash_record',{p_kind:'cms',p_id:id,p_expected_version:expectedVersion}),
  async save(record,{expectedVersion}={}){
   if(record?.kind==='article'&&!record.id){
    const payload=structuredClone(record),rejected=new Set();
    let lastError;
    for(let attempt=0;attempt<4;attempt++){
     payload.slug=await uniqueArticleSlug(payload,rejected);
     try{return await rpc('gary_cms_save',{p_record:payload,p_expected_version:null});}
     catch(error){lastError=error;if(String(error?.code)!=='23505')throw error;rejected.add(payload.slug);}
    }
    throw lastError;
   }
   return rpc('gary_cms_save',{p_record:record,p_expected_version:record.id?expectedVersion??record.version:null});
  },
  transition:async(id,status,{expectedVersion}={})=>rpc('gary_cms_transition',{p_id:id,p_status:status,p_expected_version:expectedVersion}),
  async revisions(id){allowed();const result=await db.from('gary_cms_revisions').select('id,version,status,action,snapshot,created_at').eq('entry_id',id).order('version',{ascending:false});if(result.error)throw result.error;return result.data??[]},
  restore:async(id,revisionId,{expectedVersion}={})=>rpc('gary_cms_restore',{p_id:id,p_revision_id:revisionId,p_expected_version:expectedVersion}),
  async listMedia({readyOnly=false}={}){
   allowed();
   const request=db.from('gary_cms_media')
    .select('id,file_name,object_path,mime_type,size_bytes,created_at,uploaded_by,state,version,alt_en,alt_vi,caption_en,caption_vi')
    .order('created_at',{ascending:false}).limit(200);
   const rows=take(await (readyOnly?request.eq('state','ready'):request.neq('state','removed')));
   return (Array.isArray(rows)?rows:rows?[rows]:[]).map(presentMedia);
  },
  async uploadMedia(file,metadata={}){
   allowed();
   const extension=file&&imageExtensions[file.type];
   if(!extension||file.size<=0||file.size>5242880)throw Object.assign(new Error('CMS_MEDIA_INVALID'),{code:'23514'});
   const path=`${getUser().id}/${crypto.randomUUID()}.${extension}`;
   const reservation=await rpc('gary_cms_reserve_media',{
    p_path:path,p_name:file.name.slice(0,200),p_mime:file.type,p_size:file.size,
    ...describeMedia(metadata),p_public_confirmed:metadata.publicConfirmed===true
   });
   return resumeMedia(reservation,file);
  },
  resumeMedia,
  finishMedia,
  updateMedia:(id,metadata)=>rpc('gary_cms_update_media',{p_id:id,p_version:metadata.version,...describeMedia(metadata)}),
  async removeMedia(id){
   const prepared=await rpc('gary_cms_prepare_media_removal',{p_id:id});
   if(prepared.state==='removed')return;
   if(prepared.state!=='deleting'||!prepared.object_path)throw mediaPending();
   await imageBucket().remove([prepared.object_path]).catch(()=>null);
   // Confirm the actual object state even if Storage returned an error or a
   // previous attempt already removed the file.
   let removed;
   try{removed=await rpc('gary_cms_confirm_media_removal',{p_id:id});}catch{throw mediaPending();}
   if(!removed)throw mediaPending();
  }
 };
}
