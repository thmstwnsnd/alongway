"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import type { Bag } from "@/data/bags";
import { getBagPhotoSet } from "@/data/bags";
import { BagConfigurator } from "@/components/bag-configurator";

const channelToteSizes = [
  { slug: "channel-tote-small", label: "Small" },
  { slug: "channel-tote-medium", label: "Medium" },
  { slug: "channel-tote-large", label: "Large" },
];

const isChannelTote = (slug: string) => slug.startsWith("channel-tote");

export function BagDetail({ bag }: { bag: Bag }) {
  const photos = getBagPhotoSet(bag.slug, "hero");
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevPhoto = useCallback(() => setActiveIdx((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const nextPhoto = useCallback(() => setActiveIdx((i) => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prevPhoto, nextPhoto]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-28 lg:px-10">

      {/* ── Hero grid: image LEFT, config RIGHT ── */}
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">

        {/* Left: vertical scroll gallery + key specs */}
        <div className="space-y-3">
          {/* All photos same size, stacked vertically */}
          {photos.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setActiveIdx(i); setLightboxOpen(true); }}
              className="group relative w-full overflow-hidden rounded-[2rem] border border-charcoal/10 shadow-card aspect-square block"
              aria-label="Zoom in"
            >
              <img
                src={src}
                alt={`${bag.name} photo ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
                Zoom
              </div>
            </button>
          ))}

          {/* Lightbox */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
              onClick={closeLightbox}
            >
              <button type="button" onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none">&times;</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); prevPhoto(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl leading-none px-2">&#8249;</button>
              <img
                src={photos[activeIdx]?.replace("w=1200", "w=1800").replace("h=900", "h=1350")}
                alt={bag.name}
                className="max-h-[90vh] max-w-[90vw] rounded-[1.5rem] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button type="button" onClick={(e) => { e.stopPropagation(); nextPhoto(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl leading-none px-2">&#8250;</button>
              <div className="absolute bottom-4 flex gap-2">
                {photos.map((_, i) => (
                  <button key={i} type="button" onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIdx ? "w-6 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Mini specs strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.25rem] border border-charcoal/10 bg-white px-4 py-3 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/45">Dimensions</p>
              <p className="mt-1 text-sm font-medium text-charcoal">{bag.dimensions}</p>
            </div>
            <div className="rounded-[1.25rem] border border-charcoal/10 bg-white px-4 py-3 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/45">Material</p>
              <p className="mt-1 text-sm font-medium text-charcoal">{bag.material}</p>
            </div>
            <div className="rounded-[1.25rem] border border-charcoal/10 bg-light-bone px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/45">MOQ</p>
              <p className="mt-1 text-sm font-medium text-charcoal">100 units</p>
            </div>
            <div className="rounded-[1.25rem] border border-charcoal/10 bg-light-bone px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/45">Production</p>
              <p className="mt-1 text-sm font-medium text-charcoal">~30 days</p>
            </div>
          </div>
        </div>

        {/* Right: name + compact configurator */}
        <div className="space-y-5 lg:sticky lg:top-6">
          {/* Channel Tote size switcher */}
          {isChannelTote(bag.slug) && (
            <div className="flex gap-2">
              {channelToteSizes.map((s) => (
                <Link key={s.slug} href={`/collection/${s.slug}`}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                    bag.slug === s.slug ? "border-blue bg-blue text-white" : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal"
                  }`}>
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{bag.name}</h1>
            <p className="mt-2 text-base leading-7 text-charcoal/70">{bag.tagline}</p>
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-2">
            {bag.features.map((f, i) => {
              const colors = [
                "bg-blue/10 text-blue border-blue/20",
                "bg-kelly/10 text-kelly border-kelly/20",
                "bg-blue/15 text-blue border-blue/25",
                "bg-kelly/15 text-kelly border-kelly/25",
              ];
              return (
                <span key={f} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${colors[i % colors.length]}`}>
                  {f}
                </span>
              );
            })}
          </div>

          {/* Compact configurator — top right, above the fold */}
          <BagConfigurator bag={bag} compact />
        </div>
      </div>

      {/* ── Below-fold: accordions, pricing, templates ── */}
      <div className="mt-14 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight">Details</h2>

        <details className="group rounded-[1.5rem] border border-charcoal/10 bg-white px-6 py-5 shadow-card open:bg-light-bone">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            Customization options
            <span className="ml-auto flex-shrink-0 text-2xl leading-none text-charcoal/40 transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-7 text-charcoal/75">
            <p><strong>Screen Print</strong> – Bold, flat coverage. Best for clean logos and simple graphics.</p>
            <p><strong>Embroidery</strong> – Stitched texture. Premium feel, great for hats and heavyweight bags.</p>
            <p><strong>Woven Patch</strong> – Iron-on or sew-on. Adds dimension and a retail-quality finish.</p>
            <p><strong>Woven Label</strong> – Interior or exterior. The cleanest branding detail we offer.</p>
            <p>Every order includes one main decoration plus an interior branded woven label at no extra charge.</p>
          </div>
        </details>

        <details className="group rounded-[1.5rem] border border-charcoal/10 bg-white px-6 py-5 shadow-card open:bg-light-bone">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            Material possibilities
            <span className="ml-auto flex-shrink-0 text-2xl leading-none text-charcoal/40 transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 text-sm leading-7 text-charcoal/75">
            <p>Every bag starts with a fabric choice. Starter fabrics are included at no extra cost – canvas, denim, corduroy, nylon, and camo. Upgrade tiers unlock waxed canvas, heavier canvas weights, and specialty materials. Want to feel it first? Order a{" "}<Link href="/swatches" className="font-semibold text-blue hover:text-charcoal">swatch kit</Link>.</p>
          </div>
        </details>

        <details className="group rounded-[1.5rem] border border-charcoal/10 bg-white px-6 py-5 shadow-card open:bg-light-bone">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            Style &amp; sizing
            <span className="ml-auto flex-shrink-0 text-2xl leading-none text-charcoal/40 transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-7 text-charcoal/75">
            <p>{bag.dimensions}</p>
          </div>
        </details>

        <details className="group rounded-[1.5rem] border border-charcoal/10 bg-white px-6 py-5 shadow-card open:bg-light-bone">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            Production details
            <span className="ml-auto flex-shrink-0 text-2xl leading-none text-charcoal/40 transition-transform group-open:rotate-45">+</span>
          </summary>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-charcoal/75">
            <li>Tech pack sent within 2 business days of artwork approval</li>
            <li>Production: 30 days</li>
            <li>Air shipping: 10–15 days (included in price)</li>
            <li>Ships to one US address per order</li>
            <li>Accepted files: .ai, .pdf, .eps only — clean vectors only</li>
          </ul>
        </details>

        {/* Pricing tiers */}
        <div className="overflow-hidden rounded-[2rem] border border-charcoal/10 bg-white shadow-card">
          <div className="border-b border-charcoal/10 px-6 py-4">
            <h2 className="text-xl font-bold tracking-tight">Pricing tiers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-light-bone text-charcoal/70">
                <tr>
                  <th className="px-6 py-3 font-semibold">Quantity</th>
                  <th className="px-6 py-3 font-semibold">Per-unit (base)</th>
                </tr>
              </thead>
              <tbody>
                {bag.pricingTiers.map((tier) => (
                  <tr key={tier.quantity} className="border-t border-charcoal/10">
                    <td className="px-6 py-3 font-medium">{tier.quantity.toLocaleString()} units</td>
                    <td className="px-6 py-3">{tier.unitPrice}</td>
                  </tr>
                ))}
                <tr className="border-t border-charcoal/10 bg-light-bone">
                  <td className="px-6 py-3 font-medium">5,000+ units</td>
                  <td className="px-6 py-3 font-semibold text-blue">Custom quote</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Template downloads */}
        <div className="rounded-[1.5rem] border border-charcoal/10 bg-light-bone px-6 py-5">
          <p className="text-base font-bold tracking-tight text-charcoal">Artwork templates</p>
          <p className="mt-1 text-sm text-charcoal/65">Sized to exact print dimensions. Use for press-ready artwork.</p>
          <div className="mt-4 flex gap-3">
            <Link href={`/templates/${bag.slug}.pdf`} className="inline-flex rounded-full border border-charcoal/15 bg-white px-5 py-2.5 text-sm font-semibold text-charcoal hover:border-blue hover:text-kelly">↓ PDF</Link>
            <Link href={`/templates/${bag.slug}.ai`} className="inline-flex rounded-full border border-charcoal/15 bg-white px-5 py-2.5 text-sm font-semibold text-charcoal hover:border-blue hover:text-kelly">↓ Illustrator</Link>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/collection" className="inline-flex rounded-full border border-charcoal/15 bg-white px-6 py-3 text-sm font-semibold text-charcoal hover:-translate-y-0.5 hover:border-blue hover:text-blue">
            Browse all bags
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs leading-5 text-charcoal/40 max-w-2xl pt-2">
          Colors, sizing, placements, and product images are for reference only and may vary slightly from the final product. Variations can occur due to lighting, display settings, and production processes.
        </p>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">{label}</p>
      <p className="text-sm leading-6 text-charcoal">{value}</p>
    </div>
  );
}
