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
      <section className="intro-track full-bleed py-16 sm:py-32 lg:py-40">
        <a
          href="#band-stats"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-full focus:bg-pine focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {t.skipIntro}
        </a>
        <div className="intro-stage mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <FolioMarker lang={lang} label={t.tagline} className="intro-beat-1 mb-5" />

              <h1
                className={`intro-beat-2 font-display text-5xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-6xl lg:text-7xl dark:text-clay ${
                  lang === "en" ? "tracking-tight leading-[1.08]" : "tracking-normal leading-[1.35]"
                }`}
              >
                {t.heroTitle}
              </h1>

              <p className="intro-beat-3 mt-6 max-w-xl text-lg leading-relaxed [text-wrap:pretty] text-ink/80 sm:text-xl sm:leading-relaxed dark:text-cream/80">
                {t.heroSubtitle}
              </p>

              <div className="intro-beat-4 mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/pub"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(15,106,75,0.45)] transition motion-reduce:transition-none hover:bg-pine-deep hover:shadow-[0_12px_24px_-8px_rgba(15,106,75,0.55)] dark:shadow-none dark:hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:active:translate-none motion-reduce:transition-none motion-reduce:translate-none dark:bg-mint dark:text-choc dark:hover:bg-mint/85 dark:focus-visible:outline-mint"
                >
                  <span>{t.explorePub}</span>
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/grammar"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-pine/40 bg-surface-subtle px-6 py-3.5 text-sm font-semibold text-pine shadow-none transition motion-reduce:transition-none hover:border-pine hover:bg-pine/5 hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:active:translate-none motion-reduce:transition-none motion-reduce:translate-none dark:border-cream/25 dark:bg-choc-elevated dark:text-cream dark:hover:border-mint dark:hover:text-mint dark:focus-visible:outline-mint"
                >
                  <span>{t.browseGrammar}</span>
                </Link>
              </div>

              <div className="intro-beat-5 mt-8 flex flex-wrap items-center gap-1.5 text-xs text-ink/65 dark:text-cream/65">
                <span className={`font-semibold ${lang === "en" ? "uppercase tracking-wider" : "tracking-normal"} text-pine dark:text-mint`}>
                  {t.focusLabel}
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
            <figure className="parallax-plate relative mx-auto w-full max-w-[200px] sm:max-w-[280px] lg:max-w-xs">
              <div
                aria-hidden="true"
                className="parallax-frame-a absolute -right-3 -bottom-3 sm:-right-5 sm:-bottom-5 h-full w-full rounded-3xl border-2 border-brass/60 dark:border-brass-dark/40"
              />
              <div
                aria-hidden="true"
                className="parallax-frame-b absolute -left-2 -top-2 h-full w-full rounded-3xl bg-brass/10 dark:bg-brass/[0.04]"
              />
              <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_48px_-20px_rgba(47,42,37,0.3),inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-inset ring-brass/60 dark:shadow-none">
                <Image
                  src="/images/profile.jpg"
                  alt={t.profileAlt}
                  width={520}
                  height={650}
                  sizes="(min-width:1024px) 460px, (min-width:640px) 380px, 90vw"
                  className="parallax-photo aspect-[4/5] w-full object-cover sepia-[0.28] contrast-[1.04] brightness-[1.01]"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="parallax-photo pointer-events-none absolute -inset-[15%] rounded-3xl bg-pine/10 mix-blend-multiply dark:bg-choc/15"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-brass/15 mix-blend-screen dark:bg-brass/10"
                />
              </div>
              {/* Duplicates the hero FolioMarker tagline above: decorative, hidden from AT */}
              <figcaption aria-hidden="true" className="folio-text mx-auto mt-4 hidden w-fit border-t border-brass/30 px-4 pt-2 text-center text-xs leading-relaxed text-ink/70 dark:text-cream/70 sm:block">
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
      <section id="band-stats" tabIndex={-1} className="full-bleed border-y border-brass/25 bg-linen py-16 sm:py-24 lg:py-32 dark:border-cream/10 dark:bg-choc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FolioMarker lang={lang} label={t.folioMetrics} className="justify-center mb-6" />
          <StatsRow />
        </div>
      </section>

      {/* ===================================================================
          BAND 3: Chapter-Break Pull Quote (Full-Bleed Deep Pine)
          =================================================================== */}
      <section className="band-wipe-s2 full-bleed relative overflow-hidden bg-pine on-pine py-24 sm:py-32 lg:py-40 text-cream dark:bg-pine-dark">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[36rem] max-w-none -translate-x-1/2 rounded-full bg-brass-dark/15 blur-3xl sm:h-72 sm:w-[44rem] dark:bg-brass-dark/10"
          />
          <FolioMarker lang={lang} label={t.folioQuote} className="justify-center mb-6 folio-on-dark" />
          {/* Unique epigraphs, not verbatim body repeats → isDuplicate false (exposed to AT) */}
          <PullQuote
            quote={t.quote1Text}
            author={t.quote1Author}
            role={t.quote1Role}
            lang={lang}
            className="text-cream"
          />
        </div>
      </section>

      {/* ===================================================================
          BAND 4: Academic Curriculum & Learning Pathways (Bento Grid)
          =================================================================== */}
      <section className="full-bleed bg-paper py-24 sm:py-32 lg:py-40 dark:bg-choc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <FolioMarker lang={lang} label={t.folioCurriculum} className="mb-3" />
              <h2
                className={`font-display text-3xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl lg:text-5xl dark:text-clay ${
                  lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.25]"
                }`}
              >
                {t.curriculumEyebrow}
              </h2>
              <p className="mt-3.5 max-w-2xl text-lg leading-[1.5] [text-wrap:pretty] text-ink/75 sm:text-xl dark:text-cream/75">
                {t.curriculumSubtitle}
              </p>
            </div>
            <Link
              href="/pub"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-pine transition motion-reduce:transition-none hover:text-pine-deep hover:underline hover:decoration-brass hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:text-mint dark:hover:text-cream dark:focus-visible:outline-mint"
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
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/50 bg-parchment p-8 sm:p-10 shadow-[0_2px_4px_rgba(47,42,37,0.06),0_20px_36px_-20px_rgba(47,42,37,0.22)] ring-1 ring-inset ring-white/40 transition-[transform,translate,scale,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1.5 hover:border-pine/70 hover:shadow-[0_4px_8px_rgba(47,42,37,0.05),0_24px_44px_-20px_rgba(47,42,37,0.28)] active:scale-[0.97] active:duration-100 motion-reduce:active:scale-none focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-brass/[0.10] dark:ring-white/5 dark:shadow-none dark:hover:shadow-[0_0_0_1px_rgba(201,178,124,.25),0_14px_30px_-14px_rgba(0,0,0,.7)] dark:hover:border-mint/60"
              >
                <span aria-hidden="true" className="mb-5 block h-1 w-16 rounded-full bg-gradient-to-r from-brass/80 to-pine/60 dark:from-brass-dark/70 dark:to-mint/40" />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.10em]" : "tracking-normal"}`}>
                      SEE Prep
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Unit 1–7
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-3 block h-[3px] w-14 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-medium dark:font-normal text-maroon group-hover:text-pine transition-colors motion-reduce:transition-none dark:text-clay dark:group-hover:text-mint">
                    {t.class10Title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.class10Desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-none group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 2: Class 12 English */}
            <Reveal index={1}>
              <Link
                href="/class-12"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition-[transform,translate,scale,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] active:scale-[0.97] active:duration-100 motion-reduce:active:scale-none focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-[0_0_0_1px_rgba(201,178,124,.25),0_14px_30px_-14px_rgba(0,0,0,.7)] dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.10em]" : "tracking-normal"}`}>
                      NEB +2
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Literature
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-3 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-brass/80 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-medium dark:font-normal text-maroon group-hover:text-pine transition-colors motion-reduce:transition-none dark:text-clay dark:group-hover:text-mint">
                    {t.class12Title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.class12Desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-none group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 3: Grammar Foundation */}
            <Reveal index={0}>
              <Link
                href="/grammar"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition-[transform,translate,scale,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] active:scale-[0.97] active:duration-100 motion-reduce:active:scale-none focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-[0_0_0_1px_rgba(201,178,124,.25),0_14px_30px_-14px_rgba(0,0,0,.7)] dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.10em]" : "tracking-normal"}`}>
                      Rules & Exercises
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      9 Topics
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-3 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-brass/80 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-medium dark:font-normal text-maroon group-hover:text-pine transition-colors motion-reduce:transition-none dark:text-clay dark:group-hover:text-mint">
                    {t.grammarTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.grammarDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.browseGrammar}</span>
                  <span aria-hidden="true" className="transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-none group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 4: Writing Composition */}
            <Reveal index={1}>
              <Link
                href="/writing"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition-[transform,translate,scale,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] active:scale-[0.97] active:duration-100 motion-reduce:active:scale-none focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-[0_0_0_1px_rgba(201,178,124,.25),0_14px_30px_-14px_rgba(0,0,0,.7)] dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.10em]" : "tracking-normal"}`}>
                      Composition
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      3 Styles
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-3 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-brass/80 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-medium dark:font-normal text-maroon group-hover:text-pine transition-colors motion-reduce:transition-none dark:text-clay dark:group-hover:text-mint">
                    {t.writingTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.writingDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-none group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 5: Publications & Downloads */}
            <Reveal index={2}>
              <Link
                href="/pub"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition-[transform,translate,scale,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-pine/70 hover:shadow-[0_2px_4px_rgba(47,42,37,0.04),0_14px_28px_-16px_rgba(47,42,37,0.18)] active:scale-[0.97] active:duration-100 motion-reduce:active:scale-none focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-[0_0_0_1px_rgba(201,178,124,.25),0_14px_30px_-14px_rgba(0,0,0,.7)] dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.10em]" : "tracking-normal"}`}>
                      Library
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Downloads
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-3 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-brass/80 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-medium dark:font-normal text-maroon group-hover:text-pine transition-colors motion-reduce:transition-none dark:text-clay dark:group-hover:text-mint">
                    {t.pubTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.pubDesc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.viewCollection}</span>
                  <span aria-hidden="true" className="transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-none group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>

            {/* Card 6: About the Educator (Anchoring Card) */}
            <Reveal index={0} className="sm:col-span-2 lg:col-span-3">
              <Link
                href="/about"
                className="group flex flex-col justify-between h-full rounded-2xl border border-brass/30 bg-surface-subtle p-6 sm:p-8 shadow-[0_1px_2px_rgba(47,42,37,0.06),0_2px_8px_-4px_rgba(47,42,37,0.08)] ring-1 ring-inset ring-white/40 transition-[transform,translate,scale,box-shadow,border-color] duration-200 ease-out hover:border-pine/70 active:scale-[0.97] active:duration-100 motion-reduce:active:scale-none focus-visible:border-pine/70 dark:focus-visible:border-mint/60 motion-reduce:transition-none motion-reduce:hover:translate-none dark:border-cream/15 dark:bg-choc-elevated dark:ring-white/5 dark:shadow-none dark:hover:shadow-[0_0_0_1px_rgba(201,178,124,.25),0_14px_30px_-14px_rgba(0,0,0,.7)] dark:hover:border-mint/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`badge-leak-guard rounded-full bg-brass/20 px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-brass/15 dark:text-cream ${lang === "en" ? "uppercase tracking-[0.10em]" : "tracking-normal"}`}>
                      Biography
                    </span>
                    <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] font-medium text-ink/60 dark:border-cream/20 dark:text-cream/60">
                      Principal
                    </span>
                  </div>
                  <span aria-hidden="true" className="mt-4 mb-3 block h-[3px] w-10 rounded-full bg-brass/70 dark:bg-brass-dark/60" />
                  <span aria-hidden="true" className="block h-2 w-2 rotate-45 bg-brass/80 dark:bg-brass-dark/60" />
                  <h3 className="font-display text-2xl font-medium dark:font-normal text-maroon group-hover:text-pine transition-colors motion-reduce:transition-none dark:text-clay dark:group-hover:text-mint">
                    {t.navAbout}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
                    {t.aboutPara2}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-pine dark:text-mint">
                  <span>{t.readMore}</span>
                  <span aria-hidden="true" className="transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-none group-hover:translate-x-1">→</span>
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
              <FolioMarker lang={lang} label={t.folioLibrary} className="mb-3" />
              <h2
                className={`font-display text-3xl font-medium text-maroon [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl dark:text-clay ${
                  lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.25]"
                }`}
              >
                {t.featuredPubsEyebrow}
              </h2>
              <p className="mt-3.5 text-lg leading-[1.5] [text-wrap:pretty] text-ink/75 sm:text-xl dark:text-cream/75">
                {t.featuredPubsSubtitle}
              </p>
              <div className="mt-6">
                <Link
                  href="/pub"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition motion-reduce:transition-none hover:bg-pine-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:active:translate-none motion-reduce:transition-none dark:bg-mint dark:text-choc dark:hover:bg-mint/85 dark:focus-visible:outline-mint"
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
                  className="flex flex-col gap-3 rounded-2xl border border-brass/25 bg-paper p-5 shadow-[0_1px_2px_rgba(47,42,37,0.05)] sm:flex-row sm:items-center sm:justify-between dark:border-cream/10 dark:bg-choc dark:shadow-none"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-brass/40 bg-brass/20 font-display text-[13px] font-semibold tabular-nums text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:bg-brass/20 dark:text-cream dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      PDF
                    </span>
                    <div>
                      <h4 className="font-display text-base font-medium dark:font-normal text-ink dark:text-cream">
                        {item.title}
                      </h4>
                      <p className="text-[13px] leading-[1.45] text-ink/70 dark:text-cream/70">{item.desc}</p>
                    </div>
                  </div>
                  <span className="shrink-0 self-start rounded-full border border-brass/40 px-2.5 py-1 text-[11px] font-medium text-ink/75 sm:self-auto dark:border-cream/20 dark:text-cream/70">
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
      <section className="band-wipe-s5 full-bleed bg-choc py-24 sm:py-32 lg:py-40 text-cream" data-band="choc">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <FolioMarker lang={lang} label={t.folioCommunity} className="mb-4 folio-on-dark" />
              <h2
                className={`font-display text-3xl font-medium text-cream [text-wrap:balance] [font-optical-sizing:auto] sm:text-4xl lg:text-5xl ${
                  lang === "en" ? "tracking-tight" : "tracking-normal leading-[1.25]"
                }`}
              >
                {t.schoolLeadershipTitle}
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-[1.5] [text-wrap:pretty] text-cream/75 sm:text-xl">
                {t.schoolLeadershipDesc}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={SCHOOL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-choc transition motion-reduce:transition-none hover:bg-brass-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint active:translate-y-px motion-reduce:active:translate-none motion-reduce:transition-none"
                >
                  <span>{t.visitSchoolBtn}</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href={LOOMA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cream/30 bg-transparent px-6 py-3 text-sm font-semibold text-cream transition motion-reduce:transition-none hover:border-mint hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint active:translate-y-px motion-reduce:active:translate-none motion-reduce:transition-none"
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
      <section className="full-bleed bg-choc py-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Divider variant="gradient" className="my-0 opacity-90" />
        </div>
      </section>
    </div>
  );
}
