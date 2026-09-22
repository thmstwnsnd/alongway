import type { Metadata } from "next";
import { OrderConfirmationPage } from "@/components/order-confirmation-page";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};


export default function Page() {
  return <OrderConfirmationPage />;
}
