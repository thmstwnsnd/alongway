"use client";

import { useEffect, useMemo, useState } from "react";

import { getSpecRows } from "@/components/build/build-spec-card";
import { AGREEMENT_TEXT, AGREEMENT_VERSION } from "@/data/agreement";
import type { BuildConfig } from "@/lib/build-flow";

export const SIGNOFF_STORAGE_KEY = "alongway-signoff";

export type SignoffState = {
  buildKey: string;
  initials: Record<string, string>;
  signedName: string;
  agreed: boolean;
  agreementVersion: number;
  signedAt: string | null;
};

/** The areas the customer initials, one box each. Rows with the same area are shown together. */
export function getAreas(build: BuildConfig): { area: string; value: string }[] {
  const rows = new Map(getSpecRows(build));
  const join = (...labels: string[]) => labels.filter((l) => rows.has(l)).map((l) => (labels.length > 1 ? `${l}: ${rows.get(l)}` : rows.get(l)!)).join(" · ");
  const areas = [
    { area: "Color", value: join("Color") },
    { area: "Canvas", value: join("Canvas") },
    { area: "Handles", value: join("Handles") },
    { area: "Threads", value: join("Threads") },
    { area: "Pockets", value: join("Pockets") },
    { area: "Artwork", value: join("Artwork") },
    { area: "Labels", value: join("Labels") },
    ...(rows.has("Logo") ? [{ area: "Logo & art", value: join("Logo", "Art") }] : []),
    { area: "Size & quantity", value: join("Size", "Quantity") },
  ];
  return areas;
}

export const buildKeyOf = (build: BuildConfig) => JSON.stringify(build);

const emptyState = (buildKey: string): SignoffState => ({
  buildKey,
  initials: {},
  signedName: "",
  agreed: false,
  agreementVersion: AGREEMENT_VERSION,
  signedAt: null,
});

const validInitials = (v: string | undefined) => /^[A-Za-z]{2,4}$/.test((v ?? "").trim());

export function isSignedOff(state: SignoffState, build: BuildConfig) {
  return (
    state.buildKey === buildKeyOf(build) &&
    getAreas(build).every((a) => validInitials(state.initials[a.area])) &&
    state.signedName.trim().length >= 2 &&
    state.agreed
  );
}

export function useSignoff(build: BuildConfig | null) {
  const key = build ? buildKeyOf(build) : "";
  const [state, setState] = useState<SignoffState>(() => emptyState(key));

  useEffect(() => {
    if (!build) return;
    try {
      const saved = JSON.parse(window.localStorage.getItem(SIGNOFF_STORAGE_KEY) ?? "null") as SignoffState | null;
      // A changed build means the old initials no longer apply.
      setState(saved && saved.buildKey === key ? saved : emptyState(key));
    } catch {
      setState(emptyState(key));
    }
  }, [key, build]);

  useEffect(() => {
    if (!build || state.buildKey !== key) return;
    try {
      window.localStorage.setItem(SIGNOFF_STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, key, build]);

  return [state, setState] as const;
}

const inputClass =
  "w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue";

export function SignOffSection({
  build,
  state,
  onChange,
}: {
  build: BuildConfig;
  state: SignoffState;
  onChange: (next: SignoffState) => void;
}) {
  const areas = useMemo(() => getAreas(build), [build]);
  const done = areas.filter((a) => validInitials(state.initials[a.area])).length;
  const complete = isSignedOff(state, build);

  return (
    <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8" aria-labelledby="signoff-title">
      <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-blue">Approve your build</p>
      <h2 id="signoff-title" className="font-display mt-1 text-2xl font-bold tracking-tight">
        Initial each area, then sign
      </h2>
      <p className="mt-3 text-sm leading-6 text-charcoal/70">
        Type your initials (2 to 4 letters) next to each area to confirm it is correct. Payment unlocks once every area is
        initialed and the agreement is signed.
      </p>
      <p className="mt-3 text-sm font-semibold text-charcoal" aria-live="polite">
        {done} of {areas.length} areas initialed
      </p>

      <ul className="mt-4 divide-y divide-charcoal/10">
        {areas.map((a) => {
          const ok = validInitials(state.initials[a.area]);
          const id = `initials-${a.area.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <li key={a.area} className="flex items-center justify-between gap-4 py-3">
              <label htmlFor={id} className="min-w-0 flex-1">
                <span className="block text-base font-bold text-charcoal">{a.area}</span>
                <span className="block text-sm text-charcoal/70">{a.value}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={id}
                  value={state.initials[a.area] ?? ""}
                  maxLength={4}
                  autoComplete="off"
                  placeholder="Initials"
                  onChange={(e) =>
                    onChange({
                      ...state,
                      initials: { ...state.initials, [a.area]: e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase() },
                      signedAt: null,
                    })
                  }
                  className="w-24 rounded-xl border border-charcoal/15 bg-light-bone px-3 py-2 text-center text-sm font-bold uppercase tracking-widest outline-none focus:border-blue"
                />
                <span className={`w-5 text-lg font-bold ${ok ? "text-kelly" : "text-transparent"}`} aria-hidden="true">
                  ✓
                </span>
                <span className="sr-only">{ok ? "Initialed" : "Not initialed"}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-[1.25rem] bg-light-bone p-5">
        <h3 className="text-base font-bold text-charcoal">Order agreement</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-charcoal/80">
          {AGREEMENT_TEXT.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-charcoal/70">Draft wording, version {AGREEMENT_VERSION}. Final text to come from Alongway.</p>
        <label className="mt-4 flex items-start gap-3 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={state.agreed}
            onChange={(e) => onChange({ ...state, agreed: e.target.checked, signedAt: null })}
            className="mt-1 h-4 w-4 accent-blue"
          />
          <span>I have read and agree to the order agreement.</span>
        </label>
        <label className="mt-4 block space-y-2 text-sm font-medium text-charcoal">
          <span>Sign by typing your full name</span>
          <input
            value={state.signedName}
            autoComplete="name"
            onChange={(e) => onChange({ ...state, signedName: e.target.value, signedAt: null })}
            className={inputClass}
          />
        </label>
      </div>

      <p className={`mt-4 text-sm font-semibold ${complete ? "text-kelly" : "text-charcoal/70"}`} role="status">
        {complete ? "Signed. Payment is unlocked below." : "Payment stays locked until every area is initialed and the agreement is signed."}
      </p>
    </section>
  );
}
