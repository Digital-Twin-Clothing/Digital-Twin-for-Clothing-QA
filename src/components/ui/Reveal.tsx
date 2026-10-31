"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cx, delay as d } from "@/lib/motion";

type RevealProps = {
  as?: ElementType;
  /** Delay in seconds before this element fades up. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ as: Tag = "div", delay = 0, className, style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <Tag ref={ref} className={cx("reveal", inView && "in", className)} style={{ ...d(delay), ...style }}>
      {children}
    </Tag>
  );
}

type RevealLinesProps = {
  as?: ElementType;
  lines: ReactNode[];
  /** Seconds between each line. */
  stagger?: number;
  baseDelay?: number;
  className?: string;
};

/** Each line slides up from behind a mask, one after another. */
export function RevealLines({ as: Tag = "h2", lines, stagger = 0.12, baseDelay = 0, className }: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <Tag ref={ref} className={cx(inView && "in", className)}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span style={d(baseDelay + i * stagger)}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
