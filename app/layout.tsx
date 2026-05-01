import type { Metadata } from "next";
import type { ReactNode } from "react";

import { EmailCaptureModal } from "@/components/email-capture-modal";
import { SiteShell } from "@/components/site-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "Alongway | Made to carry.",
  description:
    "Premium custom totes and bags with curated silhouettes, all-in pricing, and factory-direct quality.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uwz0pum.css" />
      </head>
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
        <EmailCaptureModal />
      </body>
    </html>
  );
}
