import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/lib/products";

const CATEGORY_COLOR: Record<Product["category"], string> = {
  Tee: "#1fa8ef",
  "Long Sleeve": "#7ec13a",
  Print: "#e653a4",
};

export function ProductCard({ product }: { product: Product }) {
  const accent = CATEGORY_COLOR[product.category];
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition hover:border-white/30"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span
          className="absolute left-3 top-3 rounded-full border bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
          style={{ color: accent, borderColor: accent }}
        >
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
            {product.name}
          </h3>
          <span className="shrink-0 text-sm text-[#f2ebe0]/80">
            {formatPrice(product.priceCents)}
          </span>
        </div>
        <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-[#f2ebe0]/45">
          by {product.artist}
        </p>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#f2ebe0]/55">
          {product.blurb}
        </p>
        <span
          className="mt-3 text-sm font-semibold"
          style={{ color: accent }}
        >
          View →
        </span>
      </div>
    </Link>
  );
}
