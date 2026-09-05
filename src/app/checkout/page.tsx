import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import { CheckoutClient } from "@/components/shop/checkout-client";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Checkout — ${SITE_NAME}`,
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <PublicShell wide>
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-ink-display)] text-3xl tracking-[0.08em] sm:text-4xl">
          Checkout
        </h1>
      </header>
      <CheckoutClient />
    </PublicShell>
  );
}
