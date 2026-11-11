import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/site/public-shell";
import {
  AboutGreg,
  ApparelGrid,
  HireContact,
  HowItWorks,
  LetteringGrid,
  OtherWorkGrid,
  ShirtGraphicCTA,
} from "@/components/site/hire-sections";
import { InstagramIcon } from "@/components/site/instagram-icon";
import {
  ARTIST_NAME,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  OG_IMAGE_PATH,
  SHIRT_CTA_LABEL,
  SHIRT_INQUIRY_MAILTO,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

const description = `${ARTIST_NAME} draws original hand-drawn graphics for clothing brands. Blackletter, script, street lettering, traditional drawing, splatter, and graphite. Los Angeles.`;

export const metadata: Metadata = {
  title: `Original Shirt Graphics by ${ARTIST_NAME} | ${SITE_NAME}`,
  description,
  openGraph: {
    title: `Hire ${ARTIST_NAME} for Original Shirt Graphics | ${SITE_NAME}`,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 750,
        alt: "Hand-drawn shirt graphic by Greg Paquín — front and back tee",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Hire ${ARTIST_NAME} for shirt graphics`,
    description,
    images: [OG_IMAGE_PATH],
  },
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
            Hire Greg to draw original shirt graphics.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f2ebe0]/80 sm:text-lg">
            Hire {ARTIST_NAME} to draw blackletter, script, street lettering,
            traditional work, splatter, and graphite for shirts. No AI. No
            templates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={SHIRT_INQUIRY_MAILTO}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold tracking-wide text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
            >
              {SHIRT_CTA_LABEL}
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
            <Link href="/shirt-work" className="text-[#1fa8ef] hover:text-[#4fbcf5]">
              See shirt work
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#ece7df]">
            <Image
              src="/portfolio/15_adam_1.jpg"
              alt="Front and back tee with hand-drawn lettering and figure"
              fill
              sizes="(min-width: 1024px) 240px, 45vw"
              className="object-contain p-2"
              priority
            />
          </div>
          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#ece7df]">
            <Image
              src="/portfolio/08_dickies_longsleeve.jpg"
              alt="Long sleeve with blackletter back graphic and sleeve script"
              fill
              sizes="(min-width: 1024px) 240px, 45vw"
              className="object-contain p-3"
              priority
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-14 py-8">
        <ApparelGrid />
        <LetteringGrid />
        <OtherWorkGrid />
        <ShirtGraphicCTA />
        <AboutGreg />
        <HowItWorks />
        <HireContact />
      </div>
    </PublicShell>
  );
}
