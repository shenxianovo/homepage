import type { ReactNode } from "react"
import { PageTransition } from "@/components/layout/page-transition"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { cn } from "@/lib/utils"

/**
 * Shared page shell: the rounded cream card with header on top and footer at
 * the bottom, filling at least the viewport height. Used by every page.
 *
 * - `background` layers a full-card backdrop behind the content (Home uses this
 *   for the masked mascot scene). Content pages omit it.
 * - `padded` (default true) wraps children in a padded `<main>`. Home sets it
 *   false because its sections (Hero, FeatureCards) manage their own spacing.
 */
export function PageShell({
  children,
  background,
  padded = true,
}: {
  children: ReactNode
  background?: ReactNode
  padded?: boolean
}) {
  return (
    <div className="flex min-h-dvh justify-center p-4 sm:p-8">
      <div className="relative mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-[1480px] flex-col overflow-hidden rounded-[28px] bg-card/60 shadow-md ring-1 ring-border backdrop-blur-sm sm:min-h-[calc(100dvh-4rem)]">
        {background}
        <div className="relative z-10 flex flex-1 flex-col">
          <SiteHeader />
          <main className={cn("flex flex-1 flex-col", padded && "px-6 py-10 sm:px-10 md:py-14")}>
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
