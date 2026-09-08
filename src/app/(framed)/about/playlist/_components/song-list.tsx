"use client"

import { ArrowUp, Dices, Headphones, MicVocal, Search } from "lucide-react"
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

  const pickable = visible.filter((song) => song.status === "learned")
  const pickedSong = visible.find((song) => songKey(song) === picked)

  const pickRandom = () => {
    if (pickable.length === 0) return
    const key = songKey(pickable[Math.floor(Math.random() * pickable.length)])
    setPicked(key)
    rowRefs.current.get(key)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    })
  }

  const toggleClass = (active: boolean) =>
    cn(
      "min-h-11 rounded-full px-3 py-2 font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 md:px-4",
      active
        ? "bg-primary text-primary-foreground shadow-glow"
        : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground",
    )

  return (
    <div>
      <search
        aria-label="搜索和筛选歌单"
        className="sticky top-0 z-20 -mx-3 flex flex-col gap-2 border-border border-b bg-card px-3 py-3 md:static md:mx-0 md:flex-row md:flex-wrap md:items-center md:border-0 md:bg-transparent md:p-0"
      >
        <div className="flex min-w-0 items-center gap-2 md:contents">
          <label className="relative min-w-0 flex-1 md:min-w-56 md:max-w-xs">
            <span className="sr-only">搜歌名或歌手</span>
            <Search
              aria-hidden="true"
              className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPicked(null)
              }}
              aria-controls="playlist-songs"
              placeholder="搜歌名 / 歌手…"
              className="h-11 w-full rounded-full border border-border bg-background py-2 pr-4 pl-10 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            />
          </label>
          <button
            type="button"
            onClick={pickRandom}
            disabled={pickable.length === 0}
            aria-label="随机来一首"
            title="从当前结果中随机选一首会唱的歌"
            className="flex size-11 shrink-0 items-center justify-center gap-1.5 rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 md:order-last md:w-auto md:px-4"
          >
            <Dices aria-hidden="true" className="size-5 md:size-4" />
            <span className="hidden text-sm md:inline">随机来一首</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={learnedOnly}
            aria-controls="playlist-songs"
            onClick={() => {
              setLearnedOnly((v) => !v)
              setPicked(null)
            }}
            className={toggleClass(learnedOnly)}
          >
            只看会唱
          </button>
          <button
            type="button"
            aria-pressed={inRangeOnly}
            aria-controls="playlist-songs"
            onClick={() => {
              setInRangeOnly((v) => !v)
              setPicked(null)
            }}
            className={toggleClass(inRangeOnly)}
          >
            在我音域内
          </button>
          <a
            href="#playlist-top"
            aria-label="返回顶部"
            title="返回顶部"
            className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 md:hidden"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </search>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-muted-foreground text-sm">
        <p role="status">
          {visible.length} 首
          {pickedSong ? <span className="sr-only">，随机选中：{pickedSong.title}</span> : null}
        </p>
        <p className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <MicVocal aria-hidden="true" className="size-3.5 text-primary" />
            会唱
          </span>
          <span className="flex items-center gap-1">
            <Headphones aria-hidden="true" className="size-3.5" />
            在听
          </span>
        </p>
      </div>
      {inRangeOnly ? (
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          按我的音域 {myVocalRange} 筛选，含可移调的歌；未标音域的歌仍会显示。
        </p>
      ) : null}

      <ul id="playlist-songs" aria-label="歌单" className="mt-2 divide-y divide-border">
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
                "-mx-3 grid scroll-mt-40 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-1 rounded-xl px-3 py-4 transition-colors md:flex md:scroll-mt-4 md:items-center md:gap-3 md:py-3",
                picked === key && "bg-primary-soft",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                  <span className="min-w-0 break-words font-medium leading-6">{song.title}</span>
                  {song.status === "learning" ? (
                    <Headphones
                      className="mt-1 size-3.5 shrink-0 text-muted-foreground/70"
                      aria-label="还在听"
                    />
                  ) : (
                    <MicVocal
                      className="mt-1 size-3.5 shrink-0 text-primary/80"
                      aria-label="会唱"
                    />
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 text-muted-foreground text-sm leading-relaxed">
                  <span className="min-w-0 break-words">{song.artist.join(" × ")}</span>
                  {song.note ? (
                    <span className="min-w-0 break-words text-muted-foreground/70">
                      {song.note}
                    </span>
                  ) : null}
                </div>
              </div>

              {song.range ? (
                <span className="col-span-2 row-start-2 flex flex-wrap items-center gap-2 text-muted-foreground text-sm md:shrink-0 md:justify-end md:text-xs">
                  <span>
                    原曲 <span className="font-mono">{song.range}</span>
                  </span>
                  {plan ? (
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5",
                        plan.fits ? "bg-primary-soft font-medium text-foreground" : "bg-muted",
                      )}
                    >
                      {plan.fits ? plan.label : "超出音域"}
                    </span>
                  ) : null}
                </span>
              ) : null}

              {song.links.length > 0 ? (
                <span className="col-start-2 row-start-1 flex shrink-0 flex-wrap items-center justify-end gap-1">
                  {song.links.map((url) => {
                    const platform = platformFor(url)
                    return (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${song.title} — ${platform.label}`}
                        className="flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 md:size-8"
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
