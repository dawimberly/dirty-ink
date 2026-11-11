import type { Metadata } from "next";
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
import {
  ARTIST_NAME,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const description = `Shirt graphics and lettering by ${ARTIST_NAME}. Blackletter, script, street lettering, traditional drawing, splatter, and graphite — original art for clothing, drawn by hand.`;

export const metadata: Metadata = {
  title: `Shirt work — ${SITE_NAME}`,
  description,
  openGraph: {
    title: `Shirt work — ${SITE_NAME}`,
    description,
    url: `${SITE_URL}/shirt-work`,
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
    title: `Shirt work — ${SITE_NAME}`,
    description,
    images: [OG_IMAGE_PATH],
  },
};

export default function ShirtWorkPage() {
  return (
    <PublicShell wide>
      <header className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[#1fa8ef]">
          Portfolio
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-ink-display)] text-4xl tracking-wide sm:text-5xl">
          Shirt work
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#f2ebe0]/75 sm:text-lg">
          {ARTIST_NAME} draws original graphics for clothing brands. Blackletter,
          script, street lettering, traditional drawing, splatter, and graphite.
          Every piece is drawn by hand. No AI. No templates.
        </p>
      </header>

      <div className="flex flex-col gap-14 pb-4">
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
