import type { ReactNode } from "react";

import type { BuildOption } from "@/data/build-options";
import { formatCurrency } from "@/lib/order-flow";

export function Section({ step, title, hint, children }: { step: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="border-b border-charcoal/10 py-6 first:pt-0 last:border-b-0">
      <div className="flex items-baseline gap-3">
        <span className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">{step}</span>
        <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
      </div>
      {hint ? <p className="mt-1 text-sm text-charcoal/60">{hint}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

const price = (n: number) => (n > 0 ? `+${formatCurrency(n)}` : "Included");

export function OptionCard({
  option,
  selected,
  onClick,
  included = false,
  multi = false,
}: {
  option: BuildOption;
  selected: boolean;
  onClick: () => void;
  included?: boolean;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
        selected ? "border-blue bg-blue/5 ring-2 ring-blue/20" : "border-charcoal/10 bg-white hover:border-blue/40"
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center border text-[10px] font-bold ${
          multi ? "rounded-md" : "rounded-full"
        } ${selected ? "border-blue bg-blue text-white" : "border-charcoal/25 bg-white"}`}
      >
        {selected ? "✓" : ""}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-charcoal">{option.label}</span>
          <span className="whitespace-nowrap text-xs font-semibold text-charcoal/55">{included ? "Included" : price(option.pricePerUnit)}</span>
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-charcoal/60">{option.description}</span>
      </span>
    </button>
  );
}

export function OptionList({
  options,
  value,
  onChange,
  includedIds = [],
}: {
  options: BuildOption[];
  value: string | string[];
  onChange: (id: string) => void;
  includedIds?: string[];
}) {
  const multi = Array.isArray(value);
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          multi={multi}
          selected={multi ? value.includes(option.id) : value === option.id}
          included={includedIds.includes(option.id)}
          onClick={() => onChange(option.id)}
        />
      ))}
    </div>
  );
}

export function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
        selected ? "border-blue bg-blue text-white" : "border-charcoal/15 bg-white text-charcoal hover:border-blue/40"
      }`}
    >
      {children}
    </button>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-2.5 text-sm outline-none focus:border-blue";
