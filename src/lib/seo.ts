import type { Metadata } from "next";
import { getDoc, type Section } from "./content";
import { STRINGS, type Lang } from "./i18n";

/** Canonical production URL. Must match metadataBase in src/app/layout.tsx. */
export const SITE_URL = "https://dbthapa.vercel.app";

function sectionNameDesc(
  section: Section,
  lang: Lang,
): { name: string; desc: string } {
  const t = STRINGS[lang];
  switch (section) {
    case "pub":
      return { name: t.pubTitle, desc: t.pubDesc };
    case "writing":
      return { name: t.writingTitle, desc: t.writingDesc };
    case "grammar":
      return { name: t.grammarTitle, desc: t.grammarDesc };
    case "class-10":
      return { name: t.class10Title, desc: t.class10Desc };
    case "class-12":
      return { name: t.class12Title, desc: t.class12Desc };
  }
}

export function homeMetadata(lang: Lang): Metadata {
  const t = STRINGS[lang];
  return {
    title: t.heroTitle,
    description: `${t.tagline}. ${t.heroSubtitle}`,
    alternates: { canonical: "/" },
  };
}

export function aboutMetadata(lang: Lang): Metadata {
  const t = STRINGS[lang];
  return {
    title: `${t.aboutTitle} | ${t.heroTitle}`,
    description: t.aboutPara2,
    alternates: { canonical: "/about" },
  };
}

export function sectionMetadata(section: Section, lang: Lang): Metadata {
  const t = STRINGS[lang];
  const { name, desc } = sectionNameDesc(section, lang);
  return {
    title: `${name} | ${t.heroTitle}`,
    description: desc,
    alternates: { canonical: `/${section}` },
  };
}

export function docMetadata(
  section: Section,
  slug: string,
  lang: Lang,
): Metadata {
  const t = STRINGS[lang];
  const { name, desc } = sectionNameDesc(section, lang);
  try {
    const doc = getDoc(section, slug, lang);
    if (doc) {
      return {
        title: `${doc.title} | ${name}`,
        description: desc,
        alternates: { canonical: `/${section}/${slug}` },
      };
    }
  } catch {
    // Filesystem reads must never break metadata; fall through to section-level.
  }
  return {
    title: `${name} | ${t.heroTitle}`,
    description: desc,
    alternates: { canonical: `/${section}` },
  };
}
