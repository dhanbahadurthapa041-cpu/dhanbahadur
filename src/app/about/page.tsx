import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";
import { aboutMetadata } from "@/lib/seo";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return aboutMetadata(await getServerLang());
}

export default async function About() {
  const t = STRINGS[await getServerLang()];
  return (
    <article>
      <Link href="/" className="text-sm font-medium text-pine dark:text-mint">{t.backHome}</Link>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-maroon sm:text-4xl dark:text-clay">{t.aboutTitle}</h1>
      <div className="relative mt-6 w-fit">
        <div
          aria-hidden="true"
          className="absolute -right-2 -bottom-2 h-full w-full rounded-2xl border border-brass"
        />
        <Image
          src="/images/profile.jpg"
          alt={t.profileAlt}
          width={192}
          height={192}
          className="relative h-48 w-48 rounded-2xl object-cover"
          priority
        />
      </div>
      <div className="prose mt-6 max-w-none space-y-4 dark:prose-invert">
        <p>{t.aboutPara1}</p>
        <p>{t.aboutPara2}</p>
      </div>
    </article>
  );
}
