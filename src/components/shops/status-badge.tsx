import { Badge } from "@/components/ui/badge";
import { PRIORITY_COLORS, STATUS_COLORS } from "@/lib/constants";
import type { ShopPriority, ShopStatus } from "@/lib/types/shop";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status as ShopStatus] ?? STATUS_COLORS["Not Contacted"];
  return (
    <Badge variant="outline" className={cn("border", colors)}>
      {status}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const colors = PRIORITY_COLORS[priority as ShopPriority] ?? PRIORITY_COLORS.Medium;
  return (
    <Badge variant="outline" className={cn("border", colors)}>
      {priority}
    </Badge>
  );
}
