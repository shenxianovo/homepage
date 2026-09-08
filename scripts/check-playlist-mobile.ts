import assert from "node:assert/strict"
import { chromium } from "playwright"

const base = process.env.SHOT_URL ?? "http://localhost:3000"
const browser = await chromium.launch({ channel: "chrome" })
const failures: string[] = []

try {
  for (const width of [320, 390, 767]) {
    const page = await browser.newPage({
      viewport: { width, height: 844 },
      reducedMotion: "reduce",
    })
    page.setDefaultTimeout(3000)
    await page.goto(`${base}/about/playlist`, { waitUntil: "networkidle" })
    const search = page.locator('input[type="search"]')

    try {
      await page.evaluate(() => window.scrollTo(0, 1600))
      await page.waitForFunction(() => window.scrollY >= 1600)
      const bounds = await search.boundingBox()
      assert.ok(
        bounds && bounds.y >= 0 && bounds.y + bounds.height < 844,
        "Search must stay in the viewport while browsing the song list",
      )
    } catch (error) {
      failures.push(`${width}px sticky search: ${String(error)}`)
    }

    try {
      await search.fill("不可解")
      await page.getByText("C4-C5", { exact: true }).waitFor({ state: "visible" })
      await page.getByText("降八度", { exact: true }).waitFor({ state: "visible" })
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
      )
      assert.equal(await search.evaluate((input) => getComputedStyle(input).fontSize), "16px")
    } catch (error) {
      failures.push(`${width}px transpose information: ${String(error)}`)
    }

    try {
      const random = page.getByRole("button", { name: "随机来一首", exact: true })
      const learned = page.getByRole("button", { name: "只看会唱", exact: true })
      const inRange = page.getByRole("button", { name: "在我音域内", exact: true })
      const list = page.getByRole("list", { name: "歌单", exact: true })

      await search.fill("心の奥")
      await page.waitForFunction(
        () => document.querySelector("#playlist-songs")?.children.length === 1,
      )
      assert.equal(await random.isDisabled(), true, "Random cannot pick a song still being learned")
      await learned.click()
      await page.getByText("没有匹配的歌 — 换个关键词试试。", { exact: true }).waitFor()
      assert.equal(await learned.getAttribute("aria-pressed"), "true")
      assert.equal(await random.isDisabled(), true)

      await learned.click()
      await search.fill("海を泳ぐ月")
      await inRange.click()
      await list.getByText("海を泳ぐ月", { exact: true }).waitFor()
      assert.equal(await inRange.getAttribute("aria-pressed"), "true")
      await inRange.click()
      await search.fill("")
      await page.waitForFunction(
        () => (document.querySelector("#playlist-songs")?.children.length ?? 0) > 100,
      )
      // Use the middle of the real list so scroll clamping at the end cannot
      // conceal whether a picked row is positioned below the sticky toolbar.
      await page.evaluate(() => {
        Math.random = () => 0.5
      })
      await random.click()
      const status = await page.getByRole("status").textContent()
      const pickedTitle = status?.match(/随机选中：(.+)$/)?.[1]
      assert.ok(pickedTitle, "Random selection must be announced")
      const pickedRow = list.getByRole("listitem").filter({
        has: page.getByText(pickedTitle, { exact: true }),
      })
      const rowBounds = await pickedRow.boundingBox()
      const toolbarBounds = await page.getByRole("search").boundingBox()
      assert.ok(
        rowBounds && toolbarBounds && rowBounds.y >= toolbarBounds.y + toolbarBounds.height,
        "Picked song must not be covered by sticky controls",
      )
      assert.ok(rowBounds.y + rowBounds.height <= 844, "Picked song must be on screen")
      await page.getByRole("link", { name: "返回顶部", exact: true }).click()
      const titleBounds = await page.locator("h1").boundingBox()
      assert.ok(titleBounds && titleBounds.y >= 0 && titleBounds.y < 844)
    } catch (error) {
      failures.push(`${width}px playlist interactions: ${String(error)}`)
    }
    await page.close()
  }
} finally {
  await browser.close()
}

assert.deepEqual(failures, [], failures.join("\n"))
console.log(
  "PASS: sticky search, transpose plans, filters, empty results, random selection and return to top at 320, 390 and 767px",
)
