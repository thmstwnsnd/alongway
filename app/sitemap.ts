import type { MetadataRoute } from "next";

import { bags } from "@/data/bags";
import { blogPosts } from "@/data/blog-posts";
import { fabrics } from "@/data/fabrics";
import { site } from "@/lib/site";

const staticRoutes = [
  "",
  "/collection",
  "/collection/custom",
  "/pricing",
  "/how-it-works",
  "/swatches",
  "/about",
  "/blog",
  "/contact",
  "/start",
  "/quiz",
  "/store",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => ({ url: `${site.url}${path}` });
  return [
    ...staticRoutes.map(url),
    ...bags.map((bag) => url(`/collection/${bag.slug}`)),
    ...fabrics.map((fabric) => url(`/swatches/${fabric.slug}`)),
    ...blogPosts.map((post) => url(`/blog/${post.slug}`)),
  ];
}
