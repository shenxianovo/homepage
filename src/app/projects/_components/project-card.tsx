import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import type { Project } from "#site/content"
import { GithubIcon } from "@/components/brand-icons"

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, types, tags, cover, live, github } = project

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-glass-border bg-glass shadow-sm backdrop-blur-glass transition-shadow hover:shadow-md">
      {/* Cover slot — image if provided, otherwise a soft branded placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-primary-soft">
        {cover ? (
          <Image
            src={cover.src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-hero-glow">
            <span className="font-display font-semibold text-2xl text-primary/40">{title}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {types.map((type) => (
            <span
              key={type}
              className="rounded-full bg-background/80 px-3 py-1 font-medium text-foreground text-xs backdrop-blur-sm"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-semibold text-lg">{title}</h3>
          <div className="flex shrink-0 items-center gap-1.5">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source on GitHub`}
                className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            ) : null}
            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title}`}
                className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>

        <p className="mt-2 flex-1 text-muted-foreground text-sm leading-relaxed">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
