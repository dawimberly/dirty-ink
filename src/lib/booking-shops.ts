import type { NearbyShop } from "@/lib/types/booking";

/** Greg's open-chair booking locations — used if Supabase is not seeded yet. */
export const BOOKING_SHOP_LOCATIONS: Array<
  Omit<NearbyShop, "distance_miles"> & { lat: number; lng: number }
> = [
  {
    id: "booking-port-city",
    name: "Port City Tattoo",
    address: "1145 E 4th St",
    area: "Long Beach",
    lat: 33.7716,
    lng: -118.1772,
  },
  {
    id: "booking-outer-limits",
    name: "Outer Limits Tattoo",
    address: "22 S Chestnut Pl",
    area: "Long Beach",
    lat: 33.7668,
    lng: -118.1969,
  },
  {
    id: "booking-yer-cheatin-heart",
    name: "Yer Cheat'n Heart Tattoo",
    address: "15606 S Inglewood Ave",
    area: "Lawndale",
    lat: 33.8864,
    lng: -118.3627,
  },
  {
    id: "booking-broken-art",
    name: "Broken Art Tattoo",
    address: "2400 Hyperion Ave",
    area: "Silver Lake",
    lat: 34.1039,
    lng: -118.2731,
  },
  {
    id: "booking-spotlight",
    name: "Spotlight Tattoo",
    address: "5859 Melrose Ave",
    area: "Hollywood",
    lat: 34.0835,
    lng: -118.3242,
  },
  {
    id: "booking-alchemy",
    name: "Alchemy Tattoo",
    address: "2854 Sunset Blvd",
    area: "Silver Lake",
    lat: 34.0827,
    lng: -118.2734,
  },
  {
    id: "booking-classic",
    name: "Classic Tattoo",
    address: "116 W Wilshire Ave",
    area: "Fullerton",
    lat: 33.8732,
    lng: -117.9255,
  },
];
