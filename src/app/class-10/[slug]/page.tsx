import DocView from "@/components/DocView";
import { getSlugs } from "@/lib/content";
import { getServerLang } from "@/lib/lang-server";

export function generateStaticParams() {
  return getSlugs("class-10").map((slug) => ({ slug }));
}

export default async function Class10Doc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getServerLang();
  return <DocView section="class-10" slug={slug} lang={lang} />;
}
