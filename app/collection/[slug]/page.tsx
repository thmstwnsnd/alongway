import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { bags, getBagBySlug } from "@/data/bags";
import { BagDetail } from "@/components/bag-detail";

export function generateStaticParams() {
  return bags.map((bag) => ({ slug: bag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bag = getBagBySlug(slug);
  if (!bag) return { title: "Bag not found | Alongway" };
  return {
    title: `${bag.name} | Alongway`,
    description: bag.tagline,
  };
}

export default async function BagDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bag = getBagBySlug(slug);
  if (!bag) notFound();
  return <BagDetail bag={bag} />;
}
