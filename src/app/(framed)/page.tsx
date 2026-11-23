import { Hero } from "./_components/hero"
import { HomeLinks } from "./_components/home-links"

export const metadata = {
  title: "Home",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <>
      <Hero />
      <HomeLinks />
    </>
  )
}
