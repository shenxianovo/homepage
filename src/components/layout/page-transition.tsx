"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Fades page content in on each route change. Keyed by pathname so
 * navigating remounts the inner content and replays the entrance.
 * The surrounding shell (header, footer, card) stays put.
 *
 * CSS starts the fade as soon as HTML and styles arrive, without waiting
 * for hydration. Only opacity animates, avoiding backdrop-blur repainting.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-enter flex flex-1 flex-col">
      {children}
    </div>
  )
}
