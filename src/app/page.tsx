import { FeatureCards } from "@/components/site/feature-cards"
import { Hero } from "@/components/site/hero"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export default function Home() {
  return (
    <div className="min-h-dvh p-3 sm:p-6">
      <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[28px] bg-card/60 shadow-md ring-1 ring-border backdrop-blur-sm">
        <SiteHeader />
        <Hero />
        <FeatureCards />
        <SiteFooter />
      </div>
    </div>
  )
}
