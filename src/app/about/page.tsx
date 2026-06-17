import { PageHeading } from "@/components/layout/page-heading"
import { PageShell } from "@/components/layout/page-shell"

export const metadata = {
  title: "About",
  description: "About me.",
}

export default function AboutPage() {
  return (
    <PageShell>
      <div className="flex flex-col gap-3">
        <PageHeading eyebrow="A bit" title="About" />
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          关于页即将上线。This page is coming soon.
        </p>
      </div>
    </PageShell>
  )
}
