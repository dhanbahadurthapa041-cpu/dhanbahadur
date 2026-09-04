import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { Lang } from "./i18n";

export interface Post {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  html: string;
}

const DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): { title: string; date: string; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { title: "Untitled", date: "", body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  return { title: meta.title ?? "Untitled", date: meta.date ?? "", body: match[2] };
}

/** All slugs that have at least an English or Nepali file. */
export function getSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  const slugs = new Set<string>();
  for (const f of fs.readdirSync(DIR)) {
    const m = f.match(/^(.+)\.(en|ne)\.md$/);
    if (m) slugs.add(m[1]);
  }
  return [...slugs];
}

export function getPost(slug: string, lang: Lang): Post | null {
  for (const l of [lang, lang === "ne" ? "en" : "ne"] as Lang[]) {
    const file = path.join(DIR, `${slug}.${l}.md`);
    if (fs.existsSync(file)) {
      const { title, date, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
      return { slug, lang: l, title, date, html: marked.parse(body) as string };
    }
  }
  return null;
}

export function getAllPosts(lang: Lang): Post[] {
  return getSlugs()
    .map((slug) => getPost(slug, lang))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
