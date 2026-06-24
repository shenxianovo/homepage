"use client"

import { Menu, X } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { SmartLink } from "@/components/smart-link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { navLinks } from "@/data/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <SmartLink href="/" className="flex items-center" aria-label="Home">
        <Image
          src="/images/profile.jpg"
          alt="Avatar"
          width={44}
          height={44}
          priority
          className="size-11 rounded-full object-cover ring-1 ring-border"
        />
      </SmartLink>

      <nav className="-translate-x-1/2 absolute left-1/2 hidden items-center gap-1 md:flex">
        {navLinks.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)

          return (
            <SmartLink
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 font-medium text-sm transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{link.label}</span>
            </SmartLink>
          )
        })}
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-full border border-border md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open ? (
        <div className="absolute inset-x-4 top-full z-30 mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-popover p-3 shadow-md md:hidden">
          {navLinks.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 font-medium text-sm hover:bg-muted"
            >
              {link.label}
            </SmartLink>
          ))}
        </div>
      ) : null}
    </header>
  )
}
