import { PageHeading } from "@/components/layout/page-heading"
import { PageShell } from "@/components/layout/page-shell"
import { getProjectCategories, getProjects } from "@/lib/projects"
import { ProjectGrid } from "./_components/project-grid"

export const metadata = {
  title: "Projects",
  description: "Things I've built — web apps, tools, and open-source work.",
}

export default function ProjectsPage() {
  const projects = getProjects()
  const categories = getProjectCategories()

  return (
    <PageShell>
      <div className="flex flex-col gap-3">
        <PageHeading eyebrow="My" title="Projects" />
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          热爱构建，乐于分享。A collection of things I've designed and built.
        </p>
      </div>

      <div className="mt-10">
        <ProjectGrid projects={projects} categories={categories} />
      </div>
    </PageShell>
  )
}
