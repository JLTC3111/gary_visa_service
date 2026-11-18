export function workspaceUI(doc,t){
 const $=selector=>doc.querySelector(selector);
 const el=(tag,attrs={},children=[])=>{const node=doc.createElement(tag);for(const [key,value]of Object.entries(attrs))if(value!==undefined&&value!==null)node.setAttribute(key,String(value));for(const child of (Array.isArray(children)?children:[children]))if(child!==null&&child!==undefined)node.append(typeof child==='string'||typeof child==='number'?doc.createTextNode(String(child)):child);return node};
 const button=(text,callback,className='inline-button')=>{const node=el('button',{type:'button',class:className},text);node.addEventListener('click',callback);return node};
 const notice=(selector,key,error=false)=>{const node=$(selector);node.textContent=key?t(key):'';node.classList.toggle('error',error)};
 const date=(value,time=true)=>value?new Intl.DateTimeFormat(doc.documentElement.lang==='vi'?'vi-VN':'en-GB',{day:'2-digit',month:'short',year:'numeric',...(time?{hour:'2-digit',minute:'2-digit'}:{})}).format(new Date(value)):t('none');
 const run=async(form,callback)=>{const buttons=[...form.querySelectorAll('button[type=submit]')];if(buttons.some(node=>node.getAttribute('aria-busy')==='true'))return;buttons.forEach(node=>{node.disabled=true;node.setAttribute('aria-busy','true')});try{return await callback()}finally{buttons.forEach(node=>{node.disabled=false;node.removeAttribute('aria-busy')})}};
 const staffOptions=(select,roster,value='')=>{const people=roster.filter(person=>person.assignable!==false||person.user_id===value),signature=JSON.stringify([t('unassigned'),people]);if(select.dataset.options!==signature){select.replaceChildren(el('option',{value:''},t('unassigned')),...people.map(person=>el('option',{value:person.user_id,disabled:person.assignable===false?'':null},person.display_name)));select.dataset.options=signature}if(select.value!==(value||''))select.value=value||''};
 const take=result=>{if(result.error)throw result.error;return result.data};
 return {$,el,button,notice,date,run,staffOptions,take};
}
