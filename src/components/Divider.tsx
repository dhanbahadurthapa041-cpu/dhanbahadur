import React from "react";

interface DividerProps {
  variant?: "hairline" | "gradient" | "vignette";
  className?: string;
}

/**
 * Editorial Divider component adhering to Implementationplan.md §4:
 * - hairline: 1px border with paper-border color
 * - gradient: soft fade with brass tint at center
 * - vignette: ornamental centered brass glyph between soft hairline rules
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
        className={`my-8 sm:my-14 flex items-center justify-center gap-4 text-brass/70 dark:text-brass-dark/70 ${className}`}
      >
        <span className="h-px flex-1 max-w-[120px] bg-brass/30 dark:bg-brass-dark/30" />
        <span className="text-xs select-none">✦</span>
        <span className="h-px flex-1 max-w-[120px] bg-brass/30 dark:bg-brass-dark/30" />
      </div>
    );
  }

  return <hr aria-hidden="true" className={`divider-hairline my-8 sm:my-12 w-full ${className}`} />;
}
