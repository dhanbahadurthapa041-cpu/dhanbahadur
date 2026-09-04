import Link from "next/link";
import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export default async function NotFound() {
  const t = STRINGS[await getServerLang()];
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold">{t.notFoundTitle}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.notFoundBody}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800"
      >
        {t.backHome}
      </Link>
    </div>
  );
}
