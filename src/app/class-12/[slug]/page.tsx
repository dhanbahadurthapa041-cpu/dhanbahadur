import DocView from "@/components/DocView";
import { getSlugs } from "@/lib/content";
import { getServerLang } from "@/lib/lang-server";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getSlugs("class-12").map((slug) => ({ slug }));
}

export default async function Class12Doc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getServerLang();
  return <DocView section="class-12" slug={slug} lang={lang} />;
}
