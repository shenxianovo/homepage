# 个人主页

shenxianovo.com — Next.js + MDX 博客的个人站点。

## 跑起来

```bash
pnpm install
pnpm dev          # 开发服务器 + 内容监听,默认 http://localhost:3000
```

其他命令:

```bash
pnpm build        # 生产构建(先 velite build 再 next build)
pnpm lint:fix     # 格式化 + 自动修复(Biome)
pnpm typecheck    # 类型检查
pnpm shoot        # 截图当前 dev 页面到 temp/shots/(桌面+移动)
node scripts/check-home-layout.ts # 检查首页在 320–1440px 下的标题换行和文字越界
node scripts/check-playlist-mobile.ts # 检查手机端搜索吸顶和降调方案可见性
```

> 改完代码习惯走一遍 `pnpm lint:fix` 再 `pnpm build`。Biome 会自动排序 Tailwind 类名和 import,看到它重排是正常的。

## 怎么改常见的东西

| 想改什么 | 改哪里 |
|---|---|
| 名字、标语、按钮文案、导航、社交链接 | `src/data/site.ts` |
| 主题色 / 整套配色 | `src/styles/tokens.css`(改 token,别在组件里写死颜色) |
| 头像 | 换 `public/images/profile.jpg` |
| 首页主背景图(吉祥物) | 换 `public/images/hero-mascot.png` |
| 背景图的构图 / 羽化 | `src/app/(framed)/_components/mascot-background.tsx` 定义整页外框背景和倾斜椭圆遮罩；`src/styles/base.css` 的 `.hero-feather` 应用遮罩 |
| 首页板块结构 | `src/app/(framed)/_components/`(hero、home-links)，入口文案在 `src/data/site.ts` 的 `home` 中 |
| 页头 / 页脚 | `src/components/layout/` |
| 字体 | `src/lib/fonts.ts`(标题 Sora,正文 Inter) |
| 写博客 | 在 `content/posts/` 加 `.mdx` 文件 |

## 架构速览

- **Next.js App Router**:`src/app/` 下每个文件夹是一条路由。`page.tsx` 是页面,`layout.tsx` 是外壳。
- **页面专属板块**放在该路由旁的 `_components/`(就近原则,`_` 前缀的文件夹不会变成 URL)。**跨页面共用**的放 `src/components/`。
- **内容数据**集中在 `src/data/site.ts`,跟代码分开,改文案不用动组件。
- **样式**:三个 CSS 文件(`src/styles/`)——`tokens.css` 定义颜色变量(oklch),`theme.css` 把变量接到 Tailwind,`base.css` 放重置和背景效果。改色只动 `tokens.css`。
- **博客**:Markdown(MDX)放 `content/posts/`,Velite 在构建时编译成数据,页面通过 `src/lib/posts.ts` 查询。

目录结构和更细的约定见 `CLAUDE.md`。

## 部署

Docker 多阶段构建,`compose.yml` 编排,推送由 `.github/workflows/deploy.yml` 触发。
