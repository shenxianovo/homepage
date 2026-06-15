import { cn } from "@/lib/utils"

export function MascotLogo({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block size-10", className)}>
      <svg viewBox="0 0 40 40" fill="none" className="size-full" aria-hidden>
        <title>Mascot</title>
        <defs>
          <radialGradient id="mascot-body" cx="35%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#2a3326" />
            <stop offset="100%" stopColor="#0d120b" />
          </radialGradient>
        </defs>
        <path
          d="M20 2c9.4 0 17 7.2 17 17.4 0 7.8-4.6 12.6-10.6 16.2-2 1.2-4.2 2.4-6.4 2.4s-4.4-1.2-6.4-2.4C7.6 32 3 27.2 3 19.4 3 9.2 10.6 2 20 2Z"
          fill="url(#mascot-body)"
        />
        <ellipse cx="25" cy="17.5" rx="6.2" ry="7" fill="#fff" />
        <circle cx="26.4" cy="18.4" r="2.7" fill="#0d120b" />
      </svg>
      <span className="absolute -left-0.5 -top-0.5 size-2.5 rounded-full bg-primary" />
    </span>
  )
}
