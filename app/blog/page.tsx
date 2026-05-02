import Image from "next/image";
import Link from "next/link";

import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <section className="max-w-3xl">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Blog</p>
        <h1 className="font-display mt-4 text-5xl font-extrabold tracking-tight text-charcoal sm:text-6xl">From the Field</h1>
        <p className="mt-5 text-lg leading-8 text-charcoal/72">
          Stories, tips, and ideas from the Alongway team.
        </p>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white shadow-card"
          >
            <img
              src="https://placehold.co/800x450/364FA0/EEE6D2?text=Blog+Post"
              alt={post.title}
              className="aspect-[16/9] w-full border-b border-charcoal/10 object-cover"
            />
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-accent rounded-full bg-light-bone px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                  {post.category}
                </span>
                <time className="text-sm text-charcoal/55">{post.date}</time>
              </div>
              <div className="space-y-3">
                <h2 className="font-display text-2xl font-bold tracking-tight text-charcoal">{post.title}</h2>
                <p className="text-sm leading-6 text-charcoal/72">{post.excerpt}</p>
              </div>
              <Link href={`/blog/${post.slug}`} className="inline-flex text-sm font-semibold text-light-blue hover:text-charcoal">
                Read more <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg" alt="" width={115} height={79} className="inline-block h-4 w-auto ml-1" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
