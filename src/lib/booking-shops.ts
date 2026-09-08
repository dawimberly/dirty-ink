import type { NearbyShop } from "@/lib/types/booking";

/** Greg's studio location for booking — clients request via the form (emails Greg). */
export const BOOKING_SHOP_LOCATIONS: Array<
  Omit<NearbyShop, "distance_miles"> & { lat: number; lng: number }
> = [
  {
    id: "booking-hermosa-ink",
    name: "Hermosa Ink",
    address: "802 Hermosa Ave",
    area: "Hermosa Beach",
    lat: 33.8625,
    lng: -118.3995,
  },
];
