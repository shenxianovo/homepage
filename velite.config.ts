import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { defineCollection, defineConfig, s } from "velite"

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      path: s.path(),
      date: s.isodate(),
      updated: s.isodate().optional(),
      description: s.string().max(280).optional(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      cover: s.image().optional(),
      toc: s.toc(),
      metadata: s.metadata(),
      content: s.mdx(),
    })
    .transform((data) => {
      const slug = data.path.replace(/^posts\//, "")
      return { ...data, slug, permalink: `/blog/${slug}` }
    }),
})

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      path: s.path(),
      description: s.string().max(280),
      types: s.array(s.string()).default([]),
      tags: s.array(s.string()).default([]),
      cover: s.image().optional(),
      live: s.string().url().optional(),
      github: s.string().url().optional(),
      featured: s.boolean().default(false),
      order: s.number().default(0),
      draft: s.boolean().default(false),
      content: s.mdx(),
    })
    .transform((data) => {
      const slug = data.path.replace(/^projects\//, "")
      return { ...data, slug }
    }),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: { dark: "github-dark", light: "github-light" } }],
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
})
