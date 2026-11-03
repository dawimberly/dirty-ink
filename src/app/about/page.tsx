import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import {
  ARTIST_NAME,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description: `${SITE_NAME} is ${ARTIST_NAME}'s Los Angeles studio for original, hand-drawn clothing graphics.`,
};

export default function AboutPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-xl">
        <h1 className="font-[family-name:var(--font-ink-display)] text-3xl tracking-[0.08em] sm:text-4xl">
          The house
        </h1>
        <p className="mt-5 text-[#f2ebe0]/70">
          {SITE_NAME} is {ARTIST_NAME}&apos;s studio in Los Angeles. Brands come
          here when they need original art for shirts — blackletter, script,
          street lettering, traditional drawing, splatter, graphite. He draws
          every piece by hand. No AI. No templates.
        </p>
        <p className="mt-4 text-[#f2ebe0]/70">
          The lettering on this site is the work. Paq&apos;in logos and past shop
          graphics are not offered for another brand to print. The house shop
          and tattoo booking stay open, off to the side.
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
          <Link
            href="/letterheads"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
          >
            Letterheads
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium text-[#f2ebe0] transition hover:bg-[#f2ebe0]/10"
          >
            House shop
          </Link>
        </div>
      </article>
    </PublicShell>
  );
}
