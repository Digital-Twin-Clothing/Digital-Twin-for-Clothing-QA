import type { CSSProperties } from "react";

/** Sets the `--d` CSS variable used as a transition/animation delay (seconds). */
export const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** Joins class names, skipping falsy values. */
export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
