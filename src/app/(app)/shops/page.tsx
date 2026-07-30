import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopFilters } from "@/components/shops/shop-filters";
import { ShopsList } from "@/components/shops/shops-list";
import { getShops } from "@/lib/shops";

type SearchParams = Promise<{
  status?: string;
  area?: string;
  priority?: string;
  search?: string;
}>;

export default async function ShopsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const shops = await getShops({
    status: params.status,
    area: params.area,
    priority: params.priority,
    search: params.search,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Shops
          </h1>
          <p className="text-sm text-muted-foreground">
            {shops.length} result{shops.length === 1 ? "" : "s"}
          </p>
        </div>
        <Button render={<Link href="/shops/new" />}>
          <Plus className="size-4" />
          Add shop
        </Button>
      </div>

      <Suspense fallback={<div className="h-28 animate-pulse rounded-xl bg-muted/40" />}>
        <ShopFilters />
      </Suspense>

      <ShopsList shops={shops} />
    </div>
  );
}
