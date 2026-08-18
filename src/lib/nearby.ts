import { BOOKING_SHOP_LOCATIONS } from "@/lib/booking-shops";
import { coordsForShop, geocodeQuery, haversineMiles } from "@/lib/geo-core";
import type { NearbyShop } from "@/lib/types/booking";

export async function rankNearbyShops(
  query: string
): Promise<{ shops?: NearbyShop[]; error?: string }> {
  const q = String(query ?? "").trim();
  if (!q) {
    return { error: "Enter an address, city, or ZIP code." };
  }

  const origin = await geocodeQuery(q);
  if (!origin) {
    return {
      error: "Couldn't find that location. Try a 5-digit ZIP or a city name.",
    };
  }

  const shops = BOOKING_SHOP_LOCATIONS.map((shop) => {
    const point = coordsForShop(shop);
    if (!point) return null;
    return {
      id: shop.id,
      name: shop.name,
      address: shop.address,
      area: shop.area,
      distance_miles: haversineMiles(origin, point),
    };
  })
    .filter((shop): shop is NearbyShop => shop !== null)
    .sort((a, b) => a.distance_miles - b.distance_miles)
    .slice(0, 8);

  if (shops.length === 0) {
    return { error: "No open-chair shops are on the list yet." };
  }

  return { shops };
}
