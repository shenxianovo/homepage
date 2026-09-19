import { PageHeading } from "@/components/layout/page-heading"
import { getProjects, getProjectTypes } from "@/lib/projects"
import { ProjectGrid } from "./_components/project-grid"

export const metadata = {
  title: "Projects",
  description: "做过的一些小玩意～",
}

export default function ProjectsPage() {
  const projects = getProjects()
  const types = getProjectTypes()

  return (
    <>
      <div className="flex flex-col gap-3">
        <PageHeading eyebrow="My" title="Projects" />
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          做过的一些小玩意～
        </p>
      </div>

      <div className="mt-10">
        <ProjectGrid projects={projects} types={types} />
      </div>
    </>
  )
}
