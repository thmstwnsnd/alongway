import Link from "next/link";

const categories = ["Behind the Brand", "Style Guide", "How We Make It", "Client Stories"] as const;

const posts = [
  {
    title: "How to Build a Merch Tote People Actually Keep",
    excerpt:
      "The best custom bags do more than carry a logo. They fit into daily routines, hold up over time, and give your brand a longer life after the event ends.",
    category: categories[0],
    date: "April 21, 2026",
  },
  {
    title: "Choosing the Right Bag Shape for Retail, Events, and Gifting",
    excerpt:
      "A flat tote, a gusseted carryall, and a structured market bag each signal something different. Matching the shape to the use case is usually the difference between nice and memorable.",
    category: categories[1],
    date: "April 16, 2026",
  },
  {
    title: "What Changes When You Move from Promo Bags to Product-Led Merch",
    excerpt:
      "Material, proportions, and finishing details matter more when the bag needs to feel like part of the brand. A tighter assortment usually creates a stronger program than an oversized catalog.",
    category: categories[2],
    date: "April 9, 2026",
  },
  {
    title: "Inside a Hospitality Launch: Designing a Tote Guests Reused All Season",
    excerpt:
      "One of our client teams needed a bag that felt premium without drifting into novelty. The final silhouette worked because it supported the stay, not just the photos.",
    category: categories[3],
    date: "April 2, 2026",
  },
  {
    title: "The Case for Fewer SKUs and Better Reorders",
    excerpt:
      "When the line is focused, operations get simpler and the product gets stronger. Reorders move faster because the bag has already proven it belongs in the mix.",
    category: categories[0],
    date: "March 24, 2026",
  },
  {
    title: "Why Material Choice Sets the Tone Before Anyone Reads the Tag",
    excerpt:
      "Tyvek, polypropylene, canvas, and waxed finishes each create a different first impression. The material is often doing as much brand work as the print itself.",
    category: categories[1],
    date: "March 11, 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange">Blog</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-charcoal sm:text-6xl">From the Field</h1>
        <p className="mt-5 text-lg leading-8 text-charcoal/72">
          Stories, tips, and ideas from the Alongway team.
        </p>
      </section>

      <section className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-[1.75rem] border border-charcoal/10 bg-white shadow-card"
          >
            <img
              src="https://placehold.co/800x450/364FA0/EEE6D2?text=Blog+Post"
              alt={post.title}
              className="aspect-[16/9] w-full border-b border-charcoal/10 object-cover"
            />
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-light-bone px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                  {post.category}
                </span>
                <time className="text-sm text-charcoal/55">{post.date}</time>
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-charcoal">{post.title}</h2>
                <p className="text-sm leading-6 text-charcoal/72">{post.excerpt}</p>
              </div>
              <Link href="#" className="inline-flex text-sm font-semibold text-orange hover:text-charcoal">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
