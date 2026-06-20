import { Calendar, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { posts } from "#site/content"
import { MDXContent } from "@/components/mdx-content"
import { getPostBySlug } from "@/lib/posts"

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const dateObj = new Date(post.date)
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="flex flex-col gap-4 border-b border-border pb-8">
        <h1 className="font-display font-extrabold text-4xl leading-[1.1] tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>{post.metadata.readingTime} min read</span>
          </div>
        </div>
        {post.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      <article className="prose prose-slate mt-10 dark:prose-invert">
        <MDXContent code={post.content} />
      </article>
    </div>
  )
}
