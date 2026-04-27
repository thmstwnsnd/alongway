import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import type { ReactNode } from "react";

import { EmailCaptureModal } from "@/components/email-capture-modal";
import { SiteShell } from "@/components/site-shell";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Alongway | Made to carry.",
  description:
    "Premium custom totes and bags with curated silhouettes, all-in pricing, and factory-direct quality.",
  icons: {
    icon: "/logo-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} font-sans antialiased`}>
        <SiteShell>{children}</SiteShell>
        <EmailCaptureModal />
      </body>
    </html>
  );
}
