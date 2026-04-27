export type AddOn = {
  id: string;
  name: string;
  description: string;
  pricePerUnit: number;
};

export const addOns: AddOn[] = [
  {
    id: "printed-straps",
    name: "Printed Straps",
    description: "Custom print on the straps — color, pattern, or text.",
    pricePerUnit: 1.5,
  },
  {
    id: "extra-pocket",
    name: "Additional Exterior Pocket",
    description: "Add a second exterior pocket for more utility.",
    pricePerUnit: 1.25,
  },
  {
    id: "interior-pocket",
    name: "Interior Organizer Pocket",
    description: "Slip pocket, card slots, or pen loops inside.",
    pricePerUnit: 1,
  },
  {
    id: "key-hook",
    name: "Key Hook",
    description: "Metal D-ring with swivel hook on interior.",
    pricePerUnit: 0.75,
  },
  {
    id: "extra-label",
    name: "Additional Label",
    description: "Second branded label — hem tag, hang tag, or care label.",
    pricePerUnit: 0.5,
  },
  {
    id: "extra-decoration",
    name: "Additional Decoration",
    description: "Second decoration placement (e.g. back print + front embroidery).",
    pricePerUnit: 2,
  },
  {
    id: "zipper-closure",
    name: "Zipper Closure",
    description: "Add a top zipper to any open-top bag style.",
    pricePerUnit: 1.75,
  },
];
