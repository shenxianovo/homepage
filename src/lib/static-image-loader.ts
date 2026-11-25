"use client"

import type { ImageLoaderProps } from "next/image"
import manifest from "../../.generated/images.json"

const images = manifest as Record<string, Record<string, string>>

export default function staticImageLoader({ src, width }: ImageLoaderProps) {
  const variants = images[src]
  if (!variants) return src
  if (variants[width]) return variants[width]
  const widths = Object.keys(variants)
    .map(Number)
    .sort((a, b) => a - b)
  const best = widths.find((w) => w >= width) ?? widths.at(-1)
  return best ? variants[best] : src
}
