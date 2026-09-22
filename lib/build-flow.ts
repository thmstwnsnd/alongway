import { type BagSize, customQuoteTier, getBasePriceForSize } from "@/data/bags";
import {
  closureOptions,
  extraOptions,
  handleAddOns,
  pocketOptions,
  stitchOptions,
  strapOptions,
  type BuildOption,
} from "@/data/build-options";
import { catalog, getCatalogStyle, type Dimensions } from "@/data/catalog";
import { getFabricBySlug, getFabricSwatches } from "@/data/fabrics";
import {
  MIN_QUANTITY,
  formatCurrency,
  getDecorationUpcharge,
  getOrderAmounts,
  shippingOptions,
  type DecorationType,
  type OrderDraft,
} from "@/lib/order-flow";

export const BUILD_STORAGE_KEY = "alongway-build";

export type BuildConfig = {
  styleSlug: string;
  sizeId: string;
  customDims: Dimensions | null;
  fabricSlug: string;
  colorName: string;
  strapId: string;
  /** Hex for Pantone-matched straps; ignored otherwise. */
  strapColor: string;
  handleAddOnIds: string[];
  stitchId: string;
  stitchColor: string;
  pocketIds: string[];
  closureId: string;
  extraIds: string[];
  decorationType: DecorationType;
  frontColors: number;
  backColors: number;
  embroideryPlacements: number;
  quantity: number;
};

export function defaultBuild(styleSlug = catalog[0].slug): BuildConfig {
  const style = getCatalogStyle(styleSlug) ?? catalog[0];
  const size = style.sizes[0];
  return {
    styleSlug: style.slug,
    sizeId: size.id,
    customDims: null,
    fabricSlug: style.defaultFabricSlug,
    colorName: getFabricSwatches(style.defaultFabricSlug)[0]?.name ?? "Natural",
    strapId: size.strap.type,
    strapColor: "#364FA0",
    handleAddOnIds: [],
    stitchId: "standard",
    stitchColor: "#364FA0",
    pocketIds: style.standardPockets ?? [],
    closureId: style.standardClosure ?? "none",
    extraIds: [],
    decorationType: "Screen Print",
    frontColors: 1,
    backColors: 0,
    embroideryPlacements: 1,
    quantity: MIN_QUANTITY,
  };
}

/** Switch style but keep every choice that still applies. */
export function applyStyle(build: BuildConfig, styleSlug: string): BuildConfig {
  const fresh = defaultBuild(styleSlug);
  const style = getCatalogStyle(styleSlug)!;
  const keepFabric = style.fabricSlugs.includes(build.fabricSlug);
  return {
    ...fresh,
    fabricSlug: keepFabric ? build.fabricSlug : fresh.fabricSlug,
    colorName: keepFabric ? build.colorName : fresh.colorName,
    stitchId: build.stitchId,
    stitchColor: build.stitchColor,
    strapColor: build.strapColor,
    handleAddOnIds: build.handleAddOnIds,
    extraIds: build.extraIds,
    decorationType: build.decorationType,
    frontColors: build.frontColors,
    backColors: build.backColors,
    embroideryPlacements: build.embroideryPlacements,
    quantity: build.quantity,
  };
}

const sum = (options: BuildOption[], ids: string[]) =>
  options.filter((o) => ids.includes(o.id)).reduce((t, o) => t + o.pricePerUnit, 0);

const one = (options: BuildOption[], id: string) => options.find((o) => o.id === id)?.pricePerUnit ?? 0;

export function resolveBuild(build: BuildConfig) {
  const style = getCatalogStyle(build.styleSlug) ?? catalog[0];
  const size = style.sizes.find((s) => s.id === build.sizeId) ?? style.sizes[0];
  const fabric = getFabricBySlug(build.fabricSlug) ?? getFabricBySlug(style.defaultFabricSlug)!;
  const swatch = getFabricSwatches(fabric.slug).find((s) => s.name === build.colorName) ?? getFabricSwatches(fabric.slug)[0];
  const dims = build.customDims ?? size.dims;
  const isCustomSize = build.customDims !== null;
  const isCustomQuote = isCustomSize || build.quantity >= customQuoteTier;

  const priceSize: BagSize = size.priceSize;
  const base = getBasePriceForSize(priceSize, build.quantity);
  const standardPockets = style.standardPockets ?? [];
  const chargeablePockets = build.pocketIds.filter((id) => !standardPockets.includes(id));
  const closureCharge = build.closureId === style.standardClosure ? 0 : one(closureOptions, build.closureId);
  const strapCharge = build.strapId === size.strap.type ? 0 : one(strapOptions, build.strapId);

  const lines = [
    { label: "Base", amount: base },
    { label: "Fabric", amount: fabric.upcharge },
    { label: "Straps", amount: strapCharge },
    { label: "Handle add-ons", amount: sum(handleAddOns, build.handleAddOnIds) },
    { label: "Stitching", amount: one(stitchOptions, build.stitchId) },
    { label: "Pockets", amount: sum(pocketOptions, chargeablePockets) },
    { label: "Closure", amount: closureCharge },
    { label: "Decoration", amount: getDecorationUpcharge(build) },
    { label: "Labels & extras", amount: sum(extraOptions, build.extraIds) },
  ];
  const unitPrice = lines.reduce((t, l) => t + l.amount, 0);

  const bodyHex = swatch?.hex ?? "#E8DFC9";
  const strapHex = build.handleAddOnIds.includes("pantone-straps")
    ? build.strapColor
    : build.strapId === "cotton-webbing"
      ? "#E8DFC9"
      : build.strapId === "nylon"
        ? "#262626"
        : bodyHex;

  return {
    style,
    size,
    dims,
    fabric,
    swatch,
    bodyHex,
    strapHex,
    isCustomSize,
    isCustomQuote,
    lines,
    unitPrice,
    total: unitPrice * build.quantity,
  };
}

export function buildSummaryText(build: BuildConfig) {
  const r = resolveBuild(build);
  const label = (options: BuildOption[], ids: string[]) =>
    options.filter((o) => ids.includes(o.id)).map((o) => o.label).join(", ") || "None";
  const d = r.dims;
  return [
    `Style: ${r.style.name} (BAG ${r.style.bagNumber})`,
    `Size: ${r.isCustomSize ? "Custom" : r.size.label} — ${d.width}"W x ${d.height}"H x ${d.depth}"D`,
    `Fabric: ${r.fabric.name}, ${r.swatch?.name ?? build.colorName}`,
    `Straps: ${strapOptions.find((o) => o.id === build.strapId)?.label}; add-ons: ${label(handleAddOns, build.handleAddOnIds)}`,
    `Stitching: ${stitchOptions.find((o) => o.id === build.stitchId)?.label}${build.stitchId === "standard" ? "" : ` (${build.stitchColor})`}`,
    `Pockets: ${label(pocketOptions, build.pocketIds)}`,
    `Closure: ${closureOptions.find((o) => o.id === build.closureId)?.label}`,
    `Labels & extras: ${label(extraOptions, build.extraIds)}`,
    `Decoration: ${build.decorationType}`,
    `Quantity: ${build.quantity.toLocaleString()}`,
    r.isCustomQuote ? "Custom quote requested." : `Estimated: ${formatCurrency(r.unitPrice)}/unit, ${formatCurrency(r.total)} total`,
  ].join("\n");
}

/** Turn a build into an order draft for checkout. */
export function buildToOrderDraft(build: BuildConfig, base: OrderDraft): OrderDraft {
  const r = resolveBuild(build);
  return {
    ...base,
    build,
    bagSlug: r.style.slug,
    quantity: build.quantity,
    fabricSlug: build.fabricSlug,
    addOnIds: [],
    decorationType: build.decorationType,
    frontColors: build.frontColors,
    backColors: build.backColors,
    embroideryPlacements: build.embroideryPlacements,
    primaryColor: r.swatch?.name ?? build.colorName,
    notes: buildSummaryText(build),
  };
}

/** Amounts for checkout: build-priced when the draft came from the builder, otherwise the classic flow. */
export function getCheckoutAmounts(order: OrderDraft) {
  if (!order.build) return getOrderAmounts(order);
  const r = resolveBuild({ ...order.build, quantity: order.quantity ?? order.build.quantity });
  const shippingOption = shippingOptions[order.shippingMethod];
  const unitPrice = r.unitPrice + shippingOption.perUnitAdjustment;
  const quantity = order.quantity ?? order.build.quantity;
  const total = quantity ? unitPrice * quantity : null;
  const shippingSavings = order.shippingMethod === "economy" && quantity ? Math.abs(shippingOption.perUnitAdjustment) * quantity : 0;
  return {
    bag: { name: r.style.name, slug: r.style.slug },
    fabric: r.fabric,
    selectedAddOns: [],
    baseUnitPrice: r.lines[0]?.amount ?? null,
    fabricUpcharge: r.fabric.upcharge,
    decorationUpcharge: getDecorationUpcharge(order.build),
    addOnUnitTotal: 0,
    shippingOption,
    shippingSavings,
    unitPrice,
    total,
  };
}
