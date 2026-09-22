import type { Metadata } from "next";

import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about custom totes, pricing, or timing? Reach the Alongway team.",
};

export default function Page() {
  return <ContactPage />;
}
