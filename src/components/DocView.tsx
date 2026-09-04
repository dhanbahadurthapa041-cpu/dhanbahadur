import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, type Section } from "@/lib/content";
import { STRINGS, type Lang } from "@/lib/i18n";

export default function DocView({
  section,
  slug,
  lang,
}: {
  section: Section;
  slug: string;
  lang: Lang;
}) {
  const t = STRINGS[lang];
  const doc = getDoc(section, slug, lang);
  if (!doc) notFound();
  return (
    <article>
      <Link href={`/${section}`} className="text-sm text-emerald-700 dark:text-emerald-300">
        {t.backSection}
      </Link>
      <h1 className="mt-2 text-3xl font-bold">{doc.title}</h1>
      {doc.date && <p className="mt-1 text-xs text-zinc-500">{doc.date}</p>}
      <div className="prose mt-6 dark:prose-invert" dangerouslySetInnerHTML={{ __html: doc.html }} />
    </article>
  );
}
