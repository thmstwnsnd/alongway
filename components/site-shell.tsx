"use client";

import Link from "next/link";
import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { bags, getBagImageUrl } from "@/data/bags";
import { ChatWidget } from "@/components/chat-widget";
import {
  dismissEmailCapture,
  storeCapturedEmail,
  shouldHideEmailCapture,
} from "@/lib/email-capture";
import { formatPhone, site } from "@/lib/site";

const navLinks = [
  { href: "/build", label: "Build a Bag" },
  { href: "/store", label: "Store" },
  { href: "/how-it-works", label: "How It Works" },
];

const mobileNavLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/build", label: "Build a Bag" },
  { href: "/swatches", label: "Swatches" },
  { href: "/store", label: "Store" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const footerLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/build", label: "Build a Bag" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/legal", label: "Legal" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPortalRoute = pathname.startsWith("/portal");
  const isBuildRoute = pathname.startsWith("/build");
  const [footerEmail, setFooterEmail] = useState("");
  const [isFooterSubmitted, setIsFooterSubmitted] = useState(false);
  const [showFooterCapture, setShowFooterCapture] = useState(false);
  const [isCollectionMenuOpen, setIsCollectionMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [isHowItWorksMenuOpen, setIsHowItWorksMenuOpen] = useState(false);
  const [hoveredBagSlug, setHoveredBagSlug] = useState<string | null>(null);
  const collectionMenuRef = useRef<HTMLDivElement>(null);
  const companyMenuRef = useRef<HTMLDivElement>(null);
  const howItWorksMenuRef = useRef<HTMLDivElement>(null);

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
    if (!isCompanyMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (companyMenuRef.current && !companyMenuRef.current.contains(event.target as Node)) {
        setIsCompanyMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCompanyMenuOpen]);

  useEffect(() => {
    if (!isHowItWorksMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (howItWorksMenuRef.current && !howItWorksMenuRef.current.contains(event.target as Node)) {
        setIsHowItWorksMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHowItWorksMenuOpen]);

  useEffect(() => {
    setIsCollectionMenuOpen(false);
    setIsCompanyMenuOpen(false);
    setIsHowItWorksMenuOpen(false);
  }, [pathname]);

  const handleFooterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    storeCapturedEmail(footerEmail);
    setFooterEmail("");
    setShowFooterCapture(false);
    setIsFooterSubmitted(true);
  };

  if (isPortalRoute) {
    return <div className="min-h-screen font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen font-sans">
      <a href="#main" className="skip-link">Skip to main content</a>
      <header className="sticky top-0 z-50 border-b-[6px] border-light-blue bg-blue text-bone">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center">
            <Image src="/logo-tan.svg" alt="Alongway" width={200} height={48} className="h-9 w-auto object-contain" priority />
          </Link>
          {isBuildRoute ? null : (
          <>
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-display font-extrabold uppercase tracking-wide text-bone md:flex">
            <div
              ref={collectionMenuRef}
              className="relative"
              onMouseEnter={() => setIsCollectionMenuOpen(true)}
              onMouseLeave={() => setIsCollectionMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCollectionMenuOpen((current) => !current)}
                className="inline-flex items-center gap-2 uppercase text-bone hover:text-bone/85"
              >
                <span>Collection</span>
                <span
                  className={`text-[10px] text-charcoal/70 transition-transform ${isCollectionMenuOpen ? "rotate-180" : ""}`}
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
                            <p className="text-sm font-semibold text-blue leading-snug">{bag.name}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Preview image — right */}
                    <div className="w-48 flex-shrink-0 bg-light-bone">
                      {hoveredBagSlug ? (
                        <div className="relative h-full w-full">
                          <Image
                            key={hoveredBagSlug}
                            src={getBagImageUrl(hoveredBagSlug)}
                            alt={bags.find((b) => b.slug === hoveredBagSlug)?.name ?? ""}
                            fill
                            sizes="192px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center p-6">
                          <p className="text-center text-xs font-medium text-charcoal/70">Hover a bag to preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 border-t border-charcoal/10 pt-4">
                    <Link
                      href="/collection"
                      onClick={() => setIsCollectionMenuOpen(false)}
                      className="text-sm font-semibold text-blue hover:text-charcoal"
                    >
                      View All <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg" alt="" width={115} height={79} className="inline-block h-4 w-auto ml-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={howItWorksMenuRef}
              className="relative"
              onMouseEnter={() => setIsHowItWorksMenuOpen(true)}
              onMouseLeave={() => setIsHowItWorksMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsHowItWorksMenuOpen((current) => !current)}
                className="inline-flex items-center gap-2 uppercase text-bone hover:text-bone/85"
              >
                <span>How It Works</span>
                <span
                  className={`text-[10px] text-charcoal/70 transition-transform ${isHowItWorksMenuOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  isHowItWorksMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <div className="min-w-[180px] rounded-[1.25rem] border border-charcoal/10 bg-white p-2 shadow-card">
                  {[
                    { href: "/how-it-works", label: "How It Works" },
                    { href: "/pricing", label: "Pricing" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsHowItWorksMenuOpen(false)}
                      className="block rounded-[0.75rem] px-4 py-2.5 text-sm text-blue hover:bg-light-bone"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-charcoal/10 pt-1">
                    <Link href="/swatches" onClick={() => setIsHowItWorksMenuOpen(false)}
                      className="block rounded-[0.75rem] bg-bone px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-blue hover:bg-light-blue">
                      Get Swatches
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={companyMenuRef}
              className="relative"
              onMouseEnter={() => setIsCompanyMenuOpen(true)}
              onMouseLeave={() => setIsCompanyMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCompanyMenuOpen((current) => !current)}
                className="inline-flex items-center gap-2 uppercase text-bone hover:text-bone/85"
              >
                <span>Company</span>
                <span
                  className={`text-[10px] text-charcoal/70 transition-transform ${isCompanyMenuOpen ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
                  isCompanyMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <div className="min-w-[180px] rounded-[1.25rem] border border-charcoal/10 bg-white p-2 shadow-card">
                  {[
                    { href: "/about", label: "About" },
                    { href: "/contact", label: "Contact" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsCompanyMenuOpen(false)}
                      className="block rounded-[0.75rem] px-4 py-2.5 text-sm text-blue hover:bg-light-bone"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {navLinks.filter((link) => link.href !== "/how-it-works").map((link) => (
              <Link key={link.href} href={link.href} className="text-bone hover:text-bone/85">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/store" aria-label="Store" className="flex items-center gap-1 text-bone/85 hover:text-bone">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </Link>
            <Link href="/portal" className="hidden items-center justify-center sm:flex" aria-label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bone/85 hover:text-bone">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </Link>

            <Link
              href="/build"
              className="rounded-full bg-bone px-5 py-3 text-sm font-semibold text-blue shadow-card hover:-translate-y-0.5 hover:bg-light-blue"
            >
              Build Your Bag
            </Link>
          </div>
          </>
          )}
        </div>
        {isBuildRoute ? null : (
        <nav aria-label="Mobile" className="flex gap-5 overflow-x-auto border-t border-charcoal/10 px-6 py-3 text-sm font-display font-extrabold md:hidden">
          {mobileNavLinks.map((link) => (
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
        )}
      </header>
      <main id="main">{children}</main>

      {isBuildRoute ? null : (
      <>
      <section aria-label="Help choosing a bag" className="bg-charcoal px-6 py-5 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8">
          <p className="font-display text-sm font-bold text-white">
            Not sure which bag is right?
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="text-sm font-semibold text-white hover:text-white/75">
              Let&apos;s Chat
            </Link>
            <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_White.svg" alt="" width={115} height={79} className="h-3.5 w-auto opacity-50" aria-hidden="true" />
            <a href={`mailto:${site.email}`} className="text-sm text-light-blue hover:text-white">
              {site.email}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-blue text-bone">
        <Image
          src="/svg/patterns/Alongway_Website_Graphic_CheckeredPattern_1.svg"
          alt=""
          width={4026}
          height={403}
          className="pointer-events-none h-4 w-full select-none object-cover"
          aria-hidden="true"
        />
        {/* Main footer body */}
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-14 lg:flex-row lg:items-start lg:justify-between lg:px-10">

          {/* Brand block — left */}
          <div className="space-y-5 lg:max-w-xs">
            <div className="flex items-center gap-3">
              <Image src="/svg/icons/Alongway_Website_Graphic_BirdRight_Cream.svg" alt="" width={200} height={200} className="pointer-events-none h-auto w-8 select-none opacity-60" aria-hidden="true" />
              <Image src="/svg/icons/Alongway_Website_Graphic_PeaceHand_Cream.svg" alt="" width={269} height={449} className="pointer-events-none h-auto w-5 select-none opacity-80" aria-hidden="true" />
              <Image src="/svg/icons/Alongway_Website_Graphic_Flower_Cream.svg" alt="" width={200} height={200} className="pointer-events-none h-auto w-5 select-none opacity-80" aria-hidden="true" />
              <Image src="/svg/icons/Alongway_Website_Graphic_DoubleSmileyFace_Cream.svg" alt="" width={348} height={191} className="pointer-events-none h-auto w-8 select-none opacity-80" aria-hidden="true" />
            </div>
            <Link href="/" className="inline-flex">
              <Image src="/svg/logos/Alongway_Website_Graphic_Logo_Outlined_Cream.svg" alt="Alongway" width={180} height={44} className="h-14 w-auto object-contain" />
            </Link>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-bone/85">
              Made for the long way.
            </p>
          </div>

          {/* Middle — Instagram + Text us */}
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            {site.phone ? (
              <div>
                <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-bone/85">Questions? Text us.</p>
                <a href={`sms:${site.phone}`} className="mt-1 block text-sm font-semibold text-bone hover:text-light-blue">{formatPhone(site.phone)}</a>
              </div>
            ) : null}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-bone/85 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              {site.instagram.handle}
            </a>
          </div>

          {/* CTA block — right */}
          <div className="flex flex-col items-start gap-3 lg:min-w-[200px]">
            <Link href="/build" className="flex w-full items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-charcoal hover:-translate-y-0.5 hover:bg-bone">
              Build Your Bag
            </Link>
            <Link href="/swatches" className="flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-bone hover:-translate-y-0.5 hover:border-white hover:text-white">
              Order Swatches
            </Link>
            <Link href="/quiz" className="flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-bone hover:-translate-y-0.5 hover:border-white hover:text-white">
              Find your bag
            </Link>
          </div>

        </div>
        <div className="border-t border-white/10 px-6 pt-6 pb-5 lg:px-10">
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-5">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-bone/85 hover:text-white hover:underline underline-offset-4">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-center text-xs text-bone/85">2026 Alongway. All rights reserved.</p>
        </div>
      </footer>
      <ChatWidget />
      </>
      )}
    </div>
  );
}
