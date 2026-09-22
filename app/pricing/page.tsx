import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { bags, quantityTiers } from "@/data/bags";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, all-in custom tote pricing by style and quantity. Fabric, decoration, label, setup and shipping included. No hidden fees.",
};


export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Pricing"
        title="No quotes. No surprises. Just clear pricing."
        body="All prices are starting-from per unit. Every order includes free setup, free shipping, and your choice of main decoration."
      />

      <div className="mt-12 overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-light-bone">
              <tr>
                <th className="px-6 py-4 font-semibold">Bag</th>
                {quantityTiers.map((tier) => (
                  <th key={tier} className="px-6 py-4 font-semibold">
                    {tier.toLocaleString()}
                  </th>
                ))}
                <th className="px-6 py-4 font-semibold">5,000+</th>
              </tr>
            </thead>
            <tbody>
              {bags.map((bag) => (
                <tr key={bag.slug} className="border-t border-charcoal/10 align-top">
                  <td className="px-6 py-5">
                    <div className="font-semibold">{bag.name}</div>
                    <div className="mt-1 text-charcoal/60">Starting from</div>
                  </td>
                  {bag.pricingTiers.map((tier) => (
                    <td key={tier.quantity} className="px-6 py-5 text-charcoal/80">
                      {tier.unitPrice}
                    </td>
                  ))}
                  <td className="px-6 py-5 font-semibold text-blue">Custom quote</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-charcoal/10 bg-light-bone px-6 py-5">
        <p className="text-sm font-semibold text-charcoal">Every order includes:</p>
        <ul className="mt-3 grid gap-2 text-sm text-charcoal/75 sm:grid-cols-2">
          <li>✓ Main decoration — screen print, embroidery, patch, or woven label</li>
          <li>✓ Interior branded woven label</li>
          <li>✓ Free setup</li>
          <li>✓ Free shipping to one US address</li>
        </ul>
        <p className="mt-4 text-sm leading-6 text-charcoal/75">
          Want to save on large orders? Economy sea freight shipping (-$2/unit) is available at checkout. Add 30-35 days to your delivery timeline.
        </p>
        <p className="mt-4 text-xs text-charcoal/50">MOQ is 100 units. Orders of 5,000+ units receive a custom quote.</p>
      </div>
    </div>
  );
}
