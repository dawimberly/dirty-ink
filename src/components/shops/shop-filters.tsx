"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LA_AREAS, SHOP_PRIORITIES, SHOP_STATUSES } from "@/lib/types/shop";

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30";

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const current = searchParams.get("search") ?? "";
    if (search === current) return;
    const t = setTimeout(() => update("search", search), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function clear() {
    setSearch("");
    router.push(pathname);
  }

  const hasFilters =
    searchParams.has("status") ||
    searchParams.has("area") ||
    searchParams.has("priority") ||
    searchParams.has("search");

  return (
    <div className="grid gap-3 rounded-xl border border-border/60 bg-card/40 p-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="space-y-1.5 lg:col-span-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Name, contact, Instagram…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className={selectClass}
          value={searchParams.get("status") ?? ""}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="">All</option>
          {SHOP_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="area">Area</Label>
        <select
          id="area"
          className={selectClass}
          value={searchParams.get("area") ?? ""}
          onChange={(e) => update("area", e.target.value)}
        >
          <option value="">All</option>
          {LA_AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="priority">Priority</Label>
        <div className="flex gap-2">
          <select
            id="priority"
            className={selectClass}
            value={searchParams.get("priority") ?? ""}
            onChange={(e) => update("priority", e.target.value)}
          >
            <option value="">All</option>
            {SHOP_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {hasFilters && (
            <Button type="button" variant="ghost" size="sm" onClick={clear}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
