"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * "Made to carry." band. When it scrolls into view the bird flies across once
 * and reveals the text behind it; after that everything stays put.
 */
export function ScrollBird() {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayed(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[140px] w-full overflow-hidden border-y border-charcoal/10 bg-bone" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`select-none font-display text-4xl font-extrabold tracking-[0.18em] text-blue lg:text-5xl ${played ? "animate-reveal-right" : "opacity-0"}`}
        >
          MADE TO CARRY.
        </span>
      </div>
      <Image
        src="/bird-right.svg"
        alt=""
        width={64}
        height={64}
        className={`absolute top-1/2 h-auto w-16 -translate-y-1/2 opacity-90 ${played ? "animate-bird-fly" : "-left-24"}`}
      />
    </div>
  );
}
