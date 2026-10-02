import type { Metadata } from "next";
import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { CollectionGrid } from "@/components/collection-grid";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Fourteen curated tote and bag silhouettes, each fully customizable with your fabric, color, print, and woven label.",
};


export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <SectionHeading level={1}
          eyebrow="Collection"
          title="Twelve silhouettes, each designed to earn a longer life."
          body="Every style is ready for standard customization, clear pricing, and repeatable production. Starting prices reflect our core package and give you a clean baseline before quantity discounts."
        />
        <Image
          src="/svg/illustrations/Alongway_Website_Graphic_BirdTote_Blue.svg"
          alt=""
          width={120}
          height={120}
          className="pointer-events-none h-auto w-16 select-none opacity-70"
          aria-hidden="true"
        />
      </div>
      <CollectionGrid />
    </div>
  );
}
