"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SCHOOL_URL, FACEBOOK_URL } from "@/lib/site";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const link = "hover:text-emerald-700 dark:hover:text-emerald-300";
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="font-bold">
          {lang === "ne" ? "धन बहादुर थापा" : "D. B. Thapa"}
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <Link className={link} href="/">{t.navHome}</Link>
          <Link className={link} href="/pub">{t.navPub}</Link>
          <Link className={link} href="/writing">{t.navWriting}</Link>
          <Link className={link} href="/grammar">{t.navGrammar}</Link>
          <Link className={link} href="/class-10">{t.navClass10}</Link>
          <Link className={link} href="/class-12">{t.navClass12}</Link>
          <Link className={link} href="/about">{t.navAbout}</Link>
          <a className={link} href={SCHOOL_URL} target="_blank" rel="noreferrer">
            {t.navSchool}
          </a>
          <a className={link} href={FACEBOOK_URL} target="_blank" rel="noreferrer">
            {t.navFacebook}
          </a>
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
