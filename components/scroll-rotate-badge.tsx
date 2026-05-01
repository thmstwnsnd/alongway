"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";

/**
 * Renders the Smiley Face Badge image and rotates it clockwise as the user scrolls.
 * The badge rotates from 0° to 360° over the full scroll range of the page.
 */
export function ScrollRotateBadge() {
  const [rotation, setRotation] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when element top hits the bottom of viewport, 1 when element bottom leaves the top
      const total = viewH + el.offsetHeight;
      const elapsed = viewH - rect.top;
      const progress = Math.max(0, Math.min(1, elapsed / total));
      setRotation(progress * 360);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="self-start" style={{ transform: `rotate(${rotation}deg)` }}>
      <Image
        src="/svg/illustrations/Alongway_Website_Graphic_SmileyFaceBadge_Blue.svg"
        alt=""
        width={130}
        height={130}
        className="pointer-events-none h-auto w-[104px] select-none opacity-85"
        aria-hidden="true"
      />
    </div>
  );
}
