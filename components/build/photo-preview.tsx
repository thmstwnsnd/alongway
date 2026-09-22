import Image from "next/image";

import type { PhotoLayers } from "@/data/catalog";

/**
 * Photo-realistic preview: a neutralized bag photo with the chosen colors
 * multiplied through alpha masks, so shading, wrinkles and seams stay real.
 */
export function PhotoPreview({ photo, bodyHex, trimHex, alt }: { photo: PhotoLayers; bodyHex: string; trimHex: string; alt: string }) {
  const layer = (mask: string, color: string) => (
    <div
      aria-hidden
      className="absolute inset-0 transition-colors duration-300"
      style={{
        backgroundColor: color,
        mixBlendMode: "multiply",
        WebkitMaskImage: `url(${mask})`,
        maskImage: `url(${mask})`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }}
    />
  );

  return (
    <div className="relative isolate h-full w-full" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      <Image src={photo.base} alt={alt} fill priority sizes="(min-width: 1024px) 50vw, 90vw" className="object-contain" />
      {layer(photo.masks.body, bodyHex)}
      {photo.masks.trim ? layer(photo.masks.trim, trimHex) : null}
    </div>
  );
}
