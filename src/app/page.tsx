import Image from "next/image"
import { PageShell } from "@/components/layout/page-shell"
import { site } from "@/data/site"
import { FeatureCards } from "./_components/feature-cards"
import { Hero } from "./_components/hero"

function MascotBackground() {
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

      {/* Mascot scene, feathered to transparent on the left via the SVG mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src={site.hero.image}
          alt={site.hero.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1480px"
          className="hero-feather object-cover object-right"
        />
      </div>
    </>
  )
}

export default function Home() {
  return (
    <PageShell background={<MascotBackground />} padded={false}>
      <Hero />
      <div className="mt-auto">
        <FeatureCards />
      </div>
    </PageShell>
  )
}
