"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/lib/actions";
import { BOOKING_STATUSES } from "@/lib/types/booking";
import { toast } from "sonner";

export function BookingStatusButtons({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setStatus(status: string) {
    if (status === currentStatus) return;
    startTransition(async () => {
      const result = await updateBookingStatus(id, status);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Status → ${status}`);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {BOOKING_STATUSES.map((status) => (
        <Button
          key={status}
          type="button"
          size="xs"
          variant={status === currentStatus ? "default" : "outline"}
          disabled={pending}
          onClick={() => setStatus(status)}
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
