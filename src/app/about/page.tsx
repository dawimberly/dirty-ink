import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import {
  ARTIST_NAME,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SHIRT_GRAPHIC_INQUIRY_URL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `About Greg — ${SITE_NAME}`,
  description: `Meet ${ARTIST_NAME}, a Los Angeles lettering artist and illustrator with a tattoo background.`,
};

export default function AboutPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-xl">
        <h1 className="font-[family-name:var(--font-ink-display)] text-3xl tracking-[0.08em] sm:text-4xl">
          About Greg
        </h1>
        <p className="mt-5 text-[#f2ebe0]/70">
          {ARTIST_NAME} is a Los Angeles lettering artist and illustrator with a
          tattoo background. His styles include blackletter, script, street
          lettering, traditional drawing, splatter, and graphite. Every piece
          is hand-drawn, with no AI and no templates.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-[#f2ebe0]/70">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </p>
        <a
          href={SHIRT_GRAPHIC_INQUIRY_URL}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 py-3 text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
        >
          Get a shirt graphic drawn
        </a>
      </article>
    </PublicShell>
  );
}
