"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { site } from "@/data/site"

/**
 * Home-only backdrop: the masked mascot scene behind the FramedShell card.
 *
 * The image sits *under* the card's backdrop-blur, so the entrance is
 * opacity-only — animating transforms here would re-rasterise the blur
 * every frame. A one-time fade on mount, no replay on route changes.
 *
 * Hidden below `md`: on narrow screens the mascot is cropped to a sliver on
 * the right and reads as visual noise, so mobile drops the backdrop entirely.
 */
export function MascotBackground() {
  return (
    <>
      {/* Feather mask for the hero image. A blurred, rotatable ellipse.
          Knobs (edit the values directly — SVG masks can't read CSS vars reliably):
            cx / cy            : ellipse center, fraction of the box (0–1)
            rx / ry            : ellipse radii, fraction of the box
            rotate(angle ...)  : tilt in degrees (the angle you asked for)
            stdDeviation       : feather softness (fraction of the box)
          Note: coords live in the box's normalized 1×1 space, so on a wide
          hero the visual tilt looks shallower than the raw angle — tune by eye. */}
      <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
        <defs>
          <filter id="hero-feather-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.07" />
          </filter>
          <mask
            id="hero-feather-mask"
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
          >
            <ellipse
              cx="1.15"
              cy="0.1"
              rx="1.05"
              ry="0.45"
              fill="#fff"
              filter="url(#hero-feather-blur)"
              transform="rotate(-42 1.15 0.1)"
            />
          </mask>
        </defs>
      </svg>

      {/* Mascot scene, feathered to transparent on the left via the SVG mask.
          Hidden on mobile — see component note. */}
      <motion.div
        className="absolute inset-0 z-0 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: "opacity" }}
      >
        <Image
          src={site.hero.image}
          alt={site.hero.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1480px"
          className="hero-feather object-cover object-[60%_center] lg:object-right"
        />
      </motion.div>
    </>
  )
}
