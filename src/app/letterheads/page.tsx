import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import {
  ApparelGrid,
  DrawingGrid,
  HireContact,
  HowItWorks,
} from "@/components/site/hire-sections";
import { ARTIST_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Letterheads — ${SITE_NAME}`,
  description: `Lettering and drawing by ${ARTIST_NAME}. Blackletter, script, street lettering, traditional drawing, splatter, and graphite — original graphics for clothing, drawn by hand.`,
};

export default function LetterheadsPage() {
  return (
    <PublicShell wide>
      <header className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[#1fa8ef]">
          Portfolio
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-ink-display)] text-4xl tracking-wide sm:text-5xl">
          Letterheads
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#f2ebe0]/75 sm:text-lg">
          {ARTIST_NAME} draws original graphics for clothing brands. Blackletter,
          script, street lettering, traditional drawing, splatter, and graphite.
          Every piece is drawn by hand. No AI. No templates.
        </p>
      </header>

      <div className="flex flex-col gap-14 pb-4">
        <DrawingGrid />
        <ApparelGrid />
        <HowItWorks />
        <HireContact />
      </div>
    </PublicShell>
  );
}
