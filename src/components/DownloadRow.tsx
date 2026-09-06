"use client";

import { useLang } from "@/lib/lang";

export interface DownloadRowItem {
  titleEn: string;
  titleNe: string;
  file: string | null;
  noteEn?: string;
  noteNe?: string;
}

export default function DownloadRow({ item }: { item: DownloadRowItem }) {
  const { lang, t } = useLang();
  const title = lang === "ne" ? item.titleNe : item.titleEn;
  const note = lang === "ne" ? item.noteNe : item.noteEn;
  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-ink/15 bg-[#fffdf8] p-4 dark:border-cream/15 dark:bg-cream/[0.04]">
      <div>
        <p className="font-medium">{title}</p>
        {note && <p className="text-xs text-ink/60 dark:text-cream/60">{note}</p>}
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
    </li>
  );
}
