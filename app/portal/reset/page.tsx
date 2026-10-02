import type { Metadata } from "next";
import Link from "next/link";

import { PortalResetForm } from "@/components/portal-reset-form";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

export default async function PortalResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="mx-auto max-w-md rounded-[2.5rem] border border-charcoal/10 bg-white p-8 shadow-card sm:p-10">
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-charcoal">Choose a new password</h1>
      <div className="mt-8">
        {token ? (
          <PortalResetForm token={token} />
        ) : (
          <p className="text-base leading-7 text-charcoal/70">
            This reset link is missing its code.{" "}
            <Link href="/portal/forgot" className="font-semibold text-blue underline underline-offset-2">
              Request a new link
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
