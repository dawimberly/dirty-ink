import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import { InstagramIcon } from "@/components/site/instagram-icon";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SHOP_URL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "Custom tattoos in Los Angeles. Book an appointment with Greg at Paq'in House Tattoo.",
};

export default function HomePage() {
  return (
    <PublicShell wide>
      <section className="mx-auto max-w-2xl py-10 text-center sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#c45c26]">
          Los Angeles
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-ink-display)] text-4xl font-bold tracking-[0.08em] sm:text-6xl">
          {SITE_NAME}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#f2ebe0]/65 sm:text-lg">
          Custom tattoos with Greg. Tell him the idea, pick a nearby chair, and
          he&apos;ll follow up to lock time, placement, and deposit.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#c45c26] px-6 text-sm font-semibold tracking-wide text-[#f2ebe0] transition hover:bg-[#d46a32]"
          >
            Book an appointment
          </Link>
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#f2ebe0]/20 px-6 text-sm font-medium tracking-wide text-[#f2ebe0]/85 transition hover:bg-[#f2ebe0]/10"
          >
            Shop merch
          </a>
        </div>
      </section>

      <section className="grid gap-4 pb-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c45c26]">01</p>
          <h2 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            Request
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Share the idea, placement, size, and photos. Use Find closest to
            pick a shop that works for you.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c45c26]">02</p>
          <h2 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            Confirm
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Greg reviews the request and reaches out on the contact you leave —
            usually within a few days.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c45c26]">03</p>
          <h2 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            Sit
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Time, placement, and deposit get locked in separately before the
            appointment.
          </p>
        </div>
      </section>

      <section className="mb-10 grid gap-4 sm:grid-cols-2">
        <a
          href={SHOP_URL}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-[#c45c26]/50"
        >
          <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
            Merch
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Hats, tees, and shop goods on the Paq&apos;in store.
          </p>
          <p className="mt-4 text-sm font-semibold text-[#c45c26] group-hover:text-[#d46a32]">
            Open shop →
          </p>
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-[#c45c26]/50"
        >
          <h2 className="flex items-center gap-2 font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
            <InstagramIcon className="size-6" />
            Work
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Recent tattoos and flash live on Instagram {INSTAGRAM_HANDLE}.
          </p>
          <p className="mt-4 text-sm font-semibold text-[#c45c26] group-hover:text-[#d46a32]">
            Follow →
          </p>
        </a>
      </section>
    </PublicShell>
  );
}
