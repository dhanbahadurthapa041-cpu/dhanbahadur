import { STRINGS } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang-server";

/** Route loading skeleton mirrors the inner-page frame (max-w-4xl + folio
 *  sliver + title block) so resolution never shifts layout. Static brass
 *  shimmer (no grey boxes); reduced-motion safe. */
export default async function Loading() {
  const t = STRINGS[await getServerLang()];
  return (
    <div role="status" aria-live="polite" className="animate-pulse motion-reduce:animate-none">
      <span className="sr-only">{t.loadingLabel}</span>
      <div aria-hidden="true" className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <div className="h-3 w-24 rounded-full bg-brass/30 dark:bg-brass-dark/20" />
        <div className="mt-4 h-10 w-3/4 rounded-lg bg-ink/10 dark:bg-cream/10" />
        <div className="mt-6 space-y-3">
          <div className="h-20 rounded-xl border border-brass/25 bg-surface-subtle dark:border-cream/15 dark:bg-choc-elevated" />
          <div className="h-20 rounded-xl border border-brass/25 bg-surface-subtle dark:border-cream/15 dark:bg-choc-elevated" />
          <div className="h-20 rounded-xl border border-brass/25 bg-surface-subtle dark:border-cream/15 dark:bg-choc-elevated" />
        </div>
      </div>
    </div>
  );
}
