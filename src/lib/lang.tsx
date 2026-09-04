"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { STRINGS, type Lang, type Strings } from "./i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Strings }>({
  lang: "ne",
  setLang: () => {},
  t: STRINGS.ne,
});

function initialLang(): Lang {
  if (typeof window === "undefined") return "ne";
  const saved = localStorage.getItem("dbt-lang");
  return saved === "en" || saved === "ne" ? saved : "ne";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    localStorage.setItem("dbt-lang", lang);
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
