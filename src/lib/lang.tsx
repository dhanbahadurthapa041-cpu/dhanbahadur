"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { STRINGS, type Lang, type Strings } from "./i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Strings }>({
  lang: "en",
  setLang: () => {},
  t: STRINGS.en,
});

function initialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("dbt-lang");
  return saved === "en" || saved === "ne" ? saved : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    localStorage.setItem("dbt-lang", lang);
    document.cookie = `dbt-lang=${lang}; path=/; max-age=31536000`;
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

  useEffect(() => {
    localStorage.setItem("dbt-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
