import { createClient } from "@/lib/supabase/server";
import type { Shop, ShopFilters } from "@/lib/types/shop";

export async function getShops(filters: ShopFilters = {}): Promise<Shop[]> {
  const supabase = await createClient();
  let query = supabase.from("shops").select("*").order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.area) {
    query = query.eq("area", filters.area);
  }
  if (filters.priority) {
    query = query.eq("priority", filters.priority);
  }
  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,contact_person.ilike.%${filters.search}%,instagram.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("getShops error:", error.message);
    return [];
  }
  return (data ?? []) as Shop[];
}

export async function getShopById(id: string): Promise<Shop | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("shops").select("*").eq("id", id).single();
  if (error) {
    console.error("getShopById error:", error.message);
    return null;
  }
  return data as Shop;
}

export async function getDashboardData() {
  const shops = await getShops();
  const today = new Date().toISOString().slice(0, 10);

  const statusCounts = shops.reduce<Record<string, number>>((acc, shop) => {
    acc[shop.status] = (acc[shop.status] ?? 0) + 1;
    return acc;
  }, {});

  const needsFollowUp = shops
    .filter((shop) => {
      if (shop.status === "Follow-up") return true;
      if (shop.follow_up_date && shop.follow_up_date <= today) {
        return !["Booked", "Rejected"].includes(shop.status);
      }
      return false;
    })
    .sort((a, b) => {
      const aDate = a.follow_up_date ?? "9999-99-99";
      const bDate = b.follow_up_date ?? "9999-99-99";
      return aDate.localeCompare(bDate);
    });

  return {
    total: shops.length,
    statusCounts,
    needsFollowUp,
    highPriority: shops.filter((s) => s.priority === "High" && !["Booked", "Rejected"].includes(s.status)),
  };
}
