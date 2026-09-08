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
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
      <h1 className={`font-display text-3xl font-semibold ${lang === "en" ? "tracking-tight" : "tracking-normal"}`}>{t.errorTitle}</h1>
      <p className="mt-2 text-ink/70 dark:text-cream/70">{t.errorBody}</p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex min-h-[44px] items-center rounded-full bg-pine px-4 py-2 text-sm font-medium text-white transition motion-reduce:transition-none hover:bg-pine-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:bg-mint dark:text-choc dark:focus-visible:outline-mint"
        >
          {t.errorRetry}
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center rounded-full border border-pine px-4 py-2 text-sm font-semibold text-pine transition motion-reduce:transition-none hover:bg-pine/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:border-mint dark:text-mint dark:hover:bg-cream/10 dark:focus-visible:outline-mint"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
