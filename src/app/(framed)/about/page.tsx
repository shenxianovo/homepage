import { ListMusic } from "lucide-react"
import { PageHeading } from "@/components/layout/page-heading"
import { SocialLinks } from "@/components/layout/social-links"
import { SmartLink } from "@/components/smart-link"
import { site } from "@/data/site"

export const metadata = {
  title: "About",
  description: "A bit about shenxianovo — student, developer, ACG enjoyer.",
}

// Portal cards into the "another side of me" pages. Anime joins later.
const interests = [
  {
    title: "Playlist",
    subtitle: "歌单",
    description: "我正在听、会唱的歌，KTV 犹豫症自救指南。",
    href: "/about/playlist",
    icon: ListMusic,
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <section className="flex flex-col gap-6">
          <PageHeading eyebrow="A bit" title="About" />
          <div className="max-w-xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              嗨，我是 {site.name} —— 一个热爱技术、喜欢动手把想法做出来的人。
              目前在武汉大学读人工智能，也在实习，正处在秋招的窗口期。
            </p>
            <p>
              系统学过 C# 和 Python，其他主流语言和方向上手也不慢。比起停在
              "学会某个技术"，我更享受用它做出一个真正能跑、用起来还算舒服的东西。
            </p>
            <p>
              写代码之外，我的快乐大多来自 ACG —— 听二次元、J-POP 和虚拟歌姬，追日漫。
              它们是我审美和"想做点好东西"这股劲的来源。
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 lg:pt-20">
          <h2 className="font-medium text-primary text-sm uppercase tracking-wider">Interests</h2>
          {interests.map((item) => (
            <SmartLink
              key={item.href}
              href={item.href}
              className="group flex items-start gap-4 rounded-3xl border border-glass-border bg-glass p-5 shadow-md backdrop-blur-glass transition-shadow hover:shadow-glow"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <item.icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline gap-2 font-display font-semibold text-lg">
                  {item.title}
                  <span className="text-muted-foreground text-sm">{item.subtitle}</span>
                </span>
                <span className="mt-1 block text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </span>
              </span>
            </SmartLink>
          ))}
        </section>
      </div>

      <section id="contact" className="flex scroll-mt-24 flex-col gap-6">
        <div>
          <PageHeading eyebrow="Say hello" title="Get in touch" as="h2" size="section" />
          <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
            想聊技术、合作，或者只是有番/歌想安利，都欢迎找我。
          </p>
        </div>

        <SocialLinks variant="pill" />
      </section>
    </div>
  )
}
