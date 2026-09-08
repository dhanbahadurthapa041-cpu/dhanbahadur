"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, lang } = useLang();
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className={`font-display text-3xl font-semibold ${lang === "en" ? "tracking-tight" : "tracking-normal"}`}>{t.errorTitle}</h1>
      <p className="mt-2 text-ink/70 dark:text-cream/70">{t.errorBody}</p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-full bg-pine px-4 py-2 text-sm font-medium text-white transition motion-reduce:transition-none hover:bg-pine-deep"
        >
          {t.errorRetry}
        </button>
        <Link
          href="/"
          className="rounded-full border border-pine px-4 py-2 text-sm hover:bg-pine/10 dark:border-mint dark:hover:bg-cream/10"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
