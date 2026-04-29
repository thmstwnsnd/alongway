export type FabricTier = "starter" | "upgrade1" | "upgrade2" | "upgrade3";

export type Fabric = {
  slug: string;
  name: string;
  category: string;
  tier: FabricTier;
  upcharge: number;
  description: string;
  weightOrStyle?: string;
  swatchCount: number;
};

export type FabricSwatch = {
  name: string;
  hex: string;
};

type TierMeta = {
  label: string;
  badgeClassName: string;
};

const canvasPalette: FabricSwatch[] = [
  { name: "Natural", hex: "#E8DFC9" },
  { name: "Cream", hex: "#F4EBDD" },
  { name: "Oatmeal", hex: "#D7C6A8" },
  { name: "Stone", hex: "#B7AD9B" },
  { name: "Mushroom", hex: "#9B8D7A" },
  { name: "Camel", hex: "#BE8E55" },
  { name: "Saddle", hex: "#9D6A3A" },
  { name: "Chocolate", hex: "#5A3A2A" },
  { name: "Espresso", hex: "#38251E" },
  { name: "Black", hex: "#222222" },
  { name: "Fog", hex: "#C3C6C5" },
  { name: "Slate", hex: "#66707A" },
  { name: "Navy", hex: "#24395D" },
  { name: "Marine", hex: "#34556D" },
  { name: "Sky", hex: "#6D95B9" },
  { name: "Powder Blue", hex: "#B8CAD5" },
  { name: "Sage", hex: "#9DA88A" },
  { name: "Olive", hex: "#6B7346" },
  { name: "Forest", hex: "#33523C" },
  { name: "Pine", hex: "#214033" },
  { name: "Seafoam", hex: "#B8D1C1" },
  { name: "Mint", hex: "#C7DAB9" },
  { name: "Clay", hex: "#B26F4D" },
  { name: "Rust", hex: "#A14E30" },
  { name: "Terracotta", hex: "#C46E49" },
  { name: "Brick", hex: "#8E4332" },
  { name: "Rosewood", hex: "#7C4A52" },
  { name: "Blush", hex: "#D6AAA3" },
  { name: "Dusty Pink", hex: "#C59295" },
  { name: "Marigold", hex: "#D19A35" },
  { name: "Ochre", hex: "#BA853A" },
  { name: "Gold", hex: "#9F7B25" },
  { name: "Lavender", hex: "#B1A7BD" },
  { name: "Plum", hex: "#6C5468" },
  { name: "Burgundy", hex: "#692E39" },
  { name: "Crimson", hex: "#8D3C46" },
  { name: "Coral", hex: "#D07D68" },
  { name: "Cypress", hex: "#546251" },
  { name: "Pebble", hex: "#8B8378" },
  { name: "Charcoal", hex: "#444444" },
];

const denimPalette: FabricSwatch[] = [
  { name: "Rinse", hex: "#1F2B44" },
  { name: "Raw Indigo", hex: "#1E3463" },
  { name: "Mid Indigo", hex: "#30538B" },
  { name: "Vintage Blue", hex: "#5473A2" },
  { name: "Stone Wash", hex: "#88A1BF" },
  { name: "Powder Wash", hex: "#B9C8D8" },
  { name: "Faded Sky", hex: "#D5DFE7" },
  { name: "Black Denim", hex: "#2A2A31" },
  { name: "Coal", hex: "#3C4654" },
  { name: "Grey Wash", hex: "#9098A1" },
  { name: "Ecru", hex: "#E6D8C1" },
  { name: "Sand Wash", hex: "#C2B29E" },
  { name: "Clay Indigo", hex: "#78645D" },
  { name: "Dust Blue", hex: "#6F8094" },
  { name: "Storm", hex: "#506173" },
];

const thickCordPalette: FabricSwatch[] = [
  { name: "Cream", hex: "#F1E8D8" },
  { name: "Camel", hex: "#B88856" },
  { name: "Tobacco", hex: "#8B603E" },
  { name: "Chestnut", hex: "#6F4934" },
  { name: "Walnut", hex: "#583626" },
  { name: "Forest", hex: "#304C3C" },
  { name: "Moss", hex: "#6E7C4B" },
  { name: "Olive", hex: "#82804A" },
  { name: "Mustard", hex: "#BF9130" },
  { name: "Rust", hex: "#A8552E" },
  { name: "Brick", hex: "#8E4737" },
  { name: "Rosewood", hex: "#7B4B58" },
  { name: "Plum", hex: "#69495E" },
  { name: "Navy", hex: "#293B5F" },
  { name: "Atlantic", hex: "#395A74" },
  { name: "Smoke", hex: "#8F8B83" },
  { name: "Slate", hex: "#6E7278" },
  { name: "Charcoal", hex: "#444244" },
  { name: "Black", hex: "#232323" },
  { name: "Stone", hex: "#B9AD96" },
];

const thinCordPalette: FabricSwatch[] = [
  { name: "Ivory", hex: "#F5EBDD" },
  { name: "Sand", hex: "#D8C7A8" },
  { name: "Taupe", hex: "#AD967C" },
  { name: "Cocoa", hex: "#71513A" },
  { name: "Coffee", hex: "#5B4030" },
  { name: "Black", hex: "#242424" },
  { name: "Mist", hex: "#C9CDC8" },
  { name: "Slate", hex: "#6A7078" },
  { name: "Navy", hex: "#223656" },
  { name: "Petrol", hex: "#355A64" },
  { name: "Sage", hex: "#A0A88F" },
  { name: "Olive", hex: "#6F7547" },
  { name: "Pine", hex: "#33453A" },
  { name: "Dust Rose", hex: "#C59FA0" },
  { name: "Clay", hex: "#BD7757" },
  { name: "Terracotta", hex: "#C16E4B" },
  { name: "Burgundy", hex: "#6C2F3B" },
  { name: "Mustard", hex: "#C19032" },
  { name: "Lilac", hex: "#B7A6BE" },
  { name: "Fog Blue", hex: "#93A8BA" },
];

const nylonPalette: FabricSwatch[] = [
  { name: "Black", hex: "#1F1F1F" },
  { name: "Graphite", hex: "#4D565D" },
  { name: "Slate", hex: "#687179" },
  { name: "Silver", hex: "#BCC0C4" },
  { name: "Ice", hex: "#D8E1E5" },
  { name: "Navy", hex: "#20355B" },
  { name: "Royal", hex: "#2955A3" },
  { name: "Cobalt", hex: "#3E67BC" },
  { name: "Mist Blue", hex: "#9CB6CF" },
  { name: "Forest", hex: "#244338" },
  { name: "Olive", hex: "#636B41" },
  { name: "Sage", hex: "#9FAB96" },
  { name: "Hunter", hex: "#314E31" },
  { name: "Khaki", hex: "#A59263" },
  { name: "Sand", hex: "#C6B591" },
  { name: "Camel", hex: "#B78451" },
  { name: "Rust", hex: "#A95A34" },
  { name: "Safety Orange", hex: "#D46B2A" },
  { name: "Red Clay", hex: "#9D4A3D" },
  { name: "Burgundy", hex: "#6A2D38" },
  { name: "Plum", hex: "#5D455B" },
  { name: "Lavender Grey", hex: "#B4AFBD" },
  { name: "Blush", hex: "#D4B0AA" },
  { name: "Cream", hex: "#EFE4D5" },
  { name: "Bone", hex: "#D7CEBF" },
];

const ripstopPalette: FabricSwatch[] = [
  { name: "Black Grid", hex: "#212225" },
  { name: "Graphite Grid", hex: "#555E67" },
  { name: "Silver Grid", hex: "#B9BEC2" },
  { name: "Storm Grid", hex: "#70808E" },
  { name: "Navy Grid", hex: "#273D68" },
  { name: "Cobalt Grid", hex: "#2F63A3" },
  { name: "Forest Grid", hex: "#29463A" },
  { name: "Olive Grid", hex: "#697146" },
  { name: "Khaki Grid", hex: "#9F9362" },
  { name: "Stone Grid", hex: "#B2AB9E" },
  { name: "Rust Grid", hex: "#A25B3A" },
  { name: "Clay Grid", hex: "#B5755F" },
  { name: "Brick Grid", hex: "#8E4237" },
  { name: "Sand Grid", hex: "#D3C7B0" },
  { name: "Ice Grid", hex: "#DDE5E6" },
];

const organicPalette: FabricSwatch[] = [
  { name: "Unbleached", hex: "#E9DFC6" },
  { name: "Seed", hex: "#E1D1B6" },
  { name: "Flax", hex: "#C3B091" },
  { name: "Hemp", hex: "#A48E67" },
  { name: "Sand", hex: "#D5C5A7" },
  { name: "Stone", hex: "#B9AC93" },
  { name: "Moss", hex: "#7C7E58" },
  { name: "Sage", hex: "#A5AF93" },
  { name: "Olive", hex: "#667046" },
  { name: "Forest", hex: "#35503B" },
  { name: "Clay", hex: "#BA795A" },
  { name: "Rust", hex: "#A25239" },
  { name: "Adobe", hex: "#C28C6F" },
  { name: "Sky", hex: "#A6BECD" },
  { name: "Lake", hex: "#617E98" },
  { name: "Indigo", hex: "#324A73" },
  { name: "Ash", hex: "#BFC2BC" },
  { name: "Charcoal", hex: "#4B4E4B" },
  { name: "Cocoa", hex: "#6A5344" },
  { name: "Black Tea", hex: "#34312E" },
];

const tyvekPalette: FabricSwatch[] = [
  { name: "Soft White", hex: "#F7F4EE" },
  { name: "Parchment", hex: "#E9E3D9" },
  { name: "Silver", hex: "#C3C6C8" },
  { name: "Concrete", hex: "#94989C" },
  { name: "Slate", hex: "#667078" },
  { name: "Coal", hex: "#34373B" },
  { name: "Clay", hex: "#B67D64" },
  { name: "Navy", hex: "#2A3C5C" },
  { name: "Olive", hex: "#6F744E" },
  { name: "Ice Blue", hex: "#D4DDE5" },
];

const camoPalette: FabricSwatch[] = [
  { name: "Woodland", hex: "#596149" },
  { name: "Olive Drab", hex: "#727044" },
  { name: "Khaki", hex: "#A18C62" },
  { name: "Bark", hex: "#67513E" },
  { name: "Moss", hex: "#6E7C56" },
  { name: "Smoke", hex: "#8E877C" },
  { name: "Charcoal", hex: "#4A4943" },
  { name: "Night Camo", hex: "#2B312E" },
];

const twillPalette: FabricSwatch[] = [
  { name: "Natural", hex: "#EADFCE" },
  { name: "Cream", hex: "#F0E8DA" },
  { name: "Sand", hex: "#D8C6A6" },
  { name: "Khaki", hex: "#B69F73" },
  { name: "Camel", hex: "#B8844D" },
  { name: "Cocoa", hex: "#765338" },
  { name: "Black", hex: "#252525" },
  { name: "Fog", hex: "#C8CAC5" },
  { name: "Slate", hex: "#747B83" },
  { name: "Navy", hex: "#243A5F" },
  { name: "French Blue", hex: "#4A739F" },
  { name: "Sky", hex: "#A5BCD3" },
  { name: "Sage", hex: "#A3AC92" },
  { name: "Olive", hex: "#6A7346" },
  { name: "Forest", hex: "#31503C" },
  { name: "Mint", hex: "#C9D7C0" },
  { name: "Rose", hex: "#D0A8A1" },
  { name: "Terracotta", hex: "#C37250" },
  { name: "Rust", hex: "#A65135" },
  { name: "Brick", hex: "#96453A" },
  { name: "Marigold", hex: "#CF972E" },
  { name: "Ochre", hex: "#AF7F29" },
  { name: "Plum", hex: "#6B5165" },
  { name: "Burgundy", hex: "#6E2E38" },
  { name: "Stone Blue", hex: "#8093A4" },
];

const waxedPalette: FabricSwatch[] = [
  { name: "Tan Wax", hex: "#BA8A58" },
  { name: "Field Khaki", hex: "#9A8259" },
  { name: "Olive Wax", hex: "#636441" },
  { name: "Moss Wax", hex: "#54614A" },
  { name: "Forest Wax", hex: "#394636" },
  { name: "Navy Wax", hex: "#233655" },
  { name: "Slate Wax", hex: "#5F6668" },
  { name: "Charcoal Wax", hex: "#474340" },
  { name: "Bark Wax", hex: "#6C4B3B" },
  { name: "Chestnut Wax", hex: "#835A42" },
  { name: "Oxblood Wax", hex: "#6A3230" },
  { name: "Black Wax", hex: "#20201F" },
];

const paletteBySlug: Record<string, FabricSwatch[]> = {
  "cotton-canvas-10oz": canvasPalette.slice(0, 20),
  "cotton-canvas-12oz": canvasPalette,
  "cotton-canvas-14oz": canvasPalette.slice(0, 30),
  "cotton-canvas-16oz": canvasPalette.slice(10, 40),
  "cotton-canvas-18oz": canvasPalette.slice(0, 20),
  "cotton-canvas-20oz": canvasPalette.slice(5, 25),
  "cotton-canvas-24oz": canvasPalette.slice(0, 15),
  denim: denimPalette,
  "corduroy-thick": thickCordPalette,
  "corduroy-thin": thinCordPalette,
  nylon: nylonPalette,
  "nylon-ripstop": ripstopPalette,
  "organic-cotton": organicPalette,
  tyvek: tyvekPalette,
  camo: camoPalette,
  "cotton-twill": twillPalette,
  ripstop: ripstopPalette,
  "waxed-canvas": waxedPalette,
};

const texturePhotosBySlug: Record<string, string> = {
  "cotton-canvas-10oz": "1512436991641-6745cdb1723f",
  "cotton-canvas-12oz": "1512436991641-6745cdb1723f",
  "cotton-canvas-14oz": "1512436991641-6745cdb1723f",
  "cotton-canvas-16oz": "1512436991641-6745cdb1723f",
  "cotton-canvas-18oz": "1512436991641-6745cdb1723f",
  "cotton-canvas-20oz": "1512436991641-6745cdb1723f",
  "cotton-canvas-24oz": "1512436991641-6745cdb1723f",
  denim: "1541099649105-f69ad21f3246",
  "corduroy-thick": "1517841905240-472988babdf9",
  "corduroy-thin": "1517841905240-472988babdf9",
  nylon: "1521572267360-ee0c2909d518",
  "nylon-ripstop": "1521572267360-ee0c2909d518",
  "organic-cotton": "1483985988355-763728e1935b",
  tyvek: "1500530855697-b586d89ba3ee",
  camo: "1500534623283-312aade485b7",
  "cotton-twill": "1483985988355-763728e1935b",
  ripstop: "1521572267360-ee0c2909d518",
  "waxed-canvas": "1516826957135-700dedea698c",
};

export const fabricTierMeta: Record<FabricTier, TierMeta> = {
  starter: {
    label: "Starter",
    badgeClassName: "bg-green-100 text-green-800 border-green-200",
  },
  upgrade1: {
    label: "Upgrade 1",
    badgeClassName: "bg-blue-100 text-blue-800 border-blue-200",
  },
  upgrade2: {
    label: "Upgrade 2",
    badgeClassName: "bg-blue-100 text-kelly-800 border-blue-200",
  },
  upgrade3: {
    label: "Upgrade 3",
    badgeClassName: "bg-red-100 text-red-800 border-red-200",
  },
};

export const fabrics: Fabric[] = [
  {
    slug: "cotton-canvas-10oz",
    name: "10oz Cotton Canvas",
    category: "Cotton Canvas",
    tier: "starter",
    upcharge: 0,
    description: "Lightweight and versatile. Great for everyday totes and promotional bags.",
    weightOrStyle: "10oz",
    swatchCount: 20,
  },
  {
    slug: "cotton-canvas-12oz",
    name: "12oz Cotton Canvas",
    category: "Cotton Canvas",
    tier: "starter",
    upcharge: 0,
    description: "Our most popular weight. Durable enough for daily use, soft enough to print clean.",
    weightOrStyle: "12oz",
    swatchCount: 40,
  },
  {
    slug: "cotton-canvas-14oz",
    name: "14oz Cotton Canvas",
    category: "Cotton Canvas",
    tier: "upgrade1",
    upcharge: 1.5,
    description: "Heavier hand feel than 12oz. More structure, more substance.",
    weightOrStyle: "14oz",
    swatchCount: 30,
  },
  {
    slug: "cotton-canvas-16oz",
    name: "16oz Cotton Canvas",
    category: "Cotton Canvas",
    tier: "upgrade1",
    upcharge: 1.5,
    description: "Noticeably heavier. Holds shape well, great for structured styles.",
    weightOrStyle: "16oz",
    swatchCount: 30,
  },
  {
    slug: "cotton-canvas-18oz",
    name: "18oz Cotton Canvas",
    category: "Cotton Canvas",
    tier: "upgrade2",
    upcharge: 2.5,
    description: "Premium weight. Used in high-end retail bags. Serious substance.",
    weightOrStyle: "18oz",
    swatchCount: 20,
  },
  {
    slug: "cotton-canvas-20oz",
    name: "20oz Cotton Canvas",
    category: "Cotton Canvas",
    tier: "upgrade2",
    upcharge: 2.5,
    description: "Heavy duty. Structured, premium, built to last years.",
    weightOrStyle: "20oz",
    swatchCount: 20,
  },
  {
    slug: "cotton-canvas-24oz",
    name: "24oz Cotton Canvas",
    category: "Cotton Canvas",
    tier: "upgrade3",
    upcharge: 4,
    description: "Our heaviest canvas. Used in the Channel Tote. Maximum structure and longevity.",
    weightOrStyle: "24oz",
    swatchCount: 15,
  },
  {
    slug: "denim",
    name: "Denim",
    category: "Denim",
    tier: "starter",
    upcharge: 0,
    description: "Classic denim construction. Distinctive texture and fade character.",
    swatchCount: 15,
  },
  {
    slug: "corduroy-thick",
    name: "Thick Wale Corduroy",
    category: "Corduroy",
    tier: "starter",
    upcharge: 0,
    description: "Bold ridges, rich texture. Stands out on a shelf.",
    weightOrStyle: "Thick wale",
    swatchCount: 20,
  },
  {
    slug: "corduroy-thin",
    name: "Thin Wale Corduroy",
    category: "Corduroy",
    tier: "starter",
    upcharge: 0,
    description: "Finer texture than thick wale. More refined, easier to print on.",
    weightOrStyle: "Thin wale",
    swatchCount: 20,
  },
  {
    slug: "nylon",
    name: "Nylon",
    category: "Nylon",
    tier: "starter",
    upcharge: 0,
    description: "Clean, smooth, water-resistant. Great for structured and utility styles.",
    swatchCount: 25,
  },
  {
    slug: "nylon-ripstop",
    name: "Nylon Ripstop",
    category: "Nylon",
    tier: "upgrade1",
    upcharge: 1.5,
    description: "Reinforced grid weave. Tear-resistant and lightweight.",
    swatchCount: 15,
  },
  {
    slug: "organic-cotton",
    name: "Organic Cotton Canvas",
    category: "Cotton Canvas",
    tier: "upgrade1",
    upcharge: 1.5,
    description: "GOTS-certified organic cotton. For brands that care about the supply chain.",
    swatchCount: 20,
  },
  {
    slug: "tyvek",
    name: "Tyvek",
    category: "Technical",
    tier: "upgrade1",
    upcharge: 1.5,
    description: "Synthetic, water-resistant, tear-resistant. Distinctive crinkle texture.",
    swatchCount: 10,
  },
  {
    slug: "camo",
    name: "Camo Print Canvas",
    category: "Printed Canvas",
    tier: "starter",
    upcharge: 0,
    description: "Classic camo pattern on canvas. Printed or woven — bold and recognizable.",
    swatchCount: 8,
  },
  {
    slug: "cotton-twill",
    name: "Cotton Twill",
    category: "Cotton Twill",
    tier: "starter",
    upcharge: 0,
    description: "Diagonal weave gives it a soft drape and clean print surface.",
    swatchCount: 25,
  },
  {
    slug: "ripstop",
    name: "Ripstop Canvas",
    category: "Canvas",
    tier: "upgrade1",
    upcharge: 1.5,
    description: "Grid-reinforced canvas. Lightweight but tough.",
    swatchCount: 15,
  },
  {
    slug: "waxed-canvas",
    name: "Waxed Canvas",
    category: "Canvas",
    tier: "upgrade2",
    upcharge: 2.5,
    description: "Traditional waxed finish. Water-resistant, develops a patina over time.",
    swatchCount: 12,
  },
];

export function getFabricBySlug(slug: string) {
  return fabrics.find((fabric) => fabric.slug === slug);
}

export function getFabricSwatches(slug: string) {
  return paletteBySlug[slug] ?? [];
}

export function getFabricTextureImageUrl(slug: string) {
  const photoId = texturePhotosBySlug[slug] ?? "1512436991641-6745cdb1723f";
  return `https://images.unsplash.com/photo-${photoId}?w=1200&h=900&q=80&fit=crop&auto=format`;
}
