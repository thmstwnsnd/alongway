"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollBird() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 as section scrolls through view

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when bottom of section is at bottom of viewport, 1 when top exits top
      const total = viewH + el.offsetHeight;
      const elapsed = viewH - rect.top;
      setProgress(Math.max(0, Math.min(1, elapsed / total)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bird flies from left off-screen (-12%) to right off-screen (105%) across the section
  const xPct = -12 + progress * 117;

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden border-y border-charcoal/8 py-10"
      aria-hidden="true"
    >
      {/* Right-aligned bird when flying right, mirrored (left-aligned) when flying left */}
      <img
        src="/bird-right.svg"
        alt=""
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: "50%",
          left: `${xPct}%`,
          transform: "translateY(-50%)",
          width: "72px",
          height: "auto",
          opacity: 0.85,
          transition: "left 0.05s linear",
        }}
      />
      {/* Thin decorative tagline centered */}
      <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-charcoal/30">
        Made to carry.
      </p>
    </div>
  );
}
