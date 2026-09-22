import type { Metadata } from "next";
import { Suspense } from "react";

import { BagBuilder } from "@/components/build/bag-builder";

export const metadata: Metadata = {
  title: "Build a Bag",
  description:
    "Pick a silhouette, then size it, choose fabric and color, straps, stitching, pockets and extras. Live pricing as you build.",
};

export default function BuildPage() {
  return (
    <Suspense>
      <BagBuilder />
    </Suspense>
  );
}
