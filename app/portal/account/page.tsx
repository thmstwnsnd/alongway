"use client";

import { requireUser } from "@/lib/require-user";
import { useState } from "react";

export default async function PortalAccountPage() {
  await requireUser();
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-blue">Account</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">Account settings.</h1>
        <p className="max-w-3xl text-base leading-7 text-charcoal/70">
          Manage your profile, addresses, and password.
        </p>
      </section>

      <div className="grid gap-8">
        {/* Profile */}
        <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal">Profile</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <AccountField label="Name" defaultValue="Alex Carter" />
            <AccountField label="Email" defaultValue="alex@brand.com" type="email" />
            <AccountField label="Company" defaultValue="North Coast Studio" />
            <AccountField label="Phone" defaultValue="(415) 555-0186" type="tel" />
          </div>
          <button
            type="button"
            className="mt-6 inline-flex rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Save changes
          </button>
        </section>

        {/* Shipping address */}
        <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal">Shipping address</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <AccountField label="Address line 1" defaultValue="470 Valencia Street" />
            <AccountField label="Address line 2" defaultValue="Suite 204" />
            <AccountField label="City" defaultValue="San Francisco" />
            <AccountField label="State" defaultValue="CA" />
            <AccountField label="Postal code" defaultValue="94103" />
            <AccountField label="Country" defaultValue="United States" />
          </div>
          <button
            type="button"
            className="mt-6 inline-flex rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Save address
          </button>
        </section>

        {/* Billing address */}
        <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal">Billing address</h2>

          {/* Checkbox */}
          <label className="mt-4 flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
              className="h-5 w-5 cursor-pointer rounded border-charcoal/20 accent-blue"
            />
            <span className="text-sm font-medium text-charcoal">
              Billing address is the same as shipping address
            </span>
          </label>

          {/* Conditional billing fields */}
          {!billingSameAsShipping && (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <AccountField label="Address line 1" defaultValue="" />
              <AccountField label="Address line 2" defaultValue="" />
              <AccountField label="City" defaultValue="" />
              <AccountField label="State" defaultValue="" />
              <AccountField label="Postal code" defaultValue="" />
              <AccountField label="Country" defaultValue="United States" />
              <button
                type="button"
                className="col-span-full mt-2 inline-flex w-fit rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
              >
                Save billing address
              </button>
            </div>
          )}
        </section>

        {/* Password */}
        <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal">Password change</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <AccountField label="Current password" defaultValue="" type="password" />
            <AccountField label="New password" defaultValue="" type="password" />
            <AccountField label="Confirm password" defaultValue="" type="password" />
          </div>
        </section>
      </div>

      <a href="#" className="inline-flex text-sm text-charcoal/70 hover:text-blue">
        Delete account
      </a>
    </div>
  );
}

function AccountField({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-charcoal/10 bg-light-bone px-4 py-3 text-sm text-charcoal outline-none focus:border-blue focus:bg-white"
      />
    </label>
  );
}
