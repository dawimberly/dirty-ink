import type { Metadata } from "next";
import { Cinzel, DM_Sans } from "next/font/google";
import { BookingForm } from "@/components/booking/booking-form";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-ink-display",
  weight: ["500", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ink-body",
});

export const metadata: Metadata = {
  title: "Book — Dirty INK",
  description: "Request a tattoo appointment with Dirty INK.",
};

export default function BookPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen font-[family-name:var(--font-ink-body)] text-[#f2ebe0]`}
    >
      <div className="relative isolate min-h-screen overflow-hidden bg-[#0c0a09]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#3a2218_0%,transparent_50%),radial-gradient(ellipse_at_90%_20%,#1a1512_0%,transparent_45%),linear-gradient(180deg,#0c0a09_0%,#140f0c_55%,#0a0908_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <main className="relative mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-12 sm:px-6">
          <header className="mb-8 text-center sm:mb-10">
            <p className="font-[family-name:var(--font-ink-display)] text-4xl font-bold tracking-[0.18em] text-[#f2ebe0] sm:text-5xl">
              DIRTY INK
            </p>
            <h1 className="mt-4 text-lg font-medium tracking-wide text-[#f2ebe0]/90 sm:text-xl">
              Book an appointment
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#f2ebe0]/55">
              Tell Greg what you want. He&apos;ll follow up to lock in time, placement,
              and deposit.
            </p>
          </header>

          <BookingForm />
        </main>
      </div>
    </div>
  );
}
