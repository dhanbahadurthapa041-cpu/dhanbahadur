import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";
import { homeMetadata } from "@/lib/seo";
import { SCHOOL_URL, LOOMA_URL } from "@/lib/site";
import Reveal from "@/components/Reveal";
import FolioMarker from "@/components/FolioMarker";
import StatsRow from "@/components/StatsRow";
import PullQuote from "@/components/PullQuote";
import Divider from "@/components/Divider";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return homeMetadata(await getServerLang());
}

export default async function Home() {
  const lang = await getServerLang();
  const t = STRINGS[lang];

  return (
    <div className="bleed-wrapper">
      {/* ===================================================================
          BAND 1: Editorial Hero (Warm Paper floor, Maroon Display H1)
          =================================================================== */}
      <section className="full-bleed py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <FolioMarker label={t.tagline} className="mb-5" />

              <h1
                className={`font-display text-5xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-6xl lg:text-7xl dark:text-clay ${
                  lang === "en" ? "tracking-tight leading-[1.03]" : "tracking-normal leading-[1.25]"
                }`}
              >
                {t.heroTitle}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl sm:leading-relaxed dark:text-cream/80">
                {t.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/pub"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(15,106,75,0.45)] transition hover:bg-pine-deep hover:shadow-[0_12px_24px_-8px_rgba(15,106,75,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:transition-none motion-reduce:transform-none dark:bg-mint dark:text-choc dark:hover:bg-mint/85 dark:focus-visible:outline-mint"
                >
                  <span>{t.explorePub}</span>
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/grammar"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brass/70 bg-surface-subtle px-6 py-3.5 text-sm font-semibold text-ink shadow-none transition hover:border-pine hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:transition-none motion-reduce:transform-none dark:border-cream/25 dark:bg-choc-elevated dark:text-cream dark:hover:border-mint dark:hover:text-mint dark:focus-visible:outline-mint"
                >
                  <span>{t.browseGrammar}</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-ink/65 dark:text-cream/65">
                <span className="font-semibold uppercase tracking-wider text-pine dark:text-mint">
                  Focus:
                </span>
                <span className="rounded-full bg-pine/10 px-3 py-1 font-medium text-pine dark:bg-mint/10 dark:text-mint">
                  Class 10 Social Studies
                </span>
                <span className="rounded-full bg-brass/15 px-3 py-1 text-ink/80 dark:bg-brass/10 dark:text-cream/80">
                  Class 12 English
                </span>
                <span className="rounded-full bg-brass/15 px-3 py-1 text-ink/80 dark:bg-brass/10 dark:text-cream/80">
                  Grammar & Composition
                </span>
              </div>
            </div>

            {/* Portrait with layered brass frame & botanical tone grading.
                Phase B5: plate drifts on scroll (parallax-plate), photo +
                grade counter-translate inside the frame (parallax-photo),
                brass mount breathes the other way (frame-a/b). Caption and
                text column stay static. */}
            <figure className="parallax-plate relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="parallax-frame-a absolute -right-3 -bottom-3 sm:-right-5 sm:-bottom-5 h-full w-full rounded-3xl border-2 border-brass/60 dark:border-brass-dark/40"
              />
              <div
                aria-hidden="true"
                className="parallax-frame-b absolute -left-2 -top-2 h-full w-full rounded-3xl bg-brass/10 dark:bg-brass/[0.04]"
              />
              <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_48px_-20px_rgba(47,42,37,0.3)] ring-1 ring-inset ring-brass/40 dark:shadow-none">
                <Image
                  src="/images/profile.jpg"
                  alt={t.profileAlt}
                  width={520}
                  height={650}
                  sizes="(min-width:1024px) 460px, (min-width:640px) 380px, 90vw"
                  className="parallax-photo aspect-[4/5] w-full object-cover sepia-[0.22] contrast-[1.02]"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="parallax-photo pointer-events-none absolute -inset-[15%] rounded-3xl bg-pine/10 mix-blend-multiply dark:bg-choc/20"
                />
              </div>
              {/* Duplicates the hero FolioMarker tagline above: decorative, hidden from AT */}
              <figcaption aria-hidden="true" className="folio-text mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-ink/55 dark:text-cream/55">
                {t.tagline}
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Divider variant="gradient" className="mt-16 sm:mt-24 mb-0" />
        </div>
      </section>

      {/* ===================================================================
          BAND 2: KPI Stats Strip (Warm Linen Tint band with dividers)
          =================================================================== */}
      <section className="full-bleed border-y border-brass/25 bg-linen py-16 sm:py-24 lg:py-32 dark:border-cream/10 dark:bg-choc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FolioMarker label={t.folioMetrics} className="justify-center mb-6" />
          <StatsRow />
        </div>
      </section>

      {/* ===================================================================
          BAND 3: Chapter-Break Pull Quote (Full-Bleed Deep Pine)
          =================================================================== */}
      <section className="full-bleed bg-pine on-pine py-24 sm:py-32 lg:py-40 text-cream dark:bg-pine-dark">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <FolioMarker label={t.folioQuote} className="justify-center mb-6 text-brass-dark" />
          {/* Unique epigraphs, not verbatim body repeats → isDuplicate false (exposed to AT) */}
          <PullQuote
            quote={t.quote1Text}
            author={t.quote1Author}
            role={t.quote1Role}
            lang={lang}
            className="my-0 text-cream"
          />
        </div>
      </section>

      {/* ===================================================================
          BAND 4: Academic Curriculum & Learning Pathways (Bento Grid)
          =================================================================== */}
      <section className="full-bleed bg-linen/60 py-24 sm:py-32 lg:py-40 dark:bg-choc-elevated/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <FolioMarker label={t.folioCurriculum} className="mb-3" />
              <h2
                className={`font-display text-3xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl lg:text-5xl dark:text-clay ${
                  lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.25]"
                }`}
              >
                {t.curriculumEyebrow}
              </h2>
              <p className="mt-3.5 max-w-2xl text-lg leading-[1.5] text-ink/75 sm:text-xl dark:text-cream/75">
                {t.curriculumSubtitle}
              </p>
            </div>
            <Link
              href="/pub"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-pine transition hover:text-pine-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:text-mint dark:hover:text-cream dark:focus-visible:outline-mint"
            >
              <span>{t.browseAllSubjects}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Class 10 Social Studies (Hero Bento Card) */}
            <Reveal index={0} className="sm:col-span-2 lg:col-span-2">
              <Link
                href="/class-10"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-parchment p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition duration-200 hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-cream/15 dark:bg-brass/[0.06] dark:ring-white/5 dark:shadow-none dark:hover:shadow-none dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink dark:bg-brass/15 dark:text-cream">
                      SEE Prep
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Unit 1–7
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-4 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-semibold text-maroon group-hover:text-pine transition-colors dark:text-clay dark:group-hover:text-mint">
                    {t.class10Title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.class10Desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 2: Class 12 English */}
            <Reveal index={1}>
              <Link
                href="/class-12"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition duration-200 hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-none dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink dark:bg-brass/15 dark:text-cream">
                      NEB +2
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Literature
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-4 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-semibold text-maroon group-hover:text-pine transition-colors dark:text-clay dark:group-hover:text-mint">
                    {t.class12Title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.class12Desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 3: Grammar Foundation */}
            <Reveal index={2}>
              <Link
                href="/grammar"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition duration-200 hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-none dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink dark:bg-brass/15 dark:text-cream">
                      Rules & Exercises
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      9 Topics
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-4 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-semibold text-maroon group-hover:text-pine transition-colors dark:text-clay dark:group-hover:text-mint">
                    {t.grammarTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.grammarDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.browseGrammar}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 4: Writing Composition */}
            <Reveal index={3}>
              <Link
                href="/writing"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition duration-200 hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-none dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink dark:bg-brass/15 dark:text-cream">
                      Composition
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      3 Styles
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-4 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-semibold text-maroon group-hover:text-pine transition-colors dark:text-clay dark:group-hover:text-mint">
                    {t.writingTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.writingDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 5: Publications & Downloads */}
            <Reveal index={4}>
              <Link
                href="/pub"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition duration-200 hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-none dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink dark:bg-brass/15 dark:text-cream">
                      Library
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Downloads
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-4 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-semibold text-maroon group-hover:text-pine transition-colors dark:text-clay dark:group-hover:text-mint">
                    {t.pubTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.pubDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.viewCollection}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 6: About the Educator (Anchoring Card) */}
            <Reveal index={5} className="sm:col-span-2 lg:col-span-3">
              <Link
                href="/about"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition duration-200 hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-none dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink dark:bg-brass/15 dark:text-cream">
                      Biography
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Principal
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-4 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-semibold text-maroon group-hover:text-pine transition-colors dark:text-clay dark:group-hover:text-mint">
                    {t.navAbout}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.aboutPara2}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Divider variant="vignette" className="mt-16 sm:mt-24 mb-0" />
        </div>
      </section>

      {/* ===================================================================
          BAND 5: Teacher's Library & Curriculum Downloads Preview
          =================================================================== */}
      <section className="full-bleed bg-linen py-24 sm:py-32 lg:py-40 dark:bg-choc-elevated">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <FolioMarker label={t.folioLibrary} className="mb-3" />
              <h2
                className={`font-display text-3xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl dark:text-clay ${
                  lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.25]"
                }`}
              >
                {t.featuredPubsEyebrow}
              </h2>
              <p className="mt-3.5 text-lg leading-[1.5] text-ink/75 sm:text-xl dark:text-cream/75">
                {t.featuredPubsSubtitle}
              </p>
              <div className="mt-6">
                <Link
                  href="/pub"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:transition-none dark:bg-mint dark:text-choc dark:hover:bg-mint/85 dark:focus-visible:outline-mint"
                >
                  <span>{t.explorePub}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Document preview rows with shadow, hover pickup, and outlined tag pills */}
            <div className="space-y-3">
              {[
                { title: t.catTextbooks, desc: "Class 10 Social Studies Textbook", tag: "Textbook" },
                { title: t.catSyllabus, desc: "Secondary Level Social Studies Syllabus", tag: "Curriculum" },
                { title: t.catGuides, desc: "Teacher's Instructional Manual & Guide", tag: "Instructional" },
                { title: t.catGrid, desc: "Specification Blueprint & Question Grid", tag: "Assessment" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-brass/25 bg-paper p-4 shadow-[0_1px_2px_rgba(47,42,37,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-brass/60 hover:shadow-[0_12px_24px_-12px_rgba(47,42,37,0.18)] motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-cream/10 dark:bg-choc dark:shadow-none dark:hover:shadow-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brass/40 bg-brass/20 font-display text-xs font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-brass/15 dark:text-cream dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      PDF
                    </span>
                    <div>
                      <h4 className="font-display text-base font-medium text-ink dark:text-cream">
                        {item.title}
                      </h4>
                      <p className="text-xs text-ink/60 dark:text-cream/60">{item.desc}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-ink/15 px-2.5 py-1 text-[11px] font-medium text-ink/65 dark:border-cream/20 dark:text-cream/70">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          BAND 6: School Leadership & Digital Learning CTA (Dark Chocolate)
          =================================================================== */}
      <section className="full-bleed bg-choc py-24 sm:py-32 lg:py-40 text-cream border-t border-brass/20" data-band="choc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <FolioMarker label={t.folioCommunity} className="mb-4 text-brass-dark" />
              <h2
                className={`font-display text-3xl font-medium text-cream [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl lg:text-5xl ${
                  lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.25]"
                }`}
              >
                {t.schoolLeadershipTitle}
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-[1.5] text-cream/75 sm:text-xl">
                {t.schoolLeadershipDesc}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={SCHOOL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-choc transition hover:bg-brass-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint active:translate-y-px motion-reduce:transition-none"
                >
                  <span>{t.visitSchoolBtn}</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href={LOOMA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cream/30 bg-transparent px-6 py-3 text-sm font-semibold text-cream transition hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint active:translate-y-px motion-reduce:transition-none"
                >
                  <span>{t.visitLoomaBtn}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Unique epigraph, kept typographic (no callout-box): layering comes from the floor + seam */}
            <PullQuote
              quote={t.quote2Text}
              author={t.quote2Author}
              role={t.quote2Role}
              lang={lang}
              className="text-cream"
            />
          </div>
        </div>
      </section>
      {/* Gold-thread seam on the B6/footer boundary: full-bleed choc so the
          thread never floats on a paper sliver in light mode */}
      <section className="full-bleed bg-choc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Divider variant="gradient" className="my-0" />
        </div>
      </section>
    </div>
  );
}
