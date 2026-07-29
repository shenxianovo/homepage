# 领域上下文

个人网站 shenxianovo.com 的领域词汇。术语在代码、文档、commit 里保持一致。

## 站点结构

- **Framed shell（框架外壳）** — 所有页面共享的持久外壳（圆角卡片 + header + footer），
  位于 `(framed)` 路由组的 layout。导航时不重挂载，因此 header 的 `layoutId`
  nav pill 能在 tab 间滑动。
- **Interests（兴趣入口）** — About 页右栏的"传送门"卡片区，链向兴趣子页
  （`/about/playlist`；将来 `/about/anime`）。兴趣子页一律挂在 `/about/*` 下。

## Playlist（歌单）

- **Song（歌）** — 一条曲目记录，存于 `content/songs.yaml`（Velite data
  collection）。规模按几百首设计：加歌 = append 几行 YAML。
- **artist（演唱）** — 数组；写「点歌机上会搜的名字」。乐队歌写乐队名
  （ずっと真夜中でいいのに。），唱的是某人的翻唱版就写那个人（ACAね）。
  不做乐队/主唱的结构化区分。
- **status（状态）** — `learned`（会唱，默认，可省略）/ `learning`（在听/还在学）。
  UI 上 learned 显示话筒图标（主题绿），learning 显示耳机图标（淡色）。
- **range（音域）** — 形如 `G3-E5`。`#` 一律解析为 +1 半音（`B#5` = `C6`），
  schema 不校验音名合法性，宽进严解析。见 `lib/vocal-range.ts`。
- **我的音域** — `E2-E4`，常量 `myVocalRange`（`data/site.ts`）。
- **Transpose plan（降调方案）** — 把歌塞进我音域的最优方案。优先级：
  1. 原调；2. 降八度（不改调性，听感最接近原曲，优于一切机器降 key）；
  3. 按 key 数从小到大：降k → 降八度再升k → 降八度再降k。
  机器升降上限 ±6 key（KTV 点歌机的实际限制）。
- **平台图标** — 歌曲链接按域名自动映射平台图标（`lib/platform-icons.ts`），
  未知域名用通用外链图标。

## 内容管道

- **Velite collection** — MDX/YAML → 类型安全数据。`projects`（MDX，一文件
  一项目）、`songs`（单 YAML 文件）。查询一律走 `lib/projects.ts` /
  `lib/songs.ts`，不在页面里重写 filter/sort。
- **cover 图** — 源图放 `content/projects/` 与 MDX 同目录，相对路径引用；
  `public/static/` 是生成物（gitignored，每次构建清空），永不手动提交。

## Styling

- **Token 三层** — `tokens.css`（oklch 原始变量，颜色唯一来源）→
  `theme.css`（映射成 Tailwind utilities）→ `base.css`（重置 + 特效，
  含 hero-feather 遮罩，旋钮说明见文件内注释）。改色只改 tokens.css。
- **品牌图标** — GitHub/LinkedIn/Bilibili 等品牌 SVG 手绘在
  `brand-icons.tsx`（icon 库因商标原因移除了品牌图标，别试图从库里引）。
