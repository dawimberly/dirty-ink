"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Store, MessageSquareText, CalendarDays, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/shops", label: "Shops", icon: Store },
  { href: "/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/templates", label: "Templates", icon: MessageSquareText },
];

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-1 md:flex-row md:items-center", className)}>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold tracking-tight text-primary-foreground">
              CH
            </span>
            <span className="font-semibold tracking-tight">ChairHunt</span>
          </Link>
          <NavLinks className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-2">
          <form action={signOut} className="hidden md:block">
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="size-4" />
              Sign out
            </Button>
          </form>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 px-4 py-3 md:hidden">
          <NavLinks onNavigate={() => setOpen(false)} />
          <form action={signOut} className="mt-3">
            <Button type="submit" variant="outline" className="w-full">
              <LogOut className="size-4" />
              Sign out
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
