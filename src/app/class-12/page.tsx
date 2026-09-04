import type { Metadata } from "next";
import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";
import { sectionMetadata } from "@/lib/seo";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return sectionMetadata("class-12", await getServerLang());
}

export default async function Class12Index() {
  const lang = await getServerLang();
  return <SectionIndex section="class-12" lang={lang} />;
}
