import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    icon: "👜",
    title: "Pick your bag",
    description:
      "Choose from a focused set of silhouettes built to cover gifting, retail, hospitality, and everyday carry without overcomplicating the decision.",
  },
  {
    icon: "🎨",
    title: "Share your artwork",
    description:
      "Send existing files or a rough direction. We can work from production-ready art or help clarify how your brand should show up on the bag.",
  },
  {
    icon: "🏭",
    title: "We handle production",
    description:
      "Alongway manages setup, manufacturing, and the details that usually slow custom bag projects down. You stay informed without having to source every step.",
  },
  {
    icon: "📦",
    title: "Delivered to your door",
    description:
      "Your order ships to one US address with clear all-in pricing, so the final handoff feels as straightforward as the kickoff.",
  },
];

const faqs = [
  {
    question: "What is the minimum order quantity?",
    answer: "Our standard MOQ is 50 units per style.",
  },
  {
    question: "What turnaround should I expect?",
    answer: "Most projects move from approval to delivery in a few weeks depending on quantity, bag style, and seasonality.",
  },
  {
    question: "What artwork formats do you accept?",
    answer: "Vector files are ideal, but we can also review high-resolution PDFs or image files and advise on next steps.",
  },
  {
    question: "What customization is included?",
    answer: "Standard customization is included in starting pricing and covers the core production setup for clean branded applications.",
  },
  {
    question: "How does payment work?",
    answer: "All orders are paid in full at checkout. We accept all major credit cards via Stripe.",
  },
  {
    question: "What happens after I pay?",
    answer: "You&apos;re not done — you&apos;re just starting. Within 24 hours we send a techpack showing your bag with artwork placement guides. Nothing goes to production until you approve the design.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Not currently. All orders are paid in full upfront.",
  },
  {
    question: "Can I reorder later?",
    answer: "Yes. Reorders are built to be simple once your bag style and artwork are approved.",
  },
  {
    question: "Do you help if artwork is not ready?",
    answer: "Yes. You can still start the process and we&apos;ll help shape what needs to happen before production begins.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="How it works"
        title="A premium process without the usual sourcing drag."
        body="Built for teams that want clear decisions, clean pricing, and bags worth keeping."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <span className="text-4xl">{step.icon}</span>
              <span className="rounded-full bg-light-bone px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">
                Step {index + 1}
              </span>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">{step.title}</h2>
            <p className="mt-3 text-base leading-7 text-charcoal/72">{step.description}</p>
          </article>
        ))}
      </div>

      <section className="mt-20">
        <SectionHeading eyebrow="FAQ" title="Common questions, answered clearly." />
        <div className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-[1.5rem] border border-charcoal/10 bg-light-bone p-6">
              <h3 className="text-xl font-bold tracking-tight">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/72">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
