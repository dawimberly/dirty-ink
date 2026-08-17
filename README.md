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
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get both from [Supabase](https://supabase.com) → your project → **Settings → API** (Project URL + anon/public key).

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

1. Push to GitHub
2. Import in Vercel
3. Add the same `NEXT_PUBLIC_SUPABASE_*` env vars
4. Deploy
