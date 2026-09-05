export const SITE_NAME = "Paq'in Family House";
export const SITE_WORDMARK = "PAQINHAUS";
export const ARTIST_NAME = "Greg Paquín";
export const SITE_TAGLINE = "Los Angeles · Streetwear · Print on Demand";

const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://paqin-family-tattoo.vercel.app"
).replace(/\/$/, "");

/** Public storefront home. */
export const SITE_URL = APP_ORIGIN;

/** Internal shop (products live in this app now, not an external Shopify store). */
export const SHOP_URL = "/shop";

/** Legacy tattoo booking page — kept accessible, not featured. */
export const BOOKING_URL = `${APP_ORIGIN}/book`;

export const INSTAGRAM_URL = "https://instagram.com/geepaqwin";
export const INSTAGRAM_HANDLE = "@geepaqwin";
