import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopPage } from "@/components/shop-page";

export const metadata: Metadata = {
  title: "Build Your Order",
  description:
    "Review your bag, fabric, decoration and add-ons before checkout.",
  robots: { index: false },
};


export default function Page() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  );
}
