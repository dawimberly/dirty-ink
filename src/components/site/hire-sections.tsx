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
  SHIRT_GRAPHIC_INQUIRY_URL,
} from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "Sketch",
    color: "#1fa8ef",
    body: "Share the idea and any references. Greg draws an original direction by hand.",
  },
  {
    n: "02",
    title: "Sketch revisions",
    color: "#7ec13a",
    body: "Review the sketch and request revisions while the art is still at the sketch stage.",
  },
  {
    n: "03",
    title: "Print-ready files",
    color: "#e653a4",
    body: "Receive final print-ready files for the front and back of the shirt.",
  },
];

const sectionHeading =
  "font-[family-name:var(--font-ink-display)] text-2xl tracking-wide";

export function ApparelGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className={sectionHeading}>On a shirt</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          Past work shown for reference. Every brand gets original art.
        </p>
      </div>
      <PortfolioGrid pieces={APPAREL_PIECES} />
    </section>
  );
}

export function LetteringGrid() {
  return (
    <section>
      <div className="mb-5">
        <h2 className={sectionHeading}>Lettering</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          Blackletter, script, street lettering, and hand-drawn lettering studies.
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
        <h2 className={sectionHeading}>Other work</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#f2ebe0]/60">
          Tattoo work and graphite drawing from Greg&apos;s broader practice.
        </p>
      </div>
      <PortfolioGrid pieces={OTHER_PIECES} />
    </section>
  );
}

export function AboutGreg() {
  return (
    <section className="max-w-3xl">
      <h2 className={sectionHeading}>About Greg</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#f2ebe0]/70 sm:text-base">
        {ARTIST_NAME} is a Los Angeles lettering artist and illustrator with a
        tattoo background. His work includes blackletter, script, street
        lettering, traditional drawing, splatter, and graphite. Every piece is
        hand-drawn, with no AI and no templates.
      </p>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section>
      <h2 className={sectionHeading}>How it works</h2>
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

export function ShirtGraphicCTA() {
  return (
    <div className="text-center">
      <a
        href={SHIRT_GRAPHIC_INQUIRY_URL}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 py-3 text-center text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
      >
        Get a shirt graphic drawn
      </a>
    </div>
  );
}

export function HireContact() {
  return (
    <section
      id="contact"
      className="rounded-3xl border border-white/10 bg-black/50 px-5 py-10 text-center sm:px-10"
    >
      <h2 className={sectionHeading}>Start a shirt graphic</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#f2ebe0]/65">
        Tell {ARTIST_NAME} what you have in mind. Every brand gets original,
        hand-drawn art.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={SHIRT_GRAPHIC_INQUIRY_URL}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1fa8ef] px-6 py-3 text-sm font-semibold text-[#0b0b0e] transition hover:bg-[#4fbcf5]"
        >
          Get a shirt graphic drawn
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-[#f2ebe0]/30 bg-black/30 px-6 text-sm font-medium text-[#f2ebe0] transition hover:bg-[#f2ebe0]/10"
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
