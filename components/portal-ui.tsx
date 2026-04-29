import Link from "next/link";
import type { ReactNode } from "react";

import type { PortalOrder, PortalOrderStatus } from "@/data/portal";

const statusStyles: Record<PortalOrderStatus, string> = {
  Processing: "bg-blue/10 text-blue border-blue/20",
  "In Production": "bg-blue/10 text-kelly border-blue/20",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

type TimelineStep = {
  label: string;
  detail?: string;
  state: "complete" | "current" | "upcoming";
  icon: string;
};

export function PortalSummaryCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-[1.75rem] border border-charcoal/10 bg-white p-5 shadow-card">
      <p className="text-sm font-medium text-charcoal/60">{label}</p>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-charcoal">{value}</p>
    </div>
  );
}

export function PortalSectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-charcoal">{title}</h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: PortalOrderStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

export function PortalOrderCard({ order }: { order: PortalOrder }) {
  return (
    <article className="rounded-[1.5rem] border border-charcoal/10 bg-light-bone p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold tracking-tight text-charcoal">{order.orderNumber}</h3>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-base font-medium text-charcoal">{order.bagName} × {order.quantity}</p>
          <p className="text-sm text-charcoal/65">Placed: {order.placedDate}</p>
          <p className="text-sm text-charcoal/65">
            {order.status === "Delivered" ? `Delivered: ${order.deliveredDate}` : `Est. ship: ${order.estimatedShipDate}`}
          </p>
        </div>
        <Link
          href={`/portal/orders/${order.id}`}
          className="inline-flex rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm font-semibold text-charcoal hover:border-blue hover:text-blue"
        >
          View order
        </Link>
      </div>
    </article>
  );
}

export function PortalOrderTimeline({ order }: { order: PortalOrder }) {
  const steps: TimelineStep[] = [
    { label: "Order placed", detail: order.placedDate, state: "complete", icon: "✓" },
    { label: "Payment confirmed", detail: "Confirmed within 1 business day", state: "complete", icon: "✓" },
    { label: "Techpack sent", detail: order.techpackSentDate, state: "complete", icon: "✓" },
    {
      label: order.artworkApprovedDate ? "Artwork approved" : "Awaiting approval",
      detail: order.artworkApprovedDate,
      state: order.artworkApprovedDate ? "complete" : "current",
      icon: order.artworkApprovedDate ? "✓" : "⏳",
    },
    {
      label: order.timelineState.productionComplete ? "Complete" : "In production",
      detail: order.timelineState.productionComplete ? "Complete" : "Current stage",
      state: order.timelineState.productionComplete ? "complete" : "current",
      icon: order.timelineState.productionComplete ? "✓" : "🏭",
    },
    {
      label: "Shipped",
      detail: order.trackingNumber ? `Tracking: ${order.trackingNumber}` : "Tracking will appear here once shipped",
      state: order.timelineState.shipped ? "complete" : "upcoming",
      icon: "📦",
    },
    {
      label: "Delivered",
      detail: order.deliveredDate,
      state: order.timelineState.delivered ? "complete" : "upcoming",
      icon: "🎉",
    },
  ];

  return (
    <ol className="space-y-0">
      {steps.map((step, index) => {
        const isComplete = step.state === "complete";
        const isCurrent = step.state === "current";
        const hasLine = index < steps.length - 1;

        return (
          <li key={`${step.label}-${index}`} className="grid grid-cols-[2.75rem_1fr] gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border text-base ${
                  isComplete
                    ? "border-charcoal bg-charcoal text-white"
                    : isCurrent
                      ? "border-blue bg-blue/10 text-kelly"
                      : "border-charcoal/15 bg-white text-charcoal/45"
                }`}
              >
                {step.icon}
              </div>
              {hasLine ? <div className={`mt-2 h-12 w-px ${isComplete ? "bg-charcoal/25" : "bg-charcoal/12"}`} /> : null}
            </div>
            <div className="pb-6 pt-2">
              <p className="text-base font-semibold text-charcoal">{step.label}</p>
              {step.detail ? <p className="mt-1 text-sm text-charcoal/62">{step.detail}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
