import Link from "next/link";
import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export default async function NotFound() {
  const lang = await getServerLang();
  const t = STRINGS[lang];
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
      <h1 className={`font-display text-3xl font-semibold ${lang === "en" ? "tracking-tight" : "tracking-normal"}`}>{t.notFoundTitle}</h1>
      <p className="mt-2 text-ink/70 dark:text-cream/70">{t.notFoundBody}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-pine px-4 py-2 text-sm font-medium text-white transition motion-reduce:transition-none hover:bg-pine-deep"
      >
        {t.backHome}
      </Link>
    </div>
  );
}
