# Paq'in House — open-chair booking setup

Run these in the **Supabase SQL Editor** (in order):

1. `001_create_shops.sql`
2. `002_create_appointment_requests.sql`
3. `003_shop_locations_and_booking_fields.sql`
4. `004_shops_name_unique_and_booking_seed.sql` ← **loads the 8 shops**

Or run the all-in-one file: `supabase-setup-booking-shops.sql`

## Find closest list (7 shops on /book)

| Shop | Area |
|------|------|
| Port City Tattoo | Long Beach |
| Outer Limits Tattoo | Long Beach |
| Yer Cheat'n Heart Tattoo | Lawndale |
| Broken Art Tattoo | Silver Lake |
| Spotlight Tattoo | Hollywood |
| Alchemy Tattoo | Silver Lake |
| Classic Tattoo | Fullerton |

**Excluded:** High Voltage Tattoo (guest spot only)

## Edit the list

- Update `open_chair_booking_shops.csv`
- Re-run `002_open_chair_booking_shops.sql` or migration `004` insert block
- Or toggle **Allows open chair bookings** in the admin `/shops` form

## Vercel

No login needed if GitHub → Vercel auto-deploy is connected. Merge PR #1 and redeploy.

After deploy, `/book` → Find closest works even before SQL (built-in fallback). Run SQL so the admin dashboard and Supabase stay in sync.
