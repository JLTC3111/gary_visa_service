// This module is also shipped with Visa and Jobs so each app can deploy independently.
export const propertyPhoto = {targetBytes:240_000, maxBytes:500_000, maxEdge:1920, minEdge:1280};
export const editorialPhoto = {targetBytes:300_000, maxBytes:650_000, maxEdge:2400, minEdge:1600, keepProtectedResolution:true};
export const avatarPhoto = {targetBytes:45_000, maxBytes:100_000, maxEdge:384, minEdge:256};
const qualities = [0.86, 0.78, 0.72];
const extensions = {'image/jpeg':'jpg', 'image/png':'png', 'image/webp':'webp', 'image/avif':'avif'};
export const imageTypes = Object.keys(extensions);

function imageError(code) {
  return Object.assign(new Error(code), {code});
}

export function imageOptimizationErrorText(error, language = 'en') {
  const messages = {
    IMAGE_SIZE:['Choose a smaller image file.','Hãy chọn tệp ảnh nhỏ hơn.'],
    IMAGE_TYPE:['Choose a supported still image.','Hãy chọn ảnh tĩnh có định dạng được hỗ trợ.'],
    IMAGE_PIXELS:['This image has too many pixels. Resize it and try again.','Ảnh có quá nhiều điểm ảnh. Hãy giảm kích thước rồi thử lại.'],
    IMAGE_UNREADABLE:['This image could not be opened. Choose another file.','Không thể mở ảnh này. Hãy chọn tệp khác.'],
    IMAGE_METADATA:['This image exceeds the upload limit with its embedded metadata. Choose a smaller copy that retains the metadata.','Ảnh vượt giới hạn tải lên khi giữ siêu dữ liệu. Hãy chọn bản nhỏ hơn có giữ siêu dữ liệu.'],
    IMAGE_QUALITY:['This image could not meet the upload size limit at the required quality. Choose a smaller copy.','Ảnh không đạt giới hạn dung lượng ở chất lượng yêu cầu. Hãy chọn bản nhỏ hơn.'],
  };
  return Object.hasOwn(messages,error?.code) ? messages[error.code][language==='vi'?1:0] : '';
}

const tag = (bytes, index, size = 4) => String.fromCharCode(...bytes.subarray(index, index + size));

function jpegDetails(bytes, view) {
  const metadata = [];
  let protectedMetadata = false, width, height;
  for (let index = 2; index + 4 < bytes.length;) {
    const start = index;
    if (bytes[index++] !== 255) break;
    while (bytes[index] === 255) index++;
    const marker = bytes[index++];
    if (marker === 0xda || marker === 0xd9 || index + 2 > bytes.length) break;
    const length = view.getUint16(index);
    const end = index + length;
    if (length < 2 || end > bytes.length) break;
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker) && length >= 8) {
      height = view.getUint16(index + 3);
      width = view.getUint16(index + 5);
    }
    // Retain EXIF, IPTC/Photoshop, and JPEG comments in the JPEG container.
    // Preserve original bytes for profiles, XMP and other application data.
    if (marker === 0xfe || marker === 0xed || marker === 0xe1 && tag(bytes,index + 2,6) === 'Exif\0\0') {
      metadata.push({start, end, tiff:marker === 0xe1 ? index + 8 : 0});
    } else if (marker >= 0xe0 && marker <= 0xef &&
      !(marker === 0xe0 && tag(bytes,index + 2,5) === 'JFIF\0' && length === 16) &&
      !(marker === 0xee && tag(bytes,index + 2,5) === 'Adobe' && length === 14)) {
      protectedMetadata = true;
    }
    index = end;
  }
  return {type:'image/jpeg', width, height, metadata, protectedMetadata};
}

export function imageDetails(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return jpegDetails(bytes, view);
  if (bytes.length >= 33 && view.getUint32(0) === 0x89504e47 &&
      view.getUint32(4) === 0x0d0a1a0a && tag(bytes,12) === 'IHDR') {
    let protectedMetadata = false, animated = false, alpha = [4,6].includes(bytes[25]), density;
    for (let offset = 8; offset + 12 <= bytes.length;) {
      const length = view.getUint32(offset), type = tag(bytes,offset+4);
      if (offset + length + 12 > bytes.length) return null;
      if (type === 'tRNS') alpha = true;
      if (type === 'acTL') animated = true;
      if (type === 'pHYs' && length === 9 && !density && bytes[offset+16] <= 1) {
        const x = view.getUint32(offset+8), y = view.getUint32(offset+12);
        if (x && y) density = {x,y,metres:bytes[offset+16]===1};
        else protectedMetadata = true;
      } else if (!['IHDR','IDAT','IEND','PLTE','tRNS','sRGB','gAMA','cHRM'].includes(type)) protectedMetadata = true;
      offset += length + 12;
    }
    return {type:'image/png',width:view.getUint32(16),height:view.getUint32(20),alpha,animated,protectedMetadata,density};
  }
  if (bytes.length >= 20 && tag(bytes,0) === 'RIFF' && tag(bytes,8) === 'WEBP' &&
      view.getUint32(4,true) + 8 === bytes.length && ['VP8 ','VP8L','VP8X'].includes(tag(bytes,12))) {
    let width, height, alpha = false, animated = false, protectedMetadata = false, hasExif = false;
    for (let offset = 12; offset + 8 <= bytes.length;) {
      const length = view.getUint32(offset+4,true), type = tag(bytes,offset), start = offset+8;
      if (start+length > bytes.length) break;
      if (type === 'VP8X' && length === 10) {
        alpha = Boolean(bytes[start] & 16);
        animated = Boolean(bytes[start] & 2);
        width = 1 + (view.getUint32(start+4,true) & 0xffffff);
        height = 1 + (view.getUint16(start+7,true) | bytes[start+9] << 16);
      } else if (type === 'VP8 ' && length >= 10 && !width) {
        width = view.getUint16(start+6,true) & 0x3fff;
        height = view.getUint16(start+8,true) & 0x3fff;
      } else if (type === 'VP8L' && length >= 5 && !width) {
        const bits = view.getUint32(start+1,true);
        width = 1 + (bits & 0x3fff);
        height = 1 + ((bits >>> 14) & 0x3fff);
        alpha = Boolean(bits & 0x10000000);
      } else if (type === 'ALPH') alpha = true;
      if (type === 'ANIM' || type === 'ANMF') animated = true;
      if (type === 'EXIF') hasExif = true;
      if (!['VP8X','VP8 ','VP8L','ALPH','ANIM','ANMF'].includes(type)) protectedMetadata = true;
      offset = start + length + length % 2;
    }
    return {type:'image/webp',width,height,alpha,animated,protectedMetadata,hasExif};
  }
  if (bytes.length >= 16 && tag(bytes,4) === 'ftyp') {
    const boxSize = view.getUint32(0);
    if (boxSize >= 16 && boxSize <= bytes.length &&
        (['avif','avis'].includes(tag(bytes,8)) ||
          Array.from({length:Math.floor((Math.min(boxSize,4096)-16)/4)},(_,i)=>tag(bytes,16+i*4)).some(brand=>brand==='avif'||brand==='avis'))) {
      return {type:'image/avif',protectedMetadata:true};
    }
  }
  return null;
}

// WebP carries physical density as EXIF resolution rationals. Converting
// pixels/metre to pixels/centimetre keeps the original values exactly.
export function webpWithDensity(bytes, density) {
  const image = imageDetails(bytes);
  if (image?.type !== 'image/webp' || !image.width || !image.height || image.animated || image.hasExif) {
    throw imageError('IMAGE_METADATA');
  }
  const exif = new Uint8Array(66), tiff = new DataView(exif.buffer);
  exif.set([73,73,42,0,8,0,0,0,3,0]);
  for (const [offset, field, pointer, count] of [[10,282,50,density.x],[22,283,58,density.y]]) {
    tiff.setUint16(offset,field,true);
    tiff.setUint16(offset+2,5,true);
    tiff.setUint32(offset+4,1,true);
    tiff.setUint32(offset+8,pointer,true);
    tiff.setUint32(pointer,count,true);
    tiff.setUint32(pointer+4,density.metres?100:1,true);
  }
  tiff.setUint16(34,296,true);
  tiff.setUint16(36,3,true);
  tiff.setUint32(38,1,true);
  tiff.setUint16(42,density.metres?3:1,true);

  const extended = tag(bytes,12)==='VP8X';
  const addedHeader = extended?0:18;
  const output = new Uint8Array(bytes.length+addedHeader+8+exif.length), view = new DataView(output.buffer);
  output.set(bytes.subarray(0,12));
  view.setUint32(4,output.length-8,true);
  output.set(bytes.subarray(12),12+addedHeader);
  if (!extended) {
    output.set([86,80,56,88],12); // VP8X
    view.setUint32(16,10,true);
    if (image.alpha) output[20] = 16;
    view.setUint32(24,image.width-1,true);
    view.setUint16(27,(image.height-1)&0xffff,true);
    output[29] = (image.height-1)>>>16;
  }
  output[20] |= 8;
  const offset = bytes.length+addedHeader;
  output.set([69,88,73,70],offset); // EXIF
  view.setUint32(offset+4,exif.length,true);
  output.set(exif,offset+8);
  return output;
}

function jpegMetadata(bytes, segments, width, height) {
  return segments.map(({start,end,tiff}) => {
    const segment = bytes.slice(start,end);
    if (!tiff) return segment;
    const original = segment.subarray(tiff-start);
    const view = new DataView(original.buffer,original.byteOffset,original.length);
    const endian = tag(original,0,2), little = endian === 'II';
    if (view.byteLength < 8 || !['II','MM'].includes(endian) || view.getUint16(2,little) !== 42) throw imageError('IMAGE_METADATA');
    let exif = 0;
    function editDirectory(offset, fields, root = false) {
      if (offset < 8 || offset+2 > view.byteLength) throw imageError('IMAGE_METADATA');
      const count = view.getUint16(offset,little);
      if (offset+2+12*count+4 > view.byteLength) throw imageError('IMAGE_METADATA');
      for (let index = offset+2; index < offset+2+12*count; index+=12) {
        const field = view.getUint16(index,little), type = view.getUint16(index+2,little);
        if (view.getUint32(index+4,little) !== 1) continue;
        if (root && field === 0x8769 && type === 4) exif = view.getUint32(index+8,little);
        if (!(field in fields)) continue;
        if (type === 3) view.setUint16(index+8,fields[field],little);
        else if (type === 4) view.setUint32(index+8,fields[field],little);
        else throw imageError('IMAGE_METADATA');
      }
      // The old embedded JPEG preview may have different geometry. Keep the EXIF data
      // and leave the obsolete preview unreferenced.
      if (root) view.setUint32(offset+2+12*count,0,little);
    }
    editDirectory(view.getUint32(4,little), {0x112:1,0x100:width,0x101:height}, true);
    if (exif) editDirectory(exif, {0xa002:width,0xa003:height});
    return segment;
  });
}

function dimensions(width, height, limit) {
  const scale = Math.min(1, limit / Math.max(width,height));
  return [Math.max(1,Math.round(width*scale)), Math.max(1,Math.round(height*scale))];
}

async function decode(blob, win) {
  if (typeof win.createImageBitmap === 'function') {
    try {
      const image = await win.createImageBitmap(blob,{imageOrientation:'from-image'});
      return {image, width:image.width, height:image.height, release:()=>image.close()};
    } catch { /* Some browsers can decode additional formats using HTMLImageElement. */ }
  }
  const url = win.URL.createObjectURL(blob);
  try {
    const image = new win.Image();
    image.src = url;
    await image.decode();
    return {image,width:image.naturalWidth,height:image.naturalHeight,release:()=>win.URL.revokeObjectURL(url)};
  } catch {
    win.URL.revokeObjectURL(url);
    throw imageError('IMAGE_UNREADABLE');
  }
}

function canvasFor(win, width, height) {
  const canvas = win.document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function snapshot(canvas, source) {
  const context = canvas.getContext('2d', {willReadFrequently:true});
  context.clearRect(0,0,canvas.width,canvas.height);
  context.drawImage(source,0,0,canvas.width,canvas.height);
  return context.getImageData(0,0,canvas.width,canvas.height).data;
}

// The RGB value of a fully transparent pixel has no visible effect.
export function imagePixelError(a, b) {
  if (a.length !== b.length || !a.length || a.length % 4) return Infinity;
  let squared = 0;
  for (let index = 0; index < a.length; index+=4) {
    const alphaA = a[index+3], alphaB = b[index+3];
    squared += (alphaA-alphaB)**2;
    for (let channel = 0; channel < 3; channel++) {
      squared += ((a[index+channel]*alphaA-b[index+channel]*alphaB)/255)**2;
    }
  }
  return Math.sqrt(squared/a.length);
}

function encode(canvas, type, quality) {
  return new Promise(resolve=>canvas.toBlob(resolve,type,quality));
}

export async function optimizeImage(file, profile, options = {}) {
  const {win = globalThis, signal, inputMax = 8*1024*1024, types = imageTypes, stillOnly = false} = options;
  signal?.throwIfAborted();
  if (!file?.size || file.size > inputMax) throw imageError('IMAGE_SIZE');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = imageDetails(bytes);
  if (!source || !types.includes(source.type) || stillOnly && source.animated) throw imageError('IMAGE_TYPE');
  const allowedPixels = (width,height) => width > 0 && height > 0 &&
    width <= 12000 && height <= 12000 && width * height <= 32_000_000;
  if (source.width !== undefined && !allowedPixels(source.width,source.height)) throw imageError('IMAGE_PIXELS');
  const original = file.slice(0,file.size,source.type);
  const decoded = await decode(original,win);
  try {
    const {image,width,height} = decoded;
    signal?.throwIfAborted();
    if (!allowedPixels(width,height)) throw imageError('IMAGE_PIXELS');
    const result = (body,w,h) => ({body,contentType:body.type,extension:extensions[body.type],width:w,height:h});
    const withinResolution = Math.max(width,height) <= profile.maxEdge;
    if (original.size <= profile.targetBytes && withinResolution) return result(original,width,height);
    if (source.protectedMetadata || source.animated) {
      if (original.size <= profile.maxBytes && (withinResolution || profile.keepProtectedResolution)) return result(original,width,height);
      throw imageError('IMAGE_METADATA');
    }
    const sized = (body,w,h) => {
      signal?.throwIfAborted();
      return result(body,w,h);
    };
    const render = canvasFor(win,1,1);
    const sample = canvasFor(win,64,64);
    const sourceSample = snapshot(sample,image);
    const format = source.metadata?.length ? 'image/jpeg' : 'image/webp';
    let fallback = null;
    const edges = new Set([profile.maxEdge, Math.round((profile.maxEdge+profile.minEdge)/2), profile.minEdge]);
    const tried = new Set();
    for (const edge of edges) {
      const [w,h] = dimensions(width,height,edge);
      if (tried.has(w+':'+h)) continue;
      tried.add(w+':'+h);
      render.width = w;
      render.height = h;
      const context = render.getContext('2d',{colorSpace:'srgb'});
      context.imageSmoothingQuality = 'high';
      context.drawImage(image,0,0,w,h);
      for (const quality of qualities) {
        signal?.throwIfAborted();
        let body = await encode(render,format,quality);
        if (format==='image/webp' && body?.type!=='image/webp') {
          body = await encode(render,source.alpha ? 'image/png' : 'image/jpeg',quality);
        }
        if (!body?.size || !types.includes(body.type) || source.metadata?.length && body.type !== 'image/jpeg') continue;
        if (source.metadata?.length) {
          body = new win.Blob([body.slice(0,2),...jpegMetadata(bytes,source.metadata,w,h),body.slice(2)],{type:'image/jpeg'});
        }
        if (source.density) {
          if (body.type !== 'image/webp') continue;
          body = new win.Blob([webpWithDensity(new Uint8Array(await body.arrayBuffer()),source.density)],{type:'image/webp'});
        }
        if (body.size > profile.maxBytes || withinResolution && body.size >= original.size) continue;
        const check = await decode(body,win);
        try {
          if (check.width !== w || check.height !== h || imagePixelError(sourceSample,snapshot(sample,check.image)) > 15) continue;
          if (body.size <= profile.targetBytes) return sized(body,w,h);
          fallback ??= {body,w,h};
        } finally {
          check.release();
        }
      }
    }
    if (fallback) return sized(fallback.body,fallback.w,fallback.h);
    if (withinResolution && original.size <= profile.maxBytes) return sized(original,width,height);
    throw imageError('IMAGE_QUALITY');
  } finally {
    decoded.release();
  }
}

export async function encodeAvatarCrop(canvas, win = globalThis) {
  const body = await encode(canvas,'image/webp',0.84);
  if (body?.size > 0 && body.size <= avatarPhoto.targetBytes && imageTypes.includes(body.type)) return body;
  if (!body?.size) throw imageError('IMAGE_UNREADABLE');
  return (await optimizeImage(body,avatarPhoto,{win})).body;
}
