import type { Metadata } from "next";

import { StorePage } from "@/components/store-page";

export const metadata: Metadata = {
  title: "Store",
  description: "Order a fabric swatch kit and feel every canvas weight and specialty fabric before you commit.",
};

export default function Page() {
  return <StorePage />;
}
