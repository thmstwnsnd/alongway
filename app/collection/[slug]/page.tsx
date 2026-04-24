import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { bags, getBagBySlug } from "@/data/bags";

export function generateStaticParams() {
  return bags.map((bag) => ({ slug: bag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bag = getBagBySlug(slug);

  if (!bag) {
    return {
      title: "Bag not found | Alongway",
    };
  }

  return {
    title: `${bag.name} | Alongway`,
    description: bag.description,
  };
}

export default async function BagDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bag = getBagBySlug(slug);

  if (!bag) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div
          className="min-h-[420px] rounded-[2.5rem] border border-charcoal/10 shadow-card"
          style={{
            background: `linear-gradient(145deg, ${bag.accent} 0%, #EEE6D2 100%)`,
          }}
        />
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">{bag.size} silhouette</p>
            <h1 className="text-5xl font-extrabold tracking-tight">{bag.name}</h1>
            <p className="text-lg leading-8 text-charcoal/75">{bag.description}</p>
          </div>

          <div className="grid gap-5 rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:grid-cols-3">
            <Spec label="Materials" value="Premium canvas, reinforced stitching" />
            <Spec label="Dimensions" value={bag.dimensions} />
            <Spec label="MOQ" value="50 units" />
          </div>

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
                      <td className="px-6 py-4 font-medium">{tier.quantity} units</td>
                      <td className="px-6 py-4">{tier.unitPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Link
            href="/start"
            className="inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Start Your Order
          </Link>
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
