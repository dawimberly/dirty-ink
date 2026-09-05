import Link from "next/link";
import { Cinzel, DM_Sans } from "next/font/google";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SHOP_URL,
  SITE_NAME,
} from "@/lib/site";
import { InstagramIcon } from "@/components/site/instagram-icon";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-ink-display",
  weight: ["500", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ink-body",
});

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
      <div className="relative isolate min-h-screen overflow-hidden bg-[#0c0a09]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#3a2218_0%,transparent_50%),radial-gradient(ellipse_at_90%_20%,#1a1512_0%,transparent_45%),linear-gradient(180deg,#0c0a09_0%,#140f0c_55%,#0a0908_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative flex min-h-screen flex-col">
          <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
            <Link
              href="/"
              className="font-[family-name:var(--font-ink-display)] text-sm font-bold tracking-[0.14em] text-[#f2ebe0] sm:text-base"
            >
              {SITE_NAME}
            </Link>
            <nav className="flex items-center gap-2 text-sm sm:gap-3">
              <Link
                href="/book"
                className="rounded-lg px-3 py-2 text-[#f2ebe0]/80 transition hover:bg-[#f2ebe0]/10 hover:text-[#f2ebe0]"
              >
                Book
              </Link>
              <a
                href={SHOP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-3 py-2 text-[#f2ebe0]/80 transition hover:bg-[#f2ebe0]/10 hover:text-[#f2ebe0]"
              >
                Merch
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[#f2ebe0]/80 transition hover:bg-[#f2ebe0]/10 hover:text-[#f2ebe0]"
              >
                <InstagramIcon className="size-4" />
                <span className="hidden sm:inline">{INSTAGRAM_HANDLE}</span>
              </a>
            </nav>
          </header>

          <main
            className={`relative mx-auto flex w-full flex-1 flex-col px-4 py-8 sm:px-6 ${
              wide ? "max-w-5xl" : "max-w-xl justify-center"
            }`}
          >
            {children}
          </main>

          <footer className="mx-auto w-full max-w-5xl px-4 py-8 text-center text-xs text-[#f2ebe0]/40 sm:px-6">
            <p>
              {SITE_NAME} · Long Beach, South Bay, Silver Lake ·{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[#f2ebe0]/20 underline-offset-4 hover:text-[#f2ebe0]/70"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </p>
            <p className="mt-2">
              <Link href="/login" className="hover:text-[#f2ebe0]/70">
                Artist login
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
