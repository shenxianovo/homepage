import { features } from "@/data/site"

export function FeatureCards() {
  return (
    <section className="relative z-10 mx-6 -mt-16 rounded-3xl border border-glass-border bg-glass shadow-md backdrop-blur-glass sm:mx-10">
      <ul className="grid grid-cols-2 gap-y-10 p-8 sm:p-10 md:grid-cols-4 md:gap-y-0">
        {features.map((f) => (
          <li
            key={f.title}
            className="flex flex-col items-start px-4 text-left md:items-center md:px-6 md:text-center md:[&:not(:first-child)]:border-border md:[&:not(:first-child)]:border-l"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <f.icon className="size-6" />
            </span>
            <h3 className="mt-4 font-display font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
