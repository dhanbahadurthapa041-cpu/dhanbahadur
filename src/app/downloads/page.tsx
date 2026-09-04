"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { BOOKS, FONTS, type DownloadItem } from "@/lib/downloads";

function Row({ item }: { item: DownloadItem }) {
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
        <a href={`/downloads/${item.file}`} download className="shrink-0 rounded bg-emerald-700 px-3 py-1.5 text-sm text-white hover:bg-emerald-800">
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

export default function Downloads() {
  const { t } = useLang();
  return (
    <div>
      <Link href="/" className="text-sm text-emerald-700 dark:text-emerald-300">{t.backHome}</Link>
      <h1 className="mt-2 text-3xl font-bold">{t.downloadsTitle}</h1>

      <h2 className="mt-8 text-xl font-semibold">{t.booksSection}</h2>
      <ul className="mt-3 space-y-3">
        {BOOKS.map((b) => (
          <Row key={b.titleEn} item={b} />
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold">{t.fontsSection}</h2>
      <ul className="mt-3 space-y-3">
        {FONTS.map((f) => (
          <Row key={f.titleEn} item={f} />
        ))}
      </ul>
    </div>
  );
}
