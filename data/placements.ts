/** Standard places a logo or art can go on a tote. Easton can edit this list; nothing else depends on the labels. */
export const placementZones = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "pocket", label: "Pocket" },
  { id: "side", label: "Side panel" },
  { id: "strap", label: "Strap" },
  { id: "bottom", label: "Bottom" },
] as const;

export type PlacementId = (typeof placementZones)[number]["id"];

export const placementLabel = (id: string) => placementZones.find((z) => z.id === id)?.label ?? id;

/** Only vector files go to production. PNG and JPEG are not accepted. */
export const ALLOWED_ART_EXTENSIONS = [".ai", ".pdf", ".eps"] as const;
export const MAX_ART_BYTES = 50 * 1024 * 1024;

export type ArtFileRole = "logo" | "art";

/** A file the customer uploaded, as saved on their build. The file itself lives in storage; this points to it. */
export type ArtFileRef = { id: string; name: string; bytes: number; role: ArtFileRole };

export function hasAllowedExtension(name: string) {
  const lower = name.toLowerCase();
  return ALLOWED_ART_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

/** Where each zone sits on the front photo, as % of the photo box (left, top, width, height). `null` = not visible from the front. Tuned to the Boat Tote photo; Easton's real photos will need these re-tuned. */
export const placementBoxes: Record<string, { l: number; t: number; w: number; h: number } | null> = {
  front: { l: 27, t: 28, w: 46, h: 26 },
  pocket: { l: 32, t: 58, w: 36, h: 16 },
  side: { l: 6, t: 26, w: 9, h: 48 },
  strap: { l: 22, t: 4, w: 56, h: 6 },
  bottom: { l: 12, t: 79, w: 76, h: 6 },
  back: null,
};
