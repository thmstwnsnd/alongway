export type PricingTier = {
  quantity: number;
  unitPrice: string;
};

export type BagSize = "small" | "medium" | "large";

export type Bag = {
  slug: string;
  name: string;
  tagline: string;
  material: string;
  features: string[];
  dimensions: string;
  size: BagSize;
  startingPrice: number;
  pricingTiers: PricingTier[];
};

const basePricingBySize: Record<BagSize, Record<number, number>> = {
  small:  { 100: 7.5,  250: 6.5,  500: 5.75, 1000: 5.25, 2000: 4.75 },
  medium: { 100: 11.0, 250: 9.5,  500: 8.5,  1000: 7.75, 2000: 7.00 },
  large:  { 100: 14.5, 250: 12.5, 500: 11.0, 1000: 9.75, 2000: 8.75 },
};

export const quantityTiers = [100, 250, 500, 1000, 2000];
export const customQuoteTier = 5000;

function buildPricingTiers(size: BagSize): PricingTier[] {
  return Object.entries(basePricingBySize[size]).map(([quantity, price]) => ({
    quantity: Number(quantity),
    unitPrice: `$${price.toFixed(2)}`,
  }));
}

const rawBags = [
  {
    slug: "beach-tote",
    name: "Beach Tote",
    tagline: "Water-resistant, zippered, built for the shore.",
    material: "Tyvek",
    features: ["Water-resistant", "Zippered closure", "Front pocket", "Interior pocket"],
    dimensions:
      '19.5"W x 14.5"H x 6" Gusset | Straps: 22" long x 1.5" wide | Front pocket: 7" | Interior pocket: 7"',
    size: "large",
  },
  {
    slug: "hauler-tote",
    name: "Hauler Tote",
    tagline: "Oversized, structured, and built to haul.",
    material: "Polypropylene",
    features: ["Oversized", "Structured body", "Heavy-duty"],
    dimensions: '17.75"L x 7"D x 17.75"H',
    size: "large",
  },
  {
    slug: "everyday-tote",
    name: "Everyday Tote",
    tagline: "The reliable one. Gusseted canvas for daily carry.",
    material: "10oz Canvas",
    features: ["Gusseted", "Standard carry", "Durable canvas"],
    dimensions: '16.5"W x 16.5"H | Gusset: 3.75" | Strap length: 28.5"',
    size: "medium",
  },
  {
    slug: "shoulder-tote",
    name: "Shoulder Tote",
    tagline: "Longer handles, easy shoulder carry.",
    material: "10oz Canvas",
    features: ["Shoulder carry", "Longer handles", "Gusseted"],
    dimensions: '18.25"W x 14.5"H | Gusset: 5" | Strap length: 23.5"',
    size: "medium",
  },
  {
    slug: "oversized-tote",
    name: "Oversized Tote",
    tagline: "The market haul. Wide gusset, maximum volume.",
    material: "10oz Canvas",
    features: ["Oversized", "Wide gusset", "Market carry"],
    dimensions: '26.75"W x 14.5"H | Gusset: 18" x 8" | Strap length: 23.5"',
    size: "large",
  },
  {
    slug: "basic-tote",
    name: "Basic Tote",
    tagline: "Clean, flat, minimal. The purist's tote.",
    material: "10oz Canvas",
    features: ["Flat body", "No gusset", "Minimalist"],
    dimensions: '14"W x 15.25"H | Strap length: 27.5"',
    size: "small",
  },
  {
    slug: "mini-tote",
    name: "Mini Tote",
    tagline: "Compact and gift-friendly. Big on brand.",
    material: "10oz Canvas",
    features: ["Compact", "Gift-friendly", "Mini size"],
    dimensions: '8"W x 8"H x 1.5"D | Handle length: 14"',
    size: "small",
  },
  {
    slug: "the-sunday",
    name: "The Sunday",
    tagline: "Open top, wide body. Made for slow mornings.",
    material: "10oz Canvas",
    features: ["Open top", "Wide body", "Market carry"],
    dimensions: '20.5"W x 14.5"H | Gusset: 6.25"',
    size: "large",
  },
  {
    slug: "channel-tote-small",
    name: "Channel Tote — Small",
    tagline: "The everyday carry. Compact enough for a commute, roomy enough for the essentials.",
    material: "24oz Canvas",
    features: ["Compact size", "Dual handle lengths", "Structured 24oz canvas"],
    dimensions: '9.5"W x 10.5"H x 5"D | Handles: Regular 5", Long 14"',
    size: "small",
  },
  {
    slug: "channel-tote-medium",
    name: "Channel Tote — Medium",
    tagline: "The workhorse. Fits a laptop, a lunch, and everything in between.",
    material: "24oz Canvas",
    features: ["Laptop-friendly", "Dual handle lengths", "Structured 24oz canvas"],
    dimensions: '13"W x 12"H x 6"D | Handles: Regular 6", Long 14"',
    size: "medium",
  },
  {
    slug: "channel-tote-large",
    name: "Channel Tote — Large",
    tagline: "The statement piece. Oversized structure, premium feel, maximum presence.",
    material: "24oz Canvas",
    features: ["Oversized capacity", "Dual handle lengths", "Structured 24oz canvas"],
    dimensions: '17"W x 15"H x 7.5"D | Handles: Regular 8", Long 14"',
    size: "large",
  },
  {
    slug: "big-sur-tote",
    name: "Big Sur Tote",
    tagline: "Tapered base, structured, open top. California-born.",
    material: "10oz Canvas",
    features: ["Tapered base", "Structured", "Open top"],
    dimensions: '22" top width x 15" base width x 10"H x 4.5"D',
    size: "large",
  },
  {
    slug: "otis-tote",
    name: "Otis Tote",
    tagline: "Waxed canvas. Long strap. Built for weather.",
    material: "Waxed Canvas",
    features: ["Weather-resistant", "Long strap", "Front pocket"],
    dimensions: '17"W x 17"H | Gusset: 6.5" | Strap: 33" long x 1.5" wide | Front pocket: 6"',
    size: "medium",
  },
  {
    slug: "camper-pouch",
    name: "Camper Pouch",
    tagline: "Zippered pouch. Compact, clean, goes anywhere.",
    material: "Canvas",
    features: ["Zippered", "Compact", "Travel-friendly"],
    dimensions: "Dimensions TBD",
    size: "small",
  },
] satisfies Array<Omit<Bag, "startingPrice" | "pricingTiers">>;

export const bags: Bag[] = rawBags.map((bag) => ({
  ...bag,
  startingPrice: basePricingBySize[bag.size][100],
  pricingTiers: buildPricingTiers(bag.size),
}));

// quantityTiers and customQuoteTier defined above with pricing

export function getBagBySlug(slug: string) {
  return bags.find((bag) => bag.slug === slug);
}

// Curated Unsplash photo IDs — real lifestyle/tote photography
// Format: https://images.unsplash.com/photo-{id}?w=800&q=80&fit=crop
const bagPhotos: Record<string, string> = {
  "beach-tote":    "1622560048-2f3e5abf3e28", // beach bag lifestyle
  "hauler-tote":   "1553062407-98eeb64c6a62", // large structured tote
  "everyday-tote": "1544816565-9d2be1e2c44b", // canvas tote everyday
  "shoulder-tote": "1590874103328-eac38a683ce7", // shoulder bag lifestyle
  "oversized-tote":"1547949003-9792a18a2841", // oversized market tote
  "basic-tote":    "1558769132-cb1aea458c5e", // simple flat tote
  "mini-tote":     "1548036161-2ddff1aafc29", // mini tote compact
  "the-sunday":    "1609709295948-17d77cb2a69a", // open top market bag
  "channel-tote":  "1548036161-2ddff1aafc29", // structured canvas
  "big-sur-tote":  "1553062407-98eeb64c6a62", // california lifestyle tote
  "otis-tote":     "1548036161-2ddff1aafc29", // waxed canvas bag
  "camper-pouch":  "1585386959595-9ff92f53e61c", // small pouch accessories
};

// Lifestyle hero images for home/collection sections
export const lifestylePhotos = [
  "1556742049-0cfed4f6a45d", // person at farmers market with tote
  "1473093295043-cdd812d0e601", // coffee shop morning lifestyle
  "1509316785289-025f5b846b35", // beach lifestyle warm tones
  "1441986300917-64674bd600d8", // shopping lifestyle
  "1528360983277-13d401cdc186", // outdoor lifestyle warm
  "1524758631624-e2822e304c36", // california beach lifestyle
];

export function getBagImageUrl(slug: string, size: "card" | "hero" = "card") {
  const photoId = bagPhotos[slug];
  const w = size === "hero" ? 1200 : 800;
  const h = size === "hero" ? 900 : 800;
  if (photoId) {
    return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&q=80&fit=crop&auto=format`;
  }
  // fallback
  return `https://placehold.co/${w}x${h}/EEE6D2/262626?text=${slug}`;
}

export function getLifestyleImageUrl(index: number, size: "wide" | "square" = "wide") {
  const photoId = lifestylePhotos[index % lifestylePhotos.length];
  const w = size === "wide" ? 1600 : 800;
  const h = size === "wide" ? 900 : 800;
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&q=80&fit=crop&auto=format`;
}
