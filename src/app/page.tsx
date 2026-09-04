"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/lang";

const CARD =
  "block rounded-lg border border-zinc-200 p-5 hover:border-emerald-600 dark:border-zinc-800 dark:hover:border-emerald-400";

export default function Home() {
  const { t } = useLang();
  return (
    <div>
      <section className="py-10 text-center">
        <Image
          src="/images/profile.jpg"
          alt={t.profileAlt}
          width={112}
          height={112}
          className="mx-auto h-28 w-28 rounded-full object-cover"
          priority
        />
        <h1 className="mt-4 text-4xl font-bold">{t.heroTitle}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.tagline}</p>
        <p className="mx-auto mt-4 max-w-xl">{t.heroSubtitle}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/pub" className="rounded bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800">
            {t.explorePub}
          </Link>
          <Link href="/grammar" className="rounded border border-emerald-700 px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-zinc-900">
            {t.browseGrammar}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link href="/pub" className={CARD}>
          <h2 className="font-semibold">{t.pubTitle}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t.pubDesc}</p>
        </Link>
        <Link href="/writing" className={CARD}>
          <h2 className="font-semibold">{t.writingTitle}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t.writingDesc}</p>
        </Link>
        <Link href="/grammar" className={CARD}>
          <h2 className="font-semibold">{t.grammarTitle}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t.grammarDesc}</p>
        </Link>
        <Link href="/class-10" className={CARD}>
          <h2 className="font-semibold">{t.class10Title}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t.class10Desc}</p>
        </Link>
        <Link href="/class-12" className={CARD}>
          <h2 className="font-semibold">{t.class12Title}</h2>
          <p className="mt-1 text-sm text-zinc-500">{t.class12Desc}</p>
        </Link>
        <Link href="/about" className={CARD}>
          <h2 className="font-semibold">{t.navAbout}</h2>
        </Link>
      </section>
    </div>
  );
}
