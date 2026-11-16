export function BlogListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading posts">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-bg-surface p-6 animate-pulse"
        >
          <div className="mb-4 h-[2px] w-10 rounded-full bg-border" />
          <div className="mb-3 flex gap-2">
            <div className="h-5 w-14 rounded-full bg-border" />
            <div className="h-5 w-10 rounded-full bg-border" />
          </div>
          <div className="mb-2 h-6 w-4/5 rounded bg-border" />
          <div className="mb-1 h-4 w-full rounded bg-border" />
          <div className="mb-4 h-4 w-3/4 rounded bg-border" />
          <div className="flex gap-4">
            <div className="h-3 w-24 rounded bg-border" />
            <div className="h-3 w-16 rounded bg-border" />
          </div>
        </div>
      ))}
    </div>
  );
}
