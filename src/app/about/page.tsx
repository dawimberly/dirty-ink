import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import { ARTIST_NAME, INSTAGRAM_HANDLE, INSTAGRAM_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description:
    "Paq'in Family House is a Los Angeles streetwear and art label — original graphics, printed on demand.",
};

export default function AboutPage() {
  return (
    <PublicShell>
      <article className="prose-invert mx-auto max-w-xl">
        <h1 className="font-[family-name:var(--font-ink-display)] text-3xl tracking-[0.08em] sm:text-4xl">
          The house
        </h1>
        <p className="mt-5 text-[#f2ebe0]/70">
          {SITE_NAME} is a Los Angeles streetwear and art label. Every graphic is
          drawn in-house by {ARTIST_NAME} and printed on demand — so we can run
          limited ideas without warehouses full of dead stock.
        </p>
        <p className="mt-4 text-[#f2ebe0]/70">
          From the &ldquo;Know Pain&rdquo; blackletter tees to the Mouth Bay 310
          graphic and the Lighthouse graphite series, the goal is the same: wear
          the art.
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
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold text-[#140e0a] transition hover:bg-[#4fbcf5]"
          >
            Shop the drop
          </Link>
        </div>
      </article>
    </PublicShell>
  );
}
