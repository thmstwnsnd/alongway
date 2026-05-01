import Link from "next/link";
import { notFound } from "next/navigation";

import { PortalOrderTimeline, PortalSectionCard, StatusBadge } from "@/components/portal-ui";
import { getPortalOrder, portalOrders } from "@/data/portal";

export function generateStaticParams() {
  return portalOrders.map((order) => ({ id: order.id }));
}

export default async function PortalOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getPortalOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Link href="/portal/orders" className="inline-flex text-sm font-semibold text-blue hover:text-charcoal">
          Back to orders
        </Link>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">Order detail</p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">
              {order.orderNumber} | {order.bagName}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={order.status} />
              <p className="text-sm text-charcoal/62">Placed: {order.placedDate}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#"
              className="inline-flex rounded-full border border-charcoal/10 bg-white px-5 py-3 text-sm font-semibold text-charcoal hover:border-blue hover:text-blue"
            >
              Download invoice
            </Link>
            <Link
              href={`/shop?bag=${order.bagSlug}`}
              className="inline-flex rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Reorder this bag
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <PortalSectionCard title="Order details">
          <dl className="grid gap-5 sm:grid-cols-2">
            <DetailItem label="Bag" value={order.bagName} />
            <DetailItem label="Quantity" value={order.quantity.toString()} />
            <DetailItem label="Decoration type" value={order.decorationType} />
            <DetailItem label="Artwork status" value={order.artworkStatus} />
            <DetailItem label="Estimated ship" value={order.estimatedShipDate ?? "Already shipped"} />
            <DetailItem label="Tracking" value={order.trackingNumber ?? "Pending"} />
          </dl>
        </PortalSectionCard>

        <PortalSectionCard title="Status timeline">
          <PortalOrderTimeline order={order} />
        </PortalSectionCard>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-charcoal/10 bg-light-bone p-5">
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/48">{label}</dt>
      <dd className="mt-2 text-base font-semibold text-charcoal">{value}</dd>
    </div>
  );
}
