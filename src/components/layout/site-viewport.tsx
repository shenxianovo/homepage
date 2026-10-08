import type { ReactNode } from "react"

// Product policy: a narrow touch screen stays readable even when the browser
// requests a desktop viewport. Run before content is parsed to avoid a flash
// of tiny desktop text. Only SiteViewport consumes the scale; html/body and
// standard Tailwind breakpoints retain their usual behavior.
const readablePhoneScript = `(() => {
  const root = document.documentElement;
  const update = () => {
    const screenWidth = screen.width;
    const visual = window.visualViewport;
    // width * scale stays constant during pinch zoom. It also recovers the
    // display span when desktop mode inflates the reported screen width.
    const displayWidth = Math.round(Math.min(screenWidth, visual ? visual.width * visual.scale : screenWidth));
    const touch = matchMedia('(any-pointer: coarse)').matches || navigator.maxTouchPoints > 0;
    const phone = touch && Math.min(displayWidth, screen.height) < 768;
    const layoutWidth = root.clientWidth;
    // Ignore scrollbar gutters and ordinary rounding, which don't require
    // compensating a virtual desktop viewport.
    const adapted = phone && displayWidth > 0 && layoutWidth > displayWidth * 1.1 && CSS.supports('zoom', '2');
    root.toggleAttribute('data-readable-phone', adapted);
    root.style.setProperty('--site-scale', String(adapted ? layoutWidth / displayWidth : 1));
  };
  update();
  window.addEventListener('resize', update);
  window.addEventListener('pageshow', update);
  screen.orientation?.addEventListener('change', update);
  window.visualViewport?.addEventListener('resize', update);
})();`

export function SiteViewport({ children }: { children: ReactNode }) {
  return (
    <>
      <script>{readablePhoneScript}</script>
      <div className="site-viewport @container/site flex flex-1 flex-col">{children}</div>
    </>
  )
}
