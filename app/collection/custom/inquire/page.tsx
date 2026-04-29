"use client";

import { useState } from "react";
import Link from "next/link";

export default function CustomInquirePage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue text-2xl text-white">
          ✓
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">We got your idea.</h1>
        <p className="mt-4 text-lg text-charcoal/70">
          We'll review your specs and come back within 2 business days with a quote and initial direction.
        </p>
        <Link
          href="/collection"
          className="mt-8 inline-flex rounded-full border border-charcoal/20 px-6 py-3 text-sm font-semibold hover:bg-charcoal hover:text-white"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-kelly">Custom inquiry</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Build your tote from scratch.</h1>
        <p className="mt-4 text-base text-charcoal/70">
          Tell us as much or as little as you know. We'll fill in the gaps and come back with a quote.
          No commitment required.
        </p>
      </div>

      <form
        className="space-y-8"
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      >
        {/* Contact */}
        <Section title="Your info">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" required><input name="name" type="text" required className={input} /></Field>
            <Field label="Email" required><input name="email" type="email" required className={input} /></Field>
            <Field label="Company"><input name="company" type="text" className={input} /></Field>
            <Field label="Phone"><input name="phone" type="tel" className={input} /></Field>
          </div>
        </Section>

        {/* Bag concept */}
        <Section title="Your bag idea">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="What type of bag?" className="sm:col-span-2">
              <input name="bagType" type="text" placeholder="e.g. structured tote, drawstring, messenger" className={input} />
            </Field>
            <Field label="Approximate dimensions">
              <input name="dimensions" type="text" placeholder='e.g. 14"W x 16"H x 4"D' className={input} />
            </Field>
            <Field label="Quantity needed">
              <input name="quantity" type="number" min="250" placeholder="Minimum 250 units" className={input} />
            </Field>
          </div>
        </Section>

        {/* Materials */}
        <Section title="Fabric & materials">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Fabric preference">
              <select name="fabric" defaultValue="" className={input}>
                <option value="" disabled>Select one</option>
                <option>10oz Canvas</option>
                <option>24oz Canvas</option>
                <option>Waxed Canvas</option>
                <option>Tyvek</option>
                <option>Nylon</option>
                <option>Polypropylene</option>
                <option>Not sure — open to suggestions</option>
              </select>
            </Field>
            <Field label="Main color">
              <input name="color" type="text" placeholder="e.g. Natural, Black, Navy" className={input} />
            </Field>
            <Field label="Strap color (if different)">
              <input name="strapColor" type="text" placeholder="e.g. same as body, contrast tan" className={input} />
            </Field>
            <Field label="Lining?">
              <select name="lining" defaultValue="" className={input}>
                <option value="" disabled>Select one</option>
                <option>Yes — standard</option>
                <option>Yes — custom color/print</option>
                <option>No lining</option>
                <option>Not sure</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Decoration */}
        <Section title="Branding & decoration">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Decoration type">
              <select name="decoration" defaultValue="" className={input}>
                <option value="" disabled>Select one</option>
                <option>Screen print</option>
                <option>Embroidery</option>
                <option>Woven label</option>
                <option>Patch</option>
                <option>Multiple / combination</option>
                <option>Not sure</option>
              </select>
            </Field>
            <Field label="Decoration location">
              <input name="decorationLocation" type="text" placeholder="e.g. front center, side panel" className={input} />
            </Field>
            <Field label="Interior branding?">
              <select name="interiorBranding" defaultValue="" className={input}>
                <option value="" disabled>Select one</option>
                <option>Yes — woven label</option>
                <option>Yes — printed label</option>
                <option>No</option>
                <option>Not sure</option>
              </select>
            </Field>
            <Field label="Artwork ready?">
              <select name="artworkReady" defaultValue="" className={input}>
                <option value="" disabled>Select one</option>
                <option>Yes — I have vector files (.ai, .pdf, .eps)</option>
                <option>No — I need design help</option>
                <option>In progress</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Details */}
        <Section title="Special details & hardware">
          <Field label="Pockets, zippers, closures, hardware?" className="">
            <textarea
              name="details"
              rows={3}
              className={input}
              placeholder="e.g. exterior zip pocket, magnetic snap closure, metal D-ring, interior organizer panel"
            />
          </Field>
        </Section>

        {/* Timeline + notes */}
        <Section title="Timeline & notes">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Need it by (approx.)">
              <input name="timeline" type="text" placeholder="e.g. Q4 2026, holiday season" className={input} />
            </Field>
            <Field label="Budget per unit (optional)">
              <input name="budget" type="text" placeholder="e.g. under $20, flexible" className={input} />
            </Field>
            <Field label="Anything else we should know?" className="sm:col-span-2">
              <textarea
                name="notes"
                rows={4}
                className={input}
                placeholder="Reference images, inspiration brands, must-haves, deal-breakers..."
              />
            </Field>
          </div>
        </Section>

        <button
          type="submit"
          className="w-full rounded-full bg-blue py-4 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-charcoal sm:w-auto sm:px-8"
        >
          Submit custom inquiry
        </button>
      </form>
    </div>
  );
}

const input = "w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
      <h2 className="mb-5 text-lg font-bold tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children, required, className = "" }: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block space-y-2 text-sm font-medium text-charcoal ${className}`}>
      <span>{label}{required && <span className="ml-1 text-kelly">*</span>}</span>
      {children}
    </label>
  );
}
