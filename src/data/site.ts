import type { LucideIcon } from "lucide-react"
import { BookOpen, Code2, ListMusic, Mail } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { BilibiliIcon, GithubIcon, LinkedinIcon } from "@/components/brand-icons"

type IconType = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>

export const site = {
  name: "shenxianovo",
  url: "https://shenxianovo.com",
  blogUrl: "https://blog.shenxianovo.com",
  avatar: "/images/profile.jpg",
  greeting: "Hi, I'm",
  taglineCn: "把想法做成",
  taglineCnRest: "真正能用的东西。",
  description:
    "武汉大学人工智能在读。喜欢动手做工具，也喜欢 ACG 和 J-POP。这里放着我的作品、笔记，以及写代码之外的生活。",
  projectsLabel: "看看我的项目",
  contactLabel: "打个招呼",
  hero: {
    image: "/images/hero-mascot.png",
    alt: "Mascot peeking over a grassy hill among butterflies",
  },
  info: [
    { label: "Currently", value: "正在实习 · 寻找工作机会" },
    { label: "Studying", value: "武汉大学 · 人工智能" },
    { label: "Location", value: "中国，武汉" },
  ],
} as const

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: site.blogUrl },
]

export const home = {
  heading: "一些作品，也有生活",
  links: [
    {
      id: "projects",
      title: "我的项目",
      label: "Projects",
      description: "从统一登录到电脑使用记录，做自己用得上的工具。",
      href: "/projects",
      icon: Code2,
      action: "查看项目",
    },
    {
      id: "blog",
      title: "写作与笔记",
      label: "Blog",
      description: "记录技术探索，也把一路上的思考留在这里。",
      href: site.blogUrl,
      icon: BookOpen,
      action: "去博客逛逛",
    },
    {
      id: "playlist",
      title: "我的歌单",
      label: "Playlist",
      description: "二次元、J-POP、虚拟歌姬。也是我的 KTV 点歌指南。",
      href: "/about/playlist",
      icon: ListMusic,
      action: "找一首歌",
    },
  ],
} as const

export const socials: { label: string; href: string; icon: IconType }[] = [
  { label: "GitHub", href: "https://github.com/shenxianovo", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shenxianovo", icon: LinkedinIcon },
  { label: "Bilibili", href: "https://space.bilibili.com/446305918", icon: BilibiliIcon },
  { label: "Email", href: "mailto:shenxianovo@outlook.com", icon: Mail },
]

// My singable range — drives the transpose plans on /about/playlist.
export const myVocalRange = "E2-E4"

// Future: a "Currently into" list for anime lives at /about/anime one day —
// songs already have their own page (/about/playlist, data in content/songs.yaml).
