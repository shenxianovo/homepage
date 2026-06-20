import { MapPin } from "lucide-react"
import { PageHeading } from "@/components/layout/page-heading"
import { site, socials } from "@/data/site"

export const metadata = {
  title: "About",
  description: "A bit about shenxianovo — student, developer, ACG enjoyer.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12">
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

        <dl className="flex max-w-md flex-wrap gap-x-10 gap-y-4 border-border border-t pt-6">
          {site.info.map((item, i) => (
            <div key={item.label} className="flex gap-3">
              <span className="mt-1 text-primary">
                {i === 0 ? (
                  <span className="block size-2.5 rounded-full bg-primary" />
                ) : (
                  <MapPin className="size-4" />
                )}
              </span>
              <div>
                <dt className="font-semibold text-sm">{item.label}</dt>
                <dd className="mt-0.5 text-muted-foreground text-sm">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* Future: a "Currently into" block (anime / music) goes here — see the
          nowPlaying placeholder in src/data/site.ts. */}

      <section id="contact" className="flex scroll-mt-24 flex-col gap-6">
        <div>
          <p className="font-medium text-primary text-xl">Say hello</p>
          <h2 className="mt-1 font-display font-extrabold text-3xl tracking-tight sm:text-4xl">
            Get in touch
            <span className="text-primary">.</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
            想聊技术、合作，或者只是有番/歌想安利，都欢迎找我。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="flex items-center gap-3 rounded-full bg-muted px-5 py-3 font-medium text-sm transition-transform hover:-translate-y-0.5"
            >
              <s.icon className="size-4 text-primary" />
              {s.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
