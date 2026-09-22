import type { Metadata } from "next";
import { Suspense } from "react";

import { SectionHeading } from "@/components/section-heading";
import { StartOrderForm } from "@/components/start-order-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us your bag style, quantity, artwork status and timing. We reply within one business day.",
};


export default function StartPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Request a quote"
        title="Tell us what you need and we&apos;ll take it from there."
        body="For 5,000+ units, custom sizes, or anything the builder can't cover. Share the details and we reply within one business day."
      />
      <div className="mt-12">
        <Suspense>
          <StartOrderForm />
        </Suspense>
      </div>
    </div>
  );
}
