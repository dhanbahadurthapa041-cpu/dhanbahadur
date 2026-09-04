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
      <Link href="/" className="text-sm text-emerald-700 dark:text-emerald-300">{t.backHome}</Link>
      <h1 className="mt-2 text-3xl font-bold">{t.aboutTitle}</h1>
      <Image
        src="/images/profile.jpg"
        alt={t.profileAlt}
        width={192}
        height={192}
        className="mt-6 h-48 w-48 rounded-full object-cover"
        priority
      />
      <div className="prose mt-4 space-y-4 dark:prose-invert">
        <p>{t.aboutPara1}</p>
        <p>{t.aboutPara2}</p>
      </div>
    </article>
  );
}
