import type { Metadata } from "next";
import Link from "next/link";

import { PortalForgotForm } from "@/components/portal-forgot-form";

export const metadata: Metadata = { title: "Reset your password", robots: { index: false } };

export default function PortalForgotPage() {
  return (
    <div className="mx-auto max-w-md rounded-[2.5rem] border border-charcoal/10 bg-white p-8 shadow-card sm:p-10">
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-charcoal">Reset your password</h1>
      <p className="mt-3 text-base leading-7 text-charcoal/68">
        Enter your email and we will send you a link to choose a new password.
      </p>
      <div className="mt-8">
        <PortalForgotForm />
      </div>
      <Link href="/portal" className="mt-5 inline-block text-sm font-medium text-blue hover:text-charcoal">
        Back to sign in
      </Link>
    </div>
  );
}
