export const SHOP_TYPES = [
  "Guest Spot",
  "Chair Rental",
  "Open Chair",
  "Both",
  "Unknown",
] as const;

export const SHOP_STATUSES = [
  "Not Contacted",
  "Contacted",
  "Follow-up",
  "Interested",
  "Booked",
  "Rejected",
] as const;

export const SHOP_PRIORITIES = ["High", "Medium", "Low"] as const;

export const LA_AREAS = [
  "South Bay",
  "DTLA",
  "Hollywood",
  "Silver Lake",
  "Echo Park",
  "Los Feliz",
  "West Hollywood",
  "Santa Monica",
  "Venice",
  "Culver City",
  "Mid-City",
  "Koreatown",
  "Pasadena",
  "Long Beach",
  "Other",
] as const;

export type ShopType = (typeof SHOP_TYPES)[number];
export type ShopStatus = (typeof SHOP_STATUSES)[number];
export type ShopPriority = (typeof SHOP_PRIORITIES)[number];
export type LaArea = (typeof LA_AREAS)[number];

export type Shop = {
  id: string;
  name: string;
  area: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  contact_person: string | null;
  instagram: string | null;
  website: string | null;
  email_phone: string | null;
  type: ShopType | string | null;
  date_contacted: string | null;
  status: ShopStatus | string;
  follow_up_date: string | null;
  portfolio_sent: boolean;
  rate_terms: string | null;
  notes: string | null;
  priority: ShopPriority | string;
  created_at: string;
};

export type ShopInsert = Omit<Shop, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type ShopUpdate = Partial<ShopInsert>;

export type ShopFilters = {
  status?: string;
  area?: string;
  priority?: string;
  search?: string;
};
