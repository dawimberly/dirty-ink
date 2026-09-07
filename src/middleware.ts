import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicShop =
    pathname === "/" ||
    pathname === "/shop" ||
    pathname.startsWith("/shop/") ||
    pathname === "/about" ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/") ||
    pathname === "/book" ||
    pathname.startsWith("/book/") ||
    pathname.startsWith("/api/nearby") ||
    pathname.startsWith("/api/checkout") ||
    pathname.startsWith("/api/stripe/");
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");

  // Public shop pages must not depend on Supabase env being present.
  if (isPublicShop) {
    return NextResponse.next();
  }

  if (isLogin && !hasSupabaseEnv()) {
    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
