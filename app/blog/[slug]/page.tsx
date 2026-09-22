import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Alongway`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
      <div className="rounded-[2.5rem] border border-charcoal/10 bg-white p-8 shadow-card sm:p-12">
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">{post.category}</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-charcoal/55">{post.date}</p>

        <div className="mt-10 space-y-6 text-lg leading-8 text-charcoal/78">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{renderParagraph(paragraph)}</p>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-light-bone p-6">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/55">Ready when you are</p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-charcoal/72">
            Tell us what you want to make and we&apos;ll turn it into a real bag program, not a merch afterthought.
          </p>
          <Link
            href={post.ctaHref}
            className="mt-5 inline-flex rounded-full bg-blue px-5 py-3 text-sm font-semibold text-white hover:bg-charcoal"
          >
            {post.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

function renderParagraph(paragraph: string) {
  if (paragraph.includes("[Build your bag](/build)")) {
    const [before, after] = paragraph.split("[Build your bag](/build)");

    return (
      <>
        {before}
        <Link href="/build" className="font-semibold text-light-blue hover:text-charcoal">
          Build your bag
        </Link>
        {after}
      </>
    );
  }

  if (paragraph.includes("[See the collection](/collection/channel-tote-small)")) {
    const [before, after] = paragraph.split("[See the collection](/collection/channel-tote-small)");

    return (
      <>
        {before}
        <Link href="/collection/channel-tote-small" className="font-semibold text-light-blue hover:text-charcoal">
          See the collection
        </Link>
        {after}
      </>
    );
  }

  return paragraph;
}
