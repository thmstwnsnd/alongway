import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Pick a bag, share your artwork, approve the tech pack, and we deliver. 30 days production plus shipping, all included in your price.",
};


const steps = [
  {
    emoji: "🛍️",
    title: "Choose your bag",
    body: "Browse our curated line of 12 silhouettes. Pick the one that fits your brand — size, material, and carry style. Not sure? Request a free swatch kit and feel the fabrics before you commit.",
  },
  {
    emoji: "🎨",
    title: "Share your artwork",
    body: "Upload your artwork files (.ai, .pdf, or .eps). Choose your decoration type — screen print, embroidery, patch, or woven label. Pick your fabric color and strap color. No artwork yet? Our design team can help.",
  },
  {
    emoji: "📐",
    title: "Approve your techpack",
    body: "Within two business days of your order, we send a detailed techpack showing your exact bag with artwork placement, print areas, and size specs. Nothing goes to production until you sign off.",
  },
  {
    emoji: "🏭",
    title: "We handle production",
    body: "Your bags are produced in our China factory — the same facilities supplying major retail brands. Typical production timeline is 30 days from artwork approval.",
  },
  {
    emoji: "📦",
    title: "Delivered to your door",
    body: "We ship to one address per order. US shipping is always free. International shipping available — pricing depends on destination. Tracking info sent as soon as your order ships.",
  },
];

const faqs = [
  {
    category: "Ordering",
    items: [
      {
        q: "What's the minimum order quantity?",
        a: "100 units per bag style. This is our MOQ across the full line.",
      },
      {
        q: "Can I order multiple bag styles in one order?",
        a: "Yes — each style requires a minimum of 100 units. So an order with 3 styles would be a minimum of 300 units total.",
      },
      {
        q: "How does payment work?",
        a: "All orders are paid in full at checkout. We accept all major credit cards via Stripe, or we can send an invoice.",
      },
      {
        q: "Do you offer rush orders?",
        a: "In certain cases, yes. Message us your desired timeline and we'll do our best to accommodate.",
      },
      {
        q: "Can I get a swatch before ordering?",
        a: "Yes — we offer an $8 swatch kit with fabric samples so you can feel the materials before committing.",
      },
    ],
  },
  {
    category: "Artwork & Design",
    items: [
      {
        q: "What file formats do you accept?",
        a: "We accept .ai, .pdf, and .eps files only. These are true vector formats that guarantee clean, sharp results at any size. PNG and JPEG are not accepted for production.",
      },
      {
        q: "What if I don't have artwork?",
        a: "No problem. Our design team can help. Just note it on your order form and we'll reach out to get started after checkout.",
      },
      {
        q: "What decoration methods are available?",
        a: "Screen print, embroidery, patch, and woven label. Every order includes your chosen main decoration plus an interior branded woven label at no extra cost.",
      },
      {
        q: "How many colors can I use?",
        a: "There's no hard limit — more colors means a higher price. Standard orders use a focused color palette. Complex multi-color or block-style decorations are priced on a custom quote basis. Contact us to discuss.",
      },
      {
        q: "Can I choose my bag color?",
        a: "Yes. For each order you choose a main fabric color and a strap color — these can match or contrast. Color options vary by bag style.",
      },
      {
        q: "Do I get to approve the design before production starts?",
        a: "Always. We send a techpack within two business days of your order. Production doesn't start until you've reviewed and approved it. Nothing moves without your sign-off.",
      },
    ],
  },
  {
    category: "Timeline",
    items: [
      {
        q: "How long does production take?",
        a: "30 days from artwork approval. Add air shipping (10–15 days) and you are typically at your door in 6–7 weeks from order.",
      },
      {
        q: "How quickly will I get my techpack?",
        a: "Within two business days of your order, assuming you've provided clean vector files (.ai, .pdf, or .eps) and your artwork doesn't require major questions.",
      },
      {
        q: "Can you rush an order?",
        a: "In some cases, yes. Message us your timeline and we'll do our best.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "Is shipping really free?",
        a: "For US orders, yes — always. Free shipping to one US address is included in every order.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship worldwide. International shipping costs depend on destination and will be quoted at checkout.",
      },
      {
        q: "Can you ship to multiple locations?",
        a: "Each order ships to one address. Need to split a shipment? Contact us and we'll work something out.",
      },
    ],
  },
  {
    category: "Quality & Production",
    items: [
      {
        q: "Where are the bags made?",
        a: "Our bags are produced in China in factories that supply major retail brands worldwide. Every order goes through a quality check before it ships.",
      },
      {
        q: "What materials are available?",
        a: "Depending on the style: 10oz canvas, 24oz canvas, Tyvek (water-resistant), waxed canvas, and polypropylene. Each bag page lists the exact material.",
      },
      {
        q: "What's included in every order?",
        a: "Every Alongway order includes: your chosen main decoration (screen print, embroidery, patch, or woven label), an interior branded woven label, free setup, and free US shipping.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        q: "Are prices really all-in?",
        a: "Yes. The prices on our pricing page include production, decoration, setup, and US shipping. No hidden fees.",
      },
      {
        q: "How do I get a quote for 5,000+ units?",
        a: `Orders of 5,000+ units are priced on a custom basis. Fill out our order form or email ${site.email} and we'll get back to you quickly.`,
      },
      {
        q: "Do you offer payment plans?",
        a: "Not currently. All orders are paid in full at checkout.",
      },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="How it works"
        title="Simple from first idea to final delivery."
        body="Five steps. No sourcing headaches. We handle everything — you just approve the design and tell us where to ship."
      />

      {/* Steps */}
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, i) => (
          <div key={step.title} className="rounded-[1.75rem] border border-charcoal/10 bg-white p-6 shadow-card">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="text-2xl">{step.emoji}</span>
            </div>
            <h3 className="font-display text-lg font-bold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-charcoal/70">{step.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-[2rem] bg-bone px-8 py-10 text-center">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">Ready?</p>
        <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight">Build your bag in minutes.</h2>
        <p className="mt-3 text-base text-charcoal/70">Pick a silhouette, choose every detail, see your price live. We take it from there.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/build" className="rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal">
            Build Your Bag
          </Link>
          <Link href="/pricing" className="rounded-full border border-charcoal/20 bg-white px-6 py-3 text-sm font-semibold text-charcoal hover:-translate-y-0.5 hover:border-charcoal">
            See Pricing
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <SectionHeading eyebrow="FAQ" title="Common questions, straight answers." />

        <div className="mt-10 space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h3 className="font-display mb-5 text-xs font-bold uppercase tracking-[0.22em] text-light-blue">
                {section.category}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-[1.5rem] border border-charcoal/10 bg-white px-6 py-5 shadow-card open:bg-light-bone"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                      {item.q}
                      <span className="ml-auto flex-shrink-0 text-2xl leading-none text-charcoal/40 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-7 text-charcoal/75">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Still have questions */}
      <div className="mt-16 rounded-[2rem] border border-charcoal/10 bg-white p-8 text-center shadow-card">
        <p className="text-lg font-bold">Still have questions?</p>
        <p className="mt-2 text-sm text-charcoal/70">We're easy to reach.</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 inline-flex rounded-full border border-charcoal/20 px-6 py-3 text-sm font-semibold hover:bg-charcoal hover:text-white"
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}
