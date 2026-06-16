import { chromium } from "playwright"

const BASE = process.env.SHOT_URL ?? "http://localhost:3100"
const OUT = "temp/shots"
const PREFIX = process.env.SHOT_PREFIX ?? ""

const viewports = [
  { name: "desktop", width: 1440, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
]

async function main() {
  const browser = await chromium.launch({ channel: "chrome" })
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    })
    await page.goto(BASE, { waitUntil: "load", timeout: 30000 })
    // settle fonts + any entrance animation
    await page.waitForTimeout(1200)
    const file = `${OUT}/${PREFIX}${vp.name}.png`
    await page.screenshot({ path: file, fullPage: true })
    await page.close()
    console.log(`shot: ${file} (${vp.width}x${vp.height})`)
  }
  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
