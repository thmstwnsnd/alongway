import Image from "next/image";

import { brands } from "@/data/brands";

/** Logo row. A brand with a logo file shows it inside a white tile; otherwise its name in its brand colors. */
export function BrandStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {brands.map((brand) =>
        brand.logo ? (
          <span key={brand.name} className="inline-flex h-14 items-center rounded-full bg-white px-6" style={{ backgroundColor: brand.bg ?? "#FFFFFF" }}>
            <Image src={brand.logo} alt={brand.name} width={160} height={brand.height ?? 28} className="w-auto" style={{ height: brand.height ?? 28 }} />
          </span>
        ) : (
          <span
            key={brand.name}
            className="rounded-full bg-light-bone px-5 py-2.5 text-sm font-semibold text-charcoal"
            style={brand.bg ? { backgroundColor: brand.bg, color: brand.fg ?? "#FFFFFF" } : undefined}
          >
            {brand.name}
          </span>
        ),
      )}
    </div>
  );
}
