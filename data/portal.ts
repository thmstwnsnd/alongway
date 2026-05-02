export type PortalOrderStatus = "Processing" | "In Production" | "Delivered";

export type PortalOrder = {
  id: string;
  orderNumber: string;
  bagName: string;
  bagSlug: string;
  quantity: number;
  placedDate: string;
  status: PortalOrderStatus;
  estimatedShipDate?: string;
  deliveredDate?: string;
  decorationType: string;
  artworkStatus: string;
  trackingNumber?: string;
  techpackSentDate: string;
  artworkApprovedDate?: string;
  timelineState: {
    productionComplete?: boolean;
    shipped?: boolean;
    delivered?: boolean;
  };
};

export const portalOrders: PortalOrder[] = [
  {
    id: "aw-1042",
    orderNumber: "AW-1042",
    bagName: "Beach Tote",
    bagSlug: "beach-tote",
    quantity: 250,
    placedDate: "Mar 14, 2026",
    status: "In Production",
    estimatedShipDate: "Jun 2, 2026",
    decorationType: "Screenprint",
    artworkStatus: "Approved on Apr 3, 2026",
    techpackSentDate: "Mar 19, 2026",
    artworkApprovedDate: "Apr 3, 2026",
    timelineState: {
      productionComplete: false,
      shipped: false,
      delivered: false,
    },
  },
  {
    id: "aw-0987",
    orderNumber: "AW-0987",
    bagName: "Everyday Tote",
    bagSlug: "everyday-tote",
    quantity: 100,
    placedDate: "Jan 28, 2026",
    status: "Delivered",
    deliveredDate: "Mar 15, 2026",
    decorationType: "Woven label",
    artworkStatus: "Approved on Feb 6, 2026",
    trackingNumber: "ALW-TRK-0987",
    techpackSentDate: "Feb 1, 2026",
    artworkApprovedDate: "Feb 6, 2026",
    timelineState: {
      productionComplete: true,
      shipped: true,
      delivered: true,
    },
  },
  {
    id: "aw-0911",
    orderNumber: "AW-0911",
    bagName: "Channel Tote (Medium)",
    bagSlug: "channel-tote-medium",
    quantity: 500,
    placedDate: "Nov 4, 2025",
    status: "Delivered",
    deliveredDate: "Jan 10, 2026",
    decorationType: "Embroidery",
    artworkStatus: "Approved on Nov 18, 2025",
    trackingNumber: "ALW-TRK-0911",
    techpackSentDate: "Nov 10, 2025",
    artworkApprovedDate: "Nov 18, 2025",
    timelineState: {
      productionComplete: true,
      shipped: true,
      delivered: true,
    },
  },
];

export function getPortalOrder(orderId: string) {
  return portalOrders.find((order) => order.id === orderId);
}
