"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const photos = [
  { src: "/photos/carousel-1.jpg",                alt: "Custom tote lifestyle" },
  { src: "/photos/lifestyle-hsd-459.jpg",          alt: "High Street Deli branded tote" },
  { src: "/photos/carousel-4.jpg",                alt: "Verve Coffee Tokyo Tote" },
  { src: "/photos/lifestyle-hsd-75.jpg",           alt: "High Street Deli portrait" },
  { src: "/photos/carousel-5.jpg",                alt: "High Street Deli lifestyle" },
  { src: "/photos/lifestyle-verve-large-tote.jpg", alt: "Verve large tote" },
  { src: "/photos/carousel-2.jpg",                alt: "Boatsetter tote lifestyle" },
  { src: "/photos/lifestyle-hsd-76.jpg",           alt: "High Street Deli portrait" },
  { src: "/photos/carousel-6.jpg",                alt: "Merch drop 2025" },
  { src: "/photos/lifestyle-verve-tokyo.jpg",      alt: "Verve Tokyo Tote portrait" },
  { src: "/photos/carousel-3.jpg",                alt: "High Street Deli branded bag" },
  { src: "/photos/lifestyle-kis-tote.jpg",         alt: "KIS tote lifestyle" },
  { src: "/photos/lifestyle-hsd-435.jpg",          alt: "High Street Deli lifestyle" },
  { src: "/photos/lifestyle-verve-cosmic-1.jpg",   alt: "Verve Cosmic Ripple lifestyle" },
  { src: "/photos/lifestyle-gymshark.jpg",         alt: "Gymshark event totes" },
];

const CARD_WIDTH = 300;
const CARD_GAP = 16;
const STEP = CARD_WIDTH + CARD_GAP;

// Clone first + last few photos for seamless looping
const CLONES = 3;
const looped = [
  ...photos.slice(-CLONES),
  ...photos,
  ...photos.slice(0, CLONES),
];
const OFFSET = CLONES; // real index 0 is at looped[CLONES]

export function PhotoCarousel() {
  const [index, setIndex] = useState(OFFSET);
  const [animated, setAnimated] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  // After a clone-jump, snap without animation then re-enable
  useEffect(() => {
    if (!animated) {
      // tiny timeout so the browser paints the jump first
      const t = setTimeout(() => setAnimated(true), 20);
      return () => clearTimeout(t);
    }
  }, [animated]);

  function go(dir: 1 | -1) {
    setAnimated(true);
    setIndex((prev) => prev + dir);
  }

  // After animation ends, check if we're in a clone zone and jump silently
  function onTransitionEnd() {
    const total = looped.length;
    if (index >= photos.length + OFFSET) {
      setAnimated(false);
      setIndex(OFFSET);
    } else if (index < OFFSET) {
      setAnimated(false);
      setIndex(photos.length + OFFSET - 1);
    }
  }

  const translateX = -(index * STEP);

  return (
    <div className="flex flex-col gap-5">
      {/* Track + flanking arrows */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => go(-1)}
          className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-light-blue border-2 border-blue hover:bg-blue transition-colors"
          aria-label="Previous photo"
        >
          <img src="/svg/icons/Alongway_Website_Graphic_ArrowLeft_Blue.svg" alt="" className="h-4 w-auto" aria-hidden="true" />
        </button>

      <div className="flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: `${CARD_GAP}px`,
            transform: `translateX(${translateX}px)`,
            transition: animated ? "transform 420ms cubic-bezier(0.4,0,0.2,1)" : "none",
            willChange: "transform",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {looped.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className="relative shrink-0 overflow-hidden rounded-2xl bg-charcoal/10"
              style={{ width: `${CARD_WIDTH}px`, height: "400px" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          ))}
        </div>
      </div>

        <button
          onClick={() => go(1)}
          className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-light-blue border-2 border-blue hover:bg-blue transition-colors"
          aria-label="Next photo"
        >
          <img src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg" alt="" className="h-4 w-auto" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
