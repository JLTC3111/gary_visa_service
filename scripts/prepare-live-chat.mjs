import {readFile,writeFile} from 'node:fs/promises';
const files=['20261023040329_crm_and_site_chat.sql','20261023044012_live_staff_chat.sql'];
const sql=await Promise.all(files.map(name=>readFile(new URL(`../supabase/migrations/${name}`,import.meta.url),'utf8')));
const inside=text=>text.replace(/^begin;\s*$/m,'').replace(/^commit;\s*$/m,'');
function repairable(text){return inside(text)
 .replace(/create table (?!if not exists)/gi,'create table if not exists ')
 .replace(/create index (?!if not exists)/gi,'create index if not exists ')
 .replace(/create function /gi,'create or replace function ')
 .replace(/create policy (\w+) on ([\w.]+) /gi,(_match,name,table)=>`drop policy if exists ${name} on ${table};\ncreate policy ${name} on ${table} `)
 .replace(/create trigger (\w+) ((?:before|after)[^;]*?) on ([\w.]+) /gi,(_match,name,event,table)=>`drop trigger if exists ${name} on ${table};\ncreate trigger ${name} ${event} on ${table} `)
 .replace("from public.gary_profiles p where not exists(select 1 from gary_private.staff_members s where s.user_id=p.id);","from public.gary_profiles p where not exists(select 1 from gary_private.staff_members s where s.user_id=p.id) on conflict(profile_id) do nothing;")}
const installer=`-- Gary Agency: enable CRM and live staff chat on the existing portal database.
-- Run this entire file in project duyiihsmaqfgwezmsnjs's SQL Editor.
-- Repairs a partial earlier setup. Existing contacts and conversations are kept.
-- Run the whole script, including BEGIN and COMMIT. Do not run a selection.
begin;
do $gary_check$
begin
 if to_regclass('public.gary_profiles') is null or to_regclass('gary_private.staff_members') is null then
  raise exception 'Install the customer/staff portal migration first.';
 end if;
end;
$gary_check$;
${repairable(sql[0])}
${repairable(sql[1])}
notify pgrst, 'reload schema';
commit;
select public.gary_live_chat_health() as live_chat_status;
`;
await writeFile(new URL('../supabase/install-live-chat.sql',import.meta.url),installer);
console.log('Prepared supabase/install-live-chat.sql (CRM + live chat, safe to re-run).');
