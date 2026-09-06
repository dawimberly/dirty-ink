import Link from "next/link";
import Image from "next/image";
import { Cinzel, DM_Sans } from "next/font/google";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_WORDMARK,
} from "@/lib/site";
import { InstagramIcon } from "@/components/site/instagram-icon";
import { CartProvider } from "@/components/shop/cart-provider";
import { CartButton } from "@/components/shop/cart-button";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-ink-display",
  weight: ["500", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ink-body",
});

const navLinkClass =
  "rounded-lg px-3 py-2 text-[#f2ebe0]/80 transition hover:bg-[#f2ebe0]/10 hover:text-[#f2ebe0]";

export function PublicShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen font-[family-name:var(--font-ink-body)] text-[#f2ebe0]`}
    >
      <div className="relative isolate min-h-screen overflow-hidden bg-[#0b0b0e]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_-5%,rgba(31,168,239,0.20)_0%,transparent_45%),radial-gradient(ellipse_at_88%_8%,rgba(122,60,208,0.22)_0%,transparent_45%),radial-gradient(ellipse_at_50%_108%,rgba(126,193,58,0.16)_0%,transparent_50%),radial-gradient(ellipse_at_95%_92%,rgba(230,83,164,0.14)_0%,transparent_45%),linear-gradient(180deg,#0b0b0e_0%,#0c0c11_55%,#090909_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                aria-label={SITE_NAME}
              >
                <span className="grid size-9 place-items-center overflow-hidden rounded-full bg-white">
                  <Image
                    src="/brand/logo.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 object-contain"
                    priority
                  />
                </span>
                <span className="font-[family-name:var(--font-ink-display)] text-sm font-bold tracking-[0.22em] text-[#f2ebe0] sm:text-base">
                  {SITE_WORDMARK}
                </span>
              </Link>
              <nav className="flex items-center gap-1 text-sm sm:gap-2">
                <Link href="/shop" className={navLinkClass}>
                  Shop
                </Link>
                <Link href="/about" className={`hidden sm:inline-flex ${navLinkClass}`}>
                  About
                </Link>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 ${navLinkClass}`}
                >
                  <InstagramIcon className="size-4" />
                  <span className="hidden sm:inline">{INSTAGRAM_HANDLE}</span>
                </a>
                <CartButton />
              </nav>
            </header>

            <main
              className={`relative mx-auto flex w-full flex-1 flex-col px-4 py-8 sm:px-6 ${
                wide ? "max-w-5xl" : "max-w-3xl"
              }`}
            >
              {children}
            </main>

            <footer className="mx-auto w-full max-w-5xl px-4 py-10 text-center text-xs text-[#f2ebe0]/40 sm:px-6">
              <p>
                {SITE_NAME} · Los Angeles · Made to order ·{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#f2ebe0]/20 underline-offset-4 hover:text-[#f2ebe0]/70"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </p>
              <p className="mt-2 flex items-center justify-center gap-3">
                <Link href="/shop" className="hover:text-[#f2ebe0]/70">
                  Shop
                </Link>
                <span aria-hidden>·</span>
                <Link href="/about" className="hover:text-[#f2ebe0]/70">
                  About
                </Link>
                <span aria-hidden>·</span>
                <Link href="/login" className="hover:text-[#f2ebe0]/70">
                  Admin
                </Link>
              </p>
            </footer>
          </div>
        </CartProvider>
      </div>
    </div>
  );
}
