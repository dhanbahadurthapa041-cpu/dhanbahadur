import Link from "next/link";
import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export default async function NotFound() {
  const t = STRINGS[await getServerLang()];
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{t.notFoundTitle}</h1>
      <p className="mt-2 text-ink/70 dark:text-cream/70">{t.notFoundBody}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-pine px-4 py-2 text-sm font-medium text-white transition hover:bg-pine-deep"
      >
        {t.backHome}
      </Link>
    </div>
  );
}
