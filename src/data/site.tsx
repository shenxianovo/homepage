import type { LucideIcon } from "lucide-react"
import { BookOpen, Code2, ListMusic, Mail } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { BilibiliIcon, GithubIcon, LinkedinIcon, XIcon } from "@/components/brand-icons"

type IconType = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>

export const site = {
  name: "shenxianovo",
  url: "https://shenxianovo.com",
  blogUrl: "https://blog.shenxianovo.com",
  avatar: "/images/profile.jpg",
  greeting: "你好，我是",
  taglineCn: "把想法做成",
  taglineCnRest: "能用的东西。",
  description: "欢迎光临小站～随便看看，这里什么都有一点 Orz",
  projectsLabel: "我的项目",
  contactLabel: "认识一下",
  hero: {
    image: "/images/hero-mascot.png",
  },
  info: [
    { label: "Currently", value: <>实习ing，找工作ing</> },
    {
      label: "Studing",
      value: (
        <>
          武汉大学 <s>罕见！</s> ｜ 人工智能
        </>
      ),
    },
    { label: "Loaction", value: <>上海</> },
  ],
} as const

export const navLinks: { label: string; href: string }[] = [
  { label: "首页", href: "/" },
  { label: "关于", href: "/about" },
  { label: "项目", href: "/projects" },
  { label: "博客", href: site.blogUrl },
]

export const home = {
  links: [
    {
      id: "projects",
      title: "我的项目",
      description: "玩具...玩具...和神秘的玩具...",
      href: "/projects",
      icon: Code2,
      action: "查看项目",
    },
    {
      id: "blog",
      title: "写作与笔记",
      description: "写技术上的折腾，也写路上的想法。",
      href: site.blogUrl,
      icon: BookOpen,
      action: "去博客逛逛",
    },
    {
      id: "playlist",
      title: "我的歌单",
      description: "会的歌太多太散了于是...",
      href: "/about/playlist",
      icon: ListMusic,
      action: "找一首歌",
    },
  ],
} as const

export const socials: { label: string; href: string; icon: IconType }[] = [
  { label: "GitHub", href: "https://github.com/shenxianovo", icon: GithubIcon },
  { label: "X", href: "https://x.com/shenxianovo", icon: XIcon },
  { label: "Bilibili", href: "https://space.bilibili.com/446305918", icon: BilibiliIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shenxianovo", icon: LinkedinIcon },
  { label: "邮箱", href: "mailto:shenxianovo@outlook.com", icon: Mail },
]

// My singable range — drives the transpose plans on /about/playlist.
export const myVocalRange = "E2-E4"

// Future: a "Currently into" list for anime lives at /about/anime one day —
// songs already have their own page (/about/playlist, data in content/songs.yaml).
