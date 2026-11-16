/** Language-neutral finding protocol. This module has no DOM, framework, Auth or database dependencies. */
export const FINDING_SCHEMA_VERSION = 1;
const labels = {
  critical:["Critical","Nghiêm trọng"],warning:["Warning","Cảnh báo"],recommendation:["Recommendation","Đề xuất"],passed:["Passed","Đạt"],
  content:["Content SEO","SEO nội dung"],technical:["Technical SEO","SEO kỹ thuật"],translation:["Translation","Bản dịch"],
  queued:["Queued","Đang chờ"],running:["Running","Đang quét"],completed:["Completed","Hoàn tất"],incomplete:["Incomplete","Chưa hoàn tất"],failed:["Failed","Thất bại"],
  inspected:["Inspected","Đã kiểm tra"],skipped:["Skipped","Đã bỏ qua"],pending:["Pending","Đang chờ"],unknown:["Not evaluated","Chưa đánh giá"],
  evidence:["Observed evidence","Bằng chứng quan sát"],action:["Suggested fix","Gợi ý xử lý"],details:["View details","Xem chi tiết"],
  open:["Open","Chưa xử lý"],verified:["Passed in this inspection","Đạt trong lần kiểm tra này"],code:["Issue code","Mã vấn đề"],
};
export function findingLabel(key, language = "en") { return labels[key]?.[language === "vi" ? 1 : 0] || key; }
const vietnameseRules = {
  "content-title.passed": ["Đã có tiêu đề", "Tiêu đề giúp người đọc hiểu nội dung trang trước khi mở.", "Kiểm tra tiêu đề có mô tả chính xác trang cụ thể này hay không."],
  "content-title.warning": ["Thêm tiêu đề mô tả rõ nội dung", "Tiêu đề giúp người đọc hiểu nội dung trang trước khi mở.", "Viết tiêu đề riêng, nêu chủ đề và mục đích của trang."],
  "content-title-specific.recommendation": ["Làm rõ chủ đề trong tiêu đề", "Tiêu đề còn chung chung; người tìm kiếm có thể chưa hiểu chủ đề của trang.", "Nêu dịch vụ, địa điểm hoặc câu hỏi mà trang giải đáp."],
  "content-title-preview.recommendation": ["Kiểm tra phần tiêu đề có thể bị cắt", "Tiêu đề dài có thể bị rút gọn tùy thiết bị và độ rộng ký tự. Không có độ dài cố định để xếp hạng.", "Xem bản xem trước trên máy tính và điện thoại; đặt nội dung phân biệt trang ở đầu tiêu đề."],
  "content-description.passed": ["Đã có mô tả", "Mô tả có thể được dùng làm đoạn trích tìm kiếm. Công cụ tìm kiếm có thể chọn nội dung khác.", "Đảm bảo phần tóm tắt đúng với nội dung trang và giúp người đọc quyết định truy cập."],
  "content-description.warning": ["Thêm mô tả hữu ích", "Mô tả có thể được dùng làm đoạn trích tìm kiếm. Công cụ tìm kiếm có thể chọn nội dung khác.", "Tóm tắt những gì khách truy cập sẽ tìm thấy dựa trên nội dung thực tế của trang."],
  "content-description-preview.recommendation": ["Kiểm tra phần mô tả có thể bị cắt", "Không gian hiển thị đoạn trích thay đổi theo thiết bị và truy vấn; mô tả này có thể bị rút gọn.", "Đặt thông tin quan trọng trước. Không xóa chi tiết hữu ích chỉ để đạt một số lượng ký tự."],
  "content-body.passed": ["Đã có nội dung chính", "Người đọc cần nội dung hiển thị giải đáp đúng mục đích của trang.", "Kiểm tra độ chính xác, tính nguyên bản và khả năng giải đáp câu hỏi chính của người đọc."],
  "content-body.warning": ["Thêm nội dung chính", "Người đọc cần nội dung hiển thị giải đáp đúng mục đích của trang.", "Bổ sung nội dung hữu ích trước khi xuất bản."],
  "content-heading.passed": ["Đã có tiêu đề chính", "Tiêu đề chính hiển thị giúp người đọc nhận biết chủ đề của trang.", "Giữ tiêu đề chính rõ nghĩa và nhất quán với tiêu đề tìm kiếm."],
  "content-heading.warning": ["Thêm tiêu đề chính rõ ràng", "Tiêu đề chính hiển thị giúp người đọc nhận biết chủ đề của trang.", "Thêm tiêu đề chính mô tả chính xác trang này."],
  "content-heading-order.passed": ["Cấu trúc tiêu đề nhất quán", "Tiêu đề trống hoặc nhảy cấp có thể khiến tài liệu khó điều hướng.", "Dùng tiêu đề để mô tả chủ đề của từng phần."],
  "content-heading-order.warning": ["Kiểm tra cấu trúc tiêu đề", "Tiêu đề trống hoặc nhảy cấp có thể khiến tài liệu khó điều hướng.", "Điền các tiêu đề trống và sắp xếp các mục con theo thứ bậc hợp lý."],
  "content-multiple-h1.recommendation": ["Kiểm tra nhiều tiêu đề chính", "Một trang có thể có nhiều tiêu đề H1, nhưng chủ đề chính vẫn cần rõ ràng.", "Kiểm tra người đọc có dễ nhận biết chủ đề chính của trang hay không."],
  "content-image-alt.passed": ["Ảnh đã có thuộc tính alt", "Ảnh cung cấp thông tin cần văn bản thay thế. Thuộc tính alt rỗng hợp lệ cho ảnh trang trí.", "Kiểm tra mô tả có truyền đạt mục đích của từng ảnh hay không; ảnh trang trí có thể để alt rỗng."],
  "content-image-alt.warning": ["Ảnh thiếu thuộc tính alt", "Ảnh cung cấp thông tin cần văn bản thay thế. Thuộc tính alt rỗng hợp lệ cho ảnh trang trí.", "Mô tả các ảnh có thông tin và đặt thuộc tính alt rỗng rõ ràng cho ảnh trang trí."],
  "content-image-alt-quality.recommendation": ["Thay mô tả ảnh chung chung", "Những từ chung chung không truyền đạt thông tin trong ảnh.", "Mô tả chi tiết có ý nghĩa trong ảnh, không chèn từ khóa không liên quan."],
  "content-internal-links.recommendation": ["Cân nhắc liên kết nội bộ phù hợp", "Liên kết theo ngữ cảnh có thể giúp người đọc tìm thông tin liên quan. Không yêu cầu số liên kết cố định cho mỗi trang.", "Liên kết đến dịch vụ, bài viết hoặc tin đăng liên quan khi có ích cho người đọc."],
  "content-link-text.passed": ["Liên kết nội bộ có nhãn mô tả", "Nhãn liên kết cần giải thích đích đến trong ngữ cảnh. Liên kết dùng biểu tượng hoặc ảnh cũng cần tên hỗ trợ tiếp cận.", "Giữ liên kết phù hợp với nội dung xung quanh."],
  "content-link-text.warning": ["Kiểm tra nhãn liên kết nội bộ", "Nhãn liên kết cần giải thích đích đến trong ngữ cảnh. Liên kết dùng biểu tượng hoặc ảnh cũng cần tên hỗ trợ tiếp cận.", "Dùng nhãn nêu rõ đích đến hoặc mô tả ảnh hỗ trợ tiếp cận."],
  "content-repeated-paragraph.warning": ["Phát hiện đoạn văn lặp lại", "Một đoạn văn giống hệt xuất hiện nhiều lần trong nội dung chính.", "Kiểm tra việc lặp lại có chủ đích hay không; gộp các đoạn bị lặp ngoài ý muốn."],
  "content-readability.recommendation": ["Kiểm tra độ rõ ràng và phù hợp", "Số đơn vị từ và câu theo ngôn ngữ chỉ cung cấp ngữ cảnh, không phải điểm chất lượng hay thứ hạng.", "Đọc trang bằng ngôn ngữ mục tiêu. Giải thích thuật ngữ lạ, chia đoạn khó đọc, kiểm chứng thông tin và giải đáp nhu cầu của người đọc."],
  "content-focus-topic.recommendation": ["Kiểm tra mức độ bao quát chủ đề trọng tâm", "Cụm từ chính xác có thể khác từ đồng nghĩa hoặc biến thể vẫn diễn đạt tốt chủ đề.", "Dùng chủ đề một cách tự nhiên khi hữu ích. Tránh lặp ép buộc và mục tiêu mật độ từ khóa."],
};
const technicalRules = {
 'technical-http':['Kiểm tra phản hồi HTTP','Công cụ tìm kiếm cần nhận phản hồi công khai thành công.','Khôi phục trang, sửa liên kết hoặc chuyển hướng có chủ đích đến trang phù hợp.','Phản hồi HTTP thành công'],
 'technical-indexability':['Trang công khai có chỉ thị noindex','Thẻ robots và tiêu đề X-Robots-Tag có thể ngăn lập chỉ mục. Đủ điều kiện không đồng nghĩa đã được lập chỉ mục.','Xác nhận hạn chế có chủ đích. Chỉ gỡ noindex nếu trang công khai này cần xuất hiện trong tìm kiếm.','Không phát hiện chỉ thị noindex'],
 'technical-robots':['Bị chặn bởi robots.txt','Quy tắc robots kiểm soát việc tải trang, độc lập với noindex.','Kiểm tra quy tắc phù hợp trước khi cho phép thu thập trang.','robots.txt cho phép thu thập'],
 'technical-title':['Kiểm tra tiêu đề trong HTML máy chủ','Kiểm tra HTML được gửi về, không phải tiêu đề do trình duyệt thay đổi sau đó.','Cung cấp đúng một tiêu đề có nội dung qua API siêu dữ liệu.','HTML máy chủ có một tiêu đề'],
 'technical-description':['Kiểm tra mô tả trong HTML máy chủ','HTML được gửi về cần thể hiện một lần mô tả dự kiến của trang.','Cung cấp đúng một mô tả có nội dung qua API siêu dữ liệu.','HTML máy chủ có mô tả'],
 'technical-canonical':['Kiểm tra khai báo canonical','Canonical xác định URL ưu tiên; khai báo thiếu, trùng hoặc sai định dạng gây mơ hồ.','Xuất một URL canonical tuyệt đối và xác nhận đích là trang công khai phù hợp.','URL canonical có định dạng hợp lệ'],
 'technical-canonical-target':['Canonical trỏ đến URL khác','Điều này có thể có chủ đích với nội dung trùng, nhưng đích sai có thể hợp nhất nhầm trang.','Xác nhận đây có phải trang trùng không. Nếu trang riêng biệt, canonical phải trỏ đến URL công khai ưu tiên.'],
 'technical-redirects':['Phát hiện chuyển hướng URL','Mỗi bước chuyển hướng tạo thêm yêu cầu và có thể che khuất liên kết cũ.','Cập nhật liên kết và sitemap đến đích cuối; rút ngắn chuỗi chuyển hướng khi có thể.'],
 'technical-sitemap':['Trang chưa có trong sitemap đã kiểm tra','Sitemap hỗ trợ phát hiện URL ưu tiên; thiếu một URL không tự động ngăn lập chỉ mục.','Thêm URL canonical công khai nếu trang cần được lập chỉ mục.','Trang có trong sitemap'],
 'technical-sitemap-noindex':['Sitemap chứa trang noindex','Sitemap và chỉ thị lập chỉ mục đang thể hiện ý định trái nhau.','Xóa trang được loại trừ có chủ đích khỏi sitemap hoặc sửa chỉ thị noindex không mong muốn.'],
 'technical-broken-links':['Phát hiện liên kết trả về lỗi','Chỉ phân loại liên kết hỏng khi đã quan sát phản hồi HTTP lỗi. Liên kết chưa kiểm tra chưa được xác nhận.','Sửa đích hoặc thay bằng trang liên quan hoạt động; kiểm tra riêng các liên kết bỏ qua.','Liên kết đã kiểm tra không có lỗi đã biết'],
 'technical-structured-data':['Kiểm tra cấu trúc JSON-LD','Kiểm tra cú pháp và đối tượng có loại dữ liệu, không xác nhận điều kiện kết quả nhiều định dạng.','Sửa JSON không hợp lệ và dùng loại dữ liệu phù hợp với nội dung hiển thị; kiểm tra bằng công cụ xác thực chuyên dụng.','JSON-LD phân tích được'],
 'technical-language':['Khai báo ngôn ngữ tài liệu','Thuộc tính lang hỗ trợ công cụ xử lý ngôn ngữ và khả năng tiếp cận.','Đặt lang đúng với ngôn ngữ thực tế của phản hồi.','Đã khai báo ngôn ngữ HTML'],
 'technical-hreflang':['Kiểm tra khai báo ngôn ngữ thay thế','Đúng cú pháp chưa xác nhận đích ngôn ngữ hoặc liên kết đối ứng.','Dùng URL ngôn ngữ riêng biệt, tự tham chiếu và liên kết đối ứng; kiểm tra ngôn ngữ thực tế của đích.','Khai báo hreflang có định dạng hợp lệ'],
 'technical-hreflang-self':['Thiếu tự tham chiếu trong các ngôn ngữ thay thế','Mỗi trang trong nhóm hreflang cần có chính nó cùng các bản ngôn ngữ khác; x-default không thay thế tự tham chiếu ngôn ngữ.','Thêm URL công khai của trang với mã ngôn ngữ phù hợp vào nhóm hreflang.','Các ngôn ngữ thay thế bao gồm trang này'],
 'technical-viewport':['Kiểm tra viewport trên thiết bị di động','Viewport chỉ là một điều kiện; lần quét không đo khả năng sử dụng trang đã hiển thị trên điện thoại.','Khai báo viewport theo chiều rộng thiết bị và kiểm tra bố cục thực tế.','Đã khai báo viewport thích ứng'],
 'technical-response-time':['Đã ghi nhận thời gian phản hồi máy chủ','Một lần tải máy chủ không phải phép đo Core Web Vitals hoặc hiệu năng trình duyệt.','So sánh qua nhiều lần; dùng công cụ hiệu năng trình duyệt để điều tra trang chậm.'],
 'response-content-type':['Trang công khai không trả về HTML','Phản hồi quan sát không có kiểu nội dung HTML dự kiến.','Kiểm tra đích và cơ chế thương lượng kiểu nội dung của trang.'],
 'language-response':['Ngôn ngữ công khai khác biến thể yêu cầu','Ngôn ngữ HTML máy chủ quan sát không khớp ngôn ngữ được yêu cầu.','Kiểm tra định tuyến ngôn ngữ, cookie và thuộc tính lang trong HTML máy chủ.'],
 'broken-links':['Phát hiện liên kết hỏng','Một hoặc nhiều đích đã trả về phản hồi HTTP lỗi.','Cập nhật hoặc gỡ các đích lỗi và quét lại trang chứa liên kết.'],
 'sitemap-discovery':['Kiểm tra mức bao phủ sitemap','URL ưu tiên chưa được xác nhận trong các sitemap đã tải thành công.','Giữ các URL canonical, công khai và có thể lập chỉ mục trong sitemap.','Trang có trong sitemap'],
 'sitemap-coverage':['Kiểm tra mức bao phủ sitemap','Kiểm tra URL ưu tiên và phạm vi sitemap đã tải thành công.','Giữ các URL canonical, công khai và có thể lập chỉ mục trong sitemap.','Trang có trong sitemap'],
 'link-coverage':['Một số đích liên kết chưa được xác minh','Một số liên kết có thể bị loại trừ, bị chặn, ở bên ngoài hoặc vượt giới hạn quét.','Xem URL bỏ qua và kiểm tra lại đích liên quan. Lần quét không xác nhận liên kết chưa kiểm tra.'],
 'canonical-target-unverified':['Chưa xác minh đích canonical','Khai báo canonical chỉ là gợi ý; đích chưa có phản hồi đã kiểm tra phù hợp.','Xác nhận URL đích trả về HTML có thể lập chỉ mục và canonical nhất quán.'],
 'canonical-target-indexing':['Canonical trỏ đến đích không thể lập chỉ mục','Đích canonical không thể lập chỉ mục trong lần quét này.','Chọn đích canonical có thể lập chỉ mục hoặc sửa trạng thái HTTP và hạn chế lập chỉ mục.'],
 'hreflang-reciprocal':['Kiểm tra liên kết ngôn ngữ đối ứng','Không xác nhận được liên kết quay lại giữa các URL ngôn ngữ từ phản hồi đã lưu.','Đảm bảo mỗi bản ngôn ngữ chứa chính nó và liên kết đến các bản khác với mã phù hợp.','Đã xác nhận liên kết ngôn ngữ đối ứng'],
 'hreflang-unverified':['Chưa xác minh đầy đủ đích ngôn ngữ thay thế','Đích ngôn ngữ thay thế chưa có phản hồi đã kiểm tra phù hợp.','Xác nhận đích có thể lập chỉ mục và có liên kết hreflang quay lại trang này.'],
 'hreflang-target-language':['Đích ngôn ngữ thay thế trả về sai ngôn ngữ','Ngôn ngữ HTML của đích không khớp ngôn ngữ được khai báo trong hreflang.','Để URL thay thế phục vụ đúng ngôn ngữ độc lập với cookie hoặc gỡ bản ngôn ngữ chưa hỗ trợ.'],
};
for (const [id,copy] of Object.entries(technicalRules)) for (const severity of ['critical','warning','recommendation','passed']) {
 vietnameseRules[`${id}.${severity}`]=[severity==='passed'?(copy[3]||copy[0]):copy[0],copy[1],copy[2]];
}
// English is also resolved from codes. Stored English prose remains a legacy
// presentation fallback, not a requirement for new language-neutral records.
const englishRules = {
 'content-title':['Add a descriptive title','A title helps readers understand the page before opening it.','Write a unique title that names the topic and purpose of this page.','Title is present'],
 'content-title-specific':['Make the title more specific','A generic title may not identify the subject clearly in search results.','Name the service, location or question that the page addresses.'],
 'content-title-preview':['Review title truncation','Long titles may be shortened depending on device and character widths. There is no fixed ranking length.','Use desktop and mobile previews and put the distinguishing topic first.'],
 'content-description':['Add a useful description','The description is a candidate search snippet. Search engines may choose different text.','Summarize what visitors will find using the actual page content.','Description is present'],
 'content-description-preview':['Review description truncation','Snippet space varies by device and query; this description may be shortened.','Put essential information first without removing useful detail solely to meet a character target.'],
 'content-body':['Add the main content','Readers need visible content that answers the purpose of the page.','Add useful primary content before publishing.','Main content is present'],
 'content-heading':['Add a clear main heading','A visible main heading gives readers the subject of the page.','Add a descriptive main heading consistent with the page title.','Main heading is present'],
 'content-heading-order':['Review heading structure','Empty headings or jumps in heading levels can make a document harder to navigate.','Fill empty headings and nest subsections in a logical order.','Heading structure is consistent'],
 'content-multiple-h1':['Review multiple main headings','Multiple H1 headings are allowed, but the primary topic should remain clear.','Check that readers can identify the main subject of the page.'],
 'content-image-alt':['Images lack an alt attribute','Informative images need a text alternative. An empty alt attribute is valid for decorative images.','Describe informative images and use an explicit empty alt attribute for decorative images.','Image alt attributes are present'],
 'content-image-alt-quality':['Replace generic image descriptions','Generic words do not convey the information shown in an image.','Describe what matters in each image without adding unrelated keywords.'],
 'content-internal-links':['Consider relevant internal links','Contextual links help readers discover related information; every page does not need a fixed number.','Link to relevant services, articles or listings where this helps the reader.'],
 'content-link-text':['Review internal link labels','Link text should explain the destination in context. Icon and image links also need accessible names.','Use destination-specific labels or accessible image descriptions.','Internal links have descriptive labels'],
 'content-repeated-paragraph':['Repeated paragraph detected','An identical paragraph appears more than once in the main content.','Review whether repetition is intentional and consolidate accidental duplication.'],
 'content-readability':['Review clarity and relevance','Language-aware word and sentence counts provide context, not quality or ranking scores.','Read the page in its target language, explain unfamiliar terms, verify facts and answer the reader’s intent.'],
 'content-focus-topic':['Review focus topic coverage','Exact phrase coverage is only context; synonyms and inflections may also express the topic well.','Use the topic naturally where helpful. Avoid forced repetition and keyword density targets.'],
 'technical-http':['Page is not a successful response','Search crawlers depend on a successful public HTTP response.','Restore the page, correct its links or deliberately redirect to a relevant replacement.','Successful HTTP response'],
 'technical-indexability':['Public page has a noindex directive','HTML robots tags and X-Robots-Tag headers can prevent indexing. Eligibility does not guarantee indexing.','Confirm the restriction is intended. Remove it only if this page should appear in search.','No noindex directive found'],
 'technical-robots':['Blocked by robots.txt','Robots rules control fetching independently of noindex directives.','Review the matching rule before allowing this page to be crawled.','Crawling permitted by robots.txt'],
 'technical-title':['Review server-rendered title','This check inspects delivered HTML, rather than a browser’s subsequently changed document title.','Deliver exactly one nonempty title through the Metadata API.','Server HTML contains one title'],
 'technical-description':['Review server-rendered description','Delivered HTML should expose the intended page description once.','Deliver exactly one nonempty description through the Metadata API.','Server HTML contains a description'],
 'technical-canonical':['Review canonical declaration','Missing, multiple or malformed canonical declarations make the preferred URL ambiguous.','Emit one absolute canonical URL and confirm the destination is the intended public indexable page.','Canonical URL is parseable'],
 'technical-canonical-target':['Canonical points to another URL','A different canonical can be intentional for duplicates, but a mistaken target can consolidate the wrong page.','Check whether the page is a duplicate. Unique pages should identify their own public preferred URL.'],
 'technical-redirects':['Redirect chain detected','Redirect hops add requests and may conceal stale internal links.','Update links and sitemap entries to the final destination and shorten chains where possible.'],
 'technical-sitemap':['Page is absent from the inspected sitemap','A sitemap helps discover preferred public URLs; absence alone does not prevent indexing.','Include the canonical public URL if this page should be indexed.','Page appears in the sitemap'],
 'technical-sitemap-noindex':['Sitemap includes a noindex page','Sitemap inclusion and the indexing directive express conflicting intentions.','Remove intentionally excluded pages from the sitemap or correct an unintended noindex directive.'],
 'technical-broken-links':['Broken link responses detected','Only links with observed failing HTTP responses are classified as broken. Unchecked links are not validated.','Correct each destination or replace it with a relevant working page. Review unchecked links separately.','Inspected links returned no known errors'],
 'technical-structured-data':['Review JSON-LD structure','Syntax and typed-object checks do not establish rich-result eligibility.','Use a suitable type for visible content, correct invalid JSON and validate eligibility with a specialist tool.','JSON-LD can be parsed'],
 'technical-language':['Declare the document language','The lang attribute supports language processing and accessibility.','Set lang to the actual language of the delivered response.','HTML language is declared'],
 'technical-hreflang':['Review language alternate declarations','Correct syntax alone does not verify the alternate language or reciprocal references.','Use distinct localized URLs with self references and reciprocal alternates, then check each response language.','Language alternate declarations are parseable'],
 'technical-hreflang-self':['Language alternates lack a self reference','Each hreflang set needs the current page and its language alternatives; x-default does not replace a language self reference.','Add this public page URL with the appropriate language code.','Language alternates include this page'],
 'technical-viewport':['Review the mobile viewport','Viewport metadata is one prerequisite, not a measurement of rendered mobile usability.','Declare a device-width viewport and test the actual layout.','Responsive viewport declared'],
 'technical-response-time':['Server response timing recorded','One server fetch is not a Core Web Vitals or browser performance measurement.','Compare repeated observations and investigate slow pages with browser performance tools.'],
 'response-content-type':['Public page did not return HTML','The observed response did not have the expected HTML content type.','Check the destination and content negotiation for this published page.'],
 'language-response':['Published language differs from the requested variant','The observed server-rendered HTML language differs from the requested language.','Review locale routing, cookies and the delivered HTML lang attribute.'],
 'broken-links':['Broken links detected','One or more destinations returned an observed failing HTTP response.','Update or remove failing destinations and rescan the referring page.'],
 'sitemap-discovery':['Review sitemap coverage','The preferred URL was not confirmed in successfully retrieved sitemap inventories.','Keep canonical public indexable URLs in the sitemap.','Page appears in the sitemap'],
 'sitemap-coverage':['Review sitemap coverage','Check preferred URLs against successfully retrieved sitemap inventories.','Keep canonical public indexable URLs in the sitemap.','Page appears in the sitemap'],
 'link-coverage':['Some link targets remain unverified','Some links may be excluded, blocked, external or beyond crawl limits.','Review skipped destinations and recheck relevant targets; this audit does not validate unchecked links.'],
 'canonical-target-unverified':['Canonical target is not verified','A canonical declaration is a hint; its target lacks a matching inspected response.','Confirm the target returns indexable HTML with a consistent canonical declaration.'],
 'canonical-target-indexing':['Canonical target is not indexable','The canonical target was not indexable in this inspection.','Choose an indexable canonical target or correct its HTTP response and indexing restrictions.'],
 'hreflang-reciprocal':['Review reciprocal language references','A return link between localized URLs was not confirmed from saved responses.','Ensure every indexable language version includes itself and reciprocal alternates.','Reciprocal language references confirmed'],
 'hreflang-unverified':['Language alternate targets were not fully verified','The alternate target does not have a matching inspected response.','Confirm the target is indexable and links back using hreflang.'],
 'hreflang-target-language':['Language alternate returned the wrong language','The target HTML language differs from the language declared in hreflang.','Serve the correct language independently of cookies or remove the unsupported alternate.'],
};
const cmsRules = {
 'cms-field-required': [['Complete the required field','Điền trường bắt buộc'],['This collection requires this field before publication.','Loại nội dung này yêu cầu trường này trước khi đăng.'],['Complete the highlighted field in each required language.','Điền trường được đánh dấu bằng từng ngôn ngữ bắt buộc.']],
 'cms-url-invalid': [['Review the link address','Kiểm tra địa chỉ liên kết'],['The supplied link is not an allowed web address or local path.','Liên kết đã nhập không phải địa chỉ web hoặc đường dẫn nội bộ hợp lệ.'],['Use a valid address supported by this application; executable links are not allowed.','Dùng địa chỉ hợp lệ mà ứng dụng hỗ trợ; không dùng liên kết thực thi mã.']],
 'cms-number-invalid': [['Review the numeric value','Kiểm tra giá trị số'],['The value is not a valid number within the allowed range.','Giá trị không phải số hợp lệ trong phạm vi cho phép.'],['Enter a number within the field’s displayed limits.','Nhập một số trong giới hạn của trường.']],
 'cms-option-invalid': [['Choose an available option','Chọn một giá trị có sẵn'],['The saved value is not one of this field’s available choices.','Giá trị đã lưu không nằm trong các lựa chọn của trường này.'],['Choose an available value and save the draft again.','Chọn giá trị có sẵn rồi lưu lại bản nháp.']],
 'cms-date-invalid': [['Review the date','Kiểm tra ngày'],['This field needs a valid date.','Trường này cần ngày hợp lệ.'],['Choose a date using the date field.','Chọn ngày bằng trường nhập ngày.']],
 'cms-title-missing': [['Add the translated title','Thêm tiêu đề đã dịch'],['Each published language needs a descriptive title.','Mỗi ngôn ngữ xuất bản cần tiêu đề mô tả rõ nội dung.'],['Complete this language before publishing.','Hoàn thiện ngôn ngữ này trước khi xuất bản.']],
 'cms-summary-missing': [['Add the translated summary','Thêm tóm tắt đã dịch'],['A summary helps visitors understand the page.','Tóm tắt giúp khách truy cập hiểu nội dung trang.'],['Write a useful summary in this language.','Viết tóm tắt hữu ích bằng ngôn ngữ này.']],
 'cms-body-missing': [['Add translated primary content','Thêm nội dung chính đã dịch'],['Visitors need useful primary content in the selected language.','Khách truy cập cần nội dung chính hữu ích bằng ngôn ngữ đã chọn.'],['Complete the main content before publishing.','Hoàn thiện nội dung chính trước khi xuất bản.']],
 'cms-seo-title-length': [['Review search title length','Kiểm tra độ dài tiêu đề tìm kiếm'],['Search titles may be shortened depending on device and query.','Tiêu đề tìm kiếm có thể bị rút gọn tùy thiết bị và truy vấn.'],['Preview both languages and place the distinguishing topic first.','Xem trước cả hai ngôn ngữ và đặt chủ đề phân biệt ở đầu.']],
 'cms-seo-description-length': [['Review search description length','Kiểm tra độ dài mô tả tìm kiếm'],['Snippet space varies; length alone does not predict ranking.','Không gian đoạn trích thay đổi; độ dài không tự dự đoán thứ hạng.'],['Use an accurate and useful summary without padding for a target length.','Dùng tóm tắt chính xác, hữu ích; không thêm chữ chỉ để đạt độ dài.']],
 'cms-slug': [['Review the public URL','Kiểm tra URL công khai'],['The address must use the application’s supported unique slug format.','Địa chỉ cần dùng định dạng slug duy nhất mà ứng dụng hỗ trợ.'],['Use lowercase letters, numbers and single hyphens.','Dùng chữ thường không dấu, số và dấu gạch nối đơn.']],
 'cms-translation-complete': [['Both language versions are complete','Đã hoàn thiện cả hai bản ngôn ngữ'],['Required English and Vietnamese content is present.','Đã có nội dung tiếng Anh và tiếng Việt bắt buộc.'],['Review factual accuracy and language quality before publishing.','Kiểm tra tính chính xác và chất lượng bản dịch trước khi xuất bản.']],
};
export const knownFindingCodes = Object.freeze([...new Set([...Object.keys(vietnameseRules).map(key=>key.slice(0,key.lastIndexOf('.'))),...Object.keys(cmsRules)])]);
/** Additive protocol upgrade; old IDs and stored evidence remain intact. */
export function normalizeFinding(finding) {
 let code=String(finding.code || finding.messageKey || finding.id || 'unknown');
 const localized=/^(hreflang-reciprocal|hreflang-unverified|hreflang-target-language)-(.+)$/.exec(code);
 const params={...(finding.messageValues||{}),...(finding.params||{})};
 if(localized){code=localized[1];params.language??=localized[2];}
 const evidence=String(finding.evidence||'');
 if(code==='technical-http'&&/^\d{3}$/.test(evidence))params.status??=Number(evidence);
 if(['technical-title','technical-description'].includes(code)&&/^\d+ /.test(evidence))params.count??=Number(evidence.match(/^\d+/)[0]);
 if(code==='technical-response-time'){
  const timing=/^(\d+) ms(?:; (\d+) HTML bytes)?$/.exec(evidence);
  if(timing){params.milliseconds??=Number(timing[1]);if(timing[2])params.bytes??=Number(timing[2]);}
 }
 if(code==='technical-structured-data'){
  const counts=/^(\d+) blocks; (\d+) invalid JSON; (\d+) without/.exec(evidence);
  if(counts){params.blocks??=Number(counts[1]);params.invalid??=Number(counts[2]);params.missingType??=Number(counts[3]);}
 }
 return {...finding,code,params,schemaVersion:FINDING_SCHEMA_VERSION};
}
export function localizeFinding(finding, language='en') {
 const normalized=normalizeFinding(finding),code=normalized.code,vi=language==='vi';
 if(cmsRules[code]) {
  const copy=cmsRules[code];return {...normalized,title:copy[0][vi?1:0],explanation:copy[1][vi?1:0],recommendation:copy[2][vi?1:0]};
 }
 if(!vi) {
  if(finding.title&&finding.explanation&&finding.recommendation)return finding;
  const copy=englishRules[code];
  if(copy){
   let [title,explanation,recommendation]=copy;
   if(finding.severity==='passed')title=copy[3]||title;
   if(code==='content-readability'&&normalized.params.words!==undefined&&normalized.params.sentences!==undefined)explanation=`Detected ${normalized.params.words} language-aware word segments and ${normalized.params.sentences} sentences. These counts are context, not quality or ranking scores.`;
   if(code==='content-focus-topic'&&Array.isArray(normalized.params.missingAreas)){
    title=normalized.params.missingAreas.length?'Review focus topic coverage':'Focus phrase appears in key areas';
    explanation=normalized.params.missingAreas.length?`The exact focus phrase is absent from: ${normalized.params.missingAreas.join(', ')}. Synonyms and inflections may still express the topic well.`:'The exact phrase occurs in the title, description, headings and main content. This does not establish relevance or search intent.';
   }
   return {...normalized,title,explanation,recommendation};
  }
  return {...normalized,title:finding.title||`SEO check: ${code}`,explanation:finding.explanation||'This finding needs guidance from the current issue catalogue.',recommendation:finding.recommendation||'Review the original evidence and add guidance for this issue code before deciding on a change.'};
 }
 const family=code.startsWith('hreflang-reciprocal-')?'hreflang-reciprocal':code;
 const copy=vietnameseRules[`${family}.${finding.severity}`];
 if(!copy) return {...normalized,title:`Kiểm tra SEO: ${code}`,explanation:'Vấn đề này chưa có nội dung hướng dẫn trong phiên bản danh mục hiện tại.',recommendation:'Xem bằng chứng gốc và cập nhật danh mục theo mã vấn đề trước khi quyết định xử lý.'};
 let [title,explanation,recommendation]=copy,evidence=finding.evidence;const values=normalized.params;
 if(code==='content-title-preview'&&values.characters!==undefined)evidence=`${values.characters} ký tự`;
 if(code==='content-readability'&&values.words!==undefined&&values.sentences!==undefined)explanation=`Phát hiện ${values.words} đơn vị từ và ${values.sentences} câu theo ngôn ngữ. Các số đếm này cung cấp ngữ cảnh, không phải điểm chất lượng hay thứ hạng.`;
 if(code==='content-focus-topic'&&Array.isArray(values.missingAreas)){
  const names={title:'tiêu đề',description:'mô tả',headings:'các tiêu đề mục','main content':'nội dung chính'};
  title=values.missingAreas.length?'Kiểm tra mức độ bao quát chủ đề trọng tâm':'Cụm từ trọng tâm xuất hiện ở các phần chính';
  explanation=values.missingAreas.length?`Cụm từ trọng tâm chính xác chưa xuất hiện trong: ${values.missingAreas.map(x=>names[x]||x).join(', ')}. Từ đồng nghĩa và biến thể vẫn có thể diễn đạt tốt chủ đề.`:'Cụm từ chính xác xuất hiện trong tiêu đề, mô tả, tiêu đề mục và nội dung chính. Điều này chưa khẳng định tính phù hợp hoặc ý định tìm kiếm.';
 }
 if(code==='technical-title'&&/^\d+ title elements$/.test(evidence||''))evidence=evidence.replace('title elements','phần tử tiêu đề');
 if(code==='technical-description'&&/^\d+ description elements$/.test(evidence||''))evidence=evidence.replace('description elements','phần tử mô tả');
 return {...normalized,title,explanation,recommendation,...(evidence!==undefined?{evidence}:{})};
}
export const tFinding=localizeFinding;
