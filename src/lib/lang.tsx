"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { STRINGS, type Lang, type Strings } from "./i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Strings }>({
  lang: "en",
  setLang: () => {},
  t: STRINGS.en,
});

function readCookieLang(): Lang | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)dbt-lang=(en|ne)(?:;|$)/);
  return m ? (m[1] as Lang) : null;
}

function initialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("dbt-lang");
  if (saved === "en" || saved === "ne") return saved;
  // No saved choice in localStorage (first visit, cleared storage, or a
  // stale value): agree with the server, which renders from the cookie.
  // This keeps hydration consistent on hard refreshes of deep pages.
  return readCookieLang() ?? "en";
}

const COOKIE_ATTRS = "path=/; max-age=31536000; SameSite=Lax";

export function LangProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback(
    (l: Lang) => {
      setLangState(l);
      try {
        localStorage.setItem("dbt-lang", l);
      } catch {
        // Storage unavailable (e.g. private mode) — the cookie still carries it.
      }
      // Mirror to the cookie the server components read, then re-render
      // them so the current page switches language immediately.
      document.cookie = `dbt-lang=${l}; ${COOKIE_ATTRS}`;
      router.refresh();
    },
    [router],
  );

  useEffect(() => {
    try {
      localStorage.setItem("dbt-lang", lang);
    } catch {
      // Storage unavailable — the cookie still carries the preference.
    }
    document.cookie = `dbt-lang=${lang}; ${COOKIE_ATTRS}`;
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void; toggleTheme: () => void }>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

function initialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("dbt-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const applyTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem("dbt-theme", next);
    } catch {}
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  const setThemeExplicit = useCallback(
    (t: Theme) => {
      setTheme(t);
      applyTheme(t);
    },
    [applyTheme],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme: setThemeExplicit, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
