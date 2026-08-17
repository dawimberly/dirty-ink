-- Shop coordinates for "Find closest" + extra public booking fields
-- Safe to re-run in the Supabase SQL editor

alter table public.shops
  add column if not exists address text,
  add column if not exists lat double precision,
  add column if not exists lng double precision,
  add column if not exists accepts_open_chair_bookings boolean not null default false;

alter table public.appointment_requests
  add column if not exists client_address text,
  add column if not exists appointment_type text,
  add column if not exists preferred_shop_id text,
  add column if not exists preferred_shop_name text,
  add column if not exists reference_image_urls text[];

-- The public Find closest list is the shops marked for open-chair bookings
update public.shops
  set accepts_open_chair_bookings = true
  where type in ('Open Chair', 'Both')
    and accepts_open_chair_bookings = false;

create or replace function public.list_shop_locations()
returns table (
  id uuid,
  name text,
  area text,
  address text,
  lat double precision,
  lng double precision
)
language sql
stable
security definer
set search_path = public
as $$
  select s.id, s.name, s.area, s.address, s.lat, s.lng
  from public.shops s
  where s.accepts_open_chair_bookings = true
  order by s.name;
$$;

revoke all on function public.list_shop_locations() from public;
grant execute on function public.list_shop_locations() to anon, authenticated;

-- Optional photo uploads from /book (skipped if Storage is not enabled)
do $$
begin
  insert into storage.buckets (id, name, public)
  values ('booking-references', 'booking-references', true)
  on conflict (id) do nothing;

  execute 'drop policy if exists "Anyone can upload booking references" on storage.objects';
  execute 'drop policy if exists "Public can read booking references" on storage.objects';

  execute $policy$
    create policy "Anyone can upload booking references"
      on storage.objects for insert
      to anon, authenticated
      with check (bucket_id = 'booking-references')
  $policy$;

  execute $policy$
    create policy "Public can read booking references"
      on storage.objects for select
      to anon, authenticated
      using (bucket_id = 'booking-references')
  $policy$;
exception when others then
  raise notice 'booking-references storage setup skipped: %', sqlerrm;
end $$;
