/**
 * Options for the Build a Bag tool. Sourced from the V8 spec sheet
 * (BAG 20-33 add-on pages) and the existing add-on list.
 *
 * PRICING NOTE: every `pricePerUnit` below is a placeholder pending
 * factory numbers. Change them here; nothing else hard-codes them.
 */

export type BuildOption = {
  id: string;
  label: string;
  description: string;
  pricePerUnit: number;
};

/** Strap construction. Exactly one. `self-fabric` matches the spec-sheet default. */
export const strapOptions: BuildOption[] = [
  { id: "self-fabric", label: "Self-fabric strap", description: "Cut from the bag fabric. The spec-sheet standard.", pricePerUnit: 0 },
  { id: "cotton-webbing", label: "Cotton webbing", description: "Woven cotton strap, as on the Mini and Downtown.", pricePerUnit: 0 },
  { id: "nylon", label: "Nylon webbing", description: "Lighter, water-resistant. Standard on Zuma and Hauler.", pricePerUnit: 0.25 },
  { id: "printed", label: "Printed straps", description: "1-color print down the strap (0.75\" wide).", pricePerUnit: 1.5 },
  { id: "binding", label: "Binding straps", description: "Straps finished with contrast binding.", pricePerUnit: 1.0 },
];

/** Handle add-ons. Any number. */
export const handleAddOns: BuildOption[] = [
  { id: "grab-handle", label: "Grab handle", description: "Short top handle for one-hand carry, alongside the straps.", pricePerUnit: 1.25 },
  { id: "extra-handles", label: "Extra handles", description: "Second set of handles (spec BAG 20).", pricePerUnit: 1.0 },
  { id: "pantone-straps", label: "Pantone-matched straps", description: "Straps dyed to a Pantone, e.g. 7455 C.", pricePerUnit: 0.75 },
];

/** Stitching style. Exactly one. */
export const stitchOptions: BuildOption[] = [
  { id: "standard", label: "Matching thread", description: "Thread matched to the fabric.", pricePerUnit: 0 },
  { id: "contrast", label: "Contrast stitching", description: "Thread in a Pantone you choose (spec BAG 27).", pricePerUnit: 0.5 },
  { id: "topstitch", label: "Exposed topstitch", description: "Visible topstitched side seams, as on the Sunday.", pricePerUnit: 0.5 },
  { id: "piping", label: "Piping", description: "Contrast piping along seams.", pricePerUnit: 1.25 },
  { id: "binding", label: "Contrast binding", description: "Seams bound in a contrast fabric.", pricePerUnit: 1.5 },
];

/** Pockets. Any number. Ids referenced by catalog `standardPockets`. */
export const pocketOptions: BuildOption[] = [
  { id: "interior-single", label: "Single interior pocket", description: "9.5\" x 5.75\" slip pocket, front interior.", pricePerUnit: 1.0 },
  { id: "interior-double", label: "Double interior pocket", description: "Two 4.75\" x 5.75\" pockets, back interior.", pricePerUnit: 1.25 },
  { id: "interior-zipper", label: "Zipper interior pocket", description: "9.5\" zippered pocket, front interior.", pricePerUnit: 1.75 },
  { id: "interior-double-zipper", label: "Double pocket + zipper", description: "Two slip pockets with a zipper across the top.", pricePerUnit: 2.25 },
  { id: "exterior-front", label: "Front exterior pocket", description: "Open pocket on the face of the bag.", pricePerUnit: 1.5 },
  { id: "exterior-back", label: "Back exterior pocket", description: "Open pocket on the back.", pricePerUnit: 1.5 },
  { id: "triple", label: "Triple pocket", description: "Three-compartment exterior pocket (spec BAG 24).", pricePerUnit: 2.0 },
  { id: "bottle", label: "Bottle pockets", description: "Side pockets sized for a bottle (spec BAG 25).", pricePerUnit: 1.5 },
  { id: "side-pockets", label: "Side pockets", description: "Open pockets on each gusset.", pricePerUnit: 1.5 },
];

/** Closure. Exactly one. */
export const closureOptions: BuildOption[] = [
  { id: "none", label: "Open top", description: "No closure.", pricePerUnit: 0 },
  { id: "magnet", label: "Magnet snap", description: "Hidden magnetic snap at the top center.", pricePerUnit: 1.0 },
  { id: "zipper", label: "Zipper", description: "Full-width top zipper.", pricePerUnit: 1.75 },
];

/** Labels and extras. Any number. Side-seam woven label is always included. */
export const extraOptions: BuildOption[] = [
  { id: "hem-fold-label", label: "Hem fold label", description: "Woven label folded over the top hem.", pricePerUnit: 0.5 },
  { id: "pocket-label", label: "Pocket woven label", description: "Woven label sewn to the pocket hem.", pricePerUnit: 0.5 },
  { id: "embroidered-patch", label: "Embroidered patch", description: "4.5\" embroidered patch on self canvas.", pricePerUnit: 2.0 },
  { id: "key-chain", label: "Key chain", description: "Interior key clip on a webbing loop.", pricePerUnit: 0.75 },
];

export const includedOnEveryBag: { label: string; icon: string }[] = [
  { label: "Side-seam woven label with your brand", icon: "/svg/icons/Alongway_Website_Graphic_Flower_Cream.svg" },
  { label: "Interior key loop", icon: "/svg/icons/Alongway_Website_Graphic_PeaceHand_Cream.svg" },
  { label: "Alongway care label", icon: "/svg/icons/Alongway_Website_Graphic_BirdRight_Cream.svg" },
  { label: "1-color print or embroidery", icon: "/svg/icons/Alongway_Website_Graphic_DoubleSmileyFace_Cream.svg" },
  { label: "Setup and shipping", icon: "/svg/icons/Alongway_Website_Graphic_SunIcon_Cream.svg" },
];

export const buildOptionGroups = { strapOptions, handleAddOns, stitchOptions, pocketOptions, closureOptions, extraOptions };

export function findOption(options: BuildOption[], id: string) {
  return options.find((option) => option.id === id);
}
