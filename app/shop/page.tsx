import { Suspense } from "react";
import { ShopPage } from "@/components/shop-page";

export default function Page() {
  return (
    <Suspense>
      <ShopPage />
    </Suspense>
  );
}
