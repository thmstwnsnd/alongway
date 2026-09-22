/**
 * Brands shown in the "Trusted by" strip on the homepage.
 *
 * `logo`: path under /public/logos, or null until the brand's own file is in
 * hand (see public/logos/README.md). With a logo, the pill shows the logo;
 * without one, it shows the name in the brand's colors.
 * `bg` / `fg`: the brand's colors for the pill. Leave null for the default.
 */
export type Brand = {
  name: string;
  logo: string | null;
  /** Rendered logo height in px; tune per logo so marks look the same weight. */
  height?: number;
  bg?: string | null;
  fg?: string | null;
};

export const brands: Brand[] = [
  { name: "Stanford", logo: null, bg: "#8C1515", fg: "#FFFFFF" },
  { name: "Stanford Medicine", logo: null, bg: "#8C1515", fg: "#FFFFFF" },
  { name: "Banner Coffee", logo: null },
  { name: "Field Day Coffee", logo: null },
  { name: "High St Deli", logo: null },
  { name: "Gymshark", logo: null, bg: "#111111", fg: "#FFFFFF" },
  { name: "Synergy Kombucha", logo: null },
  { name: "Verve Coffee", logo: null },
];
