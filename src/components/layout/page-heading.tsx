import { cn } from "@/lib/utils"

type HeadingSize = "hero" | "page" | "section"

const titleSizes: Record<HeadingSize, string> = {
  hero: "break-words text-5xl leading-[0.95] sm:text-6xl lg:text-7xl",
  page: "text-5xl lg:text-6xl",
  section: "text-3xl sm:text-4xl",
}

type PageHeadingProps = {
  /** Small green line above the title. */
  eyebrow: string
  title: string
  /** Heading level — `h1` for page titles, `h2` for in-page sections. */
  as?: "h1" | "h2"
  /** Title scale: `hero` (Home), `page` (page titles), `section` (in-page). */
  size?: HeadingSize
  className?: string
}

/**
 * The site's title motif: a small green eyebrow above a large display title
 * ending in a green dot. Single owner of this pattern — the Home hero, page
 * titles, and in-page section headings all render through it.
 */
export function PageHeading({
  eyebrow,
  title,
  as: Tag = "h1",
  size = "page",
  className,
}: PageHeadingProps) {
  return (
    <div className={className}>
      <p className="font-medium text-primary text-xl">{eyebrow}</p>
      <Tag className={cn("mt-1 font-display font-extrabold tracking-tight", titleSizes[size])}>
        {title}
        <span className="text-primary">.</span>
      </Tag>
    </div>
  )
}
