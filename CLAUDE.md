# CLAUDE.md

Guidance for AI agents working in this repo. Keep it accurate — update it when structure or conventions change.

## What this is

Personal website for shenxianovo.com. Next.js App Router landing page + MDX blog. Currently only the Home page is built; **Projects** and **Contact** pages are planned next.

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

```
src/
  app/
    _components/   # Home-only sections: hero, feature-cards (colocated with route)
    page.tsx       # Home: assembles background + header + sections + footer
    layout.tsx     # Root layout, fonts, ThemeProvider
    globals.css    # Imports tailwind + the 3 style files below
    blog/          # Blog index + [slug] post page
  components/
    layout/        # Shared chrome used by every page: site-header, site-footer
    ui/            # shadcn primitives: button, theme-toggle
    brand-icons.tsx    # Hand-drawn GitHub/LinkedIn SVGs (see note)
    theme-provider.tsx, mdx-content.tsx
  data/site.ts     # All copy, nav links, features, socials — edit content here
  lib/             # fonts.ts (Sora+Inter), utils.ts (cn), posts.ts (blog queries)
  styles/          # tokens.css, theme.css, base.css (see Styling)
content/posts/     # Blog MDX files
scripts/shoot.ts   # Playwright screenshot harness
```

**Convention:** page-specific sections go in `app/<page>/_components/` (colocated). Shared-across-pages components go in `components/`. When building Projects/Contact, follow this — put their sections in `app/projects/_components/` etc.

## Styling — read before touching colors

Three CSS files imported by `globals.css`, in order:

1. **`tokens.css`** — raw design tokens as CSS vars in `oklch`. Defines the green palette for light (`:root`) and dark (`.dark`). **This is the single source of truth for color.** Overrides shadcn's default gray.
2. **`theme.css`** — `@theme inline` block mapping tokens → Tailwind utilities (so `bg-primary`, `text-muted-foreground`, `shadow-glow` work).
3. **`base.css`** — element resets, body ambient background, and `.hero-feather` (the CSS mask that fades the hero image).

To change a color, edit the token in `tokens.css` — don't hardcode hex/oklch in components. Custom utilities beyond stock Tailwind: `bg-primary-soft`, `shadow-glow`, `bg-glass`/`backdrop-blur-glass`, `bg-hero-glow`.

**Hero image feather:** `.hero-feather` in `base.css` masks the mascot image to transparent on the left via a radial-gradient mask. The knobs (`--feather-x/y/w/h/solid/fade`) are documented inline at the top of the rule. Desktop = diagonal ellipse; mobile = top-down via media query.

## Conventions

- **Content lives in `src/data/site.ts`** — name, taglines, nav, features, socials. Edit there, not in components.
- **Blog queries go through `lib/posts.ts`** (`getPublishedPosts`, `getPostBySlug`) — don't re-inline filter/sort in pages.
- Path alias `@/*` → `src/*`. Velite output imported as `#site/content`.
- `temp/` is gitignored (design refs, screenshots). Never commit scratch logs (`*-out.log` ignored).
- Brand icons (GitHub/LinkedIn) are hand-drawn SVGs in `brand-icons.tsx` because lucide-react and Simple Icons both removed brand logos for trademark reasons. Don't try to re-add them from an icon library.

## Screenshots (visual self-check)

`pnpm shoot` drives **system Chrome** (`channel: "chrome"`), not a downloaded Chromium — the Playwright CDN download fails on some networks. Start the dev server first; it shoots desktop (1440px) + mobile (390px) to `temp/shots/`.

## Deploy

Docker multi-stage build → `compose.yml`. CI in `.github/workflows/deploy.yml`. Next is configured for `output: standalone`; the standalone server needs `.next/static` and `public/` copied beside it (the Dockerfile handles this).
