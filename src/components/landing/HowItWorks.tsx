"use client";

import { useEffect, useRef, useState } from "react";
import { Contours, Meridians } from "@/components/figure/BodyDefs";
import { cx, delay } from "@/lib/motion";

const STEPS = [
  {
    tag: "01 — CAPTURE",
    title: "Four guided photos",
    body: "A silhouette overlay and a self‑timer help you hold each pose. Blurry or cropped shots are caught on your device before anything uploads.",
  },
  {
    tag: "02 — DETECT",
    title: "Pose & silhouette",
    body: "Pose landmarks and a clean body mask are extracted from every angle, so the background never affects your shape.",
  },
  {
    tag: "03 — RECONSTRUCT",
    title: "Your 3D twin",
    body: "A parametric body is fitted to all four views and scaled to your real height, giving you measurements you can trust.",
  },
  {
    tag: "04 — TRY ON",
    title: "Dress it, turn it",
    body: "Garments rigged to the same skeleton drape onto your twin. Spin it 360° and switch sizes instantly.",
  },
];

const JOINTS: Array<[number, number, number]> = [
  // [x, y, pulse delay]
  [100, 52, 0],
  [70, 108, 0.1], [130, 108, 0.1],
  [56, 170, 0.2], [144, 170, 0.2],
  [52, 250, 0.3], [148, 250, 0.3],
  [76, 228, 0.4], [124, 228, 0.4],
  [84, 300, 0.5], [116, 300, 0.5],
  [84, 376, 0.6], [116, 376, 0.6],
];

const SKELETON =
  "M100 52 L100 100 M70 108 L130 108 M70 108 L56 170 L52 250 M130 108 L144 170 L148 250 M100 100 L100 228 M76 228 L124 228 M76 228 L84 300 L84 376 M124 228 L116 300 L116 376";

function Chip({ children }: { children: string }) {
  return (
    <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-bg px-3.5 py-2 text-[13px]">
      {children}
    </div>
  );
}

const PHOTOS = [
  { label: "Front", side: false, fill: undefined },
  { label: "Back", side: false, fill: "#e9e6df" },
  { label: "Side", side: true, fill: undefined },
  { label: "T‑pose", side: true, fill: undefined, tpose: true },
];

function CaptureScene() {
  return (
    <div className="grid grid-cols-[repeat(2,minmax(0,90px))] gap-3.5 md:grid-cols-[repeat(2,minmax(0,150px))]">
      {PHOTOS.map((p, i) => (
        <div
          key={p.label}
          className="photo flex aspect-[3/4] flex-col items-center justify-between rounded-[14px] border border-line bg-bg px-2.5 py-3"
          style={delay(0.05 + i * 0.1)}
        >
          <svg viewBox="0 0 200 400" className="h-[72%]" style={p.fill ? ({ "--ff": p.fill } as React.CSSProperties) : undefined}>
            <use href="#body" transform={p.side ? "translate(50,0) scale(.5,1)" : undefined} />
            {p.tpose && <circle cx={100} cy={110} r={9} fill="#141414" />}
          </svg>
          <small className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-mute">
            <b className="font-medium text-ink">✓</b>
            {p.label}
          </small>
        </div>
      ))}
    </div>
  );
}

function DetectScene() {
  return (
    <>
      <svg viewBox="0 0 200 400" style={{ "--ff": "transparent", "--fs": "#d9d6ce" } as React.CSSProperties}>
        <use href="#body" />
        <path className="bone" pathLength={1} d={SKELETON} stroke="#141414" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        <g fill="#141414">
          {JOINTS.map(([x, y, d]) => (
            <circle key={`${x}-${y}`} className="joint" style={delay(d)} cx={x} cy={y} r={x === 100 ? 4 : 3.5} />
          ))}
        </g>
      </svg>
      <Chip>33 landmarks · body mask</Chip>
    </>
  );
}

function ReconstructScene() {
  return (
    <>
      <svg viewBox="0 0 200 400">
        <use href="#body" />
        <g clipPath="url(#bodyClip)">
          <Contours stroke="#141414" opacity={0.35} />
          <Meridians />
        </g>
      </svg>
      <Chip>SMPL‑X fitted · scaled to 178 cm</Chip>
    </>
  );
}

function TryOnScene() {
  return (
    <>
      <svg viewBox="0 0 200 400">
        <use href="#body" />
        <use href="#shirtPath" fill="#141414" />
      </svg>
      <Chip>Oxford shirt · Size M · Good fit</Chip>
    </>
  );
}

const SCENES = [CaptureScene, DetectScene, ReconstructScene, TryOnScene];

/**
 * Scrollytelling: the stage on the left stays pinned while the steps on the
 * right scroll past. The step crossing the middle of the viewport is active.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="grid gap-[5vw] px-[var(--pad)] pb-[120px] pt-20 md:grid-cols-2 md:pt-[120px]">
      <div className="stage overflow-hidden rounded-3xl border border-line bg-card">
        <div className="absolute left-6 top-5 z-[2] flex gap-1.5 text-[15px] text-mute">
          <span className="inline-block h-[1.4em] overflow-hidden text-ink">
            <span key={active} className="roll-in">
              0{active + 1}
            </span>
          </span>
          <span>/ 0{STEPS.length}</span>
        </div>
        {SCENES.map((Scene, i) => (
          <div key={i} className={cx("scene", active === i && "on")} aria-hidden={active !== i}>
            <Scene />
          </div>
        ))}
      </div>

      <div>
        {STEPS.map((s, i) => (
          <div
            key={s.tag}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-step={i}
            className={cx("step flex min-h-[60vh] flex-col justify-center md:min-h-[80vh]", active === i && "active")}
          >
            <div className="text-[13px] tracking-[0.1em] text-mute">{s.tag}</div>
            <h3 className="mb-4 mt-3 font-serif text-[clamp(36px,4vw,56px)] font-normal leading-none">{s.title}</h3>
            <p className="max-w-[400px] text-mute">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
