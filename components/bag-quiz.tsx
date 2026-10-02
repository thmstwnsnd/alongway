"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Quiz data ─────────────────────────────────────────────────────────── */

const steps = [
  {
    id: "size",
    question: "How much do you need it to carry?",
    options: [
      { value: "small",  label: "Light carry",   sub: "Phone, wallet, a few things" },
      { value: "medium", label: "Everyday amount", sub: "Laptop, lunch, errands" },
      { value: "large",  label: "Haul a lot",     sub: "Market runs, big loads" },
    ],
  },
  {
    id: "use",
    question: "What's it mainly for?",
    options: [
      { value: "retail",   label: "Retail / café",       sub: "Customer gift, merch, packaging" },
      { value: "events",   label: "Events & activations", sub: "Brand giveaway, swag bag" },
      { value: "gym",      label: "Gym / athleisure",     sub: "Workout gear, active lifestyle" },
      { value: "office",   label: "Office & corporate",   sub: "Team gifts, onboarding kits" },
      { value: "outdoor",  label: "Markets & outdoor",    sub: "Food producers, farms, makers" },
      { value: "general",  label: "General carry",        sub: "Everyday use, no specific context" },
    ],
  },
  {
    id: "style",
    question: "What style feels right?",
    options: [
      { value: "open",       label: "Open tote",    sub: "Classic, easy in and out" },
      { value: "structured", label: "Structured",   sub: "Holds its shape, stands upright" },
      { value: "zip",        label: "Zippered",     sub: "More secure, weather resistant" },
      { value: "minimal",    label: "Minimal",      sub: "Simple silhouette, clean look" },
    ],
  },
  {
    id: "qty",
    question: "How many are you thinking?",
    options: [
      { value: "100",  label: "100–249",  sub: "Getting started" },
      { value: "250",  label: "250–499",  sub: "Solid mid-size run" },
      { value: "500",  label: "500–999",  sub: "Real volume" },
      { value: "1000", label: "1,000+",   sub: "Scaling up" },
    ],
  },
];

/* ─── Recommendation logic ────────────────────────────────────────────────
   Simple scoring: each bag earns points based on the answers.
   Bags: beach-tote, hauler-tote, everyday-tote, shoulder-tote,
         oversized-tote, basic-tote, mini-tote, the-sunday,
         channel-tote, big-sur-tote, otis-tote, camper-pouch
──────────────────────────────────────────────────────────────────────────── */

type Answers = Record<string, string>;

interface BagResult {
  slug: string;
  name: string;
  tagline: string;
  reason: string;
}

function recommend(answers: Answers): BagResult {
  const { size, use, style } = answers;

  // Beach Tote — zippered large
  if (size === "large" && style === "zip") {
    return { slug: "beach-tote", name: "Beach Tote", tagline: "Water-resistant, zippered, built for the shore.", reason: "You wanted a large, secure bag — the zippered Beach Tote is built for exactly that." };
  }
  // Hauler — oversized large, events/outdoor
  if (size === "large" && (use === "events" || use === "outdoor")) {
    return { slug: "hauler-tote", name: "Hauler Tote", tagline: "Oversized, structured, and built to haul.", reason: "For big events or outdoor markets, the Hauler carries everything and looks the part." };
  }
  // Oversized — large general/retail
  if (size === "large") {
    return { slug: "oversized-tote", name: "Oversized Tote", tagline: "The market haul. Wide gusset, maximum volume.", reason: "Maximum volume for your needs — the Oversized Tote is the go-to for serious carrying." };
  }
  // Mini — small/compact
  if (size === "small") {
    return { slug: "mini-tote", name: "Mini Tote", tagline: "Small but mighty.", reason: "You want something light and compact — the Mini Tote keeps it simple." };
  }
  // Camper Pouch — small + minimal
  if (size === "small" && style === "minimal") {
    return { slug: "camper-pouch", name: "Camper Pouch", tagline: "Minimal carry, maximum style.", reason: "For a clean compact carry, the Camper Pouch is as minimal as it gets." };
  }
  // Shoulder Tote — medium, office/retail
  if (size === "medium" && (use === "office" || use === "retail")) {
    return { slug: "shoulder-tote", name: "Shoulder Tote", tagline: "Longer handles, easy shoulder carry.", reason: "The shoulder carry makes it easy to hand out or throw on between meetings." };
  }
  // Channel Tote — medium, structured
  if (size === "medium" && style === "structured") {
    return { slug: "channel-tote", name: "Channel Tote", tagline: "Structured and polished.", reason: "You want structure — the Channel Tote holds its shape and looks sharp." };
  }
  // Big Sur — medium, outdoor/gym
  if (size === "medium" && (use === "outdoor" || use === "gym")) {
    return { slug: "big-sur-tote", name: "Big Sur Tote", tagline: "Built for life outside.", reason: "Durable enough for the outdoors or gym bag duty." };
  }
  // The Sunday — medium, open/general
  if (size === "medium" && (style === "open" || use === "general")) {
    return { slug: "the-sunday", name: "The Sunday", tagline: "The one you reach for every day.", reason: "Easy, open, and reliable — the Sunday is your everyday bag." };
  }
  // Default — Everyday Tote
  return { slug: "everyday-tote", name: "Everyday Tote", tagline: "The reliable one. Gusseted canvas for daily carry.", reason: "A solid all-rounder — the Everyday Tote works for almost any use case." };
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function BagQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<BagResult | null>(null);

  const currentStep = steps[stepIndex];

  function choose(value: string) {
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);

    if (stepIndex + 1 < steps.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setResult(recommend(newAnswers));
    }
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setResult(null);
  }

  if (result) {
    return (
      <div className="text-center">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.22em] text-blue">Your match</p>
        <h2 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-charcoal">{result.name}</h2>
        <p className="mt-2 text-base text-charcoal/70">{result.tagline}</p>
        <div className="mt-6 rounded-2xl border-2 border-blue/15 bg-bone/60 px-6 py-5">
          <p className="text-sm leading-6 text-charcoal/70">{result.reason}</p>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/collection/${result.slug}`}
            className="inline-flex items-center rounded-full bg-blue px-7 py-3.5 font-display text-sm font-semibold text-bone hover:-translate-y-0.5 hover:bg-charcoal"
          >
            See the {result.name}
            <Image src="/svg/icons/Alongway_Website_Graphic_ArrowRight_Cream.svg" alt="" width={115} height={79} className="inline-block h-4 w-auto ml-2" aria-hidden="true" />
          </Link>
          <button
            onClick={restart}
            className="text-sm font-semibold text-blue hover:text-blue underline underline-offset-4"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= stepIndex ? "bg-blue" : "bg-blue/15"}`}
            />
          ))}
        </div>
        <p className="font-accent mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
          Step {stepIndex + 1} of {steps.length}
        </p>
      </div>

      {/* Question */}
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-charcoal lg:text-4xl">
        Which bag is right for you?
      </h1>
      <p className="mt-3 text-lg font-medium text-charcoal/70">{currentStep.question}</p>

      {/* Options */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {currentStep.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => choose(opt.value)}
            className="group flex flex-col items-start gap-1 rounded-2xl border-2 border-blue/15 bg-white px-5 py-4 text-left hover:border-blue hover:bg-bone transition-colors"
          >
            <span className="font-display text-sm font-bold text-charcoal group-hover:text-blue">{opt.label}</span>
            <span className="text-xs text-charcoal/70">{opt.sub}</span>
          </button>
        ))}
      </div>

      {/* Back */}
      {stepIndex > 0 && (
        <button
          onClick={() => setStepIndex(stepIndex - 1)}
          className="mt-6 text-sm text-charcoal/70 hover:text-charcoal underline underline-offset-4"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
