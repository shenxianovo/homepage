import type { ReactNode } from "react"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

/**
 * Standard page shell: the rounded cream card with header on top and footer at
 * the bottom. Used by content pages (Projects, Blog, Contact). The Home page
 * uses its own shell because it layers a full-card mascot background.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
      <div className="relative mx-auto flex min-h-[760px] w-full max-w-[1480px] flex-col overflow-hidden rounded-[28px] bg-card/60 shadow-md ring-1 ring-border backdrop-blur-sm">
        <SiteHeader />
        <main className="flex-1 px-6 py-10 sm:px-10 md:py-14">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}
