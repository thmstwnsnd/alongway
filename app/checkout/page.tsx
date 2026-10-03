import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CheckoutPage } from "@/components/checkout-page";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};


export default async function Page() {
  // An account is required to place an order. The build is kept in the browser.
  const session = await auth();
  if (!session?.user) redirect("/portal?next=/checkout");
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
}
