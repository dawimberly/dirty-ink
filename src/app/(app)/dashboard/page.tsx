import Link from "next/link";
import { AlertCircle, CalendarClock, Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PriorityBadge, StatusBadge } from "@/components/shops/status-badge";
import { getDashboardData } from "@/lib/shops";
import { SHOP_STATUSES } from "@/lib/types/shop";

export default async function DashboardPage() {
  const { total, statusCounts, needsFollowUp, highPriority } =
    await getDashboardData();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} shop{total === 1 ? "" : "s"} tracked · guest spots & chairs
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/shops/new" />}>
          <Plus className="size-4" />
          Add shop
        </Button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {SHOP_STATUSES.map((status) => (
          <Card key={status} size="sm">
            <CardHeader className="pb-0">
              <CardDescription>{status}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">
                {statusCounts[status] ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarClock className="size-4 text-amber-400" />
              <CardTitle>Needs follow-up</CardTitle>
            </div>
            <CardDescription>
              Status is Follow-up, or follow-up date is today / overdue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {needsFollowUp.length === 0 ? (
              <p className="text-sm text-muted-foreground">You&apos;re caught up.</p>
            ) : (
              needsFollowUp.slice(0, 8).map((shop) => (
                <Link
                  key={shop.id}
                  href={`/shops/${shop.id}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-3 py-2 transition-colors hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{shop.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {shop.area ?? "No area"} · due {shop.follow_up_date ?? "—"}
                    </p>
                  </div>
                  <StatusBadge status={shop.status} />
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="size-4 text-rose-400" />
              <CardTitle>High priority</CardTitle>
            </div>
            <CardDescription>Open opportunities worth chasing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {highPriority.length === 0 ? (
              <p className="text-sm text-muted-foreground">No high-priority shops.</p>
            ) : (
              highPriority.slice(0, 8).map((shop) => (
                <Link
                  key={shop.id}
                  href={`/shops/${shop.id}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-3 py-2 transition-colors hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{shop.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {[shop.area, shop.type].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <PriorityBadge priority={shop.priority} />
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-center">
        <Button nativeButton={false} variant="outline" render={<Link href="/shops" />}>
          <Store className="size-4" />
          View all shops
        </Button>
      </div>
    </div>
  );
}
