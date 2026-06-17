"use client"

import { useMemo, useState } from "react"
import type { Project } from "#site/content"
import { cn } from "@/lib/utils"
import { ProjectCard } from "./project-card"

const ALL = "All"

export function ProjectGrid({ projects, types }: { projects: Project[]; types: string[] }) {
  const [active, setActive] = useState(ALL)
  const tabs = [ALL, ...types]

  const visible = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.types.includes(active))),
    [active, projects],
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "rounded-full px-4 py-2 font-medium text-sm transition-colors",
              active === tab
                ? "bg-primary text-primary-foreground shadow-glow"
                : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
