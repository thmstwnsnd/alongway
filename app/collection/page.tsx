import { BagCard } from "@/components/bag-card";
import { SectionHeading } from "@/components/section-heading";
import { bags } from "@/data/bags";

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="Collection"
        title="Ten silhouettes, each designed to earn a longer life."
        body="Every style is ready for standard customization, clear pricing, and repeatable production. Starting prices reflect our core package and give you a clean baseline before quantity discounts."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {bags.map((bag) => (
          <BagCard key={bag.slug} bag={bag} />
        ))}
      </div>
    </div>
  );
}
