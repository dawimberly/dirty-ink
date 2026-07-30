-- Public booking requests for Dirty INK (Instagram / link-in-bio)
-- Run in Supabase SQL Editor

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  email text,
  phone text,
  instagram text,
  preferred_dates text,
  placement text,
  size_estimate text,
  style_notes text,
  description text not null,
  budget text,
  status text not null default 'New'
    check (status in ('New', 'Contacted', 'Booked', 'Declined', 'Done')),
  artist_notes text,
  created_at timestamptz not null default now()
);

create index if not exists appointment_requests_status_idx
  on public.appointment_requests (status);
create index if not exists appointment_requests_created_at_idx
  on public.appointment_requests (created_at desc);

alter table public.appointment_requests enable row level security;

drop policy if exists "Anyone can submit appointment requests" on public.appointment_requests;
drop policy if exists "Authenticated users can select appointment requests" on public.appointment_requests;
drop policy if exists "Authenticated users can update appointment requests" on public.appointment_requests;
drop policy if exists "Authenticated users can delete appointment requests" on public.appointment_requests;

-- Public booking form (anon + logged-in) can insert only
create policy "Anyone can submit appointment requests"
  on public.appointment_requests for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can select appointment requests"
  on public.appointment_requests for select
  to authenticated
  using (true);

create policy "Authenticated users can update appointment requests"
  on public.appointment_requests for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete appointment requests"
  on public.appointment_requests for delete
  to authenticated
  using (true);
