"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { OrderSummaryCard } from "@/components/order-summary-card";
import { getCheckoutAmounts } from "@/lib/build-flow";
import { BuildSpecCard } from "@/components/build/build-spec-card";
import { SignOffSection, isSignedOff, useSignoff } from "@/components/checkout/sign-off";
import { getBagBySlug } from "@/data/bags";
import {
  LAST_ORDER_STORAGE_KEY,
  ORDER_DRAFT_STORAGE_KEY,
  emptyOrderDraft,
  formatCurrency,
  shippingOptions,
  type OrderDraft,
} from "@/lib/order-flow";

type CheckoutFormState = {
  email: string;
  phone: string;
  fullName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  nameOnCard: string;
};

const emptyCheckoutForm: CheckoutFormState = {
  email: "",
  phone: "",
  fullName: "",
  company: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  nameOnCard: "",
};

export function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderDraft>(emptyOrderDraft);
  const [formState, setFormState] = useState<CheckoutFormState>(emptyCheckoutForm);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedOrder = window.localStorage.getItem(ORDER_DRAFT_STORAGE_KEY);
    const nextOrder = savedOrder ? { ...emptyOrderDraft, ...JSON.parse(savedOrder) } : emptyOrderDraft;
    const requestedBag = searchParams.get("bag");
    const requestedQuantity = searchParams.get("quantity");

    if (!nextOrder.build && requestedBag && getBagBySlug(requestedBag)) {
      nextOrder.bagSlug = requestedBag;
    }

    if (requestedQuantity) {
      const parsedQuantity = Number.parseInt(requestedQuantity, 10);
      if (Number.isFinite(parsedQuantity)) {
        nextOrder.quantity = parsedQuantity;
      }
    }

    setOrder(nextOrder);
    setIsHydrated(true);
  }, [searchParams]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(ORDER_DRAFT_STORAGE_KEY, JSON.stringify(order));
  }, [isHydrated, order]);

  const { bag, shippingOption, shippingSavings, unitPrice, total } = useMemo(() => getCheckoutAmounts(order), [order]);
  const [signoff, setSignoff] = useSignoff(order.build ?? null);
  const signed = order.build ? isSignedOff(signoff, order.build) : false;
  const isOrderReady = Boolean(bag && order.quantity && total && signed);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (!isOrderReady) {
              return;
            }
            setSignoff({ ...signoff, signedAt: new Date().toISOString() });

            window.localStorage.setItem(ORDER_DRAFT_STORAGE_KEY, JSON.stringify(order));
            window.localStorage.setItem(
              LAST_ORDER_STORAGE_KEY,
              JSON.stringify({
                ...order,
                total,
              }),
            );
            router.push("/order-confirmation");
          }}
        >
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-charcoal">Checkout</h1>
          {order.build ? <BuildSpecCard build={order.build} /> : null}
          {order.build ? <SignOffSection build={order.build} state={signoff} onChange={setSignoff} /> : null}

          <CheckoutSection title="Contact">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
              <Field label="Phone (optional)">
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
            </div>
          </CheckoutSection>

          <CheckoutSection title="Shipping / Delivery">
            <p className="text-sm leading-6 text-charcoal/70">
              We ship to one US address per order. Need multiple locations?{" "}
              <Link href="/contact" className="font-semibold text-blue hover:text-charcoal">
                Contact us.
              </Link>
            </p>
            <div className="mt-6 grid gap-4">
              {Object.values(shippingOptions).map((option) => {
                const isSelected = order.shippingMethod === option.id;

                return (
                  <label
                    key={option.id}
                    className={`cursor-pointer rounded-[1.75rem] border p-5 ${
                      isSelected ? "border-charcoal bg-bone" : "border-charcoal/10 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={isSelected}
                        onChange={() => setOrder((current) => ({ ...current, shippingMethod: option.id }))}
                        className="mt-1 h-4 w-4 border-charcoal text-charcoal focus:ring-charcoal"
                      />
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold text-charcoal">{option.label}</p>
                          {option.id === "standard" ? (
                            <span className="font-accent rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/70">
                              Default
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm leading-6 text-charcoal/70">{option.description}</p>
                        {option.id === "economy" && order.quantity ? (
                          <p className="text-sm font-semibold text-charcoal">
                            At {order.quantity.toLocaleString()} units, that&apos;s {formatCurrency(shippingSavings)} savings with a longer wait.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Full name">
                <input
                  required
                  value={formState.fullName}
                  onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
              <Field label="Company">
                <input
                  required
                  value={formState.company}
                  onChange={(event) => setFormState((current) => ({ ...current, company: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
              <Field label="Address line 1" className="md:col-span-2">
                <input
                  required
                  value={formState.address1}
                  onChange={(event) => setFormState((current) => ({ ...current, address1: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
              <Field label="Address line 2 (optional)" className="md:col-span-2">
                <input
                  value={formState.address2}
                  onChange={(event) => setFormState((current) => ({ ...current, address2: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
              <Field label="City">
                <input
                  required
                  value={formState.city}
                  onChange={(event) => setFormState((current) => ({ ...current, city: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
              <Field label="State">
                <input
                  required
                  value={formState.state}
                  onChange={(event) => setFormState((current) => ({ ...current, state: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm uppercase outline-none focus:border-blue"
                />
              </Field>
              <Field label="ZIP">
                <input
                  required
                  value={formState.zip}
                  onChange={(event) => setFormState((current) => ({ ...current, zip: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
            </div>
          </CheckoutSection>

          <CheckoutSection title="Payment">
            {!signed ? (
              <p className="mb-5 rounded-2xl bg-light-bone px-4 py-3 text-sm font-semibold text-charcoal" role="status">
                Locked: initial every area and sign the agreement above to pay.
              </p>
            ) : null}
            <fieldset disabled={!signed} className={`space-y-5 border-0 p-0 ${signed ? "" : "opacity-50"}`}>
              <Field label="Card number">
                <input
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={formState.cardNumber}
                  onChange={(event) => setFormState((current) => ({ ...current, cardNumber: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm text-charcoal outline-none focus:border-blue"
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Expiry">
                  <input
                    required
                    placeholder="MM / YY"
                    value={formState.expiry}
                    onChange={(event) => setFormState((current) => ({ ...current, expiry: event.target.value }))}
                    className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                  />
                </Field>
                <Field label="CVC">
                  <input
                    required
                    inputMode="numeric"
                    placeholder="CVC"
                    value={formState.cvc}
                    onChange={(event) => setFormState((current) => ({ ...current, cvc: event.target.value }))}
                    className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                  />
                </Field>
              </div>
              <Field label="Name on card">
                <input
                  required
                  value={formState.nameOnCard}
                  onChange={(event) => setFormState((current) => ({ ...current, nameOnCard: event.target.value }))}
                  className="w-full rounded-2xl border border-charcoal/15 bg-light-bone px-4 py-3 text-sm outline-none focus:border-blue"
                />
              </Field>
              <p className="text-sm text-charcoal/70">🔒 Secured by Stripe</p>
            </fieldset>
          </CheckoutSection>

          <button
            type="submit"
            disabled={!isOrderReady}
            className="inline-flex w-full items-center justify-center rounded-full bg-blue px-6 py-4 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-charcoal/20 disabled:text-charcoal/70 disabled:hover:translate-y-0"
          >
            Place Order — {total ? formatCurrency(total) : "$0.00"}
          </button>
        </form>

        <div className="lg:sticky lg:top-28 lg:mt-[4.75rem]">
          <OrderSummaryCard
            bagName={bag?.name}
            quantity={order.quantity}
            unitPrice={unitPrice}
            total={total}
            showCheckoutBreakdown
            shippingLabel={shippingOption.label}
          />
        </div>
      </div>
    </div>
  );
}

function CheckoutSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-2 text-sm font-medium text-charcoal ${className}`.trim()}>
      <span>{label}</span>
      {children}
    </label>
  );
}
