import type { BuildConfig } from "@/lib/build-flow";
import { resolveBuild } from "@/lib/build-flow";

/**
 * Schematic bag drawing that reacts to size, fabric color, straps,
 * handles, stitching, pockets and closure. Proportions are to scale
 * with the chosen dimensions so a Mini and a Carry All look different.
 */
export function BagPreview({ build }: { build: BuildConfig }) {
  const r = resolveBuild(build);
  const { width: w, height: h, depth: d } = r.dims;
  const fill = r.swatch?.hex ?? "#E8DFC9";
  const ink = darken(fill, 0.35);
  const stitch = build.stitchId === "standard" ? darken(fill, 0.18) : build.stitchColor;
  const strapColor = build.handleAddOnIds.includes("pantone-straps")
    ? "#7B5EA7" // Pantone 7455 C-ish
    : build.strapId === "nylon" || build.strapId === "cotton-webbing"
      ? darken(fill, 0.25)
      : fill;

  // Canvas is 400x400; longest real bag dimension maps to ~240px.
  const scale = 240 / Math.max(w + d * 0.5, h + 12, 20);
  const bw = w * scale;
  const bh = h * scale;
  const bd = d * scale * 0.5;
  const x0 = (400 - bw - bd) / 2;
  const y0 = 400 - 60 - bh;
  const strapW = Math.max(6, r.size.strap.width * scale);
  const strapRise = r.size.strap.isDrop ? Math.min(60, r.size.strap.length * scale) : Math.min(90, (r.size.strap.length / 3) * scale);
  const dashed = build.stitchId === "topstitch" || build.stitchId === "contrast" ? "4 3" : undefined;
  const hasFrontPocket = build.pocketIds.some((id) => ["exterior-front", "triple"].includes(id));
  const hasSidePocket = build.pocketIds.some((id) => ["side-pockets", "bottle"].includes(id));

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label={`${r.style.name} preview`}>
      <defs>
        <linearGradient id="bag-shade" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx={x0 + (bw + bd) / 2} cy={y0 + bh + 6} rx={(bw + bd) / 2} ry={8} fill="#000" opacity="0.08" />

      {/* straps (behind body) */}
      {[x0 + bw * 0.25, x0 + bw * 0.75].map((sx, i) => (
        <path
          key={i}
          d={`M ${sx - strapW / 2} ${y0 + 8} v ${-strapRise} a ${bw * 0.25} ${strapRise * 0.6} 0 0 1 ${bw * 0.5} 0 v ${strapRise}`}
          fill="none"
          stroke={strapColor}
          strokeWidth={strapW}
          strokeLinecap="round"
          opacity={i === 0 ? 1 : 0}
        />
      ))}
      <path
        d={`M ${x0 + bw * 0.25} ${y0 + 8} v ${-strapRise} a ${bw * 0.25} ${strapRise * 0.6} 0 0 1 ${bw * 0.5} 0 v ${strapRise}`}
        fill="none"
        stroke={strapColor}
        strokeWidth={strapW}
        strokeLinecap="round"
      />
      {build.strapId === "printed" && (
        <path
          d={`M ${x0 + bw * 0.25} ${y0 + 8} v ${-strapRise} a ${bw * 0.25} ${strapRise * 0.6} 0 0 1 ${bw * 0.5} 0 v ${strapRise}`}
          fill="none"
          stroke={ink}
          strokeWidth={Math.max(2, strapW * 0.3)}
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
      )}
      {build.handleAddOnIds.includes("extra-handles") && (
        <path
          d={`M ${x0 + bw * 0.32} ${y0 + 8} v ${-strapRise * 0.55} a ${bw * 0.18} ${strapRise * 0.3} 0 0 1 ${bw * 0.36} 0 v ${strapRise * 0.55}`}
          fill="none"
          stroke={strapColor}
          strokeWidth={strapW * 0.8}
          strokeLinecap="round"
          opacity="0.85"
        />
      )}

      {/* gusset / side */}
      {bd > 0 && (
        <polygon
          points={`${x0 + bw},${y0} ${x0 + bw + bd},${y0 - bd * 0.6} ${x0 + bw + bd},${y0 + bh - bd * 0.6} ${x0 + bw},${y0 + bh}`}
          fill={fill}
          stroke={ink}
          strokeWidth="1.5"
        />
      )}
      {bd > 0 && (
        <polygon
          points={`${x0 + bw},${y0} ${x0 + bw + bd},${y0 - bd * 0.6} ${x0 + bw + bd},${y0 + bh - bd * 0.6} ${x0 + bw},${y0 + bh}`}
          fill="url(#bag-shade)"
        />
      )}
      {hasSidePocket && bd > 6 && (
        <polygon
          points={`${x0 + bw + 2},${y0 + bh * 0.45} ${x0 + bw + bd - 2},${y0 + bh * 0.45 - bd * 0.6} ${x0 + bw + bd - 2},${y0 + bh - bd * 0.6 - 4} ${x0 + bw + 2},${y0 + bh - 4}`}
          fill={fill}
          stroke={stitch}
          strokeWidth="1.5"
          strokeDasharray={dashed}
        />
      )}

      {/* body */}
      <rect x={x0} y={y0} width={bw} height={bh} rx={r.style.slug === "downtown-tote" ? 14 : 3} fill={fill} stroke={ink} strokeWidth="1.5" />
      {/* seam stitching */}
      <rect
        x={x0 + 5}
        y={y0 + 5}
        width={bw - 10}
        height={bh - 10}
        rx={r.style.slug === "downtown-tote" ? 10 : 2}
        fill="none"
        stroke={stitch}
        strokeWidth={build.stitchId === "piping" || build.stitchId === "binding" ? 3 : 1.25}
        strokeDasharray={dashed}
        opacity="0.9"
      />
      {/* strap attachment stitching */}
      {[x0 + bw * 0.25, x0 + bw * 0.75].map((sx) => (
        <rect key={sx} x={sx - strapW / 2} y={y0 + 6} width={strapW} height={Math.min(bh * 0.2, 30)} fill="none" stroke={stitch} strokeWidth="1.25" strokeDasharray={dashed} />
      ))}

      {/* front pocket */}
      {hasFrontPocket && (
        <rect
          x={x0 + bw * 0.2}
          y={y0 + bh * 0.42}
          width={bw * 0.6}
          height={bh * 0.42}
          fill={fill}
          stroke={stitch}
          strokeWidth="1.5"
          strokeDasharray={dashed}
        />
      )}

      {/* grab handle */}
      {build.handleAddOnIds.includes("grab-handle") && (
        <path
          d={`M ${x0 + bw * 0.42} ${y0 + 2} a ${bw * 0.08} 14 0 0 1 ${bw * 0.16} 0`}
          fill="none"
          stroke={strapColor === fill ? ink : strapColor}
          strokeWidth={Math.max(5, strapW * 0.7)}
          strokeLinecap="round"
        />
      )}

      {/* closure */}
      {build.closureId === "zipper" && (
        <line x1={x0 + 8} y1={y0 + 3} x2={x0 + bw - 8} y2={y0 + 3} stroke={ink} strokeWidth="3" strokeDasharray="3 2" />
      )}
      {build.closureId === "magnet" && <circle cx={x0 + bw / 2} cy={y0 + 12} r={4} fill={ink} />}

      {/* decoration placeholder */}
      <rect
        x={x0 + bw / 2 - Math.min(bw, 90) * 0.35}
        y={y0 + bh * 0.22}
        width={Math.min(bw, 90) * 0.7}
        height={Math.min(bh, 60) * 0.3}
        rx="3"
        fill={ink}
        opacity="0.75"
      />

      {/* dimension labels */}
      <text x={x0 + bw / 2} y={y0 + bh + 26} textAnchor="middle" fontSize="11" fill="#262626" opacity="0.6">
        {w}&quot; W
      </text>
      <text x={x0 - 10} y={y0 + bh / 2} textAnchor="end" fontSize="11" fill="#262626" opacity="0.6">
        {h}&quot; H
      </text>
      {d > 0 && (
        <text x={x0 + bw + bd + 6} y={y0 + bh / 2} fontSize="11" fill="#262626" opacity="0.6">
          {d}&quot; D
        </text>
      )}
    </svg>
  );
}

function darken(hex: string, amount: number) {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  if (Number.isNaN(n)) return "#262626";
  const f = (c: number) => Math.max(0, Math.round(c * (1 - amount)));
  const r = f((n >> 16) & 255);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
