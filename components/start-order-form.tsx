"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { bags } from "@/data/bags";

export function StartOrderForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">Request received</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Thank you for reaching out.</h2>
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
            defaultValue=""
          >
            <option value="" disabled>
              Select a bag
            </option>
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
            min="50"
            placeholder="250"
            required
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          />
        </Field>
        <Field label="Timeline">
          <input
            name="timeline"
            type="text"
            placeholder="Needed by September"
            required
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          />
        </Field>
        <Field label="Artwork ready?">
          <select
            name="artworkReady"
            required
            defaultValue=""
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
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
            rows={5}
            className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
            placeholder="Tell us about your artwork, use case, or shipping needs."
          />
        </Field>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal"
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
