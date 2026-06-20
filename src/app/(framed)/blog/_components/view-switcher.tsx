"use client"

import { LayoutGrid, List, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export type BlogViewMode = "card" | "list" | "minimal"

const options: { mode: BlogViewMode; icon: typeof LayoutGrid; label: string }[] = [
  { mode: "card", icon: LayoutGrid, label: "Card view" },
  { mode: "list", icon: List, label: "List view" },
  { mode: "minimal", icon: Minus, label: "Minimal view" },
]

export function ViewSwitcher({
  active,
  onChange,
}: {
  active: BlogViewMode
  onChange: (mode: BlogViewMode) => void
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-glass p-1 backdrop-blur-glass">
      {options.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          type="button"
          aria-label={label}
          aria-pressed={active === mode}
          onClick={() => onChange(mode)}
          className={cn(
            "flex size-8 items-center justify-center rounded-full transition-colors",
            active === mode
              ? "bg-primary text-primary-foreground shadow-glow"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  )
}
