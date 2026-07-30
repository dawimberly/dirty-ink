"use client";

import { useState, useTransition } from "react";
import { submitBookingRequest } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BookingForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitBookingRequest(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setDone(true);
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center sm:p-8">
        <p className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide text-[#f2ebe0]">
          Request received
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#f2ebe0]/70">
          Thanks — Greg will review your idea and reach out on the contact you left.
          Usually within a few days.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 border-[#f2ebe0]/20 bg-transparent text-[#f2ebe0] hover:bg-[#f2ebe0]/10"
          onClick={() => setDone(false)}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-sm sm:p-7">
      {error && (
        <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </p>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="client_name" className="text-[#f2ebe0]/80">
          Your name *
        </Label>
        <Input
          id="client_name"
          name="client_name"
          required
          className="border-white/15 bg-black/40 text-[#f2ebe0]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="instagram" className="text-[#f2ebe0]/80">
            Instagram
          </Label>
          <Input
            id="instagram"
            name="instagram"
            placeholder="@you"
            className="border-white/15 bg-black/40 text-[#f2ebe0]"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[#f2ebe0]/80">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            className="border-white/15 bg-black/40 text-[#f2ebe0]"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-[#f2ebe0]/80">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            className="border-white/15 bg-black/40 text-[#f2ebe0]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-[#f2ebe0]/80">
          What do you want tattooed? *
        </Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={4}
          placeholder="Idea, references, vibes…"
          className="border-white/15 bg-black/40 text-[#f2ebe0]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="placement" className="text-[#f2ebe0]/80">
            Placement
          </Label>
          <Input
            id="placement"
            name="placement"
            placeholder="Forearm, ribs, calf…"
            className="border-white/15 bg-black/40 text-[#f2ebe0]"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="size_estimate" className="text-[#f2ebe0]/80">
            Size
          </Label>
          <Input
            id="size_estimate"
            name="size_estimate"
            placeholder="Approx inches / palm-size…"
            className="border-white/15 bg-black/40 text-[#f2ebe0]"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="preferred_dates" className="text-[#f2ebe0]/80">
            Preferred dates / flexibility
          </Label>
          <Input
            id="preferred_dates"
            name="preferred_dates"
            placeholder="Weekends in August, flexible…"
            className="border-white/15 bg-black/40 text-[#f2ebe0]"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="budget" className="text-[#f2ebe0]/80">
            Budget (optional)
          </Label>
          <Input
            id="budget"
            name="budget"
            placeholder="$300–500, open…"
            className="border-white/15 bg-black/40 text-[#f2ebe0]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="style_notes" className="text-[#f2ebe0]/80">
          Style notes
        </Label>
        <Input
          id="style_notes"
          name="style_notes"
          placeholder="Blackwork, fine line, traditional…"
          className="border-white/15 bg-black/40 text-[#f2ebe0]"
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full bg-[#c45c26] text-[#140e0a] hover:bg-[#d46930]"
      >
        {pending ? "Sending…" : "Request appointment"}
      </Button>

      <p className="text-center text-xs text-[#f2ebe0]/45">
        This is a request — Greg will confirm time & deposit separately.
      </p>
    </form>
  );
}
