-- ChairHunt: shops table for tracking LA tattoo shop guest spots / chair rentals
-- Safe to re-run in the Supabase SQL editor

create extension if not exists "pgcrypto";

create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area text,
  contact_person text,
  instagram text,
  website text,
  email_phone text,
  type text check (type in ('Guest Spot', 'Chair Rental', 'Open Chair', 'Both', 'Unknown')),
  date_contacted date,
  status text not null default 'Not Contacted'
    check (status in ('Not Contacted', 'Contacted', 'Follow-up', 'Interested', 'Booked', 'Rejected')),
  follow_up_date date,
  portfolio_sent boolean not null default false,
  rate_terms text,
  notes text,
  priority text not null default 'Medium'
    check (priority in ('High', 'Medium', 'Low')),
  created_at timestamptz not null default now()
);

create index if not exists shops_status_idx on public.shops (status);
create index if not exists shops_area_idx on public.shops (area);
create index if not exists shops_priority_idx on public.shops (priority);
create index if not exists shops_follow_up_date_idx on public.shops (follow_up_date);

alter table public.shops enable row level security;

-- Drop any prior policy names so this script is idempotent
drop policy if exists "Allow authenticated users full access" on public.shops;
drop policy if exists "Authenticated users can select shops" on public.shops;
drop policy if exists "Authenticated users can insert shops" on public.shops;
drop policy if exists "Authenticated users can update shops" on public.shops;
drop policy if exists "Authenticated users can delete shops" on public.shops;

-- Single-user app: any authenticated user can manage shops
create policy "Authenticated users can select shops"
  on public.shops for select
  to authenticated
  using (true);

create policy "Authenticated users can insert shops"
  on public.shops for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update shops"
  on public.shops for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete shops"
  on public.shops for delete
  to authenticated
  using (true);
