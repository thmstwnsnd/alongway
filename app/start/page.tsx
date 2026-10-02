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
      <SectionHeading level={1}
        eyebrow="Custom orders · 5,000+ units"
        title="Custom orders start at 5,000 units."
        body="We only take custom requests for runs of 5,000 units and above. For anything smaller, Build a Bag has every option and live pricing. Share the details below and we reply within one business day."
      />
      <div className="mt-12">
        <Suspense>
          <StartOrderForm />
        </Suspense>
      </div>
    </div>
  );
}
