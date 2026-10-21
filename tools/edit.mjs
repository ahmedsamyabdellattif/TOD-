import {spawn} from 'node:child_process';
import {createMediaServer,root} from './media-server.mjs';
const server=createMediaServer();server.listen(3014,'127.0.0.1',()=>console.log('إدارة الصور والشعارات: http://127.0.0.1:3014'));
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1','--port','3013'],{cwd:root,stdio:'inherit',env:{...process.env,WATCHPACK_POLLING:'1000'}});
let stopped=false;function stop(){if(stopped)return;stopped=true;child.kill('SIGTERM');server.close();}
process.on('SIGINT',stop);process.on('SIGTERM',stop);child.on('exit',()=>{server.close();});server.on('error',e=>{console.error(e.message);stop();});
