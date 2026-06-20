"use client"

import { useEffect, useState } from "react"
import type { Post } from "#site/content"
import { BlogCard } from "./blog-card"
import { BlogListItem } from "./blog-list-item"
import { BlogMinimalItem } from "./blog-minimal-item"
import { type BlogViewMode, ViewSwitcher } from "./view-switcher"

const STORAGE_KEY = "blog-view-mode"

export function BlogView({ posts }: { posts: Post[] }) {
  const [mode, setMode] = useState<BlogViewMode>("card")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "card" || saved === "list" || saved === "minimal") {
      setMode(saved)
    }
  }, [])

  const handleChange = (newMode: BlogViewMode) => {
    setMode(newMode)
    localStorage.setItem(STORAGE_KEY, newMode)
  }

  return (
    <div>
      <div className="flex justify-end">
        <ViewSwitcher active={mode} onChange={handleChange} />
      </div>

      <div className="mt-8">
        {mode === "card" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : mode === "list" ? (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <BlogListItem key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border">
            {posts.map((post) => (
              <BlogMinimalItem key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
