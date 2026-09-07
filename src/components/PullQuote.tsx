import React from "react";
import type { Lang } from "@/lib/i18n";

interface PullQuoteProps {
  quote: string;
  author?: string;
  role?: string;
  lang?: Lang;
  className?: string;
}

/**
 * Editorial PullQuote component adhering strictly to Implementationplan.md §2:
 * - Purely typographic, no container / callout card
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
  className = "",
}: PullQuoteProps) {
  const isNe = lang === "ne";

  return (
    <figure
      lang={lang}
      className={`relative mx-auto max-w-4xl text-center py-8 sm:py-12 px-4 sm:px-8 ${className}`}
    >
      {/* Decorative brass accent eyebrow bar */}
      <div aria-hidden="true" className="mx-auto mb-6 sm:mb-8 h-0.5 w-12 sm:w-16 bg-brass" />

      <blockquote
        className={`font-display font-normal text-balance text-[28px] sm:text-[34px] md:text-[40px] ${
          isNe
            ? "leading-[1.55] tracking-normal"
            : "leading-[1.25] tracking-[-0.01em]"
        }`}
      >
        “{quote}”
      </blockquote>

      {(author || role) && (
        <figcaption className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-1.5">
          {author && (
            <cite className="not-italic font-display text-[13px] font-medium tracking-wide text-brass dark:text-brass-dark">
              — {author}
            </cite>
          )}
          {role && (
            <span className="text-xs uppercase tracking-[0.14em] opacity-75">
              {role}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
