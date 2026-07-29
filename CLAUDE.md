# CLAUDE.md

AI agent 工作指引。保持准确 —— 结构或约定变化时同步更新。本文件只是**目录**，细节放 `CONTEXT.md` 和源文件内联注释。

## 这是什么

shenxianovo.com 个人网站 —— Next.js App Router（Home / About / Projects + About 兴趣子页），共享一个持久 framed shell。项目内容经 Velite 用 MDX 驱动。Blog 是独立的 Astro 站（blog.shenxianovo.com），导航外链，**不在本仓库**。

## 命令

| 命令 | 作用 |
|---|---|
| `pnpm dev` | Dev server + Velite watcher（concurrently 同跑） |
| `pnpm build` | `velite build` + `next build` —— 验证编译用 |
| `pnpm lint` | Biome 检查（只读） |
| `pnpm lint:fix` | Biome 检查 + 自动修复（会排序 Tailwind class 和 import） |
| `pnpm typecheck` | Velite build + `tsc --noEmit` |
| `pnpm shoot` | Playwright 截图 → `temp/shots/`（需 dev server 已开；驱动系统 Chrome，不下载 Chromium —— CDN 在部分网络下不可用） |

改完代码后必跑 `pnpm lint:fix` 再 `pnpm build`。

## 技术栈

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4（`@theme`，无配置文件）· shadcn/ui on **Base UI**（不是 Radix）· next-themes · Velite · Biome（不是 ESLint/Prettier）· Docker.

## 目录 —— 动手前先看这里

- **领域概念与约定** → `CONTEXT.md`（站点结构、Playlist 规则、内容管道、styling 分层、品牌图标）
- **架构决策** → `docs/adr/`（目前为空；重要决策落这里）
- **文案 / 导航 / socials** → `src/data/site.ts`，不写在组件里
- **颜色** → 只改 `src/styles/tokens.css`，组件里不硬编码（hero-feather 旋钮说明在 `base.css` 内联注释）
- **页面专属组件** → `app/(framed)/<page>/_components/`（就地放）；跨页共享 → `src/components/`
- **加项目** → `content/projects/<slug>.mdx`（frontmatter 见 `velite.config.ts` schema；cover 源图与 MDX 同目录）；**加歌** → `content/songs.yaml`（字段说明见文件头注释）
- **内容查询** → 走 `lib/projects.ts` / `lib/songs.ts`，不在页面里重写 filter/sort
- Path alias `@/*` → `src/*`；Velite 输出 → `#site/content`
- `temp/` 和 `public/static/`（Velite 生成物）均 gitignored，永不提交

## Agent skills

### 领域文档

单上下文：根目录 `CONTEXT.md` + `docs/adr/`。消费规则见 `docs/agents/domain.md`。

## 部署

Docker 多阶段构建 → `compose.yml`，CI 在 `.github/workflows/deploy.yml`。Next 配置 `output: standalone`（Dockerfile 负责把 `.next/static` 和 `public/` 拷到 standalone server 旁边）。
