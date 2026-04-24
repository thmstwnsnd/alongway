import { type Bag, getBagBySlug } from "@/data/bags";

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
  brandName: string;
  primaryColor: string;
  decorationType: DecorationType;
  notes: string;
  artworkReady: ArtworkStatus;
};

export const emptyOrderDraft: OrderDraft = {
  bagSlug: "",
  quantity: null,
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

export function getOrderAmounts(order: OrderDraft) {
  const bag = getBagBySlug(order.bagSlug);
  const unitPrice = getUnitPrice(bag, order.quantity);
  const total = unitPrice && order.quantity ? unitPrice * order.quantity : null;

  return { bag, unitPrice, total };
}
