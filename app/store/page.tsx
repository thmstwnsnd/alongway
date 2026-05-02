"use client";

import { useState } from "react";

export default function StorePage() {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
      <section className="rounded-[2.5rem] border border-charcoal/10 bg-bone px-8 py-12 shadow-card sm:px-12">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Alongway Store</p>
        <h1 className="font-display mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">Fabric Swatch Kit</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-charcoal/72">
          More products coming soon — including Alongway branded totes.
        </p>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <div className="overflow-hidden rounded-[2.5rem] border border-charcoal/10 bg-white shadow-card">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1400&h=1200&q=80&fit=crop&auto=format"
            alt="Fabric swatch kit"
            className="aspect-[5/4] w-full object-cover"
          />
        </div>

        <div className="rounded-[2.5rem] border border-charcoal/10 bg-white p-8 shadow-card">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-blue">Store item</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">Fabric Swatch Kit</h2>
            </div>
            <p className="text-3xl font-extrabold tracking-tight text-charcoal">$5.00</p>
          </div>

          <p className="mt-6 text-base leading-7 text-charcoal/72">
            Not sure which fabric is right for you? We&apos;ll mail you a curated set of fabric swatches — cotton canvas weights from 10oz to 24oz, plus denim, corduroy, nylon, waxed canvas, and more. Feel the difference before you commit.
          </p>

          <div className="mt-6 rounded-[1.75rem] bg-light-bone p-5 text-sm leading-7 text-charcoal/72">
            Ships within 3 business days. US only. Credit applied to your first order.
          </div>

          <button
            type="button"
            onClick={() => setIsAdded(true)}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Add to cart
          </button>

          {isAdded ? (
            <div className="mt-4 rounded-[1.5rem] border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800">
              Swatch kit added! We&apos;ll contact you to confirm your address.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
