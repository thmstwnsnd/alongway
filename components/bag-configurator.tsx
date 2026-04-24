"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { Bag } from "@/data/bags";
import { addOns } from "@/data/addons";
import { fabricTierMeta, fabrics, type FabricTier } from "@/data/fabrics";
import { formatCurrency, getUnitPrice } from "@/lib/order-flow";

const defaultFabricSlug = "cotton-canvas-12oz";
const quantityOptions = [100, 250, 500, 1000, 2000];
const tierOrder: FabricTier[] = ["starter", "upgrade1", "upgrade2", "upgrade3"];

export function BagConfigurator({ bag }: { bag: Bag }) {
  const [selectedFabricSlug, setSelectedFabricSlug] = useState(defaultFabricSlug);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(100);

  const selectedFabric = useMemo(
    () => fabrics.find((fabric) => fabric.slug === selectedFabricSlug) ?? fabrics[0],
    [selectedFabricSlug],
  );
  const selectedAddOns = useMemo(
    () => addOns.filter((addOn) => selectedAddOnIds.includes(addOn.id)),
    [selectedAddOnIds],
  );

  const basePrice = getUnitPrice(bag, quantity) ?? 0;
  const fabricUpcharge = selectedFabric.upcharge;
  const addOnTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.pricePerUnit, 0);
  const totalPerUnit = basePrice + fabricUpcharge + addOnTotal;
  const orderTotal = totalPerUnit * quantity;

  const buildOrderHref = useMemo(() => {
    const params = new URLSearchParams({
      bag: bag.slug,
      quantity: String(quantity),
      fabric: selectedFabric.slug,
    });

    if (selectedAddOnIds.length) {
      params.set("addons", selectedAddOnIds.join(","));
    }

    return `/shop?${params.toString()}`;
  }, [bag.slug, quantity, selectedFabric.slug, selectedAddOnIds]);

  return (
    <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">Configure your order</p>
        <h2 className="text-3xl font-bold tracking-tight">Dial in the material, add-ons, and quantity.</h2>
        <p className="max-w-3xl text-base leading-7 text-charcoal/72">
          Start with the standard bag price, then see how upgraded fabrics and extra details change the estimate in real time.
        </p>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold tracking-tight">Fabric selector</h3>
              <Link href="/swatches" className="text-sm font-semibold text-blue hover:text-charcoal">
                Browse the full swatch library
              </Link>
            </div>

            {tierOrder.map((tier) => {
              const tierFabrics = fabrics.filter((fabric) => fabric.tier === tier);
              if (!tierFabrics.length) {
                return null;
              }

              const tierMeta = fabricTierMeta[tier];

              return (
                <div key={tier} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">{tierMeta.label}</h4>
                    <span className="text-sm text-charcoal/55">
                      {tier === "starter" ? "Included at no extra cost" : `+${formatCurrency(tierFabrics[0].upcharge)} per unit`}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {tierFabrics.map((fabric) => {
                      const isSelected = fabric.slug === selectedFabricSlug;

                      return (
                        <button
                          key={fabric.slug}
                          type="button"
                          onClick={() => setSelectedFabricSlug(fabric.slug)}
                          className={`rounded-[1.75rem] border p-5 text-left ${
                            isSelected ? "border-orange ring-2 ring-orange/20" : "border-charcoal/10 bg-light-bone hover:border-blue/30"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-lg font-bold tracking-tight">{fabric.name}</p>
                              <p className="mt-1 text-sm text-charcoal/60">{fabric.weightOrStyle ?? fabric.category}</p>
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tierMeta.badgeClassName}`}>
                              {tierMeta.label}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-charcoal/72">{fabric.description}</p>
                          <p className="mt-4 text-sm font-semibold text-charcoal">
                            {fabric.upcharge > 0 ? `+${formatCurrency(fabric.upcharge)} / unit` : "Included"}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Add-ons</h3>
            <div className="grid gap-4">
              {addOns.map((addOn) => {
                const isSelected = selectedAddOnIds.includes(addOn.id);

                return (
                  <label
                    key={addOn.id}
                    className={`flex cursor-pointer items-start gap-4 rounded-[1.5rem] border p-5 ${
                      isSelected ? "border-orange bg-orange/5" : "border-charcoal/10 bg-light-bone hover:border-blue/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        setSelectedAddOnIds((current) =>
                          current.includes(addOn.id)
                            ? current.filter((item) => item !== addOn.id)
                            : [...current, addOn.id],
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-charcoal/20 text-orange focus:ring-orange"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-base font-bold tracking-tight">{addOn.name}</p>
                        <p className="text-sm font-semibold text-charcoal">+{formatCurrency(addOn.pricePerUnit)} / unit</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-charcoal/70">{addOn.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-charcoal/10 bg-light-bone p-6 xl:sticky xl:top-28">
          <h3 className="text-xl font-bold tracking-tight">Live price calculator</h3>

          <div className="mt-5 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">Quantity</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 xl:grid-cols-2">
              {quantityOptions.map((option) => {
                const isSelected = quantity === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setQuantity(option)}
                    className={`rounded-full border px-4 py-3 text-sm font-semibold ${
                      isSelected ? "border-orange bg-orange text-white" : "border-charcoal/10 bg-white text-charcoal hover:border-blue/30"
                    }`}
                  >
                    {option.toLocaleString()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 space-y-4 rounded-[1.5rem] bg-white p-5">
            <SummaryRow label="Base price" value={formatCurrency(basePrice)} />
            <SummaryRow
              label={`Fabric (${selectedFabric.name})`}
              value={fabricUpcharge > 0 ? `+${formatCurrency(fabricUpcharge)}` : "Included"}
            />
            <SummaryRow
              label="Add-ons"
              value={addOnTotal > 0 ? `+${formatCurrency(addOnTotal)}` : "$0.00"}
            />
            <div className="border-t border-charcoal/10 pt-4">
              <SummaryRow
                label={<span className="text-base font-bold text-charcoal">Total per unit</span>}
                value={<span className="text-xl font-bold tracking-tight text-charcoal">{formatCurrency(totalPerUnit)}</span>}
              />
              <SummaryRow
                label={`${quantity.toLocaleString()} units`}
                value={<span className="text-base font-bold text-blue">{formatCurrency(orderTotal)}</span>}
              />
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-charcoal/60">Prices are estimates. Final quote confirmed at checkout.</p>

          <Link
            href={buildOrderHref}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Build this order
          </Link>
        </aside>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-charcoal/60">{label}</span>
      <span className="text-right text-charcoal/80">{value}</span>
    </div>
  );
}
