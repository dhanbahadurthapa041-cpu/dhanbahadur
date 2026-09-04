import type { Metadata } from "next";
import DocView from "@/components/DocView";
import { getServerLang } from "@/lib/lang-server";
import { docMetadata } from "@/lib/seo";

// Language comes from the `dbt-lang` cookie per request — never statically cache.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return docMetadata("writing", slug, await getServerLang());
}

export default async function WritingDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getServerLang();
  return <DocView section="writing" slug={slug} lang={lang} />;
}
