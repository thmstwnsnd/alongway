"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

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
  getDecorationSummary,
} from "@/lib/order-flow";

import { BagPreview } from "./bag-preview";
import { Chip, OptionList, Section, Segmented, Swatch, inputClass } from "./option-controls";
import { PhotoPreview } from "./photo-preview";
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
  const [openStep, setOpenStep] = useState<string | null>("size");
  const names = (options: { id: string; label: string }[], ids: string[]) =>
    options.filter((o) => ids.includes(o.id)).map((o) => o.label).join(", ");
  const dims = `${r.dims.width}" × ${r.dims.height}" × ${r.dims.depth}"`;

  const steps: { id: string; title: string; hint?: string; summary: string; content: ReactNode }[] = [
    {
      id: "size",
      title: "Dimensions",
      hint: "Factory-spec sizes. Custom dimensions are quoted per project.",
      summary: r.isCustomSize ? `Custom · ${dims}` : `${r.size.label} · ${dims}`,
      content: (
        <>
          <div className="flex flex-wrap gap-2">
            {r.style.sizes.map((size) => (
              <Chip key={size.id} selected={!r.isCustomSize && build.sizeId === size.id} onClick={() => onChange({ ...build, sizeId: size.id, customDims: null })}>
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
                <label key={key} className="text-[11px] font-semibold uppercase tracking-wide text-black/40">
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
        </>
      ),
    },
    {
      id: "fabric",
      title: "Canvas",
      summary: `${r.fabric.name} · ${fabricTierMeta[r.fabric.tier].label}`,
      content: (
        <>
          <div className="flex flex-wrap gap-2">
            {r.style.fabricSlugs.map((slug) => {
              const fabric = getFabricBySlug(slug);
              if (!fabric) return null;
              return (
                <Chip key={slug} selected={build.fabricSlug === slug} onClick={() => onChange({ ...build, fabricSlug: slug, colorName: getFabricSwatches(slug)[0]?.name ?? "" })}>
                  {fabric.name}
                  {fabric.upcharge > 0 ? <span className="ml-1.5 font-medium opacity-60">+{formatCurrency(fabric.upcharge)}</span> : null}
                </Chip>
              );
            })}
          </div>
          <p className="mt-2 text-[12px] text-black/35">{fabricTierMeta[r.fabric.tier].label} tier</p>
        </>
      ),
    },
    {
      id: "color",
      title: "Colorway",
      summary: r.swatch?.name ?? build.colorName,
      content: (
        <>
          <div className="flex flex-wrap gap-2.5">
            {swatches.map((swatch) => (
              <Swatch key={swatch.name} hex={swatch.hex} name={swatch.name} selected={build.colorName === swatch.name} onClick={() => set("colorName", swatch.name)} />
            ))}
          </div>
          <p className="mt-3 text-[13px] text-black/45">{r.swatch?.name}</p>
        </>
      ),
    },
    {
      id: "handles",
      title: "Carry",
      hint: "One strap construction, plus any add-ons.",
      summary: [strapOptions.find((o) => o.id === build.strapId)?.label, names(handleAddOns, build.handleAddOnIds)].filter(Boolean).join(" · "),
      content: (
        <>
          <OptionList options={strapOptions} value={build.strapId} onChange={(id) => set("strapId", id)} includedIds={[r.size.strap.type]} />
          <div className="mt-3">
            <OptionList options={handleAddOns} value={build.handleAddOnIds} onChange={(id) => set("handleAddOnIds", toggle(build.handleAddOnIds, id))} />
          </div>
          {build.handleAddOnIds.includes("pantone-straps") ? (
            <label className="mt-4 flex items-center gap-3 text-[13px] text-black/55">
              <input type="color" value={build.strapColor} onChange={(e) => set("strapColor", e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent" />
              Strap color
            </label>
          ) : null}
        </>
      ),
    },
    {
      id: "stitch",
      title: "Thread & finish",
      summary: stitchOptions.find((o) => o.id === build.stitchId)?.label ?? "",
      content: (
        <>
          <OptionList options={stitchOptions} value={build.stitchId} onChange={(id) => set("stitchId", id)} />
          {build.stitchId !== "standard" ? (
            <label className="mt-4 flex items-center gap-3 text-[13px] text-black/55">
              <input type="color" value={build.stitchColor} onChange={(e) => set("stitchColor", e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent" />
              Thread / accent color
            </label>
          ) : null}
        </>
      ),
    },
    {
      id: "pockets",
      title: "Pockets & hardware",
      hint: standardPockets.length ? "Pockets marked Included come standard on this style." : undefined,
      summary: [names(pocketOptions, build.pocketIds) || "No pockets", closureOptions.find((o) => o.id === build.closureId)?.label].join(" · "),
      content: (
        <>
          <OptionList options={pocketOptions} value={build.pocketIds} onChange={(id) => set("pocketIds", toggle(build.pocketIds, id))} includedIds={standardPockets} />
          <div className="mt-3">
            <OptionList options={closureOptions} value={build.closureId} onChange={(id) => set("closureId", id)} includedIds={r.style.standardClosure ? [r.style.standardClosure] : ["none"]} />
          </div>
        </>
      ),
    },
    {
      id: "decoration",
      title: "Your artwork",
      hint: "One-color print or embroidery is included.",
      summary: getDecorationSummary(build),
      content: (
        <>
          <Segmented options={decorationOptions.map((t) => ({ value: t, label: t }))} value={build.decorationType} onChange={(v) => set("decorationType", v)} />
          {build.decorationType === "Screen Print" ? (
            <div className="mt-4 grid gap-4">
              <Field label="Front colors">
                <Segmented options={frontColorOptions.map((o) => ({ value: o.value, label: priced(o) }))} value={build.frontColors} onChange={(v) => set("frontColors", v)} />
              </Field>
              <Field label="Back print">
                <Segmented options={backColorOptions.map((o) => ({ value: o.value, label: priced(o) }))} value={build.backColors} onChange={(v) => set("backColors", v)} />
              </Field>
            </div>
          ) : null}
          {build.decorationType === "Embroidery" ? (
            <div className="mt-4">
              <Field label="Placements">
                <Segmented options={embroideryPlacementOptions.map((o) => ({ value: o.value, label: priced(o) }))} value={build.embroideryPlacements} onChange={(v) => set("embroideryPlacements", v)} />
              </Field>
            </div>
          ) : null}
        </>
      ),
    },
    {
      id: "extras",
      title: "Labels & finishing touches",
      hint: "A side-seam woven label with your brand is always included.",
      summary: names(extraOptions, build.extraIds) || "Side-seam label only",
      content: <OptionList options={extraOptions} value={build.extraIds} onChange={(id) => set("extraIds", toggle(build.extraIds, id))} />,
    },
    {
      id: "quantity",
      title: "Run size",
      hint: `Minimum ${MIN_QUANTITY}. ${customQuoteTier.toLocaleString()}+ is quoted per project.`,
      summary: `${build.quantity.toLocaleString()} units`,
      content: (
        <div className="flex flex-wrap items-center gap-2">
          <Segmented options={quantityTiers.map((q) => ({ value: q, label: q.toLocaleString() }))} value={build.quantity} onChange={(v) => set("quantity", v)} />
          <input
            type="number"
            min={MIN_QUANTITY}
            step={50}
            value={build.quantity}
            onChange={(e) => set("quantity", Math.max(MIN_QUANTITY, Number(e.target.value) || MIN_QUANTITY))}
            className={`${inputClass} w-28`}
          />
        </div>
      ),
    },
  ];

  const headerH = useHeaderHeight();
  const [view, setView] = useState<"photo" | "spec">(r.style.photo ? "photo" : "spec");
  const showPhoto = view === "photo" && r.style.photo;

  return (
    <div
      className="relative grid grid-rows-[40dvh_1fr] overflow-hidden bg-white lg:grid-cols-[minmax(0,1.45fr)_minmax(26rem,1fr)] lg:grid-rows-none"
      style={{ height: `calc(100dvh - ${headerH}px)` }}
    >
      {/* Stage: never scrolls */}
      <div className="relative flex h-full min-h-0 flex-col bg-[radial-gradient(120%_90%_at_50%_0%,#ffffff_0%,#f3f1ec_70%,#ebe8e1_100%)]">
        <div className="flex items-start justify-between px-6 pt-6 lg:px-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">Bag {r.style.bagNumber}</p>
            <h1 className="mt-1 text-[28px] font-semibold tracking-[-0.02em] text-charcoal lg:text-[34px]">{r.style.name}</h1>
          </div>
          <button type="button" onClick={onChangeStyle} className="rounded-full bg-white/70 px-4 py-2 text-[13px] font-semibold text-charcoal shadow-sm backdrop-blur hover:bg-white">
            Change bag
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-4 lg:px-16">
          {showPhoto ? (
            <div className="h-full max-w-full" style={{ aspectRatio: `${r.style.photo!.width} / ${r.style.photo!.height}` }}>
              <PhotoPreview photo={r.style.photo!} bodyHex={r.bodyHex} trimHex={r.strapHex} alt={r.style.name} />
            </div>
          ) : (
            <div className="aspect-square h-full max-w-full">
              <BagPreview build={build} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 pb-5 lg:px-12">
          <p className="hidden text-[13px] text-black/45 lg:block">
            {r.fabric.name} · {r.swatch?.name} · {r.dims.width}&quot; × {r.dims.height}&quot; × {r.dims.depth}&quot;
          </p>
          {r.style.photo ? (
            <Segmented
              options={[
                { value: "photo", label: "Photo" },
                { value: "spec", label: "Spec" },
              ]}
              value={view}
              onChange={setView}
            />
          ) : (
            <p className="text-[12px] text-black/35">Schematic preview until this style is photographed</p>
          )}
        </div>
      </div>

      {/* Options: the only thing that scrolls */}
      <div className="h-full min-h-0 overflow-y-auto px-6 pb-36 pt-2 lg:px-10">
        {steps.map((step, i) => (
          <Section
            key={step.id}
            step={String(i + 1).padStart(2, "0")}
            title={step.title}
            summary={step.summary}
            hint={step.hint}
            open={openStep === step.id}
            onToggle={() => setOpenStep(openStep === step.id ? null : step.id)}
            onNext={() => setOpenStep(steps[i + 1]?.id ?? null)}
            isLast={i === steps.length - 1}
          >
            {step.content}
          </Section>
        ))}

        <div className="mt-6 rounded-2xl bg-black/[0.04] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">Included on every bag</p>
          <ul className="mt-3 grid gap-1.5 text-[13px] text-black/60 sm:grid-cols-2">
            {includedOnEveryBag.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-black/[0.06] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-6 py-3.5 lg:px-10">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-charcoal">{r.style.name} · {build.quantity.toLocaleString()} units</p>
            <details className="text-[12px] text-black/45">
              <summary className="cursor-pointer select-none">Price breakdown</summary>
              <div className="mt-1 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {r.lines.filter((l) => l.amount > 0).map((l) => (
                  <span key={l.label}>{l.label} {formatCurrency(l.amount)}</span>
                ))}
              </div>
            </details>
          </div>
          <div className="text-right">
            {r.isCustomQuote ? (
              <p className="text-[20px] font-semibold tracking-[-0.01em]">Custom quote</p>
            ) : (
              <>
                <p className="text-[22px] font-semibold tracking-[-0.02em] text-charcoal">
                  {formatCurrency(r.unitPrice)}
                  <span className="ml-1 text-[12px] font-medium text-black/40">/ unit</span>
                </p>
                <p className="text-[12px] font-medium text-black/45">{formatCurrency(r.total)} total</p>
              </>
            )}
          </div>
          <button type="button" onClick={onContinue} className="rounded-full bg-blue px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-charcoal">
            {r.isCustomQuote ? "Request quote" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

const priced = (o: { label: string; upcharge: number }) => (o.upcharge > 0 ? `${o.label} · +${formatCurrency(o.upcharge)}` : o.label);

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-black/40">{label}</p>
      {children}
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


