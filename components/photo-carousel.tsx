"use client";

import { useRef } from "react";
import Image from "next/image";

const photos = [
  { src: "/photos/carousel-1.jpg",               alt: "Custom tote lifestyle" },
  { src: "/photos/lifestyle-hsd-459.jpg",         alt: "High Street Deli branded tote" },
  { src: "/photos/carousel-4.jpg",               alt: "Verve Coffee Tokyo Tote" },
  { src: "/photos/lifestyle-hsd-75.jpg",          alt: "High Street Deli bag portrait" },
  { src: "/photos/carousel-5.jpg",               alt: "High Street Deli lifestyle" },
  { src: "/photos/lifestyle-verve-large-tote.jpg",alt: "Verve large tote" },
  { src: "/photos/carousel-2.jpg",               alt: "Boatsetter tote lifestyle" },
  { src: "/photos/lifestyle-hsd-76.jpg",          alt: "High Street Deli portrait" },
  { src: "/photos/carousel-6.jpg",               alt: "Merch drop 2025" },
  { src: "/photos/lifestyle-verve-tokyo.jpg",     alt: "Verve Tokyo Tote portrait" },
  { src: "/photos/carousel-3.jpg",               alt: "High Street Deli branded bag" },
  { src: "/photos/lifestyle-kis-tote.jpg",        alt: "KIS tote lifestyle" },
];

export function PhotoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="relative shrink-0 overflow-hidden rounded-2xl bg-charcoal/10"
            style={{ scrollSnapAlign: "start", width: "300px", height: "400px" }}
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

      {/* Arrow buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-bone transition-colors"
        aria-label="Scroll left"
      >
        <img
          src="/svg/icons/Alongway_Website_Graphic_ArrowLeft_Blue.svg"
          alt=""
          className="h-4 w-auto"
          aria-hidden="true"
        />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute -right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-bone transition-colors"
        aria-label="Scroll right"
      >
        <img
          src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg"
          alt=""
          className="h-4 w-auto"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
