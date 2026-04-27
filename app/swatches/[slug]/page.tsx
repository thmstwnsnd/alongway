import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  fabricTierMeta,
  fabrics,
  getFabricBySlug,
  getFabricSwatches,
  getFabricTextureImageUrl,
} from "@/data/fabrics";
import { formatCurrency } from "@/lib/order-flow";

export function generateStaticParams() {
  return fabrics.map((fabric) => ({ slug: fabric.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fabric = getFabricBySlug(slug);

  if (!fabric) {
    return { title: "Fabric not found | Alongway" };
  }

  return {
    title: `${fabric.name} Swatches | Alongway`,
    description: fabric.description,
  };
}

export default async function FabricDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fabric = getFabricBySlug(slug);

  if (!fabric) {
    notFound();
  }

  const swatches = getFabricSwatches(fabric.slug);
  const tierMeta = fabricTierMeta[fabric.tier];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <Link href="/swatches" className="text-sm font-semibold text-blue hover:text-charcoal">
        ← Back to swatches
      </Link>

      <section className="mt-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">{fabric.category}</p>
            <h1 className="text-5xl font-extrabold tracking-tight">{fabric.name}</h1>
            <p className="text-lg leading-8 text-charcoal/72">{fabric.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-4 py-2 text-sm font-semibold ${tierMeta.badgeClassName}`}>
              {tierMeta.label}
            </span>
            <span className="rounded-full border border-charcoal/10 bg-light-bone px-4 py-2 text-sm font-semibold text-charcoal">
              {fabric.tier === "starter" ? "Included — no extra cost" : `+${formatCurrency(fabric.upcharge)} per unit`}
            </span>
            {fabric.weightOrStyle ? (
              <span className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm text-charcoal/70">
                {fabric.weightOrStyle}
              </span>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-charcoal/10 bg-light-bone p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">Descriptor</p>
            <p className="mt-3 text-base leading-7 text-charcoal/72">
              {fabric.name} gives you a {fabric.tier === "starter" ? "clean, production-friendly" : "more premium, specification-forward"} option for brands that want {fabric.weightOrStyle ? `${fabric.weightOrStyle.toLowerCase()} texture` : "distinctive material character"} without losing Alongway&apos;s all-in ordering flow.
            </p>
          </div>

          <div className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">How it feels</p>
            <div className="mt-4 overflow-hidden rounded-[1.75rem]">
              <img
                src={getFabricTextureImageUrl(fabric.slug)}
                alt={`${fabric.name} fabric texture`}
                className="h-[340px] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">Swatch grid</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{swatches.length} colorways</h2>
              </div>
              <p className="text-sm text-charcoal/55">Placeholder library</p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-4 xl:grid-cols-5">
              {swatches.map((swatch) => (
                <div key={`${swatch.name}-${swatch.hex}`} className="space-y-2">
                  <div
                    className="h-20 w-20 rounded-2xl border border-black/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_8px_20px_rgba(38,38,38,0.08)]"
                    style={{
                      backgroundColor: swatch.hex,
                      backgroundImage:
                        "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02)), radial-gradient(circle at top left, rgba(255,255,255,0.22), transparent 50%)",
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{swatch.name}</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-charcoal/45">{swatch.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-charcoal px-8 py-8 text-bone shadow-card">
            <h2 className="text-2xl font-bold tracking-tight">Want to use {fabric.name} in your order? Start here.</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-bone/75">
              Move from swatches to production with the bag, quantity, and artwork details your team already has.
            </p>
            <Link
              href={`/shop?fabric=${fabric.slug}`}
              className="mt-6 inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white hover:text-charcoal"
            >
              Start here
            </Link>
          </section>
        </div>
      </section>
    </div>
  );
}
