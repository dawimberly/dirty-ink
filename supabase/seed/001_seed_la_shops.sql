-- Seed: LA-area guest spot / open chair leads for ChairHunt
-- Run in Supabase SQL Editor after 001_create_shops.sql
-- Skips any shop name that already exists

insert into public.shops (
  name,
  area,
  type,
  status,
  priority,
  rate_terms,
  notes,
  portfolio_sent
)
select v.name, v.area, v.type, v.status, v.priority, v.rate_terms, v.notes, v.portfolio_sent
from (
  values
    (
      'Lost Boys DTLA',
      'DTLA',
      'Guest Spot',
      'Not Contacted',
      'High',
      'Flat $100/day guest rate; shop promotes guests',
      'Actively invites guest artists. Strongest current lead — start here.',
      false
    ),
    (
      'Mad Rabbit Studios',
      'Other',
      'Guest Spot',
      'Not Contacted',
      'High',
      null,
      'Publicly welcoming guest artists. Contact early with portfolio.',
      false
    ),
    (
      'Patch Tattoo Therapy',
      'South Bay',
      'Guest Spot',
      'Not Contacted',
      'High',
      null,
      'Good reputation — worth asking about guest spot / open chair.',
      false
    ),
    (
      'Hermosa Ink Collective',
      'South Bay',
      'Guest Spot',
      'Not Contacted',
      'High',
      null,
      'Local South Bay shop. Solid spot for Greg.',
      false
    ),
    (
      'Yer Cheat''n Heart',
      'South Bay',
      'Guest Spot',
      'Not Contacted',
      'Medium',
      null,
      'Hermosa Beach — established South Bay shop.',
      false
    ),
    (
      'Third Street Tattoo',
      'South Bay',
      'Guest Spot',
      'Not Contacted',
      'Medium',
      null,
      'Popular Hermosa / local shop.',
      false
    ),
    (
      'Ganga Tattoo',
      'South Bay',
      'Guest Spot',
      'Not Contacted',
      'Medium',
      null,
      'Previously mentioned in notes. Follow up on guest / chair options.',
      false
    )
) as v(name, area, type, status, priority, rate_terms, notes, portfolio_sent)
where not exists (
  select 1 from public.shops s where s.name = v.name
);
