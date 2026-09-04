"use client";

import Link from "next/link";
import { useLang, useTheme } from "@/lib/lang";
import { SCHOOL_URL, FACEBOOK_URL, LOOMA_URL } from "@/lib/site";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const link = "hover:text-emerald-700 dark:hover:text-emerald-300";
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="font-bold">
          {t.brandName}
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
          <a className={link} href={LOOMA_URL} target="_blank" rel="noreferrer">
            {t.navLooma}
          </a>
          <button
            onClick={toggleTheme}
            className="rounded border border-zinc-300 px-2 py-0.5 text-xs dark:border-zinc-700"
            aria-label={t.toggleTheme}
            title={t.toggleTheme}
            suppressHydrationWarning
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setLang(lang === "ne" ? "en" : "ne")}
            className="rounded border border-zinc-300 px-2 py-0.5 text-xs dark:border-zinc-700"
            aria-label={t.switchLang}
            title={t.switchLang}
          >
            {lang === "ne" ? "EN" : "नेपाली"}
          </button>
        </nav>
      </div>
    </header>
  );
}
