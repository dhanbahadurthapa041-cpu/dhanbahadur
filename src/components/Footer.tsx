"use client";

import { useLang } from "@/lib/lang";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Dhan Bahadur Thapa</p>
        <p className="mt-1">{t.footerNote}</p>
      </div>
    </footer>
  );
}
