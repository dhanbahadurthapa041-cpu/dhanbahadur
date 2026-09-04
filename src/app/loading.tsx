export default function Loading() {
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-3 h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800/70" />
      <div className="mt-2 h-4 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800/70" />
      <div className="mt-6 space-y-3">
        <div className="h-20 rounded-lg border border-zinc-200 dark:border-zinc-800" />
        <div className="h-20 rounded-lg border border-zinc-200 dark:border-zinc-800" />
        <div className="h-20 rounded-lg border border-zinc-200 dark:border-zinc-800" />
      </div>
    </div>
  );
}
