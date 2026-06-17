import { PageHeading } from "@/components/layout/page-heading"

export const metadata = {
  title: "Contact",
  description: "Get in touch.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-3">
      <PageHeading eyebrow="Say hello" title="Contact" />
      <p className="max-w-xl text-muted-foreground leading-relaxed">
        联系方式即将上线。This page is coming soon.
      </p>
    </div>
  )
}
