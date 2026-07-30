import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopForm } from "@/components/shops/shop-form";
import { Button } from "@/components/ui/button";
import { getShopById } from "@/lib/shops";

type Params = Promise<{ id: string }>;

export default async function EditShopPage({ params }: { params: Params }) {
  const { id } = await params;
  const shop = await getShopById(id);
  if (!shop) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Edit shop</h1>
          <p className="text-sm text-muted-foreground">{shop.name}</p>
        </div>
        <Button nativeButton={false} variant="ghost" size="sm" render={<Link href={`/shops/${shop.id}`} />}>
          Back
        </Button>
      </div>
      <ShopForm shop={shop} />
    </div>
  );
}
