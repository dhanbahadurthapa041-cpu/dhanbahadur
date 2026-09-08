"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang, useTheme } from "@/lib/lang";
import { SCHOOL_URL, FACEBOOK_URL, LOOMA_URL } from "@/lib/site";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => {
    setOpen(false);
    menuBtnRef.current?.focus();
  };
  // Scrolled cue: subtle shadow + stronger border once the page moves.
  // Visual only (no motion); safe under reduced motion.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "inline-flex min-h-[44px] items-center md:min-h-0 transition-colors motion-reduce:transition-none text-ink/80 hover:text-pine aria-[current=page]:font-semibold aria-[current=page]:text-pine aria-[current=page]:underline aria-[current=page]:decoration-brass aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4 dark:text-cream/80 dark:hover:text-mint dark:aria-[current=page]:text-mint dark:aria-[current=page]:decoration-brass-dark";
  const showFacebook = FACEBOOK_URL.startsWith("http");
  const current = (href: string) =>
    pathname === href ? ({ "aria-current": "page" } as const) : {};
  const close = () => setOpen(false);

  return (
    <header className={`sticky top-0 z-40 border-b bg-paper/92 backdrop-blur-md transition-colors motion-reduce:transition-none dark:bg-choc/92 ${scrolled ? "border-brass/50 shadow-[0_2px_12px_rgba(47,42,37,0.08)] dark:border-cream/20 dark:shadow-none" : "border-brass/30 dark:border-cream/10"}`}>
      <div className="mx-auto max-w-6xl px-4 py-3.5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`brand-mark flex items-center gap-2 font-display text-lg font-semibold ${lang === "en" ? "tracking-tight" : "tracking-normal"} text-maroon transition motion-reduce:transition-none hover:text-pine dark:text-clay dark:hover:text-mint`}
            onClick={close}
            {...current("/")}
          >
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brass ring-1 ring-brass/50 ring-offset-1 ring-offset-paper dark:ring-offset-choc" />
            {t.brandName}
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="icon-tip-btn relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-brass/40 bg-surface-subtle text-xs transition motion-reduce:transition-none hover:border-pine hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:border-cream/20 dark:bg-choc-elevated dark:hover:border-mint dark:hover:text-mint dark:focus-visible:outline-mint"
              aria-label={t.toggleTheme}
              aria-pressed={theme === "dark"}
              aria-describedby="tip-theme"
              title={t.toggleTheme}
              suppressHydrationWarning
            >
              <span className="icon-tip" role="tooltip" id="tip-theme">
                {t.toggleTheme}
              </span>
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
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-brass/40 bg-surface-subtle px-3.5 py-1 text-xs font-semibold tracking-wide transition motion-reduce:transition-none hover:border-pine hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:border-cream/20 dark:bg-choc-elevated dark:hover:border-mint dark:hover:text-mint dark:focus-visible:outline-mint"
              aria-label={t.switchLang}
              title={t.switchLang}
            >
              <span lang={lang === "ne" ? "en" : "ne"}>{lang === "ne" ? "EN" : "नेपाली"}</span>
            </button>

            <button
              ref={menuBtnRef}
              onClick={() => setOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && open) closeMenu();
              }}
              className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-brass/40 bg-surface-subtle px-3.5 text-xs font-medium transition motion-reduce:transition-none hover:border-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine md:hidden dark:border-cream/20 dark:bg-choc-elevated dark:hover:border-mint dark:focus-visible:outline-mint"
              aria-expanded={open}
              aria-controls="primary-nav"
            >
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
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </>
                )}
              </svg>
              <span>{t.navMenu}</span>
            </button>
          </div>
        </div>

        <nav
          id="primary-nav"
          className={`${
            open ? "flex" : "hidden"
          } flex-col gap-2.5 pt-4 text-sm md:flex md:flex-row md:flex-wrap md:items-center md:gap-5 md:pt-3`}
        >
          <Link className={link} href="/" onClick={close} {...current("/")}>
            {t.navHome}
          </Link>
          <Link className={link} href="/pub" onClick={close} {...current("/pub")}>
            {t.navPub}
          </Link>
          <Link className={link} href="/writing" onClick={close} {...current("/writing")}>
            {t.navWriting}
          </Link>
          <Link className={link} href="/grammar" onClick={close} {...current("/grammar")}>
            {t.navGrammar}
          </Link>
          <Link className={link} href="/class-10" onClick={close} {...current("/class-10")}>
            {t.navClass10}
          </Link>
          <Link className={link} href="/class-12" onClick={close} {...current("/class-12")}>
            {t.navClass12}
          </Link>
          <Link className={link} href="/about" onClick={close} {...current("/about")}>
            {t.navAbout}
          </Link>
          <span aria-hidden="true" className="hidden h-3.5 w-px bg-brass/40 md:inline-block" />
          <a className={link} href={SCHOOL_URL} target="_blank" rel="noreferrer">
            {t.navSchool}
          </a>
          {showFacebook && (
            <a className={link} href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              {t.navFacebook}
            </a>
          )}
          <a className={link} href={LOOMA_URL} target="_blank" rel="noreferrer">
            {t.navLooma}
          </a>
        </nav>
      </div>
    </header>
  );
}
