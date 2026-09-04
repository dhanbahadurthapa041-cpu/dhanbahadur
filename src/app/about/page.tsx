"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/lang";

export default function About() {
  const { t } = useLang();
  return (
    <article>
      <Link href="/" className="text-sm text-emerald-700 dark:text-emerald-300">{t.backHome}</Link>
      <h1 className="mt-2 text-3xl font-bold">{t.aboutTitle}</h1>
      <Image
        src="/images/profile.jpg"
        alt={t.profileAlt}
        width={192}
        height={192}
        className="mt-6 h-48 w-48 rounded-full object-cover"
        priority
      />
      <div className="prose mt-4 space-y-4 dark:prose-invert">
        <p>{t.aboutPara1}</p>
        <p>{t.aboutPara2}</p>
      </div>
    </article>
  );
}
