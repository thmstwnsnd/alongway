import type { Metadata } from "next";

import { CustomInquirePage } from "@/components/custom-inquiry-page";

export const metadata: Metadata = {
  title: "Custom Tote Inquiry",
  description: "Tell us about the bag you want to build from scratch and we will scope it with you.",
};

export default function Page() {
  return <CustomInquirePage />;
}
