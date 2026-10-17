import { createHash } from "node:crypto"
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import { deviceSizes, imageQuality, imageSizes } from "../src/lib/image-settings.ts"

// Velite runs first and writes project covers to public/static.
const output = "public/optimized"
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })
await mkdir(".generated", { recursive: true })

const manifest: Record<string, Record<string, string>> = {}
for (const directory of ["images", "static"]) {
  const files = await readdir(path.join("public", directory), { recursive: true })
  for (const file of files.sort()) {
    if (!/\.(png|jpe?g|webp|avif)$/i.test(file)) continue
    const src = `/${directory}/${file.split(path.sep).join("/")}`
    const input = await readFile(path.join("public", directory, file))
    const variants: Record<string, string> = {}
    for (const width of [...imageSizes, ...deviceSizes]) {
      const encoded = await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: imageQuality })
        .toBuffer()
      const hash = createHash("sha256").update(encoded).digest("hex").slice(0, 20)
      const filename = `${hash}.webp`
      await writeFile(path.join(output, filename), encoded)
      variants[width] = `/optimized/${filename}`
    }
    manifest[src] = variants
  }
}
await writeFile(".generated/images.json", `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Generated responsive WebP images for ${Object.keys(manifest).length} source images`)
