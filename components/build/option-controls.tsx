import type { ReactNode } from "react";

import type { BuildOption } from "@/data/build-options";
import { formatCurrency } from "@/lib/order-flow";

/* Clean, flat controls: hairline dividers, soft gray fills, one accent. */

export function Section({ step, title, hint, children }: { step: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="border-b border-black/[0.06] py-8 first:pt-2 last:border-b-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/35">Step {step}</p>
      <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-charcoal">{title}</h3>
      {hint ? <p className="mt-1 text-[13px] leading-5 text-black/45">{hint}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

const price = (n: number) => (n > 0 ? `+${formatCurrency(n)}` : "Included");

export function OptionCard({
  option,
  selected,
  onClick,
  included = false,
}: {
  option: BuildOption;
  selected: boolean;
  onClick: () => void;
  included?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-start justify-between gap-4 rounded-xl px-4 py-3.5 text-left transition-[background-color,box-shadow] duration-150 ${
        selected ? "bg-white shadow-[inset_0_0_0_2px_#364FA0]" : "bg-black/[0.04] hover:bg-black/[0.06]"
      }`}
    >
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-5 text-charcoal">{option.label}</span>
        <span className="mt-0.5 block text-[13px] leading-5 text-black/45">{option.description}</span>
      </span>
      <span className={`whitespace-nowrap pt-0.5 text-[13px] font-medium ${selected ? "text-blue" : "text-black/45"}`}>
        {included ? "Included" : price(option.pricePerUnit)}
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
    <div className="grid gap-2">
      {options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          selected={multi ? value.includes(option.id) : value === option.id}
          included={includedIds.includes(option.id)}
          onClick={() => onChange(option.id)}
        />
      ))}
    </div>
  );
}

/** Segmented control for short single-choice lists. */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex max-w-full flex-wrap gap-1 rounded-xl bg-black/[0.05] p-1">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-lg px-3.5 py-2 text-[13px] font-semibold transition ${
            value === o.value ? "bg-white text-charcoal shadow-sm" : "text-black/55 hover:text-charcoal"
          }`}
        >
          {o.label}
        </button>
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
      className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
        selected ? "bg-charcoal text-white" : "bg-black/[0.05] text-charcoal hover:bg-black/[0.08]"
      }`}
    >
      {children}
    </button>
  );
}

export function Swatch({ hex, name, selected, onClick }: { hex: string; name: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      title={name}
      aria-label={name}
      aria-pressed={selected}
      onClick={onClick}
      className={`h-9 w-9 rounded-lg transition-transform ${selected ? "scale-110 ring-2 ring-charcoal ring-offset-2 ring-offset-white" : "ring-1 ring-black/10 hover:scale-105"}`}
      style={{ backgroundColor: hex }}
    />
  );
}

export const inputClass =
  "w-full rounded-xl bg-black/[0.05] px-4 py-2.5 text-[14px] text-charcoal outline-none transition focus:bg-white focus:shadow-[inset_0_0_0_2px_#364FA0]";
