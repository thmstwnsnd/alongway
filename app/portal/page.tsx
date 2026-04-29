import Link from "next/link";

import { PortalLoginForm } from "@/components/portal-login-form";

export default function PortalLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center py-8">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="rounded-[2.25rem] border border-charcoal/10 bg-white p-8 shadow-card sm:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-kelly">Alongway Customer Portal</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-charcoal">Welcome back.</h1>
            <p className="text-base leading-7 text-charcoal/68">
              Sign in to check order progress, review past production details, and place your next order faster.
            </p>
          </div>
          <div className="mt-8">
            <PortalLoginForm />
          </div>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link href="#" className="font-medium text-blue hover:text-charcoal">
              Forgot your password?
            </Link>
            <p className="leading-6 text-charcoal/62">
              New customer? Your account is created automatically when you place your first order.
            </p>
          </div>
        </section>
        <aside className="rounded-[2.5rem] border border-charcoal/10 bg-charcoal p-8 text-bone shadow-card sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-kelly">Inside your portal</p>
          <div className="mt-6 space-y-5">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-bone/55">Track production</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">See every milestone from approval through delivery.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-bone/55">Reorder quickly</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">Jump back into proven styles without hunting down old specs.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-bone/55">Account control</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">Keep contact info and shipping details in one place.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
