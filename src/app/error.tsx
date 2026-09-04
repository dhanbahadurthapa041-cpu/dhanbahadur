"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLang();
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold">{t.errorTitle}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.errorBody}</p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded bg-emerald-700 px-4 py-2 text-sm text-white hover:bg-emerald-800"
        >
          {t.errorRetry}
        </button>
        <Link
          href="/"
          className="rounded border border-emerald-700 px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-zinc-900"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}
