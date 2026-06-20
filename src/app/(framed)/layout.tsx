import type { ReactNode } from "react"
import { FramedShell } from "./_components/framed-shell"

/**
 * Layout for the framed pages (Home, About, Projects, Contact). Wraps them in
 * the persistent FramedShell (card + header + footer). Blog lives on a separate
 * Astro site (blog.shenxianovo.com), linked externally from the nav.
 */
export default function FramedLayout({ children }: { children: ReactNode }) {
  return <FramedShell>{children}</FramedShell>
}
