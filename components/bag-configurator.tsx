"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import type { Bag } from "@/data/bags";
import { addOns } from "@/data/addons";
import { fabricTierMeta, fabrics, type FabricTier } from "@/data/fabrics";
import { formatCurrency, getUnitPrice } from "@/lib/order-flow";
import { lookupPantone } from "@/data/pantone";

const defaultFabricSlug = "cotton-canvas-12oz";
const quantityOptions = [100, 250, 500, 1000, 2000];
const CUSTOM_QUOTE_KEY = "5000+";
const tierOrder: FabricTier[] = ["starter", "upgrade1", "upgrade2", "upgrade3"];
const decorationTypes = ["Screen Print", "Embroidery", "Patch", "Woven Label"] as const;
const frontColorOptions = [
  { label: "1 color", value: 1, upcharge: 0 },
  { label: "2 colors", value: 2, upcharge: 0.35 },
  { label: "3 colors", value: 3, upcharge: 0.7 },
  { label: "4 colors", value: 4, upcharge: 1.05 },
] as const;
const backColorOptions = [
  { label: "None", value: 0, upcharge: 0 },
  { label: "1 color", value: 1, upcharge: 0.3 },
  { label: "2 colors", value: 2, upcharge: 0.6 },
  { label: "3 colors", value: 3, upcharge: 0.9 },
] as const;
const embroideryPlacementOptions = [
  { label: "One placement", value: 1, upcharge: 0 },
  { label: "Two placements", value: 2, upcharge: 1.25 },
] as const;

type DecorationType = (typeof decorationTypes)[number];

export function BagConfigurator({ bag, compact = false }: { bag: Bag; compact?: boolean }) {
  const [selectedFabricSlug, setSelectedFabricSlug] = useState(defaultFabricSlug);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(100);
  const [isCustomQuote, setIsCustomQuote] = useState(false);
  const [qtyPopoverOpen, setQtyPopoverOpen] = useState(false);
  const [qtyInput, setQtyInput] = useState("100");
  const [decorationType, setDecorationType] = useState<DecorationType>("Screen Print");
  const [frontColors, setFrontColors] = useState(1);
  const [backColors, setBackColors] = useState(0);
  // Color slots: array of {hex, pantoneInput} for each ink color
  const totalColorSlots = decorationType === "Screen Print" ? frontColors + backColors : 0;
  const [colorSlots, setColorSlots] = useState<Array<{ hex: string; pantone: string }>>(
    Array.from({ length: 4 }, () => ({ hex: "#000000", pantone: "" }))
  );
  function updateSlot(i: number, patch: Partial<{ hex: string; pantone: string }>) {
    setColorSlots((prev) => prev.map((s, idx) => idx === i ? { ...s, ...patch } : s));
  }
  function handlePantoneInput(i: number, val: string) {
    updateSlot(i, { pantone: val });
    const hex = lookupPantone(val);
    if (hex) updateSlot(i, { hex, pantone: val });
  }
  const [embroideryPlacements, setEmbroideryPlacements] = useState(1);
  const qtyPopoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!qtyPopoverOpen) return;
    function handleClick(e: MouseEvent) {
      if (qtyPopoverRef.current && !qtyPopoverRef.current.contains(e.target as Node)) {
        setQtyPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [qtyPopoverOpen]);

  function applyQty(val: number) {
    const clamped = Math.max(100, val);
    setQuantity(clamped);
    setQtyInput(String(clamped));
    setIsCustomQuote(false);
    setQtyPopoverOpen(false);
  }

  function applyCustomQuote() {
    setIsCustomQuote(true);
    setQtyPopoverOpen(false);
  }

  const selectedFabric = useMemo(
    () => fabrics.find((fabric) => fabric.slug === selectedFabricSlug) ?? fabrics[0],
    [selectedFabricSlug],
  );
  const selectedAddOns = useMemo(
    () => addOns.filter((addOn) => selectedAddOnIds.includes(addOn.id)),
    [selectedAddOnIds],
  );

  const basePrice = getUnitPrice(bag, quantity) ?? 0;
  const fabricUpcharge = selectedFabric.upcharge;
  const addOnTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.pricePerUnit, 0);
  const screenPrintFrontCharge = frontColorOptions.find((option) => option.value === frontColors)?.upcharge ?? 0;
  const screenPrintBackCharge = backColorOptions.find((option) => option.value === backColors)?.upcharge ?? 0;
  const embroideryCharge = embroideryPlacementOptions.find((option) => option.value === embroideryPlacements)?.upcharge ?? 0;
  const decorationUpcharge =
    decorationType === "Screen Print"
      ? screenPrintFrontCharge + screenPrintBackCharge
      : decorationType === "Embroidery"
        ? embroideryCharge
        : 0;
  const totalPerUnit = basePrice + fabricUpcharge + decorationUpcharge + addOnTotal;
  const orderTotal = totalPerUnit * quantity;
  const decorationSummary =
    decorationType === "Screen Print"
      ? `Screen Print · Front ${frontColors} color${frontColors > 1 ? "s" : ""} · Back ${
          backColors === 0 ? "none" : `${backColors} color${backColors > 1 ? "s" : ""}`
        }`
      : decorationType === "Embroidery"
        ? `Embroidery · ${embroideryPlacements === 1 ? "One placement" : "Two placements"}`
        : decorationType;

  const buildOrderHref = useMemo(() => {
    const params = new URLSearchParams({
      bag: bag.slug,
      quantity: String(quantity),
      fabric: selectedFabric.slug,
      decoration: decorationType,
    });

    if (selectedAddOnIds.length) {
      params.set("addons", selectedAddOnIds.join(","));
    }

    if (decorationType === "Screen Print") {
      params.set("frontColors", String(frontColors));
      params.set("backColors", String(backColors));
    }

    if (decorationType === "Embroidery") {
      params.set("embroideryPlacements", String(embroideryPlacements));
    }

    return `/shop?${params.toString()}`;
  }, [bag.slug, quantity, selectedFabric.slug, selectedAddOnIds, decorationType, frontColors, backColors, embroideryPlacements]);

  return (
    <>
    {/* Sticky bottom price bar */}
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-charcoal/10 bg-white/90 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 lg:px-10">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="truncate text-sm font-semibold text-charcoal">{bag.name}</p>
          <p className="text-xs text-charcoal/50">{selectedFabric.name} · {decorationSummary} · {quantity.toLocaleString()} units</p>
        </div>
        {/* Inline qty display */}
        <div className="flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-4 py-2">
          <span className="text-xs font-semibold text-charcoal/50">Qty</span>
          <input
            type="number"
            min={100}
            value={isCustomQuote ? "" : qtyInput}
            placeholder={isCustomQuote ? "5,000+" : ""}
            onChange={(e) => { setQtyInput(e.target.value); setIsCustomQuote(false); }}
            onBlur={(e) => { const v = Number(e.target.value); if (v >= 100) applyQty(v); }}
            onKeyDown={(e) => { if (e.key === "Enter") { const v = Number(qtyInput); if (v >= 100) applyQty(v); } }}
            className="w-20 text-sm font-bold text-charcoal text-center focus:outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-5">
          {isCustomQuote ? (
            <div className="text-right">
              <p className="text-sm font-bold text-charcoal">Custom pricing</p>
              <p className="text-xs text-charcoal/50">Volume quote required</p>
            </div>
          ) : (
            <div className="text-right">
              <p className="text-lg font-extrabold tracking-tight text-charcoal">{formatCurrency(totalPerUnit)}<span className="text-xs font-semibold text-charcoal/50"> / unit</span></p>
              <p className="text-xs font-semibold text-blue">{formatCurrency(orderTotal)} total</p>
            </div>
          )}
          {isCustomQuote ? (
            <Link
              href={`/start?bag=${bag.slug}&qty=5000plus`}
              className="inline-flex rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Get a quote
            </Link>
          ) : (
            <Link
              href={buildOrderHref}
              className="inline-flex rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Build this order
            </Link>
          )}
        </div>
      </div>
    </div>
    <section className={compact ? "space-y-0" : "rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8"}>
      {!compact && (
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-kelly">Configure your order</p>
          <h2 className="text-3xl font-bold tracking-tight">Dial in the material, add-ons, and quantity.</h2>
          <p className="max-w-3xl text-base leading-7 text-charcoal/72">
            Start with the standard bag price, then see how upgraded fabrics and extra details change the estimate in real time.
          </p>
        </div>
      )}

      {/* ── Quantity control ── */}
      {compact ? (
        /* Compact inline quantity row for right-column layout */
        <div className="mt-6 flex items-center gap-3 rounded-[1.25rem] border border-charcoal/10 bg-light-bone px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50 flex-shrink-0">Qty</span>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={isCustomQuote ? 2000 : quantity}
            onChange={(e) => { const v = Number(e.target.value); setIsCustomQuote(false); setQuantity(v); setQtyInput(String(v)); }}
            className="flex-1 accent-blue cursor-pointer h-1"
          />
          <input
            type="number"
            min={100}
            value={isCustomQuote ? "" : qtyInput}
            placeholder={isCustomQuote ? "5,000+" : ""}
            onChange={(e) => { setQtyInput(e.target.value); setIsCustomQuote(false); }}
            onBlur={(e) => { const v = Number(e.target.value); if (v >= 100) applyQty(v); }}
            onKeyDown={(e) => { if (e.key === "Enter") { const v = Number(qtyInput); if (v >= 100) applyQty(v); } }}
            className="w-20 flex-shrink-0 rounded-full border border-charcoal/15 bg-white px-3 py-1.5 text-sm font-bold text-charcoal text-center focus:border-blue focus:outline-none"
          />
        </div>
      ) : (
        /* Full-width slider for standalone layout */
        <div className="mt-8 rounded-[2rem] border border-charcoal/10 bg-light-bone p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-base font-bold tracking-tight">Quantity</h3>
            <input
              type="number"
              min={100}
              value={isCustomQuote ? "" : qtyInput}
              placeholder={isCustomQuote ? "5,000+" : ""}
              onChange={(e) => { setQtyInput(e.target.value); setIsCustomQuote(false); }}
              onBlur={(e) => { const v = Number(e.target.value); if (v >= 100) applyQty(v); }}
              onKeyDown={(e) => { if (e.key === "Enter") { const v = Number(qtyInput); if (v >= 100) applyQty(v); } }}
              className="w-28 rounded-full border border-charcoal/15 bg-white px-4 py-2 text-xl font-extrabold text-charcoal text-center focus:border-blue focus:outline-none"
            />
          </div>
          <input type="range" min={100} max={2000} step={50}
            value={isCustomQuote ? 2000 : quantity}
            onChange={(e) => { const v = Number(e.target.value); setIsCustomQuote(false); setQuantity(v); setQtyInput(String(v)); }}
            className="w-full accent-blue cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-charcoal/45">100</span>
            <span className="text-xs text-charcoal/45">2,000</span>
          </div>
        </div>
      )}

      <div className={compact ? "mt-5 space-y-5" : "mt-6 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]"}>
        <div className="space-y-5">

          {/* ── Fabric selector ── */}
          <div className="rounded-[2rem] border border-charcoal/10 bg-light-bone p-5 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-base font-bold tracking-tight">Fabric</h3>
              <Link href="/swatches" className="text-xs font-semibold text-blue hover:text-charcoal">Browse swatches →</Link>
            </div>

            {/* Tier tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-none -mx-1 px-1">
              {tierOrder.map((tier) => {
                const tierFabrics = fabrics.filter((f) => f.tier === tier);
                if (!tierFabrics.length) return null;
                const tierMeta = fabricTierMeta[tier];
                const tierActive = tierFabrics.some((f) => f.slug === selectedFabricSlug);
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedFabricSlug(tierFabrics[0].slug)}
                    className={`flex-shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                      tierActive ? "border-blue bg-blue text-white" : "border-charcoal/15 bg-white text-charcoal hover:border-blue/50"
                    }`}
                  >
                    {tierMeta.label}
                    {tier !== "starter" && (
                      <span className={`ml-1.5 ${tierActive ? "text-white/70" : "text-charcoal/45"}`}>
                        +{formatCurrency(tierFabrics[0].upcharge)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Horizontal scroll of fabric chips for active tier */}
            {tierOrder.map((tier) => {
              const tierFabrics = fabrics.filter((f) => f.tier === tier);
              const tierActive = tierFabrics.some((f) => f.slug === selectedFabricSlug);
              if (!tierActive || !tierFabrics.length) return null;
              return (
                <div key={tier}>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
                    {tierFabrics.map((fabric) => {
                      const isSelected = fabric.slug === selectedFabricSlug;
                      return (
                        <button
                          key={fabric.slug}
                          type="button"
                          onClick={() => setSelectedFabricSlug(fabric.slug)}
                          className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                            isSelected ? "border-blue bg-white text-charcoal ring-2 ring-blue/25" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
                          }`}
                        >
                          {fabric.name}
                        </button>
                      );
                    })}
                  </div>
                  {/* Selected fabric detail */}
                  {(() => {
                    const fabric = tierFabrics.find((f) => f.slug === selectedFabricSlug);
                    if (!fabric) return null;
                    return (
                      <div className="mt-3 rounded-[1.25rem] border border-blue/20 bg-white px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold">{fabric.name}</p>
                          <p className="text-xs font-semibold text-charcoal/60">{fabric.upcharge > 0 ? `+${formatCurrency(fabric.upcharge)} / unit` : "Included"}</p>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-charcoal/60">{fabric.description}</p>
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-charcoal/10 bg-light-bone p-5">
            <h3 className="mb-4 text-base font-bold tracking-tight">Decoration</h3>
            <div className="flex flex-wrap gap-2">
              {decorationTypes.map((option) => {
                const isSelected = decorationType === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDecorationType(option)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      isSelected ? "border-blue bg-white text-charcoal ring-2 ring-blue/25" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {decorationType === "Screen Print" && (
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Front placement</p>
                  <div className="flex flex-wrap gap-2">
                    {frontColorOptions.map((option) => {
                      const isSelected = frontColors === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFrontColors(option.value)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                            isSelected ? "border-blue bg-blue text-white" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Back placement</p>
                  <div className="flex flex-wrap gap-2">
                    {backColorOptions.map((option) => {
                      const isSelected = backColors === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setBackColors(option.value)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                            isSelected ? "border-blue bg-blue text-white" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {decorationType === "Embroidery" && (
              <div className="mt-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Placement</p>
                <div className="flex flex-wrap gap-2">
                  {embroideryPlacementOptions.map((option) => {
                    const isSelected = embroideryPlacements === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setEmbroideryPlacements(option.value)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                          isSelected ? "border-blue bg-blue text-white" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Color slots ── */}
            {totalColorSlots > 0 && (
              <div className="mt-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Ink colors</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: totalColorSlots }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-[1.25rem] border border-charcoal/10 bg-white px-4 py-3">
                      {/* Color preview + native picker */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="h-8 w-8 rounded-full border-2 border-charcoal/15 cursor-pointer"
                          style={{ backgroundColor: colorSlots[i]?.hex ?? "#000000" }}
                        />
                        <input
                          type="color"
                          value={colorSlots[i]?.hex ?? "#000000"}
                          onChange={(e) => updateSlot(i, { hex: e.target.value, pantone: "" })}
                          className="absolute inset-0 h-8 w-8 cursor-pointer opacity-0"
                          title="Pick a color"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={colorSlots[i]?.pantone ?? ""}
                          onChange={(e) => handlePantoneInput(i, e.target.value)}
                          placeholder="Pantone e.g. 286 C"
                          className="w-full bg-transparent text-sm font-medium text-charcoal placeholder:text-charcoal/35 focus:outline-none"
                        />
                        {!colorSlots[i]?.pantone && (
                          <p className="text-xs text-charcoal/40">or click circle to pick hex</p>
                        )}
                        {colorSlots[i]?.pantone && lookupPantone(colorSlots[i].pantone) && (
                          <p className="text-xs text-kelly font-medium">{colorSlots[i].hex.toUpperCase()} ✔</p>
                        )}
                      </div>
                      <span className="text-xs text-charcoal/40 flex-shrink-0">
                        {i < frontColors ? `F${i + 1}` : `B${i - frontColors + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-charcoal/45">Type a Pantone code for an exact match, or click the circle to use a hex color picker.</p>
              </div>
            )}

            <p className="mt-4 text-xs leading-5 text-charcoal/55">
              {decorationType === "Screen Print"
                ? "Each extra front color adds $0.35 per unit. Each back print color adds $0.30 per unit."
                : decorationType === "Embroidery"
                  ? "A second embroidery placement adds $1.25 per unit."
                  : "This decoration is included in the current estimate."}
            </p>
          </div>

          {/* ── Add-ons ── */}
          <div className="rounded-[2rem] border border-charcoal/10 bg-light-bone p-5">
            <h3 className="text-base font-bold tracking-tight mb-4">Add-ons</h3>
            <div className="flex flex-wrap gap-2">
              {addOns.map((addOn) => {
                const isSelected = selectedAddOnIds.includes(addOn.id);
                return (
                  <button
                    key={addOn.id}
                    type="button"
                    onClick={() =>
                      setSelectedAddOnIds((current) =>
                        current.includes(addOn.id)
                          ? current.filter((item) => item !== addOn.id)
                          : [...current, addOn.id],
                      )
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      isSelected ? "border-blue bg-blue text-white" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
                    }`}
                    title={addOn.description}
                  >
                    {addOn.name}
                    <span className={`ml-1.5 text-xs ${isSelected ? "text-white/75" : "text-charcoal/45"}`}>
                      +{formatCurrency(addOn.pricePerUnit)}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedAddOnIds.length > 0 && (
              <div className="mt-3 space-y-1">
                {selectedAddOnIds.map((id) => {
                  const addOn = addOns.find((a) => a.id === id);
                  if (!addOn) return null;
                  return (
                    <p key={id} className="text-xs text-charcoal/55">✓ {addOn.name} — {addOn.description}</p>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        <aside className="h-fit rounded-[2rem] border border-charcoal/10 bg-light-bone p-6 xl:sticky xl:top-28">
          <h3 className="text-xl font-bold tracking-tight">Live price calculator</h3>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">Quantity</p>
              <input
                type="number"
                min={100}
                value={isCustomQuote ? "" : qtyInput}
                placeholder={isCustomQuote ? "5,000+" : ""}
                onChange={(e) => { setQtyInput(e.target.value); setIsCustomQuote(false); }}
                onBlur={(e) => { const v = Number(e.target.value); if (v >= 100) applyQty(v); }}
                onKeyDown={(e) => { if (e.key === "Enter") { const v = Number(qtyInput); if (v >= 100) applyQty(v); } }}
                className="w-24 rounded-full border border-charcoal/15 bg-white px-3 py-1.5 text-sm font-bold text-charcoal text-center focus:border-blue focus:outline-none"
              />
            </div>
            <input
              type="range"
              min={100}
              max={2000}
              step={50}
              value={isCustomQuote ? 2000 : quantity}
              onChange={(e) => { const v = Number(e.target.value); setIsCustomQuote(false); setQuantity(v); setQtyInput(String(v)); }}
              className="w-full accent-blue cursor-pointer"
            />
            <div className="flex justify-between text-xs text-charcoal/40">
              <span>100</span><span>2,000</span>
            </div>
          </div>

          {isCustomQuote ? (
            <div className="mt-6 rounded-[1.5rem] border border-blue/20 bg-blue/5 p-5 text-center">
              <p className="text-sm font-bold text-charcoal">Volume pricing available</p>
              <p className="mt-1 text-sm leading-6 text-charcoal/65">Orders of 5,000+ units are custom quoted. We&apos;ll get back to you fast.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4 rounded-[1.5rem] bg-white p-5">
              <SummaryRow label="Base price" value={formatCurrency(basePrice)} />
              <SummaryRow
                label="Fabric"
                value={fabricUpcharge > 0 ? `+${formatCurrency(fabricUpcharge)}` : "Included"}
              />
              <SummaryRow
                label="Decoration"
                value={decorationUpcharge > 0 ? `+${formatCurrency(decorationUpcharge)}` : "Included"}
              />
              <SummaryRow
                label="Add-ons"
                value={addOnTotal > 0 ? `+${formatCurrency(addOnTotal)}` : "$0.00"}
              />
              <div className="border-t border-charcoal/10 pt-4">
                <SummaryRow
                  label={<span className="text-base font-bold text-charcoal">Per unit</span>}
                  value={<span className="text-xl font-bold tracking-tight text-charcoal">{formatCurrency(totalPerUnit)}</span>}
                />
                <SummaryRow
                  label={<span className="text-base font-bold text-charcoal">Order total</span>}
                  value={<span className="text-base font-bold text-blue">{formatCurrency(orderTotal)}</span>}
                />
              </div>
            </div>
          )}

          <p className="mt-4 text-sm leading-6 text-charcoal/60">
            {isCustomQuote ? "We\'ll confirm pricing before anything is produced." : "Prices are estimates. Final quote confirmed at checkout."}
          </p>

          <Link
            href={isCustomQuote ? `/start?bag=${bag.slug}&qty=5000plus` : buildOrderHref}
            className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 ${
              isCustomQuote ? "bg-blue hover:bg-charcoal" : "bg-blue hover:bg-charcoal"
            }`}
          >
            {isCustomQuote ? "Get a quote" : "Build this order"}
          </Link>
        </aside>
      </div>
    </section>
    </>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-charcoal/60">{label}</span>
      <span className="text-right text-charcoal/80">{value}</span>
    </div>
  );
}
