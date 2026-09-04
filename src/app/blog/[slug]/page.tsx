import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getSlugs } from "@/lib/posts";
import { STRINGS, type Lang } from "@/lib/i18n";
import { headers } from "next/headers";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = await headers();
  const cookie = h.get("cookie") ?? "";
  const lang: Lang = cookie.includes("dbt-lang=en") ? "en" : "ne";
  const t = STRINGS[lang];
  const post = getPost(slug, lang);
  if (!post) notFound();
  return (
    <article>
      <Link href="/blog" className="text-sm text-emerald-700 dark:text-emerald-300">{t.backBlog}</Link>
      <h1 className="mt-2 text-3xl font-bold">{post.title}</h1>
      {post.date && <p className="mt-1 text-xs text-zinc-500">{post.date}</p>}
      <div className="prose mt-6 dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
