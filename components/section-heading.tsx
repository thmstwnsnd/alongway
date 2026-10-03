export function SectionHeading({
  eyebrow,
  title,
  body,
  level = 2,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow ? (
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-blue">{eyebrow}</p>
      ) : null}
      <Heading className={`font-display font-extrabold tracking-tight text-charcoal ${level === 1 ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}>{title}</Heading>
      {body ? <p className="text-base leading-7 text-charcoal/75 sm:text-lg">{body}</p> : null}
    </div>
  );
}
