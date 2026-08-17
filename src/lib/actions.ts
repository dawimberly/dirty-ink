"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ShopInsert, ShopUpdate } from "@/lib/types/shop";
import {
  coordsForShop,
  FALLBACK_SHOP_LOCATIONS,
  geocodeQuery,
  haversineMiles,
} from "@/lib/geo";
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

type ShopLocationRow = {
  id: string;
  name: string;
  area: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
};

async function loadShopLocations(): Promise<ShopLocationRow[]> {
  const supabase = await createClient();

  const rpc = await supabase.rpc("list_shop_locations");
  if (!rpc.error && rpc.data && rpc.data.length > 0) {
    return rpc.data as ShopLocationRow[];
  }

  const select = await supabase
    .from("shops")
    .select("id, name, area, address, lat, lng");
  if (!select.error && select.data && select.data.length > 0) {
    return select.data as ShopLocationRow[];
  }

  return FALLBACK_SHOP_LOCATIONS;
}

export async function findNearbyShops(query: string) {
  const q = String(query ?? "").trim();
  if (!q) {
    return { error: "Enter an address, city, or ZIP code." };
  }

  try {
    const origin = await geocodeQuery(q);
    if (!origin) {
      return {
        error: "Couldn't find that location. Try a 5-digit ZIP or a city name.",
      };
    }

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

    return { shops };
  } catch (error) {
    console.error("findNearbyShops", error);
    return {
      error: "Could not search shops right now. Try a ZIP code, or try again.",
    };
  }
}

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function isImageFile(file: File) {
  if (file.type && IMAGE_TYPES.has(file.type)) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTS.has(ext) && (!file.type || file.type === "application/octet-stream");
}

async function uploadReferenceImages(
  files: File[]
): Promise<{ urls: string[]; warning?: string }> {
  if (files.length === 0) return { urls: [] };

  const supabase = await createClient();
  const urls: string[] = [];

  for (const file of files.slice(0, 4)) {
    if (!isImageFile(file)) {
      return { urls, warning: "Images must be JPEG, PNG, WebP, or HEIC." };
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return { urls, warning: "Each image must be under 5MB." };
    }

    const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 80);
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
    const { error } = await supabase.storage
      .from("booking-references")
      .upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      console.error("reference image upload", error.message);
      return {
        urls,
        warning: "Request saved, but photos could not be uploaded.",
      };
    }

    const { data } = supabase.storage.from("booking-references").getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return { urls };
}

export async function submitBookingRequest(formData: FormData) {
  const supabase = await createClient();

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

  const uploaded = await uploadReferenceImages(files);

  const row = {
    client_name,
    client_address,
    description,
    email,
    phone,
    instagram,
    appointment_type,
    preferred_shop_id: emptyToNull(String(formData.get("preferred_shop_id") ?? "")),
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

  const { error } = await supabase.from("appointment_requests").insert(row);

  if (error) {
    if (/column .* does not exist/i.test(error.message)) {
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
      if (retryError) return { error: retryError.message };
      revalidatePath("/bookings");
      return {
        success: true,
        warning:
          uploaded.warning ??
          "Request saved. Run the latest Supabase migration to store address, shop, and photos.",
      };
    }
    return { error: error.message };
  }

  revalidatePath("/bookings");
  return { success: true, warning: uploaded.warning };
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
