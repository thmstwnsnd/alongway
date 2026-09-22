import { basePricingBySize } from "@/data/bags";
import { catalog } from "@/data/catalog";
import { defaultBuild, resolveBuild } from "@/lib/build-flow";
import { formatCurrency } from "@/lib/order-flow";

import { BagPreview } from "./bag-preview";
import { PhotoPreview } from "./photo-preview";

export function StyleGrid({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black/35">Build a bag</p>
        <h1 className="mt-2 text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-[52px]">
          Start with a silhouette.
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-7 text-black/50">
          Factory-spec patterns. Pick one, then size it, choose fabric and color, straps, stitching, pockets and extras.
          The price updates as you go.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {catalog.map((style) => {
            const size = style.sizes[0];
            const from = basePricingBySize[size.priceSize][2000];
            const build = defaultBuild(style.slug);
            const r = resolveBuild(build);
            return (
              <button
                key={style.slug}
                type="button"
                onClick={() => onSelect(style.slug)}
                className="group rounded-3xl bg-black/[0.035] p-3 text-left transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-black/[0.055]"
              >
                <div className="flex aspect-square items-center justify-center rounded-2xl p-5">
                  {style.photo ? (
                    <div className="h-full" style={{ aspectRatio: `${style.photo.width} / ${style.photo.height}` }}>
                      <PhotoPreview photo={style.photo} bodyHex={r.bodyHex} trimHex={r.strapHex} alt={style.name} />
                    </div>
                  ) : (
                    <BagPreview build={build} />
                  )}
                </div>
                <div className="px-2 pb-2 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">Bag {style.bagNumber}</p>
                  <h2 className="mt-0.5 text-[19px] font-semibold tracking-[-0.01em] text-charcoal">{style.name}</h2>
                  <p className="mt-1 text-[13px] leading-5 text-black/45">{style.tagline}</p>
                  <p className="mt-3 text-[13px] font-medium text-charcoal">
                    From {formatCurrency(from)}
                    <span className="text-black/40"> / unit · {size.dims.width}&quot; × {size.dims.height}&quot;</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
