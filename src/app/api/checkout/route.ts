import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getStripe, hasStripeSecret } from "@/lib/stripe";
import { SITE_URL } from "@/lib/site";

type CartPayloadItem = {
  slug: string;
  size: string;
  qty: number;
};

export async function POST(request: Request) {
  if (!hasStripeSecret()) {
    const raw = process.env.STRIPE_SECRET_KEY;
    const hint = !raw
      ? "missing"
      : raw.trim().startsWith("pk_")
        ? "publishable_key_not_secret"
        : raw.trim().startsWith("sk_")
          ? "unexpected_sk_format"
          : "present_but_not_sk_test_or_sk_live";
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Vercel env vars.",
        hint,
      },
      { status: 503 }
    );
  }

  let body: { items?: CartPayloadItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = body.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  const line_items: {
    quantity: number;
    price_data: {
      currency: "usd";
      unit_amount: number;
      product_data: {
        name: string;
        description: string;
        images?: string[];
        metadata: Record<string, string>;
      };
    };
  }[] = [];

  for (const item of items.slice(0, 20)) {
    const qty = Math.floor(Number(item.qty));
    if (!item.slug || !item.size || !Number.isFinite(qty) || qty < 1 || qty > 20) {
      return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
    }

    const product = getProduct(item.slug);
    if (!product || product.soldOut) {
      return NextResponse.json(
        { error: `Unknown or unavailable product: ${item.slug}` },
        { status: 400 }
      );
    }
    if (!product.sizes.includes(item.size)) {
      return NextResponse.json(
        { error: `Size ${item.size} is not available for ${product.name}.` },
        { status: 400 }
      );
    }

    const image = product.images[0]?.src;
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: {
          name: `${product.name} — ${item.size}`,
          description: product.blurb,
          ...(image
            ? { images: [`${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`] }
            : {}),
          metadata: {
            slug: product.slug,
            code: product.code,
            size: item.size,
            artist: product.artist,
          },
        },
      },
    });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/checkout`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 800, currency: "usd" },
            display_name: "US shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 14 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      metadata: {
        source: "paqinhaus-web",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session failed", error);
    return NextResponse.json(
      { error: "Could not start Stripe checkout. Try again." },
      { status: 502 }
    );
  }
}
