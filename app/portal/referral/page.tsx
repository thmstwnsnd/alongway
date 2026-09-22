"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const referralLink = `${site.url}/ref/YOUR-CODE`;

const referralSteps = [
  "Share your unique referral link",
  "Friend places their first order (100+ units)",
  "You both get $50 off your next order",
];

export default function PortalReferralPage() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">Referrals</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">Refer a Friend, Get $50</h1>
        <p className="max-w-3xl text-base leading-7 text-charcoal/66">
          Send the link. Look generous. Pocket the credit when their first order ships.
        </p>
      </section>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
        <div className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">How it works</p>
          <div className="mt-6 space-y-4">
            {referralSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-[1.5rem] bg-light-bone p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="pt-2 text-base font-medium leading-7 text-charcoal">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">Your referral link</p>
          <div className="mt-5 rounded-[1.5rem] border border-charcoal/10 bg-light-bone p-4">
            <p className="break-all text-sm font-medium text-charcoal">{referralLink}</p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-charcoal"
            >
              {isCopied ? "Copied" : "Copy link"}
            </button>
            <a
              href={`mailto:?subject=Alongway referral&body=Use my Alongway referral link: ${encodeURIComponent(referralLink)}`}
              className="inline-flex items-center justify-center rounded-full border border-charcoal/10 bg-white px-5 py-3 text-sm font-semibold text-charcoal hover:border-charcoal hover:bg-light-bone"
            >
              Share via email
            </a>
          </div>
          <p className="mt-5 text-sm leading-6 text-charcoal/62">
            Credit applied to your next order after referral&apos;s first order ships.
          </p>
        </div>
      </section>
    </div>
  );
}
