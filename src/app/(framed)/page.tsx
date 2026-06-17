import { FeatureCards } from "./_components/feature-cards"
import { Hero } from "./_components/hero"

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-auto">
        <FeatureCards />
      </div>
    </>
  )
}
