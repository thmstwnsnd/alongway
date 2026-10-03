"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { Bag } from "@/data/bags";
import { getBagPhotoSet } from "@/data/bags";
import { getCatalogStyle } from "@/data/catalog";

const channelToteSizes = [
  { slug: "channel-tote-small", label: "Small" },
  { slug: "channel-tote-medium", label: "Medium" },
  { slug: "channel-tote-large", label: "Large" },
];

const isChannelTote = (slug: string) => slug.startsWith("channel-tote");


const buildStyleFor: Record<string, string> = {
  "beach-tote": "zuma-tote",
  "shoulder-tote": "drifter-tote",
  "oversized-tote": "carry-all-tote",
  "basic-tote": "common-tote",
  "the-sunday": "sunday-tote",
  "channel-tote-small": "channel-tote",
  "channel-tote-medium": "channel-tote",
  "channel-tote-large": "channel-tote",
  "camper-pouch": "mini-tote",
};

export function BagDetail({ bag }: { bag: Bag }) {
  // Open Build a Bag with this style already chosen when the build tool has a matching style.
  // Older collection bags map to the closest build-tool style (placeholders until Easton confirms).
  const styleSlug = getCatalogStyle(bag.slug) ? bag.slug : buildStyleFor[bag.slug];
  const buildHref = styleSlug ? `/build?style=${styleSlug}` : "/build";
  const photos = getBagPhotoSet(bag.slug);
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
    <div className="mx-auto max-w-7xl px-6 py-12 pb-16 lg:px-10">

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
              <Image
                src={src}
                alt={`${bag.name} photo ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
              <button type="button" onClick={closeLightbox} className="absolute top-4 right-4 text-white/75 hover:text-white text-3xl leading-none">&times;</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); prevPhoto(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/75 hover:text-white text-4xl leading-none px-2">&#8249;</button>
              <Image
                src={photos[activeIdx] ?? ""}
                alt={bag.name}
                width={1800}
                height={1350}
                sizes="90vw"
                className="h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-[1.5rem] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button type="button" onClick={(e) => { e.stopPropagation(); nextPhoto(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/75 hover:text-white text-4xl leading-none px-2">&#8250;</button>
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
        </div>

        {/* Right: name + compact configurator */}
        <div className="space-y-5 lg:sticky lg:top-6">
          <div className="flex justify-end">
            <Image
              src="/svg/illustrations/Alongway_Website_Graphic_BirdTote_Blue.svg"
              alt=""
              width={120}
              height={120}
              className="pointer-events-none h-auto w-24 select-none opacity-80"
              aria-hidden="true"
            />
          </div>

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
            <h1 className="font-display text-4xl font-extrabold tracking-tight lg:text-5xl">{bag.name}</h1>
            <p className="font-accent mt-2 text-base leading-7 text-charcoal/70">{bag.tagline}</p>
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-2">
            {bag.features.map((f, i) => {
              const colors = [
                "bg-blue/10 text-blue border-blue/20",
                "bg-light-blue/10 text-blue border-light-blue/20",
                "bg-blue/15 text-blue border-blue/25",
                "bg-light-blue/15 text-blue border-light-blue/25",
              ];
              return (
                <span key={f} className={`rounded-full border px-4 py-2 text-base font-semibold ${colors[i % colors.length]}`}>
                  {f}
                </span>
              );
            })}
          </div>

            <div className="space-y-5">
              <dl className="space-y-5 text-lg text-charcoal">
                <div>
                  <dt className="font-accent text-sm font-semibold uppercase tracking-[0.16em] text-charcoal/70">Dimensions</dt>
                  <dd className="mt-1 font-medium">{bag.dimensions}</dd>
                </div>
                <div>
                  <dt className="font-accent text-sm font-semibold uppercase tracking-[0.16em] text-charcoal/70">Material</dt>
                  <dd className="mt-1 font-medium">{bag.material}</dd>
                </div>
              </dl>
              <p className="text-lg leading-8 text-charcoal/70">
                Starting at <span className="font-semibold text-charcoal">{bag.pricingTiers[0]?.unitPrice}</span> per bag.
                Minimum 100 bags. About 30 days to produce.
              </p>
              <Link
                href={buildHref}
                className="flex w-full items-center justify-center rounded-full bg-blue px-6 py-5 text-lg font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
              >
                Build this bag
              </Link>
              <Link href="/collection" className="inline-flex text-base font-semibold text-blue hover:text-charcoal">
                Back to the collection
              </Link>
            </div>
        </div>
      </div>

    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">{label}</p>
      <p className="text-sm leading-6 text-charcoal">{value}</p>
    </div>
  );
}
