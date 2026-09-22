import Link from "next/link";
import { site } from "@/lib/site";

const nextSteps = [
  {
    icon: "✅",
    title: "Order confirmed",
    description:
      "We've received your order and payment. You'll get a confirmation email shortly.",
  },
  {
    icon: "📐",
    title: "Techpack sent within 24hrs",
    description:
      "We'll send you a detailed techpack showing your bag with exact artwork placement guides, print areas, and size specs.",
  },
  {
    icon: "✏️",
    title: "Artwork approval",
    description:
      "You review and approve the design before anything goes to production. Nothing moves forward without your sign-off.",
  },
  {
    icon: "🏭",
    title: "Production begins",
    description:
      "Once approved, your bags go into production. Typical timeline: 6–8 weeks.",
  },
  {
    icon: "📦",
    title: "Shipped + tracking",
    description:
      "We'll send tracking info as soon as your order ships.",
  },
  {
    icon: "🎉",
    title: "Delivered",
    description:
      "Your bags arrive. And when you're ready to reorder, we make it easy.",
  },
];

export function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
      <section className="rounded-[2.5rem] border border-charcoal/10 bg-white p-8 shadow-card sm:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue/12 text-5xl text-light-blue">
            ✓
          </div>
          <p className="font-accent mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-light-blue">Order confirmed</p>
          <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Order confirmed.</h1>
          <p className="mt-4 text-lg leading-8 text-charcoal/72">
            You&apos;re not just done — you&apos;re just getting started.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-8">
          {nextSteps.map((step, index) => (
            <div key={step.title} className="grid grid-cols-[3rem_1fr] gap-5">
              <div className="relative flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-bone text-xl">
                  {step.icon}
                </div>
                {index < nextSteps.length - 1 ? (
                  <div className="absolute top-12 h-[calc(100%+1.5rem)] w-px bg-charcoal/12" />
                ) : null}
              </div>
              <div className="pb-8">
                <h2 className="font-display text-xl font-bold tracking-tight">{step.title}</h2>
                <p className="mt-2 text-base leading-7 text-charcoal/72">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-3xl rounded-[2rem] bg-light-bone p-6 text-sm leading-7 text-charcoal/75">
          <p>
            Questions? Text us:{" "}
            <a href="tel:3105550100" className="font-semibold text-blue hover:text-charcoal">
              (310) 555-0100
            </a>
          </p>
          <p>
            Or email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-blue hover:text-charcoal">
              {site.email}
            </a>
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/collection"
            className="inline-flex rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Back to Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
