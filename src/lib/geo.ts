import { setDefaultResultOrder } from "node:dns";

/** Vercel/AWS often stall on IPv6 (AAAA) and surface that as `TypeError: fetch failed`. */
try {
  setDefaultResultOrder("ipv4first");
} catch {
  // dns order is not available in some edge runtimes
}

export {
  AREA_CENTROIDS,
  coordsForShop,
  geocodeQuery,
  haversineMiles,
  parseZip,
  type GeoPoint,
} from "@/lib/geo-core";
