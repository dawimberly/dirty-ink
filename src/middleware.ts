import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicSite =
    pathname === "/" ||
    pathname === "/book" ||
    pathname.startsWith("/book/") ||
    pathname.startsWith("/api/nearby");

  // Public shop pages must not depend on Supabase env being present.
  if (isPublicSite) {
    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
