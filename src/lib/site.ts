export const SITE_NAME = "Paq'in House Tattoo";
export const ARTIST_NAME = "Greg";

const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://paqin-family-tattoo.vercel.app"
).replace(/\/$/, "");

/** Public booking page. */
export const BOOKING_URL = `${APP_ORIGIN}/book`;

/** Shopify merch store (keep original .myshopify.com for now). */
export const SHOP_URL =
  process.env.NEXT_PUBLIC_SHOP_URL?.replace(/\/$/, "") ||
  "https://7fegea-va.myshopify.com";

export const INSTAGRAM_URL = "https://instagram.com/geepaqwin";
export const INSTAGRAM_HANDLE = "@geepaqwin";
