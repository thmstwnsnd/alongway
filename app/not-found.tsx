import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-24 lg:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-kelly">Not found</p>
      <h1 className="text-5xl font-extrabold tracking-tight text-charcoal">That bag is not on the shelf.</h1>
      <p className="text-lg leading-8 text-charcoal/72">
        Head back to the collection to browse the current Alongway silhouettes.
      </p>
      <Link
        href="/collection"
        className="inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white hover:bg-blue"
      >
        Back to collection
      </Link>
    </div>
  );
}
