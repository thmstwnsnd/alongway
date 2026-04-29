import { type Bag, getBagBySlug } from "@/data/bags";
import { addOns } from "@/data/addons";
import { getFabricBySlug } from "@/data/fabrics";

export const ORDER_DRAFT_STORAGE_KEY = "alongway-order-draft";
export const LAST_ORDER_STORAGE_KEY = "alongway-last-order";

export const decorationOptions = [
  "Screen print",
  "Embroidery",
  "Patch",
  "Woven label",
] as const;

export const includedOrderItems = [
  "Main decoration",
  "Interior woven label",
  "Free setup",
  "Free shipping",
] as const;

export type ArtworkStatus = "yes" | "no" | "";
export type ShippingMethod = "standard" | "economy";

export type DecorationType = (typeof decorationOptions)[number] | "";

export type OrderDraft = {
  bagSlug: string;
  quantity: number | null;
  fabricSlug: string;
  addOnIds: string[];
  brandName: string;
  primaryColor: string;
  decorationType: DecorationType;
  notes: string;
  artworkReady: ArtworkStatus;
  shippingMethod: ShippingMethod;
};

export const emptyOrderDraft: OrderDraft = {
  bagSlug: "",
  quantity: null,
  fabricSlug: "cotton-canvas-12oz",
  addOnIds: [],
  brandName: "",
  primaryColor: "",
  decorationType: "",
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

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getUnitPrice(bag: Bag | undefined, quantity: number | null) {
  if (!bag || !quantity) {
    return null;
  }

  // Find the highest tier whose quantity is <= the requested quantity
  // (e.g. qty=350 → uses the 250-unit tier price)
  const sorted = [...bag.pricingTiers].sort((a, b) => b.quantity - a.quantity);
  const tier = sorted.find((entry) => entry.quantity <= quantity);
  if (!tier) {
    // Quantity below minimum — use the lowest tier
    const lowest = sorted[sorted.length - 1];
    return lowest ? Number.parseFloat(lowest.unitPrice.replace("$", "")) : null;
  }

  return Number.parseFloat(tier.unitPrice.replace("$", ""));
}

export function getSelectedAddOns(addOnIds: string[]) {
  return addOns.filter((addOn) => addOnIds.includes(addOn.id));
}

export function getOrderAmounts(order: OrderDraft) {
  const bag = getBagBySlug(order.bagSlug);
  const fabric = getFabricBySlug(order.fabricSlug) ?? getFabricBySlug("cotton-canvas-12oz");
  const selectedAddOns = getSelectedAddOns(order.addOnIds);
  const baseUnitPrice = getUnitPrice(bag, order.quantity);
  const addOnUnitTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.pricePerUnit, 0);
  const shippingOption = shippingOptions[order.shippingMethod];
  const unitPrice =
    baseUnitPrice === null
      ? null
      : baseUnitPrice + (fabric?.upcharge ?? 0) + addOnUnitTotal + shippingOption.perUnitAdjustment;
  const total = unitPrice !== null && order.quantity ? unitPrice * order.quantity : null;
  const shippingSavings =
    order.shippingMethod === "economy" && order.quantity ? Math.abs(shippingOption.perUnitAdjustment) * order.quantity : 0;

  return { bag, fabric, selectedAddOns, baseUnitPrice, addOnUnitTotal, shippingOption, shippingSavings, unitPrice, total };
}
