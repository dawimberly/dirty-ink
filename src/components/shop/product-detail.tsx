"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/shop/cart-provider";
import { formatPrice, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [added, setAdded] = useState(false);

  function onAdd() {
    if (!size) return;
    addItem({
      slug: product.slug,
      name: product.name,
      size,
      priceCents: product.priceCents,
      image: product.images[0].src,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
          <Image
            src={product.images[activeImage].src}
            alt={product.images[activeImage].alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View ${image.alt}`}
                className={`relative size-20 overflow-hidden rounded-lg border bg-[#111] transition ${
                  activeImage === index
                    ? "border-[#1fa8ef]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-xs uppercase tracking-[0.2em] text-[#1fa8ef]">
          {product.category} · by {product.artist}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-ink-display)] text-3xl tracking-wide sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-xl text-[#f2ebe0]/90">
          {formatPrice(product.priceCents)}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#f2ebe0]/60">
          {product.description}
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#f2ebe0]/80">
              {product.category === "Print" ? "Size" : "Size"}
            </span>
            {!size && (
              <span className="text-xs text-[#1fa8ef]">Select a size</span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                className={`min-w-11 rounded-lg border px-3 py-2 text-sm transition ${
                  size === option
                    ? "border-[#1fa8ef] bg-[#1fa8ef]/15 text-[#f2ebe0]"
                    : "border-white/15 bg-black/30 text-[#f2ebe0]/70 hover:border-white/30"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={onAdd}
          disabled={!size}
          className="mt-7 h-12 w-full bg-[#1fa8ef] text-sm font-semibold text-[#140e0a] hover:bg-[#4fbcf5] disabled:opacity-40"
        >
          {added ? (
            <>
              <Check className="size-4" /> Added to bag
            </>
          ) : size ? (
            "Add to bag"
          ) : (
            "Select a size"
          )}
        </Button>

        {product.madeToOrder && (
          <p className="mt-3 text-center text-xs text-[#f2ebe0]/45">
            Original art by Greg Paquín · ships in 3–10 business days.
          </p>
        )}
      </div>
    </div>
  );
}
