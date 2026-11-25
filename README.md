# 个人主页

个人站点 [pwq.cat](https://pwq.cat)，使用 Next.js（静态导出）和 Velite（MDX / YAML）。

## 命令

```bash
pnpm install
pnpm dev          # 开发服务器 + 内容监听，默认 http://localhost:3000
pnpm build        # 内容编译、WebP 图片生成、静态导出到 out/
pnpm lint:fix     # Biome 检查 + 自动修复（排序 Tailwind 类名与 import）
pnpm typecheck    # Velite 编译 + TypeScript 类型检查
pnpm check:ui     # 检查首屏渲染、圆角合并、简历折叠与项目卡片
pnpm check:static # 检查导出的 HTML、图片、字体及元数据文件
pnpm shoot        # Playwright 截图当前 dev 页面到 temp/shots/
```

## 常用修改位置

| 想改什么 | 位置 |
|---|---|
| 名字、标语、首页卡片、导航、社交链接、个人音域 | `src/data/site.tsx` |
| 主题色与圆角 Token | `src/styles/tokens.css` |
| 头像 / 首页背景图 | `public/images/profile.jpg` / `public/images/hero-mascot.png` |
| 首页背景图遮罩与响应式显隐 | `src/app/(framed)/_components/mascot-background.tsx`、`src/styles/base.css` |
| 在线简历内容 | `content/resume.mdx` |
| 项目列表 | `content/projects/<slug>.mdx`（封面图放同目录） |
| 歌单数据 | `content/songs.yaml` |

## 架构与样式约定

- **Next.js App Router**：所有页面共享 `(framed)` 路由组的持久外壳（`FramedShell`），切页时不卸载顶栏与底栏。
- **就近组件**：页面专属组件放在对应路由的 `_components/` 下；跨页共享组件放 `src/components/`。
- **样式三层**：`tokens.css`（oklch 原始变量）→ `theme.css`（映射为 Tailwind 工具类）→ `base.css`（基础重置、遮罩与淡入动画）。
- **字体**：英文正文 Inter、英文标题 Sora、中文统一 Noto Sans SC，经 Fontsource 自托管在站内，按 Unicode 范围按需加载。
- **首页背景图**：仅在宽屏横屏（`md:block portrait:hidden`）展示，且首页外框限制最大最小高度 `60rem`，避免手机浏览器开启「桌面网站」竖屏视口时把横版背景图拉长变形。

## Google Analytics

生产构建在 `pwq.cat` / `www.pwq.cat` 上通过 `src/components/google-analytics.tsx` 加载 GA4（测量 ID `G-VZL6X98PE1`），关闭 Google signals 与广告个性化信号。

## 部署

构建导出 `out/`，由 `.github/workflows/deploy.yml` 自动发布到 GitHub Pages。`next/image` 使用 `src/lib/static-image-loader.ts`，构建时由 `scripts/build-images.ts` 生成多尺寸 WebP 到 `public/optimized/`。添加或替换图片后运行 `pnpm content`；生成物不提交。
