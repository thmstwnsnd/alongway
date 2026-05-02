export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow ? (
        <p className="font-accent text-sm font-semibold uppercase tracking-[0.2em] text-light-blue">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">{title}</h2>
      {body ? <p className="text-base leading-7 text-charcoal/75 sm:text-lg">{body}</p> : null}
    </div>
  );
}
