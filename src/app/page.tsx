"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

const CARD =
  "block rounded-lg border border-zinc-200 p-5 hover:border-emerald-600 dark:border-zinc-800 dark:hover:border-emerald-400";

export default function Home() {
  const { t } = useLang();
  return (
    <div>
      <section className="py-10 text-center">
        <h1 className="text-4xl font-bold">{t.heroTitle}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.tagline}</p>
        <p className="mx-auto mt-4 max-w-xl">{t.heroSubtitle}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/blog" className="rounded bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">
            {t.readBlog}
          </Link>
          <Link href="/downloads" className="rounded border border-emerald-700 px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-zinc-900">
            {t.getResources}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link href="/about" className={CARD}>
          <h2 className="font-semibold">{t.navAbout}</h2>
        </Link>
        <Link href="/blog" className={CARD}>
          <h2 className="font-semibold">{t.navBlog}</h2>
        </Link>
        <Link href="/downloads" className={CARD}>
          <h2 className="font-semibold">{t.navDownloads}</h2>
        </Link>
      </section>
    </div>
  );
}
