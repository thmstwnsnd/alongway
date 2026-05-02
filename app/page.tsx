import Link from "next/link";
import Image from "next/image";

import { BagCard } from "@/components/bag-card";
import { SectionHeading } from "@/components/section-heading";
import { ScrollBird } from "@/components/scroll-bird";
import { ScrollRotateBadge } from "@/components/scroll-rotate-badge";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { PhotoCarousel } from "@/components/photo-carousel";
import { ScrollReveal } from "@/components/scroll-reveal";
import { IconReveal } from "@/components/icon-reveal";
import { PerksAccordion } from "@/components/perks-accordion";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { bags } from "@/data/bags";

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

const perks = [
  {
    icon: "/svg/icons/Alongway_Website_Graphic_BirdRight_Blue.svg",
    label: "Free air shipping",
    body: "Every order ships air freight to one US address. No surprise freight bills.",
  },
  {
    icon: "/svg/icons/Alongway_Website_Graphic_SunIcon_Blue.svg",
    label: "Transparent pricing",
    body: "Per-unit costs upfront. No hidden setup fees. No runaround.",
  },
  {
    icon: "/svg/icons/Alongway_Website_Graphic_SmileyFaace_Blue.svg",
    label: "Low MOQ",
    body: "Start from 100 units. Scale when you're ready.",
  },
  {
    icon: "/svg/icons/Alongway_Website_Graphic_Flower_Blue.svg",
    label: "30-day production",
    body: "Factory-to-door in 30 days. Rush available on select styles.",
  },
  {
    icon: "/svg/icons/Alongway_Website_Graphic_PeaceHand_Blue.svg",
    label: "Real support",
    body: "A real person responds within one business day. No ticket queues.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── 1. HERO ── */}
      <section className="flex h-[calc(90vh-100px)] min-h-[460px] w-full overflow-hidden">
        {/* Photo — left half, slideshow */}
        <div className="relative w-full lg:w-1/2">
          <HeroSlideshow />
        </div>

        {/* CTA panel — right half */}
        <div className="relative flex w-full flex-col items-start justify-center overflow-hidden bg-bone py-16 pl-[62px] pr-8 lg:w-1/2 lg:pl-[86px] lg:pr-14">
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-blue lg:text-6xl">
            Custom Bags<br />Made Simple
          </h1>
          <p className="mt-5 text-lg font-medium leading-7 text-blue/80">
            All-in pricing. Free air freight. Nothing hidden. Ready in 5 weeks.
          </p>
          <p className="font-accent mt-3 text-sm uppercase tracking-widest text-blue/60">
            For brands that care what they hand out.
          </p>
          <div className="mt-8 flex flex-row flex-wrap gap-3">
            <Link
              href="/collection"
              className="inline-flex items-center rounded-full bg-blue px-7 py-3.5 text-sm font-semibold text-bone hover:-translate-y-0.5 hover:bg-charcoal"
            >
              See the Collection
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center rounded-full border-2 border-blue px-7 py-3.5 text-sm font-semibold text-blue hover:-translate-y-0.5 hover:bg-blue hover:text-bone"
            >
              Start Your Order
            </Link>
          </div>
          <Image
            src="/svg/illustrations/Alongway_Website_Graphic_World_Blue.svg"
            alt=""
            width={892}
            height={722}
            className="pointer-events-none absolute -bottom-16 h-auto w-[576px] select-none opacity-80 lg:w-[640px]"
            style={{ right: "-16px", transform: "translateX(-40px)" }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ── 2. MARQUEE ── */}
      <div className="overflow-hidden border-y-4 border-blue bg-light-blue" style={{ height: "80px" }}>
        <div className="animate-marquee flex h-full w-max items-center gap-20 px-20">
          {Array.from({ length: 20 }).flatMap((_, i) =>
            [
              { src: "/svg/icons/Alongway_Website_Graphic_Flower_Blue.svg", w: 200, h: 200 },
              { src: "/svg/icons/Alongway_Website_Graphic_SmileyFaace_Blue.svg", w: 188, h: 186 },
              { src: "/svg/icons/Alongway_Website_Graphic_BirdRight_Blue.svg", w: 200, h: 200 },
              { src: "/svg/icons/Alongway_Website_Graphic_PeaceHand_Blue.svg", w: 269, h: 449 },
            ].map((icon) => (
              <Image
                key={`${icon.src}-${i}`}
                src={icon.src}
                alt=""
                width={icon.w}
                height={icon.h}
                className="pointer-events-none h-10 w-auto flex-none select-none"
                aria-hidden="true"
              />
            )),
          )}
        </div>
      </div>

      {/* ── 3. WHAT IS ALONGWAY? + Wormhole illustration ── */}
      <section className="relative mx-auto max-w-7xl overflow-visible px-6 py-28 lg:px-10">
        {/* Floating clouds */}
        <Image
          src="/svg/clouds/Alongway_Website_Graphic_Cloud_1_Blue.svg"
          alt="" width={64} height={40}
          className="pointer-events-none absolute top-10 left-16 h-auto w-20 select-none opacity-60 animate-float-1"
          aria-hidden="true"
        />
        <Image
          src="/svg/clouds/Alongway_Website_Graphic_Cloud_3_Blue.svg"
          alt="" width={64} height={40}
          className="pointer-events-none absolute right-10 top-1/4 h-auto w-24 select-none opacity-50 animate-float-2"
          aria-hidden="true"
        />
        <Image
          src="/svg/clouds/Alongway_Website_Graphic_Cloud_2_Blue.svg"
          alt="" width={64} height={40}
          className="pointer-events-none absolute bottom-10 right-24 h-auto w-20 select-none opacity-60 animate-float-3"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-12 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SectionHeading
              eyebrow="What is Alongway?"
              title="A tighter line of bags, built for brands that want it handled."
              body="We got tired of watching brands settle for promo bags that go straight to the donation pile. So we built the thing we wished existed: a tight lineup of real bags, real materials, all-in pricing, and a team that actually gets it done."
            />
          </div>
          {/* Lifestyle photo + WormHole stacked */}
          <div className="relative shrink-0 self-start">
            <div className="overflow-hidden rounded-2xl" style={{ width: "320px", height: "420px" }}>
              <img
                src="/photos/lifestyle-verve-cosmic-1.jpg"
                alt="Custom branded bags in use"
                className="h-full w-full object-cover"
              />
            </div>
            <Image
              src="/svg/illustrations/Alongway_Website_Graphic_WormHole_Blue.svg"
              alt=""
              width={160}
              height={160}
              className="pointer-events-none absolute -bottom-8 -right-8 h-auto w-24 select-none opacity-90 lg:w-28"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ── 4. SCROLL BIRD ── */}
      <ScrollBird />

      {/* ── 5. TRUSTED BRANDS ── */}
      <section className="bg-light-blue">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-10">
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
        <div
          aria-hidden="true"
          style={{
            height: "48px",
            backgroundColor: "#94A6D2",
            backgroundImage: "url(/svg/patterns/Alongway_Website_Graphic_CheckeredPattern_2.svg)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "left center",
            borderTop: "4px solid #94A6D2",
            borderBottom: "4px solid #94A6D2",
          }}
        />
      </section>

      {/* ── 6. FEATURED BAGS ── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-[100px] lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured bags"
            title="A focused assortment of premium silhouettes."
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {featuredBags.map((bag) => (
            <BagCard key={bag.slug} bag={bag} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/collection"
            className="inline-flex items-center rounded-full bg-blue px-8 py-3 text-sm font-semibold text-bone hover:-translate-y-0.5 hover:bg-light-blue hover:text-blue"
          >
            View the full bag lineup{" "}
            <Image
              src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Cream.svg"
              alt=""
              width={115}
              height={79}
              className="inline-block h-4 w-auto ml-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>

      {/* ── 7. WHY ALONGWAY — perks grid ── */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <SectionHeading
            eyebrow="Why Alongway"
            title="Everything included. No surprises."
          />
          <PerksAccordion />
        </div>
      </section>

      {/* ── 8. HOW IT WORKS ── */}
      <section className="border-y border-charcoal/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <SectionHeading eyebrow="How it works" title="Straightforward from first idea to final delivery." />
            <ScrollRotateBadge />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {steps.map((step, index) => {
              const icons = [
                "/svg/icons/Alongway_Website_Graphic_BirdRight_BlueCream.svg",
                "/svg/icons/Alongway_Website_Graphic_PeaceHand_BlueCream.svg",
                "/svg/icons/Alongway_Website_Graphic_SmileyFaace_BlueCream.svg",
                "/svg/icons/Alongway_Website_Graphic_SunIcon_BlueCream.svg",
              ];
              return (
                <ScrollReveal key={step.title} delay={index * 130} rotate={[-1, 1.5, -1, 1][index]}>
                <div className="relative pt-6 h-full">
                  {/* Icon — behind card for peace sign (index 1), in front for all others */}
                  <div className={`absolute ${index === 0 ? "left-[30px]" : "left-1/2 -translate-x-1/2"} ${index === 1 ? "z-0 -top-6" : "z-20 top-0"}`}>
                    <IconReveal delay={index * 130 + 320}>
                      <Image
                        src={icons[index]}
                        alt=""
                        width={58}
                        height={58}
                        className="pointer-events-none h-14 w-14 select-none"
                        aria-hidden="true"
                      />
                    </IconReveal>
                  </div>
                  {/* Card on top */}
                  <div className="relative z-10 card-brand-light p-6 pt-10 h-full">
                    <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-blue/60">
                      Step {index + 1}
                    </p>
                    <h3 className="font-display mt-3 text-lg font-bold tracking-tight text-blue">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-charcoal/70">{step.body}</p>
                  </div>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/start"
              className="inline-flex items-center rounded-full bg-blue px-8 py-3.5 font-display text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Get Started
              <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Cream.svg" alt="" width={115} height={79} className="inline-block h-4 w-auto ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. PHOTO CAROUSEL ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionHeading eyebrow="The collection" title="Bags worth showing off." />
        <div className="mt-10">
          <PhotoCarousel />
        </div>
      </section>

      {/* ── 10. TESTIMONIALS ── */}
      <TestimonialCarousel />

      {/* ── 11. READY TO START — final CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <p className="font-accent mb-6 text-center text-sm text-charcoal/40">The finest bags in all the land.</p>
        <div className="relative rounded-[2.5rem] bg-charcoal px-8 py-12 text-bone sm:px-12">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Ready to start?</p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-4xl font-extrabold tracking-tight">Bring your bag program together.</h2>
              <p className="max-w-2xl text-base leading-7 text-bone/80">
                Tell us the bag, the artwork, and when you need it. We&apos;ll follow up with a timeline and a quote. No sales team. No runaround.
              </p>
            </div>
            <Link
              href="/start"
              className="inline-flex items-center rounded-full bg-blue px-6 py-3 font-display text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white hover:text-charcoal"
            >
              Start Your Order
              <Image
                src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Cream.svg"
                alt=""
                width={115}
                height={79}
                className="inline-block h-4 w-auto ml-2"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
