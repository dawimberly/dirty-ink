"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/shop/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export function CheckoutClient() {
  const { items, subtotalCents, setQty, removeItem } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPay() {
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            slug: item.slug,
            size: item.size,
            qty: item.qty,
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not start checkout.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Could not reach checkout. Try again.");
    } finally {
      setPending(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/40 p-10 text-center">
        <p className="text-[#f2ebe0]/70">Your bag is empty.</p>
        <Button
          className="mt-5 bg-[#1fa8ef] text-[#140e0a] hover:bg-[#4fbcf5]"
          render={<Link href="/shop" />}
        >
          Browse the shop
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-2xl border border-white/10 bg-black/40 p-4"
          >
            <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#111]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between gap-2">
                <p className="font-medium">{item.name}</p>
                <span>{formatPrice(item.priceCents * item.qty)}</span>
              </div>
              <p className="text-xs text-[#f2ebe0]/50">Size {item.size}</p>
              <div className="mt-auto flex items-center gap-3 pt-3">
                <label className="text-xs text-[#f2ebe0]/50">Qty</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={item.qty}
                  onChange={(e) => setQty(item.id, Number(e.target.value))}
                  className="h-8 w-16 rounded-lg border border-white/15 bg-black/40 px-2 text-sm text-[#f2ebe0]"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-[#f2ebe0]/40 hover:text-[#f2ebe0]"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit space-y-4 rounded-2xl border border-white/10 bg-black/40 p-5">
        <h2 className="font-[family-name:var(--font-ink-display)] text-xl tracking-wide">
          Order summary
        </h2>
        <div className="flex justify-between text-sm">
          <span className="text-[#f2ebe0]/60">Subtotal</span>
          <span>{formatPrice(subtotalCents)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#f2ebe0]/60">Shipping</span>
          <span className="text-[#f2ebe0]/60">$8.00 at Stripe</span>
        </div>
        <div className="border-t border-white/10 pt-4">
          {error && (
            <p className="mb-3 rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
              {error}
            </p>
          )}
          <Button
            className="h-11 w-full bg-[#1fa8ef] text-sm font-semibold text-[#140e0a] hover:bg-[#4fbcf5]"
            disabled={pending}
            onClick={onPay}
          >
            {pending ? "Redirecting to Stripe…" : "Pay with Stripe"}
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-[#f2ebe0]/45">
            Secure card checkout via Stripe. Shipping address is collected on the
            next screen. Questions? DM{" "}
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
        </div>
      </aside>
    </div>
  );
}
