import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import {
  ARTIST_NAME,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SHIRT_CTA_LABEL,
  SHIRT_INQUIRY_MAILTO,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `About Greg — ${SITE_NAME}`,
  description: `${SITE_NAME} is ${ARTIST_NAME}'s Los Angeles studio for original, hand-drawn clothing graphics.`,
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
          tattoo background. Brands come to {SITE_NAME} when they need original
          art for shirts — blackletter, script, street lettering, traditional
          drawing, splatter, graphite. He draws every piece by hand. No AI. No
          templates.
        </p>
        <p className="mt-4 text-[#f2ebe0]/70">
          Past work shown for reference. Every brand gets original art.
        </p>
        <p className="mt-6 text-[#f2ebe0]/70">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            {CONTACT_EMAIL}
          </a>
          {" · "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={SHIRT_INQUIRY_MAILTO}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
          >
            {SHIRT_CTA_LABEL}
          </a>
          <Link
            href="/shirt-work"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium text-[#f2ebe0] transition hover:bg-[#f2ebe0]/10"
          >
            Shirt work
          </Link>
        </div>
      </article>
    </PublicShell>
  );
}
