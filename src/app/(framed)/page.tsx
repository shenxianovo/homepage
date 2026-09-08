import { Hero } from "./_components/hero"
import { HomeLinks } from "./_components/home-links"

export const metadata = {
  title: "Home",
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-auto">
        <HomeLinks />
      </div>
    </>
  )
}
