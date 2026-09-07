import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, type Section } from "@/lib/content";
import { STRINGS, type Lang } from "@/lib/i18n";
import ReadingProgress from "./ReadingProgress";
import { TocDrawer, TocRail } from "./Toc";
import FolioMarker from "./FolioMarker";

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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <Link
        href={`/${section}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-pine transition hover:text-pine-deep dark:text-mint dark:hover:text-cream"
      >
        {t.backSection}
      </Link>
      <div className="mt-4">
        <FolioMarker label={`${section.replace("-", " ")}`} className="mb-2.5" />
        <h1
          className={`font-display text-3xl font-semibold text-maroon sm:text-4xl dark:text-clay ${
            doc.lang === "en" ? "tracking-tight" : "tracking-normal"
          }`}
        >
          {doc.title}
        </h1>
        {doc.date && <p className="mt-1 text-xs text-ink/60 dark:text-cream/60">{doc.date}</p>}
        {/* Every slug has an English file, so a language mismatch always means
            English fallback — one shared "English only" badge covers it. */}
        {doc.lang !== lang && (
          <p className="mt-2 inline-block rounded-full bg-brass/25 px-2.5 py-0.5 text-xs text-ink dark:bg-brass/20 dark:text-cream">
            {t.englishOnly}
          </p>
        )}
      </div>
      {showToc && <ReadingProgress targetId={ARTICLE_ID} />}
      {showToc && <TocDrawer toc={doc.toc} />}
      <div className={showToc ? "mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start lg:gap-8" : undefined}>
        <article
          id={showToc ? ARTICLE_ID : undefined}
          className={doc.lang === "en" ? "has-drop-cap" : undefined}
        >
          <div className={showToc ? "prose dark:prose-invert max-w-none" : "prose mt-6 dark:prose-invert max-w-none"} dangerouslySetInnerHTML={{ __html: doc.html }} />
        </article>
        {showToc && <TocRail toc={doc.toc} />}
      </div>
    </div>
  );
}
