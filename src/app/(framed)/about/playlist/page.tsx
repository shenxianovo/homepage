import { PageHeading } from "@/components/layout/page-heading"
import { getSongs } from "@/lib/songs"
import { SongList } from "./_components/song-list"

export const metadata = {
  title: "Playlist",
  description: "我正在听、会唱的歌 — my karaoke repertoire.",
}

export default function PlaylistPage() {
  const songs = getSongs()

  return (
    <>
      <div id="playlist-top" className="flex flex-col gap-3">
        <PageHeading eyebrow="My" title="Playlist" />
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          我正在听、会唱的歌。KTV 犹豫症自救指南。
        </p>
      </div>

      <div className="mt-6 md:mt-10">
        <SongList songs={songs} />
      </div>
    </>
  )
}
