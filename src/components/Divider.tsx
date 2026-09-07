import React from "react";

interface DividerProps {
  variant?: "hairline" | "gradient" | "vignette";
  className?: string;
}

/**
 * Editorial Divider component adhering strictly to PhaseA3-divider-grain-brief.md:
 * - hairline (V1): structural reset border:0, border-top 1px solid var(--color-border)
 * - gradient (V2): thematic brass fade pause, on-pine/dark adapted
 * - vignette (V3): ceremonial centered brass ✦ glyph between capped hairline rules (max 1x per page)
 * All variants are aria-hidden="true" (decorative).
 */
export default function Divider({
  variant = "hairline",
  className = "",
}: DividerProps) {
  if (variant === "gradient") {
    return <div aria-hidden="true" className={`divider-gradient my-8 sm:my-12 w-full ${className}`} />;
  }

  if (variant === "vignette") {
    return (
      <div
        aria-hidden="true"
        className={`divider-vignette my-8 sm:my-14 flex items-center justify-center gap-4 text-brass/70 dark:text-brass-dark/70 ${className}`}
      >
        <span className="h-px flex-1 max-w-[120px] bg-brass/30 dark:bg-brass-dark/30 print:max-w-none print:bg-[#333]" />
        <span className="divider-vignette-ornament text-xs select-none">✦</span>
        <span className="h-px flex-1 max-w-[120px] bg-brass/30 dark:bg-brass-dark/30 print:max-w-none print:bg-[#333]" />
      </div>
    );
  }

  return <hr aria-hidden="true" className={`divider-hairline my-8 sm:my-12 w-full ${className}`} />;
}
