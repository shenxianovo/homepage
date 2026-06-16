import { posts } from "#site/content"

/**
 * Returns all published posts sorted by date descending.
 */
export function getPublishedPosts() {
  return posts.filter((p) => !p.draft).sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

/**
 * Finds a single published post by slug, returns null if not found or draft.
 */
export function getPostBySlug(slug: string) {
  const post = posts.find((p) => p.slug === slug)
  if (!post || post.draft) return null
  return post
}
