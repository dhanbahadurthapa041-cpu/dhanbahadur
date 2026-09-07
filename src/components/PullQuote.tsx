import React from "react";
import type { Lang } from "@/lib/i18n";

export interface PullQuoteProps {
  quote?: string;
  author?: string;
  role?: string;
  cite?: string;
  lang?: Lang;
  className?: string;
  isDuplicate?: boolean;
  todo?: boolean;
  todoNote?: string;
}

/**
 * Editorial PullQuote component adhering strictly to PhaseA2-pullquote-statsrow-brief.md:
 * - Purely typographic: no bg-*, no rounded, no shadow, no giant quote icon cliche.
 * - Voice comes from size + measure + brass rules (linear gradient ::before/::after in CSS).
 * - 28px mobile -> 34px tablet -> 40px desktop (fluid clamp via --text-pullquote).
 * - Weight: 400 regular, normal style. Fraunces display (EN), Noto Sans Devanagari (NE).
 * - Leading: 1.25 for EN; 1.55-1.6 for NE (+25% room for matras).
 * - Tracking: -0.01em Latin only; strictly 0 for Devanagari.
 * - Attribution: semantic figcaption with em-dash, neutral span for author (WHATWG cite rule),
 *   small-caps / letterspaced subtitle on EN; unspaced on NE.
 * - A11y: WCAG lang attribute; role="doc-pullquote" and aria-hidden="true" on verbatim-duplicate quotes.
 * - Placeholder TODO pattern: quiet editorial furniture if quote is empty or todo=true.
 */
export default function PullQuote({
  quote,
  author,
  role,
  cite,
  lang = "en",
  className = "",
  isDuplicate = false,
  todo = false,
  todoNote,
}: PullQuoteProps) {
  const isNe = lang === "ne";
  const isTodo = todo || !quote || quote.trim().length === 0;

  if (isTodo) {
    return (
      <figure
        className={`pullquote is-todo mx-auto text-center ${className}`}
        data-todo="true"
        lang={lang}
        aria-hidden="true"
      >
        <span className="todo-eyebrow">
          {isNe ? "उद्धरण · तय हुन बाँकी" : "Pull-quote · TBD"}
        </span>
        <p className="todo-note">
          {todoNote ??
            (isNe
              ? "यस निबन्धबाट ≤२५ शब्द चयन गर्न बाँकी।"
              : "Father to select ≤25 words from this essay.")}
        </p>
      </figure>
    );
  }

  return (
    <figure
      lang={lang}
      className={`pullquote not-prose relative mx-auto text-center ${className}`}
    >
      <blockquote
        cite={cite}
        role={isDuplicate ? "doc-pullquote" : undefined}
        aria-hidden={isDuplicate ? true : undefined}
      >
        <p>{author ? `“${quote}”` : quote}</p>
      </blockquote>

      {(author || role) && (
        <figcaption>
          — {author && <span className="author">{author}</span>}
          {role && <span className="role">{author ? `, ${role}` : role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
