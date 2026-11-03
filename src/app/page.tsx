import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/site/public-shell";
import {
  ApparelGrid,
  DrawingGrid,
  HireContact,
  HowItWorks,
} from "@/components/site/hire-sections";
import { InstagramIcon } from "@/components/site/instagram-icon";
import {
  ARTIST_NAME,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Clothing graphics`,
  description: `${ARTIST_NAME} draws original hand-drawn graphics for clothing brands. Blackletter, script, street lettering, traditional drawing, splatter, and graphite. Los Angeles.`,
};

export default function HomePage() {
  return (
    <PublicShell wide>
      <section className="grid items-center gap-8 pb-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef]">
            {SITE_TAGLINE}
          </p>
          <h1 className="mt-3 max-w-xl font-[family-name:var(--font-ink-display)] text-4xl leading-[1.05] tracking-wide text-white sm:text-5xl">
            Original graphics for clothing brands. Drawn by hand.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f2ebe0]/80 sm:text-lg">
            {ARTIST_NAME} draws blackletter, script, street lettering,
            traditional work, splatter, and graphite for shirts. No AI. No
            templates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold tracking-wide text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium tracking-wide text-[#f2ebe0] backdrop-blur-sm transition hover:bg-[#f2ebe0]/10"
            >
              <InstagramIcon className="size-4" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>
          <p className="mt-4 text-sm text-[#f2ebe0]/45">
            <Link href="/letterheads" className="text-[#1fa8ef] hover:text-[#4fbcf5]">
              Letterheads
            </Link>
            <span aria-hidden> · </span>
            <Link href="/shop" className="hover:text-[#f2ebe0]/70">
              House shop
            </Link>
            <span aria-hidden> · </span>
            <Link href="/book" className="hover:text-[#f2ebe0]/70">
              Tattoo booking
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#ece7df]">
            <Image
              src="/portfolio/21_graphite_lighthouse_v2.jpg"
              alt="Graphite drawing of a lighthouse in a storm"
              fill
              sizes="(min-width: 1024px) 240px, 45vw"
              className="object-contain p-2"
              priority
            />
          </div>
          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#ece7df]">
            <Image
              src="/portfolio/06_PL2-OTR.jpg"
              alt="Popular Loner blackletter and a character head"
              fill
              sizes="(min-width: 1024px) 240px, 45vw"
              className="object-contain p-3"
              priority
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-14 py-8">
        <DrawingGrid />
        <ApparelGrid />
        <HowItWorks />
        <HireContact />
      </div>
    </PublicShell>
  );
}
