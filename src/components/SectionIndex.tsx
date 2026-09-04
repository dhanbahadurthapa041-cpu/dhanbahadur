import Link from "next/link";
import { getAllDocs, SECTION_SUBSECTIONS, type Section } from "@/lib/content";
import { PUB_CATEGORIES, PUB_ITEMS } from "@/lib/pub";
import { STRINGS, type Lang, type Strings } from "@/lib/i18n";
import DownloadRow from "./DownloadRow";

function sectionTitle(t: Strings, section: Section): string {
  switch (section) {
    case "pub":
      return t.pubTitle;
    case "writing":
      return t.writingTitle;
    case "grammar":
      return t.grammarTitle;
    case "class-10":
      return t.class10Title;
    case "class-12":
      return t.class12Title;
  }
}

function sectionDesc(t: Strings, section: Section): string {
  switch (section) {
    case "pub":
      return t.pubDesc;
    case "writing":
      return t.writingDesc;
    case "grammar":
      return t.grammarDesc;
    case "class-10":
      return t.class10Desc;
    case "class-12":
      return t.class12Desc;
  }
}

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

export default function SectionIndex({ section, lang }: { section: Section; lang: Lang }) {
  const t = STRINGS[lang];
  const docs = getAllDocs(section, lang);
  const subs = SECTION_SUBSECTIONS[section];
  const grouped = new Set(docs.map((d) => docGroup(section, d)));

  return (
    <div>
      <Link href="/" className="text-sm text-emerald-700 dark:text-emerald-300">
        {t.backHome}
      </Link>
      <h1 className="mt-2 text-3xl font-bold">{sectionTitle(t, section)}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{sectionDesc(t, section)}</p>

      {section === "pub" && (
        <>
          {docs.length > 0 && (
            <ul className="mt-6 space-y-3">
              {docs.map((d) => (
                <li
                  key={d.slug}
                  className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <Link
                    href={`/pub/${d.slug}`}
                    className="text-lg font-semibold hover:text-emerald-700"
                  >
                    {d.title}
                  </Link>
                  {d.lang !== lang && (
                    <span className="ml-2 inline-block rounded bg-amber-100 px-2 py-0.5 align-middle text-xs text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                      {t.englishOnly}
                    </span>
                  )}
                  {d.date && <p className="text-xs text-zinc-500">{d.date}</p>}
                </li>
              ))}
            </ul>
          )}
          {PUB_CATEGORIES.map((cat) => (
            <div key={cat} className="mt-8">
              <h2 className="text-xl font-semibold">{subsectionLabel(cat, t)}</h2>
              <ul className="mt-3 space-y-3">
                {PUB_ITEMS.filter((i) => i.category === cat).map((i) => (
                  <DownloadRow key={i.titleEn} item={i} />
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {section !== "pub" && (
        <div className="mt-6 space-y-8">
          {subs.map((sub) => {
            const inGroup = docs.filter((d) => docGroup(section, d) === sub);
            return (
              <div key={sub}>
                <h2 className="text-xl font-semibold">{subsectionLabel(sub, t)}</h2>
                {inGroup.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {inGroup.map((d) => (
                      <li
                        key={d.slug}
                        className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                      >
                        <Link
                          href={`/${section}/${d.slug}`}
                          className="text-lg font-semibold hover:text-emerald-700"
                        >
                          {d.title}
                        </Link>
                        {d.lang !== lang && (
                          <span className="ml-2 inline-block rounded bg-amber-100 px-2 py-0.5 align-middle text-xs text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                            {t.englishOnly}
                          </span>
                        )}
                        {d.date && <p className="text-xs text-zinc-500">{d.date}</p>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">{t.comingSoon}</p>
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
                  <div key={d.slug}>
                    <Link href={`/${section}/${d.slug}`}>{d.title}</Link>
                    {d.lang !== lang && (
                      <span className="ml-2 inline-block rounded bg-amber-100 px-2 py-0.5 align-middle text-xs text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                        {t.englishOnly}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          )}
          {docs.filter((d) => docGroup(section, d) === null).length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">{t.comingSoon}</h2>
              <ul className="mt-3 space-y-3">
                {docs
                  .filter((d) => docGroup(section, d) === null)
                  .map((d) => (
                    <li
                      key={d.slug}
                      className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                    >
                      <Link
                        href={`/${section}/${d.slug}`}
                        className="text-lg font-semibold hover:text-emerald-700"
                      >
                        {d.title}
                      </Link>
                      {d.date && <p className="text-xs text-zinc-500">{d.date}</p>}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
