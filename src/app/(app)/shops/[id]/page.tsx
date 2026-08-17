import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PriorityBadge, StatusBadge } from "@/components/shops/status-badge";
import { StatusButtons } from "@/components/shops/status-buttons";
import { getShopById } from "@/lib/shops";
import { deleteShop } from "@/lib/actions";

type Params = Promise<{ id: string }>;

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value || "—"}</dd>
    </div>
  );
}

export default async function ShopDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const shop = await getShopById(id);
  if (!shop) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {shop.name}
            </h1>
            <StatusBadge status={shop.status} />
            <PriorityBadge priority={shop.priority} />
          </div>
          <p className="text-sm text-muted-foreground">
            {[shop.area, shop.type].filter(Boolean).join(" · ") || "No area / type"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button nativeButton={false} variant="outline" render={<Link href={`/shops/${shop.id}/edit`} />}>
            <Pencil className="size-4" />
            Edit
          </Button>
          <Button nativeButton={false} variant="ghost" size="sm" render={<Link href="/shops" />}>
            Back
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick status</CardTitle>
          <CardDescription>One-click updates</CardDescription>
        </CardHeader>
        <CardContent>
          <StatusButtons shopId={shop.id} currentStatus={shop.status} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail label="Contact" value={shop.contact_person} />
            <Detail label="Email / phone" value={shop.email_phone} />
            <Detail
              label="Instagram"
              value={
                shop.instagram ? (
                  <a
                    href={`https://instagram.com/${shop.instagram.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {shop.instagram}
                    <ExternalLink className="size-3" />
                  </a>
                ) : null
              }
            />
            <Detail
              label="Website"
              value={
                shop.website ? (
                  <a
                    href={shop.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 break-all hover:underline"
                  >
                    {shop.website}
                    <ExternalLink className="size-3" />
                  </a>
                ) : null
              }
            />
            <Detail label="Address" value={shop.address} />
            <Detail
              label="Open chair bookings"
              value={shop.accepts_open_chair_bookings ? "Listed on /book" : "No"}
            />
            <Detail label="Date contacted" value={shop.date_contacted} />
            <Detail label="Follow-up date" value={shop.follow_up_date} />
            <Detail
              label="Portfolio sent"
              value={shop.portfolio_sent ? "Yes" : "No"}
            />
            <Detail label="Rate / terms" value={shop.rate_terms} />
            <div className="sm:col-span-2">
              <Detail
                label="Notes"
                value={
                  shop.notes ? (
                    <span className="whitespace-pre-wrap">{shop.notes}</span>
                  ) : null
                }
              />
            </div>
          </dl>
        </CardContent>
      </Card>

      <form
        action={async () => {
          "use server";
          await deleteShop(shop.id);
        }}
      >
        <Button type="submit" variant="destructive" size="sm">
          Delete shop
        </Button>
      </form>
    </div>
  );
}
