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
    <li className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div>
        <p className="font-medium">{title}</p>
        {note && <p className="text-xs text-zinc-500">{note}</p>}
      </div>
      {item.file ? (
        <a
          href={`/downloads/${item.file}`}
          download
          className="shrink-0 rounded bg-emerald-700 px-3 py-1.5 text-sm text-white hover:bg-emerald-800"
        >
          {t.download}
        </a>
      ) : (
        <span className="shrink-0 rounded bg-zinc-200 px-3 py-1.5 text-sm text-zinc-500 dark:bg-zinc-800">
          {t.comingSoon}
        </span>
      )}
    </li>
  );
}
