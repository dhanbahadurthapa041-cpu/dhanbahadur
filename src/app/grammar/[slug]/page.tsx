import DocView from "@/components/DocView";
import { getSlugs } from "@/lib/content";
import { getServerLang } from "@/lib/lang-server";

export function generateStaticParams() {
  return getSlugs("grammar").map((slug) => ({ slug }));
}

export default async function GrammarDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getServerLang();
  return <DocView section="grammar" slug={slug} lang={lang} />;
}
