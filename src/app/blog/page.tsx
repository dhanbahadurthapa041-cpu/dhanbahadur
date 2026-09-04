import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { STRINGS, type Lang } from "@/lib/i18n";
import { headers } from "next/headers";

export default async function BlogIndex() {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";
  const lang: Lang = cookie.includes("dbt-lang=en") ? "en" : "ne";
  const t = STRINGS[lang];
  const posts = getAllPosts(lang);
  return (
    <div>
      <Link href="/" className="text-sm text-emerald-700 dark:text-emerald-300">{t.backHome}</Link>
      <h1 className="mt-2 text-3xl font-bold">{t.blogTitle}</h1>
      <ul className="mt-6 space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <Link href={`/blog/${p.slug}`} className="text-lg font-semibold hover:text-emerald-700">
              {p.title}
            </Link>
            {p.date && <p className="text-xs text-zinc-500">{p.date}</p>}
          </li>
        ))}
        {posts.length === 0 && <li className="text-zinc-500">{t.comingSoon}</li>}
      </ul>
    </div>
  );
}
