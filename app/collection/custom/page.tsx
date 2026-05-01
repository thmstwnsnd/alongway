import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  { emoji: "📐", title: "Dimensions & shape", body: "Tell us the size, gusset depth, handle length, and overall silhouette. Have a reference bag? Send a photo or a sketch." },
  { emoji: "🧵", title: "Fabric & materials", body: "Choose your canvas weight, material type (canvas, Tyvek, waxed canvas, nylon, etc.), and color. We can source specific fabrics or match a reference." },
  { emoji: "🎨", title: "Decoration & branding", body: "Screen print, embroidery, woven label, patch, or a combination. Exterior and interior. We'll build it around your brand." },
  { emoji: "✨", title: "Details & hardware", body: "Zippers, pockets, lining, strap style, rivets, snaps — every detail is specifiable. Nothing is assumed." },
  { emoji: "📋", title: "Techpack & approval", body: "We build a full techpack showing your bag before anything goes to production. You approve every detail before we start." },
];

export default function CustomTotePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      {/* Hero */}
      <div className="rounded-[2.5rem] bg-charcoal px-8 py-16 text-bone sm:px-12 lg:px-16">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Fully custom</p>
        <h1 className="font-display mt-4 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl">
          Build your tote from scratch.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-bone/80">
          Got a specific idea? We'll build it. Dimensions, fabric, colors, construction, decoration — every detail is yours to define. If you can sketch it, we can make it.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/collection/custom/inquire"
            className="inline-flex rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white hover:text-charcoal"
          >
            Start your custom inquiry
          </Link>
          <Link
            href="/collection"
            className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-bone hover:-translate-y-0.5 hover:border-white hover:text-white"
          >
            Browse ready-made styles
          </Link>
        </div>
      </div>

      {/* Pricing callout */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Starting from</p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight">$18<span className="text-xl font-semibold text-charcoal/50">/unit</span></p>
          <p className="mt-2 text-sm text-charcoal/60">At 250+ units. Price varies by specs, materials, and complexity.</p>
        </div>
        <div className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Minimum order</p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight">250 <span className="text-xl font-semibold text-charcoal/50">units</span></p>
          <p className="mt-2 text-sm text-charcoal/60">Fully custom builds require a higher MOQ than our standard line.</p>
        </div>
        <div className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Timeline</p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight">10–14 <span className="text-xl font-semibold text-charcoal/50">wks</span></p>
          <p className="mt-2 text-sm text-charcoal/60">From approved techpack to delivery. Longer than standard due to custom sourcing.</p>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-16">
        <SectionHeading
          eyebrow="How custom works"
          title="Straightforward from first idea to final delivery."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step, i) => {
            const icons = [
              "/svg/icons/Alongway_Website_Graphic_BirdRight_Blue.svg",
              "/svg/icons/Alongway_Website_Graphic_PeaceHand_Blue.svg",
              "/svg/icons/Alongway_Website_Graphic_SmileyFaace_Blue.svg",
              "/svg/icons/Alongway_Website_Graphic_SunIcon_Blue.svg",
              "/svg/icons/Alongway_Website_Graphic_Banner_Blue.svg",
            ];
            return (
              <div key={step.title} className="relative flex flex-col rounded-[1.75rem] bg-blue p-6 pt-10 text-bone shadow-card">
                {/* Floating icon */}
                <div className="absolute -top-6 left-6">
                  <Image
                    src={icons[i]}
                    alt=""
                    width={48}
                    height={48}
                    className="pointer-events-none h-12 w-12 select-none"
                    aria-hidden="true"
                  />
                </div>
                {/* Step number */}
                <span className="mb-2 font-display text-xs text-bone/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-sm font-bold text-bone">{step.title}</h3>
                <p className="mt-2 text-xs leading-5 text-bone/70">{step.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 rounded-[2rem] bg-bone px-8 py-10 text-center">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">Ready to build?</p>
        <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight">Tell us about your idea.</h2>
        <p className="mt-3 max-w-xl mx-auto text-base text-charcoal/70">
          Fill out our custom inquiry form. No commitment — just tell us what you're thinking and we'll come back with a quote and a direction.
        </p>
        <Link
          href="/collection/custom/inquire"
          className="mt-6 inline-flex rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
        >
          Start your custom inquiry
        </Link>
      </div>
    </div>
  );
}
