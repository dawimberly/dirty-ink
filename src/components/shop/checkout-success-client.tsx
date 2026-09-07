"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/shop/cart-provider";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export function CheckoutSuccessClient() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-black/40 px-6 py-12 text-center">
      <p className="font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef]">
        Paid · locked in
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-ink-display)] text-3xl tracking-wide">
        Order received
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#f2ebe0]/70">
        Thanks — Stripe confirmed payment. We&apos;ll produce your piece and ship to
        the address you entered. Watch your email for the receipt.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button
          className="bg-[#1fa8ef] text-[#0b0b0e] hover:bg-[#4fbcf5]"
          render={<Link href="/shop" />}
        >
          Keep shopping
        </Button>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[#f2ebe0]/55 hover:text-[#f2ebe0]/85"
        >
          {INSTAGRAM_HANDLE}
        </a>
      </div>
    </div>
  );
}
