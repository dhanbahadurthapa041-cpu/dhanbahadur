import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";
import { aboutMetadata } from "@/lib/seo";
import FolioMarker from "@/components/FolioMarker";
import PullQuote from "@/components/PullQuote";
import Divider from "@/components/Divider";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return aboutMetadata(await getServerLang());
}

export default async function About() {
  const lang = await getServerLang();
  const t = STRINGS[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 lg:py-32">
      <Link
        href="/"
        className="no-print inline-flex items-center gap-1 text-sm font-medium text-pine transition motion-reduce:transition-none hover:text-pine-deep dark:text-mint dark:hover:text-cream"
      >
        {t.backHome}
      </Link>

      <article className="mt-6">
        <FolioMarker lang={lang} label={t.folioOverview} className="mb-4" />

        <h1
          className={`font-display text-4xl font-semibold text-maroon sm:text-5xl dark:text-clay ${
            lang === "en" ? "tracking-tight" : "tracking-normal"
          }`}
        >
          {t.aboutTitle}
        </h1>

        <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
          <figure className="relative mx-auto sm:mx-0 w-fit">
            <div
              aria-hidden="true"
              className="absolute -right-2.5 -bottom-2.5 h-full w-full rounded-2xl border border-brass/80 dark:border-brass-dark/60"
            />
            <Image
              src="/images/profile.jpg"
              alt={t.profileAlt}
              width={220}
              height={275}
              className="relative aspect-[4/5] w-48 sm:w-56 rounded-2xl object-cover shadow-[0_8px_24px_-12px_rgba(47,42,37,0.35)] dark:brightness-90 dark:saturate-[.92] dark:shadow-none"
              priority
            />
          </figure>

          <div className={`prose max-w-none dark:prose-invert ${lang === "en" ? "has-drop-cap" : ""}`}>
            <p className="text-lg leading-relaxed text-ink/85 dark:text-cream/85">
              {t.aboutPara1}
            </p>
            <p className="text-base leading-relaxed text-ink/80 dark:text-cream/80">
              {t.aboutPara2}
            </p>
          </div>
        </div>

        {/* Editorial Pull Quote (with self-contained brass framing rules) */}
        <PullQuote
          quote={t.quote1Text}
          author={t.quote1Author}
          role={t.quote1Role}
          lang={lang}
        />

        {/* Ceremonial vignette transition to leadership cards (max 1x per page) */}
        <Divider variant="vignette" />

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-brass/25 bg-surface-subtle p-6 dark:border-cream/15 dark:bg-choc-elevated">
            <h2 className="font-display text-lg font-semibold text-maroon dark:text-clay">
              {t.schoolLeadershipTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              {t.schoolLeadershipDesc}
            </p>
          </div>

          <div className="rounded-2xl border border-brass/25 bg-surface-subtle p-6 dark:border-cream/15 dark:bg-choc-elevated">
            <h2 className="font-display text-lg font-semibold text-maroon dark:text-clay">
              {t.featuredPubsEyebrow}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              {t.featuredPubsSubtitle}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
