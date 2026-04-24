import { SectionHeading } from "@/components/section-heading";
import { bags, quantityTiers } from "@/data/bags";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Pricing"
        title="No quotes. No surprises. Just clear pricing."
        body="All prices below are marked as starting from and give you a consistent baseline across the full line."
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

      <p className="mt-6 max-w-3xl text-sm leading-6 text-charcoal/70">
        MOQ is 100 units. Prices include production, standard customization, and shipping to one US address. Setup fee: $50 one-time. Orders of 5,000+ units receive a custom quote.
      </p>
    </div>
  );
}
