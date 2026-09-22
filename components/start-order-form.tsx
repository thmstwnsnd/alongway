"use client";

import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import { bags } from "@/data/bags";

export function StartOrderForm() {
  const params = useSearchParams();
  const buildSummary = params.get("build") ?? "";
  const requestedQty = params.get("qty")?.replace(/\D/g, "") ?? "";
  const [submitted, setSubmitted] = useState(false);
  const [artworkReady, setArtworkReady] = useState("");

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 42); // 6 weeks minimum
    return d.toISOString().split("T")[0];
  }, []);

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card sm:p-10">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">Request received</p>
        <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight">Thank you for reaching out.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-charcoal/75">
          We&apos;ll review your bag style, artwork status, and timeline, then follow up with next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-10"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Bag style">
          <select
            name="bagStyle"
            required
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
            defaultValue={buildSummary ? "Custom build (see notes)" : ""}
          >
            <option value="" disabled>
              Select a bag
            </option>
            {buildSummary ? <option value="Custom build (see notes)">Custom build (see notes)</option> : null}
            {bags.map((bag) => (
              <option key={bag.slug} value={bag.name}>
                {bag.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Quantity">
          <input
            name="quantity"
            type="number"
            min="5000"
            placeholder="Custom orders start at 5,000"
            defaultValue={requestedQty}
            required
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          />
        </Field>
        <Field label="Need it by">
          <input
            name="timeline"
            type="date"
            min={minDate}
            required
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          />
          <p className="mt-1 text-xs text-charcoal/50">Typical turnaround is 6–8 weeks. Dates sooner than 6 weeks from today are unavailable.</p>
        </Field>
        <Field label="Artwork ready?" className="md:col-span-2">
          <select
            name="artworkReady"
            required
            value={artworkReady}
            onChange={(e) => setArtworkReady(e.target.value)}
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="yes">Yes</option>
            <option value="no">No — I need help</option>
          </select>
          {artworkReady === "yes" && (
            <div className="mt-3">
              <label className="block text-xs font-medium text-charcoal/60 mb-1">Upload your artwork</label>
              <input
                name="artwork"
                type="file"
                accept=".ai,.eps,.pdf"
                className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue file:mr-3 file:rounded-full file:border-0 file:bg-blue file:px-4 file:py-1 file:text-xs file:font-semibold file:text-white"
              />
              <p className="mt-1 text-xs text-charcoal/50">Accepted: .ai, .eps, .pdf — vector files only</p>
            </div>
          )}
          {artworkReady === "no" && (
            <p className="mt-2 text-xs text-blue font-medium">No problem — our team can help with design. Tell us more in the notes below.</p>
          )}
        </Field>
        <Field label="Name">
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          />
        </Field>
        <Field label="Email">
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          />
        </Field>
        <Field label="Company">
          <input
            name="company"
            type="text"
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          />
        </Field>
        <Field label="Notes" className="md:col-span-2">
          <textarea
            name="notes"
            rows={buildSummary ? 12 : 5}
            defaultValue={buildSummary}
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
            placeholder="Tell us about your artwork, use case, or shipping needs."
          />
        </Field>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
      >
        Submit request
      </button>
    </form>
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
