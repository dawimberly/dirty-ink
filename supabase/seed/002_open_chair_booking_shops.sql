-- Open-chair booking locations for public /book "Find closest"
-- Run in Supabase SQL Editor after 001_create_shops.sql and 003_shop_locations_and_booking_fields.sql
-- Source: Greg's confirmed template list (verify rates/availability before go-live)
-- Skips insert when name already exists; updates coords/flags if shop is already present

insert into public.shops (
  name,
  address,
  area,
  lat,
  lng,
  type,
  status,
  priority,
  accepts_open_chair_bookings,
  notes,
  portfolio_sent
)
select
  v.name,
  v.address,
  v.area,
  v.lat,
  v.lng,
  v.type,
  'Booked',
  'High',
  v.accepts_open_chair_bookings,
  v.notes,
  false
from (
  values
    (
      'Port City Tattoo',
      '1145 E 4th St',
      'Long Beach',
      33.7716::double precision,
      -118.1772::double precision,
      'Chair Rental',
      true,
      'Template - Greg to verify open chair rates'
    ),
    (
      'Outer Limits Tattoo',
      '22 S Chestnut Pl',
      'Long Beach',
      33.7668::double precision,
      -118.1969::double precision,
      'Chair Rental',
      true,
      'Template - Greg to verify availability'
    ),
    (
      'Yer Cheat''n Heart Tattoo',
      '15606 S Inglewood Ave',
      'South Bay',
      33.8864::double precision,
      -118.3627::double precision,
      'Both',
      true,
      'Template - South Bay focus (Lawndale)'
    ),
    (
      'Broken Art Tattoo',
      '2400 Hyperion Ave',
      'Silver Lake',
      34.1039::double precision,
      -118.2731::double precision,
      'Open Chair',
      true,
      'Template - Central LA option'
    ),
    (
      'High Voltage Tattoo',
      '1259 N La Brea Ave',
      'West Hollywood',
      34.0928::double precision,
      -118.3440::double precision,
      'Guest Spot',
      false,
      'Template - Guest spot only; excluded from /book'
    ),
    (
      'Spotlight Tattoo',
      '5859 Melrose Ave',
      'Hollywood',
      34.0835::double precision,
      -118.3242::double precision,
      'Open Chair',
      true,
      'Template - Greg to verify'
    ),
    (
      'Alchemy Tattoo',
      '2854 Sunset Blvd',
      'Silver Lake',
      34.0827::double precision,
      -118.2734::double precision,
      'Chair Rental',
      true,
      'Template - Greg to verify'
    ),
    (
      'Classic Tattoo',
      '116 W Wilshire Ave',
      'Other',
      33.8732::double precision,
      -117.9255::double precision,
      'Both',
      true,
      'Template - North OC / South Bay adjacent (Fullerton)'
    )
) as v(name, address, area, lat, lng, type, accepts_open_chair_bookings, notes)
where not exists (
  select 1 from public.shops s where s.name = v.name
);

-- Refresh location + booking flags when shops already exist (e.g. from 001 seed)
update public.shops s
set
  address = v.address,
  area = v.area,
  lat = v.lat,
  lng = v.lng,
  type = v.type,
  accepts_open_chair_bookings = v.accepts_open_chair_bookings,
  notes = v.notes
from (
  values
    ('Port City Tattoo', '1145 E 4th St', 'Long Beach', 33.7716::double precision, -118.1772::double precision, 'Chair Rental', true, 'Template - Greg to verify open chair rates'),
    ('Outer Limits Tattoo', '22 S Chestnut Pl', 'Long Beach', 33.7668::double precision, -118.1969::double precision, 'Chair Rental', true, 'Template - Greg to verify availability'),
    ('Yer Cheat''n Heart Tattoo', '15606 S Inglewood Ave', 'South Bay', 33.8864::double precision, -118.3627::double precision, 'Both', true, 'Template - South Bay focus (Lawndale)'),
    ('Broken Art Tattoo', '2400 Hyperion Ave', 'Silver Lake', 34.1039::double precision, -118.2731::double precision, 'Open Chair', true, 'Template - Central LA option'),
    ('High Voltage Tattoo', '1259 N La Brea Ave', 'West Hollywood', 34.0928::double precision, -118.3440::double precision, 'Guest Spot', false, 'Template - Guest spot only; excluded from /book'),
    ('Spotlight Tattoo', '5859 Melrose Ave', 'Hollywood', 34.0835::double precision, -118.3242::double precision, 'Open Chair', true, 'Template - Greg to verify'),
    ('Alchemy Tattoo', '2854 Sunset Blvd', 'Silver Lake', 34.0827::double precision, -118.2734::double precision, 'Chair Rental', true, 'Template - Greg to verify'),
    ('Classic Tattoo', '116 W Wilshire Ave', 'Other', 33.8732::double precision, -117.9255::double precision, 'Both', true, 'Template - North OC / South Bay adjacent (Fullerton)')
) as v(name, address, area, lat, lng, type, accepts_open_chair_bookings, notes)
where s.name = v.name;
