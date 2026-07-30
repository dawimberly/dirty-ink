import Link from "next/link";
import { ShopForm } from "@/components/shops/shop-form";
import { Button } from "@/components/ui/button";

export default function NewShopPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Add shop</h1>
          <p className="text-sm text-muted-foreground">
            Log a new LA shop for guest spots or chair rentals.
          </p>
        </div>
        <Button variant="ghost" size="sm" render={<Link href="/shops" />}>
          Back
        </Button>
      </div>
      <ShopForm />
    </div>
  );
}
