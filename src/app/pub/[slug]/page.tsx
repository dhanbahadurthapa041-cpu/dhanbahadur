import DocView from "@/components/DocView";
import { getSlugs } from "@/lib/content";
import { getServerLang } from "@/lib/lang-server";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getSlugs("pub").map((slug) => ({ slug }));
}

export default async function PubDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getServerLang();
  return <DocView section="pub" slug={slug} lang={lang} />;
}
