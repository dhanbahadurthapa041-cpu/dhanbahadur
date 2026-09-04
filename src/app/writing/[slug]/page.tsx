import DocView from "@/components/DocView";
import { getSlugs } from "@/lib/content";
import { getServerLang } from "@/lib/lang-server";

export function generateStaticParams() {
  return getSlugs("writing").map((slug) => ({ slug }));
}

export default async function WritingDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getServerLang();
  return <DocView section="writing" slug={slug} lang={lang} />;
}
