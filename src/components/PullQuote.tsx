import React from "react";
import type { Lang } from "@/lib/i18n";

interface PullQuoteProps {
  quote: string;
  author?: string;
  role?: string;
  lang?: Lang;
  variant?: "pine" | "paper" | "subtle";
  className?: string;
}

/**
 * Editorial PullQuote component adhering strictly to Implementationplan.md §2:
 * - 28px mobile -> 34px tablet -> 40px desktop
 * - Weight: Regular (never bold)
 * - Tracking: -0.01em Latin only; strictly 0 for Devanagari
 * - Leading: 1.25 for English; 1.55 for Nepali (+25% room for matras)
 * - No fake italics on Devanagari
 * - Attribution with em dash and small-caps / letterspaced subtitle
 */
export default function PullQuote({
  quote,
  author,
  role,
  lang = "en",
  variant = "paper",
  className = "",
}: PullQuoteProps) {
  const isNe = lang === "ne";

  const containerStyles = {
    pine: "bg-pine text-cream dark:bg-pine-dark dark:text-cream py-14 sm:py-20 px-6 sm:px-12 rounded-2xl shadow-[0_12px_36px_-16px_rgba(15,106,75,0.4)]",
    paper: "bg-transparent text-ink dark:text-cream py-10 sm:py-14 px-4 sm:px-8",
    subtle:
      "bg-surface-subtle border border-brass/30 dark:bg-choc-elevated dark:border-cream/15 py-10 sm:py-14 px-6 sm:px-10 rounded-2xl",
  }[variant];

  const ruleColor = {
    pine: "bg-brass",
    paper: "bg-brass",
    subtle: "bg-brass/70",
  }[variant];

  return (
    <figure
      lang={lang}
      className={`relative mx-auto my-6 max-w-4xl text-center ${containerStyles} ${className}`}
    >
      {/* Decorative brass accent eyebrow bar */}
      <div aria-hidden="true" className={`mx-auto mb-6 h-0.5 w-12 sm:w-16 ${ruleColor}`} />

      <blockquote
        className={`font-display font-normal text-balance text-2xl sm:text-3xl md:text-4xl ${
          isNe
            ? "leading-[1.55] tracking-normal"
            : "leading-[1.25] tracking-[-0.01em]"
        }`}
      >
        “{quote}”
      </blockquote>

      {(author || role) && (
        <figcaption className="mt-7 flex flex-col items-center justify-center gap-1">
          {author && (
            <cite className="not-italic font-display text-sm sm:text-base font-medium tracking-wide text-brass dark:text-brass-dark">
              — {author}
            </cite>
          )}
          {role && (
            <span className="text-xs uppercase tracking-[0.14em] text-ink/70 dark:text-cream/70">
              {role}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
