"use client";

import { useEffect, useRef, useState } from "react";

interface IconRevealProps {
  children: React.ReactNode;
  delay?: number;
}

export function IconReveal({ children, delay = 0 }: IconRevealProps) {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={state === "hidden" ? "icon-drop-ready" : "icon-drop-animate"}
    >
      {children}
    </div>
  );
}
