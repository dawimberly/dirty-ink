import Stripe from "stripe";

function stripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY?.trim() || "";
}

export function getStripe() {
  const key = stripeSecretKey();
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  return new Stripe(key, {
    apiVersion: "2026-08-26.dahlia",
    typescript: true,
  });
}

export function hasStripeSecret() {
  const key = stripeSecretKey();
  return key.startsWith("sk_test_") || key.startsWith("sk_live_");
}
