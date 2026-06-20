import { ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { site } from "@/data/site"

export function Hero() {
  return (
    <section className="px-6 py-10 sm:px-10 md:py-16">
      <div className="max-w-xl md:max-w-[46%]">
        <p className="font-medium text-primary text-xl">{site.greeting}</p>
        <h1 className="mt-1 break-words font-display font-extrabold text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          {site.name}
          <span className="text-primary">.</span>
        </h1>

        <p className="mt-6 font-medium text-2xl">
          <span className="text-primary">{site.taglineCn}</span>
          {site.taglineCnRest}
        </p>

        <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">{site.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="h-12 rounded-full px-6 shadow-glow"
            nativeButton={false}
            render={<Link href="/projects" />}
          >
            Explore Projects
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-6 backdrop-blur-glass"
            nativeButton={false}
            render={<Link href="/about#contact" />}
          >
            Get in Touch
          </Button>
        </div>

        <dl className="mt-12 flex max-w-md gap-12 border-border border-t pt-6">
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
      </div>
    </section>
  )
}
