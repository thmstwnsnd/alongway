"use client";

import { useEffect, useState } from "react";

const photos = [
  "/hero.jpg",
  "/photos/lifestyle-verve-cosmic-1.jpg",
  "/photos/lifestyle-hsd-2938.jpg",
  "/photos/lifestyle-boatsetter-2.jpg",
  "/photos/lifestyle-gymshark.jpg",
];

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNext((prev) => {
        const n = (current + 1) % photos.length;
        return n;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  // When next is set, fade it in then swap
  useEffect(() => {
    if (next === null) return;
    const t = setTimeout(() => {
      setCurrent(next);
      setNext(null);
    }, 700); // matches transition duration
    return () => clearTimeout(t);
  }, [next]);

  return (
    <div className="absolute inset-0">
      {/* Current photo — always visible */}
      <img
        key={`current-${current}`}
        src={photos[current]}
        alt="Alongway custom bags"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Next photo — fades in on top */}
      {next !== null && (
        <img
          key={`next-${next}`}
          src={photos[next]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
        />
      )}
    </div>
  );
}
