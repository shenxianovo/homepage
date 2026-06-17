import { PageHeading } from "@/components/layout/page-heading"

export const metadata = {
  title: "About",
  description: "About me.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-3">
      <PageHeading eyebrow="A bit" title="About" />
      <p className="max-w-xl text-muted-foreground leading-relaxed">
        关于页即将上线。This page is coming soon.
      </p>
    </div>
  )
}
