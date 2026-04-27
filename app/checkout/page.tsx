import { Suspense } from "react";
import { CheckoutPage } from "@/components/checkout-page";

export default function Page() {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
}
