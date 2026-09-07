import Stripe from "stripe";

function stripeSecretKey() {
  // Bracket access avoids Next/Turbopack inlining an empty value at build time
  // when the secret was absent during a previous compile.
  const key = process.env["STRIPE_SECRET_KEY"];
  return typeof key === "string" ? key.trim() : "";
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
