# Paq'in Family House (Paqinhaüs)

Public site for Greg Paquín — custom tattoo booking and original streetwear,
hosted on Vercel. Replaces the old Shopify storefront.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Auth + Postgres) for artist admin + booking requests
- Deployable on Vercel

## Public routes

| Path | Purpose |
|------|---------|
| `/` | Brand home |
| `/book` | Tattoo appointment requests |
| `/shop` | Apparel & print catalog |
| `/shop/[slug]` | Product detail + add to bag |
| `/checkout` | Cart checkout (payments coming soon) |
| `/about` | The house |

Artist admin (ChairHunt) stays behind `/login` — shops tracker, bookings inbox, templates.

## Setup

### 1. Install

```bash
npm install
```

### 2. Environment

```bash
cp .env.local.example .env.local
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (admin/bookings) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes (admin/bookings) | anon / publishable key |
| `RESEND_API_KEY` | Optional | Email Greg when a booking comes in |
| `BOOKING_NOTIFY_EMAIL` | Optional | Where notifications go |
| `NEXT_PUBLIC_APP_URL` | Optional | Public site URL (Vercel) |

For local dev, set `NEXT_PUBLIC_APP_URL=http://localhost:3000`.

Public storefront pages (`/`, `/shop`, `/book`, `/about`, `/checkout`) render without Supabase env.

### 3. Supabase

1. Create a project at [supabase.com](https://supabase.com) if needed
2. In the SQL Editor, run migrations in order: `001`, `002`, `003`, `004`. Migration `004` loads the open-chair shop list for **Find closest** on `/book`.
3. Auth → Users → Add user (email/password) for your single login

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy (Vercel)

Production project: **paqin-family-tattoo** (Vercel team **dirty-ink**)

- Site: https://paqin-family-tattoo.vercel.app
- Booking: https://paqin-family-tattoo.vercel.app/book
- Shop: https://paqin-family-tattoo.vercel.app/shop

1. Push to GitHub (`master`)
2. Vercel project **paqin-family-tattoo**, repo `dawimberly/dirty-ink`
3. Add env vars from `.env.local.example` (Supabase keys for admin + booking submit)
4. Deploy — GitHub → Vercel auto-deploy should be connected

### Replacing Shopify

This app owns `/shop` now. After merge:

1. Keep the Shopify store password-protected (or close it) so customers land here
2. Point any custom domain at the Vercel project
3. Update Instagram / link-in-bio to `paqin-family-tattoo.vercel.app` (or your domain)
4. Wire payments on `/checkout` when ready (Stripe + POD partner)
