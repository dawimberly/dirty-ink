import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking/booking-form";
import { PublicShell } from "@/components/site/public-shell";
import {
  ARTIST_NAME,
  BOOKING_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `Book — ${SITE_NAME}`,
  description: `Request a custom tattoo appointment with ${ARTIST_NAME} — open chair across Los Angeles.`,
  alternates: { canonical: BOOKING_URL },
};

export default function BookPage() {
  return (
    <PublicShell>
      <header className="pfh-rise mb-8 text-center sm:mb-10">
        <p className="font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Open chair · Custom work · LA
        </p>
        <h1 className="pfh-stroke mt-3 font-[family-name:var(--font-ink-brand)] text-5xl leading-[0.95] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] sm:text-7xl">
          Book ink
        </h1>
        <div
          aria-hidden
          className="mx-auto mt-4 h-1.5 w-28 -rotate-1 rounded-full bg-[#e653a4] blur-[0.5px]"
        />
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#f2ebe0]/80 sm:text-base">
          Tell {ARTIST_NAME} the idea — placement, size, vibes. He&apos;ll follow
          up to lock time and deposit at an open chair near you.
        </p>
        <p className="mt-4 text-xs text-[#f2ebe0]/45">
          Prefer DMs?{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#1fa8ef] underline decoration-[#1fa8ef]/40 underline-offset-4 hover:text-[#4fbcf5]"
          >
            {INSTAGRAM_HANDLE}
          </a>
          {" · "}
          <Link href="/shop" className="hover:text-[#f2ebe0]/80">
            Shop the drop
          </Link>
        </p>
      </header>

      <div className="pfh-rise-delay">
        <BookingForm />
      </div>
    </PublicShell>
  );
}
