import Link from "next/link";

import { type Bag, getBagImageUrl } from "@/data/bags";

export function BagCard({ bag }: { bag: Bag }) {
  return (
<article className="group overflow-hidden rounded-[1.75rem] border-2 border-charcoal/15 bg-white shadow-card hover:border-blue transition-colors">
      <img
        src={getBagImageUrl(bag.slug)}
        alt={bag.name}
        className="aspect-[6/5] w-full border-b border-charcoal/10 object-cover"
      />
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight">{bag.name}</h3>
            <span className="rounded-full bg-light-bone px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/70">
              {bag.size}
            </span>
          </div>
          <p className="text-sm leading-6 text-charcoal/70">{bag.tagline}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">
              Starting at <span className="text-blue">${bag.startingPrice.toFixed(2)}</span>
            </p>
            <p className="text-xs text-charcoal/50">Min. 100 units · Mix &amp; match styles OK</p>
          </div>
          <Link
            href={`/collection/${bag.slug}`}
            className="text-sm font-semibold text-kelly hover:text-charcoal"
          >
            View bag
          </Link>
        </div>
      </div>
    </article>
  );
}
