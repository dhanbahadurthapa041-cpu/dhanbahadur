import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { STRINGS, type Lang } from "./i18n";

export const SECTIONS = ["pub", "writing", "grammar", "class-10", "class-12"] as const;
export type Section = (typeof SECTIONS)[number];

export interface Doc {
  slug: string;
  section: Section;
  lang: Lang;
  title: string;
  date: string;
  subsection: string | null;
  html: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function parseFrontmatter(
  raw: string,
  lang: Lang,
): {
  title: string;
  date: string;
  subsection: string | null;
  body: string;
} {
  const fallback = STRINGS[lang].untitled;
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { title: fallback, date: "", subsection: null, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  return {
    title: meta.title ?? fallback,
    date: meta.date ?? "",
    subsection: meta.subsection ?? null,
    body: match[2],
  };
}

function sectionDir(section: Section): string {
  return path.join(CONTENT_DIR, section);
}

export function isSection(s: string): s is Section {
  return (SECTIONS as readonly string[]).includes(s);
}

/** All known content sections. */
export function getSections(): Section[] {
  return [...SECTIONS];
}

/** All slugs in a section that have at least an English or Nepali file. */
export function getSlugs(section: Section): string[] {
  const dir = sectionDir(section);
  if (!fs.existsSync(dir)) return [];
  const slugs = new Set<string>();
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/^(.+)\.(en|ne)\.md$/);
    if (m) slugs.add(m[1]);
  }
  return [...slugs];
}

export function getDoc(section: Section, slug: string, lang: Lang): Doc | null {
  for (const l of [lang, lang === "ne" ? "en" : "ne"] as Lang[]) {
    const file = path.join(sectionDir(section), `${slug}.${l}.md`);
    if (fs.existsSync(file)) {
      const { title, date, subsection, body } = parseFrontmatter(fs.readFileSync(file, "utf8"), l);
      return { slug, section, lang: l, title, date, subsection, html: marked.parse(body) as string };
    }
  }
  return null;
}

export function getAllDocs(section: Section, lang: Lang): Doc[] {
  return getSlugs(section)
    .map((slug) => getDoc(section, slug, lang))
    .filter((d): d is Doc => d !== null)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return a.slug.localeCompare(b.slug);
    });
}

/**
 * Subsection slugs per section, taken from the owner's handwritten sitemap.
 * - pub: download categories (rendered from src/lib/pub.ts)
 * - writing: Free Writing, Guided, Controlled
 * - grammar: Article(s), Preposition, Tense, Reported speech, Voice, SVA,
 *   Relative clause, Connective, Conditional Sentence
 * - class-10: Social Studies Unit-1..7
 * - class-12: English — Literature, Poetry, One Act Play, Story, Essay,
 *   Seen Texts, Unseen Texts
 */
export const SECTION_SUBSECTIONS: Record<Section, string[]> = {
  pub: ["textbooks", "syllabus", "guides", "grid"],
  writing: ["free-writing", "guided", "controlled"],
  grammar: [
    "articles",
    "prepositions",
    "tense",
    "reported-speech",
    "voice",
    "subject-verb-agreement",
    "relative-clause",
    "connectives",
    "conditional-sentences",
  ],
  "class-10": ["unit-1", "unit-2", "unit-3", "unit-4", "unit-5", "unit-6", "unit-7"],
  "class-12": [
    "literature",
    "poetry",
    "one-act-play",
    "story",
    "essay",
    "seen-texts",
    "unseen-texts",
  ],
};
