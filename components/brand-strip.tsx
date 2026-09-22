import Image from "next/image";

import { brands } from "@/data/brands";

/**
 * Clean logo row on white. Logos render in one dark tint so mixed files read
 * as a set; brands without a file show their name as a plain wordmark.
 */
export function BrandStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 lg:gap-x-20">
      {brands.map((brand) =>
        brand.logo ? (
          <Image
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            width={180}
            height={brand.height ?? 28}
            className="w-auto opacity-70 transition hover:opacity-100"
            style={{ height: brand.height ?? 28, filter: "brightness(0) saturate(100%) invert(15%)" }}
          />
        ) : (
          <span key={brand.name} className="font-display text-base font-bold uppercase tracking-[0.12em] text-charcoal/60">
            {brand.name}
          </span>
        ),
      )}
    </div>
  );
}
