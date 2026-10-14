"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cx } from "@/lib/motion";

type ButtonProps = {
  children: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  arrow?: boolean;
  /** Button drifts toward the cursor while hovered. */
  magnetic?: boolean;
  className?: string;
};

/**
 * Pill button with three micro-interactions:
 * label roll on hover, press scale, and a ripple from the click point.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "ghost",
  size = "md",
  arrow = false,
  magnetic = false,
  className,
}: ButtonProps) {
  const reduced = useReducedMotion();

  const ripple = (e: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const s = Math.max(r.width, r.height) * 2.2;
    const span = document.createElement("span");
    span.className = "ripple";
    Object.assign(span.style, {
      width: `${s}px`,
      height: `${s}px`,
      left: `${e.clientX - r.left - s / 2}px`,
      top: `${e.clientY - r.top - s / 2}px`,
    });
    el.appendChild(span);
    window.setTimeout(() => span.remove(), 700);
  };

  const pull = (e: PointerEvent<HTMLElement>) => {
    if (!magnetic || reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const release = (e: PointerEvent<HTMLElement>) => {
    if (magnetic) e.currentTarget.style.transform = "";
  };

  const classes = cx(
    "btn",
    variant === "primary" && "btn-primary",
    size === "sm" && "btn-sm",
    magnetic && "magnetic",
    className,
  );

  const content = (
    <>
      <span className="lbl" data-t={children}>
        <span>{children}</span>
      </span>
      {arrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  const handlers = { onPointerDown: ripple, onPointerMove: pull, onPointerLeave: release };

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={children} {...handlers}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick} aria-label={children} {...handlers}>
      {content}
    </button>
  );
}
