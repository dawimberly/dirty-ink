import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import {
  ApparelGrid,
  HireContact,
  HowItWorks,
  LetteringGrid,
  OtherWorkGrid,
  ShirtGraphicCTA,
} from "@/components/site/hire-sections";
import { ARTIST_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Shirt work — ${SITE_NAME}`,
  description: `Original shirt graphics drawn by hand by ${ARTIST_NAME}, a Los Angeles lettering artist and illustrator.`,
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
          {ARTIST_NAME} draws original shirt graphics for clothing brands.
          Every piece is hand-drawn. No AI. No templates.
        </p>
      </header>

      <div className="flex flex-col gap-14 pb-4">
        <ApparelGrid />
        <LetteringGrid />
        <OtherWorkGrid />
        <ShirtGraphicCTA />
        <HowItWorks />
        <HireContact />
      </div>
    </PublicShell>
  );
}
