export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  code: string;
  /** Which artist in the house made it. */
  artist: "Greg" | "Dan";
  category: "Tee" | "Long Sleeve" | "Print";
  /** Price in US cents. Placeholder values — confirm final retail pricing. */
  priceCents: number;
  blurb: string;
  description: string;
  images: ProductImage[];
  sizes: string[];
  /** Nothing is stocked; each order is produced to order. */
  madeToOrder: boolean;
  soldOut?: boolean;
};

export const APPAREL_SIZES = ["S", "M", "L", "XL", "2XL"];
export const PRINT_SIZES = ['12" × 16"', '18" × 24"'];

export const PRODUCTS: Product[] = [
  {
    slug: "knowpain-tee",
    name: "KNOWPAIN Tee",
    code: "TG001",
    artist: "Greg",
    category: "Tee",
    priceCents: 4500,
    blurb: "Blackletter Paqinhaus mark with hand-drawn “Know Pain” lettering and red splatter.",
    description:
      "Heavyweight cut & sew tee with original artwork by Greg Paquín. Front carries the Paqinhaus blackletter wordmark over the hand-drawn KNOWPAIN script with a red splatter wash; the story continues on the back. Oversized streetwear fit.",
    images: [
      { src: "/products/knowpain-front.jpg", alt: "KNOWPAIN tee — front" },
      { src: "/products/knowpain-back.jpg", alt: "KNOWPAIN tee — back" },
    ],
    sizes: APPAREL_SIZES,
    madeToOrder: true,
  },
  {
    slug: "knowpain-longsleeve",
    name: "KNOWPAIN Long Sleeve",
    code: "TG001b",
    artist: "Greg",
    category: "Long Sleeve",
    priceCents: 5800,
    blurb: "The “God Is Love” artwork on a heavyweight long sleeve with wrap-around script.",
    description:
      "Greg Paquín’s “God Is Love” piece on a heavyweight long sleeve — full front illustration with hand-lettered script running down both sleeves. Original art, oversized streetwear fit.",
    images: [
      { src: "/products/knowpain-longsleeve-front.jpg", alt: "KNOWPAIN long sleeve — front" },
    ],
    sizes: APPAREL_SIZES,
    madeToOrder: true,
  },
  {
    slug: "mouth-bay-tee",
    name: "Mouth Bay Tee",
    code: "TG002",
    artist: "Greg",
    category: "Tee",
    priceCents: 4500,
    blurb: "“Mouth Bay · CA 310” street-sign graphic — shut it or I’ll stuff it.",
    description:
      "A love letter to the 310. Green street-sign graphic reading MOUTH BAY / CA 310 with the Paqinhaus lips mark and the “Shut it or I’ll stuff it” tag — an original Greg Paquín graphic on a premium tee.",
    images: [
      { src: "/products/mouth-bay-front.jpg", alt: "Mouth Bay tee — front" },
    ],
    sizes: APPAREL_SIZES,
    madeToOrder: true,
  },
  {
    slug: "dirty-inc-tee",
    name: "Dirty Inc Tee",
    code: "DAN01",
    artist: "Dan",
    category: "Tee",
    priceCents: 4500,
    blurb: "Dan’s dripping “Dirty Inc” blackletter mark with a traditional rose.",
    description:
      "The other half of the house. Dan’s “Dirty Inc” — a dripping blackletter mark paired with a traditional tattoo rose, printed on a premium tee.",
    images: [
      { src: "/products/dirty-inc-front.jpg", alt: "Dirty Inc tee — front graphic" },
    ],
    sizes: APPAREL_SIZES,
    madeToOrder: true,
  },
  {
    slug: "lighthouse-print",
    name: "Lighthouse — Graphite Print",
    code: "TG003",
    artist: "Greg",
    category: "Print",
    priceCents: 3000,
    blurb: "Original graphite lighthouse-in-the-storm artwork, printed on museum stock.",
    description:
      "An original hand-drawn graphite study by Greg Paquín — a lighthouse taking a wave broadside. Reproduced as a giclée-style print on heavy museum stock and shipped flat.",
    images: [
      { src: "/products/lighthouse.jpg", alt: "Lighthouse graphite artwork" },
    ],
    sizes: PRINT_SIZES,
    madeToOrder: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
