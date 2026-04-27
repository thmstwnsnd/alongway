import type { ReactNode } from "react";
import Link from "next/link";

import { includedOrderItems, formatCurrency } from "@/lib/order-flow";

type OrderSummaryCardProps = {
  bagName?: string;
  quantity?: number | null;
  unitPrice?: number | null;
  total?: number | null;
  showCheckoutBreakdown?: boolean;
  shippingLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
  note?: string;
};

export function OrderSummaryCard({
  bagName,
  quantity,
  unitPrice,
  total,
  showCheckoutBreakdown = false,
  shippingLabel = "Free",
  ctaLabel,
  ctaHref,
  onCtaClick,
  ctaDisabled = false,
  note = "All orders paid in full. Production begins after artwork approval.",
}: OrderSummaryCardProps) {
  const ctaClassName =
    "mt-8 inline-flex w-full items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-charcoal/20 disabled:text-charcoal/45 disabled:hover:translate-y-0";

  return (
    <aside className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight">Your order</h2>

      <div className="mt-6 space-y-4 rounded-[1.5rem] bg-light-bone p-5">
        <SummaryRow
          label="Bag"
          value={
            bagName ? (
              <span className="font-semibold text-charcoal">{bagName}</span>
            ) : (
              <span className="text-charcoal/45">No bag selected yet</span>
            )
          }
        />
        <SummaryRow label="Quantity" value={quantity ? quantity.toLocaleString() : "Not selected"} />
        <SummaryRow label="Per-unit price" value={unitPrice ? formatCurrency(unitPrice) : "Not selected"} />
        {showCheckoutBreakdown ? (
          <>
            <div className="border-t border-charcoal/10 pt-4">
              <SummaryRow label="Subtotal" value={total ? formatCurrency(total) : "TBD"} />
              <SummaryRow label="Shipping" value={shippingLabel} />
              <SummaryRow label="Setup" value="Free" />
            </div>
          </>
        ) : null}
        <div className="border-t border-charcoal/10 pt-4">
          <SummaryRow
            label={<span className="text-base font-bold text-charcoal">Total</span>}
            value={
              <span className="text-xl font-bold tracking-tight text-charcoal">
                {total ? formatCurrency(total) : "TBD"}
              </span>
            }
          />
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">What&apos;s included</p>
        <ul className="mt-4 space-y-3 text-sm text-charcoal/80">
          {includedOrderItems.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange/10 text-sm font-bold text-orange">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {ctaLabel ? (
        ctaHref ? (
          <Link
            href={ctaHref}
            aria-disabled={ctaDisabled}
            className={`${ctaClassName} ${ctaDisabled ? "pointer-events-none" : ""}`}
            onClick={(event) => {
              if (ctaDisabled) {
                event.preventDefault();
                return;
              }
              onCtaClick?.();
            }}
          >
            {ctaLabel}
          </Link>
        ) : (
          <button type="button" disabled={ctaDisabled} className={ctaClassName} onClick={onCtaClick}>
            {ctaLabel}
          </button>
        )
      ) : null}

      <p className="mt-4 text-sm leading-6 text-charcoal/60">{note}</p>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-charcoal/60">{label}</span>
      <span className="text-right text-charcoal/80">{value}</span>
    </div>
  );
}
