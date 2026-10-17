import type { NextConfig } from "next"
import { deviceSizes, imageQuality, imageSizes } from "./src/lib/image-settings"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/static-image-loader.ts",
    deviceSizes,
    imageSizes,
    qualities: [imageQuality],
  },
}

export default nextConfig
