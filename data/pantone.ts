/**
 * Pantone Coated (C) color reference — common brand/print colors
 * Key: normalized Pantone code (uppercase, no "PMS", accepts "286 C" or "286C")
 */
export const pantoneMap: Record<string, string> = {
  // Blues
  "286 C": "#003DA5", "286C": "#003DA5",
  "285 C": "#0085CA", "285C": "#0085CA",
  "300 C": "#005EB8", "300C": "#005EB8",
  "301 C": "#00549F", "301C": "#00549F",
  "072 C": "#10069F", "072C": "#10069F",
  "2728 C": "#3C69E7", "2728C": "#3C69E7",
  "2935 C": "#0057A8", "2935C": "#0057A8",
  "280 C": "#002D72", "280C": "#002D72",
  "279 C": "#418FDE", "279C": "#418FDE",
  "292 C": "#69B3E7", "292C": "#69B3E7",
  // Greens
  "348 C": "#007A33", "348C": "#007A33",
  "355 C": "#009A44", "355C": "#009A44",
  "361 C": "#43B02A", "361C": "#43B02A",
  "376 C": "#84BD00", "376C": "#84BD00",
  "7480 C": "#00B5B8", "7480C": "#00B5B8",
  "3415 C": "#00573F", "3415C": "#00573F",
  "3435 C": "#154734", "3435C": "#154734",
  "3278 C": "#00966C", "3278C": "#00966C",
  // Reds / Oranges
  "485 C": "#DA291C", "485C": "#DA291C",
  "186 C": "#C8102E", "186C": "#C8102E",
  "032 C": "#EF3340", "032C": "#EF3340",
  "179 C": "#FF5C39", "179C": "#FF5C39",
  "151 C": "#FF8200", "151C": "#FF8200",
  "021 C": "#FE5000", "021C": "#FE5000",
  "1655 C": "#FF6720", "1655C": "#FF6720",
  "165 C": "#FF7900", "165C": "#FF7900",
  "1585 C": "#FF6A13", "1585C": "#FF6A13",
  // Yellows
  "102 C": "#FFD700", "102C": "#FFD700",
  "116 C": "#FFCD00", "116C": "#FFCD00",
  "012 C": "#FFD700", "012C": "#FFD700",
  "1235 C": "#FFB81C", "1235C": "#FFB81C",
  "123 C": "#FFC72C", "123C": "#FFC72C",
  // Purples / Violets
  "2587 C": "#9063CD", "2587C": "#9063CD",
  "267 C": "#5C068C", "267C": "#5C068C",
  "266 C": "#7B5EA7", "266C": "#7B5EA7",
  "2685 C": "#4B0082", "2685C": "#4B0082",
  "2736 C": "#4F2D7F", "2736C": "#4F2D7F",
  "violet C": "#40189D", "VIOLET C": "#40189D",
  // Pinks
  "812 C": "#FF4BCA", "812C": "#FF4BCA",
  "806 C": "#FF3EB5", "806C": "#FF3EB5",
  "214 C": "#D2407A", "214C": "#D2407A",
  "192 C": "#E93B77", "192C": "#E93B77",
  // Neutrals / Browns / Tans
  "7527 C": "#DDD5C0", "7527C": "#DDD5C0",
  "7530 C": "#C5B9AC", "7530C": "#C5B9AC",
  "464 C": "#7B5A2D", "464C": "#7B5A2D",
  "469 C": "#8B4C26", "469C": "#8B4C26",
  "4505 C": "#A39161", "4505C": "#A39161",
  "warm gray 1 C": "#D7D2CB", "WARM GRAY 1 C": "#D7D2CB",
  "warm gray 6 C": "#A7A8AA", "WARM GRAY 6 C": "#A7A8AA",
  "cool gray 5 C": "#B1B3B3", "COOL GRAY 5 C": "#B1B3B3",
  // Blacks / Whites
  "black C": "#2B2926", "BLACK C": "#2B2926",
  "black 6 C": "#101820", "BLACK 6 C": "#101820",
  "white": "#FFFFFF", "WHITE": "#FFFFFF",
  // Metallics (approximate)
  "877 C": "#8A8D8F", "877C": "#8A8D8F",  // silver
  "871 C": "#85754E", "871C": "#85754E",  // gold
  // Teals / Aquas
  "320 C": "#009CA6", "320C": "#009CA6",
  "3262 C": "#00B0B9", "3262C": "#00B0B9",
  "325 C": "#71C5CF", "325C": "#71C5CF",
  "3125 C": "#00B2A9", "3125C": "#00B2A9",
  // Navy
  "289 C": "#002147", "289C": "#002147",
  "282 C": "#003057", "282C": "#003057",
};

export function lookupPantone(input: string): string | null {
  const normalized = input.trim().toUpperCase().replace(/^PMS\s*/i, "");
  return pantoneMap[normalized] ?? pantoneMap[normalized.replace(/\s+C$/, " C")] ?? null;
}
