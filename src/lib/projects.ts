import { projects } from "#site/content"

/**
 * Returns all non-draft projects sorted by `order` (ascending), then title.
 */
export function getProjects() {
  return projects
    .filter((p) => !p.draft)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

/**
 * Unique type names across all projects, in first-seen order, for the filter tabs.
 */
export function getProjectTypes() {
  const seen = new Set<string>()
  for (const p of getProjects()) {
    for (const t of p.types) seen.add(t)
  }
  return [...seen]
}
