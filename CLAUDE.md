# CLAUDE.md

Guidance for AI agents working in this repo. Keep it accurate — update it when structure or conventions change.

## What this is

Personal website for shenxianovo.com. Next.js App Router site with **Home**, **About**, and **Projects** pages, all sharing one persistent framed shell. Projects are MDX-driven via Velite. The blog is a separate Astro site (`blog.shenxianovo.com`), linked externally from the nav — it does **not** live in this repo.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server + Velite content watcher (runs both via concurrently) |
| `pnpm build` | `velite build` then `next build` — run this to verify changes compile |
| `pnpm lint` | Biome check (no writes) |
| `pnpm lint:fix` | Biome check + autofix (sorts Tailwind classes, fixes imports) |
| `pnpm typecheck` | Velite build + `tsc --noEmit` |
| `pnpm shoot` | Playwright screenshots of dev server → `temp/shots/` (see Screenshots) |

Always run `pnpm lint:fix` then `pnpm build` after edits. Biome auto-sorts Tailwind classes and import order, so expect it to reformat.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 (`@theme`, no config file) · shadcn/ui on **Base UI** (not Radix) · next-themes · Velite (MDX) · Biome (lint+format, not ESLint/Prettier) · Docker.

## Structure

The page routes live in a single `(framed)` route group whose layout wraps every
page in the persistent shell (rounded card + header + footer). The shell is **not**
remounted on navigation — only the inner page content swaps — which is what lets
the header's `layoutId` nav pill slide between tabs.

```
src/
  app/
    (framed)/
      _components/        # Shell + Home-only sections: framed-shell, mascot-background,
                          #   hero, feature-cards
      page.tsx            # Home: hero + feature cards over the masked mascot backdrop
      layout.tsx          # Group layout — wraps pages in FramedShell
      about/page.tsx      # About + "Get in touch" (socials), #contact anchor
      projects/
        page.tsx          # Projects index (filter tabs + grid)
        _components/       # project-card, project-grid
    layout.tsx            # Root layout, fonts, ThemeProvider, site metadata
    globals.css           # Imports tailwind + the 3 style files below
  components/
    layout/               # Shared chrome: site-header, site-footer, page-heading,
                          #   page-transition
    ui/                   # shadcn primitives: button, theme-toggle
    brand-icons.tsx       # Hand-drawn GitHub/LinkedIn/Bilibili SVGs (see note)
    theme-provider.tsx
  data/site.ts            # All copy, nav links, features, socials — edit content here
  lib/                    # fonts.ts (Sora+Inter), utils.ts (cn), projects.ts (content queries)
  styles/                 # tokens.css, theme.css, base.css (see Styling)
content/projects/         # Project MDX files (+ their cover images alongside)
scripts/shoot.ts          # Playwright screenshot harness
```

**Convention:** page-specific sections go in `app/(framed)/<page>/_components/` (colocated). Shared-across-pages components go in `components/`.

## Content (Velite)

Projects are MDX files compiled by Velite (schema in `velite.config.ts`), queried via `lib/projects.ts`.

**Adding a project:** create `content/projects/<slug>.mdx` with frontmatter — `title`, `description`, `types` (array; drives the filter tabs, which are auto-generated; a project can have several), `tags` (tech stack pills), optional `cover`, optional `live` + `github` URLs, `order`. Filter tabs and cards update automatically.

**Cover images:** the `cover` field uses Velite's `s.image()`. Drop the image *beside the mdx* in `content/projects/` and reference it relatively (`cover: ./echo-flow.png`). Velite copies it to `public/static/` with a content hash and generates dimensions + a blur placeholder. **`public/static/` is generated output (gitignored, `clean: true` wipes it each build)** — commit the source image in `content/projects/`, never the hashed file in `public/static/`.

## Styling — read before touching colors

Three CSS files imported by `globals.css`, in order:

1. **`tokens.css`** — raw design tokens as CSS vars in `oklch`. Defines the green palette for light (`:root`) and dark (`.dark`). **This is the single source of truth for color.** Overrides shadcn's default gray.
2. **`theme.css`** — `@theme inline` block mapping tokens → Tailwind utilities (so `bg-primary`, `text-muted-foreground`, `shadow-glow` work).
3. **`base.css`** — element resets, body ambient background, and `.hero-feather` (the CSS mask that fades the hero image).

To change a color, edit the token in `tokens.css` — don't hardcode hex/oklch in components. Custom utilities beyond stock Tailwind: `bg-primary-soft`, `shadow-glow`, `bg-glass`/`backdrop-blur-glass`, `bg-hero-glow`.

**Hero image feather:** `.hero-feather` in `base.css` masks the mascot image to transparent on the left via a radial-gradient mask. The knobs (`--feather-x/y/w/h/solid/fade`) are documented inline at the top of the rule. Desktop = diagonal ellipse; mobile = top-down via media query.

## Conventions

- **Content lives in `src/data/site.ts`** — name, taglines, nav, features, socials. Edit there, not in components.
- **Project queries go through `lib/projects.ts`** (`getProjects`, `getProjectTypes`) — don't re-inline filter/sort in pages.
- Path alias `@/*` → `src/*`. Velite output imported as `#site/content`.
- `temp/` is gitignored (design refs, screenshots). Never commit scratch logs (`*-out.log` ignored).
- Brand icons (GitHub/LinkedIn/Bilibili) are hand-drawn SVGs in `brand-icons.tsx` because lucide-react and Simple Icons both removed brand logos for trademark reasons. Don't try to re-add them from an icon library.

## Screenshots (visual self-check)

`pnpm shoot` drives **system Chrome** (`channel: "chrome"`), not a downloaded Chromium — the Playwright CDN download fails on some networks. Start the dev server first; it shoots desktop (1440px) + mobile (390px) to `temp/shots/`.

## Deploy

Docker multi-stage build → `compose.yml`. CI in `.github/workflows/deploy.yml`. Next is configured for `output: standalone`; the standalone server needs `.next/static` and `public/` copied beside it (the Dockerfile handles this).
