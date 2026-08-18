"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { submitBookingRequest } from "@/lib/actions";
import { rankNearbyShops } from "@/lib/nearby";
import { APPOINTMENT_TYPES } from "@/lib/types/booking";
import type { NearbyShop } from "@/lib/types/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fieldClass = "border-white/15 bg-black/40 text-[#f2ebe0]";
const labelClass = "text-[#f2ebe0]/80";
const ghostBtnClass =
  "border-[#f2ebe0]/20 bg-transparent text-[#f2ebe0] hover:bg-[#f2ebe0]/10";

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);

function isImageFile(file: File) {
  if (file.type && IMAGE_TYPES.has(file.type)) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTS.has(ext) && (!file.type || file.type === "application/octet-stream");
}

function formatMiles(miles: number) {
  return miles < 10 ? miles.toFixed(1) : String(Math.round(miles));
}

export function BookingForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [address, setAddress] = useState("");
  const [shops, setShops] = useState<NearbyShop[]>([]);
  const [selectedShop, setSelectedShop] = useState<NearbyShop | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragCount = useRef(0);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  function addImages(list: FileList | File[] | null) {
    if (!list) return;
    const incoming = Array.from(list);
    if (incoming.length === 0) return;
    const remaining = 4 - images.length;
    if (remaining <= 0) {
      setImageError("You can add up to 4 images.");
      return;
    }

    const accepted: File[] = [];
    for (const file of incoming.slice(0, remaining)) {
      if (!isImageFile(file)) {
        setImageError("Images must be JPEG, PNG, WebP, or HEIC.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Each image must be under 5MB.");
        return;
      }
      accepted.push(file);
    }
    setImageError(null);
    setImages((current) => [...current, ...accepted].slice(0, 4));
  }

  async function onFindClosest() {
    setSearchError(null);
    setSearching(true);
    try {
      const result = await rankNearbyShops(address);
      if (result.error && !result.shops?.length) {
        setShops([]);
        setSelectedShop(null);
        setSearchError(result.error);
        return;
      }
      const found = result.shops ?? [];
      setShops(found);
      setSelectedShop(found[0] ?? null);
      if (found.length === 0) {
        setSearchError("No open-chair shops are on the list yet.");
      }
    } catch {
      setSearchError("Could not search shops right now. Try again.");
    } finally {
      setSearching(false);
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setWarning(null);
    const formData = new FormData(event.currentTarget);
    formData.delete("reference_images");
    for (const file of images) {
      formData.append("reference_images", file);
    }

    startTransition(async () => {
      try {
        const result = await submitBookingRequest(formData);
        if (result?.error) {
          setError(result.error);
          return;
        }
        if (result?.warning) setWarning(result.warning);
        setImages([]);
        setDone(true);
      } catch {
        setError("Something went wrong sending your request. Please try again.");
      }
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
        {warning && (
          <p className="mt-3 text-xs text-amber-200/80">{warning}</p>
        )}
        <Button
          type="button"
          variant="outline"
          className={`mt-6 ${ghostBtnClass}`}
          onClick={() => {
            setDone(false);
            setWarning(null);
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-sm sm:p-7"
    >
      <input type="hidden" name="preferred_shop_id" value={selectedShop?.id ?? ""} />
      <input type="hidden" name="preferred_shop_name" value={selectedShop?.name ?? ""} />

      {error && (
        <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
          {error}
        </p>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="client_name" className={labelClass}>
          Your name *
        </Label>
        <Input id="client_name" name="client_name" required className={fieldClass} />
      </div>

      <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <Label htmlFor="client_address" className={labelClass}>
          Your address, city, or ZIP *
        </Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="client_address"
            name="client_address"
            required
            value={address}
            placeholder="90266 or Hermosa Beach, CA"
            className={fieldClass}
            onChange={(event) => {
              setAddress(event.target.value);
              setShops([]);
              setSelectedShop(null);
              setSearchError(null);
            }}
          />
          <Button
            type="button"
            variant="outline"
            disabled={searching || !address.trim()}
            className={ghostBtnClass}
            onClick={onFindClosest}
          >
            {searching ? "Searching…" : "Find closest"}
          </Button>
        </div>
        {searchError && (
          <p className="text-xs text-amber-200/80">{searchError}</p>
        )}
        {shops.length > 0 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-[#f2ebe0]/55">Closest locations — choose one:</p>
            {shops.map((shop) => {
              const selected = selectedShop?.id === shop.id;
              return (
                <button
                  key={shop.id}
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm ${
                    selected
                      ? "border-[#c45c26] bg-[#c45c26]/15 text-[#f2ebe0]"
                      : "border-white/10 bg-black/20 text-[#f2ebe0]/70"
                  }`}
                  onClick={() => setSelectedShop(shop)}
                >
                  <span>
                    <span className="block font-medium">{shop.name}</span>
                    <span className="block text-xs opacity-60">
                      {shop.address ?? shop.area ?? "LA area"}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-medium">
                    {formatMiles(shop.distance_miles)} mi
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="appointment_type" className={labelClass}>
          Appointment type *
        </Label>
        <select
          id="appointment_type"
          name="appointment_type"
          required
          defaultValue=""
          className="h-10 w-full rounded-lg border border-white/15 bg-black/40 px-3 text-sm text-[#f2ebe0]"
        >
          <option value="" disabled>
            Select type
          </option>
          {APPOINTMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="instagram" className={labelClass}>
            Instagram
          </Label>
          <Input
            id="instagram"
            name="instagram"
            placeholder="@you"
            className={fieldClass}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className={labelClass}>
            Email
          </Label>
          <Input id="email" name="email" type="email" className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone" className={labelClass}>
            Phone
          </Label>
          <Input id="phone" name="phone" type="tel" className={fieldClass} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className={labelClass}>
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

      <div className="space-y-2">
        <p className={labelClass}>
          Tattoo idea images{" "}
          <span className="font-normal text-[#f2ebe0]/45">(optional, up to 4)</span>
        </p>
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            event.stopPropagation();
            dragCount.current += 1;
            if (images.length < 4) setDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = "copy";
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            event.stopPropagation();
            dragCount.current = Math.max(0, dragCount.current - 1);
            if (dragCount.current === 0) setDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            event.stopPropagation();
            dragCount.current = 0;
            setDragging(false);
            if (images.length < 4) addImages(event.dataTransfer.files);
          }}
          className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed px-4 py-5 text-center transition-colors ${
            dragging ? "border-[#c45c26] bg-[#c45c26]/15" : "border-white/20 bg-black/30"
          } ${images.length >= 4 ? "opacity-60" : ""}`}
        >
          <span className="pointer-events-none text-sm text-[#f2ebe0]/70">
            {images.length >= 4
              ? "Maximum images added"
              : dragging
                ? "Drop photos here"
                : "Drop photos here, or tap to browse"}
          </span>
          <span className="pointer-events-none text-xs text-[#f2ebe0]/40">
            JPEG, PNG, WebP, or HEIC · under 5MB each
          </span>
          <input
            id="reference_images"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
            multiple
            disabled={images.length >= 4}
            className="absolute inset-0 z-10 cursor-pointer opacity-0 disabled:cursor-not-allowed"
            onChange={(event) => {
              addImages(event.target.files);
              event.target.value = "";
            }}
          />
        </div>
        {imageError && <p className="text-xs text-rose-200/90">{imageError}</p>}
        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {previews.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Idea ${index + 1}`}
                  className="size-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    const fallback = event.currentTarget.nextElementSibling;
                    if (fallback instanceof HTMLElement) fallback.hidden = false;
                  }}
                />
                <span
                  hidden
                  className="absolute inset-0 flex items-center justify-center p-1 text-center text-[10px] leading-tight text-[#f2ebe0]/55"
                >
                  {images[index]?.name ?? "Image added"}
                </span>
                <button
                  type="button"
                  aria-label={`Remove idea image ${index + 1}`}
                  className="absolute right-1 top-1 z-10 rounded-full bg-black/70 px-1.5 text-xs text-[#f2ebe0]"
                  onClick={() => {
                    setImageError(null);
                    setImages((current) => current.filter((_, i) => i !== index));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="placement" className={labelClass}>
            Placement
          </Label>
          <Input
            id="placement"
            name="placement"
            placeholder="Forearm, ribs, calf…"
            className={fieldClass}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="size_estimate" className={labelClass}>
            Size
          </Label>
          <Input
            id="size_estimate"
            name="size_estimate"
            placeholder="Approx inches / palm-size…"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="preferred_dates" className={labelClass}>
            Preferred dates / flexibility
          </Label>
          <Input
            id="preferred_dates"
            name="preferred_dates"
            placeholder="Weekends in August, flexible…"
            className={fieldClass}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="budget" className={labelClass}>
            Budget (optional)
          </Label>
          <Input
            id="budget"
            name="budget"
            placeholder="$300–500, open…"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="style_notes" className={labelClass}>
          Style notes
        </Label>
        <Input
          id="style_notes"
          name="style_notes"
          placeholder="Blackwork, fine line, traditional…"
          className={fieldClass}
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
