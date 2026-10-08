import assert from "node:assert/strict"
import { chromium, devices } from "playwright"

const base = process.env.SHOT_URL ?? "http://localhost:3000"
const browser = await chromium.launch({ channel: "chrome" })
const failures: string[] = []

const cases = [
  ...[320, 390, 412].flatMap((width) => [
    { name: `${width}px phone`, width, height: 844, screenWidth: width, mobile: true, touch: true },
    // A phone in desktop mode exposes a wide layout viewport and desktop UA.
    {
      name: `${width}px phone desktop mode`,
      width: 980,
      height: 1960,
      screenWidth: width,
      mobile: false,
      touch: true,
    },
  ]),
  { name: "landscape phone", width: 844, height: 390, screenWidth: 844, mobile: true, touch: true },
  { name: "tablet", width: 820, height: 1180, screenWidth: 820, mobile: true, touch: true },
  { name: "tall desktop", width: 980, height: 1960, screenWidth: 980, mobile: false, touch: false },
  { name: "desktop", width: 1440, height: 1024, screenWidth: 1440, mobile: false, touch: false },
]

try {
  for (const scenario of cases) {
    const { width, height, screenWidth, mobile, touch } = scenario
    const context = await browser.newContext({
      ...devices[mobile ? "Pixel 7" : "Desktop Chrome"],
      viewport: { width, height },
      screen: { width: screenWidth, height: !mobile && touch ? 844 : height },
      isMobile: mobile,
      hasTouch: touch,
      reducedMotion: "reduce",
    })
    const page = await context.newPage()
    try {
      await page.goto(base, { waitUntil: "networkidle" })
      await page.evaluate(() => document.fonts.ready)
      const effectiveWidth = touch && screenWidth < 768 ? Math.min(width, screenWidth) : width
      const layout = await page.evaluate(() => {
        const artwork = document.querySelector(".hero-feather")
        const menu = document.querySelector('button[aria-label="Toggle menu"]')
        const hero = document.querySelector("main section")
        const cards = Array.from(document.querySelectorAll("#home-links-heading + ul > li"))
        const frame = document.querySelector("header")?.parentElement?.parentElement
        const description = document.querySelector("main section p.text-pretty")
        const site = document.querySelector(".site-viewport")
        if (!artwork || !menu || !hero || !frame || !description || !site || cards.length !== 3) {
          throw new Error("Missing homepage content")
        }
        const text = document.createRange()
        text.selectNodeContents(description)
        const fit = Math.max(1, document.documentElement.clientWidth / screen.width)
        return {
          textHeight: text.getClientRects()[0].height / fit,
          textSize:
            (Number.parseFloat(getComputedStyle(description).fontSize) *
              Number(getComputedStyle(site).zoom)) /
            fit,
          zoom: getComputedStyle(document.documentElement).zoom,
          viewport: document.querySelector('meta[name="viewport"]')?.getAttribute("content"),
          artworkVisible: artwork.getClientRects().length > 0,
          menuVisible: menu.getClientRects().length > 0,
          columns: new Set(cards.map((card) => Math.round(card.getBoundingClientRect().left))).size,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          frameHeight: frame.getBoundingClientRect().height,
          linksGap:
            (cards[0].getBoundingClientRect().top - hero.getBoundingClientRect().bottom) / fit,
        }
      })
      assert.equal(layout.zoom, "1", "Readable mode must not scale the document root")
      assert.match(layout.viewport ?? "", /width=device-width.*initial-scale=1/)
      assert.equal(
        layout.menuVisible,
        effectiveWidth < 768,
        "Phone navigation must stay usable in desktop mode",
      )
      assert.equal(
        layout.artworkVisible,
        effectiveWidth >= 768,
        "Phone desktop mode must hide the large artwork",
      )
      assert.equal(
        layout.columns,
        effectiveWidth < 768 ? 1 : 3,
        "Cards must fit the physical phone display",
      )
      assert.ok(
        layout.textHeight >= 16,
        "Body text must stay readable after fitting to the phone screen",
      )
      assert.ok(
        layout.textSize >= 15.99,
        "Body font must remain at least 16px on the phone display",
      )
      assert.equal(layout.overflow, false, "Content must fit the layout viewport")
      assert.ok(layout.linksGap <= 32, "Home links must follow the hero even in tall viewports")
      if (height === 1960 && effectiveWidth >= 768) {
        assert.ok(layout.frameHeight <= 1024, "Tall viewports must not stretch the home artwork")
      }
      if (effectiveWidth < 768) await page.getByRole("button", { name: "Toggle menu" }).click()
      await page.getByRole("link", { name: "关于", exact: true }).click()
      await page.waitForURL(`${base}/about`)
      await page.goto(`${base}/about/playlist`, { waitUntil: "networkidle" })
      const search = page.locator('input[type="search"]')
      await search.fill("不可解")
      await page.getByText("C4-C5", { exact: true }).waitFor({ state: "visible" })
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        ),
        false,
        "Song search must work in both browser modes without horizontal overflow",
      )
      if (touch && effectiveWidth < 768) {
        const zoomBefore = await page
          .locator(".site-viewport")
          .evaluate((site) => getComputedStyle(site).zoom)
        const session = await context.newCDPSession(page)
        await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 })
        assert.equal(
          await page.locator(".site-viewport").evaluate((site) => getComputedStyle(site).zoom),
          zoomBefore,
          "Pinch zoom must remain independent of the display policy",
        )
        await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1 })
      }
      if (!mobile && touch && screenWidth < 768) {
        assert.equal(
          await page.getByRole("search").evaluate((toolbar) => getComputedStyle(toolbar).position),
          "sticky",
          "Phone desktop mode must retain mobile song controls",
        )
        if (screenWidth === 390) {
          const session = await context.newCDPSession(page)
          for (const landscape of [true, false]) {
            await session.send("Emulation.setDeviceMetricsOverride", {
              width: 980,
              height: landscape ? 454 : 1960,
              screenWidth: landscape ? 844 : 390,
              screenHeight: landscape ? 390 : 844,
              deviceScaleFactor: 1,
              mobile: false,
              screenOrientation: {
                type: landscape ? "landscapePrimary" : "portraitPrimary",
                angle: landscape ? 90 : 0,
              },
            })
            await page.waitForFunction(
              (wide) =>
                (document.querySelector(".site-viewport")?.clientWidth ?? 0) >= 768 === wide,
              landscape,
            )
            assert.equal(
              await page.getByRole("button", { name: "Toggle menu" }).isVisible(),
              !landscape,
              "Rotation must recompute the readable layout",
            )
          }
        }
        await page.setViewportSize({ width: screenWidth, height: 844 })
        await page.waitForFunction(
          () => !document.documentElement.hasAttribute("data-readable-phone"),
        )
        assert.equal(await page.getByRole("button", { name: "Toggle menu" }).isVisible(), true)
      }
      console.log(`PASS ${scenario.name}`)
    } catch (error) {
      failures.push(`${scenario.name}: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      await context.close()
    }
  }
  // Emulate a WebView that reports a desktop screen, while fitting a wide
  // document to a real phone. Keep the real inline display bootstrap; omit
  // Next's hydration scripts so it can't replace the forced viewport fixture.
  const page = await browser.newPage({
    ...devices["Pixel 7"],
    viewport: { width: 390, height: 844 },
    screen: { width: 980, height: 1960 },
  })
  await page.route(new URL("/", base).href, async (route) => {
    const response = await route.fetch()
    const body = (await response.text())
      .replace("width=device-width, initial-scale=1", "width=980")
      .replace(/<script\b[^>]*\bsrc="[^"]*"[^>]*><\/script>/g, "")
    await route.fulfill({ response, body })
  })
  await page.goto(base, { waitUntil: "networkidle" })
  assert.equal(
    await page.evaluate(() => document.documentElement.clientWidth),
    980,
    "Fixture must expose a real desktop layout viewport",
  )
  assert.equal(await page.getByRole("button", { name: "Toggle menu" }).isVisible(), true)
  assert.ok(
    await page.locator(".site-viewport").evaluate((site) => site.clientWidth <= 390),
    "Visual viewport must recover the phone width when screen.width is spoofed",
  )
  console.log("PASS phone with inflated screen.width")
  await page.close()
} finally {
  await browser.close()
}
assert.deepEqual(failures, [], failures.join("\n"))
