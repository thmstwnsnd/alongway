"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-2xl border border-charcoal/10 bg-light-bone px-4 py-3 text-sm text-charcoal outline-none focus:border-blue focus:bg-white";
const buttonClass =
  "flex w-full items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal disabled:opacity-60";

export function PortalForgotForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    setBusy(false);
    setSent(true);
  }

  if (sent) {
    return (
      <p role="status" className="text-base leading-7 text-charcoal/70">
        If an account exists for that email, we just sent a link to reset your password. It expires in 1 hour.
      </p>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-charcoal">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
          placeholder="alex@brand.com"
          autoComplete="email"
          required
        />
      </label>
      <button type="submit" disabled={busy} className={buttonClass}>
        {busy ? "One moment..." : "Send reset link"}
      </button>
    </form>
  );
}
