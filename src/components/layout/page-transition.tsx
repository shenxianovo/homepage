"use client"

import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Fades page content in on each route change. Keyed by pathname so
 * navigating remounts the inner content and replays the entrance.
 * The surrounding shell (header, footer, card) stays put.
 *
 * Only animates opacity — no transforms — to avoid backdrop-blur
 * re-rasterisation jank.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ willChange: "opacity" }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  )
}
