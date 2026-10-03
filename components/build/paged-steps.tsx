import { useState, type ReactNode } from "react";

/** One brand color per step, in order: Color, Canvas, Carry, Threads, Pockets, Artwork, Labels. */
const stepColors = ["#364FA0", "#B85C1E", "#3A7D44", "#7B4FA0", "#B8433B", "#2F7F86", "#A84D80"];

export type PagedStep = { id: string; title: string; hint?: string; summary: string; content: ReactNode };

/**
 * One step per page. Progress bar on top, a roomy body, Back / Confirm below.
 * After the last step it shows a summary of every choice, each with an Edit link.
 */
export function PagedSteps({
  steps,
  openStep,
  doneSteps,
  onSelect,
  onNext,
  onBack,
}: {
  steps: PagedStep[];
  openStep: string | null;
  doneSteps: string[];
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const allDone = steps.every((s) => doneSteps.includes(s.id));
  const found = steps.findIndex((s) => s.id === openStep);
  const index = found >= 0 ? found : allDone ? -1 : 0;
  const current = index >= 0 ? steps[index] : null;
  const [touched, setTouched] = useState<string[]>([]);
  const picked = current ? touched.includes(current.id) || doneSteps.includes(current.id) : false;

  return (
    <div className="flex h-full flex-col">
      {/* progress */}
      <div className="flex gap-1.5" role="tablist" aria-label="Build steps">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${s.title}${doneSteps.includes(s.id) ? " (confirmed)" : ""}`}
            onClick={() => onSelect(s.id)}
            style={i === index || doneSteps.includes(s.id) ? { backgroundColor: stepColors[i % stepColors.length]} : undefined}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i === index || doneSteps.includes(s.id) ? "" : "bg-black/10 hover:bg-black/20"}`}
          />
        ))}
      </div>

      {current ? (
        <>
          <div className="-mx-2 mt-4 min-h-0 flex-1 overflow-y-auto px-2 py-1 lg:mt-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black/70">
              Step {index + 1} of {steps.length}
            </p>
            <h2 className="mt-2 text-[26px] font-semibold leading-none tracking-[-0.02em] lg:text-[34px]" style={{ color: stepColors[index % stepColors.length] }}>{current.title}</h2>
            {current.hint ? <p className="mt-2 text-[14px] text-black/70">{current.hint}</p> : null}
            <div
              className="mt-4 lg:mt-6"
              onClickCapture={() => setTouched((t) => (t.includes(current.id) ? t : [...t, current.id]))}
            >
              {current.content}
            </div>
          </div>
          <div className="mt-3 flex flex-shrink-0 items-center justify-between border-t border-black/[0.06] pt-3 lg:mt-6 lg:pt-5">
            <button
              type="button"
              onClick={onBack}
              disabled={index <= 0}
              className="rounded-full px-5 py-2.5 text-[15px] font-semibold text-charcoal transition hover:bg-black/[0.05] lg:py-3 disabled:invisible"
            >
              Back
            </button>
            <button type="button" onClick={onNext} className={`rounded-full px-10 py-3.5 text-[18px] font-semibold transition lg:py-4 ${picked ? "bg-blue text-white shadow-card hover:-translate-y-0.5" : "bg-black/10 text-black/55 hover:bg-black/15"}`}>
              {index === steps.length - 1 ? "Done ✓" : "Confirm & next →"}
            </button>
          </div>
        </>
      ) : (
        <div className="mt-8 min-h-0 flex-1 overflow-y-auto">
          <h2 className="text-[34px] font-semibold leading-none tracking-[-0.02em] text-blue">Your bag</h2>
          <p className="mt-3 text-[15px] text-black/70">Everything is confirmed. Set your quantity below, then Continue.</p>
          <ul className="mt-8 divide-y divide-black/[0.06] border-y border-black/[0.06]">
            {steps.map((s) => (
              <li key={s.id} className="flex items-center gap-4 py-4">
                <span className="w-24 flex-shrink-0 text-[15px] font-semibold text-charcoal">{s.title}</span>
                <span className="min-w-0 flex-1 truncate text-[15px] text-black/70">{s.summary}</span>
                <button type="button" onClick={() => onSelect(s.id)} className="flex-shrink-0 text-[14px] font-semibold text-blue hover:text-charcoal">
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
