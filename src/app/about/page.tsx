import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import {
  ARTIST_NAME,
  HERMOSA_INK_NAME,
  HERMOSA_INK_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description:
    "In The Flesh is a Los Angeles streetwear and art label — original graphics hand-drawn by Greg Paquín.",
};

export default function AboutPage() {
  return (
    <PublicShell>
      <article className="prose-invert mx-auto max-w-xl">
        <h1 className="font-[family-name:var(--font-ink-display)] text-3xl tracking-[0.08em] sm:text-4xl">
          The label
        </h1>
        <p className="mt-5 text-[#f2ebe0]/70">
          {SITE_NAME} is a Los Angeles streetwear and art label built around one
          artist: {ARTIST_NAME}. He draws every graphic by hand — tattoo artist
          first — so what you put on is original art, not a template.
        </p>
        <p className="mt-4 text-[#f2ebe0]/70">
          From the &ldquo;Know Pain&rdquo; blackletter tees to the Mouth Bay 310
          graphic and the Lighthouse graphite series, the goal is the same: wear
          the art. Want it on skin instead? Greg books mainly at{" "}
          <a
            href={HERMOSA_INK_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            {HERMOSA_INK_NAME}
          </a>{" "}
          in Hermosa Beach.
        </p>
        <p className="mt-6 text-[#f2ebe0]/70">
          New drops land on Instagram first —{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            {INSTAGRAM_HANDLE}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={HERMOSA_INK_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold text-[#140e0a] transition hover:bg-[#4fbcf5]"
          >
            Book at {HERMOSA_INK_NAME}
          </a>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium text-[#f2ebe0] transition hover:bg-[#f2ebe0]/10"
          >
            Shop the drop
          </Link>
        </div>
      </article>
    </PublicShell>
  );
}
