import { ArrowRight, Download, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { site } from "@/data/site"

export function Hero() {
  return (
    <section className="relative grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
      {/* Mascot image — sits behind on mobile, right column on desktop */}
      <div className="-z-0 absolute inset-0 md:relative md:col-start-2 md:h-full">
        <div className="relative h-full min-h-[320px] w-full md:min-h-[560px]">
          <Image
            src={site.hero.image}
            alt={site.hero.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center"
          />
          {/* fade the left edge into the page background */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent md:via-background/20 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent md:hidden" />
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10 px-6 py-10 sm:px-10 md:col-start-1 md:row-start-1 md:py-16">
        <p className="font-medium text-primary text-xl">{site.greeting}</p>
        <h1 className="mt-1 font-display font-extrabold text-6xl leading-[0.95] tracking-tight lg:text-7xl">
          {site.name}
          <span className="text-primary">.</span>
        </h1>

        <p className="mt-6 font-medium text-2xl">
          <span className="text-primary">{site.taglineCn}</span>
          {site.taglineCnRest}
        </p>

        <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">{site.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="h-12 rounded-full px-6 shadow-glow">
            Explore Projects
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-6 backdrop-blur-glass"
          >
            <Download className="size-4" />
            Download CV
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
