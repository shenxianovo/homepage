import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import path from "node:path"

// Run after `pnpm build`. Verifies core static HTML output and custom token utilities.
const app = path.join(".next", "server", "app")
const home = await readFile(path.join(app, "index.html"), "utf8")
const resume = await readFile(path.join(app, "about", "resume.html"), "utf8")
const projects = await readFile(path.join(app, "projects.html"), "utf8")
const { cn } = await import(new URL("../src/lib/utils.ts", import.meta.url).href)

// Server-rendered text must be visible even when JavaScript is delayed.
const mainWrapper = home.match(/<main\b[^>]*>\s*<div\b[^>]*>/)?.[0]
assert.ok(mainWrapper, "Home has a main content wrapper")
assert.equal(
  /opacity:\s*0(?:;|")/.test(mainWrapper),
  false,
  "Home content is visible before hydration",
)

for (const name of ["panel", "frame"]) {
  const radius = `rounded-${name}`
  assert.equal(cn("rounded-lg", radius), radius, "Custom radii override component defaults")
  assert.equal(cn(radius, "rounded-full"), "rounded-full", "Callers can override custom radii")
}

const details = resume.match(/<details\b[^>]*>/g) ?? []
assert.ok(details.length > 0, "The resume must retain its expandable sections and entries")
for (const tag of details) {
  assert.equal(/\sopen(?:\s|=|>)/.test(tag), false, "Resume content starts collapsed")
}

const content: { draft: boolean }[] = JSON.parse(await readFile(".velite/projects.json", "utf8"))
assert.equal(
  (projects.match(/<article\b/g) ?? []).length,
  content.filter((project) => !project.draft).length,
  "Projects retain one card per published project",
)

console.log(
  "PASS: initial render visibility, custom radius merge, collapsed resume and project cards",
)
