"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { PageTransition } from "@/components/layout/page-transition"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { cn } from "@/lib/utils"
import { MascotBackground } from "./mascot-background"

/**
 * Persistent frame for the "framed" route group: the rounded cream card with
 * header on top and footer at the bottom. Home caps its minimum height so
 * tall windows don't stretch the artwork; other pages fill the viewport.
 * Lives in the group layout so it is NOT remounted on navigation —
 * only the inner page content swaps. That persistence is what lets the
 * header's layoutId nav pill slide between tabs.
 *
 * Per-page differences are derived from the pathname instead of props, since
 * a layout cannot receive props from the page it wraps:
 * - Home (`/`) gets the original masked backdrop across the full frame and an
 *   unpadded main (Hero / HomeLinks manage their spacing).
 * - Every other framed page gets a padded main and no backdrop.
 */
export function FramedShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div className="flex min-h-[var(--site-viewport-height)] justify-center p-4 site-sm:p-8">
      {/* Clip rounded corners without creating a scroll container that traps sticky controls. */}
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-[1480px] flex-col overflow-clip rounded-frame bg-card/60 shadow-md ring-1 ring-border backdrop-blur-sm",
          isHome
            ? "min-h-[min(calc(var(--site-viewport-height)-2rem),60rem)] site-sm:min-h-[min(calc(var(--site-viewport-height)-4rem),60rem)] self-start"
            : "min-h-[calc(var(--site-viewport-height)-2rem)] site-sm:min-h-[calc(var(--site-viewport-height)-4rem)]",
        )}
      >
        {isHome ? <MascotBackground /> : null}
        <div className="relative z-10 flex flex-1 flex-col">
          <SiteHeader />
          <main
            className={cn(
              "flex flex-1 flex-col",
              !isHome && "px-6 site-sm:px-10 py-10 site-md:py-14",
            )}
          >
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
