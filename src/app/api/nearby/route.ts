import { NextResponse } from "next/server";
import { rankNearbyShops } from "@/lib/nearby";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const result = await rankNearbyShops(query);
  const status = result.error ? 400 : 200;
  return NextResponse.json(result, { status });
}
