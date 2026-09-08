"use client";

import { useId, useState } from "react";
import { useLang } from "@/lib/lang";
import Reveal from "./Reveal";

export interface DownloadRowItem {
  titleEn: string;
  titleNe: string;
  file: string | null;
  noteEn?: string;
  noteNe?: string;
  /** Language-neutral format label for the badge pill, e.g. "PDF". */
  format?: string;
  /** Pre-formatted file size string, e.g. "2.4 MB". Rendered as-is. */
  size?: string;
}

export default function DownloadRow({ item, index }: { item: DownloadRowItem; index?: number }) {
  const { lang, t } = useLang();
  const title = lang === "ne" ? item.titleNe : item.titleEn;
  const note = lang === "ne" ? item.noteNe : item.noteEn;
  const tipBase = useId().replace(/:/g, "");
  const fmtTipId = `tip-fmt-${tipBase}`;
  const soonTipId = `tip-soon-${tipBase}`;
  // Escape dismisses the bubble but keeps focus on the trigger (APG pattern).
  const [tipHidden, setTipHidden] = useState(false);
  const dismissTip = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setTipHidden(true);
  };
  const resetTip = () => setTipHidden(false);
  return (
    <Reveal as="li" index={index} className="cq-row dl-row-scope">
      <div className="dl-row row-inner relative flex flex-col gap-3 rounded-2xl sm:flex-row sm:items-center sm:justify-between border border-brass/25 bg-surface-subtle p-4 sm:p-5 shadow-[0_1px_2px_rgba(47,42,37,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-[0_14px_28px_-16px_rgba(47,42,37,0.22)] focus-within:border-pine/60 motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:shadow-none dark:hover:shadow-none dark:focus-within:border-mint/60 dark:ring-1 dark:ring-white/10">
      <div className="min-w-0">
        <p className="font-medium">{title}</p>
        {note && <p className="text-xs text-ink/60 dark:text-cream/60">{note}</p>}
        {(item.format || item.size) && (
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            {item.format && (
              <span className="dl-tip-wrap relative inline-flex">
                <span
                  className={`dl-pill badge-leak-guard rounded-full bg-brass/20 px-2 py-0.5 text-[11px] font-semibold ${lang === "ne" ? "tracking-normal" : "uppercase tracking-[0.08em]"} text-ink dark:bg-brass/15 dark:text-cream`}
                  tabIndex={0}
                  aria-describedby={fmtTipId}
                  onKeyDown={dismissTip}
                  onBlur={resetTip}
                >
                  {item.format}
                </span>
                <span className={`dl-tip${tipHidden ? " hidden" : ""}`} role="tooltip" id={fmtTipId}>
                  {t.dlFormatTip}
                </span>
              </span>
            )}
            {item.size && (
              <span className="font-mono tabular-nums text-ink/60 dark:text-cream/60">{item.size}</span>
            )}
          </p>
        )}
      </div>
      {item.file ? (
        <a
          href={`/downloads/${item.file}`}
          download
          className="shrink-0 inline-flex min-h-[44px] items-center rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white transition motion-reduce:transition-none hover:bg-pine-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:active:translate-none motion-reduce:transition-none dark:bg-mint dark:text-choc dark:focus-visible:outline-mint"
        >
          {t.download}
        </a>
      ) : (
        <span className="relative inline-flex shrink-0">
          <span
            aria-disabled="true"
            className="dl-pill inline-flex min-h-[44px] items-center rounded-full border border-dashed border-brass/40 bg-ink/5 px-4 py-2 text-sm text-ink/60 select-none dark:border-cream/20 dark:bg-cream/5 dark:text-cream/60"
            tabIndex={0}
            aria-describedby={soonTipId}
            onKeyDown={dismissTip}
            onBlur={resetTip}
          >
            {t.comingSoon}
          </span>
          <span className={`dl-tip${tipHidden ? " hidden" : ""}`} role="tooltip" id={soonTipId}>
            {t.comingSoonTip}
          </span>
        </span>
      )}
      </div>
    </Reveal>
  );
}
