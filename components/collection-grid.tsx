"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { BagCard } from "@/components/bag-card";
import { bags } from "@/data/bags";

type SortKey = "popular" | "price-asc" | "price-desc" | "size-small" | "size-large";
type SizeFilter = "all" | "small" | "medium" | "large";
type MaterialFilter = "all" | "canvas" | "specialty";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "popular",     label: "Popular"              },
  { key: "price-asc",   label: "Price: Low → High"    },
  { key: "price-desc",  label: "Price: High → Low"    },
  { key: "size-small",  label: "Size: Smallest first" },
  { key: "size-large",  label: "Size: Largest first"  },
];

const sizeOrder = { small: 0, medium: 1, large: 2 };

export function CollectionGrid() {
  const [sort, setSort] = useState<SortKey>("popular");
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>("all");
  const [materialFilter, setMaterialFilter] = useState<MaterialFilter>("all");

  const filtered = useMemo(() => {
    let result = [...bags];

    // Size filter
    if (sizeFilter !== "all") {
      result = result.filter((b) => b.size === sizeFilter);
    }

    // Material filter
    if (materialFilter === "canvas") {
      result = result.filter((b) => b.material.toLowerCase().includes("canvas"));
    } else if (materialFilter === "specialty") {
      result = result.filter((b) => !b.material.toLowerCase().includes("canvas"));
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "size-small":
        result.sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size]);
        break;
      case "size-large":
        result.sort((a, b) => sizeOrder[b.size] - sizeOrder[a.size]);
        break;
      default:
        // "popular" — keep original order
        break;
    }

    return result;
  }, [sort, sizeFilter, materialFilter]);

  return (
    <div>
      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {/* Sort */}
        <div className="relative">
          <select
            aria-label="Sort bags"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none rounded-full border border-charcoal/15 bg-white py-2.5 pl-4 pr-9 text-sm font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-blue/30 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/70">↓</span>
        </div>

        <div className="h-6 w-px bg-charcoal/10" />

        {/* Size filter pills */}
        {(["all", "small", "medium", "large"] as SizeFilter[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSizeFilter(s)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-all ${
              sizeFilter === s
                ? "border-blue bg-blue text-white"
                : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
            }`}
          >
            {s === "all" ? "All sizes" : s}
          </button>
        ))}

        <div className="h-6 w-px bg-charcoal/10" />

        {/* Material filter pills */}
        {([
          { key: "all",       label: "All materials" },
          { key: "canvas",    label: "Canvas"         },
          { key: "specialty", label: "Specialty"      },
        ] as { key: MaterialFilter; label: string }[]).map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMaterialFilter(m.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              materialFilter === m.key
                ? "border-blue bg-blue text-white"
                : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal/40"
            }`}
          >
            {m.label}
          </button>
        ))}

        {/* Active filter count / clear */}
        {(sizeFilter !== "all" || materialFilter !== "all") && (
          <button
            type="button"
            onClick={() => { setSizeFilter("all"); setMaterialFilter("all"); }}
            className="ml-auto text-sm font-semibold text-charcoal/70 hover:text-charcoal"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="mt-4 text-sm text-charcoal/70">
        {filtered.length} {filtered.length === 1 ? "bag" : "bags"}
      </p>

      {/* Grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((bag) => (
          <BagCard key={bag.slug} bag={bag} />
        ))}

        {/* Fully Custom card — always last */}
        <article className="group overflow-hidden rounded-[1.75rem] border-2 border-dashed border-charcoal/20 bg-charcoal shadow-card transition-all hover:border-blue">
          <div className="flex aspect-[6/5] w-full items-center justify-center border-b border-white/10 bg-charcoal/90">
            <span className="text-5xl">✦</span>
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-bold tracking-tight text-bone">Fully Custom</h3>
                <span className="font-accent rounded-full bg-blue px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  bespoke
                </span>
              </div>
              <p className="text-sm leading-6 text-bone/85">
                Got an idea? Build your tote from scratch — specs, fabric, colors, hardware, decoration. All yours.
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-bone/85">
                Starting at <span className="text-light-blue">$18.00</span> / unit
              </p>
              <Link href="/collection/custom" className="text-sm font-semibold text-light-blue hover:text-white">
                Learn more
              </Link>
            </div>
          </div>
        </article>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold">No bags match those filters.</p>
          <button
            type="button"
            onClick={() => { setSizeFilter("all"); setMaterialFilter("all"); setSort("popular"); }}
            className="mt-4 text-sm font-semibold text-blue hover:text-charcoal"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
