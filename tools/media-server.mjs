import http from 'node:http';
import {readFile,writeFile,mkdir,rename,copyFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=async(r,f)=>JSON.parse(await readFile(path.join(r,'content',f),'utf8'));
export async function catalog(r=root){
 const s=await read(r,'site.json'),c=await read(r,'clients.json');
 return [...Object.entries(s.brandAssets).map(([id,src])=>({id:'brand:'+id,group:'brand',name:({darkLogo:'شعار الهيدر',lightLogo:'شعار الفوتر',icon:'أيقونة TOD'})[id],src})),...s.images.map(x=>({id:'hero:'+x.id,group:'images',name:'Home / '+x.id,src:x.src,alt:x.alt})),...s.pageImages.map(x=>({id:'page:'+x.page,group:'images',name:x.page,src:x.src,alt:x.alt})),...c.items.map(x=>({id:'client:'+x.order,group:'clients',name:x.name,src:x.logo}))];
}
export function imageBytes(data){
 if(typeof data!=='string'||data.length>16*1024*1024)throw Error('حجم الصورة أكبر من 12MB');
 const m=/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/.exec(data);if(!m)throw Error('اختر صورة PNG أو JPG أو WebP');
 const b=Buffer.from(m[2],'base64');let ext;
 if(b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))ext='png';
 else if(b[0]===255&&b[1]===216&&b[2]===255)ext='jpg';
 else if(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP')ext='webp';
 if(!ext||b.length>12*1024*1024)throw Error('ملف الصورة غير صالح');return {b,ext};
}
export async function saveMedia(r,input){
 const entry=(await catalog(r)).find(x=>x.id===input.id);if(!entry)throw Error('مكان الصورة غير موجود');
 const [type,key]=entry.id.split(':');const file=type==='client'?'clients.json':'site.json';const data=await read(r,file);
 const target=type==='client'?data.items.find(x=>String(x.order)===key):type==='brand'?data.brandAssets:type==='hero'?data.images.find(x=>x.id===key):data.pageImages.find(x=>x.page===key);
 let src=entry.src;
 if(input.image){const {b,ext}=imageBytes(input.image);const name=randomBytes(12).toString('hex')+'.'+ext;await mkdir(path.join(r,'public/uploads'),{recursive:true});await writeFile(path.join(r,'public/uploads',name),b);src='/uploads/'+name;}
 if(type==='brand')target[key]=src;
 else if(type==='client'){
  if(typeof input.name!=='string'||!input.name.trim()||input.name.length>200)throw Error('اكتب اسم الشركة');
  target.name=input.name.trim();target.logo=src;if(input.image)target.logoApproved=true;
 }else{target.src=src;if(input.alt&&typeof input.alt.en==='string'&&typeof input.alt.ar==='string')target.alt={en:input.alt.en.slice(0,300),ar:input.alt.ar.slice(0,300)};}
 const backups=path.join(r,'.media-backups');await mkdir(backups,{recursive:true});await copyFile(path.join(r,'content',file),path.join(backups,Date.now()+'-'+randomBytes(3).toString('hex')+'-'+file));
 const destination=path.join(r,'content',file),temp=destination+'.tmp';await writeFile(temp,JSON.stringify(data,null,2)+'\n');await rename(temp,destination);return {ok:true};
}
export function createMediaServer(r=root,port=3014){
 const token=randomBytes(32).toString('hex');let queue=Promise.resolve();const host='127.0.0.1:'+port,origin='http://'+host;
 return http.createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');
  const reply=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));};
  if(req.headers.host!==host)return reply(403,{error:'Host rejected'});
  const u=new URL(req.url,origin);
  try{
   if(req.method==='GET'&&u.pathname==='/'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end((await readFile(path.join(root,'tools/media-editor.html'),'utf8')).replace('__TOKEN__',token));return;}
   if(req.method==='GET'&&u.pathname==='/asset'){
    const src=u.searchParams.get('src');if(!(await catalog(r)).some(x=>x.src===src)||!/^\/(images|brand|uploads)\/[\w.-]+$/.test(src))return reply(404,{});
    const ext=path.extname(src);res.setHeader('Content-Type',({'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'})[ext]||'application/octet-stream');res.end(await readFile(path.join(r,'public',src.slice(1))));return;
   }
   if(req.headers['x-tod-token']!==token)return reply(403,{error:'Session required'});
   if(req.method==='GET'&&u.pathname==='/api/media')return reply(200,await catalog(r));
   if(req.method==='POST'&&u.pathname==='/api/media'){
    if(req.headers.origin!==origin)return reply(403,{error:'Origin rejected'});
    let bytes=0,chunks=[];for await(const chunk of req){bytes+=chunk.length;if(bytes>17*1024*1024)return reply(413,{error:'الصورة كبيرة جدًا'});chunks.push(chunk);}
    const input=JSON.parse(Buffer.concat(chunks).toString());const task=queue.then(()=>saveMedia(r,input));queue=task.catch(()=>{});return reply(200,await task);
   }reply(404,{});
  }catch(e){reply(400,{error:e.message});}
 });
}
if(process.argv[1]===fileURLToPath(import.meta.url))createMediaServer().listen(3014,'127.0.0.1',()=>console.log('TOD media editor: http://127.0.0.1:3014'));
