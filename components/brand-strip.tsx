import Image from "next/image";

import { brands } from "@/data/brands";

/** Logo row. Logos are tinted to one color so mixed files read as a set; names fall back to pills. */
export function BrandStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {brands.map((brand) =>
        brand.logo ? (
          <Image
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            width={160}
            height={brand.height ?? 32}
            className="w-auto opacity-80 brightness-0 contrast-100 transition hover:opacity-100"
            style={{ height: brand.height ?? 32, filter: "brightness(0) saturate(100%) invert(12%)" }}
          />
        ) : (
          <span key={brand.name} className="rounded-full bg-light-bone px-4 py-2 text-sm font-semibold text-charcoal">
            {brand.name}
          </span>
        ),
      )}
    </div>
  );
}
