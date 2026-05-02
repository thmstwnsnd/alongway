"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { bags, customQuoteTier, getBagImageUrl, quantityTiers } from "@/data/bags";
import { OrderSummaryCard } from "@/components/order-summary-card";
import {
  ORDER_DRAFT_STORAGE_KEY,
  decorationOptions,
  emptyOrderDraft,
  formatCurrency,
  getOrderAmounts,
  type OrderDraft,
} from "@/lib/order-flow";
import { getFabricBySlug } from "@/data/fabrics";
import { addOns } from "@/data/addons";

export function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderDraft>(emptyOrderDraft);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedOrder = window.localStorage.getItem(ORDER_DRAFT_STORAGE_KEY);
    const nextOrder = savedOrder ? { ...emptyOrderDraft, ...JSON.parse(savedOrder) } : emptyOrderDraft;
    const requestedBag = searchParams.get("bag");
    const requestedQuantity = searchParams.get("quantity");
    const requestedFabric = searchParams.get("fabric");
    const requestedAddOns = searchParams.get("addons");

    if (requestedBag && bags.some((bag) => bag.slug === requestedBag)) {
      nextOrder.bagSlug = requestedBag;
    }

    if (requestedQuantity) {
      const parsedQuantity = Number.parseInt(requestedQuantity, 10);
      if (Number.isFinite(parsedQuantity)) {
        nextOrder.quantity = parsedQuantity;
      }
    }

    if (requestedFabric && getFabricBySlug(requestedFabric)) {
      nextOrder.fabricSlug = requestedFabric;
    }

    if (requestedAddOns) {
      const validAddOnIds = requestedAddOns
        .split(",")
        .map((item) => item.trim())
        .filter((item) => addOns.some((addOn) => addOn.id === item));
      nextOrder.addOnIds = validAddOnIds;
    }

    setOrder(nextOrder);
    setIsHydrated(true);
  }, [searchParams]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(ORDER_DRAFT_STORAGE_KEY, JSON.stringify(order));
  }, [isHydrated, order]);

  const selectedBag = useMemo(
    () => bags.find((bag) => bag.slug === order.bagSlug),
    [order.bagSlug],
  );
  const { unitPrice, total, fabric, selectedAddOns, baseUnitPrice, addOnUnitTotal } = getOrderAmounts(order);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <div className="space-y-8">
          <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
            <StepHeading number="01" title="Choose your bag" body="Select the silhouette that best fits your brand and use case." />
            {selectedBag ? (
              <div className="mt-6 flex items-center gap-4 rounded-[1.75rem] border border-blue bg-light-bone p-4 ring-2 ring-blue/20">
                <img
                  src={getBagImageUrl(selectedBag.slug)}
                  alt={selectedBag.name}
                  className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">✓</span>
                    <p className="text-base font-bold tracking-tight">{selectedBag.name}</p>
                  </div>
                  <p className="font-accent mt-0.5 text-sm text-charcoal/60">{selectedBag.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOrder((current) => ({ ...current, bagSlug: "", quantity: null }))}
                  className="flex-shrink-0 rounded-full border border-charcoal/15 px-4 py-2 text-xs font-semibold text-charcoal hover:border-charcoal"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {bags.map((bag) => {
                  const isSelected = bag.slug === order.bagSlug;
                  return (
                    <button
                      key={bag.slug}
                      type="button"
                      onClick={() =>
                        setOrder((current) => ({
                          ...current,
                          bagSlug: bag.slug,
                          quantity: current.bagSlug === bag.slug ? current.quantity : null,
                        }))
                      }
                      className={`group relative overflow-hidden rounded-[1.75rem] border bg-white text-left shadow-card ${
                        isSelected ? "border-blue ring-2 ring-blue/20" : "border-charcoal/10 hover:border-blue/30"
                      }`}
                    >
                      <img
                        src={getBagImageUrl(bag.slug)}
                        alt={bag.name}
                        className="aspect-[6/5] w-full object-cover"
                      />
                      <div className="space-y-2 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-lg font-bold tracking-tight">{bag.name}</h3>
                            <p className="font-accent mt-1 text-sm leading-6 text-charcoal/65">{bag.tagline}</p>
                          </div>
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-sm font-bold ${
                              isSelected
                                ? "border-blue bg-blue text-white"
                                : "border-charcoal/15 bg-light-bone text-charcoal/35"
                            }`}
                          >
                            ✓
                          </span>
                        </div>
                        <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">
                          Starting at ${bag.startingPrice.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {selectedBag ? (
            <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
              <StepHeading
                number="02"
                title="Choose your quantity"
                body="Pricing updates instantly based on the production tier."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {quantityTiers.map((quantity) => {
                  const tier = selectedBag.pricingTiers.find((entry) => entry.quantity === quantity);
                  const isSelected = order.quantity === quantity;

                  return (
                    <button
                      key={quantity}
                      type="button"
                      onClick={() => setOrder((current) => ({ ...current, quantity }))}
                      className={`rounded-[1.5rem] border px-5 py-4 text-left ${
                        isSelected ? "border-blue bg-blue text-white" : "border-charcoal/10 bg-light-bone hover:border-blue/30"
                      }`}
                    >
                      <p className={`text-2xl font-bold tracking-tight ${isSelected ? "text-white" : "text-charcoal"}`}>
                        {quantity.toLocaleString()}
                      </p>
                      <p className={`mt-1 text-sm ${isSelected ? "text-white/85" : "text-charcoal/65"}`}>
                        {tier?.unitPrice ?? "Custom"} per unit
                      </p>
                    </button>
                  );
                })}
                <Link
                  href="/start"
                  className="rounded-[1.5rem] border border-blue/25 bg-blue/5 px-5 py-4 text-left hover:border-blue"
                >
                  <p className="text-2xl font-bold tracking-tight text-blue">{customQuoteTier.toLocaleString()}+</p>
                  <p className="mt-1 text-sm text-charcoal/70">Contact us for a custom quote</p>
                </Link>
              </div>

              {fabric ? (
                <div className="mt-6 rounded-[1.5rem] border border-charcoal/10 bg-light-bone p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">Configured build</p>
                      <p className="mt-2 text-base font-bold tracking-tight text-charcoal">{fabric.name}</p>
                      <p className="mt-1 text-sm leading-6 text-charcoal/68">
                        {fabric.upcharge > 0 ? `Fabric upcharge: +${formatCurrency(fabric.upcharge)} per unit.` : "Starter fabric included."}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-charcoal/68">
                        {selectedAddOns.length
                          ? `Add-ons: ${selectedAddOns.map((addOn) => addOn.name).join(", ")}.`
                          : "No add-ons selected yet."}
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white px-4 py-3 text-sm text-charcoal/72">
                      <p>Base: {baseUnitPrice ? formatCurrency(baseUnitPrice) : "TBD"}</p>
                      <p>Add-ons: {formatCurrency(addOnUnitTotal)}</p>
                      <p className="font-semibold text-charcoal">Estimated unit total: {unitPrice ? formatCurrency(unitPrice) : "TBD"}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          {selectedBag && order.quantity ? (
            <>
              <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
                <StepHeading
                  number="03"
                  title="Your brand"
                  body="Give us the production notes we need before your team reviews the final techpack."
                />
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <Field label="Brand name">
                    <input
                      value={order.brandName}
                      onChange={(event) => setOrder((current) => ({ ...current, brandName: event.target.value }))}
                      className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                    />
                  </Field>
                  <Field label="Primary color">
                    <input
                      value={order.primaryColor}
                      onChange={(event) => setOrder((current) => ({ ...current, primaryColor: event.target.value }))}
                      placeholder="Navy blue"
                      className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                    />
                  </Field>
                  <Field label="Decoration type">
                    <select
                      value={order.decorationType}
                      onChange={(event) =>
                        setOrder((current) => ({
                          ...current,
                          decorationType: event.target.value as OrderDraft["decorationType"],
                        }))
                      }
                      className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                    >
                      <option value="">Select one</option>
                      {decorationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Notes" className="md:col-span-2">
                    <textarea
                      rows={5}
                      value={order.notes}
                      onChange={(event) => setOrder((current) => ({ ...current, notes: event.target.value }))}
                      placeholder="Anything else we should know?"
                      className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
                <StepHeading
                  number="04"
                  title="Artwork"
                  body="Tell us whether your files are ready now or if you want the Alongway design team to help after checkout."
                />
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setOrder((current) => ({ ...current, artworkReady: "yes" }))}
                    className={`flex-1 rounded-[1.5rem] border px-5 py-4 text-left ${
                      order.artworkReady === "yes"
                        ? "border-blue bg-blue text-white"
                        : "border-charcoal/10 bg-light-bone hover:border-blue/30"
                    }`}
                  >
                    <p className="text-lg font-bold tracking-tight">Yes</p>
                    <p className={`mt-1 text-sm ${order.artworkReady === "yes" ? "text-white/85" : "text-charcoal/65"}`}>
                      Upload production files now
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrder((current) => ({ ...current, artworkReady: "no" }))}
                    className={`flex-1 rounded-[1.5rem] border px-5 py-4 text-left ${
                      order.artworkReady === "no"
                        ? "border-blue bg-blue text-white"
                        : "border-charcoal/10 bg-light-bone hover:border-blue/30"
                    }`}
                  >
                    <p className="text-lg font-bold tracking-tight">No — I need help</p>
                    <p className={`mt-1 text-sm ${order.artworkReady === "no" ? "text-white/85" : "text-charcoal/65"}`}>
                      We&apos;ll coordinate post-order
                    </p>
                  </button>
                </div>

                {order.artworkReady === "yes" ? (
                  <div className="mt-5 rounded-[1.5rem] border border-charcoal/10 bg-light-bone p-5">
                    <label className="block text-sm font-medium text-charcoal">
                      Upload your artwork
                      <input
                        type="file"
                        accept=".ai,.eps,.pdf"
                        className="mt-3 w-full rounded-2xl border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white focus:border-blue"
                      />
                    </label>
                    <p className="mt-2 text-sm text-charcoal/55">Accepted: .ai, .eps, .pdf — vector files only</p>
                  </div>
                ) : null}

                {order.artworkReady === "no" ? (
                  <p className="mt-5 rounded-[1.5rem] border border-blue/20 bg-blue/5 p-5 text-sm leading-6 text-charcoal/75">
                    No problem — our design team will reach out after your order to get started.
                  </p>
                ) : null}
              </section>
            </>
          ) : null}
        </div>

        <div className="lg:sticky lg:top-28">
          <OrderSummaryCard
            bagName={selectedBag?.name}
            quantity={order.quantity}
            unitPrice={unitPrice}
            total={total}
            ctaLabel="Proceed to checkout"
            ctaDisabled={!selectedBag || !order.quantity}
            onCtaClick={() => {
              window.localStorage.setItem(ORDER_DRAFT_STORAGE_KEY, JSON.stringify(order));
              router.push(`/checkout?bag=${order.bagSlug}&quantity=${order.quantity ?? ""}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StepHeading({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">{number}</p>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-2xl text-base leading-7 text-charcoal/72">{body}</p>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-2 text-sm font-medium text-charcoal ${className}`.trim()}>
      <span>{label}</span>
      {children}
    </label>
  );
}
