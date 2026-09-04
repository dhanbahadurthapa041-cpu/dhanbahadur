import type { MetadataRoute } from "next";
import { getDoc, getSections, getSlugs, type Section } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";

const STATIC_ROUTES = ["", "/about", "/pub", "/writing", "/grammar", "/class-10", "/class-12"];

function safeSlugs(section: Section): string[] {
  try {
    return getSlugs(section);
  } catch {
    return [];
  }
}

function lastModified(section: Section, slug: string): Date | undefined {
  try {
    const doc = getDoc(section, slug, "en");
    if (doc?.date) {
      const d = new Date(doc.date);
      if (!Number.isNaN(d.getTime())) return d;
    }
  } catch {
    // A single unreadable file must never fail the sitemap.
  }
  return undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // One URL per slug (no locale-prefixed routes exist): every slug has an
  // English file and getDoc() falls back to it when a Nepali file is
  // missing, so emitting per-language duplicates would create fake URLs.
  // Every filesystem read is guarded so the build can never fail here.
  const urls: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "" ? "/" : route}`,
  }));
  for (const section of getSections()) {
    for (const slug of safeSlugs(section)) {
      const entry: MetadataRoute.Sitemap[number] = {
        url: `${SITE_URL}/${section}/${slug}`,
      };
      const lm = lastModified(section, slug);
      if (lm) entry.lastModified = lm;
      urls.push(entry);
    }
  }
  return urls;
}
