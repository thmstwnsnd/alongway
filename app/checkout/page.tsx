import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutPage } from "@/components/checkout-page";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};


export default function Page() {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
}
