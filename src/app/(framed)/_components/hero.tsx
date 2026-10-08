import { ArrowRight, BookOpen, MapPin } from "lucide-react"
import Link from "next/link"
import { PageHeading } from "@/components/layout/page-heading"
import { Button } from "@/components/ui/button"
import { site } from "@/data/site"

export function Hero() {
  return (
    <section className="relative isolate site-md:min-h-[35rem] pt-6 site-md:pt-16 site-sm:pt-10 pb-8 site-md:pb-12">
      <div className="relative z-10 mx-6 site-sm:mx-10 site-md:w-[46%]">
        <PageHeading eyebrow={site.greeting} title={site.name} size="hero" />

        <p className="mt-5 text-balance font-medium site-sm:text-2xl text-xl leading-relaxed">
          <span className="inline-block text-primary">{site.taglineCn}</span>{" "}
          <span className="inline-block">{site.taglineCnRest}</span>
        </p>

        <p className="mt-4 max-w-md text-pretty text-muted-foreground leading-7">
          {site.description}
        </p>

        <div className="mt-6 site-sm:mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="h-12 rounded-full px-5 site-sm:px-6 shadow-glow"
            nativeButton={false}
            role="link"
            render={<Link href="/projects" />}
          >
            {site.projectsLabel}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-5 site-sm:px-6 backdrop-blur-glass"
            nativeButton={false}
            role="link"
            render={<Link href="/about" />}
          >
            {site.contactLabel}
          </Button>
        </div>
      </div>

      <div className="relative z-10 mx-6 site-sm:mx-10 mt-8 site-md:w-[46%]">
        <dl className="flex max-w-xl site-lg:max-w-md flex-wrap gap-x-6 gap-y-3 border-border border-t pt-5">
          {site.info.map((item) => (
            <div key={item.label} className="flex items-center gap-3 first:w-full">
              <span className="flex w-4 shrink-0 justify-center text-primary">
                {item.label === "Currently" ? (
                  <span className="block size-2.5 rounded-full bg-primary" />
                ) : item.label === "Studying" ? (
                  <BookOpen className="size-4" />
                ) : (
                  <MapPin className="size-4" />
                )}
              </span>
              <div>
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-muted-foreground text-sm">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
