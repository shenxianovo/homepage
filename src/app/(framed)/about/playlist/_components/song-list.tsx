"use client"

import { Dices, Headphones, MicVocal, Search } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import type { Song } from "#site/content"
import { myVocalRange } from "@/data/site"
import { platformFor } from "@/lib/platform-icons"
import { cn } from "@/lib/utils"
import { planTranspose } from "@/lib/vocal-range"

function songKey(song: Song) {
  return `${song.title}|${song.artist.join(",")}`
}

export function SongList({ songs }: { songs: Song[] }) {
  const [query, setQuery] = useState("")
  const [learnedOnly, setLearnedOnly] = useState(false)
  const [inRangeOnly, setInRangeOnly] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  const rowRefs = useRef(new Map<string, HTMLLIElement>())

  const plans = useMemo(
    () =>
      new Map(
        songs
          .filter((s) => s.range)
          .map((s) => [songKey(s), planTranspose(s.range as string, myVocalRange)]),
      ),
    [songs],
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return songs.filter((song) => {
      if (learnedOnly && song.status !== "learned") return false
      // Songs without range data are never hidden by the range filter.
      if (inRangeOnly && song.range && !plans.get(songKey(song))?.fits) return false
      if (!q) return true
      return (
        song.title.toLowerCase().includes(q) || song.artist.some((a) => a.toLowerCase().includes(q))
      )
    })
  }, [songs, query, learnedOnly, inRangeOnly, plans])

  const pickRandom = () => {
    const pool = visible.filter((s) => s.status === "learned")
    if (pool.length === 0) return
    const key = songKey(pool[Math.floor(Math.random() * pool.length)])
    setPicked(key)
    rowRefs.current.get(key)?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const toggleClass = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 font-medium text-sm transition-colors",
      active
        ? "bg-primary text-primary-foreground shadow-glow"
        : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground",
    )

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-56 flex-1 sm:max-w-xs">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3.5 size-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜歌名 / 歌手…"
            className="w-full rounded-full border border-border bg-transparent py-2 pr-4 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </label>
        <button
          type="button"
          onClick={() => setLearnedOnly((v) => !v)}
          className={toggleClass(learnedOnly)}
        >
          只看会唱
        </button>
        <button
          type="button"
          onClick={() => setInRangeOnly((v) => !v)}
          className={toggleClass(inRangeOnly)}
        >
          在我音域内
        </button>
        <button
          type="button"
          onClick={pickRandom}
          className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
        >
          <Dices className="size-4" />
          随机来一首
        </button>
      </div>

      <p className="mt-4 text-muted-foreground text-sm">{visible.length} 首</p>

      <ul className="mt-2 divide-y divide-border">
        {visible.map((song) => {
          const key = songKey(song)
          const plan = song.range ? plans.get(key) : undefined
          return (
            <li
              key={key}
              ref={(el) => {
                if (el) rowRefs.current.set(key, el)
                else rowRefs.current.delete(key)
              }}
              className={cn(
                "-mx-3 flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                picked === key && "bg-primary-soft",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{song.title}</span>
                  {song.status === "learning" ? (
                    <Headphones
                      className="size-3.5 shrink-0 text-muted-foreground/70"
                      aria-label="还在听"
                    />
                  ) : (
                    <MicVocal className="size-3.5 shrink-0 text-primary/80" aria-label="会唱" />
                  )}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-muted-foreground text-sm">
                  <span className="truncate">{song.artist.join(" × ")}</span>
                  {song.note ? (
                    <span className="truncate text-muted-foreground/70">{song.note}</span>
                  ) : null}
                </div>
              </div>

              {song.range ? (
                <span className="hidden shrink-0 text-right text-muted-foreground text-xs sm:block">
                  <span className="font-mono">{song.range}</span>
                  {plan ? (
                    <span
                      className={cn(
                        "ml-2",
                        plan.fits ? "text-primary" : "text-muted-foreground/60",
                      )}
                    >
                      {plan.fits ? plan.label : "超出音域"}
                    </span>
                  ) : null}
                </span>
              ) : null}

              {song.links.length > 0 ? (
                <span className="flex shrink-0 items-center gap-1">
                  {song.links.map((url) => {
                    const platform = platformFor(url)
                    return (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${song.title} — ${platform.label}`}
                        className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <platform.icon className="size-4" />
                      </a>
                    )
                  })}
                </span>
              ) : null}
            </li>
          )
        })}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-8 text-muted-foreground">没有匹配的歌 — 换个关键词试试。</p>
      ) : null}
    </div>
  )
}
