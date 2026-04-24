import { SectionHeading } from "@/components/section-heading";

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
        </article>
      </section>
    </div>
  );
}
