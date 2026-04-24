import Link from "next/link";

import { BagCard } from "@/components/bag-card";
import { SectionHeading } from "@/components/section-heading";
import { bags } from "@/data/bags";

const featuredBags = bags.slice(0, 3);
const steps = [
  "Pick your bag",
  "Share your artwork",
  "We handle production",
  "Delivered to your door",
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-charcoal/10 bg-bone">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">For now, for later.</p>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
                Made to carry.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-charcoal/72 sm:text-xl">
                The finest bags in all the land.
              </p>
            </div>
            <Link
              href="/collection"
              className="inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-blue"
            >
              See the Collection
            </Link>
          </div>
          <div className="rounded-[2.5rem] border border-charcoal/10 bg-gradient-to-br from-white via-light-bone to-blue/20 p-6 shadow-card">
            <div className="flex h-full min-h-[320px] flex-col justify-between rounded-[2rem] border border-charcoal/10 bg-white/70 p-8">
              <p className="max-w-sm text-sm uppercase tracking-[0.2em] text-charcoal/55">
                Premium custom totes and bags with clean silhouettes and factory-direct quality.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {featuredBags.map((bag) => (
                  <div
                    key={bag.slug}
                    className="aspect-[3/4] rounded-[1.5rem]"
                    style={{ backgroundColor: bag.accent }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionHeading
          eyebrow="What is Alongway?"
          title="A tighter line of bags, built for brands that want it handled."
          body="Alongway offers curated bag silhouettes instead of endless sourcing sprawl. You get all-in pricing, factory-direct quality, and a product line designed to feel considered from the first order through the reorder."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured bags"
            title="A focused assortment of premium silhouettes."
          />
          <Link href="/collection" className="hidden text-sm font-semibold text-orange hover:text-charcoal sm:block">
            Browse all bags
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredBags.map((bag) => (
            <BagCard key={bag.slug} bag={bag} />
          ))}
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionHeading eyebrow="How it works" title="Straightforward from first idea to final delivery." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-[1.75rem] border border-charcoal/10 bg-light-bone p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">
                  Step {index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2.5rem] bg-charcoal px-8 py-12 text-bone sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">Ready to start?</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold tracking-tight">Bring your bag program together.</h2>
              <p className="max-w-2xl text-base leading-7 text-bone/78">
                Share the silhouette, artwork, and timeline. We&apos;ll take it from there.
              </p>
            </div>
            <Link
              href="/start"
              className="inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white hover:text-charcoal"
            >
              Start Your Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
