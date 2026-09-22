import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { StartOrderForm } from "@/components/start-order-form";

export const metadata: Metadata = {
  title: "Start Your Order",
  description:
    "Tell us your bag style, quantity, artwork status and timing. We reply within one business day.",
};


export default function StartPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Start your order"
        title="Tell us what you need and we&apos;ll take it from there."
        body="Share your bag style, quantity, artwork status, and timing. No backend yet, just a clean first step."
      />
      <div className="mt-12">
        <StartOrderForm />
      </div>
    </div>
  );
}
