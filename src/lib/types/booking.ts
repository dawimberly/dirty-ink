export const BOOKING_STATUSES = [
  "New",
  "Contacted",
  "Booked",
  "Declined",
  "Done",
] as const;

export const APPOINTMENT_TYPES = [
  "Consult",
  "Touch-up",
  "Custom piece",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type AppointmentType = (typeof APPOINTMENT_TYPES)[number];

export type NearbyShop = {
  id: string;
  name: string;
  address: string | null;
  area: string | null;
  distance_miles: number;
};

export type AppointmentRequest = {
  id: string;
  client_name: string;
  email: string | null;
  phone: string | null;
  instagram: string | null;
  preferred_dates: string | null;
  placement: string | null;
  size_estimate: string | null;
  style_notes: string | null;
  description: string;
  budget: string | null;
  status: BookingStatus | string;
  artist_notes: string | null;
  created_at: string;
  client_address?: string | null;
  appointment_type?: string | null;
  preferred_shop_id?: string | null;
  preferred_shop_name?: string | null;
  reference_image_urls?: string[] | null;
};

export type AppointmentRequestInsert = {
  client_name: string;
  email?: string | null;
  phone?: string | null;
  instagram?: string | null;
  preferred_dates?: string | null;
  placement?: string | null;
  size_estimate?: string | null;
  style_notes?: string | null;
  description: string;
  budget?: string | null;
  client_address?: string | null;
  appointment_type?: string | null;
  preferred_shop_id?: string | null;
  preferred_shop_name?: string | null;
  reference_image_urls?: string[] | null;
};
