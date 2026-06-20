import { Clock } from "lucide-react"
import Link from "next/link"
import type { Post } from "#site/content"

export function BlogListItem({ post }: { post: Post }) {
  const { title, description, date, tags, permalink, metadata } = post
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={permalink} className="group">
      <article className="flex flex-col gap-3 rounded-2xl border border-glass-border bg-glass p-5 shadow-sm backdrop-blur-glass transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-6">
        <time dateTime={date} className="shrink-0 font-medium text-primary text-sm sm:w-28">
          {formattedDate}
        </time>

        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-base transition-colors group-hover:text-primary">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 line-clamp-1 text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <ul className="hidden flex-wrap gap-2 sm:flex">
            {tags.slice(0, 2).map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Clock className="size-3" />
            <span>{metadata.readingTime} min</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
