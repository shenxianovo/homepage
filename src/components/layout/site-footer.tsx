import { SocialLinks } from "@/components/layout/social-links"
import { site } from "@/data/site"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="flex site-sm:flex-row flex-col items-center justify-between gap-5 px-6 site-sm:px-10 py-8">
      <p className="text-muted-foreground text-sm">
        © {year} &nbsp; {site.name}. All rights reserved.
      </p>
      <SocialLinks variant="icon" />
    </footer>
  )
}
