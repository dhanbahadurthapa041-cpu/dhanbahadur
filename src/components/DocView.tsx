import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, sectionTitle, type Section } from "@/lib/content";
import { STRINGS, type Lang } from "@/lib/i18n";
import ReadingProgress from "./ReadingProgress";
import { TocDrawer, TocRail } from "./Toc";
import FolioMarker from "./FolioMarker";

/** Article id the progress bar measures and the TOC links target. */
const ARTICLE_ID = "lesson-article";

/**
 * Runtime drop-cap guard (Phase A4 §4.2): suppress the cap when the opener's
 * first grapheme is Devanagari/Vedic, a quote, digit, emoji/symbol, or when
 * markup leads with an icon/sr-only span. Quote-steals-cap is the #1 field
 * breakage. NE openers pass only via explicit frontmatter vetting.
 */
function openerAllowsDropCap(html: string, docLang: string, explicit: boolean): boolean {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .trimStart();
  const first = text.charAt(0);
  if (!first) return false;
  if (/^["'"“”‘’«»]/.test(first)) return false;
  if (/^[0-9\u0966-\u096F]/.test(first)) return false;
  if (/[\u0900-\u097F\u1CD0-\u1CFF]/.test(first)) return explicit;
  if (!/[A-Za-z]/.test(first)) return false;
  if (/^<(span|i|svg|img|a)[^>]*class=["'][^"']*(sr-only|icon)/i.test(html.trimStart())) return false;
  if (/^<(svg|img)[^>]*>/i.test(html.trimStart())) return false;
  return docLang === "en" || explicit;
}

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
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 lg:py-32">
      <Link
        href={`/${section}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-pine transition motion-reduce:transition-none hover:text-pine-deep dark:text-mint dark:hover:text-cream"
      >
        {t.backSection}
      </Link>
      <div className="mt-4">
        <FolioMarker label={sectionTitle(t, section)} className="mb-2.5" />
        <h1
          className={`font-display text-3xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl dark:text-clay ${
            doc.lang === "en" ? "tracking-tight" : "tracking-normal"
          }`}
        >
          {doc.title}
        </h1>
        {doc.date && <p className="mt-1 text-xs text-ink/60 dark:text-cream/60">{doc.date}</p>}
        {/* Every slug has an English file, so a language mismatch always means
            English fallback — one shared "English only" badge covers it. */}
        {doc.lang !== lang && (
          <p className="mt-2 inline-block">
            <span className={`badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.08em]" : "tracking-normal"}`}>
              {t.englishOnly}
            </span>
          </p>
        )}
      </div>
      {showToc && <ReadingProgress targetId={ARTICLE_ID} />}
      {showToc && <TocDrawer toc={doc.toc} />}
      <div className={showToc ? "mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start lg:gap-8" : undefined}>
        <article
          id={showToc ? ARTICLE_ID : undefined}
          className={
            doc.dropcap && openerAllowsDropCap(doc.html, doc.lang, doc.dropcapExplicit)
              ? "has-drop-cap"
              : undefined
          }
        >
          <div className={showToc ? "prose dark:prose-invert max-w-none" : "prose mt-6 dark:prose-invert max-w-none"} dangerouslySetInnerHTML={{ __html: doc.html }} />
        </article>
        {showToc && <TocRail toc={doc.toc} />}
      </div>
    </div>
  );
}
