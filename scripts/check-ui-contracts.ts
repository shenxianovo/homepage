import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

// Run after `pnpm build`. These checks cover the production output without
// requiring a browser; layout and interactive checks still use Playwright.
const app = path.join(".next", "server", "app")
const home = await readFile(path.join(app, "index.html"), "utf8")
const resume = await readFile(path.join(app, "about", "resume.html"), "utf8")
const projects = await readFile(path.join(app, "projects.html"), "utf8")
const { cn } = await import(new URL("../src/lib/utils.ts", import.meta.url).href)

for (const name of ["panel", "frame", "control-xs", "control-sm"]) {
  const radius = `rounded-${name}`
  assert.equal(cn("rounded-lg", radius), radius, "Custom radii override component defaults")
  assert.equal(cn(radius, "rounded-full"), "rounded-full", "Callers can override custom radii")
}

// Exercise the radius combinations used by every Button size, including the
// current Hero's lg override and smaller reusable controls.
for (const [size, radius] of Object.entries({
  default: "rounded-lg",
  xs: "rounded-control-xs",
  sm: "rounded-control-sm",
  lg: "rounded-lg",
  icon: "rounded-lg",
  "icon-xs": "rounded-control-xs",
  "icon-sm": "rounded-control-sm",
  "icon-lg": "rounded-lg",
})) {
  assert.equal(cn("rounded-lg", radius), radius, `${size}: size radius wins over the base`)
  assert.equal(cn("rounded-lg", radius, "rounded-full"), "rounded-full", `${size}: caller wins`)
}

assert.equal(/href="\/about\/resume(?:[#?][^"]*)?"/.test(home), false, "No home Resume CTA")

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

const chunks = path.join(".next", "static", "chunks")
const css = (
  await Promise.all(
    (
      await readdir(chunks)
    )
      .filter((file) => file.endsWith(".css"))
      .map((file) => readFile(path.join(chunks, file), "utf8")),
  )
).join("\n")

for (const [name, token] of [
  ["lg", "radius"],
  ["panel", "panel-radius"],
  ["frame", "frame-radius"],
  ["control-xs", "control-radius-xs"],
  ["control-sm", "control-radius-sm"],
]) {
  assert.ok(
    css.includes(`.rounded-${name}{border-radius:var(--${token})}`),
    `The ${name} radius utility must use its global token`,
  )
}

assert.ok(css.includes("background-color:var(--secondary-hover)"), "Secondary hover uses its token")
assert.ok(css.includes("html{font-family:var(--font-sans)"), "Body text inherits the sans font")
assert.ok(css.includes("h1,h2,h3{font-family:var(--font-display)"), "Headings use the display font")

console.log("PASS: token utilities, fonts, collapsed resume, home links and project cards")
