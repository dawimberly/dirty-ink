import { createClient } from "@/lib/supabase/server";
import type { AppointmentRequest } from "@/lib/types/booking";
import { BookingStatusButtons } from "@/components/booking/booking-status-buttons";
import { Badge } from "@/components/ui/badge";
import { SHOP_URL } from "@/lib/site";

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointment_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings = (data ?? []) as AppointmentRequest[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Bookings
          </h1>
          <p className="text-sm text-muted-foreground">
            Requests from your public booking link ({bookings.length})
            {error ? ` — ${error.message}` : ""}
          </p>
        </div>
        <a
          href={SHOP_URL}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Open merch store
        </a>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/80 px-6 py-12 text-center text-sm text-muted-foreground">
          No requests yet. Share{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">/book</code>{" "}
          on Instagram.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <article
              key={b.id}
              className="rounded-xl border border-border/60 bg-card/50 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{b.client_name}</h2>
                    <Badge variant="outline">{b.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(b.created_at).toLocaleString()}
                    {[b.instagram, b.email, b.phone].filter(Boolean).length
                      ? ` · ${[b.instagram, b.email, b.phone].filter(Boolean).join(" · ")}`
                      : ""}
                  </p>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{b.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {[
                  b.appointment_type && `Type: ${b.appointment_type}`,
                  b.client_address && `From: ${b.client_address}`,
                  b.preferred_shop_name && `Shop: ${b.preferred_shop_name}`,
                  b.placement && `Placement: ${b.placement}`,
                  b.size_estimate && `Size: ${b.size_estimate}`,
                  b.preferred_dates && `Dates: ${b.preferred_dates}`,
                  b.budget && `Budget: ${b.budget}`,
                  b.style_notes && `Style: ${b.style_notes}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {b.reference_image_urls && b.reference_image_urls.length > 0 ? (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {b.reference_image_urls.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="block overflow-hidden rounded-lg border border-border/60"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="aspect-square w-full object-cover" />
                    </a>
                  ))}
                </div>
              ) : null}
              <div className="mt-3 border-t border-border/50 pt-3">
                <BookingStatusButtons id={b.id} currentStatus={b.status} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
