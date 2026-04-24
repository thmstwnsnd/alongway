import Link from "next/link";
import type { ReactNode } from "react";

const navLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Alongway
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/start"
            className="rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Start Your Order
          </Link>
        </div>
        <nav className="flex gap-5 overflow-x-auto border-t border-charcoal/10 px-6 py-3 text-sm font-medium md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-blue">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-charcoal/10 bg-charcoal text-bone">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_1fr] lg:px-10">
          <div className="space-y-3">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              Alongway
            </Link>
            <p className="max-w-md text-sm text-bone/80">Made to carry.</p>
          </div>
          <div className="grid gap-3 text-sm text-bone/80 sm:grid-cols-2">
            {[
              ...navLinks,
              { href: "/start", label: "Start Your Order" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-bone/70 lg:px-10">
          2026 Alongway. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
