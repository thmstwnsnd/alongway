"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { OrderSummaryCard } from "@/components/order-summary-card";
import { getBagBySlug } from "@/data/bags";
import {
  LAST_ORDER_STORAGE_KEY,
  ORDER_DRAFT_STORAGE_KEY,
  emptyOrderDraft,
  formatCurrency,
  getOrderAmounts,
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

    if (requestedBag && getBagBySlug(requestedBag)) {
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

  const { bag, unitPrice, total } = useMemo(() => getOrderAmounts(order), [order]);
  const isOrderReady = Boolean(bag && order.quantity && total);

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
            <p className="text-sm leading-6 text-charcoal/62">
              We ship to one US address per order. Need multiple locations?{" "}
              <Link href="/start" className="font-semibold text-blue hover:text-charcoal">
                Contact us.
              </Link>
            </p>
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
            <div className="space-y-5">
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
              <p className="text-sm text-charcoal/50">🔒 Secured by Stripe</p>
            </div>
          </CheckoutSection>

          <button
            type="submit"
            disabled={!isOrderReady}
            className="inline-flex w-full items-center justify-center rounded-full bg-orange px-6 py-4 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-charcoal/20 disabled:text-charcoal/45 disabled:hover:translate-y-0"
          >
            Place Order — {total ? formatCurrency(total) : "$0.00"}
          </button>
        </form>

        <div className="lg:sticky lg:top-28">
          <OrderSummaryCard
            bagName={bag?.name}
            quantity={order.quantity}
            unitPrice={unitPrice}
            total={total}
            showCheckoutBreakdown
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
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
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
