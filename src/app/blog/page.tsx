import Link from "next/link"
import { getPublishedPosts } from "@/lib/posts"

export default function BlogIndex() {
  const published = getPublishedPosts()

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-8">
      <h1 className="font-semibold text-3xl tracking-tight">Blog</h1>
      <ul className="flex flex-col gap-4">
        {published.map((post) => (
          <li key={post.slug}>
            <Link href={post.permalink} className="font-medium text-lg hover:underline">
              {post.title}
            </Link>
            {post.description ? (
              <p className="text-muted-foreground text-sm">{post.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  )
}
