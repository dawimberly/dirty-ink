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
