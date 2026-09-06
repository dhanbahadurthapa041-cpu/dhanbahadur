"use client";

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
  return (
    <Reveal
      as="li"
      index={index}
      className="flex items-center justify-between gap-4 rounded-xl border border-ink/15 bg-[#fffdf8] p-4 dark:border-cream/15 dark:bg-cream/[0.04]"
    >
      <div className="min-w-0">
        <p className="font-medium">{title}</p>
        {note && <p className="text-xs text-ink/60 dark:text-cream/60">{note}</p>}
        {(item.format || item.size) && (
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            {item.format && (
              <span className="rounded-full bg-brass/25 px-2 py-0.5 font-semibold uppercase tracking-wide text-ink dark:bg-brass/20 dark:text-cream">
                {item.format}
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
          className="shrink-0 rounded-full bg-pine px-4 py-1.5 text-sm font-medium text-white transition hover:bg-pine-deep"
        >
          {t.download}
        </a>
      ) : (
        <span className="shrink-0 rounded-full bg-ink/10 px-4 py-1.5 text-sm text-ink/60 dark:bg-cream/10 dark:text-cream/60">
          {t.comingSoon}
        </span>
      )}
    </Reveal>
  );
}
