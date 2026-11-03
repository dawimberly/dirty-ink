import Image from "next/image";
import type { PortfolioPiece } from "@/lib/letterheads";

const STYLE_COLOR: Record<string, string> = {
  Blackletter: "#f2ebe0",
  Script: "#e653a4",
  "Street lettering": "#7ec13a",
  Traditional: "#f4d21e",
  Splatter: "#e23a3a",
  Graphite: "#c5d0dc",
  Sketch: "#4fbcf5",
};

export function PortfolioGrid({ pieces }: { pieces: PortfolioPiece[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {pieces.map((piece) => {
        const accent = STYLE_COLOR[piece.styles[0]] ?? "#1fa8ef";
        const contain = piece.fit !== "cover";
        return (
          <li
            key={piece.id}
            className={`overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${
              piece.wide ? "sm:col-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                piece.wide ? "aspect-[16/10]" : "aspect-[4/5]"
              } ${contain ? "bg-[#ece7df]" : "bg-[#111]"}`}
            >
              <Image
                src={piece.src}
                alt={piece.alt}
                fill
                sizes={
                  piece.wide
                    ? "(min-width: 1024px) 960px, 100vw"
                    : "(min-width: 640px) 480px, 100vw"
                }
                className={
                  contain
                    ? "object-contain p-3 sm:p-5"
                    : "object-cover"
                }
              />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1.5">
                {piece.styles.map((style) => (
                  <span
                    key={style}
                    className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{
                      color: STYLE_COLOR[style] ?? accent,
                      borderColor: STYLE_COLOR[style] ?? accent,
                    }}
                  >
                    {style}
                  </span>
                ))}
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-ink-display)] text-lg tracking-wide">
                {piece.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#f2ebe0]/60">
                {piece.caption}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
