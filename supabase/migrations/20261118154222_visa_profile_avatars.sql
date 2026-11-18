-- Gary Visa profile photos. Apply only after the Visa Team Access migration.
begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gary-visa-avatars', 'gary-visa-avatars', false, 5242880, array['image/jpeg','image/png','image/webp']);

-- The existing Team Access roles determine who can read a staff picture.
create function gary_private.visa_avatar_readable(p_name text) returns boolean
language sql stable security definer set search_path='' as $$
  select case
    when (select auth.uid()) is null then false
    when p_name = (select auth.uid())::text || '/avatar' then true
    when gary_private.is_staff()
      and (gary_private.operations_role() is not distinct from 'admin' or gary_private.cms_role() is not distinct from 'admin')
    then exists (
      select 1 from gary_private.staff_members s
      where s.user_id::text || '/avatar' = p_name
        and gary_private.staff_identity_eligible(s.user_id)
    )
    else false
  end;
$$;
revoke all on function gary_private.visa_avatar_readable(text) from public, anon, authenticated;
grant execute on function gary_private.visa_avatar_readable(text) to authenticated;

create policy visa_avatar_read on storage.objects for select to authenticated
using (bucket_id = 'gary-visa-avatars' and gary_private.visa_avatar_readable(name));
create policy visa_avatar_read_guard on storage.objects as restrictive for select to authenticated
using (bucket_id <> 'gary-visa-avatars' or gary_private.visa_avatar_readable(name));
create policy visa_avatar_anon_guard on storage.objects as restrictive for all to anon
using (bucket_id <> 'gary-visa-avatars') with check (bucket_id <> 'gary-visa-avatars');

-- Writes pass through the verified-user Edge Function and its byte validation.
create policy visa_avatar_insert_guard on storage.objects as restrictive for insert to authenticated
with check (bucket_id <> 'gary-visa-avatars');
create policy visa_avatar_update_guard on storage.objects as restrictive for update to authenticated
using (bucket_id <> 'gary-visa-avatars') with check (bucket_id <> 'gary-visa-avatars');
create policy visa_avatar_delete_guard on storage.objects as restrictive for delete to authenticated
using (bucket_id <> 'gary-visa-avatars');

commit;
