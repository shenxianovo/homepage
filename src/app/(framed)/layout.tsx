import type { ReactNode } from "react"
import { FramedShell } from "./_components/framed-shell"

/**
 * Layout for the framed pages (Home, About, Projects, Contact). Wraps them in
 * the persistent FramedShell (card + header + footer). The Blog routes live
 * outside this group and keep their own bare layout.
 */
export default function FramedLayout({ children }: { children: ReactNode }) {
  return <FramedShell>{children}</FramedShell>
}
