import { FileClock } from "lucide-react"
import { PageHeading } from "@/components/layout/page-heading"

export const metadata = {
  title: "Resume",
  description: "shenxianovo 的个人简历，正在准备中。",
}

export default function ResumePage() {
  return (
    <div className="flex min-h-[50vh] flex-col justify-center gap-6">
      <PageHeading eyebrow="My" title="Resume" />

      <div className="flex max-w-xl items-start gap-4 rounded-3xl border border-glass-border bg-glass p-6 shadow-md backdrop-blur-glass">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <FileClock className="size-5" />
        </span>
        <div>
          <h2 className="font-display font-semibold text-lg">简历准备中</h2>
          <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
            内容还在整理，准备好后会放在这里。
          </p>
        </div>
      </div>
    </div>
  )
}
