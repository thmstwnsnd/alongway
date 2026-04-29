"use client";

import Link from "next/link";
import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { bags, getBagImageUrl } from "@/data/bags";
import {
  dismissEmailCapture,
  storeCapturedEmail,
  shouldHideEmailCapture,
} from "@/lib/email-capture";

const navLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/swatches", label: "Swatches" },
  { href: "/store", label: "Store" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

const footerLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/swatches", label: "Swatches" },
  { href: "/store", label: "Store" },
  { href: "/shop", label: "Shop" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/start", label: "Start Your Order" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPortalRoute = pathname.startsWith("/portal");
  const [footerEmail, setFooterEmail] = useState("");
  const [isFooterSubmitted, setIsFooterSubmitted] = useState(false);
  const [showFooterCapture, setShowFooterCapture] = useState(false);
  const [isCollectionMenuOpen, setIsCollectionMenuOpen] = useState(false);
  const [hoveredBagSlug, setHoveredBagSlug] = useState<string | null>(null);
  const collectionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowFooterCapture(!shouldHideEmailCapture());
    setIsFooterSubmitted(Boolean(shouldHideEmailCapture() && window.localStorage.getItem("email_captured")));

    const handleCapture = () => {
      setShowFooterCapture(false);
      setIsFooterSubmitted(true);
    };

    window.addEventListener("alongway-email-captured", handleCapture);

    return () => {
      window.removeEventListener("alongway-email-captured", handleCapture);
    };
  }, []);

  useEffect(() => {
    if (!isCollectionMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (collectionMenuRef.current && !collectionMenuRef.current.contains(event.target as Node)) {
        setIsCollectionMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCollectionMenuOpen]);

  useEffect(() => {
    setIsCollectionMenuOpen(false);
  }, [pathname]);

  const handleFooterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    storeCapturedEmail(footerEmail);
    console.log("Captured email", footerEmail);
    setFooterEmail("");
    setShowFooterCapture(false);
    setIsFooterSubmitted(true);
  };

  if (isPortalRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center">
            <Image src="/logo-blue.svg" alt="Alongway" width={200} height={48} className="h-9 w-auto object-contain" priority />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <div
              ref={collectionMenuRef}
              className="relative"
              onMouseEnter={() => setIsCollectionMenuOpen(true)}
              onMouseLeave={() => setIsCollectionMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCollectionMenuOpen((current) => !current)}
                className="inline-flex items-center gap-2 hover:text-blue"
              >
                <span>Collection</span>
                <span
                  className={`text-[10px] text-charcoal/45 transition-transform ${isCollectionMenuOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  isCollectionMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <div className="w-[56rem] rounded-[1.5rem] border border-charcoal/10 bg-white shadow-card overflow-hidden">
                  <div className="flex">
                    {/* Bag list — left */}
                    <div className="flex-1 p-4">
                      <div className="grid grid-cols-4 gap-0.5">
                        {bags.map((bag) => (
                          <Link
                            key={bag.slug}
                            href={`/collection/${bag.slug}`}
                            onClick={() => { setIsCollectionMenuOpen(false); setHoveredBagSlug(null); }}
                            onMouseEnter={() => setHoveredBagSlug(bag.slug)}
                            onMouseLeave={() => setHoveredBagSlug(null)}
                            className={`rounded-[0.75rem] px-3 py-2.5 transition-colors ${
                              hoveredBagSlug === bag.slug ? "bg-light-bone" : "hover:bg-light-bone"
                            }`}
                          >
                            <p className="text-sm font-semibold text-charcoal leading-snug">{bag.name}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Preview image — right */}
                    <div className="w-48 flex-shrink-0 bg-light-bone">
                      {hoveredBagSlug ? (
                        <img
                          key={hoveredBagSlug}
                          src={getBagImageUrl(hoveredBagSlug, "card")}
                          alt={bags.find(b => b.slug === hoveredBagSlug)?.name ?? ""}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center p-6">
                          <p className="text-center text-xs font-medium text-charcoal/40">Hover a bag to preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 border-t border-charcoal/10 pt-4">
                    <Link
                      href="/collection"
                      onClick={() => setIsCollectionMenuOpen(false)}
                      className="text-sm font-semibold text-kelly hover:text-charcoal"
                    >
                      View All →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {navLinks.filter((link) => link.href !== "/collection").map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/portal" className="hidden text-sm font-medium text-charcoal/70 hover:text-blue sm:inline-flex">
              Sign in
            </Link>
            <Link href="/swatches" className="hidden text-sm font-semibold text-charcoal/70 hover:text-kelly md:inline-flex">
              Get Swatches
            </Link>
            <Link
              href="/start"
              className="rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
            >
              Start Your Order
            </Link>
          </div>
        </div>
        <nav className="flex gap-5 overflow-x-auto border-t border-charcoal/10 px-6 py-3 text-sm font-medium md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-blue">
              {link.label}
            </Link>
          ))}
          <Link href="/swatches" className="whitespace-nowrap hover:text-blue">
            Get Swatches
          </Link>
          <Link href="/portal" className="whitespace-nowrap text-charcoal/70 hover:text-blue">
            Sign in
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <section className="bg-charcoal px-6 py-12 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Need a hand?</h2>
            <p className="max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Not sure which bag is right? Want to talk through your project?
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/start" className="text-sm font-semibold text-kelly hover:text-white">
              Start a conversation →
            </Link>
            <a href="mailto:hello@alongway.co" className="text-sm font-semibold text-white/80 hover:text-white">
              hello@alongway.co
            </a>
          </div>
        </div>
      </section>
      <footer className="bg-blue text-bone">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_1fr] lg:px-10">
          <div className="space-y-3">
            <Link href="/" className="flex items-center">
              <Image src="/logo-tan.svg" alt="Alongway" width={180} height={44} className="h-8 w-auto object-contain" />
            </Link>
            <p className="max-w-md text-sm text-bone/80">Made to carry.</p>
            <a
              href="https://instagram.com/alongwayco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-bone/80 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              @alongwayco
            </a>
            {showFooterCapture ? (
              <form className="space-y-3 pt-3" onSubmit={handleFooterSubmit}>
                <p className="max-w-sm text-sm font-medium leading-6 text-bone">
                  Get early access + 10 free totes on your first order.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    required
                    type="email"
                    value={footerEmail}
                    onChange={(event) => setFooterEmail(event.target.value)}
                    placeholder="Email address"
                    className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:bg-white focus:text-charcoal focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-charcoal hover:bg-bone"
                  >
                    Join
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    dismissEmailCapture();
                    setShowFooterCapture(false);
                  }}
                  className="text-xs text-bone/65 underline-offset-4 hover:text-white hover:underline"
                >
                  No thanks, I&apos;ll pass
                </button>
              </form>
            ) : isFooterSubmitted ? (
              <p className="max-w-sm pt-3 text-sm leading-6 text-bone/80">
                Nice. We&apos;ll be in touch when you&apos;re ready to order. 🍊
              </p>
            ) : null}
          </div>
          <div className="space-y-6">
            <Link
              href="/start"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal hover:-translate-y-0.5 hover:bg-bone"
            >
              Start Your Order
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bone/40">Questions? Text us.</p>
              <a
                href="sms:+10000000000"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-bone hover:text-kelly"
              >
                +1 (000) 000-0000
              </a>
            </div>
          <div className="grid gap-3 text-sm text-bone/80 sm:grid-cols-2">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-bone/70 lg:px-10">
          2026 Alongway. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
