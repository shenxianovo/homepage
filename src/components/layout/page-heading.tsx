/**
 * Page heading matching the hero style: a small green eyebrow above a large
 * display title ending in a green dot.
 */
export function PageHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-medium text-primary text-xl">{eyebrow}</p>
      <h1 className="mt-1 font-display font-extrabold text-5xl leading-[0.95] tracking-tight lg:text-6xl">
        {title}
        <span className="text-primary">.</span>
      </h1>
    </div>
  )
}
