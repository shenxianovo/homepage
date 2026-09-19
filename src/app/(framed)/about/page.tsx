import { FileText, ListMusic } from "lucide-react"
import { PageHeading } from "@/components/layout/page-heading"
import { SocialLinks } from "@/components/layout/social-links"
import { SmartLink } from "@/components/smart-link"
import { site } from "@/data/site"

export const metadata = {
  title: "About",
  description: "一点关于 shenxianovo：学生、开发者、二次元爱好者。",
}

// Portal cards into the "another side of me" pages. Anime joins later.
const interests = [
  {
    title: "Playlist",
    description: "我的歌单",
    href: "/about/playlist",
    icon: ListMusic,
  },
  {
    title: "Resume",
    description: "在线简历",
    href: "/about/resume",
    icon: FileText,
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
              どもども〜，我是 {site.name}{" "}
              <s>这网名不知道啥时候起的...有点神秘 想换一个但是本人起名废Orz</s>
            </p>
            <p>
              大四学生，实习ing，找工作ing。 <b>本页有简历！如果感兴趣可以看看～</b>{" "}
              大学还没读完，倒是完整见证了大模型从智障进化到能独立干活。。。
              <s>原来我早就是天才程序员了！</s>
            </p>
            <p>
              古法学过 C# 和 Python。剩下全是用 AI 蹬的：Go、TypeScript、React、Next.js、Vue.js……
            </p>
            <p>
              不写代码的时候，大概在看番，打游戏（最近沉迷VRChat... 欢迎找我玩），或者唱 J-POP
              Vocaloid 和动漫歌。
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 lg:pt-20">
          <h2 className="font-medium text-primary text-sm tracking-wider">还有这些</h2>
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
            聊技术、合作，或者单纯想安利一部番、一首歌，都欢迎来找我～
          </p>
        </div>

        <SocialLinks variant="pill" />
      </section>
    </div>
  )
}
