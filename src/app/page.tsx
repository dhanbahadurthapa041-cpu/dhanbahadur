import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";
import { homeMetadata } from "@/lib/seo";

const CARD =
  "group block rounded-xl border border-ink/15 bg-[#fffdf8] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-pine/60 hover:shadow-[0_16px_32px_-24px_rgba(47,42,37,0.55)] dark:border-cream/15 dark:bg-cream/[0.04] dark:hover:border-mint/60";

const CARD_TITLE = "font-display text-xl font-semibold text-maroon dark:text-clay";

const CARD_DESC = "mt-1 text-sm text-ink/60 dark:text-cream/60";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return homeMetadata(await getServerLang());
}

export default async function Home() {
  const t = STRINGS[await getServerLang()];
  return (
    <div>
      <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-pine dark:text-mint">
            <span aria-hidden="true" className="h-px w-10 bg-brass" />
            {t.tagline}
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink/75 dark:text-cream/75">
            {t.heroSubtitle}
          </p>
          <div className="mt-8">
            <Link
              href="/pub"
              className="inline-block rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-deep"
            >
              {t.explorePub}
            </Link>
          </div>
        </div>
        <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl border border-brass"
          />
          <Image
            src="/images/profile.jpg"
            alt={t.profileAlt}
            width={480}
            height={600}
            sizes="(min-width:1024px) 380px, (min-width:640px) 320px, 90vw"
            className="relative aspect-[4/5] w-full rounded-2xl object-cover"
            priority
          />
        </figure>
      </section>

      <div aria-hidden="true" className="border-t border-brass/60" />

      <section className="grid gap-4 py-10 sm:grid-cols-3">
        <Link href="/pub" className={CARD}>
          <h2 className={CARD_TITLE}>{t.pubTitle}</h2>
          <p className={CARD_DESC}>{t.pubDesc}</p>
        </Link>
        <Link href="/writing" className={CARD}>
          <h2 className={CARD_TITLE}>{t.writingTitle}</h2>
          <p className={CARD_DESC}>{t.writingDesc}</p>
        </Link>
        <Link href="/grammar" className={CARD}>
          <h2 className={CARD_TITLE}>{t.grammarTitle}</h2>
          <p className={CARD_DESC}>{t.grammarDesc}</p>
        </Link>
        <Link href="/class-10" className={CARD}>
          <h2 className={CARD_TITLE}>{t.class10Title}</h2>
          <p className={CARD_DESC}>{t.class10Desc}</p>
        </Link>
        <Link href="/class-12" className={CARD}>
          <h2 className={CARD_TITLE}>{t.class12Title}</h2>
          <p className={CARD_DESC}>{t.class12Desc}</p>
        </Link>
        <Link href="/about" className={CARD}>
          <h2 className={CARD_TITLE}>{t.navAbout}</h2>
        </Link>
      </section>
    </div>
  );
}
