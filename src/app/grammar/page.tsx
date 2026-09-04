import type { Metadata } from "next";
import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";
import { sectionMetadata } from "@/lib/seo";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return sectionMetadata("grammar", await getServerLang());
}

export default async function GrammarIndex() {
  const lang = await getServerLang();
  return <SectionIndex section="grammar" lang={lang} />;
}
