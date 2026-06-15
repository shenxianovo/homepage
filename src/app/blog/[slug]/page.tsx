import { notFound } from "next/navigation"
import { posts } from "#site/content"
import { MDXContent } from "@/components/mdx-content"

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  if (!post || post.draft) notFound()

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-semibold text-3xl tracking-tight">{post.title}</h1>
        <time className="text-muted-foreground text-sm" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
      </header>
      <article className="prose dark:prose-invert">
        <MDXContent code={post.content} />
      </article>
    </main>
  )
}
