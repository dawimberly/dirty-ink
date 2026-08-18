type BookingEmailPayload = {
  client_name: string;
  client_address: string;
  description: string;
  email: string | null;
  phone: string | null;
  instagram: string | null;
  appointment_type: string | null;
  preferred_shop_name: string | null;
  preferred_dates: string | null;
  placement: string | null;
  size_estimate: string | null;
  style_notes: string | null;
  budget: string | null;
  image_urls?: string[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function line(label: string, value: string | null | undefined) {
  if (!value?.trim()) return null;
  return `${label}: ${value.trim()}`;
}

export async function sendBookingNotificationEmail(
  payload: BookingEmailPayload
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.BOOKING_NOTIFY_EMAIL?.trim() || "paqinghouse@gmail.com";
  const from = process.env.BOOKING_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const body = [
    line("Name", payload.client_name),
    line("Address", payload.client_address),
    line("Appointment type", payload.appointment_type),
    line("Preferred shop", payload.preferred_shop_name),
    line("Email", payload.email),
    line("Phone", payload.phone),
    line("Instagram", payload.instagram),
    line("Preferred dates", payload.preferred_dates),
    line("Placement", payload.placement),
    line("Size", payload.size_estimate),
    line("Budget", payload.budget),
    "",
    "Description:",
    payload.description,
    payload.style_notes ? `\nStyle notes:\n${payload.style_notes}` : null,
    payload.image_urls?.length
      ? `\nPhotos:\n${payload.image_urls.join("\n")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const photosHtml = (payload.image_urls ?? [])
    .map((url) => {
      const safe = escapeHtml(url);
      return `<p><a href="${safe}">${safe}</a></p><p><img src="${safe}" alt="Tattoo idea" style="max-width:480px;height:auto;border-radius:8px" /></p>`;
    })
    .join("");

  const html = `<pre style="font-family:ui-sans-serif,system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(
    body
  )}</pre>${photosHtml}`;

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
        subject: `New booking request — ${payload.client_name}`,
        text: body,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend booking email failed", res.status, detail);
      return { ok: false, error: "Email notification failed." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Resend booking email", error);
    return { ok: false, error: "Email notification failed." };
  }
}
