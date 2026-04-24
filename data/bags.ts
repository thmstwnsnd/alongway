export type PricingTier = {
  quantity: number;
  unitPrice: string;
};

export type Bag = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  size: "small" | "medium" | "large";
  startingPrice: number;
  dimensions: string;
  accent: string;
  pricingTiers: PricingTier[];
};

export const bags: Bag[] = [
  {
    slug: "the-market",
    name: "The Market",
    shortDescription: "A roomy everyday tote built for produce runs and pop-up tables.",
    description: "A carryall with enough structure for retail moments, gifting programs, and market-day visibility.",
    size: "large",
    startingPrice: 16.5,
    dimensions: '18" W x 14" H x 6" D',
    accent: "#364FA0",
    pricingTiers: [
      { quantity: 50, unitPrice: "$16.50" },
      { quantity: 100, unitPrice: "$15.75" },
      { quantity: 250, unitPrice: "$14.95" },
      { quantity: 500, unitPrice: "$14.10" },
    ],
  },
  {
    slug: "the-daily",
    name: "The Daily",
    shortDescription: "A balanced medium tote for retail, events, and internal kits.",
    description: "Sized for routine use with a clean profile that keeps your brand visible without feeling overbuilt.",
    size: "medium",
    startingPrice: 12.5,
    dimensions: '16" W x 13" H x 4" D',
    accent: "#EB4628",
    pricingTiers: [
      { quantity: 50, unitPrice: "$12.50" },
      { quantity: 100, unitPrice: "$11.90" },
      { quantity: 250, unitPrice: "$11.20" },
      { quantity: 500, unitPrice: "$10.65" },
    ],
  },
  {
    slug: "the-weekender",
    name: "The Weekender",
    shortDescription: "A generous oversized bag for travel, launches, and premium gifting.",
    description: "The largest silhouette in the line, built to feel substantial, giftable, and worth keeping.",
    size: "large",
    startingPrice: 16.5,
    dimensions: '22" W x 15" H x 8" D',
    accent: "#262626",
    pricingTiers: [
      { quantity: 50, unitPrice: "$18.40" },
      { quantity: 100, unitPrice: "$17.65" },
      { quantity: 250, unitPrice: "$16.95" },
      { quantity: 500, unitPrice: "$16.50" },
    ],
  },
  {
    slug: "the-pocket",
    name: "The Pocket",
    shortDescription: "A compact utility tote with an easy front pocket for grab-and-go use.",
    description: "A smaller silhouette for cafe merch, welcome kits, and easy custom drops with functional storage.",
    size: "small",
    startingPrice: 8.5,
    dimensions: '12" W x 12" H x 3" D',
    accent: "#7D8FC4",
    pricingTiers: [
      { quantity: 50, unitPrice: "$8.50" },
      { quantity: 100, unitPrice: "$8.10" },
      { quantity: 250, unitPrice: "$7.65" },
      { quantity: 500, unitPrice: "$7.20" },
    ],
  },
  {
    slug: "the-zip-tote",
    name: "The Zip Tote",
    shortDescription: "A medium tote with added closure for teams that want a polished finish.",
    description: "A clean, secure silhouette that adds a more premium feel for hospitality, travel, and internal use.",
    size: "medium",
    startingPrice: 12.5,
    dimensions: '17" W x 13" H x 4.5" D',
    accent: "#C85A46",
    pricingTiers: [
      { quantity: 50, unitPrice: "$13.90" },
      { quantity: 100, unitPrice: "$13.15" },
      { quantity: 250, unitPrice: "$12.70" },
      { quantity: 500, unitPrice: "$12.25" },
    ],
  },
  {
    slug: "the-canvas-shopper",
    name: "The Canvas Shopper",
    shortDescription: "A classic open-top tote designed for broad brand reach and repeat use.",
    description: "An unfussy staple made for retail counters, conferences, and any program where volume matters.",
    size: "medium",
    startingPrice: 12.5,
    dimensions: '15" W x 14" H x 4" D',
    accent: "#D88D7D",
    pricingTiers: [
      { quantity: 50, unitPrice: "$12.50" },
      { quantity: 100, unitPrice: "$11.80" },
      { quantity: 250, unitPrice: "$11.10" },
      { quantity: 500, unitPrice: "$10.50" },
    ],
  },
  {
    slug: "the-mini",
    name: "The Mini",
    shortDescription: "A small-format tote for favors, gift sets, and elevated add-on items.",
    description: "Compact and charming, this silhouette is ideal when you want branded utility without full tote scale.",
    size: "small",
    startingPrice: 8.5,
    dimensions: '10" W x 9" H x 3.5" D',
    accent: "#8FA5F0",
    pricingTiers: [
      { quantity: 50, unitPrice: "$8.50" },
      { quantity: 100, unitPrice: "$8.00" },
      { quantity: 250, unitPrice: "$7.55" },
      { quantity: 500, unitPrice: "$7.10" },
    ],
  },
  {
    slug: "the-drawstring",
    name: "The Drawstring",
    shortDescription: "A lightweight pack style suited to events, clubs, and active brands.",
    description: "An easy custom format for movement-focused campaigns that still feels premium in canvas.",
    size: "small",
    startingPrice: 8.5,
    dimensions: '13" W x 15" H',
    accent: "#F1A491",
    pricingTiers: [
      { quantity: 50, unitPrice: "$9.20" },
      { quantity: 100, unitPrice: "$8.75" },
      { quantity: 250, unitPrice: "$8.30" },
      { quantity: 500, unitPrice: "$7.85" },
    ],
  },
  {
    slug: "the-crossbody",
    name: "The Crossbody",
    shortDescription: "A hands-free silhouette for teams who want a more lifestyle-forward option.",
    description: "A refined small bag for branded experiences, staff kits, and retail assortments with longer life.",
    size: "small",
    startingPrice: 8.5,
    dimensions: '11" W x 8" H x 2.5" D',
    accent: "#4B64B7",
    pricingTiers: [
      { quantity: 50, unitPrice: "$10.30" },
      { quantity: 100, unitPrice: "$9.70" },
      { quantity: 250, unitPrice: "$9.10" },
      { quantity: 500, unitPrice: "$8.60" },
    ],
  },
  {
    slug: "the-boat-bag",
    name: "The Boat Bag",
    shortDescription: "A heritage-inspired large tote with a durable shape and strong shelf presence.",
    description: "A premium open-top silhouette with a structured base, ideal for launches and long-term brand use.",
    size: "large",
    startingPrice: 16.5,
    dimensions: '19" W x 13" H x 7" D',
    accent: "#2F3E73",
    pricingTiers: [
      { quantity: 50, unitPrice: "$17.20" },
      { quantity: 100, unitPrice: "$16.85" },
      { quantity: 250, unitPrice: "$16.50" },
      { quantity: 500, unitPrice: "$15.90" },
    ],
  },
];

export const quantityTiers = [50, 100, 250, 500];

export function getBagBySlug(slug: string) {
  return bags.find((bag) => bag.slug === slug);
}
