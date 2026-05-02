"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const reasons = [
  "I want to place an order",
  "I have a question about a bag",
  "I need a swatch kit",
  "I want to talk through a project",
  "I'm an existing customer",
  "Something else",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", reason: "", message: "",
  });

  function set(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: wire to backend
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">

        {/* Left — info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Get in touch</p>
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-charcoal lg:text-6xl">
              Let's talk bags.
            </h1>
            <p className="max-w-md text-lg leading-8 text-charcoal/70">
              Whether you have a project in mind, a question about materials, or just want to see if we're the right fit — we're easy to reach.
            </p>
          </div>

          <div className="space-y-6">
            <ContactItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              }
              label="Email"
              value="hello@alongway.co"
              href="mailto:hello@alongway.co"
            />
            <ContactItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.27a2 2 0 0 1 2.11.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              }
              label="Phone / text"
              value="+1 (000) 000-0000"
              href="tel:+10000000000"
            />
            <ContactItem
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              }
              label="Based in"
              value="Los Angeles, CA"
            />
          </div>

          <div className="rounded-[2rem] border border-charcoal/10 bg-bone p-6 space-y-2">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/50">Response time</p>
            <p className="text-sm leading-6 text-charcoal/75">
              We typically reply within a few hours during business hours. For urgent projects, mention it in your message.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-[2.5rem] border border-charcoal/10 bg-white p-8 shadow-card lg:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-light-blue/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94A6D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal">Got it.</h2>
              <p className="max-w-sm text-sm leading-7 text-charcoal/65">
                We'll be in touch soon. In the meantime, feel free to browse the collection.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue mb-4">Send us a message</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" required>
                  <input required type="text" placeholder="Your name" value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputClass} />
                </Field>
                <Field label="Company / Brand">
                  <input type="text" placeholder="Optional" value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    className={inputClass} />
                </Field>
              </div>

              <Field label="Email" required>
                <input required type="email" placeholder="you@company.com" value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass} />
              </Field>

              <Field label="What can we help with?">
                <select value={form.reason} onChange={(e) => set("reason", e.target.value)} className={inputClass}>
                  <option value="">Select a reason</option>
                  {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>

              <Field label="Message" required>
                <textarea required rows={5} placeholder="Tell us about your project, timeline, or question..."
                  value={form.message} onChange={(e) => set("message", e.target.value)}
                  className={`${inputClass} resize-none`} />
              </Field>

              <button
                type="submit"
                className="w-full rounded-full bg-blue px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-light-blue transition-all"
              >
                Send message
              </button>

              <p className="text-center text-xs text-charcoal/40">
                We reply within a few hours during business hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClass = "w-full rounded-[1rem] border border-charcoal/15 bg-light-bone px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-blue focus:outline-none transition-colors";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/55">
        {label}{required && <span className="ml-0.5 text-blue">*</span>}
      </label>
      {children}
    </div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue/8 text-blue">
        {icon}
      </div>
      <div>
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/45">{label}</p>
        {href ? (
          <a href={href} className="mt-0.5 text-sm font-medium text-charcoal hover:text-light-blue">{value}</a>
        ) : (
          <p className="mt-0.5 text-sm font-medium text-charcoal">{value}</p>
        )}
      </div>
    </div>
  );
}
