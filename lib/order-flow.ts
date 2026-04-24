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
};

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

  const tier = bag.pricingTiers.find((entry) => entry.quantity === quantity);
  if (!tier) {
    return null;
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
  const unitPrice = baseUnitPrice === null ? null : baseUnitPrice + (fabric?.upcharge ?? 0) + addOnUnitTotal;
  const total = unitPrice !== null && order.quantity ? unitPrice * order.quantity : null;

  return { bag, fabric, selectedAddOns, baseUnitPrice, addOnUnitTotal, unitPrice, total };
}
