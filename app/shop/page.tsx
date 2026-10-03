import { redirect } from "next/navigation";

import { getCatalogStyle } from "@/data/catalog";

// The old order form is retired: every order now goes through the builder, so the
// build sheet, initial-and-sign and payment steps are the same for everyone.
export default async function Page({ searchParams }: { searchParams: Promise<{ bag?: string }> }) {
  const { bag } = await searchParams;
  redirect(bag && getCatalogStyle(bag) ? `/build?style=${bag}` : "/build");
}
