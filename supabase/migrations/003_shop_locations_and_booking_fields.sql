-- Shop coordinates for "Find closest" + extra public booking fields
-- Safe to re-run in the Supabase SQL editor

alter table public.shops
  add column if not exists address text,
  add column if not exists lat double precision,
  add column if not exists lng double precision;

alter table public.appointment_requests
  add column if not exists client_address text,
  add column if not exists appointment_type text,
  add column if not exists preferred_shop_id text,
  add column if not exists preferred_shop_name text,
  add column if not exists reference_image_urls text[];

-- Approximate area centroids so existing shops can be ranked before exact pins are set
update public.shops set lat = 33.864, lng = -118.396
  where area = 'South Bay' and lat is null;
update public.shops set lat = 34.040, lng = -118.247
  where area = 'DTLA' and lat is null;
update public.shops set lat = 34.102, lng = -118.327
  where area = 'Hollywood' and lat is null;
update public.shops set lat = 34.087, lng = -118.270
  where area = 'Silver Lake' and lat is null;
update public.shops set lat = 34.078, lng = -118.260
  where area = 'Echo Park' and lat is null;
update public.shops set lat = 34.108, lng = -118.285
  where area = 'Los Feliz' and lat is null;
update public.shops set lat = 34.090, lng = -118.362
  where area = 'West Hollywood' and lat is null;
update public.shops set lat = 34.019, lng = -118.491
  where area = 'Santa Monica' and lat is null;
update public.shops set lat = 33.985, lng = -118.469
  where area = 'Venice' and lat is null;
update public.shops set lat = 34.021, lng = -118.396
  where area = 'Culver City' and lat is null;
update public.shops set lat = 34.053, lng = -118.343
  where area = 'Mid-City' and lat is null;
update public.shops set lat = 34.058, lng = -118.301
  where area = 'Koreatown' and lat is null;
update public.shops set lat = 34.148, lng = -118.145
  where area = 'Pasadena' and lat is null;
update public.shops set lat = 33.770, lng = -118.194
  where area = 'Long Beach' and lat is null;

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
  where s.lat is not null and s.lng is not null
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
