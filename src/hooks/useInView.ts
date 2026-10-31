"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first time the element appears (default true). */
  once?: boolean;
};

/** Returns true once the referenced element scrolls into view. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.15, rootMargin, once = true }: Options = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
