import type { ReactNode } from "react";

import type { BuildOption } from "@/data/build-options";
import { formatCurrency } from "@/lib/order-flow";

/* Clean, flat controls: hairline dividers, soft gray fills, one accent. */

export function Section({
  step,
  title,
  summary,
  hint,
  open,
  onToggle,
  onNext,
  isLast = false,
  children,
}: {
  step: string;
  title: string;
  /** What is currently chosen; shown in the header when collapsed. */
  summary: string;
  hint?: string;
  open: boolean;
  onToggle: () => void;
  onNext: () => void;
  isLast?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-black/[0.06]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        <span className={`w-7 text-[12px] font-semibold tabular-nums ${open ? "text-blue" : "text-black/30"}`}>{step}</span>
        <span className="min-w-0 flex-1">
          <span className={`block text-[17px] font-semibold tracking-[-0.01em] ${open ? "text-charcoal" : "text-charcoal/90"}`}>{title}</span>
          {!open ? <span className="mt-0.5 block truncate text-[13px] text-black/45">{summary}</span> : hint ? <span className="mt-0.5 block text-[13px] text-black/45">{hint}</span> : null}
        </span>
        <svg viewBox="0 0 20 20" className={`h-4 w-4 flex-shrink-0 text-black/35 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="pb-6 pl-11">
            {children}
            {!isLast ? (
              <button
                type="button"
                onClick={onNext}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-blue"
              >
                Next
                <span aria-hidden>→</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
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
