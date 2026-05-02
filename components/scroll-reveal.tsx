"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;   // ms stagger
  rotate?: number;  // starting rotation in deg (e.g. 2 or -2) for the pop direction
  className?: string;
}

export function ScrollReveal({ children, delay = 0, rotate = 2, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"hidden" | "animating">("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setState("animating"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${state === "hidden" ? "card-pop-ready" : "card-pop-animate"} ${className}`}
      style={{ "--pop-rot": `${rotate}deg` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
