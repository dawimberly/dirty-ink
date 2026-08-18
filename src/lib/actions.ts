"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ShopInsert, ShopUpdate } from "@/lib/types/shop";
import { coordsForShop, geocodeQuery, haversineMiles } from "@/lib/geo";
import { BOOKING_SHOP_LOCATIONS } from "@/lib/booking-shops";
import { sendBookingNotificationEmail } from "@/lib/booking-notify";
import { uploadBookingReferenceImages } from "@/lib/booking-images";
import { rankNearbyShops } from "@/lib/nearby";
import type { NearbyShop } from "@/lib/types/booking";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createShop(data: ShopInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("shops").insert(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/shops");
  revalidatePath("/dashboard");
  redirect("/shops");
}

export async function updateShop(id: string, data: ShopUpdate) {
  const supabase = await createClient();
  const { error } = await supabase.from("shops").update(data).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/shops");
  revalidatePath(`/shops/${id}`);
  revalidatePath("/dashboard");
  redirect(`/shops/${id}`);
}

export async function updateShopStatus(id: string, status: string) {
  const supabase = await createClient();
  const patch: ShopUpdate = { status };

  if (status === "Contacted" || status === "Follow-up") {
    const today = new Date().toISOString().slice(0, 10);
    patch.date_contacted = today;
  }

  const { error } = await supabase.from("shops").update(patch).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/shops");
  revalidatePath(`/shops/${id}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteShop(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("shops").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/shops");
  revalidatePath("/dashboard");
  redirect("/shops");
}

function emptyToNull(value: string) {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function uuidOrNull(value: string) {
  const trimmed = value.trim();
  return UUID_RE.test(trimmed) ? trimmed : null;
}

type ShopLocationRow = {
  id: string;
  name: string;
  area: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
};

const OPEN_CHAIR_TYPES = ["Open Chair", "Both", "Chair Rental"];

function fallbackShopRows(): ShopLocationRow[] {
  return BOOKING_SHOP_LOCATIONS.map((shop) => ({
    id: shop.id,
    name: shop.name,
    area: shop.area,
    address: shop.address,
    lat: shop.lat,
    lng: shop.lng,
  }));
}

async function loadShopLocations(): Promise<ShopLocationRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return fallbackShopRows();
  }

  try {
    const supabase = await createClient();

    const rpc = await supabase.rpc("list_shop_locations");
    if (!rpc.error && rpc.data && rpc.data.length > 0) {
      return rpc.data as ShopLocationRow[];
    }

    const flagged = await supabase
      .from("shops")
      .select("id, name, area, address, lat, lng")
      .eq("accepts_open_chair_bookings", true)
      .not("lat", "is", null)
      .not("lng", "is", null);
    if (!flagged.error && flagged.data && flagged.data.length > 0) {
      return flagged.data as ShopLocationRow[];
    }

    const byType = await supabase
      .from("shops")
      .select("id, name, area, address, lat, lng")
      .in("type", OPEN_CHAIR_TYPES)
      .eq("accepts_open_chair_bookings", true)
      .not("lat", "is", null)
      .not("lng", "is", null);
    if (!byType.error && byType.data && byType.data.length > 0) {
      return byType.data as ShopLocationRow[];
    }
  } catch (error) {
    console.error("loadShopLocations", error);
  }

  return fallbackShopRows();
}

export async function findNearbyShops(query: string) {
  const q = String(query ?? "").trim();
  if (!q) {
    return { error: "Enter an address, city, or ZIP code." };
  }

  try {
    const origin = await geocodeQuery(q);
    if (origin) {
      const locations = await loadShopLocations();
      const shops: NearbyShop[] = locations
        .map((shop) => {
          const point = coordsForShop(shop);
          if (!point) return null;
          return {
            id: shop.id,
            name: shop.name,
            address: shop.address,
            area: shop.area,
            distance_miles: haversineMiles(origin, point),
          };
        })
        .filter((shop): shop is NearbyShop => shop !== null)
        .sort((a, b) => a.distance_miles - b.distance_miles)
        .slice(0, 8);

      if (shops.length > 0) {
        return { shops };
      }
    }
  } catch (error) {
    console.error("findNearbyShops", error);
  }

  return rankNearbyShops(q);
}

export async function submitBookingRequest(formData: FormData) {
  const client_name = String(formData.get("client_name") ?? "").trim();
  const client_address = String(formData.get("client_address") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const email = emptyToNull(String(formData.get("email") ?? ""));
  const phone = emptyToNull(String(formData.get("phone") ?? ""));
  const instagram = emptyToNull(String(formData.get("instagram") ?? ""));
  const appointment_type = emptyToNull(
    String(formData.get("appointment_type") ?? "")
  );

  if (!client_name || !client_address || !description) {
    return { error: "Name, address, and tattoo description are required." };
  }

  if (!email && !phone && !instagram) {
    return { error: "Add at least one contact: email, phone, or Instagram." };
  }

  const files = formData
    .getAll("reference_images")
    .filter((value): value is File => value instanceof File && value.size > 0);

  const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const presetUrls = formData
    .getAll("reference_image_urls")
    .map((value) => String(value).trim())
    .filter(
      (value) =>
        value.startsWith("https://") &&
        (!supabaseHost || value.startsWith(`${supabaseHost.replace(/\/$/, "")}/storage/`))
    );

  const uploaded =
    presetUrls.length > 0
      ? { urls: presetUrls }
      : await uploadBookingReferenceImages(files);

  const row = {
    client_name,
    client_address,
    description,
    email,
    phone,
    instagram,
    appointment_type,
    preferred_shop_id: uuidOrNull(String(formData.get("preferred_shop_id") ?? "")),
    preferred_shop_name: emptyToNull(
      String(formData.get("preferred_shop_name") ?? "")
    ),
    preferred_dates: emptyToNull(String(formData.get("preferred_dates") ?? "")),
    placement: emptyToNull(String(formData.get("placement") ?? "")),
    size_estimate: emptyToNull(String(formData.get("size_estimate") ?? "")),
    style_notes: emptyToNull(String(formData.get("style_notes") ?? "")),
    budget: emptyToNull(String(formData.get("budget") ?? "")),
    reference_image_urls: uploaded.urls.length ? uploaded.urls : null,
    status: "New",
  };

  let savedToDb = false;
  let dbError: string | null = null;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("appointment_requests").insert(row);

      if (error) {
        if (
          /column .* does not exist/i.test(error.message) ||
          /invalid input syntax for type uuid/i.test(error.message)
        ) {
          const { error: retryError } = await supabase
            .from("appointment_requests")
            .insert({
              client_name,
              description,
              email,
              phone,
              instagram,
              preferred_dates: row.preferred_dates,
              placement: row.placement,
              size_estimate: row.size_estimate,
              style_notes: row.style_notes,
              budget: row.budget,
              status: "New",
            });
          if (!retryError) {
            savedToDb = true;
          } else {
            dbError = retryError.message;
          }
        } else {
          dbError = error.message;
        }
      } else {
        savedToDb = true;
      }
    } catch (error) {
      console.error("submitBookingRequest db", error);
      dbError =
        error instanceof Error
          ? error.message
          : "Database save failed.";
    }
  }

  const emailed = await sendBookingNotificationEmail({
    client_name: row.client_name,
    client_address: row.client_address,
    description: row.description,
    email: row.email,
    phone: row.phone,
    instagram: row.instagram,
    appointment_type: row.appointment_type,
    preferred_shop_name: row.preferred_shop_name,
    preferred_dates: row.preferred_dates,
    placement: row.placement,
    size_estimate: row.size_estimate,
    style_notes: row.style_notes,
    budget: row.budget,
    image_urls: uploaded.urls,
  });

  if (savedToDb) {
    revalidatePath("/bookings");
    const warnings = [uploaded.warning, emailed.ok ? null : emailed.error].filter(
      Boolean
    );
    return {
      success: true,
      warning: warnings.length ? warnings.join(" ") : undefined,
    };
  }

  if (emailed.ok) {
    return {
      success: true,
      warning:
        uploaded.warning ??
        "Request emailed to Greg. Add Supabase env vars on Vercel to save bookings in the dashboard too.",
    };
  }

  return {
    error:
      dbError ??
      emailed.error ??
      "Could not save your request. Add Supabase or Resend env vars in Vercel → Settings → Environment Variables.",
  };
}

export async function updateBookingStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("appointment_requests")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/bookings");
  return { success: true };
}
