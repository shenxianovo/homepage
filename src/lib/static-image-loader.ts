"use client"

import type { ImageLoaderProps } from "next/image"
import manifest from "../../.generated/images.json"
import { imageQuality } from "./image-settings"

export default function staticImageLoader({ src, width, quality }: ImageLoaderProps) {
  const variants = (manifest as Record<string, Record<string, string>>)[src]
  const url = variants?.[width]
  if (!url || (quality !== undefined && quality !== imageQuality)) {
    throw new Error(`Missing static image variant: ${src} at ${width}px. Run pnpm content.`)
  }
  return url
}
