import type { Metadata } from "next";
import Link from "next/link";

import { StatusBadge } from "@/components/portal-ui";
import { portalOrders } from "@/data/portal";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false },
};


export default function PortalOrdersPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">Orders</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">Past and active orders.</h1>
        <p className="max-w-3xl text-base leading-7 text-charcoal/66">
          Review production status, delivery history, and reorder details for every Alongway program.
        </p>
      </section>

      <section className="rounded-[2rem] border border-charcoal/10 bg-white p-3 shadow-card sm:p-4">
        <div className="hidden grid-cols-[1.15fr_1.1fr_0.8fr_0.9fr_0.95fr_0.8fr] gap-4 rounded-[1.25rem] bg-light-bone px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/52 lg:grid">
          <span>Order</span>
          <span>Bag</span>
          <span>Quantity</span>
          <span>Date</span>
          <span>Status</span>
          <span />
        </div>
        <div className="space-y-3 pt-0 sm:pt-3">
          {portalOrders.map((order) => (
            <article
              key={order.id}
              className="grid gap-4 rounded-[1.5rem] border border-charcoal/10 bg-white px-5 py-5 lg:grid-cols-[1.15fr_1.1fr_0.8fr_0.9fr_0.95fr_0.8fr] lg:items-center"
            >
              <div>
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/45 lg:hidden">Order</p>
                <p className="text-base font-bold tracking-tight text-charcoal">{order.orderNumber}</p>
              </div>
              <div>
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/45 lg:hidden">Bag</p>
                <p className="text-sm font-medium text-charcoal">{order.bagName}</p>
              </div>
              <div>
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/45 lg:hidden">Quantity</p>
                <p className="text-sm text-charcoal/70">{order.quantity}</p>
              </div>
              <div>
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/45 lg:hidden">Date</p>
                <p className="text-sm text-charcoal/70">{order.placedDate}</p>
              </div>
              <div className="space-y-2">
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/45 lg:hidden">Status</p>
                <StatusBadge status={order.status} />
                <p className="text-sm text-charcoal/62">
                  {order.status === "Delivered" ? `Delivered: ${order.deliveredDate}` : `Est. ship: ${order.estimatedShipDate}`}
                </p>
              </div>
              <div className="lg:text-right">
                <Link
                  href={`/portal/orders/${order.id}`}
                  className="inline-flex rounded-full border border-charcoal/10 bg-light-bone px-4 py-2 text-sm font-semibold text-charcoal hover:border-blue hover:text-blue"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
