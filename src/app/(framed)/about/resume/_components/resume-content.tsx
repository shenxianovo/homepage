import { ChevronDown } from "lucide-react"
import type { ComponentType, ReactNode } from "react"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"

type ResumeSectionProps = {
  title: string
  description?: string
  children: ReactNode
}

type ResumeEntryProps = {
  title: string
  role?: string
  period?: string
  summary: string
  tags?: string[]
  children: ReactNode
}

const bodyClasses =
  "space-y-4 text-muted-foreground leading-relaxed [&>p>strong]:text-foreground [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:list-disc [&>ul>li]:pl-1 [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline"

function ResumeSection({ title, description, children }: ResumeSectionProps) {
  return (
    <details className="group/section overflow-hidden rounded-3xl border border-glass-border bg-glass shadow-sm backdrop-blur-glass transition-shadow open:shadow-md">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:content-none sm:p-6 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
          <span className="shrink-0 font-bold font-display text-2xl">{title}</span>
          {description ? (
            <span className="text-muted-foreground text-sm">{description}</span>
          ) : null}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform group-open/section:rotate-180">
          <ChevronDown className="size-4" />
        </span>
      </summary>

      <div className={`border-border border-t p-5 sm:p-6 ${bodyClasses}`}>{children}</div>
    </details>
  )
}

function ResumeEntry({ title, role, period, summary, tags = [], children }: ResumeEntryProps) {
  return (
    <details className="group/entry overflow-hidden rounded-2xl border border-border bg-card/45 transition-colors open:bg-card/70">
      <summary className="flex cursor-pointer list-none items-start gap-4 p-4 marker:content-none sm:p-5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          {period ? (
            <span className="font-medium text-primary text-xs tracking-wide">{period}</span>
          ) : null}
          <span className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="font-bold font-display text-foreground text-xl">{title}</span>
            {role ? <span className="text-muted-foreground text-sm">{role}</span> : null}
          </span>
          <span className="mt-3 block text-foreground leading-relaxed">{summary}</span>
          {tags.length > 0 ? (
            <span className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground text-xs"
                >
                  {tag}
                </span>
              ))}
            </span>
          ) : null}
        </span>
        <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform group-open/entry:rotate-180">
          <ChevronDown className="size-4" />
        </span>
      </summary>

      <div className={`border-border border-t px-4 py-5 sm:px-5 ${bodyClasses}`}>{children}</div>
    </details>
  )
}

type MdxModule = {
  default: ComponentType<{ components?: Record<string, ComponentType<never>> }>
}

function compileMdx(code: string) {
  // The code is generated at build time from the repository-owned resume.mdx.
  return new Function(code)({ Fragment, jsx, jsxs }) as MdxModule
}

export function ResumeContent({ code }: { code: string }) {
  const Content = compileMdx(code).default

  return (
    <div className="space-y-4">
      <Content
        components={{
          ResumeEntry: ResumeEntry as ComponentType<never>,
          ResumeSection: ResumeSection as ComponentType<never>,
        }}
      />
    </div>
  )
}
