import type { Metadata } from "next";
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
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SHIRT_GRAPHIC_INQUIRY_URL,
  SITE_NAME,
} from "@/lib/site";

const pageTitle = "Original Shirt Graphics by Greg Paquín | Paqing House";
const pageDescription =
  "Hire Greg Paquín to draw original, hand-drawn shirt graphics for your clothing brand. Los Angeles lettering artist and illustrator. No AI. No templates.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/portfolio/15_adam_1.jpg", alt: "Original shirt graphic shown on a front and back shirt mockup" }],
  },
};

export default function HomePage() {
  return (
    <PublicShell wide>
      <section className="grid items-center gap-8 pb-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef]">
            Los Angeles · Shirt graphics by Greg Paquín
          </p>
          <h1 className="mt-3 max-w-xl font-[family-name:var(--font-ink-display)] text-4xl leading-[1.05] tracking-wide text-white sm:text-5xl">
            Original shirt graphics, drawn by hand.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f2ebe0]/80 sm:text-lg">
            Hire {ARTIST_NAME} to draw original graphics for your clothing brand.
            Every piece is hand-drawn. No AI. No templates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={SHIRT_GRAPHIC_INQUIRY_URL}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 py-3 text-sm font-semibold tracking-wide text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
            >
              Get a shirt graphic drawn
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium tracking-wide text-[#f2ebe0] backdrop-blur-sm transition hover:bg-[#f2ebe0]/10"
              aria-label={INSTAGRAM_HANDLE}
            >
              <InstagramIcon className="size-4" />
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            >
              Email {SITE_NAME}
            </a>
          </div>
          <p className="mt-4 text-sm text-[#f2ebe0]/45">
            <a href="/shirt-work" className="text-[#1fa8ef] hover:text-[#4fbcf5]">
              Shirt work
            </a>
            <span aria-hidden> · </span>
            <a href="/about" className="hover:text-[#f2ebe0]/70">
              About Greg
            </a>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#ece7df]">
            <Image
              src="/portfolio/15_adam_1.jpg"
              alt="Front and back shirt mockup with original hand-drawn graphics"
              fill
              sizes="(min-width: 1024px) 240px, 45vw"
              className="object-contain p-2"
              priority
            />
          </div>
          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-[#ece7df]">
            <Image
              src="/portfolio/08_dickies_longsleeve.jpg"
              alt="Long-sleeve shirt mockup with hand-drawn back and sleeve lettering"
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
