import type { Metadata } from "next";
import type { ReactNode } from "react";

import { EmailCaptureModal } from "@/components/email-capture-modal";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: "/favicon.ico" },
  openGraph: { siteName: site.name, type: "website" },
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
