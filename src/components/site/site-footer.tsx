import { socials } from "@/data/site"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="flex flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row sm:px-10">
      <p className="text-muted-foreground text-sm">
        © {year} &nbsp; {"YOUR NAME"}. All rights reserved.
      </p>
      <div className="flex items-center gap-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground transition-transform hover:-translate-y-0.5"
          >
            <s.icon className="size-4" />
          </a>
        ))}
      </div>
    </footer>
  )
}
