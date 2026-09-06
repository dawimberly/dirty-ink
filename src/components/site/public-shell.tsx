import Link from "next/link";
import Image from "next/image";
import { Bungee, DM_Sans, Permanent_Marker, Pirata_One } from "next/font/google";
import {
  ARTIST_NAME,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_WORDMARK,
} from "@/lib/site";
import { InstagramIcon } from "@/components/site/instagram-icon";
import { CartProvider } from "@/components/shop/cart-provider";
import { CartButton } from "@/components/shop/cart-button";

const display = Bungee({
  subsets: ["latin"],
  variable: "--font-ink-display",
  weight: ["400"],
});

const brand = Pirata_One({
  subsets: ["latin"],
  variable: "--font-ink-brand",
  weight: ["400"],
});

const tag = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-ink-tag",
  weight: ["400"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ink-body",
});

const navLinkClass =
  "rounded-lg px-3 py-2 text-[#f2ebe0]/85 transition hover:bg-[#1fa8ef]/15 hover:text-white";

const MARQUEE_ITEMS = [
  "PAQ'IN FAMILY HOUSE",
  "ORIGINAL ART",
  "ART BY GREG PAQUÍN",
  "LOS ANGELES",
  "KNOW PAIN",
  "310",
];

export function PublicShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`${display.variable} ${brand.variable} ${tag.variable} ${body.variable} min-h-screen font-[family-name:var(--font-ink-body)] text-[#f2ebe0]`}
    >
      <div className="relative isolate min-h-screen overflow-hidden bg-[#0b0b0e]">
        {/* Graffiti wall */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.45]"
          style={{ backgroundImage: "url('/brand/graffiti-2.jpg')" }}
        />
        {/* Darken for readability */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,14,0.62)_0%,rgba(11,11,14,0.68)_50%,rgba(9,9,9,0.8)_100%)]"
        />
        {/* Neon color glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-screen bg-[radial-gradient(ellipse_at_10%_-5%,rgba(31,168,239,0.28)_0%,transparent_45%),radial-gradient(ellipse_at_90%_6%,rgba(122,60,208,0.30)_0%,transparent_45%),radial-gradient(ellipse_at_50%_110%,rgba(126,193,58,0.22)_0%,transparent_50%),radial-gradient(ellipse_at_96%_94%,rgba(230,83,164,0.22)_0%,transparent_45%)]"
        />
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
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
                <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-[#1fa8ef]/70">
                  <Image
                    src="/brand/logo.png"
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 object-contain"
                    priority
                  />
                </span>
                <span className="font-[family-name:var(--font-ink-brand)] text-2xl leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-3xl">
                  {SITE_WORDMARK}
                </span>
              </Link>
              <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
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

            {/* Street-tape marquee */}
            <div className="relative overflow-hidden py-2">
              <div className="-ml-[2%] w-[104%] -rotate-1 border-y-2 border-black bg-[#1fa8ef]">
                <div className="pfh-marquee-track py-1.5">
                  {[0, 1].map((dup) => (
                    <div
                      key={dup}
                      aria-hidden={dup === 1}
                      className="flex shrink-0 items-center"
                    >
                      {MARQUEE_ITEMS.map((item) => (
                        <span
                          key={item}
                          className="flex items-center font-[family-name:var(--font-ink-display)] text-xs tracking-[0.12em] text-[#0b0b0e]"
                        >
                          <span className="mx-4">{item}</span>
                          <span className="text-[#0b0b0e]/60">✦</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <main
              className={`relative mx-auto flex w-full flex-1 flex-col px-4 py-8 sm:px-6 ${
                wide ? "max-w-5xl" : "max-w-3xl"
              }`}
            >
              {children}
            </main>

            <footer className="relative mx-auto w-full max-w-5xl px-4 py-10 text-center sm:px-6">
              <p className="font-[family-name:var(--font-ink-tag)] text-lg text-[#1fa8ef]">
                Stay up.
              </p>
              <p className="mt-2 text-xs text-[#f2ebe0]/45">
                {SITE_NAME} · Los Angeles · Original art by {ARTIST_NAME} ·{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#1fa8ef]/40 underline-offset-4 hover:text-[#f2ebe0]/80"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </p>
              <p className="mt-2 flex items-center justify-center gap-3 text-xs text-[#f2ebe0]/45">
                <Link href="/shop" className="hover:text-[#f2ebe0]/80">
                  Shop
                </Link>
                <span aria-hidden>·</span>
                <Link href="/about" className="hover:text-[#f2ebe0]/80">
                  About
                </Link>
                <span aria-hidden>·</span>
                <Link href="/login" className="hover:text-[#f2ebe0]/80">
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
