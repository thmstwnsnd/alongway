import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getLifestyleImageUrl } from "@/data/bags";
import { site } from "@/lib/site";

const values = [
  "Curated silhouettes",
  "All-in pricing",
  "Factory-direct quality",
  "Built to be kept",
  "Brand feel",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionHeading
        eyebrow="About"
        title="We built Alongway because good bags should not require a sourcing director."
        body="Alongway is for brands that want custom bags to feel premium, clear, and manageable. The line stays intentionally tight so every silhouette can do more work, hold better shape, and support repeat orders without friction."
      />
      <Image
        src="/svg/illustrations/Alongway_Website_Graphic_WorldCropped_Blue.svg"
        alt=""
        width={1134}
        height={809}
        className="pointer-events-none mx-auto mt-8 h-auto w-32 select-none opacity-60"
        aria-hidden="true"
      />

      <section className="mt-14 mb-14 space-y-5">
        <h2 className="font-display text-2xl font-bold tracking-tight">The team</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          <TeamMember
            image={getLifestyleImageUrl(1)}
            name="Easton Jones"
            role="Co-founder"
            bio="Easton has spent years in the custom goods and design world, working with brands from scrappy startups to household names. He built Alongway because sourcing bags shouldn't require a procurement team."
          />
          <TeamMember
            image={getLifestyleImageUrl(2)}
            name="Hana Jones"
            role="Co-founder"
            bio="Hana brings a sharp engineering and systems mind to Alongway — building the infrastructure that makes the whole operation run cleanly. LA-based, detail-obsessed."
          />
          <TeamMember
            image={getLifestyleImageUrl(3)}
            name="Josh Geduld"
            role="Designer"
            bio="Josh shapes the Alongway visual identity — from the brand system to the look and feel of every touchpoint. He makes sure the brand is as considered as the product."
          />
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-charcoal/10 bg-white p-8 shadow-card">
          <h2 className="font-display text-3xl font-bold tracking-tight">What sets us apart</h2>
          <div className="mt-6 grid gap-3">
            {values.map((value) => (
              <div
                key={value}
                className="rounded-full border border-charcoal/10 bg-light-bone px-4 py-3 text-sm font-semibold"
              >
                {value}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-charcoal/10 bg-bone p-8">
          <p className="font-accent text-sm font-semibold uppercase tracking-[0.22em] text-light-blue">Contact</p>
          <p className="mt-5 text-3xl font-extrabold tracking-tight">{site.email}</p>
          <p className="mt-4 text-base leading-7 text-charcoal/72">
            Reach out when you&apos;re ready to launch a new bag, restock a proven style, or get a fast read on fit and pricing.
          </p>
          <div className="mt-8 border-t border-charcoal/10 pt-6">
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/40">A brand by</p>
            <a
              href="https://orangegoods.co"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-light-blue"
            >
              Orange Goods <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg" alt="" width={115} height={79} className="inline-block h-4 w-auto ml-1" aria-hidden="true" />
            </a>
            <p className="mt-1 text-xs text-charcoal/50">Custom branded goods &amp; design studio, Los Angeles.</p>
          </div>
        </article>
      </section>
    </div>
  );
}

function TeamMember({ image, name, role, bio }: { image: string; name: string; role: string; bio: string }) {
  return (
    <div className="rounded-[2rem] border border-charcoal/10 bg-white p-7 shadow-card space-y-4">
      <img src={image} alt={name} className="h-20 w-20 rounded-full object-cover shadow-card ring-4 ring-bone" />
      <div>
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.18em] text-light-blue">{role}</p>
        <h3 className="font-display mt-1 text-xl font-bold tracking-tight">{name}</h3>
      </div>
      <p className="text-sm leading-7 text-charcoal/70">{bio}</p>
    </div>
  );
}
