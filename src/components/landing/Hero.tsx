"use client";

import { useEffect, useState, type PointerEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Contours } from "@/components/figure/BodyDefs";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cx, delay } from "@/lib/motion";

const HEADLINE = ["Four photos.", "One twin.", "Every fit."];

const STATS = [
  { value: 4, prefix: "", suffix: "", label: "photos" },
  { value: 90, prefix: "~", suffix: "s", label: "to reconstruct" },
  { value: 10475, prefix: "", suffix: "", label: "mesh vertices" },
];

const MEASUREMENTS = [
  { label: "CHEST", value: "96.4 cm", y: 140, x1: 198, delay: 1.3 },
  { label: "WAIST", value: "81.0 cm", y: 196, x1: 194, delay: 1.45 },
  { label: "HIP", value: "98.2 cm", y: 236, x1: 198, delay: 1.6 },
];

function Stat({ value, prefix, suffix, label, start }: (typeof STATS)[number] & { start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div>
      <b className="block font-serif text-[34px] font-normal">
        {prefix}
        {n.toLocaleString("en-US")}
        {suffix}
      </b>
      <small className="text-[13px] text-mute">{label}</small>
    </div>
  );
}

export function Hero() {
  const [ready, setReady] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  // Entrance animation starts right after first paint.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const reveal = cx("reveal", ready && "in");

  return (
    <header
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className={cx(
        "grid min-h-screen items-center gap-[4vw] px-[var(--pad)] pb-10 pt-[110px] md:grid-cols-[1.1fr_0.9fr]",
        ready && "in",
      )}
    >
      {/* Copy */}
      <div>
        <p className={cx("eyebrow", reveal)} style={delay(0.1)}>
          Virtual fitting room
        </p>
        <h1 className="mb-7 mt-[18px] font-serif text-[clamp(52px,8.4vw,128px)] font-normal leading-[0.92] tracking-[-0.02em]">
          {HEADLINE.map((line, i) => (
            <span className="line" key={line}>
              <span style={delay(0.15 + i * 0.12)}>
                {i === HEADLINE.length - 1 ? <em className="text-mute">{line}</em> : line}
              </span>
            </span>
          ))}
        </h1>
        <p className={cx("max-w-[440px] text-[17px] text-mute", reveal)} style={delay(0.6)}>
          Upload front, back, side and T‑pose photos. We build a 3D avatar with your real proportions and
          show how each garment fits before you order.
        </p>
        <div className={cx("mb-12 mt-8 flex flex-wrap gap-3", reveal)} style={delay(0.7)}>
          <Button href="#cta" variant="primary" arrow>
            Create my avatar
          </Button>
          <Button href="#how">See how it works</Button>
        </div>
        <div className={cx("flex max-w-[520px] gap-6 border-t border-line pt-[22px] md:gap-11", reveal)} style={delay(0.8)}>
          {STATS.map((s) => (
            <Stat key={s.label} {...s} start={ready} />
          ))}
        </div>
      </div>

      {/* Avatar scan illustration with mouse-parallax tilt */}
      <div className="flex justify-center [perspective:1000px]">
        <div
          className="transition-transform duration-[800ms] ease-smooth will-change-transform"
          style={{ transform: `rotateY(${tilt.x * 14}deg) rotateX(${-tilt.y * 8}deg)` }}
        >
          <svg
            viewBox="0 0 320 430"
            className="float h-[52vh] w-auto overflow-visible md:h-[min(72vh,580px)]"
            role="img"
            aria-label="3D avatar scan with body measurements"
          >
            {/* Height ruler */}
            <g className="tag" style={delay(1.1)} stroke="#141414" strokeWidth={1} fill="#6e6c66" fontSize={10} fontFamily="Inter">
              <line className="ruler" x1={28} y1={35} x2={28} y2={390} />
              <line x1={22} y1={35} x2={34} y2={35} />
              <line x1={22} y1={390} x2={34} y2={390} />
              <text x={20} y={215} transform="rotate(-90 20 215)" textAnchor="middle" stroke="none">
                178 CM
              </text>
            </g>

            {/* Turntable */}
            <ellipse cx={160} cy={398} rx={96} ry={13} fill="none" stroke="#d9d6ce" />
            <circle r={4} fill="#141414">
              <animateMotion dur="7s" repeatCount="indefinite" path="M64 398 a96 13 0 1 0 192 0 a96 13 0 1 0 -192 0" />
            </circle>

            {/* Body + scan line, clipped to the silhouette */}
            <g transform="translate(60,10)">
              <use href="#body" width={200} height={400} />
              <g clipPath="url(#bodyClip)">
                <Contours />
                <rect className="scan" x={0} y={0} width={200} height={1.5} fill="#141414" />
              </g>
            </g>

            {/* Measurement call-outs */}
            <g fontFamily="Inter" fontSize={10}>
              {MEASUREMENTS.map((m) => (
                <g key={m.label} className="tag" style={delay(m.delay)}>
                  <line x1={m.x1} y1={m.y} x2={252} y2={m.y} stroke="#141414" />
                  <text x={258} y={m.y - 3} fill="#6e6c66">
                    {m.label}
                  </text>
                  <text x={258} y={m.y + 10} fill="#141414">
                    {m.value}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
}
