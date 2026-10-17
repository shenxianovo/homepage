export default function Loading() {
  return (
    <div role="status" aria-label="加载中" aria-busy="true" className="flex-1 py-4">
      <div aria-hidden="true" className="space-y-5 motion-safe:animate-pulse">
        <div className="h-12 w-56 max-w-full rounded-lg bg-muted" />
        <div className="h-4 w-full max-w-xl rounded-full bg-muted" />
        <div className="h-4 w-4/5 max-w-lg rounded-full bg-muted" />
        <div className="h-4 w-3/5 max-w-md rounded-full bg-muted" />
      </div>
    </div>
  )
}
