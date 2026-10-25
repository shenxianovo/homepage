# 个人主页

shenxianovo.com — Next.js + MDX 博客的个人站点。

## 跑起来

```bash
pnpm install
pnpm dev          # 开发服务器 + 内容监听,默认 http://localhost:3000
```

其他命令:

```bash
pnpm build        # 内容编译、WebP 图片生成、静态导出到 out/
pnpm preview      # 用本地静态资源运行时预览 out/，默认 http://localhost:3000
pnpm lint:fix     # 格式化 + 自动修复(Biome)
pnpm typecheck    # 类型检查
pnpm check:ui     # build 后检查产物：token、字体、简历默认折叠、首页入口和项目卡片
pnpm check:static # 检查导出的页面、图片、字体及元数据文件
pnpm shoot        # 截图当前 dev 页面到 temp/shots/(桌面+移动)
node scripts/check-home-layout.ts # 检查首页在 320–1440px 下的标题换行和文字越界
node scripts/check-playlist-mobile.ts # 检查手机端搜索吸顶和降调方案可见性
```

> 改完代码习惯走一遍 `pnpm lint:fix` 再 `pnpm build`。Biome 会自动排序 Tailwind 类名和 import,看到它重排是正常的。

### 慢网切页回归

原先只检查了资源齐全后的页面，漏掉了预取尚未完成时点击导航的等待状态。
构建后启动 `pnpm exec wrangler dev --port 8787`，另开终端运行
`node scripts/serve-slow-navigation.mjs`，打开 `http://127.0.0.1:8790/`：

1. 点顶部“关于”（手机先打开菜单）：下一页正文被测试代理暂扣，应显示无文字的骨架占位。
2. 访问 `http://127.0.0.1:8790/__test/release` 放行；关于页应出现，加载状态消失。
3. 访问 `http://127.0.0.1:8790/__test/reset?mode=all` 后重新加载首页，再点“关于”。
   连路由信息都没下载时，应在被点击的导航项旁显示加载标记；手机菜单保持可见。
4. 等待期间改点“项目”，再放行关于页响应：应留在项目页，不被过期导航带走。
   再点“关于”应正常切换，导航背景滑动与正文淡入仍在；手机菜单完成后关闭，返回也不重开。

这个代理仅绑定本机，用来控制响应到达时机；不参与正式部署。

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

### 样式约定

- 正文使用 Inter，`h1`–`h3` 和 `font-display` 使用 Sora；两者预加载 Latin 子集，中文和日文由系统可用字体回退。歌单音域的 `font-mono` 使用 Tailwind 的系统等宽字体栈。
- 卡片用 `rounded-lg`，大面板用 `rounded-panel`，页面外框用 `rounded-frame`，均从全局 `--radius` 派生。默认仍为 16 / 24 / 28px；胶囊和圆形保留 `rounded-full`。
- 颜色和悬停配色在 `tokens.css` 定义，经 `theme.css` 暴露为工具类。SVG 遮罩的白色表示遮罩透明度，manifest 的颜色是独立浏览器元数据，不使用页面 CSS 变量。
- 布局专属的宽度、断点、图片比例、椭圆遮罩参数及动画时长保持在对应组件中，不为一次性几何值添加全局 token。
- `shadcn` 仅保留为开发时的组件生成 CLI；当前界面不依赖其附带的 CSS 或 `tw-animate-css`。

## 部署到 GitHub Pages

Next.js 静态导出到 `out/`，由 GitHub Actions 发布到 GitHub Pages。
Cloudflare 只管理 DNS；主站 `shenxianovo.com` 和 `www` 的网站记录使用“仅 DNS”，
浏览器直接连接 GitHub Pages。博客 `blog.shenxianovo.com` 是独立仓库，配置不变。

`next/image` 使用 `src/lib/static-image-loader.ts`：构建时由 Sharp 生成多尺寸 WebP，
输出到 `public/optimized/`，文件名含内容哈希，可长期缓存。原图仍保留用于分享卡片等。
添加或替换图片后运行 `pnpm content`（开发服务器首次启动也会执行）；生成物不提交。
所有用于 `next/image` 的源图放在 `public/images/` 或 Velite 生成的 `public/static/`。

### 本地预览

`pnpm preview` 继续用 Wrangler 本地运行时查看导出结果，不会发布到 Cloudflare。
运行后可用 `pnpm check:static http://localhost:3000` 检查页面和资源。
`wrangler.jsonc` 暂留预览域名 `homepage-preview.shenxianovo.com` 作为迁移回退入口；
持续部署已不再使用它，根域名与 `www` 不再绑定 Worker。

### 持续部署

推送 `main` 后，`.github/workflows/deploy.yml` 会构建、检查并发布 `out/`。
仓库 Settings → Pages 的发布来源为 GitHub Actions，自定义域名为 `shenxianovo.com`。
部署使用 GitHub 自带令牌，不需要 Cloudflare API secret。

参考：[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、
[自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。
