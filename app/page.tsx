import Link from "next/link";
import Image from "next/image";

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
      {/* Hero — 2/3 photo + 1/3 blue CTA panel */}
      <section className="flex h-[calc(90vh-100px)] min-h-[460px] w-full overflow-hidden">
        {/* Photo — left 2/3 */}
        <div className="relative w-full lg:w-1/2">
          <img
            src="/hero.jpg"
            alt="Alongway custom bags"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* Blue CTA panel — right 50% */}
        <div className="relative flex w-full flex-col items-start justify-center overflow-hidden bg-bone px-8 py-16 lg:w-1/2 lg:px-14">
          {/* For Now For Later badge — eyebrow */}
          {/* Headline */}
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-blue lg:text-6xl">
            Custom Bags<br />Made Simple
          </h1>
          {/* Subtext */}
          <p className="mt-5 text-base leading-7 text-blue/75">
            From $12/unit. 100 minimum. Air shipping included.
          </p>
          {/* Trust line */}
          <p className="font-accent mt-3 text-xs uppercase tracking-widest text-blue/60">
            100+ brands trust Alongway
          </p>
          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/collection"
              className="inline-flex rounded-full bg-blue px-7 py-3.5 text-sm font-semibold text-bone hover:-translate-y-0.5 hover:bg-charcoal"
            >
              See the Collection
            </Link>
            <Link
              href="/start"
              className="font-sans text-sm font-semibold text-blue/70 underline underline-offset-4 hover:text-blue"
            >
              Start Your Order <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg" alt="" width={115} height={79} className="inline-block h-4 w-auto ml-1" aria-hidden="true" />
            </Link>
          </div>
          {/* Mascot anchored to bottom-right, overflows */}
          <Image
            src="/svg/illustrations/Alongway_Website_Graphic_World_Blue.svg"
            alt=""
            width={892}
            height={722}
            className="pointer-events-none absolute -bottom-16 h-auto w-[576px] select-none opacity-80 lg:w-[640px]" style={{ right: '-16px', transform: 'translateX(-40px)' }}
            aria-hidden="true"
          />
        </div>
      </section>


      {/* Auto-scrolling icon marquee */}
      {/* Auto-scrolling icon marquee */}
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

      <section className="relative mx-auto max-w-7xl overflow-visible px-6 py-28 lg:px-10">
        {/* Cloud — just above heading text */}
        <Image src="/svg/clouds/Alongway_Website_Graphic_Cloud_1_Blue.svg" alt="" width={64} height={40}
          className="pointer-events-none absolute top-10 left-16 h-auto w-20 select-none opacity-60 animate-float-1" aria-hidden="true" />
        {/* Cloud — right of heading, same vertical level */}
        <Image src="/svg/clouds/Alongway_Website_Graphic_Cloud_3_Blue.svg" alt="" width={64} height={40}
          className="pointer-events-none absolute right-10 top-1/4 h-auto w-24 select-none opacity-50 animate-float-2" aria-hidden="true" />
        {/* Cloud — near bottom of body text */}
        <Image src="/svg/clouds/Alongway_Website_Graphic_Cloud_2_Blue.svg" alt="" width={64} height={40}
          className="pointer-events-none absolute bottom-10 right-24 h-auto w-20 select-none opacity-60 animate-float-3" aria-hidden="true" />
        <SectionHeading
          eyebrow="What is Alongway?"
          title="A tighter line of bags, built for brands that want it handled."
          body="We got tired of watching brands settle for promo bags that go straight to the donation pile. So we built the thing we wished existed: a tight lineup of real bags, real materials, all-in pricing, and a team that actually gets it done."
        />
      </section>

      <ScrollBird />

      {/* Checkered pattern divider */}
      <Image src="/svg/patterns/Alongway_Website_Graphic_CheckeredPattern_2.svg" alt="" width={1440} height={32}
        className="pointer-events-none w-full select-none" style={{ height: '32px', objectFit: 'cover' }} aria-hidden="true" />

      <section className="bg-white">
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
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-[100px] lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured bags"
            title="A focused assortment of premium silhouettes."
          />
          <Link href="/collection" className="hidden text-sm font-semibold text-light-blue hover:text-charcoal sm:block">
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
            View the full bag lineup <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg" alt="" width={115} height={79} className="inline-block h-4 w-auto ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <SectionHeading eyebrow="How it works" title="Straightforward from first idea to final delivery." />
            <Image
              src="/svg/illustrations/Alongway_Website_Graphic_SmileyFaceBadge_Blue.svg"
              alt=""
              width={96}
              height={96}
              className="pointer-events-none h-auto w-20 select-none self-start opacity-85"
              aria-hidden="true"
            />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const icons = [
                "/svg/icons/Alongway_Website_Graphic_BirdRight_Blue.svg",
                "/svg/icons/Alongway_Website_Graphic_PeaceHand_Blue.svg",
                "/svg/icons/Alongway_Website_Graphic_SmileyFaace_Blue.svg",
                "/svg/icons/Alongway_Website_Graphic_SunIcon_Blue.svg",
              ];
              return (
                <div key={step.title} className="relative card-brand-light p-6 pt-10">
                  {/* Floating icon */}
                  <div className="absolute -top-6 left-5">
                    <Image
                      src={icons[index]}
                      alt=""
                      width={48}
                      height={48}
                      className="pointer-events-none h-12 w-12 select-none"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-blue/60">
                    Step {index + 1}
                  </p>
                  <h3 className="font-display mt-3 text-lg font-bold tracking-tight text-blue">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-charcoal/70">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="relative rounded-[2.5rem] bg-charcoal px-8 py-12 text-bone sm:px-12">
          <Image
            src="/svg/icons/Alongway_Website_Graphic_ForNowForLater_BadgeIcon_Blue.svg"
            alt=""
            width={368}
            height={368}
            className="pointer-events-none absolute -right-4 -top-6 h-auto w-20 rotate-12 select-none opacity-80"
            aria-hidden="true"
          />
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Ready to start?</p>
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
