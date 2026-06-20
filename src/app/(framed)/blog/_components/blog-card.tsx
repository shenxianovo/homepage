import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import type { Post } from "#site/content"

export function BlogCard({ post }: { post: Post }) {
  const { title, description, date, tags, permalink, metadata } = post
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={permalink} className="group">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-glass-border bg-glass shadow-sm backdrop-blur-glass transition-shadow hover:shadow-md">
        <div className="relative flex items-start justify-between p-5 pb-0">
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-primary text-xs">
              <Calendar className="size-3" />
              <time dateTime={date}>{formattedDate}</time>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
            {title}
          </h3>

          {description ? (
            <p className="mt-2 flex-1 text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          ) : null}

          <div className="mt-4 flex items-center justify-between gap-3">
            <ul className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-1.5 text-muted-foreground text-xs">
              <Clock className="size-3" />
              <span>{metadata.readingTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
