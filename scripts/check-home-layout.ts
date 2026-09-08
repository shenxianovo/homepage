import assert from "node:assert/strict"
import { chromium } from "playwright"

const base = process.env.SHOT_URL ?? "http://localhost:3000"
const browser = await chromium.launch({ channel: "chrome" })
const failures: string[] = []

try {
  for (const width of [320, 390, 767, 768, 820, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    try {
      await page.goto(base, { waitUntil: "networkidle" })
      await page.evaluate(() => document.fonts.ready)
      const layout = await page.evaluate(() => {
        const heading = document.querySelector("h1")
        if (!heading) throw new Error("Missing homepage heading")
        const range = document.createRange()
        range.selectNodeContents(heading)
        const lines = new Set(Array.from(range.getClientRects(), (rect) => Math.round(rect.top)))
        const headingBounds = heading.getBoundingClientRect()
        const headingOverflow = Array.from(range.getClientRects()).some(
          (rect) => rect.left < headingBounds.left - 1 || rect.right > headingBounds.right + 1,
        )
        const escaped = Array.from(document.querySelectorAll("main h3")).filter((title) => {
          const card = title.closest("li, article, a")
          if (!card) return false
          const bounds = card.getBoundingClientRect()
          const text = document.createRange()
          text.selectNodeContents(title)
          return Array.from(text.getClientRects()).some(
            (rect) => rect.left < bounds.left - 1 || rect.right > bounds.right + 1,
          )
        })
        // The ellipse uses objectBoundingBox coordinates: matching its numeric
        // parameters is insufficient if the artwork no longer covers the frame.
        const artwork = document.querySelector(".hero-feather")
        const frame = document.querySelector("header")?.parentElement?.parentElement
        if (!artwork || !frame) throw new Error("Missing artwork or page frame")
        const imageBounds = artwork.getBoundingClientRect()
        const frameBounds = frame.getBoundingClientRect()
        const artworkVisible = imageBounds.width > 0 && imageBounds.height > 0
        const artworkMatchesFrame = (["top", "right", "bottom", "left"] as const).every(
          (edge) => Math.abs(imageBounds[edge] - frameBounds[edge]) <= 1,
        )
        return {
          lines: lines.size,
          headingOverflow,
          overflow: document.documentElement.scrollWidth > innerWidth,
          escaped: escaped.map((title) => title.textContent),
          artworkVisible,
          artworkMatchesFrame,
        }
      })
      assert.equal(layout.lines, 1, "Name and green dot must stay on one line")
      assert.equal(layout.headingOverflow, false, "Name must fit its content column")
      assert.equal(layout.overflow, false, "Page must fit the viewport")
      assert.deepEqual(layout.escaped, [], "Card headings must fit within their own cards")
      assert.equal(layout.artworkVisible, width >= 768, "Artwork must be hidden on phones")
      if (width >= 768) {
        assert.equal(layout.artworkMatchesFrame, true, "Ellipse must use the full page frame")
      }
      console.log(`PASS homepage layout at ${width}px`)
    } catch (error) {
      failures.push(`${width}px: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      await page.close()
    }
  }
} finally {
  await browser.close()
}

assert.deepEqual(failures, [], failures.join("\n"))
