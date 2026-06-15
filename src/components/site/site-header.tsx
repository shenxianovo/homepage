"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { navLinks, socials } from "@/data/site"
import { cn } from "@/lib/utils"
import { MascotLogo } from "./mascot-logo"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <Link href="/" className="flex items-center" aria-label="Home">
        <MascotLogo className="size-11" />
      </Link>

      <nav className="-translate-x-1/2 absolute left-1/2 hidden items-center gap-1 md:flex">
        {navLinks.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 font-medium text-sm transition-colors",
                active
                  ? "bg-primary-soft text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 sm:flex">
          {socials.slice(0, 2).map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:-translate-y-0.5"
            >
              <s.icon className="size-4" />
            </a>
          ))}
        </div>
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
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 font-medium text-sm hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  )
}
