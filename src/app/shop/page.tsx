import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/site/public-shell";
import { ProductCard } from "@/components/shop/product-card";
import { PRODUCTS } from "@/lib/products";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Shop — ${SITE_NAME}`,
  description:
    "Shop Paq'in Family House streetwear and prints — original art by Greg Paquín in Los Angeles.",
};

export default function ShopPage() {
  return (
    <PublicShell wide>
      <header className="mb-8 text-center sm:mb-10">
        <h1 className="font-[family-name:var(--font-ink-display)] text-3xl tracking-[0.08em] sm:text-4xl">
          Shop
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#f2ebe0]/55">
          Paq&apos;in house pieces. Pick a size — we make it and ship it.
          Commissioned graphics for other brands start on{" "}
          <Link href="/letterheads" className="text-[#1fa8ef] hover:text-[#4fbcf5]">
            Letterheads
          </Link>
          .
        </p>
      </header>
      <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </PublicShell>
  );
}
