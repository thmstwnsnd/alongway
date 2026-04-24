export default function PortalAccountPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">Account</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">Account settings.</h1>
        <p className="max-w-3xl text-base leading-7 text-charcoal/66">
          This is a UI-only placeholder for profile, shipping, and password controls until the real account system is wired in.
        </p>
      </section>

      <div className="grid gap-8">
        <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">Profile</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <AccountField label="Name" defaultValue="Alex Carter" />
            <AccountField label="Email" defaultValue="alex@brand.com" type="email" />
            <AccountField label="Company" defaultValue="North Coast Studio" />
            <AccountField label="Phone" defaultValue="(415) 555-0186" type="tel" />
          </div>
          <button
            type="button"
            className="mt-6 inline-flex rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white shadow-card hover:-translate-y-0.5 hover:bg-charcoal"
          >
            Save changes
          </button>
        </section>

        <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">Shipping address</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <AccountField label="Address line 1" defaultValue="470 Valencia Street" />
            <AccountField label="Address line 2" defaultValue="Suite 204" />
            <AccountField label="City" defaultValue="San Francisco" />
            <AccountField label="State" defaultValue="CA" />
            <AccountField label="Postal code" defaultValue="94103" />
            <AccountField label="Country" defaultValue="United States" />
          </div>
        </section>

        <section className="rounded-[2rem] border border-charcoal/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">Password change</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <AccountField label="Current password" defaultValue="" type="password" />
            <AccountField label="New password" defaultValue="" type="password" />
            <AccountField label="Confirm password" defaultValue="" type="password" />
          </div>
        </section>
      </div>

      <a href="#" className="inline-flex text-sm text-charcoal/45 hover:text-orange">
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
