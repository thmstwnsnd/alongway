"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PortalLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/portal/dashboard");
      }}
    >
      <label className="block space-y-2">
        <span className="text-sm font-medium text-charcoal">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-charcoal/10 bg-light-bone px-4 py-3 text-sm text-charcoal outline-none focus:border-blue focus:bg-white"
          placeholder="alex@brand.com"
          required
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-charcoal">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-charcoal/10 bg-light-bone px-4 py-3 text-sm text-charcoal outline-none focus:border-blue focus:bg-white"
          placeholder="Enter your password"
          required
        />
      </label>
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
      >
        Sign in
      </button>
    </form>
  );
}
