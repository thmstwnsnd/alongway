/**
 * Bag styles from the factory spec sheet AlongwayBags_V8.pdf (BAG 01-19).
 * Dimensions are inches, straight from the PDF. This is the catalog the
 * Build a Bag tool uses; data/bags.ts is the older 14-style lineup that
 * the collection pages still render.
 */

export type Dimensions = { width: number; height: number; depth: number };

export type StrapType = "self-fabric" | "cotton-webbing" | "nylon";

export type Strap = {
  type: StrapType;
  /** Total strap length, or handle drop for boat-style handles. */
  length: number;
  width: number;
  /** True when `length` is a handle drop rather than a full strap length. */
  isDrop?: boolean;
};

export type SizeVariant = {
  id: string;
  label: string;
  dims: Dimensions;
  strap: Strap;
  /** Pricing bracket used by lib/order-flow base pricing. */
  priceSize: "small" | "medium" | "large";
};

/**
 * Photo-recolor layers. `base` is the bag photo with the recolorable regions
 * neutralized to luminance; each mask is an alpha PNG. The browser multiplies
 * the chosen colors through the masks, keeping real shading and texture.
 */
export type PhotoLayers = {
  base: string;
  width: number;
  height: number;
  masks: { body: string; trim?: string };
};

export type CatalogStyle = {
  slug: string;
  photo?: PhotoLayers;
  bagNumber: string;
  name: string;
  tagline: string;
  /** Fabric slug from data/fabrics.ts the factory spec is built on. */
  defaultFabricSlug: string;
  /** Fabric slugs this style can be made in. */
  fabricSlugs: string[];
  sizes: SizeVariant[];
  features: string[];
  /** Pocket option ids from data/build-options.ts that come standard. */
  standardPockets?: string[];
  standardClosure?: string;
};

const canvasFabrics = [
  "cotton-canvas-10oz",
  "cotton-canvas-12oz",
  "cotton-canvas-16oz",
  "cotton-canvas-20oz",
  "cotton-canvas-24oz",
  "organic-cotton",
  "denim",
  "camo",
];

const self = (length: number, width = 1.5): Strap => ({ type: "self-fabric", length, width });
const webbing = (length: number, width: number): Strap => ({ type: "cotton-webbing", length, width });
const nylon = (length: number, width = 1.5): Strap => ({ type: "nylon", length, width });
const drop = (length: number, width: number): Strap => ({ type: "self-fabric", length, width, isDrop: true });

const one = (
  dims: Dimensions,
  strap: Strap,
  priceSize: SizeVariant["priceSize"],
  label = "Standard",
): SizeVariant[] => [{ id: "standard", label, dims, strap, priceSize }];

export const catalog: CatalogStyle[] = [
  {
    slug: "common-tote",
    bagNumber: "01",
    name: "Common Tote",
    tagline: "The flat classic. Light, simple, everywhere.",
    defaultFabricSlug: "cotton-canvas-10oz",
    fabricSlugs: canvasFabrics,
    sizes: one({ width: 14, height: 15.25, depth: 0 }, self(28.5), "small"),
    features: ["Flat construction", "Self-fabric straps"],
  },
  {
    slug: "everyday-tote",
    bagNumber: "02",
    name: "Everyday Tote",
    tagline: "The workhorse. Gusseted, roomy, our most-ordered shape.",
    defaultFabricSlug: "cotton-canvas-12oz",
    fabricSlugs: canvasFabrics,
    sizes: one({ width: 16.5, height: 16.5, depth: 4 }, self(28.5), "medium"),
    features: ["4\" gusset", "Self-fabric straps"],
  },
  {
    slug: "mini-tote",
    bagNumber: "03",
    name: "Mini Tote",
    tagline: "Pocket-sized. Gifts, lunch, small goods.",
    defaultFabricSlug: "cotton-canvas-10oz",
    fabricSlugs: canvasFabrics,
    sizes: one({ width: 8, height: 8, depth: 1.5 }, webbing(14, 1), "small"),
    features: ["Cotton webbing strap"],
  },
  {
    slug: "sunday-tote",
    bagNumber: "04",
    name: "Sunday Tote",
    tagline: "Wide and flat with exposed topstitched seams.",
    defaultFabricSlug: "cotton-canvas-12oz",
    fabricSlugs: canvasFabrics,
    sizes: one({ width: 17.5, height: 15, depth: 0 }, self(28.5), "medium"),
    features: ["Flat construction", "Exposed topstitched side seams"],
  },
  {
    slug: "downtown-tote",
    bagNumber: "05",
    name: "Downtown Tote",
    tagline: "Rounded corners, webbing straps, city-ready.",
    defaultFabricSlug: "cotton-canvas-12oz",
    fabricSlugs: canvasFabrics,
    sizes: one({ width: 16.5, height: 16.5, depth: 3.75 }, webbing(29.5, 1.5), "medium"),
    features: ["Rounded corners", "Cotton webbing straps"],
  },
  {
    slug: "otis-tote",
    bagNumber: "06",
    name: "Otis Tote",
    tagline: "Deep gusset, front pocket, built for a full day.",
    defaultFabricSlug: "cotton-canvas-16oz",
    fabricSlugs: canvasFabrics,
    sizes: one({ width: 17, height: 17, depth: 6.5 }, self(28.5), "large"),
    features: ["6.5\" gusset", "6\" front exterior pocket"],
    standardPockets: ["exterior-front"],
  },
  {
    slug: "boat-tote-little",
    bagNumber: "07",
    name: "Boat Tote Little",
    tagline: "Heavyweight canvas, short handles, structured base.",
    defaultFabricSlug: "cotton-canvas-20oz",
    fabricSlugs: ["cotton-canvas-16oz", "cotton-canvas-20oz", "cotton-canvas-24oz"],
    sizes: [{ id: "little", label: "Little", dims: { width: 14, height: 12, depth: 5.5 }, strap: drop(7, 1), priceSize: "medium" }],
    features: ["Structured base", "Front pocket", "Contrast straps (Pantone matched)"],
    standardPockets: ["exterior-front"],
  },
  {
    slug: "boat-tote",
    bagNumber: "08",
    name: "Boat Tote",
    tagline: "The regular. Heavyweight canvas, short handles, structured base.",
    defaultFabricSlug: "cotton-canvas-20oz",
    fabricSlugs: ["cotton-canvas-16oz", "cotton-canvas-20oz", "cotton-canvas-24oz"],
    photo: {
      base: "/build/boat-tote/base.png",
      width: 547,
      height: 885,
      masks: { body: "/build/boat-tote/body.png", trim: "/build/boat-tote/trim.png" },
    },
    sizes: [{ id: "regular", label: "Regular", dims: { width: 17, height: 15, depth: 7.5 }, strap: drop(8, 1), priceSize: "large" }],
    features: ["Structured base", "Front pocket", "Contrast straps (Pantone matched)"],
    standardPockets: ["exterior-front"],
  },
  {
    slug: "daytrip-tote",
    bagNumber: "09",
    name: "Daytrip Tote",
    tagline: "Wide, deep, and heavy. The overnight bag that isn't.",
    defaultFabricSlug: "cotton-canvas-20oz",
    fabricSlugs: ["cotton-canvas-16oz", "cotton-canvas-20oz", "cotton-canvas-24oz"],
    sizes: one({ width: 19.25, height: 14.5, depth: 6 }, self(31), "large"),
    features: ["6\" gusset", "Contrast straps (Pantone matched)"],
  },
  {
    slug: "channel-tote",
    bagNumber: "10-12",
    name: "Channel Tote",
    tagline: "Wrap-around pockets front and back.",
    defaultFabricSlug: "cotton-canvas-16oz",
    fabricSlugs: ["cotton-canvas-16oz", "cotton-canvas-20oz", "denim", "camo"],
    sizes: one({ width: 18.5, height: 13, depth: 7 }, self(26), "large"),
    features: ["7\" gusset", "6\" wrap-around pockets, front and back"],
    standardPockets: ["exterior-front", "exterior-back"],
  },
  {
    slug: "big-sur-tote",
    bagNumber: "13",
    name: "Big Sur Tote",
    tagline: "Tapered base, 24oz canvas. Built like a bucket.",
    defaultFabricSlug: "cotton-canvas-24oz",
    fabricSlugs: ["cotton-canvas-20oz", "cotton-canvas-24oz"],
    sizes: one({ width: 22, height: 11, depth: 4.5 }, self(26, 1), "large"),
    features: ["Tapered base (22\" top, 15\" base)", "Heavy 24oz canvas"],
  },
  {
    slug: "drifter-tote",
    bagNumber: "14-16",
    name: "Drifter Tote",
    tagline: "Wide-strap shoulder tote with a long drop.",
    defaultFabricSlug: "cotton-canvas-16oz",
    fabricSlugs: ["cotton-canvas-16oz", "cotton-canvas-20oz", "denim", "camo"],
    sizes: one({ width: 20, height: 14.5, depth: 5 }, self(32, 2), "large"),
    features: ["2\" wide straps", "12.5\" strap drop", "Zipper closure available"],
  },
  {
    slug: "carry-all-tote",
    bagNumber: "17",
    name: "Carry All Tote",
    tagline: "The big one. Pockets on every side.",
    defaultFabricSlug: "cotton-canvas-20oz",
    fabricSlugs: ["cotton-canvas-16oz", "cotton-canvas-20oz", "cotton-canvas-24oz"],
    sizes: one({ width: 24, height: 17, depth: 7 }, webbing(12.5, 2.5), "large"),
    features: ["Front, back and side pockets", "2.5\" cotton webbing handles"],
    standardPockets: ["exterior-front", "exterior-back", "side-pockets"],
  },
  {
    slug: "zuma-tote",
    bagNumber: "18",
    name: "Zuma Tote",
    tagline: "Tyvek, water-resistant, zippered. Beach and travel.",
    defaultFabricSlug: "tyvek",
    fabricSlugs: ["tyvek"],
    sizes: one({ width: 19.5, height: 14.5, depth: 6 }, nylon(24), "large"),
    features: ["Water-resistant Tyvek", "Zipper closure", "7\" front pocket", "7\" interior pocket"],
    standardPockets: ["exterior-front", "interior-single"],
    standardClosure: "zipper",
  },
  {
    slug: "hauler-tote",
    bagNumber: "19",
    name: "Hauler Tote",
    tagline: "Polypropylene market bag with carry and shoulder straps.",
    defaultFabricSlug: "nylon",
    fabricSlugs: ["nylon", "nylon-ripstop"],
    sizes: one({ width: 20, height: 15, depth: 7 }, nylon(28), "large"),
    features: ["Short carry handles (8\" drop)", "Long shoulder strap (28\")"],
  },
];

export function getCatalogStyle(slug: string) {
  return catalog.find((style) => style.slug === slug);
}
