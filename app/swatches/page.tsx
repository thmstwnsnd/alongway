import Link from "next/link";

import { fabricTierMeta, fabrics } from "@/data/fabrics";
import { formatCurrency } from "@/lib/order-flow";

const starterFabrics = fabrics.filter((fabric) => fabric.tier === "starter");
const upgradeGroups = [
  { tier: "upgrade1", title: "Upgrade 1" },
  { tier: "upgrade2", title: "Upgrade 2" },
  { tier: "upgrade3", title: "Upgrade 3" },
] as const;

export default function SwatchesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <section className="rounded-[2.5rem] border border-charcoal/10 bg-bone px-8 py-12 shadow-card sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-kelly">Swatches</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-charcoal sm:text-6xl">Find your fabric.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-charcoal/72">
          Every Alongway bag starts with the right material. Browse our full fabric library, feel the weights, and find what fits your brand.
        </p>
      </section>

      <section className="mt-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-green-700">Starter fabrics</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Included at no extra cost</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-charcoal/65">
            Everyday workhorses, textural staples, and brand-friendly fabrics that keep your unit cost clean.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {starterFabrics.map((fabric) => (
            <FabricCard key={fabric.slug} slug={fabric.slug} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue">Upgrade fabrics</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">More structure, more texture, more distinction</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-charcoal/65">
            Grouped by tier so you can see the premium jumps clearly before you spec the final bag.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          {upgradeGroups.map((group) => {
            const groupFabrics = fabrics.filter((fabric) => fabric.tier === group.tier);
            const meta = fabricTierMeta[group.tier];

            return (
              <div key={group.tier} className="space-y-5">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold tracking-tight">{group.title}</h3>
                  <span className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${meta.badgeClassName}`}>
                    +{formatCurrency(groupFabrics[0]?.upcharge ?? 0)} / unit
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {groupFabrics.map((fabric) => (
                    <FabricCard key={fabric.slug} slug={fabric.slug} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function FabricCard({ slug }: { slug: string }) {
  const fabric = fabrics.find((entry) => entry.slug === slug);
  if (!fabric) {
    return null;
  }

  const tierMeta = fabricTierMeta[fabric.tier];

  return (
    <article className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/45">{fabric.category}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">{fabric.name}</h3>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tierMeta.badgeClassName}`}>
          {tierMeta.label}
        </span>
      </div>
      <p className="mt-4 text-sm text-charcoal/60">{fabric.weightOrStyle ?? "Signature style"}</p>
      <p className="mt-4 text-base leading-7 text-charcoal/72">{fabric.description}</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-charcoal">
          {fabric.upcharge > 0 ? `+${formatCurrency(fabric.upcharge)} / unit` : "Included"}
        </p>
        <Link href={`/swatches/${fabric.slug}`} className="text-sm font-semibold text-kelly hover:text-charcoal">
          View swatches →
        </Link>
      </div>
    </article>
  );
}
