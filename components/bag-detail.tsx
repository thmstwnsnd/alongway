"use client";

import Link from "next/link";
import type { Bag } from "@/data/bags";
import { getBagImageUrl } from "@/data/bags";
import { BagConfigurator } from "@/components/bag-configurator";

const channelToteSizes = [
  { slug: "channel-tote-small", label: "Small" },
  { slug: "channel-tote-medium", label: "Medium" },
  { slug: "channel-tote-large", label: "Large" },
];

const isChannelTote = (slug: string) => slug.startsWith("channel-tote");

export function BagDetail({ bag }: { bag: Bag }) {
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
            <p className="text-lg leading-8 text-charcoal/75">{bag.tagline}</p>
          </div>

          {/* Channel Tote size switcher */}
          {isChannelTote(bag.slug) && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Also available in</p>
              <div className="flex gap-3">
                {channelToteSizes.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/collection/${s.slug}`}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                      bag.slug === s.slug
                        ? "border-orange bg-orange text-white shadow-card"
                        : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal"
                    }`}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          <div className="grid gap-5 rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:grid-cols-2">
            <Spec label="Material" value={bag.material} />
            <Spec label="Dimensions" value={bag.dimensions} />
            <Spec label="MOQ" value="100 units" />
            <Spec label="Includes" value="Free setup · Free shipping · Main decoration · Interior woven label" />
          </div>

          {/* Features */}
          <div className="rounded-[2rem] border border-charcoal/10 bg-light-bone p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Features</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {bag.features.map((feature) => (
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
              <h2 className="text-2xl font-bold tracking-tight">Pricing tiers</h2>
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
                  {bag.pricingTiers.map((tier) => (
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
              href={`/shop?bag=${bag.slug}`}
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

      <div className="mt-12">
        <BagConfigurator bag={bag} />
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
