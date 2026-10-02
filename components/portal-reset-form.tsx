"use client";

import Link from "next/link";
import { useState } from "react";

const inputClass =
  "w-full rounded-2xl border border-charcoal/10 bg-light-bone px-4 py-3 text-sm text-charcoal outline-none focus:border-blue focus:bg-white";
const buttonClass =
  "flex w-full items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal disabled:opacity-60";

export function PortalResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-4">
        <p role="status" className="text-base leading-7 text-charcoal/70">
          Your password has been updated.
        </p>
        <Link href="/portal" className="font-semibold text-blue underline underline-offset-2">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-charcoal">New password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={busy} className={buttonClass}>
        {busy ? "One moment..." : "Set new password"}
      </button>
    </form>
  );
}
