type OrderLine = {
  name: string;
  quantity: number;
  amountTotal: number | null;
};

type OrderEmailPayload = {
  sessionId: string;
  amountTotal: number | null;
  currency: string | null;
  customerEmail: string | null;
  customerName: string | null;
  customerPhone: string | null;
  shippingName: string | null;
  shippingAddress: string | null;
  lines: OrderLine[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMoney(cents: number | null, currency: string | null) {
  if (cents == null) return "—";
  const cur = (currency ?? "usd").toUpperCase();
  return `${cur} ${(cents / 100).toFixed(2)}`;
}

export async function sendOrderNotificationEmail(
  payload: OrderEmailPayload
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.BOOKING_NOTIFY_EMAIL?.trim() || "paqinghouse@gmail.com";
  const from = process.env.BOOKING_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const linesText = payload.lines
    .map((line) => {
      const total = formatMoney(line.amountTotal, payload.currency);
      return `• ${line.quantity}× ${line.name} — ${total}`;
    })
    .join("\n");

  const body = [
    `Stripe session: ${payload.sessionId}`,
    `Total: ${formatMoney(payload.amountTotal, payload.currency)}`,
    "",
    `Customer: ${payload.customerName ?? "—"}`,
    `Email: ${payload.customerEmail ?? "—"}`,
    `Phone: ${payload.customerPhone ?? "—"}`,
    "",
    "Ship to:",
    payload.shippingName ?? "—",
    payload.shippingAddress ?? "—",
    "",
    "Items:",
    linesText || "—",
  ].join("\n");

  const html = `<pre style="font-family:ui-sans-serif,system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(
    body
  )}</pre>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New shop order — ${formatMoney(payload.amountTotal, payload.currency)}`,
        text: body,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend order email failed", res.status, detail);
      return { ok: false, error: "Email notification failed." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Resend order email", error);
    return { ok: false, error: "Email notification failed." };
  }
}
