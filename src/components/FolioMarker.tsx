import React from "react";

interface FolioMarkerProps {
  label: string;
  badge?: string;
  className?: string;
}

/**
 * Editorial Folio marker adhering to Implementationplan.md §2C:
 * Small-caps / letterspaced sans furniture (12-13px) that orients the reader,
 * placed distinctly above sections and headers.
 */
export default function FolioMarker({
  label,
  badge,
  className = "",
}: FolioMarkerProps) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-pine dark:text-mint ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-brass/80 dark:bg-brass-dark/80" />
      <span>{label}</span>
      {badge && (
        <span className="rounded-full bg-brass/20 px-2 py-0.5 text-[10px] font-medium tracking-normal text-ink dark:bg-brass/15 dark:text-cream">
          {badge}
        </span>
      )}
    </div>
  );
}
