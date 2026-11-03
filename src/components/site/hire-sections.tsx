import { InstagramIcon } from "@/components/site/instagram-icon";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { APPAREL_PIECES, DRAWING_PIECES } from "@/lib/letterheads";
import {
  ARTIST_NAME,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "Brief",
    color: "#1fa8ef",
    body: "Send the shirt, the line, and the words. What the graphic has to do.",
  },
  {
    n: "02",
    title: "Sketch",
    color: "#7ec13a",
    body: `${ARTIST_NAME} draws it by hand. You see the direction before it is finished.`,
  },
  {
    n: "03",
    title: "Final art",
    color: "#e653a4",
    body: "Print-ready art for the shirt. No templates along the way.",
  },
];

export function DrawingGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
          The hand
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          Lettering and drawing. Every piece is drawn by hand. No AI. No
          templates. Paq&apos;in logos and house graphics in this grid are not
          available for another brand to print.
        </p>
      </div>
      <PortfolioGrid pieces={DRAWING_PIECES} />
    </section>
  );
}

export function ApparelGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
          On a shirt
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          Past work, shown on apparel. These are not for sale, and they are not
          designs another brand can print.
        </p>
      </div>
      <PortfolioGrid pieces={APPAREL_PIECES} />
    </section>
  );
}

export function HowItWorks() {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
        How working together works
      </h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="rounded-2xl border border-white/10 bg-black/40 p-5"
            style={{ borderTopWidth: 2, borderTopColor: step.color }}
          >
            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: step.color }}
            >
              {step.n}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#f2ebe0]/60">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function HireContact() {
  return (
    <section
      id="contact"
      className="rounded-3xl border border-white/10 bg-black/50 px-5 py-10 text-center sm:px-10"
    >
      <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide sm:text-3xl">
        Start with a note
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#f2ebe0]/65">
        Tell {ARTIST_NAME} what you need drawn. Original art for your shirts.
        Hand-drawn. No AI. No templates.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
        >
          {CONTACT_EMAIL}
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium text-[#f2ebe0] transition hover:bg-[#f2ebe0]/10"
        >
          <InstagramIcon className="size-4" />
          {INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  );
}
