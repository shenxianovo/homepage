/**
 * Pitch math for the playlist page. Notes are written like "G3" or "A#5"
 * (accidentals as sharps only — that's what the songs.yaml schema enforces).
 */

const NOTE_OFFSETS: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
}

/** Absolute semitone index of a note like "G3" (C0 = 0). "#" is +1, so B#5 = C6. */
export function parseNote(note: string): number {
  const match = note.match(/^([A-G])(#?)(\d)$/)
  if (!match) throw new Error(`Bad note: ${note}`)
  return Number(match[3]) * 12 + NOTE_OFFSETS[match[1]] + (match[2] ? 1 : 0)
}

/** Parses "G3-E5" into absolute semitone bounds. */
export function parseRange(range: string): { low: number; high: number } {
  const [low, high] = range.split("-").map(parseNote)
  return { low, high }
}

export type TransposePlan = { fits: true; label: string } | { fits: false }

/** Karaoke machines only go down 6 keys; beyond that you sing an octave down. */
const MAX_KEY_DOWN = 6

/**
 * Finds the shift that fits `songRange` inside `myRange`, and names it in the
 * terms you'd actually use at karaoke: 原调 / 降八度 / 降N / 降八度再降N.
 * Octave-down keeps the song's key (it still sounds like the original), so
 * key-preserving options win over any machine key change; after that, the
 * smaller key change wins, preferring no-octave within the same key amount.
 */
export function planTranspose(songRange: string, myRange: string): TransposePlan {
  const song = parseRange(songRange)
  const mine = parseRange(myRange)

  const fitsWith = (shift: number) => song.high - shift <= mine.high && song.low - shift >= mine.low

  // Key-preserving options first — an octave down still sounds like the song.
  if (fitsWith(0)) return { fits: true, label: "原调" }
  if (fitsWith(12)) return { fits: true, label: "降八度" }

  // Otherwise the smallest machine key change (±k has the same "distance" on
  // the machine): plain 降k, then octave-down corrected back up by k (for
  // songs where a bare octave overshoots below the low end), then octave+降k.
  for (let key = 1; key <= MAX_KEY_DOWN; key++) {
    if (fitsWith(key)) return { fits: true, label: `降${key}` }
    if (fitsWith(12 - key)) return { fits: true, label: `降八度再升${key}` }
    if (fitsWith(12 + key)) return { fits: true, label: `降八度再降${key}` }
  }
  return { fits: false }
}
