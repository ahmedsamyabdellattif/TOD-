import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,readdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {catalog,saveMedia,imageBytes} from './media-server.mjs';
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a0uoAAAAASUVORK5CYII=';
test('image validation rejects executable content and spoofed image data',()=>{assert.throws(()=>imageBytes('data:image/svg+xml;base64,PHN2Zz4='));assert.throws(()=>imageBytes('data:image/png;base64,aGVsbG8='));assert.equal(imageBytes(png).ext,'png')});
test('upload saves image and name, backs up content, and rejects arbitrary targets',async()=>{
 const r=await mkdtemp(path.join(tmpdir(),'tod-media-'));try{
 await mkdir(path.join(r,'content'));await writeFile(path.join(r,'content/site.json'),JSON.stringify({brandAssets:{darkLogo:'/brand/old.png'},images:[{id:'home-1',src:null,alt:{en:'',ar:''}}],pageImages:[]}));await writeFile(path.join(r,'content/clients.json'),JSON.stringify({items:[{order:1,name:'Old',logo:null,logoApproved:false}]}));
 await saveMedia(r,{id:'client:1',name:'New Company',image:png});let c=JSON.parse(await readFile(path.join(r,'content/clients.json'))).items[0];assert.equal(c.name,'New Company');assert.equal(c.logoApproved,true);assert.match(c.logo,/^\/uploads\/[a-f0-9]+\.png$/);assert.ok((await readFile(path.join(r,'public',c.logo))).length);assert.equal((await readdir(path.join(r,'.media-backups'))).length,1);
 await saveMedia(r,{id:'hero:home-1',image:png,alt:{en:'City',ar:'مدينة'}});assert.equal((await catalog(r)).find(x=>x.id==='hero:home-1').alt.ar,'مدينة');await assert.rejects(saveMedia(r,{id:'page:../../evil',image:png}));
 }finally{await rm(r,{recursive:true,force:true})}
});
