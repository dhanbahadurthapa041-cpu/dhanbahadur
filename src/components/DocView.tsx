import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, type Section } from "@/lib/content";
import { STRINGS, type Lang } from "@/lib/i18n";
import ReadingProgress from "./ReadingProgress";
import { TocDrawer, TocRail } from "./Toc";

/** Article id the progress bar measures and the TOC links target. */
const ARTICLE_ID = "lesson-article";

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
  // Reading aids only pay off on longer lessons — short docs keep the
  // original single-column layout untouched.
  const showToc = doc.toc.length >= 3;
  return (
    <div>
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
      {showToc && <ReadingProgress targetId={ARTICLE_ID} />}
      {showToc && <TocDrawer toc={doc.toc} />}
      <div className={showToc ? "mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start lg:gap-8" : undefined}>
        <article id={showToc ? ARTICLE_ID : undefined}>
          <div className={showToc ? "prose dark:prose-invert" : "prose mt-6 dark:prose-invert"} dangerouslySetInnerHTML={{ __html: doc.html }} />
        </article>
        {showToc && <TocRail toc={doc.toc} />}
      </div>
    </div>
  );
}
