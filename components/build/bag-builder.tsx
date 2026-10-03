"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { customQuoteTier, getBagPhotoSet, quantityTiers } from "@/data/bags";
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
import { BUILD_STORAGE_KEY, applyStyle, buildSummaryText, buildToOrderDraft, defaultBuild, resolveBuild, type BuildConfig } from "@/lib/build-flow";
import {
  MIN_QUANTITY,
  ORDER_DRAFT_STORAGE_KEY,
  emptyOrderDraft,
  type OrderDraft,
  backColorOptions,
  decorationOptions,
  embroideryPlacementOptions,
  formatCurrency,
  frontColorOptions,
  getDecorationSummary,
} from "@/lib/order-flow";

import { BagPreview } from "./bag-preview";
import { PagedSteps } from "./paged-steps";
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
  // Always land on the silhouette grid. ?style= deep-links straight into a bag;
  // ?resume=1 (used by checkout's Edit build) reopens the saved build.
  useEffect(() => {
    const requested = params.get("style");
    if (requested && getCatalogStyle(requested)) {
      setBuild(defaultBuild(requested));
    } else if (params.get("resume")) {
      try {
        const saved = window.localStorage.getItem(BUILD_STORAGE_KEY);
        if (saved) setBuild({ ...defaultBuild(), ...JSON.parse(saved) });
      } catch {}
    }
    else {
      // Plain /build always shows the choose-your-bag grid.
      setBuild(null);
    }
    setHydrated(true);
  }, [params]);

  // Any "Build a Bag" link (nav, footer, buttons) pointing at plain /build returns to the grid,
  // even when we are already on /build.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (a && a.getAttribute("href") === "/build") setBuild(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (build) window.localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(build));
    else window.localStorage.removeItem(BUILD_STORAGE_KEY);
  }, [build, hydrated]);

  if (!hydrated) return <div className="min-h-[60vh]" />;
  if (!build) {
    return (
      <StyleGrid
        onSelect={(slug) => {
          try {
            const saved = JSON.parse(window.localStorage.getItem(BUILD_STORAGE_KEY) ?? "null");
            if (saved?.styleSlug === slug) return setBuild({ ...defaultBuild(slug), ...saved });
          } catch {}
          setBuild(defaultBuild(slug));
        }}
      />
    );
  }

  return (
    <Configurator
      build={build}
      onChange={setBuild}
      onChangeStyle={() => setBuild(null)}
      onContinue={() => {
        const r = resolveBuild(build);
        if (r.isCustomQuote) {
          router.push(`/start?${new URLSearchParams({ build: buildSummaryText(build), qty: String(build.quantity) })}`);
          return;
        }
        let saved: Partial<OrderDraft> = {};
        try {
          saved = JSON.parse(window.localStorage.getItem(ORDER_DRAFT_STORAGE_KEY) ?? "{}");
        } catch {}
        const draft = buildToOrderDraft(build, { ...emptyOrderDraft, ...saved });
        window.localStorage.setItem(ORDER_DRAFT_STORAGE_KEY, JSON.stringify(draft));
        router.push("/checkout");
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
  const [openStep, setOpenStep] = useState<string | null>(null);
  const [doneSteps, setDoneSteps] = useState<string[]>([]);
  const builderRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  // Land on the first marketing photo when the style has one; Customize switches to the live preview.
  const [view, setView] = useState<"build" | "size" | number>("build");
  // quantity lives in the price bar, not in the steps
  const names = (options: { id: string; label: string }[], ids: string[]) =>
    options.filter((o) => ids.includes(o.id)).map((o) => o.label).join(", ");
  const dims = `${r.dims.width}" × ${r.dims.height}" × ${r.dims.depth}"`;

  // Trial: Mini Tote shows one step per page, compact. Other styles keep the accordion for now.
  const paged = r.style.slug === "mini-tote";
  const steps: { id: string; title: string; hint?: string; summary: string; content: ReactNode }[] = [
    {
      id: "color",
      title: "Color",
      hint: "Every color is the same price.",
      summary: r.swatch?.name ?? build.colorName,
      content: (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))] gap-2.5">
            {swatches.map((swatch) => (
              <Swatch key={swatch.name} hex={swatch.hex} name={swatch.name} selected={build.colorName === swatch.name} onClick={() => set("colorName", swatch.name)} />
            ))}
          </div>
          <p className="mt-3 text-[13px] text-black/70">{r.swatch?.name}</p>
        </>
      ),
    },
    {
      id: "fabric",
      title: "Canvas",
      hint: "Heavier canvas costs a little more per bag.",
      summary: `${r.fabric.name} · ${fabricTierMeta[r.fabric.tier].label}`,
      content: (
        <>
          {paged ? (
            <OptionList
              compact
              options={r.style.fabricSlugs.flatMap((slug) => {
                const f = getFabricBySlug(slug);
                return f ? [{ id: slug, label: f.name, description: `${fabricTierMeta[f.tier].label} tier`, pricePerUnit: f.upcharge }] : [];
              })}
              value={build.fabricSlug}
              includedIds={[[...r.style.fabricSlugs].map((slug) => getFabricBySlug(slug)).filter(Boolean).sort((x, y) => x!.upcharge - y!.upcharge)[0]?.slug ?? r.style.defaultFabricSlug]}
              onChange={(slug) => onChange({ ...build, fabricSlug: slug, colorName: getFabricSwatches(slug)[0]?.name ?? "" })}
            />
          ) : (
            <>
          <div className={paged ? "grid gap-1.5" : "flex flex-wrap gap-2"}>
            {r.style.fabricSlugs.map((slug) => {
              const fabric = getFabricBySlug(slug);
              if (!fabric) return null;
              return (
                <Chip block={paged} key={slug} selected={build.fabricSlug === slug} onClick={() => onChange({ ...build, fabricSlug: slug, colorName: getFabricSwatches(slug)[0]?.name ?? "" })}>
                  {fabric.name}
                  {paged ? <span className="font-medium opacity-60">{fabric.upcharge > 0 ? `+${formatCurrency(fabric.upcharge)}` : "Included"}</span> : fabric.upcharge > 0 ? <span className="ml-1.5 font-medium opacity-60">+{formatCurrency(fabric.upcharge)}</span> : null}
                </Chip>
              );
            })}
          </div>
          <p className="mt-2 text-[12px] text-black/70">{fabricTierMeta[r.fabric.tier].label} tier</p>
            </>
          )}
        </>
      ),
    },
    {
      id: "handles",
      title: "Handles",
      hint: "One strap construction, plus any add-ons.",
      summary: [strapOptions.find((o) => o.id === build.strapId)?.label, names(handleAddOns, build.handleAddOnIds)].filter(Boolean).join(" · "),
      content: (
        <>
          <OptionList compact={paged} options={strapOptions} value={build.strapId} onChange={(id) => set("strapId", id)} includedIds={[r.size.strap.type]} />
          <div className="mt-3">
            <OptionList compact={paged} options={handleAddOns} value={build.handleAddOnIds} onChange={(id) => set("handleAddOnIds", toggle(build.handleAddOnIds, id))} />
          </div>
          {build.handleAddOnIds.includes("pantone-straps") ? (
            <label className="mt-4 flex items-center gap-3 text-[13px] text-black/70">
              <input type="color" value={build.strapColor} onChange={(e) => set("strapColor", e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent" />
              Strap color
            </label>
          ) : null}
        </>
      ),
    },
    {
      id: "stitch",
      title: "Threads",
      hint: "Matching thread is included. Contrast is an upgrade.",
      summary: stitchOptions.find((o) => o.id === build.stitchId)?.label ?? "",
      content: (
        <>
          <OptionList compact={paged} includedIds={["standard"]} options={stitchOptions} value={build.stitchId} onChange={(id) => set("stitchId", id)} />
          {build.stitchId !== "standard" ? (
            <label className="mt-4 flex items-center gap-3 text-[13px] text-black/70">
              <input type="color" value={build.stitchColor} onChange={(e) => set("stitchColor", e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent" />
              Thread / accent color
            </label>
          ) : null}
        </>
      ),
    },
    {
      id: "pockets",
      title: "Pockets",
      hint: standardPockets.length ? "Pockets marked Included come standard on this style." : "Add pockets and a closure if you want them.",
      summary: [names(pocketOptions, build.pocketIds) || "No pockets", closureOptions.find((o) => o.id === build.closureId)?.label].join(" · "),
      content: (
        <>
          <OptionList compact={paged} options={pocketOptions} value={build.pocketIds} onChange={(id) => set("pocketIds", toggle(build.pocketIds, id))} includedIds={standardPockets} />
          <div className="mt-3">
            <OptionList compact={paged} options={closureOptions} value={build.closureId} onChange={(id) => set("closureId", id)} includedIds={r.style.standardClosure ? [r.style.standardClosure] : ["none"]} />
          </div>
        </>
      ),
    },
    {
      id: "decoration",
      title: "Artwork",
      hint: "One-color print or embroidery is included.",
      summary: getDecorationSummary(build),
      content: (
        <>
          {paged ? (
            <>
              <OptionList compact options={decorationOptions.map((t) => ({ id: t, label: t, description: "", pricePerUnit: 0 }))} value={build.decorationType} includedIds={["Screen Print"]} onChange={(id) => set("decorationType", id as typeof build.decorationType)} />
              {build.decorationType === "Screen Print" ? (
                <div className="mt-2 grid gap-2">
                  <Field label="Front colors">
                    <OptionList compact options={frontColorOptions.map((o) => ({ id: String(o.value), label: o.label, description: "", pricePerUnit: o.upcharge }))} value={String(build.frontColors)} includedIds={["1"]} onChange={(id) => set("frontColors", Number(id))} />
                  </Field>
                  <Field label="Back print">
                    <OptionList compact options={backColorOptions.map((o) => ({ id: String(o.value), label: o.label, description: "", pricePerUnit: o.upcharge }))} value={String(build.backColors)} includedIds={["0"]} onChange={(id) => set("backColors", Number(id))} />
                  </Field>
                </div>
              ) : null}
              {build.decorationType === "Embroidery" ? (
                <div className="mt-3">
                  <Field label="Placements">
                    <OptionList compact options={embroideryPlacementOptions.map((o) => ({ id: String(o.value), label: o.label, description: "", pricePerUnit: o.upcharge }))} value={String(build.embroideryPlacements)} includedIds={["1"]} onChange={(id) => set("embroideryPlacements", Number(id))} />
                  </Field>
                </div>
              ) : null}
            </>
          ) : (
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
          )}
        </>
      ),
    },
    {
      id: "extras",
      title: "Labels",
      hint: "A side-seam woven label with your brand is always included.",
      summary: names(extraOptions, build.extraIds) || "Side-seam label only",
      content: <OptionList compact={paged} options={extraOptions} value={build.extraIds} onChange={(id) => set("extraIds", toggle(build.extraIds, id))} />,
    },
  ];

  const allDone = steps.every((st) => doneSteps.includes(st.id));

  // Quantity hint: on the start screen, a hand grabs the bird and drags it 100 -> 500 to show the slider.
  const buildRef = useRef(build);
  buildRef.current = build;
  const hintShown = useRef(false);
  const preStart = openStep === null && doneSteps.length === 0;
  const [qtyCaption, setQtyCaption] = useState(false);
  const [hand, setHand] = useState<{ q: number; y: number; grab: boolean } | null>(null);
  useEffect(() => {
    if (!preStart || !paged) return;
    const startQ = MIN_QUANTITY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = 500;
    const [ENTER, DRAG, HOLD, BACK] = [450, 1500, 600, 800];
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let running = false;
    const play = () => {
      if (hintShown.current || buildRef.current.quantity !== startQ) return;
      setQtyCaption(true);
      if (reduce) return;
      running = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = now - t0;
        let q = startQ;
        let y = 0;
        let grab = true;
        if (t < ENTER) {
          y = -34 * (1 - ease(t / ENTER));
          grab = false;
        } else if (t < ENTER + DRAG) {
          q = startQ + (target - startQ) * ease((t - ENTER) / DRAG);
        } else if (t < ENTER + DRAG + HOLD) {
          q = target;
        } else if (t < ENTER + DRAG + HOLD + BACK) {
          q = target - (target - startQ) * ease((t - ENTER - DRAG - HOLD) / BACK);
        } else {
          running = false;
          onChange({ ...buildRef.current, quantity: startQ });
          setHand(null);
          timer = setTimeout(play, 3500);
          return;
        }
        q = Math.round(q / 50) * 50;
        if (q !== buildRef.current.quantity) onChange({ ...buildRef.current, quantity: q });
        setHand({ q, y, grab });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    timer = setTimeout(play, 800);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      setHand(null);
      setQtyCaption(false);
      if (running) onChange({ ...buildRef.current, quantity: startQ });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preStart]);
  const headerH = useHeaderHeight();
  const gallery = (r.style.gallery ?? []).slice(0, 5);
  const galleryIndex = typeof view === "number" ? view : null;
  // Placeholder until the photo shoot: every style uses the recolorable Boat Tote photo.
  const stagePhoto = r.style.photo ?? getCatalogStyle("boat-tote")?.photo;
  const showPhoto = view === "build" && stagePhoto;

  const priceBlock = (
        <div className="border-t border-black/[0.06] bg-white/60 px-6 pb-5 pt-4 backdrop-blur lg:px-12">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="qty" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
              Quantity
            </label>
            <span className="text-[14px] font-semibold tabular-nums text-charcoal">
              {r.isCustomQuote ? `${customQuoteTier.toLocaleString()}+ · custom quote` : `${build.quantity.toLocaleString()} units`}
            </span>
          </div>
          <div className="relative">
            {qtyCaption ? (
              <div className="pointer-events-none absolute -top-11 left-0 z-10 rounded-full bg-charcoal px-4 py-1.5 text-[13px] font-semibold text-white shadow-card">
                Drag the bird to check prices!
                <span className="absolute -bottom-1 left-6 h-2.5 w-2.5 rotate-45 bg-charcoal" aria-hidden />
              </div>
            ) : null}
          <input
            id="qty"
            type="range"
            min={MIN_QUANTITY}
            max={customQuoteTier}
            step={50}
            value={build.quantity}
            onChange={(e) => {
              hintShown.current = true;
              setQtyCaption(false);
              setHand(null);
              set("quantity", Number(e.target.value));
            }}
            onPointerDown={() => {
              hintShown.current = true;
              setQtyCaption(false);
              setHand(null);
            }}
            className="qty-slider mt-2 w-full"
            aria-valuetext={`${build.quantity} units`}
          />
            {hand ? (
              <svg
                viewBox="0 0 32 38"
                aria-hidden
                className="pointer-events-none absolute z-10 h-11 w-9 drop-shadow-md"
                style={{
                  top: `${hand.y - 6}px`,
                  left: `calc(18px + ${(((hand?.q ?? MIN_QUANTITY) - MIN_QUANTITY) / (customQuoteTier - MIN_QUANTITY))} * (100% - 36px))`,
                  transform: `translateX(-50%) scale(${hand.grab ? 0.92 : 1})`,
                }}
              >
                <g fill="white" stroke="#262626" strokeWidth="1.6" strokeLinejoin="round">
                  <rect x="7" y="6" width="5" height="14" rx="2.5" />
                  <rect x="12" y="3" width="5" height="17" rx="2.5" />
                  <rect x="17" y="5" width="5" height="15" rx="2.5" />
                  <rect x="22" y="9" width="5" height="12" rx="2.5" />
                  <path d="M7 18 C3 17 2 22 5 26 L9 33 C11 36 22 36 24 32 L27 22 L27 18 L7 18 Z" />
                </g>
              </svg>
            ) : null}
          </div>
          <div className="mt-1 flex justify-between text-[10px] font-medium tabular-nums text-black/70">
            {[...quantityTiers, customQuoteTier].map((q) => (
              <button key={q} type="button" onClick={() => set("quantity", q)} className="hover:text-charcoal">
                {q >= customQuoteTier ? `${q.toLocaleString()}+` : q.toLocaleString()}
              </button>
            ))}
          </div>

          {paged ? (
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <details className="text-[12px] text-black/70">
                <summary className="cursor-pointer select-none">Breakdown</summary>
                <div className="mt-1 grid gap-0.5">
                  {r.lines.filter((l) => l.amount > 0).map((l) => (
                    <span key={l.label}>{l.label} {formatCurrency(l.amount)}</span>
                  ))}
                </div>
              </details>
              <div className="text-center">
                {r.isCustomQuote ? (
                  <p className="text-[32px] font-semibold leading-none tracking-[-0.02em] text-charcoal">Custom quote</p>
                ) : (
                  <>
                    <p className="text-[30px] font-bold leading-none tracking-[-0.02em] tabular-nums text-blue">
                      {formatCurrency(r.total)}
                      <span className="ml-2 text-[16px] font-semibold tracking-normal">total</span>
                    </p>
                    <p className="mt-2 text-[26px] font-medium leading-none tracking-[-0.02em] tabular-nums text-black/60">
                      {formatCurrency(r.unitPrice)}
                      <span className="ml-2 text-[16px] tracking-normal">/ unit</span>
                    </p>
                  </>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <button
                  type="button"
                  onClick={onContinue}
                  disabled={!r.isCustomQuote && !allDone}
                  className="rounded-full bg-blue px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-black/[0.08] disabled:text-black/70"
                >
                  {r.isCustomQuote ? "Request quote" : "Continue"}
                </button>
                {!r.isCustomQuote ? (
                  <p className="text-[11px] font-medium text-black/70">
                    {allDone ? "All steps confirmed" : `${doneSteps.length} of ${steps.length} steps confirmed`}
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              {r.isCustomQuote ? (
                <p className="text-[22px] font-semibold tracking-[-0.01em] text-charcoal">Custom quote</p>
              ) : (
                <>
                  <p className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-charcoal">
                    {formatCurrency(r.unitPrice)}
                    <span className="ml-1.5 text-[12px] font-medium text-black/70">/ unit</span>
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-black/70">{formatCurrency(r.total)} total</p>
                </>
              )}
              <details className="mt-1 text-[11px] text-black/70">
                <summary className="cursor-pointer select-none">Breakdown</summary>
                <div className="mt-1 grid grid-cols-2 gap-x-4 sm:grid-cols-3">
                  {r.lines.filter((l) => l.amount > 0).map((l) => (
                    <span key={l.label}>{l.label} {formatCurrency(l.amount)}</span>
                  ))}
                </div>
              </details>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end gap-1.5">
                <button
                  type="button"
                  onClick={onContinue}
                  disabled={!r.isCustomQuote && !allDone}
                  className="rounded-full bg-blue px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-black/[0.08] disabled:text-black/70"
                >
                  {r.isCustomQuote ? "Request quote" : "Continue"}
                </button>
                {!r.isCustomQuote ? (
                  <p className="text-[11px] font-medium text-black/70">
                    {allDone ? "All steps confirmed" : `${doneSteps.length} of ${steps.length} steps confirmed`}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          )}
        </div>
  );

  const stepsBlock = paged ? (
    <PagedSteps
      steps={steps}
      openStep={openStep}
      doneSteps={doneSteps}
      onSelect={(id) => {
        setOpenStep(id);
        setView("build");
      }}
      onNext={() => {
        const cur = openStep ?? steps[0].id;
        const i = steps.findIndex((st) => st.id === cur);
        const nextDone = doneSteps.includes(cur) ? doneSteps : [...doneSteps, cur];
        setDoneSteps(nextDone);
        setOpenStep(steps.slice(i + 1).find((st) => !nextDone.includes(st.id))?.id ?? null);
      }}
      onBack={() => {
        const cur = openStep ?? steps[0].id;
        const i = steps.findIndex((st) => st.id === cur);
        if (i > 0) setOpenStep(steps[i - 1].id);
      }}
    />
  ) : (

    <>
        {steps.map((step, i) => (
          <Section
            key={step.id}
            step={String(i + 1).padStart(2, "0")}
            title={step.title}
            summary={step.summary}
            hint={step.hint}
            open={openStep === step.id}
            done={doneSteps.includes(step.id)}
            onToggle={() => {
              const next = openStep === step.id ? null : step.id;
              setOpenStep(next);
              if (next) setView("build");
            }}
            onNext={() => {
              setDoneSteps((d) => (d.includes(step.id) ? d : [...d, step.id]));
              setOpenStep(steps.slice(i + 1).find((st) => !doneSteps.includes(st.id))?.id ?? null);
            }}
            isLast={i === steps.length - 1}
          >
            {step.content}
          </Section>
        ))}

        <div className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-blue px-6 py-6 text-bone">
          <Image
            src="/svg/illustrations/Alongway_Website_Graphic_WormHole_Blue.svg"
            alt=""
            width={400}
            height={400}
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-20 brightness-[3]"
          />
          <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.22em] text-blue">Included on every bag</p>
          <h4 className="font-display mt-1 text-[20px] font-extrabold uppercase tracking-tight">All-in. Nothing hidden.</h4>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {includedOnEveryBag.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-[13px] font-medium leading-5 text-bone/90">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Image src={item.icon} alt="" width={18} height={18} className="h-4 w-4" aria-hidden />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
    </>
  );

  // "Let's start building": opens the first step and brings the ordering terminal into view.
  const started = openStep !== null || doneSteps.length > 0;
  const startBuilding = () => {
    // Switch to the locked builder screen (static photo left, terminal right), like the original builder.
    setOpenStep("color");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (!started) {
    // Styles without their own shoot yet borrow the Boat Tote photos as placeholders.
    const own = getBagPhotoSet(r.style.slug).filter(Boolean);
    const photos = own.length ? own : (getCatalogStyle("boat-tote")?.gallery ?? []);
    return (
      <div ref={layoutRef} className="bg-white lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(26rem,1fr)]">
        <div className="space-y-3 bg-light-bone px-6 py-8 lg:px-12">
          {!started ? <StartPrompt onStart={startBuilding} className="lg:hidden" /> : null}
          {photos.map((src, i) => (
            <div key={src} className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-card">
              <Image src={src} alt={`${r.style.name} photo ${i + 1}`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>

        <div
          ref={builderRef}
          className="flex flex-col bg-white lg:sticky lg:self-start"
          style={{ top: headerH, height: `calc(100dvh - ${headerH}px)` }}
        >
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-10 pt-8 lg:px-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black/70">Bag {r.style.bagNumber}</p>
                <h1 className="mt-1 text-[32px] font-semibold tracking-[-0.02em] text-charcoal">{r.style.name}</h1>
                <p className="mt-2 text-[16px] text-black/70">
                  <span className="font-semibold text-charcoal/70">Size</span> · {dims} ·{" "}
                  {r.size.strap.isDrop ? `${r.size.strap.length}" handle drop` : `${r.size.strap.length}" strap`} · {r.size.strap.width}&quot; wide
                </p>
              </div>
              <button type="button" onClick={onChangeStyle} className="flex-shrink-0 rounded-full bg-black/[0.05] px-4 py-2 text-[14px] font-semibold text-charcoal hover:bg-black/[0.08]">
                Change bag
              </button>
            </div>
            {!started ? <StartPrompt onStart={startBuilding} className="mt-6" /> : null}
            {paged ? null : <div className="mt-4">{stepsBlock}</div>}
          </div>
          <div className="flex-shrink-0">{priceBlock}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative grid ${paged ? "grid-rows-[40dvh_1fr]" : "grid-rows-[52dvh_1fr]"} overflow-hidden bg-white lg:grid-cols-[minmax(0,1.45fr)_minmax(26rem,1fr)] lg:grid-rows-none`}
      style={{ height: `calc(100dvh - ${headerH}px)` }}
    >
      {/* Stage: never scrolls */}
      <div className="relative flex h-full min-h-0 flex-col bg-[radial-gradient(120%_90%_at_50%_0%,#ffffff_0%,#f3f1ec_70%,#ebe8e1_100%)]">
        <div className="flex items-start justify-between px-6 pt-6 lg:px-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Bag {r.style.bagNumber}</p>
            <h1 className="mt-1 text-[28px] font-semibold tracking-[-0.02em] text-charcoal lg:text-[34px]">{r.style.name}</h1>
            <p className="mt-2 text-[15px] text-black/70">
              <span className="font-semibold text-charcoal/70">Size</span> · {dims} ·{" "}
              {r.size.strap.isDrop ? `${r.size.strap.length}" handle drop` : `${r.size.strap.length}" strap`} · {r.size.strap.width}&quot; wide
            </p>
          </div>
          <button type="button" onClick={onChangeStyle} className="rounded-full bg-white/70 px-4 py-2 text-[13px] font-semibold text-charcoal shadow-sm backdrop-blur hover:bg-white">
            Change bag
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-4 lg:px-16">
          {galleryIndex !== null ? (
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image src={gallery[galleryIndex]} alt={`${r.style.name} photo ${galleryIndex + 1}`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          ) : showPhoto ? (
            <div className="h-full max-w-full" style={{ aspectRatio: `${stagePhoto!.width} / ${stagePhoto!.height}` }}>
              <PhotoPreview photo={stagePhoto!} bodyHex={r.bodyHex} trimHex={r.strapHex} alt={r.style.name} />
            </div>
          ) : (
            <div className="aspect-square h-full max-w-full">
              <BagPreview build={build} />
            </div>
          )}
        </div>

        {priceBlock}
      </div>

      {/* Options: the only thing that scrolls */}
      <div className={paged ? "h-full min-h-0 px-5 pb-3 pt-4 lg:px-10 lg:pb-10 lg:pt-12" : "h-full min-h-0 overflow-y-auto px-6 pb-16 pt-2 lg:px-10"}>
        {stepsBlock}
      </div>

    </div>
  );
}

function StartPrompt({ onStart, className = "" }: { onStart: () => void; className?: string }) {
  const dots = ["#D9503F", "#F2B544", "#3A7D44", "#364FA0", "#E58BB8"];
  return (
    <div className={`flex items-center justify-between gap-4 rounded-[1.75rem] border-2 border-dashed border-blue bg-bone px-5 py-5 ${className}`}>
      <div>
        <div className="mb-2 flex gap-1.5" aria-hidden>
          {dots.map((c, i) => (
            <span
              key={c}
              className="start-dot h-3.5 w-3.5 rounded-full border border-black/10"
              style={{ background: c, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
        <p className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-charcoal">Ready? Let&apos;s make your bag!</p>
        <p className="mt-1 text-[14px] text-black/70">Pick a color and watch the price update as you go.</p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="start-wiggle relative isolate flex-shrink-0 rounded-full bg-blue px-6 py-3.5 text-[16px] font-semibold text-white shadow-card transition hover:bg-charcoal"
      >
        <span className="start-ring" aria-hidden />
        Let&apos;s go!
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="absolute -bottom-5 right-2 h-7 w-7 animate-bounce text-charcoal drop-shadow"
          fill="currentColor"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <path d="M5 3l14 7.5-6 1.8-2.2 6.2L5 3z" />
        </svg>
      </button>
    </div>
  );
}

const priced = (o: { label: string; upcharge: number }) => (o.upcharge > 0 ? `${o.label} · +${formatCurrency(o.upcharge)}` : o.label);

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-black/70">{label}</p>
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


