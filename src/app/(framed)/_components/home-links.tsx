import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SmartLink } from "@/components/smart-link"
import { home } from "@/data/site"
import { getProjects } from "@/lib/projects"
import { getSongs } from "@/lib/songs"

export function HomeLinks() {
  const counts: Partial<Record<(typeof home.links)[number]["id"], string>> = {
    projects: `${getProjects().length} 个项目`,
    playlist: `${getSongs().length} 首歌`,
  }

  return (
    <section aria-label="站点入口" className="relative z-10 mx-6 pb-2 sm:mx-10">
      <ul className="grid gap-3 md:grid-cols-3 lg:gap-5">
        {home.links.map((item) => {
          const isExternal = /^https?:\/\//.test(item.href)
          const count = counts[item.id]

          return (
            <li key={item.id}>
              <SmartLink
                href={item.href}
                className="group grid h-full grid-cols-[auto_1fr] items-start gap-x-4 rounded-lg border border-border bg-glass p-5 transition-colors hover:border-primary/40 hover:bg-card focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 sm:p-6 md:flex md:flex-col md:gap-4 md:p-5 lg:p-6"
              >
                <div className="flex items-center justify-between md:w-full">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <item.icon className="size-5" />
                  </span>
                  {count ? (
                    <span className="hidden text-muted-foreground text-xs md:inline">{count}</span>
                  ) : null}
                </div>
                <div className="contents md:flex md:w-full md:min-w-0 md:flex-1 md:flex-col">
                  <div className="flex min-w-0 items-center justify-between gap-2 self-center md:self-auto">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      {count ? <span className="md:hidden">{count}</span> : null}
                      {isExternal ? (
                        <ArrowUpRight className="size-4 text-primary" />
                      ) : (
                        <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                      )}
                    </span>
                  </div>
                  <p className="col-span-2 mt-3 flex-1 text-muted-foreground text-sm leading-relaxed md:mt-2">
                    {item.description}
                  </p>
                </div>
              </SmartLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
