import { type Bag, getBagBySlug } from "@/data/bags";
import { addOns } from "@/data/addons";
import { getFabricBySlug } from "@/data/fabrics";
import type { BuildConfig } from "@/lib/build-flow";

export const ORDER_DRAFT_STORAGE_KEY = "alongway-order-draft";
export const LAST_ORDER_STORAGE_KEY = "alongway-last-order";
export const DEFAULT_FABRIC_SLUG = "cotton-canvas-12oz";
export const MIN_QUANTITY = 100;

// ---------------------------------------------------------------------------
// Decoration options (single source of truth for configurator, shop, checkout)
// ---------------------------------------------------------------------------

export const decorationOptions = ["Screen Print", "Embroidery", "Patch", "Woven Label"] as const;
export type DecorationType = (typeof decorationOptions)[number] | "";

export type PricedOption = { label: string; value: number; upcharge: number };

export const frontColorOptions: readonly PricedOption[] = [
  { label: "1 color", value: 1, upcharge: 0 },
  { label: "2 colors", value: 2, upcharge: 0.35 },
  { label: "3 colors", value: 3, upcharge: 0.7 },
  { label: "4 colors", value: 4, upcharge: 1.05 },
];

export const backColorOptions: readonly PricedOption[] = [
  { label: "None", value: 0, upcharge: 0 },
  { label: "1 color", value: 1, upcharge: 0.3 },
  { label: "2 colors", value: 2, upcharge: 0.6 },
  { label: "3 colors", value: 3, upcharge: 0.9 },
];

export const embroideryPlacementOptions: readonly PricedOption[] = [
  { label: "One placement", value: 1, upcharge: 0 },
  { label: "Two placements", value: 2, upcharge: 1.25 },
];

export const includedOrderItems = [
  "Main decoration",
  "Interior woven label",
  "Free setup",
  "Free shipping",
] as const;

// ---------------------------------------------------------------------------
// Order draft
// ---------------------------------------------------------------------------

export type ArtworkStatus = "yes" | "no" | "";
export type ShippingMethod = "standard" | "economy";

export type OrderDraft = {
  /** Set when the order came from Build a Bag; pricing and naming then come from the build. */
  build?: BuildConfig | null;
  bagSlug: string;
  quantity: number | null;
  fabricSlug: string;
  addOnIds: string[];
  decorationType: DecorationType;
  frontColors: number;
  backColors: number;
  embroideryPlacements: number;
  brandName: string;
  primaryColor: string;
  notes: string;
  artworkReady: ArtworkStatus;
  shippingMethod: ShippingMethod;
};

export const emptyOrderDraft: OrderDraft = {
  build: null,
  bagSlug: "",
  quantity: null,
  fabricSlug: DEFAULT_FABRIC_SLUG,
  addOnIds: [],
  decorationType: "",
  frontColors: 1,
  backColors: 0,
  embroideryPlacements: 1,
  brandName: "",
  primaryColor: "",
  notes: "",
  artworkReady: "",
  shippingMethod: "standard",
};

export const shippingOptions = {
  standard: {
    id: "standard",
    label: "Standard (Air Shipping)",
    description: "Included in price, ~2-3 weeks from production complete",
    perUnitAdjustment: 0,
  },
  economy: {
    id: "economy",
    label: "Economy (Sea Freight)",
    description: "Subtract $2/unit from total, +30-35 days transit",
    perUnitAdjustment: -2,
  },
} as const;

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Base unit price for a bag at a quantity. Quantities between tiers use the tier below. */
export function getUnitPrice(bag: Bag | undefined, quantity: number | null) {
  if (!bag || !quantity) return null;

  const sorted = [...bag.pricingTiers].sort((a, b) => b.quantity - a.quantity);
  const tier = sorted.find((entry) => entry.quantity <= quantity) ?? sorted[sorted.length - 1];
  return tier ? Number.parseFloat(tier.unitPrice.replace("$", "")) : null;
}

export function getSelectedAddOns(addOnIds: string[]) {
  return addOns.filter((addOn) => addOnIds.includes(addOn.id));
}

function findUpcharge(options: readonly PricedOption[], value: number) {
  return options.find((option) => option.value === value)?.upcharge ?? 0;
}

type DecorationSelection = Pick<OrderDraft, "decorationType" | "frontColors" | "backColors" | "embroideryPlacements">;

/** Per-unit upcharge for the chosen decoration beyond the included 1-color front print. */
export function getDecorationUpcharge(d: DecorationSelection) {
  if (d.decorationType === "Screen Print") {
    return findUpcharge(frontColorOptions, d.frontColors) + findUpcharge(backColorOptions, d.backColors);
  }
  if (d.decorationType === "Embroidery") {
    return findUpcharge(embroideryPlacementOptions, d.embroideryPlacements);
  }
  return 0;
}

export function getDecorationSummary(d: DecorationSelection) {
  const plural = (n: number) => `${n} color${n === 1 ? "" : "s"}`;
  if (d.decorationType === "Screen Print") {
    const back = d.backColors === 0 ? "none" : plural(d.backColors);
    return `Screen Print · Front ${plural(d.frontColors)} · Back ${back}`;
  }
  if (d.decorationType === "Embroidery") {
    return `Embroidery · ${d.embroideryPlacements === 1 ? "One placement" : "Two placements"}`;
  }
  return d.decorationType;
}

export function getOrderAmounts(order: OrderDraft) {
  const bag = getBagBySlug(order.bagSlug);
  const fabric = getFabricBySlug(order.fabricSlug) ?? getFabricBySlug(DEFAULT_FABRIC_SLUG);
  const selectedAddOns = getSelectedAddOns(order.addOnIds);
  const shippingOption = shippingOptions[order.shippingMethod];

  const baseUnitPrice = getUnitPrice(bag, order.quantity);
  const fabricUpcharge = fabric?.upcharge ?? 0;
  const decorationUpcharge = getDecorationUpcharge(order);
  const addOnUnitTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.pricePerUnit, 0);

  const unitPrice =
    baseUnitPrice === null
      ? null
      : baseUnitPrice + fabricUpcharge + decorationUpcharge + addOnUnitTotal + shippingOption.perUnitAdjustment;
  const total = unitPrice !== null && order.quantity ? unitPrice * order.quantity : null;
  const shippingSavings =
    order.shippingMethod === "economy" && order.quantity
      ? Math.abs(shippingOption.perUnitAdjustment) * order.quantity
      : 0;

  return {
    bag,
    fabric,
    selectedAddOns,
    baseUnitPrice,
    fabricUpcharge,
    decorationUpcharge,
    addOnUnitTotal,
    shippingOption,
    shippingSavings,
    unitPrice,
    total,
  };
}

// ---------------------------------------------------------------------------
// URL handoff (configurator -> /shop)
// ---------------------------------------------------------------------------

/** Serialize the priced parts of a draft into query params for /shop. */
export function buildOrderParams(order: Partial<OrderDraft> & { bagSlug: string }) {
  const params = new URLSearchParams({ bag: order.bagSlug });
  if (order.quantity) params.set("quantity", String(order.quantity));
  if (order.fabricSlug) params.set("fabric", order.fabricSlug);
  if (order.decorationType) params.set("decoration", order.decorationType);
  if (order.addOnIds?.length) params.set("addons", order.addOnIds.join(","));
  if (order.decorationType === "Screen Print") {
    params.set("frontColors", String(order.frontColors ?? 1));
    params.set("backColors", String(order.backColors ?? 0));
  }
  if (order.decorationType === "Embroidery") {
    params.set("embroideryPlacements", String(order.embroideryPlacements ?? 1));
  }
  return params;
}

/** Apply query params onto a draft, validating each value against known data. */
export function applyOrderParams(base: OrderDraft, params: URLSearchParams): OrderDraft {
  const next = { ...base };
  const int = (key: string) => {
    const n = Number.parseInt(params.get(key) ?? "", 10);
    return Number.isFinite(n) ? n : null;
  };

  const bag = params.get("bag");
  if (bag && getBagBySlug(bag)) next.bagSlug = bag;

  const quantity = int("quantity");
  if (quantity !== null) next.quantity = quantity;

  const fabric = params.get("fabric");
  if (fabric && getFabricBySlug(fabric)) next.fabricSlug = fabric;

  const addons = params.get("addons");
  if (addons) next.addOnIds = addons.split(",").filter((id) => addOns.some((a) => a.id === id));

  const decoration = params.get("decoration");
  if (decoration && (decorationOptions as readonly string[]).includes(decoration)) {
    next.decorationType = decoration as DecorationType;
  }

  const front = int("frontColors");
  if (front !== null && frontColorOptions.some((o) => o.value === front)) next.frontColors = front;

  const back = int("backColors");
  if (back !== null && backColorOptions.some((o) => o.value === back)) next.backColors = back;

  const placements = int("embroideryPlacements");
  if (placements !== null && embroideryPlacementOptions.some((o) => o.value === placements)) {
    next.embroideryPlacements = placements;
  }

  return next;
}
