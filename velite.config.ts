import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { defineCollection, defineConfig, s } from "velite"

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

const songs = defineCollection({
  name: "Song",
  pattern: "songs.yaml",
  schema: s.object({
    title: s.string(),
    artist: s.array(s.string()).min(1),
    lyricist: s.string().optional(),
    composer: s.string().optional(),
    // Vocal range like "G3-E5" (# = +1 semitone, so B#5 parses as C6).
    range: s
      .string()
      .regex(/^[A-G]#?\d-[A-G]#?\d$/, "range must look like G3-E5")
      .optional(),
    links: s.array(s.string().url()).default([]),
    note: s.string().optional(),
    status: s.enum(["learned", "learning"]).default("learned"),
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
  collections: { projects, songs },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: { dark: "github-dark", light: "github-light" } }],
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
})
