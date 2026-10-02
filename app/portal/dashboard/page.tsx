import { requireUser } from "@/lib/require-user";
import type { Metadata } from "next";
import Link from "next/link";

import { PortalOrderCard, PortalSectionCard, PortalSummaryCard } from "@/components/portal-ui";
import { portalOrders } from "@/data/portal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};


const recentOrders = portalOrders.slice(0, 3);

export default async function PortalDashboardPage() {
  const user = await requireUser();
  const firstName = user.name?.trim().split(/\s+/)[0];
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">Customer Portal</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">{firstName ? `Good to see you, ${firstName}.` : "Good to see you."}</h1>
        <p className="max-w-3xl text-base leading-7 text-charcoal/66">
          Here&apos;s the current snapshot of your Alongway account, recent orders, and the next steps your team can take.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <PortalSummaryCard label="Active orders" value="2" />
        <PortalSummaryCard label="Last order" value="Beach Tote × 250" />
        <PortalSummaryCard label="Next milestone" value="In Production" />
        <PortalSummaryCard label="Ready to reorder" value="1 item" />
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.8fr)]">
        <PortalSectionCard
          title="Recent orders"
          action={
            <Link href="/portal/orders" className="text-sm font-semibold text-blue hover:text-charcoal">
              View all orders
            </Link>
          }
        >
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <PortalOrderCard key={order.id} order={order} />
            ))}
          </div>
        </PortalSectionCard>

        <PortalSectionCard title="Quick actions">
          <div className="space-y-4">
            <Link
              href="/shop"
              className="flex rounded-[1.5rem] border border-charcoal/10 bg-light-bone px-5 py-4 text-sm font-semibold text-charcoal hover:border-blue hover:text-blue"
            >
              Start a new order
            </Link>
            <Link
              href="/shop"
              className="flex rounded-[1.5rem] border border-charcoal/10 bg-light-bone px-5 py-4 text-sm font-semibold text-charcoal hover:border-blue hover:text-blue"
            >
              Request reorder
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="flex rounded-[1.5rem] border border-charcoal/10 bg-light-bone px-5 py-4 text-sm font-semibold text-charcoal hover:border-blue hover:text-blue"
            >
              Contact us
            </a>
          </div>
        </PortalSectionCard>
      </div>
    </div>
  );
}
