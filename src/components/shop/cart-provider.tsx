"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  size: string;
  priceCents: number;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "id" | "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "pfh-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [items, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((item, qty = 1) => {
    const id = `${item.slug}::${item.size}`;
    setItems((current) => {
      const existing = current.find((i) => i.id === id);
      if (existing) {
        return current.map((i) =>
          i.id === id ? { ...i, qty: Math.min(i.qty + qty, 20) } : i
        );
      }
      return [...current, { ...item, id, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback<CartContextValue["setQty"]>((id, qty) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((i) => i.id !== id)
        : current.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 20) } : i))
    );
  }, []);

  const removeItem = useCallback<CartContextValue["removeItem"]>((id) => {
    setItems((current) => current.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotalCents = useMemo(
    () => items.reduce((n, i) => n + i.qty * i.priceCents, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    count,
    subtotalCents,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    setQty,
    removeItem,
    clear,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotalCents, count } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? null : closeCart())}>
      <SheetContent
        side="right"
        className="border-white/10 bg-[#0b0b0e] text-[#f2ebe0] sm:max-w-md"
      >
        <SheetHeader className="border-b border-white/10">
          <SheetTitle className="flex items-center gap-2 text-[#f2ebe0]">
            <ShoppingBag className="size-4" /> Your bag ({count})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-8 text-[#f2ebe0]/30" />
            <p className="text-sm text-[#f2ebe0]/60">Your bag is empty.</p>
            <Button
              variant="outline"
              className="border-white/20 bg-transparent text-[#f2ebe0] hover:bg-white/10"
              onClick={closeCart}
              render={<Link href="/shop" />}
            >
              Browse the shop
            </Button>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto px-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-medium leading-tight">{item.name}</p>
                    <button
                      type="button"
                      aria-label="Remove item"
                      className="text-[#f2ebe0]/40 hover:text-[#f2ebe0]"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#f2ebe0]/50">Size {item.size}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-lg border border-white/15">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="grid size-7 place-items-center text-[#f2ebe0]/70 hover:text-[#f2ebe0]"
                        onClick={() => setQty(item.id, item.qty - 1)}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="grid size-7 place-items-center text-[#f2ebe0]/70 hover:text-[#f2ebe0]"
                        onClick={() => setQty(item.id, item.qty + 1)}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="text-sm">
                      {formatPrice(item.priceCents * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#f2ebe0]/60">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotalCents)}</span>
            </div>
            <p className="text-xs text-[#f2ebe0]/40">
              Shipping &amp; taxes calculated at checkout. Every piece is made to order.
            </p>
            <Button
              className="h-11 w-full bg-[#1fa8ef] text-[#140e0a] hover:bg-[#4fbcf5]"
              onClick={closeCart}
              render={<Link href="/checkout" />}
            >
              Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
