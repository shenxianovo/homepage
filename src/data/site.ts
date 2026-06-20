import type { LucideIcon } from "lucide-react"
import { BookOpen, Code2, Mail, Palette, Zap } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { BilibiliIcon, GithubIcon, LinkedinIcon } from "@/components/brand-icons"

type IconType = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>

export const site = {
  name: "shenxianovo",
  greeting: "Hi, I'm",
  taglineCn: "热爱技术，喜欢创造",
  taglineCnRest: "，追求极致体验。",
  description:
    "A passionate developer and creator. I build scalable, user-friendly, and delightful digital experiences.",
  hero: {
    image: "/images/hero-mascot.png",
    alt: "Mascot peeking over a grassy hill among butterflies",
  },
  info: [
    { label: "Currently", value: "Open to opportunities" },
    { label: "Studying", value: "AI @ Wuhan University" },
    { label: "Location", value: "Wuhan, China" },
  ],
} as const

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "https://blog.shenxianovo.com" },
]

export const features: { title: string; description: string; icon: IconType }[] = [
  { title: "Code", description: "Clean, efficient and maintainable code.", icon: Code2 },
  { title: "Design", description: "Simple, intuitive and user-centered design.", icon: Palette },
  { title: "Performance", description: "Scalable, fast and reliable solutions.", icon: Zap },
  { title: "Learning", description: "Keep curious and keep improving.", icon: BookOpen },
]

export const socials: { label: string; href: string; icon: IconType }[] = [
  { label: "GitHub", href: "https://github.com/shenxianovo", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shenxianovo", icon: LinkedinIcon },
  { label: "Bilibili", href: "https://space.bilibili.com/446305918", icon: BilibiliIcon },
  { label: "Email", href: "mailto:shenxianovo@outlook.com", icon: Mail },
]

// Future: a curated "Currently into" list (anime / music / vocaloid) for the
// About page. Start static here when ready; consider Bangumi / Last.fm sync
// only once manual upkeep gets annoying.
// export const nowPlaying = [...]
