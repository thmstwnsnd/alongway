import Link from "next/link";

import { BagCard } from "@/components/bag-card";
import { SectionHeading } from "@/components/section-heading";
import { ScrollBird } from "@/components/scroll-bird";
import { bags, getLifestyleImageUrl } from "@/data/bags";

const featuredBags = bags.slice(0, 3);
const steps = [
  {
    title: "Pick your bag",
    body: "Browse our silhouettes. Real materials, not catalog fillers. Not sure on feel? Order a swatch kit – $8.",
  },
  {
    title: "Share your artwork",
    body: ".ai, .eps, or .pdf. Clean vector files only. No artwork yet? We can help.",
  },
  {
    title: "Approve your tech pack",
    body: "We send a detailed tech pack within 2 business days of artwork approval. Nothing goes to production until you sign off.",
  },
  {
    title: "Delivered to your door",
    body: "30 days production + air freight to one US address. Included in your price.",
  },
];
const trustedBrands = [
  "Stanford",
  "Stanford Medicine",
  "Banner Coffee",
  "Field Day Coffee",
  "High St Deli",
  "Gymshark",
  "Synergy Kombucha",
  "Verve Coffee",
];

export default function HomePage() {
  return (
    <div>
      {/* Full-bleed hero banner */}
      <section className="relative h-[90vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={getLifestyleImageUrl(0, "wide")}
          alt="Alongway custom bags"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-charcoal/40" />
        {/* Content */}
        <div className="relative flex h-full flex-col items-start justify-end px-8 pb-16 lg:px-16 lg:pb-20">
          <p className="font-accent mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.26em] text-bone/80">
            <span className="h-3 w-0.5 rounded-full bg-kelly/70" />
            For now, for later.
          </p>
          <h1 className="font-display max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Made to carry.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
            Custom bags, made simple. From $12/unit – 100 minimum, air shipping included.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/collection"
              className="inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-charcoal hover:-translate-y-0.5 hover:bg-bone"
            >
              See the Collection
            </Link>
            <Link
              href="/start"
              className="inline-flex rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:border-white"
            >
              Start Your Order
            </Link>
          </div>
        </div>
      </section>

      <ScrollBird />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionHeading
          eyebrow="What is Alongway?"
          title="A tighter line of bags, built for brands that want it handled."
          body="We got tired of watching brands settle for promo bags that go straight to the donation pile. So we built the thing we wished existed: a tight lineup of real bags, real materials, all-in pricing, and a team that actually gets it done."
        />
      </section>

      <section className="border-y border-charcoal/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 text-center lg:px-10">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">
            Trusted by brands that care about quality
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {trustedBrands.map((brand) => (
              <span key={brand} className="rounded-full bg-light-bone px-4 py-2 text-sm font-semibold text-charcoal">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured bags"
            title="A focused assortment of premium silhouettes."
          />
          <Link href="/collection" className="hidden text-sm font-semibold text-kelly hover:text-charcoal sm:block">
            Browse all bags
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredBags.map((bag) => (
            <BagCard key={bag.slug} bag={bag} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/collection"
            className="inline-flex rounded-full border border-charcoal/20 bg-white px-8 py-3 text-sm font-semibold text-charcoal hover:-translate-y-0.5 hover:border-charcoal hover:shadow-card"
          >
            View the full bag lineup →
          </Link>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionHeading eyebrow="How it works" title="Straightforward from first idea to final delivery." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[1.75rem] border border-charcoal/10 bg-light-bone p-6">
                <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-blue">
                  Step {index + 1}
                </p>
                <h3 className="font-display mt-4 text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-charcoal/68">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2.5rem] bg-charcoal px-8 py-12 text-bone sm:px-12">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-kelly">Ready to start?</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-4xl font-extrabold tracking-tight">Bring your bag program together.</h2>
              <p className="max-w-2xl text-base leading-7 text-bone/78">
                Tell us the bag, the artwork, and when you need it. We&apos;ll follow up with a timeline and a quote. No sales team. No runaround.
              </p>
            </div>
            <Link
              href="/start"
              className="inline-flex rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white hover:text-charcoal"
            >
              Start Your Order
            </Link>
          </div>
        </div>
        <p className="font-accent mt-6 text-center text-sm text-charcoal/40">The finest bags in all the land.</p>
      </section>
    </div>
  );
}
