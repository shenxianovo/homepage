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
 * Unique category names in display order, for the filter tabs.
 */
export function getProjectCategories() {
  const seen = new Set<string>()
  for (const p of getProjects()) seen.add(p.category)
  return [...seen]
}
