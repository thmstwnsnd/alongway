"use client";

import { useState } from "react";
import Image from "next/image";

const perks = [
  {
    label: "Free air shipping",
    body: "Every order ships air freight to one US address. No surprise freight bills.",
    photo: "/photos/lifestyle-verve-cosmic-1.jpg",
  },
  {
    label: "Transparent pricing",
    body: "Per-unit costs upfront. No hidden setup fees. No runaround.",
    photo: "/photos/lifestyle-hsd-514.jpg",
  },
  {
    label: "Low MOQ",
    body: "Start from 100 units. Scale when you're ready.",
    photo: "/photos/carousel-2.jpg",
  },
  {
    label: "30-day production",
    body: "Factory-to-door in 30 days. Rush available on select styles.",
    photo: "/photos/lifestyle-merch-drop.jpg",
  },
  {
    label: "Real support",
    body: "A real person responds within one business day. No ticket queues.",
    photo: "/photos/lifestyle-gymshark.jpg",
  },
];

export function PerksAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-16">
      {/* Left: accordion list */}
      <div className="flex flex-col divide-y divide-blue/12 lg:w-1/2">
        {perks.map((perk, i) => (
          <button
            key={perk.label}
            onClick={() => setActive(i)}
            className={`group flex flex-col items-start gap-2 py-5 text-left transition-colors ${
              active === i ? "text-blue" : "text-charcoal/50 hover:text-charcoal"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Active indicator bar */}
              <span
                className={`inline-block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  active === i ? "bg-blue w-8" : "bg-charcoal/20 w-4"
                }`}
              />
              <span className="font-display text-lg font-bold">{perk.label}</span>
            </div>
            {/* Description expands when active */}
            <div
              className="overflow-hidden transition-all duration-300 pl-9"
              style={{ maxHeight: active === i ? "80px" : "0px", opacity: active === i ? 1 : 0 }}
            >
              <p className="text-sm leading-6 text-charcoal/65">{perk.body}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Right: photo */}
      <div className="relative overflow-hidden rounded-2xl lg:w-1/2" style={{ minHeight: "420px" }}>
        {perks.map((perk, i) => (
          <img
            key={perk.photo}
            src={perk.photo}
            alt={perk.label}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
