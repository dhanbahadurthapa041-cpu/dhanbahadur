import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export default async function GrammarIndex() {
  const lang = await getServerLang();
  return <SectionIndex section="grammar" lang={lang} />;
}
