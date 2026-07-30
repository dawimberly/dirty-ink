"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ShopInsert, ShopUpdate } from "@/lib/types/shop";

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

export async function submitBookingRequest(formData: FormData) {
  const supabase = await createClient();

  const client_name = String(formData.get("client_name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const email = emptyToNull(String(formData.get("email") ?? ""));
  const phone = emptyToNull(String(formData.get("phone") ?? ""));
  const instagram = emptyToNull(String(formData.get("instagram") ?? ""));

  if (!client_name || !description) {
    return { error: "Name and tattoo description are required." };
  }

  if (!email && !phone && !instagram) {
    return { error: "Add at least one contact: email, phone, or Instagram." };
  }

  const { error } = await supabase.from("appointment_requests").insert({
    client_name,
    description,
    email,
    phone,
    instagram,
    preferred_dates: emptyToNull(String(formData.get("preferred_dates") ?? "")),
    placement: emptyToNull(String(formData.get("placement") ?? "")),
    size_estimate: emptyToNull(String(formData.get("size_estimate") ?? "")),
    style_notes: emptyToNull(String(formData.get("style_notes") ?? "")),
    budget: emptyToNull(String(formData.get("budget") ?? "")),
    status: "New",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/bookings");
  return { success: true };
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
