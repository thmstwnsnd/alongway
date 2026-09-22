import { catalog } from "@/data/catalog";
import { basePricingBySize } from "@/data/bags";
import { defaultBuild } from "@/lib/build-flow";
import { formatCurrency } from "@/lib/order-flow";

import { BagPreview } from "./bag-preview";

export function StyleGrid({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Build a bag</p>
      <h1 className="font-display mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">Pick a silhouette to start.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-charcoal/72">
        Every style below is a factory-spec pattern. Choose one, then size it, pick fabric and color, straps, stitching,
        pockets and extras. Price updates as you go.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {catalog.map((style) => {
          const size = style.sizes[0];
          const from = basePricingBySize[size.priceSize][2000];
          return (
            <button
              key={style.slug}
              type="button"
              onClick={() => onSelect(style.slug)}
              className="group overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white text-left shadow-card transition hover:-translate-y-1 hover:border-blue/40"
            >
              <div className="aspect-square bg-light-bone p-4 transition group-hover:bg-bone">
                <BagPreview build={defaultBuild(style.slug)} />
              </div>
              <div className="space-y-1 p-5">
                <p className="font-accent text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/45">Bag {style.bagNumber}</p>
                <h2 className="font-display text-xl font-bold tracking-tight">{style.name}</h2>
                <p className="text-sm leading-6 text-charcoal/65">{style.tagline}</p>
                <p className="pt-2 text-sm font-semibold text-blue">
                  From {formatCurrency(from)}/unit
                  <span className="font-normal text-charcoal/50"> · {size.dims.width}&quot; × {size.dims.height}&quot;</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
