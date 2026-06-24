import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

type SmartLinkProps = {
  href: string
  children: ReactNode
} & Omit<ComponentProps<"a">, "href">

/**
 * Renders the right element for a link based on its href, so callers never
 * repeat the internal/external/mailto branching:
 * - `http(s)://` → external `<a>` with `target="_blank"` + safe `rel`
 * - `mailto:` / `tel:` → plain `<a>`, no target (opening a new tab is wrong here)
 * - anything else → Next `<Link>` for client-side navigation
 */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  const isExternal = /^https?:\/\//.test(href)
  const isProtocol = /^(mailto:|tel:)/.test(href)

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  if (isProtocol) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
