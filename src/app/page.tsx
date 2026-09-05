import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/site/public-shell";
import { ProductCard } from "@/components/shop/product-card";
import { PRODUCTS } from "@/lib/products";
import { SITE_NAME, SITE_TAGLINE, SITE_WORDMARK } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Streetwear, made to order`,
  description:
    "Paq'in Family House (PAQINHAUS) — Los Angeles streetwear and original art, printed on demand. Shop the KNOWPAIN and Mouth Bay tees and the Lighthouse graphite print.",
};

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <PublicShell wide>
      <section className="mx-auto max-w-2xl py-10 text-center sm:py-16">
        <span className="mx-auto grid size-16 place-items-center overflow-hidden rounded-full bg-white">
          <Image
            src="/brand/logo.png"
            alt=""
            width={64}
            height={64}
            className="size-16 object-contain"
            priority
          />
        </span>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.28em] text-[#c45c26]">
          {SITE_TAGLINE}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-ink-display)] text-4xl font-bold tracking-[0.16em] sm:text-6xl">
          {SITE_WORDMARK}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#f2ebe0]/65 sm:text-lg">
          Original streetwear and art out of Los Angeles. Every piece is printed
          to order — no dead stock, no filler, just the drops.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#c45c26] px-6 text-sm font-semibold tracking-wide text-[#140e0a] transition hover:bg-[#d46a32]"
          >
            Shop the drop
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#f2ebe0]/20 px-6 text-sm font-medium tracking-wide text-[#f2ebe0]/85 transition hover:bg-[#f2ebe0]/10"
          >
            About the house
          </Link>
        </div>
      </section>

      <section className="pb-6">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
            Featured
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-[#c45c26] hover:text-[#d46a32]"
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
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c45c26]">01</p>
          <h3 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            Made to order
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Print on demand means each piece is produced when you order it. Less
            waste, limited runs.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c45c26]">02</p>
          <h3 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            Original art
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/55">
            Graphics and drawings are drawn in-house — nothing pulled off a
            template.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c45c26]">03</p>
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
