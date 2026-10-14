"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { FIT_BY_SIZE, REGIONS, SIZES, type Size } from "@/lib/fit-data";
import { cx } from "@/lib/motion";

const BUTTON_W = 62; // px — matches w-[62px] below, used to slide the pill

/** Size switcher with a sliding pill, springy fit meters and a resizing shirt. */
export function FitPanel() {
  const [size, setSize] = useState<Size>("M");
  const fit = FIT_BY_SIZE[size];
  const index = SIZES.indexOf(size);

  return (
    <section id="fit" className="grid items-center gap-[5vw] border-t border-line px-[var(--pad)] py-[120px] md:grid-cols-[0.8fr_1.2fr]">
      <Reveal className="flex justify-center rounded-3xl border border-line bg-card py-10">
        <svg viewBox="0 0 200 400" className="h-[420px] w-auto" role="img" aria-label={`Avatar wearing size ${size}`}>
          <use href="#body" />
          <use
            href="#shirtPath"
            className="shirt"
            fill="#141414"
            style={{ transform: `scale(${fit.scale}, ${1 + (fit.scale - 1) * 0.4})` }}
          />
        </svg>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="eyebrow">Fit assessment</p>
        <h2 className="mb-[18px] mt-3.5 font-serif text-[clamp(40px,5vw,72px)] font-normal leading-none tracking-[-0.01em]">
          Know your size
          <br />
          before checkout.
        </h2>

        {/* Segmented size control */}
        <div role="radiogroup" aria-label="Size" className="relative mb-9 mt-[18px] inline-flex rounded-full border border-line bg-card p-1">
          <div
            className="pill absolute left-1 top-1 h-[38px] w-[62px] rounded-full bg-ink"
            style={{ transform: `translateX(${index * BUTTON_W}px)` }}
          />
          {SIZES.map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={s === size}
              onClick={() => setSize(s)}
              className={cx(
                "relative z-[1] h-[38px] w-[62px] cursor-pointer rounded-full text-sm font-medium transition-colors duration-300",
                s === size ? "text-bg" : "text-mute hover:text-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Fit meters: -1 tight … 0 perfect … +1 loose */}
        {REGIONS.map((region, i) => {
          const r = fit.regions[region];
          return (
            <div key={region} className="mb-[26px] max-w-[520px]">
              <div className="mb-2.5 flex justify-between text-sm">
                <span>{region}</span>
                <span className="text-mute">{r.ease} cm ease</span>
              </div>
              <div className="relative h-4">
                <div className="absolute inset-x-0 top-[7px] h-px bg-line" />
                <div className="absolute left-[38%] top-1.5 h-[3px] w-[24%] bg-ink" />
                <div
                  className="fit-dot absolute top-px -ml-[7px] h-3.5 w-3.5 rounded-full border-2 border-ink bg-bg"
                  style={{ left: `calc(50% + ${r.position * 45}%)` }}
                />
              </div>
              {i === REGIONS.length - 1 && (
                <div className="mt-1.5 flex justify-between text-[11px] uppercase tracking-[0.1em] text-mute">
                  <span>Tight</span>
                  <span>Good</span>
                  <span>Loose</span>
                </div>
              )}
            </div>
          );
        })}

        <div className="mt-[34px] flex items-center gap-3.5 border-t border-line pt-[22px]" aria-live="polite">
          <span key={size} className="fade-up font-serif text-[30px]">
            {fit.verdict}
          </span>
          <span
            className={cx(
              "rounded-full border border-ink px-2.5 py-1 text-xs transition-opacity duration-300",
              fit.recommended ? "opacity-100" : "opacity-0",
            )}
          >
            Recommended
          </span>
        </div>
      </Reveal>
    </section>
  );
}
