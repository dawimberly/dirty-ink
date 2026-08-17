import Link from "next/link";
import { PriorityBadge, StatusBadge } from "@/components/shops/status-badge";
import { StatusButtons } from "@/components/shops/status-buttons";
import type { Shop } from "@/lib/types/shop";

function formatDate(value: string | null) {
  if (!value) return "—";
  return value;
}

export function ShopsList({ shops }: { shops: Shop[] }) {
  if (shops.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 px-6 py-12 text-center">
        <p className="text-muted-foreground">No shops match these filters.</p>
        <Link
          href="/shops/new"
          className="mt-2 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Add your first shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {shops.map((shop) => (
        <article
          key={shop.id}
          className="rounded-xl border border-border/60 bg-card/50 p-4 transition-colors hover:bg-card"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/shops/${shop.id}`}
                  className="truncate text-base font-semibold hover:underline"
                >
                  {shop.name}
                </Link>
                <StatusBadge status={shop.status} />
                <PriorityBadge priority={shop.priority} />
                {shop.accepts_open_chair_bookings ? (
                  <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    Open chair bookings
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {[shop.area, shop.type, shop.instagram].filter(Boolean).join(" · ") ||
                  "No details yet"}
              </p>
              <p className="text-xs text-muted-foreground">
                Follow-up: {formatDate(shop.follow_up_date)}
                {shop.portfolio_sent ? " · Portfolio sent" : ""}
              </p>
            </div>
            <Link
              href={`/shops/${shop.id}/edit`}
              className="shrink-0 text-sm text-muted-foreground hover:text-foreground"
            >
              Edit
            </Link>
          </div>
          <div className="mt-3 border-t border-border/50 pt-3">
            <StatusButtons shopId={shop.id} currentStatus={shop.status} />
          </div>
        </article>
      ))}
    </div>
  );
}
