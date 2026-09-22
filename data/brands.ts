/**
 * Brands shown in the "Trusted by" strip on the homepage.
 * `logo` is a path under /public/logos; leave it null until the brand's
 * own file is in hand (see public/logos/README.md). Brands without a logo
 * render as a text pill.
 */
export type Brand = {
  name: string;
  logo: string | null;
  /** Rendered height in px; tune per logo so wordmarks and marks look the same weight. */
  height?: number;
};

export const brands: Brand[] = [
  { name: "Stanford", logo: null },
  { name: "Stanford Medicine", logo: null },
  { name: "Banner Coffee", logo: null },
  { name: "Field Day Coffee", logo: null },
  { name: "High St Deli", logo: null },
  { name: "Gymshark", logo: null },
  { name: "Synergy Kombucha", logo: null },
  { name: "Verve Coffee", logo: null },
];
