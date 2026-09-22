/**
 * Single source of truth for brand contact details and URLs.
 * Change these here; nothing else in the codebase should hard-code them.
 */
export const site = {
  name: "Alongway",
  tagline: "Made to carry.",
  description:
    "Premium custom totes and bags with curated silhouettes, all-in pricing, and factory-direct quality.",
  url: "https://alongway.co",
  email: "hello@alongway.co",
  /** E.164 number for the footer "Text us" link, or null to hide it until one exists. */
  phone: null as string | null,
  instagram: { handle: "@alongwayco", url: "https://instagram.com/alongwayco" },
} as const;

export const formatPhone = (e164: string) =>
  e164.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "+1 ($1) $2-$3");
