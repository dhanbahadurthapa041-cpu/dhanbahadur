"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const link = "hover:text-emerald-700 dark:hover:text-emerald-300";
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold">
          {lang === "ne" ? "धन बहादुर थापा" : "D. B. Thapa"}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className={link} href="/">{t.navHome}</Link>
          <Link className={link} href="/about">{t.navAbout}</Link>
          <Link className={link} href="/blog">{t.navBlog}</Link>
          <Link className={link} href="/downloads">{t.navDownloads}</Link>
          <button
            onClick={() => setLang(lang === "ne" ? "en" : "ne")}
            className="rounded border border-zinc-300 px-2 py-0.5 text-xs dark:border-zinc-700"
            aria-label="Switch language / भाषा बदल्नुहोस्"
          >
            {lang === "ne" ? "EN" : "नेपाली"}
          </button>
        </nav>
      </div>
    </header>
  );
}
