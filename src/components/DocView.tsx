import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, type Section } from "@/lib/content";
import { STRINGS, type Lang } from "@/lib/i18n";

export default function DocView({
  section,
  slug,
  lang,
}: {
  section: Section;
  slug: string;
  lang: Lang;
}) {
  const t = STRINGS[lang];
  const doc = getDoc(section, slug, lang);
  if (!doc) notFound();
  return (
    <article>
      <Link href={`/${section}`} className="text-sm font-medium text-pine dark:text-mint">
        {t.backSection}
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{doc.title}</h1>
      {doc.date && <p className="mt-1 text-xs text-ink/60 dark:text-cream/60">{doc.date}</p>}
      {/* Every slug has an English file, so a language mismatch always means
          English fallback — one shared "English only" badge covers it. */}
      {doc.lang !== lang && (
        <p className="mt-2 inline-block rounded-full bg-brass/25 px-2 py-0.5 text-xs text-ink dark:bg-brass/20 dark:text-cream">
          {t.englishOnly}
        </p>
      )}
      <div className="prose mt-6 dark:prose-invert" dangerouslySetInnerHTML={{ __html: doc.html }} />
    </article>
  );
}
