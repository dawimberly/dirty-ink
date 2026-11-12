/**
 * Public lettering / shirt-work portfolio.
 *
 * To add a piece: drop the image in `public/portfolio/` and append an entry
 * to `PORTFOLIO`. Near-duplicate files already in that folder (not listed
 * below) can be featured the same way:
 *   32, 33, 35, 36 — other angles of the hand lettering in piece "34"
 *
 * Left out of the folder on purpose:
 *   22–27 — authorship unclear (DAN)
 *   28–29 — generated-looking figures; the same shirt graphics are already
 *           shown on the apparel mockups below
 *
 * Groups:
 *   apparel  — past work shown on a shirt (lead the page with these)
 *   lettering — lettering / drawing sheets
 *   other    — tattoo-on-skin photos and graphite studies
 */

export const LETTERING_STYLES = [
  "Blackletter",
  "Script",
  "Street lettering",
  "Traditional",
  "Splatter",
  "Graphite",
  "Sketch",
] as const;

export type LetteringStyle = (typeof LETTERING_STYLES)[number];

export type PortfolioGroup = "apparel" | "lettering" | "other";

export type PortfolioPiece = {
  /** Stable id. Numbered Drive files keep their prefix. */
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  styles: LetteringStyle[];
  group: PortfolioGroup;
  /** Cover fills the frame. Contain keeps the whole sheet visible. */
  fit?: "cover" | "contain";
  /** Wide boards sit across two columns from the small breakpoint up. */
  wide?: boolean;
};

export const PORTFOLIO: PortfolioPiece[] = [
  // —— Apparel first (strongest at the top) ——
  {
    id: "15",
    src: "/portfolio/15_adam_1.jpg",
    alt: "Front and back tee mockup. Small chest lettering on the front, a large figure on the back",
    title: "Front and back",
    caption: "Front and back of a tee.",
    styles: ["Blackletter", "Traditional"],
    group: "apparel",
    fit: "contain",
    wide: true,
  },
  {
    id: "09",
    src: "/portfolio/09_manpants.jpg",
    alt: "Three shirts showing lettering and street-sign graphics, front and back",
    title: "Shirt graphics, front and back",
    caption: "Lettering and street signs, shown on shirts.",
    styles: ["Street lettering", "Blackletter"],
    group: "apparel",
    fit: "contain",
    wide: true,
  },
  {
    id: "08",
    src: "/portfolio/08_dickies_longsleeve.jpg",
    alt: "White long-sleeve shirt with PAQIN' in blackletter above a figure and HAÜS in block letters, with sleeve lettering",
    title: "Paqin' Haüs long sleeve",
    caption: "Long sleeve with the Paqin' Haüs figure graphic and sleeve lettering.",
    styles: ["Blackletter", "Script"],
    group: "apparel",
    fit: "contain",
  },
  {
    id: "17",
    src: "/portfolio/17_tg001a_back.jpg",
    alt: "White tee mockup with a large back graphic and pale splatter",
    title: "Back graphic",
    caption: "Back graphic on a tee, with splatter.",
    styles: ["Blackletter", "Splatter"],
    group: "apparel",
    fit: "contain",
  },
  {
    id: "18",
    src: "/portfolio/18_mouthbae_front.jpg",
    alt: "White tee mockup with green street signs and script underneath",
    title: "Street signs and script",
    caption: "Street-sign lettering and script on a tee.",
    styles: ["Street lettering", "Script"],
    group: "apparel",
    fit: "contain",
  },
  {
    id: "10",
    src: "/portfolio/10_knowpain_cad_front.jpg",
    alt: "Black tee mockup with wildstyle lettering above two street signs",
    title: "Street signs",
    caption: "Wildstyle lettering and street signs on a tee.",
    styles: ["Street lettering"],
    group: "apparel",
    fit: "contain",
  },
  {
    id: "07",
    src: "/portfolio/07_knowpain_tee_front.jpg",
    alt: "Black tee mockup with a small script graphic on the chest",
    title: "Script on a tee",
    caption: "Script on a black tee.",
    styles: ["Script"],
    group: "apparel",
    fit: "contain",
  },
  {
    id: "19",
    src: "/portfolio/19_tg001b_longsleeve.jpg",
    alt: "White long-sleeve mockup with a large graphic and lettering down one sleeve",
    title: "Sleeve lettering",
    caption: "Long sleeve with sleeve lettering.",
    styles: ["Blackletter", "Script"],
    group: "apparel",
    fit: "contain",
  },
  {
    id: "20",
    src: "/portfolio/20_tg001a_front2.jpg",
    alt: "White tee mockup with a small blackletter chest mark and splatter",
    title: "Chest mark",
    caption: "Small blackletter and splatter on a tee.",
    styles: ["Blackletter", "Splatter"],
    group: "apparel",
    fit: "contain",
  },

  // —— Lettering pieces ——
  {
    id: "06",
    src: "/portfolio/06_PL2-OTR.jpg",
    alt: "Popular Loner blackletter wrapped around a character head and two stars",
    title: "Popular Loner lettering",
    caption: "Popular Loner blackletter and a character head.",
    styles: ["Blackletter", "Traditional"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "04",
    src: "/portfolio/04_mock343.jpg",
    alt: "Popular Loner lettering with a character head and smaller script below",
    title: "Popular Loner",
    caption: "Popular Loner lettering, with smaller script underneath.",
    styles: ["Blackletter", "Script"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "05",
    src: "/portfolio/05_mock1.jpg",
    alt: "Brush lettering with black ink splatter on white",
    title: "Brush lettering",
    caption: "Brush lettering with ink splatter.",
    styles: ["Script", "Splatter"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "11",
    src: "/portfolio/11_dickie_final.jpg",
    alt: "PAQIN' in blackletter above a figure in a checkered shirt, with HAÜS in block letters",
    title: "Paqin' Haüs",
    caption: "Paqin' Haüs in blackletter above the figure, with HAÜS in block letters.",
    styles: ["Blackletter", "Traditional"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "16",
    src: "/portfolio/16_art001_dickie_v2.jpg",
    alt: "Color version of PAQIN' in blackletter above the figure and HAÜS in block letters, printed pink and black on red",
    title: "Paqin' Haüs, color",
    caption: "Paqin' Haüs in pink and black on a red field.",
    styles: ["Blackletter", "Traditional"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "03",
    src: "/portfolio/03_mock14563.jpg",
    alt: "Black ink lettering with a character and a small box",
    title: "Lettering and character",
    caption: "Lettering with a character and a small box.",
    styles: ["Street lettering", "Traditional"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "02",
    src: "/portfolio/02_parkave_mixcover_back.jpg",
    alt: "Brush script reading Park Avenue over a palm-lined street",
    title: "Park Avenue",
    caption: "Park Avenue brush script.",
    styles: ["Script"],
    group: "lettering",
    fit: "cover",
  },
  {
    id: "37",
    src: "/portfolio/37_IMG_5806.jpg",
    alt: "Ink sketch of a character in a tall hat holding a cup, with bubble letters",
    title: "Sketch",
    caption: "Ink sketch with bubble letters.",
    styles: ["Sketch", "Street lettering"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "38",
    src: "/portfolio/38_IMG_5368.jpg",
    alt: "Sketchbook page of outlined graffiti letters with clouds and sparks",
    title: "Sketchbook",
    caption: "Sketchbook page of graffiti lettering.",
    styles: ["Sketch", "Street lettering"],
    group: "lettering",
    fit: "contain",
  },
  {
    id: "01",
    src: "/portfolio/01_skratchloops_covers.jpg",
    alt: "Pale cyan line drawing of a running figure in a hat",
    title: "Line drawing",
    caption: "Line drawing of a figure in a hat.",
    styles: ["Sketch"],
    group: "lettering",
    fit: "contain",
    wide: true,
  },

  // —— Other work (tattoo-on-skin + graphite) ——
  {
    id: "21",
    src: "/portfolio/21_graphite_lighthouse_v2.jpg",
    alt: "Graphite drawing of a lighthouse in heavy waves",
    title: "Lighthouse",
    caption: "Graphite lighthouse in a storm.",
    styles: ["Graphite", "Traditional"],
    group: "other",
    fit: "contain",
  },
  {
    id: "31",
    src: "/portfolio/31_img_20260819.jpg",
    alt: "Tattoo of a roaring bear with blackletter above it",
    title: "Bear and blackletter",
    caption: "Blackletter over a bear, on skin.",
    styles: ["Blackletter", "Traditional"],
    group: "other",
    fit: "cover",
  },
  {
    id: "34",
    src: "/portfolio/34_IMG_5816.jpg",
    alt: "Blackletter tattoo across the back of a hand",
    title: "Hand lettering",
    caption: "Blackletter across the back of a hand.",
    styles: ["Blackletter"],
    group: "other",
    fit: "cover",
  },
  {
    id: "12",
    src: "/portfolio/12_ig_promo_1.jpg",
    alt: "Black-and-gray tattoo panel with a bear in a landscape and blackletter",
    title: "Bear panel",
    caption: "Black-and-gray bear and landscape, with blackletter beside it.",
    styles: ["Traditional", "Blackletter"],
    group: "other",
    fit: "cover",
  },
  {
    id: "13",
    src: "/portfolio/13_ig_promo_2.jpg",
    alt: "Black-and-gray owl tattoo on a hand",
    title: "Owl",
    caption: "Black-and-gray owl.",
    styles: ["Traditional"],
    group: "other",
    fit: "cover",
  },
  {
    id: "14",
    src: "/portfolio/14_ig_promo_3.jpg",
    alt: "Forearm tattoo with script and blackletter lettering and stars",
    title: "Forearm lettering",
    caption: "Script and blackletter on a forearm.",
    styles: ["Script", "Blackletter"],
    group: "other",
    fit: "cover",
  },
];

export const APPAREL_PIECES = PORTFOLIO.filter((piece) => piece.group === "apparel");
export const LETTERING_PIECES = PORTFOLIO.filter(
  (piece) => piece.group === "lettering"
);
export const OTHER_PIECES = PORTFOLIO.filter((piece) => piece.group === "other");

/** @deprecated Prefer LETTERING_PIECES + OTHER_PIECES */
export const DRAWING_PIECES = [...LETTERING_PIECES, ...OTHER_PIECES];
