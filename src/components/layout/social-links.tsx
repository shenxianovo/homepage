import { SmartLink } from "@/components/smart-link"
import { socials } from "@/data/site"
import { cn } from "@/lib/utils"

type SocialLinksProps = {
  /** `pill` shows icon + label (About page); `icon` shows icon only (footer). */
  variant: "pill" | "icon"
  className?: string
}

/**
 * Renders the site's social links from `data/site.ts`. SmartLink handles the
 * mailto vs external distinction, so the Email entry correctly opens a mail
 * client instead of a blank tab.
 */
export function SocialLinks({ variant, className }: SocialLinksProps) {
  if (variant === "pill") {
    return (
      <div className={cn("flex flex-wrap gap-3", className)}>
        {socials.map((s) => (
          <SmartLink
            key={s.label}
            href={s.href}
            className="flex items-center gap-3 rounded-full bg-muted px-5 py-3 font-medium text-sm transition-transform hover:-translate-y-0.5"
          >
            <s.icon className="size-4 text-primary" />
            {s.label}
          </SmartLink>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socials.map((s) => (
        <SmartLink
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground transition-transform hover:-translate-y-0.5"
        >
          <s.icon className="size-4" />
        </SmartLink>
      ))}
    </div>
  )
}
