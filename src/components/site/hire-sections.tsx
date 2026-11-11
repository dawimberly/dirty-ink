import { InstagramIcon } from "@/components/site/instagram-icon";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import {
  APPAREL_PIECES,
  LETTERING_PIECES,
  OTHER_PIECES,
} from "@/lib/letterheads";
import {
  ARTIST_NAME,
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SHIRT_CTA_LABEL,
  SHIRT_INQUIRY_MAILTO,
} from "@/lib/site";

const PAST_WORK_NOTE =
  "Past work shown for reference. Every brand gets original art.";

const STEPS = [
  {
    n: "01",
    title: "Sketch",
    color: "#1fa8ef",
    body: `${ARTIST_NAME} draws a hand sketch from your brief — the shirt, the line, the words.`,
  },
  {
    n: "02",
    title: "Revisions",
    color: "#7ec13a",
    body: "Changes happen at the sketch stage, before the final art is locked.",
  },
  {
    n: "03",
    title: "Print-ready files",
    color: "#e653a4",
    body: "Final print-ready files for the front and back of the shirt.",
  },
];

export function ApparelGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
          On a shirt
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          {PAST_WORK_NOTE}
        </p>
      </div>
      <PortfolioGrid pieces={APPAREL_PIECES} />
    </section>
  );
}

export function ShirtGraphicCTA() {
  return (
    <section className="rounded-2xl border border-[#1fa8ef]/30 bg-black/40 px-5 py-6 text-center sm:px-8">
      <a
        href={SHIRT_INQUIRY_MAILTO}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 py-3 text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
      >
        {SHIRT_CTA_LABEL}
      </a>
    </section>
  );
}

export function LetteringGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
          Lettering
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          {PAST_WORK_NOTE}
        </p>
      </div>
      <PortfolioGrid pieces={LETTERING_PIECES} />
    </section>
  );
}

export function OtherWorkGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
          Other work
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          Tattoo lettering on skin and graphite drawing from the same hand.
        </p>
      </div>
      <PortfolioGrid pieces={OTHER_PIECES} />
    </section>
  );
}

/** @deprecated Prefer LetteringGrid + OtherWorkGrid */
export function DrawingGrid() {
  return (
    <>
      <LetteringGrid />
      <OtherWorkGrid />
    </>
  );
}

export function AboutGreg() {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
        About Greg
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#f2ebe0]/70 sm:text-base">
        {ARTIST_NAME} is a Los Angeles lettering artist and illustrator with a
        tattoo background. He works in blackletter, script, street lettering,
        traditional drawing, splatter, and graphite. Every piece is hand-drawn —
        no AI, no templates.
      </p>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-ink-display)] text-2xl tracking-wide">
        Process
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
          href={SHIRT_INQUIRY_MAILTO}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
        >
          {SHIRT_CTA_LABEL}
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
      <p className="mt-4 text-xs text-[#f2ebe0]/45">{CONTACT_EMAIL}</p>
    </section>
  );
}
