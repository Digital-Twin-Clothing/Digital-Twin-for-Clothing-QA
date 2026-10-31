/**
 * Stylised avatar drawn once as SVG <symbol>/<clipPath> and reused
 * everywhere with <use href="#body" />.
 * Placeholder art: swap for the real React Three Fiber viewer later.
 *
 * Colours can be overridden per instance with CSS variables:
 *   --ff (fill), --fs (stroke), --sw (stroke width)
 */

const LIMBS = [
  "M92 76 L92 96 L108 96 L108 76 Z", // neck
  "M66 104 Q100 90 134 104 L130 180 Q128 205 136 228 L64 228 Q72 205 70 180 Z", // torso
  "M66 106 C56 120 52 150 50 190 C49 215 50 240 52 256 L60 256 C60 238 60 214 62 192 C64 160 68 134 72 120 Z", // left arm
  "M134 106 C144 120 148 150 150 190 C151 215 150 240 148 256 L140 256 C140 238 140 214 138 192 C136 160 132 134 128 120 Z", // right arm
  "M64 228 L98 228 L94 300 L92 380 L76 380 L74 300 Z", // left leg
  "M102 228 L136 228 L126 300 L124 380 L108 380 L106 300 Z", // right leg
];

export const SHIRT_PATH =
  "M62 102 Q100 90 138 102 L156 150 L140 158 L132 136 L132 214 L68 214 L68 136 L60 158 L44 150 Z";

function BodyShapes() {
  return (
    <>
      <ellipse cx={100} cy={52} rx={22} ry={27} />
      {LIMBS.map((d) => (
        <path key={d} d={d} />
      ))}
    </>
  );
}

export function BodyDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="body" viewBox="0 0 200 400">
          <g
            style={{
              fill: "var(--ff, #faf9f6)",
              stroke: "var(--fs, #141414)",
              strokeWidth: "var(--sw, 1.2)",
              strokeLinejoin: "round",
            }}
          >
            <BodyShapes />
          </g>
        </symbol>
        <clipPath id="bodyClip">
          <BodyShapes />
        </clipPath>
        <path id="shirtPath" d={SHIRT_PATH} />
      </defs>
    </svg>
  );
}

/** Horizontal contour rings — gives the body a scanned / mesh look. */
export function Contours({ stroke = "#d9d6ce", opacity = 1 }: { stroke?: string; opacity?: number }) {
  const ys: number[] = [];
  for (let y = 96; y <= 392; y += 13) ys.push(y);
  return (
    <g stroke={stroke} strokeOpacity={opacity} fill="none">
      {ys.map((y) => (
        <ellipse key={y} cx={100} cy={y} rx={62} ry={5} />
      ))}
    </g>
  );
}

/** Vertical lines that, with Contours, form a wireframe grid. */
export function Meridians({ opacity = 0.18 }: { opacity?: number }) {
  const xs: number[] = [];
  for (let x = 44; x <= 156; x += 9) xs.push(x);
  return (
    <g stroke="#141414" strokeOpacity={opacity}>
      {xs.map((x) => (
        <line key={x} x1={x} y1={20} x2={x} y2={390} />
      ))}
    </g>
  );
}
