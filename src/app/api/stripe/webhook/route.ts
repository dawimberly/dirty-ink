import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendOrderNotificationEmail } from "@/lib/order-notify";
import { getStripe, hasStripeSecret } from "@/lib/stripe";

export const runtime = "nodejs";

function formatAddress(
  address: Stripe.Address | null | undefined
): string | null {
  if (!address) return null;
  const parts = [
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(", "),
    address.country,
  ].filter(Boolean);
  return parts.length ? parts.join("\n") : null;
}

export async function POST(request: Request) {
  if (!hasStripeSecret()) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature failed", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 50,
      });

      const shipping = session.collected_information?.shipping_details ?? null;

      await sendOrderNotificationEmail({
        sessionId: session.id,
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail:
          session.customer_details?.email ?? session.customer_email ?? null,
        customerName: session.customer_details?.name ?? null,
        customerPhone: session.customer_details?.phone ?? null,
        shippingName: shipping?.name ?? null,
        shippingAddress: formatAddress(shipping?.address),
        lines: lineItems.data.map((item) => ({
          name: item.description ?? "Item",
          quantity: item.quantity ?? 1,
          amountTotal: item.amount_total,
        })),
      });
    } catch (error) {
      console.error("Order notification failed", error);
      // Still 200 so Stripe does not retry forever on email hiccups.
    }
  }

  return NextResponse.json({ received: true });
}
