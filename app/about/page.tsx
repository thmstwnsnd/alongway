import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getLifestyleImageUrl } from "@/data/bags";

const values = [
  "Curated silhouettes",
  "All-in pricing",
  "Factory-direct quality",
  "Built to be kept",
  "Brand feel",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="About"
        title="We built Alongway because good bags should not require a sourcing director."
        body="Alongway is for brands that want custom bags to feel premium, clear, and manageable. The line stays intentionally tight so every silhouette can do more work, hold better shape, and support repeat orders without friction."
      />

      <section className="mt-14 mb-14 rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <img
            src={getLifestyleImageUrl(1, "square")}
            alt="Easton Jones"
            className="h-40 w-40 rounded-full object-cover shadow-card ring-4 ring-bone"
          />
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">Founder</p>
            <h2 className="text-3xl font-bold tracking-tight">Easton Jones</h2>
            <p className="max-w-2xl text-base leading-7 text-charcoal/75">
              Easton has spent years in the custom goods and design world — working with brands from scrappy startups to household names. He built Alongway out of frustration with the status quo: sourcing bags shouldn&apos;t require a procurement team, and branded merchandise shouldn&apos;t feel disposable.
            </p>
            <p className="max-w-2xl text-base leading-7 text-charcoal/75">
              Based in Los Angeles. Into surfing, music, and products that are actually worth keeping.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card">
          <h2 className="text-3xl font-bold tracking-tight">What sets us apart</h2>
          <div className="mt-6 grid gap-3">
            {values.map((value) => (
              <div
                key={value}
                className="rounded-full border border-charcoal/10 bg-light-bone px-4 py-3 text-sm font-semibold"
              >
                {value}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-charcoal/10 bg-bone p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">Contact</p>
          <p className="mt-5 text-3xl font-extrabold tracking-tight">hello@alongway.co</p>
          <p className="mt-4 text-base leading-7 text-charcoal/72">
            Reach out when you&apos;re ready to launch a new bag, restock a proven style, or get a fast read on fit and pricing.
          </p>
          <div className="mt-8 border-t border-charcoal/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/40">A brand by</p>
            <a
              href="https://orangegoods.co"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-orange"
            >
              Orange Goods →
            </a>
            <p className="mt-1 text-xs text-charcoal/50">Custom branded goods &amp; design studio, Los Angeles.</p>
          </div>
        </article>
      </section>
    </div>
  );
}
