"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import type { TocEntry } from "@/lib/content";

/**
 * Scroll-spy over the rendered h2/h3 ids. The ids are joined into one
 * primitive dep so the observer is only rebuilt when the TOC changes.
 * No animation here, so nothing to disable for reduced-motion readers.
 */
function useScrollSpy(idsKey: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = idsKey.split("\n").filter(Boolean);
    if (ids.length === 0) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [idsKey]);

  return active;
}

function TocLinks({
  toc,
  active,
  onNavigate,
  listId,
}: {
  toc: TocEntry[];
  active: string | null;
  onNavigate?: () => void;
  listId?: string;
}) {
  return (
    <ul id={listId} className="space-y-1 text-sm">
      {toc.map((entry) => {
        const isActive = active === entry.id;
        return (
          <li key={entry.id} className={entry.level === 3 ? "ml-4" : undefined}>
            <a
              href={`#${entry.id}`}
              aria-current={isActive ? "true" : undefined}
              onClick={onNavigate}
              className={`block rounded px-2 py-1 transition motion-reduce:transition-none ${
                isActive
                  ? "bg-pine/10 font-semibold text-pine dark:bg-mint/10 dark:text-mint"
                  : "text-ink/70 hover:text-pine dark:text-cream/70 dark:hover:text-mint"
              }`}
            >
              {entry.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Sticky desktop rail. Rendered only when the lesson has 3+ headings. */
export function TocRail({ toc }: { toc: TocEntry[] }) {
  const { t } = useLang();
  const active = useScrollSpy(toc.map((e) => e.id).join("\n"));
  return (
    <nav aria-label={t.onThisPage} className="toc-rail hidden lg:block">
      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto rounded-xl border border-ink/15 bg-[#fffdf8] p-4 dark:border-cream/15 dark:bg-cream/[0.04]">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/60 dark:text-cream/60">
          {t.onThisPage}
        </p>
        <TocLinks toc={toc} active={active} />
      </div>
    </nav>
  );
}

/** Collapsible "On this page" drawer for mobile. Rendered only with 3+ headings. */
export function TocDrawer({ toc }: { toc: TocEntry[] }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(toc.map((e) => e.id).join("\n"));
  return (
    <div className="toc-drawer mt-4 lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="toc-drawer-list"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-ink/15 bg-[#fffdf8] px-4 py-2.5 text-sm font-semibold transition motion-reduce:transition-none dark:border-cream/15 dark:bg-cream/[0.04]"
      >
        {t.onThisPage}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div hidden={!open} className="mt-2 rounded-xl border border-ink/15 bg-[#fffdf8] p-3 dark:border-cream/15 dark:bg-cream/[0.04]">
        <TocLinks toc={toc} active={active} listId="toc-drawer-list" onNavigate={() => setOpen(false)} />
      </div>
    </div>
  );
}
