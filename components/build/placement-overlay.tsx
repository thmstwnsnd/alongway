"use client";

import { placementBoxes, placementLabel } from "@/data/placements";

/** Draws the chosen logo and art zones on top of the bag photo. Sits inside the photo's aspect-ratio box. */
export function PlacementOverlay({ logoIds, artIds }: { logoIds: string[]; artIds: string[] }) {
  const items = [
    ...logoIds.map((id) => ({ id, kind: "LOGO", color: "#364FA0" })),
    ...artIds.filter((a) => !logoIds.includes(a)).map((id) => ({ id, kind: "ART", color: "#3A7D44" })),
  ];
    const hidden = items.filter((i) => !placementBoxes[i.id]);
  return (
    <div className="pointer-events-none absolute inset-0">
      {items.map((i) => {
        const b = placementBoxes[i.id];
        if (!b) return null;
        return (
          <div
            key={i.id}
            className="absolute flex items-center justify-center rounded-sm border-2 border-dashed text-center text-[11px] font-bold tracking-wide transition-all duration-300"
            style={{ left: `${b.l}%`, top: `${b.t}%`, width: `${b.w}%`, height: `${b.h}%`, borderColor: i.color, boxShadow: "0 0 0 2px rgba(255,255,255,0.95), inset 0 0 0 2px rgba(255,255,255,0.95)", background: "rgba(255,255,255,0.28)" }}
          >
            <span className="rounded-full px-2 py-0.5 text-white shadow" style={{ background: i.color }}>
              {i.kind === "LOGO" && artIds.includes(i.id) ? "LOGO + ART" : i.kind}
            </span>
          </div>
        );
      })}
      {hidden.length > 0 && (
        <div className="absolute inset-x-0 bottom-1 flex flex-wrap justify-center gap-1">
          {hidden.map((i) => (
            <span key={i.id} className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: i.color }}>
              {i.kind} on the {placementLabel(i.id).toLowerCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
