import assert from "node:assert/strict"
import { access, readdir, readFile } from "node:fs/promises"
import path from "node:path"

const routes = ["/", "/about", "/about/playlist", "/about/resume", "/projects"]
const resources = new Set<string>()
for (const route of routes) {
  const filename = route === "/" ? "index.html" : `${route.slice(1)}.html`
  const html = await readFile(path.join("out", filename), "utf8")
  assert.ok(html.includes("<main"), `${route}: exported page contains its content`)
  assert.ok(!html.includes("/_next/image?"), `${route}: no runtime image optimizer`)

  // Exercise the URLs Next actually emitted, including responsive candidates.
  for (const match of html.matchAll(
    /\b(?:src|href)="(\/(?:optimized|_next\/static)\/[^"?]+)(?:\?[^"]*)?"/g,
  )) {
    resources.add(match[1])
  }
  for (const match of html.matchAll(/\b(?:srcSet|srcset|imageSrcSet|imagesrcset)="([^"]+)"/g)) {
    for (const candidate of match[1].split(",")) {
      const url = candidate.trim().split(/\s+/)[0]
      assert.ok(url.startsWith("/optimized/"), `${route}: image variant is a static asset`)
      resources.add(url)
    }
  }
}
assert.ok(
  [...resources].some((url) => url.startsWith("/optimized/")),
  "Pages use optimized images",
)
for (const resource of resources) await access(path.join("out", resource))
for (const file of ["404.html", "robots.txt", "sitemap.xml", "manifest.webmanifest", "_headers"]) {
  await access(path.join("out", file))
}

// Every font referenced by the exported stylesheet must travel with the site.
for (const file of await readdir("out/_next/static/chunks")) {
  if (!file.endsWith(".css")) continue
  const css = await readFile(path.join("out/_next/static/chunks", file), "utf8")
  for (const match of css.matchAll(/url\(["']?(\.\.\/media\/[^)"']+)["']?\)/g)) {
    await access(path.resolve("out/_next/static/chunks", match[1]))
  }
}

// Optional: run against `pnpm preview` to check the actual Cloudflare router.
const baseUrl = process.argv[2]
if (baseUrl) {
  const get = (pathname: string) =>
    fetch(new URL(pathname, baseUrl), { signal: AbortSignal.timeout(30_000) })
  for (const route of routes) {
    const response = await get(route)
    assert.equal(response.status, 200, `${route}: served successfully`)
    assert.match(response.headers.get("content-type") ?? "", /text\/html/)
    assert.ok((await response.text()).includes("<main"))
  }
  assert.equal((await get("/missing-migration-check")).status, 404)
  const image = [...resources].find((url) => url.startsWith("/optimized/"))
  assert.ok(image)
  const response = await get(image)
  assert.equal(response.status, 200)
  assert.match(response.headers.get("content-type") ?? "", /image\/webp/)
  assert.match(response.headers.get("cache-control") ?? "", /immutable/)
}
console.log(
  `PASS: ${routes.length} static pages, ${resources.size} referenced assets, metadata and fonts${baseUrl ? ", live routes and caching" : ""}`,
)
