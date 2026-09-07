import type { Metadata } from "next";
import { PublicShell } from "@/components/site/public-shell";
import { CheckoutSuccessClient } from "@/components/shop/checkout-success-client";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Order confirmed — ${SITE_NAME}`,
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <PublicShell>
      <CheckoutSuccessClient />
    </PublicShell>
  );
}
