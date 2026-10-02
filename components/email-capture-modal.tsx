"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  dismissEmailCapture,
  storeCapturedEmail,
  shouldHideEmailCapture,
} from "@/lib/email-capture";

const MODAL_DELAY_MS = 15000;

export function EmailCaptureModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || pathname.startsWith("/portal") || shouldHideEmailCapture()) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsOpen(true);
    }, MODAL_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isHydrated, pathname]);

  useEffect(() => {
    const handleCapture = () => {
      setIsSubmitted(true);
      setIsOpen(true);
    };

    window.addEventListener("alongway-email-captured", handleCapture);

    return () => {
      window.removeEventListener("alongway-email-captured", handleCapture);
    };
  }, []);

  if (!isHydrated || pathname.startsWith("/portal") || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/35 px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl bg-bone p-8 text-charcoal shadow-card sm:p-10">
        {isSubmitted ? (
          <div className="space-y-4 text-center">
            <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-light-blue">You&apos;re in</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">Nice. We&apos;ll be in touch when you&apos;re ready to order. 🍊</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-white hover:bg-blue"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-light-blue">First order perk</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Get 10 free totes with your first order.</h2>
              <p className="text-base leading-7 text-charcoal/72">
                A $150 value added to your first custom run. Enter your email and we&apos;ll reach out.
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                storeCapturedEmail(email);
                setIsSubmitted(true);
                setEmail("");
              }}
            >
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="w-full rounded-3xl border border-charcoal/15 bg-white px-5 py-4 text-base outline-none focus:border-blue"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-3xl bg-blue px-6 py-4 text-sm font-semibold text-white hover:bg-charcoal"
              >
                Claim My Free Totes
              </button>
            </form>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  dismissEmailCapture();
                  setIsOpen(false);
                }}
                className="text-sm text-charcoal/60 underline-offset-4 hover:text-charcoal hover:underline"
              >
                Maybe next time
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
