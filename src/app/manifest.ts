import type { MetadataRoute } from "next"
import { site } from "@/data/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f9faf7",
    theme_color: "#6baf5b",
    icons: [
      {
        src: "/images/profile.jpg",
        sizes: "640x640",
        type: "image/jpeg",
      },
    ],
  }
}
