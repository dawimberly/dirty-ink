-- Full /book database setup — paste once in Supabase SQL Editor
-- Safe to re-run

-- Step 1: columns + booking fields (migration 003)
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

-- Step 2: shop list + list_shop_locations() (migration 004)

-- Merge old guest-spot seed row into the booking shop name
update public.shops
set
  name = 'Yer Cheat''n Heart Tattoo',
  address = coalesce(address, '15606 S Inglewood Ave'),
  area = coalesce(area, 'Lawndale'),
  lat = coalesce(lat, 33.8864),
  lng = coalesce(lng, -118.3627),
  type = 'Both',
  accepts_open_chair_bookings = true,
  notes = coalesce(notes, 'Template - South Bay focus')
where name = 'Yer Cheat''n Heart';

create unique index if not exists shops_name_key on public.shops (name);

-- Only shops with coordinates appear on /book
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
    and s.lat is not null
    and s.lng is not null
  order by s.name;
$$;

revoke all on function public.list_shop_locations() from public;
grant execute on function public.list_shop_locations() to anon, authenticated;

insert into public.shops (name, address, area, lat, lng, type, accepts_open_chair_bookings, notes)
values
  ('Port City Tattoo', '1145 E 4th St', 'Long Beach', 33.7716, -118.1772, 'Chair Rental', true, 'Template - Greg to verify open chair rates'),
  ('Outer Limits Tattoo', '22 S Chestnut Pl', 'Long Beach', 33.7668, -118.1969, 'Chair Rental', true, 'Template - Greg to verify availability'),
  ('Yer Cheat''n Heart Tattoo', '15606 S Inglewood Ave', 'Lawndale', 33.8864, -118.3627, 'Both', true, 'Template - South Bay focus'),
  ('Broken Art Tattoo', '2400 Hyperion Ave', 'Silver Lake', 34.1039, -118.2731, 'Open Chair', true, 'Template - Central LA option'),
  ('High Voltage Tattoo', '1259 N La Brea Ave', 'West Hollywood', 34.0928, -118.3440, 'Guest Spot', false, 'Template - Guest spot only; excluded from /book'),
  ('Spotlight Tattoo', '5859 Melrose Ave', 'Hollywood', 34.0835, -118.3242, 'Open Chair', true, 'Template - Greg to verify'),
  ('Alchemy Tattoo', '2854 Sunset Blvd', 'Silver Lake', 34.0827, -118.2734, 'Chair Rental', true, 'Template - Greg to verify'),
  ('Classic Tattoo', '116 W Wilshire Ave', 'Fullerton', 33.8732, -117.9255, 'Both', true, 'Template - North OC / South Bay adjacent')
on conflict (name) do update set
  address = excluded.address,
  area = excluded.area,
  lat = excluded.lat,
  lng = excluded.lng,
  type = excluded.type,
  accepts_open_chair_bookings = excluded.accepts_open_chair_bookings,
  notes = excluded.notes;

-- Photo uploads from /book (public bucket + anon upload)
insert into storage.buckets (id, name, public)
values ('booking-references', 'booking-references', true)
on conflict (id) do update set public = true;

drop policy if exists "Anyone can upload booking references" on storage.objects;
drop policy if exists "Public can read booking references" on storage.objects;

create policy "Anyone can upload booking references"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'booking-references');

create policy "Public can read booking references"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'booking-references');
