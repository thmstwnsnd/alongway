"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const portalLinks = [
  { href: "/portal/dashboard", label: "Dashboard" },
  { href: "/portal/orders", label: "Orders" },
  { href: "/portal/referral", label: "Referrals" },
  { href: "/portal/account", label: "Account" },
];

export function PortalShell({ children, signedIn }: { children: ReactNode; signedIn: boolean }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(54,79,160,0.12),transparent_26%),radial-gradient(circle_at_top_left,rgba(235,70,40,0.12),transparent_24%),linear-gradient(180deg,#f7f1e8_0%,#ffffff_38%,#f2ece2_100%)]">
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href={signedIn ? "/portal/dashboard" : "/portal"} className="flex items-center">
                <Image src="/logo-blue.svg" alt="Alongway" width={180} height={44} className="h-8 w-auto object-contain" priority />
              </Link>
              <span className="font-accent hidden rounded-full border border-charcoal/10 bg-light-bone px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70 sm:inline-flex">
                Customer Portal
              </span>
            </div>
            <Link href="/" className="text-sm font-medium text-charcoal/70 hover:text-blue">
              Back to site
            </Link>
          </div>
          {signedIn ? (
          <nav aria-label="Portal" className="flex flex-col gap-2 text-sm font-medium sm:flex-row sm:items-center sm:gap-3">
            {portalLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 ${
                    isActive ? "bg-charcoal text-white shadow-card" : "bg-white text-charcoal/75 hover:bg-light-bone hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          ) : null}
        </div>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">{children}</main>
    </div>
  );
}
