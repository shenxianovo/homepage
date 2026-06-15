import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 p-8">
      <div className="-z-10 pointer-events-none absolute inset-0 bg-hero-glow" />
      <p className="font-medium text-primary text-xl">Hi, I'm</p>
      <h1 className="font-display text-4xl tracking-tight">
        YOUR NAME<span className="text-primary">.</span>
      </h1>
      <p className="max-w-md text-center text-muted-foreground">
        Soft green, airy whitespace, minimal glass. Design tokens are live.
      </p>
      <div className="flex gap-4">
        <Button>Explore Projects</Button>
        <Button variant="outline">Download CV</Button>
      </div>
      <ThemeToggle />
    </main>
  )
}
