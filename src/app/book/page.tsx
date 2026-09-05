import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";
import { PublicShell } from "@/components/site/public-shell";
import { ARTIST_NAME, BOOKING_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Book — ${SITE_NAME}`,
  description: "Request a tattoo appointment with Paq'in House Tattoo.",
  alternates: { canonical: BOOKING_URL },
};

export default function BookPage() {
  return (
    <PublicShell>
      <header className="mb-8 text-center sm:mb-10">
        <h1 className="text-lg font-medium tracking-wide text-[#f2ebe0]/90 sm:text-xl">
          Book an appointment
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#f2ebe0]/55">
          Tell {ARTIST_NAME} what you want. He&apos;ll follow up to lock in time, placement,
          and deposit.
        </p>
      </header>
      <BookingForm />
    </PublicShell>
  );
}
