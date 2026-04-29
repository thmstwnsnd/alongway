import { SectionHeading } from "@/components/section-heading";
import { CollectionGrid } from "@/components/collection-grid";

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Collection"
        title="Twelve silhouettes, each designed to earn a longer life."
        body="Every style is ready for standard customization, clear pricing, and repeatable production. Starting prices reflect our core package and give you a clean baseline before quantity discounts."
      />
      <CollectionGrid />
    </div>
  );
}
