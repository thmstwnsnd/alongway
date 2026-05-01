"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    lines: ["THE FINEST", "BAGS IN ALL", "THE LAND"],
    name: "First L.",
    company: "Company Name",
  },
  {
    lines: ["EVERY RUN", "IS PERFECT."],
    name: "First L.",
    company: "Company Name",
  },
  {
    lines: ["FINALLY A BAG", "COMPANY THAT", "GETS IT DONE."],
    name: "First L.",
    company: "Company Name",
  },
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const { lines, name, company } = testimonials[index];

  return (
    <section className="bg-bone py-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-blue/60 mb-8">
          Real Bags, Real People
        </p>

        {/* Quote row with arrows */}
        <div className="relative flex items-center justify-center gap-6">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/svg/icons/Alongway_Website_Graphic_ArrowLeft_Blue.svg"
              alt="Previous"
              width={115}
              height={79}
              className="h-8 w-auto"
            />
          </button>

          {/* Quote */}
          <blockquote className="flex-1">
            <div className="font-display text-4xl font-extrabold leading-tight text-blue md:text-5xl lg:text-6xl">
              {lines.map((line, i) => (
                <div key={i}>
                  {i === 0 && <span className="font-serif font-normal not-italic text-blue/30" aria-hidden="true">“</span>}
                  {line}
                  {i === lines.length - 1 && <span className="font-serif font-normal not-italic text-blue/30" aria-hidden="true">”</span>}
                </div>
              ))}
            </div>
            <cite className="mt-4 block font-display text-xs font-extrabold uppercase tracking-[0.2em] text-blue/50 not-italic">
              — {name}, {company}
            </cite>
          </blockquote>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Blue.svg"
              alt="Next"
              width={115}
              height={79}
              className="h-8 w-auto"
            />
          </button>
        </div>

        {/* Double smiley at bottom center */}
        <div className="mt-10 flex justify-center">
          <Image
            src="/svg/icons/Alongway_Website_Graphic_DoubleSmileyFace_Blue.svg"
            alt=""
            width={200}
            height={100}
            className="pointer-events-none h-auto w-16 select-none opacity-70"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
