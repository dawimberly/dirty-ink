import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/site/public-shell";
import { ProductCard } from "@/components/shop/product-card";
import { PRODUCTS } from "@/lib/products";
import { ARTIST_NAME, SITE_NAME, SITE_TAGLINE, SITE_WORDMARK } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Original streetwear & art`,
  description:
    "Paq'in Family House (PAQINHAUS) — Los Angeles streetwear and original art, hand-drawn by Greg Paquín. Shop the KNOWPAIN and Mouth Bay tees and the Lighthouse graphite print.",
};

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <PublicShell wide>
      <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10">
        <Image
          src="/brand/graffiti-hero.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,14,0.72)_0%,rgba(11,11,14,0.82)_60%,rgba(11,11,14,0.94)_100%)]"
        />
        <div className="relative mx-auto max-w-2xl px-4 py-14 text-center sm:py-20">
          <span className="mx-auto grid size-16 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-[#1fa8ef]/60">
            <Image
              src="/brand/logo.png"
              alt=""
              width={64}
              height={64}
              className="size-16 object-contain"
              priority
            />
          </span>
          <p className="mt-6 font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {SITE_TAGLINE}
          </p>
          <h1 className="pfh-stroke mt-3 font-[family-name:var(--font-ink-display)] text-5xl leading-[0.95] tracking-[0.04em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)] sm:text-8xl">
            {SITE_WORDMARK}
          </h1>
          <div aria-hidden className="mx-auto mt-4 h-1.5 w-40 -rotate-1 rounded-full bg-[#e653a4] blur-[0.5px]" />
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#f2ebe0]/85 sm:text-lg">
            Wearable art out of Los Angeles. Every graphic is drawn by hand by
            {" "}{ARTIST_NAME} — original work, limited drops, no filler.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold tracking-wide text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
            >
              Shop the drop
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium tracking-wide text-[#f2ebe0] backdrop-blur-sm transition hover:bg-[#f2ebe0]/10"
            >
              About the house
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
            Featured
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-4 pt-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 border-t-2 border-t-[#1fa8ef] bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1fa8ef]">01</p>
          <h3 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            The artist
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Every piece starts as an original drawing by {ARTIST_NAME} — tattoo
            roots, LA street sensibility.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 border-t-2 border-t-[#7ec13a] bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#7ec13a]">02</p>
          <h3 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            Original art
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            No templates, no clip art. Every graphic is hand-drawn and one of
            ours.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 border-t-2 border-t-[#e653a4] bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#e653a4]">03</p>
          <h3 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            Los Angeles
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Born in the 310. Built for everywhere.
          </p>
        </div>
      </section>
    </PublicShell>
  );
}
