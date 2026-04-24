"use client";

import Link from "next/link";
import { useState } from "react";
import type { Bag, BagVariant } from "@/data/bags";
import { getBagImageUrl } from "@/data/bags";

export function BagDetail({ bag }: { bag: Bag }) {
  const [selectedVariant, setSelectedVariant] = useState<BagVariant | null>(
    bag.variants ? bag.variants[1] ?? bag.variants[0] : null // default to medium if exists
  );

  const active = selectedVariant ?? bag;
  const activePricingTiers = selectedVariant
    ? bag.variants?.find((v) => v.key === selectedVariant.key)
      ? (() => {
          // build pricing tiers for the selected variant's size
          const sizeMap: Record<string, Record<number, number>> = {
            small:  { 100: 7.5,  250: 6.5,  500: 5.75, 1000: 5.25, 2000: 4.75 },
            medium: { 100: 11.0, 250: 9.5,  500: 8.5,  1000: 7.75, 2000: 7.00 },
            large:  { 100: 14.5, 250: 12.5, 500: 11.0, 1000: 9.75, 2000: 8.75 },
          };
          const prices = sizeMap[selectedVariant.size];
          return Object.entries(prices).map(([qty, price]) => ({
            quantity: Number(qty),
            unitPrice: `$${price.toFixed(2)}`,
          }));
        })()
      : bag.pricingTiers
    : bag.pricingTiers;

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <img
          src={getBagImageUrl(bag.slug, "hero")}
          alt={bag.name}
          className="min-h-[420px] w-full rounded-[2.5rem] border border-charcoal/10 object-cover shadow-card"
        />

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">
              {bag.material}
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight">{bag.name}</h1>
            <p className="text-lg leading-8 text-charcoal/75">{active.tagline}</p>
          </div>

          {/* Size selector for variants */}
          {bag.variants && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Size</p>
              <div className="flex gap-3">
                {bag.variants.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setSelectedVariant(v)}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                      selectedVariant?.key === v.key
                        ? "border-orange bg-orange text-white shadow-card"
                        : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          <div className="grid gap-5 rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:grid-cols-2">
            <Spec label="Material" value={bag.material} />
            <Spec label="Dimensions" value={active.dimensions} />
            <Spec label="MOQ" value="100 units" />
            <Spec label="Includes" value="Free setup · Free shipping · Main decoration · Interior woven label" />
          </div>

          {/* Features */}
          <div className="rounded-[2rem] border border-charcoal/10 bg-light-bone p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Features</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {active.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm font-medium text-charcoal/80"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white shadow-card">
            <div className="border-b border-charcoal/10 px-6 py-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Pricing tiers
                {selectedVariant && (
                  <span className="ml-2 text-base font-normal text-charcoal/50">— {selectedVariant.label}</span>
                )}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-light-bone text-charcoal/70">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Quantity</th>
                    <th className="px-6 py-4 font-semibold">Per-unit price</th>
                  </tr>
                </thead>
                <tbody>
                  {activePricingTiers.map((tier) => (
                    <tr key={tier.quantity} className="border-t border-charcoal/10">
                      <td className="px-6 py-4 font-medium">{tier.quantity.toLocaleString()} units</td>
                      <td className="px-6 py-4">{tier.unitPrice}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-charcoal/10 bg-light-bone">
                    <td className="px-6 py-4 font-medium">5,000+ units</td>
                    <td className="px-6 py-4 font-semibold text-blue">Custom quote</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/shop?bag=${bag.slug}${selectedVariant ? `&variant=${selectedVariant.key}` : ""}`}
              className="inline-flex justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Start Your Order
            </Link>
            <Link
              href="/collection"
              className="inline-flex justify-center rounded-full border border-charcoal/15 bg-white px-6 py-3 text-sm font-semibold text-charcoal hover:-translate-y-0.5 hover:border-blue hover:text-blue"
            >
              Browse all bags
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">{label}</p>
      <p className="text-sm leading-6 text-charcoal">{value}</p>
    </div>
  );
}
