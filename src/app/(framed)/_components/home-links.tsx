import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SmartLink } from "@/components/smart-link"
import { home } from "@/data/site"
import { getProjects } from "@/lib/projects"
import { getSongs } from "@/lib/songs"

export function HomeLinks() {
  const counts = {
    projects: `${getProjects().length} 个项目`,
    playlist: `${getSongs().length} 首歌`,
    blog: "技术与记录",
  }

  return (
    <section aria-labelledby="home-links-heading" className="relative z-10 mx-6 pb-2 sm:mx-10">
      <h2 id="home-links-heading" className="mb-5 font-medium text-muted-foreground text-sm">
        {home.heading}
      </h2>
      <ul className="grid gap-3 md:grid-cols-3 lg:gap-5">
        {home.links.map((item) => (
          <li key={item.id}>
            <SmartLink
              href={item.href}
              className="group grid h-full grid-cols-[auto_1fr] items-start gap-x-4 rounded-2xl border border-border bg-glass p-5 transition-colors hover:border-primary/40 hover:bg-card focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 sm:p-6 md:flex md:flex-col md:gap-5 md:p-5 lg:p-6"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <item.icon className="size-5" />
              </span>
              <div className="contents md:flex md:w-full md:min-w-0 md:flex-1 md:flex-col">
                <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 self-center md:self-auto">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <span className="text-muted-foreground text-xs">{item.label}</span>
                </div>
                <p className="col-span-2 mt-4 flex-1 text-muted-foreground text-sm leading-relaxed md:mt-2">
                  {item.description}
                </p>
                <div className="col-span-2 mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground">{counts[item.id]}</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    {item.action}
                    {item.id === "blog" ? (
                      <ArrowUpRight className="size-4 text-primary" />
                    ) : (
                      <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                    )}
                  </span>
                </div>
              </div>
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
