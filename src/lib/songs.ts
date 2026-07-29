import { songs } from "#site/content"

/**
 * All songs sorted by artist then title, so one artist's songs sit together
 * regardless of the order they're appended to songs.yaml.
 */
export function getSongs() {
  return [...songs].sort(
    (a, b) =>
      a.artist.join(" ").localeCompare(b.artist.join(" "), "ja") ||
      a.title.localeCompare(b.title, "ja"),
  )
}
