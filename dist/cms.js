// Agency adapter: shared presentation never owns this application's credentials,
// membership decisions, queries, or publication snapshots.
export const agencyCollections=[
 {kind:'service',label:{en:'Visa services',vi:'Dịch vụ visa'},fields:[{key:'data.category',label:{en:'Service group',vi:'Nhóm dịch vụ'},type:'select',options:[{value:'travel',label:{en:'Entry & travel',vi:'Nhập cảnh & du lịch'}},{value:'settle',label:{en:'Work & residence',vi:'Làm việc & cư trú'}},{value:'documents',label:{en:'Documents',vi:'Giấy tờ'}}]},{key:'data.service_type',label:{en:'Enquiry service',vi:'Dịch vụ khi liên hệ'},type:'select',options:[{value:'visa',label:{en:'Visa',vi:'Visa'}},{value:'work',label:{en:'Work permits',vi:'Giấy phép lao động'}},{value:'residence',label:{en:'Residence cards',vi:'Thẻ tạm trú'}},{value:'documents',label:{en:'Document support',vi:'Hỗ trợ giấy tờ'}}]},{key:'includes',bilingual:true,type:'textarea',label:{en:'Included support (one item per line)',vi:'Hỗ trợ bao gồm (mỗi dòng một mục)'}},{key:'data.image_url',type:'url',label:{en:'Image URL',vi:'Đường dẫn ảnh'}}]},
 {kind:'eligibility',label:{en:'Eligibility information',vi:'Thông tin điều kiện'},fields:[{key:'data.service_slug',type:'text',label:{en:'Related service slug',vi:'Đường dẫn dịch vụ liên quan'}},{key:'data.reviewed_on',type:'date',label:{en:'Last reviewed',vi:'Ngày rà soát'}},{key:'data.source_url',type:'url',label:{en:'Official source',vi:'Nguồn chính thức'}}]},
 {kind:'document',label:{en:'Document requirements',vi:'Giấy tờ cần chuẩn bị'},fields:[{key:'data.service_slug',type:'text',label:{en:'Related service slug',vi:'Đường dẫn dịch vụ liên quan'}},{key:'data.required',type:'select',options:[{value:'required',label:{en:'Required',vi:'Bắt buộc'}},{value:'conditional',label:{en:'Depending on the case',vi:'Tùy trường hợp'}},{value:'optional',label:{en:'Optional',vi:'Không bắt buộc'}}],label:{en:'Requirement',vi:'Yêu cầu'}},{key:'data.source_url',type:'url',label:{en:'Official source',vi:'Nguồn chính thức'}}]},
 {kind:'process',label:{en:'Process steps',vi:'Các bước thực hiện'},fields:[{key:'data.position',type:'number',label:{en:'Display order',vi:'Thứ tự hiển thị'}},{key:'label',bilingual:true,type:'text',label:{en:'Step label',vi:'Nhãn bước'}}]},
 {kind:'faq',label:{en:'FAQs',vi:'Câu hỏi thường gặp'},fields:[{key:'data.position',type:'number',label:{en:'Display order',vi:'Thứ tự hiển thị'}},{key:'data.service_slug',type:'text',label:{en:'Related service (optional)',vi:'Dịch vụ liên quan (không bắt buộc)'}}]},
 {kind:'article',label:{en:'Articles & guides',vi:'Bài viết & hướng dẫn'},fields:[{key:'data.image_url',type:'url',label:{en:'Cover image URL',vi:'Đường dẫn ảnh bìa'}},{key:'data.source_url',type:'url',label:{en:'Reference source',vi:'Nguồn tham khảo'}},{key:'data.reviewed_on',type:'date',label:{en:'Last reviewed',vi:'Ngày rà soát'}}]},
 {kind:'landing',label:{en:'Landing-page content',vi:'Nội dung trang chủ'},requireBody:false,fields:[{key:'data.slot',type:'select',options:[{value:'hero',label:{en:'Opening section',vi:'Phần mở đầu'}},{value:'services',label:{en:'Services introduction',vi:'Giới thiệu dịch vụ'}},{value:'process',label:{en:'Process introduction',vi:'Giới thiệu quy trình'}},{value:'about',label:{en:'About the team',vi:'Về đội ngũ'}},{value:'faq',label:{en:'FAQ introduction',vi:'Giới thiệu câu hỏi thường gặp'}},{value:'contact',label:{en:'Contact introduction',vi:'Giới thiệu liên hệ'}}],label:{en:'Page section',vi:'Phần trên trang'}},{key:'accent',bilingual:true,type:'text',label:{en:'Second heading line',vi:'Dòng tiêu đề thứ hai'}},{key:'third_line',bilingual:true,type:'text',label:{en:'Third heading line (hero)',vi:'Dòng tiêu đề thứ ba (đầu trang)'}}]}
];
const take=result=>{if(result.error)throw result.error;const value=result.data;return Array.isArray(value)&&value.length===1?value[0]:value};
export function createAgencyCmsAdapter({db,isStaff=()=>false,getUser=()=>null}){
 const allowed=()=>{if(!isStaff()||!getUser()?.id)throw Object.assign(new Error('CMS_ACCESS_DENIED'),{code:'42501'})};
 const rpc=async(name,args)=>{allowed();return take(await db.rpc(name,args))};
 return {
  errorText(error,language='en'){
   const values={AGENCY_RECORD_DELETED:['This content is in Trash. Restore it before editing.','Nội dung này đang ở Thùng rác. Khôi phục trước khi chỉnh sửa.'],AGENCY_PUBLISHER_REQUIRED:['A publisher or CMS administrator is required.','Cần quyền duyệt đăng hoặc quản trị CMS.'],CMS_REVIEW_REQUIRED:['Submit the saved draft for review before publishing.','Gửi bản nháp đã lưu để duyệt trước khi đăng.'],CMS_SERVICE_GROUP_REQUIRED:['Choose a service group and enquiry service before submitting for review.','Chọn nhóm dịch vụ và dịch vụ liên hệ trước khi gửi duyệt.'],CMS_LANDING_SLOT_REQUIRED:['Choose the landing-page section before submitting for review.','Chọn phần trên trang chủ trước khi gửi duyệt.'],CMS_TRANSLATION_REQUIRED:['Complete both language versions before submitting for review.','Hoàn thiện cả hai ngôn ngữ trước khi gửi duyệt.'],CMS_INVALID_MEDIA_URL:['Choose an image from this application’s media library or existing site assets.','Chọn ảnh từ thư viện tư liệu của ứng dụng hoặc ảnh hiện có trên trang.']};
   return values[error?.message]?.[language==='vi'?1:0];
  },
  mediaPolicy:{mimeTypes:['image/jpeg','image/png','image/webp','image/avif'],maxBytes:5242880},
  async capabilities(){allowed();const caps=await rpc('gary_cms_capabilities');return {...caps,delete:caps.trash===true}},
  async list({kind,query='',status='',page=1,pageSize=20}={}){
   allowed();page=Math.max(1,Math.trunc(page));pageSize=Math.min(100,Math.max(1,Math.trunc(pageSize)));
   let request=db.from('gary_cms_entries').select('*',{count:'exact'}).eq('kind',kind).order('updated_at',{ascending:false}).order('id');
   if(status)request=request.eq('status',status);
   const search=String(query).slice(0,100).replace(/[,%()\\]/g,' ').trim();if(search)request=request.or(`title_en.ilike.%${search}%,title_vi.ilike.%${search}%,slug.ilike.%${search}%`);
   const result=await request.range((page-1)*pageSize,page*pageSize-1);if(result.error)throw result.error;
   return {records:result.data??[],total:result.count??0};
  },
  remove:async(id,{expectedVersion}={})=>rpc('gary_trash_record',{p_kind:'cms',p_id:id,p_expected_version:expectedVersion}),
  save:async(record,{expectedVersion}={})=>rpc('gary_cms_save',{p_record:record,p_expected_version:record.id?expectedVersion??record.version:null}),
  transition:async(id,status,{expectedVersion}={})=>rpc('gary_cms_transition',{p_id:id,p_status:status,p_expected_version:expectedVersion}),
  async revisions(id){allowed();const result=await db.from('gary_cms_revisions').select('id,version,status,action,snapshot,created_at').eq('entry_id',id).order('version',{ascending:false});if(result.error)throw result.error;return result.data??[]},
  restore:async(id,revisionId,{expectedVersion}={})=>rpc('gary_cms_restore',{p_id:id,p_revision_id:revisionId,p_expected_version:expectedVersion}),
  async listMedia(){allowed();const result=await db.from('gary_cms_media').select('id,file_name,object_path,mime_type,size_bytes,created_at,alt_en,alt_vi').order('created_at',{ascending:false}).limit(200);if(result.error)throw result.error;return (result.data??[]).map(row=>({...row,url:db.storage.from('gary-cms-media').getPublicUrl(row.object_path).data.publicUrl}))},
  async uploadMedia(file,{alt_en='',alt_vi=''}={}){
   allowed();const types={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/avif':'avif'};
   if(!file||!types[file.type]||file.size<=0||file.size>5242880)throw Object.assign(new Error('CMS_MEDIA_INVALID'),{code:'23514'});
   const owner=getUser().id,path=`${owner}/${crypto.randomUUID()}.${types[file.type]}`;
   const upload=await db.storage.from('gary-cms-media').upload(path,file,{upsert:false,contentType:file.type,cacheControl:'3600'});if(upload.error)throw upload.error;
   // If registration fails, preserve the staged object for an owner to reconcile;
   // never delete a file that a concurrent publication may now reference.
   const row=await rpc('gary_cms_register_media',{p_path:path,p_name:file.name.slice(0,200),p_mime:file.type,p_size:file.size,p_alt_en:String(alt_en).slice(0,300),p_alt_vi:String(alt_vi).slice(0,300)});
   return {...row,url:db.storage.from('gary-cms-media').getPublicUrl(path).data.publicUrl};
  }
 };
}
