# ChairHunt

Full-stack tracker for a tattoo artist hunting LA shops — guest spots, open chairs, and chair rentals.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Auth + Postgres)
- Deployable on Vercel

## Setup

### 1. Install

```bash
npm install
```

### 2. Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` (get Supabase values from **Project Settings → API**):

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | anon / publishable key |
| `RESEND_API_KEY` | Optional | Email Greg when a booking comes in |
| `BOOKING_NOTIFY_EMAIL` | Optional | Where notifications go |
| `NEXT_PUBLIC_APP_URL` | Optional | Public site URL (Vercel) |

For local dev, set `NEXT_PUBLIC_APP_URL=http://localhost:3000`.

Add the same variables in **Vercel → Settings → Environment Variables** for production.

### 3. Supabase

1. Create a project at [supabase.com](https://supabase.com) if needed
2. In the SQL Editor, run migrations in order: `001`, `002`, `003`, `004`. Migration `004` loads the open-chair shop list for **Find closest** on `/book`.
3. Auth → Users → Add user (email/password) for your single login

Optional: copy `supabase/drive-export/` to Google Drive (see `UPLOAD_TO_DRIVE.txt`).

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- Email/password auth (single user)
- Dashboard: status counts + follow-ups + high priority
- Shops list with status / area / priority filters
- Add & edit shop forms
- One-click status update buttons
- Message templates with copy-to-clipboard

## Deploy (Vercel)

Production project: **paqin-family-tattoo** (Vercel team **dirty-ink**)

- Working URL today: https://paqin-family-tattoo-dirty-ink.vercel.app/book
- Short URL (once the old unused project is deleted): https://paqin-family-tattoo.vercel.app/book

1. Push to GitHub (`master`)
2. Vercel project **paqin-family-tattoo**, repo `dawimberly/dirty-ink`
3. Add env vars from `.env.local.example` (at minimum the two `NEXT_PUBLIC_SUPABASE_*` keys)
4. Deploy — GitHub → Vercel auto-deploy should be connected
