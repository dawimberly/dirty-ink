import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking/booking-form";
import { PublicShell } from "@/components/site/public-shell";
import {
  ARTIST_NAME,
  BOOKING_URL,
  HERMOSA_INK_NAME,
  HERMOSA_INK_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `Book — ${SITE_NAME}`,
  description: `Book a tattoo with ${ARTIST_NAME} at ${HERMOSA_INK_NAME}, or send a request that emails him directly.`,
  alternates: { canonical: BOOKING_URL },
};

export default function BookPage() {
  return (
    <PublicShell>
      <header className="pfh-rise mb-8 text-center sm:mb-10">
        <p className="font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {HERMOSA_INK_NAME} · Hermosa Beach
        </p>
        <h1 className="pfh-stroke mt-3 font-[family-name:var(--font-ink-brand)] text-5xl leading-[0.95] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] sm:text-7xl">
          Book ink
        </h1>
        <div
          aria-hidden
          className="mx-auto mt-4 h-1.5 w-28 -rotate-1 rounded-full bg-[#e653a4] blur-[0.5px]"
        />
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#f2ebe0]/80 sm:text-base">
          {ARTIST_NAME} books mainly at {HERMOSA_INK_NAME}. Start there — or send
          him a request below and it emails him directly.
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

      <div className="pfh-rise-delay mx-auto mb-10 flex max-w-md flex-col items-center gap-3 text-center">
        <a
          href={HERMOSA_INK_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#1fa8ef] px-8 text-sm font-semibold tracking-wide text-[#0b0b0e] transition hover:bg-[#4fbcf5] sm:w-auto sm:min-w-[16rem]"
        >
          Book at {HERMOSA_INK_NAME}
        </a>
        <p className="text-xs text-[#f2ebe0]/40">
          Ask for Greg ·{" "}
          <a
            href={HERMOSA_INK_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[#f2ebe0]/25 underline-offset-4 hover:text-[#f2ebe0]/70"
          >
            hermosaink.com
          </a>
        </p>
      </div>

      <div className="pfh-rise-late mb-6 flex items-center gap-3">
        <div aria-hidden className="h-px flex-1 bg-[#f2ebe0]/15" />
        <p className="shrink-0 font-[family-name:var(--font-ink-tag)] text-sm text-[#1fa8ef]">
          Or email Greg directly
        </p>
        <div aria-hidden className="h-px flex-1 bg-[#f2ebe0]/15" />
      </div>

      <div className="pfh-rise-late">
        <BookingForm />
      </div>
    </PublicShell>
  );
}
