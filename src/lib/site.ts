export const SITE_NAME = "In The Flesh";
export const SITE_WORDMARK = "In The Flesh";
export const ARTIST_NAME = "Greg Paquín";
export const SITE_TAGLINE = "Los Angeles · Hermosa Ink · Streetwear";

const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://paqin-family-tattoo.vercel.app"
).replace(/\/$/, "");

/** Public storefront home. */
export const SITE_URL = APP_ORIGIN;

/** In-app shop — replaces the old Shopify storefront. */
export const SHOP_URL = "/shop";

/** Studio where Greg works — listed on booking; clients book via our form. */
export const HERMOSA_INK_NAME = "Hermosa Ink";
export const HERMOSA_INK_AREA = "Hermosa Beach";
export const HERMOSA_INK_ADDRESS = "802 Hermosa Ave, Hermosa Beach, CA 90254";

/** Public booking page — form emails Greg directly. */
export const BOOKING_URL = `${APP_ORIGIN}/book`;

export const INSTAGRAM_URL = "https://instagram.com/geepaqwin";
export const INSTAGRAM_HANDLE = "@geepaqwin";
