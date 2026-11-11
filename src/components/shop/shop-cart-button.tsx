"use client";

import { usePathname } from "next/navigation";
import { CartButton } from "@/components/shop/cart-button";

/** Bag stays available on shop/checkout only — off the hire-facing main nav. */
export function ShopCartButton() {
  const pathname = usePathname();
  const onShop =
    pathname === "/shop" ||
    pathname.startsWith("/shop/") ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/");

  if (!onShop) return null;
  return <CartButton />;
}
