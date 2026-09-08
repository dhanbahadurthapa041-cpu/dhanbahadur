"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PUB_CATEGORIES, PUB_ITEMS, type PubCategory } from "@/lib/pub";
import { useLang } from "@/lib/lang";
import DownloadRow from "./DownloadRow";

/** Debounce for the library search input + shareable URL sync. */
const DEBOUNCE_MS = 250;

type CatFilter = PubCategory | "all";

function isCat(v: string | null): v is PubCategory {
  return v !== null && (PUB_CATEGORIES as string[]).includes(v);
}

function itemMatches(item: (typeof PUB_ITEMS)[number], q: string): boolean {
  const toks = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (toks.length === 0) return true;
  // Bilingual by design: match against both languages at once.
  const hay = `${item.titleEn} ${item.titleNe} ${item.noteEn ?? ""} ${item.noteNe ?? ""}`.toLowerCase();
  return toks.every((tok) => hay.includes(tok));
}

/** Self-suspense so useSearchParams never breaks the static prerender. */
export default function PubLibrary() {
  return (
    <Suspense fallback={null}>
      <PubLibraryInner />
    </Suspense>
  );
}

function PubLibraryInner() {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  // Shareable initial state comes from the URL (?q=, ?cat=).
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [debounced, setDebounced] = useState(() => searchParams.get("q") ?? "");
  const [cat, setCat] = useState<CatFilter>(() => {
    const c = searchParams.get("cat");
    return isCat(c) ? c : "all";
  });

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [query]);

  // Keep the URL shareable; replace (not push) so typing stays in one entry.
  const paramsKey = searchParams.toString();
  useEffect(() => {
    const next = new URLSearchParams();
    if (debounced.trim()) next.set("q", debounced.trim());
    if (cat !== "all") next.set("cat", cat);
    const nextStr = next.toString();
    if (nextStr !== paramsKey) {
      router.replace(nextStr ? `${pathname}?${nextStr}` : pathname, { scroll: false });
    }
  }, [debounced, cat, pathname, router, paramsKey]);

  const q = debounced.trim().toLowerCase();

  const perCat = useMemo(() => {
    const m = {} as Record<PubCategory, number>;
    for (const c of PUB_CATEGORIES) {
      m[c] = PUB_ITEMS.filter((item) => item.category === c && itemMatches(item, q)).length;
    }
    return m;
  }, [q]);

  const filtered = useMemo(
    () => PUB_ITEMS.filter((item) => (cat === "all" || item.category === cat) && itemMatches(item, q)),
    [cat, q],
  );

  const labelFor = (c: PubCategory) =>
    c === "textbooks" ? t.catTextbooks : c === "syllabus" ? t.catSyllabus : c === "guides" ? t.catGuides : t.catGrid;

  const reset = () => {
    setQuery("");
    setDebounced("");
    setCat("all");
    searchRef.current?.focus();
  };

  // "All" counts every query match across categories (ignores the cat filter).
  const allCount = Object.values(perCat).reduce((a, b) => a + b, 0);
  const chips: { value: CatFilter; label: string; count: number }[] = [
    { value: "all", label: t.libAll, count: allCount },
    ...PUB_CATEGORIES.map((c) => ({ value: c as CatFilter, label: labelFor(c), count: perCat[c] })),
  ];

  return (
    <section aria-label={t.libSearchLabel} className="mt-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.libFilterLabel}>
        {chips.map((chip) => {
          const pressed = cat === chip.value;
          return (
            <button
              key={chip.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => setCat(chip.value)}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm transition motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:focus-visible:outline-mint ${
                pressed
                  ? "border-pine bg-pine font-semibold text-white shadow-[0_6px_16px_-8px_rgba(15,106,75,0.5)] dark:border-mint dark:bg-mint dark:text-ink dark:ring-1 dark:ring-white/10 dark:shadow-none"
                  : "border-ink/20 bg-surface-subtle shadow-[0_1px_2px_rgba(47,42,37,0.06)] hover:border-pine dark:border-cream/20 dark:bg-choc-elevated dark:ring-1 dark:ring-white/10 dark:shadow-none dark:hover:border-mint"
              }`}
            >
              {chip.label} <span className="opacity-90">({chip.count})</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        <label htmlFor="pub-search" className="sr-only">
          {t.libSearchLabel}
        </label>
        <input
          ref={searchRef}
          id="pub-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.libSearchPlaceholder}
          className="w-full min-h-[44px] rounded-xl border border-ink/20 bg-surface-subtle px-4 py-2 text-base text-ink shadow-[0_1px_2px_rgba(47,42,37,0.05)] placeholder:text-ink/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine dark:border-cream/20 dark:bg-choc-elevated dark:ring-1 dark:ring-white/10 dark:text-cream dark:placeholder:text-cream/60 dark:shadow-none dark:focus-visible:outline-mint"
        />
      </div>

      <p aria-live="polite" aria-atomic="true" className="mt-2 text-xs text-ink/60 dark:text-cream/60">
        {filtered.length} {filtered.length === 1 ? t.libCountSingular : t.libCountPlural}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-3 rounded-xl border border-brass/40 bg-brass/[0.07] p-8 text-center dark:border-cream/15 dark:bg-choc-elevated dark:ring-1 dark:ring-white/10">
          <span aria-hidden="true" className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brass/20 text-lg text-brass dark:bg-brass/15 dark:text-brass-dark">
            ⊘
          </span>
          {query.trim() !== "" && (
            <p className="mt-3 text-sm font-medium text-ink/80 dark:text-cream/80">“{query.trim()}”</p>
          )}
          <h2 className="mt-1 text-base font-semibold">{t.libEmptyTitle}</h2>
          <p className="mt-1 text-sm text-ink/60 dark:text-cream/60">{t.libEmptyBody}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white transition motion-reduce:transition-none hover:bg-pine-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine active:translate-y-px motion-reduce:active:translate-none motion-reduce:transition-none dark:bg-mint dark:text-choc dark:focus-visible:outline-mint"
          >
            {t.libReset}
          </button>
        </div>
      ) : (
        PUB_CATEGORIES.filter((c) => cat === "all" || c === cat).map((c) => {
          const items = filtered.filter((item) => item.category === c);
          if (items.length === 0) return null;
          return (
            <div key={c} className="mt-6">
              <h2 className="flex items-center gap-3 font-display text-xl font-semibold text-maroon after:h-px after:flex-1 after:bg-brass/30 dark:text-clay dark:after:bg-brass/20">{labelFor(c)}</h2>
              <ul className="mt-3 space-y-3">
                {items.map((item, i) => (
                  <DownloadRow key={item.titleEn} index={i} item={item} />
                ))}
              </ul>
            </div>
          );
        })
      )}
    </section>
  );
}
