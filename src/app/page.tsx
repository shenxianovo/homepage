import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8">
      <h1 className="font-semibold text-4xl tracking-tight">Homepage</h1>
      <p className="text-muted-foreground text-sm">Scaffold ready. Design coming next.</p>
      <ThemeToggle />
    </main>
  )
}
