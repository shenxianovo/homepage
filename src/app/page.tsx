import { PageShell } from "@/components/layout/page-shell"
import { FeatureCards } from "./_components/feature-cards"
import { Hero } from "./_components/hero"
import { MascotBackground } from "./_components/mascot-background"

export default function Home() {
  return (
    <PageShell background={<MascotBackground />} padded={false}>
      <Hero />
      <div className="mt-auto">
        <FeatureCards />
      </div>
    </PageShell>
  )
}
