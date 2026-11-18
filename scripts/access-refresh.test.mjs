import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
const source=await readFile(new URL('../dist/portal.js',import.meta.url),'utf8');
const monitor=source.slice(source.indexOf('// Refresh permissions'),source.indexOf('function renderIdentity'));
const pause=()=>new Promise(r=>setTimeout(r,15));
async function harness(){
 const dom=new JSDOM('<div id="private">unsaved content</div>',{url:'https://visa.garyhome.vn/portal.html',runScripts:'outside-only'}),w=dom.window;
 let next={member:true,operations:null,cms:'editor'},identity={data:{user:{id:'staff'}}};
 const calls={reset:0,load:0,rpc:0};
 w.state={user:{id:'staff'},role:'staff',access:{operations:null,cms:'editor'},generation:1,recovery:false,loading:false};
 w.staff=()=>w.state.role==='staff';w.feedback=()=>{};w.toast=()=>{};
 w.db={auth:{getUser:async()=>identity},rpc:async()=>{calls.rpc++;return {data:next}}};w.unwrap=r=>{if(r.error)throw r.error;return r.data};
 w.resetWorkspace=()=>{calls.reset++;w.state.generation++;w.state.user=null;w.state.role=null;w.state.access=null;w.document.querySelector('#private').replaceChildren()};
 w.loadWorkspace=async()=>{calls.load++;w.state.generation++;w.state.user=identity.data?.user;w.state.role=next.member?'staff':'customer';w.state.access=next};
 vm.runInContext(monitor,dom.getInternalVMContext());
 return {w,calls,close:()=>w.close(),next:value=>{next=value},identity:value=>{identity=value},fire:name=>w.dispatchEvent(new w.Event(name))};
}
test('Visa focus checks permissions without remounting an unchanged CMS editor',async()=>{
 const h=await harness();try{h.fire('focus');h.fire('pageshow');await pause();assert.equal(h.calls.rpc,1);assert.equal(h.calls.reset,0);assert.equal(h.w.document.querySelector('#private').textContent,'unsaved content')}finally{h.close()}
});
test('Visa revocation clears private state and resolves the remaining customer session',async()=>{
 const h=await harness();try{h.next({member:false,operations:null,cms:null});h.fire('focus');await pause();assert.equal(h.calls.reset,1);assert.equal(h.calls.load,1);assert.equal(h.w.state.role,'customer');assert.equal(h.w.document.querySelector('#private').textContent,'')}finally{h.close()}
});
test('Visa access denial is not lost when focus arrives in the same turn',async()=>{
 const h=await harness();try{h.fire('gary:access-denied');h.fire('focus');await pause();assert.equal(h.calls.reset,1)}finally{h.close()}
});
test('Visa preserves an offline draft but clears it when session validation reports missing Auth session',async()=>{
 const h=await harness();try{h.identity({error:{name:'AuthRetryableFetchError',status:0}});h.fire('focus');await pause();assert.equal(h.calls.reset,0);h.identity({error:{name:'AuthSessionMissingError',status:400}});h.fire('focus');await pause();assert.equal(h.calls.reset,1)}finally{h.close()}
});
test('Visa menu executes only locally shipped code',async()=>{
 const menu=await readFile(new URL('../dist/gary-apps.js',import.meta.url),'utf8');assert.doesNotMatch(menu,/connectGaryApps|import\([^)]*https:|gary-apps-client/);assert.match(menu,/slot\.append\(menu\)/);assert.match(menu,/enhanceGaryApps/);for(const name of ['index.html','portal.html']){const html=await readFile(new URL('../dist/'+name,import.meta.url),'utf8');assert.doesNotMatch(html.match(/script-src[^;]+/)[0],/garyhome\.vn/);}
});

test('Visa hung permission validation times out and releases the refresh guard',async()=>{
 const h=await harness();try{const schedule=h.w.setTimeout.bind(h.w);h.w.setTimeout=(fn,ms,...args)=>schedule(fn,ms===10000?10:ms,...args);h.w.db.auth.getUser=()=>new Promise(()=>{});h.fire('focus');await new Promise(r=>setTimeout(r,30));h.w.db.auth.getUser=async()=>({error:{name:'AuthSessionMissingError',status:400}});h.fire('focus');await pause();assert.equal(h.calls.reset,1)}finally{h.close()}
});
