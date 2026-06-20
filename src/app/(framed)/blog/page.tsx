import { PageHeading } from "@/components/layout/page-heading"
import { getPublishedPosts } from "@/lib/posts"
import { BlogView } from "./_components/blog-view"

export const metadata = {
  title: "Blog",
  description: "记录思考，分享技术与生活。Thoughts on tech, life, and everything in between.",
}

export default function BlogIndex() {
  const published = getPublishedPosts()

  return (
    <>
      <div className="flex flex-col gap-3">
        <PageHeading eyebrow="My" title="Blog" />
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          记录思考，分享技术与生活。Thoughts on tech, life, and everything in between.
        </p>
      </div>

      <div className="mt-10">
        <BlogView posts={published} />
      </div>
    </>
  )
}
