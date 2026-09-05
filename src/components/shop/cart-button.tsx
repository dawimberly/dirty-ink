"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/cart-provider";

export function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open bag${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
      className="relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[#f2ebe0]/80 transition hover:bg-[#f2ebe0]/10 hover:text-[#f2ebe0]"
    >
      <ShoppingBag className="size-4" />
      <span className="hidden sm:inline">Bag</span>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-[#c45c26] text-[10px] font-semibold text-[#140e0a]">
          {count}
        </span>
      )}
    </button>
  );
}
