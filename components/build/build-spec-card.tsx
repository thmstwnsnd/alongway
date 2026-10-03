import Link from "next/link";

import { closureOptions, extraOptions, handleAddOns, pocketOptions, stitchOptions, strapOptions } from "@/data/build-options";
import { placementLabel } from "@/data/placements";
import { resolveBuild, type BuildConfig } from "@/lib/build-flow";
import { formatCurrency, getDecorationSummary } from "@/lib/order-flow";

/** Same per-step colors as the paged builder (components/build/paged-steps.tsx). */
const labelColors: Record<string, string> = {
  Color: "#364FA0",
  Canvas: "#B85C1E",
  Handles: "#3A7D44",
  Threads: "#7B4FA0",
  Pockets: "#B8433B",
  Artwork: "#2F7F86",
  Labels: "#A84D80",
  Logo: "#9A7410",
  Art: "#9A7410",
};

const fileCount = (build: BuildConfig, role: "logo" | "art") => {
  const n = (build.artFiles ?? []).filter((f) => f.role === role).length;
  return n ? `${n} file${n === 1 ? "" : "s"} uploaded` : "";
};

/** The build as label/value rows, shared by the spec card and the initial-and-sign sheet. */
export function getSpecRows(build: BuildConfig): [string, string][] {
  const r = resolveBuild(build);
  const names = (options: { id: string; label: string }[], ids: string[]) =>
    options.filter((o) => ids.includes(o.id)).map((o) => o.label).join(", ") || "None";
  const rows: [string, string][] = [
    ["Style", `${r.style.name} (Bag ${r.style.bagNumber})`],
    ["Size", `${r.dims.width}" × ${r.dims.height}" × ${r.dims.depth}"`],
    ["Color", r.swatch?.name ?? build.colorName],
    ["Canvas", r.fabric.name],
    ["Handles", [strapOptions.find((o) => o.id === build.strapId)?.label, names(handleAddOns, build.handleAddOnIds)].filter((x) => x && x !== "None").join(" · ")],
    ["Threads", `${stitchOptions.find((o) => o.id === build.stitchId)?.label}${build.stitchId === "standard" ? "" : ` (${build.stitchColor})`}`],
    ["Pockets", [names(pocketOptions, build.pocketIds), closureOptions.find((o) => o.id === build.closureId)?.label].join(" · ")],
    ["Artwork", getDecorationSummary(build)],
    ["Labels", names(extraOptions, build.extraIds) === "None" ? "Side-seam label (included)" : `Side-seam label + ${names(extraOptions, build.extraIds)}`],
    ...(r.style.slug === "mini-tote"
      ? ([
          ["Logo", [(build.logoPlacementIds ?? []).map(placementLabel).join(", ") || "None", fileCount(build, "logo")].filter(Boolean).join(" · ")],
          ["Art", [(build.artPlacementIds ?? []).map(placementLabel).join(", ") || "None", fileCount(build, "art")].filter(Boolean).join(" · ")],
        ] as [string, string][])
      : []),
    ["Quantity", `${build.quantity.toLocaleString()} units`],
  ];
  return rows;
}

/** The full spec of a built bag, as a checklist the customer can read before paying. */
export function BuildSpecCard({ build }: { build: BuildConfig }) {
  const r = resolveBuild(build);
  const rows = getSpecRows(build);

  return (
    <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-blue">Your build</p>
          <h2 className="font-display mt-1 text-2xl font-bold tracking-tight">{r.style.name}</h2>
        </div>
        <Link href="/build?resume=1" className="text-sm font-semibold text-blue hover:text-charcoal">
          Edit build
        </Link>
      </div>
      <dl className="mt-6 divide-y divide-charcoal/10">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-6 py-3 text-base">
            <dt className="w-28 flex-shrink-0 font-bold text-charcoal/80" style={labelColors[label] ? { color: labelColors[label] } : undefined}>{label}</dt>
            <dd className="text-right font-semibold text-charcoal">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded-[1.25rem] bg-light-bone p-5 text-[15px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
          {r.lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-2">
              <span className="font-medium text-charcoal/85">{l.label}</span>
              <span className="font-bold">{l.amount > 0 ? formatCurrency(l.amount) : "Incl."}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-right text-lg font-bold text-charcoal">{formatCurrency(r.unitPrice)} / unit before shipping</p>
      </div>
    </section>
  );
}
