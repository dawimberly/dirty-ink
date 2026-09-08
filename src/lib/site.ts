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

/** Greg’s main booking home — Hermosa Ink Collective. */
export const HERMOSA_INK_URL = "https://www.hermosaink.com/";
export const HERMOSA_INK_NAME = "Hermosa Ink";

/** On-site booking landing (points people to Hermosa Ink). */
export const BOOKING_URL = `${APP_ORIGIN}/book`;

export const INSTAGRAM_URL = "https://instagram.com/geepaqwin";
export const INSTAGRAM_HANDLE = "@geepaqwin";
