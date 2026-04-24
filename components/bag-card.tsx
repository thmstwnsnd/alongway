import Link from "next/link";

import type { Bag } from "@/data/bags";

export function BagCard({ bag }: { bag: Bag }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white shadow-card">
      <div
        className="aspect-[4/3] w-full border-b border-charcoal/10"
        style={{
          background: `linear-gradient(135deg, ${bag.accent} 0%, #EEE6D2 100%)`,
        }}
      />
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-bold tracking-tight">{bag.name}</h3>
            <span className="rounded-full bg-light-bone px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/70">
              {bag.size}
            </span>
          </div>
          <p className="text-sm leading-6 text-charcoal/70">{bag.shortDescription}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold">
            Starting at <span className="text-blue">${bag.startingPrice.toFixed(2)}</span>
          </p>
          <Link
            href={`/collection/${bag.slug}`}
            className="text-sm font-semibold text-orange hover:text-charcoal"
          >
            View bag
          </Link>
        </div>
      </div>
    </article>
  );
}
