-- Open-chair booking locations for /book "Find closest"
-- Prefer running supabase/migrations/004_shops_name_unique_and_booking_seed.sql (includes this data).
-- Or run this after 003 if 004 was already applied without the insert block.

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
