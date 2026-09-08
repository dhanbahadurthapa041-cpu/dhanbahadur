"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** The target number to count up to (e.g. 30, 10000, 4, 100). */
  end: number;
  /** Suffix to append to the animated number (e.g. "+", " Volumes"). */
  suffix?: string;
  /** Prefix to prepend to the number. */
  prefix?: string;
  /** Authored string for server-side render & reduced-motion fallback. */
  fallbackText: string;
  /** Accessible full description announced to screen readers. */
  accessibleLabel: string;
  /** Whether to format numbers in Devanagari script (०-९). */
  isNepali?: boolean;
  /** Duration in milliseconds (default: 1100ms per Implementationplan.md). */
  duration?: number;
  /** Start delay in milliseconds for staggering sibling counters. */
  delayMs?: number;
}

const DEV_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

function formatNum(n: number, isNepali: boolean): string {
  // en-IN gives South-Asian grouping (1,00,000); identical to en-US below 100k.
  const formatted = n.toLocaleString(isNepali ? "en-IN" : "en-US");
  if (!isNepali) return formatted;
  return formatted.replace(/\d/g, (d) => DEV_DIGITS[Number(d)] ?? d);
}

/**
 * Accessible, jitter-free count-up component.
 * Conforms to Implementationplan.md §3:
 * - Server renders final authored text immediately (no-JS / SEO friendly)
 * - Single-fire IntersectionObserver (threshold: 0.35)
 * - requestAnimationFrame with easeOutCubic (time-based, no frame speedups)
 * - Respects prefers-reduced-motion: reduce
 * - Tabular figures (tabular-nums) to avoid horizontal jitter
 */
export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  fallbackText,
  accessibleLabel,
  isNepali = false,
  duration = 1100,
  delayMs = 0,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>(fallbackText);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If reduced motion is preferred, keep final authored value
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const node = containerRef.current;
    if (!node || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          let startTimestamp: number | null = null;
          const startVal = 0;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp - delayMs;
            if (elapsed < 0) {
              requestAnimationFrame(step);
              return;
            }
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic: 1 - (1 - t)^3
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (end - startVal) * ease);

            setDisplayValue(`${prefix}${formatNum(current, isNepali)}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(fallbackText);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, delayMs, prefix, suffix, fallbackText, isNepali]);

  return (
    <span ref={containerRef} className="tabular-nums">
      <span aria-hidden="true">{displayValue}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {accessibleLabel}
      </span>
    </span>
  );
}
