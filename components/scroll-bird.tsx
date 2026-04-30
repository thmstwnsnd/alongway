"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollBird() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Smoothed progress value (lerped)
  const rawProgress = useRef(0);
  const smoothProgress = useRef(0);
  const rafId = useRef<number>(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    function getScrollProgress() {
      const el = sectionRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = viewH + el.offsetHeight;
      const elapsed = viewH - rect.top;
      return Math.max(0, Math.min(1, elapsed / total));
    }

    function tick() {
      // Lerp toward raw scroll value for smooth trailing motion
      smoothProgress.current += (rawProgress.current - smoothProgress.current) * 0.08;
      setDisplayProgress(smoothProgress.current);
      rafId.current = requestAnimationFrame(tick);
    }

    function onScroll() {
      rawProgress.current = getScrollProgress();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Bird position: -8% → 108% (off left → off right)
  const birdX = -8 + displayProgress * 116;

  // Text reveal: starts revealing when bird is ~15% across, fully revealed at ~85%
  const revealStart = 0.15;
  const revealEnd = 0.85;
  const revealPct = Math.max(0, Math.min(1, (displayProgress - revealStart) / (revealEnd - revealStart)));

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden border-y border-charcoal/10 bg-bone"
      style={{ height: "140px" }}
      aria-hidden="true"
    >
      {/* MADE TO CARRY — revealed as bird passes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Ghost text (dimmed, always visible) */}
        <span
          className="select-none text-4xl font-extrabold tracking-[0.18em] uppercase"
          style={{ color: "rgba(54,79,160,0.12)", letterSpacing: "0.22em" }}
        >
          MADE TO CARRY.
        </span>
        {/* Revealed text (clipped left→right as bird passes) */}
        <span
          className="absolute select-none text-4xl font-extrabold tracking-[0.18em] uppercase text-blue"
          style={{
            letterSpacing: "0.22em",
            clipPath: `inset(0 ${Math.round((1 - revealPct) * 100)}% 0 0)`,
          }}
        >
          MADE TO CARRY.
        </span>
      </div>

      {/* Bird */}
      <img
        src="/bird-right.svg"
        alt=""
        className="pointer-events-none select-none absolute"
        style={{
          top: "50%",
          left: `${birdX}%`,
          transform: "translateY(-50%)",
          width: "64px",
          height: "auto",
          opacity: 0.9,
          zIndex: 10,
        }}
      />
    </div>
  );
}
