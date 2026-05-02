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

// Local product & lifestyle photos — all optimized for web under /public/photos/
const bagPhotoSets: Record<string, string[]> = {
  "beach-tote":    ["/photos/product-dscf-2980.jpg","/photos/product-dscf-2982.jpg","/photos/lifestyle-verve-cosmic-1.jpg","/photos/lifestyle-hsd-514.jpg"],
  "hauler-tote":   ["/photos/product-dscf-2985.jpg","/photos/product-dscf-2993.jpg","/photos/lifestyle-hsd-2938.jpg","/photos/lifestyle-gymshark.jpg"],
  "everyday-tote": ["/photos/product-dscf-2995.jpg","/photos/product-dscf-3039.jpg","/photos/lifestyle-hsd-93.jpg","/photos/lifestyle-hsd-94.jpg"],
  "shoulder-tote": ["/photos/product-dscf-3021.jpg","/photos/product-dscf-3037.jpg","/photos/lifestyle-hsd-435.jpg","/photos/lifestyle-hsd-457.jpg"],
  "oversized-tote":["/photos/product-dscf-3048.jpg","/photos/product-dscf-3085.jpg","/photos/lifestyle-hsd-2937.jpg","/photos/lifestyle-hsd-128.jpg"],
  "basic-tote":    ["/photos/product-dscf-3146.jpg","/photos/product-dscf-3153.jpg","/photos/lifestyle-hsd-73.jpg","/photos/lifestyle-hsd-75.jpg"],
  "mini-tote":     ["/photos/product-dscf-3148.jpg","/photos/product-dscf-3234.jpg","/photos/lifestyle-verve-tokyo.jpg","/photos/lifestyle-verve-large-tote.jpg"],
  "the-sunday":    ["/photos/product-dscf-3239.jpg","/photos/carousel-2.jpg","/photos/lifestyle-boatsetter-2.jpg","/photos/lifestyle-merch-drop.jpg"],
  "channel-tote":  ["/photos/product-dscf-3153.jpg","/photos/product-dscf-2982.jpg","/photos/lifestyle-hsd-76.jpg","/photos/lifestyle-hsd-102.jpg"],
  "big-sur-tote":  ["/photos/product-dscf-2993.jpg","/photos/product-dscf-3037.jpg","/photos/lifestyle-hsd-103.jpg","/photos/lifestyle-hsd-104.jpg"],
  "otis-tote":     ["/photos/product-dscf-3039.jpg","/photos/product-dscf-3085.jpg","/photos/lifestyle-hsd-114.jpg","/photos/lifestyle-hsd-131.jpg"],
  "camper-pouch":  ["/photos/product-dscf-3146.jpg","/photos/product-dscf-3234.jpg","/photos/lifestyle-kis-tote.jpg","/photos/lifestyle-verve-cosmic-2.jpg"],
};

const bagPhotos: Record<string, string> = Object.fromEntries(
  Object.entries(bagPhotoSets).map(([k, v]) => [k, v[0]])
);

export function getBagPhotoSet(slug: string): string[] {
  return bagPhotoSets[slug] ?? [bagPhotos[slug] ?? ""];
}

// Lifestyle photos for home/collection sections
export const lifestylePhotos = [
  "/photos/lifestyle-verve-cosmic-1.jpg",
  "/photos/lifestyle-hsd-514.jpg",
  "/photos/lifestyle-hsd-2938.jpg",
  "/photos/carousel-3.jpg",
  "/photos/lifestyle-boatsetter-2.jpg",
  "/photos/lifestyle-gymshark.jpg",
];

export function getBagImageUrl(slug: string) {
  return bagPhotos[slug] ?? "/photos/product-dscf-2980.jpg";
}

export function getLifestyleImageUrl(index: number) {
  return lifestylePhotos[index % lifestylePhotos.length];
}
