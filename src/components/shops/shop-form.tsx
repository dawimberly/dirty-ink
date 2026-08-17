"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createShop, updateShop } from "@/lib/actions";
import {
  LA_AREAS,
  SHOP_PRIORITIES,
  SHOP_STATUSES,
  SHOP_TYPES,
  type Shop,
} from "@/lib/types/shop";
import { toast } from "sonner";

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30";

function emptyToNull(value: string) {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function emptyToNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function ShopForm({ shop }: { shop?: Shop }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(shop);

  function onSubmit(formData: FormData) {
    setError(null);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      area: emptyToNull(String(formData.get("area") ?? "")),
      address: emptyToNull(String(formData.get("address") ?? "")),
      lat: emptyToNumber(String(formData.get("lat") ?? "")),
      lng: emptyToNumber(String(formData.get("lng") ?? "")),
      contact_person: emptyToNull(String(formData.get("contact_person") ?? "")),
      instagram: emptyToNull(String(formData.get("instagram") ?? "")),
      website: emptyToNull(String(formData.get("website") ?? "")),
      email_phone: emptyToNull(String(formData.get("email_phone") ?? "")),
      type: emptyToNull(String(formData.get("type") ?? "")) ?? "Unknown",
      date_contacted: emptyToNull(String(formData.get("date_contacted") ?? "")),
      status: String(formData.get("status") ?? "Not Contacted"),
      follow_up_date: emptyToNull(String(formData.get("follow_up_date") ?? "")),
      portfolio_sent: formData.get("portfolio_sent") === "on",
      accepts_open_chair_bookings:
        formData.get("accepts_open_chair_bookings") === "on",
      rate_terms: emptyToNull(String(formData.get("rate_terms") ?? "")),
      notes: emptyToNull(String(formData.get("notes") ?? "")),
      priority: String(formData.get("priority") ?? "Medium"),
    };

    if (!payload.name) {
      setError("Shop name is required.");
      return;
    }

    startTransition(async () => {
      const result = isEdit
        ? await updateShop(shop!.id, payload)
        : await createShop(payload);

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-6">
      {error && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="name">Shop name *</Label>
          <Input id="name" name="name" required defaultValue={shop?.name ?? ""} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="area">Area</Label>
          <select
            id="area"
            name="area"
            className={selectClass}
            defaultValue={shop?.area ?? ""}
          >
            <option value="">Select area</option>
            {LA_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            name="type"
            className={selectClass}
            defaultValue={shop?.type ?? "Unknown"}
          >
            {SHOP_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Use Open Chair / Both for shops that will take a chair booking.
          </p>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="Street, city"
            defaultValue={shop?.address ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="lat">Latitude</Label>
          <Input
            id="lat"
            name="lat"
            inputMode="decimal"
            placeholder="33.862"
            defaultValue={shop?.lat ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="lng">Longitude</Label>
          <Input
            id="lng"
            name="lng"
            inputMode="decimal"
            placeholder="-118.399"
            defaultValue={shop?.lng ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact_person">Contact person</Label>
          <Input
            id="contact_person"
            name="contact_person"
            defaultValue={shop?.contact_person ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email_phone">Email / phone</Label>
          <Input
            id="email_phone"
            name="email_phone"
            defaultValue={shop?.email_phone ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            name="instagram"
            placeholder="@shop"
            defaultValue={shop?.instagram ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            placeholder="https://"
            defaultValue={shop?.website ?? ""}
          />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            className={selectClass}
            defaultValue={shop?.status ?? "Not Contacted"}
          >
            {SHOP_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
            name="priority"
            className={selectClass}
            defaultValue={shop?.priority ?? "Medium"}
          >
            {SHOP_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="date_contacted">Date contacted</Label>
          <Input
            id="date_contacted"
            name="date_contacted"
            type="date"
            defaultValue={shop?.date_contacted ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="follow_up_date">Follow-up date</Label>
          <Input
            id="follow_up_date"
            name="follow_up_date"
            type="date"
            defaultValue={shop?.follow_up_date ?? ""}
          />
        </div>
      </section>

      <section className="grid gap-4">
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            name="accepts_open_chair_bookings"
            defaultChecked={
              shop?.accepts_open_chair_bookings ??
              (shop?.type === "Open Chair" || shop?.type === "Both")
            }
            className="mt-0.5 size-4 rounded border-input"
          />
          <span>
            Allows open chair bookings
            <span className="mt-0.5 block text-xs text-muted-foreground">
              Show this shop on the public Find closest list.
            </span>
          </span>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="portfolio_sent"
            defaultChecked={shop?.portfolio_sent ?? false}
            className="size-4 rounded border-input"
          />
          Portfolio sent
        </label>

        <div className="space-y-1.5">
          <Label htmlFor="rate_terms">Rate / terms</Label>
          <Input
            id="rate_terms"
            name="rate_terms"
            placeholder="e.g. 60/40 guest split, $250/day chair"
            defaultValue={shop?.rate_terms ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Conversation history, vibe, requirements…"
            defaultValue={shop?.notes ?? ""}
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save changes" : "Add shop"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
