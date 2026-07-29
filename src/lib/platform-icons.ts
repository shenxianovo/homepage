import { ExternalLink } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { BilibiliIcon } from "@/components/brand-icons"

type PlatformIcon = ComponentType<SVGProps<SVGSVGElement>>

const PLATFORMS: { pattern: RegExp; label: string; icon: PlatformIcon }[] = [
  { pattern: /(^|\.)bilibili\.com$|(^|\.)b23\.tv$/, label: "Bilibili", icon: BilibiliIcon },
  // Add more platforms here as songs link to them; brand SVGs are hand-drawn
  // in brand-icons.tsx (see CLAUDE.md — icon libraries dropped brand logos).
]

/** Maps a song link URL to its platform icon + label; unknown hosts get a generic icon. */
export function platformFor(url: string): { label: string; icon: PlatformIcon } {
  let host = ""
  try {
    host = new URL(url).hostname
  } catch {
    /* fall through to generic */
  }
  return PLATFORMS.find((p) => p.pattern.test(host)) ?? { label: "Link", icon: ExternalLink }
}
