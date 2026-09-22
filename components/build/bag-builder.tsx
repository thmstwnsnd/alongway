"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { customQuoteTier, quantityTiers } from "@/data/bags";
import {
  closureOptions,
  extraOptions,
  handleAddOns,
  includedOnEveryBag,
  pocketOptions,
  stitchOptions,
  strapOptions,
} from "@/data/build-options";
import { catalog, getCatalogStyle } from "@/data/catalog";
import { fabricTierMeta, getFabricBySlug, getFabricSwatches } from "@/data/fabrics";
import { BUILD_STORAGE_KEY, applyStyle, buildSummaryText, defaultBuild, resolveBuild, type BuildConfig } from "@/lib/build-flow";
import {
  MIN_QUANTITY,
  backColorOptions,
  decorationOptions,
  embroideryPlacementOptions,
  formatCurrency,
  frontColorOptions,
} from "@/lib/order-flow";

import { BagPreview } from "./bag-preview";
import { Chip, OptionList, Section, inputClass } from "./option-controls";
import { StyleGrid } from "./style-grid";

const toggle = (ids: string[], id: string) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);

export function BagBuilder() {
  const router = useRouter();
  const params = useSearchParams();
  const [build, setBuild] = useState<BuildConfig | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore a saved build, or start from ?style=
  useEffect(() => {
    const requested = params.get("style");
    if (requested && getCatalogStyle(requested)) {
      setBuild(defaultBuild(requested));
    } else {
      try {
        const saved = window.localStorage.getItem(BUILD_STORAGE_KEY);
        if (saved) setBuild({ ...defaultBuild(), ...JSON.parse(saved) });
      } catch {}
    }
    setHydrated(true);
  }, [params]);

  useEffect(() => {
    if (!hydrated) return;
    if (build) window.localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(build));
    else window.localStorage.removeItem(BUILD_STORAGE_KEY);
  }, [build, hydrated]);

  if (!hydrated) return <div className="min-h-[60vh]" />;
  if (!build) return <StyleGrid onSelect={(slug) => setBuild(defaultBuild(slug))} />;

  return (
    <Configurator
      build={build}
      onChange={setBuild}
      onChangeStyle={() => setBuild(null)}
      onContinue={() => {
        const summary = buildSummaryText(build);
        router.push(`/start?${new URLSearchParams({ build: summary, qty: String(build.quantity) })}`);
      }}
    />
  );
}

function Configurator({
  build,
  onChange,
  onChangeStyle,
  onContinue,
}: {
  build: BuildConfig;
  onChange: (next: BuildConfig) => void;
  onChangeStyle: () => void;
  onContinue: () => void;
}) {
  const r = useMemo(() => resolveBuild(build), [build]);
  const set = <K extends keyof BuildConfig>(key: K, value: BuildConfig[K]) => onChange({ ...build, [key]: value });
  const swatches = getFabricSwatches(build.fabricSlug);
  const standardPockets = r.style.standardPockets ?? [];

  const headerH = useHeaderHeight();

  return (
    <div
      className="relative grid grid-rows-[38dvh_1fr] overflow-hidden lg:grid-cols-[minmax(0,1.4fr)_minmax(24rem,1fr)] lg:grid-rows-none"
      style={{ height: `calc(100dvh - ${headerH}px)` }}
    >
      {/* Stage: never scrolls */}
      <div className="flex h-full min-h-0 flex-col bg-bone">
        <div className="flex items-center justify-between px-6 pt-5 lg:px-10">
          <div>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/45">Bag {r.style.bagNumber}</p>
            <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{r.style.name}</h1>
          </div>
          <button type="button" onClick={onChangeStyle} className="text-sm font-semibold text-blue hover:text-charcoal">
            ← Change bag
          </button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-3 lg:px-16">
          <div className="aspect-square h-full max-w-full">
            <BagPreview build={build} />
          </div>
        </div>
        <div className="hidden px-10 pb-5 text-sm text-charcoal/60 lg:block">
          {r.fabric.name} · {r.swatch?.name} · {r.dims.width}&quot; × {r.dims.height}&quot; × {r.dims.depth}&quot; ·{" "}
          {strapOptions.find((o) => o.id === build.strapId)?.label}
        </div>
      </div>

      {/* Options: the only thing that scrolls */}
      <div className="h-full min-h-0 overflow-y-auto bg-white px-6 pb-32 pt-6 lg:px-8">
        <Section step="01" title="Size" hint="Dimensions are the factory spec. Custom sizes are quoted per project.">
          <div className="flex flex-wrap gap-2">
            {r.style.sizes.map((size) => (
              <Chip
                key={size.id}
                selected={!r.isCustomSize && build.sizeId === size.id}
                onClick={() => onChange({ ...build, sizeId: size.id, customDims: null })}
              >
                {size.label} · {size.dims.width}&quot; × {size.dims.height}&quot; × {size.dims.depth}&quot;
              </Chip>
            ))}
            <Chip selected={r.isCustomSize} onClick={() => set("customDims", build.customDims ?? { ...r.size.dims })}>
              Custom
            </Chip>
          </div>
          {r.isCustomSize && build.customDims ? (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {(["width", "height", "depth"] as const).map((key) => (
                <label key={key} className="text-xs font-semibold uppercase tracking-wide text-charcoal/55">
                  {key}
                  <input
                    type="number"
                    min={0}
                    step={0.25}
                    value={build.customDims![key]}
                    onChange={(e) => set("customDims", { ...build.customDims!, [key]: Number(e.target.value) || 0 })}
                    className={`${inputClass} mt-1`}
                  />
                </label>
              ))}
            </div>
          ) : null}
        </Section>

        <Section step="02" title="Fabric & color">
          <div className="flex flex-wrap gap-2">
            {r.style.fabricSlugs.map((slug) => {
              const fabric = getFabricBySlug(slug);
              if (!fabric) return null;
              return (
                <Chip
                  key={slug}
                  selected={build.fabricSlug === slug}
                  onClick={() => onChange({ ...build, fabricSlug: slug, colorName: getFabricSwatches(slug)[0]?.name ?? "" })}
                >
                  {fabric.name}
                  {fabric.upcharge > 0 ? <span className="ml-1 opacity-70">+{formatCurrency(fabric.upcharge)}</span> : null}
                </Chip>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-charcoal/50">{fabricTierMeta[r.fabric.tier].label} tier</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {swatches.map((swatch) => (
              <button
                key={swatch.name}
                type="button"
                title={swatch.name}
                aria-label={swatch.name}
                aria-pressed={build.colorName === swatch.name}
                onClick={() => set("colorName", swatch.name)}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  build.colorName === swatch.name ? "border-blue ring-2 ring-blue/30" : "border-white ring-1 ring-charcoal/15"
                }`}
                style={{ backgroundColor: swatch.hex }}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-charcoal/60">{r.swatch?.name}</p>
        </Section>

        <Section step="03" title="Handles" hint="One strap construction, plus any add-ons.">
          <OptionList
            options={strapOptions}
            value={build.strapId}
            onChange={(id) => set("strapId", id)}
            includedIds={[r.size.strap.type]}
          />
          <div className="mt-4">
            <OptionList options={handleAddOns} value={build.handleAddOnIds} onChange={(id) => set("handleAddOnIds", toggle(build.handleAddOnIds, id))} />
          </div>
        </Section>

        <Section step="04" title="Stitching">
          <OptionList options={stitchOptions} value={build.stitchId} onChange={(id) => set("stitchId", id)} />
          {build.stitchId !== "standard" ? (
            <label className="mt-4 flex items-center gap-3 text-sm text-charcoal/70">
              <input type="color" value={build.stitchColor} onChange={(e) => set("stitchColor", e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border border-charcoal/15 bg-white" />
              Thread / accent color
            </label>
          ) : null}
        </Section>

        <Section step="05" title="Pockets & closure" hint={standardPockets.length ? "Pockets marked Included come standard on this style." : undefined}>
          <OptionList
            options={pocketOptions}
            value={build.pocketIds}
            onChange={(id) => set("pocketIds", toggle(build.pocketIds, id))}
            includedIds={standardPockets}
          />
          <div className="mt-4">
            <OptionList
              options={closureOptions}
              value={build.closureId}
              onChange={(id) => set("closureId", id)}
              includedIds={r.style.standardClosure ? [r.style.standardClosure] : ["none"]}
            />
          </div>
        </Section>

        <Section step="06" title="Decoration" hint="One-color print or embroidery is included.">
          <div className="flex flex-wrap gap-2">
            {decorationOptions.map((type) => (
              <Chip key={type} selected={build.decorationType === type} onClick={() => set("decorationType", type)}>
                {type}
              </Chip>
            ))}
          </div>
          {build.decorationType === "Screen Print" ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ChipGroup label="Front colors" options={frontColorOptions} value={build.frontColors} onChange={(v) => set("frontColors", v)} />
              <ChipGroup label="Back print" options={backColorOptions} value={build.backColors} onChange={(v) => set("backColors", v)} />
            </div>
          ) : null}
          {build.decorationType === "Embroidery" ? (
            <div className="mt-4">
              <ChipGroup label="Placements" options={embroideryPlacementOptions} value={build.embroideryPlacements} onChange={(v) => set("embroideryPlacements", v)} />
            </div>
          ) : null}
        </Section>

        <Section step="07" title="Labels & extras" hint="A side-seam woven label with your brand is always included.">
          <OptionList options={extraOptions} value={build.extraIds} onChange={(id) => set("extraIds", toggle(build.extraIds, id))} />
        </Section>

        <Section step="08" title="Quantity" hint={`Minimum ${MIN_QUANTITY}. ${customQuoteTier.toLocaleString()}+ is quoted per project.`}>
          <div className="flex flex-wrap items-center gap-2">
            {quantityTiers.map((q) => (
              <Chip key={q} selected={build.quantity === q} onClick={() => set("quantity", q)}>
                {q.toLocaleString()}
              </Chip>
            ))}
            <input
              type="number"
              min={MIN_QUANTITY}
              step={50}
              value={build.quantity}
              onChange={(e) => set("quantity", Math.max(MIN_QUANTITY, Number(e.target.value) || MIN_QUANTITY))}
              className={`${inputClass} w-32`}
            />
          </div>
        </Section>

        <div className="rounded-[1.5rem] bg-light-bone p-5">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/55">Included on every bag</p>
          <ul className="mt-3 grid gap-1.5 text-sm text-charcoal/75 sm:grid-cols-2">
            {includedOnEveryBag.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-charcoal/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 lg:px-10">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{r.style.name} · {build.quantity.toLocaleString()} units</p>
            <details className="text-xs text-charcoal/55">
              <summary className="cursor-pointer select-none">Price breakdown</summary>
              <div className="mt-1 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {r.lines.filter((l) => l.amount > 0).map((l) => (
                  <span key={l.label}>{l.label}: {formatCurrency(l.amount)}</span>
                ))}
              </div>
            </details>
          </div>
          <div className="text-right">
            {r.isCustomQuote ? (
              <p className="text-lg font-extrabold">Custom quote</p>
            ) : (
              <>
                <p className="text-lg font-extrabold">{formatCurrency(r.unitPrice)}<span className="text-xs font-semibold text-charcoal/50"> / unit</span></p>
                <p className="text-xs font-semibold text-blue">{formatCurrency(r.total)} total</p>
              </>
            )}
          </div>
          <button type="button" onClick={onContinue} className="rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:bg-charcoal">
            {r.isCustomQuote ? "Request quote" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Height of the site header, so the builder can fill exactly the rest of the viewport. */
function useHeaderHeight() {
  const [h, setH] = useState(112);
  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setH(header.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);
  return h;
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { label: string; value: number; upcharge: number }[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-charcoal/55">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Chip key={o.value} selected={value === o.value} onClick={() => onChange(o.value)}>
            {o.label}
            {o.upcharge > 0 ? <span className="ml-1 opacity-70">+{formatCurrency(o.upcharge)}</span> : null}
          </Chip>
        ))}
      </div>
    </div>
  );
}

