import Link from "next/link"
import type { Post } from "#site/content"

export function BlogMinimalItem({ post }: { post: Post }) {
  const { title, date, permalink } = post
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={permalink} className="group">
      <article className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-primary">
        <h3 className="min-w-0 flex-1 truncate font-medium text-sm">{title}</h3>
        <time
          dateTime={date}
          className="shrink-0 text-muted-foreground text-xs transition-colors group-hover:text-primary"
        >
          {formattedDate}
        </time>
      </article>
    </Link>
  )
}
