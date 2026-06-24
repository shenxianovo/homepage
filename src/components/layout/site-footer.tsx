import { SocialLinks } from "@/components/layout/social-links"
import { site } from "@/data/site"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="flex flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row sm:px-10">
      <p className="text-muted-foreground text-sm">
        © {year} &nbsp; {site.name}. All rights reserved.
      </p>
      <SocialLinks variant="icon" />
    </footer>
  )
}
