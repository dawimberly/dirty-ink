import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition hover:border-[#c45c26]/50"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[#f2ebe0]/80 backdrop-blur-sm">
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
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#f2ebe0]/55">
          {product.blurb}
        </p>
        <span className="mt-3 text-sm font-semibold text-[#c45c26] group-hover:text-[#d46a32]">
          View →
        </span>
      </div>
    </Link>
  );
}
