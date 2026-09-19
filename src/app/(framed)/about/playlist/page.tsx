import { PageHeading } from "@/components/layout/page-heading"
import { getSongs } from "@/lib/songs"
import { SongList } from "./_components/song-list"

export const metadata = {
  title: "Playlist",
  description: "KTV 选择困难症解决方案",
}

export default function PlaylistPage() {
  const songs = getSongs()

  return (
    <>
      <div id="playlist-top" className="flex flex-col gap-3">
        <PageHeading eyebrow="My" title="Playlist" />
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          KTV 选择困难症解决方案 不定时更新（<s>其实是懒得录入 嘻嘻</s>。。
        </p>
      </div>

      <div className="mt-6 md:mt-10">
        <SongList songs={songs} />
      </div>
    </>
  )
}
