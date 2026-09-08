import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/site/public-shell";
import { ProductCard } from "@/components/shop/product-card";
import { PRODUCTS } from "@/lib/products";
import {
  ARTIST_NAME,
  HERMOSA_INK_AREA,
  HERMOSA_INK_NAME,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_WORDMARK,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Tattoos & streetwear`,
  description:
    "In The Flesh — book tattoos with Greg Paquín (Hermosa Ink) and shop original LA streetwear.",
};

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <PublicShell wide>
      {/* Full-bleed first composition */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-12 w-screen">
        <div className="relative flex min-h-[min(92vh,920px)] items-center justify-center overflow-hidden">
          <Image
            src="/brand/graffiti-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover pfh-hero-pan"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,14,0.55)_0%,rgba(11,11,14,0.72)_45%,rgba(11,11,14,0.92)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen bg-[radial-gradient(ellipse_at_20%_10%,rgba(31,168,239,0.22)_0%,transparent_45%),radial-gradient(ellipse_at_85%_80%,rgba(230,83,164,0.18)_0%,transparent_40%)]"
          />

          <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
            <p className="pfh-rise font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef] drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-xl">
              {SITE_TAGLINE}
            </p>
            <h1 className="pfh-rise-delay pfh-stroke mt-4 font-[family-name:var(--font-ink-brand)] text-5xl leading-[0.95] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.8)] sm:text-7xl md:text-8xl">
              {SITE_WORDMARK}
            </h1>
            <div
              aria-hidden
              className="pfh-rise-delay mx-auto mt-5 h-1.5 w-36 -rotate-1 rounded-full bg-[#e653a4] blur-[0.5px] sm:w-48"
            />
            <p className="pfh-rise-late mx-auto mt-6 max-w-md text-base leading-relaxed text-[#f2ebe0]/85 sm:text-lg">
              Hand-drawn art for skin and street — by {ARTIST_NAME} out of Los
              Angeles.
            </p>
            <div className="pfh-rise-late mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[#f2ebe0]/35 bg-black/35 px-8 text-sm font-medium tracking-wide text-[#f2ebe0] backdrop-blur-sm transition hover:bg-[#f2ebe0]/10"
              >
                Shop the drop
              </Link>
              <Link
                href="/book"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#1fa8ef] px-8 text-sm font-semibold tracking-wide text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
              >
                Book ink
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-ink-tag)] text-sm text-[#1fa8ef]">
              The drop
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-ink-display)] text-2xl tracking-wide sm:text-3xl">
              Featured
            </h2>
          </div>
          <Link
            href="/shop"
            className="shrink-0 text-sm font-medium text-[#1fa8ef] hover:text-[#4fbcf5]"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-4 w-screen border-y border-white/10 bg-black/50">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-14">
          <div className="max-w-lg">
            <p className="font-[family-name:var(--font-ink-tag)] text-[#1fa8ef]">
              {HERMOSA_INK_NAME} · {HERMOSA_INK_AREA}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-ink-display)] text-2xl tracking-wide sm:text-3xl">
              Get inked by {ARTIST_NAME}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#f2ebe0]/65 sm:text-base">
              Email Greg directly.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-[#1fa8ef] px-7 text-sm font-semibold tracking-wide text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
          >
            Book an appointment
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
