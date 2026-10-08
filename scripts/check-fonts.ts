import assert from "node:assert/strict"
import { chromium } from "playwright"

// Run against a built production server: SHOT_URL=http://localhost:3101 node scripts/check-fonts.ts
// Checking computed font-family alone misses unavailable fonts and missing glyphs.
const base = process.env.SHOT_URL ?? "http://localhost:3000"
const browser = await chromium.launch({ channel: "chrome" })

try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    try {
      await page.goto(base, { waitUntil: "networkidle" })
      await page.evaluate(() => document.fonts.ready)
      const session = await page.context().newCDPSession(page)
      await session.send("DOM.enable")
      await session.send("CSS.enable")
      const { root } = await session.send("DOM.getDocument")

      for (const [selector, family] of [
        ["main p", "Noto Sans SC"],
        ["main h3", "Noto Sans SC"],
        ['main a[role="link"][href="/projects"]', "Noto Sans SC"],
        ["main li .text-xs", "Inter"],
        ["main h1", "Sora"],
      ]) {
        const { nodeId } = await session.send("DOM.querySelector", {
          nodeId: root.nodeId,
          selector,
        })
        assert.ok(nodeId, `Missing font sample: ${selector}`)
        const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId })
        assert.ok(fonts.length > 0, `${selector}: text must render`)
        assert.ok(
          fonts.every((font) => font.isCustomFont && font.familyName.startsWith(family)),
          `${selector}: glyphs must use the supplied ${family} font, not a system fallback`,
        )
      }

      const resources = await page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .filter((entry) => /\.woff2?(?:\?|$)/.test(entry.name))
          .map((entry) => entry.name),
      )
      assert.ok(resources.length > 0, "Font files must load")
      assert.ok(
        resources.every((url) => new URL(url).origin === new URL(base).origin),
        "All fonts must be served by this site",
      )
      console.log(`PASS real Chinese glyphs, English title and self-hosted fonts at ${width}px`)
    } finally {
      await page.close()
    }
  }
} finally {
  await browser.close()
}
