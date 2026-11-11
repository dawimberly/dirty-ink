export const SITE_NAME = "Paqing House";
export const SITE_WORDMARK = "Paqing House";
export const ARTIST_NAME = "Greg Paquín";
export const SITE_TAGLINE = "Los Angeles · Shirt graphics by Greg Paquín";

/** Brands write here to commission original shirt art. */
export const CONTACT_EMAIL = "paqinghouse@gmail.com";

const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://paqin-family-tattoo.vercel.app"
).replace(/\/$/, "");

/** Public storefront home. */
export const SITE_URL = APP_ORIGIN;

/** In-app shop — replaces the old Shopify storefront. */
export const SHOP_URL = "/shop";

/** Public tattoo booking page. */
export const BOOKING_URL = `${APP_ORIGIN}/book`;

export const INSTAGRAM_URL = "https://instagram.com/geepaqwin";
export const INSTAGRAM_HANDLE = "@geepaqwin";

export const SHIRT_GRAPHIC_INQUIRY_URL =
  `mailto:${CONTACT_EMAIL}?subject=Shirt%20graphic%20inquiry`;
