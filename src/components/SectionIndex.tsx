import Link from "next/link";
import { getAllDocs, SECTION_SUBSECTIONS, sectionTitle, sectionDesc, localDigits, type Section } from "@/lib/content";
import { STRINGS, type Lang, type Strings } from "@/lib/i18n";
import PubLibrary from "./PubLibrary";
import Reveal from "./Reveal";
import FolioMarker from "./FolioMarker";

function subsectionLabel(sub: string, t: Strings): string {
  const map: Record<string, string> = {
    textbooks: t.catTextbooks,
    syllabus: t.catSyllabus,
    guides: t.catGuides,
    grid: t.catGrid,
    "free-writing": t.subFreeWriting,
    guided: t.subGuided,
    controlled: t.subControlled,
    articles: t.subArticles,
    prepositions: t.subPrepositions,
    tense: t.subTense,
    "reported-speech": t.subReportedSpeech,
    voice: t.subVoice,
    sva: t.subSVA,
    "subject-verb-agreement": t.subSVA,
    "relative-clause": t.subRelativeClause,
    connectives: t.subConnectives,
    "conditional-sentences": t.subConditional,
    "unit-1": t.subUnit1,
    "unit-2": t.subUnit2,
    "unit-3": t.subUnit3,
    "unit-4": t.subUnit4,
    "unit-5": t.subUnit5,
    "unit-6": t.subUnit6,
    "unit-7": t.subUnit7,
    literature: t.subLiterature,
    poetry: t.subPoetry,
    "one-act-play": t.subOneActPlay,
    story: t.subStory,
    essay: t.subEssay,
    "seen-texts": t.subSeenTexts,
    "unseen-texts": t.subUnseenTexts,
  };
  if (map[sub]) return map[sub];
  return sub
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Which subsection group a doc belongs to (frontmatter wins, else slug match). */
function docGroup(section: Section, doc: { slug: string; subsection: string | null }): string | null {
  if (doc.subsection) return doc.subsection;
  if (SECTION_SUBSECTIONS[section].includes(doc.slug)) return doc.slug;
  return null;
}

/** Reading-time label with locale digits (NE uses Devanagari numerals). */
function minReadLabel(minutes: number, lang: Lang): string {
  const digits = lang === 'ne'
    ? String(minutes).replace(/\d/g, (d) => '०१२३४५६७८९'[Number(d)] ?? d)
    : String(minutes);
  return STRINGS[lang].minRead.replace('{n}', digits);
}

export default function SectionIndex({ section, lang }: { section: Section; lang: Lang }) {
  const t = STRINGS[lang];
  const docs = getAllDocs(section, lang);
  const subs = SECTION_SUBSECTIONS[section];
  const grouped = new Set(docs.map((d) => docGroup(section, d)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 lg:py-32">
      <Link href="/" className="no-print inline-flex items-center gap-1 text-sm font-medium text-pine transition motion-reduce:transition-none hover:text-pine-deep dark:text-mint dark:hover:text-cream">
        {t.backHome}
      </Link>
      <div className="mt-6">
        <FolioMarker lang={lang} label={section === "pub" ? t.folioLibrary : t.folioCurriculum} className="mb-3" />
        <h1 className={`font-display text-3xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl dark:text-clay ${lang === "en" ? "tracking-tight" : "tracking-normal"}`}>
          {sectionTitle(t, section)}
        </h1>
        <p className="mt-2 text-lg leading-[1.5] [text-wrap:pretty] text-ink/75 sm:text-xl dark:text-cream/75">{sectionDesc(t, section)}</p>
      </div>

      {section === "pub" && (
        <>
          {docs.length > 0 && (
            <ul className="mt-6 space-y-3">
              {docs.map((d, i) => (
                <Reveal
                  as="li"
                  key={d.slug}
                  index={i}
                  className="cq-row"
                >
                  <div className="row-inner section-card relative rounded-xl border border-brass/25 bg-surface-subtle p-4 shadow-[0_1px_2px_rgba(47,42,37,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-[0_12px_24px_-14px_rgba(47,42,37,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:shadow-none dark:hover:shadow-none focus-within:border-pine/60 dark:focus-within:border-mint/60">
                  <Link
                    lang={d.lang}
                    href={`/pub/${d.slug}`}
                    className="text-lg font-semibold after:absolute after:inset-0 hover:text-pine dark:hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:focus-visible:outline-mint"
                  >
                    {d.title}
                  </Link>
                  {d.lang !== lang && (
                    <span className={`badge-leak-guard ml-2 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-brass/20 px-2.5 py-0.5 align-middle text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.08em]" : "tracking-normal"}`}>
                      {t.englishOnly}
                    </span>
                  )}
                  <p className={`mt-1 text-[13px] tabular-nums dark:text-cream/70 ${lang === "en" ? "leading-[1.45] text-ink/70" : "leading-[1.6] text-ink/70"}`}>{[localDigits(d.date, lang), minReadLabel(d.readingMinutes, lang)].filter(Boolean).join(" · ")}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          )}
          {/* Searchable download library (PUB_ITEMS grouped by category). */}
          <PubLibrary />
        </>
      )}

      {section !== "pub" && (
        <div className="mt-6 space-y-8">
          {subs.map((sub) => {
            const inGroup = docs.filter((d) => docGroup(section, d) === sub);
            return (
              <div key={sub}>
                <h2 className={`flex items-center gap-3 font-display text-xl font-medium dark:font-normal text-maroon after:h-px after:flex-1 after:bg-brass/30 dark:text-clay dark:after:bg-brass/20 ${lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.5]"}`}>{subsectionLabel(sub, t)}</h2>
                {inGroup.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {inGroup.map((d, i) => (
                      <Reveal
                        as="li"
                        key={d.slug}
                        index={i}
                        className="cq-row"
                      >
                        <div className="row-inner section-card relative rounded-xl border border-brass/25 bg-surface-subtle p-4 shadow-[0_1px_2px_rgba(47,42,37,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-[0_12px_24px_-14px_rgba(47,42,37,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:shadow-none dark:hover:shadow-none focus-within:border-pine/60 dark:focus-within:border-mint/60">
                        <Link
                          lang={d.lang}
                          href={`/${section}/${d.slug}`}
                          className="text-lg font-semibold after:absolute after:inset-0 hover:text-pine dark:hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:focus-visible:outline-mint"
                        >
                          {d.title}
                        </Link>
                        {d.lang !== lang && (
                          <span className={`badge-leak-guard ml-2 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-brass/20 px-2.5 py-0.5 align-middle text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.08em]" : "tracking-normal"}`}>
                            {t.englishOnly}
                          </span>
                        )}
                        <p className={`mt-1 text-[13px] tabular-nums dark:text-cream/70 ${lang === "en" ? "leading-[1.45] text-ink/70" : "leading-[1.6] text-ink/70"}`}>{[localDigits(d.date, lang), minReadLabel(d.readingMinutes, lang)].filter(Boolean).join(" · ")}</p>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3 rounded-xl border border-dashed border-brass/40 bg-brass/[0.07] p-5 dark:border-cream/15 dark:bg-choc-elevated">
                    <span aria-hidden="true" className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brass/15 dark:bg-brass/10"><span className="block h-2.5 w-2.5 rotate-45 bg-brass/80 dark:bg-brass-dark/60" /></span>
                    <p className="mt-3 font-display text-base font-medium dark:font-normal text-maroon dark:text-clay">
                      {subsectionLabel(sub, t)}
                    </p>
                    <p className="mt-1 text-sm text-ink/60 dark:text-cream/60">
                      {t.comingSoon} — {sectionDesc(t, section)}
                    </p>
                    <Link
                      href="/pub"
                      className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-pine transition motion-reduce:transition-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:text-mint dark:focus-visible:outline-mint"
                    >
                      {t.viewCollection} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
          {[...grouped].filter((g) => g !== null && !subs.includes(g)).length > 0 && (
            <div>
              {docs
                .filter((d) => {
                  const g = docGroup(section, d);
                  return g !== null && !subs.includes(g);
                })
                .map((d) => (
                  <div key={d.slug} className="cq-row row-inner section-card relative rounded-xl border border-brass/25 bg-surface-subtle p-4 shadow-[0_1px_2px_rgba(47,42,37,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-[0_12px_24px_-14px_rgba(47,42,37,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:shadow-none dark:hover:shadow-none focus-within:border-pine/60 dark:focus-within:border-mint/60">
                    <Link
                      lang={d.lang}
                      href={`/${section}/${d.slug}`}
                      className="text-lg font-semibold after:absolute after:inset-0 hover:text-pine dark:hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:focus-visible:outline-mint"
                    >
                      {d.title}
                    </Link>
                    {d.lang !== lang && (
                      <span className={`badge-leak-guard ml-2 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-brass/20 px-2.5 py-0.5 align-middle text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.08em]" : "tracking-normal"}`}>
                        {t.englishOnly}
                      </span>
                    )}
                    <p className={`mt-1 text-[13px] tabular-nums dark:text-cream/70 ${lang === "en" ? "leading-[1.45] text-ink/70" : "leading-[1.6] text-ink/70"}`}>{[localDigits(d.date, lang), minReadLabel(d.readingMinutes, lang)].filter(Boolean).join(" · ")}</p>
                  </div>
                ))}
            </div>
          )}
          {docs.filter((d) => docGroup(section, d) === null).length > 0 && (
            <div>
              <h2 className={`flex items-center gap-3 font-display text-xl font-medium dark:font-normal text-maroon after:h-px after:flex-1 after:bg-brass/30 dark:text-clay dark:after:bg-brass/20 ${lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.5]"}`}>{t.comingSoon}</h2>
              <ul className="mt-3 space-y-3">
                {docs
                  .filter((d) => docGroup(section, d) === null)
                  .map((d, i) => (
                    <Reveal
                      as="li"
                      key={d.slug}
                      index={i}
                      className="cq-row"
                    >
                      <div className="row-inner section-card relative rounded-xl border border-brass/25 bg-surface-subtle p-4 shadow-[0_1px_2px_rgba(47,42,37,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-[0_12px_24px_-14px_rgba(47,42,37,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:shadow-none dark:hover:shadow-none focus-within:border-pine/60 dark:focus-within:border-mint/60">
                      <Link
                        lang={d.lang}
                        href={`/${section}/${d.slug}`}
                        className="text-lg font-semibold after:absolute after:inset-0 hover:text-pine dark:hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:focus-visible:outline-mint"
                      >
                        {d.title}
                      </Link>
                      <p className={`mt-1 text-[13px] tabular-nums dark:text-cream/70 ${lang === "en" ? "leading-[1.45] text-ink/70" : "leading-[1.6] text-ink/70"}`}>{[localDigits(d.date, lang), minReadLabel(d.readingMinutes, lang)].filter(Boolean).join(" · ")}</p>
                      </div>
                    </Reveal>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
