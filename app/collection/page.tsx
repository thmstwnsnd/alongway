import Link from "next/link";
import { BagCard } from "@/components/bag-card";
import { SectionHeading } from "@/components/section-heading";
import { bags } from "@/data/bags";

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Collection"
        title="Twelve silhouettes, each designed to earn a longer life."
        body="Every style is ready for standard customization, clear pricing, and repeatable production. Starting prices reflect our core package and give you a clean baseline before quantity discounts."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {bags.map((bag) => (
          <BagCard key={bag.slug} bag={bag} />
        ))}
        {/* Fully Custom card */}
        <article className="group overflow-hidden rounded-[1.75rem] border-2 border-dashed border-charcoal/20 bg-charcoal shadow-card transition-all hover:border-orange">
          <div className="flex aspect-[6/5] w-full items-center justify-center border-b border-white/10 bg-charcoal/90">
            <span className="text-5xl">✦</span>
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold tracking-tight text-bone">Fully Custom</h3>
                <span className="rounded-full bg-orange px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  bespoke
                </span>
              </div>
              <p className="text-sm leading-6 text-bone/70">Got an idea? Build your tote from scratch — specs, fabric, colors, hardware, decoration. All yours.</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-bone/60">
                Starting at <span className="text-orange">$18.00</span> / unit
              </p>
              <Link
                href="/collection/custom"
                className="text-sm font-semibold text-orange hover:text-white"
              >
                Learn more
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
