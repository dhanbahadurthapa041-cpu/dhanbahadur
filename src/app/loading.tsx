export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse motion-reduce:animate-none">
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true">
        <div className="h-8 w-2/3 rounded bg-ink/10 dark:bg-cream/10" />
        <div className="mt-3 h-4 w-full rounded bg-ink/[0.07] dark:bg-cream/[0.07]" />
        <div className="mt-2 h-4 w-5/6 rounded bg-ink/[0.07] dark:bg-cream/[0.07]" />
        <div className="mt-6 space-y-3">
          <div className="h-20 rounded-xl border border-ink/15 dark:border-cream/15" />
          <div className="h-20 rounded-xl border border-ink/15 dark:border-cream/15" />
          <div className="h-20 rounded-xl border border-ink/15 dark:border-cream/15" />
        </div>
      </div>
    </div>
  );
}
