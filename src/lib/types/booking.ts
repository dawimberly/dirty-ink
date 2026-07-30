export const BOOKING_STATUSES = [
  "New",
  "Contacted",
  "Booked",
  "Declined",
  "Done",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

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
};
